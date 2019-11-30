const initRankData = [
  {
    Owner: "Denny",
    TeamName: "Cage the Hampster",
    Wins: 10,
    Losses: 2,
    Ties: 0,
    PointsFor: 1135.52,
    PointsAgainst: 1108.74
  },
  {
    Owner: "Snow",
    TeamName: "Topless Tapas",
    Wins: 7,
    Losses: 5,
    Ties: 0,
    PointsFor: 1113.96,
    PointsAgainst: 1037.76
  },
  {
    Owner: "Spence",
    TeamName: "Brown vs. The NFL",
    Wins: 6,
    Losses: 6,
    Ties: 0,
    PointsFor: 1095.04,
    PointsAgainst: 1052.74
  },
  {
    Owner: "Gools",
    TeamName: "Cat",
    Wins: 5,
    Losses: 7,
    Ties: 0,
    PointsFor: 1193.44,
    PointsAgainst: 1210.9
  },
  {
    Owner: "Kev",
    TeamName: "Fuck this team.",
    Wins: 4,
    Losses: 8,
    Ties: 0,
    PointsFor: 1025.1,
    PointsAgainst: 1089.4
  },
  {
    Owner: "Zach",
    TeamName: "NFC North",
    Wins: 3,
    Losses: 9,
    Ties: 0,
    PointsFor: 1059.96,
    PointsAgainst: 1276.54
  },
  {
    Owner: "Ty",
    TeamName: "The good kind of RPO",
    Wins: 8,
    Losses: 4,
    Ties: 0,
    PointsFor: 1211.3,
    PointsAgainst: 1095.84
  },
  {
    Owner: "Dan",
    TeamName: "RectumIHardly69edHer",
    Wins: 7,
    Losses: 5,
    Ties: 0,
    PointsFor: 1235.32,
    PointsAgainst: 1190.1
  },
  {
    Owner: "Jeff",
    TeamName: "Dad Says What",
    Wins: 6,
    Losses: 6,
    Ties: 0,
    PointsFor: 1278.16,
    PointsAgainst: 1187.84
  },
  {
    Owner: "Jr",
    TeamName: "All Eyez On Me",
    Wins: 6,
    Losses: 6,
    Ties: 0,
    PointsFor: 1236.88,
    PointsAgainst: 1208.96
  },
  {
    Owner: "Billy",
    TeamName: "Oh Biiilllyyy",
    Wins: 5,
    Losses: 7,
    Ties: 0,
    PointsFor: 1103.76,
    PointsAgainst: 1198.48
  },
  {
    Owner: "Beast",
    TeamName: "Beast From The East",
    Wins: 5,
    Losses: 7,
    Ties: 0,
    PointsFor: 1062.52,
    PointsAgainst: 1093.66
  }
];

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
