import { Meteor } from 'meteor/meteor';
import UsrData from '../imports/api/us_data.js'
import '../imports/api/img_data.js'
Meteor.startup(() => {
  // code to run on server at startup
});

let Stripe = StripeAPI(Meteor.settings.private.stripe);

Meteor.methods({
  pago( charge )
  {
    check( charge,
    {
      amount: Number,
      currency: String,
      source: String,
      description: String,
      receipt_email: String
    });

    let handleCharge = Meteor.wrapAsync( Stripe.charges.create, Stripe.charges ),
        payment = handleCharge( charge );

    return payment;
  },
  'UsuarioRegData': function(nom, ape, ed, cor, visa, nickname, pass,tipo){
    check(nom,String);
    check(ape,String);
    check(ed,String);
    check(cor,String);
    check(visa,String);
    check(nickname,String);
    check(pass,String);
    check(tipo,String);

		UsrData.insert({
			f_name: nom,
			l_name: ape,
			edad: ed,
      correo: cor,
      tar_visa: visa,
      nk_name: nickname,
      pssword: pass,
      usr_type: tipo
		});

    return result = true;
	},
  'UsuarioSellData': function(nom, ape,ed, cor, visa, nickname, pass,tipo,compania, dir, web, fbk,twt,itg){
    check(nom,String);
    check(ape,String);
    check(ed,String);
    check(cor,String);
    check(visa,String);
    check(nickname,String);
    check(pass,String);
    check(tipo,String);
    check(compania,String);
    check(dir,String);
    check(web,String);
    check(fbk,String);
    check(twt,String);
    check(itg,String);

		UsrData.insert({
			f_name: nom,
			l_name: ape,
			edad: ed,
      correo: cor,
      tar_visa: visa,
      nk_name: nickname,
      pssword: pass,
      usr_type: tipo,
      companyName: compania,
      address: dir,
      website: web,
      facebook:fbk,
      twitter:twt,
      instagram:itg
		});

    return result = true;
	},
  'DocUpload': function()
  {
    DocData.insert();
  }
});

Meteor.publish("Doc_Data", function(){
  return DocData.find();
});

Meteor.publish('images', function () {
        return Photo.find();
});
