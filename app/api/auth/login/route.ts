import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../lib/prisma";
import { sessionCookie } from "../../../../lib/session";
export async function POST(req:Request){try{const {email,password}=await req.json();const user=await prisma.user.findUnique({where:{email:String(email).trim().toLowerCase()}});if(!user?.passwordHash||!(await bcrypt.compare(String(password),user.passwordHash)))return NextResponse.json({error:"Onjuiste inloggegevens."},{status:401});const r=NextResponse.json({ok:true});r.cookies.set(sessionCookie(user.id));return r}catch{return NextResponse.json({error:"Inloggen mislukt."},{status:400})}}
