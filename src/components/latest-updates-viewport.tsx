'use client';

import React, { useEffect, useRef, useState } from 'react';

const ClaudeMark = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} shrink-0 text-[#D97757]`} fill="currentColor" aria-hidden="true">
    <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
  </svg>
);

const OpenAIMark = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} shrink-0 text-white`} fill="currentColor" aria-hidden="true">
    <path d="M22.28 9.82a5.98 5.98 0 0 0-.51-4.91 6.05 6.05 0 0 0-6.51-2.9A6.07 6.07 0 0 0 10.69 0a6.05 6.05 0 0 0-5.77 4.18 5.99 5.99 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.51 2.9A6.07 6.07 0 0 0 13.31 24a6.05 6.05 0 0 0 5.77-4.18 5.99 5.99 0 0 0 4-2.9 6.05 6.05 0 0 0-.8-7.1zM13.31 22.43a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.79.79 0 0 0 .39-.68v-6.74l2.02 1.17a.07.07 0 0 1 .04.05v5.58a4.5 4.5 0 0 1-4.49 4.5zm-9.66-4.13a4.47 4.47 0 0 1-.54-3.02l.14.09 4.78 2.76a.77.77 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06l-4.83 2.79a4.5 4.5 0 0 1-6.14-1.64zM2.34 7.9a4.49 4.49 0 0 1 2.37-1.97V11.6a.77.77 0 0 0 .39.68l5.81 3.35-2.02 1.17a.08.08 0 0 1-.07 0L4.02 14a4.5 4.5 0 0 1-1.68-6.1zm16.6 3.86-5.83-3.37 2.02-1.16a.08.08 0 0 1 .07 0l4.83 2.79a4.5 4.5 0 0 1-.68 8.12v-5.68a.79.79 0 0 0-.41-.7zm2.01-3.02-.14-.09-4.77-2.78a.78.78 0 0 0-.79 0L9.41 9.23V6.9a.07.07 0 0 1 .03-.06l4.83-2.79a4.5 4.5 0 0 1 6.68 4.66zM8.31 12.86l-2.02-1.16a.08.08 0 0 1-.04-.06V6.07a4.5 4.5 0 0 1 7.38-3.45l-.14.08-4.78 2.76a.79.79 0 0 0-.4.68zm1.1-2.37 2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5z" />
  </svg>
);

const GeminiMark = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} shrink-0`} fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4285F4" />
        <stop offset="50%" stopColor="#9B72CB" />
        <stop offset="100%" stopColor="#D96570" />
      </linearGradient>
    </defs>
    <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" fill="url(#geminiGrad)" />
  </svg>
);

const CursorMark = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} shrink-0 text-white`} fill="currentColor" aria-hidden="true">
    <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
  </svg>
);

const CopilotMark = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} shrink-0 text-[#7dd3fc]`} fill="currentColor" aria-hidden="true">
    <path d="M23.922 16.997C23.061 18.492 18.063 22.02 12 22.02 5.937 22.02.939 18.492.078 16.997A.641.641 0 0 1 0 16.741v-2.869a.883.883 0 0 1 .053-.22c.372-.935 1.347-2.292 2.605-2.656.167-.429.414-1.055.644-1.517a10.098 10.098 0 0 1-.052-1.086c0-1.331.282-2.499 1.132-3.368.397-.406.89-.717 1.474-.952C7.255 2.937 9.248 1.98 11.978 1.98c2.731 0 4.767.957 6.166 2.093.584.235 1.077.546 1.474.952.85.869 1.132 2.037 1.132 3.368 0 .368-.014.733-.052 1.086.23.462.477 1.088.644 1.517 1.258.364 2.233 1.721 2.605 2.656a.841.841 0 0 1 .053.22v2.869a.641.641 0 0 1-.078.256Zm-11.75-5.992h-.344a4.359 4.359 0 0 1-.355.508c-.77.947-1.918 1.492-3.508 1.492-1.725 0-2.989-.359-3.782-1.259a2.137 2.137 0 0 1-.085-.104L4 11.746v6.585c1.435.779 4.514 2.179 8 2.179 3.486 0 6.565-1.4 8-2.179v-6.585l-.098-.104s-.033.045-.085.104c-.793.9-2.057 1.259-3.782 1.259-1.59 0-2.738-.545-3.508-1.492a4.359 4.359 0 0 1-.355-.508Zm2.328 3.25c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm-5 0c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm3.313-6.185c.136 1.057.403 1.913.878 2.497.442.544 1.134.938 2.344.938 1.573 0 2.292-.337 2.657-.751.384-.435.558-1.15.558-2.361 0-1.14-.243-1.847-.705-2.319-.477-.488-1.319-.862-2.824-1.025-1.487-.161-2.192.138-2.533.529-.269.307-.437.808-.438 1.578v.021c0 .265.021.562.063.893Zm-1.626 0c.042-.331.063-.628.063-.894v-.02c-.001-.77-.169-1.271-.438-1.578-.341-.391-1.046-.69-2.533-.529-1.505.163-2.347.537-2.824 1.025-.462.472-.705 1.179-.705 2.319 0 1.211.175 1.926.558 2.361.365.414 1.084.751 2.657.751 1.21 0 1.902-.394 2.344-.938.475-.584.742-1.44.878-2.497Z" />
  </svg>
);

const PLUGIN_COMMANDS = [
  {
    id: 'claude',
    name: 'Claude Code',
    tag: 'Marketplace Plugin',
    icon: <ClaudeMark />,
    cmd: '/plugin marketplace add Coder-s-OG-s/Trajectory-IR',
    note: '✓ Run /plugin install trajectory-ir@trajectory-ir to seal every tool call',
  },
  {
    id: 'codex',
    name: 'Codex',
    tag: 'Project Hooks',
    icon: <OpenAIMark />,
    cmd: 'trajir install codex',
    note: '✓ Hooks written · trust hooks in /hooks when prompted',
  },
  {
    id: 'gemini',
    name: 'Gemini CLI',
    tag: 'Project Settings',
    icon: <GeminiMark />,
    cmd: 'trajir install gemini',
    note: '✓ Pre/post tool hooks attached to project settings',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    tag: 'Project Hooks',
    icon: <CursorMark />,
    cmd: 'trajir install cursor',
    note: '✓ Merged into .cursor without overwriting existing hooks',
  },
  {
    id: 'copilot',
    name: 'Copilot CLI',
    tag: 'Repo Hooks',
    icon: <CopilotMark />,
    cmd: 'trajir install copilot',
    note: '✓ Repo hooks installed · dashboard events go to ~/.trajir/console-data (runs stay in .trajir/runs/)',
  },
];

function RibbonWord({
  isDotted,
  lit,
  sizeClass,
}: {
  isDotted: boolean;
  lit: boolean;
  sizeClass: string;
}) {
  const dotColor = lit ? 'rgba(255, 255, 255, 0.95)' : 'rgba(186, 230, 253, 0.45)';
  const strokeColor = lit ? 'rgba(255, 255, 255, 0.92)' : 'rgba(186, 230, 253, 0.28)';

  return (
    <span
      className={`${sizeClass} font-black uppercase tracking-tighter leading-none whitespace-nowrap`}
      style={
        isDotted
          ? {
              fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif",
              backgroundImage: `radial-gradient(${dotColor} 1.6px, transparent 1.6px)`,
              backgroundSize: '6px 6px',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }
          : {
              fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif",
              color: 'transparent',
              WebkitTextStroke: `1.5px ${strokeColor}`,
            }
      }
    >
      Trajectory_IR
    </span>
  );
}

function DottedRibbonSet({ lit = false }: { lit?: boolean }) {
  return (
    <div
      className="absolute inset-0 w-full h-full flex flex-col justify-between py-6 sm:py-10"
      style={
        lit
          ? {
              maskImage:
                'radial-gradient(200px circle at var(--mx, -500px) var(--my, -500px), black 0%, rgba(0,0,0,0.45) 50%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(200px circle at var(--mx, -500px) var(--my, -500px), black 0%, rgba(0,0,0,0.45) 50%, transparent 100%)',
            }
          : undefined
      }
    >
      {/* Top Ribbon: Scrolls Right */}
      <div
        className="w-[130%] -ml-[15%] overflow-hidden flex items-center opacity-80"
        style={{ transform: 'rotate(-2deg)' }}
      >
        <div className="animate-marquee-right flex items-center gap-8 sm:gap-10 shrink-0">
          {[0, 1].map((idx) => (
            <div key={idx} className="flex items-center gap-8 sm:gap-10 shrink-0">
              {[0, 1].map((subIdx) => (
                <RibbonWord
                  key={subIdx}
                  isDotted={subIdx % 2 === 1}
                  lit={lit}
                  sizeClass="text-6xl sm:text-8xl lg:text-[8.5rem]"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Middle Ribbon: Scrolls Left */}
      <div
        className="w-[130%] -ml-[15%] overflow-hidden flex items-center opacity-85"
        style={{ transform: 'rotate(1deg)' }}
      >
        <div className="animate-marquee-left flex items-center gap-8 sm:gap-10 shrink-0">
          {[0, 1].map((idx) => (
            <div key={idx} className="flex items-center gap-8 sm:gap-10 shrink-0">
              {[0, 1].map((subIdx) => (
                <RibbonWord
                  key={subIdx}
                  isDotted={subIdx % 2 === 0}
                  lit={lit}
                  sizeClass="text-6xl sm:text-8xl lg:text-[9rem]"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Ribbon: Scrolls Right */}
      <div
        className="w-[130%] -ml-[15%] overflow-hidden flex items-center opacity-80"
        style={{ transform: 'rotate(-2deg)' }}
      >
        <div className="animate-marquee-right flex items-center gap-8 sm:gap-10 shrink-0">
          {[0, 1].map((idx) => (
            <div key={idx} className="flex items-center gap-8 sm:gap-10 shrink-0">
              {[0, 1].map((subIdx) => (
                <RibbonWord
                  key={subIdx}
                  isDotted={subIdx % 2 === 1}
                  lit={lit}
                  sizeClass="text-6xl sm:text-8xl lg:text-[8.5rem]"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LatestUpdatesViewport() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ribbonLayerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const commandsColRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isAutoPlayingRef = useRef(false);
  const [selectedPluginId, setSelectedPluginId] = useState<string>('claude');
  const [copiedTerminal, setCopiedTerminal] = useState(false);

  const activePlugin =
    PLUGIN_COMMANDS.find((p) => p.id === selectedPluginId) ?? PLUGIN_COMMANDS[0];

  const handleCopyTerminal = () => {
    navigator.clipboard.writeText(activePlugin.cmd);
    setCopiedTerminal(true);
    setTimeout(() => setCopiedTerminal(false), 1500);
  };

  useEffect(() => {
    let rafId = 0;

    const sendYouTubeCommand = (func: 'playVideo' | 'pauseVideo') => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func, args: '' }),
        '*'
      );
    };

    const ease = (t: number) => t * t * (3 - 2 * t);

    const updateStage = () => {
      rafId = 0;
      if (!trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const totalScroll = rect.height - vh;
      if (totalScroll <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScroll, 0), 1);

      // Phase 1 (0.04 -> 0.26): Left intro fades out, video glides from right to center
      const p1 = ease(Math.min(Math.max((progress - 0.04) / 0.22, 0), 1));

      // Phase 2 (0.26 -> 0.50): Video zooms smoothly toward fullscreen & autoplays
      const p2 = ease(Math.min(Math.max((progress - 0.26) / 0.24, 0), 1));

      // Phase 3 (0.58 -> 0.84): Video settles back to right, Plugin Commands reveal clearly on left
      const p3 = ease(Math.min(Math.max((progress - 0.58) / 0.26, 0), 1));

      if (leftColRef.current) {
        leftColRef.current.style.opacity = (1 - p1).toFixed(3);
        leftColRef.current.style.transform = `translate3d(${(-p1 * 64).toFixed(2)}px, 0, 0)`;
        leftColRef.current.style.pointerEvents = p1 > 0.5 ? 'none' : 'auto';
      }

      if (commandsColRef.current) {
        commandsColRef.current.style.opacity = p3.toFixed(3);
        commandsColRef.current.style.transform = `translate3d(${((1 - p3) * -48).toFixed(2)}px, 0, 0)`;
        commandsColRef.current.style.pointerEvents = p3 > 0.4 ? 'auto' : 'none';
      }

      if (videoWrapRef.current) {
        const isDesktop = window.innerWidth >= 1024;
        const startOffsetVw = isDesktop ? 19 : 0;
        const maxZoom = isDesktop ? 0.56 : 0.08;
        // Moves from right (+19vw) -> center (0vw) in Phase 1, then back to right (+19vw) in Phase 3
        const xVw = (1 - p1 + p3) * startOffsetVw;
        // Zooms 1 -> 1.56 in Phase 2, then scales back 1.56 -> 1 in Phase 3
        const zoomFactor = p2 * (1 - p3);
        const scale = 1 + zoomFactor * maxZoom;
        videoWrapRef.current.style.transform = `translate3d(${xVw.toFixed(3)}vw, 0, 0) scale(${scale.toFixed(4)})`;
      }

      if (captionRef.current) {
        const captionOpacity = 1 - p2 * (1 - p3);
        captionRef.current.style.opacity = captionOpacity.toFixed(3);
      }

      if (ribbonLayerRef.current) {
        const ribbonOpacity = 1 - p2 * (1 - p3) * 0.85;
        ribbonLayerRef.current.style.opacity = ribbonOpacity.toFixed(3);
      }

      // Auto-play when zoomed in; pause if scrolled back out before Phase 2
      if (progress >= 0.46 && !isAutoPlayingRef.current) {
        isAutoPlayingRef.current = true;
        sendYouTubeCommand('playVideo');
      } else if (progress < 0.35 && isAutoPlayingRef.current) {
        isAutoPlayingRef.current = false;
        sendYouTubeCommand('pauseVideo');
      }
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateStage);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateStage();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ribbonLayerRef.current || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    ribbonLayerRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    ribbonLayerRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    if (!ribbonLayerRef.current) return;
    ribbonLayerRef.current.style.setProperty('--mx', '-500px');
    ribbonLayerRef.current.style.setProperty('--my', '-500px');
  };

  return (
    <section
      ref={trackRef}
      id="latest-updates"
      aria-label="Agent Plugins and Latest Updates"
      className="relative z-10 w-full h-[260vh] lg:h-[420vh]"
    >
      {/* Sticky Fullscreen Viewport Stage */}
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center px-5 sm:px-8 lg:px-12"
      >
        {/* Dotted Trajectory_IR Ribbons + Cursor-Reactive Lit Pixel Layer */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
          }}
          aria-hidden="true"
        >
          <div
            ref={ribbonLayerRef}
            className="absolute inset-0 w-full h-full"
            style={{ contain: 'layout style paint' }}
          >
            <DottedRibbonSet />
            <DottedRibbonSet lit />
          </div>
        </div>

        {/* Stage Content */}
        <div className="relative z-10 max-w-[1280px] mx-auto w-full flex flex-col lg:flex-row items-center justify-center">
          {/* Phase 0 Left Column: Editorial Heading & CTAs */}
          <div
            ref={leftColRef}
            className="w-full lg:w-[42%] lg:mr-auto space-y-6 sm:space-y-8 will-change-transform"
          >
            <div className="space-y-4">
              <a
                href="https://github.com/Coder-s-OG-s/Trajectory-IR/blob/main/CHANGELOG.md"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-sky-200/90 hover:text-white transition-colors no-underline"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sky-300" aria-hidden="true" />
                <span>main · Agent Hooks &amp; Plugin</span>
              </a>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.08]"
                style={{
                  fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif",
                  letterSpacing: '-0.035em',
                }}
              >
                Seal every tool call
                <span className="text-sky-200/85 font-medium block">
                  from your coding agent.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-sky-100/75 leading-relaxed">
                Claude Code plugin and native hooks for Codex, Gemini CLI, Cursor, and Copilot
                CLI—plus seal-derived idempotency keys, transactional{' '}
                <code className="font-mono text-sky-200">.tir</code> imports, and{' '}
                <span className="text-white font-medium">4.7 ms</span> step latency on{' '}
                <code className="font-mono text-sky-200">main</code>.
              </p>
            </div>

            {/* Signature Liquid Glass Pill CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href="https://github.com/Coder-s-OG-s/Trajectory-IR/blob/main/docs/AGENT_PLUGINS.md"
                target="_blank"
                rel="noreferrer"
                className="liquid-glass-pill-solid px-7 py-3 rounded-full text-sm font-semibold text-[#06162d] no-underline inline-flex items-center gap-2 group"
                style={{
                  fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif",
                  letterSpacing: '-0.015em',
                }}
              >
                <span>Hooks &amp; Plugin Guide</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </a>

              <a
                href="https://github.com/Coder-s-OG-s/Trajectory-IR/blob/main/CHANGELOG.md"
                target="_blank"
                rel="noreferrer"
                className="liquid-glass-pill px-7 py-3 rounded-full text-sm font-medium text-white no-underline inline-flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif",
                  letterSpacing: '-0.015em',
                }}
              >
                <span>Changelog ↗</span>
              </a>
            </div>
          </div>

          {/* Phase 3 Left Column: Circuit Hub Agent Selector + Oval Command Capsule */}
          <div
            ref={commandsColRef}
            className="hidden lg:block lg:absolute lg:left-0 lg:w-[46%] space-y-5 will-change-transform opacity-0 pointer-events-none"
          >
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-sky-200/90">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-300" aria-hidden="true" />
                <span>Attach &amp; Verify</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-semibold tracking-tight text-white"
                style={{
                  fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif",
                  letterSpacing: '-0.03em',
                }}
              >
                One IR hub for every agent.
              </h3>
            </div>

            {/* Hub & Spoke Circuit Diagram (Industry-grade symmetry & zero overlap) */}
            <div className="relative w-full h-[310px] select-none">
              {/* Curved SVG Connector Traces: Exact center-to-center coordinates */}
              <svg
                viewBox="0 0 560 310"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="traceActiveLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="traceActiveRight" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
                  </linearGradient>
                </defs>

                {/* Top-Left (edge 86, 56) -> Hub Left Edge (205, 134) */}
                <path
                  d="M 86 56 H 138 C 172 56 172 134 205 134"
                  stroke={selectedPluginId === 'claude' ? 'url(#traceActiveLeft)' : 'rgba(255,255,255,0.2)'}
                  strokeWidth={selectedPluginId === 'claude' ? '2.5' : '1.25'}
                  className="transition-all duration-300"
                />
                {/* Bottom-Left (edge 86, 242) -> Hub Left Edge (205, 148) */}
                <path
                  d="M 86 242 H 138 C 172 242 172 148 205 148"
                  stroke={selectedPluginId === 'codex' ? 'url(#traceActiveLeft)' : 'rgba(255,255,255,0.2)'}
                  strokeWidth={selectedPluginId === 'codex' ? '2.5' : '1.25'}
                  className="transition-all duration-300"
                />
                {/* Top-Right (edge 474, 56) -> Hub Right Edge (355, 134) */}
                <path
                  d="M 474 56 H 422 C 388 56 388 134 355 134"
                  stroke={selectedPluginId === 'gemini' ? 'url(#traceActiveRight)' : 'rgba(255,255,255,0.2)'}
                  strokeWidth={selectedPluginId === 'gemini' ? '2.5' : '1.25'}
                  className="transition-all duration-300"
                />
                {/* Bottom-Right (edge 474, 242) -> Hub Right Edge (355, 148) */}
                <path
                  d="M 474 242 H 422 C 388 242 388 148 355 148"
                  stroke={selectedPluginId === 'cursor' ? 'url(#traceActiveRight)' : 'rgba(255,255,255,0.2)'}
                  strokeWidth={selectedPluginId === 'cursor' ? '2.5' : '1.25'}
                  className="transition-all duration-300"
                />
                {/* Bottom-Center (280, 224) -> Hub Bottom Edge (280, 162) */}
                <path
                  d="M 280 224 V 162"
                  stroke={selectedPluginId === 'copilot' ? '#7dd3fc' : 'rgba(255,255,255,0.2)'}
                  strokeWidth={selectedPluginId === 'copilot' ? '2.5' : '1.25'}
                  className="transition-all duration-300"
                />
              </svg>

              {/* Center Background-less Translucent Trajectory IR Wordmark */}
              <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-10 w-fit px-6 py-2 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/25 shadow-[0_0_30px_rgba(56,189,248,0.18)]">
                <span
                  className="text-base sm:text-lg font-bold text-white tracking-tight whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif",
                  }}
                >
                  trajectory<span className="text-sky-300 font-normal">_ir</span>
                </span>
              </div>

              {/* 5 Background-less Official Agent Logos */}
              {[
                { plugin: PLUGIN_COMMANDS[0], left: '10%', top: '18%', icon: <ClaudeMark className="w-9 h-9" /> },
                { plugin: PLUGIN_COMMANDS[1], left: '10%', top: '78%', icon: <OpenAIMark className="w-9 h-9" /> },
                { plugin: PLUGIN_COMMANDS[2], left: '90%', top: '18%', icon: <GeminiMark className="w-9 h-9" /> },
                { plugin: PLUGIN_COMMANDS[3], left: '90%', top: '78%', icon: <CursorMark className="w-9 h-9" /> },
                { plugin: PLUGIN_COMMANDS[4], left: '50%', top: '84%', icon: <CopilotMark className="w-9 h-9" /> },
              ].map(({ plugin, left, top, icon }) => {
                const isSelected = plugin.id === selectedPluginId;
                return (
                  <button
                    key={plugin.id}
                    type="button"
                    onClick={() => setSelectedPluginId(plugin.id)}
                    title={plugin.name}
                    style={{ left, top }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group flex flex-col items-center gap-1.5 cursor-pointer"
                  >
                    <span
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? 'bg-sky-400/15 ring-1 ring-sky-300/70 shadow-[0_0_28px_rgba(56,189,248,0.45)] scale-110'
                          : 'bg-transparent hover:bg-white/[0.06] opacity-85 hover:opacity-100'
                      }`}
                    >
                      {icon}
                    </span>
                    <span
                      className={`text-[11px] font-mono tracking-tight whitespace-nowrap transition-colors ${
                        isSelected ? 'text-white font-semibold' : 'text-sky-100/75 group-hover:text-white'
                      }`}
                    >
                      {plugin.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Step 1: Full go install @main shown before the agent command */}
            <div className="px-2 space-y-1">
              <div className="text-[11px] font-mono text-sky-200/75">
                1. Install CLI from <code className="text-sky-200">main</code>:
              </div>
              <code className="block text-[11px] font-mono text-sky-100/90 break-all">
                go install github.com/Coder-s-OG-s/Trajectory-IR/go/cmd/trajir@main
              </code>
            </div>

            {/* Step 2: Main Oval Command Capsule */}
            <div className="liquid-glass-dock rounded-full p-2 pl-2.5 flex items-center justify-between gap-3 shadow-2xl">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/40 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.7),0_4px_16px_rgba(56,189,248,0.2)] text-white flex items-center justify-center shrink-0">
                  {activePlugin.icon}
                </div>
                <code className="text-xs sm:text-sm font-mono font-semibold text-white truncate">
                  {activePlugin.cmd}
                </code>
              </div>

              <button
                type="button"
                onClick={handleCopyTerminal}
                className="liquid-glass-pill-solid px-5 py-2.5 rounded-full text-xs font-semibold text-[#06162d] shrink-0 cursor-pointer"
              >
                {copiedTerminal ? 'Copied ✓' : 'Copy'}
              </button>
            </div>

            {/* Step 3: Agent Note + Export & Verify */}
            <div className="space-y-1 px-2 text-xs text-sky-100/75">
              <div className="text-emerald-300/90 font-mono text-[11px]">{activePlugin.note}</div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-sky-200/75">
                <span>3. trajir console</span>
                <span>·</span>
                <span>trajir export</span>
                <span>·</span>
                <span>trajir verify run.tir</span>
              </div>
            </div>
          </div>

          {/* Demo Video: Right -> Center -> Fullscreen -> Right */}
          <div
            ref={videoWrapRef}
            className="w-full max-w-[680px] lg:absolute lg:left-1/2 lg:-translate-x-1/2 mt-8 lg:mt-0 space-y-3 will-change-transform z-20"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/20 bg-slate-950 shadow-2xl">
              <iframe
                ref={iframeRef}
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/V9uj7DbKBBQ?enablejsapi=1&mute=1&rel=0"
                title="Trajectory IR Agent Plugins Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div
              ref={captionRef}
              className="flex items-center justify-between text-xs text-sky-100/60 px-1"
            >
              <span>Demo: sealing tool calls and verifying .tir packages locally</span>
              <a
                href="https://youtu.be/V9uj7DbKBBQ"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sky-200/80 hover:text-white no-underline shrink-0 ml-4"
              >
                youtu.be/V9uj7DbKBBQ ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
