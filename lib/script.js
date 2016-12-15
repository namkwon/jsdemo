/**
* Author : Nam Kwon
* Last Modified: 12-13-2016
* Description :
*    Movie Database
*    Data file from themoviedb API
*/

(function() {

  var lists = [];
  var $search = $('#filter-search');

  function filter() {
    var query = this.value.trim().toLowerCase();
    lists.forEach(function(list) {
      var index = 0;

      if (query) {
      	var movieTitle = list.movie.title.toLowerCase();
        index = movieTitle.indexOf(query);
      }

  	  if (index === -1) {
  	  	  list.$element.hide();
  	  } else {
  	      list.$element.show();
  	  }

    });
  }

  function makeItems(){
    var url ="https://api.themoviedb.org/3/discover/movie";
    var suburl = "?sort_by=popularity.desc";
    var key = "?api_key=4d4ed145d3584846f5922b6a467e1f85";
    console.log(url+key+suburl);
  	$.ajax({
  		url:url+key,
  		dataType: 'jsonp'
  	}).done(function(data){
      data.results.forEach(function(movie) {
        var imgUrl = "http://image.tmdb.org/t/p/";
        var imgSize = "w185";
    		var $itemContainer = $('<div class="col-md-2"></div>');
    		$item = $('<div class="thumbnail"></div>');
    		$item.append($('<img>').attr('src', imgUrl+imgSize+movie.poster_path));
    		$item.appendTo($itemContainer);
    		lists.push({
    			movie: movie,
    			$element: $itemContainer
    		});

    		$contentList = $('#content');
      		lists.forEach(function(list) {
      			$contentList.append(list.$element);
      		});
    	  });

  	}).fail(function(jqxhr, textStatus, error){
  		console.log("test ajax error: " + textStatus + ", " +error);
  	});
  }

  $search.on('keyup', filter);

  function init() {
	   makeItems();
  }

  $(init);

}());
