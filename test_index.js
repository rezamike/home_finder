const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const port = 5173;

const headers = {
  AUTHORIZATION: "c479a87e-e910-4730-9c58-df3a7b54ae11",
  "user-agent": "null",
};

async function scrape_page(url) {
  try {
    const response = await axios.get(
      `https://recorder.maricopa.gov/recdocdata/${url}`,
      { headers }
    );
    const $ = cheerio.load(response.data);

    const link_main = [];
    //config select
    $(".main_area table td").each((i, element) => {
      if ($(element).find("a").attr("href") != null) {
        const link = $(element).find("a").attr("href");
        link_main.push("https://recorder.maricopa.gov/recdocdata/" + link);
      }
    });
    const scraped_data = {
      final_link: link_main,
    };
    return scraped_data;
  } catch (error) {
    console.error("Error scraping page:", error);
    return null;
  }
}

app.get("/", async (req, res) => {
  try {
    const initial_response = await axios.get(
      "https://recorder.maricopa.gov/recdocdata/GetRecDataRecentPgDn.aspx?rec=0&suf=&nm=&bdt=1%2f1%2f2024&edt=1%2f31%2f2024&cde=NS&max=20&res=True&doc1=NS&doc2=&doc3=&doc4=&doc5=",
      { headers }
    );
    const $ = cheerio.load(initial_response.data);

    const links = [];
    //config main
    $(".main_area table tr").each((i, element) => {
      if ($(element).find("a").attr("href") != null) {
        const link = $(element).find("a").attr("href");
        links.push(link);
      }
    });

    const scraped_data = [];
    for (const link of links) {
      const data = await scrape_page(link);
      if (data) {
        scraped_data.push(data);
      }
    }

    res.json(scraped_data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
