document.addEventListener("DOMContentLoaded", function() {

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('header ul');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('toggle');
            nav.classList.toggle('active');
        });
    }

    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("imgModal");
    const closeBtn = document.querySelector(".close");

    const images = document.querySelectorAll('.projet-image-wrapper img, .swiper-slide img');


    new Swiper('.visuals-swiper', {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 0,
        centeredSlides: false,
        loop: false,
        allowTouchMove: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
    });

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