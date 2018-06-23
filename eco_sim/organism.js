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

        this.num = num;
        num++;

        // dna values
        this.dna = dna;
        this.size = dna[0];
        this.health = dna[1];
        this.maxVelocity = dna[2];
        this.foodAttraction = dna[3];
        this.perceptionRadius = dna[4];
        this.animal = dna[5];
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

    // finds the closest food and updates health
    findFood() {
        let food = null;
        let pull = -Infinity;
        let d; // distance
        let p; // calculated attraction to food
        let type; // type of food

        for (let i = 0; i < nutrients.length; i++) {
            d = nutrients[i].position.dist(this.position);

            if (d < 5) { // if it finds food
                this.health += nutrients[i].nutrition;
                this.hunger -= 25;
                if (this.health > 100) {
                    this.health = 100;
                }
                if (this.hunger < 0) {
                    this.hunger = 0;
                }

                nutrients.splice(i, 1);
                return;
            }

            if (d > this.perceptionRadius) {
                continue;
            }

            switch (nutrients[i].nutrition) {
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
                food = nutrients[i];
            }
        }

        if (food == null) {
            return;
        }
        this.seek(food);
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

    // slightly alters dna values after death
    mutate(dna) {
        for (let i = 0; i < dna.length; i++) {
            if (random(1) > .9) {
                switch (i) {
                    case 0:
                        dna[i] += random(-.3, .3);
                        break;
                    case 1:
                        dna[i] += random(-3, 3);
                        break;
                    case 2:
                    case 4:
                        dna[i] += random(-.1, .1);
                        break;
                    case 3:
                        dna[i][0] += random(-.3, .3);
                        if (dna[i][0] > 20) {
                            dna[i][0] = 20;
                        }
                        if (dna[i][0] < -20) {
                            dna[i][0] = -20;
                        }
                        dna[i][1] += random(-.3, .3);
                        break;
                    default:
                        continue
                        break;
                }
            }
        }
    }
}
