import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/******************
  Estructura de 'Usuarios'
******************/
DocData = new Meteor.Collection( 'items' );
DocSchema =new SimpleSchema({
  _id: {
    type: number,
    label: 'ID',
    max:
  },
  f_name: {
    type: String,
    label: 'Descripción',
    max : 30
  },
  l_name: {
    type: String,
    label: 'Descripción',
    max : 50
  },
  companyName: {
    type: String,
    label: 'Descripción',
    max : 400
  },
  email: {
    type: String,
    label: 'Descripción',
    max : 400
  },
  address: {
    type: String,
    label: 'Descripción',
    max : 400
  },
  website: {
    type: String,
    label: 'Descripción',
    max : 400
  },
});
DocData.attachSchema( DocSchema );
export default Items;
/******************
  Publishing data
******************/
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('items', function itemsPublication() {
    return Items.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}
