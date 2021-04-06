
    document.addEventListener('DOMContentLoaded',function (){
      const cardSpace = document.createElement('div');
      cardSpace.classList.add('container')
      document.body.append(cardSpace);

      
      // Создание формы для записи количества карт
      function createForm () {
         const form = document.createElement('form');
         const input = document.createElement('input');
         input.classList.add('form__input')
         const formButton = document.createElement('button');
         formButton.classList.add('form__btn')
         formButton.textContent = 'Введите чётноё число от 2 до 10'
         form.append(formButton);
         form.append(input);
         cardSpace.append(form);

         return {
            form,
            input,
            formButton,
         }

      }

      

     let cards = [];

     let timer;

   //   Создание массива карт

   function createCards () {
      const createStartForm = createForm ();
      
    createStartForm.form.addEventListener('submit', function createArrayCard (e) {
      e.preventDefault();
      let cards1 = [];
      let cards2 = [];
      let cardsArray = createStartForm.input.value;

       if ((cardsArray != undefined) && (2 <= cardsArray ) && (cardsArray <= 10) && ((cardsArray % 2) === 0)){
          cards1 = Array.apply(null, {length: Math.pow(cardsArray, 2) / 2}).map(Number.call, Number);
          cards2 = cards1;
          cards = cards1.concat(cards2)
          while(cardSpace.firstChild){
             cardSpace.removeChild(cardSpace.firstChild)
          }
          addCardsNomber ()
          timerOn ()
       }       
        else {
          createStartForm.input.value = 4;
          return;  
       }
      console.log(cards)
   })
   }
   createCards ()




    

   //   Таймер

   function timerOn () {
      if (timer) {
       clearInterval(timer);
       timer = undefined;
    }  
 
       let divTimerExample = 60;
       timer = setInterval(() => {
          divTimerExample--;
          console.log(divTimerExample);
          if (divTimerExample <= 0){
             while(cardSpace.firstChild){
                cardSpace.removeChild(cardSpace.firstChild);
             }
                newGame ();
                clearInterval(timer);
          }
       }, 1000);
    }



// Создать карту

     
     function createcard (){
        const card = document.createElement('button');
        card.classList.add('card');
        cardSpace.append(card);
        return {
            card, 
        }
     }

   //   Добаавить карту с цифрой на поле 


     function addCardsNomber (){
         let shuffledArr = cards.sort(function(){
            return Math.random() - 0.5;
         });
         for(let i = 0; i<shuffledArr.length;i++){
         const getCard = createcard();
         getCard.card.textContent = shuffledArr[i];
         cardSpace.append(getCard.card);
         getCard.card.classList.add('d-none');
         getCard.card.setAttribute('id', i);
         }

         if (cardSpace.hasChildNodes()) {
            const children = cardSpace.childNodes;

            let cardIn = [];
            let cardArrayAll = [];
            for (let i = 0; i < children.length; ++i) {
               children[i].addEventListener('click', function findEl (e){
                  let id = e.target.id;
                  document.getElementById(id).classList.add('open')
                  if (document.getElementById(id).classList.contains('open')){
                     document.getElementById(id).setAttribute('disabled', 'true');
                  }

                  let findObj = {};
                  findObj.id = id;
                  findObj.cardNomber = children[i].textContent;
                  cardIn.push(findObj);
                  console.log(cardIn)

                  if (cardIn.length > 1) {
                     let obj0 = cardIn[0];
                     let obj1 = cardIn[1];
                     if (obj0.cardNomber === obj1.cardNomber){
                        cardIn = []
                        console.log('para');
                        cardArrayAll.push(obj0)
                        cardArrayAll.push(obj1)
                           if(cardArrayAll.length === children.length){
                              console.log('Fin');
                              cardSpace.append(newGame().buttonNewGame);
                           }
                     }


                     if ((obj0.cardNomber !== obj1.cardNomber) && cardIn[2]) {
                        document.getElementById(obj0.id).removeAttribute('disabled', 'true');
                        document.getElementById(obj1.id).removeAttribute('disabled', 'true');
                        document.getElementById(obj0.id).classList.remove('open');
                        document.getElementById(obj1.id).classList.remove('open');
                        cardIn.splice(cardIn,2)
                     }
                  } 
               })  
               

            }
         }
     }

    
  
   //   Создать кнопку Новоя игра

      function newGame() {
         const buttonNewGame = document.createElement('button');
         buttonNewGame.classList.add('buttonNewGame')
         buttonNewGame.textContent = 'Сыграть еще раз?';
         cardSpace.append(buttonNewGame);

 
      
         buttonNewGame.addEventListener('click', function newGame () {
               while(cardSpace.firstChild){
                  cardSpace.removeChild(cardSpace.firstChild)
               }
               createCards ()
         })
         return {buttonNewGame}
      }
      
   




    })

