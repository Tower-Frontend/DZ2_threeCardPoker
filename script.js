let remaining;
let money = 1000;
let deckId = null;
let myCombo;
let myCards;

/* Вот это '@enum' называется JSDoc. Может пригодится для документации */
/* Теперь редактор кода сможет подсвечиать твой enum */
/* 
/** @enum */
const cardsTitles = {
    "JACK": "JACK",
    "QUEEN": "QUEEN",
    "KING": "KING",
    "ACE": "ACE"
}

/* Вот кстати интересный момент
Можно оставить 3 аргумента
А можно ожидать массив, в котором будет больше 3-х элементов
В общем случае это предпочтительнее, вдруг захотим иметь больше разных комбинаций */
function comboCheck (/*Array*/cards) {

    // let cards = [card1,card2,card3];

    /* Написано без пробелов, как будто по C-шному. Может я не прав, но подумал так :) */
    for(let i = 0; i<cards.length; i++)
    {
        /* Иногда элемент полезно доставать */
        /* Иногда это когда? Когда он занимает много места. В будущем это может встретиться */
        const card = cards[i];

        /* В случае с перечислением ENUM, switch-case нам очень поможет. Но тут кому что нравится. */
        /* Здесь можешь наблюдать зачем нужен ENUM - как и тип, я могу передать это в другой файл и доставать не просто
        стороки, а обращаться непосредственно к значениям, соответствующим карточкам */
        /* Без ENUM-а можно обойтись в данном случае... Потому что итак строки на строки, хотя хз, для типизации может лучше, душный коммент */
        let cardValue = card.value;
        switch (cardValue) {
            case cardsTitles.JACK:
                cardValue = "11";
                break;
            case cardsTitles.QUEEN:
                cardValue = "12";
                break;
            case cardsTitles.KING:
                cardValue = "13";
                break;
            case cardsTitles.ACE:
                cardValue = "14";
                break;
        }
        /* Вариант 2 */
        /** @enum */
        // const cardsValues = {
        //     "JACK": "11",
        //     "QUEEN": "12",
        //     "KING": "13",
        //     "ACE": "14"
        // }
        // cardValue = cardsValues[card.value];

        if (!parseInt(cardValue)) {
            console.warn("Card not found...");
        }

        cards[i].value = Number(cardValue);
    }
    
    cards.sort(function(a, b){return Number(a.data) - Number(b.data)});
    
    /* Смотри, мы работаем с массивом. Даже не смотря на то, что я заменил кол-во аргументов функции на 1 и это массив */
    /* До этого мы работали с элементами массива, а это объекты. Объекты хранятся по ссылкам, поэтому в цикле выше ты работал
    с одной областью памяти, где лежат объекты. Мы меняем то, что уже лежит в нашем. Наедюсь понятно объяснил */
    /* То есть это делать по просту бессмысленно */
    // card1 = cards[0];
    // card2 = cards[1];
    // card3 = cards[2];

    /* Нет, я не просто так наехал. Теперь я достаю то, что уже изменилось */
    const [card1, card2, card3] = cards;

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
    if (((Number(card1.value) == (Number(card2.value) - 1)) && (Number(card2.value) == (Number(card3.value) - 1 ))) ||
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

function shuffleDeck() {
  return fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(response => response.json())
    .then(data => {
      deckId = data.deck_id;
      remainingCards = data.remaining;
    })
    .catch(error => console.error(error));
}

function checkMoney(money,bet){
    if (money < 1){
        alert("Вы проиграли");
        return true;
    }
    if(bet>money){
        alert("У вас нет столько денег");
        return true;
    }
    return false;
}

function checkResoult(myCombo,dealerCombo,parent,threeMyDeck,treeDealerCards){
    let massage = parseInt(parent.querySelector(".money").value);

    /* TODO Может тут сделать проверку на false?) Ну типа, если не проверено. А не наоборот, как здесь, если true вернулся... */
    if (checkMoney(money,massage)){
        return;
    }

    if (myCombo[0] > dealerCombo[0])
    {
        money = money + massage;
        alert("Победа");
    } else if (myCombo < dealerCombo) {
        money = money - massage;
        alert("Проигрыш");
    } else {

        /* TODO Возможно тут уже можно не приводить типы, вроде приведено на этот момент. Но на всякий случай может можно... */
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
}

function startWork() {
    if (deckId === null || remainingCards === 0) {
        shuffleDeck().then(() => startWork());
      } else if (remainingCards > 0) {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`)
        .then(response => response.json())
        .then(threeMyDeck => {

            myCards = threeMyDeck;
            document.getElementById("card0").src=`${threeMyDeck.cards[0].image}`;
            document.getElementById("card1").src=`${threeMyDeck.cards[1].image}`;
            document.getElementById("card2").src=`${threeMyDeck.cards[2].image}`;


            const myComboBlockText = document.querySelector(".cards_info");
            myCombo = comboCheck(threeMyDeck.cards);
            myComboBlockText.innerText = myCombo[1];
        }).catch(error => console.error(error));
  }
}

const handleSubmit = (event) => {
    event.preventDefault();
    const parent = event.currentTarget;

    const dealerCards = document.querySelector(".dealer_cards");

    // shuffleDeck().then(() => startWork())
    // .then(() => fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`))
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`)
    .then(response => response.json())
    .then(treeDealerCards => {

        document.getElementById("dealer_card0").src=`${treeDealerCards.cards[0].image}`;
        document.getElementById("dealer_card1").src=`${treeDealerCards.cards[1].image}`;
        document.getElementById("dealer_card2").src=`${treeDealerCards.cards[2].image}`;

        const dealerComboBlockText = document.querySelector(".dealer_cards_info");
        let dealerCombo = comboCheck(treeDealerCards.cards);
        dealerComboBlockText.innerText = dealerCombo[1];
        checkResoult(myCombo,dealerCombo,parent,myCards,treeDealerCards);
    })
    .catch(error => console.error(error));
    /* TODO А зачем тут ещё раз это вызывается? Может не нужно? */
    shuffleDeck().then(() => startWork());
}

const form = document.querySelector(".form_play");
form.addEventListener("submit", handleSubmit);

startWork();