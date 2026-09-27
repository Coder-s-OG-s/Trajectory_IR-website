'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface ArchitectureLayerInfo {
  id: number;
  numberStr: string;
  name: string;
  subtitle: string;
  badge: string;
  mechanismSteps: string[];
  invariants: string[];
  description: string;
  codeSnippet: string;
  editorialPrefix: string;
  editorialHighlight: string;
  editorialSuffix: string;
  editorialCardTitle: string;
  editorialCardBody: string;
}

export const ARCHITECTURE_LAYERS_DATA: Record<number, ArchitectureLayerInfo> = {
  5: {
    id: 5,
    numberStr: '05',
    name: 'HOST PROCESS BOUNDARY',
    subtitle: 'Agent Loop, MCP Client & Custom Applications',
    badge: 'Linear Known-Args Rule',
    editorialPrefix: 'The',
    editorialHighlight: 'Science of Frozen Decisions',
    editorialSuffix: 'for Autonomous Agents',
    editorialCardTitle: 'Frozen Decisions, Made Deterministic',
    editorialCardBody: 'Before any tool executes or mutates external infrastructure, the host process seals candidate reasoning into an immutable DECISION node. Reasoning remains strictly isolated, eliminating retroactive prompt drift across steps.',
    mechanismSteps: [
      'Agent Loop receives candidate plan from LLM reasoning.',
      'Host freezes model plan into durable DECISION before tools run.',
      'Linear Known-Args: Tool B dependent on Tool A belongs in next step.',
      'Private reasoning (THOUGHT) is strictly isolated (never grafted).',
    ],
    invariants: [
      'seal_decision(plan) mandatory before any external side-effect',
      'All parameters known and validated at time of sealing',
      'Zero model drift: sealed plans cannot be retroactively modified',
    ],
    description: 'By enforcing the Linear Known-Args Rule, dependent tool calls are staged into subsequent execution steps rather than speculated concurrently. All runtime parameters are validated and locked at the moment of sealing, ensuring verifiable deterministic transitions.',
    codeSnippet: 'seal_decision(plan) -> freeze(decision_hash)',
  },
  4: {
    id: 4,
    numberStr: '04',
    name: 'PUBLIC CLIENT API',
    subtitle: 'Python (DBOS) & Go (Temporal) SDKs',
    badge: 'RFC 8785 JCS Canonicalization',
    editorialPrefix: 'The',
    editorialHighlight: 'Deterministic Standard',
    editorialSuffix: 'Across Python & Go',
    editorialCardTitle: 'RFC 8785 Canonical Equivalence',
    editorialCardBody: 'Client SDKs construct typed node payloads canonicalized through deterministic JSON sorting. SHA-256 hashing yields byte-for-byte identical node IDs across Python and Go, uniting disparate agent runtimes under one verifiable protocol.',
    mechanismSteps: [
      'SDK constructs typed node payloads (INPUT, DECISION, TOOL_CALL).',
      'RFC 8785 JCS canonicalizes JSON with deterministic key sorting.',
      'SHA-256 hash yields byte-for-byte identical node_id across Python & Go.',
      'Unified Step Lifecycle emits immutable trajectory events.',
    ],
    invariants: [
      'node_id = sha256(tenant_id | traj_id | jcs(payload))',
      'Cross-language hash invariant across Python and Go runtimes',
      'Standardized Step Lifecycle & Replay API across backends',
    ],
    description: 'Whether running high-throughput worker pipelines in Go with Temporal or rapid agent orchestration in Python with DBOS, both client SDKs adhere to identical cryptographic hashing invariants and canonical event lifecycles.',
    codeSnippet: 'node_id = sha256(tenant | traj | jcs_payload)',
  },
  3: {
    id: 3,
    numberStr: '03',
    name: 'IR CORE BOUNDARY',
    subtitle: 'Fail-Closed Effect Matrix & Policy Gate',
    badge: 'Fail-Closed Effect Matrix',
    editorialPrefix: 'The',
    editorialHighlight: 'Fail-Closed Gatekeeper',
    editorialSuffix: 'for External Mutations',
    editorialCardTitle: 'Policy Gating & Sandboxed Execution',
    editorialCardBody: 'Tool invocations pass through an immutable classification matrix. While pure math and reads proceed immediately, non-idempotent mutations trigger an automated freeze and human sign-off before side effects can occur.',
    mechanismSteps: [
      'Tool calls are intercepted and classified into Effect Matrix.',
      'PURE (in-memory math) and READ_ONLY execute immediately.',
      'IDEMPOTENT_WRITE runs with cached idempotency keys.',
      'NON_IDEMPOTENT_WRITE triggers Block & Gate for policy/human sign-off.',
      'Sandbox Mode (Rule R06) rejects real mutations for testing.',
    ],
    invariants: [
      'Fail-closed security: unclassified tools fail immediately',
      'Deterministic sandboxing: mocks side effects in replay',
      'Human-in-the-loop gating for irreversible external actions',
    ],
    description: 'Trajectory IR enforces security policy directly at the core boundary. Any unclassified or high-risk external action fails closed immediately, providing guaranteed deterministic sandboxing and forensic replayability for critical infrastructure.',
    codeSnippet: 'effect_class in {PURE, READ_ONLY, IDEMPOTENT, NON_IDEMPOTENT}',
  },
  2: {
    id: 2,
    numberStr: '02',
    name: 'NODELOG & CAS',
    subtitle: 'Append-Only Merkle History & Storage',
    badge: 'Universal .tir Package',
    editorialPrefix: 'The',
    editorialHighlight: 'Cryptographic Provenance',
    editorialSuffix: 'Sealed in .tir Archives',
    editorialCardTitle: 'Tamper-Proof Merkle DAG & CAS',
    editorialCardBody: 'Every step appends to a verifiable Merkle DAG with heavy payload offloading to content-addressed storage. Complete trajectories are signed with Ed25519 keys, creating auditable forensic archives verifiable offline without LLMs.',
    mechanismSteps: [
      'Nodes are appended to an immutable Merkle hash tree.',
      'Heavy tool outputs & large JSON blobs are offloaded to CAS.',
      'Trajectory state is sealed into portable .tir archive format.',
      'Package signed with Ed25519 (trajir-pkg-sig-v1) for provenance.',
    ],
    invariants: [
      'Cryptographic tamper-proofing via SHA-256 Merkle root',
      'CAS content addressing prevents trajectory bloat',
      'Offline verification CLI verifies runs without LLMs',
    ],
    description: 'Every run seals into a self-contained, portable .tir archive containing manifest.json, append-only nodes.ndjson, and cryptographic CAS blobs. Forensic audits and compliance reviews can be executed completely air-gapped without relying on third-party model APIs.',
    codeSnippet: 'pkg: manifest.json + nodes.ndjson + blobs + Ed25519',
  },
  1: {
    id: 1,
    numberStr: '01',
    name: 'RUNTIME STREAM',
    subtitle: 'Worker I/O & Durable Storage Backends',
    badge: 'Crash Replay & Resume',
    editorialPrefix: 'The',
    editorialHighlight: 'Zero-Token Recovery',
    editorialSuffix: 'for Cloud Infrastructure',
    editorialCardTitle: 'Crash Replay & Durable Worker Resume',
    editorialCardBody: 'When cloud workers or host infrastructure crash mid-turn, durable backends (DBOS or Temporal) recover execution directly from the last sealed decision. Zero re-prompting, zero LLM variance, and zero redundant token spend.',
    mechanismSteps: [
      'Execution steps flow across append-only coordinate timeline (0..7).',
      'Durable engine (DBOS for Python, Temporal for Go) tracks worker I/O.',
      'When worker crashes, engine restarts from last sealed DECISION.',
      'Zero re-prompting: re-executes deterministically without LLM drift.',
    ],
    invariants: [
      'Clean boundary: Trajectory IR owns meaning; DBOS/Temporal own durability',
      'Deterministic crash recovery with zero redundant token spend',
      'Exact replay: sealed decision guarantees identical tool sequence',
    ],
    description: 'Execution steps flow across an append-only timeline from coordination to termination. When hardware faults or network partitions interrupt a run, durable engines resume the agent loop with mathematical determinism and identical tool sequences.',
    codeSnippet: 'durable_backend.resume(sealed_decision) -> 0 re-prompt',
  },
};

interface Architecture3DModelProps {
  // expansionProgress: 0.0 = compact stack, 1.0 = fully exploded/expanded layers
  expansionProgress: number;
  isVisible: boolean;
  activeScrollLayer?: number | null;
  layerScrubProgress?: number;
  shiftProgress?: number; // 0.0 = centered overview, 1.0 = shifted to right side
}

export const Architecture3DModel: React.FC<Architecture3DModelProps> = React.memo(({
  expansionProgress,
  isVisible,
  activeScrollLayer = null,
  layerScrubProgress = 0,
  shiftProgress = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelWrapperRef = useRef<HTMLDivElement>(null);
  const layoutStateRef = useRef({ xShift: 0, yShift: 0, modelScale: 1 });
  const mouseTiltRef = useRef({ x: 0, y: 0 });
  const [manualLayer, setManualLayer] = useState<number | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const [isWideScreen, setIsWideScreen] = useState(true);

  // Responsive check for desktop layout shift
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Clear manual selection when user resumes scrolling through layers
  useEffect(() => {
    if (activeScrollLayer !== null) {
      setManualLayer(null);
    }
  }, [activeScrollLayer]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isWideScreen || !containerRef.current || !modelWrapperRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    const tx = nx * 5;
    const ty = -ny * 3.5;
    mouseTiltRef.current = { x: tx, y: ty };
    modelWrapperRef.current.style.transform = `perspective(1400px) rotateX(${ty}deg) rotateY(${tx}deg) translateX(${layoutStateRef.current.xShift}%) translateY(${layoutStateRef.current.yShift}%) scale(${layoutStateRef.current.modelScale})`;
  };

  const handleMouseLeave = () => {
    if (!modelWrapperRef.current) return;
    mouseTiltRef.current = { x: 0, y: 0 };
    modelWrapperRef.current.style.transform = `perspective(1400px) rotateX(0deg) rotateY(0deg) translateX(${layoutStateRef.current.xShift}%) translateY(${layoutStateRef.current.yShift}%) scale(${layoutStateRef.current.modelScale})`;
  };

  // Determine active layer: hover wins, then manual click, then active scroll layer
  const effectiveActiveLayer = hoveredLayer || manualLayer || activeScrollLayer || (shiftProgress > 0.15 ? 5 : null);
  const isWalkthroughActive = shiftProgress > 0.15 || manualLayer !== null;
  const activeData = effectiveActiveLayer ? ARCHITECTURE_LAYERS_DATA[effectiveActiveLayer] : null;

  // Compute vertical layer positioning directly from scroll expansion
  // Scaled & commanding architectural geometry: clear, bold & effortlessly readable
  const layerGap = 72 + expansionProgress * 16; // 72px to 88px (scaled from 56px)
  const baseY = 560; // Baseline Y in SVG coordinates (viewBox: 0 0 1000 680)

  // Y coordinates for each layer (Layer 1 bottom -> Layer 5 top)
  const l1_Y = baseY;
  const l2_Y = baseY - layerGap * 1;
  const l3_Y = baseY - layerGap * 2;
  const l4_Y = baseY - layerGap * 3;
  const l5_Y = baseY - layerGap * 4;

  // Center coordinate of the isometric stack
  const cx = 490;
  const gw = 186; // Grid half-width along isometric X (expanded from 155 -> 186)
  const gh = 54;  // Sleek isometric perspective angle (expanded from 45 -> 54)
  const slabThick = 9; // 3D physical wireframe slab thickness (expanded from 7 -> 9)

  // Helper to generate isometric diamond path centered at (cx, y)
  const getGridPath = (y: number) => {
    return `M ${cx} ${y - gh} L ${cx + gw} ${y} L ${cx} ${y + gh} L ${cx - gw} ${y} Z`;
  };

  // Helper for bottom diamond of the slab (3D wireframe cage)
  const getBottomGridPath = (y: number) => {
    return `M ${cx} ${y - gh + slabThick} L ${cx + gw} ${y + slabThick} L ${cx} ${y + gh + slabThick} L ${cx - gw} ${y + slabThick} Z`;
  };

  // Helper for 3D slab left edge (bevel)
  const getLeftSlabPath = (y: number) => {
    return `M ${cx - gw} ${y} L ${cx} ${y + gh} L ${cx} ${y + gh + slabThick} L ${cx - gw} ${y + slabThick} Z`;
  };

  // Helper for 3D slab right edge (bevel)
  const getRightSlabPath = (y: number) => {
    return `M ${cx} ${y + gh} L ${cx + gw} ${y} L ${cx + gw} ${y + slabThick} L ${cx} ${y + gh + slabThick} Z`;
  };

  // Helper to get opacity for a layer group: isolates the active layer when shifted/zoomed
  const getLayerOpacity = (lvl: number) => {
    if (shiftProgress < 0.15 && !manualLayer) return 1;
    return effectiveActiveLayer === lvl ? 1 : 0.5;
  };

  const isLayerActive = (lvl: number) => {
    return isWalkthroughActive ? effectiveActiveLayer === lvl : false;
  };

  // Vertical camera focus translation: gently shifts stack to center whichever layer is active
  const stackTranslateY = isWideScreen && isWalkthroughActive && effectiveActiveLayer
    ? effectiveActiveLayer <= 2
      ? -18
      : effectiveActiveLayer === 3
      ? 0
      : 16
    : 0;

  // Dynamic horizontal and vertical positioning:
  // On desktop: shifts diagram cleanly to the right during walkthrough or layer selection
  // so the left console (45vw) and the 3D isometric stack have spacious, uncluttered breathing room
  const effectiveShift = Math.max(shiftProgress, manualLayer !== null ? 1 : 0);
  const xShift = isWideScreen ? effectiveShift * 22 : 0;
  const yShift = 0;
  const modelScale = 1;

  layoutStateRef.current = { xShift, yShift, modelScale };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full overflow-hidden select-none flex flex-col lg:flex-row items-center justify-between lg:justify-center touch-pan-y"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.4s ease-out',
        background: 'linear-gradient(180deg, #071529 0%, #0b203e 35%, #0e284c 70%, #07162b 100%)',
      }}
    >
      {/* Mobile Top Watermark Header */}
      {!isWideScreen && (
        <div className="absolute top-2.5 left-4 right-4 flex items-center justify-between z-20 pointer-events-none text-[10px] font-mono text-sky-300/80 tracking-widest uppercase">
          <span>TRAJECTORY_IR [SPEC_01]</span>
          <span className="text-slate-400">LAYER 0{effectiveActiveLayer || 5} / 05</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3D ISOMETRIC VIEWPORT CONTAINER: EXPANDED VIEWPORT WITH ZERO CLIPPING     */}
      {/* ========================================================================= */}
      <div
        ref={modelWrapperRef}
        className="relative w-full max-w-[1600px] max-lg:h-[39vh] max-lg:pt-5 lg:h-full lg:max-h-[96vh] p-1 sm:p-2 flex items-center justify-center will-change-transform"
        style={{
          transform: isWideScreen
            ? `perspective(1400px) rotateX(${mouseTiltRef.current.y}deg) rotateY(${mouseTiltRef.current.x}deg) translateX(${xShift}%) translateY(${yShift}%) scale(${modelScale})`
            : 'none',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
      >
        <svg
          viewBox={isWideScreen ? "-180 0 1320 680" : "0 150 710 500"}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full max-lg:max-h-[39vh] lg:max-h-[94vh] block select-none overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Unified Precision Engineering Gradients (Ice Cyan / Cobalt / Steel) */}
            <linearGradient id="funnelCoreGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id="funnelSubtleGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0369a1" stopOpacity="0.2" />
              <stop offset="70%" stopColor="#0284c7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
            </linearGradient>

            {/* Dark Charcoal Silicon IC Package Gradients */}
            <linearGradient id="siliconCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            <linearGradient id="siliconTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="goldPinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* Hardware Interlock Conduit */}
            <linearGradient id="busShieldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0369a1" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
            </linearGradient>

            {/* Hardware Status LED: Verified Active Emerald */}
            <radialGradient id="emeraldLedGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="60%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#064e3b" />
            </radialGradient>

            {/* Subtle Plane Precision Shading Patches */}
            <radialGradient id="precisionPatchGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#0284c7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.05" />
            </radialGradient>

            <radialGradient id="accentGatePatchGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#0284c7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.05" />
            </radialGradient>

            <linearGradient id="cyberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
            </linearGradient>
          </defs>

                    {/* ========================================================================= */}
          {/* TECHNICAL CAD VIEWPORT FRAME & PERSPECTIVE GUIDELINES                     */}
          {/* ========================================================================= */}
          <g
            className="pointer-events-none select-none transition-opacity duration-300"
            opacity={Math.max(0, 1 - shiftProgress * 2.5)}
          >
            {/* Top Viewport Header Rule */}
            <line x1="24" y1="35" x2="976" y2="35" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <text x="30" y="25" fill="rgba(255,255,255,0.85)" fontSize="12" fontFamily="monospace" letterSpacing="0.14em" fontWeight="bold">
              TRAJECTORY_IR [SPEC_01]
            </text>

            {/* Corner Drafting Marks */}
            <path d="M 24 45 L 24 35 L 39 35" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" fill="none" />
            <path d="M 976 45 L 976 35 L 961 35" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" fill="none" />
            <path d="M 24 640 L 24 650 L 39 650" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" fill="none" />
            <path d="M 976 640 L 976 650 L 961 650" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" fill="none" />

            {/* Subtle Perspective Convergence Lines (very low opacity so they never clash with text) */}
            <line x1="24" y1="35" x2="260" y2="220" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <line x1="976" y1="35" x2="730" y2="220" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <line x1="24" y1="650" x2="260" y2="500" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <line x1="976" y1="650" x2="730" y2="500" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          </g>

          {/* Master 3D Group with Dynamic Vertical Camera Focus */}
          <g
            transform={`translate(0, ${stackTranslateY})`}
            style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* ========================================================================= */}
            {/* 1. LEFT SIDE BRACKET TAXONOMY & PRECISION CAD GUIDES                      */}
            {/* ========================================================================= */}
            <g
              className="text-slate-300 font-sans transition-opacity duration-300 pointer-events-none select-none"
              opacity={isWideScreen ? Math.max(0, 1 - shiftProgress * 2.5) : 1}
            >
              {/* Top Bracket: "HOST" */}
              <path
                d={`M 72 ${l5_Y - 26} L 56 ${l5_Y - 26} L 56 ${l5_Y + 26} L 72 ${l5_Y + 26}`}
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.2"
              />
              <text
                x="40"
                y={l5_Y}
                fill="rgba(255,255,255,0.85)"
                fontSize="11.5"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="0.22em"
                textAnchor="middle"
                transform={`rotate(-90 40 ${l5_Y})`}
              >
                HOST
              </text>

              {/* Lower Bracket: "INFRASTRUCTURE" */}
              <path
                d={`M 72 ${l4_Y - 26} L 56 ${l4_Y - 26} L 56 ${l1_Y + 26} L 72 ${l1_Y + 26}`}
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.2"
              />
              <text
                x="40"
                y={(l4_Y + l1_Y) / 2}
                fill="rgba(255,255,255,0.85)"
                fontSize="11.5"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="0.22em"
                textAnchor="middle"
                transform={`rotate(-90 40 ${(l4_Y + l1_Y) / 2})`}
              >
                INFRASTRUCTURE
              </text>

              {/* 5 Left Layer Labels with Precision CAD Leader Guides */}
              {[
                { lvl: 5, y: l5_Y, num: '05', title: 'HOST PROCESS', sub1: 'Agent Loop & MCP Client', sub2: 'Immutable Decision Sealing' },
                { lvl: 4, y: l4_Y, num: '04', title: 'PUBLIC CLIENT API', sub1: 'Python (DBOS) & Go (Temporal)', sub2: 'RFC 8785 Canonical Equivalence' },
                { lvl: 3, y: l3_Y, num: '03', title: 'IR CORE BOUNDARY', sub1: 'Fail-Closed Effect Matrix', sub2: 'Block & Gate Policy Sandbox' },
                { lvl: 2, y: l2_Y, num: '02', title: 'NODELOG & CAS', sub1: 'Append-Only Merkle History', sub2: 'Universal .tir Archive Packages' },
                { lvl: 1, y: l1_Y, num: '01', title: 'RUNTIME STREAM', sub1: 'Tool Execution & I/O Engine', sub2: 'Durable Replay Backends' },
              ].map((item) => (
                <g key={`left-label-${item.lvl}`} className="pointer-events-auto cursor-pointer" onClick={() => setManualLayer(item.lvl)}>
                  {/* Layer Number Pill */}
                  <rect x="80" y={item.y - 12} width="24" height="17" rx="3.5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.9" />
                  <text x="92" y={item.y + 0.5} fill="rgba(255,255,255,0.9)" fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    {item.num}
                  </text>

                  {/* Title & Subtitles */}
                  <text x="112" y={item.y - 6} fill="#ffffff" fontSize="13.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.04em">
                    {item.title}
                  </text>
                  <text x="112" y={item.y + 9} fill="rgba(186,230,253,0.9)" fontSize="11" fontFamily="sans-serif">
                    {item.sub1}
                  </text>
                  <text x="112" y={item.y + 22} fill="rgba(148,163,184,0.75)" fontSize="9.5" fontFamily="sans-serif">
                    {item.sub2}
                  </text>

                  {/* CAD Horizontal Registration Guide to Diamond Left Vertex */}
                  <line
                    x1="265"
                    y1={item.y}
                    x2={cx - gw - 8}
                    y2={item.y}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="0.9"
                    strokeDasharray="2 3"
                  />
                  <circle cx={cx - gw - 8} cy={item.y} r="2.2" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="0.9" />
                </g>
              ))}
            </g>

            {/* ========================================================================= */}
            {/* 2. LAYER 1 (BOTTOM): RUNTIME STREAM & DURABLE TIMELINE                    */}
            {/* ========================================================================= */}
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => setManualLayer(1)}
              opacity={getLayerOpacity(1)}
            >
              {/* 3D Wireframe Slab Cage */}
              <path d={getBottomGridPath(l1_Y)} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
              <line x1={cx - gw} y1={l1_Y} x2={cx - gw} y2={l1_Y + slabThick} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1={cx} y1={l1_Y + gh} x2={cx} y2={l1_Y + gh + slabThick} stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
              <line x1={cx + gw} y1={l1_Y} x2={cx + gw} y2={l1_Y + slabThick} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1={cx} y1={l1_Y - gh} x2={cx} y2={l1_Y - gh + slabThick} stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeDasharray="3 3" />

              {/* Top diamond surface outline */}
              <path
                d={getGridPath(l1_Y)}
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth={isLayerActive(1) ? '2' : '1.2'}
              />

              {/* Corner Registration Marks */}
              <path d={`M ${cx} ${l1_Y - gh + 12} L ${cx} ${l1_Y - gh} L ${cx + 12} ${l1_Y - gh + 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <path d={`M ${cx + gw - 12} ${l1_Y - 6} L ${cx + gw} ${l1_Y} L ${cx + gw - 12} ${l1_Y + 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <path d={`M ${cx} ${l1_Y + gh - 12} L ${cx} ${l1_Y + gh} L ${cx - 12} ${l1_Y + gh - 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <path d={`M ${cx - gw + 12} ${l1_Y + 6} L ${cx - gw} ${l1_Y} L ${cx - gw + 12} ${l1_Y - 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />

              {/* Left Engine Dock: DBOS */}
              <g transform={`translate(${cx - 85}, ${l1_Y - 4})`}>
                <rect x="-35" y="-12" width="70" height="24" rx="4" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.1" />
                <text x="0" y="4.5" fill="rgba(255,255,255,0.95)" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  DBOS
                </text>
              </g>

              {/* Right Engine Dock: TEMPORAL */}
              <g transform={`translate(${cx + 85}, ${l1_Y - 4})`}>
                <rect x="-44" y="-12" width="88" height="24" rx="4" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.1" />
                <text x="0" y="4.5" fill="rgba(255,255,255,0.95)" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  TEMPORAL
                </text>
              </g>

              {/* Minimal Coordinate Timeline Rail */}
              <g transform={`translate(${cx}, ${l1_Y + 14})`}>
                <line x1="-80" y1="0" x2="80" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 3" />
                {[-60, -30, 0, 30, 60].map((sX, idx) => (
                  <circle key={`t-dot-${idx}`} cx={sX} cy="0" r="2.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
                ))}
              </g>
            </g>

            {/* ========================================================================= */}
            {/* 3. CLEAN VERTICAL DATA CONDUITS (Layer 1 -> Layer 2)                      */}
            {/* ========================================================================= */}
            <g opacity={isWalkthroughActive && (effectiveActiveLayer === 1 || effectiveActiveLayer === 2) ? 0.9 : 0.2} className="transition-opacity duration-300">
              <line x1={cx - 85} y1={l1_Y - 18} x2={cx - 85} y2={l2_Y + 18} stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1={cx + 85} y1={l1_Y - 18} x2={cx + 85} y2={l2_Y + 18} stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="4 4" />
            </g>

            {/* ========================================================================= */}
            {/* 4. LAYER 2: NODELOG & CONTENT-ADDRESSED STORAGE (CAS)                     */}
            {/* ========================================================================= */}
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => setManualLayer(2)}
              opacity={getLayerOpacity(2)}
            >
              {/* 3D Wireframe Slab Cage */}
              <path d={getBottomGridPath(l2_Y)} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
              <line x1={cx - gw} y1={l2_Y} x2={cx - gw} y2={l2_Y + slabThick} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1={cx} y1={l2_Y + gh} x2={cx} y2={l2_Y + gh + slabThick} stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
              <line x1={cx + gw} y1={l2_Y} x2={cx + gw} y2={l2_Y + slabThick} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1={cx} y1={l2_Y - gh} x2={cx} y2={l2_Y - gh + slabThick} stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeDasharray="3 3" />

              {/* Top diamond surface outline */}
              <path
                d={getGridPath(l2_Y)}
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth={isLayerActive(2) ? '2' : '1.2'}
              />

              {/* Corner Etches */}
              <path d={`M ${cx} ${l2_Y - gh + 12} L ${cx} ${l2_Y - gh} L ${cx + 12} ${l2_Y - gh + 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <path d={`M ${cx + gw - 12} ${l2_Y - 6} L ${cx + gw} ${l2_Y} L ${cx + gw - 12} ${l2_Y + 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <path d={`M ${cx} ${l2_Y + gh - 12} L ${cx} ${l2_Y + gh} L ${cx - 12} ${l2_Y + gh - 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <path d={`M ${cx - gw + 12} ${l2_Y + 6} L ${cx - gw} ${l2_Y} L ${cx - gw + 12} ${l2_Y - 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />

              {/* Left: Merkle History DAG Node Chain */}
              <g transform={`translate(${cx - 65}, ${l2_Y})`}>
                <line x1="-36" y1="0" x2="36" y2="0" stroke="rgba(255,255,255,0.55)" strokeWidth="1.1" />
                {[-36, 0, 36].map((nX, idx) => (
                  <circle key={`merkle-ring-${idx}`} cx={nX} cy="0" r="6" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" />
                ))}
                <text x="0" y="19" fill="rgba(255,255,255,0.85)" fontSize="10.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  MERKLE DAG
                </text>
              </g>

              {/* Right: Universal .tir Package Isometric Cube */}
              <g transform={`translate(${cx + 75}, ${l2_Y - 8})`}>
                <polygon points="0,-14 24,-7 0,0 -24,-7" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3" />
                <polygon points="-24,-7 0,0 0,16 -24,9" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                <polygon points="0,0 24,-7 24,9 0,16" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                <text x="0" y="28" fill="rgba(255,255,255,0.95)" fontSize="10.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  .TIR PKG
                </text>
              </g>
            </g>

            {/* ========================================================================= */}
            {/* 5. CLEAN VERTICAL CONDUITS (Layer 4 -> Layer 3)                           */}
            {/* ========================================================================= */}
            <g opacity={isWalkthroughActive && (effectiveActiveLayer === 3 || effectiveActiveLayer === 4) ? 0.9 : 0.2} className="transition-opacity duration-300">
              <line x1={cx - 70} y1={l4_Y + 14} x2={cx - 70} y2={l3_Y - 14} stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1={cx + 70} y1={l4_Y + 14} x2={cx + 70} y2={l3_Y - 14} stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="4 4" />
            </g>

            {/* ========================================================================= */}
            {/* 6. LAYER 3: IR CORE RESUME GATE & POLICY ENFORCER                         */}
            {/* ========================================================================= */}
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => setManualLayer(3)}
              opacity={getLayerOpacity(3)}
            >
              {/* 3D Wireframe Slab Cage */}
              <path d={getBottomGridPath(l3_Y)} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
              <line x1={cx - gw} y1={l3_Y} x2={cx - gw} y2={l3_Y + slabThick} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1={cx} y1={l3_Y + gh} x2={cx} y2={l3_Y + gh + slabThick} stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
              <line x1={cx + gw} y1={l3_Y} x2={cx + gw} y2={l3_Y + slabThick} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1={cx} y1={l3_Y - gh} x2={cx} y2={l3_Y - gh + slabThick} stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeDasharray="3 3" />

              {/* Top diamond surface outline */}
              <path
                d={getGridPath(l3_Y)}
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth={isLayerActive(3) ? '2' : '1.2'}
              />

              {/* Corner Etches */}
              <path d={`M ${cx} ${l3_Y - gh + 12} L ${cx} ${l3_Y - gh} L ${cx + 12} ${l3_Y - gh + 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <path d={`M ${cx + gw - 12} ${l3_Y - 6} L ${cx + gw} ${l3_Y} L ${cx + gw - 12} ${l3_Y + 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <path d={`M ${cx} ${l3_Y + gh - 12} L ${cx} ${l3_Y + gh} L ${cx - 12} ${l3_Y + gh - 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <path d={`M ${cx - gw + 12} ${l3_Y + 6} L ${cx - gw} ${l3_Y} L ${cx - gw + 12} ${l3_Y - 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />

              {/* Center: Clean Security Gate Prism */}
              <g transform={`translate(${cx}, ${l3_Y - 8})`}>
                <polygon points="0,-16 26,-8 0,0 -26,-8" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3" />
                <polygon points="-26,-8 0,0 0,16 -26,8" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                <polygon points="0,0 26,-8 26,8 0,16" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                <circle cx="0" cy="-4" r="3" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1" />
                <text x="0" y="28" fill="rgba(255,255,255,0.95)" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  FAIL-CLOSED GATE
                </text>
              </g>
            </g>

            {/* ========================================================================= */}
            {/* 7. LAYER 4: PUBLIC CLIENT API & CLIENT GATEWAY                           */}
            {/* ========================================================================= */}
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => setManualLayer(4)}
              opacity={getLayerOpacity(4)}
            >
              {/* 3D Wireframe Slab Cage */}
              <path d={getBottomGridPath(l4_Y)} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
              <line x1={cx - gw} y1={l4_Y} x2={cx - gw} y2={l4_Y + slabThick} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1={cx} y1={l4_Y + gh} x2={cx} y2={l4_Y + gh + slabThick} stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
              <line x1={cx + gw} y1={l4_Y} x2={cx + gw} y2={l4_Y + slabThick} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1={cx} y1={l4_Y - gh} x2={cx} y2={l4_Y - gh + slabThick} stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeDasharray="3 3" />

              {/* Top diamond surface outline */}
              <path
                d={getGridPath(l4_Y)}
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth={isLayerActive(4) ? '2' : '1.2'}
              />

              {/* Corner Etches */}
              <path d={`M ${cx} ${l4_Y - gh + 12} L ${cx} ${l4_Y - gh} L ${cx + 12} ${l4_Y - gh + 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <path d={`M ${cx + gw - 12} ${l4_Y - 6} L ${cx + gw} ${l4_Y} L ${cx + gw - 12} ${l4_Y + 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <path d={`M ${cx} ${l4_Y + gh - 12} L ${cx} ${l4_Y + gh} L ${cx - 12} ${l4_Y + gh - 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <path d={`M ${cx - gw + 12} ${l4_Y + 6} L ${cx - gw} ${l4_Y} L ${cx - gw + 12} ${l4_Y - 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />

              {/* Center Bridge: RFC 8785 Canonical Equivalence */}
              <line x1={cx - 60} y1={l4_Y} x2={cx + 60} y2={l4_Y} stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeDasharray="3 3" />
              <rect x={cx - 42} y={l4_Y - 11} width="84" height="22" rx="4" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
              <text x={cx} y={l4_Y + 4} fill="rgba(255,255,255,0.9)" fontSize="10.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                RFC 8785
              </text>

              {/* Left SDK Port: Python */}
              <g transform={`translate(${cx - 85}, ${l4_Y})`}>
                <rect x="-28" y="-11" width="56" height="22" rx="4" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />
                <text x="0" y="4" fill="rgba(255,255,255,0.9)" fontSize="10.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  PYTHON
                </text>
              </g>

              {/* Right SDK Port: Go */}
              <g transform={`translate(${cx + 85}, ${l4_Y})`}>
                <rect x="-24" y="-11" width="48" height="22" rx="4" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />
                <text x="0" y="4" fill="rgba(255,255,255,0.9)" fontSize="10.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  GO
                </text>
              </g>
            </g>

            {/* ========================================================================= */}
            {/* 8. LAYER 5 (TOP): HOST PROCESS & IMMUTABLE DECISION BOUNDARY              */}
            {/* ========================================================================= */}
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => setManualLayer(5)}
              opacity={getLayerOpacity(5)}
            >
              {/* 3D Wireframe Slab Cage */}
              <path d={getBottomGridPath(l5_Y)} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
              <line x1={cx - gw} y1={l5_Y} x2={cx - gw} y2={l5_Y + slabThick} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1={cx} y1={l5_Y + gh} x2={cx} y2={l5_Y + gh + slabThick} stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
              <line x1={cx + gw} y1={l5_Y} x2={cx + gw} y2={l5_Y + slabThick} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1={cx} y1={l5_Y - gh} x2={cx} y2={l5_Y - gh + slabThick} stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeDasharray="3 3" />

              {/* Top diamond surface outline */}
              <path
                d={getGridPath(l5_Y)}
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth={isLayerActive(5) ? '2' : '1.2'}
              />

              {/* Corner Etches */}
              <path d={`M ${cx} ${l5_Y - gh + 12} L ${cx} ${l5_Y - gh} L ${cx + 12} ${l5_Y - gh + 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <path d={`M ${cx + gw - 12} ${l5_Y - 6} L ${cx + gw} ${l5_Y} L ${cx + gw - 12} ${l5_Y + 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <path d={`M ${cx} ${l5_Y + gh - 12} L ${cx} ${l5_Y + gh} L ${cx - 12} ${l5_Y + gh - 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <path d={`M ${cx - gw + 12} ${l5_Y + 6} L ${cx - gw} ${l5_Y} L ${cx - gw + 12} ${l5_Y - 6}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />

              {/* Central Server Node: HOST PROCESS ENGINE */}
              <g transform={`translate(${cx}, ${l5_Y - 16})`}>
                <polygon points="0,-16 26,-8 0,0 -26,-8" fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="1.4" />
                <polygon points="-26,-8 0,0 0,16 -26,8" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                <polygon points="0,0 26,-8 26,8 0,16" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                <circle cx="0" cy="-4" r="3" fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="1" />
                <text x="0" y="28" fill="rgba(255,255,255,0.95)" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  HOST PROCESS
                </text>
              </g>

              {/* Left Input Port */}
              <g transform={`translate(${cx - 85}, ${l5_Y - 2})`}>
                <rect x="-28" y="-11" width="56" height="22" rx="4" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />
                <text x="0" y="4" fill="rgba(255,255,255,0.9)" fontSize="10.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  INPUT
                </text>
              </g>

              {/* Right Sealed Plan Port */}
              <g transform={`translate(${cx + 85}, ${l5_Y - 2})`}>
                <rect x="-32" y="-11" width="64" height="22" rx="4" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1" />
                <text x="0" y="4" fill="rgba(255,255,255,0.9)" fontSize="10.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  SEALED
                </text>
              </g>
            </g>

            {/* ========================================================================= */}
            {/* 8. RIGHT SIDE TECHNICAL SPECIFICATIONS (1-to-1 Balanced CAD Architecture) */}
            {/* ========================================================================= */}
            {isWideScreen && (
              <g
                className="text-slate-300 font-sans transition-opacity duration-300 pointer-events-none select-none"
                opacity={Math.max(0, 1 - shiftProgress * 2.5)}
              >
                {[
                  {
                    lvl: 5,
                    y: l5_Y,
                    title: 'LINEAR KNOWN ARGS RULE',
                    code: 'seal_decision(plan) -> freeze(decision_hash)',
                    desc: 'Plan frozen before tool runs; zero retroactive drift',
                  },
                  {
                    lvl: 4,
                    y: l4_Y,
                    title: 'RFC 8785 JCS CANONICALIZATION',
                    code: 'node_id = sha256(tenant | traj | jcs_payload)',
                    desc: 'Byte-for-byte hash invariant across Python & Go',
                  },
                  {
                    lvl: 3,
                    y: l3_Y,
                    title: 'FAIL-CLOSED EFFECT MATRIX',
                    code: 'effect_class in {PURE, READ, IDEMPOTENT, NON_IDEMPOTENT}',
                    desc: 'Unclassified mutations trigger Block & Gate policy freeze',
                  },
                  {
                    lvl: 2,
                    y: l2_Y,
                    title: 'UNIVERSAL .TIR PACKAGE',
                    code: 'manifest.json + nodes.ndjson + CAS blobs (Ed25519)',
                    desc: 'Cryptographic Merkle DAG verifiable offline without LLMs',
                  },
                  {
                    lvl: 1,
                    y: l1_Y,
                    title: 'CRASH REPLAY & RESUME',
                    code: 'durable_engine.reexecute(sealed_history)',
                    desc: 'Zero re-prompting: exact deterministic state replay',
                  },
                ].map((item) => (
                  <g key={`right-callout-${item.lvl}`} className="pointer-events-auto cursor-pointer" onClick={() => setManualLayer(item.lvl)}>
                    {/* Origin Ring at Diamond Right Apex */}
                    <circle cx={cx + gw + 7} cy={item.y} r="2.2" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="0.9" />

                    {/* Horizontal CAD Leader Guideline */}
                    <line
                      x1={cx + gw + 11}
                      y1={item.y}
                      x2="710"
                      y2={item.y}
                      stroke="rgba(255,255,255,0.35)"
                      strokeWidth="0.9"
                      strokeDasharray="3 3"
                    />

                    {/* Terminal Reticle Pin */}
                    <circle cx="710" cy={item.y} r="1.8" fill="rgba(255,255,255,0.9)" />

                    {/* Headline Title */}
                    <text
                      x="720"
                      y={item.y - 10}
                      fill="#ffffff"
                      fontSize="13.5"
                      style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif", letterSpacing: '-0.01em' }}
                      fontWeight="bold"
                    >
                      {item.title}
                    </text>

                    {/* Specification Formula / Invariant Rule */}
                    <text
                      x="720"
                      y={item.y + 5}
                      fill="rgba(186,230,253,0.95)"
                      fontSize="11"
                      style={{ fontFamily: "var(--font-mono), monospace" }}
                      fontWeight="bold"
                    >
                      {item.code}
                    </text>

                    {/* Plain-Language Behavioral Guarantee */}
                    <text
                      x="720"
                      y={item.y + 19}
                      fill="rgba(203,213,225,0.85)"
                      fontSize="10.5"
                      style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                    >
                      {item.desc}
                    </text>
                  </g>
                ))}
              </g>
            )}
          </g>
        </svg>
      </div>


      {/* ========================================================================= */}
      {/* LIGHTWEIGHT LEFT-HAND STORYTELLING CONSOLE (HIGH-PERFORMANCE PURE TEXT)   */}
      {/* ========================================================================= */}
      {(isWideScreen ? shiftProgress > 0.05 : true) && (
        <div
          className="absolute left-2.5 right-2.5 sm:left-4 sm:right-4 lg:left-12 max-lg:bottom-2 max-lg:top-auto max-lg:max-h-[58vh] lg:top-10 lg:bottom-10 w-auto lg:w-[45vw] xl:w-[46vw] z-20 pointer-events-auto flex flex-col justify-between p-3.5 sm:p-5 lg:p-0 lg:pr-4 rounded-2xl lg:rounded-none bg-[#07162b]/95 lg:bg-transparent backdrop-blur-2xl lg:backdrop-blur-none border border-white/20 lg:border-none shadow-2xl lg:shadow-none select-text overflow-hidden touch-pan-y"
          style={isWideScreen ? {
            opacity: Math.min(1, Math.max(0, (shiftProgress - 0.05) / 0.25)),
            transform: `translateX(${(1 - shiftProgress) * -20}px)`,
            pointerEvents: shiftProgress > 0.15 ? 'auto' : 'none',
            transition: 'transform 0.2s ease-out',
          } : {
            opacity: 1,
            transform: 'none',
            pointerEvents: 'auto',
            touchAction: 'pan-y',
          }}
        >
          {/* Top Layer Switcher Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3 mb-2 sm:mb-3 shrink-0">
            {/* Left: 5 Layer Number Tabs */}
            <div className="flex items-center gap-1 sm:gap-2">
              {[5, 4, 3, 2, 1].map((lvl) => {
                const isSelected = (effectiveActiveLayer || 5) === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setManualLayer(lvl)}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-sky-500/25 text-white border border-sky-400/50 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                    title={`View Layer 0${lvl}: ${ARCHITECTURE_LAYERS_DATA[lvl].name}`}
                  >
                    0{lvl}
                  </button>
                );
              })}
            </div>

            {/* Right: Layer Taxonomy Badge */}
            <div className="flex items-center gap-2">
              <div className="text-[10px] sm:text-[11px] font-mono text-sky-400/90 tracking-wider uppercase">
                {ARCHITECTURE_LAYERS_DATA[effectiveActiveLayer || 5].badge}
              </div>
            </div>
          </div>

          {/* Main Layer Content Body (Renders instantly for active layer with zero GPU choke) */}
          {(() => {
            const data = ARCHITECTURE_LAYERS_DATA[effectiveActiveLayer || 5];
            return (
              <div key={`layer-text-${data.id}`} className="flex-1 flex flex-col justify-center space-y-2 sm:space-y-4 my-auto py-1">
                {/* Layer Taxonomy Tag + Mobile Badge */}
                <div className="space-y-1 shrink-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[10px] sm:text-xs font-mono text-sky-400 tracking-widest uppercase font-semibold">
                      LAYER {data.numberStr} // {data.name}
                    </div>
                    <div className="lg:hidden text-[9.5px] font-mono text-sky-300/90 tracking-wider uppercase px-2 py-0.5 rounded bg-sky-500/15 border border-sky-400/30 shrink-0">
                      {data.badge}
                    </div>
                  </div>
                  <h3
                    className="text-base sm:text-2xl lg:text-[2.1rem] xl:text-[2.35rem] font-serif text-white leading-snug font-light tracking-tight"
                    style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                  >
                    <span>{data.editorialPrefix} </span>
                    <span className="italic text-sky-300 underline decoration-sky-400/40 underline-offset-4 font-normal">
                      {data.editorialHighlight}
                    </span>{' '}
                    <span>{data.editorialSuffix}</span>
                  </h3>
                  <div className="text-[10px] sm:text-xs font-mono text-slate-400 tracking-wide uppercase">
                    ROLE: <span className="text-slate-200">{data.subtitle}</span>
                  </div>
                </div>

                {/* Subtitle & Explanations: Fully visible on mobile without '...' truncation */}
                <div className="space-y-1.5 sm:space-y-2.5 text-slate-200/90 text-xs sm:text-sm lg:text-base leading-relaxed font-sans font-normal">
                  <div className="text-[13px] sm:text-base lg:text-lg font-serif italic text-sky-200 font-medium">
                    {data.editorialCardTitle}
                  </div>
                  <p className="text-slate-200/90 text-[12px] sm:text-sm lg:text-[15px] leading-relaxed">
                    {data.editorialCardBody}
                  </p>
                  <p className="text-slate-300/80 text-[11.5px] sm:text-sm lg:text-[14px] leading-relaxed pt-0.5">
                    {data.description}
                  </p>
                </div>

                {/* Invariant Rules */}
                <div className="pt-1 sm:pt-1.5 shrink-0">
                  <div className="text-[10.5px] sm:text-[11px] font-mono text-sky-400/80 uppercase tracking-wider font-semibold mb-1">
                    Key Cryptographic Invariants
                  </div>
                  <div className="space-y-1">
                    {data.invariants.map((inv, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-slate-300">
                        <span className="text-sky-400 shrink-0">→</span>
                        <span>{inv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Minimal Clean Technical Footer */}
          <div className="flex items-center justify-between pt-2.5 sm:pt-3 mt-1 sm:mt-2 border-t border-white/10 text-[10px] sm:text-xs font-mono text-slate-400 shrink-0 pl-7 sm:pl-0 pb-1">
            <span className="text-sky-400/70 tracking-wider">
              @trajectory_ir // SPECIFICATION
            </span>
            <span className="text-slate-300 font-semibold">
              LAYER {ARCHITECTURE_LAYERS_DATA[effectiveActiveLayer || 5].numberStr} / 05
            </span>
          </div>
        </div>
      )}
    </div>
  );
});
