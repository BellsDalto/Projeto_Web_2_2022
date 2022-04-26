async function getJson(query) {
    await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${query}&fields=id,title,image_id&limite=5`)
        .then(response.json()).then(function(data) {
            console.log(data);
            inputArtworkData(data);
        });

}




function inputArtworkData(docs) {
    var content = document.querySelector('.artWorks_contents');
    let ul = createElement('ul');
    let li = createElement('li');
    let img = createElement('img');
    li.innerHTML = docs.title;
    img.src = "https://www.artic.edu/iiif/2/" + docs.image_id + "/full/843,/0/default.jpg";
    li.appendChild(img);
    ul.appendChild(li);
    content.appendChild(ul);
    /* var content = document.querySelector('.artWorks_contents');
     for (var i = 0; i < docs.length; i++) {
         let ul = createElement('ul');
         let li = createElement('li');
         let img = createElement('img');
         li.innerHTML = docs[i].title;
         img.src = "https://www.artic.edu/iiif/2/" + docs[i].image_id + "/full/843,/0/default.jpg";
         li.appendChild(img);
         ul.appendChild(li);
         content.appendChild(ul);

     }*/


}


function main() {
    var search = document.querySelector('.search');
    var query = search.value;
    search.addEventListener("change", getJson(query));


}
main();