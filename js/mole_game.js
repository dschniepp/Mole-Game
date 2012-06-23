$(document).ready(function() {

    var hills, moles, level, points, time, timer;
    
    set();    

    timer = $.timer( function () {
        timer.stop();
        if(set_hill()){
            timer.play();
             $('#start').text('start1');
        }else{
            alert("Sie haben mit " + points + " Punkte erreicht!");
            $('div').removeClass('mole').removeClass('hill');
            $('.field').addClass('empty');
            set(); 
        }
    });
    
    $('a[href=#restart]').click(function(){
        timer.stop();
        if (confirm("Spiel neustarten?") === true){
          $('div').removeClass('mole').removeClass('hill');
          $('.field').addClass('empty');
          set(); 
        }
    });
    
    $(document).on('vclick', '.mole', function() {
        timer.stop();
        if(time > 0){
            time = time - 10*level;
        }
        $('.game-points').text(points += 1);
        if( points > level*20){
        	$('.game-level').text(level += 1);
        }
        set_mole();
        $(this).removeClass('mole').addClass('hill');
        timer.set({ time : time });
        timer.play();
    });
    
    function set_mole() {
        $(get_random_field('.hill')).removeClass('hill').addClass('mole');
    }
    
    function set_hill() {
        $(get_random_field('.empty')).removeClass('empty').addClass('hill');
        if (get_random_field('.empty').length === 1) {
            return true;
        } else {
            return false;
        }
    }
    
    function get_random_field(type) {
        return $(type).get().sort(function() {
            return Math.round(Math.random()) - 0.5
        }).slice(0, 1);
    }
    
    $(window).resize(function() {
        set_content_size();
    });
        
    function set(){
        set_content_size();
        hills = 3;
        moles = 1;
        time = 3000;        
        for (var i = 0; i < hills; i++)
            set_hill();
        for (var i = 0; i < moles; i++)
            set_mole();
        $('.game-points').text(points = 0);
        $('.game-level').text(level = 1);
    }
                                  
    function set_content_size() {
        $('.ui-grid-c div').height((($('#page').height() - ($('header').height() + $('footer').height())) / 6) - 5);
    }

});