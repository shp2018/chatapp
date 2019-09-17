$(document).ready(function() {
  setInterval(function() {
    getMessages();
  }, 1000);

  var scrolled = false;

  function getMessages() {
    $.get("/all-messages", function(data, status) {
      console.log(data);
      dataArray = JSON.parse(data);
      console.log(dataArray);

      $("#messages").html("");
  
      dataArray.forEach(element => {
        $("#messages").append(
          `<div><span class="username">${element[1]}</span> ${element[2]} </div>`
        );
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
      $.post("/message", { username: username, message: message }, function(
        result
      ) {
        console.log("sucessfully posted");
      });
      $("#message").val("");
    }
  });
});
