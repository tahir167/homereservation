import { createbook } from "../services/book/request.js";
import { getAllApartments } from "../services/apartments/request.js";

document.addEventListener("DOMContentLoaded", function () {
  const bookingForm = document.getElementById("bookingForm");
  const apartmentId = new URLSearchParams(window.location.search).get("id");
  let selectedApartment = null;

  // Function to calculate days between two dates
  function calculateDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end - start);
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  }

  // Function to update the total price display
  function updateTotalPrice() {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const priceDisplay = document.getElementById("totalPrice");
    
    if (selectedApartment && startDate && endDate) {
      const numberOfNights = calculateDays(startDate, endDate);
      const totalPrice = selectedApartment.pricePerNight * numberOfNights;
      priceDisplay.textContent = `₼${totalPrice} (${numberOfNights} nights at ₼${selectedApartment.pricePerNight}/night)`;
      document.getElementById("totalPriceSection").classList.remove("hidden");
    }
  }

  // Fetch apartment details when page loads
  async function fetchApartmentDetails() {
    try {
      const apartmentResponse = await getAllApartments();
      selectedApartment = apartmentResponse.data.find(ap => ap.id === apartmentId);

      if (selectedApartment) {
        document.getElementById("apartmentTitle").textContent = selectedApartment.title;
        document.getElementById("pricePerNight").textContent = `₼${selectedApartment.pricePerNight} per night`;
        
        // Set up event listeners for date inputs
        const startDateInput = document.getElementById("startDate");
        const endDateInput = document.getElementById("endDate");
        
        startDateInput.addEventListener("change", updateTotalPrice);
        endDateInput.addEventListener("change", updateTotalPrice);
        
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        startDateInput.min = today;
        endDateInput.min = today;
      } else {
        document.getElementById("message").innerHTML = `<p class="text-red-600">Apartment not found.</p>`;
      }
    } catch (error) {
      console.error("Error fetching apartment details:", error);
      document.getElementById("message").innerHTML = `<p class="text-red-600">Error loading apartment details: ${error.message}</p>`;
    }
  }

  fetchApartmentDetails();

  bookingForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    
    if (!selectedApartment) {
      document.getElementById("message").innerHTML = `<p class="text-red-600">Apartment not found.</p>`;
      return;
    }
    
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const numberOfNights = calculateDays(startDate, endDate);
    const totalPrice = selectedApartment.pricePerNight * numberOfNights;
    
    // Check if dates are valid
    if (new Date(startDate) >= new Date(endDate)) {
      document.getElementById("message").innerHTML = `<p class="text-red-600">End date must be after start date.</p>`;
      return;
    }
    
    // Get logged user ID
    const loggedUserId = localStorage.getItem("loggedUser");
    
    if (!loggedUserId) {
      document.getElementById("message").innerHTML = `<p class="text-red-600">You need to log in first.</p>`;
      return;
    }
    
    try {
      const bookingData = {
        userId: JSON.parse(loggedUserId),
        apartmentId: apartmentId,
        startDate: startDate,
        endDate: endDate,
        status: "pending",
        totalPrice: totalPrice,
        createdAt: new Date().toISOString(),
        pricePerNight: selectedApartment.pricePerNight
      };
      
      const response = await createbook(bookingData);
      
      document.getElementById("message").innerHTML = `
        <p class="text-green-600">Booking Confirmed!</p>
        <p class="mt-2">Total: ₼${totalPrice} for ${numberOfNights} nights</p>
      `;
      
      // Reset form
      bookingForm.reset();
      document.getElementById("totalPriceSection").classList.add("hidden");
    } catch (error) {
      document.getElementById("message").innerHTML = `<p class="text-red-600">Error during booking: ${error.message}</p>`;
    }
  });
});