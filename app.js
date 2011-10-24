Ext.Loader.setConfig({ enabled: true });

// Hook so we can inspect main controller from console
var gMainController = null;

Ext.application({
  name: 'MvcExample',
  controllers: [
    'BaseCtl',
    'FormContainerBase',
    'Login',
    'Main',
    'Register'
  ],
  launch: function() {
    // reference for debugging purposes
    gMainController = this.getController('Main');
  }
});