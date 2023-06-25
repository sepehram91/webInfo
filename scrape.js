const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

//Header
writeStream.write(`Ranking,Name,Rating\n`);

axios.get('https://www.imdb.com/chart/top/?sort=rk,asc&mode=simple&page=1')
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('tbody.lister-list > tr').each((i, el) => {
      const number = $(el).find('.titleColumn').text().trim().split('.')[0];
      const link = $(el).find('.titleColumn a').text().replace(/,/, "");
      const rating = $(el).find('.imdbRating').text().trim();
      
      writeStream.write(`${rating},${link},${rating}\n`);
    });

    console.log("Data has been written to post.csv");
  })
  .catch((error) => {
    console.error(error);
  });
