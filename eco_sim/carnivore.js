class Carnivore extends Organism {
    constructor(dna, x, y) {
        super(dna, x, y);
        this.mutate(dna);
    }

    // updates state of organism
    update() {
        super.update();

        //should only mate when they're healthy
        if (this.hunger < 50 && this.health > 50) {
            this.mode = animalModes.MATE;
            this.findMate(carnivores);
        } else {
            this.mode = animalModes.FOOD;
            this.findFood(herbivores);
        }
    }

    // draws animal sprite
    display() {
        let frame;
        let heading = this.velocity.heading()
        if (heading > -0.75 && heading < 0.75) { // left
            frame = this.animal[(this.frameCounter % 4) + 8];
        } else if (heading < -0.75 && heading > -2.35) { // up
            frame = this.animal[(this.frameCounter % 4)];
        } else if (heading < -2.35 || heading > 2.35) { // right
            frame = this.animal[(this.frameCounter % 4) + 4];
        } else { // down
            frame = this.animal[(this.frameCounter % 4) + 12];
        }

        image(frame, this.position.x, this.position.y);
        this.frameCounter++;
    }

    // try hunting for neaby herbivores
    tryHunting(prey) {
        // should be based on predator + prey health, speed
        let threshold;
        try {
            let diff = this.health - prey.health;
            threshold = map(diff, -100, 100, 0, 1) * random(.2, .8);
        } catch (err) {
            return random(1) < 0.1;
        }
        return threshold > 0.32;
    }

    // try to find nearest prey
    findFood(prey) {
        let distance = Infinity;
        let d;
        let closest = null;

        for (let i = prey.length - 1; i >= 0; i--) {
            d = prey[i].position.dist(this.position);

            if (d < 10) {
                if (this.tryHunting(prey[i])) {
                    this.health += 30;
                    this.hunger -= 40;
                    if (this.health > 100) {
                        this.health = 100;
                    }
                    if (this.hunger < 0) {
                        this.hunger = 0;
                    }
                    for (let j = organisms.length - 1; j >= 0; j--) {
                        if (prey[i] == organisms[j]) {
                            organisms.splice(j, 1);
                        }
                    }
                    prey.splice(i, 1);
                }
                return;
            }

            if (d > this.perceptionRadius) {
                continue;
            }

            if (d < distance) {
                distance = d;
                closest = prey[i];
            }
        }

        if (closest == null) {
            return;
        }

        this.seek(closest);

    }

    // finds nearby potential mates
    findMate(animals) {
        let closest = super.findMate(animals);

        // if there aren't any eligible mates nearby, find food instead
        if (closest == null) {
            this.findFood(herbivores);
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
                    case 3:
                        dna[i] += random(-.1, .1);
                        break;
                    default:
                        continue;
                        break;
                }
            }
        }
    }
}
