window.ChatApp = Backbone.Model.extend({
  initialize: function(){
    this.chats = new Chats({model: Chat});
    this.chatsView = new ChatsView({collection: this.chats});
    this.router = new Router();
    // router.on('route:index', function(){
    //   $('.container').append(chatsView.render());
    // });
    Backbone.history.start();

    $('input').on('click', this.clearInput);
    $('.sendChat').on('click', this.sendAndReceive.bind(this));
    $('.sendUsername').on('click', this.setUsername.bind(this));
  },

  sendAndReceive: function(){
    var msg = new Chat({username: this.username || "Anonymous", text:$('.chatInput').val()});
    msg.on('chat:sent', this.chats.getFromServer);
    msg.sendChat();
    $('.chatInput').val('');
  },

  clearInput: function(){
    $(this).val('');
  },

  setUsername: function(){
    if ($('.userInput').val() !== "Username"){
      this.username = $('.userInput').val();
      $('.userInput').remove();
      $('.sendUsername').remove();
    }
  }
});