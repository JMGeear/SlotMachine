//varibles
var stage: createjs.Stage;
var loadGame;
var game: createjs.Container;
var slotMachineImage: createjs.Bitmap;
var Reel1Image: createjs.Bitmap;
var Reel2Image: createjs.Bitmap;
var Reel3Image: createjs.Bitmap;
var JackPotLabel: createjs.Text;
var creditsLabel: createjs.Text;
var paidLabel: createjs.Text;
var BetLabel: createjs.Text

var Jackpot: number = 20000;
var credits: number = 1000;
var Bet: number = 0;
var Winner: number = 0;

var SpinButton: createjs.Bitmap;
var SpinDisable: createjs.Bitmap;

var turn: number = 0;
var winnings: number = 0;
var winNum: number = 0;
var lossNum: number = 0;
var spinResult;
var instruments: string = "";
var winRatio: number = 0;

var violin: number = 0;
var snare: number = 0;
var piano: number = 0;
var keyboard: number = 0;
var bass: number = 0;
var bongos: number = 0;
var guitar: number = 0;
var tuba: number = 0;

// Preload files
function preload() {
    loadGame = new createjs.LoadQueue(true);
    loadGame.installPlugin(createjs.Sound);
    loadGame.addEventListener("complete", init);
    loadGame.loadManifest([
        { id: "slotmachine", src: "img/slotmachine.jpg" },
        { id: "blank", src: "img/blank.png" },
        { id: "tuba", src: "img/tuba.png" },
        { id: "spin", src: "img/spin.png" },
        { id: "resetbutton", src: "img/reset.png" },
        { id: "powerbutton", src: "img/powerbutton.png" },
        { id: "spinbutton", src: "img/spin.png" },
        { id: "spindisabled", src: "img/spin_disabled.png" },
        { id: "bet10", src: "img/bet10.png" },
        { id: "bet25", src: "img/bet25.png" },
        { id: "bet50", src: "img/bet50.png" },
        { id: "violin", src: "img/violin.png" },
        { id: "snare", src: "img/snare.png" },
        { id: "piano", src: "img/piano.png" },
        { id: "keyboard", src: "img/keyboard.png" },
        { id: "bass", src: "img/bass.png" },
        { id: "bongos", src: "img/bongos.png" },
        { id: "guitar", src: "img/guitar.png" },
        { id: "buzzer", src: "sounds/Buzzer.mp3" },
        { id: "casino", src: "sounds/casino_ambience.mp3" },
        { id: "coin", src: "sounds/coin.mp3" },
        { id: "jackpot", src: "sounds/jackpot.mp3" },
        { id: "loser", src: "sounds/loser.mp3" },
        { id: "win", src: "sounds/win.mp3" },
        { id: "spin", src: "sounds/spin.mp3" }
    ]);

}

function init(): void {
    stage = new createjs.Stage(document.getElementById('canvas'));
    stage.enableMouseOver(20);
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);
    start();
}

function handleTick(e): void {
    if (Bet > 0) {
        SpinButton.visible = true;
        SpinDisable.visible = false;
    }
    stage.update();
}

function start(): void {
    drawSlotMachine();
    createjs.Sound.play('casino', createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);

}

function drawReels(Reel1: string, Reel2: string, Reel3: string): void {
    // Draw Reels
    Reel1Image = new createjs.Bitmap(loadGame.getResult(Reel1));
    Reel1Image.x = 140;
    Reel1Image.y = 401;
    game.addChild(Reel1Image);

    Reel2Image = new createjs.Bitmap(loadGame.getResult(Reel2));
    Reel2Image.x = 301;
    Reel2Image.y = 401;
    game.addChild(Reel2Image);

    Reel3Image = new createjs.Bitmap(loadGame.getResult(Reel3));
    Reel3Image.x = 463;
    Reel3Image.y = 401;
    game.addChild(Reel3Image);

}

function drawSlotMachine(): void {
    // Declare new Container
    game = new createjs.Container();


    // Draw Slot Machine image
    slotMachineImage = new createjs.Bitmap(loadGame.getResult('slotmachine'));
    game.addChild(slotMachineImage);

    // define blank image path and call drawReels function
    drawReels('blank', 'blank', 'blank');

    // Display Jackpot, Total Credits, Winner Paid and Bet Labels
    JackPotLabel = new createjs.Text(Jackpot.toString(), "30px Consolas", "#FF0000");
    JackPotLabel.x = 190;
    JackPotLabel.y = 228;
    JackPotLabel.textAlign = "right";
    game.addChild(JackPotLabel);

    creditsLabel = new createjs.Text(credits.toString(), "30px Consolas", "#FF0000");
    creditsLabel.x = 320;
    creditsLabel.y = 228;
    creditsLabel.textAlign = "right";
    game.addChild(creditsLabel);

    BetLabel = new createjs.Text(Bet.toString(), "30px Consolas", "#FF0000");
    BetLabel.x = 441;
    BetLabel.y = 228;
    BetLabel.textAlign = "right";
    game.addChild(BetLabel);

    paidLabel = new createjs.Text(Winner.toString(), "30px Consolas", "#FF0000");
    paidLabel.x = 580;
    paidLabel.y = 228;
    paidLabel.textAlign = "right";
    game.addChild(paidLabel);

    // Display Reset button
    var ResetButton = new createjs.Bitmap(loadGame.getResult('resetbutton'));
    ResetButton.x = 59;
    ResetButton.y = 14;
    ResetButton.cursor = "pointer";
    game.addChild(ResetButton);
    ResetButton.addEventListener("click", ResetButtonClick);
    ResetButton.addEventListener("mouseover", function (event: MouseEvent) {
        ResetButton.alpha = 0.5;
    });
    ResetButton.addEventListener("mouseout", function (event: MouseEvent) {
        ResetButton.alpha = 1.0;
    });

    // Display Power button
    var PowerButton = new createjs.Bitmap(loadGame.getResult('powerbutton'));
    PowerButton.x = 568;
    PowerButton.y = 14;
    PowerButton.cursor = "pointer";
    game.addChild(PowerButton);
    PowerButton.addEventListener("click", PowerButtonClick);
    PowerButton.addEventListener("mouseover", function (event: MouseEvent) {
        PowerButton.alpha = 0.5;
    });
    PowerButton.addEventListener("mouseout", function (event: MouseEvent) {
        PowerButton.alpha = 1.0;
    });

    // Display Spin button
    SpinButton = new createjs.Bitmap(loadGame.getResult('spinbutton'));
    SpinDisable = new createjs.Bitmap(loadGame.getResult('spindisabled'));
    SpinButton.x = 467;
    SpinButton.y = 686;
    SpinButton.cursor = "pointer";
    SpinButton.visible = false;
    SpinDisable.x = 467;
    SpinDisable.y = 686;
    SpinDisable.visible = true;
    SpinDisable.cursor = "not-allowed";

    game.addChild(SpinDisable);
    game.addChild(SpinButton);
    SpinButton.addEventListener("click", SpinButtonClick);
    SpinButton.addEventListener("mouseover", function (event: MouseEvent) {
        SpinButton.alpha = 0.5;
    });
    SpinButton.addEventListener("mouseout", function (event: MouseEvent) {
        SpinButton.alpha = 1;
    });

    // Display Bet Buttons
    var Bet10Button = new createjs.Bitmap(loadGame.getResult('bet10'));
    Bet10Button.x = 50;
    Bet10Button.y = 686;
    Bet10Button.cursor = "pointer";
    game.addChild(Bet10Button);
    Bet10Button.addEventListener("click", function () {
        Bet = 10;
        BetLabel.text = "10";
        createjs.Sound.play('coin');
    });
    Bet10Button.addEventListener("mouseover", function (event: MouseEvent) {
        Bet10Button.alpha = 0.5;
    });
    Bet10Button.addEventListener("mouseout", function (event: MouseEvent) {
        Bet10Button.alpha = 1.0;
    });
    var Bet25Button = new createjs.Bitmap(loadGame.getResult('bet25'));
    Bet25Button.x = 189;
    Bet25Button.y = 686;
    Bet25Button.cursor = "pointer";
    game.addChild(Bet25Button);
    Bet25Button.addEventListener("click", function () {
        Bet = 25;
        BetLabel.text = "25";
        createjs.Sound.play('coin');
    });
    Bet25Button.addEventListener("mouseover", function (event: MouseEvent) {
        Bet25Button.alpha = 0.5;
    });
    Bet25Button.addEventListener("mouseout", function (event: MouseEvent) {
        Bet25Button.alpha = 1.0;
    });

    var Bet50Button = new createjs.Bitmap(loadGame.getResult('bet50'));
    Bet50Button.x = 328;
    Bet50Button.y = 686;
    Bet50Button.cursor = "pointer";
    game.addChild(Bet50Button);
    Bet50Button.addEventListener("click", function () {
        Bet = 50;
        BetLabel.text = "50";
        createjs.Sound.play('coin');
    });
    Bet50Button.addEventListener("mouseover", function (event: MouseEvent) {
        Bet50Button.alpha = 0.5;
    });
    Bet50Button.addEventListener("mouseout", function (event: MouseEvent) {
        Bet50Button.alpha = 1.0;
    });

    stage.addChild(game);
}

function ResetButtonClick(event: MouseEvent): void {

    if (confirm("The Reset Button was Pressed \n \nAre you Sure?")) {
        ResetAll();
    }
}

function PowerButtonClick(event: MouseEvent): void {
    if (confirm("Power Off Game? \n \nAre you Sure?")) {
        window.close();
    }
}

function ResetAll(): void {
    // reset game variables
    Jackpot = 20000;
    JackPotLabel.text = "20000";
    credits = 1000;
    creditsLabel.text = "1000";
    Bet = 0;
    BetLabel.text = "0";
    Winner = 0;
    paidLabel.text = "0";

    // reset player stats
    turn = 0;
    winNum = 0;
    lossNum = 0;
    winRatio = 0;
    winnings = 0;

    //reset spin button
    SpinButton.visible = false;
    SpinDisable.visible = true;
}

function showPlayerStats() {
    winRatio = winNum / turn;
}

function resetTally() {
    violin = 0;
    snare = 0;
    piano = 0;
    keyboard = 0;
    bass = 0;
    bongos = 0;
    guitar = 0;
    tuba = 0;
}

function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 100 + 1);
    var jackPotWin = Math.floor(Math.random() * 100 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + Jackpot + " Jackpot!!");
        credits += Jackpot;
        creditsLabel.text = credits.toString();
        Jackpot = 1000;
        JackPotLabel.text = Jackpot.toString();
        createjs.Sound.play('jackpot');
    }
}

function showWinMessage(): void {
    credits += winnings;
    creditsLabel.text = credits.toString();
    Winner = winnings;
    paidLabel.text = Winner.toString();
    resetTally();
    createjs.Sound.play('win');
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage(): void {
    credits -= Bet;
    creditsLabel.text = credits.toString();
    resetTally();
    Jackpot += Bet;
    JackPotLabel.text = Jackpot.toString();
    paidLabel.text = "0";
}

function checkRange(value: number, lowerBounds: number, upperBounds: number): any {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return false;
    }
}

function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "tuba";
                tuba++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "violin";
                violin++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "snare";
                snare++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "piano";
                piano++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "keyboard";
                keyboard++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "bass";
                bass++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "bongos";
                bongos++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "guitar";
                guitar++;
                break;
        }
    }
    return betLine;
}

function determineWinnings() {
    if (tuba == 0) {
        if (violin == 3) {
            winnings = Bet * 10;
        }
        else if (snare == 3) {
            winnings = Bet * 20;
        }
        else if (piano == 3) {
            winnings = Bet * 30;
        }
        else if (keyboard == 3) {
            winnings = Bet * 40;
        }
        else if (bass == 3) {
            winnings = Bet * 50;
        }
        else if (bongos == 3) {
            winnings = Bet * 75;
        }
        else if (guitar == 3) {
            winnings = Bet * 100;
        }
        else if (violin == 2) {
            winnings = Bet * 2;
        }
        else if (snare == 2) {
            winnings = Bet * 2;
        }
        else if (piano == 2) {
            winnings = Bet * 3;
        }
        else if (keyboard == 2) {
            winnings = Bet * 4;
        }
        else if (bass == 2) {
            winnings = Bet * 5;
        }
        else if (bongos == 2) {
            winnings = Bet * 10;
        }
        else if (guitar == 2) {
            winnings = Bet * 20;
        }
        else {
            winnings = Bet * 1;
        }
        if (guitar == 1) {
            winnings = Bet * 5;
        }
        winNum++;
        showWinMessage();
    }
    else {
        lossNum++;
        showLossMessage();
    }

}

function SpinButtonClick(event: MouseEvent): void {
    if (credits == 0) {
        createjs.Sound.play('loser');
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            ResetAll();
            showPlayerStats();
        }
    }
    else if (Bet > credits) {
        createjs.Sound.play('buzzer');
        alert("You don't have enough Money to place that bet.");
    }
    else if (Bet <= credits) {
        createjs.Sound.play('spin');
        setTimeout(function () {
            spinResult = Reels();
            drawReels(spinResult[0], spinResult[1], spinResult[2]);
            determineWinnings();
            turn++;
            showPlayerStats();
        }, 3000);
    }
}

function onResize() {
    // browser viewport size
    var currentWidth = window.innerWidth;
    var currentHeight = window.innerHeight;

    // stage dimensions
    var originalWidth = 825; // your stage width
    var originalHeight = 1024; // your stage height

    // keep aspect ratio
    var scale = Math.min(currentWidth / originalWidth, currentHeight / originalHeight);
    stage.scaleX = scale;
    stage.scaleY = scale;

    // adjust canvas size
    stage.canvas.width = originalWidth * scale;
    stage.canvas.height = originalHeight * scale;

    // update the stage
    stage.update()
}

window.onresize = function () {
    onResize();
}

