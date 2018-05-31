// template for characters
var character = function(name, hp, ap, cap){
    this.name = name;
    this.maxHP = hp;
    this.minAP = ap;
    this.cap = cap;
    
    $("#game").append('<img id="'+this.name+'" class="character-image" src="./images/'+this.name+'.png">');
    this.myDiv = $("#"+this.name);

    this.myDiv.on("click", function(){console.log(gameController)
        gameController.choose(this.id);
    })

    this.selectDefender = function(){
        this.selectFighter();
        // move to defender space
    }
    this.selectAttacker = function(){
        this.selectFighter();
        //move to attacker space
    }
    this.selectFighter = function(){
        this.currentHP = this.maxHP;
        this.currentAP = this.minAP;

    }
    this.attack = function(){
        var apNow = this.currentAP;
        this.currentAP++;
        return apNow;
    }
    this.getCAP = function(){
        return this.cap;
    }
    this.takeDamage = function(damage){
        this.currentHP -= damage;
        if(this.currentHP <= 0){
            return true;
        }
        else {
            return false;
        }
    }

    this.goToPosition = function (position) {
        var newLeft = 0;
        var newTop = 0;
        switch(position){
            case 0:
                newTop = 30;
                newLeft = 50;
                break;
            case 1:
                newTop = 30;
                newLeft = 155;
                break;
            case 2:
                newTop = 30;
                newLeft = 260;
                break;
            case 3:
                newTop = 30;
                newLeft = 365
                break;
            case 4:
                newTop = 170;
                newLeft = 100;
                break;
            case 5:
                newTop = 170;
                newLeft = 300;
                break;
        }
        this.myDiv.animate({left: newLeft, top: newTop});
    }
}





$( document ).ready(function() {
    // gameController object
    gameController = {
        "obiwan" : new character("Obiwan", 6, 4, 4),
        "anakin" : new character("Anakin", 11, 3, 3),
        "maul" : new character("Maul", 15, 2, 2),
        "savage" : new character("Savage", 20, 1, 1),
        "currentAttacker" : "",
        "currentDefender" : "",
        "currentlyChoosing" : "none",
        "setAttacker" : function(attacker){
            attacker = attacker.toLowerCase();
            gameController.currentAttacker = attacker;
            gameController[attacker].selectAttacker();
            gameController[attacker].goToPosition(4);
        },
        "setDefender" : function(defender){
            defender = defender.toLowerCase();
            gameController.currentDefender = defender;
            gameController[defender].selectDefender();
            gameController[defender].goToPosition(5);
        },
        "runAttacks" : function(){
            var attacker = gameController[gameController.currentAttacker];
            var defender = gameController[gameController.currentDefender];

            var attackDamage = attacker.attack();
            if(defender.takeDamage(attackDamage)){
                console.log("die")
            }
            else{
                console.log(attackDamage);
            }

            var defenseDamage = defender.getCAP();
        },
        "setup" : function(){
            gameController.obiwan.goToPosition(0);
            gameController.anakin.goToPosition(1);
            gameController.maul.goToPosition(2);
            gameController.savage.goToPosition(3);
            this.currentlyChoosing = "attacker";
        },
        "choose" : function(character){
            if(this.currentlyChoosing === "defender"){
                this.setDefender(character);
                this.currentlyChoosing = "none";
            }
            else if(this.currentlyChoosing === "attacker"){
                this.setAttacker(character);
                this.currentlyChoosing = "defender";
            }
        }

    }

    gameController.setup();
});