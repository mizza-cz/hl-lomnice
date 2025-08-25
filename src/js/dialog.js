export function handleDialog() {
    const dialog = document.querySelector('#cover');

    if (!dialog) return;

    const id = dialog?.dataset.id;
    const permanent = dialog?.dataset.permanent;
    const localStorageId = localStorage.getItem('cover-id');

    if (id === localStorageId && permanent === 'false') return;

    dialog.showModal();
    document.body.classList.add('overflow-hidden');

    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.remove();
            document.body.classList.remove('overflow-hidden');
        }
    });

    window.addEventListener('keydown', (e) => {
        // Esc key pressed
        if (e.key === 'Escape') {
            dialog.remove();
            document.body.classList.remove('overflow-hidden');
        }
    });

    const closeButton = document.querySelector('[data-cover-close]');

    closeButton.addEventListener('click', () => {
        localStorage.setItem('cover-id', id);
        dialog.remove();
        document.body.classList.remove('overflow-hidden');
    });
}
