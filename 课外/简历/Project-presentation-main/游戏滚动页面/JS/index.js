document.addEventListener("DOMContentLoaded", function () {
  // 获取下拉菜单按钮、内容及菜单项
  const dropbtn = document.querySelector(".dropbtn");
  const dropdownContent = document.querySelector(".dropdown-content");
  const menuItems = document.querySelectorAll(".promokit-fullpage-menu__item");
  const pageLinks = document.querySelectorAll(".promokit-fullpage-menu__link");
  const pages = document.querySelectorAll(".page");
  // 页面加载时自动播放视频
  const video = document.getElementById("introVideo");
  // 页面2,3,4
  const videoContainer2_fade = document.getElementById("videoContainer2_fade");
  const videoBoxes2 = document.querySelectorAll(".video-box2");
  const prevButton2 = document.getElementById("prevButton2");
  const nextButton2 = document.getElementById("nextButton2");
  const expandButton2 = document.getElementById("expandButton2");
  const closeButton2 = document.getElementById("closeButton2");
  const videoBackground2 = document.getElementById("videoBackground2");
  const videoContainer2 = document.getElementById("videoContainer2");
  const videoContainer3_fade = document.getElementById("videoContainer3_fade");
  const videoBoxes3 = document.querySelectorAll(".video-box3");
  const prevButton3 = document.getElementById("prevButton3");
  const nextButton3 = document.getElementById("nextButton3");
  const expandButton3 = document.getElementById("expandButton3");
  const closeButton3 = document.getElementById("closeButton3");
  const videoBackground3 = document.getElementById("videoBackground3");
  const videoContainer3 = document.getElementById("videoContainer3");
  const videoContainer4_fade = document.getElementById("videoContainer4_fade");
  const videoBoxes4 = document.querySelectorAll(".video-box4");
  const prevButton4 = document.getElementById("prevButton4");
  const nextButton4 = document.getElementById("nextButton4");
  const expandButton4 = document.getElementById("expandButton4");
  const closeButton4 = document.getElementById("closeButton4");
  const videoBackground4 = document.getElementById("videoBackground4");
  const videoContainer4 = document.getElementById("videoContainer4");
  const page4Map = document.getElementById("page4-map");
  // 按钮元素;
  const removeButton = document.getElementById("removeButton");
  let currentIndex2 = 0;
  let currentIndex3 = 0;
  let currentIndex4 = 0;
  let pageIndex = 0; // 当前页码

  // 显示按钮
  removeButton.style.display = "block";

  // 移除视频的循环播放属性，确保视频只播放一次
  video.removeAttribute("loop");
  video.play();

  // 添加按钮点击事件监听器
  removeButton.addEventListener("click", function () {
    video.pause();
    video.remove();
    removeButton.remove();
    updatePageDisplay();
  });

  // 视频播放结束时移除视频元素和按钮，并更新页面显示
  video.addEventListener("ended", function () {
    video.remove();
    removeButton.remove();
    updatePageDisplay();
  });

  // 初始化页面显示，只显示第一页
  function initializePages() {
    pages.forEach((page, i) => {
      page.style.display = i === pageIndex ? "block" : "none";
    });
    updateActiveMenuItem(menuItems[pageIndex]);
  }

  initializePages();

  // 控制滚动状态
  let isScrolling = false;

  // 更新页面显示状态
  function updatePageDisplay() {
    pages.forEach((page, i) => {
      page.style.display = i === pageIndex ? "block" : "none";
      page.classList.toggle("active", i === pageIndex);
      page.classList.toggle("hidden", i !== pageIndex);
    });
    updateActiveMenuItem(menuItems[pageIndex]);
  }

  // 滚动事件监听，实现翻页功能
  document.addEventListener("wheel", function (e) {
    if (!isScrolling) {
      // 检查是否正在滚动
      isScrolling = true; // 设置为正在滚动状态
      e.deltaY > 0 ? pageDown() : pageTop(); // 调整翻页方向

      // 设置超时以恢复滚动状态
      setTimeout(() => {
        isScrolling = false;
      }, 500); // 500毫秒的间隔
    }
  });

  let startY,
    endY,
    dis = 0;

  // 触摸开始时记录起始位置
  document.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    startY = touch.pageY;
  });

  // 触摸移动时记录结束位置并计算滑动距离
  document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    endY = touch.pageY;
    dis = startY - endY;
  });

  // 触摸结束时根据滑动距离决定翻页方向
  document.addEventListener("touchend", (e) => {
    if (Math.abs(dis) > 100 && !isScrolling) {
      isScrolling = true; // 设置为正在滚动状态
      dis > 0 ? pageDown() : pageTop(); // 调整翻页方向

      setTimeout(() => {
        isScrolling = false; // 1秒后恢复滚动状态
      }, 1000);
    }
    resetTouchVars();
  });

  // 重置触摸变量
  function resetTouchVars() {
    startY = 0;
    endY = 0;
    dis = 0;
  }

  // 向下翻页
  function pageDown() {
    if (pageIndex < pages.length - 1) {
      pages[pageIndex].classList.add("out-top");
      pageIndex++;
      updatePageDisplay();
      pages[pageIndex].classList.add("in-top");
    }
  }

  // 向上翻页
  function pageTop() {
    if (pageIndex > 0) {
      pages[pageIndex].classList.add("out-down");
      pageIndex--;
      updatePageDisplay();
      pages[pageIndex].classList.add("in-down");
    }
  }
  // 为链接添加点击事件，根据目标ID更新页面显示和菜单激活状态
  pageLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (!targetElement) {
        console.error(`Target element with ID "${targetId}" not found.`);
        return;
      }

      pageIndex = Array.from(pages).findIndex((page) => page.id === targetId);
      updatePageDisplay();
      updateActiveMenuItem(this);
    });
  });

  updatePageDisplay();

  // 初始化下拉菜单功能
  dropbtn.addEventListener("click", () =>
    toggleDropdownContent(dropdownContent)
  );
  dropbtn.addEventListener("touchstart", () =>
    toggleDropdownContent(dropdownContent)
  );

  // 切换下拉菜单显示状态
  function toggleDropdownContent(content) {
    content.style.display =
      content.style.display === "block" || content.style.display === "flex"
        ? "none"
        : "flex";
  }

  // 点击文档其他地方隐藏下拉菜单
  window.addEventListener("click", (event) => {
    if (
      !event.target.matches(".dropbtn") &&
      !event.target.closest(".dropdown-content")
    ) {
      dropdownContent.style.display = "none";
    }
  });

  // 为菜单项添加点击事件，更新激活状态并滚动到对应页面
  menuItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault(); // 防止默认行为
      const sectionId = this.getAttribute("data-section");
      updateActiveMenuItem(this);
      scrollToSection(sectionId);
    });
  });

  // 更新激活的菜单项样式
  function updateActiveMenuItem(link) {
    menuItems.forEach((item) =>
      item.classList.remove("promokit-fullpage-menu__item--active")
    );
    link.classList.add("promokit-fullpage-menu__item--active");
  }

  // 滚动到指定页面
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
  // 获取网页加载文字进度条元素(直接消失版)
  const progress = document.querySelector(".promokit-loader__progress--aion");
  const loader = document.querySelector(".promokit-loader");

  // 动态改变进度条高度
  let currentHeight = 0;
  const intervalId = setInterval(() => {
    if (currentHeight >= 100) {
      clearInterval(intervalId);
      loader.style.display = "none"; // 立即消失
    } else {
      currentHeight += 1; // 每次增加1%
      progress.style.height = `${currentHeight}%`;
    }
  }, 15); // 每15毫秒更新一次
  // // 获取网页加载文字进度条元素(平滑版)
  // const progress = document.querySelector(".promokit-loader__progress--aion");
  // const loader = document.querySelector(".promokit-loader");

  // // 动态改变进度条高度
  // let currentHeight = 0;
  // const intervalId = setInterval(() => {
  //   if (currentHeight >= 100) {
  //     clearInterval(intervalId);
  //     fadeOutLoader();
  //   } else {
  //     currentHeight += 1; // 每次增加1%
  //     progress.style.height = `${currentHeight}%`;
  //   }
  // }, 10); // 每10毫秒更新一次

  // // 淡出整个加载器
  // function fadeOutLoader() {
  //   let opacity = 1;
  //   const fadeIntervalId = setInterval(() => {
  //     if (opacity <= 0) {
  //       clearInterval(fadeIntervalId);
  //       loader.style.display = "none";
  //     } else {
  //       opacity -= 0.01; // 每次减少0.01
  //       loader.style.opacity = opacity;
  //     }
  //   }, 10); // 每10毫秒更新一次
  // }
  //============================page2//page3==============================//

  let carouselInterval2;
  let carouselInterval3;

  const videoData = {
    page2: [
      {
        title: "經典伺服器",
        link: "https://www.youtube.com/watch?v=IEN5Px1cuvo",
        imgSrc: "../classic/movies/1_01.jpg",
        text: "",
        videoSrc: "../classic/video/userMovieData1/經典伺服器.mp4",
      },
      {
        title: "波伊塔&伊斯夏爾肯",
        link: "https://www.youtube.com/watch?v=anotherVideoID",
        imgSrc: "../classic/movies/1_02.jpg",
        text: "大家都是從這裡開始冒險的第一步吧～",
        videoSrc: "../classic/video/userMovieData1/波伊塔-伊斯夏爾肯.mp4",
      },
      {
        title: "亞爾特蓋德&斐爾特朗",
        link: "https://www.youtube.com/watch?v=anotherVideoID",
        imgSrc: "../classic/movies/1_03.jpg",
        text: "第一次的飛行任務<br>第一次摔落死亡的記憶....",
        videoSrc: "../classic/video/userMovieData1/亞爾特蓋德-斐爾特朗.mp4",
      },
      {
        title: "耶爾特奈&莫爾海姆",
        link: "https://www.youtube.com/watch?v=IEN5Px1cuvo",
        imgSrc: "../classic/movies/1_04.jpg",
        text: "咦？怎麼突然死了？<br>又是煩人的殺星！",
        videoSrc: "../classic/video/userMovieData1/耶爾特奈-莫爾海姆.mp4",
      },
      {
        title: "貝魯斯蘭&英德爾地卡",
        link: "https://www.youtube.com/watch?v=anotherVideoID",
        imgSrc: "../classic/movies/1_05.jpg",
        text: "可別惹蘇埃倫軍團長生氣了！",
        videoSrc: "../classic/video/userMovieData1/貝魯斯蘭-英德爾地卡.mp4",
      },
      {
        title: "泰奧布姆斯&布魯斯特豪寧",
        link: "https://www.youtube.com/watch?v=anotherVideoID",
        imgSrc: "../classic/movies/1_06.jpg",
        text: "瘋狂收集白金鑄幣<br>還記得抓到的卡莱登數量嗎？",
        videoSrc: "../classic/video/userMovieData1/泰奧布姆斯-布魯斯特豪寧.mp4",
      },
    ],
    page3: [
      {
        title: "火之神殿",
        link: "https://www.youtube.com/watch?v=ZJmmAU0-7jY&feature=youtu.be",
        imgSrc: "../classic/movies/2_01.jpg",
        text: "挑戰墮落的審判官克羅梅德！<br>給我金武 其餘免談！",
        videoSrc: "../classic/video/userMovieData2/火之神殿.mp4",
      },
      {
        title: "德拉烏伯尼爾洞穴",
        link: "https://www.youtube.com/watch?v=anotherVideoID",
        imgSrc: "../classic/movies/2_02.jpg",
        text: "在這裡飛行滑翔時可別撞牆囉！<br>啊...又得重來了....",
        videoSrc: "../classic/video/userMovieData2/德拉烏伯尼爾洞穴.mp4",
      },
      {
        title: "阿德瑪城寨",
        link: "https://www.youtube.com/watch?v=ZJmmAU0-7jY&feature=youtu.be",
        imgSrc: "../classic/movies/2_03.jpg",
        text: "衝阿！<br>誰都別想搶我的妃女服裝！",
        videoSrc: "../classic/video/userMovieData2/阿德瑪城寨.mp4",
      },
      {
        title: "泰奧布姆斯祕密研究所",
        link: "https://www.youtube.com/watch?v=anotherVideoID",
        imgSrc: "../classic/movies/2_04.jpg",
        text: "崔瑞昂的強大威脅！",
        videoSrc: "../classic/video/userMovieData2/泰奧布姆斯祕密研究所.mp4",
      },
    ],
  };

  // 播放视频的函数
  function playVideo(index, page) {
    const videoDataItem = videoData[page][index];
    const videoBackground = document.getElementById(
      `videoBackground${page === "page2" ? "2" : "3"}`
    );
    videoBackground.src = videoDataItem.videoSrc;
    videoBackground.style.display = "block";
    videoBackground.play();

    const pageMap = document.getElementById(`${page}-map`);
    pageMap.innerHTML = `
          <h4>${videoDataItem.title}</h4>
          <a href="${videoDataItem.link}"><img src="${videoDataItem.imgSrc}" alt=""></a>
          <p class="page2-map-txt">${videoDataItem.text}</p>
      `;

    const videoBoxes = document.querySelectorAll(
      `.video-box${page === "page2" ? "2" : "3"}`
    );
    videoBoxes.forEach((box, idx) => {
      box.classList.toggle("active", idx === index);
    });
  }

  function addVideoClickEvents(page) {
    const videoBoxes = document.querySelectorAll(
      `.video-box${page === "page2" ? "2" : "3"}`
    );
    videoBoxes.forEach((box, index) => {
      box.addEventListener("click", () => {
        playVideo(index, page);
        clearInterval(page === "page2" ? carouselInterval2 : carouselInterval3);
      });
    });
  }

  function startCarousel(page) {
    const videoBoxes = document.querySelectorAll(
      `.video-box${page === "page2" ? "2" : "3"}`
    );
    return setInterval(() => {
      if (page === "page2") {
        currentIndex2 = (currentIndex2 + 1) % videoBoxes.length;
        playVideo(currentIndex2, page);
      } else {
        currentIndex3 = (currentIndex3 + 1) % videoBoxes.length;
        playVideo(currentIndex3, page);
      }
    }, 14000);
  }

  function init(page) {
    addVideoClickEvents(page);
    return startCarousel(page);
  }

  function loadPageVideos(page) {
    const videoBackground = document.getElementById(
      `videoBackground${page === "page2" ? "2" : "3"}`
    );
    if (videoBackground.src === "") {
      playVideo(0, page); // 自动播放第一页的视频
    }
  }

  window.addEventListener("load", () => {
    carouselInterval2 = init("page2");
    carouselInterval3 = init("page3");

    // 自动播放第一页视频
    loadPageVideos("page2");
    loadPageVideos("page3");

    // 监听页面可见性变化
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        loadPageVideos("page2");
        loadPageVideos("page3");
      }
    });
  });

  //============================page4==============================//

  const videoData4 = [
    {
      title: "深淵",
      link: "https://www.youtube.com/watch?v=IEN5Px1cuvo",
      imgSrc: "../classic/movies/3_01.jpg",
      text: "飛行時間快不夠啦，趕快飛到環裡補充！<br>看我前後前後前後～",
    },
    {
      title: "要塞戰",
      link: "https://www.youtube.com/watch?v=anotherVideoID",
      imgSrc: "../classic/movies/3_02.jpg",
      text: "馬上就要開始囉！<br>應該沒有不用Shift+F12的人吧？",
    },
    {
      title: "深淵道具",
      link: "https://www.youtube.com/watch?v=anotherVideoID",
      imgSrc: "../classic/movies/3_03.jpg",
      text: "準備好武器，化身為深淵虐殺者！",
    },
    {
      title: "技能",
      link: "https://www.youtube.com/watch?v=anotherVideoID",
      imgSrc: "../classic/movies/3_04.jpg",
      text: "還記得魔道星靠一個技能稱霸的時期嗎？",
    },
    {
      title: "採集&製作",
      link: "https://www.youtube.com/watch?v=anotherVideoID",
      imgSrc: "../classic/movies/3_05.jpg",
      text: "祈禱發生製作暴擊而關閉螢幕的緊張時刻。",
    },
    {
      title: "飛行&滑翔",
      link: "https://www.youtube.com/watch?v=IEN5Px1cuvo",
      imgSrc: "../classic/movies/3_06.jpg",
      text: "飛行是守護者的基本要求，<br>滑翔實力是守護者的生命。",
    },
    {
      title: "守護者任務",
      link: "https://www.youtube.com/watch?v=anotherVideoID",
      imgSrc: "../classic/movies/3_07.jpg",
      text: "想要試試白色的褲子...<br>我就這樣重練了5隻角色...",
    },
    {
      title: "伸縮武器",
      link: "https://www.youtube.com/watch?v=anotherVideoID",
      imgSrc: "../classic/movies/3_08.jpg",
      text: "出運啦！<br>準備把敵族殺個片甲不留！",
    },
    {
      title: "時空裂縫",
      link: "https://www.youtube.com/watch?v=anotherVideoID",
      imgSrc: "../classic/movies/3_09.jpg",
      text: "打起精神！<br>敵族肯定已經潛入我們地盤了！",
    },
  ];

  // 播放视频
  // 播放视频
  // 播放视频// 播放指定索引的视频
  function playVideo4(index) {
    videoBackground4.pause(); // 暂停当前视频
    const videoSrc = videoBoxes4[index].getAttribute("data-video-src");
    videoBackground4.src = videoSrc;
    videoBackground4.style.display = "block";
    videoBackground4.play();

    videoBoxes4.forEach((box) => box.classList.remove("active"));
    videoBoxes4[index].classList.add("active");

    // 滚动到居中位置
    const boxWidth = 235; // 每个盒子的宽度
    const containerWidth = videoContainer4.offsetWidth;
    const totalBoxWidth = boxWidth * videoBoxes4.length;
    let newOffset =
      videoBoxes4[index].offsetLeft - (containerWidth - boxWidth) / 2;

    // 调整偏移量以确保视频盒子不超出容器范围
    if (newOffset < 0) {
      newOffset = 0;
    } else if (newOffset + containerWidth > totalBoxWidth) {
      if (index === videoBoxes4.length - 1) {
        newOffset = totalBoxWidth - containerWidth + 100; // 调整偏移量，使最后一个视频框稍微靠左
      } else {
        newOffset = totalBoxWidth - containerWidth;
      }
    }

    videoContainer4.scrollLeft = newOffset;

    // 更新页面信息
    const currentData = videoData4[index];
    page4Map.innerHTML = `
    <h4>${currentData.title}</h4>
    <a href="${currentData.link}">
      <img src="${currentData.imgSrc}" alt=""></a>
    <p class="page2-map-txt">${currentData.text}</p>
  `;
  }

  // 播放下一个视频
  function playNextVideo() {
    currentIndex4 = (currentIndex4 + 1) % videoBoxes4.length;
    playVideo4(currentIndex4);
  }

  // 启动轮播
  function startCarousel() {
    carouselInterval4 = setInterval(playNextVideo, 15000); // 每15秒切换视频
  }

  // 页面加载时自动播放第一个视频并启动轮播
  window.onload = function () {
    playVideo4(currentIndex4); // 自动播放第一个视频
    startCarousel(); // 启动轮播
  };

  // 处理视频播放结束事件
  videoBackground4.addEventListener("ended", playNextVideo);

  // 处理视频盒子点击事件
  videoBoxes4.forEach((box, index) => {
    box.addEventListener("click", () => {
      playVideo4(index);
      currentIndex4 = index;
      clearInterval(carouselInterval4); // 停止轮播
      startCarousel(); // 可选择在点击后重启轮播
    });
  });

  // 处理上一个按钮点击事件
  prevButton4.addEventListener("click", () => {
    currentIndex4 =
      currentIndex4 > 0 ? currentIndex4 - 1 : videoBoxes4.length - 1;
    playVideo4(currentIndex4);
    clearInterval(carouselInterval4); // 停止轮播
  });

  // 处理下一个按钮点击事件
  nextButton4.addEventListener("click", () => {
    currentIndex4 = (currentIndex4 + 1) % videoBoxes4.length;
    playVideo4(currentIndex4);
    clearInterval(carouselInterval4); // 停止轮播
  });

  // 处理展开按钮点击事件
  expandButton4.addEventListener("click", function () {
    videoBoxes4.forEach((box) => {
      box.classList.remove("hidden"); // 显示所有视频盒子
    });
    videoContainer4.style.height = "380px"; // 增加容器高度
    videoContainer4.style.width = `${videoContainer4.clientWidth - 40}px`; // 减少容器宽度
    this.style.display = "none"; // 隐藏展开按钮
    closeButton4.style.display = "inline"; // 显示关闭按钮
    videoContainer4_fade.style.backgroundColor = "rgb(0 0 0 / 89%)";
    videoContainer4.style.flexDirection = "row";
    videoContainer4.style.flexWrap = "wrap";
    videoContainer4.style.alignContent = "center";
    videoContainer4.style.justifyContent = "center";
    videoContainer4.style.alignItems = "center";
  });

  // 处理关闭按钮点击事件
  closeButton4.addEventListener("click", function () {
    videoContainer4.style.height = "200px"; // 恢复容器高度
    videoContainer4.style.width = `${videoContainer4.clientWidth + 40}px`; // 恢复容器宽度
    this.style.display = "none"; // 隐藏关闭按钮
    expandButton4.style.display = "inline"; // 显示展开按钮
    videoContainer4_fade.style.backgroundColor = "#00000000";
    videoContainer4.style.alignContent = "flex-start";
    videoContainer4.style.flexDirection = "column";
    videoContainer4.style.flexWrap = "wrap";
    videoContainer4.style.justifyContent = "flex-end";
    videoContainer4.style.alignItems = "center";
  });

  // 初始化显示第一个视频
  playVideo4(currentIndex4);
});
