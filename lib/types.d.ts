declare module "pdf-parse/lib/pdf-parse.js" {
  type PDFParseResult = {
    text: string;
    numpages: number;
    numrender: number;
    info: Record<string, unknown>;
    metadata: Record<string, unknown> | null;
    version: string;
  };

  function pdfParse(buffer: Buffer): Promise<PDFParseResult>;
  export default pdfParse;
}
