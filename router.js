;(function () {
  ;var Router = function (el) {
    this.$el = $(el);
    this.routes = {};

    this.route("/pizza", "pizza");
    this.route("/tacos", "mexican", "Mexican food");
    this.route("/sushi", "sushi");
    this.route("/pad_thai", "thai", "Thai food");
    this.route("/curry", "indian", "Indian food");
    this.route("/burgers", "burgers");
    this.route("/spaghetti", "italian", "Italian food");
    this.route("/waffles", "diners", "a diner");
    this.route("/cookies", "bakeries", "a bakery");
    this.route("/ice_cream", "ice&cream");
    this.route("/beer", "bars", "a bar");
    this.route("/coffee", "cafes", "a cafe");
    this.route("/anything", "restaurants", "a restaurant");

    window.addEventListener("hashchange", this.renderPage.bind(this));
    window.addEventListener("load", this.renderPage.bind(this));
    this.$el.on("click", "button#position", this.getCoords.bind(this));
    this.$el.on("click", "#search", this.search.bind(this));
  };

  Router.prototype.route = function (path, searchTerm, description) {
    this.routes[path] = {
      searchTerm: searchTerm,
      description: description || searchTerm
    };
  };

  Router.prototype.renderPage = function () {
    var url = location.hash.slice(1) || "/";
    this.currentRoute = url.slice(1);

    var route = this.routes[url] || {};

    if (this.$el && route.searchTerm) {
      this.$el.html(this.beforeSearchTemplate(url));
    }
  };

  Router.prototype.getCoords = function (event) {
    event.preventDefault();
    console.log("hi");

    var place = $("input#position").val();
    var url = "https://maps.googleapis.com/maps/api/geocode/json?"
    var data = {
      address: place
    };

    $.ajax({
      url: url,
      data: data,
      type: "GET",
      success: function (resp) {
        this.address = resp.results[0].formatted_address;
        this.coords = resp.results[0].geometry.location;
        this.renderPage();
        this.$el.append('<a href="#" id="search">GO!');
      }.bind(this),
      error: function (resp) {
        console.log("error: " + resp);
      },
      failure: function (resp) {
        console.log("failure: " + resp);
      }
    });
  };

  Router.prototype.search = function (event) {
    var lat = this.coords.lat;
    var lng = this.coords.lng;
    var location = new google.maps.LatLng(lat, lng);
    var keyword = this.routes["/" + this.currentRoute].searchTerm;

    if (keyword === "bars") {
      var types = ["bar", "food"];
    } else if (keyword === "cafes") {
      var types = ["cafe", "food"];
    } else {
      var types = ["restaurant", "food"];
    }

    var request = {
      keyword: keyword,
      location: location,
      radius: '1000',
      types: types,
      open_now: true
    };

    var node = document.getElementById("map_results");
    service = new google.maps.places.PlacesService(node);
    service.nearbySearch(request, function (resp) {
      debugger
    });
  };

  Router.prototype.beforeSearchTemplate = function (url) {
    var params = this.routes[url];
    var headerWord = this.currentRoute.toUpperCase().split("_").join(" ");

    var html =
      '<h1>GIMME ' + headerWord + '</h1>\
      <p>Find ' + params.description + ' near you</p>'

    var locationForm =
      '<label for="position">Where are you?</label>\
      <input type="text" id="position" placeholder="Enter a street address or zip code">\
      <button id="position">Submit</button>';

    var hasLocation =
      '<p>You are in ' + this.address + '</p>';

    if (this.address) {
      return html + hasLocation;
    } else {
      return html + locationForm;
    }
  };



  $(function () {
    new Router(document.getElementById("main"));
  });
})();
