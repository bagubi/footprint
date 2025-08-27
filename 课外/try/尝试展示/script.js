document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/users");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();

    const table = document.getElementById("userTable");
    users.forEach((user) => {
      const row = table.insertRow(-1);
      row.insertCell(0).textContent = user.id;
      row.insertCell(1).textContent = user.username;
      row.insertCell(2).textContent = user.email;
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    // 可以在页面上显示错误信息
    const errorDiv = document.createElement("div");
    errorDiv.style.color = "red";
    errorDiv.textContent = "加载用户列表失败: " + error.message;
    document.body.appendChild(errorDiv);
  }
});