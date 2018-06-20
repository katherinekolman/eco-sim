class Herbivore extends Organism {
    constructor(x, y) {
        super();
        this.mode = animalModes.FOOD;
    }

    update() {
        super();
        if (this.hunger < 50 || this.health > 50) {
            this.mode = animalModes.MATE;
            findMate();
        } else {
            findFood();
        }
    }

    tryBreeding() {
        // needs to account fitness score, health, hunger?, randomness
    }

    findMate() {
        let distance = Infinity;
        let d;
        let closest;

        for (let i = 0; i < herbivores.length; i++) {
            d = herbivores[i].position.dist(this.position);

            if (d < 10) {
                if (herbivores[i].mode == animalModes.MATE) {
                    tryBreeding();
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

        seek(closest);
    }

}
