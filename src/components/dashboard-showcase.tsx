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
    title: 'Idempotent Caching',
    description: 'Wrap agent decisions to guarantee side-effects are never duplicated, even if the agent is called multiple times.',
    lines: 14,
    code: (
      <>
        <span className="text-blue-600">import</span> {'{ '}
        <span className="text-[#267f99]">Trajectory</span>
        {' } '} <span className="text-blue-600">from</span> <span className="text-[#a31515]">'trajectory-ir'</span>;
        {'\n\n'}
        <span className="text-blue-600">async</span> <span className="text-blue-600">function</span> <span className="text-[#795e26]">fetchUserData</span>(<span className="text-[#001080]">userId</span>: <span className="text-[#267f99]">string</span>) {'{\n'}
        <span className="text-green-700">{'  // This operation is pure/idempotent.\n'}</span>
        <span className="text-green-700">{'  // Trajectory IR caches the deterministic output.\n'}</span>
        {'  '}<span className="text-blue-600">return</span> <span className="text-blue-600">await</span> <span className="text-[#267f99]">Trajectory</span>.<span className="text-[#795e26]">seal</span>({'\n'}
        {'    { '}<span className="text-[#001080]">operation</span>: <span className="text-[#a31515]">'fetch_user'</span>, <span className="text-[#001080]">userId</span> {'},\n'}
        {'    '}<span className="text-blue-600">async</span> () <span className="text-blue-600">=&gt;</span> <span className="text-blue-600">await</span> <span className="text-[#001080]">db</span>.<span className="text-[#001080]">users</span>.<span className="text-[#795e26]">find</span>(<span className="text-[#001080]">userId</span>){'\n'}
        {'  );\n'}
        {'}\n\n'}
        <span className="text-green-700">{'// Subsequent calls return the cached JCS hash instantly.\n'}</span>
        <span className="text-blue-600">const</span> <span className="text-[#001080]">user</span> <span className="text-blue-600">=</span> <span className="text-blue-600">await</span> <span className="text-[#795e26]">fetchUserData</span>(<span className="text-[#a31515]">'123'</span>);
      </>
    ),
    output: `[Trajectory IR] Operation: fetch_user
[Trajectory IR] Executing closure...
[Trajectory IR] Data fetched from DB.
[Trajectory IR] Sealed with SHA256: 8f7e9c29a...
---
[Trajectory IR] Operation: fetch_user
[Trajectory IR] Cache HIT (SHA256: 8f7e9c29a...)
[Trajectory IR] Skipping closure execution.`
  },
  'crash-recovery': {
    id: 'crash-recovery',
    title: 'Crash Recovery',
    description: 'Powered by DBOS, if your agent crashes mid-execution, it resumes exactly where it left off without re-running previous side-effects.',
    lines: 18,
    code: (
      <>
        <span className="text-blue-600">import</span> {'{ '}
        <span className="text-[#267f99]">Trajectory</span>, <span className="text-[#267f99]">Workflow</span>
        {' } '} <span className="text-blue-600">from</span> <span className="text-[#a31515]">'trajectory-ir'</span>;
        {'\n\n'}
        <span className="text-[#267f99]">@Workflow</span>(){'\n'}
        <span className="text-blue-600">async</span> <span className="text-blue-600">function</span> <span className="text-[#795e26]">multiStepAgentProcess</span>(<span className="text-[#001080]">data</span>: <span className="text-[#267f99]">any</span>) {'{\n'}
        <span className="text-green-700">{'  // Step 1: Execute and seal\n'}</span>
        {'  '}<span className="text-blue-600">const</span> <span className="text-[#001080]">step1</span> <span className="text-blue-600">=</span> <span className="text-blue-600">await</span> <span className="text-[#267f99]">Trajectory</span>.<span className="text-[#795e26]">seal</span>({'\n'}
        {'    { '}<span className="text-[#001080]">step</span>: <span className="text-[#098658]">1</span> {'}, \n'}
        {'    () '}<span className="text-blue-600">=&gt;</span> <span className="text-[#795e26]">callExternalAPI</span>(<span className="text-[#001080]">data</span>){'\n'}
        {'  );\n\n'}
        <span className="text-green-700">{'  // 💥 Simulate a server crash here!\n'}</span>
        <span className="text-green-700">{'  // When restarted, Step 1 is NOT re-executed.\n\n'}</span>
        <span className="text-green-700">{'  // Step 2: Resumes safely\n'}</span>
        {'  '}<span className="text-blue-600">return</span> <span className="text-blue-600">await</span> <span className="text-[#267f99]">Trajectory</span>.<span className="text-[#795e26]">seal</span>({'\n'}
        {'    { '}<span className="text-[#001080]">step</span>: <span className="text-[#098658]">2</span> {'}, \n'}
        {'    () '}<span className="text-blue-600">=&gt;</span> <span className="text-[#795e26]">processData</span>(<span className="text-[#001080]">step1</span>){'\n'}
        {'  );\n'}
        {'}'}
      </>
    ),
    output: `[Trajectory IR] Starting Workflow: multiStepAgentProcess
[Trajectory IR] Executing Step 1...
[Trajectory IR] Step 1 sealed.
[SYSTEM] Process killed (SIGTERM).
---
[Trajectory IR] Resuming Workflow: multiStepAgentProcess
[Trajectory IR] Step 1 already sealed. Skipping execution.
[Trajectory IR] Executing Step 2...
[Trajectory IR] Workflow complete.`
  },
  'human-gate': {
    id: 'human-gate',
    title: 'Human-in-the-Loop Gate',
    description: 'Automatically pause non-idempotent or high-risk operations until a human operator approves them.',
    lines: 15,
    code: (
      <>
        <span className="text-blue-600">import</span> {'{ '}
        <span className="text-[#267f99]">Trajectory</span>, <span className="text-[#267f99]">SecurityLevel</span>
        {' } '} <span className="text-blue-600">from</span> <span className="text-[#a31515]">'trajectory-ir'</span>;
        {'\n\n'}
        <span className="text-blue-600">async</span> <span className="text-blue-600">function</span> <span className="text-[#795e26]">deployToProduction</span>(<span className="text-[#001080]">cluster</span>: <span className="text-[#267f99]">string</span>) {'{\n'}
        <span className="text-green-700">{'  // This operation is highly destructive/non-idempotent.\n'}</span>
        <span className="text-green-700">{'  // Execution will pause and wait for human approval.\n'}</span>
        {'  '}<span className="text-blue-600">return</span> <span className="text-blue-600">await</span> <span className="text-[#267f99]">Trajectory</span>.<span className="text-[#795e26]">seal</span>({'\n'}
        {'    { '}<span className="text-[#001080]">operation</span>: <span className="text-[#a31515]">'deploy'</span>, <span className="text-[#001080]">cluster</span> {'},\n'}
        {'    '}<span className="text-blue-600">async</span> () <span className="text-blue-600">=&gt;</span> <span className="text-blue-600">await</span> <span className="text-[#001080]">cloud</span>.<span className="text-[#795e26]">deploy</span>(<span className="text-[#001080]">cluster</span>),{'\n'}
        {'    { \n'}
        {'      '}<span className="text-[#001080]">securityLevel</span>: <span className="text-[#267f99]">SecurityLevel</span>.<span className="text-[#0070c1]">HIGH_RISK</span>,{'\n'}
        {'      '}<span className="text-[#001080]">requireApproval</span>: <span className="text-blue-600">true</span> {'\n'}
        {'    }\n'}
        {'  );\n'}
        {'}'}
      </>
    ),
    output: `[Trajectory IR] Operation: deploy (cluster: production)
[Trajectory IR] WARNING: High Risk Operation Detected.
[Trajectory IR] Status: BLOCKED_NEEDS_GATE
[Trajectory IR] Waiting for human approval...
---
[Trajectory IR] Operator (admin@org.com) approved.
[Trajectory IR] Executing closure...
[Trajectory IR] Deployment successful.`
  }
};

const TSIcon = () => (
  <svg viewBox="0 0 128 128" width="14" height="14">
    <path fill="#3178C6" d="M0 0h128v128H0z" />
    <path fill="#FFF" d="M96.262 108.647c-5.748 5.76-15.006 8.784-25.045 8.784-18.068 0-29.356-8.665-31.259-21.78l12.784-7.585c1.42 7.747 8.016 12.399 18.01 12.399 7.746 0 12.807-3.415 12.807-8.136 0-14.735-37.49-5.918-37.49-31.119 0-11.233 8.706-19.344 24.385-19.344 14.59 0 25.405 6.208 28.167 19.308l-12.706 7.02c-1.426-6.398-6.953-9.52-14.97-9.52-7.067 0-11.164 3.018-11.164 7.641 0 13.972 37.487 5.733 37.487 31.267.001 4.542-1.748 8.162-5.005 11.065zM22.015 43.155V30.134h44.386v13.021H44.316v74.288h-14.36V43.155H22.015z" />
  </svg>
);

export function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>('idempotent');
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
              <TSIcon />
              <span className="text-[12px] font-sans text-zinc-700">example.ts</span>
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
