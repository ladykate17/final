// create a module (setting)
angular
	.module( 'orderlyApp', [
		'ngResource',
		'ngRoute',
		'ngAnimate',
		'ui.bootstrap'
	]); 


// angular
// 	.module( 'orderlyApp' )
// 	.config(function($routeProvider){

// 		$routeProvider
// 			.when('/', {
// 				templateUrl : 'templates/newproject.html',
// 				controller 	: 'ModalDemoCtrl'
// 			})
// 	});

angular
	.module( 'orderlyApp' )
	.factory('projectsFactory', function($resource){

	var model = $resource('/api/projects/:id', {id : '@_id'}); // colon denotes a parameterization - @_id --> contextual (like 'this')
	
	// model.get() // GET 'one'
	// model.query() // GET 'all' - and array of objects
	// model.$save() // POST - /api/projects
	// model.$delete() // DELETE

	return {
		model 	: model,
		projects : model.query() //initiates a GET req to /api/projects to ref data
		}
	})
	
// controller
angular
	.module( 'orderlyApp' )
	.controller('projectList', function($scope, projectsFactory){ // (, projectsFactory )first controller arg comes from the controller property on the $routeProvider above
	// console.log('controller', projectsFactory);


	// $scope.sortProjects = function(){
	// 	console.log("sort order", $scope.sortOrder)
	// 	// if ($scope.sortOrder === "true"){
	// 	// 	$scope.sortOrder = true // resetting the ng-model value to the boolean
	// 	// }
	// 	// else{
	// 	// 	$scope.sortOrder = false
	// 	// }
	// }

	$scope.projects = projectsFactory.projects; // searching DB
	$scope.newProject = {
		tasks : [[]]

	};

	$scope.createProject = function(){ 
		
		var newProject = new projectsFactory.model(this.newProject) // .model() is refereing to the $resource return model property // newAnimal object that lives on our scope

		// we created the newProject now we need to save it
		// grab data from the server (returnData) and save it to the DB
		newProject.$save(function(returnData){
			// console.log('return', returnData)
			projectsFactory.projects.push(returnData); // data from the server to show on client
		})

		console.log('newProject', newProject)
		console.log('clicked')

		$scope.newProject = {};

	}

	$scope.addfield = function(){
		$scope.newProject.tasks.push([])
	}

	});

//----- Modal Ctrl----- //
angular
	.module( 'orderlyApp' )
	.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

	$scope.items = ['item1', 'item2', 'item3'];

	$scope.open = function (size) {
	
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'templates/new-project',
			controller: 'ModalInstanceCtrl',
			size: size,
			resolve: {
				items: function () {
				return $scope.items;
	        	}
	    	}
		});

	    modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
	    }, function () {
			$log.info('Modal dismissed at: ' + new Date());
	    });
	};

	$scope.toggleAnimation = function () {
		$scope.animationsEnabled = !$scope.animationsEnabled;
	};

	});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular
	.module( 'orderlyApp' )
	.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

	$scope.items = items;
	$scope.selected = {
		item: $scope.items[0]
	};

	$scope.ok = function () {
	 	$modalInstance.close($scope.selected.item);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	});


// orderlyApp.controller('projectsSection', function($scope, projectsFactory, $routeParams){
// 	// /something/:cheeseName
// 	// /something/cheddar
// 	// req.params.cheeseName = 'cheddar'

// 	console.log('Project with this Id : ', $routeParams.id) // node auto adds id

// 	$scope.project = projectsFactory.model.get({_id : $routeParams.id}) // GETs data from DB accessing it by id // _id accesses the data as a query
// })


