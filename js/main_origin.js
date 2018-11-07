


var dataArray;
var result="";
var result2="";
var requestId;
//var sixteenArray=[];


document.getElementById('button').addEventListener('click',function(){


//audio setup
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
analyser.fftSize = 32;
analyser.smoothingTimeConstant=0.8;
var bufferLength=analyser.frequencyBinCount; //fftの1/2
dataArray=new Uint8Array(bufferLength); //16個の0-255値
analyser.getByteFrequencyData(dataArray);

//canvas setup
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
canvas.setAttribute('width', analyser.frequencyBinCount * 10); //fftの1/2*10
canvas.setAttribute('height', window.innerHeight/5);



// ファイルを取得 (arraybufferとして)
var request = new XMLHttpRequest();
request.open('GET', './deer.mp3', true);
request.responseType = 'arraybuffer'; //textでなくarray bufferとしてload

request.onload = function ()
{
    //bufferをanalyserに渡すsourceコンテキストを生成
  var source=audioCtx.createBufferSource();
    // 読み込みが終わったら、decodeしてbufferにいれておく
    audioCtx.decodeAudioData(request.response, function (buf)
    {


    source.buffer=buf;
    analyser.connect(audioCtx.destination);
    source.connect(analyser);
    source.start();
    console.log(buf);
    });
};
request.send();


function render()
 {
//analyserに入っている周波数成分をArrayに渡す
 analyser.getByteFrequencyData(dataArray);
 ctx.clearRect(0,0,canvas.width,canvas.height)

 for(i=0;i<dataArray.length;i++)
  {
  ctx.fillRect(i*10,0,2,dataArray[i]/2)
  result += Math.round(dataArray[i]/50);
  }
  // \B:単語の境界(空白、カンマ、ピリオド)以外の位置 (?=aaa):aaaの直前の位置
  //(?!aaa):aaaではない直前の位置。カンマ挿入された後も正常処理できるよう。
  //g:繰り返しオプション
  result=result.replace(/\B(?=(\d{16})+(?!\d))/g,',');
  result=result.split(",");
  console.log(result.length/30)

  var final='';
  var oriArray='';
  for(i=0;i<result.length;i=i+30)
    {
     oriArray=result[i];
     final += result[i]
    };
  final=final.replace(/\B(?=(\d{16})+(?!\d))/g,',');
    //result += result[i]
  requestId=requestAnimationFrame(render);

  console.log(oriArray);

  /*for(i=0;i<20;i++){
　sixteenArray=result.slice(i*16,(i+1)*15);
  }
  var cnt=0;
  cnt ++;
  if(cnt%2 == 0){
  result2 += sixteenArray[cnt];
  };*/
  document.getElementById("txt").value=final;
 }

render();

  //render()後4.2sでendが発火
  function end(){
  cancelAnimationFrame(requestId);
  }
  setTimeout(end,4200);

});



/*
var bufferLength;
var frequency;
var value;
analyser.fftSize = 2048;                    // デフォルト2048
bufferLength = analyser.frequencyBinCount;  // analyser.fftSizeの半分のため、1024
frequency = new Uint8Array(bufferLength); //1024個の0-255値の数字配列

analyser.getByteFrequencyData(frequency); //周波数領域の波形データ取得

for(var i = 0; i < bufferLength; i++) {
  value = frequency[i]; // 波形データ 0 ~ 255が格納されている。
}

// (i * 44100 / 2048)Hzにてiの時の周波数が確定できる。
*/