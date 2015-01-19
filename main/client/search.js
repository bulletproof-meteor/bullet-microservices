var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['packageName', 'description'];

PackageSearch = new SearchSource('packages', fields, options);

Template.searchResult.helpers({
  getPackages: function() {
    return PackageSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>")
      },
      sort: {isoScore: -1}
    });
  },

  isLoading: function() {
    return PackageSearch.getStatus().loading;
  }
});

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var searchBox = $('#search-result');
    var text = $(e.target).val().trim();
    if(text.length > 0) {
      searchBox.show();
    } else {
      searchBox.hide();
    }

    PackageSearch.search(text);
  }, 200)
});

Template.searchBox.rendered = function() {
  $('#search-result').hide();
};