$(document).ready(function() {
  console.log("wow");

  $.get("/all-messages", function(data, status) {
    console.log(data);
    dataArray = JSON.parse(data);
    console.log(dataArray);

    dataArray.forEach(element => {
      $("#messages").append(
        `<div><span class="username">${element[1]}</span> ${element[2]} </div>`
      );
    });
  });

  $(document).on("keypress", function(e) {
    if (e.which == 13) {
      var username = $("#username").val();
      var message = $("#message").val();
      $.post("/message", { username: username, message: message }, function(
        result
      ) {
        console.log("sucessfully posted");
      });
      alert(`${username} is going to send ${message}`);
    }
  });
});
