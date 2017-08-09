function PlayerController() {
    var service = new PlayersService();
    var firstRun = true;
    drawPlayers = function (el) {
        document.getElementById('display-players').innerHTML = "";
        if (localStorage.getItem('updatedData') === "true") {
            var template = ''
            var arr = service.getNFL();
            for (var i = 0; i < arr.length; i++) {
                var player = arr[i];
                template += `<div class="col-xs-4 col-sm-4 col-md-4"><div class="panel"><center><h3 class="name-text">${player.fullname}</h3><img class="player-photo" src =${player.photo}><h3 class="position-text">Position: ${player.position}<br><button onclick="app.controllers.playerController.addPlayer('${player.id}')">Add</button>
      </div></div>`;
            }
            document.getElementById('display-players').innerHTML = template;
        }else{
            setTimeout(function(){ drawPlayers(); }, 200);
        }
    }
    this.filterSearch = function () {
        service.loadPlayersData();
        drawPlayers();

    }
    drawRoster = function () {
        //TODO: DRAW ROSTER
        var roster = service.getRoster();
        console.log(roster);
        var template = '';

        roster.forEach(player => {
            template += `<div class="panel panel-roster"><center>${player.fullname} ${player.position} ${player.pro_team}<br></center><button onclick="app.controllers.playerController.removePlayer('${player.id}')" class="button btn btn-block">Remove From Team</button></div>`
        })

        document.getElementById('my-roster').innerHTML = template;

    }
    this.addPlayer = function (id) {
        var playerToAdd = service.getPlayersById(id);
        console.log(playerToAdd);
        service.addPlayer(playerToAdd);
        drawRoster();

    }
    this.getPlayersByTeam = function (teamName) {
        service.getPlayersByTeam(teamName);
        drawPlayers();
    }

    this.getPlayersByPosition = function (position) {
        service.getPlayersByPosition(position);
        drawPlayers();
    }

    this.removePlayer = function (id) {
        var playerToRemove = service.getPlayersById(id);
        service.removePlayer(playerToRemove);
        drawRoster();
    }
    if (firstRun) {
        service.loadPlayersData();
        drawPlayers();
        firstRun = false;
    }
}

