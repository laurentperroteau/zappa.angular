'use strict';

app.controller('WrapperController', function (
    $rootScope, $scope, $timeout, 
    MusicBrainz, Itunes
){

    var _this = this;

    $rootScope.idZappa = 'e20747e7-55a4-452e-8766-7b985585082d';
    $rootScope.idMothers = 'fe98e268-4ddd-441b-95a0-b219375f9ae4';
    $rootScope.zappaName = 'Frank Zappa';
    $rootScope.mothersName = 'Frank Zappa and the Mothers of Invention';
});