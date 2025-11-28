async function sendLead() {
  const response = await fetch("https://api.codestech.pt/lead/codesagency", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Token": "SEU_TOKEN_AQUI",
    },
    body: JSON.stringify({
      nome: "Lead via JS Fetch",
      email: "javascript@example.com",
    }),
  });

  console.log(await response.json());
}

sendLead();
