var organisms = [];
var herbivores = [];
var nutrients = [];
var rabbitFrames = [];
var flowerImages = [];
var numOrgs = 20;
var numFood = 100;
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var bg;
var num = 0;
var animalModes = Object.freeze({"FOOD": 1, "MATE": 2});


// adds a new agent to environment if user clicks
function mousePressed() {
    if (mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight) {
        organisms.push(new Organism([3, 100, random(1, 2), [random(10), random(10), random(10)], random(window.innerHeight * 0.05, window.innerHeight * 0.2), rabbitFrames],
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

    fr = parseInt(document.getElementById("slider").value);
    frameRate(fr);
    document.getElementById("framerate").innerHTML = "Framerate: " + fr;

    foodValues = [-20, 3, 15];
    for (let i = 0; i < numFood; i++) {
        nutrients[i] = new Food(random(canvasWidth - 10), random(canvasHeight - 10), random(foodValues), flowerImages);
    }

    // populate environment with random agents
    for (let i = 0; i < numOrgs; i++) {
        organisms[i] = new Organism([3, 100, random(3, 5), [random(10), random(10), random(10)], random(window.innerHeight * 0.05, window.innerHeight * 0.2), rabbitFrames],
            random(canvasWidth), random(canvasHeight));
    }

}

// updates the environment
function draw() {
    background(bg);

    if (parseInt(document.getElementById("slider").value) != fr) {
        fr = parseInt(document.getElementById("slider").value);
        frameRate(fr);
        document.getElementById("framerate").innerHTML = "Framerate: " + fr;
    }

    updateTable();

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
            // if (((organisms[i].fitness / showBestAgent()) + random(.1, .4)) >= .6) { // FIXME find different way of calculating this
            //     organisms[i].mutate(organisms[i].dna);
            //     organisms.push(new Organism(organisms[i].dna, organisms[i].position.x, organisms[i].position.y));
            // }

            organisms.splice(i, 1);
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
