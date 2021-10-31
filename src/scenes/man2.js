class man2 extends Phaser.Scene {
    constructor() {
        super("man2");
    }


    preload() {
        this.load.image("treasure", "assets/treasure.png");
        this.load.audio('man2_background', 'assets/man2_background.mp3');
        this.load.audio('win', 'assets/win.mp3');
        //this.load.image("game_frame_vu", "assets/game_frame.png");
        this.load.image("main_background", "assets/background_scene_2.png");
        this.load.image("blur_background", "assets/background_blur.jpg");
        this.load.image("frame_question", "assets/game_frame.png");
        this.load.spritesheet("player1", "assets/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.image("true_image", "assets/true.png");
        this.load.image("false_image", "assets/false.png");
        this.load.audio("true_sound", "assets/true_sound.mp3");
        this.load.audio("false_sound", "assets/false_sound.mp3");
        this.load.audio("open_sound", "assets/open_trea.mp3");
    }

    create() {
        this.man2_background = this.sound.add("man2_background", { loop: false, volume: 0.1 });
        this.man2_background.play();
        this.true_sound = this.sound.add("true_sound", { loop: false });
        this.false_sound = this.sound.add("false_sound", { loop: false });
        this.open_sound = this.sound.add("open_sound", { loop: false });
        this.win_music = this.sound.add('win', { loop: false });
        this.correct_ans = 0;
        this.number_ques = 0;
        this.count = 4;
        this.main_background = this.add
            .image(0, 0, "main_background")
            .setOrigin(0, 0)
            .setScale(375 / 512, 375 / 256)
            .setVisible(true);
        this.blur_background = this.add
            .image(0, 0, "blur_background")
            .setOrigin(0, 0)
            .setScale(2 / 3, 375 / 374)
            .setVisible(false);
        this.frame_question = this.add
            .image(5, 120, "frame_question")
            .setOrigin(0, 0)
            .setScale(37 / 30, 250 / 183)
            .setVisible(false);
        this.back_text = this.add
            .text(40, 50, "BACK", { fontSize: 54, color: "#FFFFFF" })
            .setVisible(false);
        this.treasure = this.physics.add.group();
        this.back_text.setInteractive();
        this.back_text.on("pointerdown", () => {
            this.back_text.setVisible(false);
            this.main_background.setVisible(true);
            this.blur_background.setVisible(false);
            this.frame_question.setVisible(false);
            this.player.setVisible(true);
            this.treasure.setVisible(true);
            this.show_hide_content(false);
            this.lst_question.shift();
            this.result_true.setVisible(false);
            this.result_false.setVisible(false);

            this.number_ques++;
        });
        this.traes = [];
        this.traes_x = 150;
        for (var i = 0; i < 4; i++) {
            this.traes[i] = this.treasure
                .create(this.traes_x, 610, "treasure")
                .setScale(0.15);
            this.traes_x += 180;
        }
        this.all_question = [
            "Coding Project có 4 nhà tài\n\ntrợ đúng không?",
            "Coding Project có 7 team tham\ngia đúng khum?",
            "Đối tượng tham gia Coding\nProject chỉ là thành viên\nnội bộ clb JS đúng ko?",
            "Coding Project lập trình trên\nnền tảng Phaser đúng không?",
        ];
        this.lst_question = [];
        for (var i = 0; i < 4; i++) {
            this.lst_question[i] = this.add
                .text(210, 250, this.all_question[i], { fontSize: 20, color: "#000" })
                .setVisible(false);
        }
        this.lst_answer = ["true", "true", "true", "true"];
        this.answer_true = this.add.text(210, 500, "TRUE", { fontSize: 20, color: "#000" }).setVisible(false);
        this.answer_false = this.add.text(470, 500, "FAlSE", { fontSize: 20, color: "#000" }).setVisible(false);

        this.result_true = this.add.image(240, 260, "true_image").setOrigin(0, 0).setScale(1.2).setVisible(false);
        this.result_false = this.add.image(240, 260, "false_image").setOrigin(0, 0).setScale(0.5).setVisible(false);
        this.player = this.physics.add.sprite(20, 598, "player1");
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key: "left_1",
            frames: this.anims.generateFrameNumbers("player1", { start: 0, end: 3 }),
            frameRate: 2,
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
            frameRate: 2,
            repeat: -1,
        });
        for (var i = 0; i < 4; i++) {
            this.physics.add.overlap(this.player, this.traes[i], this.collision_trea, null, this);
        }
    }
    update() {

        var keyboard = this.input.keyboard.createCursorKeys();
        if (this.number_ques == 4) {

            this.man2_background.stop();
            this.win_music.play();
            var win_text = this.add.text(150, 280, "!!CONGRACULATION!!", { fontSize: 48, color: "#FFFFFF" });
            var score_text = this.add.text(65, 330, "you answered " + (this.count) + " questions correctly", { fontSize: 32, color: "#FFFFFF" });

        }

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

    }

    collision_trea(player, trea) {
        //this.count++;

        this.blur_background.setVisible(true);
        this.frame_question.setVisible(true);
        player.setVisible(false);
        trea.destroy();
        this.treasure.setVisible(false);
        this.show_hide_content(true);
        this.open_sound.play();
        this.true_true(this.lst_answer[0]);
        this.lst_answer.shift();
        //console.log(this.count);

    }
    true_true(ans) {
        this.answer_true.setInteractive();
        this.answer_true.on("pointerdown", () => {
            var ans1;
            ans1 = "true";
            if (ans1 == ans) {
                this.show_result_true();
            } else {
                this.show_result_false();

            }

        });
        this.answer_false.setInteractive();
        this.answer_false.on("pointerdown", () => {
            var ans1;
            ans1 = "false";
            if (ans1 == ans) {
                this.show_result_true();

            } else {
                this.show_result_false();
            }

        });
    }
    show_result_true() {
        this.result_true.setVisible(true);
        this.result_false.setVisible(false);
        this.show_hide_content(false);
        this.back_text.setVisible(true);
        this.false_sound.stop();
        this.true_sound.play();
        //this.count++;
    }
    show_result_false() {
        this.result_false.setVisible(true);
        this.result_true.setVisible(false);
        this.show_hide_content(false);
        this.back_text.setVisible(true);
        this.true_sound.stop();
        this.false_sound.play();
        this.man2_background.stop();
        this.sleep(2000).then(() => {
            this.scene.start('man2');
        });

    }
    show_hide_content(param) {
        this.lst_question[0].setVisible(param);
        this.answer_true.setVisible(param);
        this.answer_false.setVisible(param);

    }
    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    // Usage!

}
