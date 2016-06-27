/*jshint esversion:6*/



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
        //Show loading gif
        $('.loading_img').show();
        $.getJSON('http://www.omdbapi.com/?', { s: mvName, y: mvYear, r: "json" }, function(json, textStatus) {
            //display the result
            $("#movies").empty();
            if (json.Response === "False") {
                const html = `<li class='no-movies'><i class='material-icons icon-help'>help_outline</i>No movies found that match: ${mvName}</li>`;
                $("#movies").append(html);
            } else {
                for (var i = json.Search.length - 1; i >= 0; i--) {
                    const mvObj = json.Search[i];
                    const poster = mvObj.Poster;
                    const title = mvObj.Title;
                    const year = mvObj.Year;
                    const id = mvObj.imdbID;
                    let html = `<li data-id="${id}"><div class="poster-wrap">`;
                    //Check if there is a poster or not
                    if (poster === "N/A") {
                        html += `<i class="material-icons poster-placeholder">crop_original</i></div>`;
                    } else {
                        html += `<img class="movie-poster" src="${poster}"></div>`;
                    }
                    html += `<span class="movie-title">${title}</span><span class="movie-year">${year}</span></li>`;
                    //Append the element to movie
                    $("#movies").append(html);
                }
                //Hide loading gif
                $('.loading_img').hide();
                $("#movies li").on("click", showDetail);
            }
        });
    }

    function showDetail() {
        //Show loading gif
        $('.loading_img').show();
        //Modify the modal
        const IMDb_id = $(this).data('id');
        $.getJSON('http://www.omdbapi.com/', { i: IMDb_id, plot: 'full' }, function(json, textStatus) {
            const year = json.Year;
            const title = json.Title + '(' + year + ')';
            const poster = json.Poster;
            const plot = json.Plot;
            const rating = json.imdbRating;
            const link = 'http://www.imdb.com/title/' + IMDb_id;
            $('#m_title').text(title);
            if (poster === "N/A") {
                $('#m_icon').show();
                $('#m_poster').attr('src', "");
            } else {
                $('#m_icon').hide();
                $('#m_poster').attr('src', poster);
            }
            $('#m_plot').text(plot);
            $('#m_rating').text('IMDb Rating: ' + rating);
            $('#m_link').attr('href', link);

            //Hide loading gif
            $('.loading_img').hide();

            //Show the modal
            $('#movieModal').modal('show');
        });
    }

    return exports;
})();
