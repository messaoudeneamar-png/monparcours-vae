import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();
    if (!description?.trim()) {
      return Response.json({ error: "Description requise." }, { status: 400 });
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      return Response.json({ error: "CONTACT_EMAIL non configuré sur le serveur." }, { status: 500 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = parseInt(process.env.SMTP_PORT ?? "587", 10);

    if (smtpHost && smtpUser && smtpPass) {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });
      await transporter.sendMail({
        from: `MonParcours VAE <${smtpUser}>`,
        to: contactEmail,
        subject: "🐛 Bug Report — MonParcours VAE",
        text: `Nouveau bug signalé le ${new Date().toLocaleString("fr-FR")} :\n\n${description}`,
      });
    } else {
      // SMTP non configuré — log serveur seulement
      console.log(`[BUG REPORT] ${new Date().toISOString()}\n${description}`);
    }

    return Response.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur interne.";
    return Response.json({ error: message }, { status: 500 });
  }
}
