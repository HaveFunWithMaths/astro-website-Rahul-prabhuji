/**
 * Testimonials Module
 * Handles filterable client reviews across Vastu, Astrology, and Numerology categories.
 */

const testimonialsData = [
  {
    name: 'Radheshyam Agarwal & Family',
    role: 'Industrialist & Real Estate Developer, Ahmedabad',
    category: 'vastu',
    categoryLabel: 'Vastu & Plot Layout',
    avatar: 'RA',
    rating: 5,
    quote: 'We consulted Dr. Rahul for a 4-acre factory plot and our family home. Unlike traditional practitioners who immediately ask to demolish walls or instill fear, Dr. Trivedi used geomagnetic vectors and elemental balancing. His 100% non-destructive remedies brought remarkable peace and business progress.'
  },
  {
    name: 'Anand Raghavan',
    role: 'Co-Founder & CTO, SaaS Enterprise | IIT-M Alum',
    category: 'astrology',
    categoryLabel: 'Vedic Astrology',
    avatar: 'AR',
    rating: 5,
    quote: 'As an IIT graduate and engineer, I was inherently skeptical of astrology. Dr. Rahul’s consultation was completely devoid of superstition or fear. His timeline analysis of our venture’s inflection windows and Dasha cycles aligned with mathematical precision.'
  },
  {
    name: 'Dr. Shalini & Rajesh Mukhopadhyay',
    role: 'Senior Researcher & Family, Kolkata / Singapore',
    category: 'astrology',
    categoryLabel: 'Vedic Astrology',
    avatar: 'SM',
    rating: 5,
    quote: 'We sought Kundali guidance for family decision-making and our daughter’s education timing. Dr. Trivedi brings the rigorous lens of an IIT researcher combined with genuine reverence for traditional Jyotish shastras. It gave our family supreme clarity.'
  },
  {
    name: 'Vikramaditya Singhania',
    role: 'Managing Director, Manufacturing Group, Mumbai',
    category: 'numerology',
    categoryLabel: 'Astro-Numerology',
    avatar: 'VS',
    rating: 5,
    quote: 'The numerology audit for our brand restructuring and the strategic name frequency harmonization provided concrete results. Dr. Rahul explained the mathematical frequency resonance behind every letter and compound number with pure logic.'
  },
  {
    name: 'Col. Sanjeev & Sunita Sharma',
    role: 'Retired Defence Officer & Homeowner, Gurugram',
    category: 'vastu',
    categoryLabel: 'Vastu & Plot Layout',
    avatar: 'SS',
    rating: 5,
    quote: 'Before performing our Griha Pravesh, we had Dr. Rahul evaluate our duplex layout. His balance of the North-East Ishanya corner and Brahmasthan using simple elemental copper and brass placements completely transformed the energy of our home.'
  },
  {
    name: 'Karthik & Deepa Sundaram',
    role: 'Tech Leads, Bengaluru',
    category: 'astrology',
    categoryLabel: 'Vedic Astrology',
    avatar: 'KS',
    rating: 5,
    quote: 'We booked a Kundali Milan and relationship synastry session. The multi-system cross-verification using D-9 Navamsha and planetary Dashas was methodical and compassionate. It helped us understand each other’s temperaments with deep respect.'
  }
];

class TestimonialFilter {
  constructor() {
    this.container = document.getElementById('testimonials-grid');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.activeFilter = 'all';

    this.init();
  }

  init() {
    this.render();
    this.setupListeners();
  }

  setupListeners() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.getAttribute('data-filter');
        this.render();
      });
    });
  }

  render() {
    if (!this.container) return;

    const filtered = this.activeFilter === 'all'
      ? testimonialsData
      : testimonialsData.filter(t => t.category === this.activeFilter);

    this.container.innerHTML = filtered.map(item => `
      <div class="testimonial-card">
        <div class="testimonial-header">
          <div class="client-avatar">${item.avatar}</div>
          <div class="client-meta">
            <span class="client-name">${item.name}</span>
            <span class="client-role">${item.role}</span>
          </div>
        </div>
        <div class="testimonial-stars">
          ${'★'.repeat(item.rating)}
        </div>
        <p class="testimonial-body">"${item.quote}"</p>
        <span class="testimonial-tag">${item.categoryLabel}</span>
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TestimonialFilter();
});
