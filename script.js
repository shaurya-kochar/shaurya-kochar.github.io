// User Interaction Tracking System
document.addEventListener('DOMContentLoaded', () => {
    // Original script content
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const sections = document.querySelectorAll('section');
    const skillCards = document.querySelectorAll('.skill-card');
    const aboutCards = document.querySelectorAll('.about-card');
    const projectCards = document.querySelectorAll('.project-card');
    const popupOverlay = document.getElementById('popup-overlay');
    const popups = document.querySelectorAll('.popup');
    const popupTriggers = document.querySelectorAll('[data-popup]');
    const closeButtons = document.querySelectorAll('.close-popup');
    const contactForm = document.getElementById('contact-form');
    const typingText = document.getElementById('typing-text');

    // Tracking Configuration
    const trackingConfig = {
        enabled: true,
        logToConsole: true
    };

    // Helper function to get element description
    function getElementDescription(element) {
        // Try to identify the element by various attributes
        if (element.id) {
            return `${element.tagName.toLowerCase()}#${element.id}`;
        } else if (element.className && typeof element.className === 'string' && element.className.trim() !== '') {
            return `${element.tagName.toLowerCase()}.${element.className.split(' ')[0]}`;
        } else if (element.tagName === 'A') {
            return `link: ${element.textContent.trim() || element.href}`;
        } else if (element.tagName === 'IMG') {
            return `image: ${element.alt || element.src.split('/').pop()}`;
        } else if (element.tagName === 'BUTTON') {
            return `button: ${element.textContent.trim()}`;
        } else if (element.tagName === 'INPUT') {
            return `input: ${element.type} (${element.id || element.name || 'unnamed'})`;
        } else if (element.textContent && element.textContent.trim() !== '') {
            const text = element.textContent.trim();
            return `${element.tagName.toLowerCase()}: ${text.substring(0, 20)}${text.length > 20 ? '...' : ''}`;
        } else {
            return element.tagName.toLowerCase();
        }
    }

    // Track page view on load
    function trackPageView() {
        if (!trackingConfig.enabled) return;
        
        const timestamp = new Date().toISOString();
        const eventType = "view";
        const eventObject = "page";
        const url = window.location.href;
        
        const logMessage = `${timestamp}, ${eventType}, ${eventObject}, URL: ${url}`;
        
        if (trackingConfig.logToConsole) {
            console.log(logMessage);
        }
    }

    // Track element views using Intersection Observer
    function setupViewTracking() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is now visible
                    const timestamp = new Date().toISOString();
                    const eventType = "view";
                    const element = entry.target;
                    const elementType = getElementDescription(element);
                    
                    const logMessage = `${timestamp}, ${eventType}, ${elementType}`;
                    
                    if (trackingConfig.logToConsole) {
                        console.log(logMessage);
                    }
                    
                    // Unobserve the element after tracking it once
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.5 // Element is considered visible when 50% is in the viewport
        });
        
        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
        
        // Observe images
        document.querySelectorAll('img').forEach(img => {
            observer.observe(img);
        });
        
        // Observe profile content
        document.querySelectorAll('.hero-text p, .about-card, .education-card, .skill-card, .project-card').forEach(element => {
            observer.observe(element);
        });
    }
    function setupTextAnalyzerTracking() {
        // Track text analyzer usage if on that page
        const analyzeBtn = document.getElementById('analyze-btn');
        
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', function() {
                if (!trackingConfig.enabled) return;
                
                const timestamp = new Date().toISOString();
                const eventType = "interaction";
                const elementType = "text_analyzer_analyze";
                
                const textInput = document.getElementById('text-input');
                const textLength = textInput.value.length;
                
                const logMessage = `${timestamp}, ${eventType}, ${elementType}, length:${textLength}`;
                
                if (trackingConfig.logToConsole) {
                    console.log(logMessage);
                }
            });
        }
    }

    // Track clicks
    function trackClicks() {
        document.addEventListener('click', (event) => {
            if (!trackingConfig.enabled) return;
            
            const timestamp = new Date().toISOString();
            const eventType = "click";
            const element = event.target;
            const elementType = getElementDescription(element);
            
            const logMessage = `${timestamp}, ${eventType}, ${elementType}`;
            
            if (trackingConfig.logToConsole) {
                console.log(logMessage);
            }
        }, true); // Use capturing phase to catch all clicks
    }

    // Initialize tracking
    function initTracking() {
        trackPageView();
        setupViewTracking();
        trackClicks();
        setupTextAnalyzerTracking();
        
        // Track CV download
        const cvLink = document.querySelector('a[href="cv/resume.pdf"]');
        if (cvLink) {
            cvLink.addEventListener('click', function() {
                const timestamp = new Date().toISOString();
                console.log(`${timestamp}, click, CV download`);
            });
        }
        
        // Special tracking for form submissions
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                const timestamp = new Date().toISOString();
                console.log(`${timestamp}, submit, contact form submitted`);
            });
        }
    }

    // Menu toggle event
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const bars = menuToggle.querySelectorAll('.bar');
        bars[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : '';
        bars[1].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg)' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.classList.remove('active');
            const bars = menuToggle.querySelectorAll('.bar');
            bars[0].style.transform = '';
            bars[1].style.transform = '';
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        window.scrollTo({
            top: aboutSection.offsetTop - 70,
            behavior: 'smooth'
        });
    });

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }

    function checkVisibility() {
        const triggerPosition = window.innerHeight * 0.85;
        
        skillCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerPosition) {
                card.classList.add('visible');
                const progressBar = card.querySelector('.skill-progress');
                const percent = card.getAttribute('data-percent');
                progressBar.style.width = `${percent}%`;
            }
        });
        
        aboutCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerPosition) {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 150);
            }
        });
        
        projectCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerPosition) {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 200);
            }
        });
    }

    popupTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const popupId = `${trigger.getAttribute('data-popup')}-popup`;
            const popup = document.getElementById(popupId);
            
            popupOverlay.style.display = 'block';
            popup.style.display = 'block';
            
            setTimeout(() => {
                popupOverlay.style.opacity = '1';
                popup.style.opacity = '1';
                popup.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 10);
        });
    });

    function closePopup() {
        popups.forEach(popup => {
            popup.style.opacity = '0';
            popup.style.transform = 'translate(-50%, -50%) scale(0.9)';
        });
        
        popupOverlay.style.opacity = '0';
        
        setTimeout(() => {
            popups.forEach(popup => popup.style.display = 'none');
            popupOverlay.style.display = 'none';
        }, 300);
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', closePopup);
    });

    popupOverlay.addEventListener('click', closePopup);

    contactForm.addEventListener('submit', function(e) {
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        alert(`Thank you ${nameInput.value}! Your message has been received.`);
        
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
    });

    function typeText() {
        const text = "Shaurya Kochar";
        let i = 0;
        typingText.textContent = "";
        
        const typing = setInterval(() => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 100);
    }

    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        checkVisibility();
    });

    window.addEventListener('load', () => {
        updateActiveNavLink();
        checkVisibility();
        typeText();
        initTracking();
    });
});