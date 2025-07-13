import { importShared } from './__federation_fn_import-BC2C6zjr.js';

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const {createElementVNode:_createElementVNode,createStaticVNode:_createStaticVNode,openBlock:_openBlock,createElementBlock:_createElementBlock} = await importShared('vue');


const _hoisted_1 = { class: "job-search-app" };


const _sfc_main = {
  __name: 'App',
  setup(__props) {

// Vue 3 Composition API with vanilla JavaScript

return (_ctx, _cache) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, _cache[0] || (_cache[0] = [
    _createStaticVNode("<div class=\"app-header\" data-v-bc98cdd0><h2 data-v-bc98cdd0>SACHA Job Search Application</h2><p data-v-bc98cdd0>This is a job search app that can be dynamically loaded by the host application</p></div><div class=\"content\" data-v-bc98cdd0><div class=\"feature-card\" data-v-bc98cdd0><h3 data-v-bc98cdd0>Job Search Features</h3><ul data-v-bc98cdd0><li data-v-bc98cdd0>Built with Vue 3 Composition API</li><li data-v-bc98cdd0>JavaScript support</li><li data-v-bc98cdd0>Vite for fast development</li><li data-v-bc98cdd0>Module Federation ready</li></ul></div><div class=\"feature-card\" data-v-bc98cdd0><h3 data-v-bc98cdd0>Integration</h3><p data-v-bc98cdd0>This job search app is designed to be seamlessly integrated into the main host application through Module Federation.</p></div></div>", 2)
  ])))
}
}

};
const App = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-bc98cdd0"]]);

export { App as default };
