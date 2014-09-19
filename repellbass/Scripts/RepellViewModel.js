
function RepellViewModel(appName, canvas) {

    var self = this;

    /*******************
     ***  Variabler  ***
     *******************/

    self.version = 0.1;

    self.showNumPlayers = ko.observable(true);
    self.showNamePlayers = ko.observable(false);
    self.showGame = ko.observable(false);

    self.appName = ko.observable(appName + " " + self.version);

    self.currentPlayer = ko.observable(null);

    self.numPlayers = ko.observable(2);
    self.numStartDrops = ko.observable(10);

    self.players = ko.observableArray([]);
    self.items = ko.observableArray([]);

    self.canvasDrawer;

    self.rows = 12;
    self.cols = 12;

    self.playerHasMoved = false;
    self.playerHasPlacedMovedTarget = false;

    self.oldpos = 0;

    self.status = ko.observable("");

    self.colors = ["brown", "blue", "pink", "purple", "red", "white"];

    self.originalItems = [new ItemModel("grey", 3, 13),
            new ItemModel("grey", 3, 22),
            new ItemModel("black", 1, 52),
            new ItemModel("orange", 5, 55),
            new ItemModel("black", 1, 88),
            new ItemModel("black", 1, 91),
            new ItemModel("grey", 3, 121),
            new ItemModel("grey", 3, 130)];

    self.board = [{ Num: 1, Color: "white" }, { Num: 3, Color: "white" }, { Num: 5, Color: "white" }, { Num: 2, Color: "white" }, { Num: 4, Color: "white" }, { Num: 6, Color: "white" }, { Num: 1, Color: "white" }, { Num: 3, Color: "white" }, { Num: 5, Color: "white" }, { Num: 2, Color: "white" }, { Num: 4, Color: "white" }, { Num: 6, Color: "white" },
                { Num: 2, Color: "white" }, { Num: 4, Color: "lightblue" }, { Num: 6, Color: "white" }, { Num: 3, Color: "white" }, { Num: 5, Color: "white" }, { Num: 1, Color: "white" }, { Num: 2, Color: "white" }, { Num: 4, Color: "white" }, { Num: 6, Color: "white" }, { Num: 3, Color: "white" }, { Num: 5, Color: "lightblue" }, { Num: 1, Color: "white" },
                { Num: 3, Color: "white" }, { Num: 5, Color: "white" }, { Num: 3, Color: "lightgreen" }, { Num: 4, Color: "lightgreen" }, { Num: 6, Color: "lightgreen" }, { Num: 2, Color: "lightgreen" }, { Num: 3, Color: "lightgreen" }, { Num: 5, Color: "lightgreen" }, { Num: 6, Color: "lightgreen" }, { Num: 4, Color: "lightgreen" }, { Num: 6, Color: "white" }, { Num: 2, Color: "white" },
                { Num: 4, Color: "white" }, { Num: 1, Color: "white" }, { Num: 1, Color: "lightgreen" }, { Num: 1, Color: "white" }, { Num: 1, Color: "white" }, { Num: 1, Color: "white" }, { Num: 1, Color: "white" }, { Num: 1, Color: "white" }, { Num: 1, Color: "white" }, { Num: 1, Color: "lightgreen" }, { Num: 1, Color: "white" }, { Num: 1, Color: "white" },
                { Num: 5, Color: "white" }, { Num: 6, Color: "white" }, { Num: 2, Color: "lightgreen" }, { Num: 5, Color: "white" }, { Num: 1, Color: "lightblue" }, { Num: 3, Color: "white" }, { Num: 4, Color: "white" }, { Num: 6, Color: "lightblue" }, { Num: 2, Color: "white" }, { Num: 5, Color: "lightgreen" }, { Num: 1, Color: "white" }, { Num: 3, Color: "white" },
                { Num: 6, Color: "white" }, { Num: 2, Color: "white" }, { Num: 4, Color: "lightgreen" }, { Num: 1, Color: "white" }, { Num: 3, Color: "white" }, { Num: 5, Color: "white" }, { Num: 6, Color: "white" }, { Num: 2, Color: "white" }, { Num: 4, Color: "white" }, { Num: 5, Color: "lightgreen" }, { Num: 3, Color: "white" }, { Num: 5, Color: "white" },
                { Num: 1, Color: "white" }, { Num: 3, Color: "white" }, { Num: 5, Color: "lightgreen" }, { Num: 2, Color: "white" }, { Num: 4, Color: "white" }, { Num: 6, Color: "white" }, { Num: 1, Color: "white" }, { Num: 3, Color: "white" }, { Num: 5, Color: "white" }, { Num: 2, Color: "lightgreen" }, { Num: 4, Color: "white" }, { Num: 6, Color: "white" },
                { Num: 2, Color: "white" }, { Num: 4, Color: "white" }, { Num: 6, Color: "lightgreen" }, { Num: 3, Color: "white" }, { Num: 5, Color: "lightblue" }, { Num: 1, Color: "white" }, { Num: 2, Color: "white" }, { Num: 4, Color: "lightblue" }, { Num: 6, Color: "white" }, { Num: 3, Color: "lightgreen" }, { Num: 5, Color: "white" }, { Num: 1, Color: "white" },
                { Num: 3, Color: "white" }, { Num: 5, Color: "white" }, { Num: 3, Color: "lightgreen" }, { Num: 4, Color: "white" }, { Num: 6, Color: "white" }, { Num: 2, Color: "white" }, { Num: 3, Color: "white" }, { Num: 5, Color: "white" }, { Num: 1, Color: "white" }, { Num: 4, Color: "lightgreen" }, { Num: 6, Color: "white" }, { Num: 2, Color: "white" },
                { Num: 4, Color: "white" }, { Num: 6, Color: "white" }, { Num: 2, Color: "lightgreen" }, { Num: 5, Color: "lightgreen" }, { Num: 2, Color: "lightgreen" }, { Num: 3, Color: "lightgreen" }, { Num: 4, Color: "lightgreen" }, { Num: 6, Color: "lightgreen" }, { Num: 2, Color: "lightgreen" }, { Num: 5, Color: "lightgreen" }, { Num: 1, Color: "white" }, { Num: 3, Color: "white" },
                { Num: 5, Color: "white" }, { Num: 1, Color: "lightblue" }, { Num: 3, Color: "white" }, { Num: 6, Color: "white" }, { Num: 2, Color: "white" }, { Num: 4, Color: "white" }, { Num: 5, Color: "white" }, { Num: 1, Color: "white" }, { Num: 3, Color: "white" }, { Num: 6, Color: "white" }, { Num: 2, Color: "lightblue" }, { Num: 4, Color: "white" },
                { Num: 6, Color: "white" }, { Num: 2, Color: "white" }, { Num: 4, Color: "white" }, { Num: 1, Color: "white" }, { Num: 3, Color: "white" }, { Num: 5, Color: "white" }, { Num: 6, Color: "white" }, { Num: 2, Color: "white" }, { Num: 4, Color: "white" }, { Num: 1, Color: "white" }, { Num: 3, Color: "white" }, { Num: 5, Color: "white" }, ];

    /*******************
    ***    Metoder   ***
    *******************/

    //tar bort objekt på en position om den finns där
    self.removeThingOnPosition = function (pos) {

        var item = self.getThingOnPosition(pos);

        if (item != null) {
            self.items.remove(item);
        }
    }

    //returnerar ett objekt på en position, null om inget finns där
    self.getThingOnPosition = function (pos) {

        for (i = 0; i < self.players().length; i++) {
            var u = self.players()[i];

            if (u.Pos === pos)
                return u;
        }

        for (i = 0; i < self.items().length; i++) {
            var item = self.items()[i];

            if (item.Pos === pos)
                return item;
        }

        return null;
    }

    //ritar upp spelplanen
    self.drawGame = function () {

        var i = 0;
        var x = 0;
        var y = 0;

        var xs = (self.canvasDrawer.width / self.cols);
        var ys = (self.canvasDrawer.height / self.rows);
        var textoffsetx = xs / 2;
        var textoffsety = ys / 2;

        for (i = 0; i < self.board.length; i++) {

            var xo = x * xs;
            var yo = y * ys;

            var obj = self.board[i];

            var bgColor = obj.Color;

            if (self.currentPlayer().Pos == i)
                bgColor = "yellow";

            self.canvasDrawer.rect(xo, yo, xs, ys, bgColor);

            //  self.canvasDrawer.drawText(i, xo + textoffsetx, yo + textoffsety, "black");

            self.canvasDrawer.text(obj.Num, xo + textoffsetx, yo + textoffsety, "black");

            var item = self.getThingOnPosition(i);

            if (item != null) {
                self.canvasDrawer.circle(xo + (xs / 2), yo + (ys / 2), item.Size, item.Color);
            }

            if ((i + 1) % self.cols == 0 && i > 0) {
                y++;
                x = 0;
            }
            else {
                x++;
            }
        }
    }

    //returnerar ett svar på om det är en giltig distans att gå för en spelare
    self.validDistance = function (player, newpos) {

        var diff = Math.abs(player - newpos);
        if (diff == 1 || diff == self.cols || diff == self.cols - 1 || diff == self.cols + 1)
            return true;

        return false;
    }

    //används när användaren markerar en position
    //flöde 1: användare markerar sin startposition
    //flöde 2: användare markerar var den vill gå
    //flöde 3: användare markerar vilket objekt som skall påverka ett annat med magnetism
    //flöde 4: användare markerar vilket objekt som skall påverkas av magnetism
    self.positionSelect = function (i) {

        var item = self.board[i];

        var player = self.currentPlayer();
        var thingOnPosition = self.getThingOnPosition(i);

        //flöde 1: användare markerar sin startposition
        if (player.Pos < 0) {
            if (item.Color == "lightgreen" && thingOnPosition == null) {
                player.Pos = i;

            }
        }
            //flöde 2: användare markerar var den vill gå
        else if (!self.playerHasMoved && thingOnPosition == null && self.validDistance(player.Pos, i)) {
            //kolla nuvarande position och antalet steg med mera i den riktningen man vill gå.

            var drop = new ItemModel("black", 1, player.Pos);
            player.Drops(player.Drops() - 1);
            self.items.push(drop);
            player.Pos = i;
            self.playerHasMoved = true;

        }
            //flöde 3: användare markerar vilket objekt som skall påverka ett annat med magnetism
        else if (!self.playerHasPlacedMovedTarget && thingOnPosition != null) {
            //todo also check if has anything in adjacent position
            console.log("flyttar objekt på " + i);
            self.playerHasPlacedMovedTarget = true;
            self.oldpos = i;
        }
            //flöde 4: användare markerar vilket objekt som skall påverkas av magnetism
        else if (self.playerHasPlacedMovedTarget && thingOnPosition != null) {
            //todo also check if has anything in adjacent position

            var diff = thingOnPosition.Pos - self.oldpos;

            if (diff == 0) {
                //trigger reset
                self.playerHasPlacedMovedTarget = false;
            } else {

                var newPos = thingOnPosition.Pos + diff;

                if (!self.getThingOnPosition(newPos)) {
                    thingOnPosition.Pos = newPos;
                    console.log("objekt flyttat på " + i);

                    if (newPos < 0) {
                        player.Items.push(thingOnPosition);
                        // self.currentPlayer utanför arenan? isåfall ska man få pengar om det är en Item
                    }

                    //  console.log("diff " + newPos);
                }

                if (!self.noAdjacentObjects()) {
                    self.playerHasPlacedMovedTarget = false;
                }
            }
        }

        self.getStatus();

        if (self.isReadyForNextTurn()) {
            self.nextTurn();
        }

        self.drawGame();
    }

    //omvandlar ett musevent till en position på brädet, och kör metoden som omvandlar ett markering på brädet till en händelse
    self.handleClick = function (e) {

        var x = e.offsetX;
        var y = e.offsetY;

        var xunit = (self.canvasDrawer.width / self.cols);
        var yunit = (self.canvasDrawer.height / self.rows);

        var xx = Math.floor(x / xunit);
        var yy = Math.floor(y / yunit);

        var i = xx + (yy * self.cols);
        console.log("klick på ruta: " + i);

        self.positionSelect(i);
    }

    //returnerar huruvida ett objekt ligger intill ett annat objekt
    self.hasAdjacentObject = function (item) {

        var positions = [];
        positions.push(item.Pos - 1);
        positions.push(item.Pos + 1);
        positions.push(item.Pos - self.cols);
        positions.push(item.Pos + self.cols);

        positions.push(item.Pos - self.cols + 1);
        positions.push(item.Pos + self.cols + 1);
        positions.push(item.Pos - self.cols - 1);
        positions.push(item.Pos + self.cols - 1);

        for (var i = 0; i < positions.length; i++) {

            var p = positions[i];

            // console.log(item.Pos + " ny:" +p)

            if (p < 0 || p >= self.board.length)
                continue;

            if (self.getThingOnPosition(p) != null)
                return true;
        }

        return false;
    }

    //returerar huruvida något objekt på kartan har ett intilliggande objekt
    self.noAdjacentObjects = function () {

        for (var i = 0; i < self.board.length; i++) {
            var thingOnPosition = self.getThingOnPosition(i);
            if (thingOnPosition != null) {
                if (self.hasAdjacentObject(thingOnPosition)) {
                    console.log("objekt på position: " + i + " har närliggande objekt");
                    return false;
                }
            }
        }

        return true;
    }

    //returnerar huruvida spelet är redo att gå till nästa tur
    self.isReadyForNextTurn = function () {

        if (self.playerHasMoved && self.playerHasPlacedMovedTarget && self.noAdjacentObjects())
            return true;

        return false;
    }

    //startar ett nytt spel
    self.initGame = function (item, event) {

        self.items(JSON.parse(JSON.stringify(self.originalItems)));

        var num = Math.floor(Math.random() * self.players().length);
        self.selectUserByNum(num);

        self.drawGame();
        self.nextTurn();
    }

    //väljer aktuell spelare på index
    self.selectUserByNum = function (num) {
        self.currentPlayer(self.players()[num]);
    }

    //uppdaterar spelstatustexten
    self.getStatus = function () {

        if (self.currentPlayer().Pos < 0) {
            self.status("Placera ut spelare på grön ruta");
        }

        else if (self.validMovesLeft()) {

            if (!self.playerHasMoved)
                self.status("Gå med din spelare");
            else if (!self.playerHasPlacedMovedTarget)
                self.status("Välj det objekt som ska påverka ett annat objekt");
            else
                self.status("Välj det objekt som ska påverkas");
        }
        else {
            var playerName = "";
            var maxPoints = -1;

            for (var i = 0; i < self.players().length; i++) {

                var p = self.players()[i];

                if (p.ItemSum() > maxPoints) {
                    playerName = p.Name();
                    maxPoints = p.ItemSum();
                    //todo fixa kod för oavgjort
                }
            }

            self.status("Spelet slut! " + playerName + " vann!");
        }
    }

    //returnerar huruvida någon användare kan röra på sig
    self.validMovesLeft = function () {

        for (var i = 0; i < self.players().length; i++) {
            var u = self.players()[i];
            if (u.Drops() > 0)
                return true;
        }

        return false;
    }

    //byter tur till nästa spelare om det är möjligt
    self.nextTurn = function () {

        if (self.validMovesLeft()) {

            var num = self.players.indexOf(self.currentPlayer());

            num++;
            if (num === self.players().length)
                num = 0;

            self.selectUserByNum(num);

            if (self.currentPlayer().Drops() > 0) {
                self.playerHasMoved = false;
                self.playerHasPlacedMovedTarget = false;
            }
            else {
                self.nextTurn();
            }
        }

        self.getStatus();
    }

    //visar tredje vyn, själva spelet, samt startar spelet
    self.startGame = function (item, event) {
        self.showNumPlayers(false);
        self.showNamePlayers(false);
        self.showGame(true);
        self.initGame();
    };

    //visar andra vyn i spelstart-processen där man namnger användarna
    self.namePlayers= function (item, event) {
        self.showNumPlayers(false);
        self.showNamePlayers(true);
        self.showGame(false);

        var list = [];
        for (var i = 0; i < self.numPlayers() ; i++) {
            var u = new PlayerModel("Spelare " + (i + 1), self.colors[i], self.numStartDrops());
            list.push(u);
        }
        self.players(list);
    };

    //visar första vyn i spelstart-processen
    self.restartGame = function () {
        self.showNumPlayers(true);
        self.showNamePlayers(false);
        self.showGame(false);
    }

    //initierar vymodellen
    self.init = function () {
        var canvaselement = $('#canvas');
        canvaselement.click(self.handleClick);

        self.canvasDrawer = new CanvasDrawer(canvaselement);
    }

    self.init();
}

