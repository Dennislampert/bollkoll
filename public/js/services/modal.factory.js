app.factory("modalService", ["$location", "$log", "$modal", function($location, $log, $modal) {

  function open (settings) {

    // Defaults values for modal

    var defaults = {
      animation: true,
      templateUrl: 'partials/alertbox.html',
      controller: 'ModalInstanceCtrl',
      size: 200
    };

    // Override defaults with settings properties
    for(var i in settings){
      defaults[i] = settings[i];
    }

    var modalInstance = $modal.open(defaults);

    modalInstance.result.then(function () {
      $log.info("modal opened: " + new Date());
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  }

  return {
    open:open
  };

}]);