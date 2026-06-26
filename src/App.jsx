import { useState, useEffect, useRef } from 'react';
import CubeWave from './components/CubeWave';
import Pricing from './components/Pricing';
import DynamicBento from './components/DynamicBento';

export default function App() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Case Studies state
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);

  // Features Tabs state
  const [activeTab, setActiveTab] = useState('discovery');

  // FAQ Accordion state
  const [activeFaqIndex, setActiveFaqIndex] = useState(-1);

  // Matrix eye background Ref
  const matrixRef = useRef(null);

  useEffect(() => {
    document.title = "Armory | Power Your Future";
  }, []);

  // Matrix rain effect for the digital eye section
  useEffect(() => {
    const matrix = matrixRef.current;
    if (!matrix) return;

    const characters = '0123456789ABCDEF░▒▓█▄▀';
    const rows = 30;
    const cols = 50;
    let gridContent = '';
    for (let r = 0; r < rows; r++) {
      let row = '';
      for (let c = 0; c < cols; c++) {
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        const opacity = (Math.random() * 0.4 + 0.1).toFixed(2);
        row += `<span style="opacity:${opacity};display:inline-block;width:1ch;">${char}</span>`;
      }
      gridContent += `<div class="flex">${row}</div>`;
    }
    matrix.innerHTML = gridContent;

    const interval = setInterval(() => {
      const spans = matrix.querySelectorAll('span');
      if (spans.length === 0) return;
      const randomIndex = Math.floor(Math.random() * spans.length);
      const newChar = characters.charAt(Math.floor(Math.random() * characters.length));
      spans[randomIndex].textContent = newChar;
      spans[randomIndex].style.opacity = Math.random().toFixed(2);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#172B36] text-[#F1F6F4] font-sans antialiased overflow-x-hidden min-h-screen">
      
      {/* 4-column visible grid lines background */}
      <div className="fixed inset-0 max-w-7xl mx-auto grid grid-cols-4 pointer-events-none z-0 px-6 md:px-0">
        <div className="border-r border-[#D9E8E2]/10 h-full"></div>
        <div className="border-r border-[#D9E8E2]/10 h-full"></div>
        <div className="border-r border-[#D9E8E2]/10 h-full"></div>
        <div className="h-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto border-x border-[#D9E8E2]/10 bg-[#172B36]">
        
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-[#172B36]/90 backdrop-blur-md border-b border-[#D9E8E2]/10">
          <div className="grid grid-cols-2 md:grid-cols-4 items-center h-20 px-6">
            
            {/* Col 1: Logo */}
            <div className="md:border-r border-[#D9E8E2]/10 h-full flex items-center pr-6">
              <a href="#hero" className="flex items-center space-x-3 group" id="nav-logo">
                <svg className="w-6 h-6 text-[#FFC801] fill-current" viewBox="0 0 24 24">
                  <path d="M19 10h-6V3.5L5 14h6v6.5z"/>
                </svg>
                <span className="font-mono text-xl font-bold tracking-tight text-[#F1F6F4]">armory</span>
              </a>
            </div>
            
            {/* Col 2 & 3: Navigation Desktop */}
            <div className="hidden md:flex md:col-span-2 border-r border-[#D9E8E2]/10 h-full items-center justify-center space-x-8 text-xs font-mono text-[#D9E8E2]/80">
              <a href="#features" className="hover:text-[#FFC801] transition-colors">Features</a>
              <a href="#workflow" className="hover:text-[#FFC801] transition-colors">Workflow</a>
              <a href="#bento" className="hover:text-[#FFC801] transition-colors">Stats</a>
              <a href="#pricing" className="hover:text-[#FFC801] transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-[#FFC801] transition-colors">FAQ</a>
            </div>
            
            {/* Col 4: Action / Hamburger */}
            <div className="h-full flex items-center justify-end pl-6">
              <a href="#pricing" className="hidden md:inline-flex bg-[#F1F6F4] text-[#172B36] font-mono px-4 py-2 text-xs font-bold rounded hover:bg-[#FFC801] transition-colors" id="btn-header-cta">
                Get Started
              </a>
              <button 
                className="md:hidden flex flex-col justify-center space-y-1.5 w-6 h-6 focus:outline-none" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                id="mobile-menu-toggle"
              >
                <span 
                  className="w-full h-0.5 bg-[#F1F6F4] transition-all duration-300" 
                  style={{ transform: mobileMenuOpen ? 'translateY(5px) rotate(45deg)' : 'none' }}
                ></span>
                <span 
                  className="w-3/4 h-0.5 bg-[#F1F6F4] transition-all duration-300 self-end"
                  style={{ 
                    transform: mobileMenuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
                    width: mobileMenuOpen ? '100%' : '75%'
                  }}
                ></span>
              </button>
            </div>
          </div>
          
          {/* Mobile Nav Overlay */}
          <div 
            className={`fixed inset-y-0 right-0 z-30 w-64 bg-[#172B36] border-l border-[#D9E8E2]/10 flex flex-col justify-start pt-24 px-8 space-y-8 text-lg font-mono transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            id="mobile-nav-menu"
          >
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FFC801] text-[#D9E8E2]/80">Features</a>
            <a href="#workflow" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FFC801] text-[#D9E8E2]/80">Workflow</a>
            <a href="#bento" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FFC801] text-[#D9E8E2]/80">Stats</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FFC801] text-[#D9E8E2]/80">Pricing</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FFC801] text-[#D9E8E2]/80">FAQ</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="inline-block bg-[#F1F6F4] text-[#172B36] font-mono text-center py-3 text-sm font-bold rounded hover:bg-[#FFC801] transition-colors w-full">
              Get Started
            </a>
          </div>
        </header>
        
        <main>
          
          {/* ═══════════════ HERO SECTION ═══════════════ */}
          <section id="hero" className="relative border-b border-[#D9E8E2]/10 overflow-hidden bg-[#172B36]">
            <CubeWave />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 items-stretch min-h-[600px]">
              
              {/* Col 1 & 2: Text / CTA */}
              <div className="md:col-span-2 md:border-r border-[#D9E8E2]/10 p-8 sm:p-16 flex flex-col justify-center space-y-8 bg-[#172B36]/60 backdrop-blur-[2px]">
                <div className="inline-flex items-center space-x-2 border border-[#D9E8E2]/20 px-3 py-1 rounded-full bg-[#114C5A]/20 text-[10px] font-mono text-[#FFC801] w-fit">
                  <span>// DEPLOYMENT READY</span>
                </div>
                <h1 className="font-sans font-medium text-[4.5rem] md:text-[6.5rem] leading-[0.95] text-[#F1F6F4] tracking-tighter uppercase">
                  POWER YOUR<br />FUTURE<br />WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC801] to-[#FF9932]">AI</span>
                </h1>
                <p className="text-sm text-[#D9E8E2]/80 max-w-md font-mono leading-relaxed">
                  Deploy custom enterprise agents and automate complex workflows on an infinite canvas with zero-dependency execution.
                </p>
                <div>
                  <a href="#pricing" className="inline-flex items-center space-x-3 bg-[#FFC801] hover:bg-[#FF9932] text-[#172B36] font-mono px-6 py-4 rounded text-xs font-bold transition-all duration-300 group" id="hero-cta-btn">
                    <span>Build A Workflow</span>
                    <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5l7.5 7.5l-7.5 7.5"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Col 3: Category Selectors */}
              <div className="md:border-r border-[#D9E8E2]/10 p-8 sm:p-12 flex flex-col justify-center bg-[#172B36]/40 backdrop-blur-[2px]">
                <div className="space-y-6 font-mono text-lg font-bold text-[#D9E8E2]/60">
                  {['AI Strategy', 'Custom Agents', 'Process Automation', 'Data Intelligence'].map((item, i) => (
                    <div key={i} className={`group flex items-center justify-between ${i < 3 ? 'border-b border-[#D9E8E2]/10 pb-4' : 'pb-2'} cursor-pointer hover:text-[#FFC801] transition-colors duration-200`}>
                      <span>{item}</span>
                      <svg className="w-4 h-4 transform -rotate-45 group-hover:rotate-0 transition-transform duration-200 text-[#D9E8E2]/40 group-hover:text-[#FFC801] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5l7.5 7.5l-7.5 7.5"/>
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Col 4: Trusted Partners */}
              <div className="p-8 sm:p-12 flex flex-col justify-end bg-[#172B36]/30 backdrop-blur-[2px]">
                <div className="space-y-4">
                  <span className="block text-[10px] font-mono text-[#D9E8E2]/40 uppercase tracking-wider">// TRUSTED PARTNERS</span>
                  <div className="flex flex-col space-y-3 font-bold text-sm text-[#D9E8E2]/60">
                    <span className="hover:text-[#F1F6F4] transition-colors cursor-default">cigna</span>
                    <span className="hover:text-[#F1F6F4] transition-colors cursor-default">aetna</span>
                    <span className="hover:text-[#F1F6F4] transition-colors cursor-default">Anthem</span>
                  </div>
                </div>
              </div>
              
            </div>
          </section>
          
          {/* ═══════════════ STATISTICS SECTION ═══════════════ */}
          <section id="stats" className="border-b border-[#D9E8E2]/10 bg-[#172B36]">
            <div className="grid grid-cols-1 md:grid-cols-4 items-stretch">
              <div className="md:border-r border-[#D9E8E2]/10 p-8 flex flex-col justify-between space-y-6">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-[#FFC801]">
                  <div className="flex space-x-0.5">
                    <span className="w-1 h-3 bg-[#FFC801] transform skew-x-12"></span>
                    <span className="w-1 h-3 bg-[#FFC801]/60 transform skew-x-12"></span>
                    <span className="w-1 h-3 bg-[#FFC801]/30 transform skew-x-12"></span>
                  </div>
                  <span>STATISTICS</span>
                </div>
                <button className="bg-[#114C5A]/30 hover:bg-[#114C5A]/50 border border-[#D9E8E2]/20 px-4 py-2.5 rounded font-mono text-xs font-bold text-[#F1F6F4] flex items-center space-x-2 w-fit transition-colors" id="btn-stats-report">
                  <svg className="w-4 h-4 fill-none stroke-current text-[#FFC801] animate-pulse" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"/>
                  </svg>
                  <span>View Report</span>
                </button>
              </div>
              <div className="md:border-r border-[#D9E8E2]/10 md:col-span-2 p-8 sm:p-12 flex flex-col justify-center space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F6F4] leading-tight">
                  Quantifiable impact across every deployment.
                </h2>
                <p className="text-[#D9E8E2]/80 text-xs font-mono leading-relaxed max-w-md">
                  We measure success by the speed and scale of your neural ops. Evaluate execution parameters in real-time.
                </p>
              </div>
              <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6 divide-y divide-[#D9E8E2]/10">
                <div className="pb-4">
                  <span className="block text-3xl font-mono font-bold text-[#FFC801]">12ms</span>
                  <span className="block text-[10px] font-mono text-[#D9E8E2]/60 mt-1 uppercase">// Average inference latency</span>
                </div>
                <div className="py-4">
                  <span className="block text-3xl font-mono font-bold text-[#FF9932]">10x</span>
                  <span className="block text-[10px] font-mono text-[#D9E8E2]/60 mt-1 uppercase">// Manual speed increase</span>
                </div>
                <div className="pt-4">
                  <span className="block text-3xl font-mono font-bold text-[#F1F6F4]">99%</span>
                  <span className="block text-[10px] font-mono text-[#D9E8E2]/60 mt-1 uppercase">// Uptime SLA guarantee</span>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════ CASE STUDIES (LIGHT THEME) ═══════════════ */}
          <section id="cases" className="border-b border-[#172B36]/10 bg-[#F1F6F4] text-[#172B36]">
            <div className="grid grid-cols-1 md:grid-cols-4 items-stretch">
              <div className="md:border-r border-[#172B36]/10 p-8 flex flex-col justify-between space-y-8">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-[#114C5A]">
                  <div className="flex space-x-0.5">
                    <span className="w-1 h-3 bg-[#114C5A] transform skew-x-12"></span>
                    <span className="w-1 h-3 bg-[#114C5A]/60 transform skew-x-12"></span>
                    <span className="w-1 h-3 bg-[#114C5A]/30 transform skew-x-12"></span>
                  </div>
                  <span>CASE STUDIES</span>
                </div>
                <div className="flex flex-col space-y-4 font-mono text-base font-bold">
                  {['cigna', 'aetna', 'Anthem'].map((name, i) => (
                    <div 
                      key={i}
                      className={`border p-4 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${activeCaseIndex === i ? 'border-transparent active-cosmic-wave text-white' : 'border-[#172B36]/10 text-[#172B36]/40 hover:border-[#114C5A]'}`}
                      onClick={() => setActiveCaseIndex(i)}
                    >
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:border-r border-[#172B36]/10 p-8 sm:p-12 flex flex-col justify-center space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-[#172B36]">
                  Proven neural solutions
                </h2>
                <p className="text-[#114C5A]/85 text-xs font-mono leading-relaxed">
                  We partner with industry leaders to deploy bespoke AI agents that solve complex operational hurdles and drive measurable growth.
                </p>
                <div className="pt-4">
                  <button className="bg-[#172B36] hover:bg-[#114C5A] text-[#F1F6F4] font-mono px-4 py-2.5 rounded text-xs font-bold flex items-center space-x-2 transition-colors duration-200" id="btn-more-cases">
                    <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25l-7.5 7.5l-7.5-7.5"/>
                    </svg>
                    <span>More Projects</span>
                  </button>
                </div>
              </div>
              <div className="md:col-span-2 p-8 sm:p-12 flex flex-col justify-center divide-y divide-[#172B36]/10">
                {[
                  { year: '2026', title: 'Cigna Smart Health Systems', desc: 'Revolutionizing patient care through predictive analytics and seamless AI-driven diagnostic integration tools.' },
                  { year: '2026', title: 'Aetna Health Data Ecosystem', desc: "We automated Aetna's member data management using secure AI to provide personalized care and clinical insights." },
                  { year: '2026', title: 'Anthem Neural Care Network', desc: "We deployed a custom LLM to automate Anthem's provider relations, reducing ticket latency by eighty-five percent." }
                ].map((c, i) => (
                  <div key={i} className="py-6 cursor-pointer group transition-colors" onClick={() => setActiveCaseIndex(i)}>
                    <div className="flex justify-between items-start space-x-4">
                      <div className="space-y-2">
                        <span className="block font-mono text-[10px] text-[#114C5A]/40">// {c.year}</span>
                        <h3 className={`text-lg font-bold group-hover:text-[#FF9932] transition-colors ${activeCaseIndex === i ? 'text-[#FF9932] underline underline-offset-4 decoration-[#FF9932]/40' : 'text-[#172B36]/80'}`}>
                          {c.title}
                        </h3>
                        <p className="text-xs text-[#114C5A]/70 leading-relaxed font-mono">{c.desc}</p>
                      </div>
                      <div className={`transition-colors pr-2 ${activeCaseIndex === i ? 'text-[#FF9932]' : 'text-[#114C5A]/30 group-hover:text-[#FF9932]'}`}>
                        <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5l7.5 7.5l-7.5 7.5"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════ WORKFLOW CANVAS (DARK) ═══════════════ */}
          <section id="workflow" className="py-24 border-b border-[#D9E8E2]/10 bg-[#172B36]">
            <div className="px-6">
              <div className="max-w-3xl space-y-6 mb-16">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-[#FFC801]">
                  <div className="flex space-x-0.5">
                    <span className="w-1 h-3 bg-[#FFC801] transform skew-x-12"></span>
                    <span className="w-1 h-3 bg-[#FFC801]/60 transform skew-x-12"></span>
                    <span className="w-1 h-3 bg-[#FFC801]/30 transform skew-x-12"></span>
                  </div>
                  <span>OUR PRODUCT</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F1F6F4]">Build logic at scale</h2>
                <p className="text-[#D9E8E2]/80 text-xs font-mono max-w-xl leading-relaxed">
                  Design, deploy, and manage sophisticated AI workflows through an intuitive visual interface. No complex coding—just pure logic.
                </p>
              </div>
              
              {/* Flow Node Canvas */}
              <div className="relative w-full border border-[#D9E8E2]/10 bg-[#172B36]/40 rounded-2xl p-6 sm:p-12 mb-16 overflow-hidden select-none">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-stretch justify-between">
                  {/* Sidebar */}
                  <div className="w-full md:w-56 bg-[#172B36]/60 border border-[#D9E8E2]/10 rounded-xl p-4 space-y-4">
                    <div className="flex border-b border-[#D9E8E2]/10 pb-2">
                      <button className="flex-1 text-center py-1 text-[10px] font-mono font-bold border-b-2 border-[#FFC801] text-[#FFC801]">AI AGENT</button>
                      <button className="flex-1 text-center py-1 text-[10px] font-mono text-[#D9E8E2]/40 hover:text-[#F1F6F4]">AI CHAT</button>
                    </div>
                    <span className="block text-[8px] font-mono text-[#D9E8E2]/40 uppercase tracking-widest">Stack Nodes</span>
                    <div className="grid grid-cols-3 gap-2">
                      {['🤖','⚡','✦','⚙','💬','+'].map((e, i) => (
                        <div key={i} className="bg-[#114C5A]/20 border border-[#D9E8E2]/10 p-2 rounded flex items-center justify-center cursor-pointer hover:border-[#FFC801] transition-colors">{e}</div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-[#D9E8E2]/10 flex items-center justify-between text-[8px] font-mono text-[#D9E8E2]/40">
                      <span>STATUS: AUTO</span>
                      <span className="w-2 h-2 rounded-full bg-[#FFC801] animate-pulse"></span>
                    </div>
                  </div>
                  
                  {/* Flow Nodes */}
                  <div className="flex-1 flex flex-col justify-center space-y-8 min-h-[300px] overflow-x-auto py-4">
                    <div className="flex items-center space-x-6 min-w-[600px] relative justify-center">
                      <div className="bg-[#172B36] border border-[#D9E8E2]/20 p-4 rounded-xl shadow-lg flex items-center space-x-3 w-48 relative group hover:border-[#FFC801] transition-colors">
                        <div className="p-2 bg-[#FFC801]/10 text-[#FFC801] rounded">✉</div>
                        <div className="flex-1 min-w-0">
                          <span className="block text-[8px] font-mono text-[#D9E8E2]/40">TRIGGER</span>
                          <span className="block text-xs font-bold text-[#F1F6F4] truncate">Email Trigger (IMAP)</span>
                        </div>
                      </div>
                      <div className="w-10 h-0.5 bg-[#D9E8E2]/20 relative"></div>
                      <div className="bg-[#172B36] border border-[#D9E8E2]/20 p-4 rounded-xl shadow-lg flex items-center space-x-3 w-48 relative group hover:border-[#FFC801] transition-colors">
                        <div className="p-2 bg-[#FF9932]/10 text-[#FF9932] rounded">✎</div>
                        <div className="flex-1 min-w-0">
                          <span className="block text-[8px] font-mono text-[#D9E8E2]/40">MODIFIER</span>
                          <span className="block text-xs font-bold text-[#F1F6F4] truncate">Edit Fields (Manual)</span>
                        </div>
                      </div>
                      <div className="w-10 h-0.5 bg-[#D9E8E2]/20 relative"></div>
                      <div className="bg-[#114C5A]/20 border-2 border-[#FFC801] p-4 rounded-xl shadow-lg flex items-center space-x-3 w-52 relative group">
                        <div className="p-2 bg-[#FFC801] text-[#172B36] rounded font-mono font-bold text-xs">⚡</div>
                        <div className="flex-1 min-w-0">
                          <span className="block text-[8px] font-mono text-[#FFC801]">// AI AGENT</span>
                          <span className="block text-xs font-bold text-[#F1F6F4] truncate">Tools Agent Node</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center space-x-12 pt-4">
                      <div className="bg-[#172B36] border border-[#D9E8E2]/10 p-3 rounded-lg flex items-center space-x-2.5 w-44">
                        <span className="text-sm">✈</span>
                        <div>
                          <span className="block text-[7px] font-mono text-[#D9E8E2]/40">TELEGRAM</span>
                          <span className="block text-[10px] font-bold text-[#F1F6F4] truncate">Send Telegram Msg</span>
                        </div>
                      </div>
                      <div className="bg-[#172B36] border border-[#D9E8E2]/10 p-3 rounded-lg flex items-center space-x-2.5 w-44">
                        <span className="text-xs font-mono">&lt;/&gt;</span>
                        <div>
                          <span className="block text-[7px] font-mono text-[#D9E8E2]/40">CODE EXECUTION</span>
                          <span className="block text-[10px] font-bold text-[#F1F6F4] truncate">Format JSON Payload</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Feature Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037a.75.75 0 0 1-.646 1.353a5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Z"/>, title: 'Infinite Canvas', desc: 'Map out multi-step agent behaviors on a high-precision grid. Drag and drop triggers, logic gates, and actions.' },
                  { icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93c.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204c.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78c-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107c-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93c-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204c-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78c.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107c.397-.165.71-.505.78-.929l.15-.894Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"/></>, title: 'Autonomous Ops', desc: 'Run complex decision trees without manual intervention. Our engine handles conditional branching automatically.' },
                  { icon: <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5l7.5 7.5-7.5 7.5"/>, title: 'Shielded Flows', desc: 'Every node and data transfer is shielded by industrial-grade security. Maintain total control over data flow.' },
                  { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22"/>, title: 'Production-Ready', desc: 'Connect core business platforms and internal services through secure APIs that dynamically scale.' }
                ].map((f, i) => (
                  <div key={i} className="space-y-3">
                    <div className="w-10 h-10 rounded bg-[#114C5A]/30 border border-[#D9E8E2]/10 flex items-center justify-center text-[#FFC801]">
                      <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5">{f.icon}</svg>
                    </div>
                    <h3 className="font-mono text-sm font-bold text-[#F1F6F4] uppercase tracking-tight">{f.title}</h3>
                    <p className="text-[#D9E8E2]/80 text-xs font-mono leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════ BENTO GRID (Component) ═══════════════ */}
          <DynamicBento />

          {/* ═══════════════ BUILT FOR LONG TERM (SPLIT THEME) ═══════════════ */}
          <section id="longterm" className="border-b border-[#D9E8E2]/10 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4 items-stretch">
              {/* Left: Digital Eye (DARK) */}
              <div className="md:col-span-2 md:border-r border-[#D9E8E2]/10 bg-[#172B36] p-12 sm:p-20 flex flex-col items-center justify-center relative overflow-hidden h-[450px]">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="absolute inset-0 flex items-center justify-center text-[7px] font-mono text-[#114C5A]/20 leading-none select-none overflow-hidden" ref={matrixRef}></div>
                <div className="relative z-10 w-3/4 h-3/4 flex items-center justify-center text-[#FFC801]/80" id="digital-eye-container">
                  <svg className="w-full h-full stroke-current fill-none" viewBox="0 0 100 100" strokeWidth="1">
                    <path d="M10 50 C 30 20, 70 20, 90 50 C 70 80, 30 80, 10 50 Z" />
                    <circle cx="50" cy="50" r="18" strokeDasharray="2 2" />
                    <circle cx="50" cy="50" r="8" fill="currentColor" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="#FF9932" strokeWidth="2" id="scanner-line"/>
                  </svg>
                </div>
              </div>
              {/* Right: Features (LIGHT) */}
              <div className="md:col-span-2 bg-[#F1F6F4] text-[#172B36] p-12 sm:p-20 flex flex-col justify-center space-y-12">
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Built for the long term</h2>
                  <p className="text-[#114C5A]/80 text-xs font-mono leading-relaxed">
                    We don't just ship code; we architect neural ecosystems. Our approach combines rigorous testing with rapid deployment cycles.
                  </p>
                </div>
                <div className="space-y-6">
                  {[
                    { icon: '⭐', title: 'Prime Logic', desc: 'We prioritize high-fidelity model alignment for consistent results.' },
                    { icon: '👁️', title: 'Total Clarity', desc: 'Gain full observability into how data is processed and indexed.' },
                    { icon: '⚡', title: 'Fast Cycles', desc: 'Transition from prototype to production in weeks, not months.' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 shrink-0 bg-[#D9E8E2]/40 rounded flex items-center justify-center text-[#FFC801] font-bold text-xs">{item.icon}</div>
                      <div>
                        <h4 className="font-mono text-sm font-bold">{item.title}</h4>
                        <p className="text-[#114C5A]/60 text-[11px] mt-0.5 font-mono">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════ FEATURES TABS (DARK) ═══════════════ */}
          <section id="features" className="py-24 border-b border-[#D9E8E2]/10 bg-[#172B36]">
            <div className="px-6">
              <div className="max-w-3xl space-y-6 mb-16">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-[#FFC801]">
                  <div className="flex space-x-0.5">
                    <span className="w-1 h-3 bg-[#FFC801] transform skew-x-12"></span>
                    <span className="w-1 h-3 bg-[#FFC801]/60 transform skew-x-12"></span>
                    <span className="w-1 h-3 bg-[#FFC801]/30 transform skew-x-12"></span>
                  </div>
                  <span>PRODUCT FEATURES</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F1F6F4]">Engineered for autonomy</h2>
                <p className="text-[#D9E8E2]/80 text-xs font-mono max-w-xl">Go beyond simple chat interfaces. Armory provides the underlying architecture.</p>
              </div>
              
              <div className="flex border-b border-[#D9E8E2]/10 font-mono text-xs sm:text-sm overflow-x-auto" id="features-tab-selectors">
                {[
                  { key: 'discovery', label: '🔍 DISCOVERY' },
                  { key: 'analysis', label: '📊 ANALYSIS' },
                  { key: 'training', label: '⭐ TRAINING' },
                  { key: 'deploy', label: '💾 DEPLOY' }
                ].map(t => (
                  <button 
                    key={t.key}
                    className={`px-6 py-4 border-b-2 font-bold shrink-0 transition-colors ${activeTab === t.key ? 'border-[#FFC801] text-[#FFC801]' : 'border-transparent text-[#D9E8E2]/40 hover:text-[#F1F6F4]'}`}
                    onClick={() => setActiveTab(t.key)}
                  >{t.label}</button>
                ))}
              </div>
              
              <div className="pt-8 min-h-[300px]" id="features-tab-content">
                {activeTab === 'discovery' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-[#F1F6F4]">Scan and identify structural patterns</h3>
                      <p className="text-[#D9E8E2]/80 text-xs font-mono leading-relaxed">Locate operational pathways automatically. Armory scans file systems to build data schemas.</p>
                    </div>
                    <div className="border border-[#D9E8E2]/10 bg-[#172B36]/40 p-6 rounded-2xl h-56 flex flex-col justify-between font-mono text-xs">
                      <div className="text-[#D9E8E2]/40 text-[9px]">// PROJECT PATH: /workspace/main</div>
                      <div className="text-[#D9E8E2]/60 space-y-1">
                        <div>✓ index.html - Structure audit (100% OK)</div>
                        <div>✓ main.js - Interactive mapping</div>
                      </div>
                      <div className="bg-[#114C5A]/20 p-2.5 rounded text-center text-[#FFC801] animate-pulse uppercase tracking-wider text-[10px]">ANALYZING SCHEMAS...</div>
                    </div>
                  </div>
                )}
                {activeTab === 'analysis' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-[#F1F6F4]">Evaluate performance with precision</h3>
                      <p className="text-[#D9E8E2]/80 text-xs font-mono leading-relaxed">Get real-time scoring on accuracy, context retention, safety and output relevance.</p>
                    </div>
                    <div className="border border-[#D9E8E2]/10 bg-[#172B36]/40 p-6 rounded-2xl h-56 flex flex-col justify-between font-mono text-xs">
                      <span className="text-[#D9E8E2]/40 text-[9px]">// EVALUATION SCORES</span>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-[#172B36] p-4 rounded-xl border border-[#D9E8E2]/5">
                          <span className="block text-2xl font-bold text-[#FFC801]">9/10</span>
                          <span className="text-[8px] text-[#D9E8E2]/40">ACCURACY</span>
                        </div>
                        <div className="bg-[#172B36] p-4 rounded-xl border border-[#D9E8E2]/5">
                          <span className="block text-2xl font-bold text-[#FFC801]">100%</span>
                          <span className="text-[8px] text-[#D9E8E2]/40">CONTEXT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'training' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-[#F1F6F4]">Bespoke model training cycles</h3>
                      <p className="text-[#D9E8E2]/80 text-xs font-mono leading-relaxed">Fine-tune model weights on your specialized instructions and enterprise-specific datasets securely.</p>
                    </div>
                    <div className="border border-[#D9E8E2]/10 bg-[#172B36]/40 p-6 rounded-2xl h-56 flex flex-col justify-between font-mono text-xs">
                      <span className="text-[#D9E8E2]/40 text-[9px]">// LOADED: SKILLS/RULES</span>
                      <div className="bg-[#114C5A]/30 p-4 rounded text-center text-[#F1F6F4] font-bold uppercase tracking-wider">Fine-tuning weights: 48% COMPLETE</div>
                    </div>
                  </div>
                )}
                {activeTab === 'deploy' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-[#F1F6F4]">One-click edge node deployments</h3>
                      <p className="text-[#D9E8E2]/80 text-xs font-mono leading-relaxed">Ship workflows to dedicated global edge container nodes for zero-latency execution.</p>
                    </div>
                    <div className="border border-[#D9E8E2]/10 bg-[#172B36]/40 p-6 rounded-2xl h-56 flex flex-col justify-between font-mono text-xs">
                      <span className="text-[#D9E8E2]/40 text-[9px]">// BUILD LOGS</span>
                      <div className="bg-[#FFC801] text-[#172B36] font-mono font-bold text-center py-2.5 rounded uppercase tracking-wider text-[10px]">LIVE DEPLOYMENT ACTIVE</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ═══════════════ INTEGRATIONS (DARK) ═══════════════ */}
          <section id="integrations" className="py-24 border-b border-[#D9E8E2]/10 bg-[#172B36] text-center">
            <div className="px-6">
              <div className="max-w-2xl mx-auto space-y-6 mb-16">
                <div className="inline-flex items-center space-x-2 text-[10px] font-mono text-[#FFC801] mx-auto">
                  <div className="flex space-x-0.5">
                    <span className="w-1.5 h-3 bg-[#FFC801] transform skew-x-12"></span>
                    <span className="w-1.5 h-3 bg-[#FFC801]/60 transform skew-x-12"></span>
                    <span className="w-1.5 h-3 bg-[#FFC801]/30 transform skew-x-12"></span>
                  </div>
                  <span>INTEGRATIONS</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-[#D9E8E2]/80 leading-tight">
                  Armory bridges the gap between your data and your tools. Deploy agents that live where you work.
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto text-[#D9E8E2]/40 font-mono text-sm font-bold uppercase">
                {['AI', 'aws', 'Microsoft', 'bolt', 'slack', 'GitHub', 'Vertex', 'more...'].map((name, i) => (
                  <div key={i} className="border border-[#D9E8E2]/10 p-6 rounded-xl hover:border-[#FFC801] hover:text-[#FFC801] transition-all duration-200">{name}</div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════ TESTIMONIALS (LIGHT) ═══════════════ */}
          <section id="testimonials" className="border-b border-[#172B36]/10 bg-[#F1F6F4] text-[#172B36]">
            <div className="grid grid-cols-1 md:grid-cols-4 items-stretch">
              <div className="md:border-r border-[#172B36]/10 p-8 flex flex-col justify-between space-y-6">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-[#114C5A]">
                  <div className="flex space-x-0.5">
                    <span className="w-1 h-3 bg-[#114C5A] transform skew-x-12"></span>
                    <span className="w-1 h-3 bg-[#114C5A]/60 transform skew-x-12"></span>
                    <span className="w-1 h-3 bg-[#114C5A]/30 transform skew-x-12"></span>
                  </div>
                  <span>TESTIMONIALS</span>
                </div>
                <p className="text-[#114C5A]/60 text-xs font-mono leading-relaxed">Chosen infrastructure for teams building the next era of AI.</p>
              </div>
              <div className="md:col-span-3 p-8 sm:p-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: 'Scales beautifully', quote: '"Reliability is unmatched. We migrated our neural pipeline with zero downtime."', company: '// Vertex Labs' },
                    { title: 'Saved us months', quote: '"Instead of building logic from scratch, we used Armory. Prototype to launch in weeks."', company: '// FlowState AI' },
                    { title: 'Precision inference', quote: '"The observability tools allow us to monitor agent accuracy in real-time."', company: '// Neural Sync' },
                    { title: 'Enterprise default', quote: '"The node-based builder is a game changer for our engineering team."', company: '// Sentinel Ops' }
                  ].map((t, i) => (
                    <div key={i} className="border border-[#172B36]/10 p-6 rounded-xl bg-[#D9E8E2]/20 flex flex-col justify-between h-56 hover:border-[#114C5A] transition-all duration-200">
                      <div className="space-y-2 font-mono">
                        <div className="text-[#FFC801] text-[10px]">★★★★★</div>
                        <h4 className="font-bold text-xs text-[#172B36] uppercase tracking-tight">{t.title}</h4>
                        <p className="text-[10px] text-[#114C5A]/70 leading-relaxed">{t.quote}</p>
                      </div>
                      <span className="block font-mono text-[8px] text-[#114C5A]/40 uppercase">{t.company}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════ ARTICLES (LIGHT) ═══════════════ */}
          <section id="articles" className="border-b border-[#172B36]/10 bg-[#F1F6F4] text-[#172B36]">
            <div className="grid grid-cols-1 md:grid-cols-4 items-stretch">
              <div className="md:border-r border-[#172B36]/10 p-8 flex flex-col justify-between space-y-6">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-[#114C5A]">
                  <div className="flex space-x-0.5">
                    <span className="w-1 h-3 bg-[#114C5A] transform skew-x-12"></span>
                    <span className="w-1 h-3 bg-[#114C5A]/60 transform skew-x-12"></span>
                    <span className="w-1 h-3 bg-[#114C5A]/30 transform skew-x-12"></span>
                  </div>
                  <span>ARTICLES</span>
                </div>
                <button className="bg-[#172B36] hover:bg-[#114C5A] text-[#F1F6F4] font-mono px-4 py-2.5 rounded text-xs font-bold w-fit transition-colors duration-200">
                  View Articles
                </button>
              </div>
              <div className="md:border-r border-[#172B36]/10 md:col-span-2 p-8 sm:p-12 flex flex-col justify-center space-y-4">
                <div className="text-[9px] font-mono text-[#114C5A]/40">APR 29, 2026 • 2 MINS READ</div>
                <h3 className="text-xl font-bold hover:text-[#FF9932] transition-colors cursor-pointer text-[#172B36]">
                  What It Takes to Turn AI Into a Business Asset
                </h3>
                <p className="text-[#114C5A]/80 text-xs font-mono leading-relaxed">
                  Using AI tools is easy. Turning them into something that drives real outcomes across your business requires structure, security pipelines, and custom edge parameters.
                </p>
              </div>
              <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6 divide-y divide-[#172B36]/10">
                <div className="pb-4 group cursor-pointer">
                  <span className="block text-[8px] font-mono text-[#114C5A]/40 mb-1">APR 29, 2026</span>
                  <h4 className="font-bold text-xs text-[#172B36] group-hover:text-[#FF9932] transition-colors">From Prompting to Systems: Shift in AI</h4>
                </div>
                <div className="pt-4 group cursor-pointer">
                  <span className="block text-[8px] font-mono text-[#114C5A]/40 mb-1">APR 12, 2026</span>
                  <h4 className="font-bold text-xs text-[#172B36] group-hover:text-[#FF9932] transition-colors">Securing the Neural Nodes Boundary</h4>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════ FAQ (LIGHT) ═══════════════ */}
          <section id="faq" className="border-b border-[#172B36]/10 bg-[#F1F6F4] text-[#172B36]">
            <div className="grid grid-cols-1 md:grid-cols-4 items-stretch">
              <div className="md:border-r border-[#172B36]/10 p-8 flex flex-col justify-between space-y-6">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-[#114C5A]">
                  <div className="flex space-x-0.5">
                    <span className="w-1 h-3 bg-[#114C5A] transform skew-x-12"></span>
                    <span className="w-1 h-3 bg-[#114C5A]/60 transform skew-x-12"></span>
                    <span className="w-1 h-3 bg-[#114C5A]/30 transform skew-x-12"></span>
                  </div>
                  <span>FAQ</span>
                </div>
                <a href="mailto:support@armory.ai" className="bg-[#172B36] hover:bg-[#114C5A] text-[#F1F6F4] font-mono px-4 py-2.5 rounded text-xs font-bold w-fit text-center transition-colors duration-200" id="faq-contact-btn">
                  Contact Us
                </a>
              </div>
              <div className="md:border-r border-[#172B36]/10 p-8 sm:p-12 flex flex-col justify-center space-y-4">
                <h2 className="text-2xl font-bold leading-tight text-[#172B36]">Common inquiries</h2>
                <p className="text-[#114C5A]/80 text-xs font-mono">Everything you need to know about deploying and scaling agents with Armory.</p>
              </div>
              <div className="md:col-span-2 p-8 sm:p-12 flex flex-col justify-center space-y-4" id="faq-accordion-list">
                {[
                  { q: 'What is the Armory platform?', a: 'Armory is a specialized infrastructure for building and deploying custom AI agents. We provide the neural logic and edge container nodes required.' },
                  { q: 'Who is this platform designed for?', a: 'Engineering teams and product architects scaling multi-agent automated systems.' },
                  { q: 'Can I use my own custom domain?', a: 'Yes, custom domain mappings with automated SSL provisioning are supported starting on the Pro plan.' }
                ].map((faq, i) => (
                  <div key={i} className={`border rounded-xl overflow-hidden transition-all duration-300 ${activeFaqIndex === i ? 'border-[#FFC801] bg-[#D9E8E2]/20' : 'border-[#172B36]/10 bg-[#D9E8E2]/20'}`}>
                    <button 
                      className="w-full px-6 py-4 flex items-center justify-between font-bold text-sm text-left text-[#172B36] focus:outline-none"
                      onClick={() => setActiveFaqIndex(activeFaqIndex === i ? -1 : i)}
                    >
                      <span>{faq.q}</span>
                      <span className="font-mono text-xs text-[#114C5A] shrink-0 ml-4 select-none">{activeFaqIndex === i ? '[ - ]' : '[ + ]'}</span>
                    </button>
                    <div 
                      className="transition-all duration-300 overflow-hidden"
                      style={{ height: activeFaqIndex === i ? 'auto' : '0px' }}
                    >
                      <p className="px-6 pb-6 pt-2 text-xs font-mono text-[#114C5A]/70 leading-relaxed border-t border-[#172B36]/5">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════ PRICING (Component) ═══════════════ */}
          <Pricing />
          
        </main>
        
        {/* ═══════════════ FOOTER (DARK) ═══════════════ */}
        <footer className="pt-24 pb-12 border-t border-[#D9E8E2]/10 bg-[#172B36] relative overflow-hidden">
          <div className="px-6">
            
            {/* Newsletter */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16 border-b border-[#D9E8E2]/10">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-[#FFC801]">
                  <div className="flex space-x-0.5">
                    <span className="w-1 h-3 bg-[#FFC801] transform skew-x-12"></span>
                    <span className="w-1 h-3 bg-[#FFC801]/60 transform skew-x-12"></span>
                    <span className="w-1 h-3 bg-[#FFC801]/30 transform skew-x-12"></span>
                  </div>
                  <span>GET STARTED</span>
                </div>
                <h2 className="text-2xl font-bold text-[#F1F6F4] leading-none">Get smarter about AI systems</h2>
                <p className="text-[#D9E8E2]/60 text-xs font-mono max-w-sm">Weekly insights on automation, AI workflows, and real builds.</p>
              </div>
              <div className="flex flex-col justify-center">
                <form 
                  onSubmit={(e) => { e.preventDefault(); alert("Subscription simulated!"); }} 
                  className="flex flex-col sm:flex-row gap-3 max-w-md w-full"
                >
                  <input 
                    type="email" 
                    placeholder="jane@framer.com" 
                    required 
                    className="flex-1 bg-[#114C5A]/20 border border-[#D9E8E2]/10 px-4 py-3 rounded text-xs text-[#F1F6F4] placeholder-[#D9E8E2]/30 font-mono focus:outline-none focus:border-[#FFC801]"
                  />
                  <button type="submit" className="bg-[#F1F6F4] hover:bg-[#FFC801] text-[#172B36] font-mono px-6 py-3 rounded text-xs font-bold transition-colors duration-200">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
            
            {/* Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
              <div className="space-y-6 col-span-2">
                <div className="flex items-center space-x-3 text-[#FFC801] fill-current">
                  <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path d="M19 10h-6V3.5L5 14h6v6.5z"/>
                  </svg>
                  <span className="font-mono text-2xl font-bold tracking-tight text-[#F1F6F4]">armory</span>
                </div>
                <p className="text-[#D9E8E2]/40 text-xs font-mono max-w-xs leading-relaxed">
                  Leading developer architecture for visual, autonomous multi-agent systems orchestration. Secure, resilient, and blazing fast.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-mono text-xs font-bold text-[#F1F6F4] uppercase tracking-wider">// Links</h4>
                <ul className="space-y-2 text-xs font-mono text-[#D9E8E2]/60">
                  <li><a href="#features" className="hover:text-[#FFC801] transition-colors">Features</a></li>
                  <li><a href="#pricing" className="hover:text-[#FFC801] transition-colors">Pricing</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-mono text-xs font-bold text-[#F1F6F4] uppercase tracking-wider">// Policies</h4>
                <ul className="space-y-2 text-xs font-mono text-[#D9E8E2]/60">
                  <li><a href="#" className="hover:text-[#FFC801]">Terms &amp; Conditions</a></li>
                  <li><a href="#" className="hover:text-[#FFC801]">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-[#D9E8E2]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[#D9E8E2]/40">
              <span>&copy; 2026 Armory AI Inc. All rights reserved.</span>
              <div className="flex items-center space-x-4">
                <a href="#" className="hover:text-[#FFC801]">Twitter</a>
                <a href="#" className="hover:text-[#FFC801]">LinkedIn</a>
              </div>
            </div>
            
          </div>
        </footer>

      </div>
    </div>
  );
}