<div align="center"> <a href="https://react-hot-toast.com/">
  <img alt="react-toast" width="600px" height="350px" src="https://www.linkpicture.com/q/react-toast.png"/></a> 
</div>
<div align="center">
<a href="https://react-hot-toast.com/">Website</a> 
<span>.</span>
<a href="https://github.com/rohitsoni83/react-toast" target="_blank" >Github</a>
</div>

## Features

- 🔥 **Success, Error, Info, and Warning type Toast**
- 🔩 **Easily To Use**
- ➖ **Progressbar Visibility**
- 🕊 **Lightweight** - _less than 5kb including styles_
- ✅ **Accessible**
- 🤯 **Headless Hooks** - \_Create your own with [`useToaster()`]

## Installation

#### With yarn

```sh
yarn add react-toast
```

#### With NPM

```sh
npm install react-toast
```

## Getting Started

Add the Toaster to your app first. It will take care of rendering all notifications emitted. Now you can trigger `toast()` from anywhere!

```jsx
import toast, { Toaster } from "react-toast";

const showToast = () => toast("I'm a toast.");

const App = () => {
  return (
    <div>
      <button onClick={showToast}>Create a Toast</button>
      <Toaster />
    </div>
  );
};
```
