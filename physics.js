class Stage1 extends Phaser.Scene



{
    movingPlatform;
    cursors;
    platforms;
    stars;
    player;

    preload(){
        this.load.path = './assets/';
        this.load.image('mars', 'marsground.png');
        // this.load.image('hallway', 'hallway.png');
        // this.load.image('corrupt', 'corrupt.png');
        // this.load.image('corrupthall', 'corrupthall.png');
        // this.load.audio('humm',['backgroundhmm.mp3']);
        // this.load.audio('door',['doorsound.mp3']);
        // this.load.audio('ding',['ding.mp3']);
        // this.load.audio('anger',['angryhumm.wav']);

    }
    create ()
    {
        this.add.image(960,540, 'mars');

    }
    update(){

    }
}
class Stage2 extends Phaser.Scene
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
    // scene: [Room3,Hallway2],
    scene: [Stage1],
    title: "The Room",
});
