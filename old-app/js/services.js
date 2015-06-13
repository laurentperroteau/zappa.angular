"use strict";

   // un factory retour un objet
   //      un service retourne une fonction
   //      un provider retourne la fonction $get

/*app.service('GlobalVar', ['', function(){

    var notes = 'First';

    return {
        getProperty: function () {
            return notes;
        },
        setProperty: function(value) {
            notes = value;
        }
    };
}]); */


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


/*app.factory('Itunes', function ($resource) {

    var getCover = function(searchTerm) {

        return $resource('https://itunes.apple.com/:action', {
                    action: "search",
                    params: {
                        term: searchTerm,
                        entity: 'musicTrack'
                    },
                    callback: 'JSON_CALLBACK'
                }, 
                {
                    get: {
                        method: 'JSONP'
                    }
                });
    };

    return {
        cover: getCover
    }
});*/


 



/*
 * Services can be defined as : "value", "service", "factory", "provider", or "constant".
 *
 * For simplicity only example of "value" and "service" are shown here. 
 */

// EXAMPLE OF CORRECT DECLARATION OF SERVICE AS A VALUE
//app.value('version', '0.1');

// EXAMPLE OF CORRECT DECLARATION OF SERVICE
// here is a declaration of simple utility function to know if an given param is a String.
/*app.service("UtilSrvc", function () {
    return {
        isAString: function(o) {
            return typeof o == "string" || (typeof o == "object" && o.constructor === String);
        },
        helloWorld : function(name) {
            var result = "Hum, Hello you, but your name is too weird...";
            if (this.isAString(name)) {
                result = "Hello, " + name;
            }
            return result;
        }
    }
});*/