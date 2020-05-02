/*
 * Express.js webserver
 * Collection of arrays to hold data
 * API routes
 * HTML routes
 * Client-side AJAX to interact with the API
 * HTML-based UI
 */

const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express(); // Create a new express app.
const PORT = process.env.PORT || 3000; // Default to port 3000 if $PORT is not defined.

const reservations = [{
    "name": "Test User",
    "phone": "384-545-2314",
    "email": "test@test.com",
    "uniqueID": "12345"
}];
const waitlist = [];

app.use(cors()); // Allow CORS AJAX from all origins.
app.use(express.urlencoded({ extended: true })); // Parse x-www-form-urlencoded payloads.
app.use(express.json()); // Parse JSON payloads.

app.get('/', (req, res) => { // Handle the '/' route with method GET.
    res.sendFile(path.join(__dirname, "public", "index.html")); // Serve index.html to the browser.
});

app.get('/reserve', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "reserve.html"));
});

app.get('/tables', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "tables.html"));
});

app.post('/api/tables', (req, res) => { // Create a new reservation from an AJAX call or form submission.
    if (reservations.length <= 5) { // Check if we have tables available (we only take 5 reservations).
        reservations.push(req.body); // Append the data the client sent to the reservations array.
    } else {
        waitlist.push(req.body); // Append the data the client sent to the waitlist array.
    }
    res.redirect('/tables'); // Send the user to the tables view.
});

app.get('/api/tables', (req, res) => { // Serve the 'reservations' array as a JSON object.
    res.json(reservations);
});

app.get('/api/waitlist', (req, res) => { // Serve the 'waitlist' array as a JSON object.
    res.json(waitlist);
});

app.get('/api/clear', (req, res) => {
    reservations.length = 0;
    waitlist.length = 0;
    res.end();
});

app.listen(PORT, () => { // Start listening on the assigned PORT.
    console.log(`Express.js server listening on port ${PORT}`); // Callback that runs when the server is up.
})