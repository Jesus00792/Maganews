import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  requestPermissions: {},
  passwordSignupFields: 'USERNAME_ONLY'
    /*extraSignupFields: [{
        fieldName: 'username',
        fieldLabel: 'nombre',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Introduzca su usuario");
            return false;
          } else {
            return true;
          }
        }
    /*},
    { fieldName: 'password', fieldLabel: 'contraseña', inputType: 'text',
    visible: true, /*validate: function(value, errorFunction) { if (!value) {
    errorFunction("Introduzca su contraseña"); return false; } else { return
    true; } }
    }]*/
});

accountsUIBootstrap3.setLanguage('es');
