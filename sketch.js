
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var box1, groundBody, ground, player, playerBody, playerimg, tree, treeimg, hello, stone, stonebody, sling1, sling2, mango1;
var mango2, mango3, mango4, mango5, mango6, mango7, mango8;
function preload()
{
	playerimg = loadImage("player.png");
	treeimg = loadImage("tree.png");
}

function setup() {
	createCanvas(1500, 700);


	engine = Engine.create();
	world = engine.world;

	var options = {
		isStatic: true
	}
    var options2 = {
		density: 7
	}
	tree = createSprite(1200, 350, 60,500);
	tree.addImage(treeimg, 1200, 350, 60, 500);
	tree.scale = 2.5;
	
	groundBody = Bodies.rectangle(750, 650, 1500, 100, options);
	World.add(world, groundBody);
	ground = createSprite(750, 650, 1500, 100);
	ground.shapeColor = "lightgreen";

	player = createSprite(200, 400, 150, 300);
	imageMode(CENTER);
	player.addImage(playerimg, 200, 450, 150, 300);

	stonebody  = Bodies.circle(400, 150, 20, options2);
	World.add(world, stonebody);
	
	console.log(stonebody);
	Engine.run(engine);
   
	sling1 = new SlingShot(stonebody, {x:250, y:295});
	sling2 = new SlingShot(stonebody, {x:255, y:460});

	mango1 = new Mango(960, 150, 30);
	mango2 = new Mango(1100, 200, 30);
	mango3 = new Mango(1400, 160, 30);
	mango4 = new Mango(1350, 400, 30);
	mango5 = new Mango(1050, 455, 30);
	mango6 = new Mango(975, 340, 30);
	mango7 = new Mango(1260, 230, 30);
	mango8 = new Mango(1240, 100, 30);
}


function draw() {
  background("lightblue");

  Engine.update(engine);
  drawSprites();
  ground.x = groundBody.position.x;
  ground.y = groundBody.position.y;

  sling1.display();
  sling2.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
  mango7.display();
  mango8.display();

  detectCollision(stonebody, mango1);
  detectCollision(stonebody, mango2);
  detectCollision(stonebody, mango3);
  detectCollision(stonebody, mango4);
  detectCollision(stonebody, mango5);
  detectCollision(stonebody, mango6);
  detectCollision(stonebody, mango7);
  detectCollision(stonebody, mango8);
  rect(stonebody.position.x, stonebody.position.y, 15, 15);
}

function mouseDragged(){
    Matter.Body.setPosition(stonebody,{x:mouseX, y:mouseY});
}
function mouseReleased(){
	sling1.fly();
	sling2.fly();
}
function keyPressed(){
    if(keyCode === 32){        
		sling1.attach(stonebody);
		sling2.attach(stonebody);
    }
}
function detectCollision(lstone, lmango){
  var stoneBodyPosition = lstone.position;
  var mangoBodyPosition = lmango.body.position;

  var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y);
  if(distance<=lmango.r + lstone.circleRadius){
    Matter.Body.setStatic(lmango.body, false);
  }
}