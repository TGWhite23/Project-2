$(document).ready(function(){
//Extra feature - End of Game Notification
	
	var startHeading =$("h1").html();	
	var pieces = $("#puzzlearea").find("div");	

//The general property of the puzzle pieces are set
	$(pieces).each(function(){
		$(this).addClass("puzzlepiece");	
	})

//Pieces are arranged into initial order on puzzle area and background image is positioned
	var pieceHeight = 0;
	var count = 0;
	var bgImage = 0;
	var initialPosition = [];
	$(pieces).each(function(){		
		count ++;
		if (count < 5) {
			$(this).css({"top":"0px", "left":pieceHeight+"px"});
			pieceHeight = pieceHeight + 100;		
			$(this).css("background-position", (bgImage+"px 0px"));				
			bgImage = bgImage - 100;
			initialPosition.push($(this).position());
		}		
		else if (count >= 5 &&  count < 9 ) {
			if (pieceHeight == 400 && bgImage == -400){
				pieceHeight = 0
				bgImage = 0;
				
			}
			$(this).css({"top":"100px", "left":pieceHeight+"px"});
			pieceHeight = pieceHeight + 100;			
			$(this).css("background-position", (bgImage+"px -100px"));				
			bgImage = bgImage - 100;
			initialPosition.push($(this).position());
		}
		else if (count >=9 &&  count < 13 ) {
			if (pieceHeight == 400 && bgImage == -400){
				pieceHeight = 0;
				bgImage = 0;
			}
			$(this).css({"top":"200px", "left":pieceHeight+"px"});
			pieceHeight = pieceHeight + 100;				
			$(this).css("background-position", (bgImage+"px -200px"));				
			bgImage = bgImage - 100;
			initialPosition.push($(this).position());
		}
		else if (count >=13) {
			if (pieceHeight == 400 && bgImage == -400){
				pieceHeight = 0;
				bgImage = 0;
			}
			$(this).css({"top":"300px", "left":pieceHeight+"px"});
			pieceHeight = pieceHeight + 100;			
			$(this).css("background-position", (bgImage+"px -300px"));				
			bgImage = bgImage - 100;
			initialPosition.push($(this).position());
		}
		
	})	
	
	var emptySpaceTop = 300;
	var emptySpaceLeft = 300;
	var tempSpaceTop = 0;
	var tempSpaceLeft = 0;
	var canMove;
	
//Validates whether a puzzlepiece can be moved
	function validation (t,l){
		if (t == emptySpaceTop || l == emptySpaceLeft){			
				canMove = true;
				return canMove;			
		}
		else {
			canMove = false;
			return canMove;
		}
	}	
	
//Hover over a tile that can move and change the color of its border
	$("#puzzlearea div").hover(function(){		
		var x = $(this).position();		
		if (validation(x.top, x.left) == true){
			$(this).addClass("movablepiece");
		}
	}, function(){
		$(this).removeClass("movablepiece");
	});
		
	
//Click a tile and it moves into the empty space
	$("#puzzlearea div").click(function(){
		if ($("#puzzlearea div").hasClass("movablepiece")){	
			var y = this;
			if (Math.abs($(this).top - emptySpaceTop) == 100){			
			moveTile(y);
			} else if (Math.abs($(this).left - emptySpaceLeft) == 100){
				moveTile(y);
			}
			$(this).removeClass("movablepiece");
			haveWon();
		}		
		
	}); 
	
//Moves a tile into an empty space
	function moveTile (t) {		
		var x = $(t).position();					
		tempSpaceTop = x.top;
		tempSpaceLeft = x.left;
		$(t).css({"top":emptySpaceTop+"px", "left":emptySpaceLeft+"px"});
		emptySpaceTop = tempSpaceTop;
		emptySpaceLeft = tempSpaceLeft;
	}
	
//Iterates through the number of tiles that need to move IGNORE
	function tilesToMove (u) {
		var clickedTile = u;
		var x = $(u).position();
		if (u.top != emptySpaceTop){
			var v = Math.abs(u.top - emptySpaceTop)/100;
			if (u.top < emptySpaceTop) {
				for (i = 0; i < v; i++) {
					
				}
			}
		}
		
	}
	
//Locates a div base on a given position IGNORE
	function findDiv(x,y){
		for (i = 0 ; i < pieces.length; i++) {
			var z = $(pieces[i]).position();				
			if(z.top == x && z.left == y){				
				return pieces[i];	
			}
		}	 
	}
	
//Shuffles the puzzlepieces
	$("#shufflebutton").click(function(){
		var a = Math.floor((Math.random() * 30) + 5);
		for (i = 0; i < a; i++) {			
			var availableMoves = [];
			$(pieces).each(function(){			
				var x = $(this).position();	
				if(validation(x.top, x.left) == true){				
					availableMoves.push($(this).index());
				}	
			})
			var n = availableMoves.length;		
			var m = Math.floor((Math.random() * n) + 1);
			var s = availableMoves[m-1];
			var r = $("#puzzlearea div").eq(s);
			var p = r.position();
			tempSpaceTop = p.top;
			tempSpaceLeft = p.left;
			r.css({"top":emptySpaceTop+"px", "left":emptySpaceLeft+"px"});
			emptySpaceTop = tempSpaceTop;
			emptySpaceLeft = tempSpaceLeft;
		}		
		$("h1").html(startHeading);
	})
	
//Checks to see if a player has won
	function haveWon(){		
		var misMatch = 0;			
		for (i = 0 ; i < pieces.length; i++) {
			var x = $(pieces[i]).position();				
			if(x.top != initialPosition[i].top || x.left != initialPosition[i].left){				
				misMatch = 1;	
			}
		}		
		if (misMatch != 1) {
			$("h1").html("YOU WIN!");
		}
	}
	
});