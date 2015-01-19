Meteor.subscribe('topPackages');

Template.topPackages.helpers({
  getPackages: function() {
    return Packages.find();
  }
});