import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../imports/router/router.js';
import '../imports/ui/pages/home.html';
import '../imports/ui/pages/index.html';
import '../imports/startup/accounts-config.js';

Template.App.helpers({
  pathForHome: function(){
  	var path = FlowRouter.path("Home") ;
  	return path;
  },
  pathForStore: function(){
  	var path = FlowRouter.path("Store") ;
  	return path;
  },
  pathForRegist: function(){
  	var path = FlowRouter.path("Regist") ;
  	return path;
  }
});

Template.App.events({
  "click #event": function(event, template){

  }
});
