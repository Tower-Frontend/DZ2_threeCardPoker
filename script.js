let shuffled;
let remaining;
let money = 1000;

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
        cards[i].value=Number(cards[i].value);
    }
    
    cards.sort(function(a, b){return Number(a.value) - Number(b.value)});
    card1 = cards[0];// по хорошему это все переписать но пока отлаживаю оставлю
    card2 = cards[1];
    card3 = cards[2];
    // стрит флеш
    if (((Number(card1.value) == Number(card2.value)-1 ) && (Number(card2.value)== Number(card3.value)-1)) ||
    ((Number(card1.value) == 2) && (Number(card2.value) == 3) && (Number(card3.value) == 14))
    && ((card1.suit == card2.suit) && (card2.suit == card3.suit))){
        return [5,"Стрит флеш"];
    }
    // тройка 
    if ((Number(card1.value) == Number(card2.value)) && (Number(card2.value) == Number(card3.value))){
        return [4,"Тройка"];
    }
    // стрит
    if (((Number(card1.value) == (Number(card2.value) + 1)) && (Number(card2.value) == (Number(card3.value) + 1 ))) ||
    ((Number(card1.value) == 2) && (Number(card2.value) == 3) && (Number(card3.value) == 14))){
        return [3,"Стрит"];
    }
    // флеш
    if ((card1.suit == card2.suit) && (card2.suit == card3.suit)){
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


            const myComboBlockText = document.querySelector(".cards_info");
            let myCombo = comboCheck(threeMyDeck.cards[0],threeMyDeck.cards[1],threeMyDeck.cards[2]);
            myComboBlockText.innerText = myCombo[1];

    const form = document.querySelector(".form_play");

    const handleSubmit = (event) => {
        event.preventDefault();
        const parent = event.currentTarget;

        const dealerCards = document.querySelector(".dealer_cards");
        fetch(`https://www.deckofcardsapi.com/api/deck/${myDeckId}/draw/?count=3`)
        .then(response => response.json())
        .then(treeDealerCards => {

            document.getElementById("dealer_card0").src=`${treeDealerCards.cards[0].image}`;
            document.getElementById("dealer_card1").src=`${treeDealerCards.cards[1].image}`;
            document.getElementById("dealer_card2").src=`${treeDealerCards.cards[2].image}`;

            const dealerComboBlockText = document.querySelector(".dealer_cards_info");
            let dealerCombo = comboCheck(treeDealerCards.cards[0],treeDealerCards.cards[1],treeDealerCards.cards[2]);
            dealerComboBlockText.innerText = dealerCombo[1];
            
            let massage = parseInt(parent.querySelector(".money").value);
            if (myCombo[0] > dealerCombo[0])
            {
                money = money + massage;
                alert("Победа");
            } else if (myCombo < dealerCombo) {
                money = money - massage;
                alert("Проигрыш");
            } else {

                myHightCard = Math.max(Number(threeMyDeck.cards[0].value),Number(threeMyDeck.cards[1].value),Number(threeMyDeck.cards[2].value));
                dealerHightCard = Math.max(Number(treeDealerCards.cards[0].value),Number(treeDealerCards.cards[1].value),Number(treeDealerCards.cards[2].value));

                if (myHightCard > dealerHightCard){
                    money = money + massage;
                    alert("Победа");
                } else if(myHightCard < dealerHightCard){
                    money = money - massage;
                    alert("Проигрыш");
                }
                else{
                    money = money;
                    alert("Ничья");
                }
            }
            const moneyBlock = document.querySelector(".count");
            moneyBlock.innerText = money;
        }).catch(error => console.error(error));
    }

    form.addEventListener("submit", handleSubmit);

    }).catch(error => console.error(error));
}).catch(error => console.error(error));



