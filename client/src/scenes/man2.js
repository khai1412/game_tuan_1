class man2 extends Phaser.Scene {
    constructor() {
        super("man2");
    }

    preload() {
        this.load.image("treasure", "client/assets/treasure.png");
        //this.load.image("game_frame_vu", "client/assets/game_frame.png");
        this.load.image("main_background", "client/assets/background_scene_2.png");
        this.load.image("blur_background", "client/assets/background_blur.jpg");
        this.load.image("frame_question", "client/assets/game_frame.png");
        this.load.spritesheet("player1", "client/assets/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.image("true_image", "client/assets/true.png");
        this.load.image("false_image", "client/assets/false.png");
        this.load.audio("true_sound", "client/assets/true_sound.mp3");
        this.load.audio("false_sound", "client/assets/false_sound.mp3");
        this.load.audio("open_sound", "client/assets/open_trea.mp3");
        this.load.audio("man2_background", "client/assets/man2_background.mp3")
        this.load.image("below_background", "client/assets/below_bg.png");
        this.load.image("treasure", "client/assets/treasure_final.png");
        this.load.image("platform", "client/assets/platform_final.png");
        this.load.image("bomb", 'client/assets/bomb.png');
        this.load.image("bomBum", 'client/assets/bomBum.png');
    }
    create() {
        this.true_sound = this.sound.add("true_sound", { loop: false });
        this.false_sound = this.sound.add("false_sound", { loop: false });
        this.open_sound = this.sound.add("open_sound", { loop: false });
        this.man2_background = this.sound.add("man2_background", { loop: false, volume: 0.3 });
        this.man2_background.play();
        this.bombs = this.physics.add.group();
        this.count_bomb = 3;
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
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(80, 500, "platform");
        this.platforms.create(600, 400, "platform");
        this.platforms.create(50, 250, "platform");
        this.platforms.create(750, 220, "platform");
        this.treasure = this.physics.add.group();
        this.back_text.setInteractive();
        this.back_text.on("pointerdown", () => {
            this.back_text.setVisible(false);
            this.main_background.setVisible(true);
            this.blur_background.setVisible(false);
            this.frame_question.setVisible(false);
            this.player.setVisible(true);
            this.bombs.setVelocityX(Phaser.Math.Between(100, 300));
            this.bombs.setVisible(true);
            this.treasure.setVisible(true);
            this.show_hide_content(false);
            this.lst_question.shift();
            this.result_true.setVisible(false);
            this.result_false.setVisible(false);
            this.lst_answer.shift();
            this.platforms.setVisible(true);
        });
        // Create treasure ST
        this.traes = [];
        var treasure_x = 10;
        var treasure_y = 0;
        for (var i = 0; i < 4; i++) {
            this.traes[i] = this.treasure.create(treasure_x, treasure_y, "treasure").setScale(0.15);
            treasure_x += 220;
            this.traes[i].setCollideWorldBounds(true);
            this.traes[i].setGravityY(300);
            this.traes[i].setBounce(Phaser.Math.FloatBetween(0.4, 0.6));
        }
        // Create treasure EN
        // Set collision between platform and treasure ST
        this.physics.add.collider(this.treasure, this.platforms);
        // Set collision between platform and treasure EN
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
        this.lst_answer = ["true", "false", "true", "true"];

        this.answer_true = this.add
            .text(210, 500, "TRUE", { fontSize: 20, color: "#000" })
            .setVisible(false);
        this.answer_false = this.add
            .text(470, 500, "FAlSE", { fontSize: 20, color: "#000" })
            .setVisible(false);
        this.answer_true.setInteractive();
        this.answer_false.setInteractive();
        this.result_true = this.add
            .image(240, 260, "true_image")
            .setOrigin(0, 0)
            .setScale(1.2)
            .setVisible(false);
        this.result_false = this.add
            .image(240, 260, "false_image")
            .setOrigin(0, 0)
            .setScale(0.5)
            .setVisible(false);
        //-------------------
        // tạo biến platform

        // từ platform tại ra các thanh xanh xanh
        this.platforms.create(100, 681, 'below_background').setScale(1.3).refreshBody();
        ///------------
        this.player = this.physics.add.sprite(20, 500, "player1").setScale(1.5);
        this.player.setCollideWorldBounds(true);
        // set trọng lượng theo trục Y
        this.player.setGravityY(300);
        // set độ nảy
        this.player.setBounce(0.2);
        // set va chạm với biến platform
        this.physics.add.collider(this.player, this.platforms);

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
        for (var i = 0; i < 4; i++) {
            this.physics.add.overlap(
                this.player,
                this.traes[i],
                this.collision_trea,
                null,
                this
            );
        }
        this.addBomBum;
        this.check_over = false;
        this.physics.add.collider(this.player, this.bombs, this.gameOver, null, this);
        this.physics.add.collider(this.bombs, this.platform);
        for (var i = 0; i < 3; i++) {
            var bom_x = Phaser.Math.Between(20, 770);
            var bom_y = Phaser.Math.Between(10, 30);
            var bom = this.bombs.create(bom_x, bom_y, 'bomb');
            bom.setCollideWorldBounds(true);
            bom.setBounce(1);
            bom.setGravityY(Phaser.Math.Between(100, 300));
            bom.setVelocityX(Phaser.Math.Between(100, 300));
            bom.setScale(0.05, 0.05);
        }
        this.physics.add.collider(this.platforms, this.bombs);
    }
    gameOver(bomb, player) {
        this.physics.pause();
        this.addBomBum = this.add.image(103, 100, "bomBum").setOrigin(0, 0).setScale(1.2).setVisible(true);
        // player.setTint(0xff0000);
        player.anims.play('turn');
        this.check_over = true;
    }
    update() {
        if (this.check_over == true) {
            return;
        }
        var keyboard = this.input.keyboard.createCursorKeys();
        if (keyboard.left.isDown) {
            // chạy anims
            this.player.anims.play('left_1', true);
            // set vận tốc của nhân vật
            this.player.setVelocityX(-100);
        } else if (keyboard.right.isDown) {
            this.player.anims.play('right_1', true);
            this.player.setVelocityX(100);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        if (keyboard.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }

        if (this.lst_answer[0] == "true") {
            this.true_true();
        } else {
            this.true_false();
        }
    }

    collision_trea(player, trea) {
        this.blur_background.setVisible(true);
        this.frame_question.setVisible(true);
        player.setVisible(false);
        trea.destroy();
        this.treasure.setVisible(false);
        this.show_hide_content(true);
        this.open_sound.play();
        this.platforms.setVisible(false);
        this.bombs.setVelocityX(0);
        this.bombs.setVelocityY(0);
        this.bombs.setVisible(false);
    }
    true_true() {
        this.answer_true.on("pointerdown", () => {
            this.show_result_true();
        });
        this.answer_false.on("pointerdown", () => {
            this.show_result_false();
        });
    }
    true_false() {
        this.answer_true.on("pointerdown", () => {
            this.show_result_false();
        });
        this.answer_false.on("pointerdown", () => {
            this.show_result_true();
        });
    }
    show_result_true() {
        this.result_true.setVisible(true);
        this.result_false.setVisible(false);
        this.show_hide_content(false);
        this.back_text.setVisible(true);
        this.false_sound.stop();
        this.true_sound.play();
    }
    show_result_false() {
        this.result_false.setVisible(true);
        this.result_true.setVisible(false);
        this.show_hide_content(false);
        this.back_text.setVisible(true);
        this.true_sound.stop();
        this.false_sound.play();
    }
    show_hide_content(param) {
        this.lst_question[0].setVisible(param);
        this.answer_true.setVisible(param);
        this.answer_false.setVisible(param);
    }
}