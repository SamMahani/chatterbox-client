

class Apps {
  constructor(username, text, roomname) {
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
    this.msg;
  }
  ////////////////////////////////////////////////////////////////////////////
  init() {
    this.fetch();
    $('#main').on('click', '.username', this.handleUsernameClick);
  }
  ////////////////////////////////////////////////////////////////////////////
  handleUsernameClick() {
    console.log('you cliked me!');
  }
  ////////////////////////////////////////////////////////////////////////////
  clearMessages() {
    $('#chats').empty();
  }
  ////////////////////////////////////////////////////////////////////////////
  renderMessage(message) {
    message.username = message.username || 'anonymous';
    message.username = JSON.stringify(message.username).slice(1,message.username.length -2);
    message.text = JSON.stringify(message.text).slice(1,message.username.length -2);

    $('#chats').append(`
      <div class="chat">
        <span class="username">${message.username}</span><br>
        <span>${message.text}</span>
      </div>
    `);
  }
  ////////////////////////////////////////////////////////////////////////////
  renderRoom(room) {
    var input = `<option class="${room}">${room}</option>`;
    $("#roomSelect").append(input);
    
  }
  ////////////////////////////////////////////////////////////////////////////
  renderAllRooms() {
    $("#roomSelect").append('<option value="" disable selected>chat room</option>');
    var unique = Array.from(this.msg.results).map(el => el.roomname);

    unique = [...new Set(unique)];

    for (let i = 0; i < unique.length; i++) {
      let input = `<option class="${unique[i]}">${unique[i]}</option>`;
      $("#roomSelect").append(input);   
    }

  }
  ////////////////////////////////////////////////////////////////////////////
  clearRooms() {
    $("#roomSelect").empty();
  }

  ////////////////////////////////////////////////////////////////////////////
  send(dat) {
    var self = this;
    $.ajax({
      url: self.server,
      type: 'POST',
      data: JSON.stringify(dat),
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  }
  ////////////////////////////////////////////////////////////////////////////
  fetch() {
    var self = this;
    $.ajax({
      url: this.server,
      type: 'GET',
      data: { 
        order: '-createdAt', 
        limit: 10 }, 
      success: function(resp) {
        self.msg = resp;
        console.log('sam', self.msg);
        self.clearMessages();
        self.msg.results.forEach((element) => {
          self.renderMessage(element);
        });
        self.clearRooms();
        self.renderAllRooms();
        setTimeout(self.fetch.bind(self), 4000);
      },
      error: function() {
      }
    });
  }

}


let app = new Apps();

$(document).ready(function() {
  app.init();
});






