import { Meteor } from 'meteor/meteor';

FlowRouter.route('/', {
    name: 'Home',
    action: function() {
        BlazeLayout.render('App', { main: 'Home' });
    }
});

FlowRouter.route('/add', {
    name: 'Agregar',
    action: function() {
        BlazeLayout.render('App', { main: 'Agregar' });
    }
});

FlowRouter.route('/lists', {
    name: 'Lista',
    action: function() {
        BlazeLayout.render('App', { main: 'Lista' });
    }
});
