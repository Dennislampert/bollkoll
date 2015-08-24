app.factory("modalService", ["$location", "$log", "$modal", function($location, $log, $modal) {

  function open (settings) {
<<<<<<< HEAD
    console.log("settingss :", settings);
=======

>>>>>>> master
    // Defaults values for modal

    var defaults = {
      animation: true,
      templateUrl: 'partials/alertbox.html',
      controller: 'ModalInstanceCtrl',
<<<<<<< HEAD
      size: 200,
      close: function () {
        $log.info("modal opened: " + new Date());
      },
      dismiss: function () {
        $log.info('Modal dismissed at: ' + new Date());
      }
=======
      size: 200
>>>>>>> master
    };

    // Override defaults with settings properties
    for(var i in settings){
      defaults[i] = settings[i];
    }

<<<<<<< HEAD
    var callbacks = {};
    callbacks.close = defaults.close;
    callbacks.dismiss = defaults.dismiss;
    delete defaults.close;
    delete defaults.dismiss;

    var modalInstance = $modal.open(defaults);

    modalInstance.result.then(callbacks.close, callbacks.dismiss);
=======
    var modalInstance = $modal.open(defaults);

    modalInstance.result.then(function () {
      $log.info("modal opened: " + new Date());
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
>>>>>>> master
  }

  return {
    open:open
  };

}]);