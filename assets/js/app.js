/*==================== THEME TOGGLE ====================*/
const themeButton = document.getElementById('theme-button');
const darkThemeClass = 'dark-theme';
const lightThemeClass = 'light-theme';

if (!document.body.classList.contains(lightThemeClass)) {
  document.body.classList.add(darkThemeClass);
}

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(lightThemeClass) ? 'light' : 'dark';
const getCurrentIcon = () => themeButton.classList.contains('ri-sun-line') ? 'ri-moon-line' : 'ri-sun-line';

if (selectedTheme) {
  document.body.classList[selectedTheme === 'light' ? 'add' : 'remove'](lightThemeClass);
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkThemeClass);
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove']('ri-sun-line');
} else {
    themeButton.classList.add('ri-sun-line');
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(lightThemeClass);
    document.body.classList.toggle(darkThemeClass);
    
    if(themeButton.classList.contains('ri-sun-line')) {
        themeButton.classList.remove('ri-sun-line');
        themeButton.classList.add('ri-moon-line');
    } else {
        themeButton.classList.remove('ri-moon-line');
        themeButton.classList.add('ri-sun-line');
    }

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

/*==================== INTERSECTION OBSERVER FOR FADE ANIMATION ====================*/
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
            // We only want the animation to happen once for a cleaner look
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-fade').forEach((el) => {
    observer.observe(el);
});

/*==================== PREMIUM CARD GLOW EFFECT ====================*/
const handleOnMouseMove = e => {
  const { currentTarget: target } = e;
  
  const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
        
  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
}

for(const card of document.querySelectorAll(".card")) {
  card.onmousemove = e => handleOnMouseMove(e);
}

