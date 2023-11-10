let shuffled;
let remaining;
let money = 1000;

    // let response = await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1").then(res=>res).catch(err=>err);
    // let data = await response.json();
    // myDeckId = data.deck_id;

    // console.log(myDeckId)

    // async function AJAX(url, requestMethod, requestPayload = {}) {
    //     let request;
    //     if (requestMethod.toLowerCase() !== 'get' && requestMethod.toLowerCase() !== 'head') {
    //     request = new Request(url, {
    //     headers: {
    //     'Content-Type': 'application/json; charset=UTF-8',
    //     },
    //     credentials: 'include',
    //     body: JSON.stringify(requestPayload),
    //     method: requestMethod,
    //     });
    //     } else {
    //     request = new Request(url, {
    //     headers: {
    //     'Content-Type': 'application/json; charset=UTF-8',
    //     },
    //     credentials: 'include',
    //     method: requestMethod,
    //     });
    //     }
        
    //     return fetch(request);
    //     }

// myDeckIdTake().then(myDeckId => {
//     myDeckId; // полученный список фильмов
// })

// console.log(myDeckId);

// async function myDeckIdTake() {
//     let response = await fetch(`https://www.deckofcardsapi.com/api/deck/${myDeckId}/draw/?count=3`);
//     let data = await response.json();
//     myDeckId = data.deck_id;
//     return 1;
//   }

let comboCheck = function(card1, card2, card3) {

    let cards = [card1,card2,card3];

    for(let i = 0;i<cards.length;i++)
    {
        if (cards[i].value =="JACK" ){
            cards[i].value = "11"
        } else if (cards[i].value =="QUEEN" ){
            cards[i].value = "12"
        } else if (cards[i].value =="KING" ){
            cards[i].value = "13"
        }else if (cards[i].value =="ACE" ){
            cards[i].value = "14"
        }

        card[i].value=Number(card[i].value);
    }

    cards.sort(function(a, b){return a - b});

    //стрит флеш
    if (((Number(card1.value) == Number(card2.value)+1 == Number(card3.value)+2) || ((Number(card1.value) == 2) && (Number(card2.value) == 3) && (Number(card3.value) == 14))) 
    && (card1.suit == card1.suit == card1.suit))
    {
        return [5,"Стрит флеш"];
    }
    //тройка
    if (Number(card1.value) == Number(card2.value) == Number(card3.value))
    {
        return [4,"Тройка"];
    }
    // стрит
    if ((Number(card1.value) == Number(card2.value)+1 == Number(card3.value)+2) || ((Number(card1.value) == 2) && (Number(card2.value) == 3) && (Number(card3.value) == 14)))
    {
        return [3,"Стрит"];
    }
    // флеш
    if (card1.suit == card1.suit == card1.suit)
    {
        return [2,"Флеш"];
    }
    // пара
    if ((Number(card1.value) == Number(card2.value)) || (Number(card2.value) == Number(card3.value)) || (Number(card1.value) == Number(card3.value))){
        return [1,"Пара"];
    }
    // старшая карта
    return [0,"Старшая карты"];
  };


fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(response => response.json())
    .then(data => {

    let myDeckId = data.deck_id;

    fetch(`https://www.deckofcardsapi.com/api/deck/${myDeckId}/draw/?count=3`)
        .then(response => response.json())
        .then(threeMyDeck => {


             
            document.getElementById("card0").src=`${threeMyDeck.cards[0].image}`;
            document.getElementById("card1").src=`${threeMyDeck.cards[1].image}`;
            document.getElementById("card2").src=`${threeMyDeck.cards[2].image}`;



    const form = document.querySelector(".form_play");

    const handleSubmit = (event) => {
        event.preventDefault();
        const parent = event.currentTarget;

        let massage = parseInt(parent.querySelector(".money").value);
        money = money - massage;
        const moneyBlock = document.querySelector(".count");
        moneyBlock.innerText = money;
        const dealerCards = document.querySelector(".dealer_cards");
        fetch(`https://www.deckofcardsapi.com/api/deck/${myDeckId}/draw/?count=3`)
        .then(response => response.json())
        .then(treeDealerCards => {

            document.getElementById("dealer_card0").src=`${treeDealerCards.cards[0].image}`;
            document.getElementById("dealer_card1").src=`${treeDealerCards.cards[1].image}`;
            document.getElementById("dealer_card2").src=`${treeDealerCards.cards[2].image}`;





        }).catch(error => console.error(error));
    }

    form.addEventListener("submit", handleSubmit);

    }).catch(error => console.error(error));

}).catch(error => console.error(error));



