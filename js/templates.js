;(function () {
  var GimmeSomething = window.GimmeSomething = window.GimmeSomething || {};

  GimmeSomething.homeTemplate = function () {
    html = '<h1>GIMME SOMETHING</h1>\
          <p>For the indecisive.</p>\
          <ul class="group">\
            <li><a href="" class="why">Why?</a></li>\
            <li><a href="" class="acknowledgements">Acknowledgements</a></li>\
          </ul>\
          <div class="tabs"></div>';

    return html;
  };

  GimmeSomething.whyTemplate = function () {
      var html = '<div><h3>Why?</h3>\
                  <p>You know those times when you\'re sitting around with your\
                    friends, and you just can\'t decide where to eat?</p>\
                  <p>This is for those times.</p></div>';

      return html;
  };

  GimmeSomething.acknowledgementsTemplate = function () {
      var html = '<div><h3>Acknowledgements</h3>\
            <p>Special thanks to \
            <a target="_blank" href="http://thenounproject.com">The Noun Project</a>\
             artists: </p>\
             <ul>\
              <li>"Silverware" by \
                  <a target="_blank" href="http://thenounproject.com/tuleby/">\
                    Tobias Tuleby</a></li>\
              <li>"Pizza" by \
                  <a target="_blank" href="http://thenounproject.com/brandcut/">\
                    Stanislav Levin</a></li>\
              <li>"Taco" by \
                  <a target="_blank" href="http://thenounproject.com/DHETTEIX/">\
                    Dan Hetteix</a></li>\
              <li>"Sushi" by \
                  <a target="_blank" href="http://thenounproject.com/lnakanishi/">\
                    Linda Yuki Nakanishi</a></li>\
              <li>"Noodles" by \
                  <a target="_blank" href="http://thenounproject.com/cecilmariani/">\
                    kalamakara</a></li>\
              <li>"Bowl" by \
                  <a target="_blank" href="http://thenounproject.com/hivernoir/">\
                    Claire Jones</a></li>\
              <li>"Hamburger" by \
                  <a target="_blank" href="http://thenounproject.com/cedricvillain/">\
                    Cédric Villain</a></li>\
              <li>"Dinner" by \
                  <a target="_blank" href="http://thenounproject.com/molandbarley/">\
                    Peter Chlebak</a></li>\
              <li>"Waffles" by \
                  <a target="_blank" href="http://thenounproject.com/isabelfoo/">\
                    Isabel Foo</a></li>\
              <li>"Cookie" by \
                  <a target="_blank" href="http://thenounproject.com/iconoci/">\
                    iconoci</a></li>\
              <li>"Ice-Cream-Cone" by \
                  <a target="_blank" href="http://thenounproject.com/grubedoo/">\
                    Jason Grube</a></li>\
              <li>"Beer" by \
                  <a target="_blank" href="http://thenounproject.com/cjeria/">\
                    Christian Jeria</a></li>\
              <li>"Coffee" by \
                  <a target="_blank" href="http://thenounproject.com/Ilsur/">\
                    Ilsur Aptukov</a></li>\
              </ul></div>';

      return html;
  };

  GimmeSomething.beforeSearchTemplate = function (url) {
    var params = GimmeSomething.router.routes[url];
    var headerWord = GimmeSomething.currentRoute.toUpperCase().split("_").join(" ");

    var html =
      '<h1>GIMME ' + headerWord + '</h1>\
      <p>Find ' + params.description + ' near you</p>\
      <ul class="errors"></ul>'

    var locationForm = GimmeSomething.locationTemplate();

    var hasLocation =
      '<div class="location group">\
      <p><span>Your current location:</span> ' + GimmeSomething.address + '</p>\
      <a href="" id="change_location">change</a>\
      </div>'
      + '<a href="#" id="search">GO!</a>';

    if (GimmeSomething.address) {
      return html + hasLocation;
    } else {
      return html + locationForm;
    }
  };

  GimmeSomething.locationTemplate = function () {
    var html = '<div class="location group">\
      <label for="position">Where are you?</label>\
      <input type="text" id="position" placeholder="Enter a street address or zip code">\
      <button id="position">Submit</button>\
      </div>';

    return html;
  };

  GimmeSomething.searchResultsTemplate = function (name, info) {
    var website = info.website;
    var phone = info.phone;
    var address = info.address;
    var mapsUrl = "http://www.google.com/maps/place/" + address.split(" ").join("+");

    var formattedName = '<h3 class="name">' + name + '</h3>'
    var linkToMap = '<a target="_blank" href="' + mapsUrl + '">See in Google Maps</a>';
    var formattedAddress = '<h5 class="address">' + address + '</h5>' + linkToMap;

    if (website) {
      formattedName = '<a href="' + website + '" class="name">'
                        + formattedName + '</a>';
    }

    if (phone) {
      var formattedPhone = '<span class="phone">' + phone + '</span>'
      var html = '<div class="results">' + formattedName
                  + formattedPhone + formattedAddress + '</div>';
    } else {
      var html = '<div class="results">' + formattedName
                  + formattedAddress + '</div>';
    }

    return html;
  };

  GimmeSomething.pageNotFound = function () {
    var html = '<h1 class="not_found">404 NOT FOUND</h1>\
            <p>Try something else!</p>';

    return html;
  };
	
	GimmeSomething.loadingTemplate = function () {
		console.log("here")
		var html = '<div class=loading>LOADING...</div>';

		return html;
	};
})();
