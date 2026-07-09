(function() {
    const STORAGE_KEY = 'churchUsers';

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');
    const forgotPassword = document.getElementById('forgot-password');

    function getUsers() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (err) {
            return [];
        }
    }

    function saveUsers(users) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }

    function showMessage(element, text, type) {
        if (!element) return;
        element.textContent = text;
        element.style.color = type === 'error' ? '#7f1d1d' : '#0f5132';
        element.style.background = type === 'error' ? 'rgba(248,215,218,0.8)' : 'rgba(212,237,218,0.8)';
        element.style.border = type === 'error' ? '1px solid rgba(220,53,69,0.4)' : '1px solid rgba(25,135,84,0.4)';
        element.style.padding = '12px';
        element.style.borderRadius = '10px';
        element.style.marginBottom = '16px';
    }

    function clearMessage(element) {
        if (!element) return;
        element.textContent = '';
        element.style.background = 'transparent';
        element.style.border = 'none';
        element.style.padding = '0';
        element.style.marginBottom = '0';
    }

    function normalizeEmail(value) {
        return value.trim().toLowerCase();
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            clearMessage(loginMessage);

            const email = normalizeEmail(document.getElementById('login-email').value);
            const password = document.getElementById('login-password').value;
            const users = getUsers();

            if (!email || !password) {
                showMessage(loginMessage, 'Please enter both email and password.', 'error');
                return;
            }

            const user = users.find(u => u.email === email);
            if (!user) {
                showMessage(loginMessage, 'No account found for this email. Please register first.', 'error');
                return;
            }

            if (user.password !== password) {
                showMessage(loginMessage, 'Incorrect password. Please try again.', 'error');
                return;
            }

            showMessage(loginMessage, 'Login successful! Welcome back, ' + (user.firstName || user.email) + '.', 'success');
            loginForm.reset();
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            clearMessage(registerMessage);

            const firstName = document.getElementById('first-name').value.trim();
            const middleName = document.getElementById('middle-name').value.trim();
            const lastName = document.getElementById('last-name').value.trim();
            const gender = document.getElementById('gender').value.trim();
            const civilStatus = document.getElementById('civil-status').value.trim();
            const birthYear = document.getElementById('birth-year').value.trim();
            const birthMonth = document.getElementById('birth-month').value.trim();
            const birthDay = document.getElementById('birth-day').value.trim();
            const email = normalizeEmail(document.getElementById('register-email').value);
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const users = getUsers();

            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                showMessage(registerMessage, 'Please complete all required fields.', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showMessage(registerMessage, 'Passwords do not match. Please try again.', 'error');
                return;
            }

            if (users.some(u => u.email === email)) {
                showMessage(registerMessage, 'An account already exists with that email.', 'error');
                return;
            }

            users.push({
                firstName,
                middleName,
                lastName,
                gender,
                civilStatus,
                birthYear,
                birthMonth,
                birthDay,
                email,
                password
            });

            saveUsers(users);
            showMessage(registerMessage, 'Account created successfully! You can now sign in.', 'success');
            registerForm.reset();
        });
    }

    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(event) {
            event.preventDefault();
            alert('Password reset is not available in this demo. Please create a new account if needed.');
        });
    }
})();