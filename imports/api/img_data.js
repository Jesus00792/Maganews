import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/******************
  Estructura de 'Imagenes'
******************/
ImgData = new Meteor.Collection( 'items' );
ImgSchema =new SimpleSchema({
  _id: {
    type: number,
    label: 'ID',
    max:
  },
  photo_name: {
    type: String,
    label: 'Descripción',
    max : 30
  },
  date: {
    type: String,
    label: 'Descripción',
    max : 50
  }
});
ImgData.attachSchema( ImgSchema );
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
