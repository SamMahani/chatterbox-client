// YOUR CODE HERE:
// Server: http://parse.sfm8.hackreactor.com/
// App ID: 72b8e073a4abde10221ce95f38ed1c63bd7f3d6b
// API Key: cf1ce23a61e2a40702c347b7dc1e0af8c28f6c7a

// $.ajaxSetup({
//   url: "http://parse.sfm8.hackreactor.com/",
//   global: false,
//   type: "POST"
// });

var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

var local = new Date();
var msg;
//message constructor
var Message = (username, text, roomname) => {
  this.username = username;
  this.text = text;
  this.roomname = roomname;
}

class Apps {
  constructor(username, text, roomname) {
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
    
  }

  init() {
    $(document).ready(function() {
      // setInterval(app.fetch, 1000);
      app.fetch();
      setTimeout(
      function loop() {

        msg.results.forEach( (element) => app.renderMessage(element));

      },500)

    })
  }

  clearMessages() {
    $('#chats').empty();
  }
  
  renderMessage(message) {

    message.username = message.username || 'anonymous';
    $('#chats').append(`
      <div class="chat">
        <span class="username">${message.username}</span><br>
        <span>${message.text}</span>
      </div>
    `);
  }


  send(dat) {
    $.ajax({
      url: this.server,
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



  fetch() {
    $.ajax({
      url: this.server,
      type: 'GET',
      data: { 
              order: '-createdAt', 
              limit: 50 }, 
      success: function(resp) {
      
      msg = resp;
      console.log(resp);
      

      },
      error: function() {

      }
    });
  }

};



let app = new Apps();
app.fetch();
// //init method
// app.init = () => {};

// var p = '<p>Testing this</p>';

// var dat = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

// //http://parse.sfm8.hackreactor.com/chatterbox/classes/messages
// //'hrsf99-chatterbox-client/client/index.html'
// //send method

// // app.send = (dat) => {
// //   $.post('//http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',   // url
// //        JSON.stringify(dat), // data to be submit
// //        function(data, status, jqXHR) {// success callback
// //                 $('body').append(p);
// //         });
// // };





