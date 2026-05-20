// Gallery JavaScript
class Gallery {
    constructor() {
        this.images = [];
        this.currentIndex = 0;
        this.init();
    }
    init() {
        this.loadImages();
        this.setupFilters();
        this.setupLightbox();
    }
    loadImages() {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;
        // Sample gallery images
        const sampleImages = [
            { src: 'assets/images/gallery/hotel-lobby.jpg', category: 'lobby', title: 'Elegant Lobby' },
            { src: 'assets/images/gallery/swimming-pool.jpg', category: 'pool', title: 'Infinity Pool' },
            { src: 'assets/images/gallery/spa.jpg', category: 'spa', title: 'Luxury Spa' },
            { src: 'assets/images/gallery/restaurant.jpg', category: 'dining', title: 'Fine Dining' },
            { src: 'assets/images/gallery/conference.jpg', category: 'events', title: 'Conference Hall' },
            { src: 'assets/images/gallery/suite.jpg', category: 'rooms', title: 'Presidential Suite' }
        ];
        this.images = sampleImages;
        galleryGrid.innerHTML = sampleImages.map((img, index) => 
            <div class="gallery-item" data-category="">
                <img src="" alt="" loading="lazy">
                <div class="gallery-overlay">
                    <h3></h3>
                    <button class="view-btn" data-index="">View</button>
                </div>
            </div>
        ).join('');
        // Add click listeners to view buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(btn.dataset.index);
                this.openLightbox(index);
            });
        });
    }
    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                this.filterImages(category);
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
    filterImages(category) {
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    setupLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = 
            <span class="close-lightbox">&times;</span>
            <img class="lightbox-img" src="" alt="">
            <button class="prev-btn">❮</button>
            <button class="next-btn">❯</button>
        ;
        document.body.appendChild(lightbox);
        this.lightbox = lightbox;
        lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
            this.closeLightbox();
        });
        lightbox.querySelector('.prev-btn').addEventListener('click', () => {
            this.prevImage();
        });
        lightbox.querySelector('.next-btn').addEventListener('click', () => {
            this.nextImage();
        });
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) this.closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') this.prevImage();
            if (e.key === 'ArrowRight') this.nextImage();
        });
    }
    openLightbox(index) {
        this.currentIndex = index;
        this.updateLightboxImage();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    updateLightboxImage() {
        const img = this.images[this.currentIndex];
        this.lightbox.querySelector('.lightbox-img').src = img.src;
        this.lightbox.querySelector('.lightbox-img').alt = img.title;
    }
    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateLightboxImage();
    }
    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateLightboxImage();
    }
}
// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const gallery = new Gallery();
});
