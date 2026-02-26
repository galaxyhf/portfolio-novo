import { Resend } from "resend";
import { render } from "@react-email/components";
import ContactEmail from "@/emails/ContactEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    const html = await render(
      ContactEmail({ name, email, subject, message })
    );

    const { error } = await resend.emails.send({
      from: "Portfólio <onboarding@resend.dev>",
      to: "caiogsilva2005@gmail.com",
      replyTo: email,
      subject: `[Portfólio] ${subject} — de ${name}`,
      html,
    });

    if (error) {
      console.error("[Resend] Erro ao enviar email:", error);
      return Response.json(
        { error: "Falha ao enviar a mensagem. Tente novamente." },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("[Contact API] Erro inesperado:", err);
    return Response.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
