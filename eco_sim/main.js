var organisms = [];
var nutrients = [];
var rabbitFrames = [];
var flowerImages = [];
var numOrgs = 5;
var numFood = 30;
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight - window.innerHeight * .15; 
var bg;

// locates the agent with the highest fitness score
function showBestAgent() {
    bestAgent = organisms[0];
    for (let i = 0; i < organisms.length; i++) {
        if (organisms[i].fitness > bestAgent.fitness) {
            bestAgent = organisms[i];
        }
    }

    if (document.getElementById("best_agent").checked) {
        noFill();
        stroke(255, 0, 0);
        strokeWeight(3);
        ellipse(bestAgent.position.x + 15, bestAgent.position.y + 15, 50, 50);
    }

    return bestAgent.fitness;
}

// shows how far the agent can detect things
function showPerceptionRadius() {
    for (let i = 0; i < organisms.length; i++) {
        noFill();
        stroke(0, 255, 0);
        strokeWeight(2);
        ellipse(organisms[i].position.x + 15, organisms[i].position.y + 15, organisms[i].perceptionRadius * 2);
    }
}

// shows the attraction each agent has to the 3 food types
function showFoodAttraction() {
    for (let i = 0; i < organisms.length; i++) {
        noFill();
        stroke(map(organisms[i].foodAttraction[0], 0, 10, 255, 0), map(organisms[i].foodAttraction[0], 0, 10, 0, 255), 0);
        strokeWeight(1);

        let angle = organisms[i].velocity.heading() - PI / 2;

        push();
        translate(organisms[i].position.x + 15, organisms[i].position.y + 15);
        rotate(angle);
        line(0, 0, 0, organisms[i].foodAttraction[0] * 10); // attraction to most nutritious food
        stroke(map(organisms[i].foodAttraction[1], 0, 10, 255, 0), map(organisms[i].foodAttraction[1], 0, 10, 0, 255), 0);
        strokeWeight(2);
        line(0, 0, 0, organisms[i].foodAttraction[1] * 10); // attraction to semi-nutritous food
        stroke(map(organisms[i].foodAttraction[2], 0, 10, 255, 0), map(organisms[i].foodAttraction[2], 0, 10, 0, 255), 0);
        strokeWeight(3);
        line(0, 0, 0, organisms[i].foodAttraction[2] * 10); // attraction to poisonous food
        pop();
    }
}

// adds a new agent to environment if user clicks
function mousePressed() {
    if (mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight) {
        organisms.push(new Organism([3, 100, random(1, 2), [random(10), random(10), random(10)], random(20, 120), rabbitFrames],
            mouseX, mouseY));
    }
}

// loads all the necessary images into their respective arrays
function loadImages() {
    rabbitFrames.push(loadImage("eco_sim/images/rabbitb2.png"));
    rabbitFrames.push(loadImage("eco_sim/images/rabbitb1.png"));
    rabbitFrames.push(loadImage("eco_sim/images/rabbitb3.png"));
    rabbitFrames.push(loadImage("eco_sim/images/rabbitl2.png"));
    rabbitFrames.push(loadImage("eco_sim/images/rabbitl1.png"));
    rabbitFrames.push(loadImage("eco_sim/images/rabbitl3.png"));
    rabbitFrames.push(loadImage("eco_sim/images/rabbitr2.png"));
    rabbitFrames.push(loadImage("eco_sim/images/rabbitr1.png"));
    rabbitFrames.push(loadImage("eco_sim/images/rabbitr3.png"));
    rabbitFrames.push(loadImage("eco_sim/images/rabbitf2.png"));
    rabbitFrames.push(loadImage("eco_sim/images/rabbitf1.png"));
    rabbitFrames.push(loadImage("eco_sim/images/rabbitf3.png"));

    flowerImages.push(loadImage("eco_sim/images/blueflower.png"));
    flowerImages.push(loadImage("eco_sim/images/redflower.png"));
    flowerImages.push(loadImage("eco_sim/images/purpleflower.png"));
}

function setup() {
    bg = loadImage("eco_sim/images/grass20.png");
    canvas = createCanvas(canvasWidth, canvasHeight, P2D);
    canvas.parent("sketch");
    loadImages();
    frameRate(8);

    foodValues = [-20, 3, 15];
    for (let i = 0; i < numFood; i++) {
        nutrients[i] = new Food(random(canvasWidth), random(canvasHeight), random(foodValues), flowerImages);
    }

    // populate environment with random agents
    for (let i = 0; i < numOrgs; i++) {
        organisms[i] = new Organism([3, 100, random(3, 5), [random(10), random(10), random(10)], random(20, 120), rabbitFrames],
            random(canvasWidth), random(canvasHeight));
    }
}

// updates the environment
function draw() {
    background(bg);

    while (nutrients.length < numFood) {
        nutrients.push(new Food(random(canvasWidth - 10), random(canvasHeight - 10), random(foodValues), flowerImages));
    }

    for (let i = 0; i < nutrients.length; i++) {
        nutrients[i].display();
    }

    for (let i = organisms.length - 1; i > -1; i--) {
        if (organisms[i].health > 0) {
            organisms[i].display();
            organisms[i].findFood(nutrients);
            organisms[i].keepInBounds(canvasWidth, canvasHeight);
            organisms[i].update();
        } else {
            if (((organisms[i].fitness / showBestAgent()) + random(.1, .4)) >= .6) { // FIXME find different way of calculating this
                organisms[i].mutate(organisms[i].dna);
                organisms.push(new Organism(organisms[i].dna, organisms[i].position.x, organisms[i].position.y));
            }

            organisms.splice(i, 1);
            stroke(0);
            strokeWeight(1);
        }
    }

    // debugging info
    showBestAgent();
    if (document.getElementById("food_radius").checked) {
        showPerceptionRadius();
    }
    if (document.getElementById("food_attraction").checked) {
        showFoodAttraction();
    }

}
