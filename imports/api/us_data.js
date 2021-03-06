import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/******************
  Estructura de 'Usuarios'
******************/
UsrData = new Meteor.Collection('Usuario');
UsrSchema = new SimpleSchema({
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
    max : 400,
    optional: true
  },
  correo: {
    type: String,
    label: 'Correo',
    max : 100
  },
  edad: {
    type: String,
    label: 'Edad',
    max : 100,
    optional: true
  },
  tar_visa: {
    type: String,
    label: 'Tarjeta_Credito',
    max : 100,
    optional: true
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
    max : 200,
    optional: true
  },
  website: {
    type: String,
    label: 'Web',
    max : 150,
    optional: true
  },
  usr_type: {
    type: String,
    label: 'Tipo',
    max : 1
  },
  facebook:{
    type: String,
    label: 'Facebook',
    max : 100,
    optional: true
  },
  twitter:{
    type: String,
    label: 'Twitter',
    max : 100,
    optional: true
  },
  instagram:{
    type: String,
    label: 'Instagram',
    max : 100,
    optional: true
  },

});
UsrData.attachSchema(UsrSchema);
export default UsrData;
/******************
  Publishing data
******************/

/*if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user

  Meteor.Meteor.methods({
    'UserInsert_reg':function(id, nom, ape, email, nkname, pswrd, tipo){
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
     'UserInsert_adm':function(id, nom, ape, email, nkname, pswrd,tipo, compania, web, direccion){
       UsrData.insert({
         _id:id,
         f_name:nom,
         l_name:ape,
         correo: email,
         nk_name:nkname,
         pssword:pswrd,
         companyName:compania,
         address:direccion,
         website:web,
         usr_type:tipo
       });
     }
  });
}
/*Meteor.publish('items', function itemsPublication() {
    return Items.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}*/
