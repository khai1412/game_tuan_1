class man2 extends Phaser.Scene {
  constructor() {
    super("man2");
  }

  preload() {
    this.load.image("treasure", "assets/treasure.png");
    //this.load.image("game_frame_vu", "assets/game_frame.png");
    this.load.image("main_background", "assets/background_scene_2.png");
    this.load.image("blur_background", "assets/background_blur.jpg");
    this.load.image("frame_question", "assets/game_frame.png");
    this.load.spritesheet("player1", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }
  create() {
    this.add
      .image(0, 0, "main_background")
      .setOrigin(0, 0)
      .setScale(375 / 512, 375 / 256)
      .setVisible(true);
    this.add
      .image(0, 0, "blur_background")
      .setOrigin(0, 0)
      .setScale(2 / 3, 375 / 374)
      .setVisible(false);
    this.add
      .image(5, 120, "frame_question")
      .setOrigin(0, 0)
      .setScale(37 / 30, 250 / 183)
      .setVisible(false);
    this.treasure = this.physics.add.group();
    this.traes = [];
    this.traes_x = 150;
    for (var i = 0; i < 4; i++) {
      var traes = this.treasure
        .create(this.traes_x, 610, "treasure")
        .setScale(0.15);
      this.traes_x += 180;
    }
    this.player = this.physics.add.sprite(20, 598, "player1");
    this.player.setCollideWorldBounds(true);
    this.anims.create({
      key: "left_1",
      frames: this.anims.generateFrameNumbers("player1", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "player1", frame: 4 }],
      frameRate: 10,
    });
    this.anims.create({
      key: "right_1",
      frames: this.anims.generateFrameNumbers("player1", { start: 5, end: 8 }),
      frameRate: 5,
      repeat: -1,
    });
    this.physics.add.overlap(
      this.player,
      this.treasure,
      this.collision_trea,
      null,
      this
    );
    this.question_3 = this.add
      .text(170, 350, "JS Club là câu lạc bộ lẩu Nhật Bản?", {
        fontSize: 20,
        color: "#000000",
      })
      .setVisible(false);
    this.answer_yes_3 = this.add
      .text(300, 400, "Yes", {
        fontSize: 20,
        color: "#000000",
      })
      .setVisible(false);
    this.answer_no_3 = this.add
      .text(400, 400, "No", {
        fontSize: 20,
        color: "#000000",
      })
      .setVisible(false);
    this.message_question_3 = this.add
      .text(310, 470, "Correct!!!", {
        fontSize: 20,
        color: "#00FF00",
      })
      .setVisible(false);
  }
  update() {
    var keyboard = this.input.keycomboard.createCursorKeys();
    if (keyboard.left.isDown) {
      this.player.setVelocityX(-100);
      this.player.anims.play("left_1", true);
    } else if (keyboard.right.isDown) {
      this.player.setVelocityX(100);
      this.player.anims.play("right_1", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn", true);
    }
    //this.player.anims.play('right_1',true);
  }
  collision_trea(player, trea) {
    this.blur_background.setVisible(true);
    this.frame_question.setVisible(true);
    player.setVisible(false);
    this.treasure.setVisible(false);
  }
}
