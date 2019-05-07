
var Newsurl ='https://newsapi.org/v2/top-headlines?country=us&apiKey=628fd7b3d44b4d67a682072cba2d449d'


  var appid = "628fd7b3d44b4d67a682072cba2d449d";

var indexes =[];

var idtil = document.getElementById('article')

$.ajax({

     url:Newsurl,
	 type: "GET",
  data:{
    appid: appid

  },success: function(response){


    const arrayOfjQueryArticles = [];
    var arrayOfArticles = response.articles;
    arrayOfArticles.forEach((article, index) => {

    let category = article.source.name
    let title = article.title
    let imgSrc = article.urlToImage

    let newArticle = `
              <div id=${index} class = 'article'>
              <article>
              <img src="${imgSrc}" alt=""/></a>
              <a href="#"><h1>${title}</h1>
              <p> ${category}</p>
              </article>
              </div>
      `
    indexes.push(index);
    arrayOfjQueryArticles.push(newArticle);
    $('#featured').append(newArticle) ;
  
})

var idtil = document.getElementsByClassName('article')

for(var i=0; i<= indexes.length -1 ; i++){
  console.log('this is '+arrayOfArticles[indexes[0]].title)
idtil[i].addEventListener("click",function(){
  window.location.href = 'index2.html?user=' + this.id ;
 event.preventDefault();
 console.log(this.id)
 console.log(arrayOfArticles[this.id].title);

})
}

  }

})