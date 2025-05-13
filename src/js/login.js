import axios from "/node_modules/.vite/deps/axios.js?v=9acb9bfe";
import { API_BASE_URL } from "/src/constants/constants.js";
import { endpoints } from "/src/constants/constants.js";
import { getAllUsers } from "/src/services/users/request.js?t=1746530517970";

const formLogin = document.querySelector("#formlogin");
const emailInp = document.querySelector("#email");
const passwordInp = document.querySelector("#password");

formLogin.addEventListener("submit", async function (e) {
  e.preventDefault();

  try {
    const users = await getAllUsers();

    const foundUser = users.find(
      (x) => x.email === emailInp.value && x.password === passwordInp.value
    );

    localStorage.setItem("loggedUser", JSON.stringify(foundUser.id));
    localStorage.setItem("loggedUserRole", JSON.stringify(foundUser.role));
    const loggedUserRole = JSON.parse(localStorage.getItem("loggedUserRole"));
    console.log(loggedUserRole);

    if (loggedUserRole) {
      if (foundUser) {
        if (foundUser.role === "admin") {
          window.location.href = "admin.addaparments.html";
        } else if (foundUser.role === "client") {
          window.location.href = "index.html";
        } else {
          window.location.href = "apartments.html";
        }
      } else {
        alert("Email və ya şifrə səhvdir!");
      }
    } else {
      window.location.href = "index.html";
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Xəta baş verdi!");
  }
});
