class man2 extends Phaser.Scene {
    constructor() {
        super("man2");
    }
    preload() {
        this.load.image('main_background', 'assets/background_scene_2.png');
        this.load.image('blur_background', 'assets/background_blur.jpg');
        this.load.image('frame_question', 'assets/game_frame.png');
        this.load.image('treasure', 'assets/treasure.png');
        this.load.spritesheet('player1', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }
    create() {
        this.add.image(0, 0, 'main_background').setOrigin(0, 0).setScale(375 / 512, 375 / 256).setVisible(true);
        this.blur_background = this.add.image(0, 0, 'blur_background').setOrigin(0, 0).setScale(2 / 3, 375 / 374).setVisible(false);
        this.treasures = this.physics.add.group();
        this.treas = [];
        this.treas_x = 150;
        for (var i = 0; i < 4; i++) {
            this.treas[i] = this.treasures.create(this.treas_x, 610, 'treasure').setScale(0.15);
            this.treas_x += 180;
        }
        this.frame_question = this.add.image(5, 120, 'frame_question').setOrigin(0, 0).setScale(37 / 30, 250 / 183).setVisible(false);
        this.question_1 = this.add.text(210, 250, "Coding Project có 4 nhà tài\n\ntrợ đúng không?", { fontSize: 20, color: "#000" }).setVisible(false);
        this.answer_true = this.add.text(210, 400, "TRUE", { fontSize: 20, color: "#000" }).setVisible(false);
        this.answer_false = this.add.text(470, 400, "FAlSE", { fontSize: 20, color: "#000" }).setVisible(false);

        this.player = this.player = this.physics.add.sprite(20, 598, 'player1');
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key: 'left_1',
            frames: this.anims.generateFrameNumbers('player1', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'player1', frame: 4 }],
            frameRate: 10

        })
        this.anims.create({
            key: 'right_1',
            frames: this.anims.generateFrameNumbers('player1', { start: 5, end: 8 }),
            frameRate: 5,
            repeat: -1
        })
        this.physics.add.overlap(this.player, this.treas[0], this.collision_trea, null, this);
    }
    update() {
        var keyboard = this.input.keyboard.createCursorKeys();
        if (keyboard.left.isDown) {
            this.player.setVelocityX(-100);
            this.player.anims.play('left_1', true);
        } else if (keyboard.right.isDown) {
            this.player.setVelocityX(100);
            this.player.anims.play('right_1', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn', true);
        }
        //this.player.anims.play('right_1',true);
    }
    collision_trea(player, trea) {
        trea.disableBody(true, true);
        this.treasures.setVisible(false);
        this.blur_background.setVisible(true);
        this.frame_question.setVisible(true);
        player.setVisible(false);
        this.question_1.setVisible(true);
        this.answer_true.setVisible(true);
        this.answer_false.setVisible(true);
    }
}