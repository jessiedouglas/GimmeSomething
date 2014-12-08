;(function () {
  var Router = function (el) {
    this.$el = $(el);
    this.routes = {};

    this.route("/pizza", "pizza", "bff");
    this.route("/tacos", "tacos", "wtf");

    window.addEventListener("hashchange", this.switchPage.bind(this));
    window.addEventListener("load", this.switchPage.bind(this));
  };

  Router.prototype.route = function (path, templateId, controller) {
    this.routes[path] = {
      templateId: templateId,
      controller: controller
    };
  };

  Router.prototype.switchPage = function () {
    $main = $("#main");
    var url = location.hash.slice(1) || "/";

    var route = this.routes[url] || {};

    if ($main && route.controller) {
      var $new = $("#" + url.slice(1));
      $main.html($new.html());
    }
  };

  $(function () {
    new Router(document.getElementById("body"));
  });
})();
