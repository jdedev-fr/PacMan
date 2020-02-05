$( document ).ready(function() {
    //		Score en cours
    let grille = new grilleDef();
    let score=0;
    let nbBonbon=0;
    let tstfin =true;
    let lvl =1000;
    let nbFant=0;
    let myPac = new pacman();
    let tabFant = new Array();

    //On affiche la grille au début
    grille.initGrille(grille);

    //On lance les eventListener
    $('body').keypress(function(mypac,event){
        mypac.testTouche(event)}, event);
    $('#btnLvl').click(function(lvl){
        grille.changeLvl(lvl)});
});

