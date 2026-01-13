import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

export interface CameraState {
    position: number;
    velocity: number;
    depth: number;
    focus: number;
    scale: number;
}

interface UseCameraScrollOptions {
    smoothing?: number;
    depthRange?: [number, number];
    focusRange?: [number, number];
    scaleRange?: [number, number];
}

/**
 * IMAX-grade camera scroll system
 * Maps scroll position to camera parameters (position, depth, focus, scale)
 * Provides continuous camera movement instead of discrete section animations
 */
export const useCameraScroll = (options: UseCameraScrollOptions = {}) => {
    const {
        smoothing = 0.1,
        depthRange = [0, 1],
        focusRange = [0, 1],
        scaleRange = [1, 1.02],
    } = options;

    const { scrollY, scrollYProgress } = useScroll();
    const [cameraState, setCameraState] = useState<CameraState>({
        position: 0,
        velocity: 0,
        depth: 0,
        focus: 0,
        scale: 1,
    });

    const lastScrollY = useRef(0);
    const lastTime = useRef(Date.now());
    const rafId = useRef<number | null>(null);

    // Transform scroll progress to camera parameters
    const depth = useTransform(scrollYProgress, [0, 1], depthRange);
    const focus = useTransform(scrollYProgress, [0, 1], focusRange);
    const scale = useTransform(scrollYProgress, [0, 1], scaleRange);

    useEffect(() => {
        const updateCamera = () => {
            const currentScrollY = scrollY.get();
            const currentTime = Date.now();
            const deltaTime = currentTime - lastTime.current;
            const deltaScroll = currentScrollY - lastScrollY.current;

            // Calculate velocity (pixels per millisecond)
            const velocity = deltaTime > 0 ? deltaScroll / deltaTime : 0;

            // Smooth camera state update
            setCameraState((prev) => ({
                position: currentScrollY,
                velocity: prev.velocity + (velocity - prev.velocity) * smoothing,
                depth: depth.get(),
                focus: focus.get(),
                scale: scale.get(),
            }));

            lastScrollY.current = currentScrollY;
            lastTime.current = currentTime;

            rafId.current = requestAnimationFrame(updateCamera);
        };

        rafId.current = requestAnimationFrame(updateCamera);

        return () => {
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, [scrollY, depth, focus, scale, smoothing]);

    return {
        cameraState,
        scrollY,
        scrollYProgress,
    };
};

/**
 * Calculate camera offset for parallax effects based on depth
 * Closer elements (depth = 0) move faster, distant elements (depth = 1) move slower
 */
export const getCameraOffset = (depth: number, scrollProgress: number): number => {
    // Inverse relationship: closer = more movement
    const parallaxFactor = 1 - depth;
    return scrollProgress * parallaxFactor * 100;
};

/**
 * Calculate focus blur amount based on camera focus and element depth
 * Elements at the focus depth are sharp, others are blurred
 */
export const getFocusBlur = (
    elementDepth: number,
    cameraFocus: number,
    maxBlur: number = 8
): number => {
    const depthDifference = Math.abs(elementDepth - cameraFocus);
    return depthDifference * maxBlur;
};

/**
 * Calculate opacity based on camera depth and element depth
 * Elements fade as they move away from camera focus
 */
export const getDepthOpacity = (
    elementDepth: number,
    cameraDepth: number,
    falloff: number = 0.5
): number => {
    const depthDifference = Math.abs(elementDepth - cameraDepth);
    return Math.max(0, 1 - depthDifference * falloff);
};
