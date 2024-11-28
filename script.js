document.addEventListener("DOMContentLoaded", () => {
    const prevButton = document.querySelector(".slider--btn__prev");
    const nextButton = document.querySelector(".slider--btn__next");
    const slides = document.querySelectorAll(".slide");
    const slideInfos = document.querySelectorAll(".slide-info");
    
    let currentIndex = 0;

    const updateSlides = () => {
        slides.forEach((slide, index) => {
            slide.setAttribute("data-current", false);
            slide.setAttribute("data-next", false);
            slide.setAttribute("data-previous", false);
        });

        slideInfos.forEach((info, index) => {
            info.setAttribute("data-current", false);
            info.setAttribute("data-next", false);
            info.setAttribute("data-previous", false);
        });

        slides[currentIndex].setAttribute("data-current", true);
        slideInfos[currentIndex].setAttribute("data-current", true);

        if (currentIndex + 1 < slides.length) {
            slides[currentIndex + 1].setAttribute("data-next", true);
            slideInfos[currentIndex + 1].setAttribute("data-next", true);
        } else {
            slides[0].setAttribute("data-next", true);
            slideInfos[0].setAttribute("data-next", true);
        }

        if (currentIndex - 1 >= 0) {
            slides[currentIndex - 1].setAttribute("data-previous", true);
            slideInfos[currentIndex - 1].setAttribute("data-previous", true);
        } else {
            slides[slides.length - 1].setAttribute("data-previous", true);
            slideInfos[slides.length - 1].setAttribute("data-previous", true);
        }
    };

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides();
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides();
    });

    updateSlides(); // Initial update
});
