var organisms = [];
var nutrients = [];
var numOrgs = 20;
var numFood = 75;
var canvasHeight = 650;
var canvasWidth = 900;

function setup() {
    createCanvas(canvasWidth, canvasHeight);

    //createEnvironment();

    for (let i = 0; i < numOrgs; i++) {
        organisms[i] = new Organism(random(canvasWidth), random(canvasHeight));
    }

    for (let i = 0; i < numFood; i++) {
        nutrients[i] = new Food(random(canvasWidth), random(canvasHeight), random(-20, 20));
    }
}

// updates the environment
function draw() {
    background(150);

    for (let i = organisms.length - 1; i > -1; i--) {
        if (organisms[i].health > 0) {
            organisms[i].display();
            organisms[i].findFood(nutrients);
            organisms[i].update();
        } else {
            organisms[i].
            organisms.splice(i, 1);
            organisms.push(new Organism(organisms[i]))
        }
    }

    // old way of making organisms
    // if (organisms.length == 0) {
    //     genCount++;
    //     for (let i = 0; i < numOrgs; i++) {
    //         organisms[i] = new Organism(random(canvasWidth), random(canvasHeight));
    //     }
    // }

    while (nutrients.length < numFood) {
        nutrients.push(new Food(random(canvasWidth - 10), random(canvasHeight - 10), random(-20, 20)));
    }

    for (let i = 0; i < nutrients.length; i++) {
        nutrients[i].display();
    }
}
