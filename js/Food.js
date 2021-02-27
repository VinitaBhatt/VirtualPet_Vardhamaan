class Food{
    constructor(){
        this.foodStock = 0;
        this.image = loadImage("images/milk.png");
        this.lastfed;
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    getFedTime(lastfed){
        this.lastfed = lastfed;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock -=1;
        }
    }

    getFoodStock(){
        return this.foodStock;
    }

    display(){
        var x = 80, y = 100;
        

        if(this.foodStock != 0){
            for(var i = 0;i<this.foodStock;i++){
                if(i%10 == 0){
                    x = 80;
                    y = y+50;
                }
                imageMode(CENTER);
                image(this.image,x,y,50,50);
                x = x+30;
            }
        }
    }
}