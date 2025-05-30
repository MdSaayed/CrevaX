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
 

// select  faq question
const faqQuestions = document.querySelectorAll('.faq-question');
// Set the first item active by default
const firstAnswer = document.querySelector('.faq-answer.active');
if (firstAnswer) {
    firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px'; // Set height dynamically
}


// Add click event listeners for toggle
faqQuestions.forEach(item => {
    item.addEventListener('click', () => {
        const faqItem = item.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-toggle-icon i');

        // Close other answers
        document.querySelectorAll('.faq-answer').forEach(ans => {
            if (ans !== answer) {
                ans.style.maxHeight = '0';
                ans.classList.remove('active');
            }
        });

        // Reset other icons
        document.querySelectorAll('.faq-toggle-icon i').forEach(icn => {
            if (icn !== icon) {
                icn.classList.remove('active');
            }
        });

        // Toggle the current answer
        if (answer.classList.contains('active')) {
            answer.style.maxHeight = '0'; // Collapse
            answer.classList.remove('active');
            icon.classList.remove('active'); // Rotate back
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px'; // Expand
            answer.classList.add('active');
            icon.classList.add('active'); // Rotate
        }
    });
});


// pricing swither
document.querySelectorAll('.switcher-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class from all buttons
        document.querySelectorAll('.switcher-btn').forEach(btn => btn.classList.remove('active'));
        
        // Hide all pricing cards
        document.querySelectorAll('.pricing-cards').forEach(card => card.style.display = "none");
        
        // Add 'active' class to the clicked button
        button.classList.add('active');
        
        // Show the target card by setting its display style to "grid"
        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).style.display = "grid";
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



// ===================menu=========================================
document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const menuButton = document.querySelector('.fa-bars'); // Menu button
    const closeButton = document.querySelector('.menu-close-btn'); // Close button
    const navMenu = document.querySelector('nav'); // Navigation menu

    // Open Menu
    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.add('active'); // Add 'active' class
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    } else {
        console.error('Menu button or navigation menu not found!');
    }

    // Close Menu
    if (closeButton && navMenu) {
        closeButton.addEventListener('click', () => {
            navMenu.classList.remove('active'); // Remove 'active' class
            document.body.style.overflow = 'auto'; // Enable scrolling
        });
    } else {
        console.error('Close button or navigation menu not found!');
    }

    // Hide menu on screen resize for larger screens
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            navMenu.classList.remove('active'); // Hide menu
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    });
});


// Close Mobile Menu if clicked outside
document.addEventListener('DOMContentLoaded', () => {
  const navMenu = document.getElementById('nav-menu'); // Replace with actual ID
  const body = document.body;

  if (!navMenu) {
      return; // Stop execution if elements are missing
  }

  // Close menu on outside click
  document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target)) {
          navMenu.classList.remove('active');
          body.style.overflow = 'auto';
      }
  });
});

// ==========================ANIMATION=======================
AOS.init({
duration: 1000,  
offset: 200,  
easing: 'ease-in-out',  
once: false  
});


// =============================form validatation ====================
document.addEventListener('DOMContentLoaded', () => {
const form = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email-signup');
const passwordInput = document.getElementById('password-signup');
const strengthStatus = document.getElementById('strength-status');
const strengthItems = document.querySelectorAll('.strength-item');

if (!form) {
    return;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateName(nameInput.value)) {
        alert('Please enter a valid name.');
        return;
    }

    if (!validateEmail(emailInput.value)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!validatePasswordStrength(passwordInput.value)) {
        alert('Password does not meet the requirements.');
        return;
    }

    alert('Form submitted successfully!');
    form.submit();
});

// Name Validation
function validateName(name) {
    return /^[a-zA-Z ]{2,30}$/.test(name);
}

// Email Validation
function validateEmail(email) {
    email = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Password Strength Validation
function validatePasswordStrength(password) {
    const lengthRequirement = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password); 
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    if (password === '') {
        strengthStatus.textContent = 'Weak';
        strengthStatus.classList.remove('active');
        resetStrengthItems();
        return false;
    }

    const isStrong = lengthRequirement && hasNumber && hasSpecialChar && hasUpperCase && hasLowerCase;

    strengthStatus.textContent = isStrong ? 'Strong' : 'Weak';
    strengthStatus.classList.toggle('active', isStrong);

    updateStrengthItems(lengthRequirement, hasNumber, hasSpecialChar, hasUpperCase, hasLowerCase);

    return isStrong;
}

// Update Strength Item Classes
function updateStrengthItems(lengthRequirement, hasNumber, hasSpecialChar, hasUpperCase, hasLowerCase) {
    const strengthArray = [lengthRequirement, hasNumber, hasSpecialChar, hasUpperCase, hasLowerCase];

    strengthItems.forEach((item, index) => {
        if (strengthArray[index]) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Reset Strength Items
function resetStrengthItems() {
    strengthItems.forEach(item => {
        item.classList.remove('active');
    });
}

// Live Password Strength Check
passwordInput.addEventListener('input', () => {
    validatePasswordStrength(passwordInput.value);
});

nameInput.addEventListener('input', () => {
    validatePasswordStrength(passwordInput.value);
});

emailInput.addEventListener('input', () => {
    validatePasswordStrength(passwordInput.value);
});
});




