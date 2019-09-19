$(document).ready(function() {
  setInterval(function() {
    getMessages();
  }, 1000);

  var scrolled = false;

  function getMessages() {
    $.get("/all-messages", function(data, status) {
      dataArray = JSON.parse(data);

      $("#messages").html("");

      dataArray.forEach(element => {
        var $messageAppended = $("#messages").append(
          `<div class = "line-spacing"><span class="username"></span><span class="message"></span></div>`
        )

        $messageAppended.children("div:last-child").children().eq(0).html(document.createTextNode(element[1] + " : "));
        $messageAppended.children("div:last-child").children().eq(1).html(document.createTextNode(element[2]));
      });
      if (!scrolled) {
        var objDiv = document.getElementById("messages");
        objDiv.scrollTop = objDiv.scrollHeight;
        scrolled = true;
      }
    });
  }

  $(document).on("keypress", function(e) {
    if (e.which == 13) {
      var username = $("#username").val();
      var message = $("#message").val();
    
      }
      if (message !== "") {
        $.post("/message", { username: username, message: message }, function(
          result
        ) {
          var $messageAppended = $("#messages").append(
            `
            <div class = "line-spacing">
              <span class="username"></span>
              <span class="message"></span>
            </div>
            `
          )

          $messageAppended.children("div:last-child").children().eq(0).html(document.createTextNode(username + " : "));
          $messageAppended.children("div:last-child").children().eq(1).html(document.createTextNode(message));


          var objDiv = document.getElementById("messages");
          objDiv.scrollTop = objDiv.scrollHeight;
          $("#message").val("");  
        });
      }
    
  });
});
