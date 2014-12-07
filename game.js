   FramesPerSecond();
            function FramesPerSecond() {
                var FPS = 60;
                setInterval(function () {
                    update();
                    draw();
                }, 1000 / FPS);
            }

            var xV = 0;
            var yV = 0;
            var initAcc = 0.2;
            var finAcc = 0.1;
            var cap = 150;

             //Main Game Loop
                function update() {
                    
                
                    if(enemySpawned == cap){
                        cap = cap + 100;
                        difficulty = 0.01;
                        level += 1;
                        enemySpeed -= 1;
                    }
                    
                    
                
                
                var div = document.getElementById("textDiv");
                var writeSpawn = enemySpawned.toString();
                div.textContent = "Score: " + writeSpawn;
                var text = div.textContent;
                
                
                
                var div =document.getElementById("levelDiv");
                var writeLevel = level.toString();
                div.textContent = "Level: " + writeLevel;
                var text = div.textContent;
                
                

                
                
                bounds();
                Movement();

                player.x = player.x.clamp(0, CANVAS_WIDTH - player.width);


                //Bullets
                player.shoot = function () {
                    
                    if(death == false){
                    var bulletPosition = this.midpoint();
                    playerBullets.push(Bullet({
                        speed: 10,
                        x: bulletPosition.x,
                        y: bulletPosition.y
                    }));
                    }
                };

                player.midpoint = function () {
                    return {
                        x: this.x + this.width / 2,
                        y: this.y + this.height / 2
                    };
                };

                playerBullets.forEach(function (bullet) {
                    bullet.update();
                });


                playerBullets = playerBullets.filter(function (bullet) {
                    return bullet.active;
                });

                //Enemies
                enemies.forEach(function (enemy) {
                    enemy.update();
                    
                });

                enemies = enemies.filter(function (enemy) {
                    return enemy.active;
                });
                if (Math.random() < difficulty) {
                    enemies.push(Enemy());
                }

                //Handling Collisions
                handleCollisions();

            }
            
            function draw() {
                //Character
                canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                  if(death == false){
                      player.draw();
                      
                      Bullet.active = false;
                  }else{
                        
                  }
            
                //Bullets
                playerBullets.forEach(function (bullet) {
                    bullet.draw();
                });

                //Enemies

                enemies.forEach(function (enemy) {
                    enemy.draw();
                });
                

            }
             //END Game Loop



                //Collisions
                player.explode = function () {
                    this.active = false;
                    death = true;
                // Extra Credit: Add an explosion graphic and then end the game
            };
            
            function collides(a, b) {
                return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
            }

             //Handle Collsisions
            function handleCollisions() {
                playerBullets.forEach(function (bullet) {
                    enemies.forEach(function (enemy) {
                        if (collides(bullet, enemy)) {
                            enemy.explode();
                            bullet.active = false;
                        }
                    });
                });

                enemies.forEach(function (enemy) {
                    if (collides(enemy, player)) {
                        enemy.explode();
                        player.explode();
                        death = true;
                    
                    }
                });
            }
            function bounds() {

                if (player.x >= (CANVAS_WIDTH - 32)) {
                    player.x -= xV;
                    xV -= xV * finAcc;
                }

                if (player.y > (CANVAS_HEIGHT - 62)) {
                    
                    player.y = CANVAS_HEIGHT - 62;
                    player.y -= yV;
                    yV -= yV * finAcc;
                }
                if (player.y <= 32) {
                    player.y = 32;
                    player.y += yV;
                   yV -= yV * finAcc;
                }
            }
            