import organism as o
import food

organisms = []
nutrients = []
mouse = PVector()

def setup():
    size(650, 450)
    
    mouse = PVector(mouseX, mouseY)
    mouse.setMag(5)
    
    for i in range(0, 5):
        organisms.append(o.Organism(random(650), random(450)))
    
    for i in range(0, 20):
        nutrients.append(food.Food(random(640), random(440), random(-20, 20)))
    
def draw():
    background(150)

    for org in organisms:
        if org.health > 0:
            org.display()
            #org.follow()
            org.find_food(nutrients)
            org.update()
        else:
            organisms.remove(org)
            
    if len(organisms) == 0:
        for i in range(0, 5):
            organisms.append(o.Organism(random(650), random(450)))
        
    while len(nutrients) < 20:
            nutrients.append(food.Food(random(640), random(440), random(-20, 20)))
        
    for nutrient in nutrients:
        nutrient.display()
        
    
    
