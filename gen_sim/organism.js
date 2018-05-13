function Organism(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxVelocity = random(1, 2);
    this.maxForce = 0.2;
    this.health = 100;
    this.size = 3;
}

Organism.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.health -= 0.05;
};

Organism.prototype.display = function() {
    var angle = this.velocity.heading() + PI / 2;
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
        this.seek(nutrients[closest]);
    }
};

Organism.prototype.seek = function(closest) {
    var target = p5.Vector.sub(closest.position, this.position);
    target.setMag(this.maxVelocity);
    var steer = p5.Vector.sub(target, this.velocity);
    steer.limit(this.maxForce);
    this.acceleration.add(steer);
};
