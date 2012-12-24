(function( $ ) {

  // how many recent images do you want to have from instagram
  var imagecount = 50;
  // this is my id from Instagram, you shure use yours
  var instagramuserid = "371308";
  // my token, you should use yours 
  var accesstoken = "371308.3de11e3.ef32cf78df594bae90b4b7bea836bfcf";

  $.fn.instaDiv = function() {
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      processData: true,
      url: "https://api.instagram.com/v1/users/" +
        instagramuserid + "/media/recent/?access_token=" + accesstoken + "&count=" +
        imagecount,
      success: ajax_success
    });
  };

  var ajax_success = function(data) {
    images = store_images(data);
    append_to_div(images);
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

  function resize_div() {
    $insta_div = $(".insta_div");

    // 150 for thumbnail size, 350 for low resolution, 450 for high resolutiom
    $insta_div.css('width', window.innerWidth+150);
    $insta_div.css('height', window.innerHeight+150);
  }

  function append_to_div(images) {
    $insta_div = $(".insta_div");

    for(var element in images) {
      if(images.hasOwnProperty(element) && (typeof images[element] != 'function')) {
        $insta_div.append("<p class='crop_thumb'>" +
            "<img class='image_thumb' src='" + images[element] + "' /></p>");
      }
    }
    resize_div();
  }

  $(window).resize(function() {
    resize_div();
  });
})( jQuery );
