class man2 extends Phaser.Scene {

  constructor() {
    super("man2");
  }
  
    preload(){
       this.load.image("treasure", "assets/treasure.png");
       //this.load.image("game_frame_vu", "assets/game_frame.png");
       this.load.image('main_background','assets/background_scene_2.png');
       this.load.image('blur_background','assets/background_blur.jpg');
       this.load.image('frame_question','assets/game_frame.png');
       this.load.spritesheet('player1','assets/dude.png',{frameWidth:32,frameHeight:48});
    }
    create(){
       this.main_background=this.add.image(0,0,'main_background').setOrigin(0,0).setScale(375/512,375/256).setVisible(true);
       this.blur_background=this.add.image(0,0,'blur_background').setOrigin(0,0).setScale(2/3,375/374).setVisible(false);
       this.frame_question=this.add.image(5, 120, 'frame_question').setOrigin(0, 0).setScale(37/30,250/183).setVisible(false);
       this.back_text = this.add.text(40, 50, "BACK", { fontSize: 54, color: "#FFFFFF" }).setVisible(false);
       this.huyen_ques = this.add.text(200, 300, 'Thảo có phải là  tiên tửu CLB?', { fontSize: 20, color: '#00000' }).setVisible(false);
       this.treasure=this.physics.add.group();
       this.back_text.setInteractive();
       this.back_text.on('pointerdown', () => {
           this.back_text.setVisible(false);
           this.main_background.setVisible(true);
           this.blur_background.setVisible(false);
           this.frame_question.setVisible(false);
           this.player.setVisible(true);
           this.treasure.setVisible(true);
           
       })
       this.traes=[];
       this.traes_x=150;
       for(var i=0;i<4;i++){
          this.traes[i] =this.treasure.create(this.traes_x,610,'treasure').setScale(0.15);
          this.traes_x+=180;
       }
       this.player=this.physics.add.sprite(20,598,'player1');
       this.player.setCollideWorldBounds(true);
       this.anims.create({
           key:'left_1',
           frames:this.anims.generateFrameNumbers('player1',{start:0,end:3}),
           frameRate:10,
           repeat:-1
       })
       this.anims.create({
        key:'turn',
        frames:[ { key: 'player1', frame: 4 } ],
        frameRate:10
        
       })
       this.anims.create({
        key:'right_1',
        frames:this.anims.generateFrameNumbers('player1',{start:5,end:8}),
        frameRate:5,
        repeat:-1
       })
       for(var i=0;i<4;i++){
        this.physics.add.overlap(this.player,this.traes[i],this.collision_trea,null,this);
       }
       

    }
    update() {
       var keyboard=this.input.keyboard.createCursorKeys();
       if(keyboard.left.isDown){
           this.player.setVelocityX(-100);
           this.player.anims.play('left_1',true);
       } else if(keyboard.right.isDown){
           this.player.setVelocityX(100);
           this.player.anims.play('right_1',true);
       } else {
           this.player.setVelocityX(0);
           this.player.anims.play('turn',true);
       }
       //this.player.anims.play('right_1',true);
       
    }
    collision_trea(player,trea){
        //this.scene.start("man2");
        var ans=1;
        this.blur_background.setVisible(true);
        this.frame_question.setVisible(true);
        player.setVisible(false);
        trea.destroy();
        this.treasure.setVisible(false);
        this.back_text.setVisible(true);
        this.huyen_ques.setVisible(true);
        this.correct = this.add.text(300, 400, 'Đúng', { fontSize: 20, color: '#00000' });
        this.fail = this.add.text(400, 400, 'Sai', { fontSize: 20, color: '#00000' });
        this.correct.setInteractive();
        
        var ans1=1;
        this.correct.on('pointerdown',()=>{
            ans1=1;
        })
        this.fail.setInteractive();
        this.fail.on('pointerdown',()=>{
            ans1=0;
        })
        if(ans1==ans){
            this.wrong_answer = this.add.text(200, 480, 'Đúm rùi=))', { fontSize: 20, color: '#FF0000' }).setVisible(true);
        } else {
            this.wrong_answer = this.add.text(200, 480, 'Poor you ~.~ Bạn nhầm to rồi =))', { fontSize: 20, color: '#FF0000' }).setVisible(true);

        }
        
    }

}  

