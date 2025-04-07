function downloadCV() {
    const pdfURL = 'assets/cv/cv.pdf';
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

    tabLinks.forEach(link => {
        link.addEventListener("click", () => {
            tabLinks.forEach(link => link.classList.remove("active-link"));
            tabContents.forEach(content => content.classList.remove("active-tab"));
            link.classList.add("active-link");
            const targetTab = document.getElementById(link.dataset.tab);
            targetTab.classList.add("active-tab");
        });
    });

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('header ul');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('toggle');
            nav.classList.toggle('active');
        });
    }



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






    const scriptURL = 'https://script.google.com/macros/s/AKfycbw9snAZCC2i6NPF9jKmPthGXfVQPBKp_80sPc3Yh4AKWxYGFKZbQZw_EYZ_WGSOw-kkHg/exec';
    const form = document.forms['submit-to-google-sheet'];
    const formMessage = document.getElementById("formMessage");

    form.addEventListener('submit', e => {
        e.preventDefault();

        const formData = new FormData(form);
        const stringifiedData = {};
        formData.forEach((value, key) => {
            stringifiedData[key] = value.toString();
        });

        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: new URLSearchParams(stringifiedData)
        })
            .then(response => {
                if(formMessage) {
                    formMessage.textContent = "Message sent successfully";
                    setTimeout(() => {
                        formMessage.textContent = "";
                    }, 5000);
                } else {
                    alert("Message sent successfully");
                }
                form.reset();
            })
            .catch(error => console.error('Error!', error.message));
    });


    const animatedElements = document.querySelectorAll('.animate-entry');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // L'animation se déclenche quand 20% de l'élément est visible
    });

    animatedElements.forEach(el => observer.observe(el));

});




