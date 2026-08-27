document.addEventListener('DOMContentLoaded', () => {

    // 1. RENDER IKON FEATHER
    feather.replace();

    // 2. EFEK NAVBAR SCROLL (GLASSMORPHISM)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. MENU MOBILE (HAMBURGER TOGGLE) - KUNCI UNTUK TAMPILAN HP
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const floatingNav = document.querySelector('.floating-nav');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            floatingNav.classList.toggle('active-mobile');
            
            // Ubah ikon menu jadi 'X' saat terbuka
            const isOpen = navLinks.classList.contains('active');
            mobileBtn.innerHTML = isOpen ? '<i data-feather="x"></i>' : '<i data-feather="menu"></i>';
            feather.replace();
        });
    }

    // Tutup menu mobile otomatis saat link diklik (Biar rapi di HP)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            floatingNav.classList.remove('active-mobile');
            mobileBtn.innerHTML = '<i data-feather="menu"></i>';
            feather.replace();
        });
    });

    // 4. SMOOTH SCROLLING INTERNAL LINKS
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

    // 5. ANIMASI MUNCUL SAAT DI-SCROLL (REVEAL UP)
    const revealElements = document.querySelectorAll('.reveal-up');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Aktifkan animasi angka (Counter) ketika elemen terlihat
                const counters = entry.target.querySelectorAll('.counter');
                if (counters.length > 0) startCounters(counters);

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // 6. ANIMASI ANGKA BERJALAN (COUNTER)
    let hasCounted = false;
    function startCounters(counters) {
        if (hasCounted) return;
        hasCounted = true;

        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 2000; // Durasi animasi 2 detik
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    if (target % 1 !== 0) {
                        counter.innerText = current.toFixed(2); // Untuk IPK (desimal)
                    } else {
                        counter.innerText = Math.ceil(current); // Untuk angka bulat
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    // Pastikan angka berhenti persis di target akhir
                    counter.innerText = target % 1 !== 0 ? target.toFixed(2) : target;
                }
            };
            updateCounter();
        });
    }

    // 7. TOMBOL COPY EMAIL EKSKLUSIF
    const copyEmailBtn = document.getElementById('copyEmailBtn');

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = "danangaryasaputra21@gmail.com";

            navigator.clipboard.writeText(email).then(() => {
                const originalText = copyEmailBtn.innerHTML;

                copyEmailBtn.innerHTML = `<i data-feather="check"></i> Email Tersalin!`;
                // Gaya Gen-Z untuk tombol sukses
                copyEmailBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)'; 
                copyEmailBtn.style.color = '#fff';
                copyEmailBtn.style.boxShadow = '0 12px 25px rgba(16, 185, 129, 0.3)';

                feather.replace();

                // Kembalikan ke tombol semula setelah 2.5 detik
                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalText;
                    copyEmailBtn.style.background = '';
                    copyEmailBtn.style.color = '';
                    copyEmailBtn.style.boxShadow = '';
                    feather.replace();
                }, 2500);
            }).catch(err => {
                console.error("Gagal menyalin: ", err);
            });
        });
    }
});
