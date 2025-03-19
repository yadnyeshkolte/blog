document.addEventListener('DOMContentLoaded', function() {
    const emailButton = document.querySelector('.email-button');

    if (emailButton) {
        emailButton.addEventListener('click', function() {
            const email = this.getAttribute('data-email');
            navigator.clipboard.writeText(email).then(function() {
                alert('Email copied to clipboard!');
            }, function(err) {
                console.error('Could not copy email: ', err);
            });
        });
    }
});