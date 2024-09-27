const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend'))); // Serve static files

// Your existing apparel submissions array
let apparelSubmissions = [];

// POST route to handle form submission
app.post('/submit', (req, res) => {
    console.log("Received submission:", req.body); // Log the incoming request body
    const { name, condition, disposalMethod } = req.body;

    // Validate the input
    if (!name || !condition || !disposalMethod) {
        console.log("Validation failed:", { name, condition, disposalMethod }); // Log validation failures
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Add the submission to the array
    const submission = { name, condition, disposalMethod, id: apparelSubmissions.length + 1 };
    apparelSubmissions.push(submission);

    console.log("Submission successful:", submission); // Log successful submissions
    res.status(201).json({ message: 'Submission successful!', submission });
});

// Serve index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
