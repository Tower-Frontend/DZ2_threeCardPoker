let my_deck_id;
let shuffled;
let remaining;
let money = 1000;


fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1").then(res => res.json()).then(data => {
    my_deck_id = data.deck_id;
}).catch(error => console.error(error));

fetch(`https://www.deckofcardsapi.com/api/deck/new/draw/?count=3`)
    .then(response => response.json())
    .then(data => {
        my_deck_id = data.deck_id;
        message = console.log(`"success": ${data.success}, "deck_id": "${data.deck_id}","remaining": ${data.remaining}, card : ${data.cards[0].image}`);
        document.getElementById("card0").src=`${data.cards[0].image}`;
        document.getElementById("card1").src=`${data.cards[1].image}`;
        document.getElementById("card2").src=`${data.cards[2].image}`;
    }).catch(error => console.error(error));




    const form = document.querySelector(".form_play");
    const handleSubmit = (event) => {
        event.preventDefault();
        const parent = event.currentTarget;
    
        let massage = parseInt(parent.querySelector(".money").value);
        money = money - massage;
        const moneyBlock = document.querySelector(".count");
        moneyBlock.innerText = money;

        const dealerCards = document.querySelector(".dealer_cards");
        dealerCards.style.display = "none";

        fetch(`https://www.deckofcardsapi.com/api/deck/new/draw/?count=3`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("dealer_card0").src=`${data.cards[0].image}`;
            document.getElementById("dealer_card1").src=`${data.cards[1].image}`;
            document.getElementById("dealer_card2").src=`${data.cards[2].image}`;
        }).catch(error => console.error(error));
    }
    
    form.addEventListener("submit", handleSubmit);



