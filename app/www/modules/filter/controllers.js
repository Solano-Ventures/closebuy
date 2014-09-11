angular.module('filter', ['filter.services'])

.controller('FilterController', function($scope, $location, Auth) {
  $scope.items = [];
  $scope.logoutUser = function() {
    Auth.logoutUser();
  };
  $scope.routeToSell = function(){
  	$location.path("/tab/camera");
  };
  //function that does GET request to PARSE for user data
  // it will create an object which we can loop through 
  $scope.getUserData = function(){

  	var userId = Parse.User.current().id
  	var items = new Parse.Query('Items').equalTo('userId', userId);
  	items.find().then(function(value){
  	  angular.forEach(value, function(item){
  	  	$scope.items.push({ date: item.createdAt, title: item.attributes.description, price: item.attributes.price})
  	  })
  	  $scope.$apply()
  	})
  }
  	/*({
  		success:function(results){
  			angular.forEach(results, function(item){
  				$scope.items.push({ date: item.createdAt, title: item.attributes.description, price: item.attributes.price})
  			});
  			console.log($scope.items)
  		},
  		error: function(error){
  			console.log(error)
  		}
  	})*/
  /*$scope.getUserData();*/
});
 