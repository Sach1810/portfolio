import { importShared } from './__federation_fn_import-BC2C6zjr.js';
import App from './__federation_expose_App-B055tl2I.js';

const {createApp} = await importShared('vue');

const app = createApp(App);
app.mount('#app');
