import { createApp, defineAsyncComponent } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import BaseCard from './components/ui/BaseCard';
import BaseBUtton from './components/ui/BaseButton';
import BaseBadge from './components/ui/BaseBadge';
import BaseSpinner from './components/ui/BaseSpinner';
const BaseDialog = defineAsyncComponent(() => import('./components/ui/BaseDialog'));

const app = createApp(App);

app.use(store);
app.use(router);

app.component('base-card', BaseCard);
app.component('base-button', BaseBUtton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
