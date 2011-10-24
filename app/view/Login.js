Ext.define('MvcExample.view.Login', {
  extend: 'MvcExample.view.FormContainer',
  xtype: 'login',
  config: {
    // These items will be placed BELOW the titlebar, which is
    // inserted programmatically in MvcExample.view.FormContainer. 
    items: [
      {
        xtype: 'fieldset',
        title: 'Login Credentials',
        instructions: 'Please authenticate with our service',
        items: [
          {
            xtype: 'emailfield',
            name : 'emailaddress',
            label: 'Email Address'
          },
          {
            xtype: 'passwordfield',
            name : 'password',
            label: 'Password'
          }
        ]
      }
    ]
  }
});