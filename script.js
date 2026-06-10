/* ==========================================================================
   1. Global DOM Content Loaded Initialization
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Animations on Scroll (AOS Library)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            mirror: false
        });
    }
    
    /* ==========================================================================
       2. Typing Text Animation Effect
       ========================================================================== */
    const phrases = ["AI/ML Enthusiast", "Software Developer", "Aspiring AI Engineer"];
    let phraseIdx = 0;
    let letterIdx = 0;
    let currentPhrase = "";
    let isDeleting = false;
    
    const typingDelay = 150;
    const erasingDelay = 70;
    const nextPhraseDelay = 2000; 
    
    const typingSpan = document.querySelector(".typing");

    function typeEffect() {
        if (phraseIdx >= phrases.length) phraseIdx = 0;
        currentPhrase = phrases[phraseIdx];

        if (isDeleting) {
            currentPhrase = phrases[phraseIdx].substring(0, letterIdx - 1);
            letterIdx--;
        } else {
            currentPhrase = phrases[phraseIdx].substring(0, letterIdx + 1);
            letterIdx++;
        }

        if (typingSpan) {
            typingSpan.textContent = currentPhrase;
        }

        let dynamicDelay = isDeleting ? erasingDelay : typingDelay;

        if (!isDeleting && letterIdx === phrases[phraseIdx].length) {
            dynamicDelay = nextPhraseDelay;
            isDeleting = true;
        } else if (isDeleting && letterIdx === 0) {
            isDeleting = false;
            phraseIdx++;
            dynamicDelay = 500;
        }

        setTimeout(typeEffect, dynamicDelay);
    }

    if (typingSpan) {
        setTimeout(typeEffect, 1000);
    }

    /* ==========================================================================
       3. Optional Mobile Menu Toggle
       ========================================================================== */
    const menuIcon = document.querySelector('#menu-icon'); 
    const navbar = document.querySelector('nav');          

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('bx-x');             
            navbar.classList.toggle('open');               
        });
    }

    /* ==========================================================================
       4. New Interactive Certificate Modal Logic
       ========================================================================== */
    const certCards = document.querySelectorAll('.achievement-card');
    const certModal = document.getElementById('certModal');
    const certModalClose = document.querySelector('.cert-modal-close');
    const modalCertImg = document.getElementById('modalCertImg');

    if (certCards.length && certModal && certModalClose && modalCertImg) {
        
        certCards.forEach(card => {
            card.addEventListener('click', () => {
                const targetImgSrc = card.getAttribute('data-src');
                if (!targetImgSrc) return;

                // Load source path into the modal display viewport
                modalCertImg.src = targetImgSrc;

                // Open modal display bounds cleanly
                certModal.classList.add('show');
                document.body.style.overflow = 'hidden'; 
            });
        });

        const closeCertificateModal = () => {
            certModal.classList.remove('show');
            document.body.style.overflow = ''; 
            setTimeout(() => { modalCertImg.src = ''; }, 300); // Clear image asset link post-transition delay
        };

        certModalClose.addEventListener('click', closeCertificateModal);

        // Fallback interface close execution when picking outside visual alignment borders
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                closeCertificateModal();
            }
        });
    }

    /* ==========================================================================
       5. Project Video Modal Script Implementation (IMAGE CLICK ONLY)
       ========================================================================== */
    const projectCards = document.querySelectorAll('.project-card');
    const videoModal = document.getElementById('videoModal');
    const modalClose = document.querySelector('.video-modal-close');
    const playerContainer = document.getElementById('videoPlayerContainer');

    if (projectCards.length && videoModal && modalClose && playerContainer) {
        
        projectCards.forEach(card => {
            // Target the image container area directly
            const imageContainer = card.querySelector('.project-img-holder');

            if (imageContainer) {
                imageContainer.addEventListener('click', (e) => {
                    // Prevent standard card click bubbling bubbles
                    e.stopPropagation();

                    const videoUrl = card.getAttribute('data-video');
                    if (!videoUrl) return;

                    if (videoUrl.includes('youtube.com') || videoUrl.includes('embed')) {
                        playerContainer.innerHTML = `<iframe src="${videoUrl}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
                    } else {
                        playerContainer.innerHTML = `<video src="${videoUrl}" controls autoplay></video>`;
                    }

                    videoModal.classList.add('show');
                    document.body.style.overflow = 'hidden'; 
                });
            }
        });

        const closeModal = () => {
            videoModal.classList.remove('show');
            playerContainer.innerHTML = ''; 
            document.body.style.overflow = ''; 
        };

        modalClose.addEventListener('click', closeModal);
        
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeModal();
            }
        });
    }
});

/* ==========================================================================
   6. Scroll Spy: Update Active Link Highlight Status on Scroll (.swot-section attached)
   ========================================================================== */
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, .home-section, .about-section, .skills-section, .edu-exp-section, .projects-section, .achievements-section, .swot-section, .contact-section');
    const navLinks = document.querySelectorAll('header nav a');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
            const id = section.getAttribute('id');
            if (id) {
                currentSectionId = id;
            }
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const hrefAttr = link.getAttribute('href');
        
        if (hrefAttr && hrefAttr.includes(currentSectionId) && currentSectionId !== '') {
            link.classList.add('active');
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const industrialCards = document.querySelectorAll(".exposure-card");

    // Configuration parameters for the scroll visibility checking windows
    const observerOptions = {
        root: null, // Monitored targeting falls back directly on viewport
        threshold: 0.12, // Triggers card entry once 12% is revealed inside workspace boundary
        rootMargin: "0px 0px -30px 0px"
    };

    const exposureObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Generates a soft staggered cascade timing layout structure
                setTimeout(() => {
                    entry.target.classList.add("pop-visible");
                }, index * 100); 
                
                // Unregister individual element observations once visual activation complete
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Register active observer parameters across all elements matching class target references
    industrialCards.forEach(card => {
        exposureObserver.observe(card);
    });
});