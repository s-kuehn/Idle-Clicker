const button = document.querySelector('button');
const scoreDisplay = document.querySelector('.score');
const shopListing = document.querySelector('.shop-listing');
const upgradeBuyBtn = document.querySelector('.buy-btn');
const upgradeCost = document.querySelector('.value');
const shopContainer = document.querySelector('.shop-container');

let score = 110;
let autoIncrementAmt = 2;
let AutoIncrementing = false;

scoreDisplay.textContent = `Score: ${score}`

AutoIncrementing = true;



// if (score >= shopContainer[i].price) {
//     null
// }



function incrementScore(amount) {
    score += Number(amount);
    scoreDisplay.textContent = `Score: ${score}`;
}

const shopItems = document.querySelectorAll('.shop-listing');

for (let i = 0; i < shopItems.length; i++) {

    const shopItemPrice = shopItems[i].querySelector('.value').textContent;

    console.log(shopItemPrice);

    if (score >= shopItemPrice * .25) {
        // shop
    }

}




upgradeBuyBtn.addEventListener('click', () => {
    if (score >= Number(upgradeCost.textContent)) {
        shopListing.classList.add('hide');
    }
})


if (AutoIncrementing) {
    setInterval(incrementScore, 1000, [autoIncrementAmt]);
}

button.addEventListener('click', () => {
    scoreDisplay.textContent = `Score: ${score += 1}`
})