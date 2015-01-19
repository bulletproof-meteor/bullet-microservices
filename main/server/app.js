SearchSource.defineSource('packages', function(searchText, options) {
  return [];
});

Meteor.publish('topPackages', function() {
  var options = {sort: {isoScore: -1}, limit: 20};
  return Packages.find({}, options);
});