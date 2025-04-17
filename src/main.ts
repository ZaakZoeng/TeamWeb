import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// 全局样式
import "~/styles/index.scss";

// 引入Fontawesome
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faBars,
  faArrowUpRightFromSquare,
  faTag,
  faEnvelope,
  faUser,
  faLink,
  faPeopleGroup,
  faBook,
  faQuoteLeft,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faGithub,
  faTwitter,
  faLinkedin,
  faFacebook,
  faZhihu,
  faWeixin,
  faQq,
} from "@fortawesome/free-brands-svg-icons";

/* add icons to the library */
library.add(
  faBars,
  faArrowUpRightFromSquare,
  faTag,
  faEnvelope,
  faUser,
  faGoogle,
  faGithub,
  faTwitter,
  faLinkedin,
  faFacebook,
  faZhihu,
  faWeixin,
  faQq,
  faPhone,
  faLink,
  faPeopleGroup,
  faBook,
  faQuoteLeft
);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
