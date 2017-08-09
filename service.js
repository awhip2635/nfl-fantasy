var PlayersService = function (endpointUri, callback) {
    var playersData = [];
    var myRoster = [];
    localStorage.setItem('updatedData', false);
    this.getRoster = function () {
        return myRoster;
    }
    this.getPlayersByTeam = function (teamName) {
        var thisPlayer = playersData.filter(function (player) {
            if (player.pro_team == teamName) {
                return player;
            }
        });
        return thisPlayer;
    }
    this.getPlayersByPosition = function (position) {
        var thisPlayer = playersData.filter(function (player) {
            if (player.position == position) {
                return player;
            }
        });
        return thisPlayer;
    }

    this.getPlayersById = function (id) {
        var thisPlayer = playersData.filter(function (player) {
            if (player.id == id) {
                return player;
            }
        });
        return thisPlayer[0];
    }

    this.getPlayersByName = function (fullName) {
        playersData.filter(function (player) {
            if (player.fullName == fullName) {
                return playersData;
            }
        })
    }

    this.loadPlayersData = function() {
        localStorage.setItem('updatedData', false);
        var proTeam = "";
        var playerPosition = "";
        var playerName = "";
        proTeam = $("input[name='team-name']").val();
        playerName = $("input[name='player-name']").val();
        playerPosition = $("input[name='position']").val();
        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 

        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);

            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing
        }

        var url = "http://bcw-getter.herokuapp.com/?url=";
        var params = {position:playerPosition,pro_team:proTeam,name:playerName,version:"3.0",response_format:"JSON",SPORT:"football"};
        var endpointUri = "http://api.cbssports.com/fantasy/players/search?"+$.param(params);
        var apiUrl = url + encodeURIComponent(endpointUri);
        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            localStorage.setItem('playersData', JSON.stringify(playersData));
            localStorage.setItem('updatedData', true);
        });
             
    }

    this.addPlayer = function (player) {
        var tooMany = false;
        if (myRoster.length >=9){
            alert('You already have 9 players');
            tooMany= true;
        }
        if (!tooMany && (myRoster.indexOf(player) == -1)) {
            myRoster.push(player)
        }

    }

    this.getNFL = function getNFL() {
        return playersData;
    }

    this.removePlayer = function (player) {
        if (myRoster.indexOf(player) == 0) {
            myRoster.pop(player)
        }
    }
}
