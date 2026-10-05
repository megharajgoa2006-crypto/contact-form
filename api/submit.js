const { neon } = require("@neondatabase/serverless");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    const { name, email, message } = req.body || {};
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email required" });
    }
    try {
        const sql = neon(process.env.DATABASE_URL);
        await sql`INSERT INTO contacts (name, email, message) VALUES (${name}, ${email}, ${message})`;
        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
    }
};