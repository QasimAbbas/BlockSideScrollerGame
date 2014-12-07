       //Making the Player       
            var player = {
                color: "#00A",
                x: 220,
                y: 270,
                width: 22,
                height: 22,
                draw: function () {
                    canvas.fillStyle = this.color;
                    canvas.fillRect(this.x, this.y, this.width, this.height);
                    canvas.shadowOffsetX = 5;
                    canvas.shadowOffsetY = 5;
                }
                
            };
            
             //Player Movement
            function Movement() {


                if (keydown.a) {
                    xV -= initAcc;
                } else if (keydown.d) {
                    xV += initAcc;
                } else if (xV > 0) {
                    xV -= xV * finAcc;
                } else if (xV < 0) {
                    xV -= xV * finAcc;
                }

                if (keydown.w) {
                    yV -= initAcc;
                } else if (keydown.s) {
                    yV += initAcc;
                } else if (yV > 0) {
                    yV -= yV * finAcc;
                } else if (yV < 0) {
                    yV -= yV * finAcc;
                }


                if (keydown.space == false||keydown.up == false || keydown.down == false || keydown.left == false || keydown.right == false) {
                        player.shoot();
                        
                        keydown.space = true;
                    
                        keydown.up = true;
                        keydown.down = true;
                        keydown.left = true;
                        keydown.right = true;
                }
                
                

                player.x += xV;
                player.y += yV;
              
            }

             //Creating the Bullets

            var initBullets = 0;

            var playerBullets = [];
            function Bullet(I) {

                I.active = true;
                I.xVelocity = I.speed;
                I.yVelocity = 0;
                I.width = 4;
                I.height = 4;
                
                if(keydown.up == false){
                    I.yVelocity = -1 * I.speed;
                    keydown.up = true;
                }else if(keydown.down == false){
                    I.yVelocity = I.speed;
                    keydown.down = true;
                }else if(keydown.left == false){
                    I.xVelocity = -1 * I.speed;
                    keydown.left = true;
                }else if(keydown.right == false){
                    I.xVelocity = I.speed;
                    keydown.right = true;
                }
                
                I.color = '#' + Math.floor(Math.random() * 16777215).toString(16);

                I.inBounds = function () {

                    return I.x >= 0 && I.x <= CANVAS_WIDTH && I.y >= 0 && I.y <= CANVAS_HEIGHT;

                };

                I.draw = function () {
                    canvas.fillStyle = this.color;
                    canvas.fillRect(this.x, this.y, this.width, this.height);
                };

                I.update = function () {
                    

                    I.x += I.xVelocity;
                    I.y += I.yVelocity;

                    I.active = I.active && I.inBounds();
                    

                };

                return I;
            }
            