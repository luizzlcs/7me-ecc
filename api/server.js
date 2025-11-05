import express from "express";
import { chromium, devices } from "@playwright/test";

const app = express();
app.use(express.json());

app.post("/rodar", async (req, res) => {
  const iPhone = devices["iPhone 13 Pro"];
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const context = await browser.newContext({ ...iPhone });
  const page = await context.newPage();

  try {
    await page.goto("https://giving.7me.app/guest-donation/church/31c2a290-961a-4eea-922e-2bc59e1eef7a");
    await page.click('span.category-title:text("Outras Ofertas")');
    await page.click('span.rectangle-text:text("Eventos e Outros")');
    await page.fill("#searchInputOffer", "Cristo");
    await page.click('span.rectangle-text:text("Encontro com Cristo")');

    await browser.close();
    res.json({ sucesso: true, msg: "Automação concluída!" });
  } catch (err) {
    await browser.close();
    res.status(500).json({ erro: err.message });
  }
});

app.listen(3000, () => console.log("🚀 Servidor Playwright rodando na porta 3000"));
