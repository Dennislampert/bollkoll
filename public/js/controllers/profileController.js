app.controller("profileController", ["$scope", "$routeParams", "User", function($scope, $routeParams, User){

	$scope.saveUserInfo = function(){
		//$scope.userName

		console.log($scope.userName);

		User.create({
			userName: $scope.userName,
			picturePath: "some path.."

		});


	};
}]);