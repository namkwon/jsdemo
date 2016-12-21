/**
* Author : Nam Kwon
* Last Modified: 12-20-2016
* Description :
*    Movie Database with functions
*      - list popular movies
*      - get detail information for selected movie
*      - search movie
*    Data from themoviedb Open API
*/

(function() {
  var url ="https://api.themoviedb.org/3/movie/";
  var key = "?api_key=4d4ed145d3584846f5922b6a467e1f85";
  var imgUrl = "http://image.tmdb.org/t/p/";
  var imgSize = "w185";

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
    url ="https://api.themoviedb.org/3/discover/movie";
    var suburl = "?sort_by=popularity.desc";

  	$.ajax({
  		url:url+key,
  		dataType: 'jsonp'
  	}).done(function(data){
      //history.pushState(null,null,$(this).attr('href'));
      $contentList = $('#content');
      data.results.forEach(function(movie) {
    		var $itemContainer = $('<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2"></div>');
    		$item = $('<div class="thumbnail"></div>');
    		$item.append($('<img>').attr('src', imgUrl+imgSize+movie.poster_path).attr('class', 'poster').attr('itemId', movie.id));
        console.log($item.html());
    		$item.appendTo($itemContainer);
        console.log($itemContainer.html());
        $('.poster').off('click').on('click',function(){
          getItemDetail($(this).attr('itemId'));
        });
        $contentList.append($itemContainer);
    	});

  	}).fail(function(jqxhr, textStatus, error){
  		console.log("makeItems ajax error: " + textStatus + ", " +error);
  	});
  }

  function getItemDetail(itemId){
    url ="https://api.themoviedb.org/3/movie/";
  	$.ajax({
  		url:url+itemId+key,
  		dataType: 'jsonp'
  	}).done(function(data){
      history.pushState(null,null,$(this).attr('href'));
      var add = $(this).attr('href');
      console.log("history pushStae href: " + add);
      imgSize = 'w300';
      $content = $('#content');

      $content.html('');
      $itemRow1 = $('<div class="row">');
      $itemLeft = $('<div class="col-sm-4 col-md-3">');
      $itemImg = $('<img>').attr('src', imgUrl+imgSize+data.poster_path).attr('class', 'img-responsive').attr('itemId', data.id);
      $itemLeft.append($itemImg);

      $itemRight= $('<div class="col-sm-8 col-md-9">');
      $itemRightRow1 = $('<div class="row">');
      $itemRightRow1.append($('<h2>'+ data.title + '</h2>'));
      $itemRightRow2 = $('<div class="row">');
      $itemRightRow2.append($('<div class="col-sm-2 col-md-2"><i class="fa fa-star" aria-hidden="true">   ' + data.vote_average + '/10 </i>'));
      $itemRightRow2.append($('<div class="col-sm-2 col-md-2"><i class="fa fa-heart" aria-hidden="true">   ' + data.vote_count + ' votes </i>'));
      $itemRightRow2.append($('<div class="col-sm-2 col-md-2">').text(data.release_date.substr(0,4)));
      $itemRightRow3 = $('<div class="row">');
      $itemRightRow3.append($('<h4> Overview </h4>'));
      $itemRightRow3.append($('<p></p>').text(data.overview));
      $itemRightRow4 = $('<div class="row">');
      $itemRightRow4.append($('<h4> Starring </h4>'));
      $itemRightRow4.append($('<div class="casts">'));
      getCasts(itemId);
      $itemRight.append($itemRightRow1,$itemRightRow2,$itemRightRow3,$itemRightRow4);

      $itemRow1.append($itemLeft,$itemRight);
      $content.append($itemRow1);
      console.log('content : ' + $content.html());
    }).fail(function(jqxhr, textStatus, error){
  		console.log("getItemDetail ajax error: " + textStatus + ", " +error);
  	});
  }

  function getCasts(itemId){
    url ="https://api.themoviedb.org/3/movie/";
    suburl = '/casts';
    imgSize = 'w150';
    $.ajax({
  		url:url+itemId+suburl+key,
  		dataType: 'jsonp'
  	}).done(function(data){
      data.cast.forEach(function(cast,index) {
        if(index < 5){
          $star = $('<div class="col-sm-3 col-md-2">');
          $star.append($('<figure class="figure">'));
          $star.append($('<img>').attr('src', imgUrl+imgSize+cast.profile_path).attr('class', 'img-rounded').attr('castId', cast.id));
          $star.append($('<figcaption class="figure-caption text-center">' + cast.name + '</figcaption>'));
          $star.appendTo($('.casts'));
        }
      });
    }).fail(function(jqxhr, textStatus, error){
  		console.log("getCast ajax error: " + textStatus + ", " +error);
  	});
  }

  $search.on('keyup', filter);

  function init() {
	   makeItems();
  }

  $(init);

}());
