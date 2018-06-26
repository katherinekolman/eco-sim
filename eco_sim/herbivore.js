class Herbivore extends Organism {
    constructor(dna, x, y) {
        super(dna, x, y);
        this.mode = animalModes.FOOD;
    }

    crossover(mateDNA) {
        // performs the genetic mutations and crossover for the new organism
        // randomly choose which dna trait to pick from each parent
        let childDNA = [];
        for (let i = 0; i < mateDNA.length; i++) {
            if (random() > .5) {
                childDNA.push(this.dna[i]);
            }
            else {
                childDNA.push(mateDNA[i]);
            }
        }
        return childDNA;
    }

    tryBreeding(mateDNA) {
        // needs to account fitness score, health, hunger?, randomness
        if (((this.fitness / showBestAgent()) * (this.health / 100) * random(.3, .8)) >= .2) {
            herbivores.push(new Herbivore(this.crossover(mateDNA), this.x, this.y));
        }
    }

    findMate() {
        let distance = Infinity;
        let d;
        let closest;

        for (let i = 0; i < herbivores.length; i++) {
            d = herbivores[i].position.dist(this.position);

            if (d < 10) {
                if (herbivores[i].mode == animalModes.MATE) {
                    this.tryBreeding(herbivores[i].dna);
                }
            }

            if (d > this.perceptionRadius) {
                continue;
            }

            if (d < distance) {
                distance = d;
                closest = herbivores[i];
            }
        }
        super.seek(closest);
    }

    update() {
        super.update();
        if (this.hunger < 50) {
            this.mode = animalModes.MATE;
            this.findMate();
        } else {
            this.mode = animalModes.FOOD;
            super.findFood();
        }
    }

}
