document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.diag').forEach((el) => {
        const file = el.getAttribute('data-src');
        if (!file) return;

        fetch(file)
            .then((res) => res.text())
            .then((data) => {
                el.textContent = data; // Safe insertion avoiding innerHTML
            })
            .catch((err) => console.error('Error loading file:', err));
    });
});