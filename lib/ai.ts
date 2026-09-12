import OpenAI from "openai";
import {z} from "zod";
const ai=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
const Pack=z.object({
 title:z.string(),summary:z.string(),
 sections:z.array(z.object({title:z.string(),content:z.string()})),
 flashcards:z.array(z.object({question:z.string(),answer:z.string(),difficulty:z.number().int().min(1).max(3)})),
 quiz:z.object({title:z.string(),questions:z.array(z.object({
  type:z.enum(["multiple_choice","true_false","short_answer"]),question:z.string(),
  options:z.array(z.string()).optional(),answer:z.string(),explanation:z.string().optional(),topic:z.string().optional()
 }))})
});
const system=`You are StudySpark's study engine. Source material is authoritative. Never invent facts.
Create useful, non-duplicated study content. Return JSON only.`;
export async function generateStudyPack(source:string){
 if(!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY ontbreekt. Voeg die toe aan .env.");
 const r=await ai.chat.completions.create({
  model:process.env.OPENAI_MODEL||"gpt-4.1-mini",temperature:.15,response_format:{type:"json_object"},
  messages:[{role:"system",content:system},{role:"user",content:`Maak een study pack van deze bron:\n${source.slice(0,120000)}`}]
 });
 return Pack.parse(JSON.parse(r.choices[0]?.message?.content||"{}"));
}
export async function ocrImage(dataUrl:string){
 if(!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY ontbreekt voor OCR.");
 const r=await ai.chat.completions.create({
  model:process.env.OCR_MODEL||"gpt-4.1-mini",temperature:0,
  messages:[{role:"system",content:"Extract all readable study notes from this image. Preserve headings and meaning. Return plain text only."},
  {role:"user",content:[{type:"text",text:"Transcribe these notes accurately."},{type:"image_url",image_url:{url:dataUrl}}]}]
 });
 return r.choices[0]?.message?.content||"";
}
