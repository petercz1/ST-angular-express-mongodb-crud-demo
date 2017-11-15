console.log('loaded main.js');
// $scope is simply the data object!

var front_app = angular.module('demo_app', []);
front_app.controller('process_data', process_data);

function process_data($scope, $http) {
  console.log('loading all data crud functions');
  $scope.message = 'good morning.';
  
  $scope.read = function () {
    console.log('running scope.get...');
    $http.get('/api/index')
      .then(function (people) {
        $scope.people = people.data;
        console.log($scope.people);
        $scope.message = 'got list of people';
      });
  }
  $scope.get();

  $scope.create = function () {
    var data = {
      user: $scope.input_name,
      pass: $scope.input_pass
    }
    console.log(data);
    $http.post('/api/index', data)
      .then(function (response) {
        $scope.message = response;
        $scope.get();
      });
  }
  $scope.update = function (person) {
    console.log('updating...');
    console.log(person);
    $http.put('/api/index', person)
      .then(function (response) {
        console.log(response);
        $scope.message = 'updated user';
        $scope.get();
      })
      .then(function (err) {
        if (err) {
          console.log(err);
        }
      });
  }

  $scope.delete = function (person) {
    console.log('deleting...');
    console.log(person);
    $http.delete('/api/index/' + person._id).then(function (response) {
      console.log(response);
      console.log('deleted?');
      $scope.message = 'deleted user';
      $scope.get();
    }).then(function (err) {
      if (err) {
        console.log(err);;
      };
    });
  }
}