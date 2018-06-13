class Food {
    constructor(x, y, nutrition, images) {
        this.position = createVector(x, y);
        this.nutrition = nutrition;
        this.dna = [this.nutrition, this.position];
        this.images = images;
    }

    // displays position of food
    display() {
        // fill(map(this.nutrition, -20, 15, 255, 0), map(this.nutrition, -20, 15, 0, 255), 0);
        // ellipse(this.position.x, this.position.y, 7, 7);
        switch (this.nutrition) {
            case -20:
                image(this.images[2], this.position.x, this.position.y);
                break;
            case 3:
                image(this.images[1], this.position.x, this.position.y);
                break;
            case 15:
            default:
                image(this.images[0], this.position.x, this.position.y);
                break;
        }
    }
}
