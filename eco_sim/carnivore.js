class Carnivore extends Organism {

    constructor(x, y) {
        super(x, y);
    }

    seek(prey) {
        let distance = Infinity;
        let d;
        let closest;

        for (let i = prey.length - 1; i >= 0; i--) {
            d = prey[i].position.dist(this.position);

            if (d < 10) {
                prey.splice(i, 1);
            }

            if (d > this.perceptionRadius) {
                continue
            }

            if (d < distance) {
                distance = d;
                closest = prey[i];
            }
        }

        seek(closest);

    }

}
