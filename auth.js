const tabBtns = document.querySelectorAll(".tab-btn");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const tab = btn.dataset.tab;
    if (tab === "login") {
      loginForm.classList.remove("hidden");
      signupForm.classList.add("hidden");
    } else {
      signupForm.classList.remove("hidden");
      loginForm.classList.add("hidden");
    }
  });
});

// Storage keys
const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

// Helpers
function loadUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Signup
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim().toLowerCase();
  const password = document.getElementById("signupPassword").value;

  const msg = document.getElementById("signupMsg");
  msg.textContent = "";

  const users = loadUsers();

  if (users.some(u => u.email === email)) {
    msg.textContent = "This email is already registered. Please login.";
    return;
  }

  users.push({ name, email, password });
  saveUsers(users);

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ name, email }));
  msg.textContent = "Account created! Redirecting to catalog...";

  setTimeout(() => {
    window.location.href = "shop.html";
  }, 700);
});

// Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;

  const msg = document.getElementById("loginMsg");
  msg.textContent = "";

  const users = loadUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    msg.textContent = "Wrong email or password.";
    return;
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ name: user.name, email: user.email }));
  msg.textContent = "Success! Redirecting...";

  setTimeout(() => {
    window.location.href = "shop.html";
  }, 600);
});