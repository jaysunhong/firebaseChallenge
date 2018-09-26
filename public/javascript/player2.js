// Initialize Firebase
var config = {
    apiKey: "AIzaSyCtpv3g9bX7v-97nYufJkyvAnRIN_2fXv8",
    authDomain: "uci-bootcamp-6e4d9.firebaseapp.com",
    databaseURL: "https://uci-bootcamp-6e4d9.firebaseio.com",
    projectId: "uci-bootcamp-6e4d9",
    storageBucket: "uci-bootcamp-6e4d9.appspot.com",
    messagingSenderId: "660921458993"
};
firebase.initializeApp(config);

var database = firebase.database();
var confirmStarter;
var pikachu = $("#pikachu");
var bulbasaur = $("#bulbasaur");
var squirtle = $("#squirtle");
var charmander = $("#charmander");
var pOneStarter;
var pTwoStarter;
var p1wins = 0;
var p1loss = 0;

database.ref().set({
    pOneStarter: 'null',
    pTwoStarter: 'null',
    p1wins: p1wins,
    p1loss: p1loss
});

function reset() {
    database.ref().update({
        pOneStarter: 'null',
        pTwoStarter: 'null'
    });

    chooseStarter(charmander);
    chooseStarter(bulbasaur);
    chooseStarter(squirtle);
    chooseStarter(pikachu);
}

function transitionOne() {
    $(".mainbox").css("background-image", 'url("/images/transition1.gif")')
    $(".starter").hide();
    $(".starterDoc").hide();
}

function checkVSsquirtle(starter) {
    $(".mainbox").css("background-image", 'url("/images/battleLayout.png")')
        .css("background-color", 'black')
        .css('background-position', 'bottom')
        .css('background-size', '720px 480px');
    starter.fadeIn()
        .css('position', 'fixed')
        .css('top', '280px')
        .css('right', '5px')
        .animate({left: '520px'});
    squirtle.fadeIn()
        .css('position', 'fixed')
        .css('top', '160px')
        .css('left', '5px')
        .animate({left: '760px'});
}

function checkVSbulbasaur(starter) {
    $(".mainbox").css("background-image", 'url("/images/battleLayout.png")')
        .css("background-color", 'black')
        .css('background-position', 'bottom')
        .css('background-size', '720px 480px');
    starter.fadeIn()
        .css('position', 'fixed')
        .css('top', '280px')
        .css('right', '5px')
        .animate({left: '520px'});
    bulbasaur.fadeIn()
        .css('position', 'fixed')
        .css('top', '160px')
        .css('left', '5px')
        .animate({left: '760px'}); 
}

function checkVSpikachu(starter) {
    $(".mainbox").css("background-image", 'url("/images/battleLayout.png")')
        .css("background-color", 'black')
        .css('background-position', 'bottom')
        .css('background-size', '720px 480px');
    starter.fadeIn()
        .css('position', 'fixed')
        .css('top', '280px')
        .css('right', '5px')
        .animate({left: '520px'});
    pikachu.fadeIn()
        .css('position', 'fixed')
        .css('top', '160px')
        .css('left', '5px')
        .animate({left: '760px'});
}

function checkVScharmander(starter) {
    $(".mainbox").css("background-image", 'url("/images/battleLayout.png")')
        .css("background-color", 'black')
        .css('background-position', 'bottom')
        .css('background-size', '720px 480px');
    starter.fadeIn()
        .css('position', 'fixed')
        .css('top', '280px')
        .css('right', '5px')
        .animate({left: '520px'});
    charmander.fadeIn()
        .css('position', 'fixed')
        .css('top', '160px')
        .css('left', '5px')
        .animate({left: '760px'});
}

function samePokemonTie(starter) {
    $(".mainbox").css("background-image", 'none')
        .css("background-color", 'black');
    starter.fadeIn()
        .css('position', 'fixed')
        .css('top', '280px')
        .css('right', '5px')
        .animate({left: '520px'});
}

$(document).ready(function () {

    function chooseStarter(starter) {
        starter.on("click", function (event) {
            event.preventDefault();
            confirmStarter = confirm("Are you sure you want to pick " + starter.val() + " as your starter Pokémon?");
            if (confirmStarter) {
                // SET firebase
                database.ref('pTwoStarter').set(starter.val());

                pikachu.fadeOut();
                charmander.fadeOut();
                bulbasaur.fadeOut();
                squirtle.fadeOut();

                pikachu.animate({left: '415px'});
                bulbasaur.animate({left: '145px'});
                charmander.animate({right: '145px'});
                squirtle.animate({right: '415px'});

                $("*").css("cursor", 'url(/images/' + starter.val() + 'cursor.gif), auto');
                $(".mainbox").css("background-image", 'url("/images/transition.gif")')
                    .css("background-position", 'center')
                    .css("background-size", '1110px 750px');
                        
                starter.fadeIn();

                database.ref().on("value", function(snapshot) { 
                    // if opponent hasn't picked a starter yet, output a waiting text
                    if (snapshot.val().pOneStarter === 'null') {
                        $(".starterDoc").text("Waiting for your opponent...");
                    // if user picks charmander and opponent picks squirtle
                    } else if (starter.val() === "Charmander" && snapshot.val().pOneStarter === "Squirtle") {
                        $(".starterDoc").text("Ready for battle!");

                        setTimeout(function () {
                            transitionOne();
                        }, 2 * 1000);

                        setTimeout(function () {
                            checkVSsquirtle(starter);
                            $(".starterDoc").show();
                            $(".starterDoc").text("Squirtle used Bubblebeam! You lose.")
                                .css('text-shadow', '4px 4px 4px darkslateblue')
                                .css('color', 'gold')
                                .css('margin-top', '-30px');
                        }, 4 * 1000);   
                    // if user picks charmander and opponent picks bulbasaur  
                    } else if (starter.val() === "Charmander" && snapshot.val().pOneStarter === "Bulbasaur") {
                        $(".starterDoc").text("Ready for battle!");

                        setTimeout(function () {
                            transitionOne();
                        }, 2 * 1000);

                        setTimeout(function () {
                            checkVSbulbasaur(starter);
                            $(".starterDoc").show();
                            $(".starterDoc").text("Charmander used Flamethrower! You win!")
                                .css('text-shadow', '4px 4px 4px darkslateblue')
                                .css('color', 'gold')
                                .css('margin-top', '-30px');  
                        }, 4 * 1000);
                    // if user picks charmander and opponent picks pikachu
                    } else if (starter.val() === "Charmander" && snapshot.val().pOneStarter === "Pikachu") {
                        $(".starterDoc").text("Ready for battle!");

                        setTimeout(function () {
                            transitionOne();
                        }, 2 * 1000);

                        setTimeout(function () {
                            checkVSpikachu(starter);
                            $(".starterDoc").show();
                            $(".starterDoc").text("Charmander used Flamethrower! Pikachu used Thunderbolt! It's a tie!")
                                .css('text-shadow', '4px 4px 4px darkslateblue')
                                .css('color', 'gold')
                                .css('margin-top', '-30px');
                        }, 4 * 1000);  
                    // if user picks charmander and opponent picks charmander     
                    } else if (starter.val() === "Charmander" && snapshot.val().pOneStarter === "Charmander") {
                        $(".starterDoc").text("Ready for battle!");

                        setTimeout(function () {
                            transitionOne();
                        }, 2 * 1000);

                        setTimeout(function () {
                            samePokemonTie(starter);
                            $(".starterDoc").show();
                            $(".starterDoc").text("Charmander vs Charmander. It's a tie!")
                                .css('text-shadow', '4px 4px 4px darkslateblue')
                                .css('color', 'gold')
                                .css('margin-top', '-30px');  
                        }, 4 * 1000);   
                    // if user picks bulbasaur and opponent picks pikachu
                    } else if (starter.val() === "Bulbasaur" && snapshot.val().pOneStarter === "Pikachu") {
                        $(".starterDoc").text("Ready for battle!");

                        setTimeout(function () {
                            transitionOne();
                        }, 2 * 1000);

                        setTimeout(function () {
                            checkVSpikachu(starter);
                            $(".starterDoc").show();
                            $(".starterDoc").text("Bulbasaur used Razor Leaf! You win!")
                                .css('text-shadow', '4px 4px 4px darkslateblue')
                                .css('color', 'gold')
                                .css('margin-top', '-30px');
                        }, 4 * 1000); 
                    // if user picks bulbasaur and opponent picks squirtle
                    } else if (starter.val() === "Bulbasaur" && snapshot.val().pOneStarter === "Squirtle") {
                        $(".starterDoc").text("Ready for battle!");

                        setTimeout(function () {
                            transitionOne();
                        }, 2 * 1000);

                        setTimeout(function () {
                            checkVSsquirtle(starter);
                            $(".starterDoc").show();
                            $(".starterDoc").text("Bulbasaur used Razor Leaf! You win!")
                                .css('text-shadow', '4px 4px 4px darkslateblue')
                                .css('color', 'gold')
                                .css('margin-top', '-30px');
                        }, 4 * 1000); 
                    // if user picks bulbasaur and opponent picks charmander
                    }  else if (starter.val() === "Bulbasaur" && snapshot.val().pOneStarter === "Charmander") {
                        $(".starterDoc").text("Ready for battle!");

                        setTimeout(function () {
                            transitionOne();
                        }, 2 * 1000);

                        setTimeout(function () {
                            checkVScharmander(starter);
                            $(".starterDoc").show();
                            $(".starterDoc").text("Charmander used Flamethrower! You lose.")
                                .css('text-shadow', '4px 4px 4px darkslateblue')
                                .css('color', 'gold')
                                .css('margin-top', '-30px');
                        }, 4 * 1000); 
                    // if user picks bulbasaur and opponent picks bulbasaur
                    }  else if (starter.val() === "Bulbasaur" && snapshot.val().pOneStarter === "Bulbasaur") {
                        $(".starterDoc").text("Ready for battle!");

                        setTimeout(function () {
                            transitionOne();
                        }, 2 * 1000);

                        setTimeout(function () {
                            samePokemonTie(starter);
                            $(".starterDoc").show();
                            $(".starterDoc").text("Bulbasaur vs Bulbasaur. It's a tie!")
                                .css('text-shadow', '4px 4px 4px darkslateblue')
                                .css('color', 'gold')
                                .css('margin-top', '-30px');  
                        }, 4 * 1000); 
                    // if user picks squirtle and opponent picks bulbasaur
                    } else if (starter.val() === "Squirtle" && snapshot.val().pOneStarter === "Bulbasaur") {
                        $(".starterDoc").text("Ready for battle!");

                        setTimeout(function () {
                            transitionOne();
                        }, 2 * 1000);

                        setTimeout(function () {
                            checkVSbulbasaur(starter);
                            $(".starterDoc").show();
                            $(".starterDoc").text("Bulbasaur used Razor Leaf! You lose.")
                                .css('text-shadow', '4px 4px 4px darkslateblue')
                                .css('color', 'gold')
                                .css('margin-top', '-30px');  
                        }, 4 * 1000); 
                    // if user picks squirtle and opponent picks charmander
                    } else if (starter.val() === "Squirtle" && snapshot.val().pOneStarter === "Charmander") {
                        $(".starterDoc").text("Ready for battle!");

                        setTimeout(function () {
                            transitionOne();
                        }, 2 * 1000);

                        setTimeout(function () {
                            checkVScharmander(starter);
                            $(".starterDoc").show();
                            $(".starterDoc").text("Squirtle used Bubblebeam! You win!")
                                .css('text-shadow', '4px 4px 4px darkslateblue')
                                .css('color', 'gold')
                                .css('margin-top', '-30px');  
                        }, 4 * 1000);
                    // if user picks squirtle and opponent picks pikachu
                    } else if (starter.val() === "Squirtle" && snapshot.val().pOneStarter === "Pikachu") {
                        $(".starterDoc").text("Ready for battle!");

                        setTimeout(function () {
                            transitionOne();
                        }, 2 * 1000);

                        setTimeout(function () {
                            checkVSpikachu(starter);
                            $(".starterDoc").show();
                            $(".starterDoc").text("Pikachu used Thunderbolt! You lose.")
                                .css('text-shadow', '4px 4px 4px darkslateblue')
                                .css('color', 'gold')
                                .css('margin-top', '-30px');  
                        }, 4 * 1000); 
                    // if user picks squirtle and opponent picks squirtle
                    } else if (starter.val() === "Squirtle" && snapshot.val().pOneStarter === "Squirtle") {
                        $(".starterDoc").text("Ready for battle!");

                        setTimeout(function () {
                            transitionOne();
                        }, 2 * 1000);

                        setTimeout(function () {
                            samePokemonTie(starter);
                            $(".starterDoc").show();
                            $(".starterDoc").text("Squirtle vs Squirtle. It's a tie!")
                                .css('text-shadow', '4px 4px 4px darkslateblue')
                                .css('color', 'gold')
                                .css('margin-top', '-30px');  
                        }, 4 * 1000); 
                    // if user picks pikachu and opponent picks squirtle
                    } else if (starter.val() === "Pikachu" && snapshot.val().pOneStarter === "Squirtle") {
                        $(".starterDoc").text("Ready for battle!");

                        setTimeout(function () {
                            transitionOne();
                        }, 2 * 1000);

                        setTimeout(function () {
                            checkVSsquirtle(starter);
                            $(".starterDoc").show();
                            $(".starterDoc").text("Pikachu used Thunderbolt! You win!")
                                .css('text-shadow', '4px 4px 4px darkslateblue')
                                .css('color', 'gold')
                                .css('margin-top', '-30px');  
                        }, 4 * 1000); 
                    // if user picks pikachu and opponent picks bulbasaur
                    } else if (starter.val() === "Pikachu" && snapshot.val().pOneStarter === "Bulbasaur") {
                        $(".starterDoc").text("Ready for battle!");

                        setTimeout(function () {
                            transitionOne();
                        }, 2 * 1000);

                        setTimeout(function () {
                            checkVSbulbasaur(starter);
                            $(".starterDoc").show();
                            $(".starterDoc").text("Pikachu used Thunderbolt! It's not very effective. You lose.")
                                .css('text-shadow', '4px 4px 4px darkslateblue')
                                .css('color', 'gold')
                                .css('margin-top', '-30px');  
                        }, 4 * 1000); 
                    // if user picks pikachu and opponent picks charmander
                    } else if (starter.val() === "Pikachu" && snapshot.val().pOneStarter === "Charmander") {
                        $(".starterDoc").text("Ready for battle!");

                        setTimeout(function () {
                            transitionOne();
                        }, 2 * 1000);

                        setTimeout(function () {
                            checkVScharmander(starter);
                            $(".starterDoc").show();
                            $(".starterDoc").text("Charmander used Flamethrower! Pikachu used Thunderbolt! It's a tie!")
                                .css('text-shadow', '4px 4px 4px darkslateblue')
                                .css('color', 'gold')
                                .css('margin-top', '-30px');  
                        }, 4 * 1000); 
                    // if user picks pikachu and opponent picks pikachu
                    } else if (starter.val() === "Pikachu" && snapshot.val().pOneStarter === "Pikachu") {
                        $(".starterDoc").text("Ready for battle!");

                        setTimeout(function () {
                            transitionOne();
                        }, 2 * 1000);

                        setTimeout(function () {
                            samePokemonTie(starter);
                            $(".starterDoc").show();
                            $(".starterDoc").text("Pikachu vs Pikachu. It's a tie!")
                                .css('text-shadow', '4px 4px 4px darkslateblue')
                                .css('color', 'gold')
                                .css('margin-top', '-30px');  
                        }, 4 * 1000); 
                    } 
                    starter.off();
                });               
            }
        }); 
    }
    chooseStarter(charmander);
    chooseStarter(bulbasaur);
    chooseStarter(squirtle);
    chooseStarter(pikachu);
});