import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, onSnapshot, addDoc, doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// --- YOUR FIREBASE CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyCQiFMWRmvP46kHgbf9E2Pr3nSctGQWe7A",
  authDomain: "edudisha-webapp.firebaseapp.com",
  projectId: "edudisha-webapp",
  storageBucket: "edudisha-webapp.firebasestorage.app",
  messagingSenderId: "404187603792",
  appId: "1:404187603792:web:cc86b74b1bb8f9968e0255",
  measurementId: "G-NZRN2KGCWV"
};
// --- END OF CONFIG AREA ---

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const adminContainer = document.getElementById('admin-container');
const authGate = document.getElementById('auth-gate');
const collegeForm = document.getElementById('college-form');
const collegeListContainer = document.getElementById('college-list-container');
const formStatus = document.getElementById('form-status');
const cancelBtn = document.getElementById('cancel-btn');

// --- SECURITY CHECK ---
onAuthStateChanged(auth, user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            if (idTokenResult.claims.admin) {
                authGate.classList.add('hidden');
                adminContainer.classList.remove('hidden');
                listenForColleges();
            } else {
                showAccessDenied();
            }
        });
    } else {
        showAccessDenied();
    }
});

function showAccessDenied() {
    adminContainer.classList.add('hidden');
    authGate.classList.remove('hidden');
}

// --- DATA HANDLING ---
function listenForColleges() {
    const collegesCollection = collection(db, 'colleges');
    onSnapshot(collegesCollection, (snapshot) => {
        const colleges = [];
        snapshot.forEach(doc => {
            colleges.push({ id: doc.id, ...doc.data() });
        });
        renderCollegeList(colleges.sort((a, b) => a.name.localeCompare(b.name)));
    }, error => {
        console.error("Error fetching colleges: ", error);
        collegeListContainer.innerHTML = `<p class="text-red-500">Error loading college data.</p>`;
    });
}

function renderCollegeList(colleges) {
    if (colleges.length === 0) {
        collegeListContainer.innerHTML = `<p class="text-slate-500">No colleges found. Add one using the form.</p>`;
        return;
    }
    collegeListContainer.innerHTML = colleges.map(college => `
        <div class="bg-slate-50 p-4 rounded-lg flex justify-between items-center border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all duration-200">
            <div>
                <p class="font-semibold text-slate-800">${college.name}</p>
                <p class="text-sm text-slate-500">${college.location}</p>
            </div>
            <div class="flex gap-3">
                <button data-id="${college.id}" class="edit-btn text-sm font-medium text-indigo-600 hover:text-indigo-800">Edit</button>
                <button data-id="${college.id}" class="delete-btn text-sm font-medium text-red-600 hover:text-red-800">Delete</button>
            </div>
        </div>
    `).join('');
}

// --- EVENT LISTENERS ---
collegeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const collegeId = document.getElementById('college-id').value;
    const stringToArray = (str) => str ? str.split(',').map(item => item.trim()).filter(Boolean) : [];
    
    const collegeData = {
        name: document.getElementById('college-name').value,
        location: document.getElementById('college-location').value,
        streams: stringToArray(document.getElementById('college-streams').value),
        courses: stringToArray(document.getElementById('college-courses').value),
        contact_numbers: stringToArray(document.getElementById('college-contact').value),
        website: document.getElementById('college-website').value,
        email: document.getElementById('college-email').value,
        cutoff: document.getElementById('college-cutoff').value,
        facilities: stringToArray(document.getElementById('college-facilities').value),
        image: document.getElementById('college-image').value,
        lastUpdated: serverTimestamp()
    };

    formStatus.textContent = 'Submitting...';
    formStatus.style.color = 'blue';

    try {
        if (collegeId) {
            await updateDoc(doc(db, "colleges", collegeId), collegeData);
            formStatus.textContent = 'College updated successfully!';
            formStatus.style.color = 'green';
        } else {
            // Logic to check if a college with the same name already exists
            const querySnapshot = await getDocs(collection(db, "colleges"));
            const existingCollege = querySnapshot.docs.find(doc => doc.data().name.toLowerCase() === collegeData.name.toLowerCase());
            if (existingCollege) {
                formStatus.textContent = 'A college with this name already exists.';
                formStatus.style.color = 'red';
            } else {
                await addDoc(collection(db, "colleges"), collegeData);
                formStatus.textContent = 'College added successfully!';
                formStatus.style.color = 'green';
            }
        }
    } catch (error) {
        console.error("Error submitting form: ", error);
        formStatus.textContent = 'An error occurred. Please try again.';
        formStatus.style.color = 'red';
    }
    
    if (formStatus.textContent.includes('successfully')) {
       resetForm();
    }
    setTimeout(() => { formStatus.textContent = ''; }, 3000);
});

collegeListContainer.addEventListener('click', async (e) => {
    const target = e.target;
    const collegeId = target.dataset.id;
    if (!collegeId) return;

    if (target.classList.contains('edit-btn')) {
        const docRef = doc(db, "colleges", collegeId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            populateFormForEdit(collegeId, docSnap.data());
        }
    }

    if (target.classList.contains('delete-btn')) {
        if (confirm('Are you sure you want to delete this college?')) {
            try {
                await deleteDoc(doc(db, "colleges", collegeId));
            } catch (error) {
                console.error("Error deleting document: ", error);
                alert("There was an error deleting the college.");
            }
        }
    }
});

cancelBtn.addEventListener('click', resetForm);

// --- HELPER FUNCTIONS ---
function populateFormForEdit(id, data) {
    document.getElementById('college-id').value = id;
    document.getElementById('college-name').value = data.name || '';
    document.getElementById('college-location').value = data.location || '';
    document.getElementById('college-streams').value = (data.streams || []).join(', ');
    document.getElementById('college-courses').value = (data.courses || []).join(', ');
    document.getElementById('college-contact').value = (data.contact_numbers || []).join(', ');
    document.getElementById('college-website').value = data.website || '';
    document.getElementById('college-email').value = data.email || '';
    document.getElementById('college-cutoff').value = data.cutoff || '';
    document.getElementById('college-facilities').value = (data.facilities || []).join(', ');
    document.getElementById('college-image').value = data.image || '';

    document.getElementById('form-title').textContent = 'Edit College';
    document.getElementById('submit-btn').textContent = 'Update College';
    cancelBtn.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
    collegeForm.reset();
    document.getElementById('college-id').value = '';
    document.getElementById('form-title').textContent = 'Add New College';
    document.getElementById('submit-btn').textContent = 'Add College';
    cancelBtn.classList.add('hidden');
}