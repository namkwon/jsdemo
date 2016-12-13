/**
* Author : Nam Kwon
* Last Modified: 12-13-2016
* Description : 
*    Searching data
*    1. Get data from JSON file and make view
*    2. Event handling on key up
*/

(function() {

  var lists = [];
  
  function makeItems() {                 	

	$.getJSON('json/movies.json', function(data) {
		
	data.movies.forEach(function(movie) { 
		var $itemContainer = $('<div class="col-sm-6 col-md-4"></div>');
		$item = $('<div class="thumbnail"></div>');
		$item.append($('<img>').attr('src', 'img/' + movie.photo));
		$item.append($('<p></p>').text(movie.title + ' (' + movie.year + ')'));
		$item.append($('<p></p>').text('Director: ' + movie.director));
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
	}).fail(function(jqxhr,textStaus,error) {
		console.log("error: " + textStaus + ", " +error);
	});
	
  }

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

  $search.on('keyup', filter);            

  $(makeItems);                               

}());


