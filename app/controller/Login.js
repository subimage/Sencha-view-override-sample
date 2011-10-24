// Controller for authenticating with existing account
Ext.define('MvcExample.controller.Login', {
  extend: 'MvcExample.controller.FormContainerBase',
  views: ['Login'],
  doCancel: function() {
    console.log('cancel from Login controller')
    this.callParent(arguments);
    var main = this.getMain();
    var launchscreen = this.getLaunchscreen();
    main.setActiveItem(launchscreen);
  }
});