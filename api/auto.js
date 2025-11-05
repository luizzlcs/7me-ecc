export default async function handler(req, res) {
  console.log("🚀 Endpoint de automação iniciado na Vercel...");
  
  try {
  // Exemplo: aciona um servidor externo (Railway, Render, etc.)
  const response = await fetch("[https://seuservicoexterno.com/run-playwright](https://seuservicoexterno.com/run-playwright)", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
  origem: "vercel",
  acao: "iniciar_automacao",
  }),
  });
  
  ```
  const result = await response.json();
  
  console.log("✅ Webhook acionado com sucesso:", result);
  
  return res.status(200).json({
    success: true,
    message: "Automação enviada para execução externa.",
    detalhes: result,
  });
  ```
  
  } catch (error) {
  console.error("❌ Erro ao acionar automação:", error);
  return res.status(500).json({
  success: false,
  error: error.message,
  });
  }
  }
  