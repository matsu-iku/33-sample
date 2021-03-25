'use strict';

//ページトップボタン

window.onscroll = function(event){
    //スクロール値の取得。
    //ブラウザによってhtmlタグから計算する場合とbodyタグから計算する場合があるので両方を記述。
    //「.documentElement」はhtmlタグを表す。
    let position = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(position);

    //positionの値が300以上で#page-topに.openを追加。
    //300以下で#page-topの.openを削除。
    //300という値は適当
if(position >= 300){
    document.getElementById('page-top').classList.add('open');
} else {
    document.getElementById('page-top').classList.remove('open');
}
};



//ハンバーガーアイコン

//menu-btnをクリックしたとき#gnaviに.openがついていなければ.openを追加。
//ついていれば削除。
//さらに#gnaviに.openがついているとき、menu-btnに.closeを削除。
//#gnaviに.openがついていないとき、menu-btnに.closeを追加。
const cont = document.getElementById('gnavi');
const mbtn = document.getElementById('menu-btn');
mbtn.onclick = function(evt){
    evt.preventDefault();

    //toggleを使った記述。
    cont.classList.toggle('open');
    mbtn.classList.toggle('close');

//「close」の追加・削除に対してtoggleを使わない記述方法。
//コードが長くなるので明確な意図がない限りは使わないほうがいい
//    if(cont.classList.contains('open') === true){
//        mbtn.classList.add('close');
//       } else {
//           mbtn.classList.remove('close');
//       };
    };


//課題１(テストに出る)
//入力された年、月、日を関数に代入して曜日を取得
const form = document.getElementById('what-day');

form.onsubmit = function(event) {
    event.preventDefault();

    //年、月、日をそれぞれ定数として代入
    const yyy = form.year.value;
    const mmm = form.month.value;
    const ddd = form.date.value;


    //日時の指定 + 曜日のデータの取得
    //月は配列で整理されているため、抜き出した値から1を引く必要がある

    //例
    //mmm = [1月,2月,3月,4月]
    //このときに3月のつもりで3を指定すると、配列は０番から始まるため
    //配列番号の3番、つまりapl＝4月が返ってくる。
    //なので目的の月から１を引く必要がある
    const day = new Date(yyy, mmm-1, ddd).getDay();

    //曜日データの生成。
    //switch文を使うと記述が長くなるので配列を使用。
    let week =['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'];
    //console.log(week[day]);
    document.getElementById('A-01').textContent = `${yyy}年${mmm}月${ddd}日`;
    document.getElementById('A-02').textContent = `${week[day]}`;
};



//課題２（テストに出る）
//BMIの計算
const getBMI = document.getElementById('what-bmi');

//送信ボタン（結果ボタン）が押されたときの値を代入
getBMI.onsubmit = function(event) {
    event.preventDefault();

    //cmをmに変換したものと体重を代入
    const m = (getBMI.cm.value / 100)**2;
    const kg = getBMI.kg.value;

    //BMIを小数点第１位まで表示させる
    //値を10倍　→　小数点を切り上げ　→値を1/10にする
    const bmi = Math.floor(kg/m*10)/10;

    //console.log(m,kg,bmi);

    //BMIの結果によって表示を変える。
    //記述が長くなる悪い例。document~をひとくくりにすればすっきりする。
    if(bmi >= 25) {
        document.getElementById('A-04').textContent = '肥満気味';
    } else if(bmi < 18.5) {
        document.getElementById('A-04').textContent = '痩せすぎ';
    } else {
        document.getElementById('A-04').textContent = '標準';
    }

    document.getElementById('A-03').textContent = bmi;

};


//課題３（スライドショー）
//liタグに挿入するためのimgタグを配列に収納
let stock = [];
for(let i = 1;i<=5;i++){
    
    //「''」で囲んだものは文字列として扱う。
    //「''」で囲まれていないが、変数・定数として定義した文字・文字列（今回は「i」）は中身を表示する。
    //「''」で囲っていない、変数・定数を定義していない文字・文字列を含むとエラー
    stock[i-1] = '<img src="images/img' + i + '.jpg">';
};

//コンソールで中身を確認
console.log(stock);




const intervalId = setInterval(function(){
    
    
    //stock.forEach(function(data, index){処理});
    //配列内の各データに対してfunction内の処理を行う。data…配列のデータ、index…データのインデックス番号が入る
stock.forEach(function(data, index){
    
    //getElementById()の()内では数値の計算は行われない（例：1+1は行われない）ため、事前に計算後の値を入れるための変数・定数を定義する
    //document.getElementById('slide-img' + 1+1).innerHTML = data;
    let num = index+1;
    document.getElementById('slide-img' + num).innerHTML = data;
    //console.log('slide-img' + num);
});
    const slide = stock.shift();
    stock.push(slide);
}, 2000);


//slide-imgに書き込み
//for(let i = 1;i<=5;i++){
//    document.getElementById('slide-img' + i).innerHTML += '<img src="images/img' + i + '.jpg">';
//};


//オリンピック(回数は表示、開催されなかった年は空白)
//初の開催は1896年なので初期値は1896。
//今回は2016年までをカウントするので2016を超えたら終了。
//4年に1回開催されるので、カウントは4ずつ増える。
//加えて、開催されたらカウントを１つ増やす
for(let pic = 1896, t = 1; pic <= 2016; pic += 4 , t++){
    
    //pic += 4とpic = pic + 4　は同じ

  //先に開催されなかった年の処理を記述する。
  //後に記述（for文の外に記述）するとpタグに1度書き込んでから例外処理をすることになる。
  //つまり開催されなかった3回分が二重に書き込まれてしまう。
    if(pic === 1916 || pic === 1940 || pic === 1944){
        document.getElementById('pic').innerHTML += `<p>第${t}回 </p>`;
        //console.log('第' + t + '回',``);
    } else {
    document.getElementById('pic').innerHTML += `<p>第${t}回 ${pic} 年</p>`;
    //console.log('第' + t + '回',pic);
    }
};

//第6回、12回、13回が2回登場する
// for(let pic = 1896, t = 1; pic <= 2016; pic += 4, t++){
//         document.getElementById('pic').innerHTML += `<p>第${t}回 ${pic} 年</p>`;
// if(pic === 1916 || pic === 1940 || pic === 1944){
//     document.getElementById('pic').innerHTML += `<p>第${t}回     </p>`;
//     //console.log();
//   }
// };



//オリンピック(開催されなかった年は回数ごと削除)
for(let pic = 1896, t = 1; pic <= 2016; pic += 4, t++){
    if(pic === 1916 || pic === 1940 || pic === 1944){
        //document.getElementById('pic').innerHTML += `<p>     </p>`;
        //console.log();
    } else {
        document.getElementById('pic').innerHTML += `<p>第${t}回 ${pic} 年</p>`;
        //console.log('第' + t + '回',pic);
    }
};


//for(let pic = 1896, t = 1, s = 0; pic <= 2016; pic += 4, t++){
//    if(pic === 1916 || pic === 1940 || pic === 1944){
//       s += 4;
//       //document.getElementById('pic').innerHTML += `<p>     </p>`;
//        //console.log();
//    } else {
//        document.getElementById('pic').innerHTML += `<p>第${t}回 ${pic} 年</p>`;
//        //console.log('第' + t + '回',pic);
//    }
//};
