import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

//import './main.html';
import '../startup/client/router.js';
import '../ui/pages/home.html';
import '../ui/pages/index.html';
import '../startup/client/accounts-config.js';

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
