/**
 * Services Module - Higher Dimensional Sciences
 * Practical, relatable, and verifiable guidance by Dr. Rahul Trivedi, Ph.D. (IIT-Madras).
 * Focuses on real-world applications: kids' study & focus zones, health & sleep,
 * financial peace, career timing, and name harmony.
 */

const WHATSAPP_PHONE = '919152517036';

const servicesData = [
  {
    id: 'vastu',
    title: 'Vastu Shastra',
    sanskrit: '॥ स्थापत्य वेद एवं वास्तु ॥',
    subtitle: 'Healthy Homes, Focused Kids & Flourishing Workplaces (Zero Demolition)',
    lead: 'A verifiable Higher Dimensional Science of space. The zones of your home shape how your family feels, rests, and thinks every single day. Correct imbalances without breaking a single wall.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    features: [
      'Kids’ Study & Focus Zones: Move children away from distraction and laziness zones into high-retention directions',
      'Health & Deep Sleep: Fix bed placements that cause morning exhaustion, recurring sickness, and restlessness',
      'Financial Protection: Stop unseen money leaks caused by North-East toilets or South-West entrance flaws',
      '100% Non-Destructive Solutions: Zero demolition — balanced using elemental brass/copper strips and colors',
      'Peaceful Home Harmony: Clear negative energy buildup to restore family warmth and mental calm',
      'Office & Business Flow: Seat key decision-makers where negotiations close smoothly and staff stay driven'
    ],
    duration: 'Blueprint & Space Audit',
    format: 'Floorplan / Video Walkthrough + Practical Non-Destructive Roadmap'
  },
  {
    id: 'astrology',
    title: 'Vedic Astrology',
    sanskrit: '॥ ज्योतिष शास्त्र ॥',
    subtitle: 'Clarity on Your Life Timing, Career Crossroads & The Next Move',
    lead: 'Planetary movements are not fatalistic curses; they are verifiable cosmic seasons that touch every single human life. When you know your timing, you stop struggling against the current.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/></svg>`,
    features: [
      'Knowing Your Personal Timing: Know when to take bold leaps and when to consolidate and protect',
      'Career & Work Inflections: Clear answers on job change vs. business, promotion windows, and relocations',
      'Marriage & Relationship Compatibility: Understand mutual temperaments and emotional needs with compassion',
      'Money & Financial Cycles: Identify high-opportunity wealth phases and steer clear of impulsive risks',
      'Authentic Vedic Yajna Remedies: Sacred fire peace (Homa) to dissolve persistent roadblocks and mental static',
      'Actionable Decision Roadmap: Objective, verifiable guidance for your immediate next move'
    ],
    duration: '60 - 75 Mins',
    format: '1-on-1 Confidential HD Video Session + Personalized Roadmap'
  },
  {
    id: 'numerology',
    title: 'Astro-Numerology',
    sanskrit: '॥ अंक शास्त्र ॥',
    subtitle: 'Simple, Relatable Tuning for Your Name, Phone & Daily Numbers',
    lead: 'Just like tuning a musical instrument, your name and everyday contact numbers carry a natural vibration. When they match your birth date, life moves with far less silent friction.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h4M9 8v8M13 16l4-8M17 16l-4-8"/></svg>`,
    features: [
      'Name Spelling Harmony: Simple adjustments to personal or child names to unlock smoother progress',
      'Everyday Phone & Vehicle Numbers: Check whether your daily mobile or car number supports or delays you',
      'Business & Brand Naming: Give your firm, shop, or product a name that naturally attracts clients and goodwill',
      'Signature Alignment: Simple, natural signature adjustments that project confidence and flow',
      'Annual Personal Year Theme: Know what kind of year you are in — a year to build, launch, or rest',
      'Verifiable in Daily Life: Zero complicated rituals — pure, relatable harmony you can test yourself'
    ],
    duration: '45 - 60 Mins',
    format: '1-on-1 Video Session + Practical Number Guide'
  },
  {
    id: 'counsellor',
    title: 'Spiritual & Life Counsellor',
    sanskrit: '॥ परामर्श एवं जीवन मार्गदर्शन ॥',
    subtitle: 'Confidential 1-on-1 Space for Crossroads, Burnout & Inner Peace',
    lead: 'When life feels heavy, overwhelming, or you are frozen at an emotional crossroads, you need empathetic, rational clarity — blending grounded Vedic psychology with practical life strategy.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
    features: [
      'Untangling Decision Paralysis: Clear thinking when torn between two life paths or relationships',
      'Burnout & Stress Recovery: De-escalating anxiety through rational Vedic psychology and mindfulness',
      'Rebuilding Emotional Equilibrium: Practical daily habits, breathing, and Dhyana tailored to your lifestyle',
      'Work-Life & Family Pressure: Practical boundary-setting and communication tools for real peace',
      '100% Non-Judgmental & Private: A safe haven with an IIT-Madras Ph.D. researcher who truly listens'
    ],
    duration: '60 Mins',
    format: '1-on-1 Confidential Private Video Session'
  }
];

function getWhatsAppDirectUrl(serviceName, prefillData = {}) {
  let text = `Namaste Dr. Rahul Trivedi ji,\n\nI would like to inquire about a consultation for *${serviceName || 'Higher Dimensional Sciences (Vastu, Astrology & Life Guidance)'}*.`;
  
  if (prefillData.name) {
    text += `\n\n*Name:* ${prefillData.name}`;
  }
  if (prefillData.dob) {
    text += `\n*Date of Birth:* ${prefillData.dob}`;
  }
  if (prefillData.tob) {
    text += `\n*Time of Birth:* ${prefillData.tob}`;
  }
  if (prefillData.pob) {
    text += `\n*Place of Birth:* ${prefillData.pob}`;
  }
  if (prefillData.spaceType) {
    text += `\n*Property/Space Type:* ${prefillData.spaceType}`;
  }
  if (prefillData.notes) {
    text += `\n*Key Query / Focus Area:* ${prefillData.notes}`;
  }

  text += `\n\nLooking forward to verifiable clarity on my next move. Please let me know upcoming consultation availability. Thank you!`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

function consultOnWhatsApp(serviceId) {
  const service = servicesData.find(s => s.id === serviceId);
  const serviceName = service ? service.title : 'Consultation';
  const url = getWhatsAppDirectUrl(serviceName);
  window.open(url, '_blank', 'noopener,noreferrer');
}

function selectServiceAndBook(serviceId) {
  const bookingSection = document.getElementById('whatsapp-intake') || document.getElementById('book-now');
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
    
    // Find and click the matching service card in wizard
    const card = document.querySelector(`.service-select-card[data-service-id="${serviceId}"]`);
    if (card) {
      card.click();
    }
  }
}

// Function to activate astrology tab and scroll to consult
function consultAstroTopic(topicName) {
  const bookingSection = document.getElementById('whatsapp-intake') || document.getElementById('book-now');
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
    
    // Select astrology service
    const astroCard = document.querySelector('.service-select-card[data-service-id="astrology"]');
    if (astroCard) astroCard.click();
    
    // Set focus in astro-focus
    const focusSelect = document.getElementById('astro-focus') || document.getElementById('intake-focus');
    if (focusSelect) {
      for (let i = 0; i < focusSelect.options.length; i++) {
        if (focusSelect.options[i].text.toLowerCase().includes(topicName.toLowerCase()) ||
            topicName.toLowerCase().includes(focusSelect.options[i].value.toLowerCase())) {
          focusSelect.selectedIndex = i;
          focusSelect.dispatchEvent(new Event('change'));
          break;
        }
      }
    }
    
    const notesInput = document.getElementById('astro-notes') || document.getElementById('intake-notes');
    if (notesInput && !notesInput.value) {
      notesInput.value = `I am seeking clarity regarding ${topicName} and my immediate next move.`;
      notesInput.dispatchEvent(new Event('input'));
    }
  }
}

window.WHATSAPP_PHONE = WHATSAPP_PHONE;
window.servicesData = servicesData;
window.getWhatsAppDirectUrl = getWhatsAppDirectUrl;
window.consultOnWhatsApp = consultOnWhatsApp;
window.selectServiceAndBook = selectServiceAndBook;
window.consultAstroTopic = consultAstroTopic;
