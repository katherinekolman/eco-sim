var organisms = [];
var nutrients = [];
var numOrgs = 20;
var numFood = 75;
var canvasHeight = 650;
var canvasWidth = 900;

// function createEnvironment () {}

// locates the agent with the highest fitness score
function findBestAgent() {
    bestAgent = organisms[0];
    for (let i = 0; i < organisms.length; i++) {
        if (organisms[i].fitness > bestAgent.fitness) {
            bestAgent = organisms[i];
        }
    }

    noFill();
    stroke(255, 0, 0);
    strokeWeight(3);
    ellipse(bestAgent.position.x, bestAgent.position.y, 50, 50);

    return bestAgent.fitness;
}


function setup() {
    createCanvas(canvasWidth, canvasHeight);

    //createEnvironment();

    for (let i = 0; i < numOrgs; i++) {
        organisms[i] = new Organism([3, 100, random(1, 2)], random(canvasWidth), random(canvasHeight));
    }

    for (let i = 0; i < numFood; i++) {
        nutrients[i] = new Food(random(canvasWidth), random(canvasHeight), random(-20, 20));
    }
}

// updates the environment
function draw() {
    background(150);
    stroke(0);
    strokeWeight(1);

    for (let i = organisms.length - 1; i > -1; i--) {
        if (organisms[i].health > 0) {
            organisms[i].display();
            organisms[i].findFood(nutrients);
            organisms[i].update();
        } else {
            if (((organisms[i].fitness / findBestAgent()) * random(.4, .7)) >= .3) { // FIXME find different way of calculating this
                organisms[i].mutate(organisms[i].dna);
                organisms.push(new Organism(organisms[i].dna, organisms[i].position.x, organisms[i].position.y));
            }

            organisms.splice(i, 1);
            stroke(0);
            strokeWeight(1);
        }
    }

    while (nutrients.length < numFood) {
        nutrients.push(new Food(random(canvasWidth - 10), random(canvasHeight - 10), random(-20, 20)));
    }

    for (let i = 0; i < nutrients.length; i++) {
        nutrients[i].display();
    }

    findBestAgent();


}
