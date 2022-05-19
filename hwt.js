const request = require('request');
const cheerio = require('cheerio');
const { text } = require('cheerio/lib/static');

const url = 'https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/mumbai-indians-vs-chennai-super-kings-33rd-match-1304079/full-scorecard';

// const url = "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/kolkata-knight-riders-vs-gujarat-titans-35th-match-1304081/full-scorecard";

// making request
request(url, cb);
function cb(err, response, html){
    if(err){
        console.log(err);
        console.log("ERROR___\n");
    }
    if(html){
        hwt(html);
    }
}
//Name of highest wicket taker bowler of winning team
function hwt(html){
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

    let bowler = table1.find("table.ds-w-full");
    let firstRow = $(bowler[1]).find("tr");

    let hwt = 0;
    let playerName;
    for(let i=0; i<firstRow.length; i++){
        let cols = $(firstRow[i]).find("td");
        let name = $(cols[0]).text();
        let wickets = $(cols[4]).text();
        if(wickets>hwt){
            hwt=wickets;
            playerName=name;
        }
    }
    console.log("Winning Team : " + winner + "\nBowler : " + playerName + "\nWickets Taken : " + hwt);
}