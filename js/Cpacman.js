/***************************************************/
/*		       Classe pacman                       */
/***************************************************/
/*		droite = direction 0					   */
/*		bas = direction 1	    				   */
/*		gauche = direction 2					   */
/*		haut = direction 3  					   */
/***************************************************/
class pacman {
    constructor(level) {
        this.x=5;
	    this.y=1;
        this.direction=0;
        this.lvl=level;
    }

	/**
    *  Fonction de déplacement du PacMan
    */
    move(tabF,maGrille,bonbon){
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
                if(this.testColl(tabF,maGrille,bonbon)) {
                    this.x-=1;
                }
                else {
                    $("#pacmanImg").animate({
                        left :"+=40"
                    },this.lvl);
                }
                if (this.x>maGrille[0].length)
                {
                    this.x=0;
                }
                break;
            case 1:
                this.y+=1;
                if(this.testColl(tabF,maGrille,bonbon)) {this.y-=1;}
                else {
                    $("#pacmanImg").animate({
                        top :"+=40"
                    },this.lvl);
                }
                if (this.y>maGrille.length)
                {
                    this.y=0;
                }
                break;
            case 2:
                this.x-=1;
                if(this.testColl(tabF,maGrille,bonbon)) {this.x+=1;}
                else {
                    $("#pacmanImg").animate({
                        left :"-=40"
                    },this.lvl);
                }
                if (this.x<0)
                {
                    this.x=maGrille[0].length;
                }
                break;
            case 3:
                this.y-=1;
                if(this.testColl(tabF,maGrille,bonbon)) {this.y+=1;}
                else {
                    $("#pacmanImg").animate({
                        top :"-=40"
                    },this.lvl);
                }
                if (this.y<0)
                {
                    this.y=maGrille.length;
                }
                break;
        }
    }

    /**
    *	Fonction de test de collision				  
    */
    testColl(tabF,maGrille,bonbon){
        if(maGrille[this.y][this.x]==0)
        {
            console.log("il y a un mur en : "+this.y+":"+this.x);
            return true;
        }
        if(maGrille[this.y][this.x]==2)
        {
            score+=(10*tabF.length);
            bonbon--;
            maGrille[this.y][this.x]=1;
            if(bonbon<=0)
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

    /**
    *			Fonction qui récupère la touche        
    */
    testTouche(event){
        switch (event.key) {
            case "ArrowDown":
            case "D":
            case "d":
                this.direction=1;
                $("#touche").html("Touche : V");
                break;
            case "ArrowUp":
            case "E":
            case "e":
                this.direction=3;
                $("#touche").html("Touche : ^");
                break;
            case "ArrowLeft":
            case "S":
            case "s":
                this.direction=2;
                $("#touche").html("Touche : <");
                break;
            case "ArrowRight":
            case "F":
            case "f":
                this.direction=0;
                $("#touche").html("Touche : >");
                break;
            default:
                $("#touche").html("Touche non gere");
                break;
        }       
    }
  
}