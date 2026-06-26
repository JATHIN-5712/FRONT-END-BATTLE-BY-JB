import React, { useState, useEffect } from 'react';

export default function DynamicBento() {
  const [activeBentoIndex, setActiveBentoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Resize listener for Bento-to-Accordion context lock
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      setIsMobile(mobile);

      // Context Lock: mobile accordion item opened index transferred to desktop
      if (!mobile && activeBentoIndex === -1) {
        setActiveBentoIndex(0);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeBentoIndex]);

  return (
    <section id="bento" className="border-b border-[#114C5A] bg-[#172B36]">
      <div className="grid grid-cols-1 md:grid-cols-4 items-stretch">
        
        {/* Col 1: Title and details */}
        <div className="md:border-r border-[#114C5A] p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-[#FFC801]">
              <div className="flex space-x-0.5">
                <span className="w-1 h-3 bg-[#FFC801] transform skew-x-12"></span>
                <span className="w-1 h-3 bg-[#FFC801]/60 transform skew-x-12"></span>
                <span className="w-1 h-3 bg-[#FFC801]/30 transform skew-x-12"></span>
              </div>
              <span>PRODUCT STATISTICS</span>
            </div>
            <h2 className="text-2xl font-bold text-[#F1F6F4] leading-tight">Optimized for performance</h2>
            <p className="text-[#D9E8E2]/60 text-xs font-mono leading-relaxed">Monitor every neural pulse in real-time. Armory provides deep telemetry.</p>
          </div>
          
          <button className="border border-[#114C5A] hover:bg-[#FFC801] hover:text-[#172B36] hover:border-[#FFC801] text-[#F1F6F4] font-mono px-4 py-2.5 rounded text-xs font-bold w-fit transition-all duration-200">
            Request Demo
          </button>
        </div>
        
        {/* Col 2 & 3 & 4: Bento statistics cells on desktop, Accordion on mobile */}
        <div className="md:col-span-3 p-8 flex flex-col justify-center">
          
          {/* Desktop Bento Grid */}
          <div className="hidden md:grid grid-cols-3 gap-8" id="bento-grid-desktop">
            
            {/* Card 0: System Load */}
            <div 
              className={`bg-[#114C5A]/10 border rounded-2xl p-6 flex flex-col justify-between h-[340px] relative overflow-hidden transition-all duration-300 cursor-pointer ${activeBentoIndex === 0 ? 'border-[#FFC801]' : 'border-[#114C5A] hover:border-[#D9E8E2]/40'}`}
              onMouseEnter={() => setActiveBentoIndex(0)}
            >
              <div className={`absolute inset-0 bg-gradient-to-t from-[#114C5A]/15 to-transparent transition-opacity duration-300 ${activeBentoIndex === 0 ? 'opacity-100' : 'opacity-0'}`}></div>
              <div className="flex justify-between items-start z-10">
                <div>
                  <span className="font-mono text-[9px] text-[#D9E8E2]/50">// TELEMETRY</span>
                  <h3 className="text-base font-bold text-[#F1F6F4] mt-1">System Load</h3>
                </div>
                <span className="font-mono text-xs text-[#FFC801]">98.7%</span>
              </div>
              <div className="flex flex-col items-center justify-center py-4 z-10">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="56" cy="56" r="46" stroke="#114C5A" strokeWidth="6" fill="none" />
                    <circle cx="56" cy="56" r="46" stroke="#FFC801" strokeWidth="6" fill="none" strokeDasharray="290" strokeDashoffset="90" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="block text-xl font-mono font-bold text-[#F1F6F4]">12</span>
                    <span className="text-[6px] font-mono text-[#D9E8E2]/40 uppercase tracking-widest">Core Systems</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-[9px] font-mono text-[#D9E8E2]/40 border-t border-[#114C5A] pt-3 z-10">
                <span>79% CACHE</span>
                <span>4M UPTIME</span>
              </div>
            </div>
            
            {/* Card 1: SLA Response */}
            <div 
              className={`bg-[#114C5A]/10 border rounded-2xl p-6 flex flex-col justify-between h-[340px] relative overflow-hidden transition-all duration-300 cursor-pointer ${activeBentoIndex === 1 ? 'border-[#FFC801]' : 'border-[#114C5A] hover:border-[#D9E8E2]/40'}`}
              onMouseEnter={() => setActiveBentoIndex(1)}
            >
              <div className={`absolute inset-0 bg-gradient-to-t from-[#114C5A]/15 to-transparent transition-opacity duration-300 ${activeBentoIndex === 1 ? 'opacity-100' : 'opacity-0'}`}></div>
              <div className="flex justify-between items-start z-10">
                <div>
                  <span className="font-mono text-[9px] text-[#D9E8E2]/50">// TELEMETRY</span>
                  <h3 className="text-base font-bold text-[#F1F6F4] mt-1">SLA Response</h3>
                </div>
                <span className="font-mono text-xs text-[#FFC801]">99.99%</span>
              </div>
              <div className="py-4 z-10 flex flex-col justify-end h-32 w-full relative">
                <div className="absolute left-0 right-0 border-t border-dashed border-[#D9E8E2]/20 top-[40%] flex items-center z-10">
                  <span className="bg-[#172B36] text-[7px] font-mono text-[#D9E8E2]/80 px-1 rounded border border-[#114C5A] -translate-y-1/2">SLA 70%</span>
                </div>
                <div className="flex items-end justify-between h-20 px-2">
                  <div className="w-3 bg-[#114C5A]/40 rounded-t h-[60%] hover:bg-[#114C5A]/80 transition-colors duration-200"></div>
                  <div className="w-3 bg-[#114C5A]/40 rounded-t h-[80%] hover:bg-[#114C5A]/80 transition-colors duration-200"></div>
                  <div className="w-3 bg-[#FFC801] rounded-t h-[95%]"></div>
                  <div className="w-3 bg-[#114C5A]/40 rounded-t h-[75%] hover:bg-[#114C5A]/80 transition-colors duration-200"></div>
                  <div className="w-3 bg-[#114C5A]/40 rounded-t h-[90%] hover:bg-[#114C5A]/80 transition-colors duration-200"></div>
                </div>
              </div>
              <div className="flex justify-between text-[9px] font-mono text-[#D9E8E2]/40 border-t border-[#114C5A] pt-3 z-10">
                <span>API 120ms</span>
                <span>DB 18ms</span>
              </div>
            </div>
            
            {/* Card 2: Token Usage */}
            <div 
              className={`bg-[#114C5A]/10 border rounded-2xl p-6 flex flex-col justify-between h-[340px] relative overflow-hidden transition-all duration-300 cursor-pointer ${activeBentoIndex === 2 ? 'border-[#FFC801]' : 'border-[#114C5A] hover:border-[#D9E8E2]/40'}`}
              onMouseEnter={() => setActiveBentoIndex(2)}
            >
              <div className={`absolute inset-0 bg-gradient-to-t from-[#114C5A]/15 to-transparent transition-opacity duration-300 ${activeBentoIndex === 2 ? 'opacity-100' : 'opacity-0'}`}></div>
              <div className="flex justify-between items-start z-10">
                <div>
                  <span className="font-mono text-[9px] text-[#D9E8E2]/50">// TELEMETRY</span>
                  <h3 className="text-base font-bold text-[#F1F6F4] mt-1">Token Usage</h3>
                </div>
                <span className="font-mono text-xs text-[#FFC801]">8.4M</span>
              </div>
              <div className="flex flex-col items-center justify-center py-4 z-10">
                <div className="relative w-28 h-14 overflow-hidden flex flex-col justify-end">
                  <svg className="w-28 h-28 absolute -top-6 left-0">
                    <circle cx="56" cy="56" r="48" stroke="#114C5A" strokeWidth="6" fill="none" strokeDasharray="150" strokeDashoffset="0"/>
                    <circle cx="56" cy="56" r="48" stroke="#FF9932" strokeWidth="6" fill="none" strokeDasharray="150" strokeDashoffset="30"/>
                  </svg>
                  <div className="text-center relative z-10">
                    <span className="block text-xl font-mono font-bold text-[#F1F6F4]">264</span>
                    <span className="text-[6px] font-mono text-[#D9E8E2]/40 uppercase tracking-widest">Active nodes</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-[9px] font-mono text-[#D9E8E2]/40 border-t border-[#114C5A] pt-3 z-10">
                <span>104 QUERIES</span>
                <span>79 NODES</span>
              </div>
            </div>
          </div>
          
          {/* Mobile Accordion Container */}
          <div className="md:hidden space-y-4" id="bento-accordion-mobile">
            
            {/* Item 0 */}
            <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${activeBentoIndex === 0 ? 'border-[#FFC801] bg-[#114C5A]/15' : 'border-[#114C5A] bg-[#172B36]'}`}>
              <button 
                className="w-full px-6 py-4 flex items-center justify-between font-bold text-sm text-[#F1F6F4] focus:outline-none"
                onClick={() => setActiveBentoIndex(activeBentoIndex === 0 ? -1 : 0)}
              >
                <span>System Load</span>
                <span className="font-mono text-xs text-[#FFC801] select-none">{activeBentoIndex === 0 ? '[ - ]' : '[ + ]'}</span>
              </button>
              <div 
                className="transition-all duration-300 overflow-hidden"
                style={{ height: activeBentoIndex === 0 ? 'auto' : '0px' }}
              >
                <div className="px-6 pb-6 pt-2 space-y-4 text-xs font-mono text-[#D9E8E2]/60 border-t border-[#114C5A]">
                  <p>Active neural processing metrics for virtual server environments.</p>
                  <div className="flex justify-between text-[10px] text-[#D9E8E2]/40">
                    <span>79% CACHE</span>
                    <span>4M UPTIME</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Item 1 */}
            <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${activeBentoIndex === 1 ? 'border-[#FFC801] bg-[#114C5A]/15' : 'border-[#114C5A] bg-[#172B36]'}`}>
              <button 
                className="w-full px-6 py-4 flex items-center justify-between font-bold text-sm text-[#F1F6F4] focus:outline-none"
                onClick={() => setActiveBentoIndex(activeBentoIndex === 1 ? -1 : 1)}
              >
                <span>SLA Response</span>
                <span className="font-mono text-xs text-[#FFC801] select-none">{activeBentoIndex === 1 ? '[ - ]' : '[ + ]'}</span>
              </button>
              <div 
                className="transition-all duration-300 overflow-hidden"
                style={{ height: activeBentoIndex === 1 ? 'auto' : '0px' }}
              >
                <div className="px-6 pb-6 pt-2 space-y-4 text-xs font-mono text-[#D9E8E2]/60 border-t border-[#114C5A]">
                  <p>Global uptime monitoring of node clusters.</p>
                  <div className="flex justify-between text-[10px] text-[#D9E8E2]/40">
                    <span>API 120ms</span>
                    <span>DB 18ms</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Item 2 */}
            <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${activeBentoIndex === 2 ? 'border-[#FFC801] bg-[#114C5A]/15' : 'border-[#114C5A] bg-[#172B36]'}`}>
              <button 
                className="w-full px-6 py-4 flex items-center justify-between font-bold text-sm text-[#F1F6F4] focus:outline-none"
                onClick={() => setActiveBentoIndex(activeBentoIndex === 2 ? -1 : 2)}
              >
                <span>Token Usage</span>
                <span className="font-mono text-xs text-[#FFC801] select-none">{activeBentoIndex === 2 ? '[ - ]' : '[ + ]'}</span>
              </button>
              <div 
                className="transition-all duration-300 overflow-hidden"
                style={{ height: activeBentoIndex === 2 ? 'auto' : '0px' }}
              >
                <div className="px-6 pb-6 pt-2 space-y-4 text-xs font-mono text-[#D9E8E2]/60 border-t border-[#114C5A]">
                  <p>Monthly volume throughput indicators.</p>
                  <div className="flex justify-between text-[10px] text-[#D9E8E2]/40">
                    <span>104 QUERIES</span>
                    <span>79 NODES</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
