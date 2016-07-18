import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../imports/router/router.js';
import '../imports/ui/pages/home.html';
import '../imports/ui/pages/index.html';
import '../imports/ui/pages/regist.html';
import '../imports/ui/pages/store.html';
import '../imports/ui/pages/sellUpload.html';
import '../imports/startup/accounts-config.js';
import '../imports/api/doc_data.js';
import '../imports/api/us_data.js';
import '../imports/api/img_data.js';

var nom_sell;
var ape_sell;
var eda_sell;
var cor_sell;
var vis_sell;
var nck_sell;
var psw_sell;
var typ_sell;
var compania_sell;
var dir_sell;
var web_sell;
var fbk_sell;
var twt_sell;
var itg_sell;

Template.App.onCreated(function RegistOnCreated(){
  this.IsAdmin = new ReactiveVar(false);
  this.IsReg = new ReactiveVar(false);
});

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
  },
  pathForUpload: function(){
  	var path = FlowRouter.path("Uploader") ;
  	return path;
  },
  IsAdmin(){
  	let tipo = UsrData.find({"nk_name": "accounts.user()"});
    if(tipo.usr_type == 2)
      return true;
    else
      return false;
  },
  IsReg(){
  	let tipo = UsrData.find({"nk_name": "accounts.user()"});
    if(tipo.usr_type == 1)
      return true;
    else
      return false;
  }
});

Template.App.events({
  "click #rgt": function(event, instance){
     FlowRouter.go('/Regist');
  },
  "submit .new-task": function(event,instance){
    let tar = event.target;

    var user = tar.user.value;
    var password = tar.pass.value;
    Accounts.createUser({
        username: user,
        password: password
    });
  },
});


Template.Regist.onCreated(function RegistOnCreated(){
  this.userreg = new ReactiveVar(false);
  this.userseller = new ReactiveVar(false);

  let template  = Template.instance();
  template.processing = new ReactiveVar(false);
  template.selectedService  = new ReactiveVar( false );

  template.checkout = StripeCheckout.configure({
    key: Meteor.settings.public.stripe,
    image: 'pago.png',
    locale: 'auto',
    token(token){
      let service = template.selectedService.get(),
        charge  = {
                amount: token.amount || service.amount,
                currency: token.currency || 'usd',
                source: token.id,
                description: token.description || service.description,
                receipt_email: token.email
              };

        Meteor.call("UsuarioSellData", nom_sell, ape_sell,eda_sell, cor_sell, vis_sell, nck_sell, psw_sell, typ_sell, compania_sell, dir_sell, web_sell, fbk_sell, twt_sell, itg_sell, function(error, result){
          if(error){
            console.log("FAllo algo", error);
          }
          if(result){
            alert("Bienvenido a MagaNews!!!");
            FlowRouter.go('/');
          }
        });
        Meteor.call( 'pago', charge, ( error, response ) => {
          if ( error )
          {
              template.processing.set( false );
              Bert.alert( error.reason, 'danger' );
          }
          else
          {
              Bert.alert( 'Bienvenido a Maganews!!!' );
          }
        });
      },
    closed() {
        template.processing.set( false );
    },
  });
});

Template.Regist.helpers({
  userreg(){
    return Template.instance().userreg.get();
  },
  userseller(){
    return Template.instance().userseller.get();
  },
  processing(){
    return Template.instance().processing.get();
  },
});

Template.Regist.events({
  "submit .add-lector": function(event, intance){
    event.preventDefault();
    let tar = event.target;

    let nom = tar.nom1.value;
    let ape = tar.ape1.value;
    let eda = tar.ed1.value;
    let cor = tar.cor1.value;
    let vis = tar.visa1.value;
    let nck = tar.nick1.value;
    let psw = tar.pssw11.value;
    let type = "1";


    Meteor.call("UsuarioRegData", nom, ape, eda, cor, vis, nck, psw, type, function(error, result){
      if(error){
        console.log("FAllo algo", error);
      }
      if(result){
          alert("Registro exitoso");
          FlowRouter.go('/');
      }
    });
  },
  //Dispara el formulario "Lector" para que sea visible en pantalla
  "click .userreg": function(event, instance){
      instance.userreg.set(true);
      instance.userseller.set(false);
  },
  //Dispara el formulario "Empresario" para que sea visible en pantalla
  "click .userseller": function(event, instance){
      instance.userreg.set(false);
      instance.userseller.set(true);
  },
  "submit .add-seller": function(event, instance){
    event.preventDefault();
    let tar = event.target;

    nom_sell = tar.nom2.value;
    ape_sell = tar.ape2.value;
    eda_sell = tar.ed2.value;
    cor_sell = tar.cor2.value;
    vis_sell = tar.visa2.value;
    nck_sell = tar.nick2.value;
    psw_sell = tar.pssw12.value;
    typ_sell = "2";
    compania_sell = tar.company2.value;
    dir_sell = tar.address2.value;
    web_sell = tar.web2.value;

    if(tar.fk2.value == null)
      fkb_sell = "";
    else
      fbk_sell = tar.fk2.value;

    if(tar.twt2.value == null)
        twt_sell = "";
    else
        twt_sell = tar.twt2.value;

    if(tar.instgm2.value == null)
      itg_sell = "";
    else
      itg_sell = tar.instgm2.value;
  },
  //Evento controlador del carrito de compra en el registro de usuario tipo "EMPRESARIO"
  'click [data-service]' ( event, template ) {
    const pricing = {
      '1': {
        amount: 300,
        description: "Un paquete con lo mas basico para empezar tus publiaciones"
      },
      '2': {
        amount: 500,
        description: "Un paquete con regalos para iniciar con el pie derecho"
      },
      '3': {
        amount: 1000,
        description: "Todo lo que podemos ofrecer, esta en este paquete"
      }
    };

    let service = pricing[ event.target.dataset.service ];

    template.selectedService.set( service );

    template.checkout.open({
      name: 'Maganews',
      description: service.description,
      amount: service.amount,
      bitcoin: false
    });
  }
});


Template.Uploader.onCreated(function UploaderOnCreated(){
  Meteor.subscribe('images');
});


Template.Uploader.helpers({

  'image_gallery': function(){
    return Photo.find();
  }
});

Template.Uploader.events({
  'change .img': function(event){
    let file = event.target.datafile;
    FS.Utility.eachFile(event, function(file) {
      Photo.insert(file, function (err, fileObj) {
        if(err){
          console.log(err);
        }
        else {
          alert("Success!!!");
        }
      });
    });
  }
});
