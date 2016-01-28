// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var coolDad = angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab' : {
          templateUrl: 'templates/home.html'
        }
      }
    })

    .state('tabs.list', {
      url: '/list',
      views: {
        'list-tab' : {
          templateUrl: 'templates/list.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.detail', {
      url: '/list/:aId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/detail.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.calendar', {
      url: '/calendar',
      views: {
        'calendar-tab' : {
          templateUrl: 'templates/calendar.html',
          controller: 'CalendarController'
        }
      }
    })

    .state('tabs.favorites', {
      url: '/favorites',
      views: {
        'favorites-tab' : {
          templateUrl: 'templates/favorites.html',
          controller: 'FavoritesController'
        }
      }
    })



  $urlRouterProvider.otherwise('/tab/home');
})

.controller('CalendarController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/data.json').success(function(data) {
      $scope.calendar = data.calendar;

      $scope.onItemDelete = function(dayIndex, item) {
        $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1);
      }

      $scope.doRefresh =function() {
      $http.get('js/data.json').success(function(data) {
          $scope.calendar = data.calendar;
          $scope.$broadcast('scroll.refreshComplete');
        });
      }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

    });
}])

.controller('ListController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/data.json').success(function(data) {
      $scope.activities = data.activities;
      $scope.whichactivity=$state.params.aId;
      $scope.data = { showDelete: false, showReorder: false };

      $scope.onItemDelete = function(item) {
        $scope.activities.splice($scope.activities.indexOf(item), 1);
      }

      $scope.doRefresh =function() {
      $http.get('js/data.json').success(function(data) {
          $scope.activities = data;
          $scope.$broadcast('scroll.refreshComplete'); 
        });
      }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

      $scope.saveFavorite = JSON.parse(localStorage.getItem('favorites')) || []; 
        // add class 'fav' to each favorite
        favorites.forEach(function(favorite) {
          document.getElementById(favorite).className = 'fav';
        });
        // register click event listener
        document.querySelector('.list').addEventListener('click', function(e) {
          var id = e.target.id,
              item = e.target,
              index = favorites.indexOf(id);
          // return if target doesn't have an id (shouldn't happen)
          if (!id) return;
          // item is not favorite
          if (index == -1) {
            favorites.push(id);
            item.className = 'fav';
          // item is already favorite
          } else {
            favorites.splice(index, 1);
            item.className = '';
          }
          // store array in local storage
          localStorage.setItem('favorites', JSON.stringify(favorites));
        });
        // local storage stores strings so we use JSON to stringify for storage and parse to get out of storage
      }

      $scope.moveItem = function(item, fromIndex, toIndex) {
        $scope.activities.splice(fromIndex, 1);
        $scope.activities.splice(toIndex, 0, item);
      };
    });
}])

// Reference this pen for fixing the favorites storage below: http://codepen.io/mattwojo/pen/qbxKBd
.controller('FavoritesController', ['$scope',
    function($scope) {

      $scope.loadFavorite = function() {
        // alert(window.localStorage.getItem("favoriteData"));
        alert(window.localStorage.getItem("favorites"));
      }

}])