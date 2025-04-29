document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    let resizeTimer;

    // Mobile & Tablet Toggle
    const toggleSidebar = () => {
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('mobile-open');
        document.body.classList.toggle('no-scroll');
    };

    // Comportamiento responsive
    const handleResponsiveBehavior = () => {
        if (window.matchMedia('(max-width: 1024px)').matches) {
            // Mobile & Tablet
            if (!toggleBtn.classList.contains('js-listener')) {
                toggleBtn.addEventListener('click', toggleSidebar);
                overlay.addEventListener('click', toggleSidebar);
                toggleBtn.classList.add('js-listener');
            }
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('mobile-open');
        } else {
            // Desktop - Aseguramos que esté abierto
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('mobile-open');
            document.body.classList.remove('no-scroll');
            if (toggleBtn.classList.contains('js-listener')) {
                toggleBtn.removeEventListener('click', toggleSidebar);
                overlay.removeEventListener('click', toggleSidebar);
                toggleBtn.classList.remove('js-listener');
            }
        }
    };

    // Inicialización
    handleResponsiveBehavior();

    // Resize handler con debounce
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            handleResponsiveBehavior();
        }, 250);
    });
});