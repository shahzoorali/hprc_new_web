const https = require("https");
const fs = require("fs");
const path = require("path");

const images = [
  "https://hprc.in/images/gallery/NewsLetter01.jpg",
  "https://hprc.in/images/gallery/NewsLetter02.jpg",
  "https://hprc.in/images/gallery/NewsLetter03.jpg",
  "https://hprc.in/images/gallery/NewsLetter04.jpg",
  "https://hprc.in/images/gallery/NewsLetter05.jpg",
  "https://hprc.in/images/gallery/NewsLetter06.jpg",
];

const imageDir = path.join(__dirname, "..", "public", "documents", "newsletters", "images");

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
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
            console.log(`✓ Downloaded: ${path.basename(filepath)}`);
            resolve(true);
          });
        } else {
          file.close();
          if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
          }
          console.log(`✗ Failed (${response.statusCode}): ${url}`);
          resolve(false);
        }
      })
      .on("error", (err) => {
        file.close();
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        console.log(`✗ Error: ${url} - ${err.message}`);
        resolve(false);
      });
  });
}

async function downloadAll() {
  console.log("Downloading newsletter featured images...\n");

  for (const url of images) {
    const filename = url.split("/").pop();
    const filepath = path.join(imageDir, filename);
    await downloadFile(url, filepath);
  }

  console.log(`\n✓ Download complete! Files saved to: ${imageDir}`);
}

downloadAll();
