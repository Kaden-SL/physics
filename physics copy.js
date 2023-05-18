var counter =0;
class userinput extends Phaser.Scene {
    constructor() {
        super('userinput')
    }
    create() {

        
        this.add.text(800,500, "Click anywhere to play intro").setFontSize(20)
        
        // .setPipeline("Light2D"); I'll figure out lights later
        this.lights.enable();
        this.lights.setAmbientColor("#0x999999");
        this.lights.addLight(200, 300, 1000, undefined, 2)
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('intro'));
        });
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    preload(){
        this.load.path = './assets/';
        this.load.audio('bulb',['lightbulb.mp3']);
    }
    create() {
        
        this.audio1= this.sound.add('bulb',{ loop: false });
        this.audio1.play()
        this.title= this.add.text(50,50, "The Room").setFontSize(50);
        this.tweens.add({
            targets: this.title,
            alpha:0,
            duration: 500,
            repeat:10,
            yoyo:true,
        });
        this.time.addEvent({
            delay:36000,
        callback: () => {
            this.add.text(800,500, "Click anywhere to begin.").setFontSize(20);
            this.input.on('pointerdown', () => {
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => this.scene.start('room1'));
            });
            }
            
        })
       
    }
}

class Neutral extends Phaser.Scene {
    constructor() {
        super('neutral')
    }
    create() {

        this.cameras.main.setBackgroundColor('#ffffff')
        this.add.text(800,500, "The void welcomes you, stay awhile...").setFontSize(20).setStyle({color: '#000' })
        this.input.on('pointerdown', () => this.scene.start('room1'))
        this.add.text(850,1000, "(click anywhere to restart)").setFontSize(13).setStyle({color: '#000' })


    }
}
class Hell extends Phaser.Scene {
    constructor() {
        super('hell')
    }
    preload(){
        this.load.path = './assets/';
        this.load.audio('hell',['hellsound.wav']);
    }
    create() {
        this.game.sound.stopAll();
        this.hell= this.sound.add('hell',{ loop: true, volume:.5 });
        this.hell.play();
        this.cameras.main.setBackgroundColor('#F11514')
        this.add.text(800,500, "Y̴͓̼̎o̷͕̳͑̀u̴͍̼͎͘ ̶͉͗ȟ̸̛̪̥̩a̴̬͋̿͘v̶̱̞͑̉e̷̖̥͊͆͠ͅ ̸̨̃f̸͎̚a̵̙̦͋͋l̸̤̮̰͒͗͝l̷̲̝̩͗̀̉e̵̬̱͛͒n̶̡̺̮͋͌ ̷̞͝c̸̪͊͝h̵̛̘̒ĭ̵͍͋l̷̢͚͔̉̋d̵̬͂").setFontSize(20).setStyle({color: '#000' })
        this.time.addEvent({
            delay:7000,
        callback: () => {
            this.add.text(850,1000, "(click anywhere to restart)").setFontSize(13).setStyle({color: '#000' });
            this.input.on('pointerdown', () => this.scene.start('room1'));

            }
            
        })


    }
}
class Peace extends Phaser.Scene {
    constructor() {
        super('peace')
    }
    preload(){
        this.load.path = './assets/';
        this.load.audio('peace',['peace.wav']);
    }
    create() {
        this.game.sound.stopAll();
        this.hell= this.sound.add('peace',{ loop: true, volume:.5 });
        this.hell.play();
        this.cameras.main.setBackgroundColor('#7eb2c5')
        this.add.text(800,500, "A well deserved rest, my child.").setFontSize(20).setStyle({color: '#000' })
        this.time.addEvent({
            delay:7000,
        callback: () => {
            this.add.text(850,1000, "(click anywhere to restart)").setFontSize(13).setStyle({color: '#000' });
            this.input.on('pointerdown', () => this.scene.start('room1'));

            }
            
        })


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
    scene: [userinput, Intro,Neutral,Hell,Peace],
    title: "The Room",
});
