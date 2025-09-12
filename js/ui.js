const modal = document.getElementById('detail-modal');
const modalContent = document.getElementById('modal-content');

export function showSection(sectionId) {
    const sections = document.querySelectorAll('main > section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
    window.scrollTo(0, 0);
    document.getElementById('mobile-menu').classList.add('hidden');
}

export function showDetailModal(contentHtml) {
    modalContent.innerHTML = contentHtml;
    modal.style.display = 'flex';
}

export function initModal() {
    document.getElementById('close-modal-btn').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    modal.addEventListener('click', (e) => {
        if (e.target.id === 'detail-modal') {
            modal.style.display = 'none';
        }
    });
}