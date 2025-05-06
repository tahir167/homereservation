import axios from "axios";
import { API_BASE_URL } from "../constants/constants.js";
import { endpoints } from "../constants/constants.js";

const USERS_URL = `${API_BASE_URL}${endpoints.users}`;

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("Confirmpassword");
const emailInput = document.getElementById("email");

const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

const submitButton = document.querySelector("#submitbtn");
const form = document.querySelector(".signupform");

function validateForm() {
  let isValid = true;

  if (usernameInput.value.length < 3) {
    usernameError.textContent = "Must be at least 3 symbol.";
    usernameError.classList.remove("hidden");
    isValid = false;
  } else {
    usernameError.classList.add("hidden");
  }

  if (passwordInput.value.length < 4) {
    passwordError.textContent = "Must be at least 4 symbol.";
    passwordError.classList.remove("hidden");
    isValid = false;
  } else {
    passwordError.classList.add("hidden");
  }

  if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordError.textContent = "Password is not same.";
    confirmPasswordError.classList.remove("hidden");
    isValid = false;
  } else {
    confirmPasswordError.classList.add("hidden");
  }

  if (confirmPasswordInput.value.trim() === "" || emailInput.value.trim() === "") {
    isValid = false;
  }

  submitButton.disabled = !isValid;
}

usernameInput.addEventListener("input", validateForm);
passwordInput.addEventListener("input", validateForm);
confirmPasswordInput.addEventListener("input", validateForm);
emailInput.addEventListener("input", validateForm);

validateForm();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newUser = {
    username: usernameInput.value,
    email: emailInput.value,
    password: passwordInput.value, 
    profileImage: "",
    balance: 0,
    role: "client",
    bookings: [],
    isBanned: false,
    banDate: null,
    createdAt: new Date().toISOString(),
    lastLogin: null,
  };

  try {
    const { data: users } = await axios.get(USERS_URL);

    const isDuplicate = users.some(user =>
      user.email === newUser.email ||
      user.username === newUser.username ||
      user.password === newUser.password 
    );

    if (isDuplicate) {
      alert("Bu istifadəçi artıq mövcuddur! (email, username və ya şifrə)");
      return;
    }

  
    await axios.post(USERS_URL, newUser);
    alert("User successfully created!");
    form.reset();
    validateForm();
  } catch (error) {
    console.error("User creation failed:", error);
    alert("Something went wrong!");
  }
});