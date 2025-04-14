document.addEventListener('DOMContentLoaded', () => {
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

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const bars = menuToggle.querySelectorAll('.bar');
        bars[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : '';
        bars[1].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg)' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
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
        e.preventDefault();
        
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
    });
});