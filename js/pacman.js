/******************************************/
/*			Déclaration de la grille      */
/******************************************/
/* 0 -> mur                               */
/* 1 -> sol                               */
/* 2 -> bonbon                            */
/******************************************/
var grille = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,0],
	[0,2,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,2,0],
	[0,2,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,2,0],
	[0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
	[0,2,0,0,2,0,2,0,0,0,0,0,2,0,2,0,0,2,0],
	[0,2,2,2,2,0,2,2,2,0,2,2,2,0,2,2,2,2,0],
	[0,0,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,0,0],
	[0,1,1,0,2,0,2,2,2,2,2,2,2,0,2,0,1,1,0],
	[0,0,0,0,2,0,2,0,0,1,0,0,2,0,2,0,0,0,0],
	[2,2,2,2,2,2,2,0,1,1,1,0,2,2,2,2,2,2,2],
	[0,0,0,0,2,0,2,0,0,1,0,0,2,0,2,0,0,0,0],
	[0,1,1,0,2,0,2,2,2,2,2,2,2,0,2,0,1,1,0],
	[0,0,0,0,2,0,2,0,0,0,0,0,2,0,2,0,0,0,0],
	[0,2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,0],
	[0,2,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,2,0],
	[0,2,2,0,2,2,2,2,2,2,2,2,2,2,2,0,2,2,0],
	[0,0,2,0,2,0,2,0,0,0,0,0,2,0,2,0,2,0,0],
	[0,2,2,2,2,0,2,2,2,0,2,2,2,0,2,2,2,2,0],
	[0,2,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,2,0],
	[0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

/***************************************************/
/*		Création de l'objet pacman                 */
/***************************************************/
/*		droite = direction 0					   */
/*		bas = direction 1	    				   */
/*		gauche = direction 2					   */
/*		haut = direction 3  					   */
/***************************************************/
var pacman = {
	x:5,
	y:1,
	direction:0
};

/***************************************************/
/*		Création de l'objet fantome rouge          */
/***************************************************/
/*		droite = direction 0					   */
/*		bas = direction 1	    				   */
/*		gauche = direction 2					   */
/*		haut = direction 3  					   */
/***************************************************/
var frouge = {
	x:9,
	y:9,
	direction:0
};

/***************************************************/
/*		Création de l'objet fantome vert           */
/***************************************************/
/*		droite = direction 0					   */
/*		bas = direction 1	    				   */
/*		gauche = direction 2					   */
/*		haut = direction 3  					   */
/***************************************************/
var fvert = {
	x:9,
	y:9,
	direction:0
};

/***************************************************/
/*		Création de l'objet fantome bleu           */
/***************************************************/
/*		droite = direction 0					   */
/*		bas = direction 1	    				   */
/*		gauche = direction 2					   */
/*		haut = direction 3  					   */
/***************************************************/
var fbleu = {
	x:9,
	y:9,
	direction:0
};

/***************************************************/
/*		Création de l'objet fantome orange         */
/***************************************************/
/*		droite = direction 0					   */
/*		bas = direction 1	    				   */
/*		gauche = direction 2					   */
/*		haut = direction 3  					   */
/***************************************************/
var forange = {
	x:9,
	y:9,
	direction:0
};

//		Score en cours
var score=0;
var nbBonbon=191;
var tstfin =false;
var lvl =1000;

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
}

/**
 *  Fonction de déplacement du PacMan
 */
function movePacMan(){
    let newBloc = document.createElement('div');
    newBloc.id='pacman';
    newBloc.style.gridColumn=pacman.x+1;
    newBloc.style.gridRow=pacman.y+1;
    let newBlocImg = document.createElement('img');
    newBlocImg.src="./img/pacman4.gif";
    newBlocImg.id='pacmanImg';
    
    $('.grille').append(newBloc);
    $('#pacman').append(newBlocImg);
 
	switch (pacman.direction){
		case 0:
			pacman.x+=1;
		    if(testColl()) {
                pacman.x-=1;
            }
            else {
                $("#pacmanImg").animate({
                    left :"+=40"
                },1000);
            }
			if (pacman.x>grille[0].length)
			{
				pacman.x=0;
			}
			break;
		case 1:
			pacman.y+=1;
            if(testColl()) {pacman.y-=1;}
            else {
                $("#pacmanImg").animate({
                    top :"+=40"
                },1000);
            }
			if (pacman.y>grille.length)
			{
				pacman.y=0;
			}
			break;
		case 2:
			pacman.x-=1;
            if(testColl()) {pacman.x+=1;}
            else {
                $("#pacmanImg").animate({
                    left :"-=40"
                },1000);
            }
			if (pacman.x<0)
			{
				pacman.x=grille[0].length;
			}
			break;
		case 3:
			pacman.y-=1;
            if(testColl()) {pacman.y+=1;}
            else {
                $("#pacmanImg").animate({
                    top :"-=40"
                },1000);
            }
			if (pacman.y<0)
			{
				pacman.y=grille.length;
			}
			break;
    }
   
                 

}

/**
*	Fonction de test de collision				  
*/
function testColl(){
	if(grille[pacman.y][pacman.x]==0)
	{
		console.log("il y a un mur en : "+pacman.y+":"+pacman.x);
		return true;
	}
	if(grille[pacman.y][pacman.x]==2)
	{
		score+=10;
		nbBonbon--;
		grille[pacman.y][pacman.x]=1;
		if(nbBonbon<=0)
		{
			alert("Vous avez gagné !");
			tstfin=true;
		}
		
	}
	if (pacman.x==frouge.x && pacman.y==frouge.y) {
		alert("Vous avez perdu !");
		tstfin=true;
	}
	if (pacman.x==fbleu.x && pacman.y==fbleu.y) {
		alert("Vous avez perdu !");
		tstfin=true;
	}
	if (pacman.x==forange.x && pacman.y==forange.y) {
		alert("Vous avez perdu !");
		tstfin=true;
	}
	if (pacman.x==fvert.x && pacman.y==fvert.y) {
		alert("Vous avez perdu !");
		tstfin=true;
	}
	return false;
}

/**
*			Fonction qui récupère la touche        
*/
function testTouche(event){
	switch (event.key) {
		case "ArrowDown":
        case "D":
        case "d":
			pacman.direction=1;
			$("#touche").html("Touche : V");
			break;
		case "ArrowUp":
        case "E":
        case "e":
        	pacman.direction=3;
			$("#touche").html("Touche : ^");
			break;
		case "ArrowLeft":
        case "S":
        case "s":
            pacman.direction=2;
			$("#touche").html("Touche : <");
			break;
		case "ArrowRight":
        case "F":
        case "f":
			pacman.direction=0;
			$("#touche").html("Touche : >");
			break;
		default:
			$("#touche").html("Touche non gere");
			break;
	}
	
}

function boucleRefresh()
{
    //On rafraichit la grille
    initGrille();

    //On controle si PacMan est sur un Fantome
    testColl();

    //On fait bouger PacMan
    movePacMan();

    //On reboucle toutes les 1s
    setTimeout(boucleRefresh,1000)
}

$('body').keypress(testTouche, event);
boucleRefresh();

