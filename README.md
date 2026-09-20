# Portfólio — Caio Silva

Portfólio profissional desenvolvido para apresentar projetos, competências e canais de contato em uma experiência rápida, responsiva e acessível. O projeto inclui um painel administrativo privado para gerenciamento completo do conteúdo publicado.

## Funcionalidades

- Apresentação profissional, projetos em destaque e trajetória técnica.
- Catálogo de projetos com páginas detalhadas, tecnologias e links externos.
- Formulário de contato com envio transacional de e-mail.
- Painel administrativo protegido por autenticação.
- Cadastro, edição, publicação, ordenação e exclusão de projetos.
- Upload de capas e galerias para armazenamento de objetos.
- Estados de carregamento, erro e ausência de conteúdo.
- Interface responsiva com suporte a diferentes tamanhos de tela.

## Arquitetura

A aplicação utiliza Next.js com App Router, Server Components e Server Actions. Operações sensíveis permanecem no servidor, incluindo acesso ao banco, autenticação, envio de e-mails e gerenciamento de arquivos.

O backend é centralizado no Neon:

- PostgreSQL para persistência dos projetos.
- Drizzle ORM para schema, consultas e migrações versionadas.
- Managed Better Auth para identidade e sessões administrativas.
- Object Storage compatível com S3 para capas e galerias.

O acesso ao painel exige uma sessão válida e um e-mail presente na lista administrativa. Credenciais de banco e armazenamento não são expostas ao navegador.

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Neon Postgres
- Neon Managed Auth
- Neon Object Storage
- Drizzle ORM
- React Hook Form e Zod
- Resend e React Email
- Framer Motion

## Estrutura

```text
src/
├── app/             Rotas públicas, painel administrativo e APIs
├── components/      Componentes de interface e formulários
├── db/              Schema e cliente PostgreSQL
├── emails/          Templates de e-mail transacional
└── lib/             Regras de negócio e integrações de servidor

drizzle/             Migrações versionadas do banco
neon.ts              Definição dos recursos gerenciados no Neon
```

## Qualidade

O projeto possui validação estática de tipos, análise com ESLint, migrações versionadas e separação entre responsabilidades de interface, domínio e infraestrutura.

## Licença

Projeto pessoal. Todos os direitos reservados.
