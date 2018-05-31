// template for characters
var character = function(name, hp, ap, cap){
    this.name = name;
    this.maxHP = hp;
    this.minAP = ap;
    this.cap = cap;
    
    $("#game").append('<img id="'+this.name+'" class="character-image" src="./images/'+this.name+'.png">');

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
}





$( document ).ready(function() {
    // game object
    var game = {
        "inactiveFighters" : 4,
        "obiwan" : new character("Obiwan", 6, 4, 4),
        "anakin" : new character("Anakin", 11, 3, 3),
        "maul" : new character("Maul", 15, 2, 2),
        "savage" : new character("Savage", 20, 1, 1),
        "currentAttacker" : "",
        "currentDefender" : "",
        "setAttacker" : function(attacker){
            game.currentAttacker = attacker;
            game[attacker].selectAttacker();
        },
        "setDefender" : function(defender){
            game.currentDefender = defender;
            game[defender].selectDefender();
        },
        "runAttacks" : function(){
            var attacker = game[game.currentAttacker];
            var defender = game[game.currentDefender];

            var attackDamage = attacker.attack();
            if(defender.takeDamage(attackDamage)){
                console.log("die")
            }
            else{
                console.log(attackDamage);
            }

            var defenseDamage = defender.getCAP();
        }

    }



    game.setDefender("anakin");
    game.setAttacker("savage");
});