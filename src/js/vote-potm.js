const form = document.querySelector('#potm-form');

function showToast(data) {
    const toast = document.createElement('div');
    toast.classList.add('toast', data.success ? 'success' : 'failed');

    const message = document.createElement('p');
    message.textContent = data.message;

    toast.appendChild(message);

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('disappear');
    }, 3000);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(e.target.getAttribute('action'), {
        method: e.target.getAttribute('method'),
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => showToast(data));
});
