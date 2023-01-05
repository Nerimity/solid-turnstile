<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-turnstile&background=tiles&project=%20" alt="solid-turnstile">
</p>

# solid-turnstile

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

SolidJS library for Cloudflare Turnstile.   

Inspired by https://github.com/Le0developer/react-turnstile


## Quick start

Install it:

```bash
npm i solid-turnstile
# or
yarn add solid-turnstile
# or
pnpm add solid-turnstile
```

Use it:

```tsx
import {Turnstile} from "solid-turnstile";

function TurnstileWidget() {
  let ref: TurnstileRef | undefined;

  createEffect(() => {
    ref?.reset() // resets the captcha whenever you need to.
  })

  return (
    <Turnstile
      ref={ref}
      sitekey="1x00000000000000000000AA"
      onVerify={(token) => alert(token)}
    />
  );
}
```

Arguments

| Name               | Type    | Description                                           |
| -----------------  | ------- | ----------------------------------------------------- |
| sitekey            | string  | sitekey of your website                               |
| theme?             | string  | one of "light", "dark", "auto"                        |
| retry?             | string  | one of "auto", "never"                                |
| autoResetOnExpire? | boolean | automatically reset the widget when the token expires |

Callbacks

| Name      | Arguments  | Description                                |
| --------- | ---------  | ------------------------------------------ |
| onVerify   | token     | called when challenge is passed            |
| onLoad?    | widgetId  | called when the widget is loaded           |
| onError?   | error     | called when an error occurs                |
| onExpire?  | -         | called when the token expires              |
| onTimeout? | -         | called when the challenge expires          |
