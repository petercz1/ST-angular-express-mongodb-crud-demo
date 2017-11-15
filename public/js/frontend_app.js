console.log('loaded main.js');
// $scope is simply the data object!

var front_app = angular.module('demo_app', []);
front_app.controller('process_data', process_data);

function process_data($scope, $http) {
  console.log('loading all data crud functions');
  
  $scope.read = function () {
    console.log('getting list of people');
    $http.get('/api/index')
      .then(function (people) {
        $scope.people = people.data;
        console.log('got list of people');
      });
  }
  $scope.read();

  $scope.create = function () {
    console.log('creating user');
    var data = {
      user: $scope.input_name
    }
    $http.post('/api/index', data)
      .then(function (response) {
        console.log(response);
        $scope.read();
      });
  }

  $scope.update = function (person) {
    console.log('updating...');
    console.log(person);
    $http.put('/api/index', person)
      .then(function (response) {
        $scope.message = response.data + "\n" + $scope.message;
        console.log(response);
        $scope.read();
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
      $scope.message = response.data + "\n" + $scope.message;
      console.log(response);
      $scope.read();
    });
  }
}