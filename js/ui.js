function el(id) {
  return document.getElementById(id);
}

export function renderTopicList(topics, activeId, onSelect) {
  const list = el("topicList");
  const count = el("topicCount");
  count.textContent = `${topics.length} db`;
  const groupRank = (g) => (g === "SzA" ? 0 : g === "BDÜI" ? 1 : 2);

const sorted = [...topics].sort((a, b) => {
  const gr = groupRank(a.group) - groupRank(b.group);
  if (gr !== 0) return gr;

  const ao = Number.isFinite(a.order) ? a.order : 9999;
  const bo = Number.isFinite(b.order) ? b.order : 9999;
  if (ao !== bo) return ao - bo;

  return (a.code || "").localeCompare(b.code || "", "hu");
});


  list.innerHTML = "";
for (const t of sorted)  {
    const btn = document.createElement("button");
    btn.className = `topic-item ${t.id === activeId ? "active" : ""}`;
    btn.type = "button";
    btn.innerHTML = `
      <div class="topic-code">${t.code}</div>
      <div class="topic-desc">${t.title}</div>
    `;
    btn.addEventListener("click", () => onSelect(t.id));
    list.appendChild(btn);
  }
  
}

export function wireSearch(allTopics, onFiltered) {
  const input = el("searchInput");
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) return onFiltered(allTopics);

    const filtered = allTopics.filter(t => {
      const hay = `${t.code} ${t.title} ${(t.tags ?? []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
    onFiltered(filtered);
  });
}

export function renderTopicView({ meta, topic, quiz }) {
  el("emptyState").classList.add("hidden");
  el("topicView").classList.remove("hidden");

  el("topicTitle").textContent = `${meta.code} – ${topic.title}`;
  el("topicMeta").textContent = (meta.tags ?? []).join(" • ");
  el("topicHtml").innerHTML = topic.html;

  // Gombok a tétel fejlécében
const startBtn = el("startQuizBtn");

// Ha nincs kvíz: gomb tiltva + szöveg
if (!quiz) {
  startBtn.disabled = true;
  startBtn.textContent = "Kvíz (hamarosan)";
  startBtn.title = "Ehhez a tételhez még nincs kvíz.";
} else {
  startBtn.disabled = false;
  startBtn.textContent = "Kvíz indítása";
  startBtn.title = "";
}
  // Modal elemek
  const modal = el("quizModal");
  const modalClose = el("quizModalClose");
  const modalReset = el("quizModalReset");
  const modalSub = el("quizModalSub");
  const quizArea = el("quizArea");
  const progress = el("quizProgress");

  modalSub.textContent = `${meta.code} • ${quiz.questions.length} kérdés`;

  let lastFocusEl = null;
  let score = 0;

  function openModal() {
    modal.querySelector(".modal-body").scrollTop = 0;

    lastFocusEl = document.activeElement;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // ne scrollozzon a háttér
    modalClose.focus();
    renderQuiz();
  }

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
    if (lastFocusEl && typeof lastFocusEl.focus === "function") lastFocusEl.focus();
  }

  function renderQuiz() {
    quizArea.innerHTML = "";
    score = 0;
    progress.textContent = `Eredmény: 0 / ${quiz.questions.length}`;

    quiz.questions.forEach((q, idx) => {
      const box = document.createElement("div");
      box.className = "q";
      box.innerHTML = `
        <div class="badge">Kérdés ${idx + 1} / ${quiz.questions.length}</div>
        <h3>${escapeHtml(q.prompt)}</h3>
        <div class="opts"></div>
        <div class="result hidden"></div>
      `;
      const opts = box.querySelector(".opts");
      const result = box.querySelector(".result");

      q.options.forEach((opt, i) => {
        const label = document.createElement("label");
        label.innerHTML = `
          <input type="radio" name="${q.id}" value="${i}" />
          <div>${escapeHtml(opt)}</div>
        `;
        label.querySelector("input").addEventListener("change", (e) => {
          const chosen = Number(e.target.value);
          const ok = chosen === q.answerIndex;

          // csak első válasz számít
          if (!result.classList.contains("hidden")) return;

          result.classList.remove("hidden");
          result.classList.add(ok ? "good" : "bad");
          result.innerHTML = `
            <b>${ok ? "Helyes" : "Nem jó"}</b>
            <div class="muted">${escapeHtml(q.explanation ?? "")}</div>
          `;

          if (ok) score += 1;
          progress.textContent = `Eredmény: ${score} / ${quiz.questions.length}`;
        });

        opts.appendChild(label);
      });

      quizArea.appendChild(box);
    });
  }

  // események
startBtn.onclick = quiz ? openModal : null;
  modalClose.onclick = closeModal;
  modalReset.onclick = renderQuiz;

  // háttér kattintás zár
  modal.addEventListener("click", (e) => {
    const target = e.target;
    if (target?.dataset?.close === "true") closeModal();
  });

  // ESC zár
  window.onkeydown = (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  };
}


function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
