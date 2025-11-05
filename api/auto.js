import { chromium, devices } from "@playwright/test";

export default async function handler(req, res) {
  const iPhone = devices["iPhone 13 Pro"];
  let browser;

  try {
    console.log("🚀 Iniciando automação na Vercel...");

    browser = await chromium.launch({
      headless: true, // obrigatório na Vercel (não há interface)
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });

    const context = await browser.newContext({
      ...iPhone,
    });

    const page = await context.newPage();

    console.log("📱 Acessando página...");
    await page.goto(
      "https://giving.7me.app/guest-donation/church/31c2a290-961a-4eea-922e-2bc59e1eef7a",
      { waitUntil: "domcontentloaded" }
    );

    // ====== 1️⃣ CLICAR EM "OUTRAS OFERTAS" ======
    console.log("🟢 Clicando em 'Outras Ofertas'...");
    await page.waitForSelector('span.category-title:text("Outras Ofertas")', { timeout: 10000 });
    await page.click('span.category-title:text("Outras Ofertas")');

    // ====== 2️⃣ CLICAR EM "Eventos e Outros" ======
    console.log("🎯 Clicando em 'Eventos e Outros'...");
    await page.waitForSelector('span.rectangle-text:text("Eventos e Outros")', { timeout: 15000 });
    await page.click('span.rectangle-text:text("Eventos e Outros")');

    // ====== 3️⃣ DIGITAR "Cristo" NO CAMPO DE PESQUISA ======
    console.log("🔍 Digitando 'Cristo'...");
    await page.waitForSelector("#searchInputOffer", { timeout: 10000 });
    const input = page.locator("#searchInputOffer");
    await input.click();
    await input.fill("Cristo");

    // ====== 4️⃣ CLICAR EM "Encontro com Cristo" ======
    console.log("🙏 Clicando em 'Encontro com Cristo'...");
    await page.waitForSelector('span.rectangle-text:text("Encontro com Cristo")', { timeout: 15000 });
    await page.click('span.rectangle-text:text("Encontro com Cristo")');

    console.log("✅ Automação concluída com sucesso!");
    await browser.close();

    return res.status(200).json({ success: true, message: "Automação concluída!" });
  } catch (error) {
    console.error("❌ Erro durante a automação:", error);
    if (browser) await browser.close();
    return res.status(500).json({ success: false, error: error.message });
  }
}
