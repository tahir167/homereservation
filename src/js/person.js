import { getAllUsers } from "../services/users/request.js";

document.addEventListener("DOMContentLoaded", async function () {
    const loggedUserId = JSON.parse(localStorage.getItem("loggedUser"));
    const personDetail = document.querySelector(".persondetail");

    if (!loggedUserId) {
        // Redirect to login if no user is logged in
        window.location.href = "login.html";
        return;
    }

    try {
        // Get all users
        const response = await getAllUsers();
        
        // Find the specific user that matches the logged in user ID
        const userData = response.find(user => user.id === loggedUserId);
        
        // Check if user data exists
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
                        <span class="text-gray-800">••••••••</span>
                    </div>
                    
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 font-semibold">Balance:</span>
                        <span class="text-green-600 font-bold">${userData.balance} $</span>
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

            // Add event listener for the edit button
            const editBtn = document.getElementById("editProfileBtn");
            if (editBtn) {
                editBtn.addEventListener("click", function() {
                    // Redirect to edit profile page or show edit form
                    // window.location.href = "edit-profile.html";
                    alert("Edit profile functionality will be implemented soon!");
                });
            }
        } else {
            personDetail.innerHTML = `
            <div class="bg-white shadow-2xl rounded-3xl max-w-md w-full p-6 sm:p-8 text-center">
                <p class="text-red-500">İstifadəçi tapılmadı. Zəhmət olmasa yenidən daxil olun.</p>
                <button class="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition duration-300 shadow-md">
                    <a href="login.html">Login</a>
                </button>
            </div>
            `;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        personDetail.innerHTML = `
        <div class="bg-white shadow-2xl rounded-3xl max-w-md w-full p-6 sm:p-8 text-center">
            <p class="text-red-500">Xəta baş verdi! İstifadəçi məlumatları yüklənə bilmədi.</p>
        </div>
        `;
    }
});