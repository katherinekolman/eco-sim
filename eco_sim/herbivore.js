class Herbivore extends Organism {
    constructor(dna, x, y) {
        super(this.mutate(dna), x, y);
    }

    // finds the nearest plant to eat
    findFood(food) {
        let closest = null;
        let pull = -Infinity;
        let d; // distance
        let p; // calculated attraction to food
        let type; // type of food

        for (let i = 0; i < food.length; i++) {
            d = food[i].position.dist(this.position);

            if (d < 5) { // if it finds food
                this.health += food[i].nutrition;
                this.hunger -= 25;
                if (this.health > 100) {
                    this.health = 100;
                }
                if (this.hunger < 0) {
                    this.hunger = 0;
                }

                food.splice(i, 1);
                return;
            }

            if (d > this.perceptionRadius) {
                continue;
            }

            switch (food[i].nutrition) {
                case -20:
                    type = 0;
                    break;
                case 15:
                    type = 2;
                    break;
                case 3:
                default:
                    type = 1;
                    break;
            }

            p = (1 / d) * this.foodAttraction[type];

            if (p > pull) {
                pull = p;
                closest = food[i];
            }
        }

        if (closest == null) {
            return;
        }
        this.seek(closest);
    }

    // looks for nearby organism of same species to breed with
    findMate(animals) {
        let closest = super.findMate(animals);

        // if there aren't any eligible mates nearby, find food instead
        if (closest == null) {
            this.findFood(nutrients);
            return;
        }

        this.seek(closest);
    }

    // slightly alters dna values for new child
    mutate(dna) {
        for (let i = 0; i < dna.length; i++) {
            if (random(1) > .9) {
                switch (i) {
                    case 0:
                        dna[i] += random(-3, 3);
                        break;
                    case 1:
                        dna[i] += random(-.1, .1);
                        break;
                    case 2:
                        dna[i][0] += random(-.3, .3);
                        if (dna[i][0] > 10) {
                            dna[i][0] = 10;
                        }
                        if (dna[i][0] < -10) {
                            dna[i][0] = -10;
                        }
                        dna[i][1] += random(-.3, .3);
                        break;
                    case 3:
                        dna[i] += random(-10, 10);
                    default:
                        continue
                        break;
                }
            }
        }
    }

    // updates state of organism
    update() {
        super.update();

        // should only mate when they're healthy
        if (this.hunger < 50 && this.health > 50) {
            this.mode = animalModes.MATE;
            this.findMate(herbivores);
        } else {
            this.mode = animalModes.FOOD;
            this.findFood(nutrients);
        }
    }
}
