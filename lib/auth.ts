import {prisma} from "./prisma";
import bcrypt from "bcryptjs";
import {randomBytes} from "crypto";

export async function createUser(email:string,password:string,name?:string){
 const existing=await prisma.user.findUnique({where:{email}});
 if(existing) throw new Error("Dit e-mailadres is al geregistreerd.");
 const passwordHash=await bcrypt.hash(password,12);
 return prisma.user.create({data:{email,name,passwordHash,progress:{create:{}}}});
}
export async function verifyUser(email:string,password:string){
 const user=await prisma.user.findUnique({where:{email}});
 if(!user?.passwordHash || !(await bcrypt.compare(password,user.passwordHash))) return null;
 return user;
}
export function makeToken(){return randomBytes(32).toString("hex");}
