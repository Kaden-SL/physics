var cleartime=0;
var jumps=0;

class Stage1 extends Phaser.Scene
{
    constructor() {
        super({ key: 'stage1' });    
    }
    cursors;
    platform1;
    platform2;
    car;

    preload(){
        this.load.path = './assets/';
        this.load.image('mars', 'marsground.png');
        this.load.image('platform', 'platform.png');
        this.load.spritesheet('car', 'car.png', { frameWidth: 1920, frameHeight: 1080 });
        // this.load.image('corrupt', 'corrupt.png');
        // this.load.image('corrupthall', 'corrupthall.png');
        // this.load.audio('humm',['backgroundhmm.mp3']);
        // this.load.audio('door',['doorsound.mp3']);
        // this.load.audio('ding',['ding.mp3']);
        // this.load.audio('anger',['angryhumm.wav']);

    }
    create ()
    {
        this.background = this.add.image(
            960,
            540,
            'mars',
        );
        this.directions = this.add.text(550,16,"Make it to the final platform using the arrow keys",{
            font: "bold 35px Arial",
        })
        this.timeText = this.add.text(16,16, "Time Taken: ");

       

        // this.add.image(960,540, 'mars');

        this.platform1 = this.physics.add.image(1000, 900, 'platform').setScale(.3).refreshBody();
        this.platform1.setImmovable(true);
        this.platform1.body.allowGravity = false;
    
        this.platform2 = this.physics.add.image(500, 1000, 'platform').setScale(.3).refreshBody();
        this.platform2.setImmovable(true);
        this.platform2.body.allowGravity = false;

        this.platform3 = this.physics.add.image(1500, 800, 'platform').setScale(.3).refreshBody();
        this.platform3.setImmovable(true);
        this.platform3.body.allowGravity = false;

        this.car = this.physics.add.sprite(100, 450, 'car').setScale(.1);
        this.car.setBounce(0.2);
        this.car.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('car', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('car', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'stay',
            frames: [ { key: 'car', frame: 4 } ],
            frameRate: 20
        });
        this.physics.add.collider(this.car, this.platform2);
        this.physics.add.collider(this.car, this.platform1);
        // this.physics.add.collider(this.car, this.platform3);
        this.cursors = this.input.keyboard.createCursorKeys();

    

        
    }
    update(time){
        var gameRuntime = time * 0.001;
        this.timeText.setText("Time Taken: " + Math.round(gameRuntime) + " seconds");

        // this.physics.collide(this.car, this.paltform1);
        // this.physics.collider(this.car, this.paltform2);
        this.physics.overlap(this.car, this.platform3, (car, platform1) =>
        {
            cleartime=Math.round(gameRuntime);
            this.scene.start('result1');

        });
            
        const { left, right, up } = this.cursors;

        if (left.isDown)
        {
            this.car.setVelocityX(-230);

            this.car.anims.play('left', true);
        }
        else if (right.isDown)
        {
            this.car.setVelocityX(230);

            this.car.anims.play('right', true);
        }
        else
        {
            this.car.setVelocityX(0);


        }

        if (up.isDown && this.car.body.blocked.down)
        {
            jumps+=1;
            this.car.setVelocityY(-400);
        }

    }
}
class Stage2 extends Phaser.Scene
{
    
    cursors;
    constructor() {
        super({ key: 'stage2' });    
    }
    preload(){
        console.log(cleartime,jumps);
        this.load.path = './assets/';
        this.load.image('mars', 'marsground.png');
        this.load.image('platform', 'platform.png');
        this.load.spritesheet('car', 'car.png', { frameWidth: 1920, frameHeight: 1080 });
        this.load.image('side', 'sideplat.png');

    }
    create ()
    {

        this.background = this.add.image(
            960,
            540,
            'mars',
        );
        this.directions = this.add.text(550,16,"Make it to end using the arrow keys, now you can hover!",{
            font: "bold 35px Arial",
        })
        this.timeText = this.add.text(16,16, "Time Taken: ");
        this.cursors = this.input.keyboard.createCursorKeys();

        this.car = this.physics.add.sprite(100, 450, 'car').setScale(.1);
        this.car.setBounce(0.2);
        this.car.setCollideWorldBounds(true);

        const platforms = this.physics.add.group({
            defaultKey: 'platform'
        });
        platforms.create(200, 800).setScale(.3).refreshBody();
        platforms.create(530, 360).setScale(.3).refreshBody();
        platforms.create(530, 100).setScale(.3).refreshBody();
        platforms.create(950, 360).setScale(.3).refreshBody();
        platforms.create(950, 100).setScale(.3).refreshBody();
        platforms.create(1370, 100).setScale(.3).refreshBody();
        this.platformend = this.physics.add.image(1370, 1050, 'platform').setScale(.3).refreshBody();
        this.platformend.setImmovable(true);
        this.platformend.body.allowGravity = false;
        for (const platform of platforms.getChildren())
        {
            platform.body.immovable = true;
            platform.body.moves = false;
        }
        this.physics.add.collider(this.car, platforms);


        const sideplatforms = this.physics.add.group({
            defaultKey: 'side'
        });
        sideplatforms.create(365, 600).setScale(.3).refreshBody();
        sideplatforms.create(1115, 615).setScale(.3).refreshBody();
        sideplatforms.create(1115, 1000).setScale(.3).refreshBody();
        sideplatforms.create(1535, 350).setScale(.3).refreshBody();
        sideplatforms.create(1535, 760).setScale(.3).refreshBody();
        sideplatforms.create(1535, 1000).setScale(.3).refreshBody();
        for (const platform of sideplatforms.getChildren())
        {
            platform.body.immovable = true;
            platform.body.moves = false;
        }
        this.physics.add.collider(this.car, sideplatforms);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('car', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('car', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'stay',
            frames: [ { key: 'car', frame: 4 } ],
            frameRate: 20
        });

    }
        
    update(time){
            var gameRuntime = time * 0.001;
            this.timeText.setText("Time Taken: " + Math.round(gameRuntime) + " seconds");
            this.physics.overlap(this.car, this.platformend, (car, platform1) =>
        {
            cleartime=Math.round(gameRuntime);
            this.scene.start('result2');

        });
            const { left, right, up, down } = this.cursors;

        this.car.setAcceleration(0, 0);

        if (left.isDown)
        {
            this.car.setAccelerationX(-600);
        }
        else if (right.isDown)
        {
            this.car.setAccelerationX(600);
        }

        if (up.isDown)
        {
            jumps+=1;
            this.car.setAccelerationY(-600);
        }
        else if (down.isDown)
        {
            
            this.car.setAccelerationY(600);
        }

        const { x } = this.car.body.velocity;
        if (x < 0)
        {
            this.car.play('left', true);
        }
        else if (x > 0)
        {
            this.car.play('right', true);
        }
    
    }
    }

class Stage3 extends Phaser.Scene
    {
        jumps=0;
        cleartime=0;
        cursors;
        constructor() {
            super({ key: 'stage3' });    
        }
        preload(){
            console.log(cleartime,jumps);
        this.load.path = './assets/';
        this.load.image('mars', 'marsground.png');
        this.load.image('platform', 'platform.png');
        this.load.spritesheet('car', 'car.png', { frameWidth: 1920, frameHeight: 1080 });
        this.load.image('side', 'sideplat.png');
            
        
        }
        create ()
        {
            this.background = this.add.image(
                960,
                540,
                'mars',
            );
            this.directions = this.add.text(300,16,"Make it to end using the arrow keys, now you can dash right with with 'e'!, and left with 'q'",{
                font: "bold 35px Arial",
            })
            
            this.timeText = this.add.text(16,16, "Time Taken: ");
            this.cursors = this.input.keyboard.createCursorKeys();
    
            this.car = this.physics.add.sprite(100, 450, 'car').setScale(.1);
            this.car.setBounce(0.2);
            this.car.setCollideWorldBounds(true);
    
            const platforms = this.physics.add.group({
                defaultKey: 'platform'
            });
            platforms.create(200, 1000).setScale(.3).refreshBody();
            platforms.create(1150, 800).setScale(.3).refreshBody();
            platforms.create(1900, 650).setScale(.3).refreshBody();
            platforms.create(1000, 500).setScale(.3).refreshBody();
            
            this.platformend = this.physics.add.image(190, 300, 'platform').setScale(.3).refreshBody();
            this.platformend.setImmovable(true);
            this.platformend.body.allowGravity = false;
            for (const platform of platforms.getChildren())
            {
                platform.body.immovable = true;
                platform.body.moves = false;
            }
            this.physics.add.collider(this.car, platforms);
    
    
            const sideplatforms = this.physics.add.group({
                defaultKey: 'side'
            });
            // sideplatforms.create(1115, 615).setScale(.3).refreshBody();
            
            for (const platform of sideplatforms.getChildren())
            {
                platform.body.immovable = true;
                platform.body.moves = false;
            }
            this.physics.add.collider(this.car, sideplatforms);

            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('car', { start: 3, end: 5 }),
                frameRate: 10,
                repeat: -1
            });
            
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('car', { start: 0, end: 2 }),
                frameRate: 10,
                repeat: -1
            });
    
            this.anims.create({
                key: 'stay',
                frames: [ { key: 'car', frame: 4 } ],
                frameRate: 20
            });
         
        }
            
        update(time){
                var gameRuntime = time * 0.001;
                this.timeText.setText("Time Survived: " + Math.round(gameRuntime) + " seconds");
    
                const { left, right, up, down } = this.cursors;
    
                this.physics.overlap(this.car, this.platformend, (car, platform1) =>
                {
                    cleartime=Math.round(gameRuntime);
                    this.scene.start('result3');
        
                });
            this.dashKey = this.input.keyboard.addKey('E');
            if(this.dashKey){
            if (Phaser.Input.Keyboard.JustDown(this.dashKey))
            {
                jumps+=1;
                this.car.x += 100;
        
            }
        }
        this.dashKey2 = this.input.keyboard.addKey('Q');
            if(this.dashKey2){
            if (Phaser.Input.Keyboard.JustDown(this.dashKey2))
            {
                jumps+=1;
                this.car.x -= 100;
        
            }
        }
        
            if (left.isDown)
        {
            this.car.setVelocityX(-230);

            this.car.anims.play('left', true);
        }
        else if (right.isDown)
        {
            this.car.setVelocityX(230);

            this.car.anims.play('right', true);
        }
        else
        {
            this.car.setVelocityX(0);


        }

        if (up.isDown && this.car.body.blocked.down)
        {
            jumps+=1;
            this.car.setVelocityY(-400);
        }

            
        }
        }

class Result1 extends Phaser.Scene
{
    constructor() {
        super({ key: 'result1' });    
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('score', 'score.png');
        this.load.image('hover', 'hover.png');

    }
    create ()
    {
        this.background = this.add.image(
            960,
            540,
            'score',
        );
        this.add.image(950,950,'hover').setScale(1.5)
        this.timeText = this.add.text(250,500, "Clear Time: " + Math.round(cleartime) + " seconds",{
            font: "bold 40px Arial",
        });
        this.timeText = this.add.text(1100,500, "Amount of Jumps: " + jumps ,{
            font: "bold 40px Arial",
        });
        
        this.time.addEvent({
            delay:2000,
        callback: () => {
            this.timeText = this.add.text(750,1000, "click anywhere to continue",);
            this.input.on('pointerdown', () => this.scene.start('stage2'));
            jumps=0;
            cleartime=0;

            }
            
        })

        
    }
    update(){
        
    }
}
class Result2 extends Phaser.Scene
{
    constructor() {
        super({ key: 'result2' });    
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('score', 'score.png');
        this.load.image('boost', 'boost.png');

    }
    create ()
    {
        console.log(jumps)
        this.background = this.add.image(
            960,
            540,
            'score',
        );
        this.add.image(950,950,'boost').setScale(1.5)
        this.timeText = this.add.text(250,500, "Clear Time: " + Math.round(cleartime) + " seconds",{
            font: "bold 40px Arial",
        });
        this.timeText = this.add.text(1100,500, "Hover Time: " + jumps + " ms",{
            font: "bold 40px Arial",
        });
        this.time.addEvent({
            delay:2000,
        callback: () => {
            this.timeText = this.add.text(750,1000, "click anywhere to continue",);
            this.input.on('pointerdown', () => this.scene.start('stage3'));
            jumps=0;
            cleartime=0;

            }
            
        })
        
    }
    update(){
        
    }
}
class Result3 extends Phaser.Scene
{
    constructor() {
        super({ key: 'result3' });    
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('score', 'score.png');
        this.load.image('grats', 'cadet.png');

    }
    create ()
    {
        console.log(jumps)
        this.background = this.add.image(
            960,
            540,
            'score',
        );
        this.add.image(950,950,'grats').setScale(1.5)
        this.timeText = this.add.text(250,500, "Clear Time: " + Math.round(cleartime) + " seconds",{
            font: "bold 40px Arial",
        });
        this.timeText = this.add.text(1100,500, "Dashes: " + jumps ,{
            font: "bold 40px Arial",
        });
        this.time.addEvent({
            delay:2000,
        callback: () => {
            this.timeText = this.add.text(750,1000, "click anywhere to restart",);
            this.input.on('pointerdown', () => this.scene.start('stage1'));
            jumps=0;
            cleartime=0;

            }
            
        })
        
    }
    update(){
        
    }
}
const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    // scene: [Room3,Hallway2],
    scene: [Stage1,Stage2,Stage3,Result1,Result2,Result3],
    title: "Physics",
});
