// --- Authentication Logic ---

// 1. Handle Login Form Submission
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        // Using the default credentials from your Figma design
        if (user === 'admin' && pass === 'admin123') {
            // Store login state in localStorage
            localStorage.setItem('isLoggedIn', 'true');
            // Redirect to the dashboard
            window.location.href = 'index.html';
        } else {
            alert('Invalid Username or Password. Please use the demo credentials.');
        }
    });
}

// 2. Route Protection (Security)
// This function checks if the user is logged in. 
// If not, it kicks them back to the login page.
const checkAuth = () => {
    const path = window.location.pathname;
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // If we are on the dashboard (index.html) and NOT logged in
    if (path.includes('index.html') && !isLoggedIn) {
        window.location.href = 'login.html';
    }
};

// 3. Logout Function (Optional but recommended)
const logout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
};

// Run the security check immediately when the script loads
checkAuth();