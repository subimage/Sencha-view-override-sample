Ext.define('MvcExample.view.Login', {
  extend: 'MvcExample.view.FormContainer',
  xtype: 'login',
  config: {
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