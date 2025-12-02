# Validação & Anti-duplicidade da Codestech Lead API

A **proteção de validação e anti-duplicidade** da Codestech Lead API foi criada para manter o seu CRM e suas automações **limpas, confiáveis e sem ruídos**, reduzindo drasticamente o volume de leads repetidos e registros inconsistentes.

---

## 🎯 Objetivo do recurso

- Evitar que o mesmo contato entre várias vezes no pipeline.
- Reduzir retrabalho do time comercial.
- Proteger métricas e relatórios contra inflar números com duplicados.
- Evitar disparos desnecessários de automações (e consumo de créditos em Make, Pipedream, n8n etc.).

---

## 🔍 Como funciona a validação hoje

Sempre que um novo lead é enviado para a Lead API, o backend executa uma checagem de consistência e duplicidade com base em:

- **E-mail** do contato  
- **Telefone** (quando informado)  
- **Origem** do lead (por exemplo: formulário do site, campanha, Lead Ads, etc.)

Essa validação acontece em tempo real, antes do lead ser encaminhado para o seu CRM, planilha ou ferramenta de automação.

---

## 🔁 Lógica de Anti-duplicidade

A Lead API identifica possíveis duplicados analisando combinações como:

- Mesmo **e-mail** + mesma **origem**, ou  
- Mesmo **telefone** + mesma **origem**

Quando um lead é considerado duplicado, a API pode:

- **Evitar reprocessar** o lead para o mesmo destino, ou  
- **Registrar o evento como duplicado** para fins de auditoria e métricas internas.

A lógica exata de tratamento pode ser ajustada conforme a evolução do produto e dos conectores (Bitrix24, Make, n8n, Pipedream etc.).

> 💡 Na prática: o objetivo é manter o seu pipeline limpo, sem perder visibilidade do que está acontecendo “por trás” da captura.

---

## ✅ Benefícios práticos para a sua operação

- Menos leads repetidos chegando para o time comercial.
- Dados mais confiáveis para tomar decisões (CPL, CPA, conversão por etapa).
- Menos triggers desnecessários consumindo operações em ferramentas de automação.
- Mais foco em leads novos e realmente qualificados.

---

## 📦 Compatibilidade com integrações

A proteção de validação e anti-duplicidade funciona **de forma transparente** para:

- Sites e landing pages que enviam JSON para a Lead API  
- Formulários integrados via fetch/axios  
- Conectores com ferramentas de automação (Make, Pipedream, n8n, Zapier, etc.)  
- Integrações com CRMs que recebem leads via webhook ou API (Bitrix24, entre outros)

Você não precisa alterar a estrutura do formulário: basta garantir que os campos de **e-mail** e/ou **telefone** sejam enviados corretamente no payload.

---

## 📧 Dúvidas técnicas ou cenário específico?

Se você precisa de uma regra especial de deduplicação para o seu caso (por exemplo, múltiplos funis, segmentação por campanha ou origem), entre em contato:

- **E-mail de suporte:** `codesschoolia@gmail.com`  
- **Assunto sugerido:** `Dúvida – Validação & Anti-duplicidade Lead API`

Vamos analisar seu cenário e sugerir o melhor desenho técnico para a sua operação.
