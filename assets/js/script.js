/**
 * Main script file for Rumah BSD website
 * Mengintegrasikan semua komponen untuk fungsionalitas website
 */

// Menunggu document ready
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi semua komponen
    RumahBSD.init();
    
    // Inisialisasi komponen spesifik halaman
    initPageSpecificComponents();
    
    // Inisialisasi komponen tambahan
    initAdditionalComponents();
});

/**
 * Inisialisasi komponen spesifik halaman berdasarkan path URL
 */
function initPageSpecificComponents() {
    const currentPath = window.location.pathname;
    
    // Inisialisasi halaman Home
    if (currentPath.endsWith('/index.html') || currentPath.endsWith('/') || currentPath === '') {
        // Halaman home tidak memerlukan komponen spesifik lainnya
    }
    
    // Inisialisasi halaman Property
    else if (currentPath.includes('/property.html')) {
        initPropertyPage();
    }
    
    // Inisialisasi halaman Property Detail
    else if (currentPath.includes('/properti/')) {
        RumahBSD.initPropertyBannerSwiper();
        RumahBSD.initGalleryCarouselSwiper();
        RumahBSD.initRelatedSwipers();
    }
    
    // Inisialisasi halaman House (Daftar Rumah)
    else if (currentPath.includes('/house.html')) {
        initHousePage();
    }
    
    // Inisialisasi halaman House Detail
    else if (currentPath.includes('/rumah-dijual/')) {
        RumahBSD.initDetailSwipers();
        RumahBSD.initRelatedSwipers();
        RumahBSD.initShareButtons();
        RumahBSD.initWhatsAppButtons();
    }
    
    // Inisialisasi halaman Galeri
    else if (currentPath.includes('/galeri.html')) {
        initGalleryPage();
    }
}

/**
 * Inisialisasi komponen tambahan
 */
function initAdditionalComponents() {
    // Added smooth scrolling for navigation links that point to ID references
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Inisialisasi halaman Property
 */
function initPropertyPage() {
    RumahBSD.initFilterForm();
    
    // Initialize property filter
    RumahBSD.initPropertyFilter('.property-card', function() {
        const priceRange = document.getElementById('priceRange').value;
        const location = document.getElementById('location').value;
        const status = document.getElementById('status').value;
        const searchInput = document.getElementById('locationSearch');
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        const propertyCards = document.querySelectorAll('.property-card');
        let visibleCount = 0;
        
        propertyCards.forEach(card => {
            const isSearchMatch = !searchTerm || card.classList.contains('search-match');
            const isPriceMatch = !priceRange || card.getAttribute('data-price') === priceRange;
            const isLocationMatch = !location || card.getAttribute('data-location') === location;
            const isStatusMatch = !status || card.getAttribute('data-status') === status;
            
            if (isSearchMatch && isPriceMatch && isLocationMatch && isStatusMatch) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Check for no results
        RumahBSD.checkNoResults(
            '.property-card[style="display: flex;"]', 
            '.properties-grid-container', 
            'Tidak ada properti yang sesuai dengan kriteria yang dipilih. Silakan coba kriteria lain.'
        );
        
        // Hide filter form after applying
        const filterForm = document.querySelector('.filter-form');
        if (filterForm) {
            filterForm.classList.remove('active');
            setTimeout(() => {
                filterForm.style.display = 'none';
            }, 300);
        }
    });
}

/**
 * Inisialisasi halaman House (Daftar Rumah)
 */
function initHousePage() {
    RumahBSD.initFilterForm();
    
    // Initialize house filter
    RumahBSD.initPropertyFilter('.house-type-card', function() {
        const priceRange = document.getElementById('priceRange').value;
        const bedrooms = document.getElementById('bedrooms').value;
        const propertyType = document.getElementById('propertyType').value;
        const searchInput = document.getElementById('locationSearch');
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        const houseCards = document.querySelectorAll('.house-type-card');
        
        houseCards.forEach(card => {
            let showCard = true;
            
            // Check search match
            if (searchTerm) {
                const location = card.querySelector('.house-location').textContent.toLowerCase();
                if (!location.includes(searchTerm)) {
                    showCard = false;
                }
            }
            
            // Filter by price range
            if (priceRange && showCard) {
                const price = parseInt(card.querySelector('.house-price').innerText.replace(/\D/g, ''));
                const [min, max] = priceRange.split('-').map(val => parseInt(val));
                
                if (price < min * 1000000 || price > max * 1000000) {
                    showCard = false;
                }
            }
            
            // Filter by bedrooms
            if (bedrooms && showCard) {
                const cardBedrooms = parseInt(card.querySelector('.spec:nth-child(3) span').innerText);
                if (cardBedrooms != parseInt(bedrooms)) {
                    showCard = false;
                }
            }
            
            // Filter by property type
            if (propertyType && showCard) {
                const cardTitle = card.querySelector('.house-name').innerText.toLowerCase();
                if (!cardTitle.includes(propertyType.toLowerCase())) {
                    showCard = false;
                }
            }
            
            // Show or hide card based on filters
            card.style.display = showCard ? 'block' : 'none';
        });
        
        // Check for no results
        RumahBSD.checkNoResults(
            '.house-type-card[style="display: block;"]', 
            '.houses-grid-container', 
            'Tidak ada rumah yang sesuai dengan kriteria yang dipilih. Silakan coba kriteria lain.'
        );
        
        // Hide filter form after applying
        const filterForm = document.querySelector('.filter-form');
        if (filterForm) {
            filterForm.classList.remove('active');
            setTimeout(() => {
                filterForm.style.display = 'none';
            }, 300);
        }
    });
}

/**
 * Inisialisasi halaman Galeri
 */
function initGalleryPage() {
    RumahBSD.initFilterForm();
    
    // Tambahkan kode ini di awal fungsi untuk menampilkan semua gambar saat halaman pertama kali dimuat
    const galleryItems = document.querySelectorAll('.gallery-grid-item');
    galleryItems.forEach(item => {
        item.style.display = 'block';
        item.classList.add('show');
    });
    
    // Initialize gallery filter
    RumahBSD.initPropertyFilter('.gallery-grid-item', function() {
        const photoType = document.getElementById('photoType').value;
        const houseType = document.getElementById('houseType').value;
        const searchInput = document.getElementById('locationSearch');
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        const galleryItems = document.querySelectorAll('.gallery-grid-item');
        
        galleryItems.forEach(item => {
            const title = item.querySelector('.gallery-grid-overlay h3')?.textContent.toLowerCase() || '';
            const description = item.querySelector('.gallery-grid-overlay p')?.textContent.toLowerCase() || '';
            const text = title + ' ' + description;
            
            const isSearchMatch = !searchTerm || text.includes(searchTerm);
            const isPhotoTypeMatch = !photoType || item.getAttribute('data-jenis') === photoType;
            const isHouseTypeMatch = !houseType || item.getAttribute('data-tipe') === houseType;
            
            if (isSearchMatch && isPhotoTypeMatch && isHouseTypeMatch) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('show');
                }, 50);
            } else {
                item.classList.remove('show');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Check for no results
        setTimeout(() => {
            RumahBSD.checkNoResults(
                '.gallery-grid-item.show', 
                '.gallery-grid-container', 
                'Tidak ada foto yang sesuai dengan filter yang dipilih. Silakan coba kriteria lain.'
            );
        }, 350);
        
        // Hide filter form after applying
        const filterForm = document.querySelector('.filter-form');
        if (filterForm) {
            filterForm.classList.remove('active');
            setTimeout(() => {
                filterForm.style.display = 'none';
            }, 300);
        }
    });
}