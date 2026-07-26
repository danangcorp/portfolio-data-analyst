document.addEventListener('DOMContentLoaded', () => {

    // 1. NAVBAR SCROLL EFFECT
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. SMOOTH SCROLLING INTERNAL LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. SCROLL REVEAL ANIMATION
    const revealElements = document.querySelectorAll('.reveal-up');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger Counter
                const counters = entry.target.querySelectorAll('.counter');
                if (counters.length > 0) startCounters(counters);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. ANIMATED COUNTER
    let hasCounted = false;
    function startCounters(counters) {
        if (hasCounted) return;
        hasCounted = true;
        
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    if (target % 1 !== 0) {
                        counter.innerText = current.toFixed(2);
                    } else {
                        counter.innerText = Math.ceil(current);
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }

    // 5. COPY EMAIL FUNCTION
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = "danangaryasaputra21@gmail.com";
            
            navigator.clipboard.writeText(email).then(() => {
                const originalText = copyEmailBtn.innerHTML;
                
                copyEmailBtn.innerHTML = `<i data-feather="check"></i> Email Tersalin!`;
                copyEmailBtn.style.backgroundColor = '#10b981'; // Hijau Sukses
                copyEmailBtn.style.color = '#fff';
                
                feather.replace();
                
                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalText;
                    copyEmailBtn.style.backgroundColor = '';
                    copyEmailBtn.style.color = '';
                    feather.replace();
                }, 2500);
            }).catch(err => {
                console.error("Gagal menyalin: ", err);
            });
        });
    }
});