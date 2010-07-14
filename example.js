(function(){
	var bg = document.getElementById('bg');
	var float = document.createElement('span');
	var currentSlide = document.getElementById("slide_0");
	
	//Create and bind scaler-function
	var scale = Scaler(bg, [], function(slide) { 
	  if (currentSlide != null) currentSlide.style.display = 'none';
	  currentSlide = document.getElementById("slide_" + slide);
	  if (currentSlide != null) currentSlide.style.display = 'block';
	});
	
	addEvent = function(el,on,fn)
	{
	  el.attachEvent 
	    ? el.attachEvent('on'+on,fn)
	    : el.addEventListener(on,fn,false)
	},	//Function for cross-borwser addEvent
	move = function(e)
	{
	  float.style.left=(e=e||window.event).clientX+20+'px';
	  float.style.top=e.clientY+20+'px';
	  if(float.nxt!=(e.clientX>(document.body.offsetWidth/2)))float.innerHTML=(float.nxt=!float.nxt)?'next':'previous';	//Change html only if needed
	},
	swap = function(e)
	{
	  var key=(e=e||window.event).type=='click'
	    ? (e.clientX>(document.body.clientWidth/2) ? 40 : 37)
	    : e.keyCode;

	  if(key>36&&key<41)
	  {
	    var data = scale(key>38?'+1':'-1')
	    var l = data.els.length;

	    for(var i=0;i<l;i++)
	      data.els[i].style.height=i==data.to
		? '100%'
		: '0px';
	  }
	}

	addEvent(window,'keydown',swap);
	addEvent(bg,'mouseout',function(){float.style.display='none'});													//Hide floater when not over image
	addEvent(bg,'mouseover',function(){float.style.display='block'});
	addEvent(bg,'mousemove',move);
	addEvent(bg,'click',swap);

	float.style.position='absolute';
	float.style.zIndex='2';
	float.style.color='#fff';
	bg.style.cursor='pointer';
	bg.appendChild(float);
})();
