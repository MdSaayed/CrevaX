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



// faq
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', event => {
        const faqItem = item.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-toggle-icon i');
        icon.style.transition = 'transform 300ms ease-in-out';

        // Toggle the answer visibility
        if (answer.classList.contains('max-h-0')) {
            answer.classList.remove('max-h-0');
            answer.classList.add('max-h-screen');
            icon.style.transform = 'rotate(180deg)';
        } else {
            answer.classList.remove('max-h-screen');
            answer.classList.add('max-h-0');
            icon.style.transform = 'rotate(0deg)';
        }
    });
});


// pricing swither
document.querySelectorAll('.switcher-btn').forEach(button => {
    button.addEventListener('click', () => {
      // Remove 'active' class from all buttons
      document.querySelectorAll('.switcher-btn').forEach(btn => btn.classList.remove('active'));
      
      // Hide all pricing cards by adding 'hidden' class
      document.querySelectorAll('.pricing-cards').forEach(card => card.classList.add('hidden'));
      
      // Add 'active' class to the clicked button
      button.classList.add('active');
      
      // Show the target card by removing 'hidden' class based on data-target
      const targetId = button.getAttribute('data-target');
      document.getElementById(targetId).classList.remove('hidden');
    });
  });



// Select all filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add the 'active' class to the clicked button
    button.classList.add('active');
  });
});

  
// coundown section
function startCounter() {
  const counters = document.querySelectorAll('#stats-section .animated-text');

  counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const increment = target / 100; // Adjust speed (100 steps)

      const updateCounter = () => {
          if (count < target) {
              count += increment;
              counter.textContent = Math.ceil(count);
              requestAnimationFrame(updateCounter); // Smooth animation
          } else {
              counter.textContent = target; // Ensure it ends at the target
          }
      };
      updateCounter();
  });
}

// Trigger the counter when the section is visible
// const section = document.querySelector('#stats-section');
// const observer = new IntersectionObserver(
//   (entries) => {
//       if (entries[0].isIntersecting) {
//           startCounter();
//           observer.disconnect(); // Run only once
//       }
//   },
//   { threshold: 0.5 } // Trigger when 50% visible
// );
// observer.observe(section);

document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('#stats-section');
    if (section) {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    startCounter();
                    observer.disconnect(); // Run only once
                }
            },
            { threshold: 0.5 } // Trigger when 50% visible
        );
        observer.observe(section);
    } else {
        console.error("Element with ID 'stats-section' not found.");
    }
});

  



// signin page tab
const tabButtons = document.querySelectorAll('.tab-button');
const forms = document.querySelectorAll('.auth-form');

// Loop through each tab button
tabButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();

        // Remove 'active' class from all tab buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));

        // Add 'active' class to the clicked button
        button.classList.add('active');

        // Get the target form ID from the data-target attribute
        const targetForm = button.getAttribute('data-target');

        // Show the target form and hide others
        forms.forEach(form => {
            form.classList.toggle('active', form.id === targetForm);
        });
    });
});


console.log("clicked");
