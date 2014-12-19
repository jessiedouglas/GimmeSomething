;(function () {
  var GimmeSomething = window.GimmeSomething = window.GimmeSomething || {};

  GimmeSomething.Controller = function (el) {
    this.$el = $(el);

    this.$el.on("click", "button#position", this.getCoords.bind(this));
    this.$el.on("click", "#search", this.search.bind(this));
    this.$el.on("click", "#change_location", this.changeLocation.bind(this));
    this.$el.on("click", "a.why", this.whyTab.bind(this));
    this.$el.on("click", "a.acknowledgements", this.acknowledgementsTab.bind(this));
  };

  GimmeSomething.Controller.prototype.whyTab = function (event) {
    event.preventDefault();

    if (this.currentTab !== "why") {
      this.$el.find("div.tabs").html(GimmeSomething.whyTemplate());
      this.currentTab = "why";
      this.switchTabs();
    }
  };

  GimmeSomething.Controller.prototype.acknowledgementsTab = function (event) {
    event.preventDefault();

    if (this.currentTab !== "acknowledgements") {
      this.$el.find("div.tabs").html(GimmeSomething.acknowledgementsTemplate());
      this.currentTab = "acknowledgements";
      this.switchTabs();
    }
  };

  GimmeSomething.Controller.prototype.switchTabs = function () {
    var page = this.$el.find("div.tabs > div");
    page.addClass("transitioning");

    setTimeout(function () {
      page.removeClass("transitioning").addClass("active");;
    }, 0);
  };

  GimmeSomething.Controller.prototype.getCoords = function (event) {
    if (event) {
      event.preventDefault();
    }

    if ($("input#position").length > 0) {
      var place = $("input#position").val();
    } else {
      var place = GimmeSomething.address;
    }

    var url = "https://maps.googleapis.com/maps/api/geocode/json?"
    var data = {
      address: place
    };

    $.ajax({
      url: url,
      data: data,
      type: "GET",
      success: function (resp) {
        this.$el.find("ul.errors").empty();

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

    if (!this.coords) {
      this.getCoords();
    }

    setTimeout(function () {
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
    }.bind(this), 0);
  };

  GimmeSomething.Controller.prototype.parseSearch = function (resp, status) {
    if (resp.length === 0) {
      var html = '<div class="results">\
                  <p>There are no open locations near you :(</p>\
                  </div>';

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
