import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { getAllApartments, createApartment, deleteApartment, getApartmentById, updateApartment } from "../services/apartments/request.js";
import { checkadminuser } from "../components/header.js";
import { getAllUsers } from "../services/users/request.js";
checkadminuser()


document.addEventListener("DOMContentLoaded", ()=>{

  const userrole = JSON.parse(localStorage.getItem("loggedUserrole"));

  if (userrole!=="admin"||!userrole) {
    window.location.href="apartments.html"
  }
})

const menuTable = document.querySelector("#menuTable");
const addFormContainer = document.createElement("div");
addFormContainer.className = "mb-8";

const editFormContainer = document.createElement("div");
editFormContainer.className = "mb-8 hidden";
editFormContainer.id = "editFormContainer";

let currentEditId = null;

async function handleCreateApartment(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  
  const title = formData.get("title");
  const location = formData.get("location");
  const pricePerNight = Number(formData.get("pricePerNight"));
  const coverImage = formData.get("coverImage");
  const description = formData.get("description");
  
  if (!title || !location || !pricePerNight || !coverImage || !description) {
    alert("Please fill all required fields");
    return;
  }
  
  const featuresInput = formData.get("features");
  const features = featuresInput.split(",").map(feature => feature.trim()).filter(feature => feature);
  
  const rulesInput = formData.get("rules");
  const rules = rulesInput.split(",").map(rule => rule.trim()).filter(rule => rule);
  
  const newApartment = {
    title,
    location,
    pricePerNight,
    coverImage,
    description,
    features,
    rules,
    images: [],  
    createdAt: new Date().toISOString(),
    bookedDates: []
  };
  
  try {
    const response = await createApartment(newApartment);
    
    if (response.data) {
      alert("Apartment created successfully!");
      loadApartmentsTable();
      event.target.reset();
    } else {
      alert(`Failed to create apartment: ${response.message}`);
    }
  } catch (error) {
    console.error("Error creating apartment:", error);
    alert("An error occurred while creating the apartment");
  }
}

async function handleEditApartment(event) {
  event.preventDefault();
  
  if (!currentEditId) {
    alert("No apartment selected for editing");
    return;
  }
  
  const formData = new FormData(event.target);
  
  const title = formData.get("title");
  const location = formData.get("location");
  const pricePerNight = Number(formData.get("pricePerNight"));
  const coverImage = formData.get("coverImage");
  const description = formData.get("description");
  
  if (!title || !location || !pricePerNight || !coverImage || !description) {
    alert("Please fill all required fields");
    return;
  }
  
  const featuresInput = formData.get("features");
  const features = featuresInput.split(",").map(feature => feature.trim()).filter(feature => feature);
  
  const rulesInput = formData.get("rules");
  const rules = rulesInput.split(",").map(rule => rule.trim()).filter(rule => rule);
  
  try {
    const currentResponse = await getApartmentById(currentEditId);
    
    if (!currentResponse.data) {
      alert(`Failed to fetch apartment: ${currentResponse.message}`);
      return;
    }
    
    const currentApartment = currentResponse.data;
    
    const updatedApartment = {
      ...currentApartment,
      title,
      location,
      pricePerNight,
      coverImage,
      description,
      features,
      rules
    };
    
    const response = await updateApartment(currentEditId, updatedApartment);
    
    if (response.data) {
      alert("Apartment updated successfully!");
      loadApartmentsTable();
      hideEditForm();
    } else {
      alert(`Failed to update apartment: ${response.message}`);
    }
  } catch (error) {
    console.error("Error updating apartment:", error);
    alert("An error occurred while updating the apartment");
  }
}

function createAddApartmentForm() {
  const form = document.createElement("form");
  form.id = "addApartmentForm";
  form.className = "bg-white p-6 rounded shadow-md";
  form.addEventListener("submit", handleCreateApartment);

  form.innerHTML = `
    <h3 class="text-xl font-semibold mb-4">Add New Apartment</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Title*</label>
        <input type="text" id="title" name="title" required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      
      <div class="mb-4">
        <label for="location" class="block text-sm font-medium text-gray-700">Location*</label>
        <input type="text" id="location" name="location" required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      
      <div class="mb-4">
        <label for="pricePerNight" class="block text-sm font-medium text-gray-700">Price Per Night*</label>
        <input type="number" id="pricePerNight" name="pricePerNight" required min="1"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      
      <div class="mb-4">
        <label for="coverImage" class="block text-sm font-medium text-gray-700">Cover Image URL*</label>
        <input type="url" id="coverImage" name="coverImage" required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      
      <div class="mb-4 md:col-span-2">
        <label for="description" class="block text-sm font-medium text-gray-700">Description*</label>
        <textarea id="description" name="description" rows="3" required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>
      
      <div class="mb-4">
        <label for="features" class="block text-sm font-medium text-gray-700">Features (comma separated)</label>
        <input type="text" id="features" name="features" placeholder="Wifi, TV, Air Conditioner"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      
      <div class="mb-4">
        <label for="rules" class="block text-sm font-medium text-gray-700">Rules (comma separated)</label>
        <input type="text" id="rules" name="rules" placeholder="no smoking, no pets"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
    </div>
    
    <div class="flex justify-end">
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Add Apartment
      </button>
    </div>
  `;
  
  return form;
}

function createEditApartmentForm() {
  const form = document.createElement("form");
  form.id = "editApartmentForm";
  form.className = "bg-white p-6 rounded shadow-md";
  form.addEventListener("submit", handleEditApartment);

  form.innerHTML = `
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold">Edit Apartment</h3>
      <button type="button" id="cancelEditBtn" class="text-gray-500 hover:text-gray-700">
        <i class="fa-solid fa-times"></i> Cancel
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="mb-4">
        <label for="edit-title" class="block text-sm font-medium text-gray-700">Title*</label>
        <input type="text" id="edit-title" name="title" required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      
      <div class="mb-4">
        <label for="edit-location" class="block text-sm font-medium text-gray-700">Location*</label>
        <input type="text" id="edit-location" name="location" required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      
      <div class="mb-4">
        <label for="edit-pricePerNight" class="block text-sm font-medium text-gray-700">Price Per Night*</label>
        <input type="number" id="edit-pricePerNight" name="pricePerNight" required min="1"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      
      <div class="mb-4">
        <label for="edit-coverImage" class="block text-sm font-medium text-gray-700">Cover Image URL*</label>
        <input type="url" id="edit-coverImage" name="coverImage" required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      
      <div class="mb-4 md:col-span-2">
        <label for="edit-description" class="block text-sm font-medium text-gray-700">Description*</label>
        <textarea id="edit-description" name="description" rows="3" required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>
      
      <div class="mb-4">
        <label for="edit-features" class="block text-sm font-medium text-gray-700">Features (comma separated)</label>
        <input type="text" id="edit-features" name="features" placeholder="Wifi, TV, Air Conditioner"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      
      <div class="mb-4">
        <label for="edit-rules" class="block text-sm font-medium text-gray-700">Rules (comma separated)</label>
        <input type="text" id="edit-rules" name="rules" placeholder="no smoking, no pets"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
    </div>
    
    <div class="flex justify-end">
      <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        Save Changes
      </button>
    </div>
  `;
  
  return form;
}

async function handleDeleteApartment(apartmentId) {
  if (confirm(`Are you sure you want to delete apartment #${apartmentId}?`)) {
    try {
      console.log("Deleting apartment with ID:", apartmentId);
      const response = await deleteApartment(apartmentId);
      
      if (response.data) {
        alert('Apartment deleted successfully!');
        loadApartmentsTable(); 
      } else {
        alert(`Failed to delete apartment: ${response.message}`);
      }
    } catch (error) {
      console.error("Error deleting apartment:", error);
      alert("An error occurred while deleting the apartment");
    }
  }
}

async function handleEditButtonClick(apartmentId) {
  try {
    const response = await getApartmentById(apartmentId);
    
    if (!response.data) {
      alert(`Failed to fetch apartment: ${response.message}`);
      return;
    }
    
    const apartment = response.data;
    currentEditId = apartmentId;
    
    document.getElementById("edit-title").value = apartment.title;
    document.getElementById("edit-location").value = apartment.location;
    document.getElementById("edit-pricePerNight").value = apartment.pricePerNight;
    document.getElementById("edit-coverImage").value = apartment.coverImage;
    document.getElementById("edit-description").value = apartment.description;
    document.getElementById("edit-features").value = apartment.features.join(", ");
    document.getElementById("edit-rules").value = apartment.rules.join(", ");
    
    showEditForm();
    editFormContainer.scrollIntoView({ behavior: 'smooth' });
    
  } catch (error) {
    console.error("Error fetching apartment for editing:", error);
    alert("An error occurred while getting apartment details");
  }
}

function showEditForm() {
  editFormContainer.classList.remove("hidden");
  addFormContainer.classList.add("hidden");
}

function hideEditForm() {
  editFormContainer.classList.add("hidden");
  addFormContainer.classList.remove("hidden");
  currentEditId = null;
}

async function loadApartmentsTable() {
  try {
    const response = await getAllApartments();
    
    if (!response.data) {
      console.error("Failed to fetch apartments:", response.message);
      menuTable.innerHTML = `<div class="bg-red-100 p-4 rounded">Error loading apartments: ${response.message}</div>`;
      return;
    }

    if (window.apartmentsTable) {
      window.apartmentsTable.destroy();
    }

    window.apartmentsTable = new Grid({
      search: true,
      sort: true,
      pagination: {
        limit: 5
      },
      columns: [
        "id",
        "title",
        "location",
        { 
          name: "pricePerNight",
          formatter: (cell) => `$${cell}`
        },
        {
          name: "coverImage",
          formatter: (cell) =>
            html(`<img src="${cell}" alt="Apartment" class="w-20 h-20 object-cover rounded" />`)
        },
        {
          name: "actions",
          formatter: (_, row) => {
            const apartmentId = row.cells[0].data;
            return html(`
              <div class="flex space-x-2">
                <button 
                  class="bg-blue-600 text-white px-2 py-1 rounded text-sm edit-btn" 
                  data-id="${apartmentId}"
                  onclick="window.editApartment('${apartmentId}')"
                >
                  Edit
                </button>
                <button 
                  class="bg-red-600 text-white px-2 py-1 rounded text-sm delete-btn" 
                  data-id="${apartmentId}"
                  onclick="window.deleteApartment('${apartmentId}')"
                >
                  Delete
                </button>
              </div>
            `);
          }
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

    window.deleteApartment = handleDeleteApartment;
    window.editApartment = handleEditButtonClick;
    
  } catch (error) {
    console.error("Error loading apartments:", error);
    menuTable.innerHTML = `<div class="bg-red-100 p-4 rounded">Error loading apartments: ${error.message}</div>`;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const mainSection = document.querySelector("main");
  
  const sectionTitle = document.createElement("h2");
  sectionTitle.className = "text-xl font-semibold mb-4";
  sectionTitle.textContent = "Manage Apartments";
  mainSection.insertBefore(sectionTitle, menuTable);
  
  addFormContainer.appendChild(createAddApartmentForm());
  mainSection.insertBefore(addFormContainer, menuTable);
  
  editFormContainer.appendChild(createEditApartmentForm());
  mainSection.insertBefore(editFormContainer, menuTable);
  
  document.getElementById("cancelEditBtn").addEventListener("click", hideEditForm);
  
  await loadApartmentsTable();
});
