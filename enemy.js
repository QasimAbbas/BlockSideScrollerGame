          //Creating the Enemy          
            enemies = [];
            function Enemy(I) {
                I = I || {};

                I.active = true;
                I.age = Math.floor(Math.random() * 64);
                
                I.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                
                I.y = CANVAS_HEIGHT / 4 + Math.random() * CANVAS_HEIGHT / 2;
                I.x = CANVAS_WIDTH;
                I.xVelocity =  enemySpeed;
                I.yVelocity = 0;

                I.width = 32;
                I.height = 32;

                I.inBounds = function () {
                    return I.x >= 0 && I.x <= CANVAS_WIDTH &&
                        I.y >= 0 && I.y <= CANVAS_HEIGHT;
                    
                };

                I.draw = function () {
                    canvas.fillStyle = this.color;
                    canvas.fillRect(this.x, this.y, this.width, this.height);
                };
                
                
                
                I.update = function () {
                    
                    //Enemy Didn't Die
                    if(I.x <= 1){
                        if(death == false)
                        enemySpawned -=2; 
                
                    }else if(enemySpawned < 0){
                     
                        death = true;
                    }
                    
                    I.x += I.xVelocity;
                    I.y += I.yVelocity;
                
                   I.yVelocity = 5 * Math.sin(I.age * Math.PI / 64);
             
            
                    I.age++;
                    I.active = I.active && I.inBounds();
                    

                };

                //Collision Handling
                I.explode = function () {
                    if(death == false){
                        enemySpawned += 1;
                        if(enemySpawned %2 == 0){
                            I.yVelocity = 5 * Math.cos(I.age * Math.PI / 128);
                        }
                        if(enemySpawned %10 == 0){
                            
                            difficulty += 0.01;
                          
                        }
                        
                       
                    }
                    this.active = false;
                };

                return I;
            };