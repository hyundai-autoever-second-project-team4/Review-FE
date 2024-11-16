export const smoothScrollTo = (targetY, duration) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  const animateScroll = (currentTime) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // 0에서 1까지의 비율

    // easeInOutQuad easing function
    const easing = (t) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    window.scrollTo(0, startY + distance * easing(progress));

    if (progress < 1) {
      requestAnimationFrame(animateScroll); // 애니메이션 계속 진행
    }
  };

  requestAnimationFrame(animateScroll); // 애니메이션 시작
};
