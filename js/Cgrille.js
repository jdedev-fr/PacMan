/******************************************/
/*			Déclaration de la grille      */
/******************************************/
/* 0 -> mur                               */
/* 1 -> sol                               */
/* 2 -> bonbon                            */
/******************************************/
class grilleDef {
 
    constructor(){
        this.grilleDef = [
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
        return this.grilleDef;
    }

/**
 *  Fonction de gestion de la grille PacMan
 */
    initGrille(maGrille)
    {
        //Réinit de la grille
        $('.grille').html(' ');

        //Gestion des lignes etcolonnes en fonction de la taille du tableau
        $('.grille').css('grid-template-rows','repeat('+maGrille.length+', 40px)');
        $('.grille').css('grid-template-columns','repeat('+maGrille[0].length+', 40px)');

        //Parcours 2D de la grille
        for(let ligne in maGrille)
        {
            for(let colonne in maGrille[ligne])
            {
                let newBloc = document.createElement('div');
                let grillePosX = (+colonne)+1;
                let grillePosY = (+ligne)+1;
                switch (maGrille[ligne][colonne])
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

    
    boucleRefresh(maGrille,level,bonbon)
    {
        //On rafraichit la grille
        this.initGrille(maGrille);

        //On controle si PacMan est sur un Fantome
        myPac.testColl(tabFant);

        //On fait bouger PacMan
        myPac.move(tabFant,maGrille,bonbon);

        //On fait bouger les fantomes
        for(let myFant in tabFant)
        {
            tabFant[myFant].move(myPac,maGrille);
        }

        //On reboucle toutes les 1s
        //Rebouclage
        if(!tstfin) {
            setTimeout(function(maGrille,level,bonbon){
                this.boucleRefresh(maGrille,level,bonbon);
            },level);
        }
    }

    /**
    * Fonction de changement du niveau et de lancement du jeu
    */
    changeLvl(level){
        if(!tstfin){
            tstfin=true;
            setTimeout(function(){
                this.changeLvl(level)},level);
        }
        else {
            level = $("#niveau").val();
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

            myPac = new pacman(level);
            tabFant = new Array();
            //Création des Fantomes
            for(let i=0;i<nbFant;i++){
                var mf1 = new fantome(tabFant.length+1,level);
                tabFant.push(mf1);
            }
            
            //On lance le jeu
            boucleRefresh(grille,level,nbBonbon);
        }
    }

}

