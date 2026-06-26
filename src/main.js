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

let currentCurrency = 'USD';
let currentBilling = 'monthly';

// DOM Selectors for pricing
const currencySelect = document.getElementById('currency-select');
const billingToggle = document.getElementById('billing-toggle');
const billingToggleKnob = document.getElementById('billing-toggle-knob');
const labelMonthly = document.getElementById('label-billing-monthly');
const labelAnnual = document.getElementById('label-billing-annual');

// Update pricing nodes directly without re-rendering parent blocks
function updatePricing() {
  const currencyInfo = pricingMatrix.currencies[currentCurrency];
  const billingInfo = pricingMatrix.billingCycles[currentBilling];
  
  // Update toggle button visuals
  if (currentBilling === 'annual') {
    billingToggleKnob.style.transform = 'translateX(16px)';
    billingToggle.classList.add('bg-forsythia');
    billingToggle.classList.remove('bg-nocturnal');
    labelAnnual.classList.add('text-forsythia');
    labelAnnual.classList.remove('text-mystic-mint/60');
    labelMonthly.classList.remove('text-forsythia');
    labelMonthly.classList.add('text-mystic-mint/60');
  } else {
    billingToggleKnob.style.transform = 'translateX(0px)';
    billingToggle.classList.add('bg-nocturnal');
    billingToggle.classList.remove('bg-forsythia');
    labelMonthly.classList.add('text-forsythia');
    labelMonthly.classList.remove('text-mystic-mint/60');
    labelAnnual.classList.remove('text-forsythia');
    labelAnnual.classList.add('text-mystic-mint/60');
  }

  // Iterate over tiers and write direct textContent modifications
  Object.keys(pricingMatrix.tiers).forEach(tier => {
    const baseRate = pricingMatrix.tiers[tier];
    // Dynamic price calculation
    const calculatedPrice = Math.round(baseRate * currencyInfo.rate * billingInfo.discount);
    
    // Format large numbers with commas (e.g. INR prices)
    const formattedPrice = calculatedPrice.toLocaleString();
    
    // Set direct textContent updates (Performance-Isolated Updates)
    const valNode = document.getElementById(`price-value-${tier}`);
    const symNode = document.getElementById(`price-symbol-${tier}`);
    const cycleNode = document.getElementById(`price-cycle-${tier}`);
    
    if (valNode) valNode.textContent = formattedPrice;
    if (symNode) symNode.textContent = currencyInfo.symbol;
    if (cycleNode) {
      cycleNode.textContent = currentBilling === 'annual' ? '/mo *' : '/mo';
    }
  });
}

// Event Listeners for Pricing Switcher
if (currencySelect) {
  currencySelect.addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    updatePricing();
  });
}

if (billingToggle) {
  const toggleAction = () => {
    currentBilling = currentBilling === 'monthly' ? 'annual' : 'monthly';
    updatePricing();
  };
  billingToggle.addEventListener('click', toggleAction);
  if (labelMonthly) labelMonthly.addEventListener('click', () => { currentBilling = 'monthly'; updatePricing(); });
  if (labelAnnual) labelAnnual.addEventListener('click', () => { currentBilling = 'annual'; updatePricing(); });
}


// Bento-to-Accordion Wrapper with State Persistence
let activeBentoIndex = 0; // Persistent active index context
const desktopBentoCards = document.querySelectorAll('#bento-grid-desktop .bento-card');
const mobileAccordionItems = document.querySelectorAll('#bento-accordion-mobile .mobile-accordion-item');
const mobileBreakpoint = 768;
let lastWidth = window.innerWidth;

// Set active styling on desktop Bento card
function setBentoActiveDesktop(index) {
  activeBentoIndex = index;
  desktopBentoCards.forEach((card, idx) => {
    const glow = card.querySelector('.bento-glow');
    if (idx === index) {
      card.classList.add('border-forsythia');
      card.classList.remove('border-mystic-mint/10');
      if (glow) glow.style.opacity = '1';
    } else {
      card.classList.remove('border-forsythia');
      card.classList.add('border-mystic-mint/10');
      if (glow) glow.style.opacity = '0';
    }
  });
}

// Expand accordion on mobile
function setAccordionActiveMobile(index) {
  activeBentoIndex = index;
  mobileAccordionItems.forEach((item, idx) => {
    const content = item.querySelector('.mobile-accordion-content');
    const icon = item.querySelector('[id^="acc-icon-"]');
    
    if (idx === index) {
      item.classList.add('border-forsythia');
      item.classList.remove('border-mystic-mint/10');
      if (content) {
        // Smoothly set height using scrollHeight
        content.style.height = `${content.scrollHeight}px`;
      }
      if (icon) icon.textContent = '[ - ]';
    } else {
      item.classList.remove('border-forsythia');
      item.classList.add('border-mystic-mint/10');
      if (content) content.style.height = '0px';
      if (icon) icon.textContent = '[ + ]';
    }
  });
}

// Initialize listeners for desktop bento hover states
desktopBentoCards.forEach((card, index) => {
  card.addEventListener('mouseenter', () => {
    setBentoActiveDesktop(index);
  });
});

// Initialize listeners for mobile accordion clicks
mobileAccordionItems.forEach((item, index) => {
  const btn = item.querySelector('button');
  if (btn) {
    btn.addEventListener('click', () => {
      // Toggle or set active
      if (activeBentoIndex === index) {
        // If clicking active, close it
        const content = item.querySelector('.mobile-accordion-content');
        const icon = item.querySelector('[id^="acc-icon-"]');
        content.style.height = '0px';
        if (icon) icon.textContent = '[ + ]';
        activeBentoIndex = -1; // no active panel
      } else {
        setAccordionActiveMobile(index);
      }
    });
  }
});

// Resize handler to transfer context locks smoothly
function handleResize() {
  const currentWidth = window.innerWidth;
  
  // Desktop to mobile transition
  if (lastWidth >= mobileBreakpoint && currentWidth < mobileBreakpoint) {
    if (activeBentoIndex >= 0) {
      setAccordionActiveMobile(activeBentoIndex);
    }
  }
  // Mobile to desktop transition
  else if (lastWidth < mobileBreakpoint && currentWidth >= mobileBreakpoint) {
    // If no active index, reset to 0
    const finalIndex = activeBentoIndex >= 0 ? activeBentoIndex : 0;
    setBentoActiveDesktop(finalIndex);
  }
  
  lastWidth = currentWidth;
}

window.addEventListener('resize', handleResize);


// Case Studies Selector Interaction
const caseBrandCards = document.querySelectorAll('.case-brand-card');
const caseRowItems = document.querySelectorAll('.case-row-item');

function setActiveCase(index) {
  caseBrandCards.forEach((card, idx) => {
    if (idx === index) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
  caseRowItems.forEach((row, idx) => {
    const arrow = row.querySelector('.absolute');
    if (idx === index) {
      row.classList.add('bg-nocturnal/20');
      if (arrow) arrow.classList.add('text-forsythia');
    } else {
      row.classList.remove('bg-nocturnal/20');
      if (arrow) arrow.classList.remove('text-forsythia');
    }
  });
}

caseBrandCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    setActiveCase(index);
  });
});

caseRowItems.forEach((row, index) => {
  row.addEventListener('click', () => {
    setActiveCase(index);
  });
});


// Product Features Tab Selector Logic
const tabBtns = document.querySelectorAll('.features-tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetTab = btn.getAttribute('data-tab');
    
    // Set active tab button
    tabBtns.forEach(b => {
      if (b === btn) {
        b.classList.add('active', 'border-forsythia', 'text-forsythia');
        b.classList.remove('text-mystic-mint/40');
      } else {
        b.classList.remove('active', 'border-forsythia', 'text-forsythia');
        b.classList.add('text-mystic-mint/40');
      }
    });
    
    // Display correct panel
    tabPanels.forEach(panel => {
      if (panel.id === `panel-${targetTab}`) {
        panel.classList.remove('hidden');
        panel.classList.add('block');
      } else {
        panel.classList.remove('block');
        panel.classList.add('hidden');
      }
    });
  });
});


// FAQ Accordion Toggle Interaction
const faqItems = document.querySelectorAll('#faq-accordion-list .faq-item');
faqItems.forEach(item => {
  const btn = item.querySelector('button');
  const content = item.querySelector('.faq-content');
  const icon = item.querySelector('button span');
  
  if (btn && content) {
    btn.addEventListener('click', () => {
      const isOpen = content.style.height && content.style.height !== '0px';
      
      // Close all FAQs first
      faqItems.forEach(i => {
        const c = i.querySelector('.faq-content');
        const ico = i.querySelector('button span');
        if (c) c.style.height = '0px';
        if (ico) ico.textContent = '[ + ]';
        i.classList.remove('border-forsythia');
        i.classList.add('border-mystic-mint/10');
      });
      
      // If was closed, open it now
      if (!isOpen) {
        content.style.height = `${content.scrollHeight}px`;
        if (icon) icon.textContent = '[ - ]';
        item.classList.add('border-forsythia');
        item.classList.remove('border-mystic-mint/10');
      }
    });
  }
});


// Mobile Hamburger Menu Overlay Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileNavMenu = document.getElementById('mobile-nav-menu');
const menuBar1 = document.getElementById('menu-bar-1');
const menuBar2 = document.getElementById('menu-bar-2');

if (mobileMenuToggle && mobileNavMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    const isOpen = mobileNavMenu.classList.contains('translate-x-0');
    if (isOpen) {
      mobileNavMenu.classList.add('translate-x-full');
      mobileNavMenu.classList.remove('translate-x-0');
      
      // Reset hamburger icon bars
      menuBar1.style.transform = 'none';
      menuBar2.style.transform = 'none';
      menuBar2.classList.remove('w-full');
      menuBar2.classList.add('w-3/4');
    } else {
      mobileNavMenu.classList.remove('translate-x-full');
      mobileNavMenu.classList.add('translate-x-0');
      
      // Animate hamburger to X
      menuBar1.style.transform = 'translateY(4px) rotate(45deg)';
      menuBar2.style.transform = 'translateY(-4px) rotate(-45deg)';
      menuBar2.classList.remove('w-3/4');
      menuBar2.classList.add('w-full');
    }
  });

  // Close mobile nav menu on link clicks
  const mobileNavLinks = mobileNavMenu.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNavMenu.classList.add('translate-x-full');
      mobileNavMenu.classList.remove('translate-x-0');
      menuBar1.style.transform = 'none';
      menuBar2.style.transform = 'none';
      menuBar2.classList.remove('w-full');
      menuBar2.classList.add('w-3/4');
    });
  });
}


// Digital Eye Code-stream Background generation
const matrixContainer = document.getElementById('matrix-eye-background');
if (matrixContainer) {
  const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789//';
  const widthCount = 20;
  const heightCount = 20;
  
  let gridContent = '';
  for (let i = 0; i < heightCount; i++) {
    let row = '';
    for (let j = 0; j < widthCount; j++) {
      const char = characters.charAt(Math.floor(Math.random() * characters.length));
      row += `<span class="inline-block w-4 h-4 text-center" style="opacity: ${Math.random().toFixed(2)}">${char}</span>`;
    }
    gridContent += `<div class="flex">${row}</div>`;
  }
  matrixContainer.innerHTML = gridContent;
  
  // Randomly update characters over time
  setInterval(() => {
    const spans = matrixContainer.querySelectorAll('span');
    const randomIndex = Math.floor(Math.random() * spans.length);
    const newChar = characters.charAt(Math.floor(Math.random() * characters.length));
    spans[randomIndex].textContent = newChar;
    spans[randomIndex].style.opacity = Math.random().toFixed(2);
  }, 100);
}


// Initialize page components
document.addEventListener('DOMContentLoaded', () => {
  // Set default pricing states
  updatePricing();
  
  // Initialize bento layouts based on initial size
  if (window.innerWidth < mobileBreakpoint) {
    setAccordionActiveMobile(0);
  } else {
    setBentoActiveDesktop(0);
  }
  
  // Set first case active
  setActiveCase(0);
});
