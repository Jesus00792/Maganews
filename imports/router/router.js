import { Meteor } from 'meteor/meteor';

FlowRouter.route('/', {
    name: 'Home',
    action: function() {
        BlazeLayout.render('App', { main: 'Home' });
    }
});

FlowRouter.route('/store', {
    name: 'Store',
    action: function() {
        BlazeLayout.render('App', { main: 'Store' });
    }
});

FlowRouter.route('/regist', {
    name: 'Regist',
    action: function() {
        BlazeLayout.render('App', { main: 'Regist' });
    }
});

FlowRouter.route('/upload', {
    name: 'Uploader',
    action: function() {
        BlazeLayout.render('App', { main: 'Uploader' });
    }
});
