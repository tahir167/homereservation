import { createbook } from "../services/book/request";

document.addEventListener("DOMContentLoaded", function () {
  const bookingForm = document.getElementById("bookingForm");
    const btnBook = document.getElementById("bookId")
  bookingForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    
   
    const loggedUserId = JSON.parse(localStorage.getItem("loggedUser"));
    const apartmentId = btnBook.setAttribute("data-id")
    
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
                createdAt: new Date().toISOString() 
              });
    
          document.getElementById("message").innerHTML = `<p>Booking Confirmed: ${response.data.title}</p>`;
        } catch (error) {
          document.getElementById("message").innerHTML = `<p>Error during booking: ${error.message}</p>`;
        }
    }

  });
});
