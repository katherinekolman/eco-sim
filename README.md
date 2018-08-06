# eco-sim
This project is based on Daniel Shiffman's [Evolutionary Steering Behavior](https://www.youtube.com/watch?v=flxOkx0yLrY). For this project, I'm using [Processing](https://processing.org/) and the [p5.js](https://p5js.org/) library. The simulation can be found [here](https://katherinekolman.github.io/eco-sim/). To reset the simulation, just refresh the page.

This project aims to simulate simple evolution through the use of genetic algorithms.

## About this Project

There are only two different species represented in the simulation: foxes and rabbits. Foxes will attempt to hunt the rabbits, while rabbits eat the flowers that are randomly placed in the environment, which there is a fixed number of. There are three different types of flowers: blue, red, and purple. Blue flowers are the most nutritious, giving the most health back. Red flowers give back a little bit of health, while purple flowers are poisonous. Rabbits have different levels of attraction to each of the different types of flowers which is randomly generated at the beginning of the simulation.

Depending on certain conditions, the organisms will either attempt to find food or attempt to find a mate. However, their search is limited by their radius of perception; they can't see anything beyond. Their success in breeding is dependent on their fitness score, which is calculated based on the amount of time they have stayed alive. Ideally, this will mean that the organisms that are more equipped to deal with the environment (with a larger perception radius, faster speed, etc.) will be more likely to breed and pass on their genes while weaker organisms will be less likely to breed. In other words, the survival of the fittest.

## Potential Improvements
There definitely is room for improvement for this project, so here are some of the things I might want to play with in the future:
* **UI Design**: I don't really like the design of the information box on the left, and I think that more options could be included, such as a reset button or the ability to highlight a particular organism.
* **More Species**: I think having a larger and more complex food chain would introduce more interesting results genetically and overall lead to a more "realistic" simulation.
* **Tweaking Values**: Many of the rates and probabilities could use some tweaking and fine-tuning, especially the ones related to breeding.

## Resources
Languages
* JavaScript
* Processing ([p5.js](https://p5js.org/))
* HTML/CSS (with [Bootstrap](https://getbootstrap.com/))

Art

* Background from [here](https://opengameart.org/content/seamless-grass-textures-20-pack)
* Flowers made by [Sharm](https://opengameart.org/content/lpc-flower-recolor)
* Animals are from [here](https://forums.rpgmakerweb.com/index.php?threads/grannys-lists-vx-ace-animal-sprites.30456/)
