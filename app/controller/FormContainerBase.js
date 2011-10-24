// Base controller that expects view to contain cancel" and "done" buttons.
//
// Wires up events for buttons so all we have to do is extend 
// this controller and override the methods in controllers that follow
// the same pattern.
//
// 
Ext.define('MvcExample.controller.FormContainerBase', {
  extend: 'MvcExample.controller.BaseCtl',
  refs: [
    {
      ref: 'main',
      selector: 'mainview',
      xtype: 'mainview'
    },
    {
      ref: 'launchscreen',
      selector: '#launchscreen'
    }
  ],
  // Called on app initialization - before launched.
  init: function() {
    var ctlId = this.getId();
    // Construct ID of view container created by MvcExample.view.FormContainer
    var viewpanelId = '#' + ctlId.toLowerCase() + 'Container';

    // Build our button selectors
    cancelButtonSelector = viewpanelId+' button[text=Cancel]';
    doneButtonSelector = viewpanelId+' button[text=Done]';
    
    // Dynamically create control hash based upon ID
    var controlHash = {};
    controlHash[cancelButtonSelector] = {
      tap: this.doCancel
    };
    controlHash[doneButtonSelector] = {
      tap: this.doDone
    };
    // Apply event handlers
    this.control(controlHash);
  },
  
  // Handler for tapping the CANCEL button from 1st level views.
  doCancel: function() {
    // Sets animation going BACK
    var main = this.getMain();
    this.getController('Main').setAnimationBack(main);
  },
  doDone: function() {
    // console.log("Override the doDone function");
  }
});