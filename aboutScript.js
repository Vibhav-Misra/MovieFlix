document.addEventListener('DOMContentLoaded', function() {
    var aboutButton = document.getElementById('aboutBtn'); 
    var aboutDropdown = document.getElementById('myDropdownAbout'); 
    var aboutArrow = aboutButton.querySelector('.arrow'); 

    aboutButton.addEventListener('mouseover', function() {
        aboutDropdown.classList.add('show');
        aboutArrow.classList.add('rotate');
    });

    aboutButton.addEventListener('mouseout', function(event) {
        if (!aboutDropdown.contains(event.relatedTarget)) {
            aboutDropdown.classList.remove('show');
            aboutArrow.classList.remove('rotate');
        }
    });

    aboutDropdown.addEventListener('mouseover', function() {
        aboutDropdown.classList.add('show');
        aboutArrow.classList.add('rotate');
    });

    aboutDropdown.addEventListener('mouseout', function(event) {
        if (!aboutDropdown.contains(event.relatedTarget)) {
            aboutDropdown.classList.remove('show');
            aboutArrow.classList.remove('rotate');
        }
    });
});
