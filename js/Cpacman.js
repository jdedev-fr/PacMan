/***************************************************/
/*		       Classe pacman                       */
/***************************************************/
/*		droite = direction 0					   */
/*		bas = direction 1	    				   */
/*		gauche = direction 2					   */
/*		haut = direction 3  					   */
/***************************************************/
class pacman {
    constructor() {
        this.x=5;
	    this.y=1;
	    this.direction=0;
    }

	/**
    *  Fonction de déplacement du PacMan
    */
    move(tabF){
        let newBloc = document.createElement('div');
        newBloc.id='pacman';
        newBloc.style.gridColumn=this.x+1;
        newBloc.style.gridRow=this.y+1;
        let newBlocImg = document.createElement('img');
        newBlocImg.src="./img/pacman4.gif";
        newBlocImg.id='pacmanImg';
        
        $('.grille').append(newBloc);
        $('#pacman').append(newBlocImg);
    
        
        switch (this.direction){
            case 0:
                this.x+=1;
                if(this.testColl(tabF)) {
                    this.x-=1;
                }
                else {
                    $("#pacmanImg").animate({
                        left :"+=40"
                    },lvl);
                }
                if (this.x>grille[0].length)
                {
                    this.x=0;
                }
                break;
            case 1:
                this.y+=1;
                if(this.testColl(tabF)) {this.y-=1;}
                else {
                    $("#pacmanImg").animate({
                        top :"+=40"
                    },lvl);
                }
                if (this.y>grille.length)
                {
                    this.y=0;
                }
                break;
            case 2:
                this.x-=1;
                if(this.testColl(tabF)) {this.x+=1;}
                else {
                    $("#pacmanImg").animate({
                        left :"-=40"
                    },lvl);
                }
                if (this.x<0)
                {
                    this.x=grille[0].length;
                }
                break;
            case 3:
                this.y-=1;
                if(this.testColl(tabF)) {this.y+=1;}
                else {
                    $("#pacmanImg").animate({
                        top :"-=40"
                    },lvl);
                }
                if (this.y<0)
                {
                    this.y=grille.length;
                }
                break;
        }
    }

    /**
    *	Fonction de test de collision				  
    */
    testColl(tabF){
        if(grille[this.y][this.x]==0)
        {
            console.log("il y a un mur en : "+this.y+":"+this.x);
            return true;
        }
        if(grille[this.y][this.x]==2)
        {
            score+=(10*tabF.length);
            nbBonbon--;
            grille[this.y][this.x]=1;
            if(nbBonbon<=0)
            {
                alert("Vous avez gagné !");
                tstfin=true;
            }
            
        }


        for(let myFant in tabF)
        {
            
            if (this.x==tabF[myFant].x && this.y==tabF[myFant].y) {
                alert("Vous avez perdu !");
                tstfin=true;
            }
        }

        return false;
    }
  
}