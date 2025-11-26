/**
 * Minimal script for OS-native interactions
 * Size goal: < 1KB
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Progressive i18n Step 2 & 3: Page Redirects ---
    const pathForRedirect = window.location.pathname;
    const isFrenchPage = pathForRedirect.includes('/fr/');

    // Define pages that have translations
    const translatablePages = ['index.html', 'projects.html', 'work.html', 'education.html'];

    // Check if current page is one of them (or root for index)
    let pageName = pathForRedirect.split('/').pop();
    if (pageName === '' || pageName === '/') pageName = 'index.html';

    const isTranslatable = translatablePages.includes(pageName);

    if (isTranslatable && !isFrenchPage) {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('fr')) {
            // Redirect to fr version
            const filename = pageName;

            // Construct new URL
            const currentHref = window.location.href;
            let newHref;

            if (currentHref.endsWith('/')) {
                newHref = currentHref + 'fr/';
            } else {
                // Replace filename with fr/filename
                // We need to be careful with path replacement
                // If url is .../index.html -> .../fr/index.html
                // If url is .../projects.html -> .../fr/projects.html

                // Split by last occurrence of filename to insert 'fr/'
                const lastIndex = currentHref.lastIndexOf(filename);
                if (lastIndex !== -1) {
                    newHref = currentHref.substring(0, lastIndex) + 'fr/' + filename + currentHref.substring(lastIndex + filename.length);
                } else {
                    // Fallback
                    newHref = currentHref.replace(filename, 'fr/' + filename);
                }
            }

            // Safety check to prevent loops
            if (newHref !== currentHref) {
                window.location.replace(newHref);
            }
        }
    }


    // --- Original Script Content ---
    // Highlight active link based on current URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Simple fade-in for content
    const content = document.querySelector('.page-body');
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(10px)';
        content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        requestAnimationFrame(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        });
    }
});
