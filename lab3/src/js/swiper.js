document.addEventListener('DOMContentLoaded', function() {
    if (typeof Swiper === 'undefined') {
        return;
    }

    new Swiper('.works-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 50,
        centeredSlides: false,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1200: {
                slidesPerView: 3,
                spaceBetween: 60,
            }
        }
    });
});