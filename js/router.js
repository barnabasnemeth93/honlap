const KEY = "topic";

export function getRouteTopicId() {
  const url = new URL(window.location.href);
  return url.searchParams.get(KEY);
}

export function setRouteTopicId(topicId) {
  const url = new URL(window.location.href);
  url.searchParams.set(KEY, topicId);
  history.pushState({}, "", url);
  window.dispatchEvent(new Event("popstate"));
}

export function bindRouting(onChange) {
  window.addEventListener("popstate", onChange);
}
