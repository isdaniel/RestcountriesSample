
window.onload = function () {
  var app = new Vue({
    el: '#app',
    data: {
      rows: [],
      pageSize: 25,
      currPage: 1,
      countryName: '',
      ASC: 1,
      isLoading: true
    },
    computed: {
      filteredRows: function () {
        var self = this;
        return self.rows.filter(x=> !self.countryName || x.name.search(self.countryName) != -1);
      },
      pageStart: function () {
        return (this.currPage - 1) * this.pageSize;
      },
      totalPage: function () {
        return Math.ceil(this.filteredRows.length / this.pageSize);
      }
    },
    methods: {
      setPage: function (index) {
        if (index <= 0 || index > this.totalPage) {
          return;
        }
        this.currPage = index;
      },
      orderBy: function (item) {
        var self = this;
        return self.rows.sort(function (obj1, obj2) {
          var obj1 = obj1[item]
          var obj2 = obj2[item]

          if (obj1 === obj2)
            return 0;
          else if (obj1 > obj2)
            return self.ASC;
          else
            return self.ASC * -1;
        });
      }
    },
    created: function () {
      var self = this;
      $.get('https://restcountries.eu/rest/v2/all', function (data) {
        self.rows = data;
        self.isLoading = false;
      });
    },
    watch:{
      countryName:function(newValue){
        this.currPage = 1;
      }
    }
  });
}

