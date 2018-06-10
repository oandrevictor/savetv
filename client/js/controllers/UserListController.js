var kitso = angular.module('kitso');

kitso.controller('UserListController',
['$scope', '$location', '$timeout', 'UserListService', 'MovieService','$routeParams', 'AuthService',
function($scope, $location, $timeout, UserListService, MovieService, $routeParams, AuthService) {
  UserListService.loadUserList($routeParams.userlist_id).then(() => {
    $scope.userlist = UserListService.getUserList();
    loadUserListBackground();
  }).catch((error) => {
      UIkit.notification({
          message: '<span uk-icon=\'icon: check\'></span> ' + error.errmsg,
          status: 'danger',
          timeout: 2500
      });
  });

  $scope.goToMedia = function (media) {
    if (media.__t === 'TvShow') {
      $location.path('tvshow/' + media._id);
    } else if (media.__t === "Movie") {
      $location.path('movie/' + media._id);
    } else if (media.__t === "Episode"){
      $location.path('tvshow/' + media._tvshow_id + '/season/'+ media.season_number);
    }

  }

  $scope.getPoster = function(media){
    return 'https://image.tmdb.org/t/p/w500/' + media.poster_path;
  }

  var loadUserListBackground = function () {
    var addedMovies = [];
    $scope.userlist.itens.forEach((item) => {
      addedMovies.push(item._media);
    });

    if (addedMovies.length > 0) {
      $scope.background = addedMovies[0].backdrop_path;
    } else {
      $scope.background = "/images/coco.jpg";
    }
  }

  $scope.formatDate = function (date) {
    return moment(date).format('DD/MM/YYYY')
  };
}]);