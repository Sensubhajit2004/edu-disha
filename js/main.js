import { showSection, initModal } from './ui.js';
import { initAuth } from './auth.js';
import { initQuiz } from './quiz.js';
import { initColleges, listenForCollegeUpdates } from './colleges.js';
import { initCareers } from './careers.js';
import { initDashboard } from './dashboard.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules that set up event listeners or initial content
    initModal();
    initAuth();
    initQuiz();
    initColleges();
    initCareers();
    initDashboard();

    // Start listening for real-time college updates from Firestore
    listenForCollegeUpdates();

    // Setup Navigation event listeners
    document.getElementById('home-link').addEventListener('click', (e) => { e.preventDefault(); showSection('home-section'); });
    document.querySelectorAll('#nav-colleges, #mobile-nav-colleges').forEach(el => el.addEventListener('click', (e) => { e.preventDefault(); showSection('colleges-section'); }));
    document.querySelectorAll('#nav-careers, #mobile-nav-careers').forEach(el => el.addEventListener('click', (e) => { e.preventDefault(); showSection('careers-section'); }));
    document.querySelectorAll('#nav-quiz, #mobile-nav-quiz, #start-quiz-btn').forEach(el => el.addEventListener('click', (e) => { e.preventDefault(); showSection('quiz-section'); }));
    document.querySelectorAll('#nav-dashboard, #mobile-nav-dashboard').forEach(el => el.addEventListener('click', (e) => { e.preventDefault(); showSection('dashboard-section'); }));
    
    document.getElementById('explore-colleges-btn').addEventListener('click', () => showSection('colleges-section'));
    document.getElementById('go-home-btn').addEventListener('click', () => showSection('home-section'));
    document.getElementById('login-back-home-btn').addEventListener('click', () => showSection('home-section'));
    
    document.getElementById('mobile-menu-button').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // Show the initial home section on page load
    showSection('home-section');
});