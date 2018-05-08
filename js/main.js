// eseménykezelő beállítása

$("p").click(function(){
    //$(this).hide();
    //$(this).slideDown(2000).slideUp(2000);
});

// esemény kiváltása

//$("p").click();

// kattintás megelőzése


/*
$("nav a.nav-link").click( function(ev) {
    ev.preventDefault();
    var link = $(this)
    $(document.body).animate ({
        opacity: '0'
    }, 1000, function() {
        document.location = link.attr("href");
    });
});
*/

$("nav a.nav-link").click( function(ev) {
    ev.preventDefault();
    startPageChange(this, 1, false) 

    function startPageChange(elem, num, bool) {
    var link = $(elem);
    var prop = link.data("prop") || "opacity";
    var val = link.data("value") || "0";
    var speed = link.data("speed") || 200;
    var settings = {};
    settings[prop] = val;

    $(document.body).animate (settings, speed, function() {
        document.location = link.attr("href");
    }); 
  }
});

// Event oldal.
$(".events-search-row input").on("keyup", function (ev) {
    $.each($(".events-card-deck .card .card-title"), function (index, elem) {
      elem = $(elem);
      var search = ev.target.value.toLowerCase();
      var content = elem.html().toLowerCase();
      if (content.indexOf(search) == -1) {
        elem.parents(".card").hide();
      } else {
        elem.parents(".card").show();
      }
    });
  });

  // Regiszter oldal.
$(".cherry-custom-file").on("change", function (ev) {
    var name = ev.target.value.split("\\").pop();
    $(this)
      .find(".file-name")
      .html(name);
  });
  
 // ticket oldal
  
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  