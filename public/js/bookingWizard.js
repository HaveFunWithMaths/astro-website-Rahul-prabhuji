/**
 * 3-Step WhatsApp Consultation Intake Wizard Module
 * Step 1: Service Selection (Astrology, Numerology, Vastu)
 * Step 2: Intake Form (DOB, TOB, POB for Astro/Numerology or Property details for Vastu)
 * Step 3: Date & Slot Scheduling + Live Formatted WhatsApp Message Preview & Dispatch to +91 91525 17036
 */

class BookingWizard {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 3;

    this.bookingData = {
      service: 'Vedic Astrology Consultation',
      serviceId: 'astrology',
      duration: '60 - 75 Mins',
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
      focusArea: 'Career Inflection & Life Direction',
      notes: '',
      selectedDate: '',
      selectedTime: '04:00 PM IST',
      refCode: ''
    };

    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupServiceSelection();
    this.setupCalendar();
    this.setupFormSync();
    this.setupModal();
    this.updateUI();

    // Attach global instance for cross-component triggers
    window.bookingWizardInstance = this;
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

        // Toggle form fields based on whether service is Vastu or Astrology/Numerology
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
          calendarDays.querySelectorAll('.day-slot').forEach(d => d.classList.remove('selected'));
          dayEl.classList.add('selected');
          this.bookingData.selectedDate = `${day} ${currentMonthName}`;
          this.updateSummary();
        });
      }

      calendarDays.appendChild(dayEl);
    }

    const slots = ['10:00 AM IST', '11:30 AM IST', '02:00 PM IST', '04:00 PM IST', '06:00 PM IST', '07:30 PM IST'];
    timeSlots.innerHTML = slots.map((slot, idx) => `
      <button type="button" class="time-btn ${idx === 3 ? 'selected' : ''}" data-slot="${slot}">
        ${slot}
      </button>
    `).join('');

    timeSlots.querySelectorAll('.time-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        timeSlots.querySelectorAll('.time-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.bookingData.selectedTime = btn.getAttribute('data-slot');
        this.updateSummary();
      });
    });
  }

  validateCurrentStep() {
    if (this.currentStep === 1) {
      return true;
    }

    if (this.currentStep === 2) {
      const name = document.getElementById('intake-name') ? document.getElementById('intake-name').value.trim() : '';
      const phone = document.getElementById('intake-phone') ? document.getElementById('intake-phone').value.trim() : '';
      const city = document.getElementById('intake-city') ? document.getElementById('intake-city').value.trim() : '';

      if (!name) {
        alert('Please provide your Full Name.');
        return false;
      }

      if (this.bookingData.serviceId === 'vastu') {
        if (!city) {
          alert('Please provide the City / Location of the property.');
          return false;
        }
      } else {
        const dob = document.getElementById('intake-dob') ? document.getElementById('intake-dob').value.trim() : '';
        if (!dob || !city) {
          alert('Please fill in your Date of Birth and Place of Birth.');
          return false;
        }
      }
      return true;
    }

    return true;
  }

  updateUI() {
    for (let i = 1; i <= this.totalSteps; i++) {
      const node = document.getElementById(`step-node-${i}`);
      const panel = document.getElementById(`step-panel-${i}`);
      if (node && panel) {
        if (i === this.currentStep) {
          node.classList.add('active');
          node.classList.remove('completed');
          panel.classList.add('active');
        } else if (i < this.currentStep) {
          node.classList.remove('active');
          node.classList.add('completed');
          panel.classList.remove('active');
        } else {
          node.classList.remove('active');
          node.classList.remove('completed');
          panel.classList.remove('active');
        }
      }
    }

    const fill = document.getElementById('progress-line-fill');
    if (fill) {
      fill.style.width = `${((this.currentStep - 1) / (this.totalSteps - 1)) * 100}%`;
    }

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
    let msg = `*॥ Consultation Inquiry — My Astro Academy ॥*\n*Dr. Rahul Trivedi, Ph.D. (IIT-Madras)*\n\n`;
    msg += `*Selected Focus:* ${this.bookingData.service}\n`;
    msg += `*Preferred Window:* ${this.bookingData.selectedDate || 'Upcoming Date'} at ${this.bookingData.selectedTime}\n`;
    msg += `*Client Name:* ${this.bookingData.fullName || '[Your Name]'}\n`;
    if (this.bookingData.phone) msg += `*Contact Phone:* ${this.bookingData.phone}\n`;
    if (this.bookingData.email) msg += `*Email:* ${this.bookingData.email}\n`;

    if (this.bookingData.serviceId === 'vastu') {
      msg += `\n*-- Property & Spatial Parameters --*\n`;
      msg += `*Property Type:* ${this.bookingData.propertyType}\n`;
      msg += `*Facing Direction:* ${this.bookingData.propertyDirection}\n`;
      msg += `*Location:* ${this.bookingData.pobCity || '[City]'}${this.bookingData.pobState ? ', ' + this.bookingData.pobState : ''}\n`;
    } else {
      msg += `\n*-- Ephemeris & Birth Parameters --*\n`;
      msg += `*Date of Birth:* ${this.bookingData.dob || '[DD/MM/YYYY]'}\n`;
      msg += `*Time of Birth:* ${this.bookingData.tob || 'To confirm'} (${this.bookingData.tobAccuracy})\n`;
      msg += `*Place of Birth:* ${this.bookingData.pobCity || '[City]'}${this.bookingData.pobState ? ', ' + this.bookingData.pobState : ''}\n`;
    }

    msg += `\n*Primary Concern/Focus:* ${this.bookingData.focusArea}\n`;
    if (this.bookingData.notes) {
      msg += `*Specific Questions:* ${this.bookingData.notes}\n`;
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
          <span style="color: var(--gold-primary); font-weight: 700; font-size: 1.05rem;">${this.bookingData.service}</span>
        </div>
        <div>Slot: <strong>${this.bookingData.selectedDate} at ${this.bookingData.selectedTime}</strong></div>
        <div>Client: <strong>${this.bookingData.fullName}</strong></div>
        ${this.bookingData.serviceId === 'vastu'
          ? `<div>Property: <strong>${this.bookingData.propertyType} (${this.bookingData.pobCity})</strong></div>`
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
window.selectDilemmaAndConsult = function(dilemmaText, suggestedService = 'astrology') {
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
    for (let opt of focusSelect.options) {
      if (opt.text.toLowerCase().includes(dilemmaText.toLowerCase().split(' ')[0])) {
        focusSelect.value = opt.value;
        wizard.bookingData.focusArea = opt.value;
        break;
      }
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
