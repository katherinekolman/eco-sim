// This is the main file for the simulation. It handles the setup + drawing of
// the scene and general organism logic.

// organism arrays
var organisms = [];
var herbivores = [];
var carnivores = [];
var nutrients = [];

// sprite images
var rabbitFrames = [];
var foxFrames = [];
var flowerImages = [];

// window information
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var bg;

// animal information
var numOrgs = 20;
var numFood = 100;
var num = 0; // unique organism ID
var animalModes = Object.freeze({
    "FOOD": 1,
    "MATE": 2
});


// loads all the animal/food sprites
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

    foxFrames.push(loadImage("eco_sim/images/foxb1.png"));
    foxFrames.push(loadImage("eco_sim/images/foxb2.png"));
    foxFrames.push(loadImage("eco_sim/images/foxb3.png"));
    foxFrames.push(loadImage("eco_sim/images/foxb2.png"));
    foxFrames.push(loadImage("eco_sim/images/foxl1.png"));
    foxFrames.push(loadImage("eco_sim/images/foxl2.png"));
    foxFrames.push(loadImage("eco_sim/images/foxl3.png"));
    foxFrames.push(loadImage("eco_sim/images/foxl2.png"));
    foxFrames.push(loadImage("eco_sim/images/foxr1.png"));
    foxFrames.push(loadImage("eco_sim/images/foxr2.png"));
    foxFrames.push(loadImage("eco_sim/images/foxr3.png"));
    foxFrames.push(loadImage("eco_sim/images/foxr2.png"));
    foxFrames.push(loadImage("eco_sim/images/foxf1.png"));
    foxFrames.push(loadImage("eco_sim/images/foxf2.png"));
    foxFrames.push(loadImage("eco_sim/images/foxf3.png"));
    foxFrames.push(loadImage("eco_sim/images/foxf2.png"));

    flowerImages.push(loadImage("eco_sim/images/blueflower.png"));
    flowerImages.push(loadImage("eco_sim/images/redflower.png"));
    flowerImages.push(loadImage("eco_sim/images/purpleflower.png"));
}

// sets up the environment
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
        nutrients[i] = new Food(random(canvasWidth - 10), random(canvasHeight - 10),
            random(foodValues), flowerImages);
    }

    // populate environment with random agents
    for (let i = 0; i < numOrgs; i++) {
        // twice as many herbivores as carnivores to start
        herbivores[i] = new Herbivore([100, random(3, 5), [random(10), random(10), random(10)],
                random(window.innerHeight * 0.05, window.innerHeight * 0.2), rabbitFrames
            ],
            random(canvasWidth), random(canvasHeight));
        herbivores[i] = new Herbivore([100, random(3, 5), [random(10), random(10), random(10)],
                random(window.innerHeight * 0.05, window.innerHeight * 0.2), rabbitFrames
            ],
            random(canvasWidth), random(canvasHeight));
        carnivores[i] = new Carnivore([100, random(4, 6), [5, 5, 5],
                random(window.innerHeight * 0.05, window.innerHeight * 0.2), foxFrames
            ],
            random(canvasWidth), random(canvasHeight));
        organisms.push(herbivores[i]);
        organisms.push(carnivores[i]);
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
        nutrients.push(new Food(random(canvasWidth - 10), random(canvasHeight - 10),
            random(foodValues), flowerImages));
    }

    for (let i = 0; i < nutrients.length; i++) {
        nutrients[i].display();
    }

    for (let i = organisms.length - 1; i >= 0; i--) {
        if (organisms[i].health > 0) {
            organisms[i].display();
            organisms[i].keepInBounds(canvasWidth, canvasHeight);
            organisms[i].update();
        } else {
            if (organisms[i].constructor.name == "Herbivore") {
                for (let j = herbivores.length - 1; j >= 0; j--) {
                    if (herbivores[i] == organisms[i]) {
                        herbivores.splice(j, 1);
                    }
                }
            }
            if (organisms[i].constructor.name == "Carnivore") {
                for (let j = carnivores.length - 1; j >= 0; j--) {
                    if (carnivores[i] == organisms[i]) {
                        carnivores.splice(j, 1);
                    }
                }
            }
            organisms.splice(i, 1);
        }
    }

    if (organisms.length == 0) {
        return;
    }

    // debugging info
    if (document.getElementById("best_agent").checked) {
        showBestAgent(organisms);
    }
    if (document.getElementById("food_radius").checked) {
        showPerceptionRadius();
    }
    if (document.getElementById("food_attraction").checked) {
        showFoodAttraction();
    }
}

// adds a new herbivore to environment if the user clicks
function mousePressed() {
    if (mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight) {
        herbivores.push(new Herbivore([100, random(1, 2), [random(10), random(10), random(10)],
                random(window.innerHeight * 0.05, window.innerHeight * 0.2), rabbitFrames],
                mouseX, mouseY));
        organisms.push(herbivores[herbivores.length - 1]);
    }
}
