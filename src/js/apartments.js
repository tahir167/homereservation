import { getAllApartments } from "../services/apartments/request.js";
const searchHome= document.querySelector("#searchHome")
const valueSelect= document.querySelector("#valueselect")
 const selectLocation=document.querySelector("#selectlocation")
const menuList=document.querySelector(".menuList")

 document.addEventListener("DOMContentLoaded",async function () {
    const response =await getAllApartments()
    console.log(response)
    renderApartmentsList(response.data)




    function renderApartmentsList(arr) {
        menuList.innerHTML=""
        arr.forEach((apartmentsItem)=>{
            menuList.innerHTML+=`
          <div class="border border-gray-300 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
  <img src="${apartmentsItem.coverImage}" alt="House" class="w-full h-[200px] object-cover" />
  <div class="p-4">
    <p class="text-gray-600">📍${apartmentsItem.location}</p>
    <p class="text-xl font-bold text-blue-600">$${apartmentsItem.pricePerNight}</p>

     <button type="button" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
              More Details
            </button>
  
  </div>
</div>
            `
        })
    }
 })