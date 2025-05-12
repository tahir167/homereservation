import { getAllUsers } from "../services/users/request.js";
import { getAllbook } from "../services/book/request.js";
import { getAllApartments } from "../services/apartments/request.js";

document.addEventListener("DOMContentLoaded", async function () {
    const loggedUserId = JSON.parse(localStorage.getItem("loggedUser"));
    const personDetail = document.querySelector(".persondetail");
    const bookUl = document.querySelector(".bookul");

    if (!loggedUserId) {
        window.location.href = "login.html";
        return;
    }

    try {
        const users = await getAllUsers();
        const userData = users.find(user => user.id === loggedUserId);

        if (userData) {
            personDetail.innerHTML = `
                <div class="bg-white shadow-2xl rounded-3xl max-w-md w-full p-6 sm:p-8">
                    <div class="flex flex-col items-center text-center">
                        <img src="${userData.profileImage || '/src/assets/default-avatar.png'}" 
                             alt="Profile image" 
                             class="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md mb-4">
                        <h2 class="text-2xl font-bold text-gray-800 mb-1">${userData.username}</h2>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="flex justify-between items-center border-b pb-2">
                            <span class="text-gray-600 font-semibold">Email:</span>
                            <span class="text-gray-800">${userData.email}</span>
                        </div>
                        
                        <div class="flex justify-between items-center border-b pb-2">
                            <span class="text-gray-600 font-semibold">Password:</span>
                            <span class="text-gray-800">${userData.password}</span>
                        </div>
                        
 

                        <div class="flex justify-between items-center">
                            <span class="text-gray-600 font-semibold">Role:</span>
                            <span class="text-blue-600 font-bold">${userData.role}</span>
                        </div>
                    </div>
                    
                    <div class="mt-6 text-center">
                        <button id="editProfileBtn" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition duration-300 shadow-md">
                            Redaktə Et
                        </button>
                    </div>
                </div>
            `;

            document.getElementById("editProfileBtn").addEventListener("click", () => {
                alert("Edit profile functionality will be implemented soon!");
            });

        } else {
            personDetail.innerHTML = `<p class="text-red-500">İstifadəçi tapılmadı.</p>`;
        }

        const bookings = await getAllbook();
        const apartments = await getAllApartments();

        const userBookings = bookings.data.filter(b => b.userId == loggedUserId);

        if (userBookings.length > 0) {
            userBookings.forEach(book => {
                const apartment = apartments.data.find(a => a.id == book.apartmentId);

                bookUl.innerHTML += `
                    <li class="flex items-center gap-4 bg-white shadow-md p-4 rounded-lg">
                        <img class="w-14 h-14 rounded-full object-cover border-2 border-blue-500" src="${apartment?.coverImage || '/src/assets/default-cover.jpg'}" alt="Apartment">
                        <div>
                            <p class="text-lg font-semibold text-gray-800">${book.totalPrice} $</p>
                            <p class="text-gray-600 text-sm">${apartment?.title || 'Məlumat yoxdur'}</p>
                        </div>
                    </li>
                `;
            });
        } else {
            bookUl.innerHTML = `<p class="text-gray-500">Heç bir sifariş tapılmadı.</p>`;
        }

    } catch (error) {
        console.error("Xəta baş verdi:", error);
        personDetail.innerHTML = `<p class="text-red-500">Məlumatlar yüklənərkən xəta baş verdi.</p>`;
    }
});
