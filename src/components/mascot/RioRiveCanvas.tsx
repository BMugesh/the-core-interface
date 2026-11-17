'use client';

import React, { useEffect } from 'react';
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import type { MascotState } from '@/lib/motionPrefs';

const STATE_TO_MODE: Record<MascotState, number> = {
  idle: 0,
  thinking: 1,
  alert: 2,
  celebrate: 3,
};

interface RioRiveCanvasProps {
  state: MascotState;
  onReady?: () => void;
  onFallback?: () => void;
}

export default function RioRiveCanvas({ state, onReady, onFallback }: RioRiveCanvasProps) {
  const { rive, RiveComponent } = useRive({
    src: '/mascot/rio.riv',
    artboard: 'RioMascot',
    stateMachines: 'RioStateMachine',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    onLoad: () => onReady?.(),
    onLoadError: () => onFallback?.(),
  });

  const modeInput = useStateMachineInput(rive, 'RioStateMachine', 'mode');

  useEffect(() => {
    if (modeInput) {
      modeInput.value = STATE_TO_MODE[state] ?? 0;
    }
  }, [modeInput, state]);

  return <RiveComponent className="w-full h-full" />;
}
