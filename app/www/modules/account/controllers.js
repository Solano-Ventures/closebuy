angular.module('account', ['account.services'])

.controller('AccountController', function($scope, $location, $filter, Auth) {
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
  var orderBy = $filter('orderBy')

  $scope.order = function(listItem, reverse){
  	$scope.items = orderBy($scope.items, listItem, reverse)
  };
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
  $scope.test = function(title){
  	var query = new Parse.Query('Items').equalTo('description', title)
  	query.find().then(function(result){
  	  result[0].destroy();
  	})
  	for(var i = 0; i<$scope.items.length; i++){
  	  if($scope.items[i].title === title){
  	  	$scope.items.splice(i,1)
  	  }
  	}
  		/*	result.destroy({
  				success: function(obj){
  					console.log("deleted", obj)
  				},
  				error: function(obj, error){
  					console.log(error)
  				}
  			})
  		},
  		error: function(error){
  			console.log("error")
  		}
  	})*/
  }

});
 