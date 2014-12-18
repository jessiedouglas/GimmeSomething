;(function () {
  var GimmeSomething = window.GimmeSomething = window.GimmeSomething || {};

  GimmeSomething.Controller = function (el) {
    this.$el = $(el);

    this.$el.on("click", "button#position", this.getCoords.bind(this));
    this.$el.on("click", "#search", this.search.bind(this));
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
          //DO SOMETHING
        } else {
          GimmeSomething.address = resp.results[0].formatted_address;
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
      query: keyword,
      location: location,
      radius: '1000',
      types: types,
      open_now: true
    };

    var node = document.getElementById("map_results");
    var service = new google.maps.places.PlacesService(node);
    service.textSearch(request, this.parseSearch.bind(this));
  };

  GimmeSomething.Controller.prototype.parseSearch = function (resp) {
    var info = {
      name: resp[0].name,
      address: resp[0].formatted_address,
      id: resp[0].place_id
    };

    this.renderSearch(info);
  };

  GimmeSomething.Controller.prototype.renderSearch = function (info) {
    var name = info.name;
    var address = info.address;

    var request = {
      placeId: info.id
    };

    var node = document.getElementById("map_results");
    var service = new google.maps.places.PlacesService(node);

    service.getDetails(request, function (place, status) {
      if (status == "OK") {
        var results = {
          phone: place.formatted_phone_number,
          website: place.website
        };
      } else {
        var results = {};
      }

      this.$el.find("a#search").remove();
      this.$el.append(GimmeSomething.searchResultsTemplate(name, address, results));
    }.bind(this));
  };
})();
