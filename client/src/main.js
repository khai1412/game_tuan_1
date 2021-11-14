window.addEventListener('load', function() {

    var game = new Phaser.Game({
        width: 750,
        height: 750,
        type: Phaser.AUTO,
        backgroundColor: "#242424",
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {},
                debug: false
            }
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
    });

    game.scene.add("Preload", Preload);
    game.scene.add("Level", Level);
    game.scene.add("Boot", Boot);
    game.scene.add("man1", Man1, true);
    game.scene.add("man2", man2);
});

class Boot extends Phaser.Scene {

    preload() {
        //this.scene.start("Level");
        this.load.pack("pack", "assets/preload-asset-pack.json");

        this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Preload"));
    }
}