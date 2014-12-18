;(function () {
  var GimmeSomething = window.GimmeSomething = window.GimmeSomething || {};

  GimmeSomething.beforeSearchTemplate = function (url) {
    var params = GimmeSomething.router.routes[url];
    var headerWord = GimmeSomething.currentRoute.toUpperCase().split("_").join(" ");

    var html =
      '<h1>GIMME ' + headerWord + '</h1>\
      <p>Find ' + params.description + ' near you</p>'

    var locationForm =
      '<label for="position">Where are you?</label>\
      <input type="text" id="position" placeholder="Enter a street address or zip code">\
      <button id="position">Submit</button>';

    var hasLocation =
      '<p>You are in ' + GimmeSomething.address + '</p>'
      + '<a href="#" id="search">GO!</a>';

    if (GimmeSomething.address) {
      return html + hasLocation;
    } else {
      return html + locationForm;
    }
  };

  GimmeSomething.searchResultsTemplate = function (name, address, info) {
    var website = info.website;
    var phone = info.phone;
    var mapsUrl = "http://www.google.com/maps/place/" + address.split(" ").join("+");

    var formattedName = '<h3 class="name">' + name + '</h3>'
    var linkToMap = '<a target="_blank" href="' + mapsUrl + '">See in Google Maps</a>';
    var formattedAddress = '<h5 class="address">' + address + '</h5>' + linkToMap;

    if (website) {
      formattedName = '<a href="' + website + '"' + formattedName + '</a>';
    }

    if (phone) {
      var formattedPhone = '<span class="phone">' + phone + '</span>'
      var html = formattedName + formattedPhone + formattedAddress;
    } else {
      var html = formattedName + formattedAddress;
    }

    return html;
  };

  GimmeSomething.pageNotFound = function () {
    html = '<h1 class="not_found">404 NOT FOUND</h1>\
            <p>Try something else!</p>';

    return html;
  };
})();
