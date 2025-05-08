import { createbook } from "../services/book/request.js";
import { getAllApartments } from "../services/apartments/request.js";
document.addEventListener("DOMContentLoaded", function () {
  const bookingForm = document.getElementById("bookingForm");
  const apartmentId = new URLSearchParams(window.location.search).get("id")
  bookingForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const apartmentResponse = await getAllApartments();
    const selectedApartment = apartmentResponse.data.find(ap => ap.id === apartmentId);
    
    if (!selectedApartment) {
      document.getElementById("message").innerHTML = `<p>Apartment not found.</p>`;
      return;
    }
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    
   
    const loggedUserId = JSON.parse(localStorage.getItem("loggedUser"));
    
    console.log(apartmentId)
    if (!loggedUserId) {
      document.getElementById("message").innerHTML = `<p>You need to log in first.</p>`;
      return;
    }else{

        try {
            const response = await createbook({
                userId: loggedUserId,
                apartmentId: apartmentId,
                startDate: startDate,
                endDate: endDate,
                status: "pending", 
                createdAt: new Date().toISOString(),
                pricePerNight: selectedApartment.pricePerNight // <-- əlavə etdik 
              });
    
          document.getElementById("message").innerHTML = `<p>Booking Confirmed: ${response.data.title}</p>`;
        } catch (error) {
          document.getElementById("message").innerHTML = `<p>Error during booking: ${error.message}</p>`;
        }
    }

  });
});
