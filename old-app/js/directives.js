"use strict";

// Les - sont transformé en camelCse
/*app.directive('mySearchCover', function () {

     return {
        replace: true,
        restrict: 'E',
        scope: {
            search: "=",
            minSearch: "=",
            list: "=",
            onSelect: "="
        },
        scope: {
            changeCover: '&',
            prout: '='
        },
        templateUrl: 'partials/_autocomplete.html'/*,
        link: function (scope, el, attrs) {

            console.log(scope.query);

            scope.$watch('UserSearch', function() {
                if(scope.search.length > scope.minSearch) {
                    // this onSelect function will callback
                    // into your controller
                    scope.onSelect(search);
                }
            });

        }
     }

});*/

/*
app.directive('inputtext', function ($timeout) {
    return {
        restrict:'E',
        replace:true,
        template:'<input type="text"/>',
        scope: { 
            //if there were attributes it would be shown here
        },
        link:function (scope, element, attrs, ctrl) {
            // DOM manipulation may happen here.      
        }
    }
});

app.directive('version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
});*/

// you may add as much directives as you want below