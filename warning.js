function closeDialog(dialogId) {
    var dialog = document.getElementById(dialogId);
    dialog.style.display = "none";
  }

  document.addEventListener('copy', function(e) {
    e.preventDefault();
    showDialog('copyDialog');
  });

  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showDialog('rightClickDialog');
  });

  function showDialog(dialogId) {
    var dialog = document.getElementById(dialogId);
    dialog.style.display = "flex"; 
  }
  