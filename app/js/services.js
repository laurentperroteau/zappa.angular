"use strict";

app.factory('MusicBrainz', function ($http) {

    var getAlbums = function(iArtist) {

        return $http({

                url: 'https://musicbrainz.org/ws/2/release', 
                method: 'GET',
                params: {
                    artist: iArtist,
                    fmt: 'json',
                    type: 'album|ep'
                }
            }
        );
    };

    return {
        albums: getAlbums
    }
});

app.factory('Itunes', ['$resource',
    
    function($resource) {
        return $resource('https://itunes.apple.com/:action', {
            action: "search",
            callback: 'JSON_CALLBACK'
        }, {
            get: {
                method: 'JSONP'
            }
        });
    }
]); // https://itunes.apple.com/search?callback=angular.callbacks._0&entity=&term=Frank+Zappa