var organisms = [];
var nutrients = [];
var numOrgs = 20;
var numFood = 75;

function setup() {
    createCanvas(900, 650);

    for (let i = 0; i < numOrgs; i++) {
        organisms[i] = new Organism(random(900), random(650));
    }

    for (let i = 0; i < numFood; i++) {
        nutrients[i] = new Food(random(890), random(640), random(-20, 20));
    }
}

function draw() {
    background(150);

    for (let i = 0; i < organisms.length; i++) {
        if (organisms[i].health > 0) {
            organisms[i].display();
            organisms[i].findFood(nutrients);
            organisms[i].update();
        } else {
            organisms.splice(i, 1);
        }
    }

    if (organisms.length == 0) {
        for (let i = 0; i < numOrgs; i++) {
            organisms[i] = new Organism(random(650), random(450));
        }
    }

    while (nutrients.length < numFood) {
        nutrients.push(new Food(random(640), random(440), random(-20, 20)));
    }

    for (let i = 0; i < nutrients.length; i++) {
        nutrients[i].display();
    }
}
