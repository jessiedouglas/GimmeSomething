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
})();
