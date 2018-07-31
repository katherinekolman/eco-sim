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


    update() {
        super.update();

        // should only mate when they're healthy
        if (this.hunger < 50 && this.health > 50) {
             this.mode = animalModes.MATE;
             this.findMate(herbivores);
        } else {
          this.mode = animalModes.FOOD;
          super.findFood();
        }
    }

}
