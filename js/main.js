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

  var alertBox = $(".alert.alert-primary");

  function showInvalidMessage() {
    alertBox
      .removeClass("alert-primary")
      .addClass(".alert-danger")
      .find(".alert-message")
      .text("sikertelen belépés");
  }

 // ticket oldal
  
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  // jegyek tömbje.

  var tickets = [
    {
      event: "Sziget fesztivál",
      time: "2018-08-03 18:00:00",
      seller: "Kiss Márton",
      pcs: "6",
      link: "licit/1"
    },
    {
      event: "Diótörő balett",
      time: "2018-08-03 18:00:00",
      seller: "Nagy Attila",
      pcs: "15",
      link: "licit/1"
    },
    {
      event: "MOMA Party",
      time: "2018-08-03 18:00:00",
      seller: "Czakó János",
      pcs: "6",
      link: "licit/1"
    },
    {
      event: "A Kékszakálú herceg vára",
      time: "2018-08-03 18:00:00",
      seller: "Márton Zita",
      pcs: "9",
      link: "licit/1"
    },
    {
      event: "Balett mindenkinek",
      time: "2018-08-03 18:00:00",
      seller: "Takács Bernadett",
      pcs: "13",
      link: "licit/1"
    },
    {
      event: "Macskák musical",
      time: "2018-08-03 18:00:00",
      seller: "Kiss Márton",
      pcs: "32",
      link: "licit/1"
    }
  ];

  // jegyek táblájának generálása

  var ticketTable = $("table.table.table-striped").eq(0);

  function fillTicketstable(currentTickets) {

    currentTickets = currentTickets || tickets ;

    var tbody = ticketTable.find("tbody");
    tbody.html("");
    $.each( currentTickets, function(index, ticket) {
      var row = $(".templates .ticket-row").clone();
      row.find("td").eq(0).html(index+1);
      row.find("td").eq(1).html(ticket.event);
      row.find("td").eq(2).html(ticket.time);
      row.find("td").eq(3).html(ticket.seller);
      row.find("td").eq(4).html(ticket.pcs);
      row.find("td").eq(5).html(ticket.link);

      tbody.append(row);
  });
}
fillTicketstable();

// jegyek táblájának generálása

$(".tickets-search-row input").on("keyup", filterTickets);

function filterTickets() {
 var currentValue = $(this).val().toLowerCase();
 var filteredTickets = [];
 if ( currentValue == "" ) {
   filteredTickets = tickets;
  }
  else {
    filteredTickets = tickets.filter( function(item) {
      var done = false;
    for ( var k in item ) {
      if ( item [k].toString().toLowerCase().indexOf(currentValue) > -1 ) {
        done = true;
      }
    }
    return done;
    });
  }
  fillTicketstable(filteredTickets);
}

// jegyek táblázat rendezése

ticketTable.find("thead th[data-key]").on("click", orderTicketTable);

  function orderTicketTable() {

    var th = $(this);
    $.each(ticketTable.find("thead th[data-key]"), function(index, elem){
        var currentTh = $(elem);
        if (th.data("key") != currentTh.data("key")){
          currentTh.removeClass("asc").removeClass("desc")
        }
    });
    var key = th.data("key");
    var sortedTickets = tickets.map( function(item) {

      return item;
    });

    if (th.hasClass("asc")){
      th.removeClass("asc").addClass("desc");
    }
    else {
      th.removeClass("desc").addClass("asc");
    }
   

    sortedTickets.sort( function (a,b){
      if (th.hasClass("asc")) {
        return a[key].toString().localeCompare(b[key].toString());
      }
      else{
        return b[key].toString().localeCompare(a[key].toString());
      }
      
    });
    fillTicketstable(sortedTickets);

  }
