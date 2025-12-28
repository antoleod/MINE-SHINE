import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { BottomNav } from './BottomNav.js';
import { Panel } from './Panel.js';
import { Config } from '../core/Config.js';

export class UIManager {
    constructor(container, appState, eventBus, app) {
        this.container = container;
        this.appState = appState;
        this.eventBus = eventBus;
        this.app = app;
        this.nav = null;
        this.panel = null;
    }

    init() {
        this.nav = new BottomNav(this.appState, this.eventBus, this.app);
        this.container.addChild(this.nav.container);
        this.panel = new Panel(this.app);
        this.container.addChild(this.panel.container);

        this.eventBus.on('panel:open', (content) => this.panel.open(content));
        this.eventBus.on('panel:close', () => this.panel.close());
    }

    update(time) {
        this.nav.update(time);
        this.panel.update(time);
    }

    resize() {
        this.nav.resize();
        this.panel.resize();
    }
}
