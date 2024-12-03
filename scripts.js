const initRankData = [
  {
    Owner: "Denny", //0
    TeamName: "Cage the Hampster",
    Wins: 6,
    Losses: 7,
    Ties: 0,
    PointsFor: 1574.82,
    PointsAgainst: 1479.04,
    CurrentProjected: 64.49
  },
  {
    Owner: "Snow", //1
    TeamName: "Legs and Eggs",
    Wins: 6,
    Losses: 7,
    Ties: 0,
    PointsFor: 1448.46,
    PointsAgainst: 1529.90,
    CurrentProjected: 96.8
  },
  {
    Owner: "Spence", //2
    TeamName: "Cucksgiving",
    Wins: 4,
    Losses: 9,
    Ties: 0,
    PointsFor: 1371.44,
    PointsAgainst: 1603.12,
    CurrentProjected: 105.1
  },
  {
    Owner: "Gools", //3
    TeamName: "Pre-Natal Drip",
    Wins: 5,
    Losses: 8,
    Ties: 0,
    PointsFor: 1552.66,
    PointsAgainst: 1519.62,
    CurrentProjected: 93.9
  },
  {
    Owner: "Kev", //4
    TeamName: "WTF is going on",
    Wins: 4,
    Losses: 9,
    Ties: 0,
    PointsFor: 1371.66,
    PointsAgainst: 1556.3,
    CurrentProjected: 92.0
  },
  {
    Owner: "Zach", //5
    TeamName: "The Dollar Menu",
    Wins: 5,
    Losses: 8,
    Ties: 0,
    PointsFor: 1357.48,
    PointsAgainst: 1485.6,
    CurrentProjected: 69.01
  },
  {
    Owner: "Ty", //6
    TeamName: "Let's Go Goffing",
    Wins: 9,
    Losses: 4,
    Ties: 0,
    PointsFor: 1494.26,
    PointsAgainst: 1354.76,
    CurrentProjected: 88.34
  },
  {
    Owner: "Dan", //7
    TeamName: "Football Butt69",
    Wins: 9,
    Losses: 4,
    Ties: 0,
    PointsFor: 1525.32,
    PointsAgainst: 1368.04,
    CurrentProjected: 104.82
  },
  {
    Owner: "Jeff", //8
    TeamName: "Parker Meadows",
    Wins: 9,
    Losses: 4,
    Ties: 0,
    PointsFor: 1553.5,
    PointsAgainst: 1371.68,
    CurrentProjected: 87.42
  },
  {
    Owner: "Brandon", //9
    TeamName: "Jerking Goff",
    Wins: 7,
    Losses: 6,
    Ties: 0,
    PointsFor: 1555.8,
    PointsAgainst: 1518.3,
    CurrentProjected: 112.33
  },
  {
    Owner: "Billy", //10
    TeamName: "Sonic",
    Wins: 9,
    Losses: 4,
    Ties: 0,
    PointsFor: 1499.32,
    PointsAgainst: 1482.2,
    CurrentProjected: 75.76
  },
  {
    Owner: "Beast", //11
    TeamName: "Beast From The East",
    Wins: 5,
    Losses: 8,
    Ties: 0,
    PointsFor: 1565.00,
    PointsAgainst: 1601.16,
    CurrentProjected: 105.3
  }
];

const matchups = [
  {
    HomeTeam: 3,
    AwayTeam: 1
  },
  {
    HomeTeam: 11,
    AwayTeam: 2
  },
  {
    HomeTeam: 0,
    AwayTeam: 9
  },
  {
    HomeTeam: 6,
    AwayTeam: 4
  },
  {
    HomeTeam: 5,
    AwayTeam: 10
  },
  {
    HomeTeam: 8,
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
