const request = require('request');
const cheerio = require('cheerio');

//const url = 'https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/mumbai-indians-vs-chennai-super-kings-33rd-match-1304079/full-scorecard';

const url = "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/kolkata-knight-riders-vs-gujarat-titans-35th-match-1304081/full-scorecard";

request(url, cb);
function cb(err, response, html){
    if(err){
        console.log(err);
        console.log("ERROR___\n");
    }
    if(html){
        batsmanBirthday(html);
    }
}

//batsman birthday's of winning team
function batsmanBirthday(html){
    const $ = cheerio.load(html);
    const teamNames = $(" .ci-team-score .ds-flex .ds-text-tight-l");
    const team1 = $(teamNames[0]).text();
    const team2 = $(teamNames[1]).text();
    
    const loserTeam = $("div .ds-flex .ds-opacity-50 span.ds-font-bold").text();
    
    let winner=team1;
    if(team1==loserTeam){
        winner=team2
    }


    let data = $("div div.ds-bg-fill-content-prime");
    let data1 = $(data[4]);
    let data2 = $(data[5]);

    let name1 = data1.find("div.ds-py-3 span.ds-font-bold").text();
    let name2 = data2.find("div.ds-py-3 span.ds-font-bold").text();
    name1 = name1.replace("INNINGS","").trim();
    name2 = name2.replace("INNINGS","").trim();

    let table = $("div.ReactCollapse--collapse");
    let table1;
    if(winner==name1){
        table1 = $(table[0]);
    }else{
        table1 = $(table[1]);
    }

    let batsman = table1.find("table.ds-w-full");
    let firstRow = $(batsman[0]).find("tr.ds-text-tight-s");

    
    
    for(let i=1; i<firstRow.length-1; i++){
        let cols = $(firstRow[i]).find("td");
        let name = $(cols[0]);
        let link = $(name).find('a').attr('href');
        link="https://www.espncricinfo.com/"+link;
        birthday(link);
    }

function birthday(link){
        request(link,cb2);
    }
function cb2(err, response, html){
        if(err){
            console.log("error occured : "+err);
        }
        if(html){
            loadBirthdayHTML(html);
        }
    }
function loadBirthdayHTML(html){
        const $ = cheerio.load(html);
        const birthday = $("div.ds-pt-4 div.ds-p-4 span");
        const name = $(birthday[0]).text();
        const date = $(birthday[1]).text();
        console.log(name + "\n" + date + "\n");
        
    }
}