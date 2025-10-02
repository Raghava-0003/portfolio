// Theme toggle with localStorage persistence
(function() {
	const root = document.documentElement;
	const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
	const stored = localStorage.getItem('theme');
	const initial = stored || (prefersLight ? 'light' : 'dark');
	if (initial === 'light') root.classList.add('light');
	updateToggleIcon();

	document.getElementById('themeToggle')?.addEventListener('click', () => {
		root.classList.toggle('light');
		localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
		updateToggleIcon();
	});

	function updateToggleIcon() {
		const isLight = root.classList.contains('light');
		document.querySelector('#icon-sun')?.classList.toggle('active', !isLight);
		document.querySelector('#icon-moon')?.classList.toggle('active', isLight);
	}
})();

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal animations via IntersectionObserver
const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
			observer.unobserve(entry.target);
		}
	});
}, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Smooth scroll offset for sticky header (enhanced)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
	link.addEventListener('click', (e) => {
		const href = link.getAttribute('href');
		if (!href || href === '#' || href.length < 2) return;
		const target = document.querySelector(href);
		if (!target) return;
		e.preventDefault();
		const top = target.getBoundingClientRect().top + window.scrollY - 64;
		window.scrollTo({ top, behavior: 'smooth' });
		history.pushState(null, '', href);
	});
});


