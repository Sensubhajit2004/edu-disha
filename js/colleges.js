import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { db } from './firebase-config.js';
import { showDetailModal, showSection } from './ui.js';
import { saveCollege } from './dashboard.js';

// This will hold the college data fetched from Firestore
let allColleges = [];

const collegeList = document.getElementById('college-list');
const noCollegesFound = document.getElementById('no-colleges-found');

function displayColleges(collegesToDisplay) {
    if (!collegeList || !noCollegesFound) return;

    collegeList.innerHTML = '';
    noCollegesFound.classList.toggle('hidden', collegesToDisplay.length > 0);
    collegeList.classList.toggle('hidden', collegesToDisplay.length === 0);

    collegesToDisplay.forEach(college => {
        // --- Defensive Check ---
        // This ensures that we don't try to render a college with missing essential data.
        if (!college || !college.name || !college.location || !college.streams || !college.image) {
            console.warn('Skipping rendering for malformed college object:', college);
            return; // Skip this iteration and move to the next college
        }

        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer';
        card.innerHTML = `
            <img src="${college.image}" alt="${college.name}" class="w-full h-48 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/600x400/e2e8f0/94a3b8?text=Image+Not+Found';">
            <div class="p-6">
                <h3 class="text-xl font-bold mb-1">${college.name}</h3>
                <p class="text-slate-500 mb-4">${college.location}</p>
                <div class="flex flex-wrap gap-2">${college.streams.map(s => `<span class="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full">${s}</span>`).join('')}</div>
            </div>`;
        card.addEventListener('click', () => showCollegeDetails(college.id));
        collegeList.appendChild(card);
    });
}

window.showCollegeDetails = function(id) {
    const college = allColleges.find(c => c.id === id);
    if (!college) return;

    // Helper functions to create contact info HTML only if data exists
    const websiteHtml = college.website ? `<div><h4 class="font-semibold text-slate-800">Website:</h4><a href="http://${college.website}" target="_blank" class="text-indigo-600 hover:underline">${college.website}</a></div>` : '';
    const emailHtml = college.email ? `<div><h4 class="font-semibold text-slate-800">Email:</h4><a href="mailto:${college.email}" class="text-indigo-600 hover:underline">${college.email}</a></div>` : '';
    const contactHtml = college.contact_numbers && college.contact_numbers.length > 0 ? `<div><h4 class="font-semibold text-slate-800">Contact:</h4><p class="text-slate-600">${college.contact_numbers.join(', ')}</p></div>` : '';

    const content = `
        <img src="${college.image}" alt="${college.name}" class="w-full h-60 object-cover rounded-t-xl -mt-8 -mx-8 md:-mt-10 md:-mx-10" onerror="this.onerror=null;this.src='https://placehold.co/600x400/e2e8f0/94a3b8?text=Image+Not+Found';">
        <div class="pt-6">
            <h2 class="text-3xl font-bold mb-2">${college.name}</h2>
            <p class="text-lg text-slate-500 mb-6">${college.location}</p>
            <div class="space-y-4">
                <div><h4 class="font-semibold text-slate-800">Available Streams:</h4><div class="flex flex-wrap gap-2 mt-2">${college.streams.map(s => `<span class="bg-indigo-100 text-indigo-800 font-medium px-3 py-1 rounded-full">${s}</span>`).join('')}</div></div>
                <div><h4 class="font-semibold text-slate-800">Major Courses:</h4><p class="text-slate-600">${college.courses.join(', ')}</p></div>
                ${websiteHtml}
                ${emailHtml}
                ${contactHtml}
            </div>
            <div class="mt-8 text-center">
                <button id="save-college-btn" class="primary-button">Save to My List</button>
            </div>
        </div>`;
    showDetailModal(content);
    document.getElementById('save-college-btn').addEventListener('click', () => saveCollege(college.id));
}

export function filterAndDisplayColleges() {
    const searchTerm = document.getElementById('college-search').value.toLowerCase();
    const location = document.getElementById('location-filter').value;
    const stream = document.getElementById('stream-filter').value;
    const filtered = allColleges.filter(c =>
        c.name.toLowerCase().includes(searchTerm) &&
        (!location || c.location === location) &&
        (!stream || c.streams.includes(stream))
    );
    displayColleges(filtered);
}

function populateFilters() {
    const locationFilter = document.getElementById('location-filter');
    const streamFilter = document.getElementById('stream-filter');

    if (locationFilter && streamFilter) {
        const locations = [...new Set(allColleges.map(c => c.location))].sort();
        const streams = [...new Set(allColleges.flatMap(c => c.streams))].sort();

        locationFilter.innerHTML = '<option value="">All Locations</option>' + locations.map(loc => `<option value="${loc}">${loc}</option>`).join('');
        streamFilter.innerHTML = '<option value="">All Streams</option>' + streams.map(s => `<option value="${s}">${s}</option>`).join('');
    }
}

export function initColleges() {
    // Initial display can be empty or show a loading state
    displayColleges([]);
    
    document.getElementById('college-search').addEventListener('input', filterAndDisplayColleges);
    document.getElementById('location-filter').addEventListener('change', filterAndDisplayColleges);
    document.getElementById('stream-filter').addEventListener('change', filterAndDisplayColleges);
}

export function listenForCollegeUpdates() {
    const collegesCollection = collection(db, 'colleges');
    onSnapshot(collegesCollection, (snapshot) => {
        let collegesData = [];
        snapshot.forEach(doc => {
            collegesData.push({ ...doc.data(), id: doc.id });
        });
        
        allColleges = collegesData.sort((a,b) => a.name.localeCompare(b.name));
        
        displayColleges(allColleges);
        populateFilters();
    }, (error) => {
        console.error("Error fetching real-time college updates: ", error);
        noCollegesFound.textContent = 'Could not load college data. Please check your connection or contact support.';
        noCollegesFound.classList.remove('hidden');
    });
}