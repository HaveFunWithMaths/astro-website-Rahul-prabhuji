/**
 * Testimonials Module
 * Handles filterable client reviews across Career, Decisions, and Spiritual categories.
 */

const testimonialsData = [
  {
    name: 'Anand Raghavan',
    role: 'Co-Founder & CTO, SaaS Enterprise | IIT-M Alum',
    category: 'career',
    categoryLabel: 'Career & Business',
    avatar: 'AR',
    rating: 5,
    quote: 'As an IIT graduate and engineer, I was inherently skeptical of astrology. Dr. Rahul’s consultation was completely devoid of mysticism or fear. His timeline analysis of my venture’s funding cycle aligned with micro-precision. His scientific clarity was refreshing.'
  },
  {
    name: 'Dr. Shalini Mukhopadhyay',
    role: 'Postdoctoral Fellow in Molecular Biology',
    category: 'decisions',
    categoryLabel: 'Life Decisions',
    avatar: 'SM',
    rating: 5,
    quote: 'Dr. Trivedi brings the rigorous lens of an IIT researcher to chart evaluation. He presented probabilities, planetary influences, and decision frameworks rather than fatalistic prophecies. It provided immense clarity during my international transition.'
  },
  {
    name: 'Vikramaditya Shah',
    role: 'Managing Director, Private Equity',
    category: 'career',
    categoryLabel: 'Career & Business',
    avatar: 'VS',
    rating: 5,
    quote: 'The numerology audit for our brand restructuring and the strategic Dasha timing analysis provided concrete strategic foresight. No gemstones, no unreasonable promises — purely empirical pattern analysis and grounded strategic counsel.'
  },
  {
    name: 'Dr. Meera Nambiar',
    role: 'Associate Professor & Sadhana Practitioner',
    category: 'spiritual',
    categoryLabel: 'Spiritual Guidance',
    avatar: 'MN',
    rating: 5,
    quote: 'Finding a mentor who balances classical Vedanta, authentic Mantra science, and rigorous scientific questioning is exceptionally rare. Dr. Rahul structured my daily Dhyana practice with profound psychological and spiritual insight.'
  },
  {
    name: 'Karthik Sundaram',
    role: 'Staff AI Engineer, Bengaluru',
    category: 'decisions',
    categoryLabel: 'Life Decisions',
    avatar: 'KS',
    rating: 5,
    quote: 'I booked a relationship synastry session. The multi-system cross-verification using D-9 Navamsha and KP sub-lords was methodical and insightful. It helped us understand our cognitive temperaments with empathy.'
  },
  {
    name: 'Siddharth Deshmukh',
    role: 'Author & Meditator',
    category: 'spiritual',
    categoryLabel: 'Spiritual Guidance',
    avatar: 'SD',
    rating: 5,
    quote: 'His synthesis of logic and intuition is truly authentic. The guidance on Japa phonetics and Patanjali Yoga Sutras felt like drinking from a pure, uncorrupted ancestral spring.'
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
