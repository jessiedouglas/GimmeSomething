;(function () {
  //Credit: http://www.quirksmode.org/js/cookies.html
  GimmeSomething = window.GimmeSomething = window.GimmeSomething || {};

  GimmeSomething.createCookie = function (name,value,days) {
  	if (days) {
  		var date = new Date();
  		date.setTime(date.getTime()+(days*24*60*60*1000));
  		var expires = "; expires=" + date.toGMTString();
  	} else {
      var expires = "";
    }

  	document.cookie = name+"=" + value + expires + "; path=/GimmeSomething";
  };

  GimmeSomething.readCookie = function (name) {
  	var nameEQ = name + "=";
  	var ca = document.cookie.split(';');
  	for (var i=0; i < ca.length; i++) {
  		var c = ca[i];
  		while (c.charAt(0)==' ') {
        c = c.substring(1,c.length);
      };

  		if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length,c.length);
      }
  	}
  	return null;
  };

  GimmeSomething.eraseCookie = function (name) {
  	GimmeSomething.createCookie(name,"",-1);
  };

  GimmeSomething.getPreviousLocation = function () {
    debugger
    return GimmeSomething.readCookie("location");
  };

  GimmeSomething.storeLocation = function (location) {
    GimmeSomething.createCookie("location", location, 1000);
  };

  GimmeSomething.eraseLocation = function () {
    GimmeSomething.address = null;
    GimmeSomething.eraseCookie("location");
  };
})();
