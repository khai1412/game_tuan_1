class man2 extends Phaser.Scene {
    preload() {
        this.load.image('main_background', 'assets/background_scene_2.png');
        this.load.image('blur_background', 'assets/background_blur.jpg');
        this.load.image('frame_question', 'assets/game_frame.png');
        this.load.image('treasure', 'assets/treasure.png');
    }
    create() {
        this.add.image(0, 0, 'main_background').setOrigin(0, 0).setScale(375 / 512, 375 / 256).setVisible(true);
        this.blur_background = this.add.image(0, 0, 'blur_background').setOrigin(0, 0).setScale(2 / 3, 375 / 374).setVisible(false);
        this.treasures = this.physics.add.group();
        this.start_x = 150;
        for (var i = 0; i <= 3; i++) {
            var trea = this.treasures.create(this.start_x, 598, 'treasure').setScale(0.2);
            this.start_x += 150;
        }
        this.frame_question = this.add.image(5, 120, 'frame_question').setOrigin(0, 0).setScale(37 / 30, 250 / 183).setVisible(true);
        this.question_1 = this.add.text(210, 250, "Coding Project có 4 nhà tài\n\ntrợ đúng không?", { fontSize: 20, color: "#000" }).setVisible(true);
        this.answer_true = this.add.text(210, 400, "TRUE", { fontSize: 20, color: "#000" }).setVisible(true);
        this.answer_false = this.add.text(470, 400, "FAlSE", { fontSize: 20, color: "#000" }).setVisible(true);
    }
    update() {

    }
}