const axios = require('axios');
const cheerio = require('cheerio');

function telegraphgen() {
    return new Promise((resolve, reject) => {
        const article = [];

        axios.get('https://www.telegraph.co.uk/football/')
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            let i = 0
            $('#main-content a span', html).each(function () {
                const title = $(this).text();
                const url = $(this).attr('href');

                if (i % 2 !== 0 && title.length > 50) {
                    article.push({
                        title,
                        url
                    });
                }
                i++;
            });
            resolve(article);
        })
        .catch((err) => {
            reject(err);
        });
    });
}



module.exports = telegraphgen;