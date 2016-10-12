Shiny.addCustomMessageHandler('shinyalert', function(params) {
  console.log(params);

  var callbackJS = function(value) {};
  if (params['callbackJS'] != null) {
    var cb = params['callbackJS'];
    callbackJS = function(value) { eval("("+cb+")(value)") };
    delete params['callbackJS'];
  }

  var callbackR = function(value) {};
  if (params['cbid'] != null) {
    var cbid = params['cbid'];
    delete params['cbid'];
    callbackR = function(value) {
      Shiny.onInputChange(cbid, value);
    }
  }

  var callback = function(value) {
    callbackJS(value);
    callbackR(value);
  }
  swal(params, callback);
});
