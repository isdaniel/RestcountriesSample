window.onload = function () {
  var app = new Vue({
    el: '#app',
    data: {
      vm: {},
      isLoading : true
    },
    created: function () {
      var self = this;
      let urlParams = new URLSearchParams(window.location.search);
      var countryName = urlParams.has('countryName') ? urlParams.get('countryName') : '';
      var url = 'https://restcountries.eu/rest/v2/name/'+encodeURI(countryName)+'?fullText=true'
      $.get(url, function (data) {
        self.vm = data[0];
        self.isLoading = false;
      }).fail(function() {
        document.write('No Data Display!!');
      });
    }
  });
}

