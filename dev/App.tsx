import { createEffect, createSignal, onMount } from "solid-js";
import { Turnstile, TurnstileRef } from "../src";

const App = () => {
  let ref: TurnstileRef | undefined;

  createEffect(() => {
    ref?.reset() // resets the captcha whenever you need to.
  })
  
  return (
    <div>
      <Turnstile ref={ref} sitekey="1x00000000000000000000AA" onVerify={(token) => alert(token)} />
    </div>
  );
};

export default App;
