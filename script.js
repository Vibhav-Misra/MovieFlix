function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();

var accessibilityEnabled = false;
function toggleAccessibility() {
    accessibilityEnabled = !accessibilityEnabled;
    var navbar = document.querySelector('.navbar');
    if (accessibilityEnabled) {
      navbar.classList.add('accessibility-on');
    } else {
      navbar.classList.remove('accessibility-on');
    }
    var navi = document.querySelector('.navi');
    if (accessibilityEnabled) {
      navi.classList.add('accessibility-on');
    } else {
      navi.classList.remove('accessibility-on');
    }
    var grid = document.querySelector('.grid-container');
    if (accessibilityEnabled) {
      grid.classList.add('accessibility-on');
    } else {
      grid.classList.remove('accessibility-on');
    }
}


