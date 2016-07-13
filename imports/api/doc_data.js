import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';



DocData = new Meteor.Collection( 'docs' );
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
export default DocData;
Docs = new FS.Collection("docs_", {
    stores: [new FS.Store.FileSystem("docs_", {path: "~/workspace/uploads/"})
});


if(Meteor.isClient) {
 Meteor.subscribe('Docs');
 }
 Docs.allow({
    insert: function(userId, doc) { return true; },
    update: function(userId,doc) { return true; },
    remove: function(userId,doc) { return true; },
    download: function(userId, doc) {return true;},
});
/******************
  Publishing data
******************/

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user

  Meteor.Meteor.methods({
    'DocsInsert':function(f_name_,l_name_,companyName_,email_,address_,website_){
        if(file === undefined){
         alert("SORRY YOU NEED TO UPLOAD AN IMAGE TO CONTINUE");
        } else{
          Docs.insert(file, function (err, fileObj) {
            if(!err){
               Docs.insert({ _id:fileObj._id,f_name:f_name_,l_name:l_name_,companyName:companyName_,email:email_,address:address_,website:website_});
               return true
             }else {
               return false;
             }
           });

        }

     },
     'DocsDelete':function(name_){
       var id=DocData.find({name : name_})._id;
       f = Images.findOne(id);
       Images.remove(f, function(err, file) {
          if (!err) {
            DocData.delete({_id:id});
            return true;
          } else {
            return false;
          };
          }

      },
      'DocsUpdate':function(f_name_,l_name_,companyName_,email_,address_,website_,file){
        if(file === undefined){
         alert("SORRY YOU NEED TO UPLOAD DOC TO CONTINUE");
        } else{
           Docs.insert(file, function (err, fileObj) {
            if(!err){
               DocData.update({f_name : f_name_},{$set:{_id:fileObj._id,f_name:f_name_,l_name:l_name_,companyName:companyName_,email:email_,address:address_,website:website_}});
               return true
             }else {
               return false;
             }
           });

          }
       },
       'DocsSelect':function(name_){
          return Docs.findOne(UsrData.find({name : name_})._id);
        }
  });
}
Meteor.publish('docs', function itemsPublication() {
    return Usuario.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}
