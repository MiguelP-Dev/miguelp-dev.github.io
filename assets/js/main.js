document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    let resizeTimer;

    // Mobile Toggle
    const toggleSidebar = () => {
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('mobile-open');
        document.body.classList.toggle('no-scroll');
    };

    // Comportamiento responsive
    const handleResponsiveBehavior = () => {
        if (window.matchMedia('(max-width: 600px)').matches) {
            // Mobile
            toggleBtn.addEventListener('click', toggleSidebar);
            overlay.addEventListener('click', toggleSidebar);
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('mobile-open');
        } else {
            // Desktop - Aseguramos que esté abierto
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('mobile-open');
            document.body.classList.remove('no-scroll');
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