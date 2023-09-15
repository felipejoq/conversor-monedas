import {converterForm} from "./components/html.components.js";
import {triggerConverter} from "./controllers/trigger.controler.js";
import {bootApp} from "./boot.app.js";

converterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    triggerConverter();
});

// Booting app
bootApp();
