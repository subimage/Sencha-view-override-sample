// Base class for all top level form views
//
// Defines a simple toolbar with back / add buttons and a toolbar title.
//
// Assigns ID automatically so we can reference it from our controllers
// easily to apply event handlers.
Ext.define('MvcExample.view.FormContainer', {
  extend: 'Ext.Container',
  layout: 'fit',
  xtype: 'formcontainer',
  // Set our ID and titlebar caption.
  constructor: function() {
    this.callParent(arguments);
    
    // Insert toolbar @ top, so we can insert arbitrary items
    // in the config['items'] section of panels that inherit this one.
    this.insert(0, {
      xtype: 'navigationbar',
      title: '',
      docked: 'top',
      items: [
        {
          xtype: 'button',
          ui: 'back decline',
          text: 'Cancel',
          align: 'left'
        },
        {
          xtype: 'button',
          ui: 'confirm',
          text: 'Done',
          align: 'right'
        }
      ]
    });
    // Set id of the container automatically
    this.id = arguments[0]['ref'].toLowerCase()+'Container';
    console.log(this.id);
    
    // Set titlebar caption
    var navbar = this.query('navigationbar');
    if (typeof this['getTitle'] == 'function') {
      title = this.getTitle()
    } else {
      title = arguments[0]['ref'];
    }
    navbar[0].setTitle(title);
  }
});