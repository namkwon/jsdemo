//Nam Joo Kwon
(function() {
var movies = [
    {                                              
      title: 'The Martian', 
      year: 2015,                              
      director: 'Ridley Scott',
      photo: 'martian.jpg'
    },
    {
      title: 'The Hunger Games: Mockingjay',
      year: 2015,
      director: 'Francis Lawrence',
      photo: 'mockingjay.jpg'
    },
    {
      title: 'The Intern',
      year: 2015,
      director: 'Nancy Meyers',
      photo: 'intern.jpg'
    },
    {
      title: 'Kingsman',
      year: 2014,
      director: 'Matthew Vaughn',
      photo: 'kingsman.jpg'
    },
    {
      title: 'The Shawshank Redemption',
      year: 1994,
      director: 'Frank Darabont',
      photo: 'shawshank.jpg'
    },
    {
      title: 'Forrest Gump',
      year: 1994,
      director: 'Robert Zemeckis',
      photo: 'forrest.jpg'
    },
    {
      title: 'The Matrix',
      year: 1999,
      director: 'Andy Wachowski',
      photo: 'matrix.jpg'
    },
    {
      title: 'The Usual Suspects',
      year: 1995,
      director: 'Bryan Singer',
      photo: 'usual.jpg'
    },
    {
      title: 'Oldboy',
      year: 2003,
      director: 'Chan-wook Park',
      photo: 'oldboy.jpg'
    },
    {
      title: 'Amadeus',
      year: 1984, 
      director: 'Milos Forman',
      photo: 'amadeus.jpg'
    }
  ];
  var lists = [];
  
  function makeItems() {                 
    movies.forEach(function(movie) {          
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
    });
  }
  
  function appendRows() {
  	$contentList = $('#content');
  	lists.forEach(function(list) {
  		$contentList.append(list.$element);
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

  function init() {                     
    makeItems(); 
    appendRows();       
  }
 
  $(init);                              
  

}());


