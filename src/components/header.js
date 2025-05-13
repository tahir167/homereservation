
import axios from "axios";
import { API_BASE_URL } from "../constants/constants.js";
import { endpoints } from "../constants/constants.js";

const USERS_URL = `${API_BASE_URL}${endpoints.users}`;
const navButtons = document.getElementById("navButtons");

async function renderHeader() {
  const loggedUserId = localStorage.getItem("loggedUser");
  
  if (!loggedUserId) {
    navButtons.innerHTML = `
      <button class="bg-white shadow w-[70px] h-[40px] rounded-md">
        <a href="login.html">Log in</a>
      </button>
      <button class="w-[70px] h-[40px] bg-blue-600 text-white rounded-md">
        <a href="signup.html">Sign up</a>
      </button>
    `;
    return;
  }
  
  try {
    const userId = JSON.parse(loggedUserId);
    const { data: user } = await axios.get(`${USERS_URL}/${userId}`);
    
    navButtons.innerHTML = `
      <span class="font-semibold">${user.username}</span>
      <button id="logoutBtn" class="bg-red-500 text-white px-3 py-1 rounded-md">Log out</button>
      <a href="person.html"><i class="fa-solid fa-user"></i></a>
    `;
    
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("loggedUser");
      window.location.href = "login.html";
    });
  } catch (err) {
    console.error("User fetch error:", err);
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
  }
}

renderHeader();

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburgerMenu");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
});

export async function checkadminuser() {
  

  document.addEventListener("DOMContentLoaded", async  function () {
    const loggedUserId = JSON.parse(localStorage.getItem("loggedUser"));
  
  
    if (!loggedUserId) {
        window.location.href = "login.html";
        return;
    }})
  }