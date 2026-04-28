function initRating(container) {
    const starsContainer = container.querySelector('.stars');
    if (!starsContainer) return;

    const stars = starsContainer.querySelectorAll('.star');
    const ratingValueSpan = container.querySelector('.rating-value');
    
    function updateStars(rating) {
        stars.forEach((star, index) => {
            const starValue = index + 1;
            if (starValue <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
        ratingValueSpan.textContent = `${rating}/10`;
        starsContainer.setAttribute('data-rating', rating);
    }

    const itemName = container.getAttribute('data-item');
    if (itemName) {
        const savedRating = localStorage.getItem(`rating_${itemName}`);
        if (savedRating) {
            updateStars(parseInt(savedRating));
        }
    }

    stars.forEach((star, index) => {
        const ratingValue = index + 1;
        
        star.addEventListener('click', function(e) {
            e.stopPropagation();
            updateStars(ratingValue);
            if (itemName) {
                localStorage.setItem(`rating_${itemName}`, ratingValue);
            }
        });
        
        star.addEventListener('mouseenter', function() {
            stars.forEach((s, i) => {
                if (i + 1 <= ratingValue) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
    
    starsContainer.addEventListener('mouseleave', function() {
        const currentRating = parseInt(starsContainer.getAttribute('data-rating')) || 0;
        stars.forEach((star, index) => {
            if (index + 1 <= currentRating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    });
}

const ratingContainers = document.querySelectorAll('.rating-container');
ratingContainers.forEach(container => {
    initRating(container);
});