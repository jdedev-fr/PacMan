
/**
 *  Fonction de gestion de la grille PacMan
 */
function initGrille()
{
    //Réinit de la grille
    $('.grille').html(' ');

    //Gestion des lignes etcolonnes en fonction de la taille du tableau
    $('.grille').css('grid-template-rows','repeat('+grille.length+', 40px)');
    $('.grille').css('grid-template-columns','repeat('+grille[0].length+', 40px)');

    //Parcours 2D de la grille
    for(let ligne in grille)
    {
        for(let colonne in grille[ligne])
        {
            let newBloc = document.createElement('div');
            let grillePosX = (+colonne)+1;
            let grillePosY = (+ligne)+1;
            switch (grille[ligne][colonne])
            {
                case 0:
                    newBloc.classList.add("mur");
                    break;
                case 1:
                    newBloc.classList.add("sol");
                    break;
                case 2:
                    newBloc.classList.add("bonbon");
                    break;
            }

            newBloc.style.gridColumn=grillePosX;
            newBloc.style.gridRow=grillePosY;

            $('.grille').append(newBloc);
        }
    }
    //Réaffichage du score
	$("#score").html(score);
}


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



/**
 * Fonction de changement du niveau et de lancement du jeu
 */
function changeLvl(){
    if(!tstfin){
        tstfin=true;
        setTimeout(changeLvl,lvl);
    }
    else {
        lvl = $("#niveau").val();
        nbFant = $("#inpNbFant").val();
        score=0;
        nbBonbon=0;
        tstfin =false;
        grille = new grilleDef();

        // Mise à jour du nombre de bonbon
        for(let i in grille){
            for(let j in grille[i]){
                if(grille[i][j]==2){
                    nbBonbon++;
                }
            
            }  
        }

        myPac = new pacman();
        tabFant = new Array();
        //Création des Fantomes
        for(let i=0;i<nbFant;i++){
            var mf1 = new fantome(tabFant.length+1);
            tabFant.push(mf1);
        }
        
        //On lance le jeu
        boucleRefresh();
    }
}

function boucleRefresh()
{
    //On rafraichit la grille
    initGrille();

    //On controle si PacMan est sur un Fantome
    myPac.testColl(tabFant);

    //On fait bouger PacMan
    myPac.move(tabFant);

    //On fait bouger les fantomes
    for(let myFant in tabFant)
    {
        tabFant[myFant].move(myPac);
    }

    //On reboucle toutes les 1s
    //Rebouclage
	if(!tstfin) {
		setTimeout(boucleRefresh,lvl);
	}
}