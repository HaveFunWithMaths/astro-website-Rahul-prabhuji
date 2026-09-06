/**
 * Services Module
 * Manages core 3 services: Vedic Astrology, Astro-Numerology, and Vastu Shastra.
 * Directs inquiries and booking to WhatsApp (+91 91525 17036) with prefilled details.
 */

const WHATSAPP_PHONE = '919152517036';

const servicesData = [
  {
    id: 'astrology',
    title: 'Vedic Astrology',
    sanskrit: '॥ ज्योतिष शास्त्र ॥',
    subtitle: 'Natal Kundali, Career Inflection, Relationships & Planetary Transits',
    lead: 'A rigorous mathematical analysis of planetary coordinates using Vedic Parashari and harmonic divisional charts to map life cycles and strategic decision windows.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/></svg>`,
    features: [
      'Comprehensive Birth Chart (Lagna Kundali) & D-9/D-10 Divisional Mapping',
      'Career inflection points, business venture timing & financial cycles',
      'Kundali Milan (Relationship synastry & emotional temperament)',
      'Vimshottari Dasha timeline forecasting & transit (Gochar) mitigation',
      'Non-fatalistic remedies focused on discipline, mindfulness & cognitive clarity'
    ],
    duration: '60 - 75 Mins',
    format: '1-on-1 Deep-Dive Video Consultation + Detailed Chart Insights'
  },
  {
    id: 'numerology',
    title: 'Astro-Numerology',
    sanskrit: '॥ अंक शास्त्र ॥',
    subtitle: 'Core Frequency Alignment, Name Resonance & Brand Auditing',
    lead: 'Decode the vibrational resonance of your birth numbers and phonetic frequencies to streamline business ventures, personal brand, and crucial life milestones.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h4M9 8v8M13 16l4-8M17 16l-4-8"/></svg>`,
    features: [
      'Mulank (Birth Number), Bhagyank (Destiny) & Namank (Name Number) alignment',
      'Personal & Business Brand Name acoustic frequency optimization',
      'Chaldean & Pythagorean compound harmonic index analysis',
      'Annual personal year cycle forecasting & major milestone timing',
      'Optimized signature, professional naming & documentation guidance'
    ],
    duration: '45 - 60 Mins',
    format: '1-on-1 Video Session + Numerical Resonance Blueprint'
  },
  {
    id: 'vastu',
    title: 'Vastu Shastra',
    sanskrit: '॥ स्थापत्य वेद एवं वास्तु ॥',
    subtitle: 'Residential Plots, Commercial Spaces & Non-Destructive Energy Balancing',
    lead: 'Align living and working spaces with Earth’s geomagnetic axes and solar cycles. Scientific spatial optimization using Pancha Mahabhuta (5 elements) without structural demolition.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    features: [
      'Comprehensive Plot & Layout Evaluation (Residential, Commercial, Industrial)',
      'Cardinal & Intercardinal directional energy mapping (16 Vastu Zones)',
      'Pancha Mahabhuta (Earth, Water, Fire, Air, Space) element balancing',
      '100% Non-destructive remedies: Color, metal, light & spatial re-alignment',
      'Brahmasthan optimization, entrance orientation & energy flow diagnostics'
    ],
    duration: 'Comprehensive Audit',
    format: 'Site / Architectural Floorplan Analysis + Actionable Vastu Roadmap'
  }
];

function getWhatsAppDirectUrl(serviceName, prefillData = {}) {
  let text = `Namaste Dr. Rahul Trivedi ji,\n\nI would like to inquire about a consultation for *${serviceName || 'Astro-Numerology & Vastu'}*.`;
  
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
    text += `\n*Property/Plot Type:* ${prefillData.spaceType}`;
  }
  if (prefillData.notes) {
    text += `\n*Key Query / Focus Area:* ${prefillData.notes}`;
  }

  text += `\n\nPlease let me know the upcoming consultation availability. Thank you!`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

function consultOnWhatsApp(serviceId) {
  const service = servicesData.find(s => s.id === serviceId);
  const serviceName = service ? service.title : 'Consultation';
  const url = getWhatsAppDirectUrl(serviceName);
  window.open(url, '_blank', 'noopener,noreferrer');
}

function selectServiceAndBook(serviceId) {
  const bookingSection = document.getElementById('book-now');
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
    
    // Find and click the matching service card in wizard
    const card = document.querySelector(`.service-select-card[data-service-id="${serviceId}"]`);
    if (card) {
      card.click();
    }
  }
}

window.WHATSAPP_PHONE = WHATSAPP_PHONE;
window.servicesData = servicesData;
window.getWhatsAppDirectUrl = getWhatsAppDirectUrl;
window.consultOnWhatsApp = consultOnWhatsApp;
window.selectServiceAndBook = selectServiceAndBook;

