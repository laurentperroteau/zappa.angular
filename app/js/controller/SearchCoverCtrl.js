'use strict';

app.controller('SearchCoverCtrl', function (
    $scope, Itunes
){
    var _this = this;

    $scope.$watch('queryCover', function (val) {
        
        // If exist and more than 3 Si existe character
        if ( !val || val.length < 4 )
            return false;
        
        // if queryCover is still the same..
        // go ahead and retrieve the data
        if (val === $scope.queryCover)
        {
            Itunes.get({
                    term: val,
                    entity: 'musicTrack'
                }, function(response) {

                    _this.covers = response.results;
                }
            );
        }
    })

    _this.selectedCover = function( $imgPath ) {

        console.log( $imgPath );
    }   
});
