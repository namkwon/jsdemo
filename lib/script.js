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
  var key2 = "&api_key=4d4ed145d3584846f5922b6a467e1f85";
  var imgUrl = "https://image.tmdb.org/t/p/";
  var imgSize = "w185";

  // event handlers
  $('#titleSearchBtn').on('click',function(e){
    var keyword = $('#filter-search').val().trim();
    history.pushState({page:'search'},null,'/search/'+keyword);
    console.log("pushed State in searchMovie() : search");
    searchMovie(keyword);
  });

  $('#filter-search').on('keypress', function(e){
    var keyword = $('#filter-search').val().trim();
    if(e.keyCode == 13) {
      history.pushState({page:'search'},null,'/search/'+keyword);
      console.log("pushed State in searchMovie() : search");
      searchMovie(keyword);
    }
  });


  function makeItems(){
    url ="https://api.themoviedb.org/3/discover/movie";
    var suburl = "?sort_by=popularity.desc";

  	$.ajax({
  		url:url+key,
  		dataType: 'jsonp'
  	}).done(function(data){
      history.pushState({page:'main'},null,$(location).attr('href'));
      console.log("pushed State in makeItems : main");
      $contentList = $('#content');
      data.results.forEach(function(movie) {
    		var $itemContainer = $('<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2"></div>');
    		$item = $('<div class="thumbnail"></div>');
    		$item.append($('<img>').attr('src', imgUrl+imgSize+movie.poster_path).attr('class', 'poster').attr('itemId', movie.id));
    		$item.appendTo($itemContainer);
        $('.poster').off('click').on('click',function(){
          var itemId = $(this).attr('itemId');
          history.pushState({page:'detail'},null,'/movie/'+itemId);
          console.log("pushed State in getItemDetail : detail");
          getItemDetail(itemId);
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
      //history.pushState({page:'detail'},null,'/movie/'+itemId);
      //console.log("pushed State in getItemDetail : detail");
      var add = $(location).attr('href');
      console.log("history pushStae href: " + add);
      imgSize = 'w342';
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

      $itemRow2 = $('<div class="row">');
      $itemRow2.append($('<h4>Trailer</h4>'));
      $itemRow2.append($('<div class="trailer">'));
      getTrailer(itemId);
      $content.append($itemRow1,$itemRow2);

    }).fail(function(jqxhr, textStatus, error){
  		console.log("getItemDetail ajax error: " + textStatus + ", " +error);
  	});
  }

  function getTrailer(itemId){
    url ="https://api.themoviedb.org/3/movie/";
    suburl = '/videos';
    $.ajax({
  		url:url+itemId+suburl+key,
  		dataType: 'jsonp'
  	}).done(function(data){
      data.results.forEach(function(trailer) {
        if(trailer.type == "Trailer" && trailer.site == "YouTube"){
          $video = $('<div class="col-lg-4 embed-responsive embed-responsive-16by9">');
          $video.append($('<iframe>').attr('class','embed-responsive-item').attr('src', 'https://www.youtube.com/embed/'+trailer.key).attr('allowfullscreen','true'));
          $video.appendTo($('.trailer'));
        }
      });

    }).fail(function(jqxhr, textStatus, error){
  		console.log("get Trailer ajax error: " + textStatus + ", " +error);
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
        var numOfCast = 5;
        var width = $(window).width();
        if (width < 768) {
          numOfCast = 2;
        }else if(width >= 768 && width <= 992) {
          numOfCast = 3;
        }else if(width > 992 && width <= 1200) {
          numOfCast = 4;
        }else  {
          numOfCast = 5;
        }
        if(index < numOfCast){
          $star = $('<div class="col-sm-4 col-md-3 col-lg-2">');
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


  function searchMovie(keyword){
    url ="https://api.themoviedb.org/3/search/movie";
    suburl = '?query=';
    $.ajax({
  		url:url+suburl+keyword+key2,
  		dataType: 'jsonp'
  	}).done(function(data){
      //history.pushState({page:'search'},null,'/search/'+keyword);
      //console.log("pushed State in searchMovie() : search");
      $contentList = $('#content');
      $contentList.html('');
      data.results.forEach(function(movie) {
        if(movie.poster_path != null){
    		  var $itemContainer = $('<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2"></div>');
          $item = $('<div class="thumbnail"></div>');
      		$item.append($('<img>').attr('src', imgUrl+imgSize+movie.poster_path).attr('class', 'poster').attr('itemId', movie.id));
    		  $item.appendTo($itemContainer);
        }
        $('.poster').off('click').on('click',function(){
          getItemDetail($(this).attr('itemId'));
        });
        $contentList.append($itemContainer);
    	});

    }).fail(function(jqxhr, textStatus, error){
  		console.log("get Search Resuts ajax error: " + textStatus + ", " +error);
  	});
    $('#filter-search').val('');
  }

  // for Navigation - back and forward button
  window.addEventListener("popstate", function(e) {

    console.log("popstate fired. histor state: " + history.state);
    if(history.state != null){
      var stateDesc = history.state.page;
      console.log("stateDesc : " + stateDesc + "  url : " + location.href);
      if (stateDesc == "main"){
         $('#content').html('');
         makeItems();
      } else if(stateDesc == "search"){
          var searchKeyword = location.href.substring(location.href.lastIndexOf('/')+1);
          searchMovie(searchKeyword);
      } else if (stateDesc == "detail") {
          var movieId = location.href.substring(location.href.lastIndexOf('/')+1);
          getItemDetail(movieId);
      }
    }

  });

  function init() {
	   makeItems();
  }

  $(init);

}());
