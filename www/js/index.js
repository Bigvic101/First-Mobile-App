//var email = document.querySelector(".email");
//console.log("There is nothing" + email);

//Jquery makes your code cleaner and shorter, code line 1 in jquery is written as $(".email")
//To check for readiness of document we use the following code

/*$(document).ready(function () {
    console.log("Empty: " + $(".email").val());
});*/

$(document).ready(function () {
  var getisUserLoggedIn = localStorage.getItem("isUserLoggedIn");
  //var userFromStorage = JSON.parse(localStorage.getItem("fullname"));
  //console.log(userFromStorage);
  //$(".user").text(getUsers[objectIndex].fullname);

  function defaultView() {
    $(".login").hide();
    $(".allUsers").hide();
    $(".myCalculator").hide();
    $(".currencyConverter").hide();
    $(".contact").hide();
    $(".dashboardMenuViews").hide();
    $(".dashboard").hide();

    if (getisUserLoggedIn === "1") {
      $(".dashboard").show();
    } else {
      $(".login").show();
    }
  }

  defaultView();

  $(".register").hide();
  $(".update").hide();
  $(".regSuccess").hide();

  $(".gotoreg").click(function () {
    $(".register").show();
    $(".login").hide();
  });

  $(".gotologin").click(function () {
    $(".register").hide();
    $(".login").show();
    $(".regSuccess").hide();
  });

  function usersReg() {
    if ($(".fullname").val() === "") {
      $errMsg = "Enter full name!";
      console.log("check: " + $errMsg);
    } else if ($(".phone").val() === "") {
      $errMsg = "Enter your phone number";
      console.log("check: " + $errMsg);
    } else if ($(".regemail").val() === "") {
      $errMsg = "Enter your Email";
      console.log("check: " + $errMsg);
    } else if ($(".regpassword").val() === "") {
      $errMsg = "Enter your password";
      console.log("check: " + $errMsg);
    } else if ($(".password1").val() === "") {
      $errMsg = "Confirm your password";
      console.log("check: " + $errMsg);
    } else if ($(".regpassword").val() !== $(".password1").val()) {
      $errMsg = "Passwords do not match";
      console.log("check: " + $errMsg);
    } else {
      var getUsers = JSON.parse(localStorage.getItem("users"));

      if (getUsers === "" || getUsers === null) {
        getUsers = [];
        var i = 0;
      } else {
        var i = getUsers.length;
      }

      i++;

      var newUser = {
        id: i,
        fullname: $(".fullname").val(),
        phone: $(".phone").val(),
        email: $(".regemail").val(),
        password: $(".regpassword").val(),
        password1: $(".password1").val(),
      };

      getUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(getUsers));
      $(".register").hide();
      $(".regSuccess").show();
    }
  }

  $(".regBtn").click(function () {
    usersReg();
  });

  $(".loginBtn").click(function () {
    if ($(".email").val() === "") {
      $errMsg = "Please enter your email";
    } else if ($(".password").val() === "") {
      $errMsg = "please input your password";
    } else {
      var getUsers = JSON.parse(localStorage.getItem("users"));
      //console.log(getUsers[2].email);
      for (var objectIndex = 0; objectIndex < getUsers.length; objectIndex++) {
        if (
          $(".email").val() === getUsers[objectIndex].email &&
          $(".password").val() === getUsers[objectIndex].password
        ) {
          localStorage.setItem("isUserLoggedIn", "1");

          $(".dashboard").show();
          $(".login").hide();
          $(".user").text(getUsers[objectIndex].fullname);
        }
      }
    }
  });

  $(".logOutBtn").click(function () {
    localStorage.setItem("isUserLoggedIn", "0");
    $(".login").show();
    $(".dashboard").hide();
  });

  $(".logOutBtn").click;

  function editAction(userId) {
    $(".update").show();
    $(".dashboard").hide();
    $(".dashboardMenuViews").hide();

    var getUsers = JSON.parse(localStorage.getItem("users"));
    for (var u = 0; u < getUsers.length; u++) {
      if (getUsers[u].id == userId) {
        var fullname = getUsers[u].fullname;
        var phone = getUsers[u].phone;
        var email = getUsers[u].email;
        var password = getUsers[u].password;
        var password1 = getUsers[u].password1;
      }
    }

    $(".fullname").val(fullname);
    $(".phone").val(phone);
    $(".email").val(email);
    $(".regpassword").val(password);
    $(".password1").val(password);

    $(".editBtn").click(function () {
      usersReg(userId);
    });
  }

  function deleteAction(userId) {
    var deleteThis = userId;
    var getAllUsers1 = JSON.parse(localStorage.getItem("users"));
    for (
      var usersIndex1 = 0;
      usersIndex1 < getAllUsers1.length;
      usersIndex1++
    ) {
      if (getAllUsers1[usersIndex1].id == deleteThis) {
        console.log(usersIndex1);
        getAllUsers1.splice(usersIndex1, 1);
        localStorage.setItem("users", JSON.stringify(getAllUsers1));

        displayUsers();
      }
    }
  }

  function displayUsers() {
    var getAllUsers = JSON.parse(localStorage.getItem("users"));
    //console.log(getAllUsers[0].fullname); //calling a var(specific i.e. fullname, from array[0]) from a set of login arrays
    //$(".showName").text(getAllUsers[0].fullname); This line of code puts the fullname from the first array inside the span tag
    $(".allUsers").text("");
    for (var usersIndex = 0; usersIndex < getAllUsers.length; usersIndex++) {
      var userId = getAllUsers[usersIndex].id;
      var eachUser =
        "<div class='panel panel-success'>" +
        "<div class='panel-heading '>" +
        "<p>" +
        "<span class='glyphicon glyphicon-edit editBtn' id='" +
        userId +
        "'></span>  " +
        "<span class='glyphicon glyphicon-remove deleteBtn' id='" +
        getAllUsers[usersIndex].id +
        "'></span>" +
        "</p>" +
        "</div>" +
        "<div class='panel-body'>" +
        "<div class='row bg-warning'>" +
        "<div class='col-xs-12'>" +
        "<p>Full Name: <span class='showName'>" +
        getAllUsers[usersIndex].fullname +
        "</span></p>" +
        "<p>Email: <span class='showEmail'>" +
        getAllUsers[usersIndex].email +
        "</span></p>" +
        "<p>Phone: <span class='showPhone'>" +
        getAllUsers[usersIndex].phone +
        "</span></p>" +
        "</div>" +
        "</div>" +
        "</div>";
      $(".allUsers").append(eachUser);
    }
    var deleteBtn = document.querySelectorAll(".deleteBtn");
    for (var d = 0; d < deleteBtn.length; d++) {
      deleteBtn[d].addEventListener(
        "click",
        function () {
          deleteAction(this.id);
        },
        false
      );
    }

    var editBtn = document.querySelectorAll(".editBtn");
    for (var d = 0; d < editBtn.length; d++) {
      editBtn[d].addEventListener(
        "click",
        function () {
          editAction(this.id);
        },
        false
      );
    }
  }

  $(".viewUsers").click(function () {
    $(".dashboard").hide();
    $(".dashboardMenuViews").show();
    $(".allUsers").show();
    $(".dashboardBackBtn").show();
    displayUsers();
  });

  $(".updateback").click(function () {
    $(".dashboard").hide();
    $(".dashboardMenuViews").show();
    $(".allUsers").show();
    $(".update").hide();

    displayUsers();
  });

  $(".viewProfile").click(function () {
    $(".dashboard").hide();
    $(".dashboardMenuViews").show();
    $(".myCalculator").show();
    $(".dashboardBackBtn").show();
  });

  $(".viewSettings").click(function () {
    $(".dashboard").hide();
    $(".dashboardMenuViews").show();
    $(".currencyConverter").show();
    $(".dashboardBackBtn").show();
  });

  $(".viewContact").click(function () {
    $(".dashboard").hide();
    $(".dashboardMenuViews").show();
    $(".contact").show();
    $(".dashboardBackBtn").show();
  });

  $(".dashboardBackBtn").click(function () {
    //if (getisUserLoggedIn == "1") {
    $(".dashboard").show();
    $(".contact").hide();
    $(".currencyConverter").hide();
    $(".myCalculator").hide();
    $(".allUsers").hide();
    $(".dashboardBackBtn").hide();
    //} else {
    //defaultView();
    //}
  });

  var calcScreen = "0";
  $(".calculatorScreen").val(calcScreen);

  $(".numoper").each(function (index, numoper) {
    $(this).click(function (e) {
      if (calcScreen == "0") calcScreen = "";
      if ($(this).val() == "C") {
        calcScreen = "0";
        $(".calculatorScreen").val(calcScreen);
      } else if ($(this).val() == "=") {
        try {
          calcScreen = eval(calcScreen);
          $(".calculatorScreen").val(calcScreen);
          calcScreen = "0";
        } catch (e) {
          calcScreen = "0";
          $(".calculatorScreen").val("ERROR");
        }
      } else {
        calcScreen += $(this).val();
        $(".calculatorScreen").val(calcScreen);
      }
      e.preventDefault();
      console.log(calcScreen);
      console.log(".calculatorScreen");
    });
  });

  $(".convert").click(function () {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  });

  $(".validate").click(function () {
    converter();
  });

  function converter() {
    var naira = parseInt(document.getElementById("naira").value);
    var convert = document.getElementById("convert").value;
    var cv = document.getElementById("cv12");
    if (convert == 1) {
      cv.value = naira * 0.0026;
      cv.type = "text";
    }
    if (convert == 2) {
      cv.value = naira * 0.0022;
      cv.type = "text";
    }
    if (convert == 3) {
      cv.value = naira * 0.27;
      cv.type = "text";
    }
    if (convert == 4) {
      cv.value = naira * 0.002;
      cv.type = "text";
    }
    if (convert == 5) {
      cv.value = naira * 0.0037;
      cv.type = "text";
    }
  }
});
/*
var a = localStorage.getItem("Amount");
var b = 5; var c = 0.0022; var d = 0.27; var e = 0.0020; var f = 0.0037;
var con = a * b;
var bon = a * c;
var don = a * d;
var eon = a * e;
var fon = a * f;

  function conv(){
  $(".dollar").click(function(){  
    $(".converterOutput").val(con);
  });

  $(".euro").click(function(){  
    $(".converterOutput").val(bon);
  });

  $(".yen").click(function(){  
    $(".converterOutput").val(don);
  });

  $(".pound").click(function(){  
    $(".converterOutput").val(eon);
  });

  $(".aud").click(function(){  
    $(".converterOutput").val(fon);
  });
}

  $(".clear").click(function(){
    localStorage.removeItem("Amount");
   $(".converterInput").val() == "";
   $(".converterOutput").val() == "";
  });*/

/*$('.numoper').on('click', function (e) {
  console.log('e', e.target.innerHTML);
  $(".calculatorScreen").val($(this).val());
  $(".allClear").click(function () {
});
});*/
/*localStorage.setItem("id", i);
        localStorage.setItem("fullname", $(".fullname").val());
        localStorage.setItem("phone", $(".phone").val());
        localStorage.setItem("email", $(".regemail").val());
        localStorage.setItem("password", $(".regpassword").val());
        localStorage.setItem("password1", $(".password1").val());
      */
//Global Variables
/*
    var num1 = "";
    var num2 = "";
    var operator = "";
    var equal = "";
  
    $('button').on('click', function (e) {
      var btn = e.target.innerHTML;
      if (btn >= '0' && btn <= '9') {
        handleNumber(btn);
      } else handleOperator(btn);
    });
  
    function handleNumber(num) {
      if (num1 === "") {
        num1 = num;
      } else {
        num2 = num;
      }
      displayButton(num);
    };
  
    function handleOperator(oper) {
      if (operator === "") {
        operator = oper;
      } else {
        handleEqual();
        operator = oper;
      }
    };
  
    function handleEqual() {
      switch (operator) {
        case '+': equal = +num1 + +num2;
          displayButton(equal);
          break;
        case '-': equal = +num1 - +num2;
          displayButton(equal);
          break;
        case '/': equal = +num1 / +num2;
          displayButton(equal);
          break;
        case '*': equal = +num1 * +num2;
          displayButton(equal);
          break;
      }
      updateVariables();
    };
  
    function displayButton(btn) {
      $(".calculatorScreen").val(btn);
      //$(".calculatorScreen").val(equal);
    }
  
    function updateVariables() {
      num1 = equal;
  
      num2 = "";
    }
  
    $(".allClear").click(function () {
      $(".calculatorScreen").val("");
    });
  
     $('button').on('click', function (e) {
        console.log('e', e.target.innerHTML);
        $(".calculatorScreen").val($(this).val());
      });
      */

/* } else {
         for (var u = 0; u < getUsers.length; u++) {
           if (getUsers[u].id == userId) {
             getUsers[u].fullname = $(".fullname").val();
             getUsers[u].phone = $(".phone").val();
             getUsers[u].email = $(".regemail").val();
             getUsers[u].password = $(".regpassword").val();
             getUsers[u].password1 = $(".password1").val();
           }
         }
       }*/
