let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slideButtons = document.querySelectorAll('.slideshow-nav-button');
const totalSlides = slides.length;

function showSlide(n) {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === n) {
            slide.classList.add('active');
            slideButtons.forEach(button => {
                button.classList.remove('active');
                if (button.dataset.slide === n) {
                    button.classList.add('active');
                }
            });
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

slideButtons.forEach(button => {
    button.addEventListener('click', function () {
        const targetSlide = parseInt(this.dataset.slide, 10);
        if (!isNaN(targetSlide)) {
            showSlide(targetSlide);
        }
    });
});

// 自动播放  
setInterval(nextSlide, 3000); // 每3秒切换到下一张  

// 添加前进和后退按钮（如果需要的话）
// document.querySelector('#next-btn').addEventListener('