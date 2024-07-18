const ejs = require("ejs");
const puppeteer = require("puppeteer");
const path = require("path");

const generatePDF = async (booking) => {
  const html = await ejs.renderFile(
    path.join(__dirname, "..", "templates", "booking.ejs"),
    { booking }
  );

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();

  return pdfBuffer;
};

module.exports = { generatePDF };
