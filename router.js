;(function () {
  var Router = function (el) {
    this.$el = $(el);
    this.routes = {};

    this.route("/pizza", "pizza");
    this.route("/tacos", "mexican");
    this.route("/sushi", "sushi");
    this.route("/pad_thai", "thai");
    this.route("/curry", "indian");
    this.route("/burgers", "burgers");
    this.route("/spaghetti", "italian");
    this.route("/waffles", "diners");
    this.route("/cookies", "bakeries");
    this.route("/ice_cream", "ice cream");
    this.route("/beer", "bars");
    this.route("/anything", "restaurants");

    window.addEventListener("hashchange", this.switchPage.bind(this));
    window.addEventListener("load", this.switchPage.bind(this));
  };

  Router.prototype.route = function (path, searchTerm) {
    this.routes[path] = {
      searchTerm: searchTerm
    };
  };

  Router.prototype.switchPage = function () {
    $main = $("#main");
    var url = location.hash.slice(1) || "/";

    var route = this.routes[url] || {};

    if ($main && route.searchTerm) {
      var $new = $("#" + url.slice(1));
      $main.html($new.html());
    }
  };

  $(function () {
    new Router(document.getElementById("body"));
  });
})();
