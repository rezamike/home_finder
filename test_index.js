const request = require("request");
const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const app = express();

app.use(express.json());

app.listen(5173, () => {
  console.log("server started on 5173");
});

const config_main = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://recorder.maricopa.gov/recdocdata/GetRecDataRecentPgDn.aspx?rec=0&suf=&nm=&bdt=1%2f1%2f2024&edt=1%2f31%2f2024&cde=NS&max=20&res=True&doc1=NS&doc2=&doc3=&doc4=&doc5=",
  headers: {
    AUTHORIZATION: "c479a87e-e910-4730-9c58-df3a7b54ae11",
    "user-agent": "null",
  },
};

const config_select = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://recorder.maricopa.gov/recdocdata/GetRecDataRecentDetail.aspx?rec=20240000140",
  headers: {
    AUTHORIZATION: "c479a87e-e910-4730-9c58-df3a7b54ae11",
    "user-agent": "null",
  },
};

app.get("/data", function (req, res) {
  axios
    .request(config)
    .then((response) => {
      const links = [];
      const $ = cheerio.load(response.data);

      //config select
      // $(".main_area table td").each((i, element) => {
      //   if ($(element).find("a").attr("href") != null) {
      //     const link = $(element).find("a").attr("href");
      //     links.push(link);
      //   }
      // });

      //config main
      $(".main_area table tr").each((i, element) => {
        if ($(element).find("a").attr("href") != null) {
          const link = $(element).find("a").attr("href");
          links.push(link);
        }
      });

      res.send(links);
    })
    .catch((error) => {
      console.log(error);
    });
});
