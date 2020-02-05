var tstfin = true;
var lvl =1000;
var maGrille = new grilleDef();
var myPac ;

$( document ).ready(function() {
    //		Score en cours
  //  let maGrille = new grilleDef();
    let grille = maGrille.getGrilleDef();
    let score=0;
  //  let nbBonbon=0;
  //  let tstfin =true;
  //  let lvl =1000;
  //  let nbFant=0;
  //    let myPac = new pacman();
    //  let tabFant = new Array();

    //On affiche la grille au début
    maGrille.initGrille(grille,score);

    //On lance les eventListener
     $('#btnLvl').click(function(){
        changeLvl()});
});

/**
*			Fonction qui récupère la touche        
*/
function testTouche(event){
    switch (event.key) {
        case "ArrowDown":
        case "D":
        case "d":
            myPac.direction=1;
            $("#touche").html("Touche : V");
            break;
        case "ArrowUp":
        case "E":
        case "e":
            myPac.direction=3;
            $("#touche").html("Touche : ^");
            break;
        case "ArrowLeft":
        case "S":
        case "s":
            myPac.direction=2;
            $("#touche").html("Touche : <");
            break;
        case "ArrowRight":
        case "F":
        case "f":
            myPac.direction=0;
            $("#touche").html("Touche : >");
            break;
        default:
            $("#touche").html("Touche non gere");
            break;
    }       
}

function logMe(sTexte)
{
    console.log(sTexte);
}

/**
* Fonction de changement du niveau et de lancement du jeu
*/
function changeLvl(){   
    logMe("Fin du jeu ? "+tstfin);     
    if(!tstfin){
        logMe("Le jeu n'est pas fini, on coupe et on relance");
        tstfin=true;
        setTimeout(function(){
            logMe("Fin du jeu ? "+tstfin);
            changeLvl()},lvl);
    }
    else {
        logMe("Le jeu est fini, on initialise");
        lvl = $("#niveau").val();
        let nbFant = $("#inpNbFant").val();
        let nbBonbon=0;
        tstfin =false;
        let grille = maGrille.getGrilleDef();

        // Mise à jour du nombre de bonbon
        for(let i in grille){
            for(let j in grille[i]){
                if(grille[i][j]==2){
                    nbBonbon++;
                }
            
            }  
        }

        logMe("Niveau : "+lvl);
        logMe("NbFantomes : "+nbFant);
        logMe("NbBonbons : "+nbBonbon);
        logMe("Fin du jeu ? "+tstfin);

        myPac = new pacman(lvl);
        let tabFant = new Array();
        //Création des Fantomes
        for(let i=0;i<nbFant;i++){
            let mf1 = new fantome(tabFant.length+1,lvl);
            tabFant.push(mf1);
        }
        
        $('body').keypress(function(event){
            testTouche(event)});
     
        //On lance le jeu
        maGrille.boucleRefresh(grille,lvl,nbBonbon,myPac,tabFant);
    }
}