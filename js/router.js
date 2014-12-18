;(function () {
  var GimmeSomething = window.GimmeSomething = window.GimmeSomething || {};

  GimmeSomething.Router = function (el) {
    this.$el = $(el);
    this.routes = {};

    this.route("/", "home");
    this.route("/pizza", "pizza");
    this.route("/tacos", "mexican", "Mexican food");
    this.route("/sushi", "sushi");
    this.route("/pad_thai", "thai", "Thai food");
    this.route("/curry", "indian", "Indian food");
    this.route("/burgers", "burgers");
    this.route("/spaghetti", "italian", "Italian food");
    this.route("/waffles", "diners", "a diner");
    this.route("/cookies", "bakeries", "a bakery");
    this.route("/ice_cream", "ice&cream", "ice cream");
    this.route("/beer", "bars", "a bar");
    this.route("/coffee", "cafes", "a cafe");
    this.route("/anything", "restaurants", "a restaurant");

    window.addEventListener("hashchange", this.renderPage.bind(this));
    window.addEventListener("load", this.renderPage.bind(this));
  };

  GimmeSomething.Router.prototype.route = function (path, searchTerm, description) {
    this.routes[path] = {
      searchTerm: searchTerm,
      description: description || searchTerm
    };
  };

  GimmeSomething.Router.prototype.renderPage = function () {
    var url = location.hash.slice(1) || "/";
    GimmeSomething.currentRoute = url.slice(1);

    var route = this.routes[url] || {};

    if (this.$el && route.searchTerm) {
      if (route.searchTerm == "home") {
        this.$el.html(GimmeSomething.homeTemplate());
      } else {
        this.$el.html(GimmeSomething.beforeSearchTemplate(url));
      }
    } else {
      this.$el.html(GimmeSomething.pageNotFound());
    }
  };
})();
