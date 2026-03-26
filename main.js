document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. MOBILE MENU (Phone ke liye mast menu)
    // ==========================================
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    // Hamburger button banaya
    const menuBtn = document.createElement('div');
    menuBtn.innerHTML = '☰';
    menuBtn.style.cssText = 'font-size: 28px; cursor: pointer; display: none; color: var(--primary-dark); font-weight: bold; margin-left: auto;';
    
    // Logo ke baad aur nav-links se pehle button lagaya
    navContainer.insertBefore(menuBtn, navLinks);

    // Mobile ke liye CSS yahi se daal di
    const style = document.createElement('style');
    style.innerHTML = `
        @media (max-width: 768px) {
            .mobile-menu-btn { display: block !important; }
            .nav-links {
                display: none; 
                position: absolute; 
                top: 70px; 
                left: 0; 
                width: 100%;
                background: white; 
                flex-direction: column; 
                box-shadow: 0 10px 15px rgba(0,0,0,0.1);
                padding: 15px 0; 
                text-align: center; 
                border-top: 1px solid #eee;
            }
            .nav-links.active { display: flex !important; }
            .nav-links a { margin: 15px 0; font-size: 18px; }
        }
    `;
    document.head.appendChild(style);
    menuBtn.classList.add('mobile-menu-btn');

    // Button dabane par menu khulega aur band hoga
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.innerHTML = navLinks.classList.contains('active') ? '✖' : '☰';
    });


    // ==========================================
    // 2. SMOOTH SCROLLING
    // ==========================================
    document.querySelectorAll('.nav-links a, .btn-primary').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Agar external link hai (jaise chatgpt.com), toh smooth scroll mat lagao
            if(this.getAttribute('href').startsWith('http')) return; 
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Phone me click karne ke baad menu khud band ho jaye
                navLinks.classList.remove('active');
                menuBtn.innerHTML = '☰';
                
                // Aaram se scroll ho
                window.scrollTo({ 
                    top: targetElement.offsetTop - 70, 
                    behavior: 'smooth' 
                });
            }
        });
    });


    // ==========================================
    // 3. PREMIUM CARD ANIMATION (Fade In)
    // ==========================================
    const cards = document.querySelectorAll('.card');
    
    // Pehle saare cards chupa diye
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
    });

    // Jab screen par dikhenge tabhi samne aayenge
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
});
