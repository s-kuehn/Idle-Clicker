'use strict';

const html = document.querySelector('html');
const body = document.querySelector('body');

const balloon = document.querySelector('.balloon');
const scoreDisplay = document.querySelector('.score');
const shopListings = document.querySelectorAll('.shop-listing');

const stars = document.querySelector('#stars-img');

const upgradeCost = document.querySelectorAll('.value');
const shopContainer = document.querySelector('.shop-container');

let score = 0;
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
            shopListings[0].childNodes[1].textContent = `+${incrementAmt * 2} every pop!`;
            // scoreUpdater = setInterval(incrementScore, 500);
            break;

        // Add more auto poppers
        case 1:
            console.log('Auto increment by 1 each second!');
            if (autoIncrementAmt === 0) {
                autoIncrementAmt += 1
            } else {
                autoIncrementAmt = autoIncrementAmt + Math.ceil(autoIncrementAmt * 1.1);
            }
            shopListings[1].childNodes[1].textContent = `+${Math.ceil(autoIncrementAmt * 1.1)} auto poppers!`;
            shopListings[1].childNodes[7].innerHTML = `| ${autoIncrementAmt}`
            // shopListings[1].childNodes[5].childNodes[1].innerHTML = `${autoIncrementAmt}`
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

            function calcNextSubSpeed() {
                const speedDecreaseRate = autoIncrementSpeed * 1.1;
                return Math.ceil(speedDecreaseRate - autoIncrementSpeed);
            }

            autoIncrementSpeed -= calcNextSubSpeed();
            scoreUpdater = setInterval(incrementScore, autoIncrementSpeed);
            console.log(autoIncrementSpeed)
            shopListings[3].childNodes[1].textContent = `-${calcNextSubSpeed()}ms speed up auto pop rate!`;
            // }
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

        if (score >= shopItemPrice * .75) {
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


    const elemCostOriginal = elem.childNodes[3].childNodes[1].textContent;

    elem.addEventListener('click', () => {

        // Upgrade cost
        const elemCost = elem.childNodes[3].childNodes[1].textContent;
        const elemAmt = elem.childNodes[5].childNodes[1].textContent;

        console.log('Hello World!', i);
        console.log(elemCost, elemAmt)
        if (score >= Number(elemCost)) {
            score -= Number(elemCost);

            // Calculate new upgrade price
            elem.childNodes[3].childNodes[1].innerHTML = `${Math.ceil(elemCostOriginal * (1.1) ** (elemAmt+1)) + ((elemAmt+5)*15)}`;

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


setInterval(() => {
    body.classList.toggle('night-sky');
    stars.classList.toggle('night-stars');

    if (body.classList.contains('night-sky')) {
        console.log('Night!');
    } else {
        console.log('Day!');
    }
}, 60000);


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