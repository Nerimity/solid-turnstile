import { JSX, onMount } from "solid-js";

interface RenderOpts {
  sitekey: string;
  callback: (token: string) => void;
  "error-callback": () => void;
  "expired-callback": () => void;
  "timeout-callback": () => void;
  theme: any;
  size: any;
  retry: any;
}
interface TurnstileFunc {
  getResponse: any;
  implicitRender: any;
  ready: any;
  remove: any;
  render: (element: string | HTMLDivElement, options: RenderOpts) => string;
  reset: any;
}

interface Props extends TurnstileCallbacks {
  class?: string;
  style?: JSX.CSSProperties;
  sitekey: string;
  retry?: "auto" | "never";
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "invisible" | "compact";
  autoResetOnExpire?: boolean;
}
interface TurnstileCallbacks {
  onVerify: (token: string) => void;
  onLoad?: (widgetId: string) => void;
  onError?: (error?: Error | any) => void;
  onExpire?: () => void;
  onTimeout?: () => void;
}

export function Turnstile(props: Props) {
  const turnstile = () => (window as any).turnstile as TurnstileFunc;
  let element: HTMLDivElement | undefined;

  onMount(() => {
    if (document.getElementById("turnstileScript")) return ready();
    const scriptEl = document.createElement("script");
    scriptEl.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
    scriptEl.id = "turnstileScript";
    document.body.appendChild(scriptEl);

    (window as any).onloadTurnstileCallback = ready;
  });

  const ready = () => {
    const id = turnstile().render(element!, {
      sitekey: props.sitekey,
      theme: props.theme,
      size: props.size,
      callback(token) {
        props.onVerify(token);
      },
      "error-callback": () => props.onError?.(),
      "expired-callback": () => {
        props.onExpire?.();
        if (props.autoResetOnExpire) turnstile().reset(id);
      },
      "timeout-callback": () => props.onTimeout?.(),
      retry: props.retry,
    });
    props.onLoad?.(id);
  };

  return <div class={props.class} style={props.style} ref={element}></div>;
}
