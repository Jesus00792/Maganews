import { Meteor } from 'meteor/meteor';
import UsrData from '../imports/api/us_data.js'
import PostImages from '../imports/api/img_data.js'
Meteor.startup(() => {
  // code to run on server at startup
});

PostImages.allow({
  'insert': function () {
    return true;
  }
});
