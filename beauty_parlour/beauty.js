// ================= Back button =================
const backLink = document.querySelector('.nav__back');
if (backLink) {
    backLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    });
}

// // ================= Gallery Lightbox =================
// const lightbox = document.getElementById('lightbox');
// const lightboxFrame = document.getElementById('lightboxFrame');
// const lightboxCaption = document.getElementById('lightboxCaption');
// const lightboxClose = document.getElementById('lightboxClose');
// const galleryItems = document.querySelectorAll('.gallery-item');

// function openLightbox(caption, frameClass) {
//     lightboxCaption.textContent = caption;
//     lightboxFrame.className = 'lightbox__frame';
//     if (frameClass) lightboxFrame.classList.add(frameClass);
//     lightbox.classList.add('is-open');
//     lightbox.setAttribute('aria-hidden', 'false');
//     lightboxClose.focus();
//     document.body.style.overflow = 'hidden';
// }

// function closeLightbox() {
//     lightbox.classList.remove('is-open');
//     lightbox.setAttribute('aria-hidden', 'true');
//     document.body.style.overflow = '';
// }

// galleryItems.forEach((item) => {
//     item.addEventListener('click', () => {
//         const caption = item.getAttribute('data-caption') || '';
//         const frameEl = item.querySelector('.gallery-item__frame');
//         const frameClass = Array.from(frameEl.classList).find((c) => c.includes('--'));
//         openLightbox(caption, frameClass);
//     });
// });

// if (lightboxClose) {
//     lightboxClose.addEventListener('click', closeLightbox);
// }

// if (lightbox) {
//     lightbox.addEventListener('click', (e) => {
//         if (e.target === lightbox) closeLightbox();
//     });
// }

// document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
//         closeLightbox();
//     }
// });

// ================= Demo video play =================
const playDemo = document.getElementById('playDemo');
if (playDemo) {
    playDemo.addEventListener('click', () => {
        playDemo.closest('.video-frame').querySelector('.video-frame__label').textContent =
            'Playing… (hook up your real video source here)';
    });
}

// ================= Scroll reveal =================
const revealTargets = document.querySelectorAll(
    '.feature-card, .stack-card, .gallery-item, .challenge-item, .learned-list li'
);

if ('IntersectionObserver' in window) {
    revealTargets.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(14px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealTargets.forEach((el) => observer.observe(el));
}