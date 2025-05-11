import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { getAllApartments } from "../services/apartments/request.js";

const menuTable = document.querySelector("#menuTable");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await getAllApartments();

  const table = new Grid({
    search: true,
    sort: true,
    pagination: {
      limit: 5
    },
    columns: [
      "id",
      "title",
      "location",
      "pricePerNight",
      {
        name: "coverImage",
        formatter: (cell) =>
          html(`<img src="${cell}" alt="Apartment" class="w-20 h-20 object-cover rounded" />`)
      }
    ],
    data: response.data.map((item) => ({
      id: item.id,
      title: item.title,
      location: item.location,
      pricePerNight: item.pricePerNight,
      coverImage: item.coverImage,
    }))
  }).render(menuTable);
});