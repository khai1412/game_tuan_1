class man2 extends Phaser.Scene {
  constructor() {
    super("man2");
  }
  preload() {
    this.load.image("main_background", "assets/background_scene_2.png");
    this.load.image("blur_background", "assets/background_blur.jpg");
    this.load.image("frame_question", "assets/game_frame.png");
  }
  create() {
    this.add
      .image(0, 0, "main_background")
      .setOrigin(0, 0)
      .setScale(375 / 512, 375 / 256);
  }
}
