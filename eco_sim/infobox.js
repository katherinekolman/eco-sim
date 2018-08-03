// This file contains everything in the information box to the left of the simulation

function updateTable() {
    let table = document.getElementById("org_table");

    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(1);
    }

    for (let i = 0; i < organisms.length; i++) {
        let row = table.insertRow(-1);
        orgCell = row.insertCell(0);
        healthCell = row.insertCell(1);
        hungerCell = row.insertCell(2);
        fitnessCell = row.insertCell(3);

        orgCell.innerHTML = organisms[i].num;
        healthCell.innerHTML = organisms[i].health.toFixed(2);
        hungerCell.innerHTML = organisms[i].hunger.toFixed(2);
        fitnessCell.innerHTML = organisms[i].fitness.toFixed(2);
    }
}


// locates the agent with the highest fitness score
function showBestAgent(animalType) {
    bestAgent = animalType[0];
    for (let i = 0; i < animalType.length; i++) {
        if (animalType[i].fitness > bestAgent.fitness) {
            bestAgent = animalType[i];
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
