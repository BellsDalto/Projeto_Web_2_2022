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

  function post(user_email, user_password) {

      fetch("https://reqres.in/api/login", {
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
              // console.log(response);
              if (response.status >= 400) {
                  createMessage("Login failed", "Email or password is Incorrect", false);
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
          // alert("THE FIELD CANNOT BE EMPTY!")
          return false;
      } else if (query.trim().length < 3) {
          alert("THE FIELD NEEDS TO HAVE THREE CHARACTERS OR MORE!");
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




  function main() {
      document.querySelector(".search").addEventListener('focus', () => {
          console.log("fui chamado!");
          if (isLocalStorageEmpty()) {
              console.log("localStorage Empty")
              document.querySelector(".search").disabled = true;
              showLogin();
          } else {
              console.log("localStorage  Not Empty")
              document.querySelector(".search").disabled = false;
          }


      });



      let close = document.querySelector(".closebtn");
      let cancelLogin = document.querySelector(".cancelbtn");
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
      // realiza o login
      makeLogin.addEventListener("click", function(ev) {
          ev.preventDefault();
          let user_email = document.querySelector(".user_email").value,
              user_password = document.querySelector(".user_password").value;


          if (isValidField(user_email) && isValidField(user_password)) {
              //console.log("entrei_aqui os camps  são validos");
              login();
              // createMessage("login Sucessful!", " Well Come " + user_email + "!", true);
              //  } else {
              //  console.log("entrei aqui");

              //  alert("o campo x e y não podem ser vazios ou possuir menos de 3 caracteres");
          }

      })

      var search = document.querySelector('.search');
      search.addEventListener("keypress", function(e) {
          if (e.key === "Enter") {
              var query = search.value;
              if (isValidField(query)) {
                  displayNone('.conteiner');
                  // displayShow('.artWorks_contents');
                  displayShow('.artWorks');
                  getJson(query);
              }



          }
      });


  }


  main();