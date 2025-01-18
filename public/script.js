const form1 = document.getElementById('form1');
const form2 = document.getElementById('form2');
const otpForm = document.getElementById('otpVerificationForm');

let userId = ''; 

form2.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('signupname').value;
    const email = document.getElementById('signupemail').value;
    const password = document.getElementById('signuppass').value;

    const response = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert("Sign-up successful! Please check your email for OTP.");
        userId = data.userId; 
    } else {
        alert('Error: ' + data.error);
    }
});

otpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const otp = document.getElementById('otp').value;

    const response = await fetch('/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, otp })
    });

    const data = await response.json();
    if (response.ok) {
        alert("Email verified successfully!");
   
    } else {
        alert('Error: ' + data.error);
    }
});

form1.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('signinemail').value;
    const password = document.getElementById('signinpass').value;

    const response = await fetch('/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert("Sign-in successful!");
       
        localStorage.setItem('token', data.token);
        window.location.href = "index1.html"
       
    } else {
        alert(`Error: incorrect email or password`);
    }
});




