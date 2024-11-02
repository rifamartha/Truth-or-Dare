function scrollToSection2() {
  document
    .getElementById("wheelSection")
    .scrollIntoView({ behavior: "smooth" });
}

function randomColor() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return { r, g, b };
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function easeOutSine(x) {
  return Math.sin((x * Math.PI) / 2);
}

function getPercent(input, min, max) {
  return ((input - min) * 100) / (max - min) / 100;
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const centerX = width / 2;
const centerY = height / 2;
const radius = width / 2;

let items = [];
let currentDeg = 0;
let step = 360 / items.length;
let colors = [];

function createWheel() {
  items = document
    .getElementById("nameInput")
    .value.split("\n")
    .filter((item) => item.trim() !== "");
  if (items.length === 0) {
    alert("Please input names to spin the wheel!");
    return false;
  }

  step = 360 / items.length;
  colors = [];
  for (let i = 0; i < items.length; i++) {
    colors.push(randomColor());
  }
  draw();
  return true;
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#333";
  ctx.fill();

  let startDeg = currentDeg;

  for (let i = 0; i < items.length; i++, startDeg += step) {
    let endDeg = startDeg + step;
    let color = colors[i];
    let colorStyle = `rgb(${color.r},${color.g},${color.b})`; // Memperbaiki penggunaan warna

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, toRad(startDeg), toRad(endDeg));
    ctx.fillStyle = colorStyle;
    ctx.fill();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(toRad((startDeg + endDeg) / 2));
    ctx.textAlign = "center";
    ctx.fillStyle = (color.r + color.g + color.b) / 3 > 127 ? "#000" : "#fff";
    ctx.font = "bold 24px serif";
    ctx.fillText(items[i], radius / 1.5, 10);
    ctx.restore();
  }
}

let speed = 0;
let maxRotation = randomRange(360 * 3, 360 * 6);
let pause = false;
function animate() {
  if (pause) {
    return;
  }
  speed = easeOutSine(getPercent(currentDeg, maxRotation, 0)) * 20;
  if (speed < 0.01) {
    speed = 0;
    pause = true;
  }
  currentDeg += speed;
  draw();
  window.requestAnimationFrame(animate);
}

function spin() {
  if (speed != 0) {
    return;
  }
  createWheel(); // Memastikan roda diperbarui sebelum berputar
  currentDeg = 0;
  maxRotation = randomRange(360 * 3, 360 * 6);
  pause = false;
  window.requestAnimationFrame(animate);
}

document.getElementById("nameInput").addEventListener("input", createWheel);

function showRandomTruth() {
  const truthOptions = [
    "What’s the wildest Direct Message you’ve ever gotten?",
    "Ever ghosted someone? What happened?",
    "What's the cringiest thing you’ve done to impress a crush?",
    "Who’s your secret celebrity crush that no one knows about?",
    "What's the worst lie you've ever told to get out of plans?",
    "If you could delete one social media post forever, which one would it be?",
    "What’s the most embarrassing song on your playlist?",
    "Have you ever slid into someone’s Direct Messages? How did it go?",
    "What’s the weirdest thing you Google searched recently?",
    "What’s the pettiest reason you ever unfollowed someone?",
    "What’s the most awkward date you’ve been on?",
    "Ever stalked someone online? Who was it?",
    "If you could see into the future, what’s one thing you’d want to know?",
    "Who’s the last person you searched on social media?",
    "If you could swap lives with someone for a day, who would it be?",
  ];
  const randomTruth =
    truthOptions[Math.floor(Math.random() * truthOptions.length)];
  document.getElementById("result").innerText = `Truth: ${randomTruth}`; // Gunakan backticks di sini
}

function showRandomDare() {
  const dareOptions = [
    "Text your crush and tell them you dreamed about them!",
    "Do your best celebrity impression for the next 30 seconds!",
    "Go outside and shout, (I’m a legend!) then walk back like it’s normal!",
    "Send the last photo in your camera roll to the group",
    "Pretend to be the person to your right for the next three rounds!",
    "Speak in an accent of your choice for the next 10 minutes!",
    "Post an embarrassing childhood pic on your Instagram story!",
    "Go live on social media and sing a line from your fave song!",
    "Let someone go through your phone for 1 minute!",
    "Use only emojis to text someone until they respond!",
    "Wear your shirt backward for the next three rounds!",
    "Share the last message you sent someone, no matter what it says!",
    "Freestyle a short rap about anything the group suggests!",
    "Talk like a robot until your next turn!",
    "Type a status update that says, (Guess what? I have a big secret…) but don’t answer anyone’s comments for an hour!",
  ];
  const randomDare =
    dareOptions[Math.floor(Math.random() * dareOptions.length)];
  document.getElementById("result").innerText = `Dare: ${randomDare}`; // Gunakan backticks di sini
}
