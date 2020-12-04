const initRankData = [
  {
    Owner: "Denny", //0
    TeamName: "Cage the Hampster",
    Wins: 4,
    Losses: 8,
    Ties: 0,
    PointsFor: 1079.08,
    PointsAgainst: 1208.66,
    CurrentProjected: 96.24
  },
  {
    Owner: "Snow", //1
    TeamName: "Leonard Fourbutts",
    Wins: 6,
    Losses: 6,
    Ties: 0,
    PointsFor: 1159.58,
    PointsAgainst: 1172.70,
    CurrentProjected: 99.01
  },
  {
    Owner: "Spence", //2
    TeamName: "Texas Pete",
    Wins: 5,
    Losses: 7,
    Ties: 0,
    PointsFor: 1060.88,
    PointsAgainst: 1103.18,
    CurrentProjected: 93.57
  },
  {
    Owner: "Gools", //3
    TeamName: "GA$EOUS KLAY",
    Wins: 5,
    Losses: 7,
    Ties: 0,
    PointsFor: 1067.98,
    PointsAgainst: 1126.54,
    CurrentProjected: 92.19
  },
  {
    Owner: "Kev", //4
    TeamName: "Srlslyfckthisteam.",
    Wins: 9,
    Losses: 3,
    Ties: 0,
    PointsFor: 1375.80,
    PointsAgainst: 1093.40,
    CurrentProjected: 98.14
  },
  {
    Owner: "Zach", //5
    TeamName: "We're on the board",
    Wins: 6,
    Losses: 6,
    Ties: 0,
    PointsFor: 1143.78,
    PointsAgainst: 1169.42,
    CurrentProjected: 99.01
  },
  {
    Owner: "Ty", //6
    TeamName: "Russel Wilson",
    Wins: 6,
    Losses: 6,
    Ties: 0,
    PointsFor: 1167.50,
    PointsAgainst: 1196.68,
    CurrentProjected: 103.43
  },
  {
    Owner: "Dan", //7
    TeamName: "Suq Madiq",
    Wins: 7,
    Losses: 5,
    Ties: 0,
    PointsFor: 1187.90,
    PointsAgainst: 1190.48,
    CurrentProjected: 104.37
  },
  {
    Owner: "Jeff", //8
    TeamName: "Dad Says What",
    Wins: 8,
    Losses: 4,
    Ties: 0,
    PointsFor: 1223.62,
    PointsAgainst: 1063.36,
    CurrentProjected: 93.03
  },
  {
    Owner: "Jr", //9
    TeamName: "All Eyez On Me",
    Wins: 5,
    Losses: 7,
    Ties: 0,
    PointsFor: 1037.12,
    PointsAgainst: 1090.30,
    CurrentProjected: 69.94
  },
  {
    Owner: "Billy", //10
    TeamName: "I Don't Like Sand",
    Wins: 6,
    Losses: 6,
    Ties: 0,
    PointsFor: 1196.34,
    PointsAgainst: 1160.88,
    CurrentProjected: 90.00
  },
  {
    Owner: "Beast", //11
    TeamName: "Beast From The East",
    Wins: 5,
    Losses: 7,
    Ties: 0,
    PointsFor: 1079.70,
    PointsAgainst: 1203.68,
    CurrentProjected: 87.73
  }
];

const matchups = [
  {
    HomeTeam: 3,
    AwayTeam: 1
  },
  {
    HomeTeam: 11,
    AwayTeam: 7
  },
  {
    HomeTeam: 0,
    AwayTeam: 4
  },
  {
    HomeTeam: 6,
    AwayTeam: 9
  },
  {
    HomeTeam: 5,
    AwayTeam: 10
  },
  {
    HomeTeam: 8,
    AwayTeam: 2
  },
];

function InitMatchups()
{
  let rowTemplate = document.createElement("tr");
  rowTemplate.classList.add("matchup-row");
  let playerTemplate = document.createElement("td");
  playerTemplate.classList.add("player");
  let scoreTemplate = document.createElement("td");
  playerTemplate.classList.add("score");
  let inputTemplate = document.createElement("input");
  inputTemplate.type = "number";
  inputTemplate.classList.add("score-input");

  let tbody = document.querySelector("#matchupTable tbody");
  for (let i in matchups) {
    let homeTeam = initRankData[matchups[i].HomeTeam];
    let awayTeam = initRankData[matchups[i].AwayTeam];

    let row = rowTemplate.cloneNode();
    let homePlayer = playerTemplate.cloneNode();
    homePlayer.innerText = homeTeam.TeamName;
    let awayPlayer = playerTemplate.cloneNode();
    awayPlayer.innerText = awayTeam.TeamName;

    let homeScore = scoreTemplate.cloneNode();
    let homeInput = inputTemplate.cloneNode();
    homeInput.id = homeTeam.Owner + "Score";
    homeInput.value = homeTeam.CurrentProjected;
    homeInput.dataset.opp = awayTeam.Owner + "Score";
    homeScore.appendChild(homeInput);

    let awayScore = scoreTemplate.cloneNode();
    let awayInput = inputTemplate.cloneNode();
    awayInput.id = awayTeam.Owner + "Score";
    awayInput.value = awayTeam.CurrentProjected;
    awayInput.dataset.opp = homeTeam.Owner + "Score";
    awayScore.appendChild(awayInput);

    row.appendChild(homePlayer);
    row.appendChild(homeScore);
    row.appendChild(awayScore);
    row.appendChild(awayPlayer);
    tbody.appendChild(row);
  }
}

function BuildRankTable() {
  var rankData = JSON.parse(JSON.stringify(initRankData));
  for (let i in rankData) {
    var team = rankData[i];
    var teamInput = document.getElementById(team.Owner + "Score");

    var teamScore = parseFloat(teamInput.value);
    var oppScore = parseFloat(
      document.getElementById(teamInput.dataset.opp).value
    );

    if (teamScore > oppScore) {
      team.Wins++;
      teamInput.style.border = "2px solid #33ff0077";
    } else if (oppScore > teamScore) {
      team.Losses++;
      teamInput.style.border = "2px solid #de173877";
    } else if (teamScore === oppScore) {
      team.Ties++;
      teamInput.style.border = "2px solid #cccccc77";
    }

    team.PointsFor += teamScore;
    team.PointsAgainst += oppScore;
  }

  rankData.sort((l, r) => {
    if (l.Wins > r.Wins) return -1;
    else if (r.Wins > l.Wins) return 1;
    else if (l.Ties > r.Ties) return -1;
    else if (r.Ties > l.Ties) return 1;
    else if (l.PointsFor > r.PointsFor) return -1;
    else if (r.PointsFor > l.PointsFor) return 1;
    else return 0;
  });

  let standingsBody = document.getElementById("standingsBody");
  standingsBody.innerHTML = "";

  for (let i in rankData) {
    var team = rankData[i];
    var row = document.createElement("tr");
    row.classList.add("standings-row");

    var ranktd = document.createElement("td");
    ranktd.classList.add("rank");
    ranktd.innerHTML = ++i;
    row.appendChild(ranktd);

    var teamtd = document.createElement("td");
    teamtd.innerHTML = team.TeamName;
    row.appendChild(teamtd);

    var wlttd = document.createElement("td");
    wlttd.innerHTML = team.Wins + "-" + team.Losses + "-" + team.Ties;
    row.appendChild(wlttd);

    var pntsfortd = document.createElement("td");
    pntsfortd.classList.add("points");
    pntsfortd.innerHTML = team.PointsFor.toFixed(2);
    row.appendChild(pntsfortd);

    var pntsagntstd = document.createElement("td");
    pntsagntstd.classList.add("points");
    pntsagntstd.innerHTML = team.PointsAgainst.toFixed(2);
    row.appendChild(pntsagntstd);

    standingsBody.appendChild(row);
  }
}
