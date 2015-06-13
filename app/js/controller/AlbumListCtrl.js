'use strict';

app.controller('AlbumListCtrl', function (
    $rootScope, 
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

            _this.getCover( _this.albums );
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


    this.getCover = function( albums ) {
 
        angular.forEach(albums, function(album, key) {

            Itunes.get({
                    term: $rootScope.zappaName +' '+ album.title,
                    entity: 'musicTrack'
                }, function(response) {

                    _this.covers = response.results;

                    if( _this.covers[0] !== undefined ) {

                        if( _this.covers[0].artworkUrl100 !== undefined ) {
                            
                            _this.albums[ key ].itunesCover = _this.covers[0].artworkUrl100;
                        }
                    }
                }
            );
        });
    };

});