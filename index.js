// Sample caffeine data
const caffeineData = {
    dailyIntake: [
        { date: '2025-01-14', amount: 250, source: 'Coffee' },
        { date: '2025-01-13', amount: 150, source: 'Tea' },
        { date: '2025-01-12', amount: 300, source: 'Energy Drink' }
    ],
    stats: {
        averageDaily: 233,
        maxDaily: 300,
        minDaily: 150
    }
};

// Update dashboard cards with caffeine data
function updateDashboardCards() {
    const cards = document.querySelectorAll('.card .data');
    cards[0].textContent = `${caffeineData.stats.averageDaily}mg`;
    cards[1].textContent = `${caffeineData.stats.maxDaily}mg`;
    cards[2].textContent = `${caffeineData.stats.minDaily}mg`;

    // Update card titles
    const titles = document.querySelectorAll('.card .title');
    titles[0].textContent = 'Average Daily Intake';
    titles[1].textContent = 'Max Daily Intake';
    titles[2].textContent = 'Min Daily Intake';
}

// Populate recent activity table with caffeine data
function updateActivityTable() {
    const tableBody = document.querySelector('.table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    caffeineData.dailyIntake.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.source}</td>
            <td>${entry.amount}mg</td>
        `;
        tableBody.appendChild(row);
    });

    // Update table headers
    const headers = document.querySelectorAll('.table thead th');
    headers[0].textContent = 'Date';
    headers[1].textContent = 'Source';
    headers[2].textContent = 'Amount';
}

// Initialize dashboard
function initDashboard() {
    updateDashboardCards();
    updateActivityTable();
}

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);
// Add event listener for the Add Data button
document.querySelector('.btn-primary').addEventListener('click', () => {
    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Simple prompt for demo purposes - in production would use a proper form
    const source = prompt('Enter caffeine source (e.g., Coffee, Tea):');
    const amount = parseInt(prompt('Enter amount in mg:'));
    
    if (source && amount) {
        // Add new entry to beginning of dailyIntake array
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
        
        // Update dashboard
        updateDashboardCards();
        updateActivityTable();
    }
});


