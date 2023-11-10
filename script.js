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
    // if ((card1.suit == card2.suit == card3.suit)||())




    return 1;
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



