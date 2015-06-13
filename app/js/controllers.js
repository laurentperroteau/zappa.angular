'use strict';

var idZappa = 'e20747e7-55a4-452e-8766-7b985585082d';
var idMothers = 'fe98e268-4ddd-441b-95a0-b219375f9ae4';
var zappaName = 'Frank Zappa';
var mothersName = 'Frank Zappa and the Mothers of Invention';


app.controller('DisplayListController', function ($scope, MusicBrainz) {

    function correctionAlbums( aAlbumns, authorName ) {

        for (var i = 0, len = aAlbumns.length; i < len; i++) {

            aAlbumns[i].date = aAlbumns[i].date.substring(0, 4);
            aAlbumns[i].author = authorName;
        }

        return aAlbumns;
    }

    function deleteDuplicate( aAlbumns ) {

        var len = aAlbumns.length;

        for (var i = 0; i < len; i++) {

            for (var y = 0; y < len; y++) {

                if( aAlbumns[i] !== undefined && aAlbumns[y] !== undefined ) {

                    if ( aAlbumns[i].title.trim() == aAlbumns[y].title.trim() ) {

                        // Delete duplicate and move to next index
                        aAlbumns.remove(i);
                        i++;
                    }
                }
            }
        }

        return aAlbumns;
    }

    MusicBrainz.albums( idZappa ).then( function (response) {

        // Correction data et ajout de l'auteur
        var aFzAlbums = correctionAlbums( response.data.releases, zappaName );

        MusicBrainz.albums( idMothers ).then( function (response) {

            var aMotherAlbums = correctionAlbums( response.data.releases, mothersName );

            var aAlbumns = aFzAlbums.concat( aMotherAlbums );
            
            $scope.albums = deleteDuplicate( aAlbumns );
        });
    });
});

app.controller('SearchCoverController', function ($scope, $timeout, Itunes) {

    $scope.$watch('queryCover', function (val) {
        
        // Si existe et plus de 3 lettre
        if ( !val || val.length < 4 )
            return false;
        
        // if queryCover is still the same..
        // go ahead and retrieve the data
        if (val === $scope.queryCover)
        {
            console.log( val );
            Itunes.get({
                    term: val,
                    entity: 'musicTrack'
                }, function(response) {

                    $scope.covers = response.results;
                    console.log( $scope.covers );
                }
            );
        }
    })

    $scope.selectedCover = function( $imgPath ) {

        console.log( $imgPath );
    }    
});