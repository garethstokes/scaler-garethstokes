/*!
 * Scaler: Scaling background images to fill browser window with centering and aspect ratio. iPad and iPhone friendly  - v3 - 04/06/2010
 * http://klippoglim.no/
 * http://kirie.no/
 * 
 * Copyright (c) 2010 Eirik Backer
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.gnu.org/licenses/gpl-2.0.html) licenses.
 */

function Scaler(id,els,onChange)
{
  var hold = id.innerHTML
    ? id
    : document.getElementById(id);
  var imgs = hold.getElementsByTagName('img');
  var els=[]; 
  var index=0;					//Get images and set current index
  for(var n=hold.firstChild;n;n=n.nextSibling)
  {
    if(n.nodeType===1 && n!==hold)els.push(n);
  } //Get hold children
  var resize = function(to)
  {
    var to= ((to==='+1'?index+1:(to==='-1'?index-1:(isNaN(to)?index:to)))%imgs.length),to;									//Get current index
    if (onChange != null) onChange(to);
    var i=imgs[to=to<0?imgs.length-1:to],nw=Math.round(document.body.clientHeight*(i.offsetWidth/i.offsetHeight));			//Get img and calculate new width
    i.style.width=(i.offsetWidth>i.offsetHeight&&document.body.clientWidth>nw)?'50%':nw+'px';								//Scale by css if possible
    return {from:index,to:index=to,els:els};
  }

  if(window.attachEvent){window.attachEvent('onload',resize);window.attachEvent('onresize',resize)}							//Attact events IE
  else{																														//Attact events others
    window.addEventListener('load',resize,false);
    window.addEventListener('resize',resize,false);
    window.addEventListener('DOMContentLoaded',resize,false);
  }

  return resize;
};

/*
 * How to use:
 * 
 * var myscaler=Scale('id-of-the-container-element',[elements to swap]);	// Bind events and return a scale function
 * myscaler(3);																// Swap to image with index 3
 * myscaler('+1');															// Go to next image (loops to first if current is the end of gallery)
 * myscaler('-1');															// Go to previous image (loops to last if current is the first of gallery)
 * 
 * See example.js for a simple example implementation
 */
