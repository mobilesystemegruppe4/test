var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

/* Funktion initialisiert Google-Map*/
function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    /* Variable Heilbronn mit den Koordinaten für Google Maps wird erstellt */
    var heilbronn = new google.maps.LatLng(49.140864, 9.197958);
    /* Variable mapOptions mit Attributen für die Google-Map-Erstellung*/
    var mapOptions = {
        zoom:8,
        center: heilbronn,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP]
        }
    };
    /* Map wird generiert */
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    directionsDisplay.setMap(map);

    }
/* Funktion zur Routenberechnung */
function calcRoute() {
    /* Variable start wird mit String vom Input-Button mit der id="start" aus index.html befüllt */
    var start = document.getElementById("start").value;
    /* Variable end hat die Koordinaten für die Hochschule Heilbronn */
    var end = new google.maps.LatLng(49.122123, 9.210920);
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    /* Überprüfung des request und dementsprechende Ausgaben */
    directionsService.route(request, function(result, status) {
        /* Bei Status OK, wird Route ausgegeben */
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
        /* Verschiedenen Fehler-Stati geben Fehlermeldungen (alerts) aus */
        if (status == google.maps.DirectionsStatus.NOT_FOUND)
        {
            alert("Ausgangsort nicht erkannt bzw. konnte nicht geocodiert werden!")
        }
        if (status == google.maps.DirectionsStatus.ZERO_RESULTS)
        {
            alert("Zwischen Start- und Zielort konnte keine Route ermittelt werden!")
        }
        if (status == google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED)
        {
            alert("Maximale Anzahl an Wegpunkten überschritten! Nur 8 zulässig!")
        }
        if (status == google.maps.DirectionsStatus.INVALID_REQUEST)
        {
            alert("Bitte Startpunkt eingeben!")
        }
        if (status == google.maps.DirectionsStatus.OVER_QUERY_LIMIT)
        {
            alert("Zeitüberschreitung!")
        }
        if (status == google.maps.DirectionsStatus.REQUEST_DENIED)
        {
            alert("Ihre Anfrage wurde abgelehnt!")
        }
        if (status == google.maps.DirectionsStatus.UNKNOWN_ERROR)
        {
            alert("Serverfehler, bitte versuchen Sie es erneut!")
        }
    });
}
