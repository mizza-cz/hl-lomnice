const topstoryNavItems = document.querySelectorAll('.topstory-nav-item');

for (const item of topstoryNavItems) {
    item.addEventListener('mouseenter', (e) => {
        currentId = e.target.dataset.topstory;

        document.querySelector('.topstory-nav-item.on').classList.remove('on');
        e.target.classList.add('on');

        document.querySelector('.topstory-article.on').classList.remove('on');

        document.querySelector(`#topstory-article-${currentId}`).classList.add('on');
    });
}
