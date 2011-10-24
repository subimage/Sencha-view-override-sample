Ext.define('MvcExample.view.Main', {
  extend: 'Ext.Container',
  requires: [
    'Ext.Toolbar',
    'Ext.Button',
    'Ext.NavigationBar'
  ],
  config: {
    fullscreen: true,
    layout: {
      type: 'card',
      animation: {
        type: 'slide',
        direction: 'left',
        duration: 250
      }
    },
    items: [
    {
      id: 'launchscreen',
      cls: 'launchscreen',
      items: [
        {
          centered: true,
          cls: 'launchscreen_inner',
          items: [
            {
              xtype: 'button',
              id: 'loginButton',
              text: 'Login',
              ui: 'grey'
            },
            {
              xtype: 'button',
              id: 'registerButton',
              text: 'New Account',
              ui: 'grey'
            }
          ]
        }
      ]
    },
    ]
  }
});