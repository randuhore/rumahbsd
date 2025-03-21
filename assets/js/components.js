/**
 * Rumah BSD Components Library
 * Koleksi komponen-komponen UI yang digunakan di seluruh website
 */

// Namespace untuk komponen Rumah BSD
const RumahBSD = {
    /**
     * Inisialisasi semua komponen yang tersedia di halaman
     */
    init: function() {
        // Inisialisasi navbar
        this.initNavbar();
        
        // Inisialisasi chat popup
        this.initChatPopup();
        
        // Inisialisasi back to top button
        this.initBackToTop();
        
        // Inisialisasi Fancybox jika tersedia
        this.initFancybox();
        
        // Inisialisasi Swiper components
        this.initHeroSwiper();
        this.initHouseSwipers();
        this.initGallerySwiper();
        
        // Inisialisasi form functionality
        this.initForms();
        
        // Lihat semua button handler
        this.initViewAllButtons();
        
        // Animasi komponen saat scroll
        this.initScrollAnimations();
    },
    
    /**
     * Inisialisasi Navbar
     */
    initNavbar: function() {
        const navbar = document.querySelector('.navbar');
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        if (!navbar || !hamburger || !navLinks) return;
        
        // Navbar scroll effect
        const handleNavbarScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        
        // Toggle mobile menu
        const toggleMobileMenu = () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        };
        
        // Initial check for scroll position
        handleNavbarScroll();
        
        // Event listeners
        window.addEventListener('scroll', handleNavbarScroll);
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });
    },
    
    /**
     * Inisialisasi Chat Popup
     */
    initChatPopup: function() {
        const chatPopup = document.getElementById('whatsappPopup');
        const showPopupBtn = document.getElementById('showChatPopup');
        const closePopupBtn = document.getElementById('closeChat');
        const sendBtn = document.getElementById('sendWhatsApp');
        const messageInput = document.getElementById('popupMessage');
        const chatMessages = document.querySelector('.chat-messages');
        
        if (!chatPopup || !showPopupBtn || !closePopupBtn) return;
        
        // Show chat popup
        showPopupBtn.addEventListener('click', function() {
            chatPopup.classList.add('show');
        });
        
        // Close chat popup
        closePopupBtn.addEventListener('click', function() {
            chatPopup.classList.remove('show');
        });
        
        // Add message to chat
        function addMessage(text, isSent = true) {
            if (!chatMessages) return;
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;
            
            const currentTime = new Date();
            const hours = currentTime.getHours().toString().padStart(2, '0');
            const minutes = currentTime.getMinutes().toString().padStart(2, '0');
            const timeString = `${hours}:${minutes}`;
            
            // Use the appropriate prefix depending on page location
            const assetPath = window.location.pathname.includes('/pages/') ? '../assets' : 'assets';
            
            const contentHtml = `
                ${!isSent ? '<div class="message-avatar"><img src="' + assetPath + '/images/global/foto-profil.jpg" alt="Customer Support"></div>' : ''}
                <div class="message-content">
                    <p>${text}</p>
                    <span class="message-time">${timeString}</span>
                </div>
            `;
            
            messageDiv.innerHTML = contentHtml;
            chatMessages.appendChild(messageDiv);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Send message function
        function sendMessage() {
            if (!messageInput || !sendBtn) return;
            
            const message = messageInput.value.trim();
            if (!message) return;
            
            // Add message to chat
            addMessage(message);
            
            // Clear input
            messageInput.value = '';
            
            // Send to WhatsApp after a small delay to show the message
            setTimeout(() => {
                const phoneNumber = '6285601081492';
                const encodedMessage = encodeURIComponent(message);
                const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                window.open(whatsappURL, '_blank');
                chatPopup.classList.remove('show');
            }, 1000);
        }
        
        // Send message on button click
        if (sendBtn) {
            sendBtn.addEventListener('click', sendMessage);
        }
        
        // Send message on Enter key
        if (messageInput) {
            messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }
    },
    
    /**
     * Inisialisasi Back to Top Button
     */
    initBackToTop: function() {
        const backToTopButton = document.getElementById('backToTop');
        
        if (!backToTopButton) return;
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    },
    
    /**
     * Inisialisasi Fancybox jika tersedia
     */
    initFancybox: function() {
    if (typeof Fancybox !== 'undefined') {
        // Deteksi apakah menggunakan perangkat mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Konfigurasi dasar
        const fancyboxConfig = {
            Carousel: {
                infinite: true,
                friction: 0.96, // Lebih tinggi = lebih lambat
                Panzoom: {
                    decelFriction: 0.13, // Mengurangi "momentum" setelah swipe
                    lockAxis: false,
                }
            },
            Image: {
                zoom: false, // Matikan zoom untuk performa lebih baik di mobile
            },
            Toolbar: {
                display: isMobile ? ['close'] : ['zoom', 'slideshow', 'fullscreen', 'close'] // Mengurangi jumlah tombol di mobile
            },
            preload: 1 // Hanya memuat 1 slide sebelum dan sesudah slide aktif
        };
        
        // Jika mobile, matikan thumbnails untuk performa lebih baik
        if (!isMobile) {
            fancyboxConfig.Thumbs = {
                autoStart: true
            };
        }
        
        Fancybox.bind('[data-fancybox]', fancyboxConfig);
    }
}
    
    /**
     * Inisialisasi Hero Swiper (untuk halaman utama)
     */
    initHeroSwiper: function() {
        const heroSwiperElement = document.querySelector('.heroSwiper');
        if (!heroSwiperElement) return;
        
        new Swiper(heroSwiperElement, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.heroSwiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.heroSwiper .swiper-button-next',
                prevEl: '.heroSwiper .swiper-button-prev',
            }
        });
    },
    
    /**
     * Inisialisasi House Swipers (untuk kartu rumah)
     */
    initHouseSwipers: function() {
        const houseSwipers = document.querySelectorAll('.houseSwiper');
        
        if (houseSwipers.length === 0) return;
        
        houseSwipers.forEach((swiperElement, index) => {
            new Swiper(swiperElement, {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                pagination: {
                    el: swiperElement.querySelector('.swiper-pagination'),
                    clickable: true,
                },
                navigation: {
                    nextEl: swiperElement.querySelector('.swiper-button-next'),
                    prevEl: swiperElement.querySelector('.swiper-button-prev'),
                },
                effect: 'slide',
                speed: 500,
            });
        });
    },
    
    /**
     * Inisialisasi Related Property Swipers
     */
    initRelatedSwipers: function() {
        const relatedSwipers = document.querySelectorAll('.relatedSwiper');
        
        if (relatedSwipers.length === 0) return;
        
        relatedSwipers.forEach((swiperElement) => {
            new Swiper(swiperElement, {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                pagination: {
                    el: swiperElement.querySelector('.swiper-pagination'),
                    clickable: true,
                },
                navigation: {
                    nextEl: swiperElement.querySelector('.swiper-button-next'),
                    prevEl: swiperElement.querySelector('.swiper-button-prev'),
                }
            });
        });
    },
    
    /**
     * Inisialisasi Gallery Swiper
     */
    initGallerySwiper: function() {
        const gallerySwiperElement = document.querySelector('.gallerySwiper');
        if (!gallerySwiperElement) return;
        
        new Swiper(gallerySwiperElement, {
            slidesPerView: 'auto',
            spaceBetween: 20,
            centeredSlides: false,
            pagination: {
                el: '.gallerySwiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.gallerySwiper .swiper-button-next',
                prevEl: '.gallerySwiper .swiper-button-prev',
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is >= 640px
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            }
        });
    },
    
    /**
     * Inisialisasi Gallery Carousel Swiper
     */
    initGalleryCarouselSwiper: function() {
        const galleryCarouselElement = document.querySelector('.galleryCarouselSwiper');
        if (!galleryCarouselElement) return;
        
        new Swiper(galleryCarouselElement, {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.galleryCarouselSwiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.galleryCarouselSwiper .swiper-button-next',
                prevEl: '.galleryCarouselSwiper .swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
    },
    
    /**
     * Inisialisasi Detail Swipers untuk halaman detail
     */
    initDetailSwipers: function() {
        // Initialize thumbnail swiper
        const thumbSwiper = document.querySelector('.detailThumbSwiper');
        const mainSwiper = document.querySelector('.detailMainSwiper');
        
        if (!thumbSwiper || !mainSwiper) return;
        
        const thumbSwiperInstance = new Swiper(thumbSwiper, {
            spaceBetween: 10,
            slidesPerView: 'auto',
            freeMode: true,
            watchSlidesProgress: true,
        });
        
        // Initialize main swiper with thumb control
        new Swiper(mainSwiper, {
            spaceBetween: 10,
            navigation: {
                nextEl: '.detailMainSwiper .swiper-button-next',
                prevEl: '.detailMainSwiper .swiper-button-prev',
            },
            thumbs: {
                swiper: thumbSwiperInstance,
            },
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            }
        });
    },
    
    /**
     * Inisialisasi Property Banner Swiper
     */
    initPropertyBannerSwiper: function() {
        const propertyBannerElement = document.querySelector('.propertyBannerSwiper');
        if (!propertyBannerElement) return;
        
        new Swiper(propertyBannerElement, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.propertyBannerSwiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.propertyBannerSwiper .swiper-button-next',
                prevEl: '.propertyBannerSwiper .swiper-button-prev',
            },
            effect: 'slide',
            speed: 800
        });
    },
    
    /**
     * Initialize Share Buttons with dynamic URL
     */
    initShareButtons: function() {
        const facebookBtn = document.querySelector('.share-btn.facebook-btn');
        const twitterBtn = document.querySelector('.share-btn.twitter-btn');
        const whatsappBtn = document.querySelector('.share-btn.whatsapp-btn');
        const telegramBtn = document.querySelector('.share-btn.telegram-btn');
        const copyLinkBtn = document.getElementById('copyLinkBtn');
        
        if (!facebookBtn && !twitterBtn && !whatsappBtn && !telegramBtn && !copyLinkBtn) return;
        
        // Get current URL and title
        const pageUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);
        
        // Set share URLs
        if (facebookBtn) {
            facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
        }
        
        if (twitterBtn) {
            twitterBtn.href = `https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageUrl}`;
        }
        
        if (whatsappBtn) {
            whatsappBtn.href = `https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`;
        }
        
        if (telegramBtn) {
            telegramBtn.href = `https://telegram.me/share/url?url=${pageUrl}&text=${pageTitle}`;
        }
        
        // Copy link functionality
        if (copyLinkBtn) {
            copyLinkBtn.addEventListener('click', function() {
                // Create a temporary input
                const tempInput = document.createElement('input');
                tempInput.value = window.location.href;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                // Show a temporary tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Link disalin!';
                tooltip.style.position = 'absolute';
                tooltip.style.backgroundColor = '#292357';
                tooltip.style.color = 'white';
                tooltip.style.padding = '5px 10px';
                tooltip.style.borderRadius = '5px';
                tooltip.style.fontSize = '12px';
                tooltip.style.top = (this.offsetTop - 30) + 'px';
                tooltip.style.left = (this.offsetLeft + this.offsetWidth/2 - 40) + 'px';
                tooltip.style.zIndex = '1000';
                tooltip.style.transition = 'opacity 0.3s';
                document.body.appendChild(tooltip);
                
                // Remove tooltip after 2 seconds
                setTimeout(function() {
                    tooltip.style.opacity = '0';
                    setTimeout(function() {
                        document.body.removeChild(tooltip);
                    }, 300);
                }, 2000);
            });
        }
    },
    
    /**
     * Inisialisasi forms
     */
    initForms: function() {
         // Initialize Newsletter Form
        this.initNewsletterForm();
    },
    
    /**
     * Inisialisasi Newsletter Form
     */
    initNewsletterForm: function() {
        const newsletterForm = document.getElementById('newsletterForm');
        
        if (!newsletterForm) return;
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Cegah form submit biasa
            
            // Ambil nilai semua field
            const nameInput = document.getElementById('nameNewsletter');
            const whatsappInput = document.getElementById('whatsappNewsletter');
            const emailInput = document.getElementById('emailNewsletter');
            
            const name = nameInput.value.trim();
            const whatsapp = whatsappInput.value.trim();
            const email = emailInput.value.trim();
            
            if (!name || !whatsapp || !email) {
                alert('Silakan lengkapi semua data');
                return;
            }
            
            // Proses berlangganan - bisa diganti dengan ajax call atau endpoint yang sesuai
            alert('Terima kasih! Data Anda berhasil didaftarkan.');
            nameInput.value = '';
            whatsappInput.value = '';
            emailInput.value = '';
        });
    },
    
    
    /**
     * Inisialisasi button WhatsApp pada kartu rumah
     */
    initWhatsAppButtons: function() {
        const whatsappButtons = document.querySelectorAll('.house-whatsapp-btn');
        
        if (whatsappButtons.length === 0) return;
        
        whatsappButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const productName = this.getAttribute('data-product');
                const message = `Halo, saya tertarik dengan ${productName}. Mohon informasi lebih lanjut.`;
                window.open(`https://wa.me/6285601081492?text=${encodeURIComponent(message)}`, '_blank');
            });
        });
    },
    
    /**
     * Handler untuk tombol Lihat Semua
     */
    initViewAllButtons: function() {
        const viewAllButtons = document.querySelectorAll('.view-all-button');
        
        if (viewAllButtons.length === 0) return;
        
        // Base path depending on whether we're on index or in pages/
        const basePath = window.location.pathname.includes('/pages/') ? '' : 'pages/';
        
        viewAllButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Determine target page based on button text
                let targetPage = '';
                if (this.textContent.includes('Rumah')) {
                    targetPage = `${basePath}house.html`;
                } else if (this.textContent.includes('Galeri')) {
                    targetPage = `${basePath}galeri.html`;
                } else if (this.textContent.includes('Properti')) {
                    targetPage = `${basePath}property.html`;
                }
                
                // Navigate to target page
                if (targetPage) {
                    window.location.href = targetPage;
                }
            });
        });
    },
    
    /**
     * Inisialisasi animasi saat scroll
     */
    initScrollAnimations: function() {
        // Initialize contact section animations
        this.initContactSectionAnimations();
        
        // Initialize footer animations
        this.initFooterAnimations();
        
        // Initialize project section animations
        this.initProjectsAnimations();
    },
    
    /**
     * Animasi untuk section contact
     */
    initContactSectionAnimations: function() {
        // Animate elements on scroll
        const profileContainer = document.querySelector('.profile-container');
        const contactInfoContainer = document.querySelector('.contact-info-container');
        const contactItems = document.querySelectorAll('.contact-item');
        
        if (!profileContainer && !contactInfoContainer) return;
        
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }
        
        // Function to add animation when elements come into view
        function checkVisibility() {
            if (profileContainer && isInViewport(profileContainer)) {
                profileContainer.classList.add('animate-in');
            }
            
            if (contactInfoContainer && isInViewport(contactInfoContainer)) {
                contactInfoContainer.classList.add('animate-in');
                
                // Animate contact items with delay
                contactItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, 150 * index);
                });
            }
        }
        
        // Add initial styles for animations
        if (profileContainer) {
            profileContainer.style.opacity = '0';
            profileContainer.style.transform = 'translateY(30px)';
            profileContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        if (contactInfoContainer) {
            contactInfoContainer.style.opacity = '0';
            contactInfoContainer.style.transform = 'translateY(30px)';
            contactInfoContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        contactItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Add CSS for the animate-in class if not already added
        if (!document.querySelector('style#animation-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'animation-styles';
            styleElement.textContent = `
                .animate-in {
                    opacity: 1 !important;
                    transform: translate(0, 0) !important;
                }
                .fade-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `;
            document.head.appendChild(styleElement);
        }
        
        // Check visibility on scroll and initial load
        window.addEventListener('scroll', checkVisibility);
        setTimeout(checkVisibility, 300); // Initial check with slight delay
    },
    
    /**
     * Animasi untuk footer
     */
    initFooterAnimations: function() {
        const footer = document.querySelector('.footer-section');
        const footerItems = document.querySelectorAll('.ft-links, .ft-contact, .ft-newsletter');
        
        if (!footer || footerItems.length === 0) return;
        
        // Check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
                rect.bottom >= 0
            );
        }
        
        // Add animation when elements come into view
        function checkFooterVisibility() {
            if (footer && isInViewport(footer)) {
                // Animate footer items with delay
                footerItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('fade-in');
                    }, 150 * index);
                });
                
                // Remove scroll listener once animated
                window.removeEventListener('scroll', checkFooterVisibility);
            }
        }
        
        // Add initial styles for animations
        footerItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Check if animation styles already exist
        if (!document.querySelector('style#animation-styles')) {
            const fadeInStyle = document.createElement('style');
            fadeInStyle.id = 'animation-styles';
            fadeInStyle.textContent = `
                .fade-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .animate-in {
                    opacity: 1 !important;
                    transform: translate(0, 0) !important;
                }
            `;
            document.head.appendChild(fadeInStyle);
        }
        
        // Listen for scroll to trigger animations
        window.addEventListener('scroll', checkFooterVisibility);
        
        // Initial check for visibility
        setTimeout(checkFooterVisibility, 300);
    },
    
    /**
     * Animasi untuk section proyek perumahan
     */
    initProjectsAnimations: function() {
        const projectCards = document.querySelectorAll('.project-card');
        
        if (projectCards.length === 0) return;
        
        // Animasi saat scroll
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }
        
        function checkVisibility() {
            projectCards.forEach(card => {
                if (isInViewport(card)) {
                    card.classList.add('fade-in');
                }
            });
        }
        
        // Tambahkan style untuk animasi
        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Tambahkan CSS untuk kelas fade-in jika belum ada
        if (!document.querySelector('style#animation-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'animation-styles';
            styleElement.textContent = `
                .fade-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .animate-in {
                    opacity: 1 !important;
                    transform: translate(0, 0) !important;
                }
            `;
            document.head.appendChild(styleElement);
        }
        
        // Event listener untuk scroll
        window.addEventListener('scroll', checkVisibility);
        setTimeout(checkVisibility, 300);
    },
    
    /**
     * Inisialisasi filter form
     */
    initFilterForm: function() {
        // Toggle filter form
        const toggleFilterBtn = document.querySelector('.toggle-filter-btn');
        const filterForm = document.querySelector('.filter-form');
        
        if (!toggleFilterBtn || !filterForm) return;
        
        toggleFilterBtn.addEventListener('click', function() {
            filterForm.classList.toggle('active');
            if (filterForm.classList.contains('active')) {
                filterForm.style.display = 'flex';
            } else {
                setTimeout(() => {
                    filterForm.style.display = 'none';
                }, 300); // Delay to allow animation to complete
            }
        });
    },
    
    /**
     * Initialize Property Filter (Property, House, Gallery pages)
     */
    initPropertyFilter: function(itemSelector, filterHandler) {
        // Get elements
        const filterBtn = document.querySelector('.filter-btn');
        const searchInput = document.getElementById('locationSearch');
        const searchBtn = document.querySelector('.search-btn');
        
        if (!filterBtn || !searchInput || !searchBtn) return;
        
        // Add event listeners
        filterBtn.addEventListener('click', filterHandler);
        
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            RumahBSD.applySearch(itemSelector, searchTerm);
            if (filterHandler) filterHandler();
        });
        
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim().toLowerCase();
                RumahBSD.applySearch(itemSelector, searchTerm);
                if (filterHandler) filterHandler();
            }
        });
    },
    
    /**
     * Apply search to items
     */
    applySearch: function(itemSelector, searchTerm) {
        const items = document.querySelectorAll(itemSelector);
        
        items.forEach(item => {
            const searchableText = item.textContent.toLowerCase();
            
            if (searchTerm === '' || searchableText.includes(searchTerm)) {
                item.classList.add('search-match');
            } else {
                item.classList.remove('search-match');
            }
        });
    },
    
    /**
     * Show/hide no results message
     */
    checkNoResults: function(itemSelector, containerSelector, message) {
        // Check if any items are visible after filtering
        const visibleItems = Array.from(document.querySelectorAll(itemSelector)).filter(
            item => item.style.display !== 'none'
        );
        
        const container = document.querySelector(containerSelector);
        let noResultsMsg = document.querySelector('.no-results-message');
        
        if (visibleItems.length === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results-message';
                noResultsMsg.innerHTML = `<p>${message || 'Tidak ada hasil yang sesuai dengan filter yang dipilih.'}</p>`;
                container.appendChild(noResultsMsg);
            }
            noResultsMsg.style.display = 'block';
        } else if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }
}
