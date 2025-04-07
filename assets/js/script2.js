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


    const leftElements = document.querySelectorAll('.animate-left');
    const rightElements = document.querySelectorAll('.animate-right');
    const centerElements = document.querySelectorAll('.animate-center');

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

    leftElements.forEach(el => observer.observe(el));
    rightElements.forEach(el => observer.observe(el));
    centerElements.forEach(el => observer.observe(el));

});