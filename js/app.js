import { TOPICS } from "./topics/index.js";
import { bindRouting, getRouteTopicId, setRouteTopicId } from "./router.js";
import { renderTopicList, renderTopicView, wireSearch } from "./ui.js";
import { applyInitialTheme, bindThemeUI } from "./theme.js";

const state = {
  topics: TOPICS,
  activeTopicId: null,
};

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
}


function init() {
  applyInitialTheme();   // alap világos, ha nincs mentett
  bindThemeUI();         // gomb események
  renderTopicList(state.topics, state.activeTopicId, setRouteTopicId);
  wireSearch(state.topics, (filtered) => renderTopicList(filtered, state.activeTopicId, setRouteTopicId));

  bindRouting(async () => {
    const id = getRouteTopicId();
    if (id) await loadAndShowTopic(id);
  });

  const initial = getRouteTopicId();
  if (initial) loadAndShowTopic(initial);

  // kattintás a listán (delegálva a ui.js-ből route-ot állít)
}

init();
