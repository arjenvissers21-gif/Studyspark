import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../../../../lib/prisma";
import { sessionCookie } from "../../../../lib/session";
const schema = z.object({ name:z.string().trim().min(1).max(80), email:z.string().trim().email().max(200), password:z.string().min(8).max(128) });
export async function POST(req:Request){try{const b=schema.parse(await req.json());const email=b.email.toLowerCase();if(await prisma.user.findUnique({where:{email}}))return NextResponse.json({error:"Er bestaat al een account met dit e-mailadres."},{status:409});const user=await prisma.user.create({data:{name:b.name,email,passwordHash:await bcrypt.hash(b.password,12),progress:{create:{}}}});const r=NextResponse.json({ok:true});r.cookies.set(sessionCookie(user.id));return r}catch(e){return NextResponse.json({error:e instanceof z.ZodError?"Controleer naam, e-mail en wachtwoord.":"Registreren mislukt."},{status:400})}}
