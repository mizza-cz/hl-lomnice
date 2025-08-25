const tables = document.querySelectorAll('.typo table');
const images = document.querySelectorAll('.typo img');
const iframes = document.querySelectorAll('.typo iframe');

export function typo() {
    // wrap tables
    if (tables.length) {
        for (const table of tables) {
            const wrapper = document.createElement('div');
            wrapper.style.overflowX = 'auto';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    }

    // add lazyloading on images
    if (images.length) {
        for (const image of images) {
            image.loading = 'lazy';
        }
    }

    // add lazyloading on iframes
    if (iframes.length) {
        for (const iframe of iframes) {
            iframe.loading = 'lazy';
        }
    }
}
