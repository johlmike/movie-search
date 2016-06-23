/*jshint esversion:6*/

//set the search input's id as "search", year input's id as "year"


const mvSearch = (function() {
    const exports = {};

    exports.setMS = function() {
        $(".search-form").submit(function(event) {
            event.preventDefault();
            //Get movie's name and year
            const name = $("#search").val();
            const year = $("#year").val();
            displayMovieList(name, year);
        });
    };

    function displayMovieList(mvName, mvYear) {
        $.getJSON('http://www.omdbapi.com/', { s: mvName, y: mvYear, r: "json" }, function(json, textStatus) {
            //display the result
            $("#movies").empty();
            for (var i = json.Search.length - 1; i >= 0; i--) {
            	const mvObj = json.Search[i];
            	const poster = mvObj.Poster;
            	const title = mvObj.Title; 
            	const year = mvObj.Year; 
            	const id = mvObj.imdbID;
            	const html = `<li data-id="${id}"><div class="poster-wrap"><img class="movie-poster" src="${poster}"></div><span class="movie-title">${title}</span><span class="movie-year">${year}</span></li>`;
          		$("#movies").append(html);
            }
        });
    }

    return exports;
})();
