

var result="";
var result2="";
var cost="";
var costArray=[];

baseArray=[
0000000000000000,5554211100000000,5554211100000000,5554211110000000,
5554211000000000,5553110000000000,4442000000000000,1110000000000000
];

console.log(baseArray[0].toString());

document.getElementById('button').addEventListener('click',function()
{
     navigator.getUserMedia = navigator.getUserMedia
     || navigator.webkitGetUserMedia
     || navigator.mozGetUserMedia;
     window.AudioContext = window.AudioContext
     || window.webkitAudioContext
     || window.mozAudioContext;

 navigator.getUserMedia({audio:true}, function(stream)
  {
       var audioCtx = new AudioContext();
       var source = audioCtx.createMediaStreamSource(stream);
       var analyser = audioCtx.createAnalyser();
       analyser.fftSize = 32;
       analyser.smoothingTimeConstant=0.8;
       source.connect(analyser);
       var bufferLength=analyser.frequencyBinCount; //fftの1/2
       var dataArray=new Uint8Array(bufferLength); //16個の0-255値
       //analyser.connect(audioCtx.destination);

//canvas setup
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
canvas.setAttribute('width', analyser.frequencyBinCount * 10); //fftの1/2*10
canvas.setAttribute('height', window.innerHeight/5);

render();
  //render()後4.2sでendが発火
function end()
{
cancelAnimationFrame(requestId);
}
setTimeout(end,4200);


function render()
{
//analyserに入っている周波数成分をArrayに渡す
 analyser.getByteFrequencyData(dataArray);
 ctx.clearRect(0,0,canvas.width,canvas.height)

 for(i=0;i<dataArray.length;i++)
   {
  ctx.fillRect(i*10,0,2,dataArray[i]/2)
  //数値を小さく加工
  result += Math.round(dataArray[i]/50);
   }
  // \B:単語の境界(空白、カンマ、ピリオド)以外の位置 (?=aaa):aaaの直前の位置
  //(?!aaa):aaaではない直前の位置。カンマ挿入された後も正常処理できるよう。
  //g:繰り返しオプション
  result=result.replace(/\B(?=(\d{16})+(?!\d))/g,',');
  //解析結果の配列
  result=result.split(",");

  var final='';
  var oriArray='';
  for(i=30;i<result.length;i=i+30)
{
     oriArray=result[i];
     final += result[i];
  //for leven
  var a=result[i].toString();

  var kekka=final.replace(/\B(?=(\d{16})+(?!\d))/g,',');
  document.getElementById("txt").value=kekka;

}
 for(i=1;i<baseArray.length;i++)
  {
  var b=baseArray[i].toString();
  }
 requestId=requestAnimationFrame(render);
 cost = levenshteinDistance(a,b);
console.log(cost);
document.getElementById("cost").value=cost;
//leven start

cost = levenshteinDistance(a,b);
console.log(cost);
document.getElementById("cost").value=cost;


function levenshteinDistance( str1, str2 )
{
  if(str1)
  {
var x = str1.length;
  }
  if(str2)
  {
var y = str2.length;
  }
var d = [];  //距離コスト値

//縦横の１列目は空文字との比較なのでコストは文字数と同じ
for(var e=0; e<=x; e++)
　{
  d[e] = [];
  d[e][0] = e;
  }

for(var e=0; e<=y; e++)
　{
  d[0][e] = e;
  }

//以下はd[1][1]より大きいマスを埋めるための記述
var cost = 0;
for(var e=1; e<=x; e++)
　{
  for(var j=1; j<=y; j++)
  　{
    //斜めの文字が同一だったらコスト+0
    cost = str1[e-1] == str2[j-1] ? 0 : 1;
    //costは上+1、左+1、左上+costの一番小さいものになる。
　　d[e][j] = Math.min(d[e - 1][j] +1, d[e][j - 1] +1, d[e - 1][j - 1] + cost);
    }
  }

/*
    // 表の作成開始
    var rows=[];
    var table = document.createElement("table");
    table.border="1"
    // 表に2次元配列の要素を格納
    for(e = 0; e <= x; e++)
    {
     rows.push(table.insertRow(-1));  // 行の追加
     for(j = 0; j <= y; j++)
     {
     cell=rows[e].insertCell(-1);
     cell.appendChild(document.createTextNode(d[e][j]));
     }
    }
    // 指定したdiv要素に表を加える
    document.getElementById("tbl").appendChild(table);
*/
    
      return d[x][y];
  };





//leven end





  //for render ()
  }
  //for navigator ()
 }, function()
      {
       alert('error');
      });
  //for click ()
});


