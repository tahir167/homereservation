import { getAllApartments } from "../services/apartments/request.js";
const searchHome = document.querySelector("#searchHome");
const valueSelect = document.querySelector("#valueselect");
const selectLocation = document.querySelector("#selectlocation");
const menuList = document.querySelector(".menuList");

document.addEventListener("DOMContentLoaded", async function () {
  const response = await getAllApartments();
  console.log(response);
  renderApartmentsList(response.data);

  searchHome.addEventListener("keyup", async function (e) {
    const searchQuery = e.target.value.trim().toLowerCase();
    const response = await getAllApartments();
    
    const searchedApartments = response.data.filter((m) => 
        m.title.toLowerCase().includes(searchQuery)
    );

    renderApartmentsList(searchedApartments);
  });

  valueSelect.addEventListener("change", async function (e) {
    const selectedOption = e.target.value;
    let sortedApartments = [...response.data];
    switch (selectedOption) {
      case "low-to-high":
        sortedApartments = [
          ...response.data.sort((a, b) => {
            return a.pricePerNight - b.pricePerNight;
          }),
        ];
        break;
      case "high-to-low":
        sortedApartments = [
          ...response.data.sort((a, b) => {
            return b.pricePerNight - a.pricePerNight;
          }),
        ];
        break;
      default:
        break;
    }
    renderApartmentsList(sortedApartments);
  });

  selectLocation.addEventListener("change", async function (e) {
    const response = await getAllApartments(); 
    const selectedLocation = e.target.value.toLowerCase(); 

    if (!selectedLocation) {
      renderApartmentsList(response.data); 
    } else {
      const filteredApartments = response.data.filter((apartment) =>
        apartment.location.toLowerCase().includes(selectedLocation)
      );
      renderApartmentsList(filteredApartments); 
    }
  });

  function renderApartmentsList(arr) {
    menuList.innerHTML = "";
    arr.forEach((apartmentsItem) => {
      menuList.innerHTML += `
      <div class="border border-gray-300 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
        <img src="${apartmentsItem.coverImage}" alt="House" class="w-full h-[200px] object-cover" />
        <div class="p-4">
          <p>${apartmentsItem.title}</p>
          <p class="text-gray-600">📍${apartmentsItem.location}</p>
          <p class="text-xl font-bold text-blue-600">$${apartmentsItem.pricePerNight}</p>
          <button type="button" data-id="${apartmentsItem.id}" class="detail-btn mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
            More Details
          </button>
        </div>
      </div>
      `;
    });

    const detailButtons = document.querySelectorAll(".detail-btn");
    detailButtons.forEach(button => {
      button.addEventListener("click", function() {
        const apartmentId = this.getAttribute("data-id");
        window.location.href = `apartments.detail.html?id=${apartmentId}`;
      });
    });
  }
});