import { importShared } from './__federation_fn_import-DQ2SQihe.js';
import { r as reactExports } from './index-Dm_EQZZA.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

const Home = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "home-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Welcome to React Microfrontend" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This is the Home page of the React app with internal routing" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "features", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "React Features" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Built with React 18" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "TypeScript support" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Internal routing with React Router" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Module Federation ready" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Navigation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Use the navigation above to switch between Home and About pages within this React app." })
      ] })
    ] })
  ] });
};

const About = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "about-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "About React Microfrontend" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This is the About page of the React app" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "About This App" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This React microfrontend is designed to be dynamically loaded by the main Vue host application. It demonstrates internal routing capabilities while being part of a larger microfrontend architecture." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Technical Stack" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "React 18 with TypeScript" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "React Router for internal navigation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Vite for fast development and building" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Module Federation for microfrontend integration" })
        ] })
      ] })
    ] })
  ] });
};

const {Routes,Route,Link} = await importShared('react-router-dom');
const App = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "react-app", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "navbar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nav-brand", children: "React Microfrontend" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "nav-links", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "nav-link", children: "Home" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "nav-link", children: "About" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "main-content", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Home, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/about", element: /* @__PURE__ */ jsxRuntimeExports.jsx(About, {}) })
    ] }) })
  ] });
};

export { App as default, jsxRuntimeExports as j };
