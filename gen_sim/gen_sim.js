var organisms = [];
var nutrients = [];
var numOrgs = 20;
var numFood = 75;
var genCount = 0;
var genCounter;
var canvasHeight = 650;
var canvasWidth = 900;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    genCounter = createP("Generation count: " + genCount);

    for (let i = 0; i < numOrgs; i++) {
        organisms[i] = new Organism(random(canvasWidth), random(canvasHeight));
    }

    for (let i = 0; i < numFood; i++) {
        nutrients[i] = new Food(random(canvasWidth), random(canvasHeight), random(-20, 20));
    }
}

function draw() {
    background(150);
    genCounter.html("Generation count: " + genCount);

    for (let i = organisms.length - 1; i > -1; i--) {
        if (organisms[i].health > 0) {
            organisms[i].display();
            organisms[i].findFood(nutrients);
            organisms[i].update();
        } else {
            organisms.splice(i, 1);
        }
    }

    if (organisms.length == 0) {
        genCount++;
        for (let i = 0; i < numOrgs; i++) {
            organisms[i] = new Organism(random(canvasWidth), random(canvasHeight));
        }
    }

    while (nutrients.length < numFood) {
        nutrients.push(new Food(random(canvasWidth - 10), random(canvasHeight - 10), random(-20, 20)));
    }

    for (let i = 0; i < nutrients.length; i++) {
        nutrients[i].display();
    }
}
