  function getJson(query) {
      fetch(`https://api.artic.edu/api/v1/artworks/search?q=${query}&fields=id,title,image_id&limite=5`)
          .then((r) => r.json()).then(function({ data }) {
              inputArtworkData(data);
          })

  }

  // utilizar async await ou promisses, ao usar promisses utilisar o metodo then().

  function inputArtworkData(docs) {

      var content = document.querySelector('.artWorks_contents');
      content.innerHTML = "";
      content.innerHTML = "<h1> SEARCH RESULT</h1>";
      for (var i = 0; i < docs.length; i++) {
          let ul = document.createElement('ul');
          let li = document.createElement('li');
          let p = document.createElement('p');
          let img = document.createElement('img');
          p.innerHTML = docs[i].title;
          img.src = "https://www.artic.edu/iiif/2/" + docs[i].image_id + "/full/843,/0/default.jpg";
          li.appendChild(p);
          li.appendChild(img);
          ul.appendChild(li);
          content.appendChild(ul);
      }

  }

  function displayNone(selector) {
      var container = document.querySelector(selector);
      console.log(container);
      container.style.display = "none";
  }

  function displayShow(selector) {
      var container = document.querySelector(selector);
      container.style.display = "block";

  }

  function showLogin() {
      let login = document.querySelector("form");
      if (isLocalStorageEmpty) {

          login.style.display = "block";
      }
  }

  function login() {
      let user_email = document.querySelector(".user_email").value;
      let user_password = document.querySelector(".user_password ").value;
      post(user_email, user_password);
  }

  /* Em alteração */
  function register() {
      let flag = true;
      let user_name = document.querySelector('#name').value;
      let user_email = document.querySelector('#email').value;
      let user_password = document.querySelector('#psw').value;
      let repeat_password = document.querySelector('#psw-repeat').value;
      clearLoginMsg(".email_invalid");
      clearLoginMsg(".password_invalid");
      clearLoginMsg(".repeat_invalid");
      clearLoginMsg(".username_invalid");

      if (user_email.trim().length == 0) {
          createLoginMsg(" The email field cannot be empty", ".user_email_invalid");
          flag = false;

      } else if (user_email.trim().length < 3) {
          createLoginMsg("E Mail must be at least three characters long", ".user_email_invalid");
          flag = false;
      } else if (!user_email.includes('@')) {
          createLoginMsg("Invalid email", ".user_email_invalid");
          flag = false;
      }

      if (user_password.length == 0) {
          createLoginMsg("The password field cannot be empty", ".user_password_invalid");
          flag = false;
      } else if (user_password.length < 3) {
          createLoginMsg("Password must be at least three characters long", ".user_password_invalid");
          flag = false;
      }
      if (user_name.length == 0) {
          createLoginMsg("The username field cannot be empty", ".username_invalid");
          flag = false;
      } else if (user_name.length < 3) {
          createLoginMsg("Username must be at least three characters long", ".username_invalid");
          flag = false;

      }

      if (user_password !== repeat_password) {
          createLoginMsg("password don't match", ".repeat_invalid");
          flag = false;
      }
      if (flag) {
          postRegister(user_name, user_email, user_password);
      }
      return flag;



  }

  async function postRegister(username, user_email, user_password) {

      await fetch("./register", {
              method: "POST",
              body: JSON.stringify({
                  username: username,
                  email: user_email,
                  password: user_password
              }),
              headers: {
                  "Content-type": "application/json; charset=UTF-8"
              }
          }).then(response => {

              if (response.status >= 500) {
                  createMessage("Register failed", "email or username already exist", false);
                  desapareceMsg();

              }
              return response.json();

          })
          .then(json => {
              let token = json.token;
              if (token !== undefined) {
                  sendToLocalStorage(token);
                  displayNone(".register");
                  document.querySelector(".search").disabled = false;
                  createMessage("Successful register!", " Welcome !", true);
                  desapareceMsg();
              }
          })
  }

  function post(user_email, user_password) {

      fetch("/login", {
          method: "POST",
          body: JSON.stringify({
              email: user_email,
              //email: "eve.holt@reqres.in",
              password: user_password
                  //password: "123"

          }),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      })

      .then(response => {

              if (response.status >= 400) {
                  createMessage("Login failed", "Email or password is incorrect", false);
                  desapareceMsg();

              }
              return response.json();

          })
          .then(json => {
              let token = json.token;
              if (token !== undefined) {
                  sendToLocalStorage(token);
                  displayNone("form");
                  document.querySelector(".search").disabled = false;
                  createMessage("Successful login!", " Welcome !", true);
                  desapareceMsg();
              }
          })

  }

  function desapareceMsg() {

      let x = document.querySelector(".msg");
      setTimeout(function() { x.style.display = "none" }, 2500);
  }

  function sendToLocalStorage(token) {
      localStorage.setItem('token', token);
  }


  function isLocalStorageEmpty() {
      let userToken = localStorage.getItem("token");
      if (!userToken) {
          return true;

      } else {
          return false;
      }

  }

  function isValidField(query) {
      if (query.trim().length == 0) {
          //alert("THE FIELD CANNOT BE EMPTY!")
          createMessage("THE FIELD CANNOT BE EMPTY!", "", false);
          desapareceMsg();
          return false;
      } else if (query.trim().length < 3) {
          // alert("THE FIELD NEEDS TO HAVE THREE CHARACTERS OR MORE!");
          createMessage("THE FIELD NEEDS TO HAVE THREE CHARACTERS OR MORE!", "", false);
          desapareceMsg();
          return false;

      } else {
          return true;
      }

  }

  function createMessage(msg1, msg2, succesmsg) {

      let divmsg = document.querySelector(".msg");
      divmsg.style.display = "block";
      divmsg.innerHTML = "";
      let p = document.createElement("p");
      let p2 = document.createElement("p");
      p.innerHTML = msg1;
      p2.innerHTML = msg2;
      divmsg.appendChild(p);
      divmsg.appendChild(p2);
      p.style.margin = "10px";
      p2.margin = "10px";
      p.style.textAlign = "center";
      p2.style.textAlign = "center";
      divmsg.style.height = "auto";
      if (succesmsg) {
          divmsg.style.backgroundColor = " #04AA6D"

      } else {
          divmsg.style.backgroundColor = "#f44336"

      }


  }

  function validLoginFieds() {
      clearLoginMsg(".email_invalid");
      clearLoginMsg(".password_invalid");
      let user_email = document.querySelector(".user_email").value,
          flag = true;
      user_password = document.querySelector(".user_password").value;
      if (user_email.trim().length == 0) {
          createLoginMsg(" The email field cannot be empty", ".email_invalid");
          flag = false;

      } else if (user_email.trim().length < 3) {
          createLoginMsg("E Mail must be at least three characters long", ".email_invalid");
          flag = false;
      } else if (!user_email.includes('@')) {
          createLoginMsg("Invalid email", ".email_invalid");
          flag = false;
      }

      if (user_password.length == 0) {
          createLoginMsg("The password field cannot be empty", ".password_invalid");
          flag = false;
      } else if (user_password.length < 3) {
          createLoginMsg("Password must be at least three characters long", ".password_invalid");
          flag = false;
      }
      return flag;

  }

  function clearLoginMsg(query) {
      let p = document.querySelector(query);
      p.innerHTML = "";

  }

  function createLoginMsg(msg, query) {

      let p = document.querySelector(query);
      p.innerHTML = msg;
      p.style.color = "red";
      p.style.textAlign = "left";
      p.style.fontFamily = "Arial";
      p.style.fontSize = "10px";

  }

  function main() {
      document.querySelector(".registerbtn").addEventListener('click', (ev) => {
          ev.preventDefault();
          if (register()) {
              displayNone('.register');
          }



      });

      document.querySelector(".search").addEventListener('focus', () => {
          if (isLocalStorageEmpty()) {
              document.querySelector(".search").disabled = true;
              showLogin();
          } else {
              document.querySelector(".search").disabled = false;
          }

      });
      // link sign in
      document.querySelector(".signin").addEventListener("click", (ev) => {
          ev.targetpreventDefault();
          showLogin();
      });

      // Show register
      document.querySelector(".register_button").addEventListener('click', (ev) => {
          ev.preventDefault();
          if (isLocalStorageEmpty()) {
              displayNone("form");
              displayShow('.register');
          } else {
              createMessage("You are already logged in!", " Log out to acess with another account", false);
              desapareceMsg();

          }
      });
      document.querySelector(".login").addEventListener('click', (ev) => {
          ev.preventDefault(ev);
          if (isLocalStorageEmpty()) {
              displayNone(".register");
              showLogin();
          } else {
              createMessage("You are already logged in!", " Log out to scess with another account", false);
              desapareceMsg();

          }
      });
      document.querySelector(".logout").addEventListener('click', (ev) => {
          ev.preventDefault();
          localStorage.clear();
          createMessage("disconnected successful", "", true);
          desapareceMsg();


      });



      let close = document.querySelector(".closebtn");
      let cancelLogin = document.querySelector(".cancelbtn");
      let cancelRegister = document.querySelector(".cancelRegisterBtn");
      let makeLogin = document.querySelector(".loginbtn");

      close.addEventListener("click", function() {
          displayNone('.artWorks');
          displayShow('.conteiner')
      });
      //Cancela o Login
      cancelLogin.addEventListener("click", function() {
          displayNone("form");
          document.querySelector(".search").disabled = false;

      });
      // Cancela o Registro
      cancelRegister.addEventListener("click", () => {
          displayNone(".register");

      });
      // realiza o login
      makeLogin.addEventListener("click", function(ev) {
          ev.preventDefault();
          if (validLoginFieds())
              login();
      })

      var search = document.querySelector('.search');
      search.addEventListener("keypress", function(e) {
          if (e.key === "Enter") {
              var query = search.value;
              if (isValidField(query)) {
                  displayNone('.conteiner');
                  displayShow('.artWorks');
                  getJson(query);
              }
          }
      });


  }


  main();