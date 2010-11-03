// Checks if Scriptish was updated/installed
(function(inc, tools) {
  inc("resource://scriptish/prefmanager.js", tools);
  inc("resource://scriptish/constants.js", tools);
  var pref = tools.Scriptish_prefRoot;
  var currentVer = pref.getValue("version", "0.0");

  // update the currently initialized version so we don't do this work again.
  tools.AddonManager.getAddonByID("scriptish@erikvold.com", function(aAddon) {
    pref.setValue("version", aAddon.version);
  });

  if (0 >= tools.Services.vc.compare(currentVer, "0.1b5")) {
    // add toolbaritem to add-on bar
    var chromeWin = tools.Services.wm.getMostRecentWindow("navigator:browser");
    var gAddonBar = chromeWin.document.getElementById("addon-bar");
    var addToBar = gAddonBar || chromeWin.getNavToolbox();
    if (chromeWin.document.getElementById("scriptish-tb-item")) return;
    var addonSet = addToBar.getAttribute("currentset").split(",");
    addonSet.push("scriptish-tb-item");
    addonSet = addonSet.join(",");
    addToBar.setAttribute("currentset", addonSet);
    addToBar.currentSet = addonSet;
    chromeWin.BrowserToolboxCustomizeDone(true);
    chromeWin.document.persist(addToBar.getAttribute("id"), "currentset");
  }
})(Components.utils.import, {})
