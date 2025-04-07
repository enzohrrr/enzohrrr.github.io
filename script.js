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

    new Swiper('.visuals-swiper', {
        slidesPerView: 3,
        slidesPerGroup: 1,  // on force un défilement par slide
        spaceBetween: 0,
        centeredSlides: false,
        loop: false,
        allowTouchMove: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
    });

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


    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("imgModal");
    const closeBtn = document.querySelector(".close");

    const images = document.querySelectorAll('.projet-image-wrapper img, .swiper-slide img');

    images.forEach((img) => {
        img.addEventListener('click', () => {
            modal.classList.add("active");
            modalImg.src = img.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove("active");
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

});




