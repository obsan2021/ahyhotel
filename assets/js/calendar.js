// Calendar and Availability System
class AvailabilityCalendar {
    constructor() {
        this.currentDate = new Date();
        this.bookedDates = [];
        this.init();
    }
    init() {
        this.loadBookedDates();
        this.renderCalendar();
        this.setupEventListeners();
    }
    loadBookedDates() {
        // Sample booked dates (in production, fetch from server)
        const sampleBooked = ['2024-12-25', '2024-12-31', '2025-01-01'];
        this.bookedDates = sampleBooked;
    }
    renderCalendar() {
        const calendarContainer = document.getElementById('calendar');
        if (!calendarContainer) return;
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        let calendarHTML = 
            <div class="calendar-header">
                <button class="prev-month">&lt;</button>
                <h3> </h3>
                <button class="next-month">&gt;</button>
            </div>
            <div class="calendar-weekdays">
                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div>
                <div>Thu</div><div>Fri</div><div>Sat</div>
            </div>
            <div class="calendar-days">
        ;
        // Empty cells for days before month starts
        for (let i = 0; i < startingDay; i++) {
            calendarHTML += <div class="calendar-day empty"></div>;
        }
        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = ${year}--;
            const isBooked = this.bookedDates.includes(dateString);
            const isToday = this.isToday(year, month, day);
            calendarHTML += 
                <div class="calendar-day  "
                     data-date="">
                    
                    
                </div>
            ;
        }
        calendarHTML += </div>;
        calendarContainer.innerHTML = calendarHTML;
        // Add click handlers
        document.querySelectorAll('.calendar-day.available').forEach(day => {
            day.addEventListener('click', () => this.selectDate(day.dataset.date));
        });
        document.querySelector('.prev-month')?.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });
        document.querySelector('.next-month')?.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });
    }
    isToday(year, month, day) {
        const today = new Date();
        return today.getFullYear() === year && 
               today.getMonth() === month && 
               today.getDate() === day;
    }
    selectDate(date) {
        const checkInInput = document.getElementById('check-in');
        const checkOutInput = document.getElementById('check-out');
        if (!checkInInput || !checkOutInput) return;
        if (!checkInInput.value || (checkInInput.value && checkOutInput.value)) {
            checkInInput.value = date;
            checkOutInput.value = '';
        } else if (checkInInput.value && !checkOutInput.value) {
            if (date > checkInInput.value) {
                checkOutInput.value = date;
            } else {
                checkOutInput.value = checkInInput.value;
                checkInInput.value = date;
            }
        }
        // Trigger change events
        checkInInput.dispatchEvent(new Event('change'));
        checkOutInput.dispatchEvent(new Event('change'));
    }
    setupEventListeners() {
        // Add any additional event listeners
    }
}
// Initialize calendar
const calendar = new AvailabilityCalendar();
