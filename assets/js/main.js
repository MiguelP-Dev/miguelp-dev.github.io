document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const overlay = document.querySelector('.sidebar-overlay');
    const html = document.documentElement;

    // Función para cerrar sidebar
    const closeSidebar = () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    };

    // Función para abrir sidebar
    const openSidebar = () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    };

    // Inicialización para desktop
    if (window.innerWidth >= 1025) {
        openSidebar();
    }

    // Toggle sidebar
    sidebarToggle.addEventListener('click', () => {
        if (window.innerWidth >= 1025) {
            return; // En desktop solo se muestra, no se togglea
        }
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    // Cerrar sidebar al hacer clic en overlay
    overlay.addEventListener('click', () => {
        if (window.innerWidth < 1025) {
            closeSidebar();
        }
    });

    // Cerrar sidebar al hacer clic en enlaces (solo mobile)
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth < 1025) {
                e.preventDefault();
                closeSidebar();
                // Redirigir después de cerrar
                setTimeout(() => window.location.href = link.href, 300);
            }
        });
    });

    // Manejar cambios de tamaño
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1025) {
            openSidebar();
        } else {
            closeSidebar();
        }
    });

    // Cerrar sidebar al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 1025 && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target)) {
            closeSidebar();
        }
    });

    // Asegurarse de que el overlay no interfiera con el scroll
    overlay.addEventListener('touchmove', (e) => {
        e.preventDefault();
    });
});