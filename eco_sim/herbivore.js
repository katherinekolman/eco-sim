class Herbivore extends Organism {
    constructor(dna, x, y) {
        super(dna, x, y);
        this.mode = animalModes.FOOD;
    }

    tryBreeding() {
        // needs to account fitness score, health, hunger?, randomness
        if (1 / showBestAgent() == 1) {}

    }

    findMate() {
        let distance = Infinity;
        let d;
        let closest;

        for (let i = 0; i < herbivores.length; i++) {
            d = herbivores[i].position.dist(this.position);

            if (d < 10) {
                if (herbivores[i].mode == animalModes.MATE) {
                    this.tryBreeding();
                }
            }

            if (d > this.perceptionRadius) {
                continue
            }

            if (d < distance) {
                distance = d;
                closest = organisms[i];
            }
        }

        super.seek(closest);
    }

    update() {
        super.update();
        // if (this.hunger < 50 || this.health > 50) {
        //     this.mode = animalModes.MATE;
        //     this.findMate();
        // } else {
        //     this.mode = animalModes.FOOD;
        //     super.findFood();
        // }
    }

}
