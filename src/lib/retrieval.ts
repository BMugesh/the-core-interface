import knowledgeBase from '@/data/knowledge.json';

export interface KnowledgeChunk {
  id: string;
  topic: string;
  tags: string[];
  content: string;
}

const chunks: KnowledgeChunk[] = knowledgeBase as KnowledgeChunk[];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9.+#%-]+/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

/**
 * Lightweight BM25-inspired keyword & tag retrieval over knowledge.json.
 * Zero external vector DB dependency, deterministic, fast on serverless edge/node.
 */
export function retrieveKnowledge(query: string, topK = 4): KnowledgeChunk[] {
  const qTokens = tokenize(query);
  if (qTokens.length === 0) {
    return chunks.slice(0, topK);
  }

  // Document frequency for simple IDF weighting
  const N = chunks.length;
  const df = new Map<string, number>();
  for (const chunk of chunks) {
    const uniqueWords = new Set([
      ...tokenize(chunk.topic),
      ...tokenize(chunk.content),
      ...chunk.tags.flatMap((t) => tokenize(t)),
    ]);
    for (const w of uniqueWords) {
      df.set(w, (df.get(w) ?? 0) + 1);
    }
  }

  const scored = chunks.map((chunk) => {
    const contentWords = tokenize(chunk.content);
    const topicWords = tokenize(chunk.topic);
    const tagSet = new Set(chunk.tags.flatMap((t) => tokenize(t)));

    let score = 0;
    for (const qt of qTokens) {
      const freq = df.get(qt) ?? 0;
      const idf = Math.log(1 + (N - freq + 0.5) / (freq + 0.5));

      if (tagSet.has(qt)) {
        score += 3.5 * idf;
      }
      if (topicWords.includes(qt)) {
        score += 2.2 * idf;
      }
      const contentHits = contentWords.filter((w) => w === qt || (qt.length > 3 && w.includes(qt))).length;
      if (contentHits > 0) {
        score += Math.min(contentHits, 3) * 1.1 * idf;
      }
    }

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const selected = scored.filter((s) => s.score > 0).slice(0, topK).map((s) => s.chunk);
  if (selected.length === 0) {
    // Fallback to identity + why-hire so the assistant still has core grounding
    return chunks.filter((c) => c.id === 'identity' || c.id === 'why-hire');
  }
  return selected;
}
