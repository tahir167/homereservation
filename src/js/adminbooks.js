import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { getAllbook, deletebook } from "../services/book/request.js";
import moment from "moment";

const reservationTable = document.querySelector("#reservationTable");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await getAllbook();

  const grid = new Grid({
    search: true,
    sort: true,
    pagination: {
      limit: 5
    },
    columns: [
      "ID",
      "User ID",
      "Apartment ID",
      {
        name: "Start Date",
        formatter: (cell) => moment.utc(cell).format("YYYY-MM-DD")
      },
      {
        name: "End Date",
        formatter: (cell) => moment.utc(cell).format("YYYY-MM-DD")
      },
      {
        name: "Status",
        formatter: (cell) => html(`
          <select class="border border-gray-300 rounded px-2 py-1">
            <option ${cell === "pending" ? "selected" : ""}>pending</option>
            <option ${cell === "confirmed" ? "selected" : ""}>confirmed</option>
            <option ${cell === "seated" ? "selected" : ""}>seated</option>
            <option ${cell === "completed" ? "selected" : ""}>completed</option>
            <option ${cell === "canceled" ? "selected" : ""}>canceled</option>
          </select>
        `)
      },
      {
        name: "Created At",
        formatter: (cell) => html(`<span>${moment(cell).fromNow()}</span>`)
      },
      {
        name: "Actions",
        formatter: (cell, row) => {
          const id = row.cells[0].data;
          return html(`
            <button 
              data-id="${id}" 
              class="delete-btn bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition">
              Delete
            </button>
          `);
        }
      }
    ],
    data: response.data.map((item) => ([
      String(item.id),
      String(item.userId),
      String(item.apartmentId),
      item.startDate,
      item.endDate,
      item.status,
      item.createdAt,
      item.id 
    ]))
  });

  grid.render(reservationTable);

  reservationTable.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const id = e.target.getAttribute("data-id");
      const confirmDelete = confirm("Bu rezervasiyanı silmək istədiyinə əminsən?");
      if (!confirmDelete) return;

      const result = await deletebook(id);
      if (result.data) {
        // 2. Cədvəli yenilə
        e.target.closest("tr").remove();
        alert("Rezervasiya uğurla silindi!");
      } else {
        alert("Silmək alınmadı. Zəhmət olmasa yenidən yoxla.");
      }
    }
  });
});
