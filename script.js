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
    if (burger) {
        burger.addEventListener('click', () => {
            document.querySelector('header ul').classList.toggle('active');
        });
    }

    var swiper = new Swiper(".swiper-container", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 350,
            modifier: 1,
            slideShadows: true
        },
        pagination: {
            el: ".swiper-pagination"
        },
    });
});




