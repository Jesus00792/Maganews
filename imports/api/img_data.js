import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/******************
  Estructura de 'Imagenes'
******************/
ImgData = new Meteor.Collection( 'photos' );
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
export default ImgData;
Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: "~/workspace/uploads/"})
});


if(Meteor.isClient) {
 Meteor.subscribe('Images');
 }
 Images.allow({
    insert: function(imgId, doc) { return true; },
    update: function(imgId,doc) { return true; },
    remove: function(imgId,doc) { return true; },
    download: function(imgId, doc) {return true;},
});
/******************
  Publishing data
******************/

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user

  Meteor.Meteor.methods({
    'ImgInsert':function(photo_name_, date_,file){
        if(file === undefined){
         alert("SORRY YOU NEED TO UPLOAD AN IMAGE TO CONTINUE");
        } else{
          Images.insert(file, function (err, fileObj) {
            if(!err){
               ImgData.insert({ _id:fileObj._id,photo_name:photo_name_,date:date_});
               return true
             }else {
               return false;
             }
           });

        }

     },
     'ImgDelete':function(photo_name_){
       var id=UsrData.find({photo_name : photo_name_})._id;
       f = Images.findOne(id);
       Images.remove(f, function(err, file) {
          if (!err) {
            ImgData.delete({_id:id});
            return true;
          } else {
            return false;
          };
          }

      },
      'ImgUpdate':function(photo_name_,new_photo_name, date_,file){
        if(file === undefined){
         alert("SORRY YOU NEED TO UPLOAD AN IMAGE TO CONTINUE");
        } else{
           Images.insert(file, function (err, fileObj) {
            if(!err){
               ImgData.update({photo_name : photo_name_},{$set:{_id:fileObj._id,photo_name:new_photo_name_,date:date_}});
               return true
             }else {
               return false;
             }
           });

          }
       },
       'ImgSelect':function(photo_name_){
          return Images.findOne(UsrData.find({photo_name : photo_name_})._id);
        }
  });
}
Meteor.publish('photos', function itemsPublication() {
    return Usuario.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}
