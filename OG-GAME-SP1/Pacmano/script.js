let fieldData = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 2, 1, 2, 2, 2, 1, 1, 0, 1, 1, 2, 2, 2, 1, 2, 1],
    [1, 2, 1, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 2, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 1],
    [1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1],
    [1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1],
    [1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]; // Разметка игрового поля (как мне кажется, это оптимальный вариант для данного проекта)

let url = "https://x.com/SuccinctLabs"; // Ссылка на сайт
let animation = 0; // Стадия анимации
let music; // Музыка
let soundTake, soundBig, soundKill, soundDeath; // Звуки
let mode = 0; // Игровой режим
let w = 1700, h = 680; // Ширина, длина экрана
let d; // Отрисовщик
let delay = 12; // Задержка игрового цикла
let speed = 2; // Скорость передвижения
let c; // Главный герой (character)
let e = []; // Массив сущностей (entities)
let t = []; // Массив уведомлений о сборе (texts)
let f = []; // Игровое поле (field)
let fx = 17, fy = 15; // Ширина, длина игрового поля
let s = 45; // Шаг игрового поля
let cx = -467.5, cy = -2.5; // Позиция игровой камеры
let health = 3; // Количество здоровья персонажа
let score = 0; // Количество опыта персонажа

// Объявление изображений
let healthImage = new Image();
let characterImage = new Image();
let characterMirrorImage = new Image();
let starImage = new Image();
let ghostImages = [];
let eyesDirectImages = [];

let flashbang = 100;

// Переход по ссылке на сайт
function nextPage(){
    document.location.href=url;
}

// Запуск сайта
window.onload = function () {
    let musicType = Math.floor(Math.random() * 2 + 1);
    music = new Audio('assets/music_' + musicType + '.mp3');
    if (musicType === 1) {
        music.volume = 0.1;
    }
    if (musicType === 2) {
        music.volume = 0.07;
    }
    soundTake = new Audio('assets/take.mp3');
    soundTake.volume = 0.2;
    soundBig = new Audio('assets/big.mp3');
    soundBig.volume = 0.2;
    soundKill = new Audio('assets/kill.mp3');
    soundKill.volume = 0.4;
    soundDeath = new Audio('assets/death.mp3');
    soundDeath.volume = 0.3;
    let canvas = document.getElementById("c");
    canvas.width = w;
    canvas.height = h;
    d = canvas.getContext("2d");
    d.font = "bold 32px Consolas";
    characterImage.src = "assets/character.png";
    characterMirrorImage.src = "assets/character_mirror.png";
    healthImage.src = "assets/health.png";
    starImage.src = "assets/star.png";
    for (let i = 0; i < 6; i++) {
        ghostImages[i] = new Image();
        ghostImages[i].src = "assets/ghost_" + (i + 1) + ".png";
    }
    for (let i = 0; i < 4; i++) {
        eyesDirectImages[i] = new Image();
        eyesDirectImages[i].src = "assets/eyes_" + (i + 1) + ".png";
    }
    //prepare();
    cycle();
}

// Обработчик зажатий клавиш
window.onkeydown = function (e) {
    if (mode == 1) {
        if (music.paused) {
            music.play();
        }
        if (e.code === "KeyW") {
            c.nvy = -1;
            c.nvx = 0;
        }
        if (e.code === "KeyA") {
            c.nvx = -1;
            c.nvy = 0;
        }
        if (e.code === "KeyS") {
            c.nvy = 1;
            c.nvx = 0;
        }
        if (e.code === "KeyD") {
            c.nvx = 1;
            c.nvy = 0;
        }
    }else{
        health=3;
        prepare();
        let musicType = Math.floor(Math.random() * 2 + 1);
        music = new Audio('assets/music_' + musicType + '.mp3');
        if (musicType === 1) {
            music.volume = 0.1;
        }
        if (musicType === 2) {
            music.volume = 0.07;
        }
        music.play();
    }
}

// Подготовка к запуску игрового процесса
function prepare() {
    f = [];
    for (let ix = 0; ix < fx; ix += 1) {
        f[ix] = [];
        for (let iy = 0; iy < fy; iy += 1) {
            f[ix][iy] = fieldData[iy][ix];
        }
    }
    score = 0;
    c = {
        x: s * 8 + s * 0.01,
        y: s * 13 + s * 0.01,
        s: s * 0.98,
        nvx: 1,
        nvy: 0,
        vx: 1,
        vy: 0,
        mirror: false,
        animate: 0
    }
    e = [];
    for (let i = 0; i < 4; i++) {
        e[i] = {
            x: s * 8 + s * 0.01,
            y: s * 7 + s * 0.01,
            s: s * 0.98,
            nvx: 0,
            nvy: -1,
            vx: 0,
            vy: -1,
            lastX: 0,
            lastY: 0,
            lastlastX: 0,
            lastlastY: 0,
            eyedirect: 1,
            animate: 0,
            toNextMind: 100,
            invisibility: 0,
            state: 0
        };
    }
    mode = 1;
}

// Игровой цикл, в котором рендер объединён с математическими вычислениями в один поток
function cycle() {
    if (mode == 1) {
        // Математика

        for (let j = 0; j < 4; j++) {
            if (e[j].state === 3) {
                let px = Math.floor((e[j].x + e[j].s / 2) / s);
                let py = Math.floor((e[j].y + e[j].s / 2) / s);
                let npx = 8;
                let npy = 7;

                if (npx === px && npy === py){
                    e[j].state = 0;
                    e[j].invisibility=0;
                }
                e[j].toNextMind-=1;
                if(e[j].toNextMind<=0) {
                    e[j].toNextMind = 6;
                    let m = Math.floor(Math.random() * 16);
                    if (m === 0) {
                        e[j].nvy = -1;
                        e[j].nvx = 0;
                    }
                    if (m === 1) {
                        e[j].nvx = -1;
                        e[j].nvy = 0;
                    }
                    if (m === 2) {
                        e[j].nvy = 1;
                        e[j].nvx = 0;
                    }
                    if (m === 3) {
                        e[j].nvx = 1;
                        e[j].nvy = 0;
                    }
                    if (m > 3 && m <= 9) {
                        if (px < npx) {
                            e[j].nvx = 1;
                            e[j].nvy = 0;
                        }
                        if (px > npx) {
                            e[j].nvx = -1;
                            e[j].nvy = 0;
                        }
                    }
                    if (m > 9 && m <= 15) {
                        if (py < npy) {
                            e[j].nvy = 1;
                            e[j].nvx = 0;
                        }
                        if (py > npy) {
                            e[j].nvy = -1;
                            e[j].nvx = 0;
                        }
                    }
                }
            }
            if (e[j].state === 0) {
                if (e[j].invisibility > 0) {
                    e[j].invisibility -= 0.015;
                } else {
                    e[j].invisibility = 0;
                }
                /*if (!(e[j].lastlastX === e[j].lastX && e[j].lastlastY === e[j].lastY)){
                    e[j].lastlastX = e[j].lastX;
                    e[j].lastlastY = e[j].lastY;
                }*/
                let px = Math.floor((e[j].x + e[j].s / 2) / s);
                let py = Math.floor((e[j].y + e[j].s / 2) / s);

                if ((e[j].lastX !== px || e[j].lastY !== py) && !(px <= 9 && px >= 7 && py >= 6 && py <= 7) && !(px === 8 && py === 5)) {
                    e[j].lastlastX = e[j].lastX;
                    e[j].lastlastY = e[j].lastY;
                    e[j].lastX = px;
                    e[j].lastY = py;
                }
                //console.log("px:"+px + ", py:"+py + ", lx:"+e[j].lastX + ", ly:"+e[j].lastY)

                e[j].toNextMind -= 1;
                e[j].animate += (-e[j].animate) / 5;

                let access = true;
                let ix = px;
                let iy = py;
                let cpx = Math.floor((c.x + c.s / 2) / s);
                let cpy = Math.floor((c.y + c.s / 2) / s);
                if (px === cpx && py === cpy) {
                    if (e[j].invisibility <= 0) {
                        death();
                        break;
                    } else {
                        e[j].state = 3;
                        set_text(e[j].x + e[j].s / 2, e[j].y + e[j].s / 2, "+" + 200);
                        soundKill.play();
                        c.animate += 20;
                        score += 200;
                    }
                }
                let is = 0;
                while (is < 20) {
                    if (e[j].eyedirect === 0) {
                        ix -= 1;
                    }
                    if (e[j].eyedirect === 1) {
                        iy += 1;
                    }
                    if (e[j].eyedirect === 2) {
                        ix += 1;
                    }
                    if (e[j].eyedirect === 3) {
                        iy -= 1;
                    }

                    if (ix === cpx && iy === cpy) {
                        access = false;
                        let k = 1;
                        if (e[j].invisibility > 0) {
                            k = -1;
                        }
                        if (e[j].eyedirect === 0) {
                            e[j].nvx = -1 * k;
                            e[j].nvy = 0;
                        }
                        if (e[j].eyedirect === 1) {
                            e[j].nvy = 1 * k;
                            e[j].nvx = 0;
                        }
                        if (e[j].eyedirect === 2) {
                            e[j].nvx = 1 * k;
                            e[j].nvy = 0;
                        }
                        if (e[j].eyedirect === 3) {
                            e[j].nvy = -1 * k;
                            e[j].nvx = 0;
                        }

                        break;
                    }
                    if (!act(ix, iy) || f[ix][iy] === 1) {
                        break;
                    }
                    is += 1;
                }
                //console.log(is);

                if (e[j].toNextMind <= 0 && access) {
                    e[j].toNextMind = 5 + Math.floor(Math.random() * 25);
                    e[j].eyedirect = Math.floor(Math.random() * 4);
                    e[j].animate += 10;
                    let l = 0;
                    while (l < 10) {
                        let m = Math.floor(Math.random() * 4);
                        if (m === 0) {
                            e[j].nvy = -1;
                            e[j].nvx = 0;
                        }
                        if (m === 1) {
                            e[j].nvx = -1;
                            e[j].nvy = 0;
                        }
                        if (m === 2) {
                            e[j].nvy = 1;
                            e[j].nvx = 0;
                        }
                        if (m === 3) {
                            e[j].nvx = 1;
                            e[j].nvy = 0;
                        }
                        let pxo = Math.floor((e[j].x + e[j].s / 2 + e[j].nvx * e[j].s) / s);
                        let pyo = Math.floor((e[j].y + e[j].s / 2 + e[j].nvy * e[j].s) / s);
                        if (!(e[j].lastX === pxo && e[j].lastY === pyo) && !(e[j].lastlastX === pxo && e[j].lastlastY === pyo)) {
                            break;
                        }
                        l++;
                        /*let px1 = Math.floor((e[j].x + e[j].nvx * speed + 0) / s);
                        let py1 = Math.floor((e[j].y + e[j].nvy * speed + 0) / s);
                        let px2 = Math.floor((e[j].x + e[j].nvx * speed + e[j].s) / s);
                        let py2 = Math.floor((e[j].y + e[j].nvy * speed + 0) / s);
                        let px3 = Math.floor((e[j].x + e[j].nvx * speed + e[j].s) / s);
                        let py3 = Math.floor((e[j].y + e[j].nvy * speed + e[j].s) / s);
                        let px4 = Math.floor((e[j].x + e[j].nvx * speed + 0) / s);
                        let py4 = Math.floor((e[j].y + e[j].nvy * speed + e[j].s) / s);
                        if (!(!act(px1, py1) || f[px1][py1] === 1 || !act(px2, py2) || f[px2][py2] === 1 || !act(px3, py3) || f[px3][py3] === 1 || !act(px4, py4) || f[px4][py4] === 1)) {
                            if (e[j].nvy !== e[j].nvx) {
                                e[j]
                            }
                        }*/
                    }
                }
            }
            let n = 5;
            let k = 1;
            if(e[j].state===3){
                n=15;
                k = 3;
            }
            for (let i = 0; i < n; i += 1) {
                e[j].lx = e[j].x;
                e[j].ly = e[j].y;

                e[j].x += e[j].vx * speed / n * k;
                e[j].y += e[j].vy * speed / n * k;

                let px1 = Math.floor((e[j].x) / s);
                let py1 = Math.floor((e[j].y) / s);
                let px2 = Math.floor((e[j].x + e[j].s) / s);
                let py2 = Math.floor((e[j].y) / s);
                let px3 = Math.floor((e[j].x + e[j].s) / s);
                let py3 = Math.floor((e[j].y + e[j].s) / s);
                let px4 = Math.floor((e[j].x) / s);
                let py4 = Math.floor((e[j].y + e[j].s) / s);
                if (!act(px1, py1) || f[px1][py1] === 1 || !act(px2, py2) || f[px2][py2] === 1 || !act(px3, py3) || f[px3][py3] === 1 || !act(px4, py4) || f[px4][py4] === 1) {
                    e[j].x = e[j].lx;
                    e[j].y = e[j].ly;
                }
                px1 = Math.floor((e[j].x + e[j].nvx * speed * k + 0) / s);
                py1 = Math.floor((e[j].y + e[j].nvy * speed * k + 0) / s);
                px2 = Math.floor((e[j].x + e[j].nvx * speed * k + e[j].s) / s);
                py2 = Math.floor((e[j].y + e[j].nvy * speed * k + 0) / s);
                px3 = Math.floor((e[j].x + e[j].nvx * speed * k + e[j].s) / s);
                py3 = Math.floor((e[j].y + e[j].nvy * speed * k + e[j].s) / s);
                px4 = Math.floor((e[j].x + e[j].nvx * speed * k + 0) / s);
                py4 = Math.floor((e[j].y + e[j].nvy * speed * k + e[j].s) / s);
                if (!(!act(px1, py1) || f[px1][py1] === 1 || !act(px2, py2) || f[px2][py2] === 1 || !act(px3, py3) || f[px3][py3] === 1 || !act(px4, py4) || f[px4][py4] === 1)) {
                    if (e[j].nvy !== e[j].nvx) {
                        e[j].vx = e[j].nvx;
                        e[j].vy = e[j].nvy;
                        e[j].nvx = 0;
                        e[j].nvy = 0;
                    }
                }
            }
        }

        n = 5;
        for (let i = 0; i < n; i++) {
            c.lx = c.x;
            c.ly = c.y;
            c.x += c.vx * speed / n;
            c.y += c.vy * speed / n;
            let px1 = Math.floor((c.x) / s);
            let py1 = Math.floor((c.y) / s);
            let px2 = Math.floor((c.x + c.s) / s);
            let py2 = Math.floor((c.y) / s);
            let px3 = Math.floor((c.x + c.s) / s);
            let py3 = Math.floor((c.y + c.s) / s);
            let px4 = Math.floor((c.x) / s);
            let py4 = Math.floor((c.y + c.s) / s);
            if (!act(px1, py1) || f[px1][py1] === 1 || !act(px2, py2) || f[px2][py2] === 1 || !act(px3, py3) || f[px3][py3] === 1 || !act(px4, py4) || f[px4][py4] === 1) {
                c.x = c.lx;
                c.y = c.ly;
            }
            px1 = Math.floor((c.x + c.nvx * speed + 0) / s);
            py1 = Math.floor((c.y + c.nvy * speed + 0) / s);
            px2 = Math.floor((c.x + c.nvx * speed + c.s) / s);
            py2 = Math.floor((c.y + c.nvy * speed + 0) / s);
            px3 = Math.floor((c.x + c.nvx * speed + c.s) / s);
            py3 = Math.floor((c.y + c.nvy * speed + c.s) / s);
            px4 = Math.floor((c.x + c.nvx * speed + 0) / s);
            py4 = Math.floor((c.y + c.nvy * speed + c.s) / s);
            if (!(!act(px1, py1) || f[px1][py1] === 1 || !act(px2, py2) || f[px2][py2] === 1 || !act(px3, py3) || f[px3][py3] === 1 || !act(px4, py4) || f[px4][py4] === 1)) {
                if (c.nvy !== c.nvx) {
                    c.vx = c.nvx;
                    c.vy = c.nvy;
                    if (c.vx > 0) {
                        c.mirror = true;
                    }
                    if (c.vx < 0) {
                        c.mirror = false;
                    }
                    c.nvx = 0;
                    c.nvy = 0;
                }
            }
        }
        c.animate += (-c.animate) / 5;
        let px = Math.floor((c.x + c.s / 2) / s);
        let py = Math.floor((c.y + c.s / 2) / s);
        if ((act(px, py) && f[px][py] === 2)) {
            set_text(c.x + c.s / 2, c.y + c.s / 2, "+" + 10);
            soundTake.play();
            score += 10;
            c.animate += 5;
            f[px][py] = 0;
        }
        px = Math.floor((c.x + c.s / 2) / s);
        py = Math.floor((c.y + c.s / 2) / s);
        if ((act(px, py) && f[px][py] === 3)) {
            set_text(c.x + c.s / 2, c.y + c.s / 2, "+" + 100);
            for(let j =0;j<4;j++) {
                e[j].invisibility = 10;
            }
            soundBig.play();
            c.animate += 10;
            score += 100;
            f[px][py] = 0;
        }
        for (let i = 0; i < t.length; i++) {
            if (t[i].state === 0) {
                t[i].x += (w / 8 + cx - t[i].x) / 15 + Math.floor(Math.random() * 5 - 2);
                t[i].y += (30 + cy - t[i].y) / 15 + Math.floor(Math.random() * 5 - 2);
                if (hit(t[i].x, t[i].y, 10, w / 8 + cx, 20 + cy, 20)) {
                    t[i].state = 3;
                }
            }
        }
        flashbang+=(-flashbang)/10;

        // Отрисовка
        d.fillStyle = "rgb(0,0,0)"
        d.fillRect(0, 0, w, h);
        for (let ix = 0; ix < fx; ix += 1) {
            for (let iy = 0; iy < fy; iy += 1) {
                if (f[ix][iy] === 1) {
                    d.fillStyle = "rgb(230,20,205)"
                    d.fillRect(-cx + ix * s + 1, -cy + iy * s + 1, s - 2, s - 2);
                }
                if (f[ix][iy] === 2) {
                    d.fillStyle = "rgb(240,240,240)"
                    d.beginPath();
                    d.arc(-cx + ix * s + s / 2, -cy + iy * s + s / 2, s / 16, 0, Math.PI * 2);
                    d.fill();
                }
                if (f[ix][iy] === 3) {
                    d.drawImage(starImage, -cx + ix * s + 1, -cy + iy * s + 1, s - 2, s - 2);
                }
            }
        }
        for (let j = 0; j < 4; j++) {
            //d.fillStyle = "rgb(220,100,100)";
            //d.fillRect(-cx + e[j].lastX * s + 1, -cy + e[j].lastY * s + 1, s - 2, s - 2);
            //d.fillStyle = "rgb(250,100,200)";
            //d.fillRect(-cx + e[j].lastlastX * s + 1, -cy + e[j].lastlastY * s + 1, s - 2, s - 2);
            if (e[j].state!==3) {
                if (e[j].invisibility <= 0) {
                    d.drawImage(ghostImages[j], -cx + e[j].x - e[j].s * 0.05, -cy + e[j].y - e[j].s * 0.05, e[j].s * 1.1, e[j].s * 1.1)
                } else {
                    let state = Math.floor(e[j].invisibility * 10);
                    if (state > 30 && state <= 100) {
                        if (state % 8 === 0) {
                            d.drawImage(ghostImages[4], -cx + e[j].x - e[j].s * 0.025, -cy + e[j].y - e[j].s * 0.025, e[j].s * 1.05, e[j].s * 1.05)
                        } else {
                            d.drawImage(ghostImages[5], -cx + e[j].x - e[j].s * 0.05, -cy + e[j].y - e[j].s * 0.05, e[j].s * 1.1, e[j].s * 1.1)
                        }
                    }
                    if (state > 15 && state <= 30) {
                        if (state % 4 === 0) {
                            d.drawImage(ghostImages[4], -cx + e[j].x - e[j].s * 0.025, -cy + e[j].y - e[j].s * 0.025, e[j].s * 1.05, e[j].s * 1.05)
                        } else {
                            d.drawImage(ghostImages[5], -cx + e[j].x - e[j].s * 0.05, -cy + e[j].y - e[j].s * 0.05, e[j].s * 1.1, e[j].s * 1.1)
                        }
                    }
                    if (state >= 0 && state <= 15) {
                        if (state % 2 === 0) {
                            d.drawImage(ghostImages[4], -cx + e[j].x - e[j].s * 0.025, -cy + e[j].y - e[j].s * 0.025, e[j].s * 1.05, e[j].s * 1.05)
                        } else {
                            d.drawImage(ghostImages[5], -cx + e[j].x - e[j].s * 0.05, -cy + e[j].y - e[j].s * 0.05, e[j].s * 1.1, e[j].s * 1.1)
                        }
                    }

                }
            }
            d.drawImage(eyesDirectImages[e[j].eyedirect], -cx + e[j].x - e[j].s * 0.05 - e[j].animate / 2, -cy + e[j].y - e[j].s * 0.05 - e[j].animate / 2, e[j].s * 1.1 + e[j].animate, e[j].s * 1.1 + e[j].animate)
        }
        if (!c.mirror) {
            d.drawImage(characterImage, -cx + c.x - c.s * 0.05 - c.animate / 2, -cy + c.y - c.s * 0.05 - c.animate / 2, c.s * 1.1 + c.animate, c.s * 1.1 + c.animate)
        } else {
            d.drawImage(characterMirrorImage, -cx + c.x - c.s * 0.05 - c.animate / 2, -cy + c.y - c.s * 0.05 - c.animate / 2, c.s * 1.1 + c.animate, c.s * 1.1 + c.animate)
        }
        for (let i = 0; i < health; i++) {
            d.drawImage(healthImage, w / 2 + w / 4 + i * 80 + 10, 20, 40, 60)
        }


        d.fillStyle = "rgb(255, 255, 255)"
        let str = "Control: WASD";
        let symbols = str.split("");
        let len = symbols.length;
        for (let i = 0; i < len; i++) {
            d.fillText(symbols[i], 50+i*25, h-50+Math.floor(Math.random()*3-1));
            d.fillRect(50+i*25+3, h-42, 15, 2);
        }
        d.fillText("Score: " + score, w / 8 - 10, 35)
        for (let i = 0; i < t.length; i++) {
            if (t[i].state === 0) {
                d.fillStyle = "rgb(105, 255, 105)"
                d.fillText(t[i].text, -cx + t[i].x, -cy + t[i].y)

            }
        }
        d.fillStyle = "rgba(255,255,255,"+(flashbang/100)+")";
        d.fillRect(0,0,w,h);
    }else{
        animation+=10;
        if (animation>360){
            animation=0;
        }

        d.fillStyle = "rgba(40,10,50)";
        d.fillRect(0,0,w,h);

        let high = 0;
        if (localStorage.getItem("high")){
            high = localStorage.getItem("high");
        }

        d.fillStyle = "rgb(200, 200, 200)"
        d.fillText("YOUR HIGH SCORE: "+high, w/2-190, 60);
        let str = "CLICK ANY KEY TO START";
        let symbols = str.split("");
        let len = symbols.length;
        for (let i = 0; i < len; i++) {
            d.fillText(symbols[i], w / 2 - 270+i*25, h / 2 - 50+Math.floor(Math.random()*3-1));
            d.fillRect(w / 2 - 280+i*25+3, h / 2 - 42, 15, 2);
        }
        d.fillStyle = "rgb(200, 200, 200)"
        d.beginPath();
        d.moveTo(w/2, h/2+100);
        d.arc(w/2, h/2+100, 25, Math.PI*animation/180+45, Math.PI*animation/180);
        d.fill();
    }

    setTimeout(cycle, delay);
}

function death() {
    soundDeath.play();
    flashbang+=100;
    music.pause();
    let high = 0;
    if (localStorage.getItem("high")){
        high = parseInt(localStorage.getItem("high"));
    }
    if (score > high){
        localStorage.setItem("high", score);
    }
    mode = 0;
    health--;
    if(health>=0) {
        prepare();
        let musicType = Math.floor(Math.random() * 2 + 1);
        music = new Audio('assets/music_' + musicType + '.mp3');
        if (musicType === 1) {
            music.volume = 0.1;
        }
        if (musicType === 2) {
            music.volume = 0.07;
        }
        music.play();
    }
}

// Проверка на столкновение двух кругов
function hit(x1, y1, r1, x2, y2, r2) {
    let dx = x1 - x2;
    let dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy) <= r1 + r2;
}

// Создание летающего текста с уведомлением
function set_text(x, y, value) {
    let access = false;
    let index = 0;
    for (let i = 0; i < t.length; i++) {
        if (t[i].state === 3) {
            access = true;
            index = i;
            break;
        }
    }
    if (!access) {
        access = true;
        index = t.length;
    }
    if (access) {
        t[index] = {};
        t[index].state = 0;
        t[index].x = x;
        t[index].y = y;
        t[index].text = value;
    }
}

// Проверка, актуальна ли данная клетка (не выходит ли она за рамки игрового поля)
function act(x, y) {
    return x > -1 && y > -1 && x < fx && y < fy;
}