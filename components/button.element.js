import { resolve, tag as html, defineElement } from './utils.js';

const css = resolve('./components/button.element.css');

const template = html`<link rel="stylesheet" href="${css}" />
  <button>
    <slot></slot>
  </button>`;

defineElement('ex-button', template, {
  connected(element) {
    const button = element?.shadowRoot?.querySelector('button');
    button?.addEventListener('click', () => {
      confirm('🐦‍🔥');
    });
  },
});

export { template };
