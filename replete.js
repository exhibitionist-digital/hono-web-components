// @ts-nocheck x

import run from 'https://deno.land/x/replete/run.js';
import initSwc, { transformSync } from 'https://esm.sh/@swc/wasm-web';
import ecomcon from 'https://raw.githubusercontent.com/douglascrockford/ecomcon/master/ecomcon.js';

await initSwc();

function compile_jsx(command) {
  return transformSync(ecomcon(command.source, ['demo']), {
    jsc: {
      parser: { syntax: 'ecmascript', jsx: true },
      transform: { react: { runtime: 'classic' } },
    },
  }).code;
}

run({
  deno_args: ['--allow-all', '--config', './deno.json'],
  locate(specifier, parent_locator) {
    return Promise.resolve(
      specifier.startsWith('.')
        ? new URL(specifier, parent_locator).href
        : import.meta.resolve(specifier)
    );
  },
  command(message) {
    if (message.locator !== undefined && message.locator.endsWith('.jsx')) {
      message.source = compile_jsx(message);
    }
    return Promise.resolve(message);
  },
  read(locator) {
    return Deno.readFile(new URL(locator)).then(function (buffer) {
      return locator.endsWith('.jsx')
        ? compile_jsx({ source: new TextDecoder().decode(buffer), locator })
        : buffer;
    });
  },
  mime(locator) {
    if (locator.endsWith('.css')) {
      return 'text/css';
    }
    if (locator.endsWith('.js') || locator.endsWith('.jsx')) {
      return 'text/javascript';
    }
    if (locator.endsWith('.wasm')) {
      return 'application/wasm';
    }
  },
});
