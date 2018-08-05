class Organism {
    constructor(dna, x, y) {
        // physics of agent
        this.position = createVector(x, y);
        this.velocity = createVector(random(3), random(3));
        this.acceleration = createVector(0, 0);
        this.maxForce = 0.2;

        // fitness score
        this.fitness = 0;

        // hunger level
        this.hunger = 0;

        // for graphics
        this.frameCounter = 0;

        // organism ID number (for cell in infobox table)
        this.num = num;
        num++;

        // default mode
        this.mode = animalModes.FOOD;

        // dna
        this.dna = dna;
        this.health = dna[0];
        this.maxVelocity = dna[1];
        this.foodAttraction = dna[2];
        this.perceptionRadius = dna[3];
        this.animal = dna[4];
    }

    // updates the physics and health of the agent
    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxVelocity);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.health -= 0.01;
        this.fitness += .1;
        this.hunger += 0.05;

        if (this.hunger > 100) {
            this.health -= 1;
        } else if (this.hunger > 60) {
            this.health -= .6;
        } else if (this.hunger > 30) {
            this.health -= .3;
        }
    }

    // displays the location of the agent
    display() {
        let frame;
        let heading = this.velocity.heading()
        if (heading > -0.75 && heading < 0.75) { // left
            frame = this.animal[(this.frameCounter % 3) + 6];
        } else if (heading < -0.75 && heading > -2.35) { // up
            frame = this.animal[(this.frameCounter % 3)];
        } else if (heading < -2.35 || heading > 2.35) { // right
            frame = this.animal[(this.frameCounter % 3) + 3];
        } else { // down
            frame = this.animal[(this.frameCounter % 3) + 9];
        }

        image(frame, this.position.x, this.position.y);
        this.frameCounter++;
    }

    // physics for seeking the desired food object
    seek(closest) {
        let target = p5.Vector.sub(closest.position, this.position);
        target.setMag(this.maxVelocity);
        let steer = p5.Vector.sub(target, this.velocity);
        steer.limit(this.maxForce);
        this.acceleration.add(steer);
    }

    // keeps the agents on screen
    keepInBounds(width, height) {
        let d = 10;
        let desired = null;
        if (this.position.x < d) {
            desired = createVector(this.maxVelocity, this.velocity.y);
        } else if (this.position.x > width - d) {
            desired = createVector(-this.maxVelocity, this.velocity.y);
        }

        if (this.position.y < d) {
            desired = createVector(this.velocity.x, this.maxVelocity);
        } else if (this.position.y > height - d) {
            desired = createVector(this.velocity.x, -this.maxVelocity);
        }

        if (desired !== null) {
            desired.setMag(this.maxVelocity);
            let steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxForce);
            this.acceleration.add(steer);
        }
    }

    // attempt to produce a new organism
    tryBreeding(animals, mateDNA) {
        // needs to account fitness score, health,  randomness
        let threshold = ((this.fitness / showBestAgent(animals)) * (this.health / 100) * random(.3, .8));

        if (threshold >= .79) {
            if (animals[0].constructor.name == "Herbivore") {
                animals.push(new Herbivore(this.crossover(mateDNA), this.position.x, this.position.y));
                organisms.push(herbivores[herbivores.length - 1]);
            }
            if (animals[0].constructor.name == "Carnivore") {
                animals.push(new Carnivore(this.crossover(mateDNA), this.position.x, this.position.y));
                organisms.push(carnivores[carnivores.length - 1]);
            }
        }
    }

    // randomizes child DNA between the two parents' DNA
    crossover(mateDNA) {
        // performs the genetic crossover for the new organism
        // randomly choose which dna trait to pick from each parent
        let childDNA = [];
        for (let i = 0; i < mateDNA.length; i++) {
            if (random() > .5) {
                childDNA.push(this.dna[i]);
            } else {
                childDNA.push(mateDNA[i]);
            }
        }

        return childDNA;
    }

    findMate(animals) {
        let distance = Infinity;
        let d;
        let closest = null;

        for (let i = 0; i < animals.length; i++) {
            // can't breed with itself
            if (animals[i].num == this.num) {
                continue;
            }

            d = animals[i].position.dist(this.position);

            if (d < 10) {
                if (animals[i].mode == animalModes.MATE) {
                    this.tryBreeding(animals, animals[i].dna);
                }
            }

            if (d > this.perceptionRadius) {
                continue;
            }

            if (d < distance) {
                distance = d;
                closest = animals[i];
            }
        }
        return closest;
    }
}
