(function() {
  var script = document.createElement('script');
  script.async = 1;
  var hostname = window.location.href.indexOf('sandbox') !== -1 ? 'stage.mzwallace.com' : 'www.mzwallace.com';
  script.src = 'https://' + hostname + '/on/demandware.static/Sites-MZ-Site/-/default/flow/flow.js';
  var first = document.getElementsByTagName('script')[0];
  first.parentNode.insertBefore(script, first);
})();