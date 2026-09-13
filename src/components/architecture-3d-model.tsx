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

export const Architecture3DModel: React.FC<Architecture3DModelProps> = ({
  expansionProgress,
  isVisible,
  activeScrollLayer = null,
  layerScrubProgress = 0,
  shiftProgress = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [manualLayer, setManualLayer] = useState<number | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
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
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x: nx * 5, y: -ny * 3.5 });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  // Determine active layer: hover wins, then manual click, then active scroll layer
  const effectiveActiveLayer = hoveredLayer || manualLayer || activeScrollLayer || (shiftProgress > 0.15 ? 5 : null);
  const isWalkthroughActive = shiftProgress > 0.15 || manualLayer !== null;
  const activeData = effectiveActiveLayer ? ARCHITECTURE_LAYERS_DATA[effectiveActiveLayer] : null;

  // Compute vertical layer positioning directly from scroll expansion
  const layerGap = 48 + expansionProgress * 54;
  const baseY = 650; // Baseline Y in SVG coordinates (viewBox: 65 135 980 630)

  // Y coordinates for each layer (Layer 1 bottom -> Layer 5 top)
  const l1_Y = baseY;
  const l2_Y = baseY - layerGap * 1;
  const l3_Y = baseY - layerGap * 2;
  const l4_Y = baseY - layerGap * 3;
  const l5_Y = baseY - layerGap * 4;

  // Center coordinate of the isometric stack
  const cx = 515;
  const gw = 182; // Grid half-width along isometric X
  const gh = 88;  // Grid half-height along isometric Y
  const slabThick = 9; // 3D physical glass slab thickness

  // Helper to generate isometric diamond path centered at (cx, y)
  const getGridPath = (y: number) => {
    return `M ${cx} ${y - gh} L ${cx + gw} ${y} L ${cx} ${y + gh} L ${cx - gw} ${y} Z`;
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
    return effectiveActiveLayer === lvl ? 1 : 0.18;
  };

  const isLayerActive = (lvl: number) => {
    return isWalkthroughActive ? effectiveActiveLayer === lvl : false;
  };

  // Vertical camera focus translation: gently shifts stack to center whichever layer is active
  const stackTranslateY = isWalkthroughActive && effectiveActiveLayer
    ? effectiveActiveLayer <= 2
      ? -38
      : effectiveActiveLayer === 3
      ? -12
      : 18
    : 0;

  // Dynamic horizontal positioning: smoothly shifts model to the rightmost side during walkthrough
  const xShift = isWideScreen ? shiftProgress * 41 : shiftProgress * 6;
  const modelScale = isWideScreen ? 1 + shiftProgress * 0.14 : 1 + shiftProgress * 0.04;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full overflow-hidden select-none flex items-center justify-center"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.4s ease-out',
        background: 'radial-gradient(circle at 50% 48%, #081528 0%, #030812 100%)',
      }}
    >
      {/* ========================================================================= */}
      {/* 3D ISOMETRIC VIEWPORT CONTAINER: SAFE RIGHT TRANSLATION (NO OVERFLOW)      */}
      {/* ========================================================================= */}
      <div
        className="relative w-full max-w-[1520px] h-full max-h-[94vh] p-2 sm:p-4 flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1400px) rotateX(${mouseTilt.y}deg) rotateY(${mouseTilt.x}deg) translateX(${xShift}%) scale(${modelScale})`,
          transformOrigin: 'center center',
        }}
      >
        <svg
          viewBox="65 135 980 630"
          className="w-full h-full block"
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

            {/* Technical Cyan Point Light Filter */}
            <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Ambient Glass Slab Drop Shadow */}
            <filter id="slabShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#000000" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Master 3D Group with Dynamic Vertical Camera Focus */}
          <g
            transform={`translate(0, ${stackTranslateY})`}
            style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* ========================================================================= */}
            {/* 1. LEFT SIDE BRACKET TAXONOMY (Fades out cleanly as stage shifts right)   */}
            {/* ========================================================================= */}
            <g
              className="text-slate-300 font-sans transition-opacity duration-300"
              opacity={Math.max(0, 1 - shiftProgress * 2.5)}
            >
              {/* Top Bracket: "HOST PROCESS" */}
              <path
                d={`M 140 ${l5_Y - 48} L 122 ${l5_Y - 48} L 122 ${l5_Y + 44} L 140 ${l5_Y + 44}`}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />
              <text
                x="105"
                y={l5_Y - 2}
                fill="#7dd3fc"
                fontSize="12"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="0.18em"
                textAnchor="middle"
                transform={`rotate(-90 105 ${l5_Y - 2})`}
              >
                HOST
              </text>

              {/* Layer 5 Label: HOST PROCESS BOUNDARY */}
              <g className="cursor-pointer">
                <rect x="148" y={l5_Y - 32} width="168" height="52" rx="8" fill="transparent" />
                <text x="156" y={l5_Y - 14} fill="#e2e8f0" fontSize="13.5" fontFamily="monospace" fontWeight="bold">
                  HOST PROCESS
                </text>
                <text x="156" y={l5_Y + 3} fill="#94a3b8" fontSize="11" fontFamily="sans-serif">
                  Agent Loop, MCP Client
                </text>
                <text x="156" y={l5_Y + 17} fill="#64748b" fontSize="10" fontFamily="sans-serif">
                  &amp; Custom Applications
                </text>
              </g>

              {/* Lower Bracket: "INFRASTRUCTURE" */}
              <path
                d={`M 140 ${l4_Y - 44} L 122 ${l4_Y - 44} L 122 ${(l4_Y + l1_Y) / 2} L 112 ${(l4_Y + l1_Y) / 2} L 122 ${(l4_Y + l1_Y) / 2} L 122 ${l1_Y + 48} L 140 ${l1_Y + 48}`}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />
              <text
                x="95"
                y={(l4_Y + l1_Y) / 2}
                fill="#7dd3fc"
                fontSize="12"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="0.18em"
                textAnchor="middle"
                transform={`rotate(-90 95 ${(l4_Y + l1_Y) / 2})`}
              >
                INFRASTRUCTURE
              </text>

              {/* Layer 4 Label */}
              <g className="cursor-pointer">
                <rect x="148" y={l4_Y - 30} width="168" height="52" rx="8" fill="transparent" />
                <text x="156" y={l4_Y - 12} fill="#e2e8f0" fontSize="13.5" fontFamily="monospace" fontWeight="bold">
                  PUBLIC CLIENT API
                </text>
                <text x="156" y={l4_Y + 4} fill="#94a3b8" fontSize="11" fontFamily="sans-serif">
                  Python (DBOS) &amp; Go (Temporal)
                </text>
                <text x="156" y={l4_Y + 18} fill="#64748b" fontSize="10" fontFamily="sans-serif">
                  Step Lifecycle &amp; Replay API
                </text>
              </g>

              {/* Layer 3 Label */}
              <g className="cursor-pointer">
                <rect x="148" y={l3_Y - 30} width="168" height="52" rx="8" fill="transparent" />
                <text x="156" y={l3_Y - 12} fill="#38bdf8" fontSize="13.5" fontFamily="monospace" fontWeight="bold">
                  IR CORE BOUNDARY
                </text>
                <text x="156" y={l3_Y + 4} fill="#94a3b8" fontSize="11" fontFamily="sans-serif">
                  Fail-Closed Effect Matrix
                </text>
                <text x="156" y={l3_Y + 18} fill="#64748b" fontSize="10" fontFamily="sans-serif">
                  Block &amp; Gate • Sandbox (R06)
                </text>
              </g>

              {/* Layer 2 Label */}
              <g className="cursor-pointer">
                <rect x="148" y={l2_Y - 30} width="168" height="52" rx="8" fill="transparent" />
                <text x="156" y={l2_Y - 12} fill="#e2e8f0" fontSize="13.5" fontFamily="monospace" fontWeight="bold">
                  NODELOG &amp; CAS
                </text>
                <text x="156" y={l2_Y + 4} fill="#94a3b8" fontSize="11" fontFamily="sans-serif">
                  Append-Only Merkle History
                </text>
                <text x="156" y={l2_Y + 18} fill="#64748b" fontSize="10" fontFamily="sans-serif">
                  Portable .tir Archive Manifests
                </text>
              </g>

              {/* Layer 1 Label */}
              <g className="cursor-pointer">
                <rect x="148" y={l1_Y - 30} width="168" height="52" rx="8" fill="transparent" />
                <text x="156" y={l1_Y - 12} fill="#e2e8f0" fontSize="13.5" fontFamily="monospace" fontWeight="bold">
                  RUNTIME STREAM
                </text>
                <text x="156" y={l1_Y + 4} fill="#94a3b8" fontSize="11" fontFamily="sans-serif">
                  Worker I/O, Tool Execution
                </text>
                <text x="156" y={l1_Y + 18} fill="#64748b" fontSize="10" fontFamily="sans-serif">
                  &amp; Durable Storage Backends
                </text>
              </g>
            </g>

            {/* ========================================================================= */}
            {/* 2. LAYER 1 (BOTTOM): RUNTIME STREAM & DURABLE EXECUTION TIMELINE          */}
            {/* ========================================================================= */}
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => setManualLayer(1)}
              opacity={getLayerOpacity(1)}
            >
              {/* 3D Glass Slab Bevels */}
              <path d={getLeftSlabPath(l1_Y)} fill="#091b33" stroke="#1e3a5f" strokeWidth="1" />
              <path d={getRightSlabPath(l1_Y)} fill="#061224" stroke="#1e3a5f" strokeWidth="1" />

              {/* Glass Slab Surface */}
              <path
                d={getGridPath(l1_Y)}
                fill="#081426"
                fillOpacity="0.92"
                stroke="#38bdf8"
                strokeWidth={isLayerActive(1) ? '3' : '1.4'}
                strokeOpacity={isLayerActive(1) ? '1' : '0.5'}
                filter={isLayerActive(1) ? 'url(#cyanGlow)' : 'url(#slabShadow)'}
              />

              {/* Corner Registration Crosshairs */}
              <path d={`M ${cx} ${l1_Y - gh + 12} L ${cx} ${l1_Y - gh} L ${cx + 12} ${l1_Y - gh + 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />
              <path d={`M ${cx + gw - 12} ${l1_Y - 6} L ${cx + gw} ${l1_Y} L ${cx + gw - 12} ${l1_Y + 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />
              <path d={`M ${cx} ${l1_Y + gh - 12} L ${cx} ${l1_Y + gh} L ${cx - 12} ${l1_Y + gh - 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />
              <path d={`M ${cx - gw + 12} ${l1_Y + 6} L ${cx - gw} ${l1_Y} L ${cx - gw + 12} ${l1_Y - 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />

              {/* Left Durable Engine: DBOS (Python) */}
              <g transform={`translate(${cx - 85}, ${l1_Y - 12})`}>
                <rect x="-42" y="-14" width="84" height="28" rx="6" fill="#0c1a30" stroke="#38bdf8" strokeWidth="1" />
                <circle cx="-28" cy="0" r="3" fill="#10b981" />
                <text x="6" y="4" fill="#e2e8f0" fontSize="10.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  DBOS ENGINE
                </text>
                <text x="0" y="24" fill="#64748b" fontSize="8.5" fontFamily="sans-serif" textAnchor="middle">
                  Python Durable Store
                </text>
              </g>

              {/* Right Durable Engine: Temporal (Go) */}
              <g transform={`translate(${cx + 85}, ${l1_Y - 12})`}>
                <rect x="-46" y="-14" width="92" height="28" rx="6" fill="#0c1a30" stroke="#38bdf8" strokeWidth="1" />
                <circle cx="-32" cy="0" r="3" fill="#10b981" />
                <text x="6" y="4" fill="#e2e8f0" fontSize="10.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  TEMPORAL GO
                </text>
                <text x="0" y="24" fill="#64748b" fontSize="8.5" fontFamily="sans-serif" textAnchor="middle">
                  Go Workflow Replay
                </text>
              </g>

              {/* Central Chronological Coordinate Timeline Rail */}
              <g transform={`translate(${cx}, ${l1_Y + 12})`}>
                {/* Main Rail Line */}
                <line x1="-90" y1="0" x2="90" y2="0" stroke="#38bdf8" strokeWidth="1.8" strokeDasharray="4 4" strokeOpacity="0.7" />
                
                {/* Step Ticks 0 to 7 */}
                {['0', '1', '2', '3', '4', '5', '6', '7'].map((step, idx) => {
                  const sX = -84 + idx * 24;
                  return (
                    <g key={`step-tick-${idx}`} transform={`translate(${sX}, 0)`}>
                      <circle cx="0" cy="0" r="2.5" fill="#38bdf8" />
                      <text x="0" y="14" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                        {step}
                      </text>
                    </g>
                  );
                })}

                {/* Timeline Direction Label */}
                <text x="0" y="28" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  EXECUTION TIMELINE ➔
                </text>
              </g>
            </g>

            {/* ========================================================================= */}
            {/* 3. CLEAN VERTICAL DATA BUS (Layer 1 -> Layer 2)                           */}
            {/* ========================================================================= */}
            <g opacity={isWalkthroughActive && (effectiveActiveLayer === 1 || effectiveActiveLayer === 2) ? 0.9 : 0.25} className="transition-opacity duration-300">
              <line x1={cx - 50} y1={l1_Y - 14} x2={cx - 40} y2={l2_Y + 20} stroke="#38bdf8" strokeWidth="1.6" strokeDasharray="6 8" className="animate-data-pulse" />
              <line x1={cx} y1={l1_Y - 14} x2={cx} y2={l2_Y + 20} stroke="#7dd3fc" strokeWidth="2" strokeDasharray="8 10" className="animate-data-pulse" />
              <line x1={cx + 50} y1={l1_Y - 14} x2={cx + 40} y2={l2_Y + 20} stroke="#38bdf8" strokeWidth="1.6" strokeDasharray="6 8" className="animate-data-pulse-fast" />
            </g>

            {/* ========================================================================= */}
            {/* 4. LAYER 2: NODELOG & CONTENT-ADDRESSED STORAGE (CAS)                     */}
            {/* ========================================================================= */}
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => setManualLayer(2)}
              opacity={getLayerOpacity(2)}
            >
              {/* 3D Glass Slab Bevels */}
              <path d={getLeftSlabPath(l2_Y)} fill="#071829" stroke="#1e3a5f" strokeWidth="1" />
              <path d={getRightSlabPath(l2_Y)} fill="#05101c" stroke="#1e3a5f" strokeWidth="1" />

              {/* Glass Slab Surface */}
              <path
                d={getGridPath(l2_Y)}
                fill="#081426"
                fillOpacity="0.92"
                stroke="#38bdf8"
                strokeWidth={isLayerActive(2) ? '3' : '1.4'}
                strokeOpacity={isLayerActive(2) ? '1' : '0.5'}
                filter={isLayerActive(2) ? 'url(#cyanGlow)' : 'url(#slabShadow)'}
              />

              {/* Corner Etches */}
              <path d={`M ${cx} ${l2_Y - gh + 12} L ${cx} ${l2_Y - gh} L ${cx + 12} ${l2_Y - gh + 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />
              <path d={`M ${cx + gw - 12} ${l2_Y - 6} L ${cx + gw} ${l2_Y} L ${cx + gw - 12} ${l2_Y + 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />
              <path d={`M ${cx} ${l2_Y + gh - 12} L ${cx} ${l2_Y + gh} L ${cx - 12} ${l2_Y + gh - 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />
              <path d={`M ${cx - gw + 12} ${l2_Y + 6} L ${cx - gw} ${l2_Y} L ${cx - gw + 12} ${l2_Y - 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />

              {/* Left Side: Merkle History DAG Node Chain */}
              <g transform={`translate(${cx - 55}, ${l2_Y})`}>
                {/* Connecting Links */}
                <line x1="-38" y1="0" x2="-8" y2="0" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
                <line x1="8" y1="0" x2="38" y2="0" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />

                {/* Node 1: DECISION */}
                <g transform="translate(-45, 0)">
                  <circle cx="0" cy="0" r="8" fill="#0f2744" stroke="#38bdf8" strokeWidth="1.4" />
                  <text x="0" y="17" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    DECISION
                  </text>
                </g>

                {/* Node 2: TOOL_CALL */}
                <g transform="translate(0, 0)">
                  <circle cx="0" cy="0" r="8" fill="#0284c7" stroke="#7dd3fc" strokeWidth="1.4" />
                  <text x="0" y="17" fill="#7dd3fc" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    TOOL_CALL
                  </text>
                </g>

                {/* Node 3: OBSERVATION */}
                <g transform="translate(45, 0)">
                  <circle cx="0" cy="0" r="8" fill="#0f2744" stroke="#38bdf8" strokeWidth="1.4" />
                  <text x="0" y="17" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    OBSERVE
                  </text>
                </g>

                <text x="0" y="-15" fill="#94a3b8" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  CONTENT-ADDRESSED MERKLE DAG
                </text>
              </g>

              {/* Right Side: Universal .tir Package Container */}
              <g transform={`translate(${cx + 90}, ${l2_Y - 4})`}>
                {/* Clean Isometric 3D Storage Archive */}
                <polygon points="0,-14 24,-7 0,0 -24,-7" fill="#0284c7" stroke="#7dd3fc" strokeWidth="1.2" />
                <polygon points="-24,-7 0,0 0,16 -24,9" fill="#0369a1" />
                <polygon points="0,0 24,-7 24,9 0,16" fill="#075985" />
                <text x="0" y="27" fill="#bae6fd" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  .tir PACKAGE
                </text>
                <text x="0" y="37" fill="#64748b" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
                  Universal Run Archive
                </text>
              </g>
            </g>

            {/* ========================================================================= */}
            {/* 5. CLEAN DUAL DATA PIPES (Layer 4 -> Layer 3)                             */}
            {/* ========================================================================= */}
            <g opacity={isWalkthroughActive && effectiveActiveLayer === 3 ? 0.95 : 0.3} className="transition-opacity duration-300">
              {/* Left Pipe: Safe Read Flow */}
              <line x1={cx - 60} y1={l4_Y + 12} x2={cx - 60} y2={l3_Y - 14} stroke="#38bdf8" strokeWidth="2.5" strokeOpacity="0.8" />
              <text x={cx - 72} y={(l4_Y + l3_Y) / 2 + 3} fill="#7dd3fc" fontSize="8.5" fontFamily="monospace" textAnchor="end" fontWeight="bold">
                SAFE READ ➔
              </text>

              {/* Right Pipe: Mutative Write Flow */}
              <line x1={cx + 60} y1={l4_Y + 12} x2={cx + 60} y2={l3_Y - 14} stroke="#38bdf8" strokeWidth="2.5" strokeOpacity="0.8" />
              <text x={cx + 72} y={(l4_Y + l3_Y) / 2 + 3} fill="#7dd3fc" fontSize="8.5" fontFamily="monospace" textAnchor="start" fontWeight="bold">
                ➔ MUTATION
              </text>
            </g>

            {/* ========================================================================= */}
            {/* 6. LAYER 3: IR CORE RESUME GATE & POLICY ENFORCER                         */}
            {/* ========================================================================= */}
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => setManualLayer(3)}
              opacity={getLayerOpacity(3)}
            >
              {/* 3D Glass Slab Bevels */}
              <path d={getLeftSlabPath(l3_Y)} fill="#061a30" stroke="#1e3a5f" strokeWidth="1" />
              <path d={getRightSlabPath(l3_Y)} fill="#041121" stroke="#1e3a5f" strokeWidth="1" />

              {/* Glass Slab Surface */}
              <path
                d={getGridPath(l3_Y)}
                fill="#071322"
                fillOpacity="0.92"
                stroke="#38bdf8"
                strokeWidth={isLayerActive(3) ? '3' : '1.4'}
                strokeOpacity={isLayerActive(3) ? '1' : '0.5'}
                filter={isLayerActive(3) ? 'url(#cyanGlow)' : 'url(#slabShadow)'}
              />

              {/* Corner Etches */}
              <path d={`M ${cx} ${l3_Y - gh + 12} L ${cx} ${l3_Y - gh} L ${cx + 12} ${l3_Y - gh + 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />
              <path d={`M ${cx + gw - 12} ${l3_Y - 6} L ${cx + gw} ${l3_Y} L ${cx + gw - 12} ${l3_Y + 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />
              <path d={`M ${cx} ${l3_Y + gh - 12} L ${cx} ${l3_Y + gh} L ${cx - 12} ${l3_Y + gh - 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />
              <path d={`M ${cx - gw + 12} ${l3_Y + 6} L ${cx - gw} ${l3_Y} L ${cx - gw + 12} ${l3_Y - 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />

              {/* Center: Prominent Security Gate Shield */}
              <g transform={`translate(${cx}, ${l3_Y - 6})`}>
                <polygon points="0,-18 26,-9 0,0 -26,-9" fill="#0284c7" stroke="#7dd3fc" strokeWidth="1.4" />
                <polygon points="-26,-9 0,0 0,18 -26,9" fill="#0369a1" />
                <polygon points="0,0 26,-9 26,9 0,18" fill="#075985" />
                <circle cx="0" cy="-4" r="3.5" fill="#38bdf8" filter="url(#cyanGlow)" />
                <text x="0" y="30" fill="#7dd3fc" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  FAIL-CLOSED GATE
                </text>
                <text x="0" y="42" fill="#64748b" fontSize="8.5" fontFamily="sans-serif" textAnchor="middle">
                  Spec Rule R06 Security Arbiter
                </text>
              </g>

              {/* Left Branch: PURE Actions Pass */}
              <g transform={`translate(${cx - 70}, ${l3_Y - 2})`}>
                <rect x="-30" y="-11" width="60" height="22" rx="5" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                <text x="0" y="3.5" fill="#a7f3d0" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  PURE (PASS)
                </text>
              </g>

              {/* Right Branch: MUTATIVE Actions Checked */}
              <g transform={`translate(${cx + 70}, ${l3_Y - 2})`}>
                <rect x="-35" y="-11" width="70" height="22" rx="5" fill="#0f2744" stroke="#38bdf8" strokeWidth="1" />
                <text x="0" y="3.5" fill="#bae6fd" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  IDEMPOTENT
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
              {/* 3D Glass Slab Bevels */}
              <path d={getLeftSlabPath(l4_Y)} fill="#0a1a36" stroke="#1e3a5f" strokeWidth="1" />
              <path d={getRightSlabPath(l4_Y)} fill="#061226" stroke="#1e3a5f" strokeWidth="1" />

              {/* Glass Slab Surface */}
              <path
                d={getGridPath(l4_Y)}
                fill="#081426"
                fillOpacity="0.92"
                stroke="#38bdf8"
                strokeWidth={isLayerActive(4) ? '3' : '1.4'}
                strokeOpacity={isLayerActive(4) ? '1' : '0.5'}
                filter={isLayerActive(4) ? 'url(#cyanGlow)' : 'url(#slabShadow)'}
              />

              {/* Corner Etches */}
              <path d={`M ${cx} ${l4_Y - gh + 12} L ${cx} ${l4_Y - gh} L ${cx + 12} ${l4_Y - gh + 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />
              <path d={`M ${cx + gw - 12} ${l4_Y - 6} L ${cx + gw} ${l4_Y} L ${cx + gw - 12} ${l4_Y + 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />
              <path d={`M ${cx} ${l4_Y + gh - 12} L ${cx} ${l4_Y + gh} L ${cx - 12} ${l4_Y + gh - 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />
              <path d={`M ${cx - gw + 12} ${l4_Y + 6} L ${cx - gw} ${l4_Y} L ${cx - gw + 12} ${l4_Y - 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />

              {/* Center: RFC 8785 Canonicalizer */}
              <g transform={`translate(${cx}, ${l4_Y - 8})`}>
                <rect x="-55" y="-12" width="110" height="24" rx="5" fill="#0f2744" stroke="#7dd3fc" strokeWidth="1" />
                <text x="0" y="4" fill="#7dd3fc" fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  RFC 8785 CANONICALIZER
                </text>
              </g>

              {/* Left SDK Adapter: Python DBOS */}
              <g transform={`translate(${cx - 85}, ${l4_Y + 12})`}>
                <rect x="-42" y="-13" width="84" height="26" rx="5" fill="#0c1a30" stroke="#38bdf8" strokeWidth="1" />
                <text x="0" y="4" fill="#e2e8f0" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  PYTHON SDK
                </text>
                <text x="0" y="22" fill="#64748b" fontSize="8.5" fontFamily="sans-serif" textAnchor="middle">
                  DBOS Framework
                </text>
              </g>

              {/* Right SDK Adapter: Go Temporal */}
              <g transform={`translate(${cx + 85}, ${l4_Y + 12})`}>
                <rect x="-42" y="-13" width="84" height="26" rx="5" fill="#0c1a30" stroke="#38bdf8" strokeWidth="1" />
                <text x="0" y="4" fill="#e2e8f0" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  GO SDK
                </text>
                <text x="0" y="22" fill="#64748b" fontSize="8.5" fontFamily="sans-serif" textAnchor="middle">
                  Temporal Framework
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
              {/* 3D Glass Slab Bevels */}
              <path d={getLeftSlabPath(l5_Y)} fill="#0a1a36" stroke="#1e3a5f" strokeWidth="1" />
              <path d={getRightSlabPath(l5_Y)} fill="#061226" stroke="#1e3a5f" strokeWidth="1" />

              {/* Glass Slab Surface */}
              <path
                d={getGridPath(l5_Y)}
                fill="#081426"
                fillOpacity="0.95"
                stroke="#38bdf8"
                strokeWidth={isLayerActive(5) ? '3.2' : '1.6'}
                strokeOpacity={isLayerActive(5) ? '1' : '0.6'}
                filter={isLayerActive(5) ? 'url(#cyanGlow)' : 'url(#slabShadow)'}
              />

              {/* Corner Etches */}
              <path d={`M ${cx} ${l5_Y - gh + 12} L ${cx} ${l5_Y - gh} L ${cx + 12} ${l5_Y - gh + 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.9" />
              <path d={`M ${cx + gw - 12} ${l5_Y - 6} L ${cx + gw} ${l5_Y} L ${cx + gw - 12} ${l5_Y + 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.9" />
              <path d={`M ${cx} ${l5_Y + gh - 12} L ${cx} ${l5_Y + gh} L ${cx - 12} ${l5_Y + gh - 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.9" />
              <path d={`M ${cx - gw + 12} ${l5_Y + 6} L ${cx - gw} ${l5_Y} L ${cx - gw + 12} ${l5_Y - 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.9" />

              {/* Central Server Node: HOST PROCESS ENGINE */}
              <g transform={`translate(${cx}, ${l5_Y - 24})`}>
                <polygon points="0,-16 28,-8 0,0 -28,-8" fill="#0f2744" stroke="#7dd3fc" strokeWidth="1.4" />
                <polygon points="-28,-8 0,0 0,16 -28,8" fill="#071829" />
                <polygon points="0,0 28,-8 28,8 0,16" fill="#0c1f36" />
                <circle cx="0" cy="-4" r="3" fill="#38bdf8" filter="url(#cyanGlow)" />
                <text x="0" y="27" fill="#e2e8f0" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  HOST PROCESS
                </text>
                <text x="0" y="38" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif" textAnchor="middle">
                  Agent Loop &amp; LLM Context
                </text>
              </g>

              {/* Left Side: INPUT STREAM */}
              <g transform={`translate(${cx - 75}, ${l5_Y + 4})`}>
                <rect x="-35" y="-12" width="70" height="24" rx="5" fill="#0c1a30" stroke="#38bdf8" strokeWidth="1" />
                <text x="0" y="4" fill="#7dd3fc" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  INPUT
                </text>
                <text x="0" y="21" fill="#64748b" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
                  Prompt &amp; Args
                </text>
              </g>

              {/* Right Side: SEALED DECISION (LOCKED) */}
              <g transform={`translate(${cx + 75}, ${l5_Y + 4})`}>
                <rect x="-48" y="-12" width="96" height="24" rx="5" fill="#0284c7" stroke="#7dd3fc" strokeWidth="1.2" />
                <text x="0" y="4" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  🔒 SEALED PLAN
                </text>
                <text x="0" y="21" fill="#bae6fd" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  seal_decision()
                </text>
              </g>
            </g>

            {/* ========================================================================= */}
            {/* 8. RIGHT SIDE TECHNICAL CALLOUTS (Visible in Overview, Fades in Walkthrough) */}
            {/* ========================================================================= */}
            <g
              className="text-slate-300 font-sans transition-opacity duration-300"
              opacity={Math.max(0, 1 - shiftProgress * 2.5)}
            >
              {/* Callout 1: Linear Known Args Rule */}
              <g>
                <polyline
                  points={`${cx + 52},${l5_Y - 60} ${cx + 105},${l5_Y - 60} 760,${l5_Y - 60}`}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                  strokeOpacity="0.6"
                />
                <circle cx={cx + 52} cy={l5_Y - 60} r="3" fill="#38bdf8" />
                <text x="770" y={l5_Y - 67} fill="#f1f5f9" fontSize="13" style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif", letterSpacing: '-0.02em' }} fontWeight="bold">
                  LINEAR KNOWN ARGS RULE
                </text>
                <text x="770" y={l5_Y - 51} fill="#93c5fd" fontSize="11" style={{ fontFamily: "var(--font-mono), monospace" }}>
                  Plan is frozen before tools execute;
                </text>
                <text x="770" y={l5_Y - 37} fill="#94a3b8" fontSize="10.5" style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
                  tool B dependent on tool A belongs in next step
                </text>
              </g>

              {/* Callout 2: Typed Node Schemas */}
              <g>
                <polyline
                  points={`${cx + 70},${l5_Y - 15} ${cx + 130},${l5_Y - 15} 760,${l5_Y - 15}`}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                  strokeOpacity="0.6"
                />
                <circle cx={cx + 70} cy={l5_Y - 15} r="3" fill="#38bdf8" />
                <text x="770" y={l5_Y - 20} fill="#f1f5f9" fontSize="13" style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif", letterSpacing: '-0.02em' }} fontWeight="bold">
                  TYPED NODE SCHEMAS
                </text>
                <text x="770" y={l5_Y - 5} fill="#93c5fd" fontSize="11" style={{ fontFamily: "var(--font-mono), monospace" }}>
                  INPUT, CONSTRAINT, DECISION, TOOL_CALL
                </text>
                <text x="770" y={l5_Y + 9} fill="#94a3b8" fontSize="10.5" style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
                  THOUGHT is private reasoning (never grafted)
                </text>
              </g>

              {/* Callout 3: RFC 8785 JCS Canonicalization */}
              <g>
                <polyline
                  points={`${cx + 60},${l4_Y - 10} ${cx + 140},${l4_Y - 10} 760,${l4_Y - 10}`}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                  strokeOpacity="0.6"
                />
                <circle cx={cx + 60} cy={l4_Y - 10} r="3" fill="#38bdf8" />
                <text x="770" y={l4_Y - 16} fill="#f1f5f9" fontSize="13" style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif", letterSpacing: '-0.02em' }} fontWeight="bold">
                  RFC 8785 JCS CANONICALIZATION
                </text>
                <text x="770" y={l4_Y} fill="#93c5fd" fontSize="11" style={{ fontFamily: "var(--font-mono), monospace" }}>
                  node_id = sha256(tenant | traj | payload)
                </text>
                <text x="770" y={l4_Y + 14} fill="#94a3b8" fontSize="10.5" style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
                  Identical hash invariant across Python &amp; Go
                </text>
              </g>

              {/* Callout 4: Fail-Closed Effect Matrix */}
              <g>
                <polyline
                  points={`${cx + 55},${l3_Y} ${cx + 145},${l3_Y} 760,${l3_Y}`}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                  strokeOpacity="0.6"
                />
                <circle cx={cx + 55} cy={l3_Y} r="3" fill="#38bdf8" />
                <text x="770" y={l3_Y - 8} fill="#38bdf8" fontSize="13" style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif", letterSpacing: '-0.02em' }} fontWeight="bold">
                  FAIL-CLOSED EFFECT MATRIX
                </text>
                <text x="770" y={l3_Y + 7} fill="#93c5fd" fontSize="11" style={{ fontFamily: "var(--font-mono), monospace" }}>
                  NON_IDEMPOTENT_WRITE triggers Block &amp; Gate
                </text>
                <text x="770" y={l3_Y + 21} fill="#94a3b8" fontSize="10.5" style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
                  Sandbox Mode (R06) rejects real mutations
                </text>
              </g>

              {/* Callout 5: Universal .tir Package */}
              <g>
                <polyline
                  points={`${cx + 50},${l2_Y} ${cx + 120},${l2_Y + 20} 760,${l2_Y + 20}`}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                  strokeOpacity="0.6"
                />
                <circle cx={cx + 50} cy={l2_Y} r="3" fill="#38bdf8" />
                <text x="770" y={l2_Y + 12} fill="#f1f5f9" fontSize="13" style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif", letterSpacing: '-0.02em' }} fontWeight="bold">
                  UNIVERSAL .TIR PACKAGE
                </text>
                <text x="770" y={l2_Y + 27} fill="#93c5fd" fontSize="11" style={{ fontFamily: "var(--font-mono), monospace" }}>
                  manifest.json + nodes.ndjson + CAS blobs
                </text>
                <text x="770" y={l2_Y + 41} fill="#94a3b8" fontSize="10.5" style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
                  Ed25519 signatures (trajir-pkg-sig-v1)
                </text>
              </g>

              {/* Callout 6: Crash Replay without Drift */}
              <g>
                <polyline
                  points={`${cx + 60},${l1_Y} ${cx + 130},${l1_Y + 15} 760,${l1_Y + 15}`}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                  strokeOpacity="0.6"
                />
                <circle cx={cx + 60} cy={l1_Y} r="3" fill="#38bdf8" />
                <text x="770" y={l1_Y + 7} fill="#f1f5f9" fontSize="13" style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif", letterSpacing: '-0.02em' }} fontWeight="bold">
                  CRASH REPLAY &amp; RESUME
                </text>
                <text x="770" y={l1_Y + 22} fill="#93c5fd" fontSize="11" style={{ fontFamily: "var(--font-mono), monospace" }}>
                  Durable backend (DBOS / Temporal) re-executes
                </text>
                <text x="770" y={l1_Y + 36} fill="#94a3b8" fontSize="10.5" style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
                  Zero re-prompting: sealed decision replay
                </text>
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* LEFT-HAND DEEP-DIVE STORYTELLING CONSOLE (COMPACT & FITS ALL SCREENS)      */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* LEFT-HAND EDITORIAL SCHEMATIC CONSOLE (MATCHING DRAFTING & SERIF LAYOUT)  */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* LEFT-HAND PHYSICAL DOSSIER FOLDER STACK (ANIMATED SLIDE-UP PER LAYER)      */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* FULL-SPACE PHYSICAL DOSSIER FOLDER (COVERS ENTIRE NON-MODEL LEFT REGION)  */}
      {/* ========================================================================= */}
      <div
        className="absolute left-3 sm:left-6 lg:left-8 top-3 sm:top-5 lg:top-6 bottom-3 sm:bottom-5 lg:bottom-6 w-[94%] sm:w-[90%] lg:w-[53vw] xl:w-[54vw] 2xl:w-[55vw] z-20 pointer-events-auto flex flex-col justify-between overflow-hidden rounded-[28px]"
        style={{
          opacity: shiftProgress,
          transform: `translateX(${(1 - shiftProgress) * -35}px)`,
          pointerEvents: shiftProgress > 0.2 ? 'auto' : 'none',
        }}
      >
        {/* Ambient Refraction Backlight & Drafting Grid */}
        <div className="absolute -inset-12 bg-[radial-gradient(ellipse_at_30%_45%,rgba(56,189,248,0.22),rgba(14,165,233,0.08)_50%,transparent_75%)] blur-3xl pointer-events-none -z-10" />
        <div className="absolute -inset-4 bg-[linear-gradient(to_right,rgba(56,189,248,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.07)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50 -z-10 rounded-3xl" />

        {/* CONTINUOUS PHYSICAL 5-FOLDER STACK (All folders remain mounted with full contents) */}
        {[5, 4, 3, 2, 1].map((lvl) => {
          const layerData = ARCHITECTURE_LAYERS_DATA[lvl];
          const layerIndex = 5 - lvl; // 0 for Layer 5, 1 for Layer 4, 2 for Layer 3, 3 for Layer 2, 4 for Layer 1
          const stepIndent = isWideScreen ? 34 : 16;
          const leftIndentPx = layerIndex * stepIndent;

          // A folder is revealed if it is at or below the current scroll layer (or if Layer 5 is the base)
          const isRevealed = effectiveActiveLayer ? lvl >= effectiveActiveLayer : lvl === 5;
          const isTop = effectiveActiveLayer === lvl;

          // Compute horizontal position of elevated tab for this folder so tabs never overlap
          const tabSlotW = isWideScreen ? 134 : 58;
          const screenTabX = layerIndex * tabSlotW;
          const tabLeftInside = Math.max(0, screenTabX - leftIndentPx);

          return (
            <div
              key={`physical-folder-${lvl}`}
              onClick={() => {
                if (!isTop) setManualLayer(lvl);
              }}
              className={`absolute top-0 bottom-0 flex flex-col justify-between select-none ${
                isTop ? 'pointer-events-auto' : 'cursor-pointer pointer-events-auto'
              }`}
              style={{
                left: `${leftIndentPx}px`,
                width: `calc(100% - ${leftIndentPx}px)`,
                zIndex: 10 + layerIndex * 2,
                transform: isRevealed
                  ? isTop
                    ? 'translate3d(0, 0%, 0)'
                    : `translate3d(0, -${(effectiveActiveLayer ? lvl - effectiveActiveLayer : 0) * 5}px, 0) scale(${1 - (effectiveActiveLayer ? lvl - effectiveActiveLayer : 0) * 0.012})`
                  : 'translate3d(0, 102%, 0)',
                opacity: isRevealed ? 1 : 0,
                transition: 'transform 0.82s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease-out, filter 0.4s ease',
                filter: isTop ? 'brightness(1)' : 'brightness(0.78) saturate(1.05)',
                willChange: 'transform',
              }}
              title={!isTop ? `Click to view Layer 0${lvl}` : undefined}
            >
              {/* TOP FOLDER TAB & SHOULDER (Physical Staggered Dossier Tabs) */}
              <div className="relative w-full flex items-end shrink-0 z-10 h-[48px]">
                {/* 1. Pre-Tab Left Shoulder (if tab is offset from the left edge) */}
                {tabLeftInside > 0 && (
                  <div
                    className="h-[28px] self-end rounded-tl-[16px] backdrop-blur-xl border-t border-l"
                    style={{
                      width: `${tabLeftInside}px`,
                      background: isTop
                        ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(14, 38, 66, 0.35) 100%)'
                        : 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(10, 26, 48, 0.22) 100%)',
                      borderColor: isTop ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.12)',
                    }}
                  />
                )}

                {/* S-curve transition UP to tab (only if tab has a left shoulder) */}
                {tabLeftInside > 0 && (
                  <svg className="w-7 h-[48px] shrink-0 -ml-[1px] -mr-[1px] self-end" viewBox="0 0 28 48" fill="none">
                    <path
                      d="M 0 20 C 10 20 18 0 28 0 L 28 48 L 0 48 Z"
                      fill={isTop ? 'rgba(14, 38, 66, 0.55)' : 'rgba(10, 26, 48, 0.4)'}
                    />
                    <path
                      d="M 0 20 C 10 20 18 0 28 0"
                      stroke={isTop ? 'rgba(255, 255, 255, 0.35)' : 'rgba(255, 255, 255, 0.15)'}
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                )}

                {/* 2. The Elevated Folder Tab */}
                <div
                  className={`relative h-[48px] px-3.5 sm:px-4 ${tabLeftInside === 0 ? 'rounded-tl-[20px]' : ''} flex items-center gap-2 backdrop-blur-2xl transition-all`}
                  style={{
                    background: isTop
                      ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(14, 38, 66, 0.6) 100%)'
                      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(10, 26, 48, 0.4) 100%)',
                    borderTop: isTop ? '1.5px solid rgba(255, 255, 255, 0.42)' : '1px solid rgba(255, 255, 255, 0.2)',
                    borderLeft: tabLeftInside === 0
                      ? isTop ? '1.5px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.15)'
                      : 'none',
                    boxShadow: isTop
                      ? 'inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.35), 0 -6px 20px rgba(56, 189, 248, 0.2)'
                      : 'none',
                  }}
                >
                  {/* Mini macOS Folder Glyph */}
                  <svg className="w-3.5 h-3.5 text-sky-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                  <span
                    className={`text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${
                      isTop ? 'text-sky-200' : 'text-sky-300/80'
                    }`}
                  >
                    {isWideScreen ? `0${lvl} // ${layerData.name.split(' ')[0]}` : `0${lvl}`}
                  </span>
                </div>

                {/* S-curve transition DOWN from tab to right shoulder */}
                <svg className="w-7 h-[48px] shrink-0 -ml-[1px] -mr-[1px] self-end" viewBox="0 0 28 48" fill="none">
                  <path
                    d="M 0 0 C 10 0 18 20 28 20 L 28 48 L 0 48 Z"
                    fill={isTop ? 'rgba(14, 38, 66, 0.55)' : 'rgba(10, 26, 48, 0.4)'}
                  />
                  <path
                    d="M 0 0 C 10 0 18 20 28 20"
                    stroke={isTop ? 'rgba(255, 255, 255, 0.35)' : 'rgba(255, 255, 255, 0.15)'}
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>

                {/* 3. Lower Right Shoulder */}
                <div
                  className="flex-1 h-[28px] self-end rounded-tr-[20px] backdrop-blur-xl"
                  style={{
                    background: isTop
                      ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(14, 38, 66, 0.35) 100%)'
                      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(10, 26, 48, 0.22) 100%)',
                    borderTop: isTop ? '1.5px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(255, 255, 255, 0.15)',
                    borderRight: isTop ? '1.5px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
                  }}
                />
              </div>

              {/* MAIN FOLDER BODY (Opaque Smoked Glassmorphism Chamber) */}
              <div
                className="relative flex-1 w-full -mt-[1px] rounded-b-[28px] rounded-tr-[22px] rounded-tl-[6px] backdrop-blur-2xl overflow-hidden flex flex-col justify-between"
                style={{
                  background: isTop
                    ? 'linear-gradient(140deg, #0e2744 0%, #081729 45%, #040c16 100%)'
                    : 'linear-gradient(140deg, #0a1b30 0%, #05101c 45%, #02070d 100%)',
                  border: isTop ? '1.5px solid rgba(255, 255, 255, 0.28)' : '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: isTop
                    ? 'inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.3), inset 0 0 24px 0 rgba(56, 189, 248, 0.1), 0 30px 80px rgba(0, 0, 0, 0.85), 0 0 50px rgba(56, 189, 248, 0.2)'
                    : 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), 0 15px 40px rgba(0, 0, 0, 0.6)',
                }}
              >
                {/* Internal Diagonal Glass Sheen & Refraction Gradient */}
                <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_28%,transparent_60%)] pointer-events-none rounded-[inherit]" />

                {/* Front Pocket Top Highlight Lip (Luminous leading edge that glides up during slide animation) */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-sky-400 via-white to-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)] z-30 pointer-events-none" />

                {/* Tactile Left Spine Index (Visible in the exposed step when folders stack) */}
                <div
                  className="absolute left-0 top-0 bottom-0 flex flex-col items-center justify-between py-6 border-r border-white/10 z-20 pointer-events-auto group hover:bg-sky-500/10 transition-colors"
                  style={{ width: `${stepIndent}px` }}
                  onClick={(e) => {
                    if (!isTop) {
                      e.stopPropagation();
                      setManualLayer(lvl);
                    }
                  }}
                  title={`View Layer 0${lvl}: ${layerData.name}`}
                >
                  <div className="flex flex-col items-center gap-1.5 pt-2">
                    <span className={`w-2 h-2 rounded-full ${isTop ? 'bg-sky-400 shadow-[0_0_8px_#38bdf8]' : 'bg-sky-400/60 group-hover:bg-sky-300'}`} />
                    <span className="text-[10px] font-mono font-bold text-sky-300/90 group-hover:text-white">
                      0{lvl}
                    </span>
                  </div>

                  <div className="pb-2 text-[9px] font-mono text-sky-400/50 font-semibold">
                    TIR
                  </div>
                </div>

                {/* Inside Document Sheet Chamber - Render text ONLY for the active folder */}
                {isTop ? (
                  <div
                    className="w-full h-full p-6 sm:p-9 lg:p-11 xl:p-12 flex flex-col justify-between overflow-y-auto relative z-10 animate-fade-in"
                    style={{ paddingLeft: `${stepIndent + 28}px` }}
                  >
                    {/* Top Ambient Edge Highlight */}
                    <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-sky-400 via-sky-300/60 to-transparent pointer-events-none" />

                    {/* Dossier Header Rule */}
                    <div className="flex items-center pb-4 mb-5 border-b border-white/15 shrink-0">
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-sky-300">
                        <span className="font-bold uppercase tracking-wider text-sky-400">SPECIFICATION DOSSIER</span>
                        <span className="text-white/20 select-none">|</span>
                        <span className="font-serif italic text-sky-200 text-sm sm:text-base">
                          Layer 0{layerData.id} Architecture
                        </span>
                      </div>
                    </div>

                    {/* Editorial Headline & Subtitle */}
                    <div className="mb-6 shrink-0">
                      <h3
                        className="text-2xl sm:text-3xl lg:text-[2.35rem] xl:text-[2.65rem] font-serif text-white leading-tight tracking-tight mb-2.5"
                        style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                      >
                        <span>{layerData.editorialPrefix} </span>
                        <span className="text-sky-300 italic underline decoration-sky-400/50 decoration-1 underline-offset-4">
                          {layerData.editorialHighlight}
                        </span>{' '}
                        <span>{layerData.editorialSuffix}</span>
                      </h3>
                      <div className="text-xs sm:text-sm font-mono text-slate-400 tracking-wider uppercase">
                        Role: <span className="text-sky-300">{layerData.subtitle}</span>
                      </div>
                    </div>

                    {/* Clean Editorial Text Only */}
                    <div className="flex-1 space-y-5 pr-2">
                      <div className="text-lg sm:text-xl lg:text-2xl font-serif italic text-sky-200 font-medium">
                        {layerData.editorialCardTitle}
                      </div>
                      <p className="text-[15px] sm:text-base lg:text-[17px] text-slate-200/90 leading-relaxed font-sans font-normal">
                        {layerData.editorialCardBody}
                      </p>
                      <p className="text-[15px] sm:text-base lg:text-[17px] text-slate-300/85 leading-relaxed font-sans font-normal">
                        {layerData.description}
                      </p>
                    </div>

                    {/* Dossier Footer */}
                    <div className="flex items-center justify-between pt-5 mt-auto border-t border-white/10 text-xs sm:text-[13px] font-mono text-slate-400 shrink-0">
                      <span className="text-sky-400/80 font-medium tracking-wider">
                        @trajectory_ir // CNCF_DURABLE_STANDARDS
                      </span>
                      <span className="font-semibold text-slate-200">
                        DOSSIER 0{layerData.id} / 05
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    className="w-full h-full p-6 sm:p-9 lg:p-11 xl:p-12 flex flex-col justify-between relative z-10"
                    style={{ paddingLeft: `${stepIndent + 28}px` }}
                  >
                    {/* Subtle Blueprint Watermark for Stacked Folders Behind */}
                    <div className="flex items-center pb-4 mb-5 border-b border-white/5 shrink-0 opacity-40">
                      <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">
                        ARCHIVED // LAYER 0{layerData.id}
                      </span>
                    </div>
                    <div className="flex-1" />
                    <div className="pt-4 border-t border-white/5 text-xs font-mono text-slate-500/30 opacity-40">
                      CNCF_DURABLE_STANDARDS
                    </div>
                  </div>
                )}

                {/* Authentic macOS Folder Bottom Crease (The expansion fold groove) */}
                <div className="absolute bottom-6 inset-x-8 h-[2px] bg-[#020a14] border-b border-sky-400/25 shadow-[0_-1px_3px_rgba(0,0,0,0.8)] pointer-events-none z-20" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
