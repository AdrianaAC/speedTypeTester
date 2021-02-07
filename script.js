const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

//Add random strings to be tested
let stringArray = ["We have to go back!", "Oh. My. God!", "Bazinga", "Friends don't lie", 
"Don't let what he wants eclipse what you need, he's very dreamy, but he's not the sun. You are.",
"I am the danger", "You have failed this city!", "I am the one who knocks.", "Joey doesn't share food!", 
"Nobody asked you Patrice!", "Little pig, little pig ... let me in.", "Valar Morghulis.", "I demand a trial by combat!",
"Just have a little faith.", "Winter is coming.", "Easy peasy, lemon squeezy.", "So pick me, choose me, love me.", 
"May we meet again.", "How you doin'?", "They should've never given us uniforms if they didn’t want us to be an army.",
"Saving people, hunting things, the family business."];

function newQuote() {
randomQuote = stringArray[Math.floor(Math.random()*stringArray.length)];
document.getElementById("randomText").innerHTML = randomQuote;
return randomQuote;
}

//Variables we'll need
var timer = [0,0,0,0];
var interval;
var timerRunning = false;
newQuote();

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer
function runTimer() {
    let currentTime = leadingZero(timer[0])+ ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;
    timer[0] = Math.floor(((timer[3])/100)/60);
    timer[1] = Math.floor((timer[3])/100) - (timer[0]*60);
    timer[2] = Math.floor(timer[3]- (timer[1]*100) - (timer[0] *60000));
}


// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = randomQuote.substring(0, textEntered.length);

    if(textEntered == randomQuote) {
        clearInterval(interval);
        testWrapper.style.borderColor = "green"; //green
    } else {
        if(textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3"; //blue
        } else {
            testWrapper.style.borderColor = "#E95D0F"; //orange
        }
    }

    console.log("text entered: " + textEntered);
}




// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    console.log("Text entered length:" + textEnteredLength);
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// Reset everything:
function reset() {
    clearInterval(interval);
    newQuote();
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    console.log("clicking the reset button");
}



// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click",reset, false);




