import { createbook, getAllbook } from "../services/book/request.js";
import { getAllApartments } from "../services/apartments/request.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  const apartmentId = new URLSearchParams(window.location.search).get("id");
  const startInput = document.getElementById("startDate");
  const endInput = document.getElementById("endDate");
  const messageBox = document.getElementById("message");
  const totalPriceEl = document.getElementById("totalPrice");
  const totalPriceSection = document.getElementById("totalPriceSection");

  let selectedApartment = null;
  let allBookings = [];

  const calculateDays = (start, end) => {
    const diff = new Date(end) - new Date(start);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const updatePrice = () => {
    const start = startInput.value;
    const end = endInput.value;

    if (selectedApartment && start && end) {
      const nights = calculateDays(start, end);
      const total = selectedApartment.pricePerNight * nights;

      totalPriceEl.textContent = `₼${total} (${nights} nights at ₼${selectedApartment.pricePerNight}/night)`;
      totalPriceSection.classList.remove("hidden");
    }
  };

  const isOverlapping = (s1, e1, s2, e2) => {
    return new Date(s1) <= new Date(e2) && new Date(s2) <= new Date(e1);
  };

  const isAvailable = (start, end) => {
    const bookings = allBookings.filter(b => b.apartmentId === apartmentId && b.status !== "cancelled");
    return !bookings.some(b => isOverlapping(start, end, b.startDate, b.endDate));
  };

  const loadData = async () => {
    try {
      const apartments = await getAllApartments();
      selectedApartment = apartments.data.find(a => a.id === apartmentId);

      if (!selectedApartment) {
        messageBox.innerHTML = `<p class="text-red-600">Apartment not found.</p>`;
        return;
      }

      const bookings = await getAllbook();
      allBookings = bookings.data || [];

      document.getElementById("apartmentTitle").textContent = selectedApartment.title;
      document.getElementById("pricePerNight").textContent = `₼${selectedApartment.pricePerNight} per night`;

      const today = new Date().toISOString().split("T")[0];
      startInput.min = endInput.min = today;

      startInput.addEventListener("change", updatePrice);
      endInput.addEventListener("change", updatePrice);
    } catch (err) {
      messageBox.innerHTML = `<p class="text-red-600">Error: ${err.message}</p>`;
    }
  };

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const start = startInput.value;
    const end = endInput.value;
    const userId = JSON.parse(localStorage.getItem("loggedUser"));

    if (!selectedApartment) return (messageBox.innerHTML = `<p class="text-red-600">Apartment not found.</p>`);
    if (!userId) return (messageBox.innerHTML = `<p class="text-red-600">You need to log in first.</p>`);
    if (new Date(start) >= new Date(end)) {
      return (messageBox.innerHTML = `<p class="text-red-600">End date must be after start date.</p>`);
    }
    if (!isAvailable(start, end)) {
      return (messageBox.innerHTML = `
        <p class="text-red-600">This apartment is not available for the selected dates.</p>
        <p class="mt-2">Please choose different dates.</p>
      `);
    }

    const nights = calculateDays(start, end);
    const total = selectedApartment.pricePerNight * nights;

    const booking = {
      userId,
      apartmentId,
      startDate: start,
      endDate: end,
      status: "pending",
      totalPrice: total,
      pricePerNight: selectedApartment.pricePerNight,
      createdAt: new Date().toISOString()
    };

    try {
      await createbook(booking);
      messageBox.innerHTML = `
        <p class="text-green-600">Booking Confirmed!</p>
        <p class="mt-2">Total: ₼${total} for ${nights} nights</p>
      `;
      form.reset();
      totalPriceSection.classList.add("hidden");
    } catch (err) {
      messageBox.innerHTML = `<p class="text-red-600">Booking failed: ${err.message}</p>`;
    }
  });

  loadData();
});
