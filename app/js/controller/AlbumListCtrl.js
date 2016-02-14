'use strict';

app.controller('AlbumListCtrl', function (
    $scope,
    $rootScope, 
    MusicBrainz, Itunes
){

    var _this = this;
    this.albumsQty = 0;
    this.state = "init brainz";
    this.stateItunes = "init itunes";

    MusicBrainz.albums( $rootScope.idZappa ).then( function (response) {

        _this.state = "première réponse brainz";

        // Fix data and add author
        var aFzAlbums = _this.correctionAlbums( response.data.releases, $rootScope.zappaName );


        MusicBrainz.albums( $rootScope.idMothers ).then( function (response) {

            _this.state = "deuxième réponse brainz";

            var aMotherAlbums = _this.correctionAlbums( response.data.releases, $rootScope.mothersName );

            var aAlbumns = aFzAlbums.concat( aMotherAlbums );
            
            _this.albums = _this.deleteDuplicate( aAlbumns );

            _this.albumsQty = _this.albums.length;

            _this.getCover( _this.albums );

            _this.state = "fin brainz";
        });
    });


    this.correctionAlbums = function( aAlbumns, authorName ) {

        for (var i = 0, len = aAlbumns.length; i < len; i++) {

            // Get only year for date
            aAlbumns[i].date = aAlbumns[i].date.substring(0, 4);

            // Set author
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

            _this.stateItunes = 'search cover';

            Itunes.get({
                    term: $rootScope.zappaName +' '+ album.title,
                    entity: 'musicTrack'
                }, function(response) {

                    _this.covers = response.results;

                    if( _this.covers[0] !== undefined ) {

                        if( _this.covers[0].artworkUrl100 !== undefined ) {
                            
                            _this.albums[ key ].itunesCover = _this.covers[0].artworkUrl100;

                            _this.stateItunes = 'set cover';
                        }
                    }
                }
            );
        });
    };

});