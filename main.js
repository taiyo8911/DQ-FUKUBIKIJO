"use strict"

var carr; // 各スロットの動作状態、インクリメント、出目の結果を保持
var nowStatus; // スロットの動作状態を保持
var count = 0; // 場面の進行用にカウントを保持

// リール
const Symbols0 = ["☀", "♥", "★", "♥", "🌙", "💧", "♥", "★", "💧", "♥", "🌙", "💧", "♥", "💧", "🌙", "♥"];
const Symbols1 = ["☀", "🌙", "♥", "★", "💧", "♥", "💧", "★", "♥", "☀", "♥", "🌙", "♥", "💧", "🌙", "♥"];
const Symbols2 = ["☀", "♥", "🌙", "★", "♥", "💧", "🌙", "♥", "💧", "★", "♥", "🌙", "💧", "♥", "💧", "♥"];

// 初期化
window.addEventListener("load", function () {
    carr = [
        { f: false, v: 0, obj: null, result: "" },
        { f: false, v: 0, obj: null, result: "" },
        { f: false, v: 0, obj: null, result: "" }
    ];
    carr[0].obj = document.getElementById("c0");
    carr[1].obj = document.getElementById("c1");
    carr[2].obj = document.getElementById("c2");
    nowStatus = false;
});

// 各スロットのスピード調整
setInterval(slot1, 400);
setInterval(slot2, 350);
setInterval(slot3, 300);

// displayをクリックするたびにcountで場面を振り分ける
function go() {
    switch (count) {
        case 0:
            start();
            break;

        case 1:
            stop(count);
            break;

        case 2:
            stop(count);
            break;

        case 3:
            stop(count);
            judge();
            break;

        case 4:
            document.getElementById("message1").innerText = "*「では 福引きを 始めましょう!";
            break;

        case 5:
            start();
            count = 0;
            break;
    }

    count += 1;
}


function start() {
    if (nowStatus) { return; }
    else { nowStatus = true; carr[0].f = true; carr[1].f = true; carr[2].f = true; }
}


function slot1() {
    if (carr[0].f) {
        for (let i = 0; i < 15; i++) {
            carr[0].v++;
            if (carr[0].v > 15) { carr[0].v = 0; }
            carr[0].obj.innerText = Symbols0[carr[0].v];
        }
    }
}

function slot2() {
    if (carr[1].f) {
        for (let i = 0; i < 15; i++) {
            carr[1].v++;
            if (carr[1].v > 15) { carr[1].v = 0; }
            carr[1].obj.innerText = Symbols1[carr[1].v];
        }
    }
}

function slot3() {
    if (carr[2].f) {
        for (let i = 0; i < 15; i++) {
            carr[2].v++;
            if (carr[2].v > 15) { carr[2].v = 0; }
            carr[2].obj.innerText = Symbols2[carr[2].v];
        }
    }
}

function stop(count) {
    if (nowStatus) {
        carr[count - 1].f = false;
        carr[count - 1].result = document.getElementById(`c${count - 1}`).innerText;
        if (count == 3) {
            nowStatus = false;
        }
    }
}

function judge() {
    if (carr[0].result == carr[1].result && carr[1].result == carr[2].result) {
        document.getElementById("message1").innerText = `*「おめでとうございます。あたりです!`;
        switch (carr[0].result) {
            case "☀":
                var gift = "ゴールドカード";
                break
            case "★":
                var gift = "いのりのゆびわ";
                break
            case "🌙":
                var gift = "まどうしのつえ";
                break
            case "💧":
                var gift = "まよけのすず";
                break
            case "♥":
                var gift = "やくそう";
                break
        }
        document.getElementById("message2").innerText = `　 ${gift} をさしあげます!」`;
    } else {
        document.getElementById("message1").innerText =
            `＊「ざんねん。はずれです。もういちど挑戦しますか？」`;
    }
}