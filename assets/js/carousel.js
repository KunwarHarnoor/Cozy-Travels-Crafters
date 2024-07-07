let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

let autoSlideInterval = 5000; // Interval time in milliseconds
let autoSlideTimer;
let unAcceppClick;

// Function to show the next or previous slide
const showSlider = (type) => {
    console.log(`Changing slide: ${type}`); // Debugging log
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');

    if (type === 'next') {
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    } else {
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }

    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(() => {
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000);

    resetAutoSlide(); // Restart the auto-slide timer after manual navigation
};

// Function to start automatic slide change
const startAutoSlide = () => {
    console.log('Starting auto-slide'); // Debugging log
    autoSlideTimer = setInterval(() => {
        showSlider('next');
    }, autoSlideInterval);
};

// Function to reset the auto-slide interval after manual interaction
const resetAutoSlide = () => {
    console.log('Resetting auto-slide timer'); // Debugging log
    clearInterval(autoSlideTimer);
    startAutoSlide();
};

// Attach event listeners to buttons for manual navigation
nextButton.onclick = function() {
    console.log('Next button clicked'); // Debugging log
    showSlider('next');
};

prevButton.onclick = function() {
    console.log('Prev button clicked'); // Debugging log
    showSlider('prev');
};

// Attach event listeners to "See More" buttons
seeMoreButtons.forEach((button) => {
    button.onclick = function() {
        console.log('See More button clicked'); // Debugging log
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
        clearInterval(autoSlideTimer); // Pause automatic sliding in detailed view
    }
});

// Attach event listener to "Back" button to return to the main carousel view
backButton.onclick = function() {
    console.log('Back button clicked'); // Debugging log
    carousel.classList.remove('showDetail');
    startAutoSlide(); // Resume automatic sliding after exiting detailed view
};

// Start the automatic slide change when the page loads
startAutoSlide();
