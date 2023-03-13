document.getElementById('kokao').setAttribute('draggable', false);
document.getElementById('cup').setAttribute('draggable', false);
let opened = false;


$('.main__plus').click(function() {
	$(".main__plus").toggleClass("main__plus__active");
});

// taste coffe

let tasteArr = [
	{
		name: 'Late',
		codeTs: "ts1",
		needsWater: 70,
		needsMilk: 0
	},
	{
		name: 'Espresso',
		codeTs: "ts2",
		needsWater: 20,
		needsMilk: 0
	},
	{
		name: 'Mocha',
		codeTs: "ts3",
		needsWater: 0,
		needsMilk: 10
	},
	{
		name: 'Macchiato',
		codeTs: "ts4",
		needsWater: 10,
		needsMilk: 20
	},

	
]





// main function start;

function CoffeMachine(power){
	this.waterAmount = 0;
	this.milkAmount = 0;
	this.waterHeigth = 0;
	this.milkHeigth = 0;
	this.tasteId;
	this.controlWaters = false;




	const WATER__HEAT__CACITY = 4200;
	let getBoilTime = function(){
		let boilTIme = this.waterAmount*this.milkAmount*WATER__HEAT__CACITY*80/power;
		console.log("Час приготування"+boilTIme);
		return boilTIme;

	}.bind(this)

	function onReady(){
		$("#cast").removeClass("cast__active");

		let coffeHeigthCast = 50;
		console.log("Coffe ready");
		setTimeout(() => {
			$(".header__press").addClass("header__press__active");
			$(".header__loading").removeClass("header__loading__active");
			$(".header__change-text").text("Coffe ready");

		}, 500);

		setTimeout(() => {
			$("#cast").addClass("cast__active");
			
			

		}, 500);

		setTimeout(() => {
			opened = false;
			$(".header__start").removeClass("header__start__active");
			$(".header__pause").removeClass("header__pause__active");
			$(".header__loading").removeClass("header__loading__active");
			$(".header__press").removeClass("header__press__active");
			$(".header__taste").show();
			machine.controlWaters = false;
			
			

		}, 5000);

	
	}
    let runFun;
	this.run = function(){
	if(machine.controlWaters == true){

		if(!machine.tasteId){
			if($('#kokao').css('display') == 'none'){
				console.log("True");
		
			}else{
				$(".header__change-text").text("Choose drink");
				$("#kokao").hide();
				$(".header__press").addClass("header__press__active");
				setTimeout(() => {
					$("#kokao").show();
					$(".header__press").removeClass("header__press__active");
		
		
				}, 1500);
			
			}
		
		
			
			
		}else{
			runFun = setTimeout(onReady, getBoilTime());
			console.log(machine.tasteId);
			$(".header__press").removeClass("header__press__active");
			$(".header__loading").addClass("header__loading__active");
			function progressCount() {
				let progress = 0;
				let timePersent = getBoilTime() / 100;
				timerId = setInterval(function() {
					if(progress < 100) {
						progress++;
						$('#progress__text').text(progress + '%')
						$('#progress').css('width', progress + '%')
					} else {
						clearInterval(timerId);
					}
				}, timePersent)
			}
			progressCount();


		}
	}else{
		alert("choose drink");

	}
	




	}

	this.stop = function() {
        clearTimeout(runFun);
		console.log("Кава призупинена");



         
    }
	this.contolWater = function() {
		let nArr;
		for(let i = 0; i < tasteArr.length; i++){
			if(machine.tasteId == tasteArr[i].codeTs){
				console.log(i);
				nArr = i;
				break;
			}
		}
		console.log(nArr);
		console.log(tasteArr[nArr]);
		let mikMinus = tasteArr[nArr].needsMilk;
		let waterMinus = tasteArr[nArr].needsWater;
		console.log(machine.waterAmount);
		console.log(machine.milkAmount);
		if(machine.milkAmount <= mikMinus){
			alert("need some more milk");
		}
		if(machine.waterAmount <= waterMinus){
			alert("need some more water");
		}


		if(machine.waterAmount > waterMinus && machine.milkAmount > mikMinus){
			machine.milkAmount = machine.milkAmount - mikMinus;
			machine.waterAmount = machine.waterAmount - waterMinus;
			console.log(machine.waterAmount);
			console.log(machine.milkAmount);


			machine.waterHeigth = machine.waterHeigth - 10;
			machine.milkHeigth = machine.milkHeigth - 10;


			$("#water").css('height', machine.waterHeigth+'%');
			$("#milk").css('height', machine.milkHeigth+'%');

			console.log(machine.waterHeigth);
			this.controlWaters = true;
	
		}

	


	




	}
	



}

let machine = new CoffeMachine(7000)
machine.waterAmount = 20;
machine.milkAmount = 10;
machine.waterHeigth = 20;
machine.milkHeigth = 20;


// main function finish;





$('.header__play').click(function() {
   if(opened == false) {
	


	$(".header__start").addClass("header__start__active");
	$(".header__pause").addClass("header__pause__active");
	
	   opened = true;
	   console.log("pause");
	   machine.run();
	   
	 







   } else{
	$(".header__start").removeClass("header__start__active");
	$(".header__pause").removeClass("header__pause__active");
	   opened = false;
	   console.log("start");;


	   machine.stop();
	

   }
});




//! plus water & milk 

$('#main__plus-right').click(function() {
	machine.waterAmount+=15;
	machine.waterHeigth+=10;
	console.log(machine.waterAmount);
	console.log(machine.waterHeigth);

	if(machine.waterAmount > 310){
		machine.waterAmount = 305;
	}

	if(machine.waterHeigth > 90){
		machine.waterHeigth = 100;
	}
	
	$("#water").css('height', machine.waterHeigth+'%');


});


$('#main__plus-left').click(function() {
	machine.milkAmount+=15;
	machine.milkHeigth+=10;
	console.log(machine.milkAmount);
	console.log(machine.milkHeigth);

	if(machine.milkAmount > 310){
		machine.milkAmount = 305;
	}

	if(machine.milkHeigth > 90){
		machine.milkHeigth = 100;
	}
	
	$("#milk").css('height', machine.milkHeigth+'%');

});





$("#kokao").click(function () { 
	$(this).hide(10);
	setTimeout(() => {
		$(".header__taste").addClass("header__taste__active");



	  }, 100);

	
	
	
	
	

});


$(".header__text").click(function () {
	machine.tasteId = this.id;
	console.log(machine.tasteId);

	machine.contolWater();
	console.log(machine.controlWaters);
	if(machine.controlWaters == true){

	$(".header__taste").hide();
	$(".header__press").addClass("header__press__active");
	$(".header__change-text").text("Click start");
	$(".header__start").removeClass("header__start__active");
	$(".header__pause").removeClass("header__pause__active");
	opened = false;


	}


	


});