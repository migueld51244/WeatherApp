import "./style.css";
import { initApp } from "./modules/app.js";
import { render } from "./modules/render.js";
import { getState } from "./modules/app.js";

initApp();
render(getState().data);
