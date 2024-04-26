document.addEventListener('DOMContentLoaded', function() {
    var genreButton = document.querySelector('.dropdown .dropbtn'); 
    var genreDropdown = document.getElementById('myDropdownGenre'); 
    var genreArrow = genreButton.querySelector('.arrow'); 

    genreButton.addEventListener('mouseover', function() {
        genreDropdown.classList.add('show');
        genreArrow.classList.add('rotate');
    });

    genreButton.addEventListener('mouseout', function(event) {
        if (!genreDropdown.contains(event.relatedTarget) && !genreButton.contains(event.relatedTarget)) {
            genreDropdown.classList.remove('show');
            genreArrow.classList.remove('rotate');
        }
    });

    genreDropdown.addEventListener('mouseover', function() {
        genreDropdown.classList.add('show');
        genreArrow.classList.add('rotate');
    });

    genreDropdown.addEventListener('mouseout', function(event) {
        if (!genreDropdown.contains(event.relatedTarget) && !genreButton.contains(event.relatedTarget)) {
            genreDropdown.classList.remove('show');
            genreArrow.classList.remove('rotate');
        }
    });
});

