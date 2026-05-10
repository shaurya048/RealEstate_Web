const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

async function setup() {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    })

    await db.exec(`
        CREATE TABLE IF NOT EXISTS listings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            price INTEGER,
            location TEXT,
            bedrooms INTEGER,
            bathrooms INTEGER,
            images TEXT,
            description TEXT,
            agent_name TEXT
        )
    `)

    await db.exec(`
        CREATE TABLE IF NOT EXISTS inquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            phone TEXT,
            details TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `)

    // Clear existing to avoid duplicates on rerun
    await db.exec(`DELETE FROM listings`)

    // Seed mock data
    const seedData = [
        {
            title: "The Bridle Path Estate",
            price: 15500000,
            location: "The Bridle Path, Toronto",
            bedrooms: 6,
            bathrooms: 8,
            images: JSON.stringify(["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2560&q=80", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2560&q=80"]),
            description: "A monumental achievement in modern architecture. This 12,000 sq ft estate offers unparalleled privacy and uncompromising material quality. Features a private gallery, subterranean motor court, and an infinity edge pool overlooking the ravine.",
            agent_name: "Ankit Sarhadi"
        },
        {
            title: "Forest Hill Glass House",
            price: 8900000,
            location: "Forest Hill, Toronto",
            bedrooms: 4,
            bathrooms: 6,
            images: JSON.stringify(["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2560&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2560&q=80"]),
            description: "An architectural masterclass in light and transparency. Designed with floor-to-ceiling Starphire glass, floating staircases, and a minimal Zinc-950 aesthetic. A true sanctuary in the heart of Forest Hill.",
            agent_name: "Kunal Sarhadi"
        },
        {
            title: "Rosedale Heritage Modern",
            price: 11200000,
            location: "Rosedale, Toronto",
            bedrooms: 5,
            bathrooms: 7,
            images: JSON.stringify(["https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2560&q=80", "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=2560&q=80"]),
            description: "Where heritage meets the cutting edge. This restored 1920s facade hides a fully gutted, hyper-modern interior featuring imported Italian marble, custom Gold accents, and a state-of-the-art climate control system.",
            agent_name: "Ankit Sarhadi"
        },
        {
            title: "Yorkville Penthouse",
            price: 6500000,
            location: "Yorkville, Toronto",
            bedrooms: 3,
            bathrooms: 4,
            images: JSON.stringify(["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2560&q=80", "https://images.unsplash.com/photo-1502672260266-1c1de2d9d0cb?auto=format&fit=crop&w=2560&q=80"]),
            description: "A commanding view of the skyline from the 50th floor. This minimalist penthouse offers 4,000 sq ft of open-plan living, featuring 12-foot ceilings, an expansive terrace, and bespoke Gaggenau appliances.",
            agent_name: "Kunal Sarhadi"
        }
    ]

    const insertStmt = await db.prepare(`
        INSERT INTO listings (title, price, location, bedrooms, bathrooms, images, description, agent_name) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)

    for (const listing of seedData) {
        await insertStmt.run(
            listing.title,
            listing.price,
            listing.location,
            listing.bedrooms,
            listing.bathrooms,
            listing.images,
            listing.description,
            listing.agent_name
        )
    }

    await insertStmt.finalize()
    console.log("Database seeded successfully with", seedData.length, "listings.")
}

setup().catch(err => {
    console.error("Error setting up database:", err)
})
