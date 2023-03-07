const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024 
canvas.height = 576

const scaledCanvas ={
    width: canvas.width / 4,
    height: canvas.height / 4
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 32) {
    floorCollisions2D.push(floorCollisions.slice(i, i + 32))
}

const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol === 1) {
            collisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 32,
                        y: y * 32,
                    },
                })
            )
        }
    })
})

const deathCollisions2d = []
for (let i = 0; i < deathCollisions.length; i += 32 ){
    deathCollisions2d.push(deathCollisions.slice(i, i + 32))
}

const deathCollisionBlocks = []
deathCollisions2d.forEach((row, y) =>{
    row.forEach((symbol, x) =>{
        if(symbol === 2){
            deathCollisionBlocks.push(new deathCollision({
                position: {
                    x: x * 32,
                    y: y * 32 + 16,
                }, 
            }))
        }
    })
})


const winCollisions2d = []
for (let i = 0; i < winCollisions.length; i += 32 ){
    winCollisions2d.push(winCollisions.slice(i, i + 32))
}

const winCollisionBlocks = []
winCollisions2d.forEach((row, y) =>{
    row.forEach((symbol, x) =>{
        if(symbol === 2){
            winCollisionBlocks.push(new winCollision({
                position: {
                    x: x * 32,
                    y: y * 32,
                }, 
            }))
        }
    })
})

const gravity = 0.5

const player = new Player({
    position:{
        x: 20,
        y: 100,
    },
    collisionBlocks,
    imageSrc: 'img-animations/Idle.png',
    frameRate: 2,
    animations: {
        Idle: {
            imageSrc: 'img-animations/Idle.png',
            frameRate: 2,
            frameBuffer: 12,
        },
        Run: {
            imageSrc: 'img-animations/Run.png',
            frameRate: 43,
            frameBuffer: 1,
        },
        Jump: {
            imageSrc: 'img-animations/Jump.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        RunLeft: {
            imageSrc: 'img-animations/Run-Left.png',
            frameRate: 43,
            frameBuffer: 1,
        },
        IdleLeft: {
            imageSrc: 'img-animations/Idle-Left.png',
            frameRate: 2,
            frameBuffer: 12,
        },
        JumpLeft: {
            imageSrc: 'img-animations/Jump-Left.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        Die: {
            imageSrc: 'img-animations/Die.png',
            frameRate: 4,
            frameBuffer: 10,
        },
        DieLeft: {
            imageSrc: 'img-animations/DieLeft.png',
            frameRate: 4,
            frameBuffer: 10,
        },
        Win: {
            imageSrc: 'img-animations/Win.png',
            frameRate: 5,
            frameBuffer: 7,
        },
        WinLeft: {
            imageSrc: 'img-animations/WinLeft.png',
            frameRate: 5,
            frameBuffer: 7,
        },
    },
}) 

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: 'level-3.png',
})

var death = false;

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.save()
    
    background.update()
    collisionBlocks.forEach((CollisionBlock) => {
        CollisionBlock.update()
    })

    player.checkForHorizontalCanvasCollisions()
    player.update()

    player.velocity.x = 0
    if (keys.d.pressed){
        if (death == false){
        player.switchSprite('Run')
        player.velocity.x = 3
        player.lastDirection = 'right'
    }}
    else if (keys.a.pressed) {
        if (death == false){
        player.switchSprite('RunLeft')
        player.velocity.x = -3
        player.lastDirection = 'left'   
    }}
    
    else if (player.velocity.y === 0) {
        if (death == false){
        if (player.lastDirection === 'right') player.switchSprite('Idle')
        else  player.switchSprite('IdleLeft')}
    }

    if (player.velocity.y < 0) {
        if(player.lastDirection === 'right') player.switchSprite('Jump')
        else  player.switchSprite('JumpLeft')
    }

    c.restore()
    deathCollisionBlocks.forEach(deathCollision => {
        deathCollision.update()
    })
    winCollisionBlocks.forEach(winCollision => {
        winCollision.update() 
    })

}

animate()

let isKeyDown = false;
var jumpCount = 2;

let dashInterval = 0;
const intervalDelay = 0.1;

function dashLoop() {
    if (player.lastDirection == 'left') {
        player.velocity.x = -dashInterval;
    } 
    else{
        player.velocity.x = dashInterval;
    }
    player.velocity.y = -1
    dash.play();
    dashInterval++;

    if (dashInterval <= 32) {
        setTimeout(dashLoop, intervalDelay);
      } else {
        dashInterval = 0
      }
}

var dashCount = 6;
const jump = new Audio('audio-sfx-bgm/jump.mp3');
const dash = new Audio('audio-sfx-bgm/dash.mp3');

window.addEventListener('keydown', (event) => {
    if (death == false){
    switch (event.key) {
        case 'd': case 'ArrowRight':
            keys.d.pressed = true
            break
        case 'a': case 'ArrowLeft':
            keys.a.pressed = true
            break
        case 'w': case 'ArrowUp':
            if (isKeyDown) {
                event.preventDefault();
                return;
              }
            isKeyDown = true;
            setTimeout(function() {
                isKeyDown = false;
              }, 100);
              if (jumpCount > 0) {
                if (player.velocity.y === 0) {
                    player.velocity.y = -11
                    jumpCount--;
                    jump.play();
            }}
            break
        case ' ':
            if (dashCount > 0){
                dashCount--;
                dashLoop()
                }
            break
        }}
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd': case 'ArrowRight':
            keys.d.pressed = false
            break
        case 'a': case 'ArrowLeft':
            keys.a.pressed = false
            break
    }
})

document.addEventListener('keydown', function(event) {
    if (event.key === 'r') {
      location.reload();
    }
  });


document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    history.back();
  }
});

const bgm = document.getElementById('level3-bgm');
let isMuted = false;
bgm.volume = 0.2;

document.addEventListener('keydown', (event) => {
  if (event.key === 'm') {
    isMuted = !isMuted;
    bgm.muted = isMuted;
  }
});

const retryButton = document.querySelector('.Retry');

retryButton.addEventListener('click', () => {
    location.reload();    
});