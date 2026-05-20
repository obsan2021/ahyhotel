// Booking System JavaScript
class BookingSystem {
    constructor() {
        this.checkIn = null;
        this.checkOut = null;
        this.guests = 1;
        this.roomType = 'standard';
        this.rooms = [];
        this.init();
    }
    init() {
        this.loadRooms();
        this.setupDatePickers();
        this.setupEventListeners();
        this.updatePrice();
    }
    loadRooms() {
        fetch('../data/rooms.json')
            .then(response => response.json())
            .then(data => {
                this.rooms = data;
                this.populateRoomSelect();
            })
            .catch(error => console.error('Error loading rooms:', error));
    }
    setupDatePickers() {
        const today = new Date().toISOString().split('T')[0];
        const checkInInput = document.getElementById('check-in');
        const checkOutInput = document.getElementById('check-out');
        if (checkInInput) {
            checkInInput.min = today;
            checkInInput.addEventListener('change', (e) => {
                this.checkIn = e.target.value;
                if (checkOutInput) {
                    checkOutInput.min = e.target.value;
                }
                this.updatePrice();
            });
        }
        if (checkOutInput) {
            checkOutInput.addEventListener('change', (e) => {
                this.checkOut = e.target.value;
                this.updatePrice();
            });
        }
    }
    setupEventListeners() {
        const guestInput = document.getElementById('guests');
        const roomSelect = document.getElementById('room-type');
        if (guestInput) {
            guestInput.addEventListener('change', (e) => {
                this.guests = parseInt(e.target.value);
                this.updatePrice();
            });
        }
        if (roomSelect) {
            roomSelect.addEventListener('change', (e) => {
                this.roomType = e.target.value;
                this.updatePrice();
            });
        }
        const bookingForm = document.getElementById('booking-form');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    calculateNights() {
        if (!this.checkIn || !this.checkOut) return 0;
        const start = new Date(this.checkIn);
        const end = new Date(this.checkOut);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    updatePrice() {
        const selectedRoom = this.rooms.find(room => room.type === this.roomType);
        if (!selectedRoom) return;
        const nights = this.calculateNights();
        const totalPrice = selectedRoom.price * nights;
        const priceDisplay = document.getElementById('total-price');
        if (priceDisplay) {
            priceDisplay.textContent = ₹;
        }
        const nightsDisplay = document.getElementById('nights-count');
        if (nightsDisplay) {
            nightsDisplay.textContent = nights;
        }
    }
    populateRoomSelect() {
        const roomSelect = document.getElementById('room-type');
        if (roomSelect && this.rooms.length > 0) {
            roomSelect.innerHTML = this.rooms.map(room => 
                <option value=""> - ₹/night</option>
            ).join('');
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        if (!this.checkIn || !this.checkOut) {
            this.showMessage('Please select check-in and check-out dates', 'error');
            return;
        }
        const bookingData = {
            checkIn: this.checkIn,
            checkOut: this.checkOut,
            guests: this.guests,
            roomType: this.roomType,
            totalPrice: document.getElementById('total-price')?.textContent
        };
        localStorage.setItem('currentBooking', JSON.stringify(bookingData));
        this.showMessage('Booking confirmed! Check your email for details.', 'success');
        setTimeout(() => {
            window.location.href = 'confirmation.html';
        }, 2000);
    }
    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = message message-;
        messageDiv.textContent = message;
        const form = document.getElementById('booking-form');
        if (form) {
            form.insertBefore(messageDiv, form.firstChild);
            setTimeout(() => messageDiv.remove(), 5000);
        }
    }
}
// Initialize booking system
const booking = new BookingSystem();
