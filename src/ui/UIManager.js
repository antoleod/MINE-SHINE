import { BottomNav } from './BottomNav.js';
import { Panel } from './Panel.js';

export class UIManager {
    constructor(scene, appState, eventBus) {
        this.scene = scene;
        this.appState = appState;
        this.eventBus = eventBus;
        this.container = document.createElement('div');
        this.container.id = 'ui-container';
        this.container.style.position = 'absolute';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        this.container.style.pointerEvents = 'none';
        document.body.appendChild(this.container);

        this.bottomNav = new BottomNav(this.container, this.eventBus);
        this.currentPanel = null;
        this.panels = {};
    }

    init() {
        this.bottomNav.init();
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
            this.panels[panelName] = new Panel(this.container, panelName, this.eventBus);
        }

        this.currentPanel = this.panels[panelName];
        this.container.appendChild(this.currentPanel.container);
        this.currentPanel.show();
    }

    hidePanel() {
        if (this.currentPanel) {
            this.currentPanel.hide();
            this.container.removeChild(this.currentPanel.container);
            this.currentPanel = null;
        }
    }

    update() {
        this.bottomNav.update();
        if (this.currentPanel) {
            this.currentPanel.update();
        }
    }

    resize() {
        this.bottomNav.resize();
        if (this.currentPanel) {
            this.currentPanel.resize();
        }
    }
}