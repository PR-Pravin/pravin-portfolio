/* ================================================
   PRAVIN P R — PORTFOLIO SCRIPT
   Handles: navbar, smooth scroll, reveal, modals,
            back-to-top, mobile menu
================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── NAVBAR SCROLL EFFECT ─── */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        updateActiveNav();
        toggleBackTop();
    });

    /* ─── MOBILE MENU TOGGLE ─── */
    const toggle = document.getElementById('navToggle');
    const menu   = document.getElementById('navMenu');
    toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
    });
    // Close menu on link click
    menu.querySelectorAll('.nav-lnk').forEach(link => {
        link.addEventListener('click', () => menu.classList.remove('open'));
    });

    /* ─── SMOOTH SCROLL ─── */
    document.querySelectorAll('a[href^="#"], button[data-target]').forEach(el => {
        el.addEventListener('click', e => {
            const href = el.getAttribute('href') || el.dataset.target;
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
            }
        });
    });

    /* ─── ACTIVE NAV LINK ─── */
    function updateActiveNav() {
        const pos = window.scrollY + 80;
        document.querySelectorAll('section[id]').forEach(sec => {
            const top = sec.offsetTop;
            const bot = top + sec.offsetHeight;
            const id  = sec.getAttribute('id');
            if (pos >= top && pos < bot) {
                document.querySelectorAll('.nav-lnk').forEach(l => {
                    l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
                });
            }
        });
    }

    /* ─── BACK TO TOP ─── */
    const backTop = document.getElementById('backTop');
    function toggleBackTop() {
        backTop.classList.toggle('active', window.scrollY > 320);
    }
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ─── SCROLL REVEAL ─── */
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // stagger siblings in same parent
                setTimeout(() => entry.target.classList.add('visible'), i * 75);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    /* ─── MODAL SYSTEM ─── */
    // Open
    document.querySelectorAll('[data-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.modal;
            const overlay = document.getElementById(id);
            if (overlay) {
                overlay.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close via close button
    document.querySelectorAll('.m-close, .btn-mclose').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal-overlay').classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Close on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', e => {
            if (e.target === overlay) {
                overlay.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.open').forEach(o => {
                o.classList.remove('open');
                document.body.style.overflow = '';
            });
        }
    });

    /* ─── RESUME DOWNLOAD CHECK ─── */
    const dlBtn = document.querySelector('.btn-dl');
    if (dlBtn) {
        dlBtn.addEventListener('click', e => {
            fetch(dlBtn.getAttribute('href'))
                .then(res => {
                    if (!res.ok) {
                        e.preventDefault();
                        alert('Resume file not found. Please place "Pravin_PR_Resume.pdf" inside the images/ folder.');
                    }
                })
                .catch(() => {
                    // allow download attempt regardless
                });
        });
    }

});
