/* PARALLAX BACKGROUND */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = window.innerWidth;
const CANVAS_HEIGHT = canvas.height = window.innerHeight;
let gameSpeed = 10;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'img-parallax/1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'img-parallax/2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'img-parallax/3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'img-parallax/4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'img-parallax/5.png';

class Layer {
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update(){
        this.speed = gameSpeed * this.speedModifier;
        if(this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        if(this.x2 <= -this.width){
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw()
    {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}
 
const layer1 = new Layer(backgroundLayer1, 0.01);
const layer2 = new Layer(backgroundLayer2, 0.1);
const layer3 = new Layer(backgroundLayer3, 0.18);
const layer4 = new Layer(backgroundLayer4, 0.3);
const layer5 = new Layer(backgroundLayer5, 0.7);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    }
    );
    requestAnimationFrame(animate);
};
animate();

/* EXIT BUTTON */
const exitButton = document.getElementById('exitButton');
exitButton.addEventListener('click', () => {
  window.close();
});

/* AUDIO BUTTON */
const audio = document.getElementById("myAudio");
const myMusic = document.getElementById("myMusic");


let isClicked = false;
  
myMusic.addEventListener("click", function() {
  isClicked = !isClicked;
  
  if (isClicked) {
    myMusic.innerHTML = '<i class="fa-sharp fa-solid fa-volume-xmark"></i>';
  } else {
    myMusic.innerHTML = '<i class="fa-sharp fa-solid fa-volume-high"></i>';
  }
});

myMusic.addEventListener("click", function() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

/* TUTORIAL BUTTON */
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

nextBtn.addEventListener('click', ()=> {
    if (counter >= carouselImages.length -1) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out"
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

});

prevBtn.addEventListener('click', ()=> {
    if (counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out"
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
 
});

carouselSlide.addEventListener('transitionend', () => {
    if (carouselImages[counter].id == 'lastClone') {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    if (carouselImages[counter].id == 'firstClone') {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - counter;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
});

const tutorialBtn = document.querySelector('#tutorial');
const tutorialPopup = document.querySelector('#tutorial-popup');
const closeBtn = document.querySelector('#close-btn');

tutorialBtn.addEventListener('click', () => {
  tutorialPopup.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  tutorialPopup.style.display = 'none';
});

const bgm = document.getElementById('myAudio');
let isMuted = false;
bgm.volume = 0.2;