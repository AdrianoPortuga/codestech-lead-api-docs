# Codestech Lead API – Documentação Técnica v1

## 1. Visão Geral

A **Codestech Lead API** é uma camada única e centralizada para recebimento, validação e distribuição de leads, projetada para substituir formulários diretos em CRMs, webhooks instáveis e integrações improvisadas em sites.

Ela atua como o primeiro ponto de entrada de qualquer lead vindo de:

- Sites
- Landing pages
- Formulários
- Páginas de serviços
- Anúncios (Meta, Google Ads, etc.)

A API garante que **cada lead seja processado de forma padronizada**, validado e protegido contra duplicações em uma janela de 15 minutos, evitando sobrecarga do CRM e desperdício operacional.

### Objetivos principais da API

- Centralizar o recebimento de leads
- Validar estrutura e dados obrigatórios
- Aplicar proteção contra duplicidades
- Registrar cada lead de forma segura no banco
- Encaminhar o lead aos destinos configurados (Pipedream, Make, n8n, CRMs etc.)
- Fornecer respostas consistentes e previsíveis para o cliente final

A Lead API foi construída com:

- **FastAPI (Python)** para alta performance
- **PostgreSQL (Neon)** para armazenamento confiável
- **Arquitetura assíncrona** para lidar com múltiplas requisições simultâneas
- **Dispatcher modular**, permitindo múltiplos destinos para o mesmo lead

Ela funciona como uma **infraestrutura estável**, oferecendo ao cliente uma alternativa profissional ao uso direto de webhooks, ferramentas externas ou scripts frágeis.
## 2. Arquitetura da Solução


A Lead API foi projetada em uma arquitetura modular e escalável, seguindo o fluxo abaixo:

1. **Recepção do lead**  
   A API recebe requisições `POST /lead/{client_slug}` contendo os dados enviados pelo site, formulário ou anúncio.

2. **Identificação do cliente (slug)**  
   O sistema valida o `client_slug` e carrega as configurações específicas do cliente, incluindo destino do dispatcher.

3. **Validação do payload**  
   O corpo da requisição é validado por um schema Pydantic (nome, email, telefone, segmento, mensagem, origem).

4. **Proteção Anti-Duplicados (janela de 15 minutos)**  
   Antes de processar qualquer lead, o sistema consulta o banco:
   - primeiro por **email**  
   - depois por **telefone** (fallback)  
   Se encontrar um lead igual dentro da janela de 15 minutos, retorna imediatamente:
   ```json
   { "duplicado": true, "id": "uuid-do-lead-existente" }
## 3. Endpoint Principal
POST /lead/{client_slug}

Endpoint responsável pelo recebimento de leads.

Exemplo:

POST https://api.codestech.pt/lead/codesagency

Headers recomendados
Content-Type: application/json
Accept: application/json


Se o cliente usar token (no plano Premium):

X-API-Token: SEU_TOKEN_AQUI
## 4. Payload – Estrutura e Validação
A API espera o seguinte formato JSON:

{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "telefone": "+351910000000",
  "segmento": "restaurantes",
  "mensagem": "Quero saber mais sobre o serviço.",
  "origem": "site"
}

Regras de validação:

nome: obrigatório

email: obrigatório, formato válido

telefone: obrigatório

segmento: opcional, mas recomendado

mensagem: opcional

origem: opcional (padrão: site)
## 5. Respostas e Status Codes
200 OK — Lead processado com sucesso
{
  "status": "ok",
  "duplicado": false,
  "id": "uuid-do-lead"
}

200 OK — Lead duplicado
{
  "status": "ok",
  "duplicado": true,
  "id": "uuid-já-existente"
}

401 Unauthorized

Token inválido ou ausente (quando o token é obrigatório).

422 Unprocessable Entity

Payload inválido ou faltando campos obrigatórios.

500 Internal Server Error

Erro inesperado no servidor.
## 6. Fluxo Completo da Requisição
POST /lead/{client_slug}

Validação do slug

Validação do payload (Pydantic)

Consulta ao banco (anti-duplicados)

Gravação do lead

Dispatcher (envio aos destinos)

Resposta ao cliente

Fluxo resumido:

Site → API → Validação → Dedupe → DB → Dispatcher → CRM
## 7. Proteção Anti-Duplicados (15 minutos)
A API protege o cliente contra:

spam

múltiplos envios do mesmo formulário

erros de usuário

falhas de browser

fluxos duplicados no site

Regras:

Email igual nos últimos 15 minutos → DUPLICADO

Se email não existir → verifica telefone

Telefone igual nos últimos 15 minutos → DUPLICADO

Se nenhum duplicado → grava no banco e segue
## 8. Exemplos de Uso (cURL, JS, Python)
cURL
curl -X POST https://api.codestech.pt/lead/codesagency \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste",
    "email": "teste@teste.com",
    "telefone": "+351910000000",
    "segmento": "geral",
    "mensagem": "Teste OK",
    "origem": "site"
}'

JavaScript (fetch)
fetch("https://api.codestech.pt/lead/codesagency", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    nome: "Teste",
    email: "teste@teste.com",
    telefone: "+351910000000"
  })
});

Python (requests)
import requests

payload = {
    "nome": "Teste",
    "email": "teste@teste.com",
    "telefone": "+351910000000"
}

r = requests.post(
    "https://api.codestech.pt/lead/codesagency",
    json=payload
)

print(r.json())
## 9. Erros Comuns e Soluções
❌ 401 – Token inválido

✔ Verificar header X-API-Token

❌ 422 – Payload inválido

✔ Campos ausentes
✔ JSON mal formatado

❌ Duplicado sem saber por quê

✔ Email ou telefone repetido nos últimos 15 minutos

❌ 500 – Algo inesperado

✔ Enviar log para suporte Codestech
## 10. Guia de Integração em 5 Minutos
Copiar endpoint do cliente

Configurar fetch/cURL/axios

Criar JSON com nome, email e telefone

Testar via Postman

Confirmar recebimento no CRM (ou webhook do cliente)

Produção liberada
## 11. Boas Práticas
Sempre enviar Content-Type: application/json

Sempre validar email antes de enviar

Evitar múltiplos envios do mesmo lead

Logar respostas da API no sistema do cliente

Se usar token, manter em variável de ambiente
