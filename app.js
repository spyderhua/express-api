const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = 3000;

const fetchData = async (url) => {
    const result = await axios.get(url);
    return cheerio.load(result.data);
};

const getWebsiteData = async (url) => {
  const $ = await fetchData(url);
  const nameDivs = $('div.name');
  // console.log(nameDivs);
  const names = nameDivs.map((index, element) => $(element).text()).get();
  // console.log(names);
  let filteredStrings = names.filter(
    (str) => str.includes("預購") && !str.includes("滿單")
  );
  return filteredStrings;
};

app.get('/data', async (req, res) => {
    const data = await getWebsiteData('https://lessonone.com.tw');
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/data`);
});