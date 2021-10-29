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
      .setVisible(true);
    this.add
      .image(5, 120, "frame_question")
      .setOrigin(0, 0)
      .setScale(37 / 30, 250 / 183)
      .setVisible(true);
    this.question_3 = this.add.text(
      170,
      350,
      "JS Club là câu lạc bộ lẩu Nhật Bản?",
      { fontSize: 20, color: "#000000" }
    );
    this.answer_yes_3 = this.add.text(300, 400, "Yes", {
      fontSize: 20,
      color: "#000000",
    });
    this.answer_no_3 = this.add.text(400, 400, "No", {
      fontSize: 20,
      color: "#000000",
    });
    this.message_question_3 = this.add
      .text(310, 470, "Correct!!!", {
        fontSize: 20,
        color: "#00FF00",
      })
      .setVisible(false);
  }
}
