const html = document.querySelector('html');

const balloon = document.querySelector('.balloon');

// const button = document.querySelector('button');
const scoreDisplay = document.querySelector('.score');
const shopListings = document.querySelectorAll('.shop-listing');
// const upgradeBuyBtn = document.querySelectorAll('.buy-btn');
// const upgradeBuyBtn = document.querySelectorAll('.buy-btn');

const upgradeCost = document.querySelectorAll('.value');
const shopContainer = document.querySelector('.shop-container');

let score = 1000;
let incrementAmt = 1;
let autoIncrementAmt = 0;
let luckUpgradePercent = 0;
let autoIncrementSpeed = 1000;

scoreDisplay.textContent = `Score: ${score}`

updateShopListings()

// Update score
let scoreUpdater = setInterval(incrementScore, autoIncrementSpeed);


function applyUpgrades(upgradeNum) {
    switch (upgradeNum) {

        // Add more points per click
        case 0:
            // Increase increment amount exponentially
            incrementAmt *= 2;
            // Update amount per click
            shopListings[0].childNodes[1].textContent = `+${incrementAmt * 2} every click!`;
            // scoreUpdater = setInterval(incrementScore, 500);
            break;

        // Add more auto poppers
        case 1:
            console.log('Auto increment by 1 each second!');
            autoIncrementAmt += 1;
            // scoreUpdater = setInterval(incrementScore, 250);
            break;
            
        // 10% chance of double points on click
        case 2:
            console.log('Plus three each click!');
            if (luckUpgradePercent < 0.96) {
                if (luckUpgradePercent === 0) {
                    luckUpgradePercent = 0.10;
                } else {
                    luckUpgradePercent += 0.05;
                }
                shopListings[2].childNodes[1].textContent = `${Math.round((luckUpgradePercent + 0.05)*100)}% chance of double points when popping!`;
            }
            break;
        
        // Cut interval rate in half
        case 3:
            // console.log('Auto increment by 2 each second!');
            // autoIncrementAmt = 2;
            autoIncrementSpeed /= 2
            scoreUpdater = setInterval(incrementScore, autoIncrementSpeed);
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

        if (score < shopItemPrice && !elem.classList.contains('hide')) {
            elem.classList.add('line-through');
        } else {
            elem.classList.remove('line-through');
        }

    });
}

shopListings.forEach( (elem, i) => {

    // Upgrade listing
    // const elemListing = elem.parentNode;

    const elemCostOriginal = elem.childNodes[3].childNodes[1].textContent;

    elem.addEventListener('click', () => {

        // Upgrade cost
        const elemCost = elem.childNodes[3].childNodes[1].textContent;
        const elemAmt = elem.childNodes[5].childNodes[1].textContent;

        console.log('Hello World!', i);
        console.log(elemCost)
        if (score >= Number(elemCost)) {
            score -= Number(elemCost);

            // Calculate new upgrade price
            elem.childNodes[3].childNodes[1].innerHTML = `${Math.ceil(elemCostOriginal * (1.1) ** (elemAmt+1)) + ((elemAmt+5)*10)}`;

            // Update number of upgrades purchased
            elem.childNodes[5].childNodes[1].innerHTML = `${Number(elemAmt) + 1}`

            // console.log(elemCost)
            scoreDisplay.textContent = `Score: ${score}`
            elem.classList.add('line-through');
            // elem.childNodes[3].classList.add('hide');
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
    if (randInt < luckUpgradePercent) {
        console.log('DOUBLE SCORE!!!')
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