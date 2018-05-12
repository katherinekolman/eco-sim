class Food:
    
    def __init__(self, x, y, nutrition):
        self.position = PVector(x, y)
        self.nutrition = nutrition
        
    def display(self):
        stroke(0)
        # if self.nutrition > 0:
        #     fill(0, 255, 0)
        # else:
        #     fill(255, 0, 0)
        
        fill(map(self.nutrition, -20, 20, 255, 0), map(self.nutrition, -20, 20, 0, 255), 0)
        
        ellipse(self.position.x, self.position.y, 7, 7)
        
