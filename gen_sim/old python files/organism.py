class Organism:
    
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.position = PVector(x, y)
        self.velocity = PVector(0.0, 0.0)
        self.acceleration = PVector(0.0, 0.0)
        self.max_vel = random(1.0, 2.5)
        self.health = 100
    
    # def follow(self):
    #     mouse = PVector(mouseX, mouseY)
    #     self.acceleration = PVector.sub(mouse, self.position)
    #     self.acceleration.setMag(0.5)
    #     self.velocity.add(self.acceleration)
    #     self.velocity.limit(self.max_vel)
    #     self.position.add(self.velocity)
        
    def update(self):
        self.health -= 0.03

    def display(self):
        stroke(255)
        fill(map(self.health, 0, 100, 255, 0), map(self.health, 0, 100, 0, 255), 0)
        ellipse(self.position.x, self.position.y, 15, 15)
        
    def find_food(self, food):
        distance = float('inf')
        closest = None
        
        for i in food:
            d = i.position.dist(self.position)
            if d < distance:
                distance = d 
                closest = i
                
        if distance < 10:
            self.health += closest.nutrition
            if self.health > 100:
                health = 100
            food.remove(closest)
            
        
        self.acceleration = PVector.sub(closest.position, self.position)
        self.acceleration.setMag(0.3)
        self.velocity.add(self.acceleration)
        self.velocity.limit(self.max_vel)
        self.position.add(self.velocity) 
        
        
    
    
