class MobileMenu {
    constructor() {
        this.burger = document.querySelector('.burger');
        this.menuBackdrop = document.querySelector('.mobile-menu__backdrop');
        this.menuPanel = document.querySelector('.mobile-menu__panel');
        this.menuClose = document.querySelector('.mobile-menu__close');
        this.body = document.body;

        this.init();
    }

    init() {
        if (!this.burger) return;

        this.burger.addEventListener('click', () => this.toggleMenu());

        if (this.menuBackdrop) {
            this.menuBackdrop.addEventListener('click', () => this.closeMenu());
        }

        if (this.menuClose) {
            this.menuClose.addEventListener('click', () => this.closeMenu());
        }

        const menuLinks = document.querySelectorAll('.mobile-menu__list a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Закрываем меню при ресайзе на десктоп
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.body.classList.toggle('menu-active');
        this.menuBackdrop.classList.toggle('active');
        this.menuPanel.classList.toggle('active');
    }

    closeMenu() {
        this.body.classList.remove('menu-active');
        if (this.menuBackdrop) this.menuBackdrop.classList.remove('active');
        if (this.menuPanel) this.menuPanel.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
});