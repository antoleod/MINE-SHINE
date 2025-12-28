import { BottomNav } from './BottomNav.js';
import { Panel } from './Panel.js';

export class UIManager {
    constructor(app, appState, eventBus) {
        this.app = app;
        this.appState = appState;
        this.eventBus = eventBus;
        this.container = new PIXI.Container();
        this.bottomNav = new BottomNav(this.app, this.eventBus);
        this.currentPanel = null;
        this.panels = {};
    }

    init() {
        this.bottomNav.init();
        this.container.addChild(this.bottomNav.container);
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.eventBus.on('showPanel', (panelName) => this.showPanel(panelName));
        this.eventBus.on('hidePanel', () => this.hidePanel());
        this.eventBus.on('setEmotion', (emotion) => {
            this.appState.setEmotion(emotion);
            this.eventBus.emit('emotionChanged', emotion);
        });
    }

    showPanel(panelName) {
        if (this.currentPanel) {
            this.container.removeChild(this.currentPanel.container);
        }
        
        if (!this.panels[panelName]) {
            this.panels[panelName] = new Panel(this.app, panelName, this.eventBus);
        }
        
        this.currentPanel = this.panels[panelName];
        this.container.addChild(this.currentPanel.container);
        this.currentPanel.show();
    }

    hidePanel() {
        if (this.currentPanel) {
            this.currentPanel.hide();
            this.container.removeChild(this.currentPanel.container);
            this.currentPanel = null;
        }
    }

    update(delta) {
        this.bottomNav.update(delta);
        if (this.currentPanel) {
            this.currentPanel.update(delta);
        }
    }

    resize() {
        this.bottomNav.resize();
        if (this.currentPanel) {
            this.currentPanel.resize();
        }
    }
}