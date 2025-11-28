#!/bin/bash
curl -X POST "https://api.codestech.pt/lead/codesagency" \
  -H "Content-Type: application/json" \
  -H "X-API-Token: SEU_TOKEN_AQUI" \
  -d '{"nome": "Teste Via cURL"}'
