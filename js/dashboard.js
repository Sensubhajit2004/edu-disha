// js/dashboard.js
import { auth, db } from './firebase-config.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { colleges } from './data.js';
import { showSection } from './ui.js';

const profileForm = document.getElementById('profile-form');
const saveProfileBtn = document.getElementById('save-profile-btn');
const editProfileBtn = document.getElementById('edit-profile-btn');
const formInputs = profileForm.querySelectorAll('input, select');

// --- PROFILE FORM MANAGEMENT ---

// Function to enable editing of the profile form
function enableProfileEditing() {
    formInputs.forEach(input => {
        input.disabled = false;
    });
    saveProfileBtn.classList.remove('hidden');
    editProfileBtn.classList.add('hidden');
}

// Function to disable editing of the profile form
function disableProfileEditing() {
    formInputs.forEach(input => {
        input.disabled = true;
    });
    saveProfileBtn.classList.add('hidden');
    editProfileBtn.classList.remove('hidden');
}

// --- FIRESTORE FUNCTIONS ---

// Function to save a college to the user's list in Firestore.
export async function saveCollege(collegeId) {
    const user = auth.currentUser;
    if (!user || user.isAnonymous) {
        showSection('login-section');
        document.getElementById('detail-modal').style.display = 'none';
        return;
    }

    const userDocRef = doc(db, "students", user.uid);
    const saveBtn = document.getElementById('save-college-btn');
    if (!saveBtn) return;
    
    saveBtn.disabled = true;

    try {
        const docSnap = await getDoc(userDocRef);
        let savedColleges = [];
        if (docSnap.exists() && docSnap.data().savedColleges) {
            savedColleges = docSnap.data().savedColleges;
        }

        if (!savedColleges.includes(collegeId)) {
            savedColleges.push(collegeId);
            await setDoc(userDocRef, { savedColleges }, { merge: true });
            saveBtn.textContent = 'Saved!';
            loadStudentDashboard(user.uid);
        } else {
            saveBtn.textContent = 'Already Saved';
        }
    } catch (error) {
        console.error("Error saving college: ", error);
        saveBtn.textContent = 'Error!';
    }

    setTimeout(() => {
        document.getElementById('detail-modal').style.display = 'none';
    }, 1200);
}

// Function to remove a college from the saved list
async function removeSavedCollege(collegeId) {
    const user = auth.currentUser;
    if (!user || user.isAnonymous) return;

    const userDocRef = doc(db, "students", user.uid);
    try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            let savedColleges = docSnap.data().savedColleges || [];
            const updatedColleges = savedColleges.filter(id => id !== collegeId);
            await setDoc(userDocRef, { savedColleges: updatedColleges }, { merge: true });
            loadStudentDashboard(user.uid);
        }
    } catch (error) {
        console.error("Error removing college:", error);
    }
}

// Main function to load all dashboard data from Firestore
export async function loadStudentDashboard(userId) {
    if (!userId) return;

    const userDocRef = doc(db, "students", userId);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById('student-name').value = data.name || '';
        document.getElementById('student-age').value = data.age || '';
        document.getElementById('student-gender').value = data.gender || '';
        document.getElementById('student-location').value = data.location || '';

        const savedCollegesList = document.getElementById('saved-colleges-list');
        if (data.savedColleges && data.savedColleges.length > 0) {
            savedCollegesList.innerHTML = '';
            data.savedColleges.forEach(collegeId => {
                const college = colleges.find(c => c.id === collegeId);
                if (college) {
                    const collegeEl = document.createElement('div');
                    collegeEl.className = 'bg-slate-100 p-3 rounded-lg flex justify-between items-center';
                    collegeEl.innerHTML = `
                        <div>
                            <p class="font-semibold">${college.name}</p>
                            <p class="text-sm text-slate-500">${college.location}</p>
                        </div>
                        <button class="text-red-500 hover:text-red-700 text-sm font-medium">Remove</button>`;
                    collegeEl.querySelector('button').addEventListener('click', () => removeSavedCollege(collegeId));
                    savedCollegesList.appendChild(collegeEl);
                }
            });
        } else {
            savedCollegesList.innerHTML = '<p class="text-slate-500">You haven\'t saved any colleges yet.</p>';
        }
    } else {
         document.getElementById('saved-colleges-list').innerHTML = '<p class="text-slate-500">You haven\'t saved any colleges yet. Save your profile to get started!</p>';
    }
    
    // Ensure the form is not editable on load
    disableProfileEditing();
}

// Sets up the event listeners for the dashboard buttons
export function initDashboard() {
    editProfileBtn.addEventListener('click', enableProfileEditing);
    
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user) return;

        const profileData = {
            name: document.getElementById('student-name').value,
            age: document.getElementById('student-age').value,
            gender: document.getElementById('student-gender').value,
            location: document.getElementById('student-location').value
        };

        saveProfileBtn.textContent = 'Saving...';
        saveProfileBtn.disabled = true;

        try {
            await setDoc(doc(db, "students", user.uid), profileData, { merge: true });
            saveProfileBtn.textContent = 'Profile Saved!';
            // After saving successfully, disable the form again
            disableProfileEditing();
            setTimeout(() => { 
                saveProfileBtn.textContent = 'Save Changes';
                saveProfileBtn.disabled = false;
            }, 2000);
        } catch (error) {
            console.error("Error saving profile: ", error);
            saveProfileBtn.textContent = 'Error Saving!';
             setTimeout(() => {
                saveProfileBtn.textContent = 'Save Changes';
                saveProfileBtn.disabled = false;
            }, 2000);
        }
    });
}
