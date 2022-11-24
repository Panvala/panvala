export function show(el) {
  toggle(el, true);
}

export function hide(el) {
  toggle(el, false);
}

export function toggle(el, show) {
  el.classList[show ? 'remove' : 'add']('hidden');
}

export function enable(el) {
  attr(el, 'disabled', false);
}

export function disable(el) {
  attr(el, 'disabled', 'disabled');
}

export function visible(el, show) {
  el.style.opacity = show ? 1 : 0;
}

export function attr(el, attribute, val) {
  if (val) {
    el.setAttribute(attribute, val);
  } else {
    el.removeAttribute(attribute);
  }
}
