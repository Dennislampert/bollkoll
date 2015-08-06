app.controller("profileController", ["$scope", "Person", function($scope, Person){

	$scope.saveUserInfo = function(){
		//$scope.userName

		console.log($scope.userName);

		Person.create({
			userName: $scope.userName,
			picturePath: "some path.."

		});


	};
}]);