
var repellViewModel;

function initViewModel() {

    var appName = "Repellbas";
	
	var canvaselement = $('#canvas');
    
    repellViewModel = new RepellViewModel(appName,canvaselement);
    ko.applyBindings(repellViewModel, document.getElementById("htmlTop"));

}


$(function() {
  
    initViewModel();

});