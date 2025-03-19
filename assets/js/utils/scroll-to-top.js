document.addEventListener('DOMContentLoaded', function() {
    const topLink = document.querySelector('a.top');

    if (topLink) {
        topLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});