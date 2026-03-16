// ====== Gépelős effekt ======
(function typingEffect(){
  const el = document.getElementById('typedText');
  if(!el) return;
  const phrases = (el.dataset.phrases || '').split('|').map(s => s.trim()).filter(Boolean);
  let pi = 0, ci = 0, dir = 1;

  function tick(){
    const phrase = phrases[pi] || '';
    ci += dir;
    if(ci <= 0){ dir = 1; pi = (pi + 1) % phrases.length; }
    if(ci >= phrase.length + 2){ dir = -1; }
    el.textContent = phrase.slice(0, Math.max(0, Math.min(ci, phrase.length)));
    const delay = dir > 0 ? 48 : 24; // törlés gyorsabb
    setTimeout(tick, delay + (dir > 0 ? Math.random()*80 : 0));
  }
  tick();
})();

// ====== Hero részecskék (light particle noise) ======
(function heroParticles(){
  const canvas = document.getElementById('heroParticles');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const COUNT = 80;

  function resize(){
    w = canvas.width = canvas.clientWidth;
    h = canvas.height = canvas.clientHeight;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  function reset(p){
    p.x = Math.random()*w;
    p.y = Math.random()*h;
    p.r = Math.random()*1.8 + 0.6;
    p.a = Math.random()*Math.PI*2;
    p.s = Math.random()*0.4 + 0.1;
    p.o = Math.random()*0.35 + 0.1; // opacity
  }

  for(let i=0;i<COUNT;i++){
    const p = {}; reset(p); particles.push(p);
  }

  function draw(){
    ctx.clearRect(0,0,w,h);
    for(const p of particles){
      p.x += Math.cos(p.a)*p.s;
      p.y += Math.sin(p.a)*p.s*0.6;
      p.a += (Math.random()-0.5)*0.05;
      if(p.x<0||p.x>w||p.y<0||p.y>h) reset(p);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(102,187,106,${p.o})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ====== Egyszerű tilt effekt a hero kártyán ======
(function tilt(){
  const el = document.querySelector('.tiltable');
  if(!el) return;
  function onMove(e){
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateX(${(-cy*6).toFixed(2)}deg) rotateY(${(cx*6).toFixed(2)}deg)`;
  }
  function reset(){ el.style.transform = 'rotateX(0) rotateY(0)'; }
  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', reset);
})();

// ====== Újrafelhasználható megerősítő ablak ======
// Használat: DetectiveConfirm.show({ title, message, confirmLabel?, cancelLabel?, form?, onConfirm?, danger? })
(function detectiveConfirm() {
  var modalEl = document.getElementById('detectiveConfirmModal');
  if (!modalEl) return;

  var titleEl = modalEl.querySelector('.detective-confirm__title');
  var bodyEl = modalEl.querySelector('.detective-confirm__body');
  var iconWrap = modalEl.querySelector('.detective-confirm__icon-wrap');
  var cancelBtn = modalEl.querySelector('.detective-confirm__cancel');
  var confirmBtn = modalEl.querySelector('.detective-confirm__confirm');
  var bsModal = null;
  var pendingForm = null;
  var pendingOnConfirm = null;

  function open(options) {
    var title = options.title || 'Megerősítés';
    var message = options.message || '';
    var confirmLabel = options.confirmLabel != null ? options.confirmLabel : 'Rendben';
    var cancelLabel = options.cancelLabel != null ? options.cancelLabel : 'Mégse';
    var danger = !!options.danger;

    modalEl.classList.toggle('detective-confirm--danger', danger);
    titleEl.textContent = title;
    bodyEl.textContent = message;
    confirmBtn.textContent = confirmLabel;
    cancelBtn.textContent = cancelLabel;

    if (iconWrap) {
      iconWrap.innerHTML = danger
        ? '<i class="fa-solid fa-circle-exclamation"></i>'
        : '<i class="fa-solid fa-triangle-exclamation"></i>';
    }

    pendingForm = options.form || null;
    pendingOnConfirm = options.onConfirm || null;

    if (!bsModal) bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static', keyboard: true });
    bsModal.show();
  }

  function onConfirmClick() {
    if (pendingForm && typeof pendingForm.submit === 'function') {
      pendingForm.submit();
    }
    if (typeof pendingOnConfirm === 'function') {
      pendingOnConfirm();
    }
    pendingForm = null;
    pendingOnConfirm = null;
    bsModal.hide();
  }

  confirmBtn.addEventListener('click', onConfirmClick);
  modalEl.addEventListener('hidden.bs.modal', function () {
    pendingForm = null;
    pendingOnConfirm = null;
  });

  window.DetectiveConfirm = { show: open };
})();
