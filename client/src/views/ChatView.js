window.ChatView = Backbone.View.extend({
  
  initialize: function(){
    _.bindAll(this, 'render');
  },

  template: _.template('<span class="username"><%= username %></span>: <span class="messageText"><%= text %></span> in room <span class="roomname"><%= roomname %></span>'),

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }

});