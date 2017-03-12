document.addEventListener('DOMContentLoaded', function() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYnJpZ2h0cmFpbiIsImEiOiJyMjgtNGk4In0.Y64dPMiS4Xi8BXRiDhWXyg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/brightrain/cizqczdcf00182rp2lyraygkl',
        center: [-101, 40],
        zoom: 4,
        bearing: 27,
        pitch: 45
    });
    var clients = {
        'scl': {
            bearing: 27,
            center: [-122.33019948005676, 47.60576519284244],
            zoom: 15.5,
            pitch: 20
        },
        'epa': {
            duration: 6000,
            center: [-77.0318100917701, 38.8921484726012],
            bearing: 150,
            zoom: 15,
            pitch: 0
        },
        'seattle': {
            bearing: 90,
            center: [-122.32993434446111, 47.60509878517061],
            zoom: 13,
            speed: 0.6,
            pitch: 40
        },
        'blm': {
            bearing: 90,
            center: [-105.077234, 40.587761],
            zoom: 12.3
        },
        'erd': {
            bearing: 45,
            center: [-73.97170550565944, 40.7504852247058],
            zoom: 15.3,
            pitch: 20,
            speed: 0.5
        },
        'colorado-state-parks': {
            bearing: 45,
            center: [-104.98522690607003, 39.737095907943775],
            zoom: 15.3,
            pitch: 20,
            speed: 0.5
        },
        'vv': {
            bearing: 180,
            center: [-122.28666186332701, 47.47078454895358],
            zoom: 12.3
        },
        'msd': {
            bearing: 90,
            center: [-122.29350686073303, 47.3866119860658],
            zoom: 17.3,
            pitch: 40
        }
    };

    // On every scroll event, check which element is on screen
    window.onscroll = function() {
        var clientNames = Object.keys(clients);
        for (var i = 0; i < clientNames.length; i++) {
            var clientName = clientNames[i];
            if (isElementOnScreen(clientName)) {
                setActiveChapter(clientName);
                break;
            }
        }
    };

    var activeClientName = 'scl';
    function setActiveChapter(clientName) {
        if (clientName === activeClientName) return;

        map.flyTo(clients[clientName]);

        document.getElementById(clientName).setAttribute('class', 'active');
        document.getElementById(activeClientName).setAttribute('class', '');

        activeClientName = clientName;
    }

    function isElementOnScreen(id) {
        var element = document.getElementById(id);
        var bounds = element.getBoundingClientRect();
        return bounds.top < window.innerHeight && bounds.bottom > 0;
    }
});