
function PlayerModel(name, c, drops) {
    var self = this;
    self.Name = ko.observable(name);
    self.Items = ko.observableArray([]);
    self.Pos = -1;
    self.Drops = ko.observable(drops);
    self.Color = c;
    self.Size = 12;

    self.ItemSum = ko.computed(function () {
        var sum = 0;
        for (var i = 0; i < self.Items().length; i++) {
            sum += self.Items()[i].Value;
        }
        return sum;
    });
}

function ItemModel(c, v, p) {
	var self = this;
    self.Color = c;
    self.Value = v;
    self.Pos = p;
    self.Size = 7;

	self.clone=function(){
	return new ItemModel(self.Color, self.Value, self.Pos);
	}
}


function LogicData(){

this.board=null;
this.items=null;
this.players=null;
this.currentPlayer=null;
this.rows=null;
this.cols=null;

}