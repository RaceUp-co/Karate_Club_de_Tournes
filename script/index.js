// ========================================
// VARIABLES GLOBALES
// ========================================

let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const scrollTopButton = document.getElementById('scrollTop');
const navLinks = document.querySelectorAll('.nav-link');

// ========================================
// NAVIGATION - SCROLL EFFECT
// ========================================

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Ajouter classe 'scrolled' à la navbar
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Afficher/masquer le bouton scroll to top
    if (scrollTop > 500) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
    
    lastScrollTop = scrollTop;
});

// ========================================
// MENU MOBILE
// ========================================

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Fermer le menu mobile lors du clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================

const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ========================================
// SCROLL TO TOP
// ========================================

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// SMOOTH SCROLL POUR LES ANCRES
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignorer les liens vides
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Compensation pour la navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ANIMATIONS AU SCROLL (AOS-like)
// ========================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            // Optionnel: arrêter d'observer après l'animation
            // animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer tous les éléments avec data-aos
document.querySelectorAll('[data-aos]').forEach(element => {
    animateOnScroll.observe(element);
});

// ========================================
// COUNTER ANIMATION (Statistiques)
// ========================================

function animateCounter(element, start, end, duration) {
    let startTime = null;
    
    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '+';
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            element.textContent = end + '+';
        }
    }
    
    requestAnimationFrame(animation);
}

// Observer pour les compteurs
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            animateCounter(entry.target, 0, target, 2000);
            entry.target.classList.add('counted');
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// ========================================
// FORMULAIRE DE CONTACT
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Animation du bouton
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Envoi en cours...';
        submitButton.disabled = true;
        
        // Simulation d'envoi (remplacer par votre logique d'envoi réelle)
        setTimeout(() => {
            // Succès
            submitButton.textContent = '✓ Message envoyé !';
            submitButton.style.background = '#28a745';
            
            // Réinitialiser le formulaire
            contactForm.reset();
            
            // Message de confirmation
            showNotification('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.', 'success');
            
            // Restaurer le bouton après 3 secondes
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
        }, 1500);
        
        console.log('Données du formulaire:', formData);
    });
}

// ========================================
// FORMULAIRE NEWSLETTER
// ========================================

const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Animation
        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = '✓ Inscrit !';
        button.disabled = true;
        
        showNotification(`Merci de votre inscription ! Vous recevrez nos actualités à ${email}`, 'success');
        
        newsletterForm.reset();
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 3000);
    });
}

// ========================================
// SYSTÈME DE NOTIFICATION
// ========================================

function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles inline pour la notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8',
        color: 'white',
        padding: '20px 25px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        zIndex: '10000',
        maxWidth: '400px',
        animation: 'slideIn 0.4s ease-out',
        fontWeight: '500'
    });
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Retirer après 5 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 400);
    }, 5000);
}

// Ajouter les keyframes pour les animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// GALERIE - LIGHTBOX (Optionnel)
// ========================================

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = createLightbox(img.src, img.alt);
        document.body.appendChild(lightbox);
    });
});

function createLightbox(imageSrc, imageAlt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    Object.assign(lightbox.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10000',
        cursor: 'pointer',
        animation: 'fadeIn 0.3s ease-out'
    });
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt;
    
    Object.assign(img.style, {
        maxWidth: '90%',
        maxHeight: '90%',
        objectFit: 'contain',
        borderRadius: '8px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
    });
    
    lightbox.appendChild(img);
    
    // Fermer en cliquant
    lightbox.addEventListener('click', () => {
        lightbox.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    });
    
    // Fermer avec Échap
    const closeOnEscape = (e) => {
        if (e.key === 'Escape') {
            lightbox.click();
            document.removeEventListener('keydown', closeOnEscape);
        }
    };
    document.addEventListener('keydown', closeOnEscape);
    
    return lightbox;
}

// ========================================
// PRELOADER (Optionnel)
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========================================
// PARALLAX EFFECT (Hero & CTA)
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero::before');
    
    // Parallax subtil sur le hero
    if (window.innerWidth > 768) {
        const parallaxElements = document.querySelectorAll('.hero, .cta');
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.backgroundPosition = `center ${yPos}px`;
        });
    }
});

// ========================================
// LAZY LOADING IMAGES (Performance)
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c🥋 Karaté Club de Tournes', 'font-size: 20px; font-weight: bold; color: #c41e3a;');
console.log('%cBienvenue sur notre site ! Rejoignez-nous pour découvrir l\'art du karaté.', 'font-size: 14px; color: #d4af37;');

// ========================================
// PROTECTION DU CODE (Optionnel)
// ========================================

// Désactiver le clic droit (optionnel et à utiliser avec prudence)
// document.addEventListener('contextmenu', (e) => e.preventDefault());

// ========================================
// EASTER EGG - Konami Code (Fun!)
// ========================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Animation spéciale
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    const easterEggStyle = document.createElement('style');
    easterEggStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(easterEggStyle);
    
    showNotification('🥋 Vous avez trouvé le secret du maître ! 🥋', 'success');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 4000);
}

// ========================================
// PERFORMANCES - Debounce pour scroll
// ========================================

function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Appliquer le debounce aux événements de scroll intensifs
window.addEventListener('scroll', debounce(activateNavLink, 10));

// ========================================
// INITIALISATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ Site chargé et prêt');
    
    // Ajouter une classe pour indiquer que JS est actif
    document.documentElement.classList.add('js-enabled');
    
    // Animation d'entrée
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});