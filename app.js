const html = document.querySelector('html');

const balloon = document.querySelector('.balloon');

// const button = document.querySelector('button');
const scoreDisplay = document.querySelector('.score');
const shopListings = document.querySelectorAll('.shop-listing');
// const upgradeBuyBtn = document.querySelectorAll('.buy-btn');
// const upgradeBuyBtn = document.querySelectorAll('.buy-btn');

const upgradeCost = document.querySelectorAll('.value');
const shopContainer = document.querySelector('.shop-container');

let score = 0;
let incrementAmt = 1;
let autoIncrementAmt = 0;
let luckUpgrade = false;

scoreDisplay.textContent = `Score: ${score}`

updateShopListings()

// Update score
let scoreUpdater = setInterval(incrementScore, 1000);


function applyUpgrades(upgradeNum) {
    switch (upgradeNum) {
        case 0:
            console.log('Plus two each click!');
            incrementAmt = 2;
            scoreUpdater = setInterval(incrementScore, 500);
            break;
        case 1:
            console.log('Auto increment by 1 each second!');
            autoIncrementAmt = 1;
            scoreUpdater = setInterval(incrementScore, 250);
            break;
        case 2:
            console.log('Plus three each click!');
            incrementAmt = 3;
            break;
        case 3:
            console.log('Auto increment by 2 each second!');
            autoIncrementAmt = 2;
            scoreUpdater = setInterval(incrementScore, 125);
            break;
        case 4:
            console.log('10% chance to double your click score!')
            luckUpgrade = true;
        case 5:
            console.log('Plus five each click!');
            incrementAmt = 5;
            break;
        case 6:
            console.log('Auto increment by 3 each second!');
            autoIncrementAmt = 3;
            break;
        case 7:
            console.log('Plus eight each click!');
            incrementAmt = 8;
            break;
        case 8:
            console.log('Auto increment by five each second!');
            autoIncrementAmt = 5;
            break;
        case 9:
            console.log('Plus thirteen each click!');
            incrementAmt = 13;
            break;
    }
}

function incrementScore() {
    score += Number(autoIncrementAmt);
    scoreDisplay.textContent = `Score: ${score}`;
    updateShopListings();
}

function updateShopListings() {
    const shopItems = document.querySelectorAll('.shop-listing');

    shopItems.forEach( (elem) => {
        const shopItemPrice = elem.querySelector('.value').textContent;

        // console.log(shopItemPrice);

        if (score <= shopItemPrice * .75 && !elem.classList.contains('line-through')) {
            elem.classList.add('hide');
        } else {
            elem.classList.remove('hide');
        }

    });
}

shopListings.forEach( (elem, i) => {

    // Upgrade cost
    const elemCost = elem.childNodes[3].childNodes[1].textContent;

    // Upgrade listing
    // const elemListing = elem.parentNode;

    elem.addEventListener('click', () => {
        console.log('Hello World!', i);
        if (score >= Number(elemCost)) {
            score -= Number(elemCost);
            scoreDisplay.textContent = `Score: ${score}`
            elem.classList.add('line-through');
            elem.childNodes[3].classList.add('hide');
            // elem.remove();

            applyUpgrades(i);

        }
    });
});




// upgradeBuyBtn.forEach( (elem, i) => {

//     // Upgrade cost
//     const elemCost = elem.parentNode.childNodes[3].childNodes[1].textContent;

//     // Upgrade listing
//     const elemListing = elem.parentNode;

//     elem.addEventListener('click', () => {
//         console.log('Hello World!', i);
//         if (score >= Number(elemCost)) {
//             score -= Number(elemCost);
//             scoreDisplay.textContent = `Score: ${score}`
//             elemListing.classList.add('line-through');
//             elem.parentNode.childNodes[3].classList.add('hide');
//             elem.remove();

//             applyUpgrades(i);

//         }
//     });
// });


// upgradeBuyBtn.addEventListener('click', () => {
//     console.log('test!!!');
//     if (score >= Number(upgradeCost.textContent)) {
//         shopListing.classList.add('hide');
//     }
// });

// setInterval(incrementScore, 1000, [autoIncrementAmt]);

balloon.addEventListener('click', () => {
    balloon.classList.add('balloon-popped');
    
    function balloonPop() {
        balloon.classList.remove('balloon-popped')
    }

    setTimeout(balloonPop,50);

    const randInt = Math.random();
    console.log(randInt);
    if (luckUpgrade && randInt < 0.10) {
        html.classList.add('double-score');
        const doubleInc = incrementAmt * 2
        scoreDisplay.textContent = `Score: ${score += doubleInc}`;
    } else {
        html.classList.remove('double-score');
        scoreDisplay.textContent = `Score: ${score += incrementAmt}`
    }
    updateShopListings();

});

// button.addEventListener('click', () => {
//     null;
// });