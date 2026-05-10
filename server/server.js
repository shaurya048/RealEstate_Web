const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

// Connect to SQLite
let db;
(async () => {
    db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    })
})();

// GET /api/listings
// Filters: minPrice, maxPrice, location
app.get('/api/listings', async (req, res) => {
    const { minPrice, maxPrice, location } = req.query;
    let query = 'SELECT * FROM listings WHERE 1=1';
    const params = [];

    if (minPrice) {
        query += ' AND price >= ?';
        params.push(parseInt(minPrice));
    }
    if (maxPrice) {
        query += ' AND price <= ?';
        params.push(parseInt(maxPrice));
    }
    if (location) {
        query += ' AND location LIKE ?';
        params.push(`%${location}%`);
    }

    try {
        const rows = await db.all(query, params);
        // Parse images JSON string back to array
        const listings = rows.map(row => ({
            ...row,
            images: JSON.parse(row.images)
        }));
        res.json(listings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch listings' });
    }
});

// GET /api/listings/:id
app.get('/api/listings/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const row = await db.get('SELECT * FROM listings WHERE id = ?', [id]);
        if (!row) {
            return res.status(404).json({ error: 'Listing not found' });
        }
        row.images = JSON.parse(row.images);
        res.json(row);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch listing' });
    }
});

// POST /api/inquiries
app.post('/api/inquiries', async (req, res) => {
    const { name, email, phone, details } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    
    try {
        const result = await db.run(
            'INSERT INTO inquiries (name, email, phone, details) VALUES (?, ?, ?, ?)',
            [name, email, phone, details]
        );
        res.status(201).json({ id: result.lastID, message: 'Inquiry submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to submit inquiry' });
    }
});

// GET /api/inquiries
app.get('/api/inquiries', async (req, res) => {
    try {
        const rows = await db.all('SELECT * FROM inquiries ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch inquiries' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
