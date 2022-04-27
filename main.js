  function getJson(query) {
      fetch(`https://api.artic.edu/api/v1/artworks/search?q=${query}&fields=id,title,image_id&limite=5`)
          .then((r) => r.json()).then(function({ data }) {
              inputArtworkData(data);
          })
          // .then(response.json()).then(function(response) {
          // console.log(response);
          //  inputArtworkData(data);
          //  });*/
          // let response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${query}&fields=id,title,image_id&limite=5`)
          // console.log(await response.json());

  }

  // utilizar async await ou promisses, ao usar promisses utilisar o metodo then().




  function inputArtworkData(docs) {
      var content = document.querySelector('.artWorks_contents');
      for (var i = 0; i < docs.length; i++) {
          let ul = document.createElement('ul');
          let li = document.createElement('li');
          let img = document.createElement('img');
          li.innerHTML = docs[i].title;
          img.src = "https://www.artic.edu/iiif/2/" + docs[i].image_id + "/full/843,/0/default.jpg";
          li.appendChild(img);
          ul.appendChild(li);
          content.appendChild(ul);
      }
  }


  function main() {
      var search = document.querySelector('.search');
      var query = search.value;
      search.addEventListener("keypress", function(e) {
          if (e.key === "Enter") {
              getJson(query)

          }
      });


  }
  main();