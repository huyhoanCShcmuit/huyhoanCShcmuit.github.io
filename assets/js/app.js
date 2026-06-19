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

/*==================== GITHUB STATS THEME SYNC ====================*/
function syncGithubStatsTheme() {
    const isLight = document.body.classList.contains(lightThemeClass);
    const darkImg = document.querySelector('.dark-mode-img');
    const lightImg = document.querySelector('.light-mode-img');
    
    if (isLight) {
        if(darkImg) darkImg.style.display = 'none';
        if(lightImg) lightImg.style.display = 'block';
    } else {
        if(darkImg) darkImg.style.display = 'block';
        if(lightImg) lightImg.style.display = 'none';
    }
}
// Run once on load
syncGithubStatsTheme();

// Hook into existing theme button listener
themeButton.addEventListener('click', () => {
    setTimeout(syncGithubStatsTheme, 50); // slight delay to let class toggle happen
});


/*==================== COMMAND PALETTE (CMD+K) ====================*/
const paletteOverlay = document.getElementById('command-palette');
const paletteInput = document.getElementById('palette-input');
const cmdKTrigger = document.getElementById('cmd-k-trigger');
const paletteItems = document.querySelectorAll('.palette-item');

function togglePalette() {
    paletteOverlay.classList.toggle('active');
    if (paletteOverlay.classList.contains('active')) {
        paletteInput.value = '';
        filterPalette('');
        setTimeout(() => paletteInput.focus(), 100);
    }
}

// Open via Button
cmdKTrigger.addEventListener('click', togglePalette);

// Open via Keyboard (Cmd+K or Ctrl+K)
document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        togglePalette();
    }
    // Close on ESC
    if (e.key === 'Escape' && paletteOverlay.classList.contains('active')) {
        togglePalette();
    }
});

// Close when clicking outside modal
paletteOverlay.addEventListener('click', (e) => {
    if (e.target === paletteOverlay) togglePalette();
});

// Filter items based on search
paletteInput.addEventListener('input', (e) => {
    filterPalette(e.target.value.toLowerCase());
});

function filterPalette(query) {
    paletteItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Handle palette actions
paletteItems.forEach(item => {
    item.addEventListener('click', (e) => {
        if (item.id === 'palette-theme') {
            themeButton.click(); // Trigger existing theme toggle
            // Don't close palette immediately so user sees the change
        } else {
            togglePalette(); // Close palette for navigations/links
        }
    });
});


