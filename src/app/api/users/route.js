import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export async function GET() {
    try {
        const {rows} = await pool.query('SELECT * FROM users');
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.error(error);
    }
}