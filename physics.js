var cleartime=0;
var jumps=0;
class Stage1 extends Phaser.Scene
{
    constructor() {
        super({ key: 'stage1' });    
    }
    cursors;
    platform1;
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
        this.timeText = this.add.text(16,16, "Time Taken: ");

       

        // this.add.image(960,540, 'mars');

        this.platform1 = this.physics.add.image(1000, 1100, 'platform').setScale(.3).refreshBody();
        this.platform1.setImmovable(true);
        this.platform1.body.allowGravity = false;

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

        this.cursors = this.input.keyboard.createCursorKeys();

    

        
    }
    update(time){
        var gameRuntime = time * 0.001;
        this.timeText.setText("Time Survived: " + Math.round(gameRuntime) + " seconds");

        this.physics.collide(this.car, this.paltform1);
        this.physics.overlap(this.car, this.platform1, (car, platform1) =>
        {
            console.log(gameRuntime);
            cleartime=Math.round(gameRuntime);
            this.scene.start('result1');

        });
            
        const { left, right, up } = this.cursors;

        if (left.isDown)
        {
            this.car.setVelocityX(-160);

            this.car.anims.play('left', true);
        }
        else if (right.isDown)
        {
            this.car.setVelocityX(160);

            this.car.anims.play('right', true);
        }
        else
        {
            this.car.setVelocityX(0);


        }

        if (up.isDown && this.car.body.blocked.down)
        {
            jumps+=1;
            this.car.setVelocityY(-330);
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
        this.load.path = './assets/';
        this.load.image('mars', 'marsground.png');
        this.load.image('platform', 'platform.png');
        this.load.spritesheet('car', 'car.png', { frameWidth: 1920, frameHeight: 1080 });

    }
    create ()
    {
        this.background = this.add.image(
            960,
            540,
            'mars',
        );
        this.timeText = this.add.text(16,16, "Time Taken: ");
        this.cursors = this.input.keyboard.createCursorKeys();

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
    }
    update(time){
            var gameRuntime = time * 0.001;
            this.timeText.setText("Time Survived: " + Math.round(gameRuntime) + " seconds");

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
    preload(){
        this.load.path = './assets/';
        this.load.image('mainroom', 'mainroom.png');
        this.load.image('hallway', 'hallway.png');
        this.load.image('corrupt', 'corrupt.png');
        this.load.image('corrupthall', 'corrupthall.png');
        this.load.audio('humm',['backgroundhmm.mp3']);
        this.load.audio('door',['doorsound.mp3']);
        this.load.audio('ding',['ding.mp3']);
        this.load.audio('anger',['angryhumm.wav']);

    }
    create ()
    {

    }
    update(){

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

    }
    create ()
    {
        console.log(jumps)
        this.background = this.add.image(
            960,
            540,
            'score',
        );
        this.timeText = this.add.text(250,500, "Clear Time: " + Math.round(cleartime) + " seconds",{
            font: "bold 40px Arial",
        });
        this.timeText = this.add.text(1100,500, "Amount of Jumps: " + jumps ,{
            font: "bold 40px Arial",
        });
        
    }
    update(){
        
    }
}
class Result2 extends Phaser.Scene
{
    preload(){
        this.load.path = './assets/';
        this.load.image('mainroom', 'mainroom.png');
        this.load.image('hallway', 'hallway.png');
        this.load.image('corrupt', 'corrupt.png');
        this.load.image('corrupthall', 'corrupthall.png');
        this.load.audio('humm',['backgroundhmm.mp3']);
        this.load.audio('door',['doorsound.mp3']);
        this.load.audio('ding',['ding.mp3']);
        this.load.audio('anger',['angryhumm.wav']);

    }
    create ()
    {

    }
    update(){
        
    }
}
class Result3 extends Phaser.Scene
{
    preload(){
        this.load.path = './assets/';
        this.load.image('mainroom', 'mainroom.png');
        this.load.image('hallway', 'hallway.png');
        this.load.image('corrupt', 'corrupt.png');
        this.load.image('corrupthall', 'corrupthall.png');
        this.load.audio('humm',['backgroundhmm.mp3']);
        this.load.audio('door',['doorsound.mp3']);
        this.load.audio('ding',['ding.mp3']);
        this.load.audio('anger',['angryhumm.wav']);

    }
    create ()
    {

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
    scene: [Stage2],
    title: "Physics",
});
