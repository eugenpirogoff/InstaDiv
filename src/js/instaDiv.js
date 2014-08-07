(function( $ ) {

  // 'constants'
  var BACKGROUNDSQUARE_MAX_WIDTH = 150;
  var BACKGROUNDSQUARE_MAX_HEIGHT = 149;

  $.fn.instaDiv = function(instagram_user_id, access_token) {
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      processData: true,
      url: instagram_url(instagram_user_id, access_token),
      success: ajax_success
    });
  };

  function instagram_url(instagram_user_id, access_token) {
    // how many recent images do you want to have from instagram
    var imagecount = 50;
    return  "https://api.instagram.com/v1/users/" +
      instagram_user_id + "/media/recent/?access_token=" + access_token + "&count=" +
      imagecount;
  }

  var ajax_success = function(data) {
    images = store_images(data);
    resize_elements();
  }

  function store_images(data) {
    var images = [];
    for (var element = 0; element < 3; element++) {
      for (var i in data.data) {
        if (data.data.hasOwnProperty(i)) {
          images.push(data.data[i].images.thumbnail.url);
        }
      }
    }
    return images;
  }

  function resize_elements() {
    $insta_div = $(".insta_div");

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    var horizontalNumberOfSquares = Math.floor(windowWidth / BACKGROUNDSQUARE_MAX_WIDTH) + 1;
    var verticalNumberOfSquares = Math.floor(windowHeight / BACKGROUNDSQUARE_MAX_HEIGHT) + 1;

    var backgroundSquareWidth = windowWidth / horizontalNumberOfSquares;
    var backgroundSquareHeight = Math.floor(windowHeight / verticalNumberOfSquares) + 1;

    if (! $('.insta_div').length ) {
      $('body').append('<div class="insta_div"></div>');
    }
    $insta_div.empty();
    // set width and height of the square container to match the window dimensions
    $insta_div.css('width', windowWidth);
    $insta_div.css('height', windowHeight);
    // add the appropriate number of squares to fill the background
    for ( i = 0; i < horizontalNumberOfSquares * verticalNumberOfSquares; i++ ) {
      var index = i;
      while (index >= images.length) {
        index = index - images.length;
      }
      if (typeof images[index] != 'function') {
        var square = $insta_div.append("<div class='crop_thumb'><img class='image_thumb' src='" + images[index] + "' /></div>").children('.crop_thumb').last();
        $(square).css('width', backgroundSquareWidth);
        $(square).css('height', backgroundSquareHeight);
      }
    }
  }

  $(window).resize(function() {
    resize_elements();
  });
})( jQuery );
