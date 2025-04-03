document.getElementById("signin-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("signin-username").value;
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    const response = await fetch("/submit-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    alert(data.message);
});


document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/login.html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    alert(data.message);
});
