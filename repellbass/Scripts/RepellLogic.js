﻿function RepellLogic(data) {
    var self = this;

	self.data=data;

	self.data.currentPlayerColor="yellow";
	self.activeObjectColor="magenta";
	self.errorColor="red";
	
	self.playerHasMoved = false;
    self.playerHasPlacedMovedTarget = false;
    self.oldpos = 0;
	self.maxPos = (data.cols*data.rows)-1;
	self.errorPos=-1;

      //väljer aktuell spelare på index
    self.selectUserByNum = function (num) {
        self.data.currentPlayer(self.data.players()[num]);
    }
  
	//hämtar bakgrundsfärg för en tile
	self.getBgColor=function(index){
	
	var obj = self.data.board[index];

	var bgColor = obj.Color;

	if (self.data.currentPlayer().Pos == index)
		bgColor = self.data.currentPlayerColor;
	if (self.oldpos == index && self.playerHasPlacedMovedTarget && !self.gameOver())
		bgColor = self.activeObjectColor;
	if(self.errorPos==index)
		bgColor=self.errorColor;
	
	return bgColor;	
	}
  
      //byter tur till nästa spelare om det är möjligt
    self.nextTurn = function () {

        if (self.validMovesLeft()) {

            var num = self.data.players.indexOf(self.data.currentPlayer());

            num++;
            if (num === self.data.players().length)
                num = 0;

            self.selectUserByNum(num);

            if (self.data.currentPlayer().Drops() > 0) {
                self.playerHasMoved = false;
                self.playerHasPlacedMovedTarget = false;
            }
            else {
                self.nextTurn();
            }
        }
    }

	//returnerar huruvida någon användare kan röra på sig
    self.validMovesLeft = function () {

        for (var i = 0; i < self.data.players().length; i++) {
            var u = self.data.players()[i];
            if (u.Drops() > 0)
                return true;
        }

        return false;
    }
	
	self.gameOver=function(){
	return !self.validMovesLeft() && self.noAdjacentObjects();
	}
	
	 //uppdaterar spelstatustexten
    self.getStatus = function () {

		var playerTitle = self.data.currentPlayer().Name() +'´s tur: ';
		
        if (self.data.currentPlayer().Pos < 0 && !self.playerHasMoved) {
            return playerTitle + "Placera ut spelare på grön ruta";
        }

        else if (!self.gameOver()) {

		
            if (!self.playerHasMoved)
                return playerTitle + "Gå med din spelare";
            else if (!self.playerHasPlacedMovedTarget)
                return playerTitle + "Välj det objekt som ska påverka ett annat objekt";
            else
                return playerTitle + "Välj det objekt som ska påverkas";
        }
        else {
			var winners = self.getWinners();
			var playerNames="";
			
			for (var i = 0; i < winners.length; i++) {
			
			if(playerNames!=="" && i<winners.length-1)
				playerNames+= ", ";
			else if(playerNames!=="" && i===winners.length-1)
				playerNames+= " och ";
			
			playerNames+="<i>"+winners[i].Name()+"</i>";
			}

			if(winners.length>1){
			return "Spelet slut. Oavgjort mellan " + playerNames + "!";
		
			}
			else{
			return "Spelet slut. " + playerNames + " vann!";
			}
			
           // return "Spelet slut! " + playerName + " vann!";
        }
    }
	
	self.getWinners=function(){
	
	var maxPoints=-1;
	var winners=[];
	
	for (var i = 0; i < self.data.players().length; i++) {

		var p = self.data.players()[i];

		if (p.ItemSum() > maxPoints) {
				maxPoints = p.ItemSum();
			}
		}
		
	for (var i = 0; i < self.data.players().length; i++) {

		var p = self.data.players()[i];

		if (p.ItemSum() == maxPoints) {
				winners.push(p);
			}
		}	
		return winners;
	}

    //returnerar huruvida ett objekt ligger intill ett annat objekt
    self.hasAdjacentObject = function (item) {

        var positions = [];
        positions.push(item.Pos - 1);
        positions.push(item.Pos + 1);
        positions.push(item.Pos - self.data.cols);
        positions.push(item.Pos + self.data.cols);

        positions.push(item.Pos - self.data.cols + 1);
        positions.push(item.Pos + self.data.cols + 1);
        positions.push(item.Pos - self.data.cols - 1);
        positions.push(item.Pos + self.data.cols - 1);

        for (var i = 0; i < positions.length; i++) {

            var p = positions[i];

            // console.log("kontrollerar närliggande positioner" +item.Pos + " ny:" +p)

            if (p < 0 || p >= self.data.board.length)
                continue;

            if (self.getThingOnPosition(p) != null && (!self.isNotlogicalPushRowDiff(item.Pos,p)))
                return true;
        }

        return false;
    }

    //returerar huruvida något objekt på kartan har ett intilliggande objekt
    self.noAdjacentObjects = function () {

        for (var i = 0; i < self.data.board.length; i++) {
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

        if (self.playerHasMoved && self.noAdjacentObjects())
            return true;

        return false;
    }

    //returnerar ett svar på om det är en giltig distans att gå för en spelare
    self.validDistance = function (player, newpos) {

        var diff = Math.abs(player - newpos);
        if (diff == 1 || diff == self.data.cols || diff == self.data.cols - 1 || diff == self.data.cols + 1)
            return true;

        return false;
    }
	
	
	self.getNewPos=function(oldPos,pos){
	
	var diff = oldPos-pos;

	var item = self.data.board[pos];

	var lastRow=1;
	
    for(var i=1;i<item.Num;i++){
	
	var lastRow=self.getRowFromPos(pos);
	var newValue = pos-diff;
	
	if(lastRow==0 && newValue<pos)
		return-1;
	else if(lastRow==self.data.rows-1 && newValue>pos)
		return-1;

	pos=newValue;
	
	var thingOnPosition = self.getThingOnPosition(pos);
	if(thingOnPosition!=null)
		return undefined;
	console.log("godkänd pos:" + pos);	
	}	
	
	return pos;
	}

    //används när användaren markerar en position
    //flöde 1: användare markerar sin startposition
    //flöde 2: användare markerar var den vill gå
    //flöde 3: användare markerar vilket objekt som skall påverka ett annat med magnetism
    //flöde 4: användare markerar vilket objekt som skall påverkas av magnetism
    self.positionSelect = function (i) {

        var item = self.data.board[i];
		self.errorPos=-1;

        var player = self.data.currentPlayer();
        var thingOnPosition = self.getThingOnPosition(i);

        //flöde 1: användare markerar sin startposition
        if ((player.Pos < 0||player.Pos>self.maxPos) && !self.playerHasPlacedMovedTarget && !self.playerHasMoved) {
            if (item.Color == "lightgreen" && thingOnPosition == null) {
                player.Pos = i;
            }
        }
            //flöde 2: användare markerar var den vill gå
        else if (!self.playerHasMoved && thingOnPosition == null && self.validDistance(player.Pos, i)) {
            //kolla nuvarande position och antalet steg med mera i den riktningen man vill gå.
			var tempPos= self.getNewPos(player.Pos, i);
			
			if(tempPos!=undefined){
				 var drop = new ItemModel("black", 1, player.Pos);
				player.Drops(player.Drops() - 1);
				self.data.items.push(drop);
				
				player.Pos = tempPos;
				self.playerHasMoved = true;
				}			
			
				else{
				self.errorPos=i;
				}
			}

            //flöde 3: användare markerar vilket objekt som skall påverka ett annat med magnetism
        else if (!self.playerHasPlacedMovedTarget && self.playerHasMoved && thingOnPosition != null) {
            //todo also check if has anything in adjacent position

            if (self.hasAdjacentObject(thingOnPosition)) {
                console.log("flyttar objekt på " + i);
                self.playerHasPlacedMovedTarget = true;
                self.oldpos = i;
            }
			else{
			self.errorPos=i;
			}
        }
            //flöde 4: användare markerar vilket objekt som skall påverkas av magnetism
        else if (self.playerHasPlacedMovedTarget && self.playerHasMoved && thingOnPosition != null) {
            //todo also check if has anything in adjacent position

            var diff = thingOnPosition.Pos - self.oldpos;

            if (diff == 0) {
                //trigger reset
                self.playerHasPlacedMovedTarget = false;
            }
            else if (self.validDistance(self.oldpos, thingOnPosition.Pos)) {

                var newPos = thingOnPosition.Pos + diff;

                if (!self.getThingOnPosition(newPos) || self.isNotlogicalPushRowDiff(newPos, thingOnPosition.Pos)) {

                    //todo fixme alla väderstreck skall fungera
                    if (self.isOut(newPos, thingOnPosition.Pos)) {
                        console.log("objekt utkastat.");
                        thingOnPosition.Pos = -1;
                        //if (newPos < 0) {
                        if (thingOnPosition instanceof ItemModel) {
                            player.Items.push(thingOnPosition);
                        }
                        else if (thingOnPosition instanceof PlayerModel) {

                            //todo fixme
                            //ta ett item från personen om det finns någon
                            //todo fixme få välja vilken drop man ska ha?! eller ta den värdefullaste?:O

                            if (thingOnPosition.Items().length > 0) {
                                player.Items.push(thingOnPosition.Items.pop());
                            }
                            var otherPlayersDrops = thingOnPosition.Drops();
                            if (otherPlayersDrops > 0) {
                                thingOnPosition.Drops(otherPlayersDrops - 1);
                                var drop = new ItemModel("black", 1, player.Pos);
                                player.Items.push(drop);
                            }
                        }
                    }
                    else {
                        thingOnPosition.Pos = newPos;
                        console.log("objekt flyttat på " + i);

                    }

                }

                if (!self.noAdjacentObjects()) {
                    self.playerHasPlacedMovedTarget = false;
                }
            }
        }
   
        if (self.isReadyForNextTurn()) {
            self.nextTurn();
        }
   
    }

    self.getRowFromPos = function (pos)
    {
        return pos % self.data.cols;
    }

    self.isNotlogicalPushRowDiff = function (newPos, oldPos) {

        var r1 = self.getRowFromPos(newPos);
        var r2 = self.getRowFromPos(oldPos);

        var rdiff = Math.abs(r1 - r2);

        return (rdiff > 1);
    }

    self.isOut = function (newPos, oldPos) {
        if(newPos<0 || newPos > self.maxPos)
            return true;

        return self.isNotlogicalPushRowDiff(newPos, oldPos);
    }

    //tar bort objekt på en position om den finns där
    self.removeThingOnPosition = function (pos) {

        var item = self.getThingOnPosition(pos);

        if (item != null) {
            self.data.items.remove(item);
        }
    }

    //returnerar ett objekt på en position, null om inget finns där
    self.getThingOnPosition = function (pos) {

		//object stored outside playingfield not allowed.
		if(pos>=0){
	
			for (i = 0; i < self.data.players().length; i++) {
				var u = self.data.players()[i];

				if (u.Pos === pos)
					return u;
			}

			for (i = 0; i < self.data.items().length; i++) {
				var item = self.data.items()[i];

				if (item.Pos === pos)
					return item;
			}
		}

        return null;
    }

}