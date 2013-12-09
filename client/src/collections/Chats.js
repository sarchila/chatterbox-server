window.Chats = Backbone.Collection.extend({
  url: '/',

  initialize: function(){
    _.bindAll(this, 'getFromServer', 'dataReceived');
    this.getFromServer();
  },

  getFromServer: function(){
    this.fetch({success: this.dataReceived});
  },

  dataReceived: function(data){
    this.trigger('received');
  }

});