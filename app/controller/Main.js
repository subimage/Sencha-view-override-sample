// Controller for the overall app and main screens
Ext.define('MvcExample.controller.Main', {
  extend: 'Ext.app.Controller',
  config: {
    profile: Ext.os.deviceType.toLowerCase(),
  },
  views: ['Main'],
  
  refs: [
    {
      ref: 'main',
      selector: 'mainview',
      xtype: 'mainview',
      autoCreate: true
    },
    {
      ref: 'launchscreen',
      selector: '#launchscreen'
    }
  ],
  updateProfile: function(profile) {
    var mainView = this.getMain();
  },
  // Called on app initialization - before launched.
  init: function() {
    console.log("Main init");
    // Apply our event handlers
    this.control({
      '#launchscreen button[text=New Account]': {
        tap: this.showRegister
      },
      '#launchscreen button[text=Login]': {
        tap: this.showLogin
      }
    });
  },
  launch: function() {
    var main = this.getMain();
    Ext.Viewport.add(main);
    var launch = this.getLaunchscreen();
  },
  // Shows register screen
  showRegister: function() {
    this.showLaunchScreen('Register');
  },
  // Shows login screen
  showLogin: function() {
    this.showLaunchScreen('Login');
  },
  showLaunchScreen: function(name) {
    var view = this.createOrGetViewRef(name);
    var main = this.getMain();
    this.setAnimationForward(main);
    main.setActiveItem(view);    
  },

  // Creates or grabs reference to view
  createOrGetViewRef: function(viewName) {
    if (!viewName.length) { return null; }    
    var xtype = viewName.toLowerCase() + 'view',
        getter = 'get' + Ext.String.capitalize(viewName),
        view;
    
    // Add reference to view if we don't have it already.
    console.log(xtype);
    
    if (!this.hasRef(viewName)) {
      ref = this.addRef({
        ref       : viewName,
        selector  : xtype,
        xtype     : xtype,
        autoCreate: true
      });
    }
    console.log(getter);
    return this[getter]();
  },
  
  // Sets animation on a view.
  setAnimation: function(view, direction) {
    var layout = view.getLayout();
    layout.setAnimation({
      type: 'slide',
      direction: direction,
      duration: 250
    });
  },
  // Shortcuts for setting animation styles on containers.
  setAnimationForward: function(view) {
    this.setAnimation(view, 'left');
  },
  setAnimationBack: function(view) {
    this.setAnimation(view, 'right');
  }
});