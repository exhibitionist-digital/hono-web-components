import { template } from './button.element.js';
import { raw } from './utils.js';

/**
 * @type {import("hono/jsx").FC}
 */
const Button = (props) => {
  return (
    <>
      <ex-button>
        <template shadowrootmode="open">{raw(template)}</template>
        {props.children}
      </ex-button>
      <script type="module" src="/components/button.element.js"></script>
    </>
  );
};

export default Button;

//demo import React from 'https://esm.sh/react';
//demo import { renderToStaticMarkup } from 'https://esm.sh/react-dom/server';
//demo const string = renderToStaticMarkup(<><Button>Clicks</Button></>);
//demo document.body.innerHTML = string;
