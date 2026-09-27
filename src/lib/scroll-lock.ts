// Ref-counted body scroll lock so independent overlays (mobile menu, modals, etc.)
// can each request a lock without one's cleanup releasing another's.
let lockCount = 0;

export function lockScroll() {
  lockCount += 1;
  document.body.style.overflow = 'hidden';
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = '';
  }
}
