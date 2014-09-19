
var repellViewModel;

function initViewModel() {

    var appName = "Repellbas";
    repellViewModel = new RepellViewModel(appName);
    ko.applyBindings(repellViewModel, document.getElementById("htmlTop"));

}


$(function() {
  
    initViewModel();

});