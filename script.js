/* ============================================================
   LETTER DATA
   ============================================================ */
const letters = [
  {
    title: 'Just You',
    label: 'Just You ♡',
    date:  'for the quiet moments between us',
    image: 'IMG-20260427-WA0021 (2).jpg',
    text: `Dear You,

I still do not know how someone can become so important without even trying. Somehow, in the quietest way possible, you became part of my everyday thoughts, my happiest moments, and even the calm inside my chaos.

I love the little things about you. The way you speak when you are excited. The way your presence changes the mood of a room without you even noticing it. The way you make ordinary conversations feel unforgettable.

There are people you meet and move on from, and then there are people like you — the ones who leave fingerprints on your heart.

I do not think you fully understand how deeply I care about you.

And maybe I do not always say it perfectly, but if there is one thing I know for certain, it is this:

loving you has been one of the most beautiful feelings I have ever known.

Always yours.`
  },
  {
    title: 'On Difficult Days',
    label: 'You Matter ✨',
    date:  'for the days your heart feels heavy',
    image: '655611037_18075124736532766_6580438201177208924_n.jpg',
    text: `My Love,

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
    title: 'A Memory I Keep',
    label: 'A Memory ✨',
    date:  'for the moments that stayed with me',
    image: '560619885_18057956744532766_1923795012228823938_n.jpg',
    text: `Hey You,

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
    title: 'Still You',
    label: 'Still You ♡',
    date:  'for every version of forever',
    image: '465184352_838212801582800_1361283291447919698_n (1).jpg',
    text: `Dear Love,

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

/* ============================================================
   STATE
   ============================================================ */
let currentIndex = 0;
let rafId = null;

/* ============================================================
   DOM REFERENCES
   ============================================================ */
const grid      = document.getElementById('grid');
const overlay   = document.getElementById('overlay');
const cardImage = document.getElementById('cardImage');
const cardDate  = document.getElementById('cardDate');
const cardTitle = document.getElementById('cardTitle');
const cardText  = document.getElementById('cardText');
const closeBtn  = document.getElementById('closeBtn');
const prevBtn   = document.getElementById('prevBtn');
const nextBtn   = document.getElementById('nextBtn');
const bgMusic   = document.getElementById('bgMusic');
const musicBtn  = document.getElementById('musicBtn');

/* ============================================================
   BUILD ENVELOPES
   ============================================================ */
letters.forEach((item, index) => {
  const env = document.createElement('div');
  env.className = 'envelope';
  env.setAttribute('tabindex', '0');
  env.setAttribute('role', 'button');
  env.setAttribute('aria-label', `Open letter: ${item.title}`);

  env.innerHTML = `
    <span class="env-icon">✉</span>
    <span class="env-label">${item.label}</span>
  `;

  env.addEventListener('click', () => openLetter(index));
  env.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') openLetter(index);
  });

  grid.appendChild(env);
});

/* ============================================================
   OPEN LETTER
   ============================================================ */
function openLetter(index) {
  currentIndex = index;
  renderLetter();
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ============================================================
   RENDER CURRENT LETTER WITH TYPEWRITER
   ============================================================ */
function renderLetter() {
  const data = letters[currentIndex];

  cardImage.src = data.image;

  cardImage.onload = function () {
    const ratio = this.naturalWidth / this.naturalHeight;

    // remove old class
    this.classList.remove("portrait");

    // detect portrait image
    if (ratio < 1) {
      this.classList.add("portrait");
    }
  };

  cardDate.textContent = data.date;
  cardTitle.textContent = data.title;
  cardText.innerHTML = '';

  /* Cancel any running animation */
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  /* Build character spans */
  const spans = [];

  for (const char of data.text) {
    if (char === '\n') {
      cardText.appendChild(document.createElement('br'));
      continue;
    }
    const span = document.createElement('span');
    span.className = 'tc';
    span.textContent = char;
    cardText.appendChild(span);
    spans.push(span);
  }

  /* Blinking cursor */
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cardText.appendChild(cursor);

  /* Typewriter animation */
  const total    = spans.length;
  const duration = total * 26;   /* ms total for full text */
  const startTs  = performance.now();
  let lastShown  = -1;

  function animate(now) {
    const progress = Math.min((now - startTs) / duration, 1);
    const upTo     = Math.floor(progress * total);

    for (let i = lastShown + 1; i <= upTo && i < total; i++) {
      spans[i].classList.add('show');
      lastShown = i;
    }

    /* Move cursor after last revealed char */
    if (spans[lastShown]) {
      spans[lastShown].after(cursor);
    }

    if (lastShown < total - 1) {
      rafId = requestAnimationFrame(animate);
    } else {
      cursor.remove();
      rafId = null;
    }
  }

  /* Short delay before typing starts */
  setTimeout(() => {
    rafId = requestAnimationFrame(animate);
  }, 350);
}

/* ============================================================
   CLOSE
   ============================================================ */
function closeLetter() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

closeBtn.addEventListener('click', closeLetter);

/* Click outside card to close */
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeLetter();
});

/* ============================================================
   NAVIGATION
   ============================================================ */
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % letters.length;
  renderLetter();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + letters.length) % letters.length;
  renderLetter();
});

/* Keyboard navigation */
document.addEventListener('keydown', (e) => {
  if (!overlay.classList.contains('active')) return;
  if (e.key === 'Escape')     closeLetter();
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'ArrowLeft')  prevBtn.click();
});

/* ============================================================
   MUSIC
   ============================================================ */
musicBtn.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {}); /* ignore autoplay policy errors */
    musicBtn.innerHTML = '❚❚';
    musicBtn.classList.add('playing');
  } else {
    bgMusic.pause();
    musicBtn.innerHTML = '♫';
    musicBtn.classList.remove('playing');
  }
});

/* ============================================================
   FLOATING HEARTS
   ============================================================ */
(function spawnHearts() {
  const container  = document.getElementById('hearts');
  const symbols    = ['♥', '♡', '❤'];
  const COUNT      = 26;

  for (let i = 0; i < COUNT; i++) {
    const h = document.createElement('div');
    h.className   = 'heart';
    h.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    h.style.left            = Math.random() * 100 + '%';
    h.style.fontSize        = (9 + Math.random() * 18) + 'px';
    h.style.animationDuration  = (9 + Math.random() * 11) + 's';
    h.style.animationDelay     = (-Math.random() * 14) + 's';

    container.appendChild(h);
  }
})();