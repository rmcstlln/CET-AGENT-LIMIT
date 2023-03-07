class Player extends Sprite{
    constructor({ position, collisionBlocks, imageSrc, frameRate, scale = 0.5, animations}) {
        super({ imageSrc, frameRate, scale })
        this.position = position 
        this.velocity = {
            x: 0,
            y: 1,
        }

        this.collisionBlocks = collisionBlocks
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 10,
            height: 10,
        }
        this.deathBlocks = deathCollisionBlocks
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 10,
            height: 10,
        }
        this.winBlocks = winCollisionBlocks
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 10,
            height: 10,
        }


        this.animations = animations
        this.lastDirection = 'right'

        for (let key in this.animations){
            const image  = new Image()
            image.src = this.animations[key].imageSrc

            this.animations[key].image = image
        }
    }

    switchSprite(key){
        if (this.image === this.animations[key].image || !this.loaded) return

        this.currentFrame = 0
        this.image = this.animations[key].image
        this.frameBuffer = this.animations[key].frameBuffer
        this.frameRate = this.animations[key].frameRate
    }

    checkForHorizontalCanvasCollisions(){
        if (
            this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 1028 ||
            this.hitbox.position.x + this.velocity.x <= 0
        ) {
            this.velocity.x = 0
        }
    }

    update(){
        this.updateFrames()
        this.updateHitBox()

        c.font = '30px Impact';
        c.fillStyle = 'black';
        c.fillText('Dash: ' + dashCount, 25, 45);
        c.fillStyle = 'white';
        c.fillText('Dash: ' + dashCount, 20, 40);

        c.font = '30px Impact';
        c.fillStyle = 'black';
        c.fillText('Jump: ' + jumpCount, 125, 45);
        c.fillStyle = 'white';
        c.fillText('Jump: ' + jumpCount, 129, 40);
        /*c.fillStyle = 'rgba(0, 255, 0, 0.2)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.fillStyle = 'rgba(255, 0, 0, 0.2)'
        c.fillRect(
            this.hitbox.position.x,
            this.hitbox.position.y,
            this.hitbox.width,
            this.hitbox.height
            )*/

        this.draw()

        this.position.x += this.velocity.x
        this.updateHitBox()
        this.checkForHorizontalCollisions()
        this.checkForDeathCollisions()
        this.checkForWinCollisions()
        this.applyGravity()
        this.updateHitBox()
        this.checkForVerticalCollisions()
    }

    updateHitBox() {
        this.hitbox = {
            position: {
                x: this.position.x + 13.5 ,
                y: this.position.y,
            },
            width: 30,
            height: 85,
        }
    }

    checkForHorizontalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            if (
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.x > 0){
                    this.velocity.x = 0

                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width

                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break    
                }

                if (this.velocity.x < 0){
                    this.velocity.x = 0

                    const offset = this.hitbox.position.x - this.position.x

                    this.position.x =  collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break   
                }
            }
        }
    }

    checkForDeathCollisions() {
        for(let i = 0; i < this.deathBlocks.length; i++){
            const collisionBlock = this.deathBlocks[i]

            if (
                deathCol({
                    object1: this.hitbox,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.x > 0){
                    this.velocity.x = 0

                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width

                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break    
                }

                if (this.velocity.x < 0){
                    this.velocity.x = 0

                    const offset = this.hitbox.position.x - this.position.x

                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break   
                }
            }
        }
    }

    checkForWinCollisions() {
        for(let i = 0; i < this.winBlocks.length; i++){
            const collisionBlock = this.winBlocks[i]

            if (
                winCol({
                    object1: this.hitbox,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.x > 0){
                    this.velocity.x = 0

                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width

                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break    
                }

                if (this.velocity.x < 0){
                    this.velocity.x = 0

                    const offset = this.hitbox.position.x - this.position.x

                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break   
                }
            }
        }
    }

    applyGravity(){
        this.velocity.y += gravity
        this.position.y += this.velocity.y
    }

    checkForVerticalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            if (
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock
                })
            ) {
                if (this.velocity.y > 0){
                    this.velocity.y = 0

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height

                    this.position.y = collisionBlock.position.y - offset - 0.01
                    break    
                }

                if (this.velocity.y < 0){
                    this.velocity.y = 0

                    const offset = this.hitbox.position.y - this.position.y
                        
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break    
                }
            }
        }
    }
}