/**
 * Helper de animación al hacer scroll.
 * Usa IntersectionObserver: cuando un nodo entra en el viewport,
 * le añade la clase `is-visible` para disparar CSS transitions.
 */
export function observeReveal(root: ParentNode, selector = '[data-reveal]') {
  const nodes = root.querySelectorAll<HTMLElement>(selector);
  if (!nodes.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach((node) => node.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
  );

  nodes.forEach((node) => observer.observe(node));
}
