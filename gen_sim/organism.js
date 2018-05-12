function Organism(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(1), random(1));
    this.acceleration = createVector(0, 0);
    this.maxVelocity = random(1, 2.5);
    this.health = 100;
}

Organism.prototype.update = function() {
    this.health -= 0.03;
};

Organism.prototype.display = function() {
    stroke(0);
    fill(map(this.health, 0, 100, 255, 0), map(this.health, 0, 100, 0, 255), 0);
    ellipse(this.position.x, this.position.y, 15, 15);
};

Organism.prototype.findFood = function(nutrients) {
    distance = Infinity;
    closest = null;

    for (let i = 0; i < nutrients.length; i++) {
        d = nutrients[i].position.dist(this.position);
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
        this.acceleration = p5.Vector.sub(nutrients[closest].position, this.position);
        this.acceleration.setMag(0.3);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxVelocity);
        this.position.add(this.velocity);
    }
};
