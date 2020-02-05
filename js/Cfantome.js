class fantome {
    constructor(numF, level) {
        this.numF=numF;
        this.x=9;
	    this.y=9;
        this.direction=0;
        this.lvl=level;
    }

    /**
    *	Déplacement du Fantome
    */
    move(pac,maGrille){
        let newBloc = document.createElement('div');
        newBloc.id='fantome'+this.numF;
        newBloc.classList.add("fantome");
        newBloc.style.gridColumn=this.x+1;
        newBloc.style.gridRow=this.y+1;
        let newBlocImg = document.createElement('img');
        let colorfant = this.numF%4;
        newBlocImg.src="./img/fantome"+colorfant+".gif";
        newBlocImg.id='fantome'+this.numF+'Img';
        newBlocImg.classList.add("fantomeImg");

        $('.grille').append(newBloc);
        $('#'+newBloc.id).append(newBlocImg);

        this.direction = Math.floor(Math.random() * 4);
        if(this.direction>=4){this.direction=0;}
        logMe("direction fantome = "+this.direction);
    
        switch (this.direction){
            case 0:
                this.x+=1;
                if(this.testColl(pac,maGrille)) {
                    this.x-=1;
                }
                else {
                    $("#fantome"+this.numF+"Img").animate({
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
                if(this.testColl(pac,maGrille)) {
                    this.y-=1;
                }
                else {
                    $("#fantome"+this.numF+"Img").animate({
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
                if(this.testColl(pac,maGrille)) {
                    this.x+=1;
                }
                else {
                    $("#fantome"+this.numF+"Img").animate({
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
                if(this.testColl(pac,maGrille)) {
                    this.y+=1;
                }
                else {
                    $("#fantome"+this.numF+"Img").animate({
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
    testColl(pac,maGrille){
        if(maGrille[this.y][this.x]==0)
        {
            logMe("il y a un mur en : "+this.y+":"+this.x);
            return true;
        }
       
        if (pac.x==this.x && pac.y==this.y) {
            alert("Vous avez perdu !");
            tstfin=true;
        }
    

        return false;
    }

}