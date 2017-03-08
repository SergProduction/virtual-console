/*
virtual-console
github - https://github.com/SergProduction/virtual-console
*/

function virtualConsoleInit(param){

param = param || {}

if( param.hash ){
  if( !location.hash.includes( param.hash ) ) return
}

function detectMyName(){
  var stack = new Error('');
  return stack.stack.match(/\w*\.js/)[0];
}

function detectMyLine(){
  var stack = new Error('');
  var str =  stack.stack.match(/\d+/gm)
  if( location.port )
    return parseInt( str[4] )
  else
    return parseInt( str[2] )
}

var MYNAME = detectMyName()
var lineStart = detectMyLine()

window.addEventListener('error', (error) => {
  if( error.error )
    console.error('fake', error.error.stack, error.filename+':'+error.lineno )
  else if( !error.stack )
    console.error('fake', error.message )
  else
    console.error('fake', error.stack )
});

function createVirtualConsole(){
  var consoleWrap = document.createElement('div');
  var header = document.createElement('div');
  var clear = document.createElement('span');
  var close = document.createElement('span');
  var pre = document.createElement('pre');
  var execute = document.createElement('textarea');
  var run = document.createElement('div');

  run.textContent = 'run';//'\u25BA';
  clear.textContent = 'clear';//'\u2205';
  close.textContent = 'close';//'\u2716';

  header.style.cssText = `
    height: 21px;
    width: 100%;
    position: fixed;
    background-color: #efefef;
    cursor: ns-resize;
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
    z-index: 1;
  `;

  clear.style.cssText = `
    margin-left: 5px;
    background-color: #f0f8ff;
    border: 1px solid #6cbaff;
    border-radius: 5px;
    padding: 0 5px;
    cursor: pointer;
  `;

  close.style.cssText = `
    float: right;
    margin-right: 5px;
    background-color: #f0f8ff;
    border: 1px solid #6cbaff;
    border-radius: 5px;
    padding: 0 5px;
    cursor: pointer;
  `;

  pre.style.cssText = `
    border: none;
    border-radius: 0;
    font-size: 13px;
    margin: 21px 0px;
    padding: 0;
  `;

  execute.style.cssText = `
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 21px;
    margin: 0px;
    border-radius: 0px;
    border: none;
    border-top: 1px solid #ddd;
    font-size: 13px;
    padding: 0 5px;
    resize: none;
    box-sizing: border-box;
    line-height: normal;  
    letter-spacing: 1px;
    outline: none;
  `;

  run.style.cssText = `
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: #f0f8ff;
    border: 1px solid #6cbaff;
    line-height: 0;
    padding: ${parseInt(execute.style.height)/2-1}px 15px;
    cursor: pointer;
  `;

  consoleWrap.style.cssText = `
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100px;
    overflow: auto;
    bottom: 0;
    margin: 0;
    padding: 0;
    font-size: 13px;
    font-family: monospace;
    background-color: #fff;
  `;
  document.addEventListener('DOMContentLoaded', () => {
    consoleWrap.style.marginLeft = '-' + window.getComputedStyle( document.body ).marginLeft
  })

  consoleWrap.ondragstart = () => false;
  //header.ondragstart = () => false;
  //pre.ondragstart = () => false;
  
  function drag( param ){
    header.addEventListener( param.down, (e) => {
      if( consoleWrap.offsetHeight == 21 ) return
      e.stopPropagation()
      e = e.clientY != undefined ? e : e.changedTouches[0]
      var difference = consoleWrap.clientHeight - ( document.documentElement.clientHeight - e.clientY );
      var direction = e.clientY;
      
      document.addEventListener( param.move, resizeConsole )
      
      function resizeConsole(e){
        e = e.clientY != undefined ? e : e.changedTouches[0]
        if( execute.offsetHeight + header.offsetHeight >= consoleWrap.offsetHeight && direction < e.clientY ){
          consoleWrap.style.height = execute.offsetHeight + header.offsetHeight + 'px';
          document.removeEventListener(  param.move, resizeConsole )
          return
        }
        consoleWrap.style.height = document.documentElement.clientHeight - e.clientY + difference + 'px'
      }
      
      function deleteDrag(){
        document.removeEventListener( param.move, resizeConsole )
        header.removeEventListener( param.up, deleteDrag )
      }

      header.addEventListener( param.up, deleteDrag )
    })
  }

  drag({down:'mousedown', move:'mousemove', up:'mouseup'})
  drag({down:'touchstart', move:'touchmove', up:'touchend'})

  function runSize(){
    run.style.paddingTop = Math.floor( parseInt(execute.style.height)/2-1 ) + 'px';
    run.style.paddingBottom = Math.floor( parseInt(execute.style.height)/2 ) + 'px';
  }

  execute.addEventListener('input', (e)=>{
    var line = e.target.value.match(/\n/gm)
    if( line != null )
      e.target.style.height = 21 + line.length * 15 + 'px';
    else
      e.target.style.height = 21 + 'px';

    if( e.target.offsetHeight > consoleWrap.offsetHeight - header.offsetHeight )
      consoleWrap.style.height = e.target.offsetHeight + header.offsetHeight + 'px';
    runSize()
  })

  run.addEventListener('click', (e) => {
    try {
      var result = window.eval( execute.value )
    }catch (e) {
      var stack = e.stack.match(/.*\n/)[0];
      console.error('fake', stack)
    }
    console.log( result )
  })

  clear.addEventListener('click', (e) => {
    e.preventDefault();
    pre.innerHTML = '';
  })

  close.addEventListener('click', (e) => {
    e.preventDefault();
    var toggle = consoleWrap.offsetHeight == 21 ? false : true;
    if( toggle ){
      close.textContent = 'open';
      consoleWrap.style.height = '21px';
      execute.style.height = '21px';
      runSize()
    }
    else {
      close.textContent = 'close';
      var line = execute.value.match(/\n/gm)
      if( line )
        execute.style.height = 21 + line.length * 15 + 'px';
      runSize()
      var height = execute.offsetHeight + header.offsetHeight;
      consoleWrap.style.height = execute.offsetHeight <= 100 ? '100px' : height + 'px';
    }
  })

  header.appendChild( clear )
  header.appendChild( close )
  consoleWrap.appendChild( header )
  consoleWrap.appendChild( pre )
  consoleWrap.appendChild( execute )
  consoleWrap.appendChild( run )

  return consoleWrap
}

var virtualConsole = createVirtualConsole()

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild( virtualConsole )
})

function isType(){
  var args = Array.prototype.slice.call(arguments);
  
  return args.map( el => {
    return type( el )
  })

  function type( obj ){
    if( obj === undefined ) return 'undefined'
    var type = Object.prototype.toString.call( obj ).slice(8,-1)
    switch(type){
      case 'Object':
        return JSON.stringify(obj, null,'  ')
      break
      case 'Array':
        return JSON.stringify(obj)
      break
      case 'String':
        return String( obj )
      break
      case 'Number':
        return parseInt( obj )
      break
      case 'Function':
        return eval( obj )
      break
      case 'Boolean':
        return String( obj )
      break
      case 'RegExp':
        return String( obj )
      break
      default:
        if( obj instanceof HTMLElement )
          return obj.outerHTML
        else
          return JSON.stringify(obj)
    }
  }
}

function view( p ){
  var pre = virtualConsole.getElementsByTagName('pre')[0]
  pre.appendChild( p )
  pre.scrollTop = pre.scrollHeight - 100
}

var origin = {
  log: console.log,
  warn: console.warn,
  info: console.info,
  error: console.error,
  dir: console.dir
}

function sourse( str ){
  var sourse = str.stack.match(/\w*\.js[:\d]*/g)[1];
  var stack;
  if( param.inside ){
    let line = sourse ? parseInt( sourse.match(/\d+/)[0] ) : 'anonymous';
    let stackName = sourse ? sourse.match(/\w+\.js/)[0] : 'anonymous';
    stack = sourse ? stackName == MYNAME && line > lineStart && line < lineEnd ? 'virtual console' : sourse : 'anonymous';
  }
  else{
    stack = sourse ? sourse.includes( MYNAME ) ? 'virtual console' : sourse : 'anonymous'
  }
  return stack
}

var log = function(){
  var arg = Array.prototype.slice.call(arguments)
  
  origin.log( ...arg );
  
  var stack = new Error('');
  stack = sourse( stack )
  
  var mobLog = isType( ...arg )
  
  var p = document.createElement('p');
  p.textContent = mobLog.join(' ');
  p.style.cssText = `
    margin: 0;
    padding: 0 5px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    color: #000;
    `;
  
  var span = document.createElement('span');
  span.textContent = stack;
  span.style.cssText = 'float:right; color:#555';
  p.insertBefore(span, p.firstChild)
  
  view( p )
}


var warn = function(){
  var arg = Array.prototype.slice.call(arguments)
  
  origin.warn( ...arg );
  
  var stack = new Error('');
  stack = sourse( stack )
  
  var mobLog = isType( ...arg )
  
  var p = document.createElement('p');
  p.textContent = mobLog.join(' ');
  p.style.cssText = `
    margin: 0;
    padding: 0 5px;
    border-bottom: 1px solid #eeeeb0;
    background-color: #ffd;
    color: #000;
    `;
  
  var span = document.createElement('span');
  span.textContent = stack;
  span.style.cssText = 'float:right; color:#555';
  p.insertBefore(span, p.firstChild)
  
  view( p )
}

var info = function(){
  var arg = Array.prototype.slice.call(arguments)
  
  origin.info( ...arg );
  
  var stack = new Error('');
  stack = sourse( stack )
  
  var mobLog = isType( ...arg )
  
  var p = document.createElement('p');
  p.textContent = mobLog.join(' ');
  p.style.cssText = `
    margin: 0;
    padding: 0 5px;
    border-bottom: 1px solid #eeeeb0;
    background-color: #def;
    color: #000;
    `;
  
  var span = document.createElement('span');
  span.textContent = stack;
  span.style.cssText = 'float:right; color:#555';
  p.insertBefore(span, p.firstChild)
  
  view( p )
}

var error = function( type, ...args ){
  var arg = Array.prototype.slice.call(arguments)
  
  var stack = new Error('');
  stack = sourse( stack )

  var mobLog = isType( ...arg )
  
  if( type == 'fake'){
    let name;
    arg = args;
    
    if( args[1] ){
      name = args[1].match(/\w*\.js[:\d]*/m);
    }
    else{
      name = args[0].match(/\w*\.js[:\d]*/m);
    }
    if( param.inside ){
      let line = name ? name[0].match(/\d+/)[0] : 'anonymous';
      let stackName = name ? name[0].match(/\w+\.js/)[0] : 'anonymous';
      stack = name ? stackName == MYNAME && line > lineStart && line < lineEnd ? 'virtual console' : name : 'virtual console';
    }
    else{
      stack = name ? name[0].includes( MYNAME ) ? 'virtual console' : name : 'virtual console';
    }

    mobLog = isType( args[0] )
  }
  else{
    origin.error( ...arg );
  }

  var p = document.createElement('p');
  p.textContent = mobLog.join(' ');
  p.style.cssText = `
    margin: 0;
    padding: 0 5px;
    border-bottom: 1px solid #fdd;
    background-color: #fee;
    color: #f00;
    `;

  var span = document.createElement('span');
  span.textContent = stack;
  span.style.cssText = 'float:right; color:#555';
  p.insertBefore(span, p.firstChild)
  
  view( p )
}

console = Object.assign({}, console, {warn, error, log, info})

var lineEnd = detectMyLine()

}

//virtualConsoleInit({hash: 'console=true'})