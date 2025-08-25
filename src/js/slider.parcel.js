import { tns } from 'tiny-slider';

const matches = document.querySelector('#matches-slider');

if (matches) {
    const currentMatch = Array.from(matches.children).indexOf(matches.querySelector('[aria-current="true"]'));
    const start = currentMatch === -1 ? 0 : currentMatch;

    new tns({
        container: matches,
        nav: false,
        loop: false,
        controls: false,
        startIndex: start,
        mouseDrag: true,
        items: 1.1,
        responsive: {
            768: {
                items: 2,
            },
            1194: {
                items: 3,
            },
        },
    });
}

const partners = document.querySelector('.partners-slider');

if (partners) {
    new tns({
        container: partners,
        nav: false,
        mouseDrag: false,
        touch: false,
        loop: true,
        controls: false,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        gutter: 40,
        slideBy: 1,
        speed: 1000,
        items: 2,
        responsive: {
            768: {
                items: 4,
            },
            1200: {
                items: 6,
            },
        },
    });
}
