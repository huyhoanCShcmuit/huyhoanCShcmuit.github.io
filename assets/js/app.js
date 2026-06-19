/*==================== THEME TOGGLE ====================*/
const themeButton = document.getElementById('theme-button');
const darkThemeClass = 'dark-theme';
const lightThemeClass = 'light-theme';

// Set dark theme as default on body if no theme is set
if (!document.body.classList.contains(lightThemeClass)) {
  document.body.classList.add(darkThemeClass);
}

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the class
const getCurrentTheme = () => document.body.classList.contains(lightThemeClass) ? 'light' : 'dark';
const getCurrentIcon = () => themeButton.classList.contains('ri-sun-line') ? 'ri-moon-line' : 'ri-sun-line';

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light theme
  document.body.classList[selectedTheme === 'light' ? 'add' : 'remove'](lightThemeClass);
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkThemeClass);
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove']('ri-sun-line');
} else {
    // If no selection, default is dark, icon should be sun (to switch to light)
    themeButton.classList.add('ri-sun-line');
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the light / dark theme
    document.body.classList.toggle(lightThemeClass);
    document.body.classList.toggle(darkThemeClass);
    
    // Toggle the icon
    if(themeButton.classList.contains('ri-sun-line')) {
        themeButton.classList.remove('ri-sun-line');
        themeButton.classList.add('ri-moon-line');
    } else {
        themeButton.classList.remove('ri-moon-line');
        themeButton.classList.add('ri-sun-line');
    }

    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
        
        if (navLink) {
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                navLink.classList.add('active-link');
            }else{
                navLink.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.querySelector('.nav');
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); 
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== INTERSECTION OBSERVER FOR FADE-UP ANIMATION ====================*/
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
            // observer.unobserve(entry.target); // Uncomment to animate only once
        } else {
            entry.target.classList.remove('visible'); // Remove to allow re-animation on scroll up
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach((el) => {
    observer.observe(el);
});
