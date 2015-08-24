app.factory("modalService", ["$location", "$log", "$modal", function($location, $log, $modal) {

  function open (settings) {
    console.log("settingss :", settings);
    // Defaults values for modal

    var defaults = {
      animation: true,
      templateUrl: 'partials/alertbox.html',
      controller: 'ModalInstanceCtrl',
      size: 200,
      close: function () {
        $log.info("modal opened: " + new Date());
      },
      dismiss: function () {
        $log.info('Modal dismissed at: ' + new Date());
      }
    };

    // Override defaults with settings properties
    for(var i in settings){
      defaults[i] = settings[i];
    }

    var callbacks = {};
    callbacks.close = defaults.close;
    callbacks.dismiss = defaults.dismiss;
    delete defaults.close;
    delete defaults.dismiss;

    var modalInstance = $modal.open(defaults);

    modalInstance.result.then(callbacks.close, callbacks.dismiss);
  }

  return {
    open:open
  };

}]);