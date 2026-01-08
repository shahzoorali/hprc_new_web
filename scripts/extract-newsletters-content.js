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

      // Look for all HPRC NEWSLETTER sections
      const hprcRegex = /<h6[^>]*HPRC NEWSLETTER[\s\S]*?<\/h6>/gi;
      const hprcMatch = data.match(hprcRegex);

      if (hprcMatch) {
        hprcMatch.forEach((section, index) => {
          // Extract content between the h6 tags
          const contentMatch = section.match(/HPRC NEWSLETTER[\s\S]*?<\/h6>([\s\S]*?)<\/h6>/i);

          if (contentMatch) {
            const content = contentMatch[1];

            // Extract date - look for common date patterns
            const dateMatch = content.match(
              /(\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)[a-z]+),?s+(\d{1,2}(?:st|nd|rd|th)[a-z]+),?s+(\d{4})/g,
            );

            let title = "";
            // Extract heading/title
            const headingMatch = content.match(
              /(?:October|November|December|January|February|March|April|May|June|July|August|September)\s+\d{1,2}\s+(?:st|nd|rd|th)/i,
            );

            if (headingMatch) {
              title = headingMatch[0].replace(/HPRC NEWSLETTER/gi, "").trim();
            }

            // Look for PDF links
            const pdfLinks = content.match(/href=['"]([^'"]+\.pdf)['"]/gi);

            let pdfUrl = "";
            if (pdfLinks && pdfLinks.length > 0) {
              pdfUrl = pdfLinks[0][1];
            }

            newsletters.push({
              index: newsletters.length + index + 1,
              title: title || "HPRC Newsletter",
              date: dateMatch ? dateMatch[0] : "",
              content: content.replace(/<[^>]+>/g, " ").trim(),
              pdfUrl: pdfUrl || "",
            });
          }
        });
      }

      // Sort by index (reversing to get most recent first)
      const sortedNewsletters = newsletters.sort((a, b) => b.index - a.index);

      const output = {
        newsletters: sortedNewsletters,
        count: sortedNewsletters.length,
      };

      fs.writeFileSync("newsletters-content.json", JSON.stringify(output, null, 2));

      console.log(`Extracted ${sortedNewsletters.length} newsletters`);
      sortedNewsletters.slice(0, 10).forEach((n, i) => {
        console.log(`${i + 1}. ${n.title}`);
        console.log(`   Date: ${n.date}`);
        console.log(`   PDF: ${n.pdfUrl ? "Yes" : "No"}`);
      });

      console.log(`\nSaved to newsletters-content.json`);
    });
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
    fs.writeFileSync(
      "newsletters-content.json",
      JSON.stringify({ newsletters: [], error: err.message }),
    );
  });
