import React, { useEffect, useRef } from 'react';

// Pricing Matrix Configuration
const pricingMatrix = {
  currencies: {
    USD: { symbol: '$', rate: 1.0 },
    EUR: { symbol: '€', rate: 0.9 },
    INR: { symbol: '₹', rate: 82.0 }
  },
  billingCycles: {
    monthly: { discount: 1.0, cycleLabel: '/mo' },
    annual: { discount: 0.8, cycleLabel: '/mo' } // flat 20% discount
  },
  tiers: {
    starter: 19,
    pro: 49,
    enterprise: 99
  }
};

export default function Pricing() {
  // Pricing switch DOM Refs (for isolated updates)
  const currencySelectRef = useRef(null);
  const billingToggleRef = useRef(null);
  const billingToggleKnobRef = useRef(null);
  const labelMonthlyRef = useRef(null);
  const labelAnnualRef = useRef(null);

  const priceSymbolStarterRef = useRef(null);
  const priceValueStarterRef = useRef(null);
  const priceCycleStarterRef = useRef(null);

  const priceSymbolProRef = useRef(null);
  const priceValueProRef = useRef(null);
  const priceCycleProRef = useRef(null);

  const priceSymbolEnterpriseRef = useRef(null);
  const priceValueEnterpriseRef = useRef(null);
  const priceCycleEnterpriseRef = useRef(null);

  // Billing cycle state ref (avoid component re-renders)
  const billingCycleStateRef = useRef('monthly');

  // Direct DOM updates for pricing
  const updatePricingDOM = () => {
    const currentCurrency = currencySelectRef.current?.value || 'USD';
    const currentBilling = billingCycleStateRef.current;

    const currencyInfo = pricingMatrix.currencies[currentCurrency];
    const billingInfo = pricingMatrix.billingCycles[currentBilling];

    // Toggle visuals directly
    if (billingToggleRef.current && billingToggleKnobRef.current) {
      if (currentBilling === 'annual') {
        billingToggleKnobRef.current.style.transform = 'translateX(16px)';
        billingToggleRef.current.className = 'w-10 h-6 bg-[#FFC801] rounded-full p-0.5 relative transition-colors focus:outline-none';
        billingToggleKnobRef.current.className = 'block w-5 h-5 bg-[#172B36] rounded-full shadow transform transition-transform duration-200';
        if (labelAnnualRef.current) labelAnnualRef.current.className = 'text-xs font-mono text-[#F1F6F4] cursor-pointer';
        if (labelMonthlyRef.current) labelMonthlyRef.current.className = 'text-xs font-mono text-[#F1F6F4]/40 cursor-pointer';
      } else {
        billingToggleKnobRef.current.style.transform = 'translateX(0px)';
        billingToggleRef.current.className = 'w-10 h-6 bg-[#114C5A] border border-[#D9E8E2]/20 rounded-full p-0.5 relative transition-colors focus:outline-none';
        billingToggleKnobRef.current.className = 'block w-5 h-5 bg-[#F1F6F4] rounded-full shadow transform transition-transform duration-200';
        if (labelMonthlyRef.current) labelMonthlyRef.current.className = 'text-xs font-mono text-[#F1F6F4] cursor-pointer';
        if (labelAnnualRef.current) labelAnnualRef.current.className = 'text-xs font-mono text-[#F1F6F4]/40 cursor-pointer';
      }
    }

    // Direct text nodes updates
    const updateTier = (tier, valRef, symRef, cycRef) => {
      if (!valRef.current || !symRef.current || !cycRef.current) return;
      const baseRate = pricingMatrix.tiers[tier];
      const calculatedPrice = Math.round(baseRate * currencyInfo.rate * billingInfo.discount);
      valRef.current.textContent = calculatedPrice.toLocaleString();
      symRef.current.textContent = currencyInfo.symbol;
      cycRef.current.textContent = currentBilling === 'annual' ? '/mo *' : '/mo';
    };

    updateTier('starter', priceValueStarterRef, priceSymbolStarterRef, priceCycleStarterRef);
    updateTier('pro', priceValueProRef, priceSymbolProRef, priceCycleProRef);
    updateTier('enterprise', priceValueEnterpriseRef, priceSymbolEnterpriseRef, priceCycleEnterpriseRef);
  };

  const handleCurrencyChange = () => {
    updatePricingDOM();
  };

  const handleBillingToggle = () => {
    billingCycleStateRef.current = billingCycleStateRef.current === 'monthly' ? 'annual' : 'monthly';
    updatePricingDOM();
  };

  const handleSelectMonthly = () => {
    billingCycleStateRef.current = 'monthly';
    updatePricingDOM();
  };

  const handleSelectAnnual = () => {
    billingCycleStateRef.current = 'annual';
    updatePricingDOM();
  };

  useEffect(() => {
    updatePricingDOM();
  }, []);

  return (
    <section id="pricing" className="py-24 border-b border-[#114C5A] bg-[#172B36]">
      <div className="px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl space-y-6">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-[#FFC801]">
              <div className="flex space-x-0.5">
                <span className="w-1.5 h-3 bg-[#FFC801] transform skew-x-12"></span>
                <span className="w-1.5 h-3 bg-[#FFC801]/60 transform skew-x-12"></span>
                <span className="w-1.5 h-3 bg-[#FFC801]/30 transform skew-x-12"></span>
              </div>
              <span>PRICING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F1F6F4]">Flexible, value-driven plans</h2>
            <p className="text-[#D9E8E2]/60 text-xs font-mono">Choose the scale that matches your AI ambitions. Direct DOM updates.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 bg-[#114C5A]/20 border border-[#114C5A] p-3 rounded-xl max-w-sm">
            <div className="relative w-28">
              <select 
                id="currency-select" 
                ref={currencySelectRef}
                onChange={handleCurrencyChange}
                className="w-full bg-[#172B36] border border-[#114C5A] text-[#F1F6F4] text-xs font-mono px-3 py-2 rounded focus:outline-none focus:border-[#FFC801] appearance-none cursor-pointer"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>
            <div className="flex items-center space-x-3">
              <span 
                className="text-xs font-mono text-[#F1F6F4] cursor-pointer" 
                id="label-billing-monthly" 
                ref={labelMonthlyRef}
                onClick={handleSelectMonthly}
              >
                Monthly
              </span>
              <button 
                className="w-10 h-6 bg-[#114C5A] border border-[#D9E8E2]/20 rounded-full p-0.5 relative transition-colors focus:outline-none" 
                id="billing-toggle" 
                ref={billingToggleRef}
                onClick={handleBillingToggle}
                aria-label="Toggle billing"
              >
                <span 
                  className="block w-5 h-5 bg-[#F1F6F4] rounded-full shadow transform transition-transform duration-200" 
                  id="billing-toggle-knob"
                  ref={billingToggleKnobRef}
                ></span>
              </button>
              <div className="flex items-center space-x-1">
                <span 
                  className="text-xs font-mono text-[#F1F6F4]/40 cursor-pointer" 
                  id="label-billing-annual" 
                  ref={labelAnnualRef}
                  onClick={handleSelectAnnual}
                >
                  Annual
                </span>
                <span className="text-[8px] font-bold bg-[#FFC801]/15 border border-[#FFC801]/30 text-[#FFC801] px-1 rounded">-20%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Starter */}
          <div className="border border-[#114C5A] bg-[#114C5A]/10 rounded-2xl p-8 flex flex-col justify-between hover:border-[#D9E8E2]/40 transition-all relative group">
            <div className="space-y-6">
              <div>
                <span className="font-mono text-[9px] text-[#D9E8E2]/50 uppercase tracking-wider">// CORE</span>
                <h3 className="text-lg font-bold text-[#F1F6F4] mt-1">Starter</h3>
              </div>
              <div className="flex items-baseline space-x-1 font-mono">
                <span className="text-xl text-[#D9E8E2]/40 font-normal" id="price-symbol-starter" ref={priceSymbolStarterRef}>$</span>
                <span className="text-4xl font-bold text-[#F1F6F4]" id="price-value-starter" ref={priceValueStarterRef}>19</span>
                <span className="text-xs text-[#D9E8E2]/40 font-normal" id="price-cycle-starter" ref={priceCycleStarterRef}>/mo</span>
              </div>
              <ul className="space-y-3 text-xs font-mono text-[#D9E8E2]/60 border-t border-[#114C5A] pt-6">
                <li>✓ 10 Core workflows active</li>
                <li>✓ SLA Response 120ms</li>
              </ul>
            </div>
            <button className="w-full border border-[#114C5A] bg-[#114C5A]/20 hover:bg-[#FFC801] hover:text-[#172B36] hover:border-[#FFC801] text-[#F1F6F4] text-xs font-mono font-bold py-3 mt-8 transition-colors">
              Deploy Starter
            </button>
          </div>
          
          {/* Pro - Highlighted */}
          <div className="border-2 border-[#FFC801] bg-[#114C5A]/15 rounded-2xl p-8 flex flex-col justify-between hover:border-[#FF9932] transition-all relative group">
            <div className="absolute -top-3.5 right-8 bg-[#FFC801] text-[#172B36] text-[7px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              POPULAR CHOICE
            </div>
            <div className="space-y-6">
              <div>
                <span className="font-mono text-[9px] text-[#D9E8E2]/50 uppercase tracking-wider">// SCALE</span>
                <h3 className="text-lg font-bold text-[#F1F6F4] mt-1">Pro</h3>
              </div>
              <div className="flex items-baseline space-x-1 font-mono">
                <span className="text-xl text-[#FFC801]/60 font-normal" id="price-symbol-pro" ref={priceSymbolProRef}>$</span>
                <span className="text-4xl font-bold text-[#F1F6F4]" id="price-value-pro" ref={priceValueProRef}>49</span>
                <span className="text-xs text-[#D9E8E2]/40 font-normal" id="price-cycle-pro" ref={priceCycleProRef}>/mo</span>
              </div>
              <ul className="space-y-3 text-xs font-mono text-[#D9E8E2]/60 border-t border-[#114C5A] pt-6">
                <li>✓ 50 Core workflows active</li>
                <li>✓ Custom domain integration</li>
              </ul>
            </div>
            <button className="w-full border border-transparent bg-[#FFC801] text-[#172B36] hover:bg-[#FF9932] text-xs font-mono font-bold py-3 mt-8 transition-colors">
              Deploy Pro Plan
            </button>
          </div>
          
          {/* Enterprise */}
          <div className="border border-[#114C5A] bg-[#114C5A]/10 rounded-2xl p-8 flex flex-col justify-between hover:border-[#D9E8E2]/40 transition-all relative group">
            <div className="space-y-6">
              <div>
                <span className="font-mono text-[9px] text-[#D9E8E2]/50 uppercase tracking-wider">// NEURAL</span>
                <h3 className="text-lg font-bold text-[#F1F6F4] mt-1">Enterprise</h3>
              </div>
              <div className="flex items-baseline space-x-1 font-mono">
                <span className="text-xl text-[#D9E8E2]/40 font-normal" id="price-symbol-enterprise" ref={priceSymbolEnterpriseRef}>$</span>
                <span className="text-4xl font-bold text-[#F1F6F4]" id="price-value-enterprise" ref={priceValueEnterpriseRef}>99</span>
                <span className="text-xs text-[#D9E8E2]/40 font-normal" id="price-cycle-enterprise" ref={priceCycleEnterpriseRef}>/mo</span>
              </div>
              <ul className="space-y-3 text-xs font-mono text-[#D9E8E2]/60 border-t border-[#114C5A] pt-6">
                <li>✓ Unlimited active workflows</li>
                <li>✓ Dedicated edge container nodes</li>
              </ul>
            </div>
            <button className="w-full border border-[#114C5A] bg-[#114C5A]/20 hover:bg-[#FFC801] hover:text-[#172B36] hover:border-[#FFC801] text-[#F1F6F4] text-xs font-mono font-bold py-3 mt-8 transition-colors">
              Contact Enterprise
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
}
