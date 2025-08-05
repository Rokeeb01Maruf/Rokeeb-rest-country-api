import path from "path"
import fs from "fs/promises"
import { NextResponse } from "next/server"

const dbPath = path.join(process.cwd(), 'data', 'data.json')

export async function GET(){
    const data = await fs.readFile(dbPath, "utf-8")
    return NextResponse.json(JSON.parse(data))
}

export async function POST(request) {
    const { id } = await request.json();
    const decodedId = decodeURIComponent(id);
    const files = await fs.readFile(dbPath, "utf-8")
    const file = JSON.parse(files)
    const data = file.find((e)=> e.name.toLowerCase() == decodedId.toLowerCase());
    return NextResponse.json(data)
}
