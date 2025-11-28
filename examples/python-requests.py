import requests

url = "https://api.codestech.pt/lead/codesagency"
headers = {
    "Content-Type": "application/json",
    "X-API-Token": "SEU_TOKEN_AQUI",
}
payload = {
    "nome": "Lead via Python",
    "email": "python@example.com"
}

resp = requests.post(url, json=payload, headers=headers)
print(resp.status_code, resp.json())
