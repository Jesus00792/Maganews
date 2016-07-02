import { Meteor } from 'meteor/meteor';

FlowRouter.route('/', {
    name: 'Home',
    action: function() {
        BlazeLayout.render('App', { main: 'Home' });
    }
});

FlowRouter.route('/add', {
    name: 'Store',
    action: function() {
        BlazeLayout.render('App', { main: 'Store' });
    }
});

FlowRouter.route('/lists', {
    name: 'Regist',
    action: function() {
        BlazeLayout.render('App', { main: 'Regist' });
    }
});
