let canvas = document.getElementById('sprite');
let context = canvas.getContext('2d');
let speed = 0;
//Adding images ----------------------------------------------------------------------------------------------------------------------------------------
const frontSprite = new Image();
frontSprite.src ='assets/spriteFrente.png';
const backSprite = new Image();
backSprite.src ='assets/spriteTras.png';
const rightSprite = new Image();
rightSprite.src ='assets/spriteDireita.png';
const leftSprite = new Image();
leftSprite.src ='assets/spriteEsquerda.png';
const planetImg = new Image();
planetImg.src = 'assets/planet.png';
const mercury = new Image();
mercury.src = 'assets/mercury.png';
const venus = new Image();
venus.src = 'assets/venus.png';
const earth = new Image();
earth.src = 'assets/earth.png';
const mars = new Image();
mars.src = 'assets/mars.png';
const jupiter = new Image();
jupiter.src = 'assets/jupiter.png';
const saturn = new Image();
saturn.src = 'assets/saturn.png';
const uranus = new Image();
uranus.src = 'assets/uranus.png';
const neptune = new Image();
neptune.src = 'assets/neptune.png';
const pluto = new Image();
pluto.src = 'assets/pluto.png';
const asteroid = new Image();
asteroid.src = 'assets/asteroid.png';
const twoChances = new Image();
twoChances.src = 'assets/2chances.png';
const oneChance = new Image();
oneChance.src = 'assets/1chances.png';
const noChances = new Image();
noChances.src = 'assets/0chances.png';

//Adding audios ----------------------------------------------------------------------------------------------------------------------------------------
const winSound = new Audio();
winSound.src = 'assets/win.mp3';
const failSound = new Audio();
failSound.src = 'assets/fail.mp3';
failSoundPlayed=false; // boolean variable so the failSound plays only once
const errorSound = new Audio();
errorSound.src = 'assets/error.mp3';
const correctSound = new Audio();
correctSound.src = 'assets/correct.mp3';
const gameMusic = new Audio();
gameMusic.src = 'assets/music.mp3';
gameMusic.volume = 0.1;
gameMusic.addEventListener('ended', function() { // when game music ends, it starts again
    gameMusic.currentTime = 0;
});

gameMusic.play();

const boy = { 
    positionX: 520,
    positionY: 230,
    imgWidth: 55.9,
    imgHeight: 70,
    speedx: 0,
    speedy: 0,
    frames: 0,
    maxFrames: 8,
    frameInterval: 4,
    currentBoyImage: frontSprite,

    draw() {
        context.drawImage( // Drawing boy image ----------------------------------------------------------------------------------------------------------------------------------------
            boy.currentBoyImage,
            boy.imgWidth * Math.floor(boy.frames), 0, 
            boy.imgWidth, boy.imgHeight,
            boy.positionX, boy.positionY,
            boy.imgWidth, boy.imgHeight
        );
        boy.frames += speed; // Increasing frames, boy walking animation rolling
        
        if (boy.frames >= boy.maxFrames) {
            boy.frames = 0; // Restarts frames when it reaches maximum
        }
        
        if (boy.frames >= 4) {
            boy.frames = 0;
        }

        if (boy.positionX + boy.speedx > -1 && boy.positionX + boy.speedx < canvas.width - boy.imgWidth) {
            boy.positionX += boy.speedx; // Setting limits - Boy won´t exceed canvas limit
        }

        if (boy.positionY + boy.speedy > -1 && boy.positionY + boy.speedy < canvas.height - boy.imgHeight) {
            boy.positionY += boy.speedy; // Setting limits -  Boy won´t exceed canvas limit
        }

        if (boy.frames % boy.frameInterval === 0) {
            boy.frames++;
        }
    },
    
}

const planet = { // Defining planets images atributes ----------------------------------------------------------------------------------------------------------------------------------------
    positionX: 480,
    positionY: 400,
    imgWidth: 136,
    imgHeight: 136,
    frames: 0
}
const planetSaturn = { // Saturn is an exception
    positionX: 480,
    positionY: 400,
    imgWidth: 136,
    imgHeight: 109,
    frames: 0
}


document.addEventListener('keydown', function(event) { // Implementing boy's walk according to keyboard keys ----------------------------------------------------------------------------------------------------------------------------------------
    switch(event.key) {
        case 'ArrowUp':
            speed = 0.15;
            boy.speedy = -6; // Move up (Y position reduces)
            boy.currentBoyImage = backSprite; // Updating current image
            break;
        case 'ArrowDown':
            speed = 0.15;
            boy.speedy = 6; // Moves down (Y position increases)
            boy.currentBoyImage = frontSprite; // Updating current image
            break;
        case 'ArrowLeft':
            speed = 0.15;
            boy.speedx = -6; // Move left (X position reduces)
            boy.currentBoyImage = leftSprite; // Updating current image
            break;
        case 'ArrowRight':
            speed = 0.15;
            boy.speedx = 6; // Moves right (X position increases)
            boy.currentBoyImage = rightSprite; // Updating current image
            break;
    }
});
        
document.addEventListener('keyup', function(event) {
    if(['ArrowUp', 'ArrowDown'].includes(event.key)) {
        boy.speedy = 0; // Stop vertical movement when releasing keys
        speed = 0
    }
    if(['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        boy.speedx = 0; // Stop horizontal movement when releasing keys
        speed = 0
    }
});

// starting the screen swap implementation ----------------------------------------------------------------------------------------------------------------------------------------
let certo = false;
let indice = 0;
class pages { //Class for pages - levels control
    constructor(){
        this.width = 0;
        this.height = 0;
    }
    draw(){ //drawing the planets according to their level 
        if(indice==0){ // beginning -----------------------------------------------------
            context.font = "42px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Do you know the order of the planets", 140, 90, 1000);
            context.fillText("in the solar system?", 310, 150);
            context.drawImage(
                planetImg,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX, planet.positionY,
                planet.imgWidth, planet.imgHeight
            )

        }else if(indice==1){ // level 1 -----------------------------------------------------
            context.font = "42px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("First planet", 405, 70, 1000);
            context.drawImage(
                mercury,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-370, planet.positionY-35,
                planet.imgWidth, planet.imgHeight
            )
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Mercury", 148, 520, 1000);
            context.drawImage(
                venus,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-370, planet.positionY-320,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText(" Venus ", 148, 235, 1000);
            context.drawImage(
                earth,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX+370, planet.positionY-320,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText(" Earth ", 888 , 235, 1000);
            context.drawImage(
                saturn,
                planetSaturn.imgWidth * Math.floor(planet.frames), 0, 
                planetSaturn.imgWidth, planetSaturn.imgHeight,
                planetSaturn.positionX+370, planetSaturn.positionY-20,
                planetSaturn.imgWidth, planetSaturn.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Saturn", 896 , 510, 1000);

        }else if(indice==2){  // level 2 -----------------------------------------------------
            context.font = "42px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Second planet", 400, 70, 1000);

            context.drawImage(
                pluto,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-370, planet.positionY-35,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText(" Pluto ", 147, 520, 1000);

            context.drawImage(
                uranus,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-370, planet.positionY-320,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Uranus ", 150, 235, 1000);

            context.drawImage(
                mars,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX+370, planet.positionY-320,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("  Mars  ", 885 , 235, 1000);

            context.drawImage(
                venus,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX+370, planet.positionY-35,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText(" Venus ", 889 , 522, 1000);

        }else if(indice==3){ // level 3 -----------------------------------------------------
            context.font = "42px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Third planet", 400, 70, 1000);

            context.drawImage(
                jupiter,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-370, planet.positionY-35,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Jupiter", 148, 520, 1000);

            context.drawImage(
                neptune,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-370, planet.positionY-320,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Neptune", 148, 235, 1000);

            context.drawImage(
                earth,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX+370, planet.positionY-320,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText(" Earth ", 888 , 235, 1000);

            context.drawImage(
                saturn,
                planetSaturn.imgWidth * Math.floor(planet.frames), 0, 
                planetSaturn.imgWidth, planetSaturn.imgHeight,
                planetSaturn.positionX+370, planetSaturn.positionY-20,
                planetSaturn.imgWidth, planetSaturn.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Saturn", 896 , 510, 1000);

        }else if(indice==4){ // level 4 -----------------------------------------------------
            context.font = "42px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Fourth planet", 400, 70, 1000);

            context.drawImage(
                uranus,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-370, planet.positionY-35,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Uranus", 150, 520, 1000);

            context.drawImage(
                mercury,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-370, planet.positionY-320,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Mercury", 148, 235, 1000);

            context.drawImage(
                mars,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX+370, planet.positionY-320,
                planet.imgWidth, planet.imgHeight
                
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText(" Mars  ", 892 , 235, 1000);

            context.drawImage(
                pluto,
                planetSaturn.imgWidth * Math.floor(planet.frames), 0, 
                planetSaturn.imgWidth, planetSaturn.imgHeight,
                planetSaturn.positionX+370, planetSaturn.positionY-35,
                planetSaturn.imgWidth, planetSaturn.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText(" Pluto ", 887 , 510, 1000);

        }else if(indice==5){ // level 5 -----------------------------------------------------
            context.font = "42px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Fifth planet", 400, 70, 1000);

            context.drawImage(
                neptune,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-370, planet.positionY-35,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Neptune", 150, 520, 1000);

            context.drawImage(
                jupiter,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-370, planet.positionY-320,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Jupiter", 148, 235, 1000);

            context.drawImage(
                saturn,
                planetSaturn.imgWidth * Math.floor(planet.frames), 0, 
                planetSaturn.imgWidth, planetSaturn.imgHeight,
                planetSaturn.positionX+370, planetSaturn.positionY-300,
                planetSaturn.imgWidth, planetSaturn.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Saturn", 896 , 224, 1000);

            context.drawImage(
                pluto,
                planetSaturn.imgWidth * Math.floor(planet.frames), 0, 
                planetSaturn.imgWidth, planetSaturn.imgHeight,
                planetSaturn.positionX+370, planetSaturn.positionY-35,
                planetSaturn.imgWidth, planetSaturn.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText(" Pluto ", 887 , 510, 1000);

        }else if(indice==6){ // level 6 -----------------------------------------------------
            context.font = "42px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Sixth planet", 400, 70, 1000);

            context.drawImage(
                saturn,
                planetSaturn.imgWidth * Math.floor(planet.frames), 0, 
                planetSaturn.imgWidth, planetSaturn.imgHeight,
                planetSaturn.positionX-370, planetSaturn.positionY,
                planetSaturn.imgWidth, planetSaturn.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Saturn", 150, 520, 1000);

            context.drawImage(
                mars,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-370, planet.positionY-320,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText(" Mars ", 152, 235, 1000);

            context.drawImage(
                venus,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX+370, planet.positionY-320,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText(" Venus ", 888 , 235, 1000);

            context.drawImage(
                uranus,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX+370, planet.positionY-35,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Uranus ", 892 , 520, 1000);

        }else if(indice==7){ // level 7 -----------------------------------------------------
            context.font = "42px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Seventh planet", 390, 70, 1000);

            context.drawImage(
                mercury,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-370, planet.positionY-35,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Mercury", 147, 520, 1000);

            context.drawImage(
                pluto,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-370, planet.positionY-320,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText(" Pluto ", 147.5, 225, 1000);

            context.drawImage(
                uranus,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX+370, planet.positionY-320,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Uranus", 892, 235, 1000);

            context.drawImage(
                earth,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX+370, planet.positionY-35,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText(" Earth ", 887, 520, 1000);

        }else if(indice==8){ // level 8 -----------------------------------------------------
            context.font = "42px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("eighth planet", 390, 70, 1000);

            context.drawImage(
                jupiter,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-370, planet.positionY-35,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Jupiter", 147, 520, 1000);

            context.drawImage(
                earth,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-370, planet.positionY-320,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText(" Earth ", 149, 238, 1000);

            context.drawImage(
                mars,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX+370, planet.positionY-320,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("  Mars  ", 885 , 235, 1000);

            context.drawImage(
                neptune,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX+370, planet.positionY-35,
                planet.imgWidth, planet.imgHeight
            );
            context.font = "16px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("Neptune", 887 , 522, 1000);

        }else if(indice==9){ // Winning page -----------------------------------------------------
            context.font = "58px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("You did it! Congratulations!", 110, 110, 1000);

            context.drawImage( // Drawing asteroid with 'Start again'
                asteroid,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-12, planet.positionY+8,
                planet.imgWidth+15, planet.imgHeight+15
            );
            context.font = "20px OCR A Std, monospace";
            context.fillStyle = 'white';
            context.fillText("Return to", 498, 475, 1000);
            context.fillText("beginning", 495, 500, 1000);

            context.drawImage( // Drawing planets on the left
                mercury,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-410, planet.positionY+30,
                planet.imgWidth-30, planet.imgHeight-30
            );
            context.drawImage(
                venus,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-340, planet.positionY+30,
                planet.imgWidth-30, planet.imgHeight-30
            );
            context.drawImage(
                earth,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-270, planet.positionY+30,
                planet.imgWidth-30, planet.imgHeight-30
            );
            context.drawImage(
                mars,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-200, planet.positionY+30,
                planet.imgWidth-30, planet.imgHeight-30
            );

            context.drawImage( //Drawing planets on the right
                neptune,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX+445, planet.positionY+30,
                planet.imgWidth-30, planet.imgHeight-30
            );
            context.drawImage( //Drawing planets on the right
                uranus,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX+375, planet.positionY+30,
                planet.imgWidth-30, planet.imgHeight-30
            );
            context.drawImage( //Drawing planets on the right
                saturn,
                planetSaturn.imgWidth * Math.floor(planet.frames), 0, 
                planetSaturn.imgWidth, planetSaturn.imgHeight,
                planetSaturn.positionX+260, planetSaturn.positionY+10,
                planetSaturn.imgWidth+60, planetSaturn.imgHeight+60
            );
            context.drawImage( //Drawing planets on the right
                jupiter,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX+235, planet.positionY+30,
                planet.imgWidth-30, planet.imgHeight-30
            );

        }else if(indice==10){ // Failing page -----------------------------------------------------

            context.font = "42px OCR A Std, monospace";
            context.fillStyle = 'whitesmoke';
            context.fillText("You Failed!", 420, 100, 1000);
            context.fillText("But that's fine. Try again!", 230, 170, 1000);

            context.drawImage( // Drawing asteroid with 'Start again'
                asteroid,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX-12, planet.positionY+8,
                planet.imgWidth+15, planet.imgHeight+15
            );
            context.font = "25px OCR A Std, monospace";
            context.fillStyle = 'white';
            context.fillText("Start", 514, 475, 1000);
            context.fillText("again", 514, 500, 1000);
            
        };
    }
    update(){ // update function, for the game to continue swapping --------------------------------------------------------------------------------------------
        this.draw();
        if(indice==0){ // This conditions allow the boy to choose one of the planets, and then changes de page according to their indices
            if(Math.abs(boy.positionX - 520) < 50 && Math.abs(boy.positionY - 430) < 5){
                indice = 1;
                boy.positionX=520;
                boy.positionY=250;
            } 
        }else if(indice==1){
            if((Math.abs(boy.positionX - 145) < 35 && Math.abs(boy.positionY - 115) < 35)||(Math.abs(boy.positionX - 148) < 35 && Math.abs(boy.positionY - 400) < 35)||(Math.abs(boy.positionX - 895) < 35 && Math.abs(boy.positionY - 403) < 35)||(Math.abs(boy.positionX - 889) < 35 && Math.abs(boy.positionY - 111) < 35)){
                if((Math.abs(boy.positionX - 148) < 35 && Math.abs(boy.positionY - 400) < 35)){
                    certo = true;
                }
                if(certo){
                    correctSound.currentTime = 0;
                    correctSound.play();
                    indice = 2;
                }else{
                    errorSound.play();
                    chances--;
                }
                boy.positionX=520;
                boy.positionY=250;
            }
            certo=false;
        }else if(indice==2){
            if((Math.abs(boy.positionX - 145) < 35 && Math.abs(boy.positionY - 115) < 35)||(Math.abs(boy.positionX - 148) < 35 && Math.abs(boy.positionY - 400) < 35)||(Math.abs(boy.positionX - 895) < 35 && Math.abs(boy.positionY - 403) < 35)||(Math.abs(boy.positionX - 889) < 35 && Math.abs(boy.positionY - 111) < 35)){
                if((Math.abs(boy.positionX - 895) < 35 && Math.abs(boy.positionY - 405) < 35)){
                    certo = true;
                }
                if(certo){
                    correctSound.currentTime = 0;
                    correctSound.play();
                    indice = 3;
                }else{
                    errorSound.play();
                    chances--;
                }
                boy.positionX=520;
                boy.positionY=250;
            }
        }else if(indice==3){
            if((Math.abs(boy.positionX - 145) < 35 && Math.abs(boy.positionY - 115) < 35)||(Math.abs(boy.positionX - 148) < 35 && Math.abs(boy.positionY - 400) < 35)||(Math.abs(boy.positionX - 895) < 35 && Math.abs(boy.positionY - 403) < 35)||(Math.abs(boy.positionX - 889) < 35 && Math.abs(boy.positionY - 111) < 35)){
                if((Math.abs(boy.positionX - 889) < 35 && Math.abs(boy.positionY - 111) < 35)){
                    certo = true;
                }
                if(certo){
                    correctSound.currentTime = 0;
                    correctSound.play();
                    indice = 4;
                }else{
                    errorSound.play();
                    chances--;
                }
                boy.positionX=520;
                boy.positionY=250;
            }
            certo=false;
        }else if(indice==4){
            if((Math.abs(boy.positionX - 145) < 35 && Math.abs(boy.positionY - 115) < 35)||(Math.abs(boy.positionX - 148) < 35 && Math.abs(boy.positionY - 400) < 35)||(Math.abs(boy.positionX - 895) < 35 && Math.abs(boy.positionY - 403) < 35)||(Math.abs(boy.positionX - 889) < 35 && Math.abs(boy.positionY - 111) < 35)){
                if((Math.abs(boy.positionX - 889) < 35 && Math.abs(boy.positionY - 111) < 35)){
                    certo = true;
                }
                if(certo){
                    correctSound.currentTime = 0;
                    correctSound.play();
                    indice = 5;
                }else{
                    errorSound.play();
                    chances--;
                }
                boy.positionX=520;
                boy.positionY=250;
            }
            certo=false;
        }else if(indice==5){
            if((Math.abs(boy.positionX - 145) < 35 && Math.abs(boy.positionY - 115) < 35)||(Math.abs(boy.positionX - 148) < 35 && Math.abs(boy.positionY - 400) < 35)||(Math.abs(boy.positionX - 895) < 35 && Math.abs(boy.positionY - 403) < 35)||(Math.abs(boy.positionX - 889) < 35 && Math.abs(boy.positionY - 111) < 35)){
                if((Math.abs(boy.positionX - 145) < 35 && Math.abs(boy.positionY - 115) < 35)){
                    certo = true;
                }
                if(certo){
                    correctSound.currentTime = 0;
                    correctSound.play();
                    indice = 6;
                }else{
                    errorSound.play();
                    chances--;
                }
                boy.positionX=520;
                boy.positionY=250;
            }
            certo=false;
        }else if(indice==6){
            if((Math.abs(boy.positionX - 145) < 35 && Math.abs(boy.positionY - 115) < 35)||(Math.abs(boy.positionX - 148) < 35 && Math.abs(boy.positionY - 400) < 35)||(Math.abs(boy.positionX - 895) < 35 && Math.abs(boy.positionY - 403) < 35)||(Math.abs(boy.positionX - 889) < 35 && Math.abs(boy.positionY - 111) < 35)){
                if((Math.abs(boy.positionX - 148) < 35 && Math.abs(boy.positionY - 400) < 35)){
                    certo = true;
                }
                if(certo){
                    correctSound.currentTime = 0;
                    correctSound.play();
                    indice = 7;
                }else{
                    errorSound.play();
                    chances--;
                }
                boy.positionX=520;
                boy.positionY=250;
            }
            certo=false;
        }else if(indice==7){
            if((Math.abs(boy.positionX - 145) < 35 && Math.abs(boy.positionY - 115) < 35)||(Math.abs(boy.positionX - 148) < 35 && Math.abs(boy.positionY - 400) < 35)||(Math.abs(boy.positionX - 895) < 35 && Math.abs(boy.positionY - 403) < 35)||(Math.abs(boy.positionX - 889) < 35 && Math.abs(boy.positionY - 111) < 35)){
                if((Math.abs(boy.positionX - 889) < 35 && Math.abs(boy.positionY - 111) < 35)){
                    certo = true;
                }
                if(certo){
                    correctSound.currentTime = 0;
                    correctSound.play();
                    indice = 8;
                }else{
                    errorSound.play();
                    chances--;
                }
                boy.positionX=520;
                boy.positionY=250;
            }
            certo=false;
        }else if(indice==8){
            if((Math.abs(boy.positionX - 145) < 35 && Math.abs(boy.positionY - 115) < 35)||(Math.abs(boy.positionX - 148) < 35 && Math.abs(boy.positionY - 400) < 35)||(Math.abs(boy.positionX - 895) < 35 && Math.abs(boy.positionY - 403) < 35)||(Math.abs(boy.positionX - 889) < 35 && Math.abs(boy.positionY - 111) < 35)){
                if((Math.abs(boy.positionX - 895) < 35 && Math.abs(boy.positionY - 403) < 35)){
                    certo = true;
                }
                if(certo){
                    winSound.currentTime = 0;
                    winSound.play();
                    indice = 9;
                }else{
                    errorSound.play();
                    chances--;
                }
                boy.positionX=520;
                boy.positionY=250;
            }
            certo=false;
        }else if(indice==9){
            if((Math.abs(boy.positionX - 520) < 35 && Math.abs(boy.positionY - 445) < 35)){
                reiniciaJogo();
                boy.positionX=520;
                boy.positionY=250;
            }
        }else if(indice==10){
            if((Math.abs(boy.positionX - 520) < 35 && Math.abs(boy.positionY - 445) < 35)){
                reiniciaJogo();
                boy.positionX=520;
                boy.positionY=250;
            }
        }
    }
}
// starting the panel lives swap implementation ----------------------------------------------------------------------------------------------------------------------------------------
let chances = 3;
class chance { // class for chances - chances control
    constructor(){
        this.width = 0;
        this.height = 0;
    }
    draw(){ // Drawing the chances panel
        if(chances==3){
            context.drawImage( 
                twoChances,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX+16, planet.positionY+80,
                planet.imgWidth-40, planet.imgHeight-40
            );
        }else if(chances==2){
            context.drawImage( 
                oneChance,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX+16, planet.positionY+80,
                planet.imgWidth-40, planet.imgHeight-40
            );
        }else if(chances==1){
            context.drawImage( 
                noChances,
                planet.imgWidth * Math.floor(planet.frames), 0, 
                planet.imgWidth, planet.imgHeight,
                planet.positionX+16, planet.positionY+80,
                planet.imgWidth-40, planet.imgHeight-40
            );
        }
    };
    update(){ // Update function, so the lives panel change when the player chooses wrong
        if((indice!=10)&&(indice!=9)&&(indice!=0)){ // chances panel does not appear when the winning, failing or initial page is on screen
            this.draw();
        }
        if(chances<1){ // making sure the failing page appears when player chooses wrong three times
            indice=10;
        }
    }
}

p = new pages();
c = new chance();
function loop() { //Function that loops the drawings and rect clearing ----------------------------------------------------------------------------------------------
    context.clearRect(0, 0, canvas.width, canvas.height);
    p.update();
    c.update();
    boy.draw();
    requestAnimationFrame(loop);

    if(indice==10&&!failSoundPlayed){ // if failSound has been played, it won't play again
        failSound.play()
        failSoundPlayed=true;
    }
}

function reiniciaJogo(){ //Function that restarts the game and initializes what it has to ----------------------------------------------------------------------------------------------
    indice = 0;
    failSoundPlayed = false;
    chances=3;
}

loop();