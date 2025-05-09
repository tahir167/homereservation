import { getAllApartments } from "../services/apartments/request.js";
const loggedUserId = localStorage.getItem("loggedUser");

document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const apartmentId = urlParams.get("id");
  
  if (!apartmentId) {
    window.location.href = "apartments.html";
    return;
  }
  
  try {
    const response = await getAllApartments();
    const apartment = response.data.find(apt => apt.id === apartmentId);
    
    if (!apartment) {
      document.getElementById("apartment-detail").innerHTML = `
        <div class="text-center py-12">
          <h2 class="text-2xl font-bold text-red-500">Apartment not found</h2>
          <a href="apartments.html" class="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md">
            Back to Apartments
          </a>
        </div>
      `;
      return;
    }
    
    renderApartmentDetail(apartment);
  } catch (error) {
    console.error("Error fetching apartment details:", error);
    document.getElementById("apartment-detail").innerHTML = `
      <div class="text-center py-12">
        <h2 class="text-2xl font-bold text-red-500">Error loading apartment details</h2>
        <p class="mt-2 text-gray-600">Please try again later</p>
        <a href="apartments.html" class="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md">
          Back to Apartments
        </a>
      </div>
    `;
  }
});

function renderApartmentDetail(apartment) {
  const detailContainer = document.getElementById("apartment-detail");
  
  const featuresList = apartment.features.map(feature => 
    `<li class="flex items-center gap-2"><i class="fa-solid fa-check text-green-500"></i>${feature}</li>`
  ).join("");
  
  const rulesList = apartment.rules && apartment.rules.length > 0 
    ? apartment.rules.map(rule => 
      `<li class="flex items-center gap-2"><i class="fa-solid fa-ban text-red-500"></i>${rule}</li>`
    ).join("")
    : `<li>No specific rules</li>`;
  
  const bookedDatesHtml = apartment.bookedDates && apartment.bookedDates.length > 0
    ? apartment.bookedDates.map(date => 
      `<div class="p-2 bg-red-100 rounded-md text-sm">
        ${date.startDate} to ${date.endDate}
      </div>`
    ).join("")
    : `<p class="text-green-600">No booked dates</p>`;
  
  detailContainer.innerHTML = `
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="relative h-80">
        <img src="${apartment.coverImage}" alt="${apartment.title}" class="w-full h-full object-cover">
        <div class="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full">
          $${apartment.pricePerNight} / night
        </div>
      </div>
      
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h1 class="text-3xl font-bold mb-2">${apartment.title}</h1>
            <p class="text-gray-600 flex items-center gap-2">
              <i class="fa-solid fa-location-dot"></i> ${apartment.location}
            </p>
          </div>
          <a href="apartments.html" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
            Back to List
          </a>
        </div>
        
        <div class="border-t border-gray-200 pt-4 mb-6">
          <h2 class="text-xl font-bold mb-3">Description</h2>
          <p class="text-gray-700">${apartment.description}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 class="text-xl font-bold mb-3">Features</h2>
            <ul class="space-y-2">
              ${featuresList}
            </ul>
          </div>
          
          <div>
            <h2 class="text-xl font-bold mb-3">House Rules</h2>
            <ul class="space-y-2">
              ${rulesList}
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-200 pt-4 mb-6">
          <h2 class="text-xl font-bold mb-3">Availability</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
           
            <div>
              <h3 class="font-bold mb-2">Book this Apartment:</h3>
             
             <button id="bookId" data-id="${apartment.id}" class="bookbtn inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Book
            </ button>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-200 pt-4">
          <p class="text-gray-500 text-sm">
            Listing created on: ${new Date(apartment.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  `;

 const bookBtn= document.querySelector(".bookbtn")
 bookBtn.addEventListener("click",async function (params) {
  window.location.href = `book.html?id=${apartment.id}`;
 })
}