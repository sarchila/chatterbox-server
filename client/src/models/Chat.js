window.Chat = Backbone.Model.extend({

  initialize: function (message){
    if (message){
      if (message.roomname) this.set('roomname', message.roomname + ', all');
      else this.set('roomname', 'all');
    }
  },

});