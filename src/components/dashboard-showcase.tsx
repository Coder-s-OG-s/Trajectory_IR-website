'use client';

import React, { useState } from 'react';

type TabId = 'idempotent' | 'crash-recovery' | 'human-gate';

interface CodeSnippet {
  id: TabId;
  title: string;
  description: string;
  code: React.ReactNode;
  lines: number;
  output: string;
}

const snippets: Record<TabId, CodeSnippet> = {
  'idempotent': {
    id: 'idempotent',
    title: 'Idempotent-Safe Reads',
    description: 'Classify a call as ReadOnly and it can always be safely retried, a crash just replays the step instead of needing special handling.',
    lines: 17,
    code: (
      <>
        <span className="text-blue-600">import</span> ({'\n'}
        {'    '}<span className="text-[#a31515]">"trajir/client"</span>{'\n'}
        {'    '}<span className="text-[#a31515]">"trajir/effects"</span>{'\n'}
        {')\n\n'}
        <span className="text-blue-600">func</span> <span className="text-[#795e26]">fetchUserData</span>(<span className="text-[#001080]">traj</span> *<span className="text-[#267f99]">client</span>.<span className="text-[#267f99]">Trajectory</span>, <span className="text-[#001080]">userID</span> <span className="text-[#267f99]">string</span>) (<span className="text-[#267f99]">any</span>, <span className="text-[#267f99]">error</span>) {'{\n'}
        <span className="text-green-700">{'    // Reads are always safe to retry after a crash.\n'}</span>
        {'    '}<span className="text-[#001080]">seal</span>, _ := <span className="text-[#001080]">traj</span>.<span className="text-[#795e26]">SealDecision</span>({'\n'}
        {'        '}<span className="text-blue-600">map</span>[<span className="text-[#267f99]">string</span>]<span className="text-[#267f99]">any</span>{'{"operation": '}<span className="text-[#a31515]">"fetch_user"</span>{', "userId": '}<span className="text-[#001080]">userID</span>{'},\n'}
        {'        '}<span className="text-[#267f99]">effects</span>.<span className="text-[#0070c1]">ReadOnly</span>,{'\n'}
        {'    )\n'}
        {'    '}<span className="text-[#001080]">result</span>, _ := <span className="text-[#001080]">traj</span>.<span className="text-[#795e26]">ExecTool</span>(<span className="text-[#001080]">seal</span>, <span className="text-blue-600">func</span>() (<span className="text-[#267f99]">any</span>, <span className="text-[#267f99]">error</span>) {'{\n'}
        {'        '}<span className="text-blue-600">return</span> <span className="text-[#001080]">db</span>.<span className="text-[#001080]">Users</span>.<span className="text-[#795e26]">Find</span>(<span className="text-[#001080]">userID</span>){'\n'}
        {'    })\n'}
        {'    '}<span className="text-[#001080]">traj</span>.<span className="text-[#795e26]">CommitStep</span>(<span className="text-[#001080]">seal</span>, <span className="text-[#001080]">result</span>, <span className="text-blue-600">nil</span>){'\n'}
        {'    '}<span className="text-blue-600">return</span> <span className="text-[#001080]">result</span>, <span className="text-blue-600">nil</span>{'\n'}
        {'}'}
      </>
    ),
    output: `[Trajectory IR] SealDecision: fetch_user (ReadOnly)
[Trajectory IR] Seal: 8f7e9c29a... (SHA256)
[Trajectory IR] ExecTool: running closure...
[Trajectory IR] Data fetched from DB.
[Trajectory IR] CommitStep: Observation node appended.`
  },
  'crash-recovery': {
    id: 'crash-recovery',
    title: 'Crash Recovery',
    description: 'Powered by Temporal, if your agent crashes mid-execution, resuming the trajectory picks up exactly where the node log left off.',
    lines: 19,
    code: (
      <>
        <span className="text-blue-600">import</span> ({'\n'}
        {'    '}<span className="text-[#a31515]">"trajir/client"</span>{'\n'}
        {'    '}<span className="text-[#a31515]">"trajir/effects"</span>{'\n'}
        {')\n\n'}
        <span className="text-blue-600">func</span> <span className="text-[#795e26]">multiStepAgentProcess</span>(<span className="text-[#001080]">traj</span> *<span className="text-[#267f99]">client</span>.<span className="text-[#267f99]">Trajectory</span>, <span className="text-[#001080]">data</span> <span className="text-[#267f99]">any</span>) (<span className="text-[#267f99]">any</span>, <span className="text-[#267f99]">error</span>) {'{\n'}
        <span className="text-green-700">{'    // Step 1: seal, run, commit\n'}</span>
        {'    '}<span className="text-[#001080]">seal1</span>, _ := <span className="text-[#001080]">traj</span>.<span className="text-[#795e26]">SealDecision</span>(<span className="text-blue-600">map</span>[<span className="text-[#267f99]">string</span>]<span className="text-[#267f99]">any</span>{'{"step": '}<span className="text-[#098658]">1</span>{'}, '}<span className="text-[#267f99]">effects</span>.<span className="text-[#0070c1]">ReadOnly</span>){'\n'}
        {'    '}<span className="text-[#001080]">step1</span>, _ := <span className="text-[#001080]">traj</span>.<span className="text-[#795e26]">ExecTool</span>(<span className="text-[#001080]">seal1</span>, <span className="text-blue-600">func</span>() (<span className="text-[#267f99]">any</span>, <span className="text-[#267f99]">error</span>) {'{ '}<span className="text-blue-600">return</span> <span className="text-[#795e26]">callExternalAPI</span>(<span className="text-[#001080]">data</span>) {'})\n'}
        {'    '}<span className="text-[#001080]">traj</span>.<span className="text-[#795e26]">CommitStep</span>(<span className="text-[#001080]">seal1</span>, <span className="text-[#001080]">step1</span>, <span className="text-blue-600">nil</span>){'\n\n'}
        <span className="text-green-700">{'    // Simulate a crash here! On resume, Step 1 is not re-run.\n\n'}</span>
        <span className="text-green-700">{'    // Step 2: resumes safely\n'}</span>
        {'    '}<span className="text-[#001080]">seal2</span>, _ := <span className="text-[#001080]">traj</span>.<span className="text-[#795e26]">SealDecision</span>(<span className="text-blue-600">map</span>[<span className="text-[#267f99]">string</span>]<span className="text-[#267f99]">any</span>{'{"step": '}<span className="text-[#098658]">2</span>{'}, '}<span className="text-[#267f99]">effects</span>.<span className="text-[#0070c1]">ReadOnly</span>){'\n'}
        {'    '}<span className="text-[#001080]">step2</span>, _ := <span className="text-[#001080]">traj</span>.<span className="text-[#795e26]">ExecTool</span>(<span className="text-[#001080]">seal2</span>, <span className="text-blue-600">func</span>() (<span className="text-[#267f99]">any</span>, <span className="text-[#267f99]">error</span>) {'{ '}<span className="text-blue-600">return</span> <span className="text-[#795e26]">processData</span>(<span className="text-[#001080]">step1</span>) {'})\n'}
        {'    '}<span className="text-[#001080]">traj</span>.<span className="text-[#795e26]">CommitStep</span>(<span className="text-[#001080]">seal2</span>, <span className="text-[#001080]">step2</span>, <span className="text-blue-600">nil</span>){'\n'}
        {'    '}<span className="text-blue-600">return</span> <span className="text-[#001080]">step2</span>, <span className="text-blue-600">nil</span>{'\n'}
        {'}'}
      </>
    ),
    output: `[Trajectory IR] OpenTrajectory: new trajectory started.
[Trajectory IR] Executing Step 1...
[Trajectory IR] Step 1 committed to node log.
[SYSTEM] Process killed (SIGTERM).
---
[Trajectory IR] Resume(trajectoryID, dbPath) reattached.
[Trajectory IR] Step 1 already committed. Skipping re-execution.
[Trajectory IR] Executing Step 2...
[Trajectory IR] Step 2 committed. Workflow complete.`
  },
  'human-gate': {
    id: 'human-gate',
    title: 'Human-in-the-Loop Gate',
    description: 'NonIdempotentWrite operations trigger Block-and-Gate on crash, halting in BLOCKED_NEEDS_GATE until a human operator approves the retry.',
    lines: 17,
    code: (
      <>
        <span className="text-blue-600">import</span> ({'\n'}
        {'    '}<span className="text-[#a31515]">"trajir/client"</span>{'\n'}
        {'    '}<span className="text-[#a31515]">"trajir/effects"</span>{'\n'}
        {')\n\n'}
        <span className="text-blue-600">func</span> <span className="text-[#795e26]">deployToProduction</span>(<span className="text-[#001080]">traj</span> *<span className="text-[#267f99]">client</span>.<span className="text-[#267f99]">Trajectory</span>, <span className="text-[#001080]">cluster</span> <span className="text-[#267f99]">string</span>) (<span className="text-[#267f99]">any</span>, <span className="text-[#267f99]">error</span>) {'{\n'}
        <span className="text-green-700">{'    // NonIdempotentWrite triggers Block-and-Gate on crash.\n'}</span>
        {'    '}<span className="text-[#001080]">seal</span>, _ := <span className="text-[#001080]">traj</span>.<span className="text-[#795e26]">SealDecision</span>({'\n'}
        {'        '}<span className="text-blue-600">map</span>[<span className="text-[#267f99]">string</span>]<span className="text-[#267f99]">any</span>{'{"operation": '}<span className="text-[#a31515]">"deploy"</span>{', "cluster": '}<span className="text-[#001080]">cluster</span>{'},\n'}
        {'        '}<span className="text-[#267f99]">effects</span>.<span className="text-[#0070c1]">NonIdempotentWrite</span>,{'\n'}
        {'    )\n'}
        {'    '}<span className="text-[#001080]">result</span>, <span className="text-[#001080]">err</span> := <span className="text-[#001080]">traj</span>.<span className="text-[#795e26]">ExecTool</span>(<span className="text-[#001080]">seal</span>, <span className="text-blue-600">func</span>() (<span className="text-[#267f99]">any</span>, <span className="text-[#267f99]">error</span>) {'{\n'}
        {'        '}<span className="text-blue-600">return</span> <span className="text-[#001080]">cloud</span>.<span className="text-[#795e26]">Deploy</span>(<span className="text-[#001080]">cluster</span>){'\n'}
        {'    })\n'}
        {'    '}<span className="text-[#001080]">traj</span>.<span className="text-[#795e26]">CommitStep</span>(<span className="text-[#001080]">seal</span>, <span className="text-[#001080]">result</span>, <span className="text-blue-600">nil</span>){'\n'}
        {'    '}<span className="text-blue-600">return</span> <span className="text-[#001080]">result</span>, <span className="text-[#001080]">err</span>{'\n'}
        {'}'}
      </>
    ),
    output: `[Trajectory IR] SealDecision: deploy (NonIdempotentWrite)
[SYSTEM] Process killed (SIGTERM) mid-deploy.
---
[Trajectory IR] Resume(trajectoryID, dbPath) reattached.
[Trajectory IR] Dangling seal for a NonIdempotentWrite tool detected.
[Trajectory IR] Status: BLOCKED_NEEDS_GATE
[Trajectory IR] Waiting for human approval...
---
[Trajectory IR] Operator (admin@org.com) approved retry.
[Trajectory IR] ExecTool: running closure...
[Trajectory IR] Deployment successful. Step committed.`
  }
};

const GoIcon = () => (
  <svg viewBox="0 0 128 128" width="14" height="14">
    <rect width="128" height="128" rx="14" fill="#00ADD8" />
    <text x="64" y="87" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="50" fill="#fff" textAnchor="middle">Go</text>
  </svg>
);

export function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>('idempotent');
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const outputRef = React.useRef<HTMLDivElement>(null);

  const activeSnippet = snippets[activeTab];

  const handleRun = () => {
    setShowOutput(false);
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 60);
    }, 800);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 bg-slate-900/90 border border-sky-400/30 shadow-[0_0_25px_rgba(56,189,248,0.15)] rounded-2xl overflow-hidden flex flex-col md:flex-row text-left backdrop-blur-xl">
      
      {/* Sidebar Tabs */}
      <div className="w-full md:w-56 bg-slate-950/60 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
        <div className="px-4 py-3 border-b border-white/10">
          <span className="text-[11px] font-bold text-sky-200/60 uppercase tracking-wider">Features</span>
        </div>
        <div className="flex flex-col p-2 gap-1">
          {Object.values(snippets).map((snippet) => (
            <button
              key={snippet.id}
              onClick={() => {
                setActiveTab(snippet.id);
                setShowOutput(false);
              }}
              className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all text-left ${
                activeTab === snippet.id
                  ? 'bg-sky-500/15 text-sky-300 shadow-sm border border-sky-400/30'
                  : 'text-sky-100/70 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {snippet.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-5 md:p-6 bg-white flex flex-col">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-zinc-900 mb-1.5">{activeSnippet.title}</h2>
          <p className="text-zinc-500 text-[13px] leading-relaxed max-w-2xl">
            {activeSnippet.description}
          </p>
        </div>

        {/* Realistic VS Code-like Editor Mockup */}
        <div className="relative rounded-lg border border-zinc-300 bg-white overflow-hidden mb-3 shadow-sm flex flex-col">
          {/* Title Bar / Tabs */}
          <div className="bg-[#f3f3f3] flex items-center border-b border-zinc-200 select-none">
            {/* macOS Traffic Lights */}
            <div className="flex gap-2 px-4 py-2.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></span>
              <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></span>
            </div>
            {/* Active Tab */}
            <div className="bg-white px-4 py-1.5 border-t-2 border-t-blue-500 border-x border-x-zinc-200 flex items-center gap-2 -mb-[1px] ml-1">
              <GoIcon />
              <span className="text-[12px] font-sans text-zinc-700">example.go</span>
            </div>
          </div>
          
          <div className="flex bg-white">
            {/* Line Numbers */}
            <div className="py-3 px-3 min-w-[36px] text-[13px] font-mono text-zinc-400 text-right select-none bg-[#f9f9f9] border-r border-zinc-100 flex flex-col leading-snug">
              {Array.from({ length: activeSnippet.lines }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            {/* Code */}
            <div className="p-3 overflow-x-auto w-full bg-white select-text">
              <div className="whitespace-pre font-mono text-[13px] text-zinc-800 leading-snug">
                <code>{activeSnippet.code}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`px-4 py-1.5 rounded-md text-[13px] font-bold flex items-center gap-2 transition-all ${
              isRunning
                ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm'
            }`}
          >
            {isRunning ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-zinc-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Executing...
              </>
            ) : (
              '▶ Run Execution'
            )}
          </button>
        </div>

        {/* Output Console */}
        {showOutput && (
          <div ref={outputRef} className="mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
              Terminal Output
            </div>
            <div className="p-3 rounded-lg border border-zinc-200 bg-[#f9f9f9] font-mono text-[12px] text-zinc-700 whitespace-pre-wrap leading-relaxed shadow-inner">
              {activeSnippet.output}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
