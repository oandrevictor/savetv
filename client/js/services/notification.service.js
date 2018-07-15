var kitso = angular.module('kitso');

kitso.service('NotificationService', ['$q', '$http', function ($q, $http) {
    // return available functions for use in the controllers
    return ({
        getNotifications: getNotifications,
        create: create,
        setViewed: setViewed,
    });

    function create(notification) {
        // create a new instance of deferred
        var deferred = $q.defer();

        $http.post('/api/notification/', notification)
            .then(function (data) {
              if (data.status === 200) {
                deferred.resolve();
              } else {
                deferred.reject();
              }
            })
            .catch(function (error) {
              deferred.reject(error.data);
            });

        return deferred.promise;
    }

    function getNotifications(user_id) {
        // create a new instance of deferred
        var deferred = $q.defer();

        $http.get('/api/notification/' + user_id)
            .then(function (response) {
                if (response.status === 200) {
                    deferred.resolve(response.data);
                    user = response.data;
                } else {
                    deferred.reject();
                }
            })
            .catch(function (error) {
                user = error.data;
                deferred.reject(error.data);
            });

        return deferred.promise;
    }

    function setViewed(notification) {
        var deferred = $q.defer();

        $http.put('/api/notification/' + notification._id, notification)
            .then(function (response) {
                if (response.status === 200) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            })
            .catch(function (error) {
                deferred.reject(error.data);
            });

        return deferred.promise;
    }
}]);