class Food {
    constructor(x, y, nutrition, images) {
        this.position = createVector(x, y);
        this.nutrition = nutrition;
        this.dna = [this.nutrition, this.position];
        this.images = images;
    }

    // displays position of food
    display() {
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
