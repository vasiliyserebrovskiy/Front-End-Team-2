export function animateFlyToCart(
  img: HTMLImageElement,
  cartIcon: HTMLElement
) {
  if (!img.complete || img.naturalWidth === 0) {
    console.warn("Картинка не загружена");
    return;
  }

  const imgRect = img.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  const clone = img.cloneNode(true) as HTMLImageElement;

  clone.style.position = "fixed";
  clone.style.top = imgRect.top + "px";
  clone.style.left = imgRect.left + "px";
  clone.style.width = imgRect.width + "px";
  clone.style.height = imgRect.height + "px";
  clone.style.zIndex = "1000";
  clone.style.transition = "all 0.8s ease-in-out";

  // 👇 Добавляем Tailwind-классы
  clone.classList.add("rounded-full", "overflow-hidden", "border-4", "border-white", "shadow-xl");

  document.body.appendChild(clone);

  requestAnimationFrame(() => {
    clone.style.top = cartRect.top + "px";
    clone.style.left = cartRect.left + "px";
    clone.style.width = "30px";
    clone.style.height = "30px";
    clone.style.opacity = "0.5";
  });

  setTimeout(() => {
    clone.remove();
  }, 800);
}
