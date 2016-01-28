// working on PC browser (Chrome) but doesn't on my mobile device ( where I installed my app).

// So I have edited 4 files. 
// First I inserted the factory in my services.js file:

angular.module('starter.storage', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);
// Then in my app.js file I added the dependency name:

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.storage'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
              // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

        });
    })
// Then in controllers.js file I have this code, inserted under the controller that is loaded 
// when I load the page view with my items in the list, in order to achive the favorite list that 
// I mentioned in my earlier posts:

if ($scope.favlist) {
  console.log($scope.favlist);  
} else {
    $scope.favlist = [];
    $scope.favlist = $localstorage.getObject('favlist');
    $localstorage.setObject('favlist', $scope.favlist);
}
// Functions for 'favorite' button option on items in the list

$scope.addFavorite = function (event){

   $localstorage.setObject('favorit', event);
    console.log($localstorage.getObject('favorit'));
   $scope.favorite = $localstorage.getObject('favorit');
  if ($scope.favlist) {
      console.log($scope.favlist)
      $scope.favlist.push($scope.favorite); 
    $localstorage.setObject('favlist', $scope.favlist);
  } else {
      $scope.favlist = [];
     $scope.favlist.push($scope.favorite); 
      console.log($scope.favlist)
    $localstorage.setObject('favlist', $scope.favlist);
      console.log($scope.favlist)
  }
}
$scope.delFavorite = function (event) {
  $scope.favlist.splice(event, 1);
  $localstorage.setObject('favlist', $scope.favlist);
}
// So for displaying favorited items in my page ( items.html ) I use this:

<ion-list can-swipe="true" show-delete="shouldShowDelete">
          <div ng-class="{hidden: favlist.length == 0}" class="item item-divider" >Evenimente favorite</div>
              <ion-toggle ng-class="{hidden: favlist.length == 0}" ng-model="shouldShowDelete">
            Delete item from favorites
         </ion-toggle>

     <ion-item ng-repeat="event in favlist track by $index | limitTo:15  | filter:find" ui-sref="app.event({slug:event.slug})" class="item item-thumbnail-left">

                 <p>{{event.title}}</p>
             <ion-delete-button class="ion-minus-circled" ng-click="delFavorite(event)"></ion-delete-button>
            </ion-item>
</ion-list>
And the items that could be favorited ( those that have favorite button option are listed like this:

<ion-list>
      <div class="item item-divider" ng-class="{hidden: deAstazi.length == 0}">Evenimente recomandate astazi</div>
          <ion-item ng-repeat="event in deAstazi | limitTo:15  | filter:find" ui-sref="app.event({slug:event.slug})" class="item item-thumbnail-left">

          <h2 class="assertive">{{event.title}}</h2>
            <ion-option-button  class="button-positive" ng-click="addFavorite(event)">
                    Favorite
            </ion-option-button>
        </ion-item>
</ion-list>
// The controller for this page is loaded via 
.config (function ($stateProvider, $urlRouterProvider) { ...

// Can someone explain to me what I did wrong so that this works perfect on chrome ( no errors ) 
// and not working on my device. ( or any other Android device )