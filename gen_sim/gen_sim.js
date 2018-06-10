var organisms = [];
var nutrients = [];
var numOrgs = 15;
var numFood = 75;
var canvasHeight = 650; // 650
var canvasWidth = 1200; // 900

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
        ellipse(bestAgent.position.x, bestAgent.position.y, 50, 50);
    }

    return bestAgent.fitness;
}

// shows how far the agent can detect things
function showPerceptionRadius() {
    for (let i = 0; i < organisms.length; i++) {
        noFill();
        stroke(0, 255, 0);
        strokeWeight(2);
        ellipse(organisms[i].position.x, organisms[i].position.y, organisms[i].perceptionRadius * 2);
    }
}

function showFoodAttraction() {
    for (let i = 0; i < organisms.length; i++) {
        noFill();
        stroke(map(organisms[i].foodAttraction[0], 0, 10, 255, 0), map(organisms[i].foodAttraction[0], 0, 10, 0, 255), 0);
        strokeWeight(1);

        let angle = organisms[i].velocity.heading() - PI / 2;

        push();
        translate(organisms[i].position.x, organisms[i].position.y);
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
        organisms.push(new Organism([3, 100, random(1, 2), [random(10), random(10), random(10)], random(20, 120)], random(canvasWidth), random(canvasHeight)));
    }
}

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("sketch");
    background(150);

    foodValues = [-20, 3, 15];
    for (let i = 0; i < numFood; i++) {
        nutrients[i] = new Food(random(canvasWidth), random(canvasHeight), random(foodValues));
    }

    // populate environment with random agents
    for (let i = 0; i < numOrgs; i++) {
        organisms[i] = new Organism([3, 100, random(1, 2), [random(10), random(10), random(10)], random(20, 120)], random(canvasWidth), random(canvasHeight));
    }
}

// updates the environment
function draw() {
    stroke(0);
    strokeWeight(1);
    background(150);

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

    while (nutrients.length < numFood) {
        nutrients.push(new Food(random(canvasWidth - 10), random(canvasHeight - 10), random(foodValues)));
    }

    for (let i = 0; i < nutrients.length; i++) {
        nutrients[i].display();
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
