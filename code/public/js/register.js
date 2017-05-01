
window.onload = function() {
  $("#RPCtips").hide();
  $("#RUtips").hide();
  $("#RPtips").hide();
  $("#REtips").hide();
}

$(function() {

    var usernameExp = /^[a-zA-Z][a-zA-Z0-9]*/;
    var emailExp = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;

    // 点击注册
    $("#Rbutton").click(function() {
      alert("test");
    });

// 不能为空
    $("#Rusername").blur(function() {
      if (isEmpty("username")) {
        console.log('empty');
        $("#RUtips").show();
      } else if (!usernameExp.test($('#Rusername').val())) {
        $("#RUtips").text("用户名格式错误");
        $("#RUtips").show();
      } else {
        $("#RUtips").hide();
      }
    });

    $("#Rpassword").blur(function() {
      if (isEmpty("password")) {
        console.log('empty');
        $("#RPtips").show();
      } else if ($("#RCpassword").val().toString() != $("#Rpassword").val().toString()) {
        $("#RCPtips").text("两次输入的密码不同");
        $("#RCPtips").show();
      } else {
        console.log('not empty');
        $("#RPtips").hide();
      }
    });

    $("#RCpassword").blur(function() {
      if (isEmpty("cpassword")) {
        console.log('empty3');
        $("#RCPtips").text("确认密码不能为空");
        $("#RCCtips").show();
      } else if ($("#RCpassword").val().toString() != $("#Rpassword").val().toString()) {
        $("#RCPtips").text("两次输入的密码不同");
        $("#RCPtips").show();
      } else {
        $("#RCPtips").hide();
      }
    });

    $("#Remail").blur(function() {
      if (isEmpty("email")) {
        console.log('empty');
        $("#REtips").show();
      } else if (!emailExp.test($("#Remail").val())){
        $("#REtips").text("邮箱格式错误");
        $("#REtips").show();
      } else {
        $("#REtips").hide();
      }
    });



    function isEmpty(_id) {
      var x = document.forms["Rform"][_id].value;
      if (x == null || x == "") {
        return true;
      }
      return false;
    }
});