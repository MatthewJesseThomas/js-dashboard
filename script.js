const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Parse JSON bodies
app.use(express.json());

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to get caffeine data
app.get('/api/caffeine-data', (req, res) => {
    // Import the caffeine data from index.js
    const caffeineData = require('./index.js').caffeineData;
    res.json(caffeineData);
});

// API endpoint to add new caffeine entry
app.post('/api/caffeine-data', (req, res) => {
    const { source, amount } = req.body;
    const caffeineData = require('./index.js').caffeineData;
    
    const today = new Date().toISOString().split('T')[0];
    
    // Add new entry
    caffeineData.dailyIntake.unshift({
        date: today,
        source: source,
        amount: amount
    });

    // Recalculate stats
    const amounts = caffeineData.dailyIntake.map(entry => entry.amount);
    caffeineData.stats.averageDaily = Math.round(amounts.reduce((a,b) => a + b) / amounts.length);
    caffeineData.stats.maxDaily = Math.max(...amounts);
    caffeineData.stats.minDaily = Math.min(...amounts);

    res.json(caffeineData);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
