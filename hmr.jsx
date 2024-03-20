export function LiveReloadScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          const source = new EventSource('/hmr');
          source.onopen = () => {
            console.log('HMR connected');
          };
          source.onmessage = (event) => {
            if (event.data === 'hmr') {
              console.log('HMR reloading');
              location.reload();
            }
          }`,
      }}
    />
  );
}

export function hmrMiddleware() {
  return () => {
    /**
     * @type {EventListener}
     */
    let eventListener;

    /**
     * @param {string} data
     * @returns
     */
    function encode(data) {
      return new TextEncoder().encode(data);
    }

    const body = new ReadableStream({
      start(controller) {
        addEventListener(
          'hmr',
          (eventListener = () => {
            controller.enqueue(encode('data: hmr\n\n'));
          })
        );
      },
      cancel() {
        removeEventListener('hmr', eventListener);
      },
    });

    return new Response(body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  };
}
