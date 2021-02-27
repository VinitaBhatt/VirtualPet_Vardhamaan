var dog,sadDog,happyDog;
var foodObj;
var foodS,foodStock;
var feedTime,lastFed,feed,addFood;
var database;
var testBottle;
var testBottleImage;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  testBottleImage = loadImage("Images/Milk.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);
  
  foodObj = new Food();
  
  testBottle = createSprite(720,220,70,70);

  imageMode(CENTER);
  testBottle.addImage(testBottleImage);
  testBottle.scale = 0.07;


  foodStock = database.ref("food");
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  var input = createInput();
  input.position(920,200);

  var name = input.value();
}

function draw() {
  background(46,139,87);
  
  

  foodObj.display();

  feedTime = database.ref("feedTime");
  feedTime.on("value",function (data){
    lastFed = data.val();
  })

  fill(255,255,254);

  textSize(15);

  if(lastFed>= 12){
    text("Last Feed: "+ lastFed % 12 + "PM",350,30);
  }
  else if(lastFed == 0){
    text("Last Feed: 12AM",350,30);
  }
  else{
    text("Last Feed: "+lastFed +"AM",350,30);
  }

  drawSprites();
}

//function to read food Stock

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time

function feedDog(){
  dog.addImage(happyDog);

  testBottle.x = 750;

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    food: foodObj.getFoodStock(),
    feedTime : hour()

  })
}

//function to add food in stock

function addFoods(){
  
  dog.addImage(sadDog);

  testBottle.x = 720;
  
  foodS++;
  database.ref("/").update({
    food:foodS
  })
}