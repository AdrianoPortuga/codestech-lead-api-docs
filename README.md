# Codestech Lead API – Documentação oficial

Este repositório contém a documentação técnica da **Codestech Lead API**, incluindo:

- Arquivo **Swagger/OpenAPI** para importar em ferramentas como Swagger UI, Insomnia, Stoplight etc.
- **Coleção Postman** pronta para testes.
- Exemplos de requisições em **cURL, JavaScript (fetch)** e **Python (requests)**.
- Orientações de autenticação, boas práticas e integração com CRMs e ferramentas de automação.

---

## 🎯 O que é a Codestech Lead API?

A **Lead API** é uma camada única de recebimento de leads entre:

- Seus **sites, formulários e anúncios** (Facebook/Instagram Lead Ads, Google Ads etc.); e  
- Seu **CRM**, ferramentas de automação (Make, n8n, Pipedream) ou até uma **planilha do Google Sheets**.

Ela centraliza o recebimento, valida os dados, aplica regras de segurança (token, anti-duplicidade) e **entrega o lead no destino configurado** – sem você precisar alterar o site toda vez que trocar de ferramenta.

---

## 🌐 Base URL

Ambiente de produção:

```text
https://api.codestech.pt


Em todos os exemplos abaixo, substitua seu_slug pelo identificador do cliente/projeto configurado na Lead API (ex.: codesagency, clinica_xpto, imobiliaria_y).

🔐 Autenticação

A autenticação é feita via token enviado no cabeçalho X-API-Token.

X-API-Token: SEU_TOKEN_AQUI

🚀 Endpoint principal
POST /lead/{slug}

Envia um novo lead para a Codestech Lead API, que valida os dados e encaminha para o(s) destino(s) configurado(s).

URL:

POST https://api.codestech.pt/lead/{slug}


Cabeçalhos obrigatórios:

Content-Type: application/json
Accept: application/json
X-API-Token: SEU_TOKEN_AQUI


Body (exemplo):

{
  "nome": "Cliente Teste",
  "email": "cliente@exemplo.com",
  "telefone": "+351 912 345 678",
  "origem": "site-codestech",
  "mensagem": "Quero saber mais sobre o serviço.",
  "url_origem": "https://www.seusite.com/contato",
  "utm_source": "facebook",
  "utm_campaign": "campanha_teste"
}


Resposta (exemplo):

{
  "status": "ok",
  "lead_id": "2025-01-30T12:34:56.789Z-codesagency-abc123",
  "message": "Lead recebido e encaminhado para o destino configurado."
}

🧪 Arquivos de documentação
Swagger / OpenAPI
swagger/codestech-lead-api-swagger.json

Postman Collection
postman/codestech-lead-api-postman-collection.json

📊 Exemplos rápidos
cURL
curl -X POST "https://api.codestech.pt/lead/codesagency" \
  -H "Content-Type: application/json" \
  -H "X-API-Token: SEU_TOKEN_AQUI" \
  -d '{
    "nome": "Cliente Teste",
    "email": "cliente@exemplo.com",
    "telefone": "+351 912 345 678",
    "origem": "site-codestech"
  }'

JavaScript (fetch)
const response = await fetch("https://api.codestech.pt/lead/codesagency", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-Token": "SEU_TOKEN_AQUI",
  },
  body: JSON.stringify({
    nome: "Cliente Teste",
    email: "cliente@exemplo.com"
  }),
});

console.log(await response.json());

Python (requests)
import requests

url = "https://api.codestech.pt/lead/codesagency"
headers = {
    "Content-Type": "application/json",
    "X-API-Token": "SEU_TOKEN_AQUI",
}
payload = {
    "nome": "Cliente Teste",
    "email": "cliente@exemplo.com"
}

resp = requests.post(url, json=payload, headers=headers)
print(resp.status_code, resp.json())

🔄 Integração com CRM, automações e Google Sheets

A Lead API funciona como hub de entrada:

CRMs: Bitrix24, HubSpot, Pipedrive, RD Station e outros.

Automação: Make, n8n, Pipedream, Zapier.

Planilhas: Google Sheets para quem prefere simplicidade.

O roteamento é configurado pela Codestech com base no plano do cliente.

📮 Suporte

Para dúvidas técnicas sobre integração com a Lead API:

Email: codesschoolis@gmail.com

Telefone/WhatsApp: +351 923 120 032

Assunto sugerido: Dúvida integração Lead API – [nome do projeto]
