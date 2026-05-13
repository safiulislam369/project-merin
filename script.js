const letters = [
{
  title:'Just You',
  label:'Just You ♡',
  date:'for the quiet moments between us',
  image:'IMG-20260427-WA0021 (2).jpg',
  text:`Dear You,

I still do not know how someone can become so important without even trying. Somehow, in the quietest way possible, you became part of my everyday thoughts, my happiest moments, and even the calm inside my chaos.

I love the little things about you. The way you speak when you are excited. The way your presence changes the mood of a room without you even noticing it. The way you make ordinary conversations feel unforgettable.

There are people you meet and move on from, and then there are people like you — the ones who leave fingerprints on your heart.

I do not think you fully understand how deeply I care about you.

And maybe I do not always say it perfectly, but if there is one thing I know for certain, it is this:

loving you has been one of the most beautiful feelings I have ever known.

Always yours.`
},
{
  title:'On Difficult Days',
  label:'You Matter ✨',
  date:'for the days your heart feels heavy',
  image:'655611037_18075124736532766_6580438201177208924_n.jpg',
  text:`My Love,

I know life gets heavy sometimes. I know there are days where your smile hides exhaustion, and moments where your heart carries more than you let people see.

But I need you to remember something.

You never have to earn love from me.

Not through perfection.
Not through achievements.
Not through pretending to be okay.

I love you exactly as you are.

Even on your quiet days.
Even on your messy days.
Even when you doubt yourself.

Especially then.

If I could, I would take every painful thought from your mind and replace it with every beautiful thing I see in you. Because you deserve softness. You deserve reassurance. You deserve someone who stays.

And I want to be that person.

Forever,
Me`
},
{
  title:'A Memory I Keep',
  label:'A Memory ✨',
  date:'for the moments that stayed with me',
  image:'560619885_18057956744532766_1923795012228823938_n.jpg',
  text:`Hey You,

There are certain moments I replay in my mind over and over again, and somehow every version of them still feels warm.

The sound of your laugh.
The way your eyes looked when you were talking about something you loved.
The comfortable silence between us that somehow said more than words ever could.

I think that is when I realized it.

Love is not always dramatic.
Sometimes it is just a feeling of peace when someone exists beside you.

You became my favorite kind of memory while still being part of my present, and honestly, that scares me a little — because losing someone like you would feel like losing a part of myself.

But even with that fear, I would still choose you every single time.

Because some people are simply worth loving with your whole heart.

And to me, you are one of them.`
},
{
  title:'Still You',
  label:'Still You ♡',
  date:'for every version of forever',
  image:'465184352_838212801582800_1361283291447919698_n (1).jpg',
  text:`Dear Love,

I tried convincing myself that maybe these feelings would fade with time. That maybe distance, silence, or distraction would somehow make my heart quieter.

But it is still you.

Still the first person I want to tell things to.
Still the person I think about during random moments in the day.
Still the person my heart searches for in every room.

There is something about you that stayed with me in a way I cannot explain. Maybe it is the comfort you bring. Maybe it is the way you understand me without trying too hard. Or maybe it is simply because loving you feels natural.

I do not know what the future looks like.

But I know this:

if my heart had to choose again, in every version of life, in every timeline, in every universe —

it would still choose you.

Always.`
}
];

const grid = document.getElementById('grid');
const overlay = document.getElementById('overlay');
const cardImage = document.getElementById('cardImage');
const cardDate = document.getElementById('cardDate');
const cardTitle = document.getElementById('cardTitle');
const cardText = document.getElementById('cardText');
const closeBtn = document.getElementById('closeBtn');
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

let rafId;

letters.forEach((item,index)=>{

const envelope = document.createElement('div');
envelope.className = 'envelope';
envelope.setAttribute('tabindex','0');

envelope.innerHTML = `
<div class="env-inner">
<div class="env-top">
<div class="flap"></div>
</div>
<div class="env-bottom">
<div class="env-text">${item.label}</div>
</div>
</div>
`;

envelope.addEventListener('click',()=>openLetter(index));

envelope.addEventListener('keypress',(e)=>{
if(e.key==='Enter') openLetter(index);
});

grid.appendChild(envelope);
});

function openLetter(index){

const data = letters[index];

cardImage.src = data.image;
cardDate.textContent = data.date;
cardTitle.textContent = data.title;
cardText.innerHTML = '';

overlay.classList.add('active');
document.body.style.overflow = 'hidden';

if(rafId) cancelAnimationFrame(rafId);

const spans = [];

for(let char of data.text){

if(char === '\n'){
cardText.appendChild(document.createElement('br'));
continue;
}

const span = document.createElement('span');
span.className = 'tc';
span.textContent = char;
cardText.appendChild(span);
spans.push(span);
}

const cursor = document.createElement('span');
cursor.className = 'cursor';
cardText.appendChild(cursor);

const total = spans.length;
const duration = total * 28;
const start = performance.now();
let last = -1;

function animate(now){

const progress = Math.min((now - start) / duration,1);
const current = Math.floor(progress * total);

for(let i = last + 1; i <= current; i++){
if(spans[i]) spans[i].classList.add('show');
last = i;
}

if(spans[last]){
spans[last].after(cursor);
}

if(last < total - 1){
rafId = requestAnimationFrame(animate);
}else{
cursor.remove();
}
}

setTimeout(()=>{
rafId = requestAnimationFrame(animate);
},400);
}

function closeLetter(){
overlay.classList.remove('active');
document.body.style.overflow = 'auto';
if(rafId) cancelAnimationFrame(rafId);
}

closeBtn.addEventListener('click',closeLetter);

overlay.addEventListener('click',(e)=>{
if(e.target === overlay) closeLetter();
});

document.addEventListener('keydown',(e)=>{
if(e.key === 'Escape') closeLetter();
});

musicBtn.addEventListener('click',()=>{

if(bgMusic.paused){

bgMusic.play();
musicBtn.innerHTML = '❚❚';

}else{

bgMusic.pause();
musicBtn.innerHTML = '♫';

}

});

function createHearts(){

const hearts = document.getElementById('hearts');

for(let i=0;i<28;i++){

const heart = document.createElement('div');
heart.className = 'heart';
heart.innerHTML = '♥';

heart.style.left = Math.random()*100 + '%';
heart.style.fontSize = (10 + Math.random()*20) + 'px';
heart.style.animationDuration = (10 + Math.random()*12) + 's';
heart.style.animationDelay = (-Math.random()*12) + 's';

hearts.appendChild(heart);
}
}

createHearts();