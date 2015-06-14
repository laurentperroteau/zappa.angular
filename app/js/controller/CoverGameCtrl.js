'use strict';

app.controller('CoverGameCtrl', function (
    $rootScope, $timeout,
    MusicBrainz, Itunes
){

    var _this = this;

    MusicBrainz.albums( $rootScope.idZappa ).then( function (response) {

        // Correction data et ajout de l'auteur
        var aFzAlbums = _this.correctionAlbums( response.data.releases, $rootScope.zappaName );


        MusicBrainz.albums( $rootScope.idMothers ).then( function (response) {

            var aMotherAlbums = _this.correctionAlbums( response.data.releases, $rootScope.mothersName );

            var aAlbumns = aFzAlbums.concat( aMotherAlbums );
            
            _this.albums = _this.deleteDuplicate( aAlbumns );
        });
    });


    this.correctionAlbums = function( aAlbumns, authorName ) {

        for (var i = 0, len = aAlbumns.length; i < len; i++) {

            aAlbumns[i].date = aAlbumns[i].date.substring(0, 4);
            aAlbumns[i].author = authorName;
        }

        return aAlbumns;
    };


    this.deleteDuplicate = function( aAlbumns ) {

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
    };

    // On click on album title
    this.showCovers = function( album ) {

        var index = this.albums.indexOf( album );

        this.albums[ index ].covers = {};


        this.getCover( album.title, index, 'good' );



        this.getCover( album.title, index, this.getRandomWord() );
    };

    this.getRandomWord = function() {

        var words = [
            'belle', 'tour', 'david', 'john', 'the', 'frank', 'alain', 'franky'
        ];

        var randWord1 = words[ Math.floor( Math.random() * ((words.length - 1) - 0) + 0 ) ];
        var randWord2 = words[ Math.floor( Math.random() * ((words.length - 1) - 0) + 0 ) ];

        return randWord1 +' '+ randWord2; 
    };


    this.getCover = function( title, index, goodBad ) {

        var query = goodBad == 'good' ? $rootScope.zappaName +' '+ title : goodBad;

        Itunes.get({
                term: query,
                entity: 'musicTrack'
            }, function(response) {

                var res = response.results;

                if( res[0] !== undefined ) {


                    if( res[0].artworkUrl100 !== undefined ) {

                        _this.albums[ index ].covers[ goodBad ] = res[0].artworkUrl100;
                    }
                }
            }
        );
    };
});