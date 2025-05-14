import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import moment from "moment";
import { getAllUsers, patchUser } from "../services/users/request.js";

document.addEventListener("DOMContentLoaded", async () => {
  const usersTable = document.querySelector("#usersTable");

  try {
    const response = await getAllUsers();

    const grid = new Grid({
      search: true,
      sort: true,
      pagination: { limit: 5 },
      columns: [
        "ID",
        "Username",
        "Email",
        "Password",
        "Role",
        "Balance",
        "Is Banned",
        "Ban Date",
        {
          name: "Created At",
          formatter: (cell) => cell ? moment(cell).format("YYYY-MM-DD") : "N/A"
        },
        {
          name: "Last Login",
          formatter: (cell) => cell ? moment(cell).format("YYYY-MM-DD") : "N/A"
        },
        {
          name: "Actions",
          formatter: (_, row) => {
            const userId = row.cells[0].data;
            const isBanned = row.cells[6].data === "Yes";

            return html(`
              <button 
                data-id="${userId}" 
                data-banned="${isBanned}" 
                class="${isBanned ? 'unblock-btn bg-green-500 hover:bg-green-700' : 'block-btn bg-red-500 hover:bg-red-700'} text-white px-2 py-1 rounded transition">
                ${isBanned ? 'Unblock' : 'Block'}
              </button>
            `);
          }
        }
      ],
      data: response.map((user) => [
        user.id,
        user.username,
        user.email,
        user.password,
        user.role,
        user.balance || 0,
        user.isBanned ? "Yes" : "No",
        user.banDate ? moment(user.banDate).format("YYYY-MM-DD") : "N/A",
        user.createdAt,
        user.lastLogin
      ])
    });

    grid.render(usersTable);
  } catch (error) {
    console.error("Error loading users:", error);
    usersTable.innerHTML = "<div class='text-red-500 p-4'>Kullanıcı verileri yüklenemedi</div>";
  }
});

document.addEventListener("click", async (e) => {
  const target = e.target;

  if (target.matches(".block-btn, .unblock-btn")) {
    const userId = target.getAttribute("data-id");
    const currentlyBanned = target.getAttribute("data-banned") === "true" 

    const updatedData = {
      isBanned: !currentlyBanned,
      banDate: !currentlyBanned ? new Date().toISOString() : null
    };

    try {
      await patchUser(userId, updatedData);
      alert(`User has been ${!currentlyBanned ? "blocked" : "unblocked"} successfully.`);
      location.reload(); 
    } catch (err) {
      console.error("Ban/unban failed:", err);
      alert("An error occurred.");
    }
  }
});
