class Man1 extends Phaser.Scene {

  constructor() {
    super("Man1");
  }

 
  update() {
  
  
  }

    
   preload() {
        this.load.image('background', 'assets/1.png');
        this.load.image('background_1', 'assets/2.png');
        this.load.image('back_khai', 'assets/7.png');
        this.load.audio('khai_audio', 'assets/khai.m4a');
        this.load.image('back_huyen', 'assets/5.png');
        this.load.audio('audio_huyen', 'assets/huyen.mp3');
        this.load.image('back_kimanh', 'assets/3.png');
        this.load.image('back_thao','assets/4.png');
        this.load.audio('thaodp_audio','assets/thaodp.m4a');
        this.load.image("back_vu", "assets/6.png");
        this.load.audio("vu_audio", "assets/sound_vu.mp3");
        this.load.audio('kimanh_audio', 'assets/kimanh.mp3');
        this.load.spritesheet('wolf','assets/wolf.png',{frameWidth:48,frameHeight:48});
    }
    create() {
        // background co ban
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.next_text =this.add.text(600,50,"NEXT",{fontSize:54,color:"#FFFFFF"});
        this.background_1 = this.add.image(0, 0, 'background_1').setOrigin(0, 0).setVisible(false);
        this.back_text = this.add.text(40, 50, "BACK", { fontSize: 54, color: "#FFFFFF" }).setVisible(false);
        
       // source cua khai
        this.back_khai = this.add.image(207, 211, 'back_khai').setOrigin(0, 0).setScale(34 / 75).setVisible(false);
        this.khai_audio = this.sound.add('khai_audio', { loop: false });
      // source cua kim anh
        this.back_kimanh = this.add.image(207, 211, 'back_kimanh').setOrigin(0, 0).setScale(34 / 75).setVisible(false);
        this.kimanh_audio = this.sound.add('kimanh_audio', { loop: false });
      // source cua huyen
        this.back_huyen = this.add.image(207, 211, 'back_huyen').setOrigin(0, 0).setScale(34 / 75).setVisible(false);
        this.audio_huyen = this.sound.add('audio_huyen', { loop: false });
      //create by thaodp
        this.back_thao=this.add.image(207,211,'back_thao').setOrigin(0,0).setScale(34/75).setVisible(false);
        this.thaodp_audio=this.sound.add('thaodp_audio',{loop:false});
      //source cua vu
        this.back_vu = this.add.image(207, 211, "back_vu").setOrigin(0, 0).setScale(34 / 75).setVisible(false);
        this.vu_audio = this.sound.add("vu_audio", { loop: false });
        this.background.setInteractive();
        this.po_x = 0;
        this.po_y = 0;
        this.add_image(this.back_huyen, this.audio_huyen, 42, 220, 406, 581);
        this.add_image(this.back_khai, this.khai_audio, 441, 583, 259, 398);
        this.add_image(this.back_kimanh, this.kimanh_audio, 541, 683, 395, 541);
        this.add_image(this.back_thao,this.thaodp_audio,316,431,426,534);
        this.add_image(this.back_vu, this.vu_audio, 175, 313, 259, 398);
        //tao animation worf
        this.worf=this.physics.add.sprite(20, 20, 'wolf');
        this.worf.setCollideWorldBounds(true);
        this.veloc_wolf_x=0;
        this.veloc_wolf_y=0;
        this.key_play="right";
        this.ran_direct=1;
        this.anims.create({
          key:'left',
          frames:this.anims.generateFrameNumbers('wolf',{start:21,end:23}),
          frameRate:10,
          repeat:-1
        })
        this.anims.create({
          key:'right',
          frames:this.anims.generateFrameNumbers('wolf',{start:33,end:35}),
          frameRate:10,
          repeat:-1
        })
        this.anims.create({
          key:'up',
          frames:this.anims.generateFrameNumbers('wolf',{start:45,end:47}),
          frameRate:10,
          repeat:-1
        })
        this.anims.create({
          key:'down',
          frames:this.anims.generateFrameNumbers('wolf',{start:9,end:11}),
          frameRate:10,
          repeat:-1
        })
        
        
    }
    update() {
      this.worf.setVelocityX(this.veloc_wolf_x);
      this.worf.setVelocityY(this.veloc_wolf_y);
      this.worf.anims.play(this.key_play,true);
        if(this.worf.x<=50&&this.worf.y<=100){
          this.ran_direct=2;
          this.direct_wolf();
        } else if(this.worf.x>=720&&this.worf.y<=700){
          this.ran_direct=4;
          this.direct_wolf();
        } else if(this.worf.y>=720&&this.worf.x>=700){
          this.ran_direct=1;
          this.direct_wolf();
        } else if(this.worf.y>720&&this.worf.x<=50){
          this.ran_direct=3;
          this.direct_wolf();
        }
 
     
    }

    
    add_image(image, audio, X_min, X_max, Y_min, Y_max) {
        this.background.on('pointerdown', () => {
            this.po_x = this.game.input.mousePointer.x;
            this.po_y = this.game.input.mousePointer.y;
            if (this.po_x >= X_min && this.po_x <= X_max && this.po_y >= Y_min && this.po_y <= Y_max) {
                this.background_1.setVisible(true);
                this.back_text.setVisible(true);
                image.setVisible(true);
                audio.play();
            }

        })
        this.back_text.setInteractive();
        this.back_text.on('pointerdown', () => {
            this.back_text.setVisible(false);
            this.background_1.setVisible(false);
            image.setVisible(false);
            audio.stop();
        })
        this.next_text.setInteractive();
        this.next_text.on('pointerdown', () => {
          this.scene.start("man2");
      })

    }
    direct_wolf(){
      if(this.ran_direct==1){
        this.veloc_wolf_x=-160;
        this.veloc_wolf_y=0;
        this.key_play='left';
      } else if(this.ran_direct==2){
        this.veloc_wolf_x=160;
        this.veloc_wolf_y=0;
        this.key_play='right';
      } else if(this.ran_direct==3){
        this.veloc_wolf_y=-160;
        this.key_play='up';
        this.veloc_wolf_x=0;
      } else {
        this.veloc_wolf_y=160;
        this.key_play='down';
        this.veloc_wolf_x=0;
      }
    }
}
