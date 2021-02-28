const getEl = el => document.getElementById(el)
const setStyle = (el, prop, val) => el.style[prop] = val
const setAttr = (el, attr, val) => el.setAttribute(attr, val)
const addClass = (el, className) => el.classList.add(className)
const removeClass = (el, className) => el.classList.remove(className)
const resetStyles = el => el.removeAttribute('style')
const removeAllChildren = el => {
  while (el.hasChildNodes()) el.removeChild(el.lastChild)
}

const WRAPPER = getEl('oneSentence'),
      LETTERS = getEl('letters'),
      CURSOR = getEl('cursor')

let HAS_STARTED_TYPING = false
    LAST_TYPE_TIMESTAMP = 0

const MIN_COL = 2,
      MAX_COL = parseInt(LETTERS.clientWidth / 20) - 3,
      MIN_ROW = 1,
    //   MAX_ROW = $("#oneSentence").height() / 20 - 2,
      MAX_ROW = 1002;//去掉首行，尾行，用户可以写1000行
      LETTER_WIDTH = 20,
      LETTER_HEIGHT = 20,
      COLORS = {
        BLUE: 'rgb(3,169,244)',
        RED: 'rgb(239,83,80)',
        PURPLE: 'rgb(171,71,188)',
        GREEN: 'rgb(67,160,71)',
        YELLOW:'rgb(253,216,53)'
        /*BLUE: '#aaa',
        RED: '#aaa',
        PURPLE: '#aaa',
        GREEN: '#aaa',
        YELLOW:' #aaa'*/
      },
      SHADOWS = {
        BLUE: 'below 1px -webkit-linear-gradient(transparent,transparent 50%,rgba(3,169,244,.3))',
        RED: 'below 1px -webkit-linear-gradient(transparent,transparent 50%,rgba(239,83,80,.3))',
        PURPLE: 'below 1px -webkit-linear-gradient(transparent,transparent 50%,rgba(171,71,188,.3))',
        GREEN: 'below 1px -webkit-linear-gradient(transparent,transparent 50%,rgba(67,160,71,.3))',
        YELLOW: 'below 1px -webkit-linear-gradient(transparent,transparent 50%,rgba(253,216,53,.3))',
      }

const STATE = {
  range: 0.1,
  pos: {
    row: MIN_ROW,
    col: MIN_COL
  }
}

const getRandStyle = (type) => {
  var rand = Math.floor((Math.random() * 12));
  var randTheme = null;
  for(var key in themeFiveColor){
    if(rand-- == 0){
        randTheme = themeFiveColor[key];
        break;
    }    
  }
  rand = Math.floor((Math.random() * 3));
  var randColor = randTheme[rand];
  
  switch(type){
      case 1:
          return randColor;
          break;
      case 2:
          return 'below 1px -webkit-linear-gradient(transparent,transparent 50%,rgba({},.3))'.replace(/{}/, randColor.slice(4, -1));
          break;
  }
  return '';
}

const getRandPosOffScreen = () => {
  const lowX1 = 0 - (window.innerWidth * 0.3),
        highX1 = 0 - (window.innerWidth * 0.2),
        lowY1 = 0,
        highY1 = window.innerHeight,
        
        lowX2 = window.innerWidth * 1.2,
        highX2 = window.innerWidth * 1.3,
        lowY2 = 0,
        highY2 = window.innerHeight,
        
        lowX3 = 0,
        highX3 = window.innerWidth,
        lowY3 = 0 - (window.innerHeight * 0.3),
        highY3 = 0 - (window.innerHeight * 0.2),
        
        lowX4 = 0,
        highX4 = window.innerWidth,
        lowY4 = window.innerHeight * 1.2,
        highY4 = window.innerHeight * 1.3
  
  const rand = Math.floor((Math.random() * 4) + 1)
  
  let x = 0,
      y = 0
  
  switch(rand){
    case 1:
      x = Math.floor(Math.random() * (highX1 - lowX1 + 1)) + lowX1
      y = Math.floor(Math.random() * (highY1 - lowY1)) + lowY1
      break
    case 2:
      x = Math.floor(Math.random() * (highX2 - lowX2 + 1)) + lowX2
      y = Math.floor(Math.random() * (highY2 - lowY2)) + lowY2
      break
    case 3:
      x = Math.floor(Math.random() * (highX3 - lowX3 + 1)) + lowX3
      y = Math.floor(Math.random() * (highY3 - lowY3)) + lowY3
      break
    case 4:
      x = Math.floor(Math.random() * (highX4 - lowX4 + 1)) + lowX4
      y = Math.floor(Math.random() * (highY4 - lowY4)) + lowY4
      break
  }
  
  return { x, y }
}

const setLetterPos = (letter, x, y) => {
  setStyle(letter, 'left', x + 'px')
  setStyle(letter, 'top', y + 'px')
}

const setLetterColor = letter => {
  const color = getRandStyle(1)
  setStyle(letter, 'color', color)
}

const createLetter = key => {
  const letter = document.createElement('div')
  letter.innerHTML = key
  setLetterColor(letter)
  addClass(letter, 'off-screen')
  addClass(letter, 'letter')
  return letter
}

const setInitialLetterPos = letter => {
  const pos = getRandPosOffScreen()
  setLetterPos(letter, pos.x, pos.y)
}

const isValidLetter = e => {
  return /^[a-zA-z,.!?@#$%^&*()\-=1234567890\[\]{};:'"~\/<>\|\\_+`]$/.test(e.key)
    && !(e.key === ' ' && STATE.pos.col === MIN_COL);
}

const isEndOfPage = () => {
  return STATE.pos.row === MAX_ROW && STATE.pos.col === MAX_COL
}

const initializeLetter = key => {
  const letter = createLetter(key)
  setInitialLetterPos(letter)
  LETTERS.appendChild(letter)
  return letter
}

const bumpLetterPos = isUp => {
  if(isUp){
    if(STATE.pos.col < MAX_COL){
      STATE.pos.col = Math.min(STATE.pos.col + 1, MAX_COL)
    }
    else{
      STATE.pos.col = MIN_COL
      STATE.pos.row = Math.min(STATE.pos.row + 1, MAX_ROW)
    }
  }
  else{
    if(STATE.pos.col > MIN_COL){
      STATE.pos.col = Math.max(STATE.pos.col - 1, MIN_COL)
    }
    else{
      STATE.pos.col = MAX_COL
      STATE.pos.row = Math.max(STATE.pos.row - 1, MIN_ROW)
    }
  }
}

const bumpCursorPos = () => {
  const x = STATE.pos.col * LETTER_WIDTH + CURSOR.clientWidth,
        y = STATE.pos.row * LETTER_HEIGHT
  setLetterPos(CURSOR, x, y)
}

const determineFinalLetterPos = () => {
  let x = 0,
      y = 0;
  bumpLetterPos(true)
  if(STATE.pos.col <= MAX_COL){
    x = STATE.pos.col * LETTER_WIDTH
    y = STATE.pos.row * LETTER_HEIGHT
  }
  else{
    x = STATE.pos.col * LETTER_WIDTH
    y = (STATE.pos.row + 1) * LETTER_HEIGHT
  }
  
  bumpCursorPos()
  
  return {x, y}
}

const setFinalLetterPos = letter => {
  const pos = determineFinalLetterPos()
  setLetterPos(letter, pos.x, pos.y);
  shadow = getRandStyle(2);
  setStyle(letter, "-webkit-box-reflect", shadow)
}

const getLastLetter = () => {
  const letters = LETTERS.childNodes
  let letter = null
  for(let i = letters.length - 1; i >= 0; i--){
    if(!letters[i].dataset.removed){
      letter = letters[i]
      break
    }
  }
  return letter
}

const setLeavingLetterPos = letter => {
  const pos = getRandPosOffScreen()
  setLetterPos(letter, pos.x, pos.y)
  addClass(letter, 'off-screen')
}

const removeLetter = () => {
  const letter = getLastLetter(),
        color = getRandStyle(1)
  if(letter === null) return 0
  LAST_TYPE_TIMESTAMP = moment()
  setStyle(letter, 'color', color)
  setLeavingLetterPos(letter)
  setAttr(letter, 'data-removed', true)
  bumpLetterPos(false)
  bumpCursorPos()
  setTimeout(() => {
    LETTERS.removeChild(letter)
  }, 500)
}

const handleAlternateKeys = e => {
  switch(e.keyCode){
    case 8: // Backspace
      removeLetter();
      break
    case 13: // Enter
      break
    case 32:// spacebar
        typeLetter(e.key);
        e.preventDefault();
        break;
  }
}

const typeLetter = key => {
  LAST_TYPE_TIMESTAMP = moment()
  const letter = initializeLetter(key)
  setFinalLetterPos(letter);
  setTimeout(() => {
    removeClass(letter, 'off-screen')
    // setTimeout(() => setStyle(letter, 'color', '#629FD6'), 500)
  }, 13)
}

var newSentence = true;
let typeInterval = null;
const typeSentence = (sentence, from) => {
  let i = 0
  typeInterval = setInterval(() => {
     if(sentence[i] == '\n'){
         STATE.pos.col = MIN_COL;
         STATE.pos.row = STATE.pos.row + 1;
     }else{
         typeLetter(sentence[i])
     }
    if(i === sentence.length - 1) {
          clearInterval(typeInterval);
          i = 0;
          STATE.pos.col = MIN_COL;
          STATE.pos.row = STATE.pos.row + 2;
          typeInterval2 = setInterval(() => {
            typeLetter(from[i]);
            if(i === from.length - 1) {
                clearInterval(typeInterval2);
                STATE.pos.col = MIN_COL;
                STATE.pos.row = STATE.pos.row + 1;
                typeLetter(' ');
                newSentence = true;
            }
            i++
          }, 200)
    }else{
        i++;
    }
  }, 200)
  
}

const onInitial = () => {
  STATE.pos.row = MIN_ROW
  STATE.pos.col = MIN_COL
  removeAllChildren(LETTERS)
  clearInterval(typeInterval)
}
/*window.onkeydown = e => {
  if(!HAS_STARTED_TYPING) onInitialType()
  handleAlternateKeys(e)
}*/
articleSearchFocus = false;
function initType(){
    $("#siteSearch,#pageSearch,#user-sentence").focus(function(){
        articleSearchFocus = true;
    });
    $("#siteSearch,#pageSearch,#user-sentence").blur(function(){
        articleSearchFocus = false;
    });
    
}

function content(res, type){
    switch(type){
        case 'ylapiHitokoto':
            return res.hitokoto;
        break;
        case 'alapiSoul':
            return res.data.title;
        default:
        return res.data.content;
    }
}

function author(res, type){
    switch(type){
        case 'ylapiHitokoto':
            return res.from || webName || tName;
        break;
        default:
            return res.author.name || webName || tName;
    }
}

randomSentence = oneSentenceType == 'random';

function initSentence(text){
    /*$.getJSON("https://api.ooopn.com/ciba/api.php",
        function(data){
            typeSentence(data["ciba-en"]);
    });*/
    if(!newSentence){
        return;
    }
    newSentence = false;
    
    setTimeout(function(){
        if(text){
            onInitial();
                HAS_STARTED_TYPING = false;
                $('#oneSentence-image').attr('src', tPath + oneSentencesource.writeImage).show();
                typeSentence(text.replace(/(\r\n)|(\r)|(\n)/gm, '\n'), "来自：" + (userName ? ((webName || tName) + '-' + userName) : (webName || tName) + '-用户'));
        }else{
            if(randomSentence){
                var r = Math.floor(Math.random() * 4);
                for(var key in oneSentencesource){
                    if(r-- == 0){
                        oneSentenceType = key;
                        break;
                    }
                }
            }
            var sourceUrl = oneSentencesource[oneSentenceType][0];
            $.getJSON(sourceUrl,
            function(data){
                onInitial();
                HAS_STARTED_TYPING = false;
                $('#oneSentence-image').attr('src', tPath + oneSentencesource[oneSentenceType][2]).show();
                typeSentence(content(data, oneSentenceType).replace(/(\r\n)|(\r)|(\n)/gm, '\n'), "来自：" +  oneSentencesource[oneSentenceType][1] + '-' + author(data, oneSentenceType));
            });
        }
    }, 1);
    
}

$("#oneSentence-image").zoomify();

$("#oneSentence-change").click(function(){
    if(newSentence){
        initSentence();
    }
    
});

/*window.onkeypress = e => {
    if(articleSearchFocus || !newSentence){
        
    }else{
        if(!HAS_STARTED_TYPING) {
            onInitial();
            HAS_STARTED_TYPING = true;
        }
        if(!isEndOfPage() && isValidLetter(e)) typeLetter(e.key);
    }
}*/

$("#oneSentence-input").click(function(){
    if($("#input-sentence").is(":visible")){
        $("#input-sentence").animate({height: "0"}, 2000, 'linear', function(){
            $("#input-sentence").hide();
        });
    }else{
        $("#input-sentence").show();
        $("#input-sentence").animate({height: "158px"}, 2000);
    }
    
});

$("#sentenceWrite").click(function(){
   var text = $("#user-sentence").val();
   if(text || newSentence){
       initSentence(text);
   }
});

$("#oneSentence-capture").click(function(){
    var canvas = document.querySelector("canvas");
    // var ctx = canvas.getContext("2d");
    toastr.info('正在生成图片，请不要滚动文字区域，稍等一下。。。', '生成图片');
    $("#oneSentence").prop('scrollTop', 0);
   html2canvas(document.querySelector('#oneSentence'), {
       ignoreElements: function(elements){
           return $(elements).attr("id") == 'cursor';
       },
       useCORS: true,
       height: $('#oneSentence').prop('scrollHeight'),
       windowHeight: $('#oneSentence').prop('scrollHeight'),
      canvas: canvas
    //   scale: 1
   }).then(function(canvas) {
        url = canvas.toDataURL('image/png');
        
        //以下代码为下载此图片功能
        var imgDownload = $("<a>").attr("href", url).attr("download", "beautifulSentence.png").insertBefore("#oneSentence")[0];
        imgDownload.click();
        imgDownload.remove();
        // document.body.appendChild(canvas);
    });
});

/*window.onkeyup = e => {
    if(e.keyCode == 13 && $("#user-sentence").is(":focus")){
        $("#sentenceWrite").trigger("click");
    }
}*/

window.onkeydown = e => {
    if(articleSearchFocus || !newSentence){
        
    }else{
        handleAlternateKeys(e);
        
        if(articleSearchFocus || !newSentence){
        
        }else{
            if(!HAS_STARTED_TYPING && isValidLetter(e)) {
                onInitial();
                HAS_STARTED_TYPING = true;
            }
            if(!isEndOfPage() && isValidLetter(e)) typeLetter(e.key);
        }
    }
}