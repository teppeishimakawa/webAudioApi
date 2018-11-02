


function stt()
{

//audio setup
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
analyser.fftSize = 128;
var bufferLength=analyser.frequencyBinCount; //fftの1/2
var dataArray=new Uint8Array(bufferLength); //64個の0-255値

//canvas setup
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
canvas.setAttribute('width', analyser.frequencyBinCount * 10); //fftの1/2*10
canvas.setAttribute('height', window.innerHeight);

canvas.clearRect(0,0,width,height);


var buffer;
// ファイルを取得 (arraybufferとして)
var request = new XMLHttpRequest();
request.open('GET', './deer.mp3', true);
request.responseType = 'arraybuffer'; //textでなくarray bufferとしてload

request.send();
request.onload = function ()
{
    // 読み込みが終わったら、decodeしてbufferにいれておく
    var res = request.response;
    audioCtx.decodeAudioData(res, function (buf)
    {
     buffer = buf;
    });
};

//bufferをanalyserに渡すコンテキストを生成
var source=audioCtx.createBufferSource();
source.buffer=buffer;

source.connect(analyser);
analyser.connect(audioCtx.destination);

}
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