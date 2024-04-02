/**
 * @param {string} a
 * @param {any} s
 */
const raw = (a, s) => {
  const c = new String(a);
  // @ts-ignore html escaped string
  return (c.isEscaped = !0), (c.callbacks = s), c;
};

/**
 * @param {string} url
 * @returns {URL}
 */
const resolve = (url) => new URL(url, 'http://localhost:8000');

const tag = String.raw;

/**
 * @param {string} name
 * @param {string} template
 * @param {{ connected?: (element: HTMLElement) => void, disconnected?: (element: HTMLElement) => void }} callbacks
 */
function defineElement(name, template, callbacks) {
  if (typeof document === 'undefined') return;
  const newElement = class extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = template;
    }
    connectedCallback() {
      if (callbacks.connected) {
        callbacks.connected(this);
      }
    }
    disconnectedCallback() {
      if (callbacks.disconnected) {
        callbacks.disconnected(this);
      }
    }
  };
  if (!customElements.get(name)) {
    customElements.define(name, newElement);
  }
  return newElement;
}

export { raw, resolve, tag, defineElement };
