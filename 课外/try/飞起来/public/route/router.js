// router.js
//路由文件
// Ensure this function is exported
export function route() {
  const hash = window.location.hash || "#home";
  const page = hash.replace("#", "");

  if (page === "about") {
    import("../selfCreatedJs/app.js").then((module) => {
      module.renderAbout();
    });
  } else {
    import("../selfCreatedJs/app.js").then((module) => {
      module.renderHome();
    });
  }
}

// Event listener for hash changes
window.addEventListener("hashchange", route);
