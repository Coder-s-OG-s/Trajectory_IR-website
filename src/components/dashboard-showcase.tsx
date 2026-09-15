'use client';

import React, { useState } from 'react';

type TabId = 'seal' | 'exec' | 'sandbox';

interface CodeSnippet {
  id: TabId;
  title: string;
  description: string;
  code: React.ReactNode;
  lines: number;
  output: string;
  filename: string;
}

const snippets: Record<TabId, CodeSnippet> = {
  'seal': {
    id: 'seal',
    title: 'Seal a decision',
    description: 'Freeze the model plan as a DECISION before any world-changing tool runs. Resume replays the seal; it does not re-prompt.',
    lines: 16,
    filename: 'main.go',
    code: (
      <>
        <span className="text-blue-600">tr</span>, <span className="text-blue-600">err</span> := <span className="text-[#267f99]">client</span>.<span className="text-[#795e26]">OpenTrajectory</span>(<span className="text-[#a31515]">&quot;demo&quot;</span>, <span className="text-[#a31515]">&quot;qs-1&quot;</span>, <span className="text-[#267f99]">client</span>.<span className="text-[#267f99]">Options</span>{'{'}WorkDir: dir{'}'}){'\n'}
        <span className="text-blue-600">if</span> err != <span className="text-blue-600">nil</span> {'{'} panic(err) {'}'}\n\n
        <span className="text-[#267f99]">tr</span>.<span className="text-[#795e26]">Project</span>(1, map[string]any{'{'}<span className="text-[#a31515]">&quot;goal&quot;</span>: <span className="text-[#a31515]">&quot;hello&quot;</span>{'}'}){'\n'}
        plan := map[string]any{'{'}{'\n'}
        {'  '}<span className="text-[#a31515]">&quot;tool_calls&quot;</span>: []any{'{'}{'\n'}
        {'    '}map[string]any{'{'}<span className="text-[#a31515]">&quot;name&quot;</span>: <span className="text-[#a31515]">&quot;echo&quot;</span>, <span className="text-[#a31515]">&quot;args&quot;</span>: map[string]any{'{'}<span className="text-[#a31515]">&quot;msg&quot;</span>: <span className="text-[#a31515]">&quot;hi&quot;</span>{'}'}{'}'},{'\n'}
        {'  '}{'}'},{'\n'}
        {'}'}\n
        <span className="text-[#267f99]">tr</span>.<span className="text-[#795e26]">SealDecision</span>(1, plan)
      </>
    ),
    output: `[trajir] OpenTrajectory demo/qs-1
[trajir] PROJECT_CONTEXT step=1
[trajir] DECISION sealed (plan frozen)
[trajir] Ready for ExecTool`
  },
  'exec': {
    id: 'exec',
    title: 'Exec a PURE tool',
    description: 'Run a classified tool after the seal. PURE tools may recompute safely on resume.',
    lines: 15,
    filename: 'main.go',
    code: (
      <>
        tool := <span className="text-[#267f99]">resume</span>.<span className="text-[#267f99]">Tool</span>{'{'}{'\n'}
        {'  '}Name:   <span className="text-[#a31515]">&quot;echo&quot;</span>,{'\n'}
        {'  '}Effect: <span className="text-[#267f99]">effects</span>.<span className="text-[#0070c1]">PURE</span>,{'\n'}
        {'  '}Fn: <span className="text-blue-600">func</span>(args map[string]any) (any, error) {'{'}{'\n'}
        {'    '}<span className="text-blue-600">return</span> args[<span className="text-[#a31515]">&quot;msg&quot;</span>], <span className="text-blue-600">nil</span>{'\n'}
        {'  '}{'}'},{'\n'}
        {'}'}\n
        res, err := <span className="text-[#267f99]">tr</span>.<span className="text-[#795e26]">ExecTool</span>(1, 2, tool, map[string]any{'{'}<span className="text-[#a31515]">&quot;msg&quot;</span>: <span className="text-[#a31515]">&quot;hi&quot;</span>{'}'}){'\n'}
        fmt.<span className="text-[#795e26]">Println</span>(res.Result) <span className="text-green-700">{'// hi'}</span>{'\n'}
        <span className="text-[#267f99]">tr</span>.<span className="text-[#795e26]">CommitStep</span>(1, 4)
      </>
    ),
    output: `[trajir] TOOL_CALL echo effect=PURE
[trajir] TOOL_RESULT "hi"
[trajir] COMMIT_STEP step=1`
  },
  'sandbox': {
    id: 'sandbox',
    title: 'Sandbox mode',
    description: 'Same agent loop; dangerous effect classes are rejected before side effects — for demos and CI.',
    lines: 12,
    filename: 'shell',
    code: (
      <>
        <span className="text-green-700">{'# From Trajectory-IR/go'}</span>{'\n'}
        go run ./examples/adoption_host -sandbox{'\n\n'}
        <span className="text-green-700">{'# Sandbox rejects before side effects:'}</span>{'\n'}
        <span className="text-green-700">{'#  NON_IDEMPOTENT_WRITE · AGENT_SPAWN · SENSITIVE'}</span>
      </>
    ),
    output: `[adoption_host] mode=sandbox
[trajir] SANDBOX_FORBIDDEN: NON_IDEMPOTENT_WRITE
[trajir] No deploy / charge / email executed`
  }
};

const GoIcon = () => (
  <svg viewBox="0 0 128 128" width="14" height="14" aria-hidden="true">
    <circle cx="64" cy="64" r="64" fill="#00ADD8" />
    <text x="64" y="78" textAnchor="middle" fontSize="48" fontFamily="sans-serif" fontWeight="700" fill="#fff">Go</text>
  </svg>
);

export function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>('seal');
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const activeSnippet = snippets[activeTab];

  const handleRun = () => {
    setShowOutput(false);
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
    }, 800);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 glass-pill border border-[rgba(255,255,255,0.1)] rounded-xl overflow-hidden flex flex-col md:flex-row text-left shadow-[0_0_30px_rgba(0,0,0,0.3)]">
      
      {/* Sidebar Tabs */}
      <div className="w-full md:w-56 bg-zinc-50 border-b md:border-b-0 md:border-r border-zinc-200 flex flex-col">
        <div className="px-4 py-3 border-b border-zinc-200">
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Features</span>
        </div>
        <div className="flex flex-col p-1.5 gap-0.5">
          {Object.values(snippets).map((snippet) => (
            <button
              key={snippet.id}
              onClick={() => {
                setActiveTab(snippet.id);
                setShowOutput(false);
              }}
              className={`px-3 py-2 rounded-md text-[13px] font-medium transition-all text-left ${
                activeTab === snippet.id
                  ? 'bg-white text-[#f26625] shadow-sm border border-zinc-200'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-transparent'
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
              <span className="text-[12px] font-sans text-zinc-700">{activeSnippet.filename}</span>
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
          <div className="mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
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
