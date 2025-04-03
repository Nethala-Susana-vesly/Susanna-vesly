const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors");
var admin = require("firebase-admin");

const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});


app.post("/signup.html", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        await db.collection("User").doc(email).set({ username, email, password });
        res.json({ message: "User signed up successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error signing up" });
    }
});



app.post("/login.html", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDoc = await db.collection("User").doc(email).get();
        if (!userDoc.exists || userDoc.data().password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
});
app.post('/submit-signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        await db.collection("User").doc(email).set({ username, email, password });
        res.json({ message: "Signup successful!" });
    } catch (error) {
        res.status(500).json({ message: "Error signing up: " + error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
