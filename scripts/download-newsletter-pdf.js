const https = require("https");
const fs = require("fs");
const path = require("path");

// Newsletter PDFs found on source page
const newsletterPdfs = [
  "https://hprc.in/documents/HPRC-Newsletter-18th-May-2015-Edition.pdf",
  "https://hprc.in/documents/HPRC-Newsletter-20th-March-2015-Edition.pdf",
  "https://hprc.in/documents/Equestrian-Essentiality-January-2015-Edition.pdf",
  "https://hprc.in/documents/HPRC-Newsletter-20th-March-2015-Edition-1.pdf",
  "https://hprc.in/documents/HPRC-Newsletter-20th-February-2015-Edition.pdf",
  "https://hprc.in/documents/HPRC-Newsletter-20th-February-2015-Edition-1.pdf",
  "https://hprc.in/documents/HPRC-Newsletter-20th-February-2015-Edition-2.pdf",
  "https://hprc.in/documents/HPRC-Newsletter-20th-February-2015-Edition-3.pdf",
  "https://hprc.in/documents/HPRC-Newsletter-20th-March-2015-Edition-1.pdf",
  "https://hprc.in/documents/HPRC-Newsletter-20th-March-2015-Edition-2.pdf",
  "https://hprc.in/documents/HPRC-Newsletter-20th-March-2015-Edition-3.pdf",
  "https://hprc.in/documents/HPRC-Newsletter-20th-March-2015-Edition-4.pdf",
];

const downloadDir = path.join(__dirname, "..", "public", "documents", "newsletters");

if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

function downloadFile(url, filepath) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(filepath);

    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            console.log(`Downloaded: ${path.basename(filepath)}`);
            resolve(true);
          });
        } else {
          file.close();
          if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
          }
          console.log(`Failed: ${url}`);
          resolve(false);
        }
      })
      .on("error", () => {
        file.close();
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        resolve(false);
      });
  });
}

async function downloadAll() {
  console.log("Downloading newsletter PDFs...\n");

  for (const url of newsletterPdfs) {
    const filename = url.split("/").pop();
    const filepath = path.join(downloadDir, filename);
    await downloadFile(url, filepath);
  }

  console.log("\nDownload complete!");
}

downloadAll();
