
//       Getting all the buttons
const startbutton = document.querySelector('.start-btn') ;
const exitbutton = document.querySelector('.exit-btn') ;
const continuebutton = document.querySelector('.continue-btn') ;
const nextbutton = document.querySelector('.next-button') ;
const tryagainbutton = document.querySelector('.try-again-btn') ;
const gotohomebutton = document.querySelector('.goto-home-btn') ;

//     Getting   Sections of Quiz App
const mainsection = document.querySelector('.main') ;
const guidlinessection = document.querySelector('.guidlines-container') ;
const quizsection = document.querySelector('.quiz-container') ;
const resultsection = document.querySelector('.result-section') ;

const question = document.querySelector('.question') ;
const option = document.querySelectorAll('.option') ;
const questioncount = document.getElementById('q-count') ;
const totalscore = document.querySelector('.score') ;

//        Start button event listener
startbutton.addEventListener('click',()=>{
    mainsection.style.display = 'none' ;
    guidlinessection.style.display='block' ; 
})

//         Exit button event listener
exitbutton.addEventListener('click',()=>{
    mainsection.style.display='block' ;
    guidlinessection.style.display='none' ;
})

let qcount = 0 ;
let score = 0 ;

//        continue button event listener
continuebutton.addEventListener('click',()=>{
    guidlinessection.style.display='none' ;
    quizsection.style.display = 'block' ;
    showQuestions(qcount) ;
})

//      next button event listener
nextbutton.addEventListener('click',()=>{

   if(qcount < questions.length - 1)
   {
    qcount++ ;
    showQuestions(qcount) ;

    // before option selection next cannot be selected
       nextbutton.classList.remove('next-btn-active') ;
   }
   else
   {
    showresults() ;
   }
   
})

//       Show questions function

function showQuestions(index)
{
   question.textContent = `${questions[index].numb}.${questions[index].question}` ;
   questioncount.textContent = `${index+1} of ${questions.length}` ;
    
   option[0].textContent = `${questions[index].options[0]}`;
   option[1].textContent = `${questions[index].options[1]}`;
   option[2].textContent = `${questions[index].options[2]}`;
   option[3].textContent = `${questions[index].options[3]}` ;

     for(let i=0 ; i<option.length ; i++)
     {
        for(let i=0 ; i<option.length ; i++)
       {
        option[i].classList.remove('correct', 'incorrect'); 
        option[i].style.pointerEvents = 'auto' ;
        option[i].setAttribute('onclick' ,'Selectedoption(this)') ;
       }
            
     }
}

//     Show  total score of quiz
function showscore(score)
{
    totalscore.textContent = `${score} / ${questions.length}` ;
}

// selected option function

function Selectedoption(Soption)
{
   
     if(Soption.textContent == `${questions[qcount].answer}`)
     {
        Soption.classList.add('correct') ;
        score++ ;
        showscore(score) ;
     }
     else
     {
        Soption.classList.add('incorrect') ;

        // now we have to show the correct answer in case of wrong answer

        option.forEach((opt)=>{
            if(opt.textContent == `${questions[qcount].answer}`)
            {
                opt.classList.add('correct') ;
            }
            opt.style.pointerEvents = 'none' ;
        })
     }

    //  if one is selected then the other option cannot be select

      option.forEach((opt)=>{
        opt.style.pointerEvents = 'none' ;
      })

    //   now next button can be selected after option selected
     
    nextbutton.classList.add('next-btn-active') ;   
}


//    show results functions

function showresults()
{
    quizsection.style.display = 'none' ;
    resultsection.style.display = 'block' ;

    //  update the final score 

    const finalscore = document.querySelector('.score-text') ;
    finalscore.textContent = `Your total score is ${score} out of ${questions.length}` ;

    //    circular show of results
       let performancevalue = document.querySelector('.performance-value') ;
       let circularperformance = document.querySelector('.circular-performance') ;

       let performancestartvalue = -1 ;
       let performanceendvalue = (score/ `${questions.length}`)* 100 ;
       let speedjump = 100 / (`${questions.length}`) ;

        let progress = setInterval(() => {
            performancestartvalue++ ;
            performancevalue.textContent = `${performancestartvalue}%` ;
            circularperformance.style.background = `conic-gradient(dodgerblue ${performancestartvalue*3.7}deg,rgba(255, 255 , 255, 0.1)0deg)`;
             
            if(performancestartvalue == performanceendvalue)
            {
                clearInterval(progress) ;
            }
        }, speedjump);
      
}

// restart the quiz 
tryagainbutton.style.pointerEvents = 'auto' ;
tryagainbutton.addEventListener('click',()=>{
    resultsection.style.display = 'none' ;
    quizsection.style.display = 'block' ;
    score = 0 ;
    qcount = 0 ;
    showQuestions(qcount) ;
    showscore(score) ;
})

// go to home section 
gotohomebutton.style.pointerEvents = 'auto' ;
gotohomebutton.addEventListener('click',()=>{
     resultsection.style.display = 'none' ;
     mainsection.style.display = 'block' ;
     score = 0 ;
    qcount = 0 ;
    showQuestions(qcount) ;
    showscore(score) ;
})

//   nav menu for small screen 

const menulist = document.getElementById('menu-list') ;

function openMenu()
{
      menulist.style.right='0px' ;
}

function closeMenu()
{
     menulist.style.right='-200px' ;
}