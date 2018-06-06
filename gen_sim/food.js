class Food {
    constructor(x, y, nutrition) {
        this.position = createVector(x, y);
        this.nutrition = nutrition;
        this.dna = [this.nutrition, this.position]
    }

    // displays position of food
    display() {
        fill(map(this.nutrition, -20, 15, 255, 0), map(this.nutrition, -20, 15, 0, 255), 0);
        ellipse(this.position.x, this.position.y, 7, 7);
    }
}
