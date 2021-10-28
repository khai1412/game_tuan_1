class Man1 extends Phaser.Scene {

	constructor() {
		super("Man1");

	}
    preload(){
        this.load.image('background','assets/1.png');
        this.load.image('background_1','assets/2.png');
        this.load.image('back_khai','assets/7.png');
        this.load.audio('khai_audio','assets/khai.m4a');
    }
    create(){
        
        this.background=this.add.image(0,0,'background').setOrigin(0,0);
        this.background_1=this.add.image(0,0,'background_1').setOrigin(0,0).setVisible(false);
        this.back_text=this.add.text(40,50,"BACK",{fontSize:54,color:"#FFFFFF"}).setVisible(false);
        this.back_khai=this.add.image(207,211,'back_khai').setOrigin(0,0).setScale(34/75).setVisible(false);
        this.khai_audio=this.sound.add('khai_audio',{loop:false});
        this.background.setInteractive();
        this.po_x=0;
        this.po_y=0;
        // this.background.on('pointerdown', () => {
        //     this.po_x=this.game.input.mousePointer.x;
        //     this.po_y=this.game.input.mousePointer.y;
        //     if(this.po_x>=441&&this.po_x<=583&&this.po_y>=259&&this.po_y<=398){
        //         this.background_1.setVisible(true);
        //         this.back_text.setVisible(true);
        //         this.back_khai.setVisible(true);
        //         this.khai_audio.play();
        //     }
       
        // })
        // this.back_text.setInteractive();
        // this.back_text.on('pointerdown',()=>{
        //     this.back_text.setVisible(false);
        //     this.background_1.setVisible(false);
        //     this.back_khai.setVisible(false);
        //     this.khai_audio.stop();
        // })
        this.add_image(this.back_khai,this.khai_audio,441,583,259,398);
        
  
    }
    update(){
        

    }
    add_image(image,audio,X_min,X_max,Y_min,Y_max){
        this.background.on('pointerdown', () => {
            this.po_x=this.game.input.mousePointer.x;
            this.po_y=this.game.input.mousePointer.y;
            if(this.po_x>=X_min&&this.po_x<=X_max&&this.po_y>=Y_min&&this.po_y<=Y_max){
                this.background_1.setVisible(true);
                this.back_text.setVisible(true);
                image.setVisible(true);
                audio.play();
            }
       
        })
        this.back_text.setInteractive();
        this.back_text.on('pointerdown',()=>{
            this.back_text.setVisible(false);
            this.background_1.setVisible(false);
            image.setVisible(false);
            audio.stop();
        })
    }
}