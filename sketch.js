var bg,bgImg;
var player;
var bgGame;
var alvoImg;
var startImg;
var gameOver, gameOverImg;
var INICIO = 0, INTRO = 1, GAME = 2, OVER = 3;
var button_inicio, button_seta;
var setaImg;
var alvo;
var alvoGroup;
var score = 0;
var coracao1, coracao2, coracao3;
var coracao1Img, coracao2Img, coracao3Img;
var life = 3;
var civil, civilImg;
var bombaImg;
var restart, restartImg;


//estados do jogo: inicio, intro, game, over.
var gameState = INICIO;

//carregar imagens da pasta
function preload(){

  bgImg = loadImage("assets/tela-inicial.jpg")
  bgGame = loadImage("assets/jogo.jpg")
  alvoImg = loadImage("assets/alvo.png")
  startImg = loadImage("assets/start.png")
  gameOverImg = loadImage("assets/game-over.png")
  setaImg = loadImage("assets/seta.png")
  coracao1Img = loadImage("assets/coracao1.png")
  coracao2Img = loadImage("assets/coracao2.png")
  coracao3Img = loadImage("assets/coracao3.png")
  bombaImg = loadImage("assets/bomba.png")
  restartImg = loadImage("assets/restart_button.png")
}

function setup() { 

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.addImage(bgGame)
  bg.scale = 3.0  
    
  //botao de inicio
  button_inicio = createSprite(displayWidth/2, displayHeight/2+50, 360, 360)
  button_inicio.addImage(startImg)
  button_inicio.scale = 1
  
  //botao seta
  button_seta = createSprite(4*displayWidth /5, 4*displayHeight /5, 200, 200)
  button_seta.addImage(setaImg)
  button_seta.scale = 0.4

  //criando grupo de alvos
  alvoGroup = new Group()
  civilGroup = new Group()

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //tirar fundo da imagem
  //mudar posicao dos coracoes
  //a prof vai mandar as imagens dos coracoes

  //criando sprites de vidas
  coracao1 = createSprite(displayHeight /4, displayHeight /15, 20, 20)
  coracao1.visible = false
  coracao1.addImage(coracao1Img)
  coracao1.scale = 0.4 
 
  coracao2 = createSprite(displayHeight /4, displayHeight /15, 20, 20)
  coracao2.visible = false
  coracao2.addImage(coracao2Img)
  coracao2.scale = 0.4
 
  coracao3 = createSprite(displayHeight /4, displayHeight /15, 20, 20)
  coracao3.visible = false
  coracao3.addImage(coracao3Img)
  coracao3.scale = 0.4

  //fim de jogo  
  gameOver  = createSprite(displayWidth/2,displayHeight/2,20,50);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1;
  gameOver.visible = false;

//fim de jogo  
 restart = createSprite(displayWidth/2,displayHeight/4,20,50);
 restart.addImage(restartImg);
 restart.scale = 0.3;
 restart.visible = false;
}

function draw() {
  background(0); 
  
  //exibindo a quantidade de coracoes de acordo com a vida
  if(life == 3) {
    coracao1.visible = false
    coracao2.visible = false
    coracao3.visible = true
  }

  if(life == 2) {
    coracao1.visible = false
    coracao2.visible = true
    coracao3.visible = false
  }

  if(life == 1) {
    coracao1.visible = true
    coracao2.visible = false
    coracao3.visible = false
  }

  //o jogo acaba quando a vida acaba
  if(life == 0){
    gameState = OVER
    
  } 

  //informacao que aparece no incio do jogo
  if(gameState == INICIO) {
    bg.addImage(bgImg)
    button_seta.visible = false;
    
    if(mousePressedOver(button_inicio)){
      button_inicio.visible = false;
      gameState = INTRO
    }
  }
  
  //instrucoes do inico do jogo
  if(gameState == INTRO){
    //adicionar a imagem de instrucao do jogo
    button_seta.visible = true;
    if(mousePressedOver(button_seta)){
      button_seta.visible = false;
      gameState = GAME
    }
  }
  
  //codigos para o jogo funcionar
  if(gameState == GAME){
    bg.addImage(bgGame)
    criarAlvo()
    criarCivis()

    if(mousePressedOver (civil)) {
      life = life - 1
      civil.destroy( )
    }

    //sumir no alvo quando tocar

    if(mousePressedOver(alvo)) {
        alvo.destroy()
        score = score + 10
      }

    }
  
  //game over e restart 
  if(gameState == OVER){
    gameOver.visible = true
    alvoGroup.setVelocityXEach(0);
    civilGroup.setLifetimeEach(-1);
    restart.visible = true
    civilGroup.setVelocityXEach(0);
    alvoGroup.setLifetimeEach(-1);
    coracao1.visible = false


    if(mousePressedOver(restart)){
      iniciar()
    }
  }

 

  drawSprites();
  textSize(30)
  fill("white")
  text("PONTUAÇÃO = " + score, displayWidth /2, displayHeight /15)
}

function criarAlvo(){
  if(frameCount % 20 == 0){
    //dando posicoes x e y aleatorias para o alvo aparecer
    alvo = createSprite(random(displayWidth/10, 9*displayWidth/10), random(displayHeight/10, 7*displayHeight/10))

    alvo.addImage(alvoImg)
    alvo.scale = 0.35
    alvo.debug = false
    alvo.setCollider("circle", 0, 0, 210)
    alvo.lifetime = 20
    alvoGroup.add(alvo)
  }
}

function criarCivis(){
  if(frameCount % 10 == 0){
    //dando posicoes x e y aleatorias para o alvo aparecer
    civil = createSprite(random(displayWidth/10, 9*displayWidth/10), random(displayHeight/10, 7*displayHeight/10))

    civil.addImage(bombaImg)
    civil.scale = 0.35
    civil.debug = false
    civil.setCollider("circle", 0, 0, 210)
    civil.lifetime = 30
    civilGroup.add(civil)
    
  }
}

function iniciar(){
  gameState = INTRO
  restart.visible = false
  gameOver.visible = false
  alvoGroup.destroyEach()
  civilGroup.destroyEach()

  score = 0
  life = 3
}
