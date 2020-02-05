/******************************************/
/*			Déclaration de la grille      */
/******************************************/
/* 0 -> mur                               */
/* 1 -> sol                               */
/* 2 -> bonbon                            */
/******************************************/
class grilleDef {
 
    constructor(){
        
    }

    getGrilleDef(){
        let grilleDef = [
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
        return grilleDef;
    }
/**
 *  Fonction de gestion de la grille PacMan
 */
    initGrille(maGrille,scoreEnCours)
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
        $("#score").html(scoreEnCours);
    }

    
    boucleRefresh(maGrille,level,bonbon,mypac,tabF)
    {

        var that = this;
        //On rafraichit la grille
        this.initGrille(maGrille,mypac.score);

        //On controle si PacMan est sur un Fantome
        mypac.testColl(tabF,maGrille,bonbon);

        //On fait bouger PacMan
        mypac.move(tabF,maGrille,bonbon);

        //On fait bouger les fantomes
        for(let myFant in tabF)
        {
            tabF[myFant].move(mypac,maGrille);
        }

        //On reboucle toutes les 1s
        //Rebouclage
        if(!tstfin) {
            setTimeout(function(maGrille,level,bonbon,mypac,tabF){
                that.boucleRefresh(maGrille,level,bonbon,mypac,tabF);
            },level,maGrille,level,bonbon,mypac,tabF);
        }
    }

    

   

}

