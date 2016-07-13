import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/******************
  Estructura de 'Usuarios'
******************/

var DocStore = new FS.Collection("docs_", {
    stores: [new FS.Store.FileSystem("docs_", {path: "~/workspace/uploads/"})]
});

if(Meteor.isClient)
{
  Meteor.subscribe('DocStore');
}

Docs.allow({
    insert: function(userId, doc) { return true; },
    update: function(userId,doc) { return true; },
    remove: function(userId,doc) { return true; }
});

Docs.deny({
    download: function(userId, doc) {return false;}
});

DocData = new Meteor.Collection( 'items' );
DocSchema =new SimpleSchema({
  _id: {
    type: number,
    label: 'ID',
    max:50
  },
  doc_name: {
    type: String,
    label: 'Descripción',
    max : 30
  },
  date: {
    type: String,
    label: 'Descripción',
    max : 50
  },
  editorial: {
    type: String,
    label: 'Descripción',
    max : 400
  },
  companyName: {
    type: String,
    label: 'Descripción',
    max : 400
  },
  owner: {
    type: String,
    label: 'Descripción',
    max : 400
  },
});
DocData.attachSchema( DocSchema );
export default Items;
