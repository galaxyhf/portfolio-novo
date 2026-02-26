import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Font,
} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactEmail({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) {
  return (
    <Html lang="pt-BR">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>
        Nova mensagem de {name}: {subject}
      </Preview>

      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={headerLabel}>PORTFÓLIO</Text>
            <Heading style={headerHeading}>Nova mensagem</Heading>
            <Text style={headerSubtitle}>
              Você recebeu um contato pelo formulário do seu portfólio.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Campos */}
          <Section style={content}>
            <Section style={fieldBlock}>
              <Text style={fieldLabel}>NOME</Text>
              <Text style={fieldValue}>{name}</Text>
            </Section>

            <Section style={fieldBlock}>
              <Text style={fieldLabel}>EMAIL</Text>
              <Link href={`mailto:${email}`} style={fieldLink}>
                {email}
              </Link>
            </Section>

            <Section style={fieldBlock}>
              <Text style={fieldLabel}>ASSUNTO</Text>
              <Text style={fieldValue}>{subject}</Text>
            </Section>

            <Section style={messageBlock}>
              <Text style={fieldLabel}>MENSAGEM</Text>
              <Text style={messageText}>{message}</Text>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Responda diretamente para{" "}
              <Link href={`mailto:${email}`} style={footerLink}>
                {email}
              </Link>
            </Text>
            <Text style={footerMuted}>
              Esta mensagem foi enviada pelo formulário de contato do portfólio
              de Caio Silva.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

/* ── Estilos ── */

const main: React.CSSProperties = {
  backgroundColor: "#f4f4f5",
  fontFamily: "Inter, Arial, sans-serif",
};

const container: React.CSSProperties = {
  margin: "40px auto",
  maxWidth: "560px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid #e4e4e7",
};

const header: React.CSSProperties = {
  padding: "40px 40px 32px",
};

const headerLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.1em",
  color: "#336ebb",
  margin: "0 0 12px",
  textTransform: "uppercase",
};

const headerHeading: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: 700,
  color: "#09090b",
  margin: "0 0 8px",
  lineHeight: 1.2,
};

const headerSubtitle: React.CSSProperties = {
  fontSize: "14px",
  color: "#71717a",
  margin: 0,
  lineHeight: 1.5,
};

const divider: React.CSSProperties = {
  borderColor: "#f4f4f5",
  margin: 0,
};

const content: React.CSSProperties = {
  padding: "32px 40px",
};

const fieldBlock: React.CSSProperties = {
  marginBottom: "24px",
};

const fieldLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  color: "#a1a1aa",
  margin: "0 0 4px",
  textTransform: "uppercase",
};

const fieldValue: React.CSSProperties = {
  fontSize: "15px",
  color: "#18181b",
  margin: 0,
  lineHeight: 1.5,
};

const fieldLink: React.CSSProperties = {
  fontSize: "15px",
  color: "#336ebb",
  textDecoration: "none",
};

const messageBlock: React.CSSProperties = {
  backgroundColor: "#fafafa",
  border: "1px solid #f4f4f5",
  borderRadius: "8px",
  padding: "20px",
  marginTop: "4px",
};

const messageText: React.CSSProperties = {
  fontSize: "15px",
  color: "#18181b",
  margin: "8px 0 0",
  lineHeight: 1.7,
  whiteSpace: "pre-wrap",
};

const footer: React.CSSProperties = {
  padding: "24px 40px 32px",
  backgroundColor: "#fafafa",
};

const footerText: React.CSSProperties = {
  fontSize: "13px",
  color: "#52525b",
  margin: "0 0 6px",
};

const footerLink: React.CSSProperties = {
  color: "#336ebb",
  textDecoration: "none",
};

const footerMuted: React.CSSProperties = {
  fontSize: "12px",
  color: "#a1a1aa",
  margin: 0,
};
