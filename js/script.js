const NOTE_URL = "https://note.com/rennai_gokui/n/n7876fb9a4fa9";

const noteLinks = document.querySelectorAll(".js-note-link");
const storySection = document.querySelector("#story");
const stickyCta = document.querySelector(".sticky-cta");
const stickyClose = document.querySelector(".sticky-cta__close");
const revealElements = document.querySelectorAll(".reveal");

noteLinks.forEach((link) => {
  link.href = NOTE_URL;

  if (NOTE_URL === "#") {
    link.addEventListener("click", (event) => event.preventDefault());
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

let stickyDismissed = false;

const updateStickyCta = () => {
  if (!storySection || !stickyCta || stickyDismissed) return;

  const hasPassedStory = storySection.getBoundingClientRect().bottom <= 0;
  stickyCta.classList.toggle("is-visible", hasPassedStory);
  stickyCta.setAttribute("aria-hidden", String(!hasPassedStory));
};

stickyClose?.addEventListener("click", () => {
  stickyDismissed = true;
  stickyCta.classList.remove("is-visible");
  stickyCta.setAttribute("aria-hidden", "true");
});

window.addEventListener("scroll", updateStickyCta, { passive: true });
window.addEventListener("resize", updateStickyCta);
updateStickyCta();

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px 10% 0px", threshold: 0.01 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
