class Organism {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.maxVelocity = random(1, 2);
        this.maxForce = 0.2;
        this.health = 100;
        this.size = 3;
    }

    // updates the physics and health of the agent
    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxVelocity);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.health -= 0.05;
    }
    
    // displays the location of the agent
    display() {
        let angle = this.velocity.heading() + PI / 2;
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
        fill(map(this.health, 0, 100, 255, 0), map(this.health, 0, 100, 0, 255), 0);
        beginShape();
        vertex(0, -this.size * 3);
        vertex(-this.size * 2, this.size * 3);
        vertex(this.size * 2, this.size * 3);
        endShape(CLOSE);
        pop();
    }

    // finds the closest food and updates health
    findFood(nutrients) {
        let distance = Infinity;
        let closest = null;

        for (let i = 0; i < nutrients.length; i++) {
            let d = nutrients[i].position.dist(this.position);
            if (d < distance) {
                distance = d;
                closest = i;
            }
        }

        if (distance < 10) {
            this.health += nutrients[closest].nutrition;

            if (this.health > 100) {
                this.health = 100;
            }
            nutrients.splice(closest, 1);
        } else {
            this.seek(nutrients[closest]);
        }
    }

    // seeks the closest food object
    seek(closest) {
        let target = p5.Vector.sub(closest.position, this.position);
        target.setMag(this.maxVelocity);
        let steer = p5.Vector.sub(target, this.velocity);
        steer.limit(this.maxForce);
        this.acceleration.add(steer);
    }
}
