import {Document,Packer,Paragraph,HeadingLevel} from "docx";
export async function makeDocx(d:{title:string,summary:string,sections:{title:string,content:string}[],flashcards:{question:string,answer:string}[]}){
 const p:Paragraph[]=[new Paragraph({text:d.title,heading:HeadingLevel.TITLE}),
 new Paragraph({text:"Samenvatting",heading:HeadingLevel.HEADING_1}),new Paragraph(d.summary)];
 for(const s of d.sections){p.push(new Paragraph({text:s.title,heading:HeadingLevel.HEADING_2}),new Paragraph(s.content));}
 p.push(new Paragraph({text:"Flashcards",heading:HeadingLevel.HEADING_1}));
 for(const c of d.flashcards)p.push(new Paragraph({text:c.question,heading:HeadingLevel.HEADING_2}),new Paragraph(c.answer));
 return Packer.toBuffer(new Document({sections:[{children:p}]}));
}
