import { TOPICS } from "./topics/index.js";
import { bindRouting, getRouteTopicId, setRouteTopicId } from "./router.js";
import { renderTopicList, renderTopicView, wireSearch } from "./ui.js";
import { applyInitialTheme, bindThemeUI } from "./theme.js";

const state = {
  topics: TOPICS,
  activeTopicId: null,

  // summary-hoz
  currentSummaryLoader: null,
};

// Summary UI elemek (index.html-ben már legyenek!)
const openSummaryBtn = document.getElementById("openSummaryBtn");
const summaryModal = document.getElementById("summaryModal");
const summaryHtml = document.getElementById("summaryHtml");
const summaryModalTitle = document.getElementById("summaryModalTitle");
const summaryModalSub = document.getElementById("summaryModalSub");
const summaryModalClose = document.getElementById("summaryModalClose");
const summaryBackdrop = document.querySelector("#summaryModal .modal-backdrop");


function getTopicMeta(id) {
  return state.topics.find(t => t.id === id) ?? null;
}

async function loadAndShowTopic(id) {
  const meta = getTopicMeta(id);
  if (!meta) return;

  state.activeTopicId = id;

  // Tétel mindig kell
  const topicMod = await meta.topicModule();
  const topic = topicMod.topic;

  // Kvíz csak akkor, ha van betöltő függvény
  let quiz = null;
  if (typeof meta.quizModule === "function") {
    const quizMod = await meta.quizModule();
    quiz = quizMod.quiz ?? null;
  }

  renderTopicList(state.topics, state.activeTopicId, setRouteTopicId);
  renderTopicView({ meta, topic, quiz });

  // ✅ EZ KELL IDE: a tétel meta alapján beállítjuk a summary gombot / loadert
  setSummaryAvailability(meta);
}



function init() {
  applyInitialTheme();
  bindThemeUI();

  renderTopicList(state.topics, state.activeTopicId, setRouteTopicId);
  wireSearch(state.topics, (filtered) =>
    renderTopicList(filtered, state.activeTopicId, setRouteTopicId)
  );

  // ✅ Summary gomb + modal eventek (csak egyszer!)
  if (openSummaryBtn) {
    openSummaryBtn.addEventListener("click", async () => {
      const loader = state.currentSummaryLoader;
      if (!loader) return;

      const mod = await loader();
      const { summary } = mod;

      if (summaryModalTitle) summaryModalTitle.textContent = summary.title ?? "Összefoglaló";
      if (summaryModalSub) summaryModalSub.textContent = `${summary.topicId}`;
      if (summaryHtml) summaryHtml.innerHTML = summary.html ?? "";

      openSummaryModal();
    });
  }

  if (summaryModalClose) summaryModalClose.addEventListener("click", closeSummaryModal);
  if (summaryBackdrop) summaryBackdrop.addEventListener("click", closeSummaryModal);

  // routing
  bindRouting(async () => {
    const id = getRouteTopicId();
    if (id) await loadAndShowTopic(id);
  });

  const initial = getRouteTopicId();
  if (initial) loadAndShowTopic(initial);
}

init();


function setSummaryAvailability(topicMeta) {
  state.currentSummaryLoader = topicMeta.summaryModule ?? null;

  // ha a gomb még nincs az index.html-ben, akkor nincs mit állítani
  if (!openSummaryBtn) return;

  if (state.currentSummaryLoader) {
    openSummaryBtn.classList.remove("hidden");
  } else {
    openSummaryBtn.classList.add("hidden");
  }
}

function openSummaryModal() {
  if (!summaryModal) return;
  summaryModal.classList.remove("hidden");
}

function closeSummaryModal() {
  if (!summaryModal) return;
  summaryModal.classList.add("hidden");
}


init();
