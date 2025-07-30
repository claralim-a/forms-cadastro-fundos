# Sistema de Cadastro de Fundos - Front-end: Formulário (Next.js)

Este projeto foi desenvolvido como parte de um desafio técnico para uma vaga de estágio na área de dados. Ele é composto por duas partes complementares:

- **Front-end**: Formulário web em React/Next.js com autenticação, validações e envio de dados.
- **Back-end**: API REST construída com Django REST Framework, responsável por armazenar, validar e expor os dados dos fundos.

### Tutorial em vídeo para cadastro de novos fundos:

- [Link GoogleDrive](https://drive.google.com/drive/u/1/folders/11ahFvqVyn71_IVtkdYjUJRJxdWcIU6A_)

### Acesse as aplicações em produção:

- [Formulário (Next.js via Vercel)](https://forms-cadastro-fundos.vercel.app/)
- [API (Django via Render)](https://api-fundos-outliers.onrender.com/)

### Repositórios GitHub:

- [Front-end: `forms-cadastro-fundos`](https://github.com/claralim-a/forms-cadastro-fundos)
- [Back-end: `api-fundos-outliers`](https://github.com/claralim-a/api-fundos-outliers)

---

## Objetivo do Projeto

Criar uma solução completa de cadastro de fundos de investimento, com as seguintes capacidades:

- Interface intuitiva para cadastro via formulário com autenticação de acesso.
- Validações completas de campos (como CNPJ, campos obrigatórios, selects dinâmicos).
- Comunicação com uma API RESTful autenticada.
- Armazenamento seguro e estruturado dos dados no back-end.
- Possibilidade de leitura pública dos dados cadastrados.

---

## Tecnologias Utilizadas

**Front-end**:
- [Next.js](https://nextjs.org/) (App Router)
- React + TypeScript
- TailwindCSS
- [cpf-cnpj-validator](https://www.npmjs.com/package/cpf-cnpj-validator)

**Back-end**:
- Python 3.12
- Django 5.2
- Django REST Framework
- Deploy via [Render](https://render.com/)

---

## Autenticação e Acesso


O acesso ao formulário de cadastro é protegido por uma tela de login simples, baseada em um usuário do tipo **superuser** e senha, definidos como variáveis de ambiente no front-end.

**Importante:**  
Essa autenticação simplificada por formulário foi implementada propositalmente para permitir que o avaliador consiga testar o sistema **sem necessidade de envio de tokens, arquivos `.env` ou configuração adicional**.

⚠️ Em um ambiente real de produção, o uso correto seria via autenticação segura no back-end com JWT ou OAuth2, com proteção de rotas e carregamento de variáveis sensíveis por ambiente.


```env
# .env.local (no front-end)
NEXT_PUBLIC_LOGIN_USER=superuser
NEXT_PUBLIC_LOGIN_PASSWORD=senhateste
NEXT_PUBLIC_API_TOKEN=0d88154ab9d18aed1f760bcb1dba6a4fe2b66dd4 (autentica o front com o back-end)
```

---

## Estrutura de Componentes

- `AuthForm.tsx`: Formulário de autenticação (login)
- `FundoForm.tsx`: Formulário de cadastro do fundo
- `Logo.tsx`: Componente de imagem da logo
- `page.tsx`: Controla a renderização condicional entre login e formulário

---

## Funcionalidades

- Login com usuário (superuser) e senha (senhateste)

- Cadastro de fundos com os campos:

* Obrigatórios:
- ID_FUNDO;
- ST_CNPJ_FUNDO;
- ST_CLASSE_FUNDO;
- ST_ESTRATEGIA_FUNDO;
- ST_RELATORIO1_FUNDO;
- RELATORIOS - gerado automaticamente no back-end a partir dos campos de relatório 1, 2 e 3.

* Opcionais:
- ST_OBS_FUNDO;
- ST_RELATORIO2_FUNDO;
- ST_RELATORIO3_FUNDO;
- COD_QUANTUM_FUNDOMASTER;
- ST_CNPJ_FUNDOMASTER.

--- 

## Possíveis melhorias futuras

Enriquecimento automático de dados via CNPJ: uma melhoria significativa seria a integração de bots ou serviços de backend que consultem APIs públicas, como a da Comissão de Valores Mobiliários (CVM), Receita Federal ou outras fontes confiáveis (ex: Quantum ou B3), para preenchimento automático de informações a partir do CNPJ do fundo ou do fundo master. Isso traria eficiencia, praticidade, padronização e confiabilidade aos dados cadastrados, reduzindo a necessidade de inserção manual por parte do usuário e evitando erros.

## Observações finais

Este projeto foi desenvolvido com o objetivo de ser **simples de testar**, **claro no fluxo de uso** e de **fácil manutenção**. A autenticação implementada não representa um modelo seguro para produção, mas serve como demonstração funcional do sistema.

**Desenvolvido por:**  
Clara Lima  
