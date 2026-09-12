import pdf from "pdf-parse/lib/pdf-parse.js";
import { ocrImage } from "./ai";
const MAX_BYTES=10*1024*1024;
export async function extractText(file:File){
 if(file.size>MAX_BYTES) throw new Error("Bestand is te groot. Maximum is 10 MB.");
 const name=file.name.toLowerCase(); const type=file.type;
 if(type==="application/pdf"||name.endsWith(".pdf")){const b=Buffer.from(await file.arrayBuffer());const p=await pdf(b);return {text:p.text,type:"PDF"};}
 if(type.startsWith("image/")){if(!["image/png","image/jpeg","image/webp"].includes(type))throw new Error("Gebruik PNG, JPEG of WebP voor afbeeldingen.");const b=Buffer.from(await file.arrayBuffer());return {text:await ocrImage(`data:${type};base64,${b.toString("base64")}`),type:"IMAGE"};}
 if(type==="text/plain"||type==="text/markdown"||name.endsWith(".txt")||name.endsWith(".md")){return {text:await file.text(),type:"TEXT"};}
 throw new Error("Ondersteund: PDF, TXT, MD, PNG, JPEG of WebP.");
}
