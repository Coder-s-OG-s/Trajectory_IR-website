'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Trajectory3DVisualizerProps {
  scenarioId: 'duplicate-charge' | 'plan-drift' | 'framework-jail' | 'log-archaeology';
  isSimulating: boolean;
  simulationState: 'idle' | 'running' | 'completed';
  scrollProgress?: number;
}

export function Trajectory3DVisualizer({
  scenarioId,
  isSimulating,
  simulationState,
  scrollProgress,
}: Trajectory3DVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewMode, setViewMode] = useState<'both' | 'traditional' | 'trajectoryIR'>('both');
  const scrollProgressRef = useRef(scrollProgress);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth;
    let height = container.clientHeight || 340;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05152d, 0.04);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 13);
    camera.lookAt(0, 0, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x7dd3fc, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 3, 25);
    pointLight.position.set(2, 4, 5);
    scene.add(pointLight);

    const redWarningLight = new THREE.PointLight(0xf43f5e, 0, 20);
    redWarningLight.position.set(-3, -1, 3);
    scene.add(redWarningLight);

    // 5. Ambient Deep Space Dust Particles
    const particleCount = 140;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 24;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 16;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const dustParticles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(dustParticles);

    // 6. Dynamic Trajectory Splines
    // Root incoming curve (Agent LLM Dispatch)
    const rootPoints = [
      new THREE.Vector3(-6, 0.8, -1),
      new THREE.Vector3(-4, 0.5, 0),
      new THREE.Vector3(-2, 0.2, 0.5),
      new THREE.Vector3(0, 0, 0),
    ];
    const rootCurve = new THREE.CatmullRomCurve3(rootPoints);
    const rootGeo = new THREE.TubeGeometry(rootCurve, 32, 0.065, 8, false);
    const rootMat = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.85,
    });
    const rootTube = new THREE.Mesh(rootGeo, rootMat);
    scene.add(rootTube);

    // Trajectory IR Protected Path (Cyan / Luminous Shielded)
    const tirPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1.8, 0.8, 0.4),
      new THREE.Vector3(3.6, 1.2, -0.2),
      new THREE.Vector3(5.8, 1.6, -1),
    ];
    const tirCurve = new THREE.CatmullRomCurve3(tirPoints);
    const tirGeo = new THREE.TubeGeometry(tirCurve, 32, 0.075, 8, false);
    const tirMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.9,
      roughness: 0.2,
    });
    const tirTube = new THREE.Mesh(tirGeo, tirMat);
    scene.add(tirTube);

    // Traditional Unsafe Path (Red / Drifting / Looping)
    const tradPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1.2, -1.0, 0.6),
      new THREE.Vector3(2.8, -1.8, 1.4),
      new THREE.Vector3(4.5, -1.2, 0.8),
      new THREE.Vector3(3.2, -0.4, 0.2), // Duplicate Loop back!
      new THREE.Vector3(5.6, -1.5, 1.6),
    ];
    const tradCurve = new THREE.CatmullRomCurve3(tradPoints);
    const tradGeo = new THREE.TubeGeometry(tradCurve, 40, 0.065, 8, false);
    const tradMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xe11d48,
      emissiveIntensity: 0.8,
      roughness: 0.3,
    });
    const tradTube = new THREE.Mesh(tradGeo, tradMat);
    scene.add(tradTube);

    // 7. Interactive 3D Execution Nodes
    // Root Node: Dispatch
    const nodeRootGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const nodeRootMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x7dd3fc,
      emissiveIntensity: 1.2,
    });
    const nodeRoot = new THREE.Mesh(nodeRootGeo, nodeRootMat);
    nodeRoot.position.set(-6, 0.8, -1);
    scene.add(nodeRoot);

    // Critical Split Node: The Crash Point / Gate
    const nodeCrashGeo = new THREE.IcosahedronGeometry(0.32, 1);
    const nodeCrashMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xd97706,
      emissiveIntensity: 1.4,
      wireframe: false,
    });
    const nodeCrash = new THREE.Mesh(nodeCrashGeo, nodeCrashMat);
    nodeCrash.position.set(0, 0, 0);
    scene.add(nodeCrash);

    // Trajectory IR Cryptographic Seal Wireframe Cage
    const sealCageGeo = new THREE.IcosahedronGeometry(0.55, 1);
    const sealCageMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const sealCage = new THREE.Mesh(sealCageGeo, sealCageMat);
    sealCage.position.set(3.6, 1.2, -0.2);
    scene.add(sealCage);

    const sealInnerGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const sealInnerMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.5,
    });
    const sealInner = new THREE.Mesh(sealInnerGeo, sealInnerMat);
    sealInner.position.set(3.6, 1.2, -0.2);
    scene.add(sealInner);

    // Traditional Duplicate Crash Node
    const dupCrashGeo = new THREE.OctahedronGeometry(0.3, 0);
    const dupCrashMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xbe123c,
      emissiveIntensity: 1.2,
      wireframe: true,
    });
    const dupCrash = new THREE.Mesh(dupCrashGeo, dupCrashMat);
    dupCrash.position.set(4.5, -1.2, 0.8);
    scene.add(dupCrash);

    // 8. Traveling Energy Pulses (Current Execution Bead)
    const beadGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const tirBeadMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const tirBead = new THREE.Mesh(beadGeo, tirBeadMat);
    scene.add(tirBead);

    const tradBeadMat = new THREE.MeshBasicMaterial({ color: 0xff4d4d });
    const tradBead = new THREE.Mesh(beadGeo, tradBeadMat);
    scene.add(tradBead);

    // 9. Interactive Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 2.5;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetCameraX = x * 2.2;
      targetCameraY = 2.5 + y * 1.4;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // 10. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Determine progress: either scroll-driven (if scrollProgress is provided) or autonomous clock loop
      const sp = scrollProgressRef.current;
      const hasScroll = typeof sp === 'number' && !isNaN(sp);
      const activeProgress = hasScroll ? Math.min(Math.max(sp, 0), 1) : null;

      // Smooth camera orbit & scroll-driven camera travel
      const baseCameraX = activeProgress !== null ? THREE.MathUtils.lerp(-1.8, 2.6, activeProgress) : 0;
      const baseCameraY = activeProgress !== null ? THREE.MathUtils.lerp(2.2, 3.2, activeProgress) : 2.5;
      const baseCameraZ = activeProgress !== null ? THREE.MathUtils.lerp(14.0, 11.5, activeProgress) : 13;

      camera.position.x += ((baseCameraX + targetCameraX) - camera.position.x) * 0.08;
      camera.position.y += ((baseCameraY + targetCameraY) - camera.position.y) * 0.08;
      camera.position.z += (baseCameraZ - camera.position.z) * 0.08;
      camera.lookAt(0.5, 0, 0);

      // Rotate nodes & cages
      nodeCrash.rotation.y = elapsed * 1.2;
      nodeCrash.rotation.x = elapsed * 0.8;
      sealCage.rotation.y = -elapsed * 0.9;
      sealCage.rotation.z = elapsed * 0.6;
      dupCrash.rotation.y = elapsed * 1.5;

      // Pulse traveling beads along curves (scroll-linked or time-linked)
      const tirT = activeProgress !== null ? activeProgress : ((elapsed * 0.35) % 1);
      const tirPos = tirCurve.getPointAt(tirT);
      tirBead.position.copy(tirPos);

      const tradT = activeProgress !== null ? Math.min(activeProgress * 1.15, 1) : ((elapsed * 0.42) % 1);
      const tradPos = tradCurve.getPointAt(tradT);
      tradBead.position.copy(tradPos);

      // Rotate subtle background dust
      dustParticles.rotation.y = elapsed * 0.03;

      // Handle Simulation / Glitch states (triggered by scroll threshold or button)
      const isCrashActive = isSimulating || simulationState === 'running' || (activeProgress !== null && activeProgress > 0.45 && activeProgress < 0.85);

      if (isCrashActive) {
        redWarningLight.intensity = 5 + Math.sin(elapsed * 25) * 4;
        nodeCrashMat.emissiveIntensity = 3.5;
        tradTube.position.x = (Math.random() - 0.5) * 0.08;
        tradTube.position.y = (Math.random() - 0.5) * 0.08;
      } else {
        redWarningLight.intensity = 0.8;
        nodeCrashMat.emissiveIntensity = 1.2;
        tradTube.position.set(0, 0, 0);
      }

      // Handle View Mode filtering
      if (viewMode === 'traditional') {
        tirTube.visible = false;
        sealCage.visible = false;
        sealInner.visible = false;
        tirBead.visible = false;
        tradTube.visible = true;
        dupCrash.visible = true;
        tradBead.visible = true;
      } else if (viewMode === 'trajectoryIR') {
        tirTube.visible = true;
        sealCage.visible = true;
        sealInner.visible = true;
        tirBead.visible = true;
        tradTube.visible = false;
        dupCrash.visible = false;
        tradBead.visible = false;
      } else {
        tirTube.visible = true;
        sealCage.visible = true;
        sealInner.visible = true;
        tirBead.visible = true;
        tradTube.visible = true;
        dupCrash.visible = true;
        tradBead.visible = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Handle Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight || 340;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      rootGeo.dispose();
      rootMat.dispose();
      tirGeo.dispose();
      tirMat.dispose();
      tradGeo.dispose();
      tradMat.dispose();
      nodeRootGeo.dispose();
      nodeRootMat.dispose();
      nodeCrashGeo.dispose();
      nodeCrashMat.dispose();
      sealCageGeo.dispose();
      sealCageMat.dispose();
      sealInnerGeo.dispose();
      sealInnerMat.dispose();
      dupCrashGeo.dispose();
      dupCrashMat.dispose();
      beadGeo.dispose();
      tirBeadMat.dispose();
      tradBeadMat.dispose();
    };
  }, [isSimulating, simulationState, viewMode, scenarioId]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden bg-[#040e20]/80 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col justify-between"
    >
      {/* 3D WebGL Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
      />

      {/* Top Floating Telemetry & Controls HUD */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 pointer-events-none">
        <div className="flex items-center gap-2.5">
          <div className="px-2.5 py-1 rounded-md bg-white/[0.08] border border-white/15 backdrop-blur-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-200 uppercase">
              3D Trajectory Topology
            </span>
          </div>
          <span className="text-xs text-sky-200/50 font-mono hidden sm:inline">
            Interactive WebGL
          </span>
        </div>

        {/* View Mode Filters */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md pointer-events-auto">
          <button
            onClick={() => setViewMode('both')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
              viewMode === 'both'
                ? 'bg-sky-500/30 text-white border border-sky-400/40 shadow'
                : 'text-sky-200/60 hover:text-white'
            }`}
          >
            Split View
          </button>
          <button
            onClick={() => setViewMode('traditional')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
              viewMode === 'traditional'
                ? 'bg-rose-500/30 text-rose-200 border border-rose-400/40 shadow'
                : 'text-rose-300/60 hover:text-rose-200'
            }`}
          >
            Traditional Crash
          </button>
          <button
            onClick={() => setViewMode('trajectoryIR')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
              viewMode === 'trajectoryIR'
                ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 shadow'
                : 'text-cyan-300/60 hover:text-cyan-200'
            }`}
          >
            Trajectory IR Sealed
          </button>
        </div>
      </div>

      {/* Bottom Floating Legend & Telemetry Readout */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 p-4 sm:p-5 pointer-events-none">
        {/* Visual Legend */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs font-mono">
          <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-2.5 py-1 rounded-md backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
            <span className="text-rose-200">Red: Naive Loop / Duplicate Retry</span>
          </div>
          <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-2.5 py-1 rounded-md backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
            <span className="text-cyan-200">Cyan: Sealed `.tir` Cryptographic Gate</span>
          </div>
        </div>

        {/* Orbit Hint */}
        <div className="text-[11px] font-mono text-sky-200/40 flex items-center gap-1.5 self-start sm:self-auto">
          <span>✦ Hover / Move cursor to orbit 3D space</span>
        </div>
      </div>
    </div>
  );
}
