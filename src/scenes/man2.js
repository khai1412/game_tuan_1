class man2 extends Phaser.Scene {

  constructor() {
    super("man2");
  }

  preload() {
    this.load.image("treasure", "assets/treasure.png");
    //this.load.image("game_frame_vu", "assets/game_frame.png");
    this.load.image('main_background', 'assets/background_scene_2.png');
    this.load.image('blur_background', 'assets/background_blur.jpg');
    this.load.image('frame_question', 'assets/game_frame.png');
  }

  create() {
    this.add.image(0, 0, 'main_background').setOrigin(0, 0).setScale(375 / 512, 375 / 256).setVisible(true);
    this.add.image(0, 0, 'blur_background').setOrigin(0, 0).setScale(2 / 3, 375 / 374).setVisible(false);
    this.add.image(5, 120, 'frame_question').setOrigin(0, 0).setScale(37 / 30, 250 / 183).setVisible(false);
    this.huyen_ques = this.add.text(200, 300, 'Thảo có phải là  tiên tửu CLB?', { fontSize: 20, color: '#00000' });
    this.correct = this.add.text(300, 400, 'Đúng', { fontSize: 20, color: '#00000' });
    this.fail = this.add.text(400, 400, 'Sai', { fontSize: 20, color: '#00000' });
    this.wrong_answer = this.add.text(200, 480, 'Poor you ~.~ Bạn nhầm to rồi =))', { fontSize: 20, color: '#FF0000' });
    

  }

  update() {


  }
}
