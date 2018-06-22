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




let app = {};

//init method
app.init = () => {}

;

var p = '<p>Testing this</p>';

var dat = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

//http://parse.sfm8.hackreactor.com/chatterbox/classes/messages
//'hrsf99-chatterbox-client/client/index.html'
//send method

// app.send = (dat) => {
//   $.post('//http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',   // url
//        JSON.stringify(dat), // data to be submit
//        function(data, status, jqXHR) {// success callback
//                 $('body').append(p);
//         });
// };

app.send = (dat) => {

  $.ajax({
  url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
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




//message constructor
var Message = (username, text, roomname) => {
  this.username = username;
  this.text = text;
  this.roomname = roomname;
}