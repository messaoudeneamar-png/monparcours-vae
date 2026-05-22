import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "Aucun fichier reçu." }, { status: 400 });
    }

    if (file.type === "text/plain") {
      const text = await file.text();
      return Response.json({ text: text.slice(0, 10000) });
    }

    if (file.type === "application/pdf") {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require("pdf-parse") as (buf: Buffer) => Promise<{ text: string }>;
      const data = await pdfParse(buffer);
      return Response.json({ text: data.text.slice(0, 10000) });
    }

    return Response.json(
      { error: "Format non supporté. Utilisez un fichier .txt ou .pdf." },
      { status: 400 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur lors du traitement du fichier.";
    return Response.json({ error: message }, { status: 500 });
  }
}
