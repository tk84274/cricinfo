const request = require("request");
const cheerio = require('cheerio');
const url = "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/mumbai-indians-vs-chennai-super-kings-33rd-match-1304079/ball-by-ball-commentary";

request(url, cb);

function cb(err, response, html){
    if(err){
        console.log(err);   
    }
    if(html){
        lbc(html);
    }
}
// Selecting last ball commentary of the match
function lbc(html){
    const $ = cheerio.load(html);
    const textarray = $("div[itemprop='articleBody']>p");
    const text = $(textarray[0]).text();
    console.log(text);
}

