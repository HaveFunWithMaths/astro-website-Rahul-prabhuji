/**
 * Services Module
 * Manages service offerings and links directly with the 3-step booking wizard.
 */

const servicesData = [
  {
    id: 'astrology',
    title: 'Astrology',
    subtitle: 'Horoscope, Career, Relationships & Planetary Transits',
    lead: 'A rigorous mathematical analysis of planetary coordinates using Vedic Parashari and harmonic divisional charts to map life cycles and decision windows.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/></svg>`,
    features: [
      'Comprehensive Birth Chart (Kundali) & D-9/D-10 Divisional Mapping',
      'Career inflection points, business venture timing & financial cycles',
      'Relationship compatibility, synastry & emotional harmony',
      'Dasha timeline forecasting & planetary transit (Gochar) mitigation',
      'Pragmatic remedial actions based on discipline and mindfulness'
    ],
    duration: '60 - 75 Mins',
    format: '1-on-1 Deep Dive Video Call + PDF Chart Report'
  },
  {
    id: 'numerology',
    title: 'Numerology',
    subtitle: 'Core Frequency Alignment & Name Optimization',
    lead: 'Decode the vibrational resonance of your birth numbers and name frequencies to streamline business ventures, personal brand, and crucial life milestones.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h4M9 8v8M13 16l4-8M17 16l-4-8"/></svg>`,
    features: [
      'Core Life Path, Destiny, Soul Urge & Personality calculations',
      'Personal & Business Name Frequency Audit for resonance',
      'Compound number analysis and vibrational harmony evaluation',
      'Annual personal year cycle forecasting & milestone planning',
      'Strategic signature & spelling optimization recommendations'
    ],
    duration: '45 - 60 Mins',
    format: '1-on-1 Video Call + Numerical Resonance Blueprint'
  },
  {
    id: 'spirituality',
    title: 'Spirituality & Mentorship',
    subtitle: 'Sadhana Architecture, Mantra & Dhyana Guidance',
    lead: 'Grounded spiritual mentorship fusing classical Vedanta, Patanjali Yoga Sutras, and authentic Mantra Sadhana for seekers aiming for inner mastery.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2a5 5 0 0 1 5 5c0 3-5 9-5 9s-5-6-5-9a5 5 0 0 1 5-5z"/><circle cx="12" cy="7" r="1.5"/><path d="M5 19c2.5-2 4.5-2 7 0 2.5-2 4.5-2 7 0"/></svg>`,
    features: [
      'Customized daily Sadhana schedule matched to your psychological temperament',
      'Mantra sound frequency science, phonetic precision & Japa methodology',
      'Dhyana (meditation) practices for mental clarity and stillness',
      'Practical Vedanta & Bhagavad Gita guidance for navigating modern dilemmas',
      'Non-dogmatic, direct 1-on-1 spiritual accompaniment and progress review'
    ],
    duration: '60 Mins',
    format: 'Personal Mentorship Session + Sadhana Guide'
  }
];

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

window.selectServiceAndBook = selectServiceAndBook;
