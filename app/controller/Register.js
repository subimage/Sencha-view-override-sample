// Controller for registering an account
Ext.define('MvcExample.controller.Register', {
  extend: 'MvcExample.controller.FormContainerBase',
  views: ['Register'],
  doCancel: function() {
    console.log("cancel from Register controller");
    var main = this.getMain();
    this.setAnimationBack(main);
    main.setActiveItem(this.getLaunchscreen());
  }
});