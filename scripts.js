const initRankData = [
  {
    Owner: "Denny", //0
    TeamName: "Cage the Hampster",
    Wins: 6,
    Losses: 7,
    Ties: 0,
    PointsFor: 1334.78,
    PointsAgainst: 1457.12,
    CurrentProjected: 103.72
  },
  {
    Owner: "Snow", //1
    TeamName: "4🤡1🏆",
    Wins: 6,
    Losses: 7,
    Ties: 0,
    PointsFor: 1515.46,
    PointsAgainst: 1588.58,
    CurrentProjected: 116.26
  },
  {
    Owner: "Spence", //2
    TeamName: "Who Talkin?",
    Wins: 1,
    Losses: 12,
    Ties: 0,
    PointsFor: 1422.24,
    PointsAgainst: 1683.88,
    CurrentProjected: 104.24
  },
  {
    Owner: "Gools", //3
    TeamName: "Human Clay",
    Wins: 5,
    Losses: 8,
    Ties: 0,
    PointsFor: 1522.32,
    PointsAgainst: 1554.02,
    CurrentProjected: 110.6
  },
  {
    Owner: "Kev", //4
    TeamName: "Titanic",
    Wins: 6,
    Losses: 7,
    Ties: 0,
    PointsFor: 1407.58,
    PointsAgainst: 1422.58,
    CurrentProjected: 113.94
  },
  {
    Owner: "Zach", //5
    TeamName: "Onward & Upward",
    Wins: 10,
    Losses: 3,
    Ties: 0,
    PointsFor: 1741.6,
    PointsAgainst: 1505.38,
    CurrentProjected: 111.79
  },
  {
    Owner: "Ty", //6
    TeamName: "Let's Go Goffing",
    Wins: 6,
    Losses: 7,
    Ties: 0,
    PointsFor: 1397.48,
    PointsAgainst: 1498.34,
    CurrentProjected: 102.5
  },
  {
    Owner: "Dan", //7
    TeamName: "Siddeeq Shabazz",
    Wins: 9,
    Losses: 4,
    Ties: 0,
    PointsFor: 1437.44,
    PointsAgainst: 1378.24,
    CurrentProjected: 103.02
  },
  {
    Owner: "Jeff", //8
    TeamName: "Austin Meadows",
    Wins: 7,
    Losses: 6,
    Ties: 0,
    PointsFor: 1330.52,
    PointsAgainst: 1385.62,
    CurrentProjected: 93.49
  },
  {
    Owner: "Brandon", //9
    TeamName: "CD's Nuts",
    Wins: 7,
    Losses: 6,
    Ties: 0,
    PointsFor: 1552.36,
    PointsAgainst: 1395.96,
    CurrentProjected: 113.12
  },
  {
    Owner: "Billy", //10
    TeamName: "Puka Troopa",
    Wins: 6,
    Losses: 7,
    Ties: 0,
    PointsFor: 1553.28,
    PointsAgainst: 1396.40,
    CurrentProjected: 85.24
  },
  {
    Owner: "Beast", //11
    TeamName: "Beast From The East",
    Wins: 9,
    Losses: 4,
    Ties: 0,
    PointsFor: 1511.24,
    PointsAgainst: 1460.18,
    CurrentProjected: 105.78
  }
];

const matchups = [
  {
    HomeTeam: 3,
    AwayTeam: 1
  },
  {
    HomeTeam: 11,
    AwayTeam: 8
  },
  {
    HomeTeam: 0,
    AwayTeam: 2
  },
  {
    HomeTeam: 6,
    AwayTeam: 10
  },
  {
    HomeTeam: 5,
    AwayTeam: 9
  },
  {
    HomeTeam: 4,
    AwayTeam: 7
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
