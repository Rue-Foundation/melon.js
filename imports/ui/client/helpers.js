import { Session } from 'meteor/session';

Template.registerHelper('isClientConnected', () => Session.get('isClientConnected'));
Template.registerHelper('isServerConnected', () => Session.get('isServerConnected'));
Template.registerHelper('clientDefaultAccount', () => Session.get('clientDefaultAccount'));
Template.registerHelper('clientAccountList', () => Session.get('clientAccountList'));
Template.registerHelper('accountCount', () => Session.get('accountCount'));


Template.registerHelper('isManagingWalletSet', () => Session.get('isManagingWalletSet'));
Template.registerHelper('latestBlock', () => Session.get('latestBlock'));
