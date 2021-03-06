(function(){
	var scaler=Scaler('bg'),els=$('#bg').children(),width=100/els.length;
	var float=$('<span />').css({position:'absolute',color:'#fff',cursor:'pointer',zIndex:2});
	var div=$('<div/>').css({position:'absolute',left:0,bottom:0,marginRight:-20,height:'100%'});
	div.width(els.css({float:'left',width:width+'%'}).length+'00%').append(els);

	var move=function(e){
			float[0].style.left=(e=e||window.event).clientX+20+'px';
			float[0].style.top=e.clientY+20+'px';
			if(float[0].nxt!=(e.clientX>(document.body.offsetWidth/2)))float[0].innerHTML=(float[0].nxt=!float[0].nxt)?'next':'previous';	//Change html only if needed
		},
		swap=function(e){
			var key=e.type=='click'?(e.clientX>(document.body.clientWidth/2)?40:37):e.keyCode;
			if(key>36&&key<41)div.animate({left:(scaler(key>38?'+1':'-1').to*-1)+'00%'});	//swap with animation
		}

	$(window).bind('keydown',swap);
	$('#bg').bind('mousemove',move).bind('click',swap).css('cursor','pointer').append(div,float);

	/*$('#bg').cycle({ //if using jquery.cycle-plugin the window resizing won't behave too good - fixable
		timeout:2000,
		after:function(a,b,c){scaler(c.currSlide)}, //but this part is important - scale the current photo
		fx:'scrollLeft'
	});*/
})();