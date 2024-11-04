document.addEventListener('DOMContentLoaded', function() {
    // Select all divs with the data-bg-img attribute
    const bgDivs = document.querySelectorAll('[data-bg-img]');
    
    // Iterate over each div and set the background image
    bgDivs.forEach(div => {
        const bgImg = div.getAttribute('data-bg-img');
        
        if (bgImg) {
            // Set both the background image and gradient
            div.style.background = `url(${bgImg})`;
            div.style.backgroundSize = 'cover'; // Ensure both layers cover the div
            div.style.backgroundPosition = 'center'; // Center the image
            div.style.zIndex = '999'; // Optional: Adjust the stacking order
        }
    });
});
