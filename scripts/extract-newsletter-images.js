const https = require("https");
const fs = require("fs");

https
  .get("https://hprc.in/newsletters.html", (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      const newsletters = [];

      // Extract newsletter sections with images
      // Look for newsletter titles and their associated images
      const newsletterTitles = [
        "NATIONAL EQUESTRIAN CHAMPIONSHIP 2016",
        "4th HYDERABAD HORSE SHOW OCTOBER 2015 EDITION",
        "HPRC NEWSLETTER 18th MAY 2015 EDITION",
        "HPRC NEWSLETTER 20th MARCH 2015 EDITION",
        "EQUESTRIAN ESSENTIALITY JANUARY 2015 EDITION",
        "THE FIRST HYDERABAD HORSE SHOW DECEMBER 2014 EDITION",
      ];

      newsletterTitles.forEach((title) => {
        // Find the section for this newsletter
        const titleRegex = new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
        const sectionMatch = data.match(
          new RegExp(`(${titleRegex.source}[\\s\\S]*?)(?=<h6|$)`, "i"),
        );

        if (sectionMatch) {
          const section = sectionMatch[1];

          // Extract images from this section
          const imgPattern = /<img[^>]*src=['"]([^'"]+)['"][^>]*>/gi;
          const images = [];
          let imgMatch;

          while ((imgMatch = imgPattern.exec(section)) !== null) {
            let src = imgMatch[1];
            if (src.startsWith("/")) {
              src = "https://hprc.in" + src;
            } else if (!src.startsWith("http")) {
              src = "https://hprc.in/" + src;
            }

            // Filter out logos and icons
            if (
              !src.includes("logo") &&
              !src.includes("icon") &&
              !src.includes("favicon") &&
              !src.includes("banner") &&
              !src.includes("telephone") &&
              (src.includes("Newsletter") ||
                src.includes("Equestrian") ||
                src.includes("Horse") ||
                src.includes("Championship") ||
                src.match(/\.(jpg|jpeg|png|gif)$/i))
            ) {
              images.push(src);
            }
          }

          // Extract PDF URL
          const pdfMatch = section.match(/href=['"]([^'"]*\.pdf)['"]/i);
          const pdfUrl = pdfMatch ? pdfMatch[1] : "";
          const fullPdfUrl = pdfUrl
            ? pdfUrl.startsWith("http")
              ? pdfUrl
              : `https://hprc.in${pdfUrl.startsWith("/") ? "" : "/"}${pdfUrl}`
            : "";

          newsletters.push({
            title: title,
            images: images,
            pdfUrl: fullPdfUrl,
          });
        }
      });

      // Also try to find images by looking for common patterns
      const allImages = [];
      const imgPattern = /<img[^>]*src=['"]([^'"]+)['"][^>]*>/gi;
      let imgMatch;

      while ((imgMatch = imgPattern.exec(data)) !== null) {
        let src = imgMatch[1];
        if (src.startsWith("/")) {
          src = "https://hprc.in" + src;
        } else if (!src.startsWith("http")) {
          src = "https://hprc.in/" + src;
        }

        if (
          !src.includes("logo") &&
          !src.includes("icon") &&
          !src.includes("favicon") &&
          !src.includes("banner") &&
          !src.includes("telephone") &&
          (src.includes("Newsletter") ||
            src.includes("Equestrian") ||
            src.includes("Horse") ||
            src.includes("Championship") ||
            src.includes("pdf") ||
            src.match(/\.(jpg|jpeg|png|gif)$/i))
        ) {
          if (!allImages.includes(src)) {
            allImages.push(src);
          }
        }
      }

      const output = {
        newsletters: newsletters,
        allImages: allImages,
      };

      fs.writeFileSync("newsletter-images.json", JSON.stringify(output, null, 2));

      console.log("Newsletter images found:");
      newsletters.forEach((n, i) => {
        console.log(`\n${i + 1}. ${n.title}`);
        console.log(`   Images: ${n.images.length}`);
        n.images.forEach((img) => console.log(`     - ${img}`));
        console.log(`   PDF: ${n.pdfUrl}`);
      });

      console.log(`\n\nAll images found: ${allImages.length}`);
      allImages.slice(0, 10).forEach((img, i) => {
        console.log(`${i + 1}. ${img}`);
      });

      console.log("\nSaved to newsletter-images.json");
    });
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
