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
	.controller('ModalCtrl', function ($scope, $modal, $log, $timeout) {

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
			var valueInt = $scope.value
			num = 0;
			var count = num + valueInt

		}

		

	    // Item List Arrays
	    $scope.unChecked = [];
	    $scope.checked = [];

	    // Add a Item to the list
	    $scope.addCheckedItem = function () {

	        $scope.unChecked.push({
	            amount: $scope.itemAmount,
	            name: $scope.itemName
	        });

	        // Clear input fields after push
	        $scope.itemAmount = '';
	        $scope.itemName = '';

	    };

	    // Add Item to Checked List and delete from Unchecked List
	    $scope.toggleChecked = function (index, project) {
	        $scope.checked.push($scope.unChecked[index]);
	    	console.log('hello?', $scope.checked)
	        $scope.unChecked.splice(index, 1);
	        project.$save()
	    };


	    // Get Total Items
	    $scope.getTotalItems = function () {
	        return $scope.unChecked.length;
	    };

	    // Get Total Checked Items
	    $scope.getTotalCheckedItems = function () {
	        return $scope.checked.length;
	    };

	
		console.log("working?")
		$scope.isCrossedOff = false;
			$scope.activateButton = function(index, item) {
				items.isCrossedOff = items.isCrossedOff;
			}  
		
		// $scope.tasksTotal = function() {
		// 	totalTasks = 0;

		// 	for (i = 0; i < taskCost; i++){
		// 		var result = totalTasks + i
		// 	}

		// 	return result
		// }
		$timeout(function() {
			
			$scope.projectBudgetTotals = function(project, budget) {
				$scope.total = 0;
				console.log($scope.total)

				for (i = 0; i < $scope.projects.length; i++){
					var budget = $scope.projects[i].budget
					$scope.total += budget
					console.log($scope.total)
				}

				
			}

			$scope.projectBudgetTotals()

		}, 500);

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

		$scope.count = 0;


		
	});

	angular
		.module( 'orderlyApp' )
		.directive( 'editInPlace', function() {
		  return {
		    restrict: 'E',
		    scope: { value: '=' },
		    template: '<span ng-click="edit()" ng-bind="value"></span><input ng-model="value"></input>',
		    link: function ( $scope, element, attrs ) {
		      // Let's get a reference to the input element, as we'll want to reference it.
		      var inputElement = angular.element( element.children()[1] );
		      
		      // This directive should have a set class so we can style it.
		      element.addClass( 'edit-in-place' );
		      
		      // Initially, we're not editing.
		      $scope.editing = false;
		      
		      // ng-click handler to activate edit-in-place
		      $scope.edit = function () {
		        $scope.editing = true;
		        
		        // We control display through a class on the directive itself. See the CSS.
		        element.addClass( 'active' );
		        
		        // And we must focus the element. 
		        // `angular.element()` provides a chainable array, like jQuery so to access a native DOM function, 
		        // we have to reference the first element in the array.
		        inputElement[0].focus();
		      };
		      
		      // $scope.save = function(project) {

		      // }
		      // When we leave the input, we're done editing.
		      inputElement.prop( 'onblur', function() {
		        $scope.editing = false;
		        element.removeClass( 'active' );
		        
		      });
			    // project.$save()
		    }
		  };
		});

angular
	.module( 'orderlyApp' )
	.controller('ProgressCtrl', function ($scope) {
		// taskNumber = $scope.tasks.length
		$scope.max = $scope.project.tasks.length


	});






