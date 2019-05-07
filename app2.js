var Newsurl ='https://newsapi.org/v2/top-headlines?country=us&apiKey=628fd7b3d44b4d67a682072cba2d449d'


  var appid = "628fd7b3d44b4d67a682072cba2d449d";


// const firebaseConfig = {
//   apiKey: "AIzaSyBpwAt8Okif37pPPqH2vvlPQv9cjb9mo8k",
//   authDomain: "news-final-project-misk.firebaseapp.com",
//   databaseURL: "https://news-final-project-misk.firebaseio.com",
//   projectId: "news-final-project-misk",
//   storageBucket: "news-final-project-misk.appspot.com",
//   messagingSenderId: "482228251203",
//   appId: "1:482228251203:web:57ed7dbfe05adc34"
// };


const firebaseConfig = {
  apiKey: "AIzaSyAtzd3AB-yzxyMhlNXcpaN_lOON8aUEsWg",
  authDomain: "finalprojectsanad.firebaseapp.com",
  databaseURL: "https://finalprojectsanad.firebaseio.com",
  projectId: "finalprojectsanad",
  storageBucket: "finalprojectsanad.appspot.com",
  messagingSenderId: "449970061855",
  appId: "1:449970061855:web:272f858c4b5cac91"
};

var ArticleIndex = null;

  firebase.initializeApp(firebaseConfig);

  window.addEventListener('load', function(){
	
	

	var url = window.location.search;
	
	var toks = url.split('?');
	
	console.log('toks: ', toks);
	
	var querystr = toks[1];
	
	console.log('querystr: ', querystr);
	
	var requestVarStr = querystr.split(',');
	
	var userStr = 'user=';
	
	requestVarStr.forEach(function(s) {
	
		if(s.startsWith(userStr)) {
			ArticleIndex = s.substring(userStr.length);
			console.log('Article index: ', ArticleIndex);
		}
	});
    
     console.log(ArticleIndex);

$.ajax({

     url:Newsurl,
	 type: "GET",
  data:{
    appid: appid

  },success: function(response){

  	//console.log(response.articles[ArticleIndex])

    const arrayOfjQueryArticles = []
   var arrayOfArticles = response.articles
  console.log(arrayOfArticles)
  let category = response.articles[ArticleIndex].source.name
  let title = response.articles[ArticleIndex].title
  let imgSrc = response.articles[ArticleIndex].urlToImage
  //console.log(article)

let newArticle = `
          <div class = 'mainDivNews'>
          <mainDivNews>
          <img src="${imgSrc}" alt=""/></a>
          <a href="#"><h3>${title}</h3>
          <p> ${category}</p>
          </mainDivNews>
          </div>
  `
   arrayOfjQueryArticles.push(newArticle)
  $('#featured').append(newArticle) 
  
  }
})

})

  var messageAppReference = firebase.database()

$(document).ready(function () {


  $('#message-form').submit(function (event) {
    // by default a form submit reloads the DOM which will subsequently reload all our JS
    // to avoid this we preventDefault()
    event.preventDefault()

    // grab user message input
    var message = $('#message').val()

    // clear message input (for UX purposes)
    $('#message').val('')

    // create a section for messages data in your db
    var messagesReference = messageAppReference.ref('messages');

    // use the set method to save data to the messages
    messagesReference.push({
      message: message,
      articleId: ArticleIndex,
      votes: 0
    })

  });

  // // on initialization of app (when document is ready) get fan messages
  messageClass.getFanMessages();
});

var messageClass = (function () {
  function getFanMessages() {
    // retrieve messages data when .on() initially executes
    // and when its data updates
    messageAppReference.ref('messages').on('value', function (results) {
      var $messageBoard = $('.message-board')
      var messages = []

      var allMessages = results.val();
      // iterate through results coming from database call; messages
      for (var msg in allMessages) {
        if(allMessages[msg].articleId === ArticleIndex)
        {

        
        // get method is supposed to represent HTTP GET method
        var message = allMessages[msg].message
        var votes = allMessages[msg].votes

        // create message element
        var $messageListElement = $('<li></li>')

        // create delete element
        var $deleteElement = $('<i class="fa fa-trash pull-right delete"></i>')
        $deleteElement.on('click', function (e) {
          var id = $(e.target.parentNode).data('id')
          deleteMessage(id)
        })


        // create up vote element
        var $upVoteElement = $('<i class="fa fa-thumbs-up pull-right"></i>')
        $upVoteElement.on('click', function (e) {
          var id = $(e.target.parentNode).data('id')
          updateMessage(id, ++votes)
        })

        // create down vote element
        var $downVoteElement = $('<i class="fa fa-thumbs-down pull-right"></i>')
        $downVoteElement.on('click', function (e) {
          var id = $(e.target.parentNode).data('id')
          updateMessage(id, --votes)
        })

        // add id as data attribute so we can refer to later for updating
        $messageListElement.attr('data-id', msg)

        // add message to li
        $messageListElement.html(message)

        // add delete element
        $messageListElement.append($deleteElement)

        // add voting elements
        $messageListElement.append($upVoteElement)
        $messageListElement.append($downVoteElement)

        // show votes
        $messageListElement.append('<div class="pull-right">' + votes + '</div>')

        // push element to array of messages
        messages.push($messageListElement)

        // remove lis to avoid dupes
        $messageBoard.empty()

        for (var i in messages) {
          $messageBoard.append(messages[i])
        }
      }
      }
    })

  }

  function updateMessage(id, votes) {
    // find message whose objectId is equal to the id we're searching with
    var messageReference = database().ref('messages/' + id)

    // update votes property
    messageReference.update({
      votes: votes
    })
  }

  function deleteMessage(id) {
    // find message whose objectId is equal to the id we're searching with
    var messageReference = database().ref('messages/' + id)

    messageReference.remove()
  }
  
  return {
    getFanMessages: getFanMessages
  }
  
})();
