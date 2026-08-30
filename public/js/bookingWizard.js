/**
 * 3-Step Booking Wizard Module
 * Step 1: Service Selection
 * Step 2: Birth Details & Context Intake Form
 * Step 3: Date & Slot Scheduling + Confirmation Modal
 */

class BookingWizard {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 3;

    this.bookingData = {
      service: 'Astrology Deep-Dive Consultation',
      serviceId: 'astrology',
      duration: '75 Minutes',
      fee: '₹5,000 / $85 USD',
      fullName: '',
      email: '',
      phone: '',
      dob: '',
      tob: '',
      tobAccuracy: 'Exact Record',
      pobCity: '',
      pobState: '',
      pobCountry: 'India',
      focusArea: 'Career & Life Direction',
      notes: '',
      selectedDate: '',
      selectedTime: '04:00 PM IST',
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
        const duration = card.querySelector('.select-card-meta').innerText;
        const fee = card.querySelector('.select-card-price').innerText;

        this.bookingData.serviceId = serviceId;
        this.bookingData.service = title;
        this.bookingData.duration = duration;
        this.bookingData.fee = fee;

        this.updateSummary();
      });
    });
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
      { id: 'intake-country', key: 'pobCountry' },
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
      }
    });
  }

  setupCalendar() {
    const calendarDays = document.getElementById('calendar-days-container');
    const timeSlots = document.getElementById('timeslot-container');
    if (!calendarDays || !timeSlots) return;

    // Generate current month days
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentMonthName = today.toLocaleString('default', { month: 'long', year: 'numeric' });
    const monthHeader = document.getElementById('calendar-month-name');
    if (monthHeader) monthHeader.innerText = currentMonthName;

    calendarDays.innerHTML = '';

    // Day of week headers
    const dayHeaders = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    dayHeaders.forEach(dh => {
      const headerEl = document.createElement('div');
      headerEl.className = 'day-name';
      headerEl.innerText = dh;
      calendarDays.appendChild(headerEl);
    });

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDay = new Date(currentYear, currentMonth, 1).getDay();

    // Blank cells before first day
    for (let b = 0; b < startDay; b++) {
      const blank = document.createElement('div');
      blank.className = 'day-slot disabled';
      blank.innerText = '';
      calendarDays.appendChild(blank);
    }

    let defaultSelectedDay = null;

    for (let d = 1; d <= daysInMonth; d++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'day-slot';
      dayEl.innerText = d;

      // Disable past days
      if (d < today.getDate()) {
        dayEl.classList.add('disabled');
      } else {
        if (!defaultSelectedDay && d >= today.getDate()) {
          defaultSelectedDay = dayEl;
          dayEl.classList.add('selected');
          this.bookingData.selectedDate = `${today.toLocaleString('default', { month: 'short' })} ${d}, ${currentYear}`;
        }

        dayEl.addEventListener('click', () => {
          document.querySelectorAll('.day-slot').forEach(s => s.classList.remove('selected'));
          dayEl.classList.add('selected');
          this.bookingData.selectedDate = `${today.toLocaleString('default', { month: 'short' })} ${d}, ${currentYear}`;
          this.updateSummary();
        });
      }

      calendarDays.appendChild(dayEl);
    }

    // Generate Time Slots
    const slots = [
      '10:00 AM IST', '11:30 AM IST', '02:00 PM IST',
      '04:00 PM IST', '06:00 PM IST', '07:30 PM IST'
    ];

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
      return true; // Service selected by default
    }

    if (this.currentStep === 2) {
      const name = document.getElementById('intake-name').value.trim();
      const email = document.getElementById('intake-email').value.trim();
      const dob = document.getElementById('intake-dob').value.trim();
      const tob = document.getElementById('intake-tob').value.trim();
      const city = document.getElementById('intake-city').value.trim();

      if (!name || !email || !dob || !tob || !city) {
        alert('Please fill in all mandatory fields: Full Name, Email, Date of Birth, Time of Birth, and Place of Birth.');
        return false;
      }
      return true;
    }

    return true;
  }

  updateUI() {
    // Step Nodes
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

    // Progress Bar Fill
    const fill = document.getElementById('progress-line-fill');
    if (fill) {
      fill.style.width = `${((this.currentStep - 1) / (this.totalSteps - 1)) * 100}%`;
    }

    // Buttons visibility
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

    if (elService) elService.innerText = `${this.bookingData.service} (${this.bookingData.duration})`;
    if (elDateTime) elDateTime.innerText = `${this.bookingData.selectedDate || 'Select Date'} @ ${this.bookingData.selectedTime}`;
    if (elName) elName.innerText = this.bookingData.fullName || '—';
    if (elBirth) {
      const dob = this.bookingData.dob || '—';
      const tob = this.bookingData.tob || '';
      const city = this.bookingData.pobCity || '';
      elBirth.innerText = `${dob} ${tob ? '(' + tob + ')' : ''} ${city ? '• ' + city : ''}`;
    }
    if (elFocus) elFocus.innerText = this.bookingData.focusArea || 'General Analysis';
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
    const refCode = 'MAA-' + Math.floor(100000 + Math.random() * 900000);
    const modal = document.getElementById('booking-modal');
    const modalRef = document.getElementById('modal-ref-code');
    const modalSummary = document.getElementById('modal-booking-summary');

    if (modalRef) modalRef.innerText = refCode;
    if (modalSummary) {
      modalSummary.innerHTML = `
        <strong>${this.bookingData.service}</strong><br>
        Date & Time: <strong>${this.bookingData.selectedDate} at ${this.bookingData.selectedTime}</strong><br>
        Consultant: <strong>Dr. Rahul Trivedi, Ph.D. (IIT-Madras)</strong><br>
        Client: <strong>${this.bookingData.fullName}</strong> (${this.bookingData.email})
      `;
    }

    if (modal) {
      modal.classList.add('open');
    }
  }

  resetWizard() {
    this.currentStep = 1;
    this.updateUI();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new BookingWizard();
});
