console.log('loaded main.js');
// $scope is simply the data object!

var front_app = angular.module('demo_app', []);
front_app.controller('process_data', process_data);

function process_data($scope, $http) {
  console.log('loading all data crud functions');
  
  // 
  $scope.read = function () {
    console.log('getting list of users');
    $http.get('/api/index')
      .then(function (people) {
        $scope.people = people.data;
        console.log('got list of users');
      });
  }

  // now fire off the read function to get list of users
  $scope.read();

  $scope.create = function () {
    console.log('creating user...');
    var data = {
      user: $scope.input_name
    }
    console.log(data);

    $http.post('/api/index', data)
      .then(function (response) {
        console.log(response);
        $scope.read();
      });
  }

  $scope.update = function (person) {
    console.log('updating user...');
    console.log(person);

    $http.put('/api/index', person)
      .then(function (response) {
        console.log(response);
        $scope.read();
      });
  }

  $scope.delete = function (person) {
    console.log('deleting user...');
    console.log(person);

    $http.delete('/api/index/' + person._id)
    .then(function (response) {
      console.log(response);
      $scope.read();
    });
  }
}