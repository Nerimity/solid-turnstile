import Turnstile from "../src";

const App = () => {
  return (
    <div>
      <Turnstile sitekey="1x00000000000000000000AA" onVerify={(token) => alert(token)} />
    </div>
  );
};

export default App;
