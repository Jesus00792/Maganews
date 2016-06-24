import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

//import './main.html';
import '../startup/client/router.js';
import '../ui/layout/home.html';

Template.App.helpers({
  pathForInit: function(){
  	var path = FlowRouter.path("Home") ;
  	return path;
  },
  pathForAdd: function(){
  	var path = FlowRouter.path("Agregar") ;
  	return path;
  },
  pathForList: function(){
  	var path = FlowRouter.path("Lista") ;
  	return path;
  }
});
