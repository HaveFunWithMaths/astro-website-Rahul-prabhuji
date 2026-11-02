/**
 * 3-Step WhatsApp Consultation Intake Wizard Module
 * Features:
 * - Category-Based Filtering (Vastu, Astrology, Numerology, Life Counseling, Work, Relationships, Kids & Study, Health, Money)
 * - Dynamic Service & Inquiry Focus Synchronization
 * - Date & Slot Scheduling
 * - Live Formatted WhatsApp Message Preview & Direct Dispatch to +91 91525 17036
 */

const INTAKE_CATEGORIES = {
  all: {
    name: 'All Disciplines',
    serviceId: null,
    options: [
      { value: "Kids' Study Zone & Overcoming Restlessness/Distraction (Vastu)", label: "Kids' Study Zone & Overcoming Restlessness/Distraction (Vastu)", service: 'vastu' },
      { value: "Health, Sickness & Restful Sleep Placement (Vastu)", label: "Health, Sickness & Restful Sleep Placement (Vastu)", service: 'vastu' },
      { value: "Toilet in NE / Main Door in SW Non-Destructive Remedy", label: "Toilet in NE / Main Door in SW Non-Destructive Remedy", service: 'vastu' },
      { value: "Residential Griha Vastu & Family Well-being", label: "Residential Griha Vastu & Family Well-being", service: 'vastu' },
      { value: "Commercial Office / Shop / Factory Growth", label: "Commercial Office / Shop / Factory Growth", service: 'vastu' },
      { value: "Plot Assessment & Land Layout Planning", label: "Plot Assessment & Land Layout Planning", service: 'vastu' },
      { value: "Career Inflection, Promotion & Job vs Business Timing", label: "Career Inflection, Promotion & Job vs Business Timing", service: 'astrology' },
      { value: "The Next Move — Clarity on Immediate Crossroads", label: "The Next Move — Clarity on Immediate Crossroads", service: 'astrology' },
      { value: "Kundali Milan & Relationship Compatibility", label: "Kundali Milan & Relationship Compatibility", service: 'astrology' },
      { value: "Marriage Timing & Family Harmony", label: "Marriage Timing & Family Harmony", service: 'astrology' },
      { value: "Financial Cycles, Investments & Debt Relief", label: "Financial Cycles, Investments & Debt Relief", service: 'astrology' },
      { value: "Vedic Yajna / Fire Sacrifice (Homa) & Navagraha Shanti", label: "Vedic Yajna / Fire Sacrifice (Homa) & Navagraha Shanti", service: 'astrology' },
      { value: "Moving Abroad / Relocation Timing", label: "Moving Abroad / Relocation Timing", service: 'astrology' },
      { value: "Child Future, Natural Talents & Education", label: "Child Future, Natural Talents & Education", service: 'astrology' },
      { value: "Personal Name Spelling & Brand Name Harmony", label: "Personal Name Spelling & Brand Name Harmony", service: 'numerology' },
      { value: "Lucky Phone Number & Vehicle Number Alignment", label: "Lucky Phone Number & Vehicle Number Alignment", service: 'numerology' },
      { value: "Personal Year Cycle & Milestone Planning", label: "Personal Year Cycle & Milestone Planning", service: 'numerology' },
      { value: "Life Crossroads, Decision Paralysis & Burnout Relief", label: "Life Crossroads, Decision Paralysis & Burnout Relief", service: 'counsellor' },
      { value: "Spiritual Guidance & Daily Mindfulness Framework", label: "Spiritual Guidance & Daily Mindfulness Framework", service: 'counsellor' }
    ]
  },
  vastu: {
    name: 'Vastu & Living Spaces',
    serviceId: 'vastu',
    options: [
      { value: "Kids' Study Zone & Overcoming Restlessness/Distraction (Vastu)", label: "🎒 Kids' Study Zone & Overcoming Distraction / Laziness" },
      { value: "Health, Sickness & Restful Sleep Placement (Vastu)", label: "🛌 Health, Morning Tiredness & Bed Placement" },
      { value: "Toilet in NE / Main Door in SW Non-Destructive Remedy", label: "⚠️ Toilet in NE / Main Door in SW (Zero Demolition)" },
      { value: "Residential Griha Vastu & Family Well-being", label: "🏡 Residential Apartment / Bungalow Harmony" },
      { value: "Commercial Office / Shop / Factory Growth", label: "🏢 Commercial Office & Business Seating Flow" },
      { value: "Negative Energy & Spatial Clearing", label: "✨ Negative Energy Clearing & Spatial Harmony" },
      { value: "Plot Assessment & Land Layout Planning", label: "📐 Buying Land / Plot Layout Assessment" }
    ]
  },
  astrology: {
    name: 'Vedic Astrology & Timing',
    serviceId: 'astrology',
    options: [
      { value: "The Next Move — Clarity on Immediate Crossroads", label: "🎯 The Next Move — Strategic Guidance for Crossroads" },
      { value: "Career Inflection, Promotion & Job vs Business Timing", label: "💼 Career Timing & Business Venture Window" },
      { value: "Kundali Milan & Relationship Compatibility", label: "❤️ Kundali Milan & Relationship Harmony" },
      { value: "Marriage Timing & Auspicious Muhurat", label: "💍 Marriage Timing & Partner Compatibility" },
      { value: "Financial Cycles, Investments & Debt Relief", label: "💰 Wealth Timing & Financial Stress Resolution" },
      { value: "Vedic Yajna / Fire Sacrifice (Homa) & Navagraha Shanti", label: "🔥 Vedic Yajna & Sacred Fire Remedies" },
      { value: "Moving Abroad / Relocation Timing", label: "✈️ Relocation & Overseas Opportunities" },
      { value: "Child Future, Natural Talents & Education", label: "👶 Child Future, Strengths & Education Direction" }
    ]
  },
  numerology: {
    name: 'Name & Number Tuning',
    serviceId: 'numerology',
    options: [
      { value: "Personal Name Spelling & Brand Name Harmony", label: "✍️ Personal Name Spelling Harmony" },
      { value: "Business Brand Name Acoustic Frequency", label: "🏢 Business Brand Name Frequency Optimization" },
      { value: "Lucky Phone Number & Vehicle Number Alignment", label: "📱 Everyday Phone & Vehicle Number Tuning" },
      { value: "Baby Naming & Auspicious Initial Resonance", label: "👶 Baby Naming According to Birth Rhythm" },
      { value: "Personal Year Cycle & Milestone Planning", label: "📅 Personal Year Cycle & Milestone Roadmap" },
      { value: "Signature Alignment & Professional Energy", label: "🖋️ Signature Alignment for Confidence" }
    ]
  },
  counsellor: {
    name: 'Life & Spiritual Counseling',
    serviceId: 'counsellor',
    options: [
      { value: "Life Crossroads, Decision Paralysis & Burnout Relief", label: "🧭 Navigating Major Life Crossroads & Decision Paralysis" },
      { value: "Stress, Chronic Anxiety & Emotional Burnout", label: "🌿 Overcoming Stress, Chronic Anxiety & Burnout" },
      { value: "Relationship Boundaries & Emotional Healing", label: "🤝 Relationship Boundaries & Compassionate Communication" },
      { value: "Spiritual Guidance & Daily Mindfulness Framework", label: "🧘 Practical Daily Mindfulness & Inner Resilience" }
    ]
  },
  work: {
    name: 'Work, Career & Business',
    serviceId: 'astrology',
    options: [
      { value: "Career Inflection, Promotion & Job vs Business Timing", label: "💼 Career Inflection, Promotion & Job vs Business Timing" },
      { value: "The Next Move — Clarity on Immediate Crossroads", label: "🎯 The Next Move — Actionable Direction for Work" },
      { value: "Commercial Office / Shop / Factory Growth", label: "🏢 Office Seating & Commercial Vastu for Business" },
      { value: "Business Brand Name Acoustic Frequency", label: "🔢 Brand Name Resonance & Company Numerology" }
    ]
  },
  relationships: {
    name: 'Relationships & Family',
    serviceId: 'astrology',
    options: [
      { value: "Kundali Milan & Relationship Compatibility", label: "❤️ Kundali Milan & Temperament Synastry" },
      { value: "Marriage Timing & Partner Compatibility", label: "💍 Marriage Timing & Resolution of Delays" },
      { value: "Residential Griha Vastu & Family Well-being", label: "🏡 Home Vastu to Clear Family Tension & Arguments" },
      { value: "Relationship Boundaries & Emotional Healing", label: "🧘 Confidential Counseling for Relationship Healing" }
    ]
  },
  kids: {
    name: 'Kids, Study & Education',
    serviceId: 'vastu',
    options: [
      { value: "Kids' Study Zone & Overcoming Restlessness/Distraction (Vastu)", label: "🎒 Kids' Study Spot: Overcoming Distraction & Laziness" },
      { value: "Child Future, Natural Talents & Education", label: "🪐 Child’s Astrological Strengths, Higher Education & Talents" },
      { value: "Baby Naming & Auspicious Initial Resonance", label: "🔢 Child Name Tuning & Auspicious Acoustic Harmony" }
    ]
  },
  health: {
    name: 'Health, Sleep & Vitality',
    serviceId: 'vastu',
    options: [
      { value: "Health, Sickness & Restful Sleep Placement (Vastu)", label: "🛌 Bedroom Vastu: Eliminating Morning Fatigue & Sickness" },
      { value: "Health Vulnerability & Stress Timing Windows", label: "🪐 Astrological Planetary Transit & Health Stress Windows" },
      { value: "Stress, Chronic Anxiety & Emotional Burnout", label: "🌿 Mindfulness & Stress Recovery Counseling" }
    ]
  },
  money: {
    name: 'Money, Wealth & Property',
    serviceId: 'vastu',
    options: [
      { value: "Toilet in NE / Main Door in SW Non-Destructive Remedy", label: "⚠️ Stopping Wealth Drains (NE Toilet / SW Door Fixes)" },
      { value: "Financial Cycles, Investments & Debt Relief", label: "💰 Astrological Wealth Cycles & Debt Resolution Timing" },
      { value: "Plot Assessment & Land Layout Planning", label: "📐 Buying Property / Commercial Land Vastu Check" },
      { value: "Lucky Phone Number & Vehicle Number Alignment", label: "📱 Everyday Phone & Vehicle Number Tuning" }
    ]
  }
};

class BookingWizard {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 3;
    this.currentCategory = 'all';

    this.bookingData = {
      service: 'Vastu Shastra Consultation',
      serviceId: 'vastu',
      duration: 'Comprehensive Layout & Spatial Audit',
      category: 'all',
      fullName: '',
      email: '',
      phone: '',
      dob: '',
      tob: '',
      tobAccuracy: 'Exact Hospital Record',
      pobCity: '',
      pobState: '',
      propertyType: 'Residential Apartment / Flat',
      propertyDirection: 'North Facing',
      focusArea: "Kids' Study Zone & Overcoming Restlessness/Distraction (Vastu)",
      notes: '',
      selectedDate: '',
      selectedTime: '04:00 PM IST',
      refCode: ''
    };

    this.init();
  }

  init() {
    this.setupCategoryFilters();
    this.setupNavigation();
    this.setupServiceSelection();
    this.setupCalendar();
    this.setupFormSync();
    this.setupModal();
    this.toggleServiceSpecificFields(this.bookingData.serviceId);
    this.updateUI();

    // Attach global instance for cross-component triggers
    window.bookingWizardInstance = this;
  }

  setupCategoryFilters() {
    const chips = document.querySelectorAll('.intake-chip-btn');
    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const category = chip.getAttribute('data-category') || 'all';
        this.filterByCategory(category);
      });
    });

    const categorySelect = document.getElementById('intake-category-select');
    if (categorySelect) {
      categorySelect.addEventListener('change', (e) => {
        this.filterByCategory(e.target.value);
      });
    }
  }

  filterByCategory(category) {
    this.currentCategory = category;
    this.bookingData.category = category;

    // Update chips active state
    document.querySelectorAll('.intake-chip-btn').forEach(btn => {
      if (btn.getAttribute('data-category') === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update category dropdown if present
    const categorySelect = document.getElementById('intake-category-select');
    if (categorySelect && categorySelect.value !== category) {
      categorySelect.value = category;
    }

    const catData = INTAKE_CATEGORIES[category] || INTAKE_CATEGORIES.all;

    // If category specifies a preferred service, select it
    if (catData.serviceId) {
      const targetCard = document.querySelector(`.service-select-card[data-service-id="${catData.serviceId}"]`);
      if (targetCard && !targetCard.classList.contains('selected')) {
        targetCard.click();
      }
    }

    // Populate focus dropdown with category options
    const focusSelect = document.getElementById('intake-focus');
    if (focusSelect) {
      focusSelect.innerHTML = '';
      catData.options.forEach(opt => {
        const optionEl = document.createElement('option');
        optionEl.value = opt.value;
        optionEl.textContent = opt.label;
        focusSelect.appendChild(optionEl);
      });

      if (catData.options.length > 0) {
        focusSelect.selectedIndex = 0;
        this.bookingData.focusArea = catData.options[0].value;
      }
    }

    this.updateSummary();
  }

  setupNavigation() {
    const nextBtn = document.getElementById('wizard-next-btn');
    const prevBtn = document.getElementById('wizard-prev-btn');
    const submitBtn = document.getElementById('wizard-submit-btn');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.validateCurrentStep()) {
          this.currentStep++;
          this.updateUI();
          const target = document.getElementById('whatsapp-intake') || document.getElementById('book-now');
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentStep > 1) {
          this.currentStep--;
          this.updateUI();
        }
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.submitBooking();
      });
    }
  }

  setupServiceSelection() {
    const serviceCards = document.querySelectorAll('.service-select-card');
    serviceCards.forEach(card => {
      card.addEventListener('click', () => {
        serviceCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        const serviceId = card.getAttribute('data-service-id');
        const title = card.querySelector('.select-card-title').innerText;
        const duration = card.querySelector('.select-card-meta') ? card.querySelector('.select-card-meta').innerText : 'Comprehensive';

        this.bookingData.serviceId = serviceId;
        this.bookingData.service = title;
        this.bookingData.duration = duration;

        // Toggle form fields based on whether service is Vastu, Counsellor, or Astrology/Numerology
        this.toggleServiceSpecificFields(serviceId);
        this.updateSummary();
      });
    });
  }

  toggleServiceSpecificFields(serviceId) {
    const birthFields = document.querySelectorAll('.field-birth-only');
    const vastuFields = document.querySelectorAll('.field-vastu-only');

    if (serviceId === 'vastu') {
      birthFields.forEach(el => el.style.display = 'none');
      vastuFields.forEach(el => el.style.display = 'block');
    } else if (serviceId === 'counsellor') {
      birthFields.forEach(el => el.style.display = 'block');
      vastuFields.forEach(el => el.style.display = 'none');
    } else {
      birthFields.forEach(el => el.style.display = 'block');
      vastuFields.forEach(el => el.style.display = 'none');
    }
  }

  setupFormSync() {
    const inputs = [
      { id: 'intake-name', key: 'fullName' },
      { id: 'intake-email', key: 'email' },
      { id: 'intake-phone', key: 'phone' },
      { id: 'intake-dob', key: 'dob' },
      { id: 'intake-tob', key: 'tob' },
      { id: 'intake-accuracy', key: 'tobAccuracy' },
      { id: 'intake-city', key: 'pobCity' },
      { id: 'intake-state', key: 'pobState' },
      { id: 'intake-property-type', key: 'propertyType' },
      { id: 'intake-property-dir', key: 'propertyDirection' },
      { id: 'intake-focus', key: 'focusArea' },
      { id: 'intake-notes', key: 'notes' }
    ];

    inputs.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) {
        el.addEventListener('input', (e) => {
          this.bookingData[item.key] = e.target.value;
          this.updateSummary();
        });
        el.addEventListener('change', (e) => {
          this.bookingData[item.key] = e.target.value;
          this.updateSummary();
        });
      }
    });
  }

  setupCalendar() {
    const calendarDays = document.getElementById('calendar-days-container');
    const timeSlots = document.getElementById('timeslot-container');
    if (!calendarDays || !timeSlots) return;

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentMonthName = today.toLocaleString('default', { month: 'long', year: 'numeric' });
    const monthHeader = document.getElementById('calendar-month-name');
    if (monthHeader) monthHeader.innerText = currentMonthName;

    calendarDays.innerHTML = '';
    const dayHeaders = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    dayHeaders.forEach(dh => {
      const headerEl = document.createElement('div');
      headerEl.className = 'day-name';
      headerEl.innerText = dh;
      calendarDays.appendChild(headerEl);
    });

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDay = new Date(currentYear, currentMonth, 1).getDay();

    for (let b = 0; b < startDay; b++) {
      const blank = document.createElement('div');
      blank.className = 'day-slot disabled';
      calendarDays.appendChild(blank);
    }

    let defaultSelectedDay = null;

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(currentYear, currentMonth, day);
      const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isToday = day === today.getDate();

      const dayEl = document.createElement('button');
      dayEl.type = 'button';
      dayEl.className = `day-slot ${isPast ? 'disabled' : ''} ${isToday ? 'today' : ''}`;
      dayEl.innerText = day;
      dayEl.setAttribute('data-day', day);

      if (!isPast && !defaultSelectedDay) {
        defaultSelectedDay = dayEl;
        dayEl.classList.add('selected');
        this.bookingData.selectedDate = `${day} ${currentMonthName}`;
      }

      if (!isPast) {
        dayEl.addEventListener('click', () => {
          document.querySelectorAll('.day-slot').forEach(d => d.classList.remove('selected'));
          dayEl.classList.add('selected');
          this.bookingData.selectedDate = `${day} ${currentMonthName}`;
          this.updateSummary();
        });
      }

      calendarDays.appendChild(dayEl);
    }

    const slots = [
      '11:00 AM IST',
      '02:30 PM IST',
      '04:00 PM IST',
      '06:00 PM IST',
      '07:30 PM IST'
    ];

    timeSlots.innerHTML = '';
    slots.forEach((slot, idx) => {
      const slotBtn = document.createElement('button');
      slotBtn.type = 'button';
      slotBtn.className = `time-slot-pill ${idx === 2 ? 'selected' : ''}`;
      slotBtn.innerText = slot;
      slotBtn.addEventListener('click', () => {
        document.querySelectorAll('.time-slot-pill').forEach(s => s.classList.remove('selected'));
        slotBtn.classList.add('selected');
        this.bookingData.selectedTime = slot;
        this.updateSummary();
      });
      timeSlots.appendChild(slotBtn);
    });
  }

  validateCurrentStep() {
    if (this.currentStep === 1) {
      return true; // Service selected by default
    }

    if (this.currentStep === 2) {
      const nameInput = document.getElementById('intake-name');
      const phoneInput = document.getElementById('intake-phone');
      const cityInput = document.getElementById('intake-city');

      if (!nameInput || !nameInput.value.trim()) {
        alert('Please enter your Full Name.');
        if (nameInput) nameInput.focus();
        return false;
      }

      if (!phoneInput || !phoneInput.value.trim()) {
        alert('Please enter your WhatsApp Number.');
        if (phoneInput) phoneInput.focus();
        return false;
      }

      if (!cityInput || !cityInput.value.trim()) {
        alert('Please enter your City/Location.');
        if (cityInput) cityInput.focus();
        return false;
      }

      if (this.bookingData.serviceId === 'astrology' || this.bookingData.serviceId === 'numerology') {
        const dobInput = document.getElementById('intake-dob');
        if (!dobInput || !dobInput.value) {
          alert('Date of Birth is required for accurate astronomical and numerological analysis.');
          if (dobInput) dobInput.focus();
          return false;
        }
      }

      return true;
    }

    return true;
  }

  updateUI() {
    // Progress nodes
    for (let i = 1; i <= this.totalSteps; i++) {
      const node = document.getElementById(`step-node-${i}`);
      const panel = document.getElementById(`step-panel-${i}`);

      if (node) {
        node.classList.remove('active', 'completed');
        if (i === this.currentStep) {
          node.classList.add('active');
        } else if (i < this.currentStep) {
          node.classList.add('completed');
        }
      }

      if (panel) {
        panel.classList.remove('active');
        if (i === this.currentStep) {
          panel.classList.add('active');
        }
      }
    }

    // Progress bar fill percentage
    const fill = document.getElementById('progress-line-fill');
    if (fill) {
      const pct = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
      fill.style.width = `${pct}%`;
    }

    // Action buttons visibility
    const prevBtn = document.getElementById('wizard-prev-btn');
    const nextBtn = document.getElementById('wizard-next-btn');
    const submitBtn = document.getElementById('wizard-submit-btn');

    if (prevBtn) prevBtn.style.display = this.currentStep === 1 ? 'none' : 'inline-flex';
    if (nextBtn) nextBtn.style.display = this.currentStep === 3 ? 'none' : 'inline-flex';
    if (submitBtn) submitBtn.style.display = this.currentStep === 3 ? 'inline-flex' : 'none';

    this.updateSummary();
  }

  updateSummary() {
    const elService = document.getElementById('summary-service');
    const elDateTime = document.getElementById('summary-datetime');
    const elName = document.getElementById('summary-name');
    const elBirth = document.getElementById('summary-birth');
    const elFocus = document.getElementById('summary-focus');
    const elPreview = document.getElementById('whatsapp-live-preview');

    if (elService) elService.innerText = `${this.bookingData.service} (${this.bookingData.duration})`;
    if (elDateTime) elDateTime.innerText = `${this.bookingData.selectedDate || 'Select Date'} @ ${this.bookingData.selectedTime}`;
    if (elName) elName.innerText = this.bookingData.fullName || '—';
    if (elBirth) {
      if (this.bookingData.serviceId === 'vastu') {
        const prop = this.bookingData.propertyType || 'Property';
        const dir = this.bookingData.propertyDirection || '';
        const city = this.bookingData.pobCity || '';
        elBirth.innerText = `${prop} ${dir ? '• ' + dir : ''} ${city ? '• ' + city : ''}`;
      } else if (this.bookingData.serviceId === 'counsellor') {
        const city = this.bookingData.pobCity || '';
        elBirth.innerText = `1-on-1 Confidential Counseling ${city ? '• ' + city : ''}`;
      } else {
        const dob = this.bookingData.dob || '—';
        const tob = this.bookingData.tob || '';
        const city = this.bookingData.pobCity || '';
        elBirth.innerText = `${dob} ${tob ? '(' + tob + ')' : ''} ${city ? '• ' + city : ''}`;
      }
    }
    if (elFocus) elFocus.innerText = this.bookingData.focusArea || 'General Analysis';

    if (elPreview) {
      elPreview.innerText = this.generateWhatsAppMessage(true);
    }
  }

  generateWhatsAppMessage(isPreview = false) {
    let msg = `*॥ Consultation Inquiry — My Astro Academy ॥*\n*Dr. Rahul Trivedi, Ph.D. (IIT-Madras)*\n*Higher Dimensional Sciences (Verifiable Ancient Wisdom)*\n\n`;
    msg += `*Selected Discipline:* ${this.bookingData.service}\n`;
    msg += `*Preferred Time Window:* ${this.bookingData.selectedDate || 'Upcoming Date'} at ${this.bookingData.selectedTime}\n`;
    msg += `*Client Name:* ${this.bookingData.fullName || '[Your Name]'}\n`;
    if (this.bookingData.phone) msg += `*Contact Phone:* ${this.bookingData.phone}\n`;
    if (this.bookingData.email) msg += `*Email:* ${this.bookingData.email}\n`;

    if (this.bookingData.serviceId === 'vastu') {
      msg += `\n*-- Property & Space Parameters --*\n`;
      msg += `*Space Type:* ${this.bookingData.propertyType}\n`;
      msg += `*Main Entrance:* ${this.bookingData.propertyDirection}\n`;
      msg += `*Location:* ${this.bookingData.pobCity || '[City]'}${this.bookingData.pobState ? ', ' + this.bookingData.pobState : ''}\n`;
    } else if (this.bookingData.serviceId === 'counsellor') {
      msg += `\n*-- Confidential Counseling Scope --*\n`;
      msg += `*Consultation Mode:* 1-on-1 Spiritual & Life Counseling\n`;
      if (this.bookingData.pobCity) msg += `*Location:* ${this.bookingData.pobCity}${this.bookingData.pobState ? ', ' + this.bookingData.pobState : ''}\n`;
      if (this.bookingData.dob) msg += `*Date of Birth (Optional):* ${this.bookingData.dob}\n`;
    } else {
      msg += `\n*-- Astronomical & Birth Parameters --*\n`;
      msg += `*Date of Birth:* ${this.bookingData.dob || '[DD/MM/YYYY]'}\n`;
      msg += `*Time of Birth:* ${this.bookingData.tob || 'To confirm'} (${this.bookingData.tobAccuracy})\n`;
      msg += `*Place of Birth:* ${this.bookingData.pobCity || '[City]'}${this.bookingData.pobState ? ', ' + this.bookingData.pobState : ''}\n`;
    }

    msg += `\n*Primary Area of Inquiry:* ${this.bookingData.focusArea}\n`;
    if (this.bookingData.notes) {
      msg += `*Specific Context / Dilemma:* ${this.bookingData.notes}\n`;
    }

    if (!isPreview && this.bookingData.refCode) {
      msg += `*Reference Code:* ${this.bookingData.refCode}\n`;
    }

    msg += `\nNamaste Dr. Rahul ji, please let me know your availability for this consultation.`;
    return msg;
  }

  setupModal() {
    const modal = document.getElementById('booking-modal');
    const closeBtn = document.getElementById('close-modal-btn');

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        this.resetWizard();
      });
    }
  }

  submitBooking() {
    this.bookingData.refCode = 'MAA-' + Math.floor(100000 + Math.random() * 900000);
    const modal = document.getElementById('booking-modal');
    const modalRef = document.getElementById('modal-ref-code');
    const modalSummary = document.getElementById('modal-booking-summary');

    if (modalRef) modalRef.innerText = this.bookingData.refCode;
    if (modalSummary) {
      modalSummary.innerHTML = `
        <div style="margin-bottom: 0.6rem;">
          <span style="color: var(--kesari-primary); font-weight: 700; font-size: 1.05rem;">${this.bookingData.service}</span>
        </div>
        <div>Slot: <strong>${this.bookingData.selectedDate} at ${this.bookingData.selectedTime}</strong></div>
        <div>Client: <strong>${this.bookingData.fullName}</strong></div>
        ${this.bookingData.serviceId === 'vastu'
          ? `<div>Property: <strong>${this.bookingData.propertyType} (${this.bookingData.pobCity || 'Site'})</strong></div>`
          : this.bookingData.serviceId === 'counsellor'
            ? `<div>Session: <strong>Confidential 1-on-1 Guidance</strong></div>`
            : `<div>Birth: <strong>${this.bookingData.dob} (${this.bookingData.pobCity})</strong></div>`
        }
        <div style="margin-top: 0.6rem; color: var(--text-muted); font-size: 0.85rem;">
          Consultant: <strong>Dr. Rahul Trivedi, Ph.D. (IIT-Madras)</strong>
        </div>
      `;
    }

    const waMessage = this.generateWhatsAppMessage(false);
    const waUrl = `https://wa.me/919152517036?text=${encodeURIComponent(waMessage)}`;

    const waActionBtn = document.getElementById('modal-whatsapp-btn');
    if (waActionBtn) {
      waActionBtn.href = waUrl;
    }

    if (modal) {
      modal.classList.add('open');
    }

    try {
      window.open(waUrl, '_blank');
    } catch (err) {
      console.log('Popup blocked, available in modal');
    }
  }

  resetWizard() {
    this.currentStep = 1;
    this.updateUI();
  }
}

// Global function to trigger consultation for specific service
window.selectServiceAndBook = function(serviceId) {
  const wizard = window.bookingWizardInstance;
  if (!wizard) return;

  const card = document.querySelector(`.service-select-card[data-service-id="${serviceId}"]`);
  if (card) {
    card.click();
  }
  wizard.currentStep = 2;
  wizard.updateUI();

  const target = document.getElementById('whatsapp-intake') || document.getElementById('book-now');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Global function to handle dilemma pills
window.selectDilemmaAndConsult = function(dilemmaText, suggestedService = 'vastu') {
  const wizard = window.bookingWizardInstance;
  if (!wizard) return;

  // Set suggested service
  const card = document.querySelector(`.service-select-card[data-service-id="${suggestedService}"]`);
  if (card) card.click();

  // Populate focus / notes
  const notesField = document.getElementById('intake-notes');
  if (notesField) {
    notesField.value = `I am seeking guidance regarding: ${dilemmaText}.`;
    wizard.bookingData.notes = notesField.value;
  }

  wizard.bookingData.focusArea = dilemmaText;
  const focusSelect = document.getElementById('intake-focus');
  if (focusSelect) {
    let matched = false;
    for (let opt of focusSelect.options) {
      if (opt.text.toLowerCase().includes(dilemmaText.toLowerCase().split(' ')[0])) {
        focusSelect.value = opt.value;
        wizard.bookingData.focusArea = opt.value;
        matched = true;
        break;
      }
    }
    if (!matched) {
      const customOpt = document.createElement('option');
      customOpt.value = dilemmaText;
      customOpt.text = dilemmaText;
      customOpt.selected = true;
      focusSelect.prepend(customOpt);
      wizard.bookingData.focusArea = dilemmaText;
    }
  }

  wizard.currentStep = 2;
  wizard.updateUI();

  const target = document.getElementById('whatsapp-intake') || document.getElementById('book-now');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  new BookingWizard();
});
