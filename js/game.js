// template for characters
var character = function(name, hp, ap, cap){
    this.name = name;
    this.maxHP = hp;
    this.minAP = ap;
    this.cap = cap;
    
    $("#game").append('<div id="'+this.name+'" class="character-div"><img class="character-image" src="./images/'+this.name+'.png"><span id="'+this.name+'-hp"></span></div');
    this.myDiv = $("#"+this.name);
    this.myHPDiv = $("#"+this.name+"-hp");
    this.myHPDiv.text(this.maxHP+" HP");
    
    this.reset = function(){
        this.currentAP = this.minAP;
        this.myHPDiv.text(this.maxHP+" HP");
    }

    this.heal = function(){
        this.currentHP = this.maxHP;
        this.myHPDiv.text(this.maxHP+" HP");
    }

    this.myDiv.on("click", function(){
        gameController.choose(this.id);
    })

    this.selectDefender = function(){
        this.selectFighter();
    }
    this.selectAttacker = function(){
        this.selectFighter();
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
        this.myHPDiv.text(this.currentHP+" HP");
        if(this.currentHP <= 0){
            return true;
        }
        else {
            return false;
        }
    }

    this.die = function(){
        this.goToPosition(6);
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
                newTop = 195;
                newLeft = 100;
                break;
            case 5:
                newTop = 195;
                newLeft = 300;
                break;
            case 6:
                newTop = 500;
                newLeft = 300;
        }
        this.myDiv.animate({left: newLeft, top: newTop});
    }
}

$( document ).ready(function() {
    // gameController object
    gameController = {
        "remainingCharacters" : 3,
        "obiwan" : new character("Obiwan", 9, 4, 4),
        "anakin" : new character("Anakin", 14, 3, 3),
        "maul" : new character("Maul", 15, 2, 2),
        "savage" : new character("Savage", 16, 1, 1),
        "currentAttacker" : "none",
        "currentDefender" : "none",
        "currentlyChoosing" : "none",
        "setAttacker" : function(attacker){
            attacker = attacker.toLowerCase();
            gameController.currentAttacker = attacker;
            gameController[attacker].selectAttacker();
            gameController[attacker].goToPosition(4);
            $("#bench-text").text("Choose your opponent!");
        },
        "setDefender" : function(defender){
            defender = defender.toLowerCase();
            gameController.currentDefender = defender;
            gameController[defender].selectDefender();
            gameController[defender].goToPosition(5);
            $("#bench-text").text("Fight!");
        },
        "runAttacks" : function(){
            if(this.currentAttacker != "none" && this.currentDefender != "none"){
                var attacker = gameController[gameController.currentAttacker];
                var defender = gameController[gameController.currentDefender];

                var defenderDead = false;

                var attackDamage = attacker.attack();
                if(defender.takeDamage(attackDamage)){
                    defender.die();
                    gameController.remainingCharacters--;
                    defenderDead = true;
                    attacker.heal();
                    gameController.currentDefender = "none";
                    gameController.currentlyChoosing = "defender";
                    if(gameController.remainingCharacters == 0){
                        gameController.setup();
                        $("#fight-text").text("You Win!");
                        $("#bench-text").text("Choose your fighter!")
                    }
                }

                var defenseDamage = defender.getCAP();
                if(defenderDead === false && attacker.takeDamage(defenseDamage)){
                    gameController.setup();
                   $("#fight-text").text("You lose!");
                }
            }
        },
        "setup" : function(){
            gameController.obiwan.goToPosition(0);
            gameController.obiwan.reset();
            gameController.anakin.goToPosition(1);
            gameController.anakin.reset();
            gameController.maul.goToPosition(2);
            gameController.maul.reset();
            gameController.savage.goToPosition(3);
            gameController.savage.reset();
            gameController.currentlyChoosing = "attacker";
            gameController.remainingCharacters = 3;
            $("#bench-text").text("Choose your fighter!")
        },
        "choose" : function(character){
            if(this.currentlyChoosing === "defender" && character.toLowerCase() != gameController.currentAttacker){
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