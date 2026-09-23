const body = document.body;
const navLinks = document.querySelectorAll('.nav-link');
const navBurger = document.getElementById('navBurger');
const navMenu = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const yearNode = document.getElementById('year');

if (yearNode) yearNode.textContent = new Date().getFullYear();

const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('portfolio-theme');
if (storedTheme === 'light' || (!storedTheme && !preferDark)) {
  body.classList.add('light');
  if (themeToggle) themeToggle.setAttribute('aria-pressed', 'true');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = body.classList.toggle('light');
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    themeToggle.setAttribute('aria-pressed', String(isLight));
  });
}

if (navBurger && navMenu) {
  navBurger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navBurger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navBurger.setAttribute('aria-expanded', 'false');
    });
  });
}

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(btn => btn.classList.toggle('active', btn === button));

    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = (formData.get('name') || '').toString().trim();

    if (!name) {
      if (formStatus) formStatus.textContent = 'Please enter your name before sending.';
      return;
    }

    if (formStatus) formStatus.textContent = 'Thank you! Your message has been prepared and is ready to send.';
    contactForm.reset();
  });
}

const updateActiveLink = () => {
  const sections = [...document.querySelectorAll('section[id]')];
  const current = sections.find(section => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 180 && rect.bottom >= 180;
  });

  navLinks.forEach(link => {
    const isActive = current && link.getAttribute('href') === `#${current.id}`;
    link.classList.toggle('active', isActive);
  });
};
window.addEventListener('scroll', updateActiveLink, { passive: true });
window.addEventListener('load', updateActiveLink);

window.addEventListener('scroll', () => {
  if (window.scrollY > 420) {
    backToTop?.classList.add('visible');
  } else {
    backToTop?.classList.remove('visible');
  }
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
