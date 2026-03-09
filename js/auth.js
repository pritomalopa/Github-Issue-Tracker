// Login Handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = document.getElementById('username').value;
        const p = document.getElementById('password').value;

        if (u === 'admin' && p === 'admin123') {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html';
        } else {
            alert('Wrong credentials! Use admin / admin123');
        }
    });
}

// Security Check: Redirect if not logged in
if (window.location.pathname.includes('index.html')) {
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
    }
}