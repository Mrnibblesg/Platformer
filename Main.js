const canvas = document.getElementById("myCanvas");
const c = canvas.getContext("2d");
const W = window.innerWidth;
const H = window.innerHeight;
canvas.width = W;
canvas.height = H;

let globalX = 0;
let globalY = 0;

initialize();