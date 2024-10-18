var images = document.getElementsByClassName('slide-img');

// 设置当前显示的图片索引
var currentIndex = 0;

// 定义一个函数来切换图片
function switchImage() {
    // 隐藏当前显示的图片
    images[currentIndex].style.display = 'none';

    // 计算下一张图片的索引
    currentIndex = (currentIndex + 1) % images.length;

    // 显示下一张图片
    images[currentIndex].style.display = 'block';
}
