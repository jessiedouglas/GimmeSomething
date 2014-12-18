;(function () {
  var GimmeSomething = window.GimmeSomething = window.GimmeSomething || {};

  GimmeSomething.Controller = function (el) {
    this.$el = $(el);

    this.$el.on("click", "button#position", this.getCoords.bind(this));
    this.$el.on("click", "#search", this.search.bind(this));
    this.$el.on("click", "#change_location", this.changeLocation.bind(this));
  };

  GimmeSomething.Controller.prototype.getCoords = function (event) {
    event.preventDefault();

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
        if (resp.status != "OK") {
          var error = '<li>Unable to find location. Please try again.</li>'
          this.$el.find("ul.errors").append(error)
        } else {
          GimmeSomething.address = resp.results[0].formatted_address;
          GimmeSomething.storeLocation(GimmeSomething.address);
          this.coords = resp.results[0].geometry.location;
          GimmeSomething.router.renderPage();
        }
      }.bind(this),
      error: function (resp) {
        console.log("error: " + resp);
      },
      failure: function (resp) {
        console.log("failure: " + resp);
      }
    });
  };

  GimmeSomething.Controller.prototype.search = function (event) {
    event.preventDefault();

    var lat = this.coords.lat;
    var lng = this.coords.lng;
    var location = new google.maps.LatLng(lat, lng);
    var keyword = GimmeSomething.router.routes["/" + GimmeSomething.currentRoute].searchTerm;

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
      radius: '10000',
      types: types,
      opennow: true,
      rankby: google.maps.places.RankBy.DISTANCE
    };

    var node = document.getElementById("map_results");
    var service = new google.maps.places.PlacesService(node);
    service.nearbySearch(request, this.parseSearch.bind(this));
  };

  GimmeSomething.Controller.prototype.parseSearch = function (resp, status) {
    if (resp.length === 0) {
      var html = '<p>There are no open locations near you :(</p>';

      this.$el.find("a#search").remove();
      this.$el.append(html);
      return;
    }

    var info = {
      name: resp[0].name,
      id: resp[0].place_id
    };

    this.renderSearch(info);
  };

  GimmeSomething.Controller.prototype.renderSearch = function (info) {
    var name = info.name;

    var request = {
      placeId: info.id
    };

    var node = document.getElementById("map_results");
    var service = new google.maps.places.PlacesService(node);

    service.getDetails(request, function (place, status) {
      if (status == "OK") {
        var results = {
          address: place.formatted_address,
          phone: place.formatted_phone_number,
          website: place.website
        };
      } else {
        var results = {};
      }

      this.$el.find("a#search").remove();
      this.$el.append(GimmeSomething.searchResultsTemplate(name, results));
    }.bind(this));
  };

  GimmeSomething.Controller.prototype.changeLocation = function (event) {
    event.preventDefault();

    GimmeSomething.eraseLocation();
    GimmeSomething.router.renderPage();
  };
})();
