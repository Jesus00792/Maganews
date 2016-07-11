import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/******************
  Estructura de 'Usuarios'
******************/
UsrData = new Meteor.Collection('Usuario');
UsrSchema = new SimpleSchema({
  _id: {
    type: String,
    label: 'ID',
    max: 10
  },
  f_name: {
    type: String,
    label: 'Nombre',
    max : 30
  },
  l_name: {
    type: String,
    label: 'Apellido',
    max : 50
  },
  companyName: {
    type: String,
    label: 'Compania',
    max : 400
  },
  correo: {
    type: String,
    label: 'Correo',
    max : 100
  },
  nk_name: {
    type: String,
    label: 'UserName',
    max : 30
  },
  pssword: {
    type: String,
    label: 'Contraseña',
    max : 30
  },
  address: {
    type: String,
    label: 'Direccion',
    max : 200
  },
  website: {
    type: String,
    label: 'Web',
    max : 150
  },
  usr_type: {
    type: String,
    label: 'Tipo',
    max : 1
  }

});
UsrData.attachSchema(UsrSchema);
export default UsrData;
/******************
  Publishing data
******************/

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user

  Meteor.Meteor.methods({
    'UserInsert':function(id, nom, ape, email, nkname, pswrd, tipo){
       UsrData.insert({
         _id:id,
         f_name:nom,
         l_name:ape,
         correo: email,
         nk_name:nkname,
         pssword:pswrd,
         usr_type:tipo
       });
     },
     'UserDelete':function(id){
        UsrData.delete({_id:id});
      },
      'UserUpdate':function(id, newId, nom, ape, email, nkname, pswrd, tipo){
         UsrData.update({_id : id},{$set:{_id:newId,f_name:nom,l_name:ape,correo: email,nk_name:nkname,  pssword:pswrd,usr_type:tipo}});
       },
       'UserSelect':function(id){
          return UsrData.find({_id : id});
        }
  });
}
Meteor.publish('Usuario', function itemsPublication() {
    return Items.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}
