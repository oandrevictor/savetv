 var kitso = angular.module('kitso');

kitso.controller('ProfileController', ['$scope', '$location', '$timeout', 'AuthService', 'WatchedService', 'RatedService', 'UserService',
 function ($scope, $location, $timeout, AuthService, WatchedService, RatedService, UserService) {
  AuthService.getStatus()
    .then(() => {
      $scope.user = AuthService.getUser();

      WatchedService.getAllWatched($scope.user._id)
        .then(function (watched) {
          watched.forEach(function (watched) {
            watched.date = new Date(watched.date);
          });

          $scope.user.watched = watched
        }).catch(function (error) {
          console.log(error);
        });

      RatedService.getAllRated($scope.user._id)
        .then((ratings) => {
          ratings.forEach((rated) => {
            rated.date = new Date(rated.date);
          });

          $scope.user.ratings = ratings;
        })
        .catch(function (error) {
          console.log(error);
        });
    });

  $scope.formatDate = function (date) {
    return moment(date).format('DD/MM/YYYY')
  };

  $scope.range = function(count){
      var ratings = [];
      for (var i = 0; i < count; i++) {
          ratings.push(i+1)
      }
      return ratings;
  }


  $scope.updateWatched = function (watched) {
    WatchedService.updateWatched(watched).then(function (watched) {
      UIkit.dropdown($('#watched-date-' + watched._id)).hide()
    }).catch(function (error) {
      console.log(error);
    })

  }

  $scope.canEdit = function(){
    return true;
  }
  $scope.updateRated = function (rated, n) {
    rated.rating = n;
    RatedService.updateRated(rated)
      .then((rated) => {
        UIkit.dropdown($('#rated-' + rated._id)).hide();
      }).catch((error) => {
        console.log(error);
      });

  }

  $scope.submitForm = function () {

    if ($scope.editForm.$valid) {
      UserService.editUser($scope.user)
        // handle success
        .then(function () {
          $scope.descriptionArea = false;
          UIkit.notification({
            message: '<span uk-icon=\'icon: check\'></span> User successfully edited.',
            status: 'success',
            timeout: 1500
          });
        })
        // handle error
        .catch(function (error) {
          var dangerMessage = 'Something went wrong...';

          if (error.hasOwnProperty('code') && error.code === 11000) {
            if (error.errmsg.includes('username_1')) {
              dangerMessage = 'Username already in use';
            } else if (error.errmsg.includes('email_1')) {
              dangerMessage = 'Email already in use';
            }

            UIkit.notification({
              message: '<span uk-icon=\'icon: check\'></span> ' + dangerMessage,
              status: 'danger',
              timeout: 2500
            });
          } else {
            UIkit.notification({
              message: '<span uk-icon=\'icon: check\'></span> ' + dangerMessage,
              status: 'danger',
              timeout: 2500
            });
          }
        });
    }
  };

  $scope.deleteAccount = function () {
    if ($scope.deleteForm.$valid && $scope.confirmationText($scope.delete.text)) {
      AuthService.deleteUser($scope.user._id, $scope.delete.password)
        .then(() => {
          UIkit.notification({
            message: '<span uk-icon=\'icon: check\'></span> Account deleted. Good Bye :(',
            status: 'success',
            timeout: 2500
          });

          $timeout(function () {
            UIkit.modal('#modal-delete2').hide();
            $location.path('/login');
          }, 1500);
        })
        .catch((error) => {
          if (error.status == 401) {
            UIkit.notification({
              message: "<span uk-icon=\'icon: check\'></span> Wrong password.",
              status: 'danger',
              timeout: 2000
            });
          } else {
            UIkit.notification({
              message: "<span uk-icon=\'icon: check\'></span> We can't delete your account right now. Please contact the support.",
              status: 'warning',
              timeout: 2500
            });
          }
        });
    } else {
      UIkit.notification({
        message: "<span uk-icon=\'icon: check\'></span> Please input both the password and the exact confirmation text.",
        status: 'warning',
        timeout: 2500
      });
    }
  };

  $scope.isInvalid = function (field) {
    return (field.$invalid && !field.$pristine);
  };

  $scope.confirmationText = function (text) {
    return text === 'I know this is a permanent action';
  }

  //$scope.descriptionArea = false;
  $scope.toggleDescriptionArea = function () {
    $scope.descriptionArea = !$scope.descriptionArea;
  }

}]);
