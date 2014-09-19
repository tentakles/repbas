
function UserModel(name, c, drops) {
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
    this.Color = c;
    this.Value = v;
    this.Pos = p;
    this.Size = 7;
}