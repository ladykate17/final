angular
	.module( 'orderlyApp', [
		'ngResource',
		'ngRoute',
		'ngAnimate',
		'ui.bootstrap',
		'angular-svg-round-progress'
	]); 


angular
	.module( 'orderlyApp' )
	.config(function($routeProvider){

		$routeProvider
			.when('/', {
				templateUrl : 'templates/dashboard',
				controller 	: 'projectList'
			})
			// .when('/', {
			// 	templateURL
			// })
	});

angular
	.module( 'orderlyApp' )
	.factory('projectsFactory', function($resource){

	var model = $resource('/api/projects/:id', {id : '@_id'}); // colon denotes a parameterization - @_id --> contextual (like 'this')

	return {
		model 	: model,
		projects: model.query() //initiates a GET req to /api/projects to ref data
		}
	})

angular
	.module( 'orderlyApp' )
	.factory('listsFactory', function($resource){

	var model = $resource('/api/lists/:id', {id : '@_id'}); // colon denotes a parameterization - @_id --> contextual (like 'this')

	return {
		model : model,
		lists : model.query() //initiates a GET req to /api/projects to ref data
		}
	})
	
// controller
angular
	.module( 'orderlyApp' )
	.controller('projectList', function($scope, projectsFactory, listsFactory){ // (, projectsFactory )first controller arg comes from the controller property on the $routeProvider above
	// console.log($scope)
	// console.log('controller', projectsFactory);


	$scope.projects = projectsFactory.projects; // searching DB
	$scope.newProject = {
		tasks : []

	};

	$scope.addProjectTask = function(project){
		project.tasks.push('')
	}

	$scope.pushTask = function(project, task){
		project.tasks.pop()
		project.tasks.push(task)
		project.$save()
		console.log(project)
		// project.tasks.push('')
	}


	$scope.lists = listsFactory.lists; // searching DB
	$scope.newList = {
		items : []

	};

	$scope.addListItem = function(list){
		list.items.push('')
	}

	$scope.pushItem = function(list, item){
		list.items.pop()
		list.items.push(item)
		list.$save()
		console.log(list)
		// project.tasks.push('')
	}

	});


//----- Modal Ctrl----- //
angular
	.module( 'orderlyApp' )
	.controller('ModalCtrl', function ($scope, $modal, $log) {

	$scope.items = [];

	$scope.animationsEnabled = true;

	$scope.openProject = function (size) {
	
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

	$scope.openList = function (size) {
	
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'templates/new-shop-list',
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

	$scope.progress = function(value) {
		var valueInt = parseInt($scope.value)
		num = 0;
		var count = num + valueInt
		console.log(count)

		// if (value === true){
		// 	console.log($scope.count)
		// 	$scope.count++
		// }
		// else {
		// 	console.log($scope.count)
		// 	$scope.count--
		// }
	}

	});



angular
	.module( 'orderlyApp' )
	.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, projectsFactory, listsFactory) {

	$scope.items = items;
	$scope.selected = {
		item: $scope.items[0]
	};

	$scope.createProject = function(){ 
		
		var newProject = new projectsFactory.model(this.newProject) 

		// we created the newProject now we need to save it
		// grab data from the server (returnData) and save it to the DB
		newProject.$save(function(returnData){
			// console.log('return', returnData)
			projectsFactory.projects.push(returnData); // data from the server to show on client
		})

		console.log('newProject', newProject)
		console.log('clicked')

		$scope.newProject = {};

	 	$modalInstance.close($scope.selected.item);

	}


	$scope.createList = function(){ 
		
		var newList = new listsFactory.model(this.newShopList) 

		newList.$save(function(returnData){
			console.log('return', returnData)
			listsFactory.lists.push(returnData); // data from the server to show on client
		})

		console.log('newShopList', newList)
		console.log('clicked')

		$scope.newlist = {};

	 	$modalInstance.close($scope.selected.item);

	}


	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	console.log("test")
		$scope.count = 0;
		

	});

angular
	.module( 'orderlyApp' )
	.controller('ProgressCtrl', function ($scope) {
		// taskNumber = $scope.tasks.length
		$scope.max = $scope.project.tasks.length


	});



