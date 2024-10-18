document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/api/users");
  const users = await response.json();

  const table = document.getElementById("userTable");
  users.forEach((user) => {
    const row = table.insertRow(-1);
    const cellId = row.insertCell(0);
    const cellUsername = row.insertCell(1);
    const cellEmail = row.insertCell(2);

    cellId.textContent = user.id;
    cellUsername.textContent = user.username;
    cellEmail.textContent = user.email;
  });
});
