$(document).ready(function(){
	
	var hill_set_time = 3000;
	var num_of_moles = 1;
	var num_of_hills = 3;
	var current_hills = 0;
	var timer = $.timer(set_new_hill);
	var level = 1;
	var points = 0;
	var game_state = true;
	
	$('.mole').live('click',function(event){
		set_new_mole(this);
	});
	
	$('#start').live('click',function(event){
		start_game();
	});
	
	function start_game(){
		for( var i=0; i< num_of_hills; i++ ) {
		  set_new_hill();
		}
		for( var i=0; i< num_of_moles; i++ ) {
		  set_first_mole();
		}
		timer.set({ time : hill_set_time, autostart : true });
	}
	
	function get_random_field(type){
		return $(type).get().sort(function(){return Math.round(Math.random())-0.5}).slice(0,1);
	}
	
	function set_new_hill(){
		var empty_field = get_random_field('.empty');
		if(current_hills == 25){
			timer.stop();
			alert("game over!");
			$('.field').removeClass('mole');
			$('.field').removeClass('hill');	
			$('.field').addClass('empty');
			hill_set_time = 1000;
			num_of_moles = 1;
			num_of_hills = 3;
			current_hills = 0;
			timer = $.timer(set_new_hill);
			level = 1;
			points = 0;
		}else{
			$(empty_field).addClass('hill');
			$(empty_field).removeClass('empty');
			current_hills++;
		}
	}
	
	function set_first_mole(){
			$(get_random_field('.hill')).addClass("mole");
	}
	
	function set_new_mole(mole){
			timer.pause();
			$(mole).removeClass('mole');
			update_points();
			timer.stop();
			$(get_random_field('.hill')).addClass('mole');
			timer.set({ time : hill_set_time, autostart : true });
	}
	
	function update_points(){
		points = points+8+level*2;
		$('#points').text(points);	
		hill_set_time = hill_set_time-50;
		
		if(points > level*50){
			level = level+1;
			$('#level').text(level);
		}		
	}
 });