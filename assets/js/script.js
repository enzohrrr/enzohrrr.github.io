function downloadCV() {
    const pdfURL = 'assets/documents/cv.pdf';
    const link = document.createElement('a');
    link.href = pdfURL;
    link.download = 'Enzo_Herrera_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


document.addEventListener("DOMContentLoaded", function() {
    const tabLinks = document.querySelectorAll(".tab-links");
    const tabContents = document.querySelectorAll(".tab-content");
    if (tabLinks.length > 0 && tabContents.length > 0) {
        tabLinks.forEach(link => {
            link.addEventListener("click", () => {
                tabLinks.forEach(link => link.classList.remove("active-link"));
                tabContents.forEach(content => content.classList.remove("active-tab"));
                link.classList.add("active-link");
                const targetTab = document.getElementById(link.dataset.tab);
                if (targetTab) {
                    targetTab.classList.add("active-tab");
                }
            });
        });
    }

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('header ul');
    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('toggle');
            nav.classList.toggle('active');
        });
    }

    if (document.querySelector('.latest-project-swiper')) {
        new Swiper('.latest-project-swiper', {
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            effect: "coverflow",
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 300,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            }
        });
    }

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwexGcJu806_9yVrOyvwmpQffNMZ2zhe2RrjGExwZ7Y-Kj1t8HlMX7S51_O0rs8O8O_fw/exec';
    const form = document.forms['submit-to-google-sheet'];
    const formMessage = document.querySelector(".form-message");



    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const formData = new FormData(form);
            const stringifiedData = {};
            formData.forEach((value, key) => {
                stringifiedData[key] = value.toString();
            });

            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors', // La réponse sera opaque, mais cela permet de contourner les problèmes CORS
                body: new URLSearchParams(stringifiedData)
            })
                .then(response => {
                    if (formMessage) {
                        formMessage.textContent = "Message sent successfully";
                        formMessage.classList.add("show");
                        setTimeout(() => {
                            formMessage.classList.remove("show");
                        }, 5000);
                    }
                    form.reset();
                })
                .catch(error => console.error('Error!', error.message));
        });
    }

    function showToast(message, duration = 5000) {
        const toast = document.querySelector('.form-message');
        if (!toast) return;

        toast.textContent = message;
        toast.style.display = "block";

        requestAnimationFrame(() => {
            toast.classList.add("visible");
        });

        setTimeout(() => {
            toast.classList.remove("visible");
            setTimeout(() => {
                toast.style.display = "none";
            }, 300);
        }, duration);
    }

    const animatedElements = document.querySelectorAll('.animate-entry');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        animatedElements.forEach(el => observer.observe(el));
    }
});
