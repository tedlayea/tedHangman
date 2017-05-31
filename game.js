// AM: I encourage you to think about you could organize this game into an object(s) or class(es).
$(document).ready(function (){
var player=$("section form input #playerName").val();
var submitButton=$("#submitButton")
submitButton.on("click",gamePage)

var alphabet=[
  {letter:"A", image:"img/a.png"},{letter:"B",image:"img/b.png"},{letter:"C",image:"img/c.png"},
  {letter:"D", image:"img/d.png"},{letter:"E",image:"img/e.png"},{letter:"F",image:"img/f.png"},
  {letter:"G", image:"img/g.png"},{letter:"H",image:"img/h.png"},{letter:"I",image:"img/i.png"},
  {letter:"J", image:"img/j.png"},{letter:"K",image:"img/k.png"},{letter:"L",image:"img/l.png"},
  {letter:"M", image:"img/m.png"},{letter:"N",image:"img/n.png"},{letter:"O",image:"img/o.png"},
  {letter:"P", image:"img/p.png"},{letter:"Q",image:"img/q.png"},{letter:"R",image:"img/r.png"},
  {letter:"S", image:"img/s.png"},{letter:"T",image:"img/t.png"},{letter:"U",image:"img/u.png"},
  {letter:"V", image:"img/v.png"},{letter:"W",image:"img/w.png"},{letter:"X",image:"img/x.png"},
  {letter:"Y", image:"img/y.png"},{letter:"Z",image:"img/z.png"}
]
var question =[{questioni:"img/StatueOfLiberty.jpg",answeri:"18" ,answerNote:"*tatueOfLiberty (1875)\n New York City(USA)"},
{questioni:"img/tajMahalIndia.png",answeri:"19",answerNote:"*aj Mahal (1632)\n Agra(India)"},
{questioni:"img/axsum.jpg",answeri:"0",answerNote:"*xum (4th century A.D)\n Axum(Ethiopia)"},
{questioni:"img/rioDeJanerio.png",answeri:"2",answerNote:"*hrist the Redeemer  (1922)\n Rio de Janeiro(Brazil)"},
{questioni:"img/colosseum.png",answeri:"2",answerNote:"*olosseum (70 AD)\n Rome(Italy)"},
{questioni:"img/generalAssembly.png",answeri:"6",answerNote:"*eneral Assembly (1875)\n DC(USA)"}
]
function gamePage(){
  // AM: Perhaps you could incorporate some of the below code into your HTML and, if you don't want it to be visible on page load, just set its initial CSS display value to `none`.
  // AM: This is a good strategy for HTML that will not change as the user interacts with the application.
  // AM: Plus, your Javascript ends up being more concise and clean!
  //Hang
  $("section").html("")
  var hangmanImage=$('<img >')
  hangmanImage.attr('src','img/hangman.png')
  hangmanImage.attr('alt',"hangman")
  hangmanImage.attr('id',"hangman")
  hangmanImage.appendTo('body')

  //Man
  var man=$('<img >')
  man.attr('src','img/man.png')
  man.attr('alt',"man")
  man.attr('id',"man")
  man.appendTo('body')

  //Question image displayed
  var imageDisplay=$('<img >')
  imageDisplay.attr('src','img/frame.png')
  imageDisplay.attr('alt',"display")
  imageDisplay.attr('id',"display")
  imageDisplay.appendTo('body')

  //Answer Board
  var answerBoard=$('<div class="answer">\n Looking for Hint?\n Click Me!!!</div>')
  answerBoard.attr('id',"answer")
  answerBoard.appendTo('body')

  //Scorebord
  var scoreBoard=$('<div class="score">Your score:</div>')
  scoreBoard.attr('id',"score")
  scoreBoard.appendTo('body')
  //To create keyboard
  createKeybord()
}
function createKeybord(){
  // AM: Make sure to remove `console.log` statements from your final submission. You can keep these in a separate "debugging" branch if you want.
  // AM: You should assume that potential employers will be looking at this code after WDI!
  console.log("keyboard created");
  for (i=0;i<alphabet.length;i++)
  {
    var letter=$('<img >')    //Equivalent: $(document.createElement('img'))
    letter.attr('src',alphabet[i].image)
    letter.attr('id',i)
    letter.appendTo('footer')
  }
  allQuestions(questionNumber)
}
// AM: Encourage you to use `let` and `const` wherever possible.
//To ask question
var questionNumber=0;
var wrongAnswer=0;

function allQuestions(questionNumber){
  if (questionNumber<question.length){
    console.log(player);
    $("#display").attr('src',question[questionNumber].questioni)
    //Checking Answer and next question
    $("footer img").on("click",function(){
      console.log("Checking answer")
      $("#answer").on("click",checkingAnswer)
      function checkingAnswer(){
        $("#answer").text(question[questionNumber].answerNote)
        setTimeout(function(){
          $("#answer").text("Looking for Hint")
        },5000);
      }
      if(this.id==question[questionNumber].answeri){
        console.log("Id:"+this.id)
        console.log("Correct")
        $("#man").attr('src','img/man.png').animate({'left':35}).animate({'top':40})  // AM: This is a fun feature!
        $(".score").text("Your score:"+(parseInt(questionNumber)+1)+"/6")
        wrongAnswer=0;
        questionNumber++
        allQuestions(questionNumber)
      }
      else {
        console.log("Id:"+this.id)
        console.log("InCorrect")
        wrongAnswer=wrongAnswer+1
        // AM: The below `.animate` commands look pretty similar, with the exception of the numerical values being passed into the methods.
        // AM: Perhaps you could define a function that you could call in the below conditional statements, making sure to pass in the numerical values as arguments.
        // AM: That way your code looks less repetitive.
        if(wrongAnswer===1){
          console.log("wrong"+wrongAnswer);
          // $("#hangman").animate({'left':80})
          $("#man").attr('src','img/man.png').animate({'left':-100}).animate({'top':-10}).animate({'left':-200}).animate({'top':-20}).animate({'left':-250}).animate({'top':-40})
        }
        if (wrongAnswer==3)
        {
          console.log("wrong"+wrongAnswer);
          $("#man").attr('src','img/man.png').animate({'top':-65}).animate({'left':-300}).animate({'top':-70}).animate({'left':-350}).animate({'top':-80}).animate({'left':-410})
        }
        if (wrongAnswer==5){
          console.log("wrong"+wrongAnswer);
          $("#man").attr('src','img/man.png').animate({'top':-120}).animate({'top':-100}).animate({'top':-120}).animate({'top':-100}).animate({'top':-120}).animate({'top':-100})
        }
        allQuestions(questionNumber)
      }

      })
  }
  else {
    restart = prompt("          Congradualtion, you won!!! \n If you want to resart the game, press 1, to exit press 2.")
    if(restart==1){
      questionNumber=0
      allQuestions(questionNumber)
      // AM: See my note below and how it might pertain to starting the game over.
    }
    else if(restart==2){
      // alert("Close");
      window.close();
      // AM: Instead of closing the window, think about how you could modify the page to reflect the end state of your application.
      // AM: What in the DOM needs to be hidden/shown? What data values need to be reset?
    }
    else{
      alert("Please Enter either 1 or 2 only!!!");
    }
  }


}

})
