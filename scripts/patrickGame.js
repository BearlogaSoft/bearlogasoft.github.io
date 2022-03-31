//Глобальные переменые
var gHeight = document.getElementById('game-patrick').offsetHeight; //Высота игры
var gWidth = document.getElementById('game-patrick').offsetWidth; //Ширина игры
var timerEventBomb; 		//Таймер бомб
var timerEventHealth; 		//Таймер Зелий здоровья
var timerEventImunitet;		//Таймер Зелий имунитета
var score = 0;				//Очки
var imunitet = 0;			//Имунитет
var scoreEnd;				//Конечное кол-во очков
var scorePred;				//Очки предыдущей игры
var TextI;					//Вывод имунитета на экран
var igr;					//Ход игры
var l=3;					//Жизни
var delai;					//Время тайиера
var anim=1;					//Загрузка анимации
var fon;					//Выбор фона
var kon = 0;				//Показ очков предыдущей игры
var endScore;				//Набраные очки
var t=120;


//Сцена Меню
var Menu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Menu (){
        Phaser.Scene.call(this, { key: 'Menu' });
    },

    preload: function (){
		this.load.image('logo', './img/PatrickImg/logo.png');
		this.load.image('ng', './img/PatrickImg/ng.png');
		this.load.image('help', './img/PatrickImg/help.png');
		this.load.image('ext', './img/PatrickImg/exit.png')
		this.load.svg('bgmenu', './img/PatrickImg/fong.svg');
    },

	create: function () {

		var bgMenu = this.add.sprite(0, 0, 'bgmenu').setAlpha(0.5);
		bgMenu.displayWidth = gWidth;
		bgMenu.scaleY = bgMenu.scaleX;
		
		var nameGame = this.add.sprite(0, 0, 'logo');
		//Кнопка Начать игру
		var ng = this.add.sprite(0, 0, 'ng').setInteractive();
		ng.on('pointerdown', function () {
			this.scene.start('Game');
		}, this);

		//Кнопка Помощь
		var help = this.add.sprite(0, 0, 'help').setInteractive();
		help.on('pointerdown', function () {
			this.scene.start('Hellp');
		}, this);
		//Кнопка выхода
		var exit = this.add.sprite(0, 0, 'ext').setInteractive()
		exit.on('pointerdown', function () {
			document.location.href = "./laptop.html";
		}, this);

		//Выравнивание игровых объектов по сетки
		this.mGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
		Align.center(bgMenu);
		this.mGrid.placeAtIndex(16, nameGame);
		this.mGrid.placeAtIndex(68, ng);
		this.mGrid.placeAtIndex(74, help);
		this.mGrid.placeAtIndex(104, exit);
	}
});

//Сцена Игра
var Game = new Phaser.Class({
	
    Extends: Phaser.Scene,

    initialize:
	
    function Game ()
    {
        Phaser.Scene.call(this, { key: 'Game' });
		
    },

    preload: function (){
    this.load.svg('sky1', './img/PatrickImg/gfon1.svg');
	this.load.svg('sky2', './img/PatrickImg/gfon2.svg');
	this.load.svg('sky3', './img/PatrickImg/gfon3.svg');
	this.load.svg('sky4', './img/PatrickImg/gfon4.svg');
	this.load.image('bomb', './img/PatrickImg/bomb.png');
	this.load.image('hp', './img/PatrickImg/hp.png');
	this.load.image('imun', './img/PatrickImg/immun.png');
	this.load.image('live', './img/PatrickImg/lives.png');
	this.load.spritesheet('hero', './img/PatrickImg/herosj.png', { frameWidth: 68, frameHeight: 70 });
	this.load.image('ground', '../img/PatrickImg/earth.png');
    },

	create: function () {

		//Выбор фона
		indexRandomBg = Phaser.Math.Between(1, 4);
		var bgGame;
		switch (indexRandomBg) {
			case 1: bgGame = this.add.image(0, 0, 'sky1'); break;
			case 2: bgGame = this.add.image(0, 0, 'sky2'); break;
			case 3: bgGame = this.add.image(0, 0, 'sky3'); break;
			case 4: bgGame = this.add.image(0, 0, 'sky4'); break;
		}
		bgGame.displayWidth = gWidth;
		bgGame.scaleY = bgGame.scaleX;
		//Земля(платформа)
		buttomB = this.physics.add.staticGroup();
		buttomB.create(gWidth/2, gHeight - 2, 'ground').setScale(2).refreshBody();

		//Игрок
		player = this.physics.add.sprite(gWidth / 2, gHeight - 75, 'hero');
		player.setBounce(0.2);
		player.setCollideWorldBounds(true);

		//Анимация Игрока
		if (anim == 1) {
			this.anims.create({
				key: 'left',
				frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 2 }),
				frameRate: 10,
				repeat: -1
			});
			this.anims.create({
				key: 'turn',
				frames: [{ key: 'hero', frame: 3 }],
				frameRate: 20
			});
			this.anims.create({
				key: 'right',
				frames: this.anims.generateFrameNumbers('hero', { start: 4, end: 6 }),
				frameRate: 10,
				repeat: -1
			});
			anim = 0;
		}

		//Загрузка Таймера
		timedEventBomb = this.time.delayedCall(1000, this.updateCounter, [], this);
		timedEventHealth = this.time.delayedCall(Phaser.Math.Between(1500, 4500), this.HealthPoint, [], this);
		timedEventImunitet = this.time.delayedCall(Phaser.Math.Between(1500, 4500), this.Imunitet, [], this);

		//Загрузка жизней
		liv1 = this.add.image(0, 0, 'live');
		liv2 = this.add.image(0, 0, 'live');
		liv3 = this.add.image(0, 0, 'live');

		//Отображение текста
		scoreText = this.add.text(16, 16, 'Очки: 0', { fontSize: '32px', fill: '#DAA520' });
		TextI = this.add.text(16, 46, 'Защита: ' + imunitet, { fontSize: '32px', fill: '#DAA520' });

		//Выравнивание игровых объектов по сетки
		this.gGrid = new AlignGrid({ scene: this, rows: 11, cols: 16 });
		Align.center(bgGame);
		this.gGrid.placeAtIndex(13, liv1);
		this.gGrid.placeAtIndex(14, liv2);
		this.gGrid.placeAtIndex(15, liv3);

		//Подключение клавиш
		cursors = game.input.keyboard.createCursorKeys();

		//Подключение дополнительных клавиш
		this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

		//Столкновени
		this.physics.add.collider(player, buttomB);

		//Глобальные переменые
		igr = 1; l = 3; delai = 400; t = 120; score = 0;
	},

    update: function (time, delta){
       	
		//Управление персонажем
	if (cursors.left.isDown){
        player.setVelocityX(-180);
		player.anims.play('left', true);

    }
    else if (cursors.right.isDown){
        player.setVelocityX(180);
		player.anims.play('right', true);
    }
	    else {
        player.setVelocityX(0);
		player.anims.play('turn');
    }
	    if (cursors.up.isDown && player.body.touching.down){
        player.setVelocityY(-330);
    }
	
	//Очки
	if (igr==1){
	score += 1;
    scoreText.setText('Очки: ' + score);}
	
	//Остановка игры
	if (l < 1){
		igr = 0;
		t--;
		if (t==0) {
		kon=kon+1;
		scorePred = ('В прошлой игре у вас было: ' + endScore + ' очков');
		endScore = score;
		scoreEnd = ('Вы набрали ' + score + ' очков');
		this.scene.start('GameOver');
		}
	}
		
	//Сложность игры
	switch(score){
		case 500 :delai=350;break;
		case 1000 :delai=300;break;
		case 1500 :delai=250;break;
		case 2000 :delai=200;break;
		case 2500 :delai=150;break;
		case 3000 :delai=100;break;}
		
},
	
	//Функция создания бомб
	updateCounter: function () {
	if (igr == 1){
        boms = this.physics.add.group({
			key: 'bomb',
			setXY: { x: Phaser.Math.Between(5, gWidth - 5), y: 0 }
    });
	//Проверка на столкновение персонажа и бомбы
		this.physics.add.overlap(boms, player, this.hitBomb, null, this);
		this.physics.add.overlap(buttomB, boms, this.destrBomb, null, this);
	
	//Таймер спавна бомб
		timedEvent = this.time.addEvent({
		delay:delai,
		callback: this.updateCounter,
		callbackScope: this
		});}
	},
	
	//Функция создание зелей жизни
	HealthPoint: function () {
	if (igr == 1){
        health = this.physics.add.group({
			key: 'hp',
			setXY: { x: Phaser.Math.Between(25, gWidth - 25), y: 0 }
    });
	//Проверка на столкновение персонажа и зелья здоровья
		this.physics.add.overlap(player, health, this.hitHealth, null, this);
		this.physics.add.overlap(buttomB, health, this.destrhealth, null, this);
	//Таймер спавна зелей
		timedEventHealth = this.time.addEvent({
		delay: Phaser.Math.Between(1500, 8000),
		callback: this.HealthPoint,
		callbackScope: this
		});}
	},
	
	//Функция создания зелей имунитета
	Imunitet: function () {
	if (igr == 1){
		Imun = this.physics.add.group({
        key: 'imun',
			setXY: { x: Phaser.Math.Between(25, gWidth - 25), y: 0}
    });
	//Проверка на столкновение персонажа и зелья здоровья
		this.physics.add.overlap(player, Imun, this.hitImun, null, this);
		this.physics.add.overlap(buttomB, Imun, this.destrImun, null, this);
	//Таймер спавна зелей
		timedEventImunitet = this.time.addEvent({
		delay: Phaser.Math.Between(1500, 8000),
		callback: this.Imunitet,
		callbackScope: this
		});}	
	},
	
	//Функция проверки столкновения игрока и зелья жизни
	hitHealth: function (player, health){
	if (l==2){
		l=l+1;
		liv1 = this.add.image(0, 0, 'live');
		this.gGrid.placeAtIndex(13, liv1);
	}
	if (l==1){
		l=l+1;
		liv2 = this.add.image(0, 0, 'live');
		this.gGrid.placeAtIndex(14, liv2);
	}
		health.destroy();
	},
	
	//Функция проверки на столкновение игрока и бомбы
	hitBomb: function (player, boms){
	if (imunitet == 0){
	switch(l){
		case 1: liv3.destroy();break;
		case 2: liv2.destroy();break;
	    case 3: liv1.destroy();break;
	}
		l--;
		boms.destroy();
	}
	else {
			boms.destroy();
			imunitet= imunitet - 1;
			TextI.setText('Защита: ' + imunitet);
		}
	},
	
	//Функция проверки на столкновение игрока и зелья защиты
	hitImun: function(player, Imun){
		imunitet = 5;
		TextI.setText('Защита: ' + imunitet);
		Imun.destroy();
	},
	
	//Уничтожение бомб при столкновении с землей
	destrBomb: function (buttomB, boms) {
		boms.destroy();
	},
	
	//Уничтожение зелей здоровья при столкновение с зелей
		destrhealth: function (buttomB, health) {
		health.destroy();
	},
	
	//Уничтожение зелей имунитета при столкновение с землей
		destrImun: function (buttomB, Imun) {
		Imun.destroy();
	}
});

//Сцена GameOver
var GameOver = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function GameOver ()
    {
        Phaser.Scene.call(this, { key: 'GameOver' });
    },

    preload: function ()
    {
		this.load.svg('bgEnd', '../img/PatrickImg/fonend.svg');
		this.load.image('og', '../img/PatrickImg/gmov.png');
    },

    create: function ()
    {
		this.input.once('pointerdown', function (event) {
        this.scene.start('Menu');
		}, this);
		var bgEnd = this.add.sprite(0, 0, 'bgEnd').setAlpha(0.5);
		bgEnd.displayWidth = gWidth;
		bgEnd.scaleY = bgEnd.scaleX;
		var gOver = this.add.sprite(0, 0, 'og');
		var scoreTxt = this.add.text(0, 0, scoreEnd, { fontSize: '32px', fill: '#DAA520' });
		if (kon > 1) { scoreRez = this.add.text(0, 0, scorePred, { fontSize: '32px', fill: '#DAA520' }); }

		//Выравнивание игровых объектов по сетки
		this.ogGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
		Align.center(bgEnd);
		Align.scaleToGameW(bgEnd, 1);
		this.ogGrid.placeAtIndex(16, gOver);
		this.ogGrid.placeAtIndex(48, scoreTxt);		
		Align.centerH(scoreTxt);
		if (kon > 1) {
			this.ogGrid.placeAtIndex(70, scoreRez);
			Align.centerH(scoreRez);
		}
    }

});


var Hellp = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Hellp ()
    {
        Phaser.Scene.call(this, { key: 'Hellp' });
    },

    preload: function ()
    {
		this.load.svg('fonend', '../img/PatrickImg/fonx.svg');
		this.load.image('logo', '../img/PatrickImg/logo.png');
		this.load.image('hp', '../img/PatrickImg/hp.png');
	    this.load.image('imun', '../img/PatrickImg/immun.png');
    },

    create: function ()
    {
		this.input.once('pointerdown', function (event) {
			this.scene.start('Menu');
		}, this);

		var bgHelp = this.add.sprite(0, 0, 'fonend').setAlpha(0.5);
		bgHelp.displayWidth = gWidth;
		bgHelp.scaleY = bgHelp.scaleX;
		var logo = this.add.sprite(0, 0, 'logo');
		
		var t1 = this.add.text(0, 0, 'Управление: Для перемещения персонажа используйте\n            стрелки на клавиатуре.\n\nЦель:       Выжить и набрать как можно больше очков.\nЗелья:\n', { fontSize: '22px', fill: '#DAA520' });
		var potionHP = this.add.image(0, 0, 'hp');
		var t2 = this.add.text(0, 0, '- зелье жизни, прибавляет одну жизнь.', { fontSize: '22px', fill: '#DAA520' });
		var potionImun = this.add.image(0, 0, 'imun');
		var t3 = this.add.text(0, 0, '- зелье защиты, дает защиту главному \n  герою от 5 бомб', { fontSize: '22px', fill: '#DAA520' });

		//Выравнивание игровых объектов по сетки
		this.hGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
		Align.center(bgHelp);
		this.hGrid.placeAtIndex(16, logo);
		this.hGrid.placeAtIndex(33, t1);
		this.hGrid.placeAtIndex(68, potionHP);
		this.hGrid.placeAtIndex(69, t2);
		this.hGrid.placeAtIndex(79, potionImun);
		this.hGrid.placeAtIndex(80, t3);
		Align.centerH(t1);
    }

});
//Начтройки игры
var config = {
	type: Phaser.AUTO,
	width: gWidth,
	height: gHeight,
	parent: 'game-patrick',
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
	scene: [Menu, Game, GameOver, Hellp]
};
var game = new Phaser.Game(config);

//Сторонний клас выравнивания игровых объектов по сетке
class AlignGrid {
	constructor(config) {
		this.config = config;
		if (!config.scene) {
			console.log("missing scene");
			return;
		}
		if (!config.rows) {
			config.rows = 5;
		}
		if (!config.cols) {
			config.cols = 5;
		}
		if (!config.height) {
			config.height = game.config.height;
		}
		if (!config.width) {
			config.width = game.config.width;
		}

		this.scene = config.scene;

		//cell width
		this.cw = config.width / config.cols;
		//cell height
		this.ch = config.height / config.rows;
	}

	show() {
		this.graphics = this.scene.add.graphics();
		this.graphics.lineStyle(2, 0xff0000);

		for (var i = 0; i < this.config.width; i += this.cw) {
			this.graphics.moveTo(i, 0);
			this.graphics.lineTo(i, this.config.height);
		}

		for (var i = 0; i < this.config.height; i += this.ch) {
			this.graphics.moveTo(0, i);
			this.graphics.lineTo(this.config.width, i);
		}


		this.graphics.strokePath();
	}
	placeAt(xx, yy, obj) {
		//calc position based upon the cellwidth and cellheight
		var x2 = this.cw * xx + this.cw / 2;
		var y2 = this.ch * yy + this.ch / 2;

		obj.x = x2;
		obj.y = y2;
	}
	placeAtIndex(index, obj) {
		var yy = Math.floor(index / this.config.cols);
		var xx = index - (yy * this.config.cols);

		this.placeAt(xx, yy, obj);

	}
	showNumbers() {
		this.show();
		var count = 0;
		for (var i = 0; i < this.config.rows; i++) {
			for (var j = 0; j < this.config.cols; j++) {

				var numText = this.scene.add.text(0, 0, count, { color: '#ff0000' });
				numText.setOrigin(0.5, 0.5);
				this.placeAtIndex(count, numText);


				count++;
			}
		}
	}
}
//Вспомогающий сторонний класс выравнивания игровых объектов
class Align {
	static scaleToGameW(obj, per) {
		obj.displayWidth = game.config.width * per;
		obj.scaleY = obj.scaleX;
	}
	static centerH(obj) {
		obj.x = game.config.width / 2 - obj.displayWidth / 2;
	}
	static centerV(obj) {
		obj.y = game.config.height / 2 - obj.displayHeight / 2;
	}
	static center2(obj) {
		obj.x = game.config.width / 2 - obj.displayWidth / 2;
		obj.y = game.config.height / 2 - obj.displayHeight / 2;
	}
	static center(obj) {
		obj.x = game.config.width / 2;
		obj.y = game.config.height / 2;
	}
}

window.onresize = (e) => {
	document.location.href = "./laptop.html";
};
