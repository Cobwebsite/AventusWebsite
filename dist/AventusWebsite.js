Object.defineProperty(window, "AvInstance", {
	get() {return Aventus.Instance;}
})
var Aventus;
(Aventus||(Aventus = {}));
(function (Aventus) {
const moduleName = `Aventus`;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class WebComponentInstance {
    static __allDefinitions = [];
    static __allInstances = [];
    /**
     * Last definition insert datetime
     */
    static lastDefinition = 0;
    static registerDefinition(def) {
        WebComponentInstance.lastDefinition = Date.now();
        WebComponentInstance.__allDefinitions.push(def);
    }
    /**
     * Get all sub classes of type
     */
    static getAllClassesOf(type) {
        let result = [];
        for (let def of WebComponentInstance.__allDefinitions) {
            if (def.prototype instanceof type) {
                result.push(def);
            }
        }
        return result;
    }
    /**
     * Get all registered definitions
     */
    static getAllDefinitions() {
        return WebComponentInstance.__allDefinitions;
    }
    static addInstance(instance) {
        this.__allInstances.push(instance);
    }
    static removeInstance(instance) {
        let index = this.__allInstances.indexOf(instance);
        if (index > -1) {
            this.__allInstances.splice(index, 1);
        }
    }
    static getAllInstances(type) {
        let result = [];
        for (let instance of this.__allInstances) {
            if (instance instanceof type) {
                result.push(instance);
            }
        }
        return result;
    }
}

class ElementExtension {
    /**
     * Find a parent by tagname if exist Static.findParentByTag(this, "av-img")
     */
    static findParentByTag(element, tagname, untilNode) {
        let el = element;
        if (Array.isArray(tagname)) {
            for (let i = 0; i < tagname.length; i++) {
                tagname[i] = tagname[i].toLowerCase();
            }
        }
        else {
            tagname = [tagname.toLowerCase()];
        }
        let checkFunc = (el) => {
            return tagname.indexOf((el.nodeName || el.tagName).toLowerCase()) != -1;
        };
        if (el) {
            if (el instanceof ShadowRoot) {
                el = el.host;
            }
            else {
                el = el.parentNode;
            }
        }
        while (el) {
            if (checkFunc(el)) {
                return el;
            }
            if (el instanceof ShadowRoot) {
                el = el.host;
            }
            else {
                el = el.parentNode;
            }
            if (el == untilNode) {
                break;
            }
        }
        return null;
    }
    /**
     * Find a parent by class name if exist Static.findParentByClass(this, "my-class-img") = querySelector('.my-class-img')
     */
    static findParentByClass(element, classname, untilNode) {
        let el = element;
        if (!Array.isArray(classname)) {
            classname = [classname];
        }
        if (el) {
            if (el instanceof ShadowRoot) {
                el = el.host;
            }
            else {
                el = el.parentNode;
            }
        }
        while (el) {
            for (let classnameTemp of classname) {
                if (el['classList'] && el['classList'].contains(classnameTemp)) {
                    return el;
                }
            }
            if (el instanceof ShadowRoot) {
                el = el.host;
            }
            else {
                el = el.parentNode;
            }
            if (el == untilNode) {
                break;
            }
        }
        return null;
    }
    /**
     * Find a parent by type if exist Static.findParentyType(this, Aventus.Img)
     */
    static findParentByType(element, type, untilNode) {
        let el = element;
        let checkFunc = (el) => {
            return false;
        };
        if (typeof type == "function" && type['prototype']['constructor']) {
            checkFunc = (el) => {
                if (el instanceof type) {
                    return true;
                }
                return false;
            };
        }
        else {
            console.error("you must provide a class inside this function");
            return null;
        }
        if (el) {
            if (el instanceof ShadowRoot) {
                el = el.host;
            }
            else {
                el = el.parentNode;
            }
        }
        while (el) {
            if (checkFunc(el)) {
                return el;
            }
            if (el instanceof ShadowRoot) {
                el = el.host;
            }
            else {
                el = el.parentNode;
            }
            if (el == untilNode) {
                break;
            }
        }
        return null;
    }
    /**
     * Find list of parents by tagname
     */
    static findParents(element, tagname, untilNode) {
        let el = element;
        if (Array.isArray(tagname)) {
            for (let i = 0; i < tagname.length; i++) {
                tagname[i] = tagname[i].toLowerCase();
            }
        }
        else {
            tagname = [tagname.toLowerCase()];
        }
        let result = [];
        if (el) {
            if (el instanceof ShadowRoot) {
                el = el.host;
            }
            else {
                el = el.parentNode;
            }
        }
        while (el) {
            if (tagname.indexOf((el.nodeName || el['tagName']).toLowerCase()) != -1) {
                result.push(el);
            }
            if (el instanceof ShadowRoot) {
                el = el.host;
            }
            else {
                el = el.parentNode;
            }
            if (el == untilNode) {
                break;
            }
        }
        return result;
    }
    /**
     * Check if element contains a child
     */
    static containsChild(element, child) {
        var rootScope = element.getRootNode();
        var elScope = child.getRootNode();
        while (elScope != rootScope) {
            if (!elScope['host']) {
                return false;
            }
            child = elScope['host'];
            elScope = elScope['host'].getRootNode();
        }
        return element.contains(child);
    }
    /**
     * Get element inside slot
     */
    static getElementsInSlot(element, slotName = null) {
        if (element.shadowRoot) {
            let slotEl;
            if (slotName) {
                slotEl = element.shadowRoot.querySelector('slot[name="' + slotName + '"]');
            }
            else {
                slotEl = element.shadowRoot.querySelector("slot");
            }
            while (true) {
                if (!slotEl) {
                    return [];
                }
                var listChild = Array.from(slotEl.assignedElements());
                if (!listChild) {
                    return [];
                }
                let slotFound = false;
                for (let i = 0; i < listChild.length; i++) {
                    if (listChild[i].nodeName == "SLOT") {
                        slotEl = listChild[i];
                        slotFound = true;
                        break;
                    }
                }
                if (!slotFound) {
                    return listChild;
                }
            }
        }
        return [];
    }
    /**
     * Get deeper element inside dom at the position X and Y
     */
    static getElementAtPosition(x, y, startFrom = null) {
        var _realTarget = (el, i = 0) => {
            if (i == 50) {
                debugger;
            }
            if (el.shadowRoot && x !== undefined && y !== undefined) {
                var newEl = el.shadowRoot.elementFromPoint(x, y);
                if (newEl && newEl != el) {
                    return _realTarget(newEl, i + 1);
                }
            }
            return el;
        };
        if (startFrom == null) {
            startFrom = document.body;
        }
        return _realTarget(startFrom);
    }
}

class Instance {
    static elements = new Map();
    static get(type) {
        let result = this.elements.get(type);
        if (!result) {
            let cst = type.prototype['constructor'];
            result = new cst();
            this.elements.set(type, result);
        }
        return result;
    }
    static set(el) {
        let cst = el.constructor;
        if (this.elements.get(cst)) {
            return false;
        }
        this.elements.set(cst, el);
        return true;
    }
    static destroy(el) {
        let cst = el.constructor;
        return this.elements.delete(cst);
    }
}

class Style {
    static instance;
    static defaultStyleSheets = {
        "@general": `:host{display:inline-block;box-sizing:border-box}:host *{box-sizing:border-box}`
    };
    static store(name, content) {
        this.getInstance().store(name, content);
    }
    static get(name) {
        return this.getInstance().get(name);
    }
    static load(name, url) {
        return this.getInstance().load(name, url);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Style();
        }
        return this.instance;
    }
    constructor() {
        for (let name in Style.defaultStyleSheets) {
            this.store(name, Style.defaultStyleSheets[name]);
        }
    }
    stylesheets = new Map();
    async load(name, url) {
        try {
            if (!this.stylesheets.has(name) || this.stylesheets.get(name).cssRules.length == 0) {
                let txt = await (await fetch(url)).text();
                this.store(name, txt);
            }
        }
        catch (e) {
        }
    }
    store(name, content) {
        if (!this.stylesheets.has(name)) {
            const sheet = new CSSStyleSheet();
            sheet.replaceSync(content);
            this.stylesheets.set(name, sheet);
        }
        else {
            this.stylesheets.get(name).replaceSync(content);
        }
    }
    get(name) {
        if (!this.stylesheets.has(name)) {
            this.store(name, "");
        }
        return this.stylesheets.get(name);
    }
}

class WebComponent extends HTMLElement {
    /**
     * Add attributes informations
     */
    static get observedAttributes() {
        return [];
    }
    _first;
    _isReady;
    /**
     * Determine if the component is ready (postCreation done)
     */
    get isReady() {
        return this._isReady;
    }
    /**
     * The current namespace
     */
    static get Namespace() { return ""; }
    /**
     * Get the unique type for the data. Define it as the namespace + class name
     */
    static get Fullname() { return this.Namespace + "." + this.name; }
    /**
     * The current namespace
     */
    get namespace() {
        return this.constructor['Namespace'];
    }
    /**
     * Get the name of the component class
     */
    getClassName() {
        return this.constructor.name;
    }
    /**
    * Get the unique type for the data. Define it as the namespace + class name
    */
    get $type() {
        return this.constructor['Fullname'];
    }
    __onChangeFct = {};
    __watch;
    __watchActions = {};
    __watchActionsCb = {};
    __pressManagers = [];
    __isDefaultState = true;
    __defaultActiveState = new Map();
    __defaultInactiveState = new Map();
    __statesList = {};
    constructor() {
        super();
        if (this.constructor == WebComponent) {
            throw "can't instanciate an abstract class";
        }
        this._first = true;
        this._isReady = false;
        this.__renderTemplate();
        this.__registerWatchesActions();
        this.__registerPropertiesActions();
        this.__createStates();
        this.__subscribeState();
    }
    /**
     * Remove all listeners
     * State + press
     */
    destructor() {
        WebComponentInstance.removeInstance(this);
        this.__unsubscribeState();
        for (let press of this.__pressManagers) {
            press.destroy();
        }
        // TODO add missing info for destructor();
    }
    __addWatchesActions(name, fct) {
        if (!this.__watchActions[name]) {
            this.__watchActions[name] = [];
            this.__watchActionsCb[name] = (action, path, value) => {
                for (let fct of this.__watchActions[name]) {
                    fct(this, action, path, value);
                }
                if (this.__onChangeFct[name]) {
                    for (let fct of this.__onChangeFct[name]) {
                        fct(path);
                    }
                }
            };
        }
        if (fct) {
            this.__watchActions[name].push(fct);
        }
    }
    __registerWatchesActions() {
        if (Object.keys(this.__watchActions).length > 0) {
            if (!this.__watch) {
                this.__watch = Watcher.get({}, (type, path, element) => {
                    let action = this.__watchActionsCb[path.split(".")[0]] || this.__watchActionsCb[path.split("[")[0]];
                    action(type, path, element);
                });
            }
        }
    }
    __addPropertyActions(name, fct) {
        if (!this.__onChangeFct[name]) {
            this.__onChangeFct[name] = [];
        }
        if (fct) {
            this.__onChangeFct[name].push(() => {
                fct(this);
            });
        }
    }
    __registerPropertiesActions() { }
    static __style = ``;
    static __template;
    __templateInstance;
    styleBefore() {
        return ["@general"];
    }
    styleAfter() {
        return [];
    }
    __getStyle() {
        return [WebComponent.__style];
    }
    __getHtml() { }
    __getStatic() {
        return WebComponent;
    }
    static __styleSheets = {};
    __renderStyles() {
        let sheets = {};
        let befores = this.styleBefore();
        for (let before of befores) {
            let sheet = Style.get(before);
            if (sheet) {
                sheets[before] = sheet;
            }
        }
        let localStyle = new CSSStyleSheet();
        let styleTxt = this.__getStyle().join("\r\n");
        if (styleTxt.length > 0) {
            localStyle.replace(styleTxt);
            sheets['@local'] = localStyle;
        }
        let afters = this.styleAfter();
        for (let after of afters) {
            let sheet = Style.get(after);
            if (sheet) {
                sheets[after] = sheet;
            }
        }
        return sheets;
    }
    __renderTemplate() {
        let staticInstance = this.__getStatic();
        if (!staticInstance.__template) {
            staticInstance.__template = new WebComponentTemplate();
            this.__getHtml();
            this.__registerTemplateAction();
            staticInstance.__template.generateTemplate();
            staticInstance.__styleSheets = this.__renderStyles();
        }
        this.__templateInstance = staticInstance.__template.createInstance(this);
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.adoptedStyleSheets = Object.values(staticInstance.__styleSheets);
        this.shadowRoot.appendChild(this.__templateInstance.content);
        customElements.upgrade(this.shadowRoot);
    }
    __registerTemplateAction() {
    }
    connectedCallback() {
        if (this._first) {
            WebComponentInstance.addInstance(this);
            this._first = false;
            this.__defaultValues();
            this.__upgradeAttributes();
            this.__templateInstance.render();
            setTimeout(() => {
                this.postCreation();
                this._isReady = true;
                this.dispatchEvent(new CustomEvent('postCreationDone'));
            });
        }
    }
    __defaultValues() { }
    __upgradeAttributes() { }
    __listBoolProps() {
        return [];
    }
    __upgradeProperty(prop) {
        let boolProps = this.__listBoolProps();
        if (boolProps.indexOf(prop) != -1) {
            if (this.hasAttribute(prop) && (this.getAttribute(prop) === "true" || this.getAttribute(prop) === "")) {
                let value = this.getAttribute(prop);
                delete this[prop];
                this[prop] = value;
            }
            else {
                this.removeAttribute(prop);
                this[prop] = false;
            }
        }
        else {
            if (this.hasAttribute(prop)) {
                let value = this.getAttribute(prop);
                delete this[prop];
                this[prop] = value;
            }
        }
    }
    __getStateManager(managerClass) {
        let mClass;
        if (managerClass instanceof StateManager) {
            mClass = managerClass;
        }
        else {
            mClass = Instance.get(managerClass);
        }
        return mClass;
    }
    __addActiveDefState(managerClass, cb) {
        let mClass = this.__getStateManager(managerClass);
        if (!this.__defaultActiveState.has(mClass)) {
            this.__defaultActiveState.set(mClass, []);
        }
        this.__defaultActiveState.get(mClass).push(cb);
    }
    __addInactiveDefState(managerClass, cb) {
        let mClass = this.__getStateManager(managerClass);
        if (!this.__defaultInactiveState.has(mClass)) {
            this.__defaultInactiveState.set(mClass, []);
        }
        this.__defaultInactiveState.get(mClass).push(cb);
    }
    __addActiveState(statePattern, managerClass, cb) {
        let mClass = this.__getStateManager(managerClass);
        this.__statesList[statePattern].get(mClass).active.push(cb);
    }
    __addInactiveState(statePattern, managerClass, cb) {
        let mClass = this.__getStateManager(managerClass);
        this.__statesList[statePattern].get(mClass).inactive.push(cb);
    }
    __addAskChangeState(statePattern, managerClass, cb) {
        let mClass = this.__getStateManager(managerClass);
        this.__statesList[statePattern].get(mClass).askChange.push(cb);
    }
    __createStates() { }
    __createStatesList(statePattern, managerClass) {
        if (!this.__statesList[statePattern]) {
            this.__statesList[statePattern] = new Map();
        }
        let mClass = this.__getStateManager(managerClass);
        if (!this.__statesList[statePattern].has(mClass)) {
            this.__statesList[statePattern].set(mClass, {
                active: [],
                inactive: [],
                askChange: []
            });
        }
    }
    __inactiveDefaultState(managerClass) {
        if (this.__isDefaultState) {
            this.__isDefaultState = false;
            let mClass = this.__getStateManager(managerClass);
            if (this.__defaultInactiveState.has(mClass)) {
                let fcts = this.__defaultInactiveState.get(mClass);
                for (let fct of fcts) {
                    fct.bind(this)();
                }
            }
        }
    }
    __activeDefaultState(nextStep, managerClass) {
        if (!this.__isDefaultState) {
            for (let pattern in this.__statesList) {
                if (StateManager.canBeActivate(pattern, nextStep)) {
                    let mClass = this.__getStateManager(managerClass);
                    if (this.__statesList[pattern].has(mClass)) {
                        return;
                    }
                }
            }
            this.__isDefaultState = true;
            let mClass = this.__getStateManager(managerClass);
            if (this.__defaultActiveState.has(mClass)) {
                let fcts = this.__defaultActiveState.get(mClass);
                for (let fct of fcts) {
                    fct.bind(this)();
                }
            }
        }
    }
    __subscribeState() {
        if (!this.isReady && this.__stateCleared) {
            return;
        }
        for (let route in this.__statesList) {
            for (const managerClass of this.__statesList[route].keys()) {
                managerClass.subscribe(route, this.__statesList[route].get(managerClass));
            }
        }
    }
    __stateCleared;
    __unsubscribeState() {
        for (let route in this.__statesList) {
            for (const managerClass of this.__statesList[route].keys()) {
                managerClass.unsubscribe(route, this.__statesList[route].get(managerClass));
            }
        }
        this.__stateCleared = true;
    }
    dateToString(d) {
        if (d instanceof Date) {
            return new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
        }
        return null;
    }
    dateTimeToString(dt) {
        if (dt instanceof Date) {
            return new Date(dt.getTime() - (dt.getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
        }
        return null;
    }
    stringToDate(s) {
        let td = new Date(s);
        let d = new Date(td.getTime() + (td.getTimezoneOffset() * 60000));
        if (isNaN(d)) {
            return null;
        }
        return d;
    }
    stringToDateTime(s) {
        let td = new Date(s);
        let d = new Date(td.getTime() + (td.getTimezoneOffset() * 60000));
        if (isNaN(d)) {
            return null;
        }
        return d;
    }
    getBoolean(val) {
        if (val === true || val === 1 || val === 'true' || val === '') {
            return true;
        }
        else if (val === false || val === 0 || val === 'false' || val === null || val === undefined) {
            return false;
        }
        console.error("error parsing boolean value " + val);
        return false;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue || !this.isReady) {
            if (this.__onChangeFct.hasOwnProperty(name)) {
                for (let fct of this.__onChangeFct[name]) {
                    fct('');
                }
            }
        }
    }
    remove() {
        super.remove();
        this.postDestruction();
    }
    /**
     * Function triggered when the component is removed from the DOM
     */
    postDestruction() { }
    /**
     * Function triggered the first time the component is rendering inside DOM
     */
    postCreation() { }
    /**
     * Find a parent by tagname if exist
     */
    findParentByTag(tagname, untilNode) {
        return ElementExtension.findParentByTag(this, tagname, untilNode);
    }
    /**
     * Find a parent by class name if exist
     */
    findParentByClass(classname, untilNode) {
        return ElementExtension.findParentByClass(this, classname, untilNode);
    }
    /**
     * Find a parent by type if exist
     */
    findParentByType(type, untilNode) {
        return ElementExtension.findParentByType(this, type, untilNode);
    }
    /**
     * Find list of parents by tagname
     */
    findParents(tagname, untilNode) {
        return ElementExtension.findParents(this, tagname, untilNode);
    }
    /**
     * Check if element contains a child
     */
    containsChild(el) {
        return ElementExtension.containsChild(this, el);
    }
    /**
     * Get element inside slot
     */
    getElementsInSlot(slotName = null) {
        return ElementExtension.getElementsInSlot(this, slotName);
    }
}

class Callback {
    callbacks = [];
    /**
     * Clear all callbacks
     */
    clear() {
        this.callbacks = [];
    }
    /**
     * Add a callback
     */
    add(cb) {
        this.callbacks.push(cb);
    }
    /**
     * Remove a callback
     */
    remove(cb) {
        let index = this.callbacks.indexOf(cb);
        if (index != -1) {
            this.callbacks.splice(index, 1);
        }
    }
    /**
     * Trigger all callbacks
     */
    trigger(args) {
        let result = [];
        for (let callback of this.callbacks) {
            result.push(callback.apply(null, args));
        }
        return result;
    }
}

class StateManager {
    subscribers = {};
    static canBeActivate(statePattern, stateName) {
        let stateInfo = this.prepareStateString(statePattern);
        return stateInfo.regex.test(stateName);
    }
    activeState;
    afterStateChanged = new Callback();
    /**
     * Subscribe actions for a state or a state list
     */
    subscribe(statePatterns, callbacks) {
        if (!callbacks.active && !callbacks.inactive && !callbacks.askChange) {
            this._log(`Trying to subscribe to state : ${statePatterns} with no callbacks !`, "warning");
            return;
        }
        if (!Array.isArray(statePatterns)) {
            statePatterns = [statePatterns];
        }
        for (let statePattern of statePatterns) {
            if (!this.subscribers.hasOwnProperty(statePattern)) {
                let res = StateManager.prepareStateString(statePattern);
                let isActive = this.activeState !== undefined && res.regex.test(this.activeState.name);
                this.subscribers[statePattern] = {
                    "regex": res.regex,
                    "params": res.params,
                    "callbacks": {
                        "active": [],
                        "inactive": [],
                        "askChange": [],
                    },
                    "isActive": isActive,
                };
            }
            if (callbacks.active) {
                if (!Array.isArray(callbacks.active)) {
                    callbacks.active = [callbacks.active];
                }
                for (let activeFct of callbacks.active) {
                    this.subscribers[statePattern].callbacks.active.push(activeFct);
                    if (this.subscribers[statePattern].isActive) {
                        let slugs = this.getInternalStateSlugs(this.subscribers[statePattern], this.activeState.name);
                        activeFct(this.activeState, slugs);
                    }
                }
            }
            if (callbacks.inactive) {
                if (!Array.isArray(callbacks.inactive)) {
                    callbacks.inactive = [callbacks.inactive];
                }
                for (let inactiveFct of callbacks.inactive) {
                    this.subscribers[statePattern].callbacks.inactive.push(inactiveFct);
                }
            }
            if (callbacks.askChange) {
                if (!Array.isArray(callbacks.askChange)) {
                    callbacks.askChange = [callbacks.askChange];
                }
                for (let askChangeFct of callbacks.askChange) {
                    this.subscribers[statePattern].callbacks.askChange.push(askChangeFct);
                }
            }
        }
    }
    /**
     * Unsubscribe actions for a state or a state list
     */
    unsubscribe(statePatterns, callbacks) {
        if (!callbacks.active && !callbacks.inactive && !callbacks.askChange) {
            this._log(`Trying to unsubscribe to state : ${statePatterns} with no callbacks !`, "warning");
            return;
        }
        if (!Array.isArray(statePatterns)) {
            statePatterns = [statePatterns];
        }
        for (let statePattern of statePatterns) {
            if (this.subscribers[statePattern]) {
                if (callbacks.active) {
                    if (!Array.isArray(callbacks.active)) {
                        callbacks.active = [callbacks.active];
                    }
                    for (let activeFct of callbacks.active) {
                        let index = this.subscribers[statePattern].callbacks.active.indexOf(activeFct);
                        if (index !== -1) {
                            this.subscribers[statePattern].callbacks.active.splice(index, 1);
                        }
                    }
                }
                if (callbacks.inactive) {
                    if (!Array.isArray(callbacks.inactive)) {
                        callbacks.inactive = [callbacks.inactive];
                    }
                    for (let inactiveFct of callbacks.inactive) {
                        let index = this.subscribers[statePattern].callbacks.inactive.indexOf(inactiveFct);
                        if (index !== -1) {
                            this.subscribers[statePattern].callbacks.inactive.splice(index, 1);
                        }
                    }
                }
                if (callbacks.askChange) {
                    if (!Array.isArray(callbacks.askChange)) {
                        callbacks.askChange = [callbacks.askChange];
                    }
                    for (let askChangeFct of callbacks.askChange) {
                        let index = this.subscribers[statePattern].callbacks.askChange.indexOf(askChangeFct);
                        if (index !== -1) {
                            this.subscribers[statePattern].callbacks.askChange.splice(index, 1);
                        }
                    }
                }
                if (this.subscribers[statePattern].callbacks.active.length === 0 &&
                    this.subscribers[statePattern].callbacks.inactive.length === 0 &&
                    this.subscribers[statePattern].callbacks.askChange.length === 0) {
                    delete this.subscribers[statePattern];
                }
            }
        }
    }
    onAfterStateChanged(cb) {
        this.afterStateChanged.add(cb);
    }
    offAfterStateChanged(cb) {
        this.afterStateChanged.remove(cb);
    }
    static prepareStateString(stateName) {
        let params = [];
        let i = 0;
        let regexState = stateName.replace(/{.*?}/g, (group, position) => {
            group = group.slice(1, -1);
            let splitted = group.split(":");
            let name = splitted[0].trim();
            let type = "string";
            let result = "([^\\/]+)";
            i++;
            if (splitted.length > 1) {
                if (splitted[1].trim() == "number") {
                    result = "([0-9]+)";
                    type = "number";
                }
            }
            params.push({
                name,
                type,
                position: i
            });
            return result;
        });
        regexState = regexState.replace(/\*/g, ".*?");
        regexState = "^" + regexState + '$';
        return {
            regex: new RegExp(regexState),
            params
        };
    }
    /**
     * Activate a current state
     */
    async setState(state) {
        let stateToUse;
        if (typeof state == "string") {
            stateToUse = new EmptyState(state);
        }
        else {
            stateToUse = state;
        }
        if (!stateToUse) {
            this._log("state is undefined", "error");
            return false;
        }
        let canChange = true;
        if (this.activeState) {
            let activeToInactive = [];
            let inactiveToActive = [];
            let triggerActive = [];
            canChange = await this.activeState.askChange(this.activeState, stateToUse);
            if (canChange) {
                for (let statePattern in this.subscribers) {
                    let subscriber = this.subscribers[statePattern];
                    if (subscriber.isActive) {
                        let clone = [...subscriber.callbacks.askChange];
                        let currentSlug = this.getInternalStateSlugs(subscriber, this.activeState.name);
                        for (let i = 0; i < clone.length; i++) {
                            let askChange = clone[i];
                            if (!await askChange(this.activeState, stateToUse, currentSlug)) {
                                canChange = false;
                                break;
                            }
                        }
                        let slugs = this.getInternalStateSlugs(subscriber, stateToUse.name);
                        if (slugs === null) {
                            activeToInactive.push(subscriber);
                        }
                        else {
                            triggerActive.push({
                                subscriber: subscriber,
                                params: slugs
                            });
                        }
                    }
                    else {
                        let slugs = this.getInternalStateSlugs(subscriber, stateToUse.name);
                        if (slugs) {
                            inactiveToActive.push({
                                subscriber,
                                params: slugs
                            });
                        }
                    }
                    if (!canChange) {
                        break;
                    }
                }
            }
            if (canChange) {
                const oldState = this.activeState;
                this.activeState = stateToUse;
                oldState.onInactivate(stateToUse);
                for (let subscriber of activeToInactive) {
                    subscriber.isActive = false;
                    let oldSlug = this.getInternalStateSlugs(subscriber, oldState.name);
                    [...subscriber.callbacks.inactive].forEach(callback => {
                        callback(oldState, stateToUse, oldSlug);
                    });
                }
                for (let trigger of triggerActive) {
                    [...trigger.subscriber.callbacks.active].forEach(callback => {
                        callback(stateToUse, trigger.params);
                    });
                }
                for (let trigger of inactiveToActive) {
                    trigger.subscriber.isActive = true;
                    [...trigger.subscriber.callbacks.active].forEach(callback => {
                        callback(stateToUse, trigger.params);
                    });
                }
                stateToUse.onActivate();
            }
        }
        else {
            this.activeState = stateToUse;
            for (let key in this.subscribers) {
                let slugs = this.getInternalStateSlugs(this.subscribers[key], stateToUse.name);
                if (slugs) {
                    this.subscribers[key].isActive = true;
                    [...this.subscribers[key].callbacks.active].forEach(callback => {
                        callback(stateToUse, slugs);
                    });
                }
            }
            stateToUse.onActivate();
        }
        this.afterStateChanged.trigger([]);
        return true;
    }
    getState() {
        return this.activeState;
    }
    getInternalStateSlugs(subscriber, stateName) {
        let matches = subscriber.regex.exec(stateName);
        if (matches) {
            let slugs = {};
            for (let param of subscriber.params) {
                if (param.type == "number") {
                    slugs[param.name] = Number(matches[param.position]);
                }
                else {
                    slugs[param.name] = matches[param.position];
                }
            }
            return slugs;
        }
        return null;
    }
    /**
     * Check if a state is in the subscribers and active, return true if it is, false otherwise
     */
    isStateActive(statePattern) {
        return StateManager.prepareStateString(statePattern).regex.test(this.activeState.name);
    }
    /**
     * Get slugs information for the current state, return null if state isn't active
     */
    getStateSlugs(statePattern) {
        let prepared = StateManager.prepareStateString(statePattern);
        return this.getInternalStateSlugs({
            regex: prepared.regex,
            params: prepared.params,
            isActive: false,
            callbacks: {
                active: [],
                inactive: [],
                askChange: [],
            }
        }, this.activeState.name);
    }
    // 0 = error only / 1 = errors and warning / 2 = error, warning and logs (not implemented)
    logLevel() {
        return 0;
    }
    _log(msg, type) {
        if (type === "error") {
            console.error(msg);
        }
        else if (type === "warning" && this.logLevel() > 0) {
            console.warn(msg);
        }
        else if (type === "info" && this.logLevel() > 1) {
            console.log(msg);
        }
    }
}

var WatchAction;
(function (WatchAction) {
    WatchAction[WatchAction["CREATED"] = 0] = "CREATED";
    WatchAction[WatchAction["UPDATED"] = 1] = "UPDATED";
    WatchAction[WatchAction["DELETED"] = 2] = "DELETED";
})(WatchAction || (WatchAction = {}));

class Watcher {
    static __maxProxyData = 0;
    /**
     * Transform object into a watcher
     */
    static get(obj, onDataChanged) {
        if (obj == undefined) {
            console.error("You must define an objet / array for your proxy");
            return;
        }
        if (obj.__isProxy) {
            obj.__subscribe(onDataChanged);
            return obj;
        }
        Watcher.__maxProxyData++;
        let setProxyPath = (newProxy, newPath) => {
            if (newProxy instanceof Object && newProxy.__isProxy) {
                newProxy.__path = newPath;
                if (!newProxy.__proxyData) {
                    newProxy.__proxyData = {};
                }
                if (!newProxy.__proxyData[newPath]) {
                    newProxy.__proxyData[newPath] = [];
                }
                if (newProxy.__proxyData[newPath].indexOf(proxyData) == -1) {
                    newProxy.__proxyData[newPath].push(proxyData);
                }
            }
        };
        let removeProxyPath = (oldValue, pathToDelete, recursive = true) => {
            if (oldValue instanceof Object && oldValue.__isProxy) {
                let allProxies = oldValue.__proxyData;
                for (let triggerPath in allProxies) {
                    if (triggerPath == pathToDelete) {
                        for (let i = 0; i < allProxies[triggerPath].length; i++) {
                            if (allProxies[triggerPath][i] == proxyData) {
                                allProxies[triggerPath].splice(i, 1);
                                i--;
                            }
                        }
                        if (allProxies[triggerPath].length == 0) {
                            delete allProxies[triggerPath];
                            if (Object.keys(allProxies).length == 0) {
                                delete oldValue.__proxyData;
                            }
                        }
                    }
                }
            }
        };
        let jsonReplacer = (key, value) => {
            if (key == "__path")
                return undefined;
            else if (key == "__proxyData")
                return undefined;
            else
                return value;
        };
        let currentTrace = new Error().stack.split("\n");
        currentTrace.shift();
        currentTrace.shift();
        let onlyDuringInit = true;
        let proxyData = {
            baseData: {},
            id: Watcher.__maxProxyData,
            callbacks: [onDataChanged],
            avoidUpdate: [],
            pathToRemove: [],
            history: [{
                    object: JSON.parse(JSON.stringify(obj, jsonReplacer)),
                    trace: currentTrace,
                    action: 'init',
                    path: ''
                }],
            useHistory: false,
            getProxyObject(target, element, prop) {
                let newProxy;
                if (element instanceof Object && element.__isProxy) {
                    newProxy = element;
                }
                else {
                    try {
                        if (element instanceof Object) {
                            newProxy = new Proxy(element, this);
                        }
                        else {
                            return element;
                        }
                    }
                    catch {
                        return element;
                    }
                }
                let newPath = '';
                if (Array.isArray(target)) {
                    if (prop != "length") {
                        if (target.__path) {
                            newPath = target.__path;
                        }
                        newPath += "[" + prop + "]";
                        setProxyPath(newProxy, newPath);
                    }
                }
                else if (element instanceof Date) {
                    return element;
                }
                else {
                    if (target.__path) {
                        newPath = target.__path + '.';
                    }
                    newPath += prop;
                    setProxyPath(newProxy, newPath);
                }
                return newProxy;
            },
            tryCustomFunction(target, prop, receiver) {
                if (prop == "__isProxy") {
                    return true;
                }
                else if (prop == "__subscribe") {
                    return (cb) => {
                        this.callbacks.push(cb);
                    };
                }
                else if (prop == "__unsubscribe") {
                    return (cb) => {
                        let index = this.callbacks.indexOf(cb);
                        if (index > -1) {
                            this.callbacks.splice(index, 1);
                        }
                    };
                }
                else if (prop == "__proxyId") {
                    return this.id;
                }
                else if (prop == "getHistory") {
                    return () => {
                        return this.history;
                    };
                }
                else if (prop == "clearHistory") {
                    this.history = [];
                }
                else if (prop == "enableHistory") {
                    return () => {
                        this.useHistory = true;
                    };
                }
                else if (prop == "disableHistory") {
                    return () => {
                        this.useHistory = false;
                    };
                }
                else if (prop == "__getTarget" && onlyDuringInit) {
                    return () => {
                        return target;
                    };
                }
                return undefined;
            },
            get(target, prop, receiver) {
                if (prop == "__proxyData") {
                    return target[prop];
                }
                let customResult = this.tryCustomFunction(target, prop, receiver);
                if (customResult !== undefined) {
                    return customResult;
                }
                let element = target[prop];
                if (typeof (element) == 'object') {
                    return this.getProxyObject(target, element, prop);
                }
                else if (typeof (element) == 'function') {
                    if (Array.isArray(target)) {
                        let result;
                        if (prop == 'push') {
                            if (target.__isProxy) {
                                result = (el) => {
                                    let index = target.push(el);
                                    return index;
                                };
                            }
                            else {
                                result = (el) => {
                                    let index = target.push(el);
                                    let proxyEl = this.getProxyObject(target, el, (index - 1));
                                    target.splice(target.length - 1, 1, proxyEl);
                                    trigger('CREATED', target, receiver, proxyEl, "[" + (index - 1) + "]");
                                    return index;
                                };
                            }
                        }
                        else if (prop == 'splice') {
                            if (target.__isProxy) {
                                result = (index, nbRemove, ...insert) => {
                                    let res = target.splice(index, nbRemove, ...insert);
                                    return res;
                                };
                            }
                            else {
                                result = (index, nbRemove, ...insert) => {
                                    let res = target.splice(index, nbRemove, ...insert);
                                    let path = target.__path ? target.__path : '';
                                    for (let i = 0; i < res.length; i++) {
                                        trigger('DELETED', target, receiver, res[i], "[" + index + "]");
                                        removeProxyPath(res[i], path + "[" + (index + i) + "]");
                                    }
                                    for (let i = 0; i < insert.length; i++) {
                                        let proxyEl = this.getProxyObject(target, insert[i], (index + i));
                                        target.splice((index + i), 1, proxyEl);
                                        trigger('CREATED', target, receiver, proxyEl, "[" + (index + i) + "]");
                                    }
                                    let fromIndex = index + insert.length;
                                    let baseDiff = index - insert.length + res.length + 1;
                                    for (let i = fromIndex, j = 0; i < target.length; i++, j++) {
                                        let oldPath = path + "[" + (j + baseDiff) + "]";
                                        removeProxyPath(target[i], oldPath, false);
                                        let proxyEl = this.getProxyObject(target, target[i], i);
                                        let recuUpdate = (childEl) => {
                                            if (Array.isArray(childEl)) {
                                                for (let i = 0; i < childEl.length; i++) {
                                                    if (childEl[i] instanceof Object && childEl[i].__path) {
                                                        let oldPathRecu = proxyEl[i].__path.replace(proxyEl.__path, oldPath);
                                                        removeProxyPath(childEl[i], oldPathRecu, false);
                                                        let newProxyEl = this.getProxyObject(childEl, childEl[i], i);
                                                        recuUpdate(newProxyEl);
                                                    }
                                                }
                                            }
                                            else if (childEl instanceof Object && !(childEl instanceof Date)) {
                                                for (let key in childEl) {
                                                    if (childEl[key] instanceof Object && childEl[key].__path) {
                                                        let oldPathRecu = proxyEl[key].__path.replace(proxyEl.__path, oldPath);
                                                        removeProxyPath(childEl[key], oldPathRecu, false);
                                                        let newProxyEl = this.getProxyObject(childEl, childEl[key], key);
                                                        recuUpdate(newProxyEl);
                                                    }
                                                }
                                            }
                                        };
                                        recuUpdate(proxyEl);
                                    }
                                    return res;
                                };
                            }
                        }
                        else if (prop == 'pop') {
                            if (target.__isProxy) {
                                result = () => {
                                    let res = target.pop();
                                    return res;
                                };
                            }
                            else {
                                result = () => {
                                    let index = target.length - 1;
                                    let res = target.pop();
                                    let path = target.__path ? target.__path : '';
                                    trigger('DELETED', target, receiver, res, "[" + index + "]");
                                    removeProxyPath(res, path + "[" + index + "]");
                                    return res;
                                };
                            }
                        }
                        else {
                            result = element.bind(target);
                        }
                        return result;
                    }
                    return element.bind(target);
                }
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                let triggerChange = false;
                if (["__path", "__proxyData"].indexOf(prop) == -1) {
                    if (Array.isArray(target)) {
                        if (prop != "length") {
                            triggerChange = true;
                        }
                    }
                    else {
                        let oldValue = Reflect.get(target, prop, receiver);
                        if (oldValue !== value) {
                            triggerChange = true;
                        }
                    }
                }
                let result = Reflect.set(target, prop, value, receiver);
                if (triggerChange) {
                    let index = this.avoidUpdate.indexOf(prop);
                    if (index == -1) {
                        trigger('UPDATED', target, receiver, value, prop);
                    }
                    else {
                        this.avoidUpdate.splice(index, 1);
                    }
                }
                return result;
            },
            deleteProperty(target, prop) {
                let triggerChange = false;
                let pathToDelete = '';
                if (prop != "__path") {
                    if (Array.isArray(target)) {
                        if (prop != "length") {
                            if (target.__path) {
                                pathToDelete = target.__path;
                            }
                            pathToDelete += "[" + prop + "]";
                            triggerChange = true;
                        }
                    }
                    else {
                        if (target.__path) {
                            pathToDelete = target.__path + '.';
                        }
                        pathToDelete += prop;
                        triggerChange = true;
                    }
                }
                if (target.hasOwnProperty(prop)) {
                    let oldValue = target[prop];
                    delete target[prop];
                    if (triggerChange) {
                        trigger('DELETED', target, null, oldValue, prop);
                        removeProxyPath(oldValue, pathToDelete);
                    }
                    return true;
                }
                return false;
            },
            defineProperty(target, prop, descriptor) {
                let triggerChange = false;
                let newPath = '';
                if (["__path", "__proxyData"].indexOf(prop) == -1) {
                    if (Array.isArray(target)) {
                        if (prop != "length") {
                            if (target.__path) {
                                newPath = target.__path;
                            }
                            newPath += "[" + prop + "]";
                            if (!target.hasOwnProperty(prop)) {
                                triggerChange = true;
                            }
                        }
                    }
                    else {
                        if (target.__path) {
                            newPath = target.__path + '.';
                        }
                        newPath += prop;
                        if (!target.hasOwnProperty(prop)) {
                            triggerChange = true;
                        }
                    }
                }
                let result = Reflect.defineProperty(target, prop, descriptor);
                if (triggerChange) {
                    this.avoidUpdate.push(prop);
                    let proxyEl = this.getProxyObject(target, descriptor.value, prop);
                    target[prop] = proxyEl;
                    trigger('CREATED', target, null, proxyEl, prop);
                }
                return result;
            }
        };
        const trigger = (type, target, receiver, value, prop) => {
            if (target.__isProxy) {
                return;
            }
            let allProxies = target.__proxyData;
            let receiverId = 0;
            if (receiver == null) {
                receiverId = proxyData.id;
            }
            else {
                receiverId = receiver.__proxyId;
            }
            if (proxyData.id == receiverId) {
                let stacks = [];
                let allStacks = new Error().stack.split("\n");
                for (let i = allStacks.length - 1; i >= 0; i--) {
                    let current = allStacks[i].trim().replace("at ", "");
                    if (current.startsWith("Object.set") || current.startsWith("Proxy.result")) {
                        break;
                    }
                    stacks.push(current);
                }
                for (let triggerPath in allProxies) {
                    for (let currentProxyData of allProxies[triggerPath]) {
                        let pathToSend = triggerPath;
                        if (pathToSend != "") {
                            if (Array.isArray(target)) {
                                if (!prop.startsWith("[")) {
                                    pathToSend += "[" + prop + "]";
                                }
                                else {
                                    pathToSend += prop;
                                }
                            }
                            else {
                                if (!prop.startsWith("[")) {
                                    pathToSend += ".";
                                }
                                pathToSend += prop;
                            }
                        }
                        else {
                            pathToSend = prop;
                        }
                        if (proxyData.useHistory) {
                            proxyData.history.push({
                                object: JSON.parse(JSON.stringify(currentProxyData.baseData, jsonReplacer)),
                                trace: stacks.reverse(),
                                action: WatchAction[type],
                                path: pathToSend
                            });
                        }
                        [...currentProxyData.callbacks].forEach((cb) => {
                            cb(WatchAction[type], pathToSend, value);
                        });
                    }
                }
            }
        };
        var realProxy = new Proxy(obj, proxyData);
        proxyData.baseData = realProxy.__getTarget();
        onlyDuringInit = false;
        setProxyPath(realProxy, '');
        return realProxy;
    }
}

class PressManager {
    options;
    element;
    subPressManager = [];
    delayDblPress = 150;
    delayLongPress = 700;
    nbPress = 0;
    offsetDrag = 20;
    state = {
        oneActionTriggered: false,
        isMoving: false,
    };
    startPosition = { x: 0, y: 0 };
    customFcts = {};
    timeoutDblPress = 0;
    timeoutLongPress = 0;
    downEventSaved;
    actionsName = {
        press: "press",
        longPress: "longPress",
        dblPress: "dblPress",
        drag: "drag"
    };
    useDblPress = false;
    functionsBinded = {
        downAction: (e) => { },
        upAction: (e) => { },
        moveAction: (e) => { },
        childPressStart: (e) => { },
        childPressEnd: (e) => { },
        childPress: (e) => { },
        childDblPress: (e) => { },
        childLongPress: (e) => { },
        childDragStart: (e) => { },
    };
    /**
     * @param {*} options - The options
     * @param {HTMLElement | HTMLElement[]} options.element - The element to manage
     */
    constructor(options) {
        if (options.element === void 0) {
            throw 'You must provide an element';
        }
        if (Array.isArray(options.element)) {
            for (let el of options.element) {
                let cloneOpt = { ...options };
                cloneOpt.element = el;
                this.subPressManager.push(new PressManager(cloneOpt));
            }
        }
        else {
            this.element = options.element;
            this.checkDragConstraint(options);
            this.assignValueOption(options);
            this.options = options;
            this.init();
        }
    }
    /**
     * Get the current element focused by the PressManager
     */
    getElement() {
        return this.element;
    }
    checkDragConstraint(options) {
        if (options.onDrag !== void 0) {
            if (options.onDragStart === void 0) {
                options.onDragStart = (e) => { };
            }
            if (options.onDragEnd === void 0) {
                options.onDragEnd = (e) => { };
            }
        }
        if (options.onDragStart !== void 0) {
            if (options.onDrag === void 0) {
                options.onDrag = (e) => { };
            }
            if (options.onDragEnd === void 0) {
                options.onDragEnd = (e) => { };
            }
        }
        if (options.onDragEnd !== void 0) {
            if (options.onDragStart === void 0) {
                options.onDragStart = (e) => { };
            }
            if (options.onDrag === void 0) {
                options.onDrag = (e) => { };
            }
        }
    }
    assignValueOption(options) {
        if (options.delayDblPress !== undefined) {
            this.delayDblPress = options.delayDblPress;
        }
        if (options.delayLongPress !== undefined) {
            this.delayLongPress = options.delayLongPress;
        }
        if (options.offsetDrag !== undefined) {
            this.offsetDrag = options.offsetDrag;
        }
        if (options.onDblPress !== undefined) {
            this.useDblPress = true;
        }
        if (options.forceDblPress) {
            this.useDblPress = true;
        }
    }
    bindAllFunction() {
        this.functionsBinded.downAction = this.downAction.bind(this);
        this.functionsBinded.moveAction = this.moveAction.bind(this);
        this.functionsBinded.upAction = this.upAction.bind(this);
        this.functionsBinded.childDblPress = this.childDblPress.bind(this);
        this.functionsBinded.childDragStart = this.childDragStart.bind(this);
        this.functionsBinded.childLongPress = this.childLongPress.bind(this);
        this.functionsBinded.childPress = this.childPress.bind(this);
        this.functionsBinded.childPressStart = this.childPressStart.bind(this);
        this.functionsBinded.childPressEnd = this.childPressEnd.bind(this);
    }
    init() {
        this.bindAllFunction();
        this.element.addEventListener("pointerdown", this.functionsBinded.downAction);
        this.element.addEventListener("trigger_pointer_press", this.functionsBinded.childPress);
        this.element.addEventListener("trigger_pointer_pressstart", this.functionsBinded.childPressStart);
        this.element.addEventListener("trigger_pointer_pressend", this.functionsBinded.childPressEnd);
        this.element.addEventListener("trigger_pointer_dblpress", this.functionsBinded.childDblPress);
        this.element.addEventListener("trigger_pointer_longpress", this.functionsBinded.childLongPress);
        this.element.addEventListener("trigger_pointer_dragstart", this.functionsBinded.childDragStart);
    }
    downAction(e) {
        this.downEventSaved = e;
        e.stopImmediatePropagation();
        this.customFcts = {};
        if (this.nbPress == 0) {
            this.state.oneActionTriggered = false;
            clearTimeout(this.timeoutDblPress);
        }
        this.startPosition = { x: e.pageX, y: e.pageY };
        document.addEventListener("pointerup", this.functionsBinded.upAction);
        document.addEventListener("pointermove", this.functionsBinded.moveAction);
        this.timeoutLongPress = setTimeout(() => {
            if (!this.state.oneActionTriggered) {
                if (this.options.onLongPress) {
                    this.state.oneActionTriggered = true;
                    this.options.onLongPress(e, this);
                    this.triggerEventToParent(this.actionsName.longPress, e);
                }
                else {
                    this.emitTriggerFunction("longpress", e);
                }
            }
        }, this.delayLongPress);
        if (this.options.onPressStart) {
            this.options.onPressStart(e, this);
            this.emitTriggerFunction("pressstart", e, this.element.parentElement);
        }
        else {
            this.emitTriggerFunction("pressstart", e);
        }
    }
    upAction(e) {
        e.stopImmediatePropagation();
        document.removeEventListener("pointerup", this.functionsBinded.upAction);
        document.removeEventListener("pointermove", this.functionsBinded.moveAction);
        clearTimeout(this.timeoutLongPress);
        if (this.state.isMoving) {
            this.state.isMoving = false;
            if (this.options.onDragEnd) {
                this.options.onDragEnd(e, this);
            }
            else if (this.customFcts.src && this.customFcts.onDragEnd) {
                this.customFcts.onDragEnd(e, this.customFcts.src);
            }
        }
        else {
            if (this.useDblPress) {
                this.nbPress++;
                if (this.nbPress == 2) {
                    if (!this.state.oneActionTriggered) {
                        this.state.oneActionTriggered = true;
                        this.nbPress = 0;
                        if (this.options.onDblPress) {
                            this.options.onDblPress(e, this);
                            this.triggerEventToParent(this.actionsName.dblPress, e);
                        }
                        else {
                            this.emitTriggerFunction("dblpress", e);
                        }
                    }
                }
                else if (this.nbPress == 1) {
                    this.timeoutDblPress = setTimeout(() => {
                        this.nbPress = 0;
                        if (!this.state.oneActionTriggered) {
                            if (this.options.onPress) {
                                this.state.oneActionTriggered = true;
                                this.options.onPress(e, this);
                                this.triggerEventToParent(this.actionsName.press, e);
                            }
                            else {
                                this.emitTriggerFunction("press", e);
                            }
                        }
                    }, this.delayDblPress);
                }
            }
            else {
                if (!this.state.oneActionTriggered) {
                    if (this.options.onPress) {
                        this.state.oneActionTriggered = true;
                        this.options.onPress(e, this);
                        this.triggerEventToParent(this.actionsName.press, e);
                    }
                    else {
                        this.emitTriggerFunction("press", e);
                    }
                }
            }
        }
        if (this.options.onPressEnd) {
            this.options.onPressEnd(e, this);
            this.emitTriggerFunction("pressend", e, this.element.parentElement);
        }
        else {
            this.emitTriggerFunction("pressend", e);
        }
    }
    moveAction(e) {
        if (!this.state.isMoving && !this.state.oneActionTriggered) {
            e.stopImmediatePropagation();
            let xDist = e.pageX - this.startPosition.x;
            let yDist = e.pageY - this.startPosition.y;
            let distance = Math.sqrt(xDist * xDist + yDist * yDist);
            if (distance > this.offsetDrag) {
                this.state.oneActionTriggered = true;
                if (this.options.onDragStart) {
                    this.state.isMoving = true;
                    this.options.onDragStart(this.downEventSaved, this);
                    this.triggerEventToParent(this.actionsName.drag, e);
                }
                else {
                    this.emitTriggerFunction("dragstart", this.downEventSaved);
                }
            }
        }
        else if (this.state.isMoving) {
            if (this.options.onDrag) {
                this.options.onDrag(e, this);
            }
            else if (this.customFcts.src && this.customFcts.onDrag) {
                this.customFcts.onDrag(e, this.customFcts.src);
            }
        }
    }
    triggerEventToParent(eventName, pointerEvent) {
        if (this.element.parentNode) {
            this.element.parentNode.dispatchEvent(new CustomEvent("pressaction_trigger", {
                bubbles: true,
                cancelable: false,
                composed: true,
                detail: {
                    target: this.element,
                    eventName: eventName,
                    realEvent: pointerEvent
                }
            }));
        }
    }
    childPressStart(e) {
        if (this.options.onPressStart) {
            this.options.onPressStart(e.detail.realEvent, this);
        }
    }
    childPressEnd(e) {
        if (this.options.onPressEnd) {
            this.options.onPressEnd(e.detail.realEvent, this);
        }
    }
    childPress(e) {
        if (this.options.onPress) {
            e.stopImmediatePropagation();
            e.detail.state.oneActionTriggered = true;
            this.options.onPress(e.detail.realEvent, this);
            this.triggerEventToParent(this.actionsName.press, e.detail.realEvent);
        }
    }
    childDblPress(e) {
        if (this.options.onDblPress) {
            e.stopImmediatePropagation();
            if (e.detail.state) {
                e.detail.state.oneActionTriggered = true;
            }
            this.options.onDblPress(e.detail.realEvent, this);
            this.triggerEventToParent(this.actionsName.dblPress, e.detail.realEvent);
        }
    }
    childLongPress(e) {
        if (this.options.onLongPress) {
            e.stopImmediatePropagation();
            e.detail.state.oneActionTriggered = true;
            this.options.onLongPress(e.detail.realEvent, this);
            this.triggerEventToParent(this.actionsName.longPress, e.detail.realEvent);
        }
    }
    childDragStart(e) {
        if (this.options.onDragStart) {
            e.stopImmediatePropagation();
            e.detail.state.isMoving = true;
            e.detail.customFcts.src = this;
            e.detail.customFcts.onDrag = this.options.onDrag;
            e.detail.customFcts.onDragEnd = this.options.onDragEnd;
            e.detail.customFcts.offsetDrag = this.options.offsetDrag;
            this.options.onDragStart(e.detail.realEvent, this);
            this.triggerEventToParent(this.actionsName.drag, e.detail.realEvent);
        }
    }
    emitTriggerFunction(action, e, el = null) {
        let ev = new CustomEvent("trigger_pointer_" + action, {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
                state: this.state,
                customFcts: this.customFcts,
                realEvent: e
            }
        });
        if (!el) {
            el = this.element;
        }
        el.dispatchEvent(ev);
    }
    /**
     * Destroy the Press instance byremoving all events
     */
    destroy() {
        for (let sub of this.subPressManager) {
            sub.destroy();
        }
        if (this.element) {
            this.element.removeEventListener("pointerdown", this.functionsBinded.downAction);
            this.element.removeEventListener("trigger_pointer_press", this.functionsBinded.childPress);
            this.element.removeEventListener("trigger_pointer_pressstart", this.functionsBinded.childPressStart);
            this.element.removeEventListener("trigger_pointer_pressend", this.functionsBinded.childPressEnd);
            this.element.removeEventListener("trigger_pointer_dblpress", this.functionsBinded.childDblPress);
            this.element.removeEventListener("trigger_pointer_longpress", this.functionsBinded.childLongPress);
            this.element.removeEventListener("trigger_pointer_dragstart", this.functionsBinded.childDragStart);
        }
    }
}

class State {
    /**
     * Activate a custom state inside a specific manager
     * It ll be a generic state with no information inside exept name
     */
    static async activate(stateName, manager) {
        return await new EmptyState(stateName).activate(manager);
    }
    /**
     * Activate this state inside a specific manager
     */
    async activate(manager) {
        return await manager.setState(this);
    }
    onActivate() {
    }
    onInactivate(nextState) {
    }
    async askChange(state, nextState) {
        return true;
    }
}

class EmptyState extends State {
    localName;
    constructor(stateName) {
        super();
        this.localName = stateName;
    }
    /**
     * @inheritdoc
     */
    get name() {
        return this.localName;
    }
}

class WebComponentTemplate {
    static setValueToItem(path, obj, value) {
        let splitted = path.split(".");
        for (let i = 0; i < splitted.length - 1; i++) {
            let split = splitted[i];
            if (!obj[split]) {
                obj[split] = {};
            }
            obj = obj[split];
        }
        obj[splitted[splitted.length - 1]] = value;
    }
    static getValueFromItem(path, obj) {
        let splitted = path.split(".");
        for (let i = 0; i < splitted.length - 1; i++) {
            let split = splitted[i];
            if (typeof obj[split] !== 'object') {
                return undefined;
            }
            obj = obj[split];
        }
        return obj[splitted[splitted.length - 1]];
    }
    static validatePath(path, pathToCheck) {
        if (path.startsWith(pathToCheck)) {
            return true;
        }
        return false;
    }
    htmlParts = [];
    setHTML(data) {
        this.htmlParts.push(data);
    }
    generateTemplate() {
        this.template = document.createElement('template');
        let currentHTML = "<slot></slot>";
        let previousSlots = {
            default: '<slot></slot>'
        };
        for (let htmlPart of this.htmlParts) {
            for (let blockName in htmlPart.blocks) {
                if (!previousSlots.hasOwnProperty(blockName)) {
                    throw "can't found slot with name " + blockName;
                }
                currentHTML = currentHTML.replace(previousSlots[blockName], htmlPart.blocks[blockName]);
            }
            for (let slotName in htmlPart.slots) {
                previousSlots[slotName] = htmlPart.slots[slotName];
            }
        }
        this.template.innerHTML = currentHTML;
    }
    setTemplate(template) {
        this.template = document.createElement('template');
        this.template.innerHTML = template;
    }
    contextSchema = {
        globals: [],
        locals: [],
        loops: []
    };
    template;
    actions = {};
    loops = [];
    setActions(actions) {
        if (!this.actions) {
            this.actions = actions;
        }
        else {
            if (actions.elements) {
                if (!this.actions.elements) {
                    this.actions.elements = [];
                }
                this.actions.elements = [...actions.elements, ...this.actions.elements];
            }
            if (actions.events) {
                if (!this.actions.events) {
                    this.actions.events = [];
                }
                this.actions.events = [...actions.events, ...this.actions.events];
            }
            if (actions.pressEvents) {
                if (!this.actions.pressEvents) {
                    this.actions.pressEvents = [];
                }
                this.actions.pressEvents = [...actions.pressEvents, ...this.actions.pressEvents];
            }
            if (actions.content) {
                if (!this.actions.content) {
                    this.actions.content = actions.content;
                }
                else {
                    for (let contextProp in actions.content) {
                        if (!this.actions.content[contextProp]) {
                            this.actions.content[contextProp] = actions.content[contextProp];
                        }
                        else {
                            this.actions.content[contextProp] = { ...actions.content[contextProp], ...this.actions.content[contextProp] };
                        }
                    }
                }
            }
            if (actions.injection) {
                if (!this.actions.injection) {
                    this.actions.injection = actions.injection;
                }
                else {
                    for (let contextProp in actions.injection) {
                        if (!this.actions.injection[contextProp]) {
                            this.actions.injection[contextProp] = actions.injection[contextProp];
                        }
                        else {
                            this.actions.injection[contextProp] = { ...actions.injection[contextProp], ...this.actions.injection[contextProp] };
                        }
                    }
                }
            }
            if (actions.bindings) {
                if (!this.actions.bindings) {
                    this.actions.bindings = actions.bindings;
                }
                else {
                    for (let contextProp in actions.bindings) {
                        if (!this.actions.bindings[contextProp]) {
                            this.actions.bindings[contextProp] = actions.bindings[contextProp];
                        }
                        else {
                            this.actions.bindings[contextProp] = { ...actions.bindings[contextProp], ...this.actions.bindings[contextProp] };
                        }
                    }
                }
            }
        }
    }
    setSchema(contextSchema) {
        if (contextSchema.globals) {
            this.contextSchema.globals = [...this.contextSchema.globals, ...contextSchema.globals];
        }
        if (contextSchema.locals) {
            this.contextSchema.locals = [...this.contextSchema.locals, ...contextSchema.locals];
        }
        if (contextSchema.loops) {
            this.contextSchema.loops = [...this.contextSchema.loops, ...contextSchema.loops];
        }
    }
    createInstance(component) {
        let context = new WebComponentTemplateContext(component, this.contextSchema, []);
        let content = this.template.content.cloneNode(true);
        let actions = this.actions;
        let instance = new WebComponentTemplateInstance(context, content, actions, component, this.loops);
        return instance;
    }
    addLoop(loop) {
        this.loops.push(loop);
    }
}

class WebComponentTemplateContext {
    __changes = {};
    component;
    fctsToRemove = [];
    c = {};
    isRendered = false;
    schema;
    constructor(component, schema, locals) {
        this.component = component;
        this.schema = { ...schema };
        this.schema.locals = [...this.schema.locals, ...locals];
        5;
        this.buildSchema();
    }
    destructor() {
        for (let toRemove of this.fctsToRemove) {
            let index = this.component['__onChangeFct'][toRemove.name].indexOf(toRemove.fct);
            if (index != -1) {
                this.component['__onChangeFct'][toRemove.name].splice(index, 1);
            }
        }
    }
    buildSchema() {
        for (let global of this.schema.globals) {
            this.createGlobal(global);
        }
        for (let loop of this.schema.loops) {
            this.createLoop(loop);
        }
        for (let local of this.schema.locals) {
            this.createLocal(local);
        }
    }
    createGlobal(global) {
        let comp = this.component;
        Object.defineProperty(this.c, global, {
            get() {
                return WebComponentTemplate.getValueFromItem(global, comp);
            },
            set(value) {
                WebComponentTemplate.setValueToItem(global, comp, value);
            }
        });
        let name = global.split(".")[0];
        this.__changes[name] = [];
        if (!this.component['__onChangeFct'][name]) {
            this.component['__onChangeFct'][name] = [];
        }
        let fct = (path) => {
            if (this.isRendered) {
                for (let change of this.__changes[name]) {
                    change(path);
                }
            }
        };
        this.fctsToRemove.push({ name, fct });
        this.component['__onChangeFct'][name].push(fct);
    }
    createLoop(loop) {
        Object.defineProperty(this.c, loop.item, {
            get() {
                let indexValue = this[loop.index];
                return WebComponentTemplate.getValueFromItem(loop.data, this)[indexValue];
            }
        });
        let name = loop.data.split(".")[0];
        this.__changes[loop.item] = [];
        this.__changes[name].push((path) => {
            if (this.isRendered) {
                let currentPath = `${loop.data}[${this.c[loop.index]}]`;
                if (path.startsWith(currentPath)) {
                    let localPath = path.replace(currentPath, loop.item);
                    for (let change of this.__changes[loop.item]) {
                        change(localPath);
                    }
                }
            }
        });
    }
    createLocal(local) {
        let localValue = local.value;
        let changes = this.__changes;
        Object.defineProperty(this.c, local.name, {
            get() {
                return localValue;
            },
            set(value) {
                localValue = value;
                if (changes[local.name]) {
                    for (let change of changes[local.name]) {
                        change(local.name);
                    }
                }
            }
        });
    }
    addChange(on, fct) {
        if (!this.__changes[on]) {
            this.__changes[on] = [];
        }
        this.__changes[on].push(fct);
    }
}

class WebComponentTemplateInstance {
    context;
    content;
    actions;
    component;
    _components;
    firstRenderUniqueCb = {};
    firstRenderCb = [];
    fctsToRemove = [];
    loopRegisteries = {};
    firstChild;
    lastChild;
    loops = [];
    constructor(context, content, actions, component, loops) {
        this.context = context;
        this.content = content;
        this.actions = actions;
        this.component = component;
        this.loops = loops;
        this.firstChild = content.firstChild;
        this.lastChild = content.lastChild;
        this.transformActionsListening();
        this.selectElements();
        this.bindEvents();
    }
    render() {
        for (let cb of this.firstRenderCb) {
            cb();
        }
        for (let key in this.firstRenderUniqueCb) {
            this.firstRenderUniqueCb[key]();
        }
        this.renderSubTemplate();
        this.context.isRendered = true;
    }
    destructor() {
        this.firstChild.remove();
        this.context.destructor();
        for (let toRemove of this.fctsToRemove) {
            let index = this.component['__watchActions'][toRemove.name].indexOf(toRemove.fct);
            if (index != -1) {
                this.component['__watchActions'][toRemove.name].splice(index, 1);
            }
        }
    }
    selectElements() {
        this._components = {};
        let idEls = Array.from(this.content.querySelectorAll('[_id]'));
        for (let idEl of idEls) {
            let id = idEl.attributes['_id'].value;
            if (!this._components[id]) {
                this._components[id] = [];
            }
            this._components[id].push(idEl);
        }
        if (this.actions.elements) {
            for (let element of this.actions.elements) {
                let components = [];
                for (let id of element.ids) {
                    if (this._components[id]) {
                        components = [...components, ...this._components[id]];
                    }
                }
                if (element.isArray) {
                    WebComponentTemplate.setValueToItem(element.name, this.component, components);
                }
                else {
                    WebComponentTemplate.setValueToItem(element.name, this.component, components[0]);
                }
            }
        }
    }
    bindEvents() {
        if (this.actions.events) {
            for (let event of this.actions.events) {
                this.bindEvent(event);
            }
        }
        if (this.actions.pressEvents) {
            for (let event of this.actions.pressEvents) {
                this.bindPressEvent(event);
            }
        }
    }
    bindEvent(event) {
        if (event.isCallback) {
            for (let el of this._components[event.id]) {
                let cb = WebComponentTemplate.getValueFromItem(event.eventName, el);
                cb?.add((...args) => {
                    event.fct(this.context, args);
                });
            }
        }
        else {
            for (let el of this._components[event.id]) {
                el.addEventListener(event.eventName, (e) => { event.fct(e, this.context); });
            }
        }
    }
    bindPressEvent(event) {
        let id = event['id'];
        if (id) {
            let clone = {};
            for (let temp in event) {
                if (temp != 'id') {
                    if (event[temp] instanceof Function) {
                        clone[temp] = (e, pressInstance) => { event[temp](e, pressInstance, this.context); };
                    }
                    else {
                        clone[temp] = event[temp];
                    }
                }
            }
            clone.element = this._components[id];
            new PressManager(clone);
        }
    }
    transformActionsListening() {
        if (this.actions.content) {
            for (let name in this.actions.content) {
                for (let change of this.actions.content[name]) {
                    this.transformChangeAction(name, change);
                }
            }
        }
        if (this.actions.injection) {
            for (let name in this.actions.injection) {
                for (let injection of this.actions.injection[name]) {
                    this.transformInjectionAction(name, injection);
                }
            }
        }
        if (this.actions.bindings) {
            for (let name in this.actions.bindings) {
                for (let binding of this.actions.bindings[name]) {
                    this.transformBindigAction(name, binding);
                }
            }
        }
    }
    transformChangeAction(name, change) {
        let key = change.id + "_" + change.attrName;
        if (change.attrName == "@HTML") {
            if (change.path) {
                this.context.addChange(name, (path) => {
                    if (WebComponentTemplate.validatePath(path, change.path)) {
                        for (const el of this._components[change.id]) {
                            el.innerHTML = change.render(this.context.c);
                        }
                    }
                });
            }
            else {
                this.context.addChange(name, (path) => {
                    for (const el of this._components[change.id]) {
                        el.innerHTML = change.render(this.context.c);
                    }
                });
            }
            if (!this.firstRenderUniqueCb[key]) {
                this.firstRenderUniqueCb[key] = () => {
                    for (const el of this._components[change.id]) {
                        el.innerHTML = change.render(this.context.c);
                    }
                };
            }
        }
        else if (change.isBool) {
            this.context.addChange(name, () => {
                for (const el of this._components[change.id]) {
                    if (this.context.c[name]) {
                        el.setAttribute(change.attrName, "true");
                    }
                    else {
                        el.removeAttribute(change.attrName);
                    }
                }
            });
            if (!this.firstRenderUniqueCb[key]) {
                this.firstRenderUniqueCb[key] = () => {
                    for (const el of this._components[change.id]) {
                        if (this.context.c[name]) {
                            el.setAttribute(change.attrName, "true");
                        }
                        else {
                            el.removeAttribute(change.attrName);
                        }
                    }
                };
            }
        }
        else {
            if (change.path) {
                this.context.addChange(name, (path) => {
                    if (WebComponentTemplate.validatePath(path, change.path)) {
                        for (const el of this._components[change.id]) {
                            el.setAttribute(change.attrName, change.render(this.context.c));
                        }
                    }
                });
            }
            else {
                this.context.addChange(name, (path) => {
                    for (const el of this._components[change.id]) {
                        el.setAttribute(change.attrName, change.render(this.context.c));
                    }
                });
            }
            if (!this.firstRenderUniqueCb[key]) {
                this.firstRenderUniqueCb[key] = () => {
                    for (const el of this._components[change.id]) {
                        el.setAttribute(change.attrName, change.render(this.context.c));
                    }
                };
            }
        }
    }
    transformInjectionAction(name, injection) {
        if (injection.path) {
            this.context.addChange(name, (path) => {
                if (WebComponentTemplate.validatePath(path, injection.path)) {
                    for (const el of this._components[injection.id]) {
                        el[injection.injectionName] = injection.inject(this.context.c);
                    }
                }
            });
        }
        else {
            this.context.addChange(name, (path) => {
                for (const el of this._components[injection.id]) {
                    el[injection.injectionName] = injection.inject(this.context.c);
                }
            });
        }
        this.firstRenderCb.push(() => {
            for (const el of this._components[injection.id]) {
                el[injection.injectionName] = injection.inject(this.context.c);
            }
        });
    }
    transformBindigAction(name, binding) {
        if (binding.path) {
            this.context.addChange(name, (path) => {
                if (WebComponentTemplate.validatePath(path, binding.path)) {
                    let valueToSet = WebComponentTemplate.getValueFromItem(binding.path, this.context.c);
                    for (const el of this._components[binding.id]) {
                        WebComponentTemplate.setValueToItem(binding.valueName, el, valueToSet);
                    }
                }
            });
        }
        else {
            binding.path = name;
            this.context.addChange(name, (path) => {
                let valueToSet = WebComponentTemplate.getValueFromItem(binding.path, this.context.c);
                for (const el of this._components[binding.id]) {
                    WebComponentTemplate.setValueToItem(binding.valueName, el, valueToSet);
                }
            });
        }
        if (binding.isCallback) {
            this.firstRenderCb.push(() => {
                for (var el of this._components[binding.id]) {
                    for (let fct of binding.eventNames) {
                        let cb = WebComponentTemplate.getValueFromItem(fct, el);
                        cb?.add((value) => {
                            WebComponentTemplate.setValueToItem(binding.path, this.context.c, value);
                        });
                    }
                    let valueToSet = WebComponentTemplate.getValueFromItem(binding.path, this.context.c);
                    WebComponentTemplate.setValueToItem(binding.valueName, el, valueToSet);
                }
            });
        }
        else {
            this.firstRenderCb.push(() => {
                for (var el of this._components[binding.id]) {
                    for (let fct of binding.eventNames) {
                        el.addEventListener(fct, (e) => {
                            let valueToSet = WebComponentTemplate.getValueFromItem(binding.valueName, e.target);
                            WebComponentTemplate.setValueToItem(binding.path, this.context.c, valueToSet);
                        });
                    }
                    let valueToSet = WebComponentTemplate.getValueFromItem(binding.path, this.context.c);
                    WebComponentTemplate.setValueToItem(binding.valueName, el, valueToSet);
                }
            });
        }
    }
    renderSubTemplate() {
        for (let loop of this.loops) {
            let localContext = JSON.parse(JSON.stringify(this.context.schema));
            localContext.loops.push({
                data: loop.data,
                index: loop.index,
                item: loop.item
            });
            this.renderLoop(loop, localContext);
            this.registerLoopWatchEvent(loop, localContext);
        }
    }
    renderLoop(loop, localContext) {
        if (this.loopRegisteries[loop.anchorId]) {
            for (let item of this.loopRegisteries[loop.anchorId]) {
                item.destructor();
            }
        }
        this.loopRegisteries[loop.anchorId] = [];
        let result = WebComponentTemplate.getValueFromItem(loop.data, this.context.c);
        let anchor = this._components[loop.anchorId][0];
        for (let i = 0; i < result.length; i++) {
            let context = new WebComponentTemplateContext(this.component, localContext, [{ name: loop.index, value: i }]);
            let content = loop.template.template.content.cloneNode(true);
            let actions = loop.template.actions;
            let instance = new WebComponentTemplateInstance(context, content, actions, this.component, loop.template.loops);
            instance.render();
            anchor.parentNode.insertBefore(instance.content, anchor);
            this.loopRegisteries[loop.anchorId].push(instance);
        }
    }
    registerLoopWatchEvent(loop, localContext) {
        let fullPath = loop.data;
        let watchName = fullPath.split(".")[0];
        if (!this.component['__watchActions'][watchName]) {
            this.component['__watchActions'][watchName] = [];
        }
        let regex = new RegExp(fullPath.replace(/\./g, "\\.") + "\\[(\\d+?)\\]$");
        this.component['__watchActions'][watchName].push((element, action, path, value) => {
            if (path == fullPath) {
                this.renderLoop(loop, localContext);
                return;
            }
            regex.lastIndex = 0;
            let result = regex.exec(path);
            if (result) {
                let registry = this.loopRegisteries[loop.anchorId];
                let index = Number(result[1]);
                if (action == WatchAction.CREATED) {
                    let context = new WebComponentTemplateContext(this.component, localContext, [{ name: loop.index, value: index }]);
                    let content = loop.template.template.content.cloneNode(true);
                    let actions = loop.template.actions;
                    let instance = new WebComponentTemplateInstance(context, content, actions, this.component, loop.template.loops);
                    instance.render();
                    let anchor;
                    if (index < registry.length) {
                        anchor = registry[index].firstChild;
                    }
                    else {
                        anchor = this._components[loop.anchorId][0];
                    }
                    anchor.parentNode.insertBefore(instance.content, anchor);
                    registry.splice(index, 0, instance);
                    for (let i = index + 1; i < registry.length; i++) {
                        registry[i].context.c[loop.index] = registry[i].context.c[loop.index] + 1;
                    }
                }
                else if (action == WatchAction.UPDATED) {
                    registry[index].render();
                }
                else if (action == WatchAction.DELETED) {
                    registry[index].destructor();
                    registry.splice(index, 1);
                    for (let i = index; i < registry.length; i++) {
                        registry[i].context.c[loop.index] = registry[i].context.c[loop.index] - 1;
                    }
                }
            }
        });
    }
}

class ResourceLoader {
    static headerLoaded = {};
    static headerWaiting = {};
    /**
     * Load the resource inside the head tag
     */
    static async loadInHead(options) {
        const _options = this.prepareOptions(options);
        if (this.headerLoaded[_options.url]) {
            return true;
        }
        else if (this.headerWaiting.hasOwnProperty(_options.url)) {
            return await this.awaitFctHead(_options.url);
        }
        else {
            this.headerWaiting[_options.url] = [];
            let tagEl;
            if (_options.type == "js") {
                tagEl = document.createElement("SCRIPT");
            }
            else if (_options.type == "css") {
                tagEl = document.createElement("LINK");
                tagEl.setAttribute("rel", "stylesheet");
            }
            else {
                throw "unknow type " + _options.type + " to append into head";
            }
            document.head.appendChild(tagEl);
            let result = await this.loadTag(tagEl, _options.url);
            this.headerLoaded[_options.url] = true;
            this.releaseAwaitFctHead(_options.url, result);
            return result;
        }
    }
    static loadTag(tagEl, url) {
        return new Promise((resolve, reject) => {
            tagEl.addEventListener("load", (e) => {
                resolve(true);
            });
            tagEl.addEventListener("error", (e) => {
                resolve(false);
            });
            if (tagEl instanceof HTMLLinkElement) {
                tagEl.setAttribute("href", url);
            }
            else {
                tagEl.setAttribute('src', url);
            }
        });
    }
    static releaseAwaitFctHead(url, result) {
        if (this.headerWaiting[url]) {
            for (let i = 0; i < this.headerWaiting[url].length; i++) {
                this.headerWaiting[url][i](result);
            }
            delete this.headerWaiting[url];
        }
    }
    static awaitFctHead(url) {
        return new Promise((resolve) => {
            this.headerWaiting[url].push((result) => {
                resolve(result);
            });
        });
    }
    static requestLoaded = {};
    static requestWaiting = {};
    /**
     *
    */
    static async load(options) {
        options = this.prepareOptions(options);
        if (this.requestLoaded[options.url]) {
            return this.requestLoaded[options.url];
        }
        else if (this.requestWaiting.hasOwnProperty(options.url)) {
            await this.awaitFct(options.url);
            return this.requestLoaded[options.url];
        }
        else {
            this.requestWaiting[options.url] = [];
            let blob = false;
            if (options.type == "img") {
                blob = true;
            }
            let content = await this.fetching(options.url, blob);
            this.requestLoaded[options.url] = content;
            this.releaseAwaitFct(options.url);
            return content;
        }
    }
    static releaseAwaitFct(url) {
        if (this.requestWaiting[url]) {
            for (let i = 0; i < this.requestWaiting[url].length; i++) {
                this.requestWaiting[url][i]();
            }
            delete this.requestWaiting[url];
        }
    }
    static awaitFct(url) {
        return new Promise((resolve) => {
            this.requestWaiting[url].push(() => {
                resolve('');
            });
        });
    }
    static async fetching(url, useBlob = false) {
        if (useBlob) {
            let result = await fetch(url, {
                headers: {
                    responseType: 'blob'
                }
            });
            let blob = await result.blob();
            return await this.readFile(blob);
        }
        else {
            let result = await fetch(url);
            return await result.text();
        }
    }
    static readFile(blob) {
        return new Promise((resolve) => {
            var reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });
    }
    static imgExtensions = ["png", "jpg", "jpeg", "gif"];
    static prepareOptions(options) {
        let result;
        if (typeof options === 'string' || options instanceof String) {
            result = {
                url: options,
                type: 'js'
            };
            let splittedURI = result.url.split('.');
            let extension = splittedURI[splittedURI.length - 1];
            extension = extension.split("?")[0];
            if (extension == "svg") {
                result.type = 'svg';
            }
            else if (extension == "js") {
                result.type = 'js';
            }
            else if (extension == "css") {
                result.type = 'css';
            }
            else if (this.imgExtensions.indexOf(extension) != -1) {
                result.type = 'img';
            }
            else {
                throw 'unknow extension found :' + extension + ". Please define your extension inside options";
            }
        }
        else {
            result = options;
        }
        return result;
    }
}

class ResizeObserver {
    callback;
    targets;
    fpsInterval;
    nextFrame;
    entriesChangedEvent;
    willTrigger;
    static resizeObserverClassByObject = {};
    static uniqueInstance;
    static getUniqueInstance() {
        if (!ResizeObserver.uniqueInstance) {
            ResizeObserver.uniqueInstance = new window.ResizeObserver(entries => {
                let allClasses = [];
                for (let j = 0; j < entries.length; j++) {
                    let entry = entries[j];
                    let index = entry.target['sourceIndex'];
                    if (ResizeObserver.resizeObserverClassByObject[index]) {
                        for (let i = 0; i < ResizeObserver.resizeObserverClassByObject[index].length; i++) {
                            let classTemp = ResizeObserver.resizeObserverClassByObject[index][i];
                            classTemp.entryChanged(entry);
                            if (allClasses.indexOf(classTemp) == -1) {
                                allClasses.push(classTemp);
                            }
                        }
                    }
                }
                for (let i = 0; i < allClasses.length; i++) {
                    allClasses[i].triggerCb();
                }
            });
        }
        return ResizeObserver.uniqueInstance;
    }
    constructor(options) {
        let realOption;
        if (options instanceof Function) {
            realOption = {
                callback: options,
            };
        }
        else {
            realOption = options;
        }
        this.callback = realOption.callback;
        this.targets = [];
        if (!realOption.fps) {
            realOption.fps = 60;
        }
        if (realOption.fps != -1) {
            this.fpsInterval = 1000 / realOption.fps;
        }
        this.nextFrame = 0;
        this.entriesChangedEvent = {};
        this.willTrigger = false;
    }
    /**
     * Observe size changing for the element
     */
    observe(target) {
        if (!target["sourceIndex"]) {
            target["sourceIndex"] = Math.random().toString(36);
            this.targets.push(target);
            ResizeObserver.resizeObserverClassByObject[target["sourceIndex"]] = [];
            ResizeObserver.getUniqueInstance().observe(target);
        }
        if (ResizeObserver.resizeObserverClassByObject[target["sourceIndex"]].indexOf(this) == -1) {
            ResizeObserver.resizeObserverClassByObject[target["sourceIndex"]].push(this);
        }
    }
    /**
     * Stop observing size changing for the element
     */
    unobserve(target) {
        for (let i = 0; this.targets.length; i++) {
            let tempTarget = this.targets[i];
            if (tempTarget == target) {
                let position = ResizeObserver.resizeObserverClassByObject[target['sourceIndex']].indexOf(this);
                if (position != -1) {
                    ResizeObserver.resizeObserverClassByObject[target['sourceIndex']].splice(position, 1);
                }
                if (ResizeObserver.resizeObserverClassByObject[target['sourceIndex']].length == 0) {
                    delete ResizeObserver.resizeObserverClassByObject[target['sourceIndex']];
                }
                ResizeObserver.getUniqueInstance().unobserve(target);
                this.targets.splice(i, 1);
                return;
            }
        }
    }
    /**
     * Destroy the resize observer
     */
    disconnect() {
        for (let i = 0; this.targets.length; i++) {
            this.unobserve(this.targets[i]);
        }
    }
    entryChanged(entry) {
        let index = entry.target.sourceIndex;
        this.entriesChangedEvent[index] = entry;
    }
    triggerCb() {
        if (!this.willTrigger) {
            this.willTrigger = true;
            this._triggerCb();
        }
    }
    _triggerCb() {
        let now = window.performance.now();
        let elapsed = now - this.nextFrame;
        if (this.fpsInterval != -1 && elapsed <= this.fpsInterval) {
            requestAnimationFrame(() => {
                this._triggerCb();
            });
            return;
        }
        this.nextFrame = now - (elapsed % this.fpsInterval);
        let changed = Object.values(this.entriesChangedEvent);
        this.entriesChangedEvent = {};
        this.willTrigger = false;
        setTimeout(() => {
            this.callback(changed);
        }, 0);
    }
}

class DragAndDrop {
    /**
     * Default offset before drag element
     */
    static defaultOffsetDrag = 20;
    pressManager;
    options;
    startCursorPosition;
    startElementPosition;
    isEnable = true;
    constructor(options) {
        this.options = this.getDefaultOptions();
        this.mergeProperties(options);
        this.mergeFunctions(options);
        this.init();
    }
    getDefaultOptions() {
        return {
            applyDrag: true,
            element: null,
            elementTrigger: null,
            offsetDrag: DragAndDrop.defaultOffsetDrag,
            shadow: {
                enable: false,
                container: document.body,
                removeOnStop: true,
                transform: () => { }
            },
            strict: false,
            targets: [],
            usePercent: false,
            isDragEnable: () => true,
            getZoom: () => 1,
            getOffsetX: () => 0,
            getOffsetY: () => 0,
            onPointerDown: (e) => { },
            onPointerUp: (e) => { },
            onStart: (e) => { },
            onMove: (e) => { },
            onStop: (e) => { },
            onDrop: (element, targets) => { }
        };
    }
    mergeProperties(options) {
        if (options.element === void 0) {
            throw "You must define the element for the drag&drop";
        }
        this.options.element = options.element;
        if (options.elementTrigger === void 0) {
            this.options.elementTrigger = this.options.element;
        }
        else {
            this.options.elementTrigger = options.elementTrigger;
        }
        this.defaultMerge(options, "applyDrag");
        this.defaultMerge(options, "offsetDrag");
        this.defaultMerge(options, "strict");
        this.defaultMerge(options, "targets");
        this.defaultMerge(options, "usePercent");
        if (options.shadow !== void 0) {
            this.options.shadow.enable = options.shadow.enable;
            if (options.shadow.container !== void 0) {
                this.options.shadow.container = options.shadow.container;
            }
            else {
                this.options.shadow.container = document.body;
            }
            if (options.shadow.removeOnStop !== void 0) {
                this.options.shadow.removeOnStop = options.shadow.removeOnStop;
            }
            if (options.shadow.transform !== void 0) {
                this.options.shadow.transform = options.shadow.transform;
            }
        }
    }
    mergeFunctions(options) {
        this.defaultMerge(options, "isDragEnable");
        this.defaultMerge(options, "getZoom");
        this.defaultMerge(options, "getOffsetX");
        this.defaultMerge(options, "getOffsetY");
        this.defaultMerge(options, "onPointerDown");
        this.defaultMerge(options, "onPointerUp");
        this.defaultMerge(options, "onStart");
        this.defaultMerge(options, "onMove");
        this.defaultMerge(options, "onStop");
        this.defaultMerge(options, "onDrop");
    }
    defaultMerge(options, name) {
        if (options[name] !== void 0) {
            this.options[name] = options[name];
        }
    }
    init() {
        this.pressManager = new PressManager({
            element: this.options.elementTrigger,
            onPressStart: this.onPressStart.bind(this),
            onPressEnd: this.onPressEnd.bind(this),
            onDragStart: this.onDragStart.bind(this),
            onDrag: this.onDrag.bind(this),
            onDragEnd: this.onDragEnd.bind(this),
            offsetDrag: this.options.offsetDrag
        });
    }
    draggableElement;
    positionShadowRelativeToElement;
    onPressStart(e) {
        this.options.onPointerDown(e);
    }
    onPressEnd(e) {
        this.options.onPointerUp(e);
    }
    onDragStart(e) {
        this.isEnable = this.options.isDragEnable();
        if (!this.isEnable) {
            return;
        }
        this.draggableElement = this.options.element;
        this.startCursorPosition = {
            x: e.pageX,
            y: e.pageY
        };
        this.startElementPosition = {
            x: this.draggableElement.offsetLeft,
            y: this.draggableElement.offsetTop
        };
        if (this.options.shadow.enable) {
            this.draggableElement = this.options.element.cloneNode(true);
            let elBox = this.options.element.getBoundingClientRect();
            let containerBox = this.options.shadow.container.getBoundingClientRect();
            this.positionShadowRelativeToElement = {
                x: elBox.x - containerBox.x,
                y: elBox.y - containerBox.y
            };
            if (this.options.applyDrag) {
                this.draggableElement.style.position = "absolute";
                this.draggableElement.style.top = this.positionShadowRelativeToElement.y + this.options.getOffsetY() + 'px';
                this.draggableElement.style.left = this.positionShadowRelativeToElement.x + this.options.getOffsetX() + 'px';
            }
            this.options.shadow.transform(this.draggableElement);
            this.options.shadow.container.appendChild(this.draggableElement);
        }
        this.options.onStart(e);
    }
    onDrag(e) {
        if (!this.isEnable) {
            return;
        }
        let zoom = this.options.getZoom();
        let diff = {
            x: 0,
            y: 0
        };
        if (this.options.shadow.enable) {
            diff = {
                x: (e.pageX - this.startCursorPosition.x) + this.positionShadowRelativeToElement.x + this.options.getOffsetX(),
                y: (e.pageY - this.startCursorPosition.y) + this.positionShadowRelativeToElement.y + this.options.getOffsetY(),
            };
        }
        else {
            diff = {
                x: (e.pageX - this.startCursorPosition.x) / zoom + this.startElementPosition.x + this.options.getOffsetX(),
                y: (e.pageY - this.startCursorPosition.y) / zoom + this.startElementPosition.y + this.options.getOffsetY()
            };
        }
        let newPos = this.setPosition(diff);
        this.options.onMove(e, newPos);
    }
    onDragEnd(e) {
        if (!this.isEnable) {
            return;
        }
        let targets = this.getMatchingTargets();
        if (this.options.shadow.enable && this.options.shadow.removeOnStop) {
            this.draggableElement.parentNode?.removeChild(this.draggableElement);
        }
        if (targets.length > 0) {
            this.options.onDrop(this.draggableElement, targets);
        }
        this.options.onStop(e);
    }
    setPosition(position) {
        if (this.options.usePercent) {
            let elementParent = this.draggableElement.offsetParent;
            const percentLeft = (position.x / elementParent.offsetWidth) * 100;
            const percentTop = (position.y / elementParent.offsetHeight) * 100;
            if (this.options.applyDrag) {
                this.draggableElement.style.left = percentLeft + '%';
                this.draggableElement.style.top = percentTop + '%';
            }
            return {
                x: percentLeft,
                y: percentTop
            };
        }
        else {
            if (this.options.applyDrag) {
                this.draggableElement.style.left = position.x + 'px';
                this.draggableElement.style.top = position.y + 'px';
            }
        }
        return position;
    }
    /**
     * Get targets within the current element position is matching
     */
    getMatchingTargets() {
        let matchingTargets = [];
        for (let target of this.options.targets) {
            const elementCoordinates = this.draggableElement.getBoundingClientRect();
            const targetCoordinates = target.getBoundingClientRect();
            let offsetX = this.options.getOffsetX();
            let offsetY = this.options.getOffsetY();
            let zoom = this.options.getZoom();
            targetCoordinates.x += offsetX;
            targetCoordinates.y += offsetY;
            targetCoordinates.width *= zoom;
            targetCoordinates.height *= zoom;
            if (this.options.strict) {
                if ((elementCoordinates.x >= targetCoordinates.x && elementCoordinates.x + elementCoordinates.width <= targetCoordinates.x + targetCoordinates.width) &&
                    (elementCoordinates.y >= targetCoordinates.y && elementCoordinates.y + elementCoordinates.height <= targetCoordinates.y + targetCoordinates.height)) {
                    matchingTargets.push(target);
                }
            }
            else {
                let elementLeft = elementCoordinates.x;
                let elementRight = elementCoordinates.x + elementCoordinates.width;
                let elementTop = elementCoordinates.y;
                let elementBottom = elementCoordinates.y + elementCoordinates.height;
                let targetLeft = targetCoordinates.x;
                let targetRight = targetCoordinates.x + targetCoordinates.width;
                let targetTop = targetCoordinates.y;
                let targetBottom = targetCoordinates.y + targetCoordinates.height;
                if (!(elementRight < targetLeft ||
                    elementLeft > targetRight ||
                    elementBottom < targetTop ||
                    elementTop > targetBottom)) {
                    matchingTargets.push(target);
                }
            }
        }
        return matchingTargets;
    }
    /**
     * Get element currently dragging
     */
    getElementDrag() {
        return this.draggableElement;
    }
    /**
     * Set targets where to drop
     */
    setTargets(targets) {
        this.options.targets = targets;
    }
    /**
     * Destroy the current drag&drop instance
     */
    destroy() {
        this.pressManager.destroy();
    }
}

class Animation {
    /**
     * Default FPS for all Animation if not set inside options
     */
    static FPS_DEFAULT = 60;
    options;
    nextFrame;
    fpsInterval;
    continueAnimation = false;
    constructor(options) {
        if (!options.animate) {
            options.animate = () => { };
        }
        if (!options.stopped) {
            options.stopped = () => { };
        }
        if (!options.fps) {
            options.fps = Animation.FPS_DEFAULT;
        }
        this.options = options;
        this.fpsInterval = 1000 / this.options.fps;
    }
    animate() {
        let now = window.performance.now();
        let elapsed = now - this.nextFrame;
        if (elapsed <= this.fpsInterval) {
            requestAnimationFrame(() => this.animate());
            return;
        }
        this.nextFrame = now - (elapsed % this.fpsInterval);
        setTimeout(() => {
            this.options.animate();
        }, 0);
        if (this.continueAnimation) {
            requestAnimationFrame(() => this.animate());
        }
        else {
            this.options.stopped();
        }
    }
    /**
     * Start the of animation
     */
    start() {
        if (this.continueAnimation == false) {
            this.continueAnimation = true;
            this.nextFrame = window.performance.now();
            this.animate();
        }
    }
    /**
     * Stop the animation
     */
    stop() {
        this.continueAnimation = false;
    }
    /**
     * Get the FPS
     */
    getFPS() {
        return this.options.fps;
    }
    /**
     * Set the FPS
     */
    setFPS(fps) {
        this.options.fps = fps;
        this.fpsInterval = 1000 / this.options.fps;
    }
    /**
     * Get the animation status (true if animation is running)
     */
    isStarted() {
        return this.continueAnimation;
    }
}
sleep.Namespace='Aventus';
Aventus.sleep=sleep;
WebComponentInstance.Namespace='Aventus';
Aventus.WebComponentInstance=WebComponentInstance;
ElementExtension.Namespace='Aventus';
Aventus.ElementExtension=ElementExtension;
Instance.Namespace='Aventus';
Aventus.Instance=Instance;
Style.Namespace='Aventus';
Aventus.Style=Style;
WebComponent.Namespace='Aventus';
Aventus.WebComponent=WebComponent;
Callback.Namespace='Aventus';
Aventus.Callback=Callback;
StateManager.Namespace='Aventus';
Aventus.StateManager=StateManager;
WatchAction.Namespace='Aventus';
Aventus.WatchAction=WatchAction;
Watcher.Namespace='Aventus';
Aventus.Watcher=Watcher;
PressManager.Namespace='Aventus';
Aventus.PressManager=PressManager;
State.Namespace='Aventus';
Aventus.State=State;
EmptyState.Namespace='Aventus';
Aventus.EmptyState=EmptyState;
WebComponentTemplate.Namespace='Aventus';
Aventus.WebComponentTemplate=WebComponentTemplate;
WebComponentTemplateContext.Namespace='Aventus';
Aventus.WebComponentTemplateContext=WebComponentTemplateContext;
WebComponentTemplateInstance.Namespace='Aventus';
Aventus.WebComponentTemplateInstance=WebComponentTemplateInstance;
ResourceLoader.Namespace='Aventus';
Aventus.ResourceLoader=ResourceLoader;
ResizeObserver.Namespace='Aventus';
Aventus.ResizeObserver=ResizeObserver;
DragAndDrop.Namespace='Aventus';
Aventus.DragAndDrop=DragAndDrop;
Animation.Namespace='Aventus';
Aventus.Animation=Animation;
})(Aventus);

var Aventus;
(Aventus||(Aventus = {}));
(function (Aventus) {
const moduleName = `Aventus`;

class DynamicCol extends Aventus.WebComponent {
    get 'size'() {
                    return Number(this.getAttribute('size'));
                }
                set 'size'(val) {
                    if(val === undefined || val === null){this.removeAttribute('size')}
                    else{this.setAttribute('size',val)}
                }get 'size_xs'() {
                    return Number(this.getAttribute('size_xs'));
                }
                set 'size_xs'(val) {
                    if(val === undefined || val === null){this.removeAttribute('size_xs')}
                    else{this.setAttribute('size_xs',val)}
                }get 'size_sm'() {
                    return Number(this.getAttribute('size_sm'));
                }
                set 'size_sm'(val) {
                    if(val === undefined || val === null){this.removeAttribute('size_sm')}
                    else{this.setAttribute('size_sm',val)}
                }get 'size_md'() {
                    return Number(this.getAttribute('size_md'));
                }
                set 'size_md'(val) {
                    if(val === undefined || val === null){this.removeAttribute('size_md')}
                    else{this.setAttribute('size_md',val)}
                }get 'size_lg'() {
                    return Number(this.getAttribute('size_lg'));
                }
                set 'size_lg'(val) {
                    if(val === undefined || val === null){this.removeAttribute('size_lg')}
                    else{this.setAttribute('size_lg',val)}
                }get 'size_xl'() {
                    return Number(this.getAttribute('size_xl'));
                }
                set 'size_xl'(val) {
                    if(val === undefined || val === null){this.removeAttribute('size_xl')}
                    else{this.setAttribute('size_xl',val)}
                }get 'offset'() {
                    return Number(this.getAttribute('offset'));
                }
                set 'offset'(val) {
                    if(val === undefined || val === null){this.removeAttribute('offset')}
                    else{this.setAttribute('offset',val)}
                }get 'offset_xs'() {
                    return Number(this.getAttribute('offset_xs'));
                }
                set 'offset_xs'(val) {
                    if(val === undefined || val === null){this.removeAttribute('offset_xs')}
                    else{this.setAttribute('offset_xs',val)}
                }get 'offset_sm'() {
                    return Number(this.getAttribute('offset_sm'));
                }
                set 'offset_sm'(val) {
                    if(val === undefined || val === null){this.removeAttribute('offset_sm')}
                    else{this.setAttribute('offset_sm',val)}
                }get 'offset_md'() {
                    return Number(this.getAttribute('offset_md'));
                }
                set 'offset_md'(val) {
                    if(val === undefined || val === null){this.removeAttribute('offset_md')}
                    else{this.setAttribute('offset_md',val)}
                }get 'offset_lg'() {
                    return Number(this.getAttribute('offset_lg'));
                }
                set 'offset_lg'(val) {
                    if(val === undefined || val === null){this.removeAttribute('offset_lg')}
                    else{this.setAttribute('offset_lg',val)}
                }get 'offset_xl'() {
                    return Number(this.getAttribute('offset_xl'));
                }
                set 'offset_xl'(val) {
                    if(val === undefined || val === null){this.removeAttribute('offset_xl')}
                    else{this.setAttribute('offset_xl',val)}
                }get 'offset_right'() {
                    return Number(this.getAttribute('offset_right'));
                }
                set 'offset_right'(val) {
                    if(val === undefined || val === null){this.removeAttribute('offset_right')}
                    else{this.setAttribute('offset_right',val)}
                }get 'offset_right_xs'() {
                    return Number(this.getAttribute('offset_right_xs'));
                }
                set 'offset_right_xs'(val) {
                    if(val === undefined || val === null){this.removeAttribute('offset_right_xs')}
                    else{this.setAttribute('offset_right_xs',val)}
                }get 'offset_right_sm'() {
                    return Number(this.getAttribute('offset_right_sm'));
                }
                set 'offset_right_sm'(val) {
                    if(val === undefined || val === null){this.removeAttribute('offset_right_sm')}
                    else{this.setAttribute('offset_right_sm',val)}
                }get 'offset_right_md'() {
                    return Number(this.getAttribute('offset_right_md'));
                }
                set 'offset_right_md'(val) {
                    if(val === undefined || val === null){this.removeAttribute('offset_right_md')}
                    else{this.setAttribute('offset_right_md',val)}
                }get 'offset_right_lg'() {
                    return Number(this.getAttribute('offset_right_lg'));
                }
                set 'offset_right_lg'(val) {
                    if(val === undefined || val === null){this.removeAttribute('offset_right_lg')}
                    else{this.setAttribute('offset_right_lg',val)}
                }get 'offset_right_xl'() {
                    return Number(this.getAttribute('offset_right_xl'));
                }
                set 'offset_right_xl'(val) {
                    if(val === undefined || val === null){this.removeAttribute('offset_right_xl')}
                    else{this.setAttribute('offset_right_xl',val)}
                }get 'nobreak'() {
                return this.hasAttribute('nobreak');
            }
            set 'nobreak'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('nobreak', 'true');
                } else{
                    this.removeAttribute('nobreak');
                }
            }get 'center'() {
                return this.hasAttribute('center');
            }
            set 'center'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('center', 'true');
                } else{
                    this.removeAttribute('center');
                }
            }    static __style = `:host{display:flex;flex-direction:column;padding:0 10px;width:100%;margin-left:0;margin-right:0}:host([nobreak]){white-space:nowrap;text-overflow:ellipsis;overflow:hidden}:host([center]){text-align:center}:host([size="0"]){width:0%;display:flex}:host([offset="0"]){margin-left:0%}:host([offset-right="0"]){margin-right:0%}:host([size="1"]){width:8.3333333333%;display:flex}:host([offset="1"]){margin-left:8.3333333333%}:host([offset-right="1"]){margin-right:8.3333333333%}:host([size="2"]){width:16.6666666667%;display:flex}:host([offset="2"]){margin-left:16.6666666667%}:host([offset-right="2"]){margin-right:16.6666666667%}:host([size="3"]){width:25%;display:flex}:host([offset="3"]){margin-left:25%}:host([offset-right="3"]){margin-right:25%}:host([size="4"]){width:33.3333333333%;display:flex}:host([offset="4"]){margin-left:33.3333333333%}:host([offset-right="4"]){margin-right:33.3333333333%}:host([size="5"]){width:41.6666666667%;display:flex}:host([offset="5"]){margin-left:41.6666666667%}:host([offset-right="5"]){margin-right:41.6666666667%}:host([size="6"]){width:50%;display:flex}:host([offset="6"]){margin-left:50%}:host([offset-right="6"]){margin-right:50%}:host([size="7"]){width:58.3333333333%;display:flex}:host([offset="7"]){margin-left:58.3333333333%}:host([offset-right="7"]){margin-right:58.3333333333%}:host([size="8"]){width:66.6666666667%;display:flex}:host([offset="8"]){margin-left:66.6666666667%}:host([offset-right="8"]){margin-right:66.6666666667%}:host([size="9"]){width:75%;display:flex}:host([offset="9"]){margin-left:75%}:host([offset-right="9"]){margin-right:75%}:host([size="10"]){width:83.3333333333%;display:flex}:host([offset="10"]){margin-left:83.3333333333%}:host([offset-right="10"]){margin-right:83.3333333333%}:host([size="11"]){width:91.6666666667%;display:flex}:host([offset="11"]){margin-left:91.6666666667%}:host([offset-right="11"]){margin-right:91.6666666667%}:host([size="12"]){width:100%;display:flex}:host([offset="12"]){margin-left:100%}:host([offset-right="12"]){margin-right:100%}`;
    __getStatic() {
        return DynamicCol;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DynamicCol.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "DynamicCol";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('size')){ this['size'] = undefined; }if(!this.hasAttribute('size_xs')){ this['size_xs'] = undefined; }if(!this.hasAttribute('size_sm')){ this['size_sm'] = undefined; }if(!this.hasAttribute('size_md')){ this['size_md'] = undefined; }if(!this.hasAttribute('size_lg')){ this['size_lg'] = undefined; }if(!this.hasAttribute('size_xl')){ this['size_xl'] = undefined; }if(!this.hasAttribute('offset')){ this['offset'] = undefined; }if(!this.hasAttribute('offset_xs')){ this['offset_xs'] = undefined; }if(!this.hasAttribute('offset_sm')){ this['offset_sm'] = undefined; }if(!this.hasAttribute('offset_md')){ this['offset_md'] = undefined; }if(!this.hasAttribute('offset_lg')){ this['offset_lg'] = undefined; }if(!this.hasAttribute('offset_xl')){ this['offset_xl'] = undefined; }if(!this.hasAttribute('offset_right')){ this['offset_right'] = undefined; }if(!this.hasAttribute('offset_right_xs')){ this['offset_right_xs'] = undefined; }if(!this.hasAttribute('offset_right_sm')){ this['offset_right_sm'] = undefined; }if(!this.hasAttribute('offset_right_md')){ this['offset_right_md'] = undefined; }if(!this.hasAttribute('offset_right_lg')){ this['offset_right_lg'] = undefined; }if(!this.hasAttribute('offset_right_xl')){ this['offset_right_xl'] = undefined; }if(!this.hasAttribute('nobreak')) { this.attributeChangedCallback('nobreak', false, false); }if(!this.hasAttribute('center')) { this.attributeChangedCallback('center', false, false); } }
    __listBoolProps() { return ["nobreak","center"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
}
window.customElements.define('av-dynamic-col', DynamicCol);Aventus.WebComponentInstance.registerDefinition(DynamicCol);

class DynamicRow extends Aventus.WebComponent {
    get 'max_width'() {
                    return this.getAttribute('max_width');
                }
                set 'max_width'(val) {
                    if(val === undefined || val === null){this.removeAttribute('max_width')}
                    else{this.setAttribute('max_width',val)}
                }    sizes = { "xs": 300, "sm": 540, "md": 720, "lg": 960, "xl": 1140 };
    static __style = `:host{display:flex;flex-wrap:wrap;flex-direction:row;width:100%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_xs="0"]){margin-left:0%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_right_xs="0"]){margin-right:0%}:host([max_width=""]) ::slotted(av-dynamic-col[size_xs="0"]){width:0%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_xs="1"]){margin-left:8.3333333333%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_right_xs="1"]){margin-right:8.3333333333%}:host([max_width=""]) ::slotted(av-dynamic-col[size_xs="1"]){width:8.3333333333%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_xs="2"]){margin-left:16.6666666667%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_right_xs="2"]){margin-right:16.6666666667%}:host([max_width=""]) ::slotted(av-dynamic-col[size_xs="2"]){width:16.6666666667%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_xs="3"]){margin-left:25%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_right_xs="3"]){margin-right:25%}:host([max_width=""]) ::slotted(av-dynamic-col[size_xs="3"]){width:25%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_xs="4"]){margin-left:33.3333333333%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_right_xs="4"]){margin-right:33.3333333333%}:host([max_width=""]) ::slotted(av-dynamic-col[size_xs="4"]){width:33.3333333333%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_xs="5"]){margin-left:41.6666666667%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_right_xs="5"]){margin-right:41.6666666667%}:host([max_width=""]) ::slotted(av-dynamic-col[size_xs="5"]){width:41.6666666667%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_xs="6"]){margin-left:50%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_right_xs="6"]){margin-right:50%}:host([max_width=""]) ::slotted(av-dynamic-col[size_xs="6"]){width:50%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_xs="7"]){margin-left:58.3333333333%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_right_xs="7"]){margin-right:58.3333333333%}:host([max_width=""]) ::slotted(av-dynamic-col[size_xs="7"]){width:58.3333333333%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_xs="8"]){margin-left:66.6666666667%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_right_xs="8"]){margin-right:66.6666666667%}:host([max_width=""]) ::slotted(av-dynamic-col[size_xs="8"]){width:66.6666666667%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_xs="9"]){margin-left:75%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_right_xs="9"]){margin-right:75%}:host([max_width=""]) ::slotted(av-dynamic-col[size_xs="9"]){width:75%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_xs="10"]){margin-left:83.3333333333%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_right_xs="10"]){margin-right:83.3333333333%}:host([max_width=""]) ::slotted(av-dynamic-col[size_xs="10"]){width:83.3333333333%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_xs="11"]){margin-left:91.6666666667%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_right_xs="11"]){margin-right:91.6666666667%}:host([max_width=""]) ::slotted(av-dynamic-col[size_xs="11"]){width:91.6666666667%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_xs="12"]){margin-left:100%}:host([max_width=""]) ::slotted(av-dynamic-col[offset_right_xs="12"]){margin-right:100%}:host([max_width=""]) ::slotted(av-dynamic-col[size_xs="12"]){width:100%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_xs="0"]){margin-left:0%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_right_xs="0"]){margin-right:0%}:host([max_width~=xs]) ::slotted(av-dynamic-col[size_xs="0"]){width:0%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_xs="1"]){margin-left:8.3333333333%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_right_xs="1"]){margin-right:8.3333333333%}:host([max_width~=xs]) ::slotted(av-dynamic-col[size_xs="1"]){width:8.3333333333%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_xs="2"]){margin-left:16.6666666667%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_right_xs="2"]){margin-right:16.6666666667%}:host([max_width~=xs]) ::slotted(av-dynamic-col[size_xs="2"]){width:16.6666666667%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_xs="3"]){margin-left:25%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_right_xs="3"]){margin-right:25%}:host([max_width~=xs]) ::slotted(av-dynamic-col[size_xs="3"]){width:25%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_xs="4"]){margin-left:33.3333333333%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_right_xs="4"]){margin-right:33.3333333333%}:host([max_width~=xs]) ::slotted(av-dynamic-col[size_xs="4"]){width:33.3333333333%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_xs="5"]){margin-left:41.6666666667%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_right_xs="5"]){margin-right:41.6666666667%}:host([max_width~=xs]) ::slotted(av-dynamic-col[size_xs="5"]){width:41.6666666667%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_xs="6"]){margin-left:50%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_right_xs="6"]){margin-right:50%}:host([max_width~=xs]) ::slotted(av-dynamic-col[size_xs="6"]){width:50%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_xs="7"]){margin-left:58.3333333333%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_right_xs="7"]){margin-right:58.3333333333%}:host([max_width~=xs]) ::slotted(av-dynamic-col[size_xs="7"]){width:58.3333333333%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_xs="8"]){margin-left:66.6666666667%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_right_xs="8"]){margin-right:66.6666666667%}:host([max_width~=xs]) ::slotted(av-dynamic-col[size_xs="8"]){width:66.6666666667%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_xs="9"]){margin-left:75%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_right_xs="9"]){margin-right:75%}:host([max_width~=xs]) ::slotted(av-dynamic-col[size_xs="9"]){width:75%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_xs="10"]){margin-left:83.3333333333%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_right_xs="10"]){margin-right:83.3333333333%}:host([max_width~=xs]) ::slotted(av-dynamic-col[size_xs="10"]){width:83.3333333333%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_xs="11"]){margin-left:91.6666666667%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_right_xs="11"]){margin-right:91.6666666667%}:host([max_width~=xs]) ::slotted(av-dynamic-col[size_xs="11"]){width:91.6666666667%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_xs="12"]){margin-left:100%}:host([max_width~=xs]) ::slotted(av-dynamic-col[offset_right_xs="12"]){margin-right:100%}:host([max_width~=xs]) ::slotted(av-dynamic-col[size_xs="12"]){width:100%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_sm="0"]){margin-left:0%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_right_sm="0"]){margin-right:0%}:host([max_width~=sm]) ::slotted(av-dynamic-col[size_sm="0"]){width:0%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_sm="1"]){margin-left:8.3333333333%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_right_sm="1"]){margin-right:8.3333333333%}:host([max_width~=sm]) ::slotted(av-dynamic-col[size_sm="1"]){width:8.3333333333%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_sm="2"]){margin-left:16.6666666667%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_right_sm="2"]){margin-right:16.6666666667%}:host([max_width~=sm]) ::slotted(av-dynamic-col[size_sm="2"]){width:16.6666666667%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_sm="3"]){margin-left:25%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_right_sm="3"]){margin-right:25%}:host([max_width~=sm]) ::slotted(av-dynamic-col[size_sm="3"]){width:25%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_sm="4"]){margin-left:33.3333333333%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_right_sm="4"]){margin-right:33.3333333333%}:host([max_width~=sm]) ::slotted(av-dynamic-col[size_sm="4"]){width:33.3333333333%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_sm="5"]){margin-left:41.6666666667%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_right_sm="5"]){margin-right:41.6666666667%}:host([max_width~=sm]) ::slotted(av-dynamic-col[size_sm="5"]){width:41.6666666667%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_sm="6"]){margin-left:50%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_right_sm="6"]){margin-right:50%}:host([max_width~=sm]) ::slotted(av-dynamic-col[size_sm="6"]){width:50%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_sm="7"]){margin-left:58.3333333333%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_right_sm="7"]){margin-right:58.3333333333%}:host([max_width~=sm]) ::slotted(av-dynamic-col[size_sm="7"]){width:58.3333333333%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_sm="8"]){margin-left:66.6666666667%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_right_sm="8"]){margin-right:66.6666666667%}:host([max_width~=sm]) ::slotted(av-dynamic-col[size_sm="8"]){width:66.6666666667%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_sm="9"]){margin-left:75%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_right_sm="9"]){margin-right:75%}:host([max_width~=sm]) ::slotted(av-dynamic-col[size_sm="9"]){width:75%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_sm="10"]){margin-left:83.3333333333%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_right_sm="10"]){margin-right:83.3333333333%}:host([max_width~=sm]) ::slotted(av-dynamic-col[size_sm="10"]){width:83.3333333333%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_sm="11"]){margin-left:91.6666666667%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_right_sm="11"]){margin-right:91.6666666667%}:host([max_width~=sm]) ::slotted(av-dynamic-col[size_sm="11"]){width:91.6666666667%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_sm="12"]){margin-left:100%}:host([max_width~=sm]) ::slotted(av-dynamic-col[offset_right_sm="12"]){margin-right:100%}:host([max_width~=sm]) ::slotted(av-dynamic-col[size_sm="12"]){width:100%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_md="0"]){margin-left:0%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_right_md="0"]){margin-right:0%}:host([max_width~=md]) ::slotted(av-dynamic-col[size_md="0"]){width:0%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_md="1"]){margin-left:8.3333333333%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_right_md="1"]){margin-right:8.3333333333%}:host([max_width~=md]) ::slotted(av-dynamic-col[size_md="1"]){width:8.3333333333%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_md="2"]){margin-left:16.6666666667%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_right_md="2"]){margin-right:16.6666666667%}:host([max_width~=md]) ::slotted(av-dynamic-col[size_md="2"]){width:16.6666666667%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_md="3"]){margin-left:25%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_right_md="3"]){margin-right:25%}:host([max_width~=md]) ::slotted(av-dynamic-col[size_md="3"]){width:25%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_md="4"]){margin-left:33.3333333333%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_right_md="4"]){margin-right:33.3333333333%}:host([max_width~=md]) ::slotted(av-dynamic-col[size_md="4"]){width:33.3333333333%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_md="5"]){margin-left:41.6666666667%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_right_md="5"]){margin-right:41.6666666667%}:host([max_width~=md]) ::slotted(av-dynamic-col[size_md="5"]){width:41.6666666667%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_md="6"]){margin-left:50%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_right_md="6"]){margin-right:50%}:host([max_width~=md]) ::slotted(av-dynamic-col[size_md="6"]){width:50%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_md="7"]){margin-left:58.3333333333%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_right_md="7"]){margin-right:58.3333333333%}:host([max_width~=md]) ::slotted(av-dynamic-col[size_md="7"]){width:58.3333333333%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_md="8"]){margin-left:66.6666666667%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_right_md="8"]){margin-right:66.6666666667%}:host([max_width~=md]) ::slotted(av-dynamic-col[size_md="8"]){width:66.6666666667%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_md="9"]){margin-left:75%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_right_md="9"]){margin-right:75%}:host([max_width~=md]) ::slotted(av-dynamic-col[size_md="9"]){width:75%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_md="10"]){margin-left:83.3333333333%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_right_md="10"]){margin-right:83.3333333333%}:host([max_width~=md]) ::slotted(av-dynamic-col[size_md="10"]){width:83.3333333333%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_md="11"]){margin-left:91.6666666667%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_right_md="11"]){margin-right:91.6666666667%}:host([max_width~=md]) ::slotted(av-dynamic-col[size_md="11"]){width:91.6666666667%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_md="12"]){margin-left:100%}:host([max_width~=md]) ::slotted(av-dynamic-col[offset_right_md="12"]){margin-right:100%}:host([max_width~=md]) ::slotted(av-dynamic-col[size_md="12"]){width:100%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_lg="0"]){margin-left:0%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_right_lg="0"]){margin-right:0%}:host([max_width~=lg]) ::slotted(av-dynamic-col[size_lg="0"]){width:0%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_lg="1"]){margin-left:8.3333333333%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_right_lg="1"]){margin-right:8.3333333333%}:host([max_width~=lg]) ::slotted(av-dynamic-col[size_lg="1"]){width:8.3333333333%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_lg="2"]){margin-left:16.6666666667%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_right_lg="2"]){margin-right:16.6666666667%}:host([max_width~=lg]) ::slotted(av-dynamic-col[size_lg="2"]){width:16.6666666667%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_lg="3"]){margin-left:25%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_right_lg="3"]){margin-right:25%}:host([max_width~=lg]) ::slotted(av-dynamic-col[size_lg="3"]){width:25%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_lg="4"]){margin-left:33.3333333333%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_right_lg="4"]){margin-right:33.3333333333%}:host([max_width~=lg]) ::slotted(av-dynamic-col[size_lg="4"]){width:33.3333333333%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_lg="5"]){margin-left:41.6666666667%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_right_lg="5"]){margin-right:41.6666666667%}:host([max_width~=lg]) ::slotted(av-dynamic-col[size_lg="5"]){width:41.6666666667%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_lg="6"]){margin-left:50%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_right_lg="6"]){margin-right:50%}:host([max_width~=lg]) ::slotted(av-dynamic-col[size_lg="6"]){width:50%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_lg="7"]){margin-left:58.3333333333%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_right_lg="7"]){margin-right:58.3333333333%}:host([max_width~=lg]) ::slotted(av-dynamic-col[size_lg="7"]){width:58.3333333333%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_lg="8"]){margin-left:66.6666666667%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_right_lg="8"]){margin-right:66.6666666667%}:host([max_width~=lg]) ::slotted(av-dynamic-col[size_lg="8"]){width:66.6666666667%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_lg="9"]){margin-left:75%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_right_lg="9"]){margin-right:75%}:host([max_width~=lg]) ::slotted(av-dynamic-col[size_lg="9"]){width:75%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_lg="10"]){margin-left:83.3333333333%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_right_lg="10"]){margin-right:83.3333333333%}:host([max_width~=lg]) ::slotted(av-dynamic-col[size_lg="10"]){width:83.3333333333%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_lg="11"]){margin-left:91.6666666667%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_right_lg="11"]){margin-right:91.6666666667%}:host([max_width~=lg]) ::slotted(av-dynamic-col[size_lg="11"]){width:91.6666666667%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_lg="12"]){margin-left:100%}:host([max_width~=lg]) ::slotted(av-dynamic-col[offset_right_lg="12"]){margin-right:100%}:host([max_width~=lg]) ::slotted(av-dynamic-col[size_lg="12"]){width:100%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_xl="0"]){margin-left:0%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_right_xl="0"]){margin-right:0%}:host([max_width~=xl]) ::slotted(av-dynamic-col[size_xl="0"]){width:0%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_xl="1"]){margin-left:8.3333333333%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_right_xl="1"]){margin-right:8.3333333333%}:host([max_width~=xl]) ::slotted(av-dynamic-col[size_xl="1"]){width:8.3333333333%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_xl="2"]){margin-left:16.6666666667%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_right_xl="2"]){margin-right:16.6666666667%}:host([max_width~=xl]) ::slotted(av-dynamic-col[size_xl="2"]){width:16.6666666667%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_xl="3"]){margin-left:25%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_right_xl="3"]){margin-right:25%}:host([max_width~=xl]) ::slotted(av-dynamic-col[size_xl="3"]){width:25%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_xl="4"]){margin-left:33.3333333333%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_right_xl="4"]){margin-right:33.3333333333%}:host([max_width~=xl]) ::slotted(av-dynamic-col[size_xl="4"]){width:33.3333333333%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_xl="5"]){margin-left:41.6666666667%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_right_xl="5"]){margin-right:41.6666666667%}:host([max_width~=xl]) ::slotted(av-dynamic-col[size_xl="5"]){width:41.6666666667%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_xl="6"]){margin-left:50%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_right_xl="6"]){margin-right:50%}:host([max_width~=xl]) ::slotted(av-dynamic-col[size_xl="6"]){width:50%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_xl="7"]){margin-left:58.3333333333%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_right_xl="7"]){margin-right:58.3333333333%}:host([max_width~=xl]) ::slotted(av-dynamic-col[size_xl="7"]){width:58.3333333333%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_xl="8"]){margin-left:66.6666666667%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_right_xl="8"]){margin-right:66.6666666667%}:host([max_width~=xl]) ::slotted(av-dynamic-col[size_xl="8"]){width:66.6666666667%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_xl="9"]){margin-left:75%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_right_xl="9"]){margin-right:75%}:host([max_width~=xl]) ::slotted(av-dynamic-col[size_xl="9"]){width:75%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_xl="10"]){margin-left:83.3333333333%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_right_xl="10"]){margin-right:83.3333333333%}:host([max_width~=xl]) ::slotted(av-dynamic-col[size_xl="10"]){width:83.3333333333%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_xl="11"]){margin-left:91.6666666667%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_right_xl="11"]){margin-right:91.6666666667%}:host([max_width~=xl]) ::slotted(av-dynamic-col[size_xl="11"]){width:91.6666666667%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_xl="12"]){margin-left:100%}:host([max_width~=xl]) ::slotted(av-dynamic-col[offset_right_xl="12"]){margin-right:100%}:host([max_width~=xl]) ::slotted(av-dynamic-col[size_xl="12"]){width:100%}`;
    __getStatic() {
        return DynamicRow;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DynamicRow.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "DynamicRow";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('max_width')){ this['max_width'] = undefined; } }
    calculateWidth() {
        let size = this.offsetWidth;
        let labels = [];
        for (let key in this.sizes) {
            let value = this.sizes[key];
            if (size > value) {
                labels.push(key);
            }
            else {
                break;
            }
        }
        this.max_width = labels.join(" ");
    }
    postCreation() {
        this.calculateWidth();
        new Aventus.ResizeObserver(entries => {
            this.calculateWidth();
        }).observe(this);
    }
}
window.customElements.define('av-dynamic-row', DynamicRow);Aventus.WebComponentInstance.registerDefinition(DynamicRow);

class RouterStateManager extends Aventus.StateManager {
    static getInstance() {
        return Aventus.Instance.get(RouterStateManager);
    }
}

class Scrollable extends Aventus.WebComponent {
    static get observedAttributes() {return ["zoom"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'y_scroll_visible'() {
                return this.hasAttribute('y_scroll_visible');
            }
            set 'y_scroll_visible'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('y_scroll_visible', 'true');
                } else{
                    this.removeAttribute('y_scroll_visible');
                }
            }get 'x_scroll_visible'() {
                return this.hasAttribute('x_scroll_visible');
            }
            set 'x_scroll_visible'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('x_scroll_visible', 'true');
                } else{
                    this.removeAttribute('x_scroll_visible');
                }
            }get 'x'() {
                    return Number(this.getAttribute('x'));
                }
                set 'x'(val) {
                    if(val === undefined || val === null){this.removeAttribute('x')}
                    else{this.setAttribute('x',val)}
                }get 'y'() {
                    return Number(this.getAttribute('y'));
                }
                set 'y'(val) {
                    if(val === undefined || val === null){this.removeAttribute('y')}
                    else{this.setAttribute('y',val)}
                }get 'floating_scroll'() {
                return this.hasAttribute('floating_scroll');
            }
            set 'floating_scroll'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('floating_scroll', 'true');
                } else{
                    this.removeAttribute('floating_scroll');
                }
            }get 'allow_x_scroll'() {
                return this.hasAttribute('allow_x_scroll');
            }
            set 'allow_x_scroll'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('allow_x_scroll', 'true');
                } else{
                    this.removeAttribute('allow_x_scroll');
                }
            }get 'auto_hide'() {
                return this.hasAttribute('auto_hide');
            }
            set 'auto_hide'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('auto_hide', 'true');
                } else{
                    this.removeAttribute('auto_hide');
                }
            }get 'no_transition'() {
                return this.hasAttribute('no_transition');
            }
            set 'no_transition'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('no_transition', 'true');
                } else{
                    this.removeAttribute('no_transition');
                }
            }get 'no_user_select'() {
                return this.hasAttribute('no_user_select');
            }
            set 'no_user_select'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('no_user_select', 'true');
                } else{
                    this.removeAttribute('no_user_select');
                }
            }    get 'zoom'() {
                    return Number(this.getAttribute('zoom'));
                }
                set 'zoom'(val) {
                    if(val === undefined || val === null){this.removeAttribute('zoom')}
                    else{this.setAttribute('zoom',val)}
                }    observer;
    displayWidth = 0;
    displayHeight = 0;
    maxX = 0;
    marginX = 0;
    maxY = 0;
    marginY = 0;
    hideDelayX;
    hideDelayY;
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("zoom", ((target) => {
    target.changeZoom();
})); }
    static __style = `:host{--internal-scrollbar-container-color: var(--scrollbar-container-color, transparent);--internal-scrollbar-color: var(--scrollbar-color, #757575);--internal-scrollbar-active-color: var(--scrollbar-active-color, #858585);--internal-scroller-width: var(--scroller-width, 6px);--internal-scroller-top: var(--scroller-top, 3px);--internal-scroller-bottom: var(--scroller-bottom, 3px);--internal-scroller-right: var(--scroller-right, 3px);--internal-scroller-left: var(--scroller-left, 3px);--internal-scroller-transition: var(--scroller-transition, 0.5s)}:host{display:block;height:100%;overflow:hidden;position:relative;-webkit-user-drag:none;-khtml-user-drag:none;-moz-user-drag:none;-o-user-drag:none;width:100%}:host .scroll-main-container{display:block;height:100%;position:relative;width:100%}:host .scroll-main-container .content-zoom{display:block;height:100%;position:relative;transform-origin:0 0;width:100%;z-index:4}:host .scroll-main-container .content-zoom .content-hidder{display:block;height:100%;overflow:hidden;position:relative;width:100%}:host .scroll-main-container .content-zoom .content-hidder .content-wrapper{display:inline-block;height:auto;min-width:100%;position:relative;transition:transform var(--internal-scroller-transition);width:100%}:host .scroll-main-container .scroller-wrapper .container-scroller{display:none;overflow:hidden;position:absolute;z-index:5}:host .scroll-main-container .scroller-wrapper .container-scroller .shadow-scroller{background-color:var(--internal-scrollbar-container-color);border-radius:5px}:host .scroll-main-container .scroller-wrapper .container-scroller .shadow-scroller .scroller{background-color:var(--internal-scrollbar-color);border-radius:5px;cursor:pointer;position:absolute;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;z-index:5}:host .scroll-main-container .scroller-wrapper .container-scroller .scroller.active{background-color:var(--internal-scrollbar-active-color);transition:none !important}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical{height:calc(100% - var(--internal-scroller-bottom)*2 - var(--internal-scroller-width));padding-left:var(--internal-scroller-left);right:var(--internal-scroller-right);top:var(--internal-scroller-bottom);transform:0;transition:transform .2s ease-in-out;width:calc(var(--internal-scroller-width) + var(--internal-scroller-left))}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical.hide{transform:translateX(calc(var(--internal-scroller-width) + var(--internal-scroller-left)))}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical .shadow-scroller{height:100%}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical .shadow-scroller .scroller{transition:top var(--internal-scroller-transition) linear;width:calc(100% - var(--internal-scroller-left))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal{bottom:var(--internal-scroller-bottom);height:calc(var(--internal-scroller-width) + var(--internal-scroller-top));left:var(--internal-scroller-right);padding-top:var(--internal-scroller-top);transform:0;transition:transform .2s ease-in-out;width:calc(100% - var(--internal-scroller-right)*2 - var(--internal-scroller-width))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal.hide{transform:translateY(calc(var(--internal-scroller-width) + var(--internal-scroller-top)))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal .shadow-scroller{height:100%}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal .shadow-scroller .scroller{height:calc(100% - var(--internal-scroller-top));transition:left var(--internal-scroller-transition) linear}:host([allow_x_scroll]) .scroll-main-container .content-zoom .content-hidder .content-wrapper{width:auto}:host([y_scroll_visible]) .scroll-main-container .scroller-wrapper .container-scroller.vertical{display:block}:host([x_scroll_visible]) .scroll-main-container .scroller-wrapper .container-scroller.horizontal{display:block}:host([no_transition]){--internal-scroller-transition: 0ms}:host([no_user_select]) .content-wrapper *{user-select:none}:host([no_user_select]) ::slotted{user-select:none}`;
    constructor() {            super();            this.wheelAction = this.wheelAction.bind(this);            this.touchWheelAction = this.touchWheelAction.bind(this);        }
    __getStatic() {
        return Scrollable;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Scrollable.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="scroll-main-container" _id="scrollable_0">    <div class="content-zoom" _id="scrollable_1">        <div class="content-hidder" _id="scrollable_2">            <div class="content-wrapper" _id="scrollable_3">                <slot></slot>            </div>        </div>    </div>    <div class="scroller-wrapper">        <div class="container-scroller vertical" _id="scrollable_4">            <div class="shadow-scroller">                <div class="scroller" _id="scrollable_5"></div>            </div>        </div>        <div class="container-scroller horizontal" _id="scrollable_6">            <div class="shadow-scroller">                <div class="scroller" _id="scrollable_7"></div>            </div>        </div>    </div></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "mainContainer",
      "ids": [
        "scrollable_0"
      ]
    },
    {
      "name": "contentZoom",
      "ids": [
        "scrollable_1"
      ]
    },
    {
      "name": "contentHidder",
      "ids": [
        "scrollable_2"
      ]
    },
    {
      "name": "contentWrapper",
      "ids": [
        "scrollable_3"
      ]
    },
    {
      "name": "verticalScrollerContainer",
      "ids": [
        "scrollable_4"
      ]
    },
    {
      "name": "verticalScroller",
      "ids": [
        "scrollable_5"
      ]
    },
    {
      "name": "horizontalScrollerContainer",
      "ids": [
        "scrollable_6"
      ]
    },
    {
      "name": "horizontalScroller",
      "ids": [
        "scrollable_7"
      ]
    }
  ]
}); }
    getClassName() {
        return "Scrollable";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('y_scroll_visible')) { this.attributeChangedCallback('y_scroll_visible', false, false); }if(!this.hasAttribute('x_scroll_visible')) { this.attributeChangedCallback('x_scroll_visible', false, false); }if(!this.hasAttribute('x')){ this['x'] = undefined; }if(!this.hasAttribute('y')){ this['y'] = undefined; }if(!this.hasAttribute('floating_scroll')) { this.attributeChangedCallback('floating_scroll', false, false); }if(!this.hasAttribute('allow_x_scroll')) { this.attributeChangedCallback('allow_x_scroll', false, false); }if(!this.hasAttribute('auto_hide')) { this.attributeChangedCallback('auto_hide', false, false); }if(!this.hasAttribute('no_transition')) { this.attributeChangedCallback('no_transition', false, false); }if(!this.hasAttribute('no_user_select')) { this.attributeChangedCallback('no_user_select', false, false); }if(!this.hasAttribute('zoom')){ this['zoom'] = 1; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('zoom'); }
    __listBoolProps() { return ["y_scroll_visible","x_scroll_visible","floating_scroll","allow_x_scroll","auto_hide","no_transition","no_user_select"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    correctVerticalScrollValue(value) {
        if (value < 0) {
            value = 0;
        }
        else if (value > this.maxY) {
            value = this.maxY;
        }
        return value;
    }
    scrollVerticalScrollbar(percentValue) {
        let verticalValue = percentValue / 100 * this.contentWrapper.offsetHeight;
        this.scrollY(verticalValue);
    }
    scrollY(value) {
        if (this.maxY != 0) {
            this.y = this.correctVerticalScrollValue(value);
        }
        else {
            this.y = 0;
        }
        let scrollPosition = this.y / this.contentWrapper.offsetHeight * 100;
        if (this.auto_hide) {
            this.verticalScrollerContainer.classList.remove("hide");
            clearTimeout(this.hideDelayY);
            this.hideDelayY = setTimeout(() => {
                this.verticalScrollerContainer.classList.add("hide");
            }, 1000);
        }
        this.verticalScroller.style.top = `${scrollPosition}%`;
        this.contentWrapper.style.transform = `translate3d(${-1 * this.x}px, ${-1 * this.y}px, 0)`;
    }
    correctHorizontalScrollValue(value) {
        if (value < 0) {
            value = 0;
        }
        else if (value > this.maxX) {
            value = this.maxX;
        }
        return value;
    }
    scrollHorizontalScrollbar(percentValue) {
        let value = percentValue / 100 * this.contentWrapper.offsetWidth;
        this.scrollX(value);
    }
    scrollX(value) {
        if (this.maxX != 0) {
            this.x = this.correctHorizontalScrollValue(value);
        }
        else {
            this.x = 0;
        }
        let scrollPosition = this.x / this.contentWrapper.offsetWidth * 100;
        if (this.auto_hide) {
            this.horizontalScrollerContainer.classList.remove("hide");
            clearTimeout(this.hideDelayX);
            this.hideDelayX = setTimeout(() => {
                this.horizontalScrollerContainer.classList.add("hide");
            }, 1000);
        }
        this.horizontalScroller.style.left = `${scrollPosition}%`;
        this.contentWrapper.style.transform = `translate3d(${-1 * this.x}px, ${-1 * this.y}px, 0)`;
    }
    scrollToPosition(x, y) {
        this.scrollX(x);
        this.scrollY(y);
    }
    addAction() {
        this.addEventListener("wheel", this.wheelAction);
        this.addEventListener("touchstart", this.touchWheelAction);
        this.addVerticalScrollDrag();
        this.addHorizontalScrollDrag();
    }
    addVerticalScrollDrag() {
        this.verticalScroller.addEventListener("touchstart", (e) => {
            e.stopPropagation();
        });
        new Aventus.DragAndDrop({
            element: this.verticalScroller,
            applyDrag: false,
            usePercent: true,
            offsetDrag: 0,
            onStart: (e) => {
                this.no_transition = true;
                this.no_user_select = true;
                this.verticalScroller.classList.add("active");
            },
            onMove: (e, position) => {
                this.scrollVerticalScrollbar(position.y);
            },
            onStop: () => {
                this.no_transition = false;
                this.no_user_select = false;
                this.verticalScroller.classList.remove("active");
            },
        });
    }
    addHorizontalScrollDrag() {
        this.horizontalScroller.addEventListener("touchstart", (e) => {
            e.stopPropagation();
        });
        new Aventus.DragAndDrop({
            element: this.horizontalScroller,
            applyDrag: false,
            usePercent: true,
            offsetDrag: 0,
            onStart: (e) => {
                this.no_transition = true;
                this.no_user_select = true;
                this.horizontalScroller.classList.add("active");
            },
            onMove: (e, position) => {
                this.scrollHorizontalScrollbar(position.x);
            },
            onStop: () => {
                this.no_transition = false;
                this.no_user_select = false;
                this.horizontalScroller.classList.remove("active");
            },
        });
    }
    wheelAction(e) {
        if (e.altKey) {
            if (this.x_scroll_visible) {
                let triggerEvent = (this.x == 0 && e.deltaY < 0) || (this.x == this.maxX && e.deltaY > 0);
                this.scrollX(this.x + e.deltaY);
                if (!triggerEvent) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        }
        else {
            if (this.y_scroll_visible) {
                let triggerEvent = (this.y == 0 && e.deltaY < 0) || (this.y == this.maxY && e.deltaY > 0);
                this.scrollY(this.y + e.deltaY);
                if (!triggerEvent) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        }
    }
    touchWheelAction(e) {
        let startX = e.touches[0].pageX;
        let startY = e.touches[0].pageY;
        let startHorizontal = this.x;
        let startVertical = this.y;
        this.no_transition = true;
        let inertiaArrayY = new Map();
        let inertiaArrayX = new Map();
        let averageY = 0;
        let averageX = 0;
        let lastDiffY = 0;
        let lastDiffX = 0;
        let touchMove = (e) => {
            let diffX = startX - e.touches[0].pageX;
            let diffY = startY - e.touches[0].pageY;
            // inertia
            if (inertiaArrayY.size == 5) {
                inertiaArrayY.delete(inertiaArrayY.keys()[0]);
            }
            if (inertiaArrayX.size == 5) {
                inertiaArrayX.delete(inertiaArrayX.keys()[0]);
            }
            inertiaArrayX.set(new Date(), diffX - lastDiffX);
            inertiaArrayY.set(new Date(), diffY - lastDiffY);
            lastDiffX = diffX;
            lastDiffY = diffY;
            this.scrollX(startHorizontal + diffX);
            this.scrollY(startVertical + diffY);
        };
        let touchEnd = (e) => {
            window.removeEventListener("touchmove", touchMove);
            window.removeEventListener("touchend", touchEnd);
            let date = new Date();
            let totX = 0;
            let totY = 0;
            let inertiaXRunning = false;
            let inertiaYRunning = false;
            for (let [dateEvent, value] of inertiaArrayX) {
                let factor = (1000) - (date.getTime() - dateEvent.getTime());
                if (factor < 0) {
                    factor = 0;
                }
                factor /= 1000;
                totX += value * factor;
            }
            for (let [dateEvent, value] of inertiaArrayY) {
                let factor = (1000) - (date.getTime() - dateEvent.getTime());
                if (factor < 0) {
                    factor = 0;
                }
                factor /= 1000;
                totY += value * factor;
            }
            if (inertiaArrayX.size > 0) {
                inertiaXRunning = true;
                averageX = Math.round(totX / inertiaArrayX.size);
                let breakX = averageX > 0 ? 1 : -1;
                let checkX = averageX > 0 ? () => averageX <= 0 : () => averageX >= 0;
                let intervalInertia = new Aventus.Animation({
                    animate: () => {
                        if (checkX()) {
                            intervalInertia.stop();
                        }
                        else {
                            averageX -= breakX;
                            lastDiffX += averageX;
                            this.scrollX(startHorizontal + lastDiffX);
                        }
                    },
                    stopped: () => {
                        inertiaXRunning = false;
                        if (!inertiaXRunning && !inertiaYRunning) {
                            this.no_transition = false;
                        }
                    },
                    fps: 60,
                });
                intervalInertia.start();
            }
            if (inertiaArrayY.size > 0) {
                inertiaYRunning = true;
                averageY = Math.round(totY / inertiaArrayY.size);
                let breakY = averageY > 0 ? 1 : -1;
                let checkY = averageY > 0 ? () => averageY <= 0 : () => averageY >= 0;
                let intervalInertia = new Aventus.Animation({
                    animate: () => {
                        if (checkY()) {
                            intervalInertia.stop();
                        }
                        else {
                            averageY -= breakY;
                            lastDiffY += averageY;
                            this.scrollY(startVertical + lastDiffY);
                        }
                    },
                    stopped: () => {
                        inertiaYRunning = false;
                        if (!inertiaXRunning && !inertiaYRunning) {
                            this.no_transition = false;
                        }
                    },
                    fps: 60,
                });
                intervalInertia.start();
            }
            if (!inertiaXRunning && !inertiaYRunning) {
                this.no_transition = false;
            }
        };
        window.addEventListener("touchmove", touchMove);
        window.addEventListener("touchend", touchEnd);
    }
    calculateRealSize() {
        const currentOffsetWidth = this.contentZoom.offsetWidth;
        const currentOffsetHeight = this.contentZoom.offsetHeight;
        if (this.zoom < 1) {
            // scale the container for zoom
            this.contentZoom.style.width = this.mainContainer.offsetWidth / this.zoom + 'px';
            this.contentZoom.style.height = this.mainContainer.offsetHeight / this.zoom + 'px';
            this.displayHeight = currentOffsetHeight;
            this.displayWidth = currentOffsetWidth;
        }
        else {
            this.displayHeight = currentOffsetHeight / this.zoom;
            this.displayWidth = currentOffsetWidth / this.zoom;
        }
    }
    calculatePositionHorizontalScrollerContainer() {
        const topMissing = this.mainContainer.offsetHeight - this.horizontalScrollerContainer.offsetTop;
        if (topMissing > 0 && this.x_scroll_visible && !this.floating_scroll) {
            this.contentHidder.style.height = 'calc(100% - ' + topMissing + 'px)';
            this.contentHidder.style.marginBottom = topMissing + 'px';
            this.marginX = topMissing;
        }
        else {
            this.contentHidder.style.height = '';
            this.contentHidder.style.marginBottom = '';
            this.marginX = 0;
        }
    }
    calculateSizeHorizontalScroller() {
        const horizontalScrollerHeight = ((this.displayWidth - this.marginX) / this.contentWrapper.offsetWidth * 100);
        this.horizontalScroller.style.width = horizontalScrollerHeight + '%';
        let maxScrollContent = this.contentWrapper.offsetWidth - this.displayWidth;
        if (maxScrollContent < 0) {
            maxScrollContent = 0;
        }
        this.maxX = maxScrollContent + this.marginX;
    }
    calculatePositionVerticalScrollerContainer() {
        const leftMissing = this.mainContainer.offsetWidth - this.verticalScrollerContainer.offsetLeft;
        if (leftMissing > 0 && this.y_scroll_visible && !this.floating_scroll) {
            this.contentHidder.style.width = 'calc(100% - ' + leftMissing + 'px)';
            this.contentHidder.style.marginRight = leftMissing + 'px';
            this.marginY = leftMissing;
        }
        else {
            this.contentHidder.style.width = '';
            this.contentHidder.style.marginRight = '';
            this.marginY = 0;
        }
    }
    calculateSizeVerticalScroller() {
        const verticalScrollerHeight = ((this.displayHeight - this.marginY) / this.contentWrapper.offsetHeight * 100);
        this.verticalScroller.style.height = verticalScrollerHeight + '%';
        let maxScrollContent = this.contentWrapper.offsetHeight - this.displayHeight;
        if (maxScrollContent < 0) {
            maxScrollContent = 0;
        }
        this.maxY = maxScrollContent + this.marginY;
    }
    changeZoom() {
        this.contentZoom.style.transform = 'scale(' + this.zoom + ')';
        this.dimensionRefreshed();
    }
    dimensionRefreshed() {
        this.calculateRealSize();
        if (this.contentWrapper.offsetHeight - this.displayHeight > 0) {
            if (!this.y_scroll_visible) {
                this.y_scroll_visible = true;
                this.calculatePositionVerticalScrollerContainer();
            }
            this.calculateSizeVerticalScroller();
            this.scrollY(this.y);
        }
        else if (this.y_scroll_visible) {
            this.y_scroll_visible = false;
            // clear space created by scrollbar
            this.contentHidder.style.width = '';
            this.contentHidder.style.marginRight = '';
            this.scrollY(0);
        }
        if (this.contentWrapper.offsetWidth - this.displayWidth > 0) {
            if (!this.x_scroll_visible) {
                this.x_scroll_visible = true;
                this.calculatePositionHorizontalScrollerContainer();
            }
            this.calculateSizeHorizontalScroller();
            this.scrollX(this.x);
        }
        else if (this.x_scroll_visible) {
            this.x_scroll_visible = false;
            // clear space created by scrollbar
            this.contentHidder.style.height = '';
            this.contentHidder.style.marginBottom = '';
            this.scrollX(0);
        }
    }
    createResizeObserver() {
        let inProgress = false;
        this.observer = new Aventus.ResizeObserver({
            callback: entries => {
                if (inProgress) {
                    return;
                }
                inProgress = true;
                this.dimensionRefreshed();
                inProgress = false;
            },
            fps: 30
        });
    }
    addResizeObserver() {
        if (this.observer == undefined) {
            this.createResizeObserver();
        }
        this.observer.observe(this.contentWrapper);
        this.observer.observe(this);
    }
    postCreation() {
        this.addResizeObserver();
        this.addAction();
        window['temp1'] = this;
    }
}
window.customElements.define('av-scrollable', Scrollable);Aventus.WebComponentInstance.registerDefinition(Scrollable);

class Img extends Aventus.WebComponent {
    static get observedAttributes() {return ["src", "mode"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'no_save'() {
                return this.hasAttribute('no_save');
            }
            set 'no_save'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('no_save', 'true');
                } else{
                    this.removeAttribute('no_save');
                }
            }    get 'src'() {
                    return this.getAttribute('src');
                }
                set 'src'(val) {
                    if(val === undefined || val === null){this.removeAttribute('src')}
                    else{this.setAttribute('src',val)}
                }get 'mode'() {
                    return this.getAttribute('mode');
                }
                set 'mode'(val) {
                    if(val === undefined || val === null){this.removeAttribute('mode')}
                    else{this.setAttribute('mode',val)}
                }    isCalculing;
    maxCalculateSize = 10;
    ratio = 1;
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("src", ((target) => {
    target.onSrcChanged();
}));this.__addPropertyActions("mode", ((target) => {
    if (target.src != "") {
        target.calculateSize();
    }
})); }
    static __style = `:host{--internal-img-color: var(--img-color);--internal-img-stroke-color: var(--img-stroke-color, var(--internal-img-color));--internal-img-fill-color: var(--img-fill-color, var(--internal-img-color));--internal-img-color-transition: var(--img-color-transition, none)}:host{display:inline-block;overflow:hidden;font-size:0}:host *{box-sizing:border-box}:host img{opacity:0;transition:filter .3s linear}:host .svg{display:none;height:100%;width:100%}:host .svg svg{height:100%;width:100%}:host([src$=".svg"]) img{display:none}:host([src$=".svg"]) .svg{display:flex}:host([src$=".svg"]) .svg svg{transition:var(--internal-img-color-transition);stroke:var(--internal-img-stroke-color);fill:var(--internal-img-fill-color)}:host([display_bigger]) img{cursor:pointer}:host([display_bigger]) img:hover{filter:brightness(50%)}`;
    __getStatic() {
        return Img;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Img.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<img _id="img_0" /><div class="svg" _id="img_1"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "imgEl",
      "ids": [
        "img_0"
      ]
    },
    {
      "name": "svgEl",
      "ids": [
        "img_1"
      ]
    }
  ]
}); }
    getClassName() {
        return "Img";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('no_save')) { this.attributeChangedCallback('no_save', false, false); }if(!this.hasAttribute('src')){ this['src'] = undefined; }if(!this.hasAttribute('mode')){ this['mode'] = "contains"; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('src');this.__upgradeProperty('mode'); }
    __listBoolProps() { return ["no_save"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    calculateSize(attempt = 0) {
        if (this.isCalculing) {
            return;
        }
        if (this.src == "") {
            return;
        }
        this.isCalculing = true;
        if (getComputedStyle(this).display == 'none') {
            return;
        }
        if (attempt == this.maxCalculateSize) {
            this.isCalculing = false;
            return;
        }
        let element = this.imgEl;
        if (this.src.endsWith(".svg")) {
            element = this.svgEl;
        }
        this.style.width = '';
        this.style.height = '';
        element.style.width = '';
        element.style.height = '';
        if (element.offsetWidth == 0 && element.offsetHeight == 0) {
            setTimeout(() => {
                this.isCalculing = false;
                this.calculateSize(attempt + 1);
            }, 100);
            return;
        }
        let style = getComputedStyle(this);
        let addedY = Number(style.paddingTop.replace("px", "")) + Number(style.paddingBottom.replace("px", "")) + Number(style.borderTopWidth.replace("px", "")) + Number(style.borderBottomWidth.replace("px", ""));
        let addedX = Number(style.paddingLeft.replace("px", "")) + Number(style.paddingRight.replace("px", "")) + Number(style.borderLeftWidth.replace("px", "")) + Number(style.borderRightWidth.replace("px", ""));
        let availableHeight = this.offsetHeight - addedY;
        let availableWidth = this.offsetWidth - addedX;
        let sameWidth = (element.offsetWidth == availableWidth);
        let sameHeight = (element.offsetHeight == availableHeight);
        this.ratio = element.offsetWidth / element.offsetHeight;
        if (sameWidth && !sameHeight) {
            // height is set
            element.style.width = (availableHeight * this.ratio) + 'px';
            element.style.height = availableHeight + 'px';
        }
        else if (!sameWidth && sameHeight) {
            // width is set
            element.style.width = availableWidth + 'px';
            element.style.height = (availableWidth / this.ratio) + 'px';
        }
        else if (!sameWidth && !sameHeight) {
            if (this.mode == "stretch") {
                element.style.width = '100%';
                element.style.height = '100%';
            }
            else if (this.mode == "contains") {
                // suppose this height is max
                let newWidth = (availableHeight * this.ratio);
                if (newWidth <= availableWidth) {
                    //we can apply this value
                    element.style.width = newWidth + 'px';
                    element.style.height = availableHeight + 'px';
                }
                else {
                    element.style.width = availableWidth + 'px';
                    element.style.height = (availableWidth / this.ratio) + 'px';
                }
            }
            else if (this.mode == "cover") {
                // suppose this height is min
                let newWidth = (availableHeight * this.ratio);
                if (newWidth >= availableWidth) {
                    //we can apply this value
                    element.style.width = newWidth + 'px';
                    element.style.height = availableHeight + 'px';
                }
                else {
                    element.style.width = availableWidth + 'px';
                    element.style.height = (availableWidth / this.ratio) + 'px';
                }
            }
        }
        //center img
        let diffTop = (this.offsetHeight - element.offsetHeight - addedY) / 2;
        let diffLeft = (this.offsetWidth - element.offsetWidth - addedX) / 2;
        element.style.transform = "translate(" + diffLeft + "px, " + diffTop + "px)";
        element.style.opacity = '1';
        this.isCalculing = false;
    }
    async onSrcChanged() {
        if (this.src.endsWith(".svg")) {
            let svgContent = await Aventus.ResourceLoader.load(this.src);
            this.svgEl.innerHTML = svgContent;
            this.calculateSize();
        }
        else if (this.src != "" && !this.no_save) {
            let base64 = await Aventus.ResourceLoader.load(this.src);
            this.imgEl.setAttribute("src", base64);
            this.calculateSize();
        }
        else {
            this.imgEl.setAttribute("src", this.src);
            this.calculateSize();
        }
    }
}
window.customElements.define('av-img', Img);Aventus.WebComponentInstance.registerDefinition(Img);

class RouterLink extends Aventus.WebComponent {
    get 'state'() {
                    return this.getAttribute('state');
                }
                set 'state'(val) {
                    if(val === undefined || val === null){this.removeAttribute('state')}
                    else{this.setAttribute('state',val)}
                }get 'active_state'() {
                    return this.getAttribute('active_state');
                }
                set 'active_state'(val) {
                    if(val === undefined || val === null){this.removeAttribute('active_state')}
                    else{this.setAttribute('active_state',val)}
                }    onActiveChange = new Aventus.Callback();
    static __style = ``;
    __getStatic() {
        return RouterLink;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(RouterLink.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "RouterLink";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('state')){ this['state'] = ""; }if(!this.hasAttribute('active_state')){ this['active_state'] = ""; } }
    addClickEvent() {
        new Aventus.PressManager({
            element: this,
            onPress: () => {
                Aventus.State.activate(this.state, Aventus.Instance.get(RouterStateManager));
            }
        });
    }
    registerActiveStateListener() {
        let activeState = this.state;
        if (this.active_state) {
            activeState = this.active_state;
        }
        Aventus.Instance.get(RouterStateManager).subscribe(activeState, {
            active: () => {
                this.classList.add("active");
                this.onActiveChange.trigger([true]);
            },
            inactive: () => {
                this.classList.remove("active");
                this.onActiveChange.trigger([false]);
            }
        });
    }
    postCreation() {
        this.registerActiveStateListener();
        this.addClickEvent();
    }
}
window.customElements.define('av-router-link', RouterLink);Aventus.WebComponentInstance.registerDefinition(RouterLink);

class Page extends Aventus.WebComponent {
    static get observedAttributes() {return ["visible"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'visible'() {
                return this.hasAttribute('visible');
            }
            set 'visible'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('visible', 'true');
                } else{
                    this.removeAttribute('visible');
                }
            }    currentRouter;
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("visible", ((target) => {
    if (target.visible) {
        target.onShow();
    }
    else {
        target.onHide();
    }
})); }
    static __style = `:host{display:none}:host([visible]){display:block}`;
    constructor() { super(); if (this.constructor == Page) { throw "can't instanciate an abstract class"; } }
    __getStatic() {
        return Page;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Page.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "Page";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('visible')) { this.attributeChangedCallback('visible', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('visible'); }
    __listBoolProps() { return ["visible"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    async show() {
        this.visible = true;
    }
    async hide() {
        this.visible = false;
    }
}

class Router extends Aventus.WebComponent {
    oldPage;
    allRoutes = {};
    activePath = "";
    oneStateActive = false;
    get stateManager() {
        return Aventus.Instance.get(RouterStateManager);
    }
    page404;
    static __style = `:host{display:block}`;
    constructor() {            super();            this.validError404 = this.validError404.bind(this);if (this.constructor == Router) { throw "can't instanciate an abstract class"; } }
    __getStatic() {
        return Router;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Router.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'before':`<slot name="before"></slot>`,'after':`<slot name="after"></slot>` }, 
        blocks: { 'default':`<slot name="before"></slot><div class="content" _id="router_0"></div><slot name="after"></slot>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "contentEl",
      "ids": [
        "router_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "Router";
    }
    addRouteAsync(options) {
        this.allRoutes[options.route] = options;
    }
    addRoute(route, elementCtr) {
        this.allRoutes[route] = {
            route: route,
            scriptUrl: '',
            render: () => elementCtr
        };
    }
    register() {
        try {
            this.defineRoutes();
            this.stateManager.onAfterStateChanged(this.validError404);
            for (let key in this.allRoutes) {
                this.initRoute(key);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    initRoute(path) {
        let element = undefined;
        let allRoutes = this.allRoutes;
        this.stateManager.subscribe(path, {
            active: (currentState) => {
                this.oneStateActive = true;
                const showPage = async () => {
                    if (!element) {
                        let options = allRoutes[path];
                        if (options.scriptUrl != "") {
                            await Aventus.ResourceLoader.loadInHead(options.scriptUrl);
                        }
                        let constructor = options.render();
                        element = new constructor;
                        element.currentRouter = this;
                        this.contentEl.appendChild(element);
                    }
                    if (this.oldPage && this.oldPage != element) {
                        await this.oldPage.hide();
                    }
                    let oldPage = this.oldPage;
                    let oldUrl = this.activePath;
                    await element.show();
                    this.oldPage = element;
                    this.activePath = path;
                    if (window.location.pathname != currentState.name) {
                        let newUrl = window.location.origin + currentState.name;
                        document.title = element.pageTitle();
                        window.history.pushState({}, element.pageTitle(), newUrl);
                    }
                    this.onNewPage(oldUrl, oldPage, path, element);
                };
                showPage();
            },
            inactive: () => {
                this.oneStateActive = false;
            }
        });
    }
    async validError404() {
        if (!this.oneStateActive) {
            let Page404 = this.error404(this.stateManager.getState());
            if (Page404) {
                if (!this.page404) {
                    this.page404 = new Page404();
                    this.page404.currentRouter = this;
                    this.contentEl.appendChild(this.page404);
                }
                if (this.oldPage && this.oldPage != this.page404) {
                    await this.oldPage.hide();
                }
                await this.page404.show();
                this.oldPage = this.page404;
                this.activePath = '';
            }
        }
    }
    error404(state) {
        return null;
    }
    onNewPage(oldUrl, oldPage, newUrl, newPage) {
    }
    getSlugs() {
        return this.stateManager.getStateSlugs(this.activePath);
    }
    postCreation() {
        this.register();
        if (window.localStorage.getItem("navigation_url")) {
            Aventus.State.activate(window.localStorage.getItem("navigation_url"), this.stateManager);
            window.localStorage.removeItem("navigation_url");
        }
        else {
            Aventus.State.activate(window.location.pathname, this.stateManager);
        }
        window.onpopstate = (e) => {
            if (window.location.pathname != this.stateManager.getState().name) {
                Aventus.State.activate(window.location.pathname, this.stateManager);
            }
        };
    }
}
(Aventus.Layout||(Aventus.Layout = {}));
DynamicCol.Namespace='Aventus.Layout';
Aventus.Layout.DynamicCol=DynamicCol;
DynamicRow.Namespace='Aventus.Layout';
Aventus.Layout.DynamicRow=DynamicRow;
RouterStateManager.Namespace='Aventus';
Aventus.RouterStateManager=RouterStateManager;
Scrollable.Namespace='Aventus.Layout';
Aventus.Layout.Scrollable=Scrollable;
Img.Namespace='Aventus';
Aventus.Img=Img;
(Aventus.Navigation||(Aventus.Navigation = {}));
RouterLink.Namespace='Aventus.Navigation';
Aventus.Navigation.RouterLink=RouterLink;
Page.Namespace='Aventus.Navigation';
Aventus.Navigation.Page=Page;
Router.Namespace='Aventus.Navigation';
Aventus.Navigation.Router=Router;
})(Aventus);

var AventusWebsite;
(AventusWebsite||(AventusWebsite = {}));
(function (AventusWebsite) {
const moduleName = `AventusWebsite`;


class TutorialFooter extends Aventus.WebComponent {
    get 'hide_previous'() {
                return this.hasAttribute('hide_previous');
            }
            set 'hide_previous'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('hide_previous', 'true');
                } else{
                    this.removeAttribute('hide_previous');
                }
            }get 'hide_next'() {
                return this.hasAttribute('hide_next');
            }
            set 'hide_next'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('hide_next', 'true');
                } else{
                    this.removeAttribute('hide_next');
                }
            }    previousState;
    nextState;
    static __style = `:host{align-items:center;display:flex;justify-content:center;margin:30px 0;width:100%}:host div{background-color:var(--aventus-color);border-radius:5px;box-shadow:0 0 5px #555;color:var(--secondary-color);cursor:pointer;font-size:16px;font-weight:400;margin:0 30px;padding:5px 15px;-webkit-tap-highlight-color:rgba(0,0,0,0);user-select:none}:host div:hover{box-shadow:0 0 3px #444}:host([hide_next]) .next{opacity:0;visibility:hidden}:host([hide_previous]) .previous{opacity:0;visibility:hidden}`;
    __getStatic() {
        return TutorialFooter;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TutorialFooter.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="previous" _id="tutorialfooter_0">Previous</div><div class="next" _id="tutorialfooter_1">Next</div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "pressEvents": [
    {
      "id": "tutorialfooter_0",
      "onPress": (e, pressInstance, c) => { c.component.previousClick(e, pressInstance); }
    },
    {
      "id": "tutorialfooter_1",
      "onPress": (e, pressInstance, c) => { c.component.nextClick(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "TutorialFooter";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('hide_previous')) { this.attributeChangedCallback('hide_previous', false, false); }if(!this.hasAttribute('hide_next')) { this.attributeChangedCallback('hide_next', false, false); } }
    __listBoolProps() { return ["hide_previous","hide_next"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    previousClick() {
        if (this.previousState) {
            Aventus.State.activate(this.previousState, Aventus.RouterStateManager.getInstance());
        }
    }
    nextClick() {
        if (this.nextState) {
            Aventus.State.activate(this.nextState, Aventus.RouterStateManager.getInstance());
        }
    }
    postCreation() {
        let page = this.findParentByType(TutorialPage);
        if (page) {
            let currentState = Aventus.RouterStateManager.getInstance().getState().name;
            let info = page.getNextAndPrevious(currentState);
            if (!info.previous) {
                this.hide_previous = true;
            }
            else {
                this.previousState = info.previous;
            }
            if (!info.next) {
                this.hide_next = true;
            }
            else {
                this.nextState = info.next;
            }
        }
    }
}
window.customElements.define('av-tutorial-footer', TutorialFooter);Aventus.WebComponentInstance.registerDefinition(TutorialFooter);

class TutorialApp extends Aventus.Navigation.Router {
    tutorialPage;
    static __style = `:host{height:100%}:host .content{height:100%}`;
    __getStatic() {
        return TutorialApp;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TutorialApp.__style);
        return arrStyle;
    }
    getClassName() {
        return "TutorialApp";
    }
    defineRoutes() {
        this.addRoute("/tutorial/introduction", TutorialIntroduction);
        this.addRoute("/tutorial/init", TutorialInit);
        this.addRoute("/tutorial/app", TutorialCreateApp);
        this.addRoute("/tutorial/data", TutorialData);
        this.addRoute("/tutorial/ram", TutorialRam);
        this.addRoute("/tutorial/form", TutorialForm);
        this.addRoute("/tutorial/list", TutorialList);
        this.addRoute("/tutorial/style", TutorialStyle);
    }
    error404(state) {
        if (state.name.startsWith("/tutorial/")) {
            return Page404;
        }
        return null;
    }
}
window.customElements.define('av-tutorial-app', TutorialApp);Aventus.WebComponentInstance.registerDefinition(TutorialApp);

class TutorialSidenav extends Aventus.WebComponent {
    static __style = `:host{background-color:var(--light-primary-color);font-size:14px;padding:30px;padding-right:5px;width:300px}:host .menu{height:100%;width:100%;z-index:2}:host .menu av-collapse{width:100%}:host .menu av-collapse .title{color:var(--aventus-color);font-size:18px;font-variant:small-caps;font-weight:bold;margin-bottom:5px;margin-top:15px}:host .menu av-collapse ul{margin:0;padding:0}:host .menu av-collapse ul li{color:var(--primary-font-color);cursor:pointer;font-size:12px;letter-spacing:1px;list-style:none;margin:6px;margin-left:15px;padding:0;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host .menu av-collapse ul li av-router-link{transition:opacity .3s var(--bezier-curve)}:host .menu av-collapse ul li av-router-link:not(.active):hover{opacity:.7}:host .menu av-collapse ul li av-router-link.active{color:var(--aventus-color)}:host .menu av-collapse ul li av-router-link.active::before{background-color:var(--aventus-color);bottom:0;content:"";left:-15px;position:absolute;top:0;width:5px}:host .close-icon{color:var(--aventus-color);font-size:24px;position:absolute;right:24px;top:12px;display:none}@media screen and (max-width: 1100px){:host .menu av-collapse ul li{margin:12px;margin-left:15px;font-size:16px}:host .close-icon{display:block}}`;
    __getStatic() {
        return TutorialSidenav;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TutorialSidenav.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<av-icon icon="close" class="close-icon" _id="tutorialsidenav_0"></av-icon><av-scrollable class="menu">    <av-collapse>        <div class="title" slot="header">init</div>        <ul>            <li><av-router-link state="/tutorial/introduction">Introduction</av-router-link></li>            <li><av-router-link state="/tutorial/init">Init</av-router-link></li>            <li><av-router-link state="/tutorial/app">Create app</av-router-link></li>        </ul>    </av-collapse>    <av-collapse>        <div class="title" slot="header">data</div>        <ul>            <li><av-router-link state="/tutorial/data">Data</av-router-link></li>            <li><av-router-link state="/tutorial/ram">RAM</av-router-link></li>        </ul>    </av-collapse>    <av-collapse>        <div class="title" slot="header">component</div>        <ul>            <li><av-router-link state="/tutorial/form">Form</av-router-link></li>            <li><av-router-link state="/tutorial/list">List</av-router-link></li>            <li><av-router-link state="/tutorial/style">Style</av-router-link></li>        </ul>    </av-collapse></av-scrollable>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "pressEvents": [
    {
      "id": "tutorialsidenav_0",
      "onPress": (e, pressInstance, c) => { c.component.closeNav(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "TutorialSidenav";
    }
    getNextAndPrevious(state) {
        let result = {
            next: null,
            previous: null
        };
        let active = this.shadowRoot.querySelector(`av-router-link[state="${state}"]`);
        let all = Array.from(this.shadowRoot.querySelectorAll("av-router-link"));
        let index = all.indexOf(active);
        if (index > 0) {
            result.previous = all[index - 1].state;
        }
        if (index < all.length - 1) {
            result.next = all[index + 1].state;
        }
        return result;
    }
    addActiveWatch() {
        let all = Array.from(this.shadowRoot.querySelectorAll("av-router-link"));
        for (let item of all) {
            this.addActiveWatchItem(item);
        }
    }
    addActiveWatchItem(item) {
        item.onActiveChange.add((isActive) => {
            if (isActive) {
                let coll = item.findParentByType(Collapse);
                if (coll) {
                    coll.open = true;
                }
            }
            else {
                let coll = item.findParentByType(Collapse);
                if (coll) {
                    coll.open = false;
                }
            }
        });
    }
    closeNav() {
        this.findParentByType(TutorialPage).closeMenu();
    }
    postCreation() {
        this.addActiveWatch();
    }
}
window.customElements.define('av-tutorial-sidenav', TutorialSidenav);Aventus.WebComponentInstance.registerDefinition(TutorialSidenav);

class DocLibDragAndDropExample extends Aventus.WebComponent {
    static __style = `:host{background-color:red;height:20px;position:absolute;width:20px}`;
    __getStatic() {
        return DocLibDragAndDropExample;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibDragAndDropExample.__style);
        return arrStyle;
    }
    getClassName() {
        return "DocLibDragAndDropExample";
    }
    postCreation() {
        new Aventus.DragAndDrop({
            element: this
        });
    }
}
window.customElements.define('av-doc-lib-drag-and-drop-example', DocLibDragAndDropExample);Aventus.WebComponentInstance.registerDefinition(DocLibDragAndDropExample);

class DocIntroductionButton extends Aventus.WebComponent {
    static get observedAttributes() {return ["count"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'count'() {
                    return Number(this.getAttribute('count'));
                }
                set 'count'(val) {
                    if(val === undefined || val === null){this.removeAttribute('count')}
                    else{this.setAttribute('count',val)}
                }    static __style = `:host button{background-color:#e5540e;border:none;border-radius:5px;color:#fff;cursor:pointer;padding:5px 15px;box-shadow:0 0 5px #555}`;
    __getStatic() {
        return DocIntroductionButton;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocIntroductionButton.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<button _id="docintroductionbutton_0"></button>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "count": [
      {
        "id": "docintroductionbutton_0",
        "attrName": "@HTML",
        "render": (c) => `Count is ${c.count}`
      }
    ]
  },
  "events": [
    {
      "eventName": "click",
      "id": "docintroductionbutton_0",
      "fct": (e, c) => c.component.onClick(e)
    }
  ]
});this.__getStatic().__template.setSchema({globals:["count"]}); }
    getClassName() {
        return "DocIntroductionButton";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('count')){ this['count'] = 0; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('count'); }
    onClick() {
        this.count++;
    }
}
window.customElements.define('av-doc-introduction-button', DocIntroductionButton);Aventus.WebComponentInstance.registerDefinition(DocIntroductionButton);

class DocFooter extends Aventus.WebComponent {
    get 'hide_previous'() {
                return this.hasAttribute('hide_previous');
            }
            set 'hide_previous'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('hide_previous', 'true');
                } else{
                    this.removeAttribute('hide_previous');
                }
            }get 'hide_next'() {
                return this.hasAttribute('hide_next');
            }
            set 'hide_next'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('hide_next', 'true');
                } else{
                    this.removeAttribute('hide_next');
                }
            }    previousState;
    nextState;
    static __style = `:host{align-items:center;display:flex;justify-content:center;margin:30px 0;width:100%}:host div{background-color:var(--aventus-color);border-radius:5px;box-shadow:0 0 5px #555;color:var(--secondary-color);cursor:pointer;font-size:16px;font-weight:400;margin:0 30px;padding:5px 15px;-webkit-tap-highlight-color:rgba(0,0,0,0);user-select:none}:host div:hover{box-shadow:0 0 3px #444}:host([hide_next]) .next{opacity:0;visibility:hidden}:host([hide_previous]) .previous{opacity:0;visibility:hidden}`;
    __getStatic() {
        return DocFooter;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocFooter.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="previous" _id="docfooter_0">Previous</div><div class="next" _id="docfooter_1">Next</div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "pressEvents": [
    {
      "id": "docfooter_0",
      "onPress": (e, pressInstance, c) => { c.component.previousClick(e, pressInstance); }
    },
    {
      "id": "docfooter_1",
      "onPress": (e, pressInstance, c) => { c.component.nextClick(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "DocFooter";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('hide_previous')) { this.attributeChangedCallback('hide_previous', false, false); }if(!this.hasAttribute('hide_next')) { this.attributeChangedCallback('hide_next', false, false); } }
    __listBoolProps() { return ["hide_previous","hide_next"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    previousClick() {
        if (this.previousState) {
            Aventus.State.activate(this.previousState, Aventus.RouterStateManager.getInstance());
        }
    }
    nextClick() {
        if (this.nextState) {
            Aventus.State.activate(this.nextState, Aventus.RouterStateManager.getInstance());
        }
    }
    postCreation() {
        let page = this.findParentByType(DocPage);
        if (page) {
            let currentState = Aventus.RouterStateManager.getInstance().getState().name;
            let info = page.getNextAndPrevious(currentState);
            if (!info.previous) {
                this.hide_previous = true;
            }
            else {
                this.previousState = info.previous;
            }
            if (!info.next) {
                this.hide_next = true;
            }
            else {
                this.nextState = info.next;
            }
        }
    }
}
window.customElements.define('av-doc-footer', DocFooter);Aventus.WebComponentInstance.registerDefinition(DocFooter);

class DocApp extends Aventus.Navigation.Router {
    docPage;
    static __style = `:host{height:100%}:host .content{height:100%}`;
    __getStatic() {
        return DocApp;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocApp.__style);
        return arrStyle;
    }
    getClassName() {
        return "DocApp";
    }
    defineRoutes() {
        //#region doc install
        this.addRoute("/docs/introduction", DocIntroduction);
        this.addRoute("/docs/installation", DocInstallation);
        this.addRoute("/docs/experience", DocExperience);
        this.addRoute("/docs/first_app", DocFirstApp);
        //#endregion
        //#region doc config
        this.addRoute("/docs/config/basic_prop", DocConfigBasic);
        this.addRoute("/docs/config/build", DocConfigBuild);
        this.addRoute("/docs/config/static", DocConfigStatic);
        this.addRoute("/docs/config/lib", DocConfigLib);
        //#endregion
        //#region doc data
        this.addRoute("/docs/data/create", DocDataCreate);
        //#endregion
        //#region doc ram
        this.addRoute("/docs/ram/create", DocRamCreate);
        this.addRoute("/docs/ram/CRUD", DocRamCrud);
        this.addRoute("/docs/ram/listen_changes", DocRamListenChanges);
        this.addRoute("/docs/ram/mixin", DocRamMixin);
        //#endregion
        //#region doc state
        this.addRoute("/docs/state/create", DocStateCreate);
        this.addRoute("/docs/state/change", DocStateChange);
        this.addRoute("/docs/state/listen_changes", DocStateListen);
        //#endregion
        //#region doc socket
        this.addRoute("/docs/socket/create", DocSocketCreate);
        this.addRoute("/docs/socket/send", DocSocketSend);
        this.addRoute("/docs/socket/receive", DocSocketReceive);
        //#endregion
        //#region doc webcomponent
        this.addRoute("/docs/wc/create", DocWcCreate);
        this.addRoute("/docs/wc/inheritance", DocWcInheritance);
        this.addRoute("/docs/wc/attribute", DocWcAttribute);
        this.addRoute("/docs/wc/property", DocWcProperty);
        this.addRoute("/docs/wc/watch", DocWcWatch);
        this.addRoute("/docs/wc/style", DocWcStyle);
        this.addRoute("/docs/wc/interpolation", DocWcInterpolation);
        this.addRoute("/docs/wc/element", DocWcElement);
        this.addRoute("/docs/wc/binding", DocWcBinding);
        this.addRoute("/docs/wc/injection", DocWcInjection);
        this.addRoute("/docs/wc/loop", DocWcLoop);
        this.addRoute("/docs/wc/event", DocWcEvent);
        this.addRoute("/docs/wc/state", DocWcState);
        //#endregion
        //#region doc lib
        this.addRoute("/docs/lib/create", DocLibCreate);
        this.addRoute("/docs/lib/animation", DocLibAnimation);
        this.addRoute("/docs/lib/callback", DocLibCallback);
        this.addRoute("/docs/lib/drag_and_drop", DocLibDragAndDrop);
        this.addRoute("/docs/lib/instance", DocLibInstance);
        this.addRoute("/docs/lib/press_manager", DocLibPressManager);
        this.addRoute("/docs/lib/resize_observer", DocLibResizeObserver);
        this.addRoute("/docs/lib/resource_loader", DocLibResourceLoader);
        this.addRoute("/docs/lib/watcher", DocLibWatcher);
        this.addRoute("/docs/lib/tools", DocLibTools);
        //#endregion
        //#region doc advanced
        this.addRoute("/docs/advanced/template", DocAdvancedTemplate);
        //#endregion
    }
    error404(state) {
        if (state.name.startsWith("/docs/")) {
            return Page404;
        }
        return null;
    }
}
window.customElements.define('av-doc-app', DocApp);Aventus.WebComponentInstance.registerDefinition(DocApp);

class DocSidenav extends Aventus.WebComponent {
    static __style = `:host{background-color:var(--light-primary-color);font-size:14px;padding:30px;padding-right:5px;width:300px}:host .menu{height:100%;width:100%;z-index:2}:host .menu av-collapse{width:100%}:host .menu av-collapse .title{color:var(--aventus-color);font-size:18px;font-variant:small-caps;font-weight:bold;margin-bottom:5px;margin-top:15px}:host .menu av-collapse ul{margin:0;padding:0}:host .menu av-collapse ul li{color:var(--primary-font-color);cursor:pointer;font-size:12px;letter-spacing:1px;list-style:none;margin:6px;margin-left:15px;padding:0;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host .menu av-collapse ul li av-router-link{transition:opacity .3s var(--bezier-curve)}:host .menu av-collapse ul li av-router-link:not(.active):hover{opacity:.7}:host .menu av-collapse ul li av-router-link.active{color:var(--aventus-color)}:host .menu av-collapse ul li av-router-link.active::before{background-color:var(--aventus-color);bottom:0;content:"";left:-15px;position:absolute;top:0;width:5px}:host .close-icon{color:var(--aventus-color);font-size:24px;position:absolute;right:24px;top:12px;display:none}@media screen and (max-width: 1100px){:host .menu av-collapse ul li{margin:12px;margin-left:15px;font-size:16px}:host .close-icon{display:block}}`;
    __getStatic() {
        return DocSidenav;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocSidenav.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<av-icon icon="close" class="close-icon" _id="docsidenav_0"></av-icon><av-scrollable class="menu">    <av-collapse>        <div class="title" slot="header">install</div>        <ul>            <li><av-router-link state="/docs/introduction">Introduction</av-router-link></li>            <li><av-router-link state="/docs/installation">Install Aventus</av-router-link></li>            <li><av-router-link state="/docs/experience">Dev experience</av-router-link></li>            <li><av-router-link state="/docs/first_app">Your first app</av-router-link></li>        </ul>    </av-collapse>    <av-collapse>        <div class="title" slot="header">configuration</div>        <ul>            <li><av-router-link state="/docs/config/basic_prop">Generic properties</av-router-link></li>            <li><av-router-link state="/docs/config/build">Builds</av-router-link></li>            <li><av-router-link state="/docs/config/static">Statics</av-router-link></li>            <li><av-router-link state="/docs/config/lib">Import libs</av-router-link></li>        </ul>    </av-collapse>    <av-collapse>        <div class="title" slot="header">data</div>        <ul>            <li><av-router-link state="/docs/data/create">Create</av-router-link></li>        </ul>    </av-collapse>    <av-collapse>        <div class="title" slot="header">ram</div>        <ul>            <li><av-router-link state="/docs/ram/create">Create</av-router-link></li>            <li><av-router-link state="/docs/ram/CRUD">CRUD operation</av-router-link></li>            <li><av-router-link state="/docs/ram/listen_changes">Listen changes</av-router-link></li>            <li><av-router-link state="/docs/ram/mixin">Extend data</av-router-link></li>        </ul>    </av-collapse>    <av-collapse>        <div class="title" slot="header">state</div>        <ul>            <li><av-router-link state="/docs/state/create">Create</av-router-link></li>            <li><av-router-link state="/docs/state/change">Change state</av-router-link></li>            <li><av-router-link state="/docs/state/listen_changes">Listen state change</av-router-link></li>        </ul>    </av-collapse>    <av-collapse>        <div class="title" slot="header">socket</div>        <ul>            <li><av-router-link state="/docs/socket/create">Create</av-router-link></li>            <li><av-router-link state="/docs/socket/receive">Receive message</av-router-link></li>            <li><av-router-link state="/docs/socket/send">Send message</av-router-link></li>        </ul>    </av-collapse>    <av-collapse>        <div class="title" slot="header">webcomponent</div>        <ul>            <li><av-router-link state="/docs/wc/create">Create</av-router-link></li>            <li><av-router-link state="/docs/wc/inheritance">Inhertiance</av-router-link></li>            <li><av-router-link state="/docs/wc/attribute">Attribute</av-router-link></li>            <li><av-router-link state="/docs/wc/property">Property</av-router-link></li>            <li><av-router-link state="/docs/wc/watch">Watch</av-router-link></li>            <li><av-router-link state="/docs/wc/style">Style</av-router-link></li>            <li><av-router-link state="/docs/wc/interpolation">Interpolation</av-router-link></li>            <li><av-router-link state="/docs/wc/element">Select element</av-router-link></li>            <li><av-router-link state="/docs/wc/injection">Injection</av-router-link></li>            <li><av-router-link state="/docs/wc/loop">Loop</av-router-link></li>            <li><av-router-link state="/docs/wc/event">Event</av-router-link></li>            <li><av-router-link state="/docs/wc/binding">Binding</av-router-link></li>            <li><av-router-link state="/docs/wc/state">State</av-router-link></li>        </ul>    </av-collapse>    <av-collapse>        <div class="title" slot="header">lib</div>        <ul>            <li><av-router-link state="/docs/lib/create">Create</av-router-link></li>            <li><av-router-link state="/docs/lib/animation">Animation</av-router-link></li>            <li><av-router-link state="/docs/lib/callback">Callback</av-router-link></li>            <li><av-router-link state="/docs/lib/press_manager">PressManager</av-router-link></li>            <li><av-router-link state="/docs/lib/drag_and_drop">Drag&Drop</av-router-link></li>            <li><av-router-link state="/docs/lib/instance">Instance</av-router-link></li>            <li><av-router-link state="/docs/lib/resize_observer">ResizeObserver</av-router-link></li>            <li><av-router-link state="/docs/lib/resource_loader">ResourceLoader</av-router-link></li>            <li><av-router-link state="/docs/lib/watcher">Watcher</av-router-link></li>            <li><av-router-link state="/docs/lib/tools">Tools</av-router-link></li>        </ul>    </av-collapse>    <av-collapse>        <div class="title" slot="header">advanced</div>        <ul>            <li><av-router-link state="/docs/advanced/template">Template</av-router-link></li>        </ul>    </av-collapse></av-scrollable>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "pressEvents": [
    {
      "id": "docsidenav_0",
      "onPress": (e, pressInstance, c) => { c.component.closeNav(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "DocSidenav";
    }
    getNextAndPrevious(state) {
        let result = {
            next: null,
            previous: null
        };
        let active = this.shadowRoot.querySelector(`av-router-link[state="${state}"]`);
        let all = Array.from(this.shadowRoot.querySelectorAll("av-router-link"));
        let index = all.indexOf(active);
        if (index > 0) {
            result.previous = all[index - 1].state;
        }
        if (index < all.length - 1) {
            result.next = all[index + 1].state;
        }
        return result;
    }
    addActiveWatch() {
        let all = Array.from(this.shadowRoot.querySelectorAll("av-router-link"));
        for (let item of all) {
            this.addActiveWatchItem(item);
        }
    }
    addActiveWatchItem(item) {
        item.onActiveChange.add((isActive) => {
            if (isActive) {
                let coll = item.findParentByType(Collapse);
                if (coll) {
                    coll.open = true;
                }
            }
            else {
                let coll = item.findParentByType(Collapse);
                if (coll) {
                    coll.open = false;
                }
            }
        });
    }
    closeNav() {
        this.findParentByType(DocPage).closeMenu();
    }
    postCreation() {
        this.addActiveWatch();
    }
}
window.customElements.define('av-doc-sidenav', DocSidenav);Aventus.WebComponentInstance.registerDefinition(DocSidenav);

class Tabs extends Aventus.WebComponent {
    static __style = ``;
    __getStatic() {
        return Tabs;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Tabs.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "Tabs";
    }
}
window.customElements.define('av-tabs', Tabs);Aventus.WebComponentInstance.registerDefinition(Tabs);

class RoadMapItem extends Aventus.WebComponent {
    static get observedAttributes() {return ["name"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'name'() {
                    return this.getAttribute('name');
                }
                set 'name'(val) {
                    if(val === undefined || val === null){this.removeAttribute('name')}
                    else{this.setAttribute('name',val)}
                }    static __style = `:host{display:flex}:host .card{max-width:400px;position:relative}:host .card .info{background:var(--light-primary-color);border-radius:10px;color:gray;display:flex;flex-direction:column;padding:10px}:host .card .info .title{color:var(--aventus-color);margin:0;position:relative}:host .card .info .title::before{background:var(--primary-color);border:3px solid var(--aventus-color);border-radius:999px;content:"";height:10px;position:absolute;width:10px}:host .card .info p{margin:0;padding:0}:host .card::before{border:solid var(--aventus-color);content:"";position:absolute;width:50%}:host(:nth-child(odd)) .card{padding:30px 0 30px 30px}:host(:nth-child(odd)) .card .info .title::before{left:-45px}:host(:nth-child(odd)) .card::before{border-radius:50px 0 0 50px;border-width:5px 0 5px 5px;bottom:-5px;left:0px;top:-5px}:host(:nth-child(even)) .card{padding:30px 30px 30px 0}:host(:nth-child(even)) .card .info .title{text-align:right}:host(:nth-child(even)) .card .info .title::before{right:-45px}:host(:nth-child(even)) .card .info p{text-align:right}:host(:nth-child(even)) .card::before{border-radius:0 50px 50px 0;border-width:5px 5px 5px 0;bottom:0;right:0;top:0}:host(:first-child) .card::before{border-top:0;border-top-left-radius:0}:host(:last-child:nth-child(odd)) .card::before{border-bottom:0;border-bottom-left-radius:0}:host(:last-child:nth-child(even)) .card::before{border-bottom:0;border-bottom-right-radius:0}`;
    __getStatic() {
        return RoadMapItem;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(RoadMapItem.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="card">    <div class="info">        <h3 class="title" _id="roadmapitem_0"></h3>        <p>            <slot></slot>        </p>    </div></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "name": [
      {
        "id": "roadmapitem_0",
        "attrName": "@HTML",
        "render": (c) => `${c.name}`
      }
    ]
  }
});this.__getStatic().__template.setSchema({globals:["name"]}); }
    getClassName() {
        return "RoadMapItem";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('name')){ this['name'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('name'); }
}
window.customElements.define('av-road-map-item', RoadMapItem);Aventus.WebComponentInstance.registerDefinition(RoadMapItem);

class RoadMap extends Aventus.WebComponent {
    static __style = `:host{display:flex;justify-content:center}:host .timeline{background:var(--primary-color);margin:20px auto;padding:20px}`;
    __getStatic() {
        return RoadMap;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(RoadMap.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="timeline">    <div class="outer">        <slot></slot>    </div></div>` }
    });
}
    getClassName() {
        return "RoadMap";
    }
}
window.customElements.define('av-road-map', RoadMap);Aventus.WebComponentInstance.registerDefinition(RoadMap);

class Result extends Aventus.WebComponent {
    static __style = `:host{align-items:center;border-radius:6px;box-shadow:0 0 3px var(--light-primary-color);display:flex;margin:10px 0px;padding:15px 20px;width:100%}`;
    __getStatic() {
        return Result;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Result.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "Result";
    }
}
window.customElements.define('av-result', Result);Aventus.WebComponentInstance.registerDefinition(Result);

class Page extends Aventus.Navigation.Page {
    static __style = `:host{background-color:var(--secondary-color);height:100%;width:100%}:host .container{display:inline-block;height:100%;margin:auto;max-width:1000px;width:100%}`;
    constructor() { super(); if (this.constructor == Page) { throw "can't instanciate an abstract class"; } }
    __getStatic() {
        return Page;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Page.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'before-container':`<slot name="before-container"></slot>`,'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot name="before-container"></slot><div class="container">    <slot></slot></div>` }
    });
}
    getClassName() {
        return "Page";
    }
    onShow() {
    }
    onHide() {
    }
}

class TutorialPage extends Page {
    get 'open'() {
                return this.hasAttribute('open');
            }
            set 'open'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('open', 'true');
                } else{
                    this.removeAttribute('open');
                }
            }    static __style = `:host{position:100%}:host av-doc-sidenav{transition:left .4s var(--bezier-curve)}:host .hider{background-color:rgba(0,0,0,0);display:none;height:100%;left:0;position:absolute;top:0;width:100%;z-index:99}:host>.container{width:calc(100% - 300px);max-width:none}:host([visible]){display:flex}@media screen and (max-width: 1100px){:host>.container{width:100%}:host av-doc-sidenav{height:calc(100% - 50px);left:-300px;position:absolute;top:50px;z-index:100}:host([open]) av-doc-sidenav{left:0px}:host([open]) .hider{display:block}}`;
    __getStatic() {
        return TutorialPage;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TutorialPage.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'before-container':`    <av-tutorial-sidenav _id="tutorialpage_0"></av-tutorial-sidenav>    <div class="hider" _id="tutorialpage_1"></div>`,'default':`<av-tutorial-app></av-tutorial-app>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "sidenavEl",
      "ids": [
        "tutorialpage_0"
      ]
    }
  ],
  "pressEvents": [
    {
      "id": "tutorialpage_1",
      "onPress": (e, pressInstance, c) => { c.component.closeMenu(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "TutorialPage";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('open')) { this.attributeChangedCallback('open', false, false); } }
    __listBoolProps() { return ["open"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    getNextAndPrevious(state) {
        return this.sidenavEl.getNextAndPrevious(state);
    }
    pageTitle() {
        return "Aventus - Tutorial";
    }
    openMenu() {
        this.open = true;
    }
    closeMenu() {
        this.open = false;
    }
}
window.customElements.define('av-tutorial-page', TutorialPage);Aventus.WebComponentInstance.registerDefinition(TutorialPage);

class TutorialGenericPage extends Page {
    get 'fade'() {
                return this.hasAttribute('fade');
            }
            set 'fade'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('fade', 'true');
                } else{
                    this.removeAttribute('fade');
                }
            }    static __style = `:host{opacity:0;transition:visibility .3s ease-in,opacity .3s ease-in;visibility:hidden}:host .container{max-width:none;width:100%}:host .container av-scrollable{--scroller-right: 10px}:host .container .page-content{font-size:1.6rem;margin:auto;max-width:700px}:host .icon-menu{background-color:#fff;color:var(--primary-color);cursor:pointer;display:none;font-size:25px;left:16px;position:absolute;-webkit-tap-highlight-color:rgba(0,0,0,0);top:28px;z-index:9999}:host h1{color:var(--light-primary-color);font-size:3.2rem;margin:2.3rem 0;text-align:center}:host a{color:var(--link-color);text-decoration:none}:host p{line-height:1.7;text-align:justify}:host av-router-link,:host av-router-link{color:var(--link-color);cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host av-img{max-height:300px;width:100%}:host ul li,:host ol li{margin:5px 0}:host .table .header{border-bottom:1px solid var(--primary-color);font-size:20px;font-weight:bold;padding:5px}:host .table .header av-dynamic-col{text-align:center}:host .table av-dynamic-row{align-items:center;padding:10px}:host .table av-dynamic-row av-dynamic-col{padding:0 15px;text-align:center}:host .cn{background-color:#cfd1d4;border-radius:5px;color:var(--aventus-color);font-size:14px;padding:2px 8px}:host([fade]){opacity:1;visibility:visible}@media screen and (max-width: 1100px){:host .container av-scrollable{--scroller-right: 3px}:host .container .page-content{padding:0px 16px}:host h1{padding:0 32px}:host .icon-menu{display:block}}`;
    __getStatic() {
        return TutorialGenericPage;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TutorialGenericPage.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-scrollable floating_scroll>	<div class="page-content">		<av-icon icon="navicon" class="icon-menu" _id="tutorialgenericpage_0"></av-icon>		<slot></slot>		<av-tutorial-footer></av-tutorial-footer>	</div></av-scrollable>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "pressEvents": [
    {
      "id": "tutorialgenericpage_0",
      "onPress": (e, pressInstance, c) => { c.component.openMenu(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "TutorialGenericPage";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('fade')) { this.attributeChangedCallback('fade', false, false); } }
    __listBoolProps() { return ["fade"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    openMenu() {
        this.findParentByType(TutorialPage).openMenu();
    }
    async show() {
        super.show();
        await Aventus.sleep(100);
        this.fade = true;
        await Aventus.sleep(350);
    }
    async hide() {
        this.fade = false;
        await Aventus.sleep(350);
        super.hide();
    }
    pageTitle() {
        return "Avenuts - Tutorial";
    }
}
window.customElements.define('av-tutorial-generic-page', TutorialGenericPage);Aventus.WebComponentInstance.registerDefinition(TutorialGenericPage);

class TutorialStyle extends TutorialGenericPage {
    static __style = ``;
    __getStatic() {
        return TutorialStyle;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TutorialStyle.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Style</h1><p>It's time for a bit of SCSS. To follow the good practice, we are going to create a <span class="cn">style.css</span>    to define the theme color and set default rules. Inside the <span class="cn">static</span> folder, you can create a    new file named <span class="cn">style.gs.avt</span> (gs is for Global Style) and write the content below.</p><av-code language="css" filename="style.gs.avt">    :root {    \t--primary-color: #b8efe7;    }    &nbsp;    html,    body {    \theight: 100%;    \tmargin: 0;    \tpadding: 0;    \twidth: 100%;    }    &nbsp;    * {    \tbox-sizing: border-box;    }    &nbsp;</av-code></av-code><p>You can check inside the <span class="cn">dist</span> folder. You can find a new file named <span class="cn">style.css</span>. Include it inside your index.html</p><av-code language="html" filename="index.html">    ...    <link rel="stylesheet" href="/style.css">    ...</av-code></av-code><p>Now open the file <span class="cn">App.wc.avt</span>. You can change the <span class="cn">&lt;style&gt;</span>    content with</p><av-code language="html" filename="App.wc.avt">    ...    &lt;style&gt;    \t:host {    \t\theight: 100%;    \t\toverflow: hidden;    \t\twidth: 100%;    &nbsp;    \t\th1 {    \t\t\ttext-align: center;    \t\t}    &nbsp;    \t\t.container {    \t\t\t// autocompletion from the style.gs.avt    \t\t\tbackground-color: var(--primary-color);    \t\t\tdisplay: flex;    \t\t\tmargin: auto;    \t\t\tmax-width: 1400px;    \t\t\tpadding: 50px;    &nbsp;    \t\t\t&gt; * {    \t\t\t\tflex-grow: 1;    \t\t\t\tflex-shrink: 0;    \t\t\t\twidth: 33%;    \t\t\t}    \t\t}    \t}    &nbsp;    &lt;/style&gt;</av-code></av-code><p>As you can see if you try the app, the list style is the same as <span class="cn">vertical</span> than as <span class="cn">horizontal</span>. Open the file <span class="cn">TodoList.wcs.avt</span> and write :</p><av-code language="css" filename="TodoList.wcs.avt">    :host {    \t.container {    \t\tdisplay: flex;    \t\tflex-wrap: wrap;    \t\tgap: 10px;    \t}    }    &nbsp;    /* change the content when design is vertical */    :host([design="vertical"]) {    \t.container {    \t\tflex-direction: column;    \t}    }</av-code></av-code><p>Now we have different style for each list. The last thing to do is to change the style of the todo inside the file    <span class="cn">Todo.wcs.avt</span> you can set :</p><av-code language="css" filename="Todo.wcs.avt">    :host {    \tdisplay: flex;    \tgap: 10px;    &nbsp;    \t.status {    \t\ttext-decoration: underline;    \t\tcursor: pointer;    \t}    }</av-code></av-code><av-img src="/img/tuto/style/final.png"></av-img><p>Well done! You finished the tutorial. If you need more informations you can read the <av-router-link state="/docs/introduction">doc section</av-router-link>.</p>` }
    });
}
    getClassName() {
        return "TutorialStyle";
    }
}
window.customElements.define('av-tutorial-style', TutorialStyle);Aventus.WebComponentInstance.registerDefinition(TutorialStyle);

class TutorialRam extends TutorialGenericPage {
    static __style = ``;
    __getStatic() {
        return TutorialRam;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TutorialRam.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>RAM</h1><p>To store the todo we need a RAM. To achieve that you can right click on the folder <span class="cn">ram</span> and select <span class="cn">Aventus : Create...</span>.</p><av-img src="/img/tuto/ram/create.png"></av-img><p>Then you can select <span class="cn">RAM</span> in the options.</p><av-img src="/img/tuto/ram/ram_options.png"></av-img><p>You can fill the input with <span class="cn">Todo</span> that is the name of the data we want to store.</p><av-img src="/img/tuto/ram/name.png"></av-img><p>A new file is created named <span class="cn">Todo.ram.avt</span>. This file contains errors because <span class="cn">Todo</span> is not known.</p><av-img src="/img/tuto/ram/after_create.png"></av-img><p>To correct this, you can set your cursor on first <span class="cn">Todo</span> that is underline and click on <span class="cn">ctrl + .</span>. This will open the actions available to correct the error.</p><av-img src="/img/tuto/ram/correct.png"></av-img><p>Select the first option to auto import the data Todo class. We didn't have anymore error so we can have a look to the functions.</p><ul>    <li>getInstance : will return the unique instance for this RAM</li>    <li>defineIndexKey : define the name of the key inside the todo that will be used as index key</li>    <li>getTypeForData : return the real object based on the type we received</li></ul><p>Actually we have a data and a ram. This is the small logical part of our application.</p>` }
    });
}
    getClassName() {
        return "TutorialRam";
    }
}
window.customElements.define('av-tutorial-ram', TutorialRam);Aventus.WebComponentInstance.registerDefinition(TutorialRam);

class TutorialList extends TutorialGenericPage {
    static __style = ``;
    __getStatic() {
        return TutorialList;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TutorialList.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>List</h1><p>Now that we can add item, we must display them. To do that, we need to new component (multiple files) named : <span class="cn">TodoList</span> and <span class="cn">TodoListItem</span>. You should know how to create them from the    previous section so do it.</p><p>Now we will start with the item. Open the file <span class="cn">TodoListItem.wcv.avt</span> and add the following    content : </p><av-code language="html" filename="TodoListItem.wcv.avt">    &lt;span&gt;-&lt;/span&gt;    &lt;div class="title"&gt;{{todo_name}}&lt;/div&gt;    &lt;div class="status" @click="updateStatus"&gt;{{todo_status}}&lt;/div&gt;    &lt;button @click="deleteTodo"&gt;delete&lt;/button&gt;</av-code></av-code><p>The class <span class="cn">title</span> will display the <span class="cn">name</span> of the todo and the class <span class="cn">status</span> will display the <span class="cn">status</span> of the todo. When the user click on the    status, the function <span class="cn">updateStatus</span> will be fired and if the user click on the button delete,    the function <span class="cn">deleteTodo</span> will be fired. Import the missing methods and property. The actual    document must be : </p><av-code language="typescript" filename="TodoListItem.wcl.avt">    export class TodoListItem extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region static    &nbsp;    \t//#endregion    &nbsp;    &nbsp;    \t//#region props    \t@Property()    \tpublic todo_name: string;    \t@Property()    \tpublic todo_status: string;    \t//#endregion    &nbsp;    &nbsp;    \t//#region variables    &nbsp;    \t//#endregion    &nbsp;    &nbsp;    \t//#region constructor    &nbsp;    \t//#endregion    &nbsp;    &nbsp;    \t//#region methods    &nbsp;    \t/**    \t *    \t */    \tprotected updateStatus() {    \t\tthrow new Error("Method not implemented.");    \t}    \t/**    \t *    \t */    \tprotected deleteTodo() {    \t\tthrow new Error("Method not implemented.");    \t}    \t//#endregion    &nbsp;    }</av-code></av-code><p>Now we know that the component <span class="cn">TodoListItem</span> must be initialized with a <span class="cn">Todo</span> item. So you can add the following function inside the <span class="cn">methods</span>    region.</p><av-code language="typescript" filename="TodoListItem.wcl.avt">    export class TodoListItem extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t...    &nbsp;    \t//#region variables    \tprivate todo: Todo;    \t//#endregion    &nbsp;    \t...    &nbsp;    \t// refresh properties value    \tpublic updateProps(todo: Todo) {    \t\tthis.todo_name = this.todo.name;    \t\tthis.todo_status = TodoStatus[this.todo.status];    \t}    &nbsp;    \t// entry point to init the component    \tpublic init(todo: Todo) {    \t\tthis.todo = todo;    \t\tthis.updateProps(todo);    \t}    &nbsp;    \t...    &nbsp;    }</av-code></av-code><p>Now we are able to init a <span class="cn">TodoListItem</span> we can create the <span class="cn">TodoList</span>. We    are going to create two lists : one vertical and the other horizontal. Open the file <span class="cn">TodoList.wcl.avt</span> and set your cursor inside the region <span class="cn">props</span>, right    click and select the options <span class="cn">Aventus : Create property</span></p><av-img src="/img/tuto/list/create_prop.png"></av-img><p>Named the property <span class="cn">design</span>, choose the type <span class="cn">Custom</span> and we don't need a    callback. The type for this property is <span class="cn">"vertical" | "horizontal"</span> and the initial value is    <span class="cn">"horizontal"</span>. The current file content must be :</p><av-code language="typescript" filename="TodoList.wcl.avt">    export class TodoList extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region static    &nbsp;    \t//#endregion    &nbsp;    &nbsp;    \t//#region props    \t@Property()    \tpublic design:"vertical" | "horizontal" = "horizontal";    \t//#endregion    &nbsp;    &nbsp;    \t//#region variables    &nbsp;    \t//#endregion    &nbsp;    &nbsp;    \t//#region constructor    &nbsp;    \t//#endregion    &nbsp;    &nbsp;    \t//#region methods    &nbsp;    \t//#endregion    &nbsp;    }</av-code></av-code><p>Now open the file <span class="cn">TodoList.wcv.avt</span> and replace the content by </p><av-code filename="TodoList.wcv.avt" language="html">    &lt;h2&gt;List {{design}}&lt;/h2&gt;    &lt;div class="container" @element="container"&gt;&lt;/div&gt;</av-code></av-code><p>The container is where we will add the TodoListItem, but we didn't register this variable inside the logical part. As    you did before, you can correct error inside the <span class="cn">TodoList.wcl.avt</span> by pressing <span class="cn">ctrl + .</span> and choose the appropriate correction.</p><p>Now we must listen to the todo item creation so we need to subscribe to the manager. We can create a new method named    <span class="cn">subscribeToRAM</span> and start typing :</p><av-code language="typescript" filename="TodoList.wcl.avt">    export class TodoList extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t...    &nbsp;    \tprivate subscribeToRAM() {    \t\tTodoRAM.getInstance().onCreated    \t}    &nbsp;    \t...    &nbsp;    }</av-code></av-code><p>If you set the cursor over the <span class="cn">onCreated</span> method you could notice the following.</p><av-img src="/img/tuto/list/oncreate.png"></av-img><p>This function take as parameter a callback function with a parameter <span class="cn">item:        Aventus.RamItem&lt;Todo&gt;</span>. So you can create a function named <span class="cn">addTodoIntoList</span>    that will create a new <span class="cn">TodoListItem</span> and add it into the <span class="cn">container</span>.</p><av-code language="typescript" filename="TodoList.wcl.avt">    export class TodoList extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t...    &nbsp;    \tprivate addTodoIntoList(todo: Aventus.RamItem&lt;Todo&gt;) {    \t\tlet item = new TodoListItem();    \t\titem.init(todo);    \t\tthis.container.appendChild(item);    \t}    \tprivate subscribeToRAM() {    \t\tTodoRAM.getInstance().onCreated(this.addTodoIntoList);    \t}    &nbsp;    \t...    &nbsp;    }</av-code></av-code><p>Finally we must call the subscribeToRAM. There are 2 options : </p><ul>    <li><span class="cn">constructor</span> : override the constructor to call subscribeToRAM when the element is        created</li>    <li><span class="cn">postCreation</span> : override the function postCreation to call subscribeToRAM when the        element is appended to the DOM.</li></ul><p>We will take the second option. Set your cursor at the end of the <span class="cn">methods</span> region and type    <span class="cn">pos</span>. The autocompletion must suggest you something like that :</p><av-img src="/img/tuto/list/post_creation.png"></av-img><p>Select the <span class="cn">postCreation</span>, the method will be written by Aventus and you can complete the    function body with</p><av-code language="typescript" filename="TodoList.wcl.avt">    export class TodoList extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t...    &nbsp;    \tprotected override postCreation(): void {    \t\tthis.subscribeToRAM();    \t}    &nbsp;    \t...    &nbsp;    }</av-code></av-code><p>There is one last error. By passing the function <span class="cn">addTodoIntoList</span> as parameter, we are losing    the actual <span class="cn"><a href="https://developer.mozilla.org/en-US/docs/Glossary/Scope" target="_blank">scope</a></span> that must be <span class="cn">this == TodoList instance</span>. To correct    the problem, we need to use the function <span class="cn"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" target="_blank">bind</a></span>. The trick consists in replacing the function by the function binded inside    the <span class="cn">constructor</span></p><av-code language="typescript" filename="TodoList.wcl.avt">    export class TodoList extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t...    &nbsp;    \t//#region constructor    \tconstructor() {    \t\tsuper();    \t\tthis.addTodoIntoList = this.addTodoIntoList.bind(this);    \t}    \t//#endregion    &nbsp;    \t...    &nbsp;    }</av-code></av-code><p>The final file</p><av-code language="typescript" filename="TodoList.wcl.avt">    import { TodoListItem } from "../TodoListItem/TodoListItem.wcl.avt";    import { Todo } from "../../data/Todo.data.avt";    import { TodoRAM } from "../../ram/Todo.ram.avt";    export class TodoList extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region static    &nbsp;    \t//#endregion    &nbsp;    &nbsp;    \t//#region props    \t@Property()    \tpublic design: "vertical" | "horizontal" = "horizontal";    \t//#endregion    &nbsp;    &nbsp;    \t//#region variables    \t@ViewElement()    \tprotected container: HTMLDivElement;    \t//#endregion    &nbsp;    &nbsp;    \t//#region constructor    \tconstructor() {    \t\tsuper();    \t\tthis.addTodoIntoList = this.addTodoIntoList.bind(this);    }    \t//#endregion    &nbsp;    &nbsp;    \t//#region methods    \tprivate addTodoIntoList(todo: Aventus.RamItem&lt;Todo&gt;) {    \t\tlet item = new TodoListItem();    \t\titem.init(todo);    \t\tthis.container.appendChild(item);    \t}    &nbsp;    \tprivate subscribeToRAM() {    \t\tTodoRAM.getInstance().onCreated(this.addTodoIntoList);    \t}    &nbsp;    \tprotected override postCreation(): void {    \t\tthis.subscribeToRAM();    \t}    \t//#endregion    &nbsp;    }</av-code></av-code><p>We can change the <span class="cn">App.wc.avt</span> by add the two list inside the <span class="cn">&lt;template&gt;</span></p><av-code language="html" filename="App.wc.avt">    &lt;template&gt;    \t&lt;h1&gt;Todo&lt;/h1&gt;    \t&lt;div class="container"&gt;    \t\t&lt;td-todo-list&gt;&lt;/td-todo-list&gt;    \t\t&lt;td-todo-list design="vertical"&gt;&lt;/td-todo-list&gt;    \t\t&lt;td-create-form&gt;&lt;/td-create-form&gt;    \t&lt;/div&gt;    &lt;/template&gt;</av-code></av-code><p>If you check your browser, and try to insert todo, it should work.</p><av-img src="/img/tuto/list/preview.png"></av-img><p>If you press on <span class="cn">Waiting</span> or <span class="cn">Delete</span> the console will print an error    message because we didn't implement function <span class="cn">updateStatus</span> and <span class="cn">deleteTodo</span>. Open the file <span class="cn">TodoListItem.wcl.avt</span>. First of all we must    change the type <span class="cn">Todo</span> by <span class="cn">Aventus.RamItem&lt;Todo&gt;</span> because the item    is an item from the RAM. We always have to modify data through the RAM to keep the component sync. Then you can writte the following content and read the comment to understand what the line    is doing.</p><av-code language="typescript" filename="TodoListItem.wcl.avt">    import { Todo, TodoStatus } from "../../data/Todo.data.avt";    &nbsp;    export class TodoListItem extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region static    &nbsp;    \t//#endregion    &nbsp;    &nbsp;    \t//#region props    \t@Property()    \tpublic todo_name: string;    \t@Property()    \tpublic todo_status: string;    \t//#endregion    &nbsp;    &nbsp;    \t//#region variables    \tprivate todo: Aventus.RamItem&lt;Todo&gt;;    \t//#endregion    &nbsp;    &nbsp;    \t//#region constructor    \tconstructor() {    \t\tsuper();    \t\t// force the scope to be this class    \t\tthis.updateProps = this.updateProps.bind(this);    \t\tthis.destroy = this.destroy.bind(this);    \t}    \t//#endregion    &nbsp;    &nbsp;    \t//#region methods    &nbsp;    \t// refresh properties value    \tpublic updateProps(todo: Aventus.RamItem&lt;Todo&gt;) {    \t\tthis.todo_name = this.todo.name;    \t\tthis.todo_status = TodoStatus[this.todo.status];    \t}    &nbsp;    \tprivate destroy() {    \t\t// remove update and delete listeners    \t\tthis.todo.offUpdate(this.updateProps);    \t\tthis.todo.offDelete(this.updateProps);    \t\t// remove from the DOM    \t\tthis.remove();    \t\t// remove other stuff    \t\tthis.destructor();    \t}    &nbsp;    \t// entry point to init the component    \tpublic init(todo: Aventus.RamItem&lt;Todo&gt;) {    \t\tthis.todo = todo;    \t\tthis.updateProps(todo);    \t\tthis.todo.onUpdate(this.updateProps);    \t\tthis.todo.onDelete(this.destroy)    \t}    &nbsp;    \tprotected updateStatus() {    \t\t// change the status to the next one    \t\tlet newStatus = (this.todo.status + 1) % 3;    \t\t// update the todo inside the RAM    \t\t// You must use the ram instead of modifying your object to keep the 2 list sync    \t\tthis.todo.update({    \t\t\tstatus: newStatus    \t\t});    \t}    &nbsp;    \tprotected deleteTodo() {    \t\t// delete the todo inside the RAM    \t\t// You must use the ram instead of modifying your object to keep the 2 list sync    \t\tthis.todo.delete();    \t}    \t//#endregion    &nbsp;    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "TutorialList";
    }
}
window.customElements.define('av-tutorial-list', TutorialList);Aventus.WebComponentInstance.registerDefinition(TutorialList);

class TutorialIntroduction extends TutorialGenericPage {
    static __style = ``;
    __getStatic() {
        return TutorialIntroduction;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TutorialIntroduction.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Introduction</h1><p>In this tutorial you are going to learn Aventus core concepts. For this, we are going to create a simple todo list.</p><av-img src="/img/tuto/introduction/final_result.png"></av-img><p>At the end of this tutorial you will be able to :</p><ul>    <li>Structure your project</li>    <li>Understand Webcomponents</li>    <li>Understand Data behaviour</li></ul><h2>Prerequisites</h2><p>For this tutorial you must have Aventus install as VSCode extension.</p>` }
    });
}
    getClassName() {
        return "TutorialIntroduction";
    }
}
window.customElements.define('av-tutorial-introduction', TutorialIntroduction);Aventus.WebComponentInstance.registerDefinition(TutorialIntroduction);

class TutorialInit extends TutorialGenericPage {
    static __style = ``;
    __getStatic() {
        return TutorialInit;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TutorialInit.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Init a project</h1><p>First of all, you need to create your project and configure it. Below you can find the specs of this project :</p><ul>    <li>Module name : TodoDemo</li>    <li>Component prefix : td</li>    <li>Output file : todo.js</li></ul><p>You can create folder where you want named <span class="cn">demo</span> and open it with VSCode. You can right click    on the Explorer section and select <span class="cn">Aventus : Create...</span>.</p><av-img src="/img/tuto/init/create.png"></av-img><p>Then select <span class="cn">Init</span>.</p><av-img src="/img/tuto/init/init.png"></av-img><p>Choose <span class="cn">Default</span></p><av-img src="/img/tuto/init/default.png"></av-img><p>Fill the name with <span class="cn">TodoDemo</span></p><av-img src="/img/tuto/init/default.png"></av-img><p>Fill the component prefix with <span class="cn">td</span></p><av-img src="/img/tuto/init/prefix.png"></av-img><p>The file <span class="cn">aventus.conf.avt</span> will open and the following structure is created</p><av-img src="/img/tuto/init/basic_struct.png"></av-img><p>Replace the <span class="cn">outputFile</span> with <span class="cn">./dist/todo.js</span> and save the file.</p><av-img src="/img/tuto/init/output.png"></av-img><p>Inside the folder static you can create a new file named <span class="cn">index.html</span> with the following    content</p><av-code language="html" filename="index.html">    &lt;!DOCTYPE html&gt;    &lt;html lang="en"&gt;    &nbsp;    \t&lt;head&gt;    \t\t&lt;meta charset="UTF-8"&gt;    \t\t&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;    \t\t&lt;title&gt;Todo demo&lt;/title&gt;    \t\t&lt;script src="/todo.js"&gt;&lt;/script&gt;    \t&lt;/head&gt;    &nbsp;    \t&lt;body&gt;    \t\t&lt;h1&gt;Todo&lt;/h1&gt;    \t&lt;/body&gt;    &nbsp;    &lt;/html&gt;</av-code></av-code><p>Start the live server by clicking on the play button</p><av-img src="/img/tuto/init/play.png"></av-img><p>Your browser will open a new page : </p><av-img src="/img/tuto/init/done.png"></av-img>` }
    });
}
    getClassName() {
        return "TutorialInit";
    }
}
window.customElements.define('av-tutorial-init', TutorialInit);Aventus.WebComponentInstance.registerDefinition(TutorialInit);

class TutorialForm extends TutorialGenericPage {
    static __style = ``;
    __getStatic() {
        return TutorialForm;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TutorialForm.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Form</h1><p>To insert data inside the RAM that we juste created, we need a graphic element. To achieve that you can right click    on the folder <span class="cn">components</span> and select <span class="cn">Aventus : Create...</span>.</p><av-img src="/img/tuto/form/create.png"></av-img><p>Then you can select <span class="cn">Component</span> in the options.</p><av-img src="/img/tuto/form/component_options.png"></av-img><p>You can fill the input with <span class="cn">CreateForm</span> that is the name of the new component.</p><av-img src="/img/tuto/form/name.png"></av-img><p>You can select <span class="cn">Multiple</span> in the options.</p><av-img src="/img/tuto/form/multiple_options.png"></av-img><p>Three new files are created : </p><ul>    <li><span class="cn">CreateForm.wcl.avt</span> for the script / logic</li>    <li><span class="cn">CreateForm.wcs.avt</span> for the style</li>    <li><span class="cn">CreateForm.wcv.avt</span> for the structure</li></ul><p>Lets get started by the HTML. We need an input to enter the name. You can replace the <span class="cn">CreateForm.wcv.avt</span> content by :</p><av-code language="html" filename="CreateForm.wcv.avt">    &lt;h2&gt;Create a new Todo&lt;/h2&gt;    &lt;div class="input-container"&gt;    \t&lt;label for="todo-name"&gt;Name&lt;/label&gt;    \t&lt;input type="text" name="todo-name" @bind="todo_name"&gt;    &lt;/div&gt;    &lt;button @click="save"&gt;Save&lt;/button&gt;</av-code></av-code><p>The <span class="cn">@bind</span> notifies Aventus that a bidirectional binding must be created between the variable    <span class="cn">todo_name</span> and the <span class="cn">value</span> of the input. The <span class="cn">@click</span> means that when a click event is fired on the button, the function <span class="cn">save</span> will be called. When you save the file, 2 errors will be displayed to notify you that    <span class="cn">save</span> and <span class="cn">todo_name</span> don't exist inside this component.</p><p>Open the file <span class="cn">CreateForm.wcl.avt</span>.</p><av-img src="/img/tuto/form/error_logic.png"></av-img><p>First of all set your cursor inside the region <span class="cn">props</span> and press <span class="cn">ctrl +        .</span>. Inside the dropdown select <span class="cn">Import missing property todo_name</span> and fill the    following input with : </p><av-img src="/img/tuto/form/error_correct_name.png"></av-img><av-img src="/img/tuto/form/error_correct_type.png"></av-img><av-img src="/img/tuto/form/error_correct_cb.png"></av-img><p>After that, set your cursor inside the region <span class="cn">methods</span> and press <span class="cn">ctrl +        .</span>. Inside the dropdown select <span class="cn">Import missing methods</span>. Your file must be :</p><av-code language="typescript" filename="CreateForm.wcl.avt">    export class CreateForm extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region static    &nbsp;    \t//#endregion    &nbsp;    &nbsp;    \t//#region props    \t@Property()    \tpublic todo_name: string;    \t//#endregion    &nbsp;    &nbsp;    \t//#region variables    &nbsp;    \t//#endregion    &nbsp;    &nbsp;    \t//#region constructor    &nbsp;    \t//#endregion    &nbsp;    &nbsp;    \t//#region methods    &nbsp;    \t/**    \t *    \t */    \tprotected save() {    \t\tthrow new Error("Method not implemented.");    \t}    \t//#endregion    &nbsp;    }</av-code></av-code><p>Now it's time to code the logic of saving function. The only uncommon thing we must to is to manage the id inside the    form what is normally done by an external system.</p><av-code language="typescript" filename="CreateForm.wcl.avt">    export class CreateForm extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t...    &nbsp;    \t//#region variables    \tprivate todoId: number = 0;    \t//#endregion    &nbsp;    \t...    &nbsp;    \tprotected async save() {    \t\t// create a new todo    \t\tlet todo = new Todo();    \t\t// increase the id    \t\tthis.todoId++;    \t\t// Set the id to the todo    \t\ttodo.id = this.todoId;    \t\t// Set the name to the todo    \t\ttodo.name = this.todo_name;    \t\t// Save todo inside the RAM    \t\tawait TodoRAM.getInstance().create(todo);    \t\t// Reset the input value (because of bidirectional binding)    \t\tthis.todo_name = "";    \t}    &nbsp;    \t...    &nbsp;    }</av-code></av-code><p>Don't forget to auto import missing element with <span class="cn">ctrl + .</span>. We are done with the logical part.    To show what we are doing, we must update the <span class="cn">App.wc.avt</span> file. You can replace the <span class="cn">template</span> with the following content.</p><av-code language="html" filename="App.wc.avt">    ...    &lt;template&gt;    \t&lt;h1&gt;Todo&lt;/h1&gt;    \t&lt;div class="container"&gt;    \t\t&lt;td-create-form&gt;&lt;/td-create-form&gt;    \t&lt;/div&gt;    &lt;/template&gt;    ...</av-code></av-code><p>You can look inside your browser to have a preview</p><av-img src="/img/tuto/form/preview.png"></av-img><p>Maybe we can add a space between the input line and the button. Open the file <span class="cn">CreateForm.wcs.avt</span> and use the following style.</p><av-code language="css" filename="CreateForm.wcs.avt">    :host {    \t.input-container {    \t\tmargin-bottom: 16px;    \t}    }</av-code></av-code><p>You can try to add one item by filling the input and clicking on the button Save. The input must be reset to empty. You can open your <span class="cn">dev tools</span> and inside the console type <span class="cn">TodoDemo.TodoRAM.getInstance().records</span></p><av-img src="/img/tuto/form/inspect.png"></av-img><p>We have a data stored, well done!</p>` }
    });
}
    getClassName() {
        return "TutorialForm";
    }
}
window.customElements.define('av-tutorial-form', TutorialForm);Aventus.WebComponentInstance.registerDefinition(TutorialForm);

class TutorialData extends TutorialGenericPage {
    static __style = ``;
    __getStatic() {
        return TutorialData;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TutorialData.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Create data</h1><p>First of all we have to define the backbone for the application what consists to create all data classes. For this    example we only need a class Todo with basics informations.</p><p>You can right click on the folder <span class="cn">data</span> then select the option <span class="cn">Aventus :        Create...</span>.</p><av-img src="/img/tuto/data/create.png"></av-img><p>Then you can select <span class="cn">Data</span> in the options.</p><av-img src="/img/tuto/data/data_options.png"></av-img><p>You can fill the ouput with the name <span class="cn">Todo</span></p><av-img src="/img/tuto/data/name.png"></av-img><p>You can replace the content of the new file created by </p><av-code language="typescript" filename="Todo.data.avt">    export enum TodoStatus {    \tWaiting,    \tProgress,    \tDone    }    export class Todo extends Aventus.Data implements Aventus.IData {    &nbsp;    \tpublic id: number = 0;    \tpublic name: string = "";    \tpublic status: TodoStatus = TodoStatus.Waiting;    &nbsp;    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "TutorialData";
    }
}
window.customElements.define('av-tutorial-data', TutorialData);Aventus.WebComponentInstance.registerDefinition(TutorialData);

class Page404 extends Page {
    static __style = `:host{height:100%;width:100%}:host p{color:var(--aventus-color);font-size:40px}:host .container{align-items:center;display:flex;flex-direction:column;justify-content:center;max-width:none}`;
    __getStatic() {
        return Page404;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Page404.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<p>404</p><p>Not found</p>` }
    });
}
    getClassName() {
        return "Page404";
    }
    pageTitle() {
        return "Aventus 404";
    }
}
window.customElements.define('av-page-4-0-4', Page404);Aventus.WebComponentInstance.registerDefinition(Page404);

class Home extends Page {
    static __style = `:host{height:100%;width:100%}:host .container{max-width:none}:host .main{background-color:var(--light-primary-color);display:flex;flex-direction:column;height:400px;overflow:hidden;padding:50px 0;position:relative;width:100%}:host .main .icon-text{align-items:center;flex-grow:1;margin:auto;max-width:1000px;width:100%;z-index:2}:host .main .icon-text av-img{--img-color: var(--aventus-color);flex-shrink:0;height:120px;margin-right:15%;transition:all linear .5s;width:85px}:host .main .icon-text .ventus{overflow:hidden;width:calc(100% - 85px)}:host .main .icon-text .ventus span{color:var(--aventus-color);display:inline-block;font-size:165px;font-variant:small-caps;font-weight:bold;margin-top:-83px;overflow:hidden;transition:all linear .5s;width:440px}:host .main .icon-text av-dynamic-col:first-child{flex-direction:row;justify-content:right}:host .main .icon-text av-dynamic-col:nth-child(2){font-size:16px}:host .main .icon-text .title{color:var(--primary-font-color);font-size:30px}:host .main .btn-container{margin:auto;z-index:2}:host .main .btn-container av-dynamic-col{flex-direction:row;justify-content:center}:host .main .btn-container av-dynamic-col av-button{margin:0 10px}:host .main av-img.design-logo{--img-color: rgb(200, 200, 200);height:150%;left:-200px;opacity:.3;position:absolute;top:30px;z-index:1}:host .main av-img.design-logo2{--img-color: rgb(200, 200, 200);height:150%;opacity:.3;position:absolute;right:-200px;top:30px;transform:rotate(180deg);z-index:1}:host .blocks{margin:50px auto;max-width:1200px}:host .blocks av-dynamic-col{padding:10px 20px}:host .blocks av-dynamic-col .block{background-color:var(--light-primary-color);border-radius:5px;box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);color:var(--secondary-color);display:flex;flex-direction:column;height:100%;padding:30px;width:100%}:host .blocks av-dynamic-col .block .title{font-size:28px;font-weight:bold;letter-spacing:1px}:host .blocks av-dynamic-col .block p{align-items:center;display:flex;flex-grow:1;text-align:justify}:host .blocks av-dynamic-col:nth-child(2) .block{background-color:var(--aventus-color)}:host .separator{background:linear-gradient(90deg, transparent 0%, var(--light-primary-color) 50%, transparent 100%);height:1px;margin:auto;width:75%}:host .why{margin:50px auto;max-width:1200px;padding:0 50px}:host .why h2{color:var(--light-primary-color)}:host .why p{font-size:18px;text-align:justify}:host .why .important{font-size:20px;font-weight:600}`;
    __getStatic() {
        return Home;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Home.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<av-scrollable floating_scroll>    <div class="main">        <av-dynamic-row class="icon-text">            <av-dynamic-col size="6">                <av-img src="/img/logo.svg"></av-img>            </av-dynamic-col>            <av-dynamic-col size="4">                <div class="title">                    The webcomponent JavaScript Framework                </div>            </av-dynamic-col>        </av-dynamic-row>        <av-dynamic-row class="btn-container">            <av-dynamic-col size="12">                <av-router-link state="/docs/introduction" class="menu"><av-button>Get                        started</av-button></av-router-link>                <av-router-link state="/tutorial/introduction" class="menu"><av-button>Tutorial</av-button></av-router-link>            </av-dynamic-col>        </av-dynamic-row>        <av-img class="design-logo" src="/img/logo.svg"></av-img>        <av-img class="design-logo2" src="/img/logo.svg"></av-img>    </div>    <div class="blocks">        <av-dynamic-row>            <av-dynamic-col size_sm="12" size_md="4" size="12">                <div class="block">                    <div class="title">Encapsulation</div>                    <p>Avoiding conflicts through encapsulation to build scalable application. Each file has a role to play in keeping your code tidy.</p>                </div>            </av-dynamic-col>            <av-dynamic-col size_sm="12" size_md="4" size="12">                <div class="block">                    <div class="title">For OOP lovers</div>                    <p>Even your graphic components can be defined by class which allows inheritance and genericity. If you love OOP, you will love making views.</p>                </div>            </av-dynamic-col>            <av-dynamic-col size_sm="12" size_md="4" size="12">                <div class="block">                    <div class="title">Type safe</div>                    <p>Prevent errors through typing and make your code more secure. Maintaining a growing application over the long term.</p>                </div>            </av-dynamic-col>        </av-dynamic-row>    </div>    <div class="separator"></div>    <div class="why">        <h2>The Aventus mindset</h2>        <p>Aventus aims to simplify the web by leveraging new native technologies. Webcomponents are just one example. Nowadays, it's possible to build large applications without relying on millions of libraries downloaded via npm and then compiled via a module bundler.</p>        <p>The tool must not be complicated to install, and projects must be able to be created quickly. It's important for users to be able to access and create their own templates to save time.  That's why Aventus is only available as a VSCode extension, making it easy to use.</p>        <p>In short, Aventus is : <span class="important">One tech to rule them all</span>.</p>    </div>    <av-footer></av-footer></av-scrollable>` }
    });
}
    getClassName() {
        return "Home";
    }
    pageTitle() {
        return "Aventus";
    }
}
window.customElements.define('av-home', Home);Aventus.WebComponentInstance.registerDefinition(Home);

class DocGenericPage extends Page {
    get 'fade'() {
                return this.hasAttribute('fade');
            }
            set 'fade'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('fade', 'true');
                } else{
                    this.removeAttribute('fade');
                }
            }    static __style = `:host{opacity:0;transition:visibility .3s ease-in,opacity .3s ease-in;visibility:hidden}:host .container{max-width:none;width:100%}:host .container img{border-radius:5px}:host .container av-scrollable{--scroller-right: 10px}:host .container .page-content{font-size:1.6rem;margin:auto;max-width:700px}:host .icon-menu{background-color:#fff;color:var(--primary-color);cursor:pointer;display:none;font-size:25px;left:16px;position:absolute;-webkit-tap-highlight-color:rgba(0,0,0,0);top:28px;z-index:9999}:host h1{color:var(--light-primary-color);font-size:3.2rem;margin:2.3rem 0;text-align:center}:host a{color:var(--link-color);text-decoration:none}:host p{line-height:1.7;text-align:justify}:host av-router-link,:host av-router-link{color:var(--link-color);cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host av-img{max-height:300px;width:100%}:host ul li,:host ol li{margin:5px 0}:host .table .header{border-bottom:1px solid var(--primary-color);font-size:20px;font-weight:bold;padding:5px}:host .table .header av-dynamic-col{text-align:center}:host .table av-dynamic-row{align-items:center;padding:10px}:host .table av-dynamic-row av-dynamic-col{padding:0 15px;text-align:center}:host .cn{background-color:#cfd1d4;border-radius:5px;color:var(--aventus-color);font-size:14px;padding:2px 8px}:host([fade]){opacity:1;visibility:visible}@media screen and (max-width: 1100px){:host .container av-scrollable{--scroller-right: 3px}:host .container .page-content{padding:0px 16px}:host h1{padding:0 32px}:host .icon-menu{display:block}}`;
    __getStatic() {
        return DocGenericPage;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocGenericPage.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-scrollable floating_scroll>	<div class="page-content">		<av-icon icon="navicon" class="icon-menu" _id="docgenericpage_0"></av-icon>		<slot></slot>		<av-doc-footer></av-doc-footer>	</div></av-scrollable>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "pressEvents": [
    {
      "id": "docgenericpage_0",
      "onPress": (e, pressInstance, c) => { c.component.openMenu(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "DocGenericPage";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('fade')) { this.attributeChangedCallback('fade', false, false); } }
    __listBoolProps() { return ["fade"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    openMenu() {
        this.findParentByType(DocPage).openMenu();
    }
    async show() {
        super.show();
        await Aventus.sleep(100);
        this.fade = true;
        await Aventus.sleep(350);
    }
    async hide() {
        this.fade = false;
        await Aventus.sleep(350);
        super.hide();
    }
    pageTitle() {
        return "Avenuts - Documentation";
    }
}
window.customElements.define('av-doc-generic-page', DocGenericPage);Aventus.WebComponentInstance.registerDefinition(DocGenericPage);

class DocWcWatch extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocWcWatch;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcWatch.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Watch</h1><p>In the section you are going to learn how you can define variables for your component that will fire a callback when    something occur. In contrast to <span class="cn">Attribute</span> and <span class="cn">Property</span>, the <span class="cn">Watch</span> variable won't be reflected on the tag. This allow you to set complex type for the    variable. The watch variable is based on a <span class="cn"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy" target="_blank">Proxy</a></span>.</p><h2>Create a watch</h2><p>To declare a watch variable, you must add the decorator <span class="cn">@Watch</span>.</p><av-code language="typescript" filename="Example.wcl.avt">    export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region variables    \t@Watch((target: Person, action: Aventus.WatchAction, path: string, value: any) =&gt; {    \t\tconsole.log(Aventus.WatchAction[action] + " on " + path + " with value " + value);    \t})    \tpublic person: Person = null;    \t//#endregion    &nbsp;    }</av-code></av-code><p>You can notice that the callback function contains more parameters than the <span class="cn">Property</span>    decorator. This is due to the object complexity you can set. If <span class="cn">Person</span> is defined by the    following class</p><av-code language="typescript" filename="Person.data.avt">    export class Person extends Aventus.Data implements Aventus.IData {    \tpublic id: number = 0;    \tpublic name: string = "";    \tpublic children: { name: string }[] = [ { name:"John" } ];    }</av-code></av-code><p>A lot of actions can be done on this object like changing the name, adding/removing a child, etc. With the parameters    defined inside the callback you can know exactly what is happening with your data. </p><p>The <span class="cn">action</span> is a enum that define if the object is <span class="cn">CREATED</span>, <span class="cn">UPDATED</span> or <span class="cn">DELETED</span>.</p><p>The <span class="cn">path</span> parameter is the path where the action occured (ex: <span class="cn">person.children[0].name</span> if we    change the name of the first child).</p><p>The <span class="cn">value</span> is the value set / remove on the path.</p><p>Like the property, the main advantage of Watch variables is that they can be used inside <span class="cn"><av-router-link state="/docs/wc/interpolation">interpolation</av-router-link></span> and others view    transformations.</p><av-code language="typescript" filename="Input.wcl.avt">    export class Input extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region variables    \t@Watch()    \tprivate label:string = "";    \t//#endregion    &nbsp;    }</av-code></av-code><av-code language="html" filename="Input.wcv.avt">    &lt;label&gt;{{label}}&lt;/label&gt;    &lt;input /&gt;</av-code></av-code><h2>Debug a watch</h2><p>Because when you are building big application a lot of actions can modify your watch variable, we add a debug feature    to easly understand what change my value. Over the webcomponent class you must add the decorator <span class="cn">@Debugger</span> with the option <span class="cn">enableWatchHistory</span> to true.</p><av-code language="typescript" filename="Example.wcl.avt">    @Debugger({    \tenableWatchHistory: true    })    export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region variables    \t@Watch((target: Person, action: Aventus.WatchAction, path: string, value: any) =&gt; {    \t\tconsole.log(Aventus.WatchAction[action] + " on " + path + " with value " + value);    \t})    \tpublic person: Person = null;    \t//#endregion    &nbsp;    }</av-code></av-code><p>This will add 2 functions on this component named <span class="cn">getWatchHistory</span> to get all changes on the    waches variables and <span class="cn">clearWatchHistory</span> to clear the current history. Both functions are only    available inside your DevTools Console.</p><av-img src="/img/doc/wc/watch/debug.png"></av-img><h2>Using watch outisde component</h2><p>You can watch what occur on an object everywhere on your code. To achieve that, you must use the <span class="cn">Aventus.Watcher.get</span> and work only with the result of the function.</p><av-code language="typescript" filename="Test.lib.avt">    export function createWatcher() {    \tlet watchableObj = Aventus.Watcher.get({}, (action: WatchAction, path: string, element: any) =&gt; {    \t\tconsole.log(Aventus.WatchAction[action] + " on " + path + " with value " + value);    \t});    \treturn watchableObj;    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocWcWatch";
    }
}
window.customElements.define('av-doc-wc-watch', DocWcWatch);Aventus.WebComponentInstance.registerDefinition(DocWcWatch);

class DocWcStyle extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocWcStyle;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcStyle.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Style</h1><p>In the section you are going to learn how to apply a style to your component.</p><h2>Definition</h2><p>Because Aventus is build on the top of webcomponent, the style is scoped. It means that the style from Component 1    won't affect the style from Component 2. If you wan't more information about scoped style inside webcomponent you    can read <a href="https://web.dev/shadowdom-v1/#component-defined-styles" target="_blank">this</a>. It's great but    it involves that each components must include it own style locally. What if I want to create a general style for all    my components. This is why in addition to webcomponent scoped style, Aventus using the <span class="cn"><a href="https://web.dev/constructable-stylesheets/" target="_blank">Constructable Stylesheets</a></span> to    improve reusability.</p><h2>Local style</h2><p>To edit the style of your component, you must open the file <span class="cn">*.wcs.avt</span> and add the style you    want written in SCSS. The only special selector inside webcomponent style is the <span class="cn">:host</span> that    will target the current custom element.</p><av-code language="css" filename="Example.wcs.avt">    :host {    \tbackground-color: gray;    \t.title {    \t\tcolor: orange;    \t}    }    &nbsp;    :host([active]) { // if the webcomponent has an attribute / property active    \t.title {    \t\tcolor: red;    \t}    }</av-code></av-code><h2>Inherit style</h2><p>If a webcomponent is inheriting another webcomponent, their styles will be merged. Parent style will be written    before Child style so that you can override parent style without problem.</p><av-code language="css" filename="Parent.wcs.avt">    :host {    \tbackground-color: gray;    \t.title {    \t\tcolor: orange;    \t}    }</av-code></av-code><av-code language="css" filename="Child.wcs.avt">    :host {    \t.title {    \t\tcolor: blue;    \t}    }</av-code></av-code><av-code language="css" filename="merge.css">    :host {    \tbackground-color: gray;    }    :host .title {    \tcolor: orange;    }    :host .title {    \tcolor: blue;    }</av-code></av-code><p>The title will be blue instead of orange.</p><h2>External style</h2><p>If you want to create some utility classes for components, you can create file named <span class="cn">*.gwcs.avt</span> for Global WebComponent Style, then you can include this file inside component.    This file is also a SCSS file.</p><h3>Create the file</h3><p>You can create the global style file where you want, but you have to add it inside the <span class="cn">aventus.conf.avt</span> under the section <span class="cn">build.componentStyle</span>.</p><av-code language="css" filename="utility.gwcs.avt">    .center {    \ttext-align: center;    }</av-code></av-code><av-code language="json" filename="aventus.conf.avt">    {    \t...    \tbuild: [    \t\t{    \t\t\t...    \t\t\t"componentStyle": [    \t\t\t\t{    \t\t\t\t\t"name": "@Utility",    \t\t\t\t\t"path": "./src/styles/utility.gwcs.avt"    \t\t\t\t}    \t\t\t]    \t\t\t...    \t\t}    \t]    }</av-code></av-code><p>This will register the file <span class="cn">utility.gwcs.avt</span> inside the <span class="cn">Aventus.Style</span>    lib with the name <span class="cn">@Utility</span>.</p><av-img src="/img/doc/wc/style/stylemanager.png"></av-img><p>If you want to use an external lib as a style for your component, you can use the <span class="cn">load</span>    function. For example to load the bootstrap class : </p><av-code language="typescript" filename="Bootstrap.lib.avt">    export function loadBootstrap() {    Aventus.Style.getInstance().load("@Bootstrap",    "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css");    }</av-code></av-code><p>By default, a base style existing inside <span class="cn">Style</span>. This style is named <span class="cn">@general</span> and is composed by</p><av-code language="css" filename="@general">    :host{    \tdisplay:inline-block;    \tbox-sizing:border-box    }    :host *{    \tbox-sizing:border-box    }</av-code></av-code><h3>Use global style</h3><p>Now that you have style registered, you can tell your component to use this style. You can override 2 methods inside    the logical file <span class="cn">*.wcl.avt</span> named : <span class="cn">styleBefore</span> and <span class="cn">styleAfter</span>.</p><av-code language="typescript" filename="Example.wcl.avt">    export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {    \t...    \t // Inside Aventus.WebCompoent the value of styleBefore is ["@general"]    \tprotected override styleBefore(): string[] {    \t\treturn ["@general", "@Bootstrap"];    \t}    \tprotected override styleAfter(): string[] {    \t\treturn ["@Utility"];    \t}    \t...    }</av-code></av-code><p>The style loaded will be the following :</p><ol>    <li>@general</li>    <li>@Bootstrap</li>    <li>parent style inside <span class="cn">*.wcs.avt</span></li>    <li>local style inside <span class="cn">*.wcs.avt</span></li>    <li>@Utility</li></ol><h2>Edit style from outside</h2><p>When you create component for a library, you should provide some style parameter that the user can edit. What if the    library user want to change the backgroud-color. The style is scoped so he won't be able to edit it from outside.    This is why you can define <span class="cn">custom property</span> inside your component. Declaring a custom    property can be done by following the next pattern:</p><av-code language="css" filename="Example.wcs.avt">    :host {    \t--internal-background-color: var(--background-color, red);    }    &nbsp;    :host {    \t.content {    \t\tbackgroud-color: var(--internal-background-color);    \t}    }</av-code></av-code><p>The property declaration must be done inside the <span class="cn">:host</span> at the first level and following the    schema --internal-<b>x</b>: var(--<b>x</b>). In the future version of Aventus you will be able to use the <span class="cn">@property</span> tag in css and the completion will be improved. The current schema is used to be    detected by the parser so that an auto-completion can be provided when you editing the style of the element.</p><av-code language="css" filename="Example2.wcs.avt">    :host {    \tav-example {    \t\t// come from auto-completion    \t\t--background-color: red;    \t}    }</av-code></av-code><h2>Creating theme</h2><p>A good pratice when you developing application is to create theme file where you can declare globals properties for    the project. Inside Aventus you can achieve it by creating a new file named <span class="cn">*.gs.avt</span> for    Global Style. This file must be set inside a <span class="cn"><av-router-link state="/docs/config/static">static</av-router-link></span> part of your project. This allows you to have    auto-completion for all your global variables that must be declared inside the <span class="cn">:root</span>    selector.</p><av-code language="css" filename="main.gs.avt">    :root {    \t--primary-color: red;    \t--secondary-color: blue;    ...    }</av-code></av-code><av-code language="css" filename="Example.wcs.avt">    :host {    \tbackground-color: var(--primary-color);    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocWcStyle";
    }
}
window.customElements.define('av-doc-wc-style', DocWcStyle);Aventus.WebComponentInstance.registerDefinition(DocWcStyle);

class DocWcState extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocWcState;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcState.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - State</h1><p>In the section you are going to learn how you can listen to <span class="cn">state</span> inside Webcomponent.</p><p>You can use state and stateManager to manage the lifecycle of your application. You can subscribe manually to a state    manager (the explanation is <av-router-link state="/docs/state/listen_changes">here</av-router-link>). To developer    faster, you can use <span class="cn">Decorator</span> over methods of Webcomponent. Each method has its own    decorator: </p><ul>    <li>active: <span class="cn">@StateActive</span></li>    <li>inactive: <span class="cn">@StateInactive</span></li>    <li>askChange: <span class="cn">@StateChange</span></li></ul><p>When you set a Decorator over a method, this method will be fired when the state pattern, the manager and the method    matching</p><av-code language="typescript" filename="Example.wcl.avt">    export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t@StateActive("/state1", MainStateManager)    \tpublic onStateActive(state: Aventus.State, slugs: Aventus.StateSlug) {    \t\tconsole.log("/state1 on");    \t}    &nbsp;    \t@StateInactive("/state1", MainStateManager)    \tpublic onStateInactive(state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) {    \t\tconsole.log("/state1 off");    \t}    &nbsp;    \t@StateChange("/state1", MainStateManager)    \tpublic async onAskChange(state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) {    \t\treturn confirm("set state1 off?")    \t}    &nbsp;    \t/**    \t* Use this method to change state    \t*/    \tpublic toggleState() {    \t\tlet mainState = MainStateManager.getInstance();    \t\tif(mainState.getState()?.name == "/state1") {    \t\t\tmainState.setState("/");    \t\t}    \t\telse {    \t\t\tmainState.setState("/state1");    \t\t}    \t}    }</av-code></av-code><p>Inside the Decorator you must define which StateManager must be watched. You can provide a class object <span class="cn">MainStateManager.getInstance()</span> or a class definition <span class="cn">MainStateManager</span>.    If you set a class definition, Aventus will create a instance by using : <span class="cn">Aventus.Instance.get()</span>.</p><p>You can still use parameters inside the pattern to get slugs like <span class="cn">/state/{id:number}/{action:string}</span>.</p><p>If you need to do actions when none of your component state is active you can add two others Decorator : <span class="cn">@DefaultStateActive</span> and <span class="cn">@DefaultStateInactive</span>.</p><av-code language="typescript" filename="Example.wcl.avt">    export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t...    &nbsp;    \t@DefaultStateActive(MainStateManager)    \tpublic onDefaultStateActive() {    \t\tconsole.log("none of your state was active but now one is active");    \t}    \t@DefaultStateInactive(MainStateManager)    \tpublic onDefaultStateInactive() {    \t\tconsole.log("one of your state was active but now none is active");    \t}    &nbsp;    \t...    &nbsp;    }</av-code></av-code><p>When you don't need anymore a component instance inside the view, don't forget to call the method <span class="cn">destructor</span> to clear all state subscbriptions.</p>` }
    });
}
    getClassName() {
        return "DocWcState";
    }
}
window.customElements.define('av-doc-wc-state', DocWcState);Aventus.WebComponentInstance.registerDefinition(DocWcState);

class DocWcProperty extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocWcProperty;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcProperty.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Property</h1><p>In the section you are going to learn how you can define property for your component and add a callback when the    attribute change.</p><h2>Simple property</h2><p>A property is defined by two things:</p><ul>    <li>An attribute on your tag</li>    <li>A callback to be notified when the value of the attribute changed</li></ul><p>The property is based on the observe attribute behaviour on webcomponent. You can find more inforamtions about this    <a href="https://web.dev/custom-elements-v1/#observing-changes-to-attributes" target="_blank">here</a></p><p>In Aventus, you can declare a property by adding a <span class="cn">decorator</span> on a field.</p><av-code language="typescript" filename="Input.wcl.avt">    export class Input extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region props    \t@Property()    \tprivate label:string = "";    \t//#endregion    &nbsp;    }</av-code></av-code><av-code language="html">    &lt;av-input label="Hello"&gt;&lt;/av-input&gt;</av-code></av-code><p>A property can be used like an <span class="cn">attribute</span> but the main advantage of property is <span class="cn"><av-router-link state="/docs/wc/interpolation">interpolation</av-router-link></span> and <span class="cn">callback</span>.</p><av-code language="typescript" filename="Input.wcl.avt">    export class Input extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region props    \t@Property((target: Input) =&gt; {    \t\tconsole.log("my label changed")    \t})    \tprivate label:string = "";    \t//#endregion    &nbsp;    }</av-code></av-code><av-code language="html" filename="Input.wcv.avt">    &lt;label&gt;{{label}}&lt;/label&gt;    &lt;input /&gt;</av-code></av-code><p>With this code, the label inside the view will always be the same as the label property. Furthermore, when the label value changed, the callback will be called and the msg my label changed will be printed.</p><h2>Quick use</h2><p>When you are editing a <span class="cn">*.wcl.avt</span>, you can right click where you want to create an attribute    and select the option <i>Aventus: create attribute</i>. You must follow the instruction to get an attribute working.</p>` }
    });
}
    getClassName() {
        return "DocWcProperty";
    }
}
window.customElements.define('av-doc-wc-property', DocWcProperty);Aventus.WebComponentInstance.registerDefinition(DocWcProperty);

class DocWcLoop extends DocGenericPage {
    static __style = `:host .todos-img{margin:auto;max-height:none;max-width:200px;display:flex}`;
    __getStatic() {
        return DocWcLoop;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcLoop.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Loop</h1><p>In the section you are going to learn how you can create a loop inside your view to display array.</p><p>Inside Aventus, you can declare loop inside your <span class="cn">*.wcv.avt</span> with the following pattern :    <br /><span class="cn">@for="$item, $index in $data"</span>. As en example we will display a list of todos.</p><av-code language="typescript" filename="Todo.data.avt">    export class Todo extends Aventus.Data implements Aventus.IData {    \tpublic id: number = 0;    \tpublic name: string = "";    \tpublic tasks: string[] = [];    }</av-code></av-code><av-code language="typescript" filename="List.wcl.avt">    export class List extends Aventus.WebComponent implements Aventus.DefaultComponent {    \t@Watch()    \tpublic todos: Todo = [];    &nbsp;    \tpublic addTodo() {    \t\tlet todo = new Todo();    \t\ttodo.name = "My todo";    \t\ttodo.tasks = ["task1", "task2"];    \t\tthis.todos.push(todo);    \t}    }</av-code></av-code><av-code language="html" filename="List.wcv.avt">    &lt;h1&gt;Todos&lt;/h1&gt;    &lt;div class="todo" @for="todo, i in todos" style="margin-bottom:10px"&gt;    \t&lt;div class="name"&gt;{{todo.name}}&lt;/div&gt;    \t&lt;div class="tasks"&gt;    \t\t&lt;div class="task" @for="task, j in todo.tasks" style="margin-left:10px"&gt;{{i}}-{{j}}. {{task}}&lt;/div&gt;    \t&lt;/div&gt;    &lt;/div&gt;    &lt;button @click="addTodo"&gt;Add&lt;/button&gt;</av-code></av-code><av-img src="/img/doc/wc/loop/todos.png" mode="contains" class="todos-img"></av-img><p>You can see that the <span class="cn">i</span> and the <span class="cn">j</span> value starting at 0. You can add a +1 inside the curly braces (<span class="cn">&#123;&#123;i+1&#125;&#125;-&#123;&#123;j+1&#125;&#125;. &#123;&#123;task&#125;&#125;</span>) but Aventus will trigger an error. The code will compile anyway so you can write it. This is because inside Aventus future version you will be able to write Typescript code between curly braces.</p><p>With the help on the <span class="cn"><av-router-link state="/docs/wc/watch">Watch</av-router-link></span> variable, the component can know what changed and can update only the part impacted by the change. No virtual DOM is involved and only the needed part is updated inside the DOM.</p><p>If you use <span class="cn">@element</span> inside a loop, the variable will be imported as an array.</p>` }
    });
}
    getClassName() {
        return "DocWcLoop";
    }
}
window.customElements.define('av-doc-wc-loop', DocWcLoop);Aventus.WebComponentInstance.registerDefinition(DocWcLoop);

class DocWcInterpolation extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocWcInterpolation;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcInterpolation.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Interpolation</h1><p>In the section you are going to learn how to use interpolation inside webcomponent.</p><p>Interpolation refers to embedding expressions into marked up text. You can notify an interpolation by using <span class="cn">&#123;&#123; myVar &#125;&#125;</span>. Interpolation can be written anywhere inside a <span class="cn">*.wcv.avt</span>. The only constraint is that the variable to interpolate must be a <span class="cn"><av-router-link state="/docs/wc/property">Property</av-router-link></span> or a <span class="cn"><av-router-link state="/docs/wc/watch">Watch</av-router-link></span>.</p><av-code language="typescript" filename="Example.wcl.avt">    export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {    \t@Property()    \tpublic label: string = "My name is";    \t@Watch()    \tpublic person: { name: string } = { name: "John" }    }</av-code></av-code><av-code language="html" filename="Example.wcv.avt">    &lt;label&gt;{{label}}&lt;/label&gt;    &lt;input value="{{person.name}}" /&gt;</av-code></av-code><p>Currently only property or watch can be used but maybe in the future version of Aventus, you will be able to write normal javascript code.</p>` }
    });
}
    getClassName() {
        return "DocWcInterpolation";
    }
}
window.customElements.define('av-doc-wc-interpolation', DocWcInterpolation);Aventus.WebComponentInstance.registerDefinition(DocWcInterpolation);

class DocWcInjection extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocWcInjection;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcInjection.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Injection</h1><p>In the section you are going to learn how you can inject data from parent into the child.</p><h2>Add injection</h2><p>To bind add an injection on a child inside the shadowroot, you can use the following syntax : <span class="cn">:fieldOnChild=""</span></p><p>With the code below, the input value will be incremented each second</p><av-code language="html" filename="Timer.wcv.avt">    &lt;input type="text" :value="time" /&gt;</av-code></av-code><av-code language="typescript" filename="Timer.wcl.avt">    export class Timer extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region static    &nbsp;    \t//#endregion    &nbsp;    \t//#region props    &nbsp;    \t//#endregion    &nbsp;    \t//#region variables    \t@Watch()    \tprivate time:number = 0;    \t//#endregion    &nbsp;    \t//#region constructor    &nbsp;    \t//#endregion    &nbsp;    \tprotected override postCreation() {    \t\tsetTimeout(() =&gt; { this.time++ })    \t}    &nbsp;    }</av-code></av-code><p>You can only use injection with <span class="cn">@Property</span> and <span class="cn">@Watch</span> values.</p>` }
    });
}
    getClassName() {
        return "DocWcInjection";
    }
}
window.customElements.define('av-doc-wc-injection', DocWcInjection);Aventus.WebComponentInstance.registerDefinition(DocWcInjection);

class DocWcInheritance extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocWcInheritance;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcInheritance.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Inheritance</h1><p>In the section you are going to learn how you can create complex component based on inheritance. This is useful when    you want to create a simple design for a component and then add some complexity.</p><h2>Delegate Function</h2><p>We start the inheritance with a simple example. We need a component <span class="cn">fillable</span> to implement <span class="cn">input[type="text"]</span>,    <span class="cn">input[type="number"]</span> and <span class="cn">input[type="checkbox"]</span>. First of all we create an abstract generic component with a label    and a default value.</p><av-code language="typescript" filename="Fillable.wcl.avt">    export abstract class Fillable&lt;T&gt; extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region static    &nbsp;    \t//#endregion    &nbsp;    \t//#region props    \t@Property()    \tpublic label: string;    \t//#endregion    &nbsp;    \t//#region variables    \t@Watch((target: Fillable) =&gt; {    \t\ttarget.valueChanged();    \t})    \tpublic value: T = defaultValue();    \t//#endregion    &nbsp;    \t//#region constructor    &nbsp;    \t//#endregion    &nbsp;    \tprotected abstract defaultValue(): T;    \tprotected valueChanged(): void {};    &nbsp;    }</av-code></av-code><av-code language="html" filename="Fillable.wcv.avt">    &lt;label&gt;{{ label }}&lt;/label&gt;    &lt;slot&gt;&lt;/slot&gt;</av-code></av-code><p>Now we can implement the <span class="cn">input[type="text"]</span>.</p><av-code language="typescript" filename="TextInput.wcl.avt">    export class TextInput extends Fillable&lt;string&gt; implements Aventus.DefaultComponent {    &nbsp;    \t//#region static    &nbsp;    \t//#endregion    &nbsp;    \t//#region props    &nbsp;    \t//#endregion    &nbsp;    \t//#region variables    &nbsp;    \t//#endregion    &nbsp;    \t//#region constructor    &nbsp;    \t//#endregion    &nbsp;    \tprotected override defaultValue(): string {    \t\t return "";    \t}    &nbsp;    }</av-code></av-code><p>As you can see, we can easly implement logic for child when main logic part of the component is coded inside the    parent.</p><h2>Replace slot</h2><p>We override the function but we don't have any input inside the view. Inside the view, we can use the pattern called    <span class="cn">View composition</span>. If you write some HTML code inside child view file, Aventus will replace the parent    <span class="cn">slot</span> tag with the content of the child.</p><av-code language="html" filename="TextInput.wcv.avt">    &lt;input type="text" value="{{ value }}" /&gt;</av-code></av-code><p>The HTML code from <span class="cn">TextInput.wcv.avt</span> will replace the <span class="cn">slot</span> tag inside from <span class="cn">Fillable.wcv.avt</span>. The    merged result will be :</p><av-code language="html" filename="Merged">    &lt;label&gt;{{ label }}&lt;/label&gt;    &lt;input type="text" value="{{ value }}" /&gt;</av-code></av-code><p>This is the basic behaviour, but sometimes you need more slots. You can name your slot then wrap the child code    inside tag <span class="cn">block</span>. If you don't wrap child code inside block tag, Aventus will consider that this code must replace    the default slot.</p><av-code language="html" filename="Fillable.wcv.avt">    &lt;slot name="error"&gt;&lt;/slot&gt;    &lt;label&gt;{{ label }}&lt;/label&gt;    &lt;slot&gt;&lt;/slot&gt;</av-code></av-code><av-code language="html" filename="TextInput.wcv.avt">    &lt;block name="error"&gt;    &lt;span&gt;I'm an error&lt;/span&gt;    &lt;/block&gt;    &lt;input type="text" value="{{ value }}" /&gt;</av-code></av-code><av-code language="html" filename="Merged">    &lt;span&gt;I'm an error&lt;/span&gt;    &lt;label&gt;{{ label }}&lt;/label&gt;    &lt;input type="text" value="{{ value }}" /&gt;</av-code></av-code><p>Right now, no error is displayed inside the editor if you missspelled your block name. It ll be added soon.</p><h2>Replace the parent view</h2><p>If you want to keep the parent logic but change the child view, you can use the decorator <span class="cn">@OverrideView</span>. For    example, the input[type="checkbox"] don't need a label so we can remove it from parent.</p><av-code language="typescript" filename="CheckboxInput.wcl.avt">    @OverrideView()    export class CheckboxInput extends Fillable&lt;boolean&gt; implements Aventus.DefaultComponent {    &nbsp;    \t//#region static    &nbsp;    \t//#endregion    &nbsp;    \t//#region props    &nbsp;    \t//#endregion    &nbsp;    \t//#region variables    &nbsp;    \t//#endregion    &nbsp;    \t//#region constructor    &nbsp;    \t//#endregion    &nbsp;    \tprotected override defaultValue(): boolean {    \t\t return false;    \t}    &nbsp;    }</av-code></av-code><av-code language="html" filename="CheckboxInput.wcv.avt">    &lt;input type="checkbox" /&gt;</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocWcInheritance";
    }
}
window.customElements.define('av-doc-wc-inheritance', DocWcInheritance);Aventus.WebComponentInstance.registerDefinition(DocWcInheritance);

class DocWcEvent extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocWcEvent;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcEvent.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Event</h1><p>In the section you are going to learn how you can listen to event trigger.</p><h2>Add event</h2><p>To bind an event on a child inside the shadowroot, you can use the following syntax : <span class="cn">@eventname=""</span></p><p>With the code below, a "Hello world" will be printed</p><av-code language="html" filename="Button.wcv.avt">    &lt;button @click="sayHello"&gt;Say hello to console&lt;/button&gt;</av-code></av-code><av-code language="typescript" filename="Button.wcl.avt">    export class Button extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region static    &nbsp;    \t//#endregion    &nbsp;    \t//#region props    &nbsp;    \t//#endregion    &nbsp;    \t//#region variables    &nbsp;    \t//#endregion    &nbsp;    \t//#region constructor    &nbsp;    \t//#endregion    &nbsp;    \t//#region methods    \tprivate sayHello(): void {    \t\tconsole.log("Hello world");    \t}    \t//#endregion    &nbsp;    }</av-code></av-code><p>If you have an <av-router-link state="/docs/lib/callback">Aventus.CallbackManager</av-router-link> instead of an event, you can use    this syntax to subscribe to the trigger.</p>` }
    });
}
    getClassName() {
        return "DocWcEvent";
    }
}
window.customElements.define('av-doc-wc-event', DocWcEvent);Aventus.WebComponentInstance.registerDefinition(DocWcEvent);

class DocWcElement extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocWcElement;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcElement.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Select element</h1><p>In the section you are going to learn how to select a element from your shadowroot to use it inside your logical    part.</p><h2>Normal case</h2><p>Inside the <span class="cn">*.wcv.avt</span> file you can add an attribute <span class="cn">@element</span> to tag    your element.</p><av-code language="html" filename="Img.wcv.avt">    &lt;div class="img-container" @element="container"&gt;    \t&lt;img @element="imgEl"/&gt;    &lt;/div&gt;</av-code></av-code><p>When you save your file, the attribute <span class="cn">@element</span> will be underlined in red because you didn't    declare the variable    inside the <span class="cn">*.wcl.avt.</span> You can open this file and if you have sections, the variables section    will be underline. You    can alt+. and click on "Import missing view element". This will create the two variables with a <span class="cn">protected</span>    modifier and a decorator <span class="cn">@ViewElement</span>. This decorator is set to have a quick vision on which    variables are    used inside your view.</p><av-code language="typescript" filename="Img.wcl.avt">    export class Img extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region static    &nbsp;    \t//#endregion    &nbsp;    \t//#region props    &nbsp;    \t//#endregion    &nbsp;    \t//#region variables    \t@ViewElement()    \tprotected container: HTMLDivElement;    &nbsp;    \t@ViewElement()    \tprotected imgEl: HTMLImageElement;    \t//#endregion    &nbsp;    \t//#region constructor    &nbsp;    \t//#endregion    &nbsp;    \t//#region methods    &nbsp;    \t//#endregion    &nbsp;    }</av-code></av-code><h2>Multiple selection</h2><p>In addition, you can use the same element name for different tags. It will select all the tags marked by the element    name.</p><av-code language="html" filename="List.wcv.avt">    &lt;div class="list"&gt;    \t&lt;div class="item" @element="items"&gt;&lt;/div&gt;    \t&lt;div class="item" @element="items"&gt;&lt;/div&gt;    \t&lt;p class="item" @element="items"&gt;&lt;/p&gt;    &lt;/div&gt;</av-code></av-code><av-code language="typescript" filename="List.wcl.avt">    export class List extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region static    &nbsp;    \t//#endregion    &nbsp;    \t//#region props    &nbsp;    \t//#endregion    &nbsp;    \t//#region variables    \t@ViewElement()    \tprotected items: (HTMLDivElement | HTMLParagraphElement)[];    \t//#endregion    &nbsp;    \t//#region constructor    &nbsp;    \t//#endregion    &nbsp;    \t//#region methods    &nbsp;    \t//#endregion    &nbsp;    }</av-code></av-code><h2>Expert use only</h2><p>If you change your <span class="cn">shadowroot</span> by cloning node or something else, you can add a    useLive option inside the decorator <span class="cn">@ViewElement</span> to do a <span class="cn">querySelector</span> instead of using saved values.</p><av-code language="typescript" filename="Img.wcl.avt">    export class Img extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region static    &nbsp;    \t//#endregion    &nbsp;    \t//#region props    &nbsp;    \t//#endregion    &nbsp;    \t//#region variables    \t@ViewElement({    \t\tuseLive: true // this code ll do a this.shadowroot.querySelector.    \t})    \tprotected container: HTMLDivElement;    &nbsp;    \t@ViewElement()    \tprotected imgEl: HTMLImageElement;    \t//#endregion    &nbsp;    \t//#region constructor    &nbsp;    \t//#endregion    &nbsp;    \t//#region methods    &nbsp;    \t//#endregion    &nbsp;    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocWcElement";
    }
}
window.customElements.define('av-doc-wc-element', DocWcElement);Aventus.WebComponentInstance.registerDefinition(DocWcElement);

class DocWcCreate extends DocGenericPage {
    static __style = `:host av-router-link.font-sm{font-size:13px}`;
    __getStatic() {
        return DocWcCreate;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcCreate.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Create</h1><p>In the section you are going to learn what is a webcomponent and how you can create it inside Aventus.</p><h2>Definition</h2><p>Web Components is a suite of different technologies allowing you to create reusable custom elements — with their    functionality encapsulated away from the rest of your code — and utilize them in your web apps. (<i><a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components" target="_blank">https://developer.mozilla.org/</a></i>).</p><p>With the native technologie, you are able to wrap your style, your logic and your html template inside a single html    tag. You can build your full webapp by building one component after another without worring about side effects (the    developer's worst nightmare).</p><h2>Inside Aventus</h2><p>Inside Aventus you can create web component by right clicking one the explorer part inside vscode, choose <i>Aventus        : Create...</i> and choose <i>Component</i>. Inside the input you can enter the name for the typescript class.    By convention, this name should be in Snake case. You can write your webcomponent inside a single file    <span class="cn">*.wc.avt</span> that    will contains following section :</p><ul>    <li><span class="cn">&lt;template&gt;</span> : for Html part</li>    <li><span class="cn">&lt;style&gt;</span> : for Scss part</li>    <li><span class="cn">&lt;script&gt;</span> : for Js part</li></ul><p>or inside 3 different file. (This option is the adviced one because it allows developer to keep a well knowed    architecture.)</p><ul>    <li><span class="cn">*.wcv.avt</span> : Web Componenent View for Html part</li>    <li><span class="cn">*.wcs.avt</span> : Web Componenent View for Scss part</li>    <li><span class="cn">*.wcl.avt</span> : Web Componenent View for Ts part</li></ul><av-dynamic-row>    <av-dynamic-col size_xs="12" size_sm="6">        <av-code language="html" filename="Example.wcv.avt">            &lt;slot&gt;&lt;/slot&gt;        </av-code></av-code>    </av-dynamic-col>    <av-dynamic-col size_xs="12" size_sm="6">        <av-code language="css" filename="Example.wcs.avt">            :host { /* insert your style here */}        </av-code></av-code>    </av-dynamic-col>    <av-dynamic-col size="12">        <av-code language="typescript" filename="Example.wcl.avt">            export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {}        </av-code></av-code>    </av-dynamic-col></av-dynamic-row><h2>The Html</h2><p>You can use any basic tag or any tag you imported or created. The auto-completion will help you to find knowed tags.    There are 2 special tags that you must know :</p><h3>&lt;slot&gt;</h3><p>The slot tag allows developer to define the place where the code inside the tag will be added. This slot can have an    attribute <span class="cn">name</span> to have multiple slots.</p><av-code language="html" filename="Parent.wcv.avt">    &lt;slot&gt; &lt;!-- The default content appends here --&gt;&lt;/slot&gt;    &lt;slot style="color:red" name="error"&gt;&lt;!-- The errors appends here --&gt;&lt;/slot&gt;    &lt;slot style="color:green" name="success"&gt;&lt;!-- The success appends here --&gt;&lt;/slot&gt;</av-code></av-code><av-code language="html" filename="UsingParent.wcv.avt">    &lt;av-parent&gt;    \t&lt;p&gt;I'm the default content&lt;/p&gt;    \t&lt;p slot="default"&gt;I'm the default content too&lt;/p&gt;    \t&lt;p slot="error"&gt;I'm an error in red&lt;/p&gt;    \t&lt;p slot="succes"&gt;I'm a success in green&lt;/p&gt;    &lt;/av-parent&gt;</av-code></av-code><h3>&lt;block&gt;</h3><p>The block tag must be used in case of inheritance. This will replace the slot by the block with the same name.</p><av-code language="html" filename="Parent.wcv.avt">    &lt;slot&gt; &lt;!-- The default content appends here --&gt;&lt;/slot&gt;    &lt;slot style="color:red" name="error"&gt;&lt;!-- The errors appends here --&gt;&lt;/slot&gt;    &lt;slot style="color:green" name="success"&gt;&lt;!-- The success appends here --&gt;&lt;/slot&gt;</av-code></av-code><av-code language="html" filename="Child.wcv.avt">    &lt;block name="error"&gt;    \t&lt;span style="color:yellow"&gt;    \t\t&lt;!-- The errors will be displayed in yellow now --&gt;    \t&lt;/span&gt;    &lt;/slot&gt;</av-code></av-code><av-code language="html" filename="UsingChild.wcv.avt">    &lt;av-child&gt;    \t&lt;p&gt;I'm the default content&lt;/p&gt;    \t&lt;p slot="default"&gt;I'm the default content too&lt;/p&gt;    \t&lt;p slot="error"&gt;I'm an error in yellow&lt;/p&gt;    \t&lt;p slot="succes"&gt;I'm a success in green&lt;/p&gt;    &lt;/av-child&gt;</av-code></av-code><p>There are sepcial attributes you can use to add feature to basic html: </p><ul>    <li>@element : To select element(s). <av-router-link state="/docs/wc/element" class="font-sm">More info</av-router-link></li>    <li>@for : To create a loop. <av-router-link state="/docs/wc/loop" class="font-sm">More info</av-router-link></li>    <li>@bind(_<i><span class="cn">$event</span></i>)?(:<i><span class="cn">$field</span></i>)? : To bind data. <av-router-link class="font-sm" state="/docs/wc/binding">More            info</av-router-link></li>    <li>:<i><span class="cn">$field</span></i> : To inject data. <av-router-link state="/docs/wc/injection" class="font-sm">More            info</av-router-link>    </li>    <li>@press : To add press event from PressManager. <av-router-link state="/docs/wc/event" class="font-sm">More            info</av-router-link>    </li>    <li>@<i><span class="cn">$eventName</span></i> : To add event listener. <av-router-link state="/docs/wc/event" class="font-sm">More            info</av-router-link>    </li></ul><p>You can use interpolation inside tag content and normal attribute to replace the content by <av-router-link state="/docs/wc/event">the property value</av-router-link>&nbsp;or&nbsp;<av-router-link state="/docs/wc/event">the watch value</av-router-link>. Right now only watch and property are available but    soon you will be able to write javascript code.</p><av-code language="html">    &lt;div&gt;my name is {{user.name}}&lt;/div&gt;    &lt;img src="{{user.picture}}"/&gt;</av-code></av-code><h2>The style</h2><p>This is just a simple SCSS file. The only think to know is that the style must be wrapped inside a :host{}.</p><av-code language="css" filename="TextRed.wcs.avt">    :host {    \tcolor:red; // This ll change the behavior of the current webcomponent    }</av-code></av-code><p>You can find more informations about the style <av-router-link state="/docs/wc/style">here.</av-router-link></p><h2>The logic</h2><p>When you create a new file *.wcl.avt you can notice that the file has region. This is set to allow developer to order    the code. Each region has a goal. You can remove it but we advice you to keep it.</p><ul>    <li>static : Where you can write the static properties or methods for your webcomponent.</li>    <li>props : Where you can define the <av-router-link state="/docs/wc/attribute">attributes</av-router-link>, the        <av-router-link state="/docs/wc/property">properties</av-router-link>&nbsp;and the <av-router-link state="/docs/wc/watch">watch variables.</av-router-link>    </li>    <li>variables : Where you can define the variables and the pointers on <av-router-link state="/docs/wc/element">view            element</av-router-link></li>    <li>constructor : Where you can override the constructor for your webcomponent.</li>    <li>methods : Where you can write the methods for your webcomponent.</li></ul><av-code language="typescript">    export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region static    &nbsp;    \t//#endregion    &nbsp;    \t//#region props    &nbsp;    \t//#endregion    &nbsp;    \t//#region variables    &nbsp;    \t//#endregion    &nbsp;    \t//#region constructor    &nbsp;    \t//#endregion    &nbsp;    \t//#region methods    &nbsp;    \t//#endregion    &nbsp;    }</av-code></av-code><p>Over the classname you can add predefine Decorators :</p><ul>    <li><span class="cn">@TagName(name:string)</span> : to define the tag for the component</li>    <li><span class="cn">@Debugger({ writeCompiled?: boolean, enableWatchHistory?: boolean})</span> : to debug component compilation and        state.    </li>    <li><span class="cn">@Dependances({ type: Type, strong?:boolean}[])</span> : to add dependance not written inside component. The        strong boolean define if the dependance must be loaded before the class.</li>    <li><span class="cn">@OverrideView({ removeViewVariables?: string[] })</span> : to fully override parent view. You can remove parent        ViewElement needed, but you have to be aware of what you are doing.</li></ul><av-code language="typescript">    @TagName("my-tag-name")    export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {    }</av-code></av-code><h2>Lifecycle</h2><p>The webcomponent has the following lifecycle</p><av-img src="/img/doc/wc/create/lifecylce.png"></av-img><p>By default <span class="cn">postCreation</span> and <span class="cn">postDestruction</span> are empty.</p>` }
    });
}
    getClassName() {
        return "DocWcCreate";
    }
}
window.customElements.define('av-doc-wc-create', DocWcCreate);Aventus.WebComponentInstance.registerDefinition(DocWcCreate);

class DocWcBinding extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocWcBinding;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcBinding.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Binding</h1><p>In the section you are going to learn how to bind data between parent and child component.</p><p>The data binding is a mix between <av-router-link state="/docs/wc/injection">Injection</av-router-link> and    <av-router-link state="/docs/wc/event">Event</av-router-link>. It will inject the data from parent to the child and    when the child trigger a specific event, it will take value from child to assign it to the parent.</p><h2>Basic binding</h2><p>To add binding you must add the attribute <span class="cn">@bind</span> inside your <span class="cn">*.wcv.avt</span>    and add the field to watch as attribute value.</p><av-code language="html" filename="Input.wcv.avt">    &lt;input @bind="myValue" /&gt;</av-code></av-code><av-code language="typescript" filename="Input.wcl.avt">    export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region static    &nbsp;    \t//#endregion    &nbsp;    \t//#region props    \t@Watch()    \tpublic myValue: string = "";    \t//#endregion    &nbsp;    \t//#region variables    &nbsp;    \t//#endregion    &nbsp;    \t//#region constructor    &nbsp;    \t//#endregion    &nbsp;    \t//#region methods    &nbsp;    \t//#endregion    &nbsp;    }</av-code></av-code><p>The code above will inject the field <span class="cn">myValue</span> inside the input <span class="cn">value</span>    and when the input trigger the event <span class="cn">change</span> or <span class="cn">input</span>, the value of    the field myValue will be changed. The default binding order is the following : </p><ul>    <li>input or textarea will listen on <span class="cn">change</span> and <span class="cn">input</span> event</li>    <li>other tag will check if a <av-router-link state="/docs/lib/callback">Aventus.CallbackManager</av-router-link> named <span class="cn">change</span> exists on the child.</li>    <li>if no CallbackManger, a listener for the event <span class="cn">change</span> will be added</li>    <p></p>    <li><b>Nb:</b> for all tag, the value checked on child must be named <span class="cn">value</span></li></ul><h2>Select the event to listen to</h2><p>If you need to define which event or CallbackManger the code must listen, you can write your binding like below.</p><av-code language="html" filename="Input.wcv.avt">    &lt;input @bind_keyup="myValue" /&gt;</av-code></av-code><p>In this example, the field <span class="cn">myValue</span> will be updated when the <span class="cn">keyup</span>    event is triggered on the input. Notice that if you have a CallbackManger named keyup, the code will listen to the    keyup CallbackManger instead of the keyup event.</p><h2>Select the child field to bind with</h2><p>If you need to define which field the code must synchronize instead of <span class="cn">value</span>, you can write your binding like below.</p><av-code language="html" filename="MyTest.wcl.avt">    &lt;av-input @bind:customValue="myValue"&gt;&lt;/av-input&gt;</av-code></av-code><p>In this example, the parent field <span class="cn">myValue</span> will be synchronized with the child field <span class="cn">customValue</span></p><h2>Full custom binding</h2><p>You can mix the two previous cases to fully customize your binding.</p><av-code language="html" filename="MyTest.wcl.avt">    &lt;av-input @bind_keyup:customValue="myValue"&gt;&lt;/av-input&gt;</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocWcBinding";
    }
}
window.customElements.define('av-doc-wc-binding', DocWcBinding);Aventus.WebComponentInstance.registerDefinition(DocWcBinding);

class DocWcAttribute extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocWcAttribute;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcAttribute.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Attribute</h1><p>In the section you are going to learn what is an attribute on a webcomponent and how you can create it inside    Aventus.</p><h2>Implementation</h2><p>An attribute is a variable inside your webcomponent. An attribute has limited type:</p><ul>    <li><span class="cn">number</span></li>    <li><span class="cn">string</span></li>    <li><span class="cn">boolean</span></li>    <li><span class="cn">date</span></li>    <li><span class="cn">datetime</span></li>    <li><span class="cn">literal</span> (ex: 'value1'|'value2')</li></ul><p>The source code to create an attribute is the following.</p><av-code language="typescript" filename="Example.wcl.avt">    export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region static    &nbsp;    \t//#endregion    &nbsp;    \t//#region props    \t/** Define if the element is active or not */    \t@Attribute()    \tpublic active: boolean;    \t//#endregion    &nbsp;    \t//#region variables    &nbsp;    \t//#endregion    &nbsp;    \t//#region constructor    &nbsp;    \t//#endregion    &nbsp;    \t//#region methods    &nbsp;    \t//#endregion    &nbsp;    }</av-code></av-code><av-code language="html" filename="index.html">    &lt;av-example&gt;&lt;av-example&gt;    &lt;av-example active&gt;&lt;av-example&gt;</av-code></av-code><p>When you will use the tag <span class="cn">&lt;av-example&gt;</span> inside any other <span class="cn">*.wcv.avt</span> file, the auto-completion will show you the attribute <span class="cn">active</span>. Futhermore, you can access this property through the <span class="cn">*.wcl.avt</span>    file when you store a variable typed as <span class="cn">Example</span>.</p><av-code language="typescript" filename="Test.lib.avt">    export function test(){    \tconst myExample = document.querySelector&lt;Example&gt;("av-example");    \tmyExample.active = false;    }</av-code></av-code><p>The main goal of attribute is to create state for your component so that you can apply different style on it. You can    find more informations about style <av-router-link state="/doc/wc/style">here</av-router-link> but the code below    show you a quick example to display the background in red when component is active:</p><av-code language="css" filename="Example.wcs.avt">    :host {    \tbackground: blue;    \ttransition: background-color 1s ease;    }    :host([active]) {    \tbackground: red;    }</av-code></av-code><h2>Quick use</h2><p>When you are editing a <span class="cn">*.wcl.avt</span>, you can right click where you want to create an attribute    and select the option <i>Aventus: create attribute</i>. You must follow the instruction to get an attribute working.</p>` }
    });
}
    getClassName() {
        return "DocWcAttribute";
    }
}
window.customElements.define('av-doc-wc-attribute', DocWcAttribute);Aventus.WebComponentInstance.registerDefinition(DocWcAttribute);

class DocStateListen extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocStateListen;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocStateListen.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>State - Listen changes</h1><p>Changing state is great, but for sure you will need to listen when a state change. Three methods composed the <span class="cn">State</span> lifecylce. This tuple is named <span class="cn">StateAction</span> inside Aventus.</p><ul>    <li><span class="cn">active</span>: when a state become active.</li>    <li><span class="cn">inactive</span>: when a state become inactive.</li>    <li><span class="cn">askChange</span>: a way to define if the state change can be done or not.</li></ul><h2>Callback on the StateManager</h2><p>For the example, we are going to listen a state to display a user.</p><av-code language="typescript" filename="Test.lib.avt">    export class Test {    \tpublic static subscribe() {    \t\tMainStateManager.getInstance().subscribe("/user/{id:number}", {    \t\t\tactive: (state: Aventus.State, slugs: Aventus.StateSlug) =&gt; {    \t\t\t\tconsole.log("user active is " + slugs.id);    \t\t\t},    \t\t\tinactive: (state: Aventus.State, nextState: Aventus.State, oldSlugs: Aventus.StateSlug) =&gt; {    \t\t\t\tconsole.log("new state is " + nextState.name);    \t\t\t},    \t\t\taskChange: async (state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) =&gt; {    \t\t\t\tif(slugs.id == 3) {    \t\t\t\t\treturn false;    \t\t\t\t}    \t\t\t\treturn true;    \t\t\t}    \t\t});    \t}    \tpublic static setUser(id: number) {    \t\tMainStateManager.getInstance().setState("/user/" + id);    \t}    \tpublic static removeUser() {    \t\tMainStateManager.getInstance().setState("/other");    \t}    }</av-code></av-code><p>We subscribe to the state <span class="cn">/user/{id:number}</span> what means that the manager will trigger active    when the current state is matching <span class="cn">/^\\/user\\/([0-9]+)$/g</span>. The type available are <span class="cn">number</span> and <span class="cn">string</span>. If you don't set type, string will be use by    default. You can also use the star (<span class="cn">*</span>) to match anything.</p><p>When the <span class="cn">setUser</span> function is called, the log <span class="cn">user active is...</span> will    be displayed. If you set the current state to <span class="cn">/other</span>, the inactive state will be called.    It's important to know that if your state stay active between two state changes, the function <span class="cn">inactive</span> won't be fired.</p><av-code language="typescript" filename="Test.lib.avt">    export class Test {    \tpublic async inactiveNotFired() {    \t\tawait MainStateManager.getInstance().setState("/user/1");    \t\tawait MainStateManager.getInstance().setState("/user/2");    \t}    }</av-code></av-code><p>If we come back to the previous example, if we set the user to <span class="cn">id = 3</span> the function <span class="cn">askChange</span> will return a false what involves that no more state changes are allowed. A use case    for this feature is when the user is editing data and he decides to change state without saving item. You can    display a popup to confirm if edition must be dropped or not.</p><p>If you need to know the current state of the manager, you can at any time call the function <span class="cn">getState</span> to obtain the current state object instance. Furthermore, you can use operator <span class="cn">instanceof</span> to obtain more informations and share some data between subscribers.</p><av-code language="typescript" filename="Test.lib.avt">    export class Test {    \t...    \t\t\tactive: (state: Aventus.State, slugs: Aventus.StateSlug) =&gt; {    \t\t\t\tif(state instanceof CreateUser){    \t\t\t\t\tconsole.log(state.editingUser.id);    \t\t\t\t}    \t\t\t},    \t...    }</av-code></av-code><h2>Callback on the State</h2><p>You can also override the three methods directly inside a <span class="cn">State</span> class.</p><av-code language="typescript" filename="CreateUser.state.avt">    export class CreateUser extends Aventus.State {    &nbsp;    \tpublic editingUser: User;    &nbsp;    \t/**    \t* @inheritdoc    \t*/    \tpublic override get name(): string {    \t\treturn "/user/create";    \t}    &nbsp;    \t/**    \t* @inheritdoc    \t*/    \tpublic override onActivate(): void {    \t\tconsole.log("active");    \t}    &nbsp;    \t/**    \t* @inheritdoc    \t*/    \tpublic override onInactivate(nextState: Aventus.State): void {    \t\tconsole.log("inactive");    \t}    &nbsp;    \t/**    \t* @inheritdoc    \t*/    \tpublic override async askChange(state: Aventus.State, nextState: Aventus.State): Promise&lt;boolean&gt; {    \t\treturn true;    \t}    &nbsp;    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocStateListen";
    }
}
window.customElements.define('av-doc-state-listen', DocStateListen);Aventus.WebComponentInstance.registerDefinition(DocStateListen);

class DocStateCreate extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocStateCreate;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocStateCreate.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>State - Create</h1><p>In the section you are going to learn what is a state and how you can create it inside Aventus.</p><h2>Definition</h2><p>A state is a way to define a unique state of your application. The state concept is divided in two part:    <span class="cn">StateManager</span> and <span class="cn">State</span>. The StateManager will manage the transition from one state to another. The    state is an object with a name. The best state example inside Aventus is the <span class="cn">Router</span>. Inside the router, you    must declare unique route matching to a single <span class="cn">Page</span>.</p><h2>Inside Aventus</h2><p>Inside Aventus you can create a new state class by right clicking on the explorer part inside vscode, choose    <i>Aventus : Create...</i> and choose <i>State</i>. You must select between <span class="cn">State</span> or <span class="cn">Manager</span> and then    inside the input you can enter the name for the class. This will create a basic class:</p><av-code language="typescript" filename="Main.state.avt">    export class MainStateManager extends Aventus.StateManager {    &nbsp;    \t/**    \t* Get the instance of the StateManager    \t*/    \tpublic static getInstance() {    \t\treturn Aventus.Instance.get(MainStateManager);    \t}    &nbsp;    }</av-code></av-code><av-code language="typescript" filename="CreateUser.state.avt">    export class CreateUser extends Aventus.State {    &nbsp;    \tpublic editingUser: User;    &nbsp;    \t/**    \t* @inheritdoc    \t*/    \tpublic override get name(): string {    \t\treturn "/user/create";    \t}    &nbsp;    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocStateCreate";
    }
}
window.customElements.define('av-doc-state-create', DocStateCreate);Aventus.WebComponentInstance.registerDefinition(DocStateCreate);

class DocStateChange extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocStateChange;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocStateChange.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>State - Change</h1><p>To change the current state of a manager, you can use different methods.</p><h2>On the manager</h2><p>You can change current state directly on the manager by calling the function <span class="cn">setState</span> with a    <span class="cn">string</span> or a <span class="cn">State</span> item.</p><av-code language="typescript" filename="Test.lib.avt">    export class Test {    \tpublic changeStateTxt() {    \t\tconst isApplied = await MainStateManager.getInstance().setState("/user/");    \t}    \tpublic async changeState() {    \t\tlet state = new CreateUser();    \t\tstate.user = await UserRAM.getInstance().get(1);    \t\tconst isApplied = await MainStateManager.getInstance().setState(state);    \t}    }</av-code></av-code><p>If you set a string, an <span class="cn">EmptyState</span> will be created with the name provided.</p><h2>On the state - static</h2><p>You can also activate a state with the static method <span class="cn">activate</span> on the class <span class="cn">Aventus.State</span>.</p><av-code language="typescript" filename="Test.lib.avt">    export class Test {    \tpublic changeStateStatic() {    \t\tconst isApplied = await Aventus.State.activate("/user/", MainStateManager.getInstance());    \t}    }</av-code></av-code><h2>On the state - instance</h2><p>Finally, you can activate the state with the method <span class="cn">activate</span> on a state instance.</p><av-code language="typescript" filename="Test.lib.avt">    export class Test {    \tpublic changeStateInstance() {    \t\tlet state = new CreateUser();    \t\tstate.user = await UserRAM.getInstance().get(1);    \t\tconst isApplied = await state.activate(MainStateManager.getInstance());    \t}    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocStateChange";
    }
}
window.customElements.define('av-doc-state-change', DocStateChange);Aventus.WebComponentInstance.registerDefinition(DocStateChange);

class DocSocketSend extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocSocketSend;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocSocketSend.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Socket - Send message</h1><h2>Simple send</h2><p>To send message from the client to the server you must call the function <span class="cn">sendMessage</span>.</p><av-code language="typescript" filename="Test.lib.avt">    export function login(username: string, password: string) {    \tAventus.Instance.get(LoginSocket).sendMessage("/login", { username, password });    }</av-code></av-code><p>This code will send a message to the unique route named <span class="cn">/login</span> and provide username and password as    <span class="cn">body</span>. The code below is the receiver written in C# to handle the message.</p><av-code language="csharp">    public class Login : WebSocketReceiver&lt;Login, Login.Body&gt;    {    \tpublic override string defineTrigger()    \t{    \t\treturn "/login";    \t}    &nbsp;    \tpublic override void defineWebSockets()    \t{    \t\tsetWebSocket&lt;DefaultSocket&gt;();    \t}    &nbsp;    \tpublic override async Task onMessage(WebSocketData socketData, Body message)    \t{    \t\tConsole.WriteLine("Login for " + message.username + " with password " + message.password);    \t}    &nbsp;    \tpublic class Body    \t{    \t\tpublic string username { get; set; }    \t\tpublic string password { get; set; }    \t}    }</av-code></av-code><h2>Send with responses</h2><p>Because most of the time, the communication is used to send data and waiting a response, for example if you want to    create a new user, you want to know if the user is created or if an error occured. To send a message and wait    answer, you can use the method <span class="cn">sendMessageAndWait</span>. The behaviour of this method is similar to the sendMessage    but you must add potentials route result.</p><av-code language="typescript" filename="Test.lib.avt">    export function login(username: string, password: string) {    \tAventus.Instance.get(LoginSocket).sendMessageAndWait("/login",    \t\t{    \t\t\tusername,    \t\t\tpassword    \t\t},    \t\t{    \t\t\t"/login/response": (data: { success: boolean; }) =&gt; {    \t\t\t\tconsole.log("login result "+ data.success);    \t\t\t},    \t\t\t"/login/error": (data: { errors: string[] }) =&gt; {    &nbsp;    \t\t\t}    \t\t}    \t);    }</av-code></av-code><p>To match query and response, Aventus add an <span class="cn">uid</span> inside the message and if the message from the server contains    the    same uid as the query, it means that the message is the response for the query.</p><av-code language="json">    {    \t"channel": "/login",    \t"data": {    \t\t"username":"root",    \t\t"password":"root"    \t},    \tuid: "_8f34mbk7g"    }</av-code></av-code><p>The code below is an example of the login receiver written in C#</p><av-code language="csharp">    public class Login : WebSocketReceiverAnswer&lt;Login, Login.Body&gt;    {    &nbsp;    \tpublic override string defineTrigger()    \t{    \t\treturn "/login";    \t}    &nbsp;    \tpublic override void defineWebSockets()    \t{    \t\tsetWebSocket&lt;DefaultSocket&gt;();    \t}    \tpublic override void defineAnswers()    \t{    \t\tsetAnswer&lt;LoginResponse&gt;();    \t}    &nbsp;    \tpublic override async Task&lt;IWebSocketSender&gt; onMessage(WebSocketData socketData, Body message,    WebSocketAnswerOptions options)    \t{    \t\tif (message.username == "root" && message.password == "root")    \t\t{    \t\t\treturn new LoginResponse(success: true);    \t\t}    \t\treturn new LoginResponse(success: false);    \t}    &nbsp;    \tpublic class Body    \t{    \t\tpublic string username { get; set; }    \t\tpublic string password { get; set; }    \t}    }</av-code></av-code><h2>Good pratice</h2><p>To avoid writting the communication function everywhere in your code, you should add function inside the socket class    with a specific return type.</p><av-code language="typescript" filename="Login.socket.avt">    export class LoginSocket extends Aventus.Socket implements Aventus.ISocket {    &nbsp;    \t...    &nbsp;    \tpublic login(username:string, password:string): Promise&lt;boolean&gt; {    \t\treturn new Promise&lt;boolean&gt;(() =&gt; {    \t\t\tthis.sendMessageAndWait("/login",    \t\t\t\t{    \t\t\t\t\tusername,    \t\t\t\t\tpassword    \t\t\t\t},    \t\t\t\t{    \t\t\t\t\t"/login/response": (data: { success: boolean; }) =&gt; {    \t\t\t\t\t\tresolve(data.success);    \t\t\t\t\t},    \t\t\t\t\t"/login/error": (data: { errors: string[] }) =&gt; {    \t\t\t\t\t\tresolve(false);    \t\t\t\t\t}    \t\t\t\t}    \t\t\t);    \t\t})    \t}    }</av-code></av-code><av-code language="typescript" filename="Test.lib.avt">    export async function test(){    \tconst success = await LoginSocket.getInstance().login("root", "root")    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocSocketSend";
    }
}
window.customElements.define('av-doc-socket-send', DocSocketSend);Aventus.WebComponentInstance.registerDefinition(DocSocketSend);

class DocSocketReceive extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocSocketReceive;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocSocketReceive.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Socket - Receive message</h1><p>To receive message from the backend you must declare the route you want to listen to.</p><av-code language="typescript" filename="Test.lib.avt">    export function test() {    \tAventus.Instance.get(LoginSocket).addRoute({    \t\tchannel: "/login/response",    \t\tcallback: (data: { success: boolean; }) =&gt; {    \t\t\tconsole.log("login result "+ data.success);    \t\t}    \t})    }</av-code></av-code><p>The <span class="cn">channel</span> is the unique route name where the server will send the message. The callback is the function    triggered when a message is received on the channel. Because it comes from outisde, it's very important to type the    data received inside the callback.</p><p>As an example, the code below is the C# sender to emit message from the server to the client.</p><av-code language="csharp" filename="LoginResponse.cs">    public class LoginResponse : WebSocketSender&lt;LoginResponse, LoginResponse.Body&gt;    {    \tpublic override string defineName()    \t{    \t\treturn "/login/response";    \t}    \tpublic LoginResponse() { }    \tpublic LoginResponse(bool success)    \t{    \t\tthis.body.success = success;    \t}    \tpublic class Body    \t{    \t\tpublic bool success { get; set; }    \t}    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocSocketReceive";
    }
}
window.customElements.define('av-doc-socket-receive', DocSocketReceive);Aventus.WebComponentInstance.registerDefinition(DocSocketReceive);

class DocSocketCreate extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocSocketCreate;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocSocketCreate.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Socket - Create</h1><p>In the section you are going to learn what is a socket and how you can create it inside Aventus.</p><h2>Definition</h2><p>A socket is a way define by Aventus to communicate with your backend through the <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" target="_blank">websocket protocol</a>.    The goal of this class is to create a bidirectional communication to keep your interface up to date.</p><h2>Inside Aventus</h2><p>Inside Aventus you can create a new socket class by right clicking on the explorer part inside vscode, choose    <i>Aventus        : Create...</i> and choose <i>Socket</i>. Inside the input you can enter the name for the socket. This will    create    a basic socket class:</p><av-code language="typescript" filename="Login.socket.avt">    export class LoginSocket extends Aventus.Socket implements Aventus.ISocket {    &nbsp;    \t/**    \t* Get the instance of the websocket    \t*/    \tpublic static getInstance() {    \t\treturn Aventus.Instance.get(LoginSocket);    \t}    &nbsp;    \t/**    \t* @inheritdoc    \t*/    \tprotected override configure(options: Aventus.SocketOptions): Aventus.SocketOptions {    \t\treturn options;    \t}    &nbsp;    }</av-code></av-code><p>Usually, a socket should be a singleton because you only want one connection to be opened with your backend. You can    configure socket options to do the job you want.</p><div class="table">    <av-dynamic-row class="header">        <av-dynamic-col size="4" center>Name</av-dynamic-col>        <av-dynamic-col size="8" center>Description</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>host</av-dynamic-col>        <av-dynamic-col size="8" center>Define the host to open the websocket connection. By default it is the same as            your current url.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>port</av-dynamic-col>        <av-dynamic-col size="8" center>Define the port to open the websocket connection. By default it is the same as            your current url.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>useHttps</av-dynamic-col>        <av-dynamic-col size="8" center>Define if the protocol is wss or ws. By default it is the same as your current            url.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>routes</av-dynamic-col>        <av-dynamic-col size="8" center>Add default custom routes to listen messages from the server.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>socketName</av-dynamic-col>        <av-dynamic-col size="8" center>You can create different socket inside your backend differentiate by an url. The            base url is <b>/ws/</b>. If you set a socket name, the socket url will be <b>/ws/{socketName}</b>.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>log</av-dynamic-col>        <av-dynamic-col size="8" center>Enable or disable log. By default the value is false.        </av-dynamic-col>    </av-dynamic-row></div><p> Inside the class you can override 3 methods to manage your <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">socket life cycle</a>.</p><ul>    <li>onOpen: Fired when the websocket is opened.</li>    <li>onError: Fired when the websocket connection has been closed due to an error.</li>    <li>onClose: Fired when then websocket connection is closed</li></ul><av-code language="typescript" filename="Login.socket.avt">    export class LoginSocket extends Aventus.Socket implements Aventus.ISocket {    &nbsp;    \t...    &nbsp;    \tprotected override onOpen(): void {    \t\tconsole.log("Connection is now open");    \t}    &nbsp;    \tprotected override onClose(event: Event): void {    \t\tconsole.log("Connection is now close");    \t}    &nbsp;    \tprotected override onError(event: Event): void {    \t\tconsole.log("An error occured");    \t}    }</av-code></av-code><p>The websocket message format is specific to Aventus. A message look like the following :</p><av-code language="json">    {    \t"channel": "/login",    \t"data": {    \t\t"username":"root",    \t\t"password":"root"    \t}    }</av-code></av-code><p>Where channel is a unique name to identify a route between the client and the server and data is the content of the message.</p><p>The different implementation for backend language is under developement. If you want to help you can join us here.</p>` }
    });
}
    getClassName() {
        return "DocSocketCreate";
    }
}
window.customElements.define('av-doc-socket-create', DocSocketCreate);Aventus.WebComponentInstance.registerDefinition(DocSocketCreate);

class DocRamMixin extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocRamMixin;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamMixin.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>RAM - Extend data</h1><p>As you can see inside the previous section, new functions are added on the items. You can your custom functions too    based on the <a href="https://www.patterns.dev/posts/mixin-pattern" target="_blank">mixin pattern</a>. This is    useful when you auto generated your data from your backend but you just want to add some functions. The best way    to learn this is with an example. We will add a function helloWorld on the Person item.</p><av-code language="typescript" filename="Person.data.avt">    export class Person extends Aventus.Data implements Aventus.IData {    \tpublic id: number = 0;    \tpublic name: string = "";    }</av-code></av-code><p>First of all, we must create an interface with the action needed.</p><av-code language="typescript" filename="Person.ram.avt">    interface PersonAction {    \t// define your function here    \thelloWorld(): void;    }</av-code></av-code><p>Then you can create a type that is the mix of the data and the extension.</p><av-code language="typescript" filename="Person.ram.avt">    interface PersonAction {    \t// define your function here    \thelloWorld(): void;    }    &nbsp;    type PersonExtended = Person & PersonAction;</av-code></av-code><p>Then you can add your RAM.</p><av-code language="typescript" filename="Person.ram.avt">    interface PersonAction {    \t// define your function here    \thelloWorld(): void;    }    &nbsp;    type PersonExtended = Person & PersonAction;    &nbsp;    export class PersonRAM extends Aventus.Ram&lt;PersonExtended&gt; implements Aventus.IRam {    }</av-code></av-code><p>Now you can use the action <span class="cn">Implement inherited abstract class</span>.</p><av-code language="typescript" filename="Person.ram.avt">    interface PersonAction {    \t// define your function here    \thelloWorld(): void;    }    &nbsp;    type PersonExtended = Person & PersonAction;    &nbsp;    export class PersonRAM extends Aventus.Ram&lt;PersonExtended&gt; implements Aventus.IRam {    &nbsp;    \tpublic override defineIndexKey(): keyof Person | "helloWorld" {    \t\treturn 'id';    \t}    &nbsp;    \tprotected override getTypeForData(objJson: PersonExtended | Aventus.KeysObject&lt;PersonExtended&gt;): new ()&nbsp;=&gt; PersonExtended {    \t\tthrow new Error("Method not implemented.");    \t}    }</av-code></av-code><p>Then you can add the the mixin pattern.</p><av-code language="typescript" filename="Person.ram.avt">    interface PersonAction {    \t// define your function here    \thelloWorld(): void;    }    &nbsp;    type PersonExtended = Person & PersonAction;    &nbsp;    export class PersonRAM extends Aventus.Ram&lt;PersonExtended&gt; implements Aventus.IRam {    &nbsp;    \tpublic override defineIndexKey(): keyof Person | "helloWorld" {    \t\treturn 'id';    \t}    &nbsp;    \tprotected override getTypeForData(objJson: PersonExtended | Aventus.KeysObject&lt;PersonExtended&gt;): new ()&nbsp;=&gt PersonExtended {    \t\tthrow new Error("Method not implemented.");    \t}    &nbsp;    \tprivate addHelloWorldFunction&lt;B extends new (...args: any[]) =&gt; Person&gt;(Base: B) {    \t\treturn class Extension extends Base implements PersonAction {    \t\t\tpublic helloWorld(): void {    \t\t\t\tconsole.log("hello world");    \t\t\t};    \t\t};    \t}    }</av-code></av-code><p>Now you can use the extension on the function <span class="cn">getTypeForData</span>.</p><av-code language="typescript" filename="Person.ram.avt">    interface PersonAction {    \t// define your function here    \thelloWorld(): void;    }    &nbsp;    type PersonExtended = Person & PersonAction;    &nbsp;    export class PersonRAM extends Aventus.Ram&lt;PersonExtended&gt; implements Aventus.IRam {    &nbsp;    \tpublic override defineIndexKey(): keyof Person | "helloWorld" {    \t\treturn 'id';    \t}    &nbsp;    \tprotected override getTypeForData(objJson: PersonExtended | Aventus.KeysObject&lt;PersonExtended&gt;): new ()&nbsp;=&gt PersonExtended {    \t\treturn this.addHelloWorldFunction(Person);    \t}    &nbsp;    \tprivate addHelloWorldFunction&lt;B extends new (...args: any[]) =&gt; Person&gt;(Base: B) {    \t\treturn class Extension extends Base implements PersonAction {    \t\t\tpublic helloWorld(): void {    \t\t\t\tconsole.log("hello world");    \t\t\t};    \t\t};    \t}    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocRamMixin";
    }
}
window.customElements.define('av-doc-ram-mixin', DocRamMixin);Aventus.WebComponentInstance.registerDefinition(DocRamMixin);

class DocRamListenChanges extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocRamListenChanges;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamListenChanges.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>RAM - Listen changes</h1><h2>Item scoped functions</h2><p>Because your component must be refreshed when your RAM item changed, the item coming from a RAM has 4 new functions.</p><ul>    <li><span class="cn">onUpdate</span> : Add a callback trigger when data updated</li>    <li><span class="cn">offUpdate</span> : Remove a callback trigger when data updated</li>    <li><span class="cn">onDelete</span> : Add a callback trigger when data deleted</li>    <li><span class="cn">offDelete</span> : Remove a callback trigger when data deleted</li></ul><av-code language="typescript" filename="Test.lib.avt">    export async function test() {    \tlet person1 = await PersonRAM.getInstance().get(1);    \tperson1.onUpdate(onUpdate);    \tperson1.onDelete(onDelete);    }    &nbsp;    export function onUpdate(person:Person) {    \tconsole.log(person.name);    }    &nbsp;    export function onDelete(person:Aventus.RamItem&lt;Person&gt;) {    \tperson.offUpdate(onUpdate);    \tperson.offDelete(onDelete);    }</av-code></av-code><p>You must care of the function scope. Inside a webcomponent if you do something like below it will not work.</p><av-code language="typescript" filename="Test.lib.avt">    export class HelloWorld extends Aventus.WebComponent implements Aventus.DefaultComponent {    \t@Attribute()    \tpublic id: number;    &nbsp;    \tprivate person: Aventus.RamItem&lt;Person&gt;;    &nbsp;    \tpublic async getItem() {    \t\tthis.person = await PersonRAM.getInstance().get(this.id);    \t\tp.onUpdate(this.onUpdate)    \t}    &nbsp;    \tprivate onUpdate(newData: Aventus.RamItem&lt;Person&gt;) {    \t\t// this will fail because this isn't scoped to the HelloWorld component    \t\tthis.person = newData;    \t}    &nbsp;    \tprotected override postCreation(): void {    \t\tthis.getItem();    \t}    }</av-code></av-code><p>To correct this problem you can change it like that.</p><av-code language="typescript" filename="Test.lib.avt">    export class HelloWorld extends Aventus.WebComponent implements Aventus.DefaultComponent {    \t@Attribute()    \tpublic id: number;    &nbsp;    \tprivate person: Aventus.RamItem&lt;Person&gt;;    &nbsp;    \tpublic constructor() {    \tthis.onUpdate = this.onUpdate.bind(this);    \t}    \tpublic async getItem() {    \t\tthis.person = await PersonRAM.getInstance().get(this.id);    \t\tp.onUpdate(this.onUpdate)    \t}    &nbsp;    \tprivate onUpdate(newData: Aventus.RamItem&lt;Person&gt;) {    \t\tthis.person = newData; // this time the scope is HelloWorld    \t}    &nbsp;    \tprotected override postCreation(): void {    \t\tthis.getItem();    \t}    }</av-code></av-code><h2>RAM scoped functions</h2><p>To listen what is happening inside your RAM. You can subscribe to 3 listeners:</p><ul>    <li><span class="cn">onCreated</span> : trigger when a new data is created</li>    <li><span class="cn">onUpdated</span> : trigger when a data is updated</li>    <li><span class="cn">onDeleted</span> : trigger when a data is deleted</li></ul><p>To remove your listeners you can use the following functions</p><ul>    <li><span class="cn">offCreated</span></li>    <li><span class="cn">offUpdated</span></li>    <li><span class="cn">offDeleted</span></li></ul><av-code language="typescript" filename="Test.lib.avt">    export class HelloWorld extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \tprivate onCreated(createdData: Aventus.RamItem&lt;Person&gt;) {        &nbsp;    \t}    &nbsp;    \tprivate onUpdated(updatedData: Aventus.RamItem&lt;Person&gt;) {        &nbsp;    \t}    &nbsp;    \tprivate onDeleted(deletedData: Aventus.RamItem&lt;Person&gt;) {        &nbsp;    \t}    &nbsp;    \tprotected override postCreation(): void {    \t\tPersonRAM.getInstance().onCreated(this.onCreated);    \t\tPersonRAM.getInstance().onUpdated(this.onUpdated);    \t\tPersonRAM.getInstance().onDeleted(this.onDeleted);    \t}    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocRamListenChanges";
    }
}
window.customElements.define('av-doc-ram-listen-changes', DocRamListenChanges);Aventus.WebComponentInstance.registerDefinition(DocRamListenChanges);

class DocRamCrud extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocRamCrud;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamCrud.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>RAM - Operations</h1><p>To manage data inside your RAM, can perfom 4 kind of operations :</p><ul>    <li>Create - To add data inside your RAM</li>    <li>Read - To read data inside your RAM</li>    <li>Update - To update data inside your RAM</li>    <li>Delete - To delete data from your RAM</li></ul><h2>Basic operations</h2><p>Inside Aventus RAM, each function to perfom operation can be written in two format. The first format is the normal.    You call the function and get the result.</p><av-code language="typescript" filename="Test.lib.avt">    export async function test() {    \tconst p1 = await PersonRAM.getInstance().get(1);    }</av-code></av-code><p>The second format is the detailed. You call the function with <span class="cn">WithError</span> at the end to obtain more    informations.</p><av-code language="typescript" filename="Test.lib.avt">    export async function test() {    \tconst {success, errors, result} = await PersonRAM.getInstance().getWithError(1);    \tif(success) {    \t\tconst p1 = result;    \t}    \telse {    \t\tfor(let error of errors) {    \t\t\tconsole.log(error.code + " " + error.message);    \t\t}    \t}    }</av-code></av-code><p>For the future explanations, only the functions in normal format will be explained</p><h3>Read</h3><div class="table">    <av-dynamic-row class="header">        <av-dynamic-col size="4" center>Function</av-dynamic-col>        <av-dynamic-col size="8" center>Description</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>getAll</av-dynamic-col>        <av-dynamic-col size="8" center>Return all items stored inside the RAM like {[index: Index] : T}        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>getList</av-dynamic-col>        <av-dynamic-col size="8" center>Return all items stored inside the RAM like T[]        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>getById</av-dynamic-col>        <av-dynamic-col size="8" center>Return the item where the index is egal to the parameter            provide</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>get</av-dynamic-col>        <av-dynamic-col size="8" center><span>Alias for <span class="cn">getById</span></span></av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>getByIds</av-dynamic-col>        <av-dynamic-col size="8" center>Return all items where the index is inside the first parameter            provide</av-dynamic-col>    </av-dynamic-row></div><av-code language="typescript" filename="Test.lib.avt">    export async function test() {    \tconst person: Person = await PersonRAM.getInstance().get(1);    \tconst person: Person = await PersonRAM.getInstance().getById(1);    \tconst people: {[id: number] : Person} = await PersonRAM.getInstance().getAll();    \tconst people: Person[] = await PersonRAM.getInstance().getList();    \tconst people: Person[] = await PersonRAM.getInstance().getByIds([1, 2]);    }</av-code></av-code><h3>Create</h3><div class="table">    <av-dynamic-row class="header">        <av-dynamic-col size="4" center>Function</av-dynamic-col>        <av-dynamic-col size="8" center>Description</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>create</av-dynamic-col>        <av-dynamic-col size="8" center>Store an item inside the RAM and return the element stored.</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>createList</av-dynamic-col>        <av-dynamic-col size="8" center>Store a set of items inside the RAM and return the elements            stored.</av-dynamic-col>    </av-dynamic-row></div><av-code language="typescript" filename="Test.lib.avt">    export async function test() {    \tlet person1: Person = new Person();    \tperson1.id = 1;    \tperson1.name = "John Doe";    \tlet person2: Person = new Person();    \tperson2.id = 2;    \tperson2.name = "Jane Doe";    \tconst person: Person = await PersonRAM.getInstance().create(person1);    \tconst people: Person[] = await PersonRAM.getInstance().create([person1, person2]);    }</av-code></av-code><h3>Update</h3><div class="table">    <av-dynamic-row class="header">        <av-dynamic-col size="4" center>Function</av-dynamic-col>        <av-dynamic-col size="8" center>Description</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>update</av-dynamic-col>        <av-dynamic-col size="8" center>Update an item inside the RAM and return the element updated.</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>updateList</av-dynamic-col>        <av-dynamic-col size="8" center>Update a set of items inside the RAM and return the elements            stored.</av-dynamic-col>    </av-dynamic-row></div><av-code language="typescript" filename="Test.lib.avt">    export async function test() {    \tlet person1: Person = await PersonRAM.getInstance().get(1);    \tperson1.name = "John Doe 2";    \tlet person2: Person = await PersonRAM.getInstance().get(2);    \tperson2.name = "Jane Doe 2";    \tconst person: Person = await PersonRAM.getInstance().update(person1);    \tconst people: Person[] = await PersonRAM.getInstance().update([person1, person2]);    }</av-code></av-code><h3>Delete</h3><div class="table">    <av-dynamic-row class="header">        <av-dynamic-col size="4" center>Function</av-dynamic-col>        <av-dynamic-col size="8" center>Description</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>delete</av-dynamic-col>        <av-dynamic-col size="8" center>Delete an item inside the RAM and return the element updated.</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>deleteById</av-dynamic-col>        <av-dynamic-col size="8" center>Delete an item inside the RAM and return the element updated.</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>deleteList</av-dynamic-col>        <av-dynamic-col size="8" center>Delete a set of items inside the RAM and return the elements            stored.</av-dynamic-col>    </av-dynamic-row></div><av-code language="typescript" filename="Test.lib.avt">    export async function test() {    \tlet person1: Person = await PersonRAM.getInstance().get(1);    \tlet person2: Person = await PersonRAM.getInstance().get(2);    \tawait PersonRAM.getInstance().delete(person1);    \tawait PersonRAM.getInstance().deleteById(1);    \tawait PersonRAM.getInstance().deleteList([person1, person2]);    }</av-code></av-code><p>The last thing to know is that once an item a stored inside the ram, the item reference is always the same.</p><av-code language="typescript" filename="Test.lib.avt">    export async function test() {    \tlet person1: Person = await PersonRAM.getInstance().get(1);    \tperson1.name = "John Doe 2";    \tconst person: Person = await PersonRAM.getInstance().update(person1);    \t// person == person1 =&gt; true    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocRamCrud";
    }
}
window.customElements.define('av-doc-ram-crud', DocRamCrud);Aventus.WebComponentInstance.registerDefinition(DocRamCrud);

class DocRamCreate extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocRamCreate;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamCreate.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>RAM - Create</h1><p>In the section you are going to learn what is a RAM and how you can create it inside Aventus.</p><h2>Definition</h2><p>A RAM is a class that store all your <av-router-link state="/data/create">data instances</av-router-link>. This class    is most of the time a singleton because we want only one storage by type. This piece of code is in charge of all    CRUD (Create / Read / Update / Delete) operations.</p><h2>Inside Aventus</h2><p>Inside Aventus you can create RAM by right clicking on the explorer part inside vscode, choose <i>Aventus        : Create...</i> and choose <i>RAM</i>. Inside the input you can enter the name of the class for which you create    a store (ex: Person will create a PersonRAM class). This will create a basic RAM class:</p><av-code language="typescript" filename="Person.ram.avt">    export class PersonRAM extends Aventus.Ram&lt;Person&gt; implements Aventus.IRam {    \t/**    \t* Create a singleton to store data    \t*/    \tpublic static getInstance() {    \t\treturn Aventus.Instance.get(PersonRAM);    \t}    \t/**    \t* @inheritdoc    \t*/    \tpublic override defineIndexKey(): keyof Person {    \t\treturn 'id';    \t}    \t/**    \t* @inheritdoc    \t*/    \tprotected override getTypeForData(objJson: Aventus.KeysObject&lt;Person&gt; | Person): new () =&gt; Person {    \t\treturn Person;    \t}    }</av-code></av-code><p>By default, the Aventus.RAM store data by index that must be a <span class="cn">number</span>. The method <span class="cn">defineIndexKey</span> ask    you to define which key of your object is the primary key to index data. For example if you want to get a data    inside your RAM you must provide a number that is egal to the index key defined. With the previous example, the code    <span class="cn">PersonRAM.getInstance().get(1)</span> will check if the storage contains a Person where id is egal to 1.</p><p>If you need another kind of index key, you can extend <span class="cn">Aventus.GenericRam</span> instead of Aventus.Ram</p><av-code language="typescript" filename="Person.ram.avt">    export class PersonRAM extends Aventus.GenericRam&lt;string, Person&gt; implements Aventus.IRam {    \t...    }</av-code></av-code><p>The <span class="cn">getTypeForData</span> method allows you to define which object must be instanciated for a specific data. This    isn't usefull when you work with concrete classes but if you have abstract classes or interfaces, you have to define    which child must be stored inside RAM.</p><av-code language="typescript" filename="Shape.ram.avt">    export class ShapeRAM extends Aventus.Ram&lt;Shape&gt; implements Aventus.IRam {    \t...    \t&nbsp;    \tprotected override getTypeForData(objJson: Aventus.KeysObject&lt;Shape&gt; | Shape): new () =&gt; Shape {    \t\tif(objJson.type == "circle"){    \t\t\treturn Circle;    \t\t}    \t\treturn OtherShape;    \t}    }</av-code></av-code><p>The type <span class="cn">Aventus.KeysObject&lt;T&gt;</span> return all class T information without being a T instance. This prevents    using <span class="cn">instanceof</span> T.</p><av-code language="typescript" filename="Person.data.avt">    export class Person extends Aventus.Data implements Aventus.IData {    \tpublic id: number = 0; // This is ok    \tpublic firstname: string; // This will trigger an error    \tpublic lastname: string = null; // This is ok    }</av-code></av-code><av-code language="typescript" filename="Test.lib.avt">    export function test(p: Aventus.KeysObject&lt;Person&gt;) {        // p instanceof Person =&gt; false        p.fistname = "John";    }</av-code></av-code><p>Aventus provide an other RAM type to perform CRUD opertations through websocket. You must extend <span class="cn">Aventus.RamWs</span>    or <span class="cn">Aventus.GenericRamWs</span> and define the socket to use and the base route of the socket. More informations on    the <av-router-link state="/docs/socket/create">socket section</av-router-link>.</p><av-code language="typescript" filename="Person.ram.avt">    export class PersonRAM extends Aventus.RamWs&lt;Person&gt; implements Aventus.IRam {    \t...    \t/**    \t* @inheritdoc    \t*/    \tprotected override getWebSocket(): Aventus.Socket {    \t\treturn Aventus.Socket.getInstance();    \t}    \t/**    \t* @inheritdoc    \t*/    \tprotected override getWebSocketRoute(): string {    \t\treturn "/person";    \t}    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocRamCreate";
    }
}
window.customElements.define('av-doc-ram-create', DocRamCreate);Aventus.WebComponentInstance.registerDefinition(DocRamCreate);

class DocLibWatcher extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocLibWatcher;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibWatcher.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Library - Watcher</h1><p>A watcher is an object that will notify any changes it undergoes. This is based on the <span class="cn"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy" target="_blank" rel="noopener noreferrer">Proxy</a></span> pattern.</p><av-code language="typescript" filename="Example.lib.avt">    export function createWatcher() {    \tlet watchableObj = Aventus.Watcher.get({}, (action: WatchAction, path: string, element: any) =&gt; {    \t\tconsole.log(Aventus.WatchAction[action] + " on " + path + " with value " + value);    \t});    \treturn watchableObj;    }</av-code></av-code><p>The callback is fired when one of the following action occured : <span class="cn">CREATED</span>, <span class="cn">UPDATED</span>, <span class="cn">DELETED</span>.</p><av-code language="typescript" filename="Example.lib.avt">    export function runWatcher() {    \tlet watchableObj = Aventus.Watcher.get({}, (action: WatchAction, path: string, element: any) =&gt; {    \t\tconsole.log(Aventus.WatchAction[action] + " on " + path + " with value " + value);    \t});    &nbsp;    \twatchableObj.name = "John"; // Fire a CREATED    \t// the log : CREATED on name with value "John"    &nbsp;    \twatchableObj.name = "John Doe"; // Fire a UPDATED    \t// the log : UPDATED on name with value "John Doe"    &nbsp;    \tdelete watchableObj.name; // Fire a DELETED    \t// the log : DELETED on name with value "John Doe"    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocLibWatcher";
    }
}
window.customElements.define('av-doc-lib-watcher', DocLibWatcher);Aventus.WebComponentInstance.registerDefinition(DocLibWatcher);

class DocLibTools extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocLibTools;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibTools.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Library - Tools</h1><p>Finally you can use the tools provided to help you.</p><h2>compareObject</h2><p>If you want compare if two objects contains the same informations you can use the function <span class="cn">Aventus.compareObject</span></p><av-code language="typescript" filename="Example.lib.avt">    export function test() {    &nbsp;    \tconst obj1 = {    \t\tname:"John",    \t\ttodos: ["todo1", "todo2"]    \t}    &nbsp;    \tconst obj2 = {    \t\tname:"John",    \t\ttodos: ["todo2", "todo1"]    \t}    &nbsp;    \tconst obj3 = {    \t\tname:"John",    \t\ttodos: ["todo1", "todo3"]    \t}    &nbsp;    \tconsole.log(Aventus.compareObject(obj1, obj2)); // true    \tconsole.log(Aventus.compareObject(obj1, obj3)); // false    &nbsp;    }</av-code></av-code><h2>Mutex</h2><p>Because JavaScript is an event-driven language, a function can be exectued by two different stacks. If the code    inside the function is a critical section and must be exectued only one by one you can use the class <span class="cn">Aventus.Mutex</span>. To understand what the mutex is doing you can read this <a href="https://en.wikipedia.org/wiki/Mutual_exclusion" target="_blank">article</a>. </p><av-code language="typescript" filename="Example.lib.avt">    export class Example {    &nbsp;    \tprivate mutex :Aventus.Mutex = new Aventus.Mutex();    &nbsp;    \tpublic async runCriticalCode(){    \t\tawait this.mutex.waitOne();    \t\t... critical code    \t\tthis.mutex.release();    \t}    &nbsp;    }</av-code></av-code><h2>sleep</h2><p>If you need to wait a specific time of ms you can use the <span class="cn">Aventus.sleep</span> function.</p><av-code language="typescript" filename="Example.lib.avt">    export class Example {    &nbsp;    \tpublic async test() {    \t\tconsole.log(Date.now());    \t\tawait Aventus.sleep(5000);    \t\tconsole.log(Date.now());    \t}    &nbsp;    }</av-code></av-code><h2>UUID</h2><p>If you need a unique id you can use the <span class="cn">Aventus.uuidv4</span> function. More information about uuid    <a href="https://en.wikipedia.org/wiki/Universally_unique_identifier" target="_blank">here</a>.</p><av-code language="typescript" filename="Example.lib.avt">    export class Example {    &nbsp;    \tpublic test() {    \t\tlet id = Aventus.uuidv4();    \t}    &nbsp;    }</av-code></av-code><h2>Error</h2><p>When you create function that can fail you can use the error strategy developed by Aventus. Instead of returning the    function result, the result is wrapped inside a container like this.</p><av-code language="typescript">    var result = {    success: boolean,    errors: [],    result: any    }</av-code></av-code><p>Below you can find an implementation example for a function that must transform a string in lowercase.</p><av-code language="typescript" filename="StringExtension.lib.avt">    // List of available codes    export enum MyStringCode {    \tEmptyString    }    &nbsp;    // Error    export class StringError extends Aventus.GenericError&lt;MyStringCode&gt; {}    &nbsp;    // Result of the function ( = container)    export class StringResult extends Aventus.ResultWithError&lt;{ lower: string; }, StringError&gt; { }    &nbsp;    export class StringExtension {    &nbsp;    \tpublic static toLower(txt: string): StringResult {    \t\tlet result = new StringResult();    \t\tif(!txt) {    \t\t\tlet error = new StringError(MyStringCode.EmptyString, "Please provide a string");    \t\t\tresult.errors.push(error);    \t\t}    \t\telse {    \t\t\tresult.result = { lower: txt.toLowerCase() };    \t\t}    &nbsp;    \t\treturn result;    \t}    &nbsp;    }    &nbsp;    export class Test {    \tpublic static run() {    \t\tconst result = StringExtension.toLower("");    \t\t/*    \t\t\tresult.success = false    \t\t\tresult.errors = [ { code: 0, message: "Please provide a string" } ]    \t\t\tresult.result = null    \t\t*/    &nbsp;    \t\tconst result2 = StringExtension.toLower("HELLO");    \t\t/*    \t\t\tresult.success = true    \t\t\tresult.errors = []    \t\t\tresult.result = { lower: 'hello' }    \t\t*/    \t}    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocLibTools";
    }
}
window.customElements.define('av-doc-lib-tools', DocLibTools);Aventus.WebComponentInstance.registerDefinition(DocLibTools);

class DocLibResourceLoader extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocLibResourceLoader;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibResourceLoader.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Library - ResourceLoader</h1><p>To load content from uri, you can use the fetch API in mordern browser. The only problem is that every time you need    this resource, you have to reload it again and again. To avoid this you can use <span class="cn">Aventus.ResourceLoader</span>. Two method can be used :</p><ul>    <li><span class="cn">load</span> that will return you the resource as a string (base64 for img resource).</li>    <li><span class="cn">loadInHead</span> that will append a style or script tag in head.</li></ul><p>When a resource is loaded, the resource laoder will keep it in memory or prevent adding twice a tag in head.</p><av-code language="typescript" filename="Example.wcl.avt">    export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \tpublic async load() {    &nbsp;    \t\t// return the content of the svg    \t\tconst svgContent = await Aventus.ResourceLoader.load('/img.svg');    \t\tconst svgContent2 = await Aventus.ResourceLoader.load({    \t\t\ttype: "svg",    \t\t\turl: "/img.svg"    \t\t});    &nbsp;    \t\t// load the tag &lt;link rel="stylesheet" href="/style.css"&gt;    \t\tconst hasError = await Aventus.ResourceLoader.loadInHead("/style.css");    \t\tconst hasError2 = await Aventus.ResourceLoader.loadInHead({    \t\t\ttype: "css",    \t\t\turl: "/style.css"    \t\t});    \t}    &nbsp;    }</av-code></av-code><p>By default Aventus will try to determine the type you want by analyze the extension set inside the uri. If it fails, you can specify the type you need by adding the <span class="cn">type</span> parameter.</p>` }
    });
}
    getClassName() {
        return "DocLibResourceLoader";
    }
}
window.customElements.define('av-doc-lib-resource-loader', DocLibResourceLoader);Aventus.WebComponentInstance.registerDefinition(DocLibResourceLoader);

class DocLibResizeObserver extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocLibResizeObserver;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibResizeObserver.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Library - ResizeObserver</h1><p>To know when an element is changing you can use the native function <span class="cn"><a href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver" target="_blank">ResizeObserver</a></span>. Inside Aventus, you can find an optimized version of    ResizeObserver under <span class="cn">Aventus.ResizeObserver</span>. The behavior is the same as the native one but    behind, a <span class="cn">single instance</span> of native ResizeObserver is used and the callback function is    limited to one trigger each <span class="cn">1000 / 60 ms</span>.</p><av-code language="html" filename="Example.wc.avt">    &lt;script&gt;    \texport class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {    \t\tprotected override postCreation(): void {    &nbsp;    \t\t\tconst observer = new Aventus.ResizeObserver(() =&gt; {    \t\t\t\tconsole.log("element size changed")    \t\t\t})    \t\t\tobserver.observe(this);    &nbsp;    \t\t\t// change max framerate    \t\t\tconst observer2 = new Aventus.ResizeObserver({    \t\t\t\tcallback: () =&gt; {    \t\t\t\t\tconsole.log("element size changed")    \t\t\t\t},    \t\t\t\tfps: 30    \t\t\t})    \t\t\tobserver2.observe(this);    \t\t}    \t}    &lt;/script&gt;</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocLibResizeObserver";
    }
}
window.customElements.define('av-doc-lib-resize-observer', DocLibResizeObserver);Aventus.WebComponentInstance.registerDefinition(DocLibResizeObserver);

class DocLibPressManager extends DocGenericPage {
    static __style = `:host .options{list-style:none;padding:0;margin:0}:host .options li{margin:10px 0}:host .options li .size{display:inline-block;width:130px}`;
    __getStatic() {
        return DocLibPressManager;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibPressManager.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Library - PressManager</h1><p>The <span class="cn">PressManager</span> class is a home class to deal with <span class="cn">pointer</span>, <span class="cn">touch</span> and <span class="cn">mouse</span> event. The main job of this class is to prevent the    parent to have a trigger on an event catch by the child. The options for the PressManager are the following:</p><ul class="options">    <li>        <div class="size"><span class="cn">element</span></div>: The element to which the events must be added.    </li>    <li>        <div class="size"><span class="cn">delayDblPress</span></div>: The delay allowed between two click/touch to        trigger a double press event.    </li>    <li>        <div class="size"><span class="cn">delayLongPress</span></div>: The delay allowed before triggering a long press        event.    </li>    <li>        <div class="size"><span class="cn">forceDblPress</span></div>: Force trigger double press event to parent (use        it only if you know that the parent has a double press event because it will create latency).    </li>    <li>        <div class="size"><span class="cn">offsetDrag</span></div>: The distance in pixel that the user must move before        triggering a drag event.    </li>    <li>        <div class="size"><span class="cn">onDblPress</span></div>: Fired when double press event is detected.    </li>    <li>        <div class="size"><span class="cn">onDrag</span></div>: Fired when a drag event is detected.    </li>    <li>        <div class="size"><span class="cn">onDragEnd</span></div>: Fired when a drag event stopped.    </li>    <li>        <div class="size"><span class="cn">onDragStart</span></div>: Fired when a drag event started.    </li>    <li>        <div class="size"><span class="cn">onLongPress</span></div>: Fired when a long press event is detected.    </li>    <li>        <div class="size"><span class="cn">onPress</span></div>: Fired when a press event is detected.    </li>    <li>        <div class="size"><span class="cn">onPressEnd</span></div>: Fired when a press event stopped.    </li>    <li>        <div class="size"><span class="cn">onPressStart</span></div>: Fired when a press event started.    </li></ul><p>You must use only the property you need because your options will change the behavior of the PressManager. For    example, if you set a callback on <span class="cn">onDblPress</span>, the code must wait until the end of the <span class="cn">delayDblPress</span> to trigger the <span class="cn">onPress</span>. This is not the case if you    don't set the options.</p><p>Inside the <span class="cn">*.wcv.avt</span> you can use the attribute <span class="cn">@press</span> to create a    PressManager on this element.</p><av-code language="html" filename="Example.wc.avt">    &lt;script&gt;    \texport class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t\t@ViewElement()    \t\tprotected buttonEl: HTMLButtonElement;    &nbsp;    \t\tpublic onPress() { }    &nbsp;    \t\tprotected override postCreation(): void {    \t\t\t// This is the same as @press="onPress"    \t\t\tnew Aventus.PressManager({    \t\t\t\telement: this.buttonEl,    \t\t\t\tonPress: () =&gt; {    \t\t\t\t\tthis.onPress();    \t\t\t\t}    \t\t\t});    \t\t}    \t}    &lt;/script&gt;    &nbsp;    &lt;template&gt;    \t&lt;button @element="buttonEl" @press="onPress"&gt;Click&lt;/button&gt;    &lt;/template&gt;</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocLibPressManager";
    }
}
window.customElements.define('av-doc-lib-press-manager', DocLibPressManager);Aventus.WebComponentInstance.registerDefinition(DocLibPressManager);

class DocLibInstance extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocLibInstance;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibInstance.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Library - Instance</h1><p>Sometimes you must create unique instance of a class. This pattern is named <span class="cn"><a href="https://www.tutorialspoint.com/design_pattern/singleton_pattern.htm" target="_blank">Singleton</a></span>. Despite the controversy over whether this pattern is a good choice for    use or not, Aventus include a way to create singleton quickly. You just need to call the function <span class="cn">Aventus.Instance.get</span> to obtain your singleton instance.</p><av-code language="typescript" filename="Singleton.lib.avt">    export class MySingleton {    &nbsp;    \tpublic static getInstance(): MySingleton {    \t\treturn Aventus.Instance.get(MySingleton);    \t}    &nbsp;    \t// To prevent class being created from outside    \tprivate constructor(){}    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocLibInstance";
    }
}
window.customElements.define('av-doc-lib-instance', DocLibInstance);Aventus.WebComponentInstance.registerDefinition(DocLibInstance);

class DocLibDragAndDrop extends DocGenericPage {
    static __style = `:host .options{list-style:none;margin:0}:host .options li{margin:15px 0;text-align:justify}:host .options li .size{display:inline-block;width:170px}`;
    __getStatic() {
        return DocLibDragAndDrop;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibDragAndDrop.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Library - Drag&Drop</h1><p>If you need to drag&drop a visual element you can use <span class="cn">Aventus.DragAndDrop</span>. This code will    move a target by setting a <span class="cn">left</span> and a <span class="cn">top</span>. The drag&drop can be    instanciate with the following parameters: </p><ul class="options">    <li>        <div class="size"><span class="cn">applyDrag</span></div>: Determine if the left and top value must be set or        not    </li>    <li>        <div class="size"><span class="cn">element</span></div>: The element that will move    </li>    <li>        <div class="size"><span class="cn">elementTrigger</span></div>: The element that listen the drag event; default        is element    </li>    <li>        <div class="size"><span class="cn">offsetDrag</span></div>: Set the default offset for the drag trigger; default        is DragAndDrop.defaultOffsetDrag    </li>    <li>        <div class="size"><span class="cn">shadow.enable</span></div>: If set to true, the drag and drop will create a        shadow element while dragging and removing it on drop. It will not move the original element anymore    </li>    <li>        <div class="size"><span class="cn">shadow.container</span></div>: The container where the shadow element will be        added, default is body    </li>    <li>        <div class="size"><span class="cn">shadow.removeOnStop</span></div>: Remove shadow from DOM tree at the end    </li>    <li>        <div class="size"><span class="cn">shadow.transform()</span></div>: Add custom transformation for the shadow        element like adding class    </li>    <li>        <div class="size"><span class="cn">strict</span></div>: If set to false, the element will be considered as in        the target if it touches it    </li>    <li>        <div class="size"><span class="cn">targets</span></div>: The targets for the drop action    </li>    <li>        <div class="size"><span class="cn">usePercent</span></div>: Use percent instead of pixel    </li>    <li>        <div class="size"><span class="cn">isDragEnable()</span></div>: Set a function to determine if drag is active or        not    </li>    <li>        <div class="size"><span class="cn">getZoom()</span></div>: Set a function to determine the current zoom; default        is 1    </li>    <li>        <div class="size"><span class="cn">getOffsetX()</span></div>: Set a function to get offset X in px related to        element.offsetTarget    </li>    <li>        <div class="size"><span class="cn">getOffsetY()</span></div>: Set a function to get offset Y in px related to        element.offsetTarget    </li>    <li>        <div class="size"><span class="cn">onPointerDown()</span></div>: Set a function that will be fired when pointer        down on the elementTrigger    </li>    <li>        <div class="size"><span class="cn">onPointerUp()</span></div>: Set a function that will be fired when pointer up    </li>    <li>        <div class="size"><span class="cn">onStart()</span></div>: Set a function that will be fired when drag start    </li>    <li>        <div class="size"><span class="cn">onMove()</span></div>: Set a function that will be fired when the element        move; trigger even if applyDrag = false    </li>    <li>        <div class="size"><span class="cn">onStop()</span></div>: Set a function that will be fired when drag stop    </li>    <li>        <div class="size"><span class="cn">onDrop()</span></div>: Set a function that will be fired after drop if at        least one target found    </li></ul><p>The simplest example is the following :</p><av-code language="css" filename="Example.wcs.avt">    :host {    \twidth: 20px;    \theight: 20px;    \tbackground-color: red;    \tposition: absolute;    }</av-code></av-code><av-code language="typescript" filename="Example.wcl.avt">    export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \tprotected override postCreation(): void {    \t\tnew Aventus.DragAndDrop({    \t\t\telement: this    \t\t});    \t}    }</av-code></av-code><av-result>    <av-doc-lib-drag-and-drop-example></av-doc-lib-drag-and-drop-example></av-result>` }
    });
}
    getClassName() {
        return "DocLibDragAndDrop";
    }
}
window.customElements.define('av-doc-lib-drag-and-drop', DocLibDragAndDrop);Aventus.WebComponentInstance.registerDefinition(DocLibDragAndDrop);

class DocLibCreate extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocLibCreate;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibCreate.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Library</h1><p>In the section you are going to learn what is a library and how you can create it inside Aventus.</p><h2>Definition</h2><p>A library is a piece of code that isn't matching any previous file type. This is the only file type that can contain    exported functions. The only thing that isn't allowed inside this file is to write root constants or root variables.</p><av-code language="typescript" filename="Test.lib.avt">    export function myFunction(){    ...    }    &nbsp;    export class MyClass {    ...    }    &nbsp;    export type MyType = ...    &nbsp;    export interface MyInterface {    ...    }    &nbsp;    export enum MyEnum {    ...    }</av-code></av-code><p>To keep a clean project, we advise you to not write all your code inside <span class="cn">*.lib.avt</span> even if    you can do it. The goal of Aventus is to keep everything tidy.</p><p>The following sections are libraries that are included inside Aventus.</p>` }
    });
}
    getClassName() {
        return "DocLibCreate";
    }
}
window.customElements.define('av-doc-lib-create', DocLibCreate);Aventus.WebComponentInstance.registerDefinition(DocLibCreate);

class DocLibCallback extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocLibCallback;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibCallback.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Library - Callback</h1><p>Aventus script files are based on Typescript. The main advantage is that everything is typed but when you will use    <span class="cn">custom event</span> it will be a nightmare to keep your type. This is why inside Avantue you can    find two classes that are doing the same jobs as Event but are type friendly : <span class="cn">Callback</span> and    <span class="cn">CallbackGroup</span>.</p><av-code language="typescript" filename="EmitterNoCallback.wcl.avt">    export class EmitterNoCallback extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \tpublic constructor() {    \t\tsuper();    \t\tsetInterval(() =&gt; {    \t\t\tthis.dispatchEvent(new CustomEvent("myEvent", {    \t\t\t\tdetail: {    \t\t\t\t\ttime: Date.now()    \t\t\t\t}    \t\t\t}));    \t\t}, 5000);    \t}    &nbsp;    }</av-code></av-code><av-code language="typescript" filename="ReceiverNoCallback.wcl.avt">    export class ReceiverNoCallback extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \tprotected override postCreation(): void {    \t\tlet emitter = document.querySelector&lt;EmitterNoCallback&gt;("#emitter");    \t\temitter.addEventListener("myEvent", (e: CustomEvent) =&gt; {    \t\t\tconsole.log("Time is : " + e.detail.time);    \t\t});    \t}    &nbsp;    }</av-code></av-code><p>There are many problems inside the code :</p><ul>    <li>You don't know that an event <span class="cn">myEvent</span> can be emitted.</li>    <li>You don't know what the event will have as details ( <span class="ca">time</span> ).</li>    <li>If the event name change, you won't be able to detect errors inside your code.</li>    <li>If more details will be added, nothing told you that you can use it.</li></ul><p>As you can see, you really dependend on the documentation. What a nightmare when you create bigger project. Now, have    a look at the code below with <span class="cn">Callback</span>.</p><av-code language="typescript" filename="EmitterCallback.wcl.avt">    export class EmitterCallback extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \tprivate _myEvent: Aventus.Callback&lt;(time: number) =&gt; void&gt; = new Aventus.Callback();    &nbsp;    \t// Use getter to prevent external set    \tpublic get myEvent(): Aventus.Callback&lt;(time: number) =&gt; void&gt; {    \t\treturn this._myEvent;    \t}    &nbsp;    \tpublic constructor() {    \t\tsuper();    \t\tsetInterval(() =&gt; {    \t\t\tthis.myEvent.trigger([Date.now()]);    \t\t}, 5000);    \t}    &nbsp;    }</av-code></av-code><av-code language="typescript" filename="ReceiverCallback.wcl.avt">    export class ReceiverCallback extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \tprotected override postCreation(): void {    \t\tlet emitter = document.querySelector&lt;EmitterCallback&gt;("#emitter");    \t\temitter.myEvent.add((time: number) =&gt; {    \t\t\tconsole.log("Time is : " + time);    \t\t});    \t}    &nbsp;    }</av-code></av-code><p>As you can see, the behavior is almost the same but typing is preserved.</p><p>The <span class="cn">CallbackGroup</span> class is doing the same thing as the <span class="cn">Callback</span> but    when you <span class="cn">add</span>, <span class="cn">remove</span> or <span class="cn">trigger</span>, you must    provide a key (string or number) to trigger or store only a group of callbacks.</p><av-code language="typescript" filename="Log.wcl.avt">    export enum LogLvl {    \tInfo,    \tWarning,    \tError    }    &nbsp;    export class LogEmitter extends Aventus.WebComponent implements Aventus.DefaultComponent {    \tprivate _onNewLog: Aventus.CallbackGroup&lt;(msg: string) =&gt; void&gt; = new Aventus.CallbackGroup();    \t// Use getter to prevent external set    \tpublic get onNewLog(): Aventus.CallbackGroup&lt;(msg: string) =&gt; void&gt; {    \t\t return this._onNewLog;    \t}    &nbsp;    \t/**    \t* Trigger the log callback only for the lvl concerned    \t*/    \tpublic addLog(msg: string, lvl: LogLvl) {    \t\tthis.onNewLog.trigger(lvl, [msg]);    \t}    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocLibCallback";
    }
}
window.customElements.define('av-doc-lib-callback', DocLibCallback);Aventus.WebComponentInstance.registerDefinition(DocLibCallback);

class DocLibAnimation extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocLibAnimation;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibAnimation.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Library - Animation</h1><p>The animation class allow you to execute a function at specific frames. The code is based on the <span class="cn"><a href="https://developer.mozilla.org/fr/docs/Web/API/window/requestAnimationFrame" target="_blank"></a>requestAnimationFrame</span>. One use case for the class can be the following : You have    a to run some complex calculations when the user has the mouse press and moves the cursor on the screen. The event    can be fired at anytime and can overload your website. To avoid that you can use the <span class="cn">Animation</span> like that.</p><av-code language="typescript" filename="Test.lib.avt">    export function addCalculation() {    \tlet savedValue = ...    \tconst animation = new Aventus.Animation({    \t\tanimate: () =&gt; {    \t\t\t// complex calculations    \t\t},    \t\tfps: 30,    \t\tstopped: () =&gt; {    \t\t\t// no more animate will be fired    \t\t}    \t})    &nbsp;    \tdocument.body.addEventListener("mousedown", (e) =&gt; {    \t\tsavedValue = ...    &nbsp;    \t\tanimation.start();    &nbsp;    \t\tconst mouseMove = () =&gt; {    \t\t\tsavedValue = ...    \t\t}    &nbsp;    \t\tconst mouseUp = () =&gt; {    \t\t\tanimation.stop();    \t\t\tdocument.body.removeEventListener("mousemove", mouseMove);    \t\t\tdocument.body.removeEventListener("mouseup", mouseUp);    \t\t}    &nbsp;    \t\tdocument.body.addEventListener("mousemove", mouseMove);    \t\tdocument.body.addEventListener("mouseup", mouseUp);    \t})    }</av-code></av-code><p>With the code above, the code inside animate will be fired every <span class="cn">1000 / 30 ms</span> instead of each time the cursor is moving</p>` }
    });
}
    getClassName() {
        return "DocLibAnimation";
    }
}
window.customElements.define('av-doc-lib-animation', DocLibAnimation);Aventus.WebComponentInstance.registerDefinition(DocLibAnimation);

class DocIntroduction extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocIntroduction;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocIntroduction.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Introduction</h1><p>Aventus is a framework that allow you to create complex user interfaces by splitting common parts of a    front-end application in several well knowned files. It builds on top of standard HTML, CSS, JavaScript    and provide a way to keep your development under control.</p><p>Here is a minimal example:</p><av-code language="html" tab="1">    <script>        export class Button extends Aventus.WebComponent implements Aventus.DefaultComponent {            @Property()            private count:number = 0;            private onClick(): void {                this.count++;            }        }    </script>    <template>        <button @click="onClick">Count is {{count}}</button>    </template>    <style>        :host {            button {                background-color: #e5540e;                border: none;                border-radius: 5px;                color: white;                cursor: pointer;                padding: 5px 15px;                box-shadow: 0 0 5px #555;            }        }    </style></av-code></av-code><av-result>    <av-doc-introduction-button></av-doc-introduction-button></av-result><p>To understand the capabilities of Aventus, you need to learn about the following:</p><ul>    <li><span class="cn">Webcomponent</span></li>    <li><span class="cn">Data / Storage</span></li>    <li><span class="cn">States</span></li>    <li><span class="cn">Websocket</span></li></ul>` }
    });
}
    getClassName() {
        return "DocIntroduction";
    }
}
window.customElements.define('av-doc-introduction', DocIntroduction);Aventus.WebComponentInstance.registerDefinition(DocIntroduction);

class DocInstallation extends DocGenericPage {
    static __style = `:host .list-commands b{width:200px;display:inline-block}:host .list-commands av-icon{margin:0 15px}`;
    __getStatic() {
        return DocInstallation;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocInstallation.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Installation</h1><h2>Basic install</h2><p>Aventus is actually only available as a vscode extension. You can download it directly inside the vscode extensions    tab by searching "Aventus" in the marketplace. Nothing else is required because everythink is wrapped inside the    extension.</p><h2>Useful command inside vscode</h2><p>Because Aventus is fully integrated inside vscode, you must know how to run some commands. By default the shortcut to    list all the commands is : <b>ctrl</b>+<b>shift</b>+<b>p</b>. This action open a dropdown with all commands available inside your vscode instance.</p><ul class="list-commands">    <li><b>Developer: Reload Window</b> <av-icon icon="arrow-right"></av-icon> To reload the vscode instance</li>    <li><b>Aventus : Compile</b> <av-icon icon="arrow-right"></av-icon> To compile a build</li>    <li><b>Aventus : Copy static</b> <av-icon icon="arrow-right"></av-icon> To export a static a folder</li>    <li><b>Aventus : Import template</b> <av-icon icon="arrow-right"></av-icon> To import Aventus templates</li>    <li><b>Aventus : Open storage</b> <av-icon icon="arrow-right"></av-icon> To open the folder where Aventus store data</li></ul><h2>Source code</h2><p>The Aventus source code can be downloaded on <a href="https://github.com/Cobwebsite/Aventus" target="_blank" rel="noopener noreferrer">github.</a></p>` }
    });
}
    getClassName() {
        return "DocInstallation";
    }
    pageTitle() {
        return "Avenuts - Installation";
    }
}
window.customElements.define('av-doc-installation', DocInstallation);Aventus.WebComponentInstance.registerDefinition(DocInstallation);

class DocFirstApp extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocFirstApp;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocFirstApp.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Create your first project</h1><h2>Init the project</h2><p>In your file explorer create a new folder <span class="cn">HelloAventus</span> and open it with vscode.</p><p>You can create a new file named <span class="cn">aventus.conf.avt</span>. The minimal content for your config file is the following</p><av-code language="json" filename="aventus.conf.avt">    {    \t"module": "HelloAventus",    \t"componentPrefix": "ha",    \t"build": [{    \t\t"name": "Main",    \t\t"inputPath": [],    \t\t"outputFile": "./dist/helloaventus.js"    \t}]    }</av-code></av-code><p>The section <span class="cn">module</span> define the container name for the compiled code. Following the best practice, we minimize    the use of global variables by wrapping the final code inside module. In this example, you can reach your compiled code    by typing <i>HelloWorld.*</i> inside the dev console.</p><p>The section <span class="cn">componentPrefix</span> define the prefix for the webcomponents. For example the tag name for a    webcomponent class <i>Test</i> will be <i>ha-test</i>.</p><p>The section <span class="cn">build</span> define all builds informations. A build is a set of Aventus input file compiled as a single    js file. You must provide at least 3 fields. <span class="cn">name</span> that define the unique name for your build,    <span class="cn">inputPath</span> that define where the compiler must look for Aventus file and <span class="cn">outputFile</span> that define where    the compiler must write the compiled file. For the example the field <i>includeBase</i> is added to auto import    Aventus source code.</p><p>When you save the config file a new file is created inside your workspace : <i>/dist/helloaventus.js</i>. The js file is your code compiled. Actually the file is empty because we didn't write any code.</p><p>There are more options for the config file that you can read <av-router-link>here</av-router-link></p><p>Now you can create a new folder named <span class="cn">src</span> and edit the field build.inputPath like that</p><av-code language="json" filename="aventus.conf.avt">    {    \t"module": "HelloAventus",    \t"componentPrefix": "ha",    \t"build": [{    \t\t"name": "Main",    \t\t"inputPath": [    \t\t\t"./src/*"    \t\t],    \t\t"outputFile": "./dist/helloaventus.js"    \t}]    }</av-code></av-code><p>This means that any <span class="cn">*.avt</span> file found will be compiled inside this build.</p><p>Now it's time to create your first webcomponent. You can right click inside the explorer part and click on <span class="cn">Aventus        : Create...</span></p><av-img src="/img/doc/install/firstapp/create_option.png"></av-img><p>A dropdown appears. Select the option : <span class="cn">Component</span></p><av-img src="/img/doc/install/firstapp/create_menu.png"></av-img><p>Then you must enter the name for your WebComponent, call it MyComponent    (<span class="cn">&lt;ha-my-component&gt;&lt;/ha-my-component&gt;</span>), press enter and select multiple files. Three new files are    created</p><ul>    <li><span class="cn">MyComponent.wcl.avt</span> - the file for the logic written in Typescript</li>    <li><span class="cn">MyComponent.wcs.avt</span> - the file for the style written in SCSS</li>    <li><span class="cn">MyComponent.wcv.avt</span> - the file for the view written in Html</li></ul><p>We will add some code inside the component to write an hello Aventus text in orange</p><av-code language="html" filename="MyComponent.wcv.avt">    <p>Hello <span class="orange">Aventus</span></p></av-code></av-code><av-code language="css" filename="MyComponent.wcs.avt">    :host { // :host is the style apply on your component    \tbackground-color: gray;    \t.orange {    \t\tcolor: #e5540e;    \t}    }</av-code></av-code><av-separator></av-separator><p>To show your first component you need an index file. Create a <span class="cn">/src/static</span>  folder and a <span class="cn">/src/static/index.html</span> and add    the content below:</p><av-code language="html" filename="index.html">    &lt;!DOCTYPE html&gt;    &lt;html lang="en"&gt;    \t&lt;head&gt;    \t\t&lt;meta charset="UTF-8"&gt;    \t\t&lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;    \t\t&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;    \t\t&lt;title&gt;Hello Aventus&lt;/title&gt;    \t\t&lt;script src="/helloaventus.js"&gt;&lt;/script&gt;    \t&lt;/head&gt;    \t&lt;body&gt;    \t\t&lt;ha-my-component&gt;&lt;/ha-my-component&gt;    \t&lt;/body&gt;    &lt;/html&gt;</av-code></av-code><p>This code will load the compiled file <i>helloaventus.js</i> in your dist folder. To export static file, you need to    add a new section inside your config.</p><av-code language="json" filename="aventus.conf.avt">    {    \t"module": "aventus_todo",    \t"componentPrefix": "av",    \t"build": [{    \t\t"name": "Main",    \t\t"inputPath": [    \t\t\t"./src/*"    \t\t],    \t\t"outputFile": "./dist/aventus_todo.js"    \t}],    \t"static":[{    \t\t"name": "Static",    \t\t"inputPath": "./src/static/",    \t\t"outputPath": "./dist/"    \t}]    }</av-code></av-code><p>This code will export every file from <span class="cn">/src/static</span> to <span class="cn">/dist</span>. You can save your config file.</p><p>Now you can launch the Aventus live server by clicking on the start server button.</p><av-img src="/img/doc/install/firstapp/start_server.png"></av-img><p>Well done, you created your first Aventus App.</p>` }
    });
}
    getClassName() {
        return "DocFirstApp";
    }
}
window.customElements.define('av-doc-first-app', DocFirstApp);Aventus.WebComponentInstance.registerDefinition(DocFirstApp);

class DocExperience extends DocGenericPage {
    static __style = `:host .list-commands b{width:100px;display:inline-block}:host .list-commands av-icon{margin:0 15px}`;
    __getStatic() {
        return DocExperience;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocExperience.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>UI and experience</h1><h2>Vscode UI</h2><p>The Aventus extension will edit vscode user interface to add some features.</p><h3>The create option</h3><p>When you right click on the vscode file explorer, you can notice that you have a new option named: <b>Aventus :        Create...</b>.</p><av-img src="/img/doc/install/experience/aventus_create.png"></av-img><p>If you click on it, a dropdown appears and you can select what you want to create.</p><ul class="list-commands">    <li><b>Init</b><av-icon icon="arrow-right"></av-icon> Create a new project</li>    <li><b>Component</b><av-icon icon="arrow-right"></av-icon> Create a display</li>    <li><b>Data</b><av-icon icon="arrow-right"></av-icon> Create a data struct</li>    <li><b>RAM</b><av-icon icon="arrow-right"></av-icon> Create a storage</li>    <li><b>Library</b><av-icon icon="arrow-right"></av-icon> Create a file to write any code</li>    <li><b>Socket</b><av-icon icon="arrow-right"></av-icon> Create a socket</li>    <li><b>State</b><av-icon icon="arrow-right"></av-icon> Create a state or a state manager</li>    <li><b>Custom</b><av-icon icon="arrow-right"></av-icon> Use one of your <av-router-link state="/advanced/templates">templates</av-router-link></li></ul><h3>The compilation informations</h3><p>If you have at least one build, on the bottom of the vscode you can see a tick and a time. If you hover this text,    you will see the last time your build was compiled.</p><av-img src="/img/doc/install/experience/last_compiled.png"></av-img><h3>The live server</h3><p>If you have at least one build, on the bottom of the vscode you can see a play button. If you click on it, the live    sever will start and a stop button will replace the play button.</p><av-img src="/img/doc/install/experience/last_compiled.png"></av-img><p>You can customize the live server inside the vscode    settings under <b>Aventus &gt; Liveserver</b>.</p>` }
    });
}
    getClassName() {
        return "DocExperience";
    }
}
window.customElements.define('av-doc-experience', DocExperience);Aventus.WebComponentInstance.registerDefinition(DocExperience);

class DocDataCreate extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocDataCreate;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocDataCreate.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Data</h1><p>In the section you are going to learn what is a data and how you can create it inside Aventus.</p><h2>Definition</h2><p>A data is a class that define an object structure. This class reflects what the application will contain. This is the    backbone of your application and most of the times, all data structures will be a copy from your backend object.</p><h2>Inside Aventus</h2><p>Inside Aventus you can create a new Data class by right clicking on the explorer part inside vscode, choose <i>Aventus        : Create...</i> and choose <i>Data</i>. Inside the input you can enter the name for the class. This will create    a basic data class:</p><av-code language="typescript" filename="Person.data.avt">    export class Person extends Aventus.Data implements Aventus.IData {    \tpublic id: number = 0;    }</av-code></av-code><p>All classes inside a <span class="cn">*.data.avt</span> must implements <span class="cn">Aventus.IData</span>. This will ensure that each data class instance can be identified by the <span class="cn">$type</span> field that must be unique. Furthermore, a static field named <span class="cn">Fullname</span> must be implemented.</p><av-code language="typescript" filename="Test.lib.avt">    export class Test {        public demo() {            console.log(Person.Fullname);            let p = new Person();            console.log(p.$type);            // $type and Fullname must be identical        }    }</av-code></av-code><p>    By default your data class extends <span class="cn">Aventus.Data</span> with the following impletemented properites :</p><av-code language="typescript" filename="Data.data.avt">    export abstract class Data implements IData {        /**         * The class schema / This field is defined during compilation         */        public static get $schema(): { [prop: string]: string; };        /**         * The current namespace / This field is defined during compilation         */        public static get Namespace(): string { return ""; }        /**         * Get the unique type for the data. Define it as the namespace + class name         */        public static get Fullname(): string { return this.Namespace + "." + this.name; }        /**         * The current namespace         */        public get namespace(): string {            return this.constructor['Namespace'];        }        /**         * Get the unique type for the data. Define it as the namespace + class name         */        public get $type(): string {            return this.constructor['Fullname'];        }        /**         * Get the name of the class         */        public get className(): string {            return this.constructor.name;        }    }</av-code></av-code><p>    During the compilation of a data class, the static field <span class="cn">Namespace</span> is defined. With this field you can create an unique type name that allows to clearly identify each data inside your application. Because Javascript is not typed, a <span class="cn">$schema</span> is created for each class to keep information about what the class must contain. In future version of Aventus, this will help the manager to synchronize data between each instances.</p><p>The last thing to know is that every properties must have an initializer.</p><av-code language="typescript" filename="Person.data.avt">    export class Person extends Aventus.Data implements Aventus.IData {    \tpublic id: number = 0; // This is ok    \tpublic firstname: string; // This will trigger an error    \tpublic lastname: string = null; // This is ok    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocDataCreate";
    }
}
window.customElements.define('av-doc-data-create', DocDataCreate);Aventus.WebComponentInstance.registerDefinition(DocDataCreate);

class DocConfigStatic extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocConfigStatic;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocConfigStatic.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Configuration - Static</h1><p>Even if Aventus is great for your project, you will need others files like .html, .png, etc. You can put your source file inside a static folder that will be exported.</p><h2>Properties</h2><div class="table">    <av-dynamic-row class="header">        <av-dynamic-col size="4" center>Name</av-dynamic-col>        <av-dynamic-col size="8" center>Description</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>name</av-dynamic-col>        <av-dynamic-col size="8" center>This is the name for the static part. This name is only use if you use the command "Aventus : Copy static" to allow the user to choose the right folder to export.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>inputPath</av-dynamic-col>        <av-dynamic-col size="8" center>This is a string to define which folder Aventus will watch. For            example, if you set "./src/static/*", all files inside the folder "src/static" will be exported.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>outputPath</av-dynamic-col>        <av-dynamic-col size="8" center>This is string to define where the static files will be exported.        </av-dynamic-col>    </av-dynamic-row></div><h2>Special files</h2><p>Inside the static folder, you can write some specials files that will be compiled to be supported by the browser.</p><h3>Sass</h3><p>You can write sass file inside the static folder that will be compiled to a css file. If your file name starts with a <span class="cn">_</span> Aventus will ignore it. (ex: _reset.scss)</p><h3>Global Style</h3><p>A good practice to develop a website is to declare theme variables and then use it inside your webcomponent. To do that, you can write a file <span class="cn">*.gs.avt</span> that will be compiled to a css file. The only goal of this file is to provide autocompletion for your css variables declared inside the <span class="cn">:root</span>.</p><av-code language="css" filename="theme.gs.avt">    :root {        --primary-color: #20232a;        --light-primary-color: #282c34;        --aventus-color: #e5540e;        --primary-font-color: white;        --link-color: #5680ed;        ...    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocConfigStatic";
    }
}
window.customElements.define('av-doc-config-static', DocConfigStatic);Aventus.WebComponentInstance.registerDefinition(DocConfigStatic);

class DocConfigLib extends DocGenericPage {
    static __style = `:host .table av-dynamic-row:not(.header) av-dynamic-col:nth-child(2){text-align:justify}:host .table av-dynamic-row:not(.header) av-router-link,:host .table av-dynamic-row:not(.header) b,:host .table av-dynamic-row:not(.header) i{display:contents}:host .table .constraint{display:block;font-size:14px;margin-top:5px}`;
    __getStatic() {
        return DocConfigLib;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocConfigLib.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Configuration - Libraries</h1><p>When you create a build, you might like to import a library to reuse some code parts. Here you are going to learn how    to define all libs that must be imported inside a build.</p><h2>Properties</h2><div class="table">    <av-dynamic-row class="header">        <av-dynamic-col size="4" center>Name</av-dynamic-col>        <av-dynamic-col size="8" center>Description</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>uri</av-dynamic-col>        <av-dynamic-col size="8" center>This is a string to define where to find the file to import. To have more            informations about this path, you can read the next chapter.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>version</av-dynamic-col>        <av-dynamic-col size="8" center>            <div>This is a string to define which version of the code is needed. Instead of                number you can use a <span class="cn">x</span> to say any number. The default value is <span class="cn">x.x.x</span>.                <span class="constraint">Must satisfy: <span class="cn">^[0-9x]+\\.[0-9x]+\\.[0-9x]+$</span></span>            </div>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>include</av-dynamic-col>        <av-dynamic-col size="8" center>            <span>This is a string to define how the lib must be included inside output js file.</span>            <ul>                <li>none: No need to include the lib inside the output file.</li>                <li>need: Include only the needed code inside the output file. (This is the default value)</li>                <li>full: Include all the code of the lib inside the ouput file.</li>            </ul>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>subDependancesInclude</av-dynamic-col>        <av-dynamic-col size="8" center>            <span>This is a object where the key is the sub library name and the value is the inclusion pattern. The                will define how the library of the library must be included inside output js file.</span>            <ul>                <li>none: No need to include the sub lib inside the output file.</li>                <li>need: Include only the needed code inside the output file. (This is the default value)</li>                <li>full: Include all the code of the sub lib inside the ouput file.</li>            </ul>        </av-dynamic-col>    </av-dynamic-row></div><h2>Libraries uri</h2><p>You can use a few uri kinds to load a library.</p><h3>Predefined</h3><p>There are 2 libs with predefined uri:</p><ul>    <li>Aventus@Main : uri is <span class="cn">@Aventus</span>. This is the core of Aventus, if you omit this lib inside        your build, it        will be        automaticaly added.</li>    <li>Aventus@UI : uri is <span class="cn">@AventusUI</span>. This lib contains some useful webcomponent to create        interface.</li></ul><h3>Local</h3><p>Every package you have build will be accessible by typing <span class="cn">@local:$module@$build</span> (ex:    @local:Aventus@Main). You    can find all these librairies by typing the command Aventus : Open aventus storage and then navigate inside your    file explorer under the packages&gt;@locals. You should find all package files you build on your computer.</p><av-img src="/img/doc/config/lib/lib_example.png"></av-img><av-code language="json" filename="aventus.conf.avt">    {    \tbuild: [{    \t\tname: "Main",    \t\tdependances: [{    \t\t\turi: "@local:HelloAventus@Main"    \t\t\}]    \t\t...    \t}]    }</av-code></av-code><p>This is useful if you are alone on a project or if you need to debug something, but this way is strongly discouraged    because it means that you have to open all your projects at least one time what is not really scalable friendly.</p><h3>Same module</h3><p>To include a build inside another build on the same <span class="cn">aventus.conf.avt</span>, you can type the uri    <span class="cn">&:$build</span>    (ex: &:Main) to include the main part of your module.</p><av-code language="json" filename="aventus.conf.avt">    {    \tbuild: [{    \t\tname:"Main",    \t\t...    \t}, {    \t\tname: "Test",    \t\tdependances: [{    \t\t\turi: "&:Main"    \t\t}]    \t}]    }</av-code></av-code><h3>File uri</h3><p>You can add directly an uri that resolve a <span class="cn">.package.avt</span> file to import it.</p><av-code language="json" filename="aventus.conf.avt">    {    \tbuild: [{    \t\tname: "Main",    \t\tdependances: [{    \t\t\turi: "./myLibs/Lib1@Main.package.avt"    \t\t}, {    \t\t\turi: "C:\\\\myLibs\\\\Lib2@Main.package.avt"    \t\t}],    \t}]    }</av-code></av-code><h3>File via http</h3><p>You can resolve dependance via http. There are 2 kinds of file that you can include. A <span class="cn">.package.avt</span> file or a    json file. Both will be stored inside the Aventus <span class="cn">storage&gt;packages&gt;http</span>. In this    folder, you must find    a list    of subfolder where the name is the md5 value of the uri that you set as uri. The entry point is a json named    <span class="cn">info.json</span></p><av-code language="json" filename="info.json">    {    \t"name": "Aventus@Main",    \t"versions": {    \t\t"1": {    \t\t\t"0": {    \t\t\t\t"0": {    \t\t\t\t\t"uri": "http://mydomain.com/version/1_0_0/Aventus@Main.package.avt",    \t\t\t\t}    \t\t\t}    \t\t}    \t}    }</av-code></av-code><p>When a specific version is required, Aventus will use the uri to download the file and save it inside the folder as    <span class="cn">$name</span>#<span class="cn">$version</span> (ex: Aventus@Main#1.0.0.package.avt) and add a <span class="cn">localUri</span> property that will be    used inside the build.</p><av-code language="json" filename="info.json">    {    \t"name": "Aventus@Main",    \t"versions": {    \t\t"1": {    \t\t\t"0": {    \t\t\t\t"0": {    \t\t\t\t\t"uri": "http://mydomain.com/version/1_0_0/Aventus@Main.package.avt",    \t\t\t\t\t"localUri": "C:\\\\(...)\\\\Aventus@Main#1.0.0.package.avt",    \t\t\t\t}    \t\t\t}    \t\t}    \t}    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocConfigLib";
    }
}
window.customElements.define('av-doc-config-lib', DocConfigLib);Aventus.WebComponentInstance.registerDefinition(DocConfigLib);

class DocConfigBuild extends DocGenericPage {
    static __style = `:host .table av-dynamic-row:not(.header) av-dynamic-col:nth-child(2){text-align:justify}:host .table av-dynamic-row:not(.header) av-router-link,:host .table av-dynamic-row:not(.header) b,:host .table av-dynamic-row:not(.header) i{display:contents}:host .table .constraint{display:block;font-size:14px;margin-top:5px}`;
    __getStatic() {
        return DocConfigBuild;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocConfigBuild.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Configuration - Build</h1><p>Inside a module, you can split you code into differents submodules. Inside Aventus, this submodule is called a    <span class="cn">Build</span>. The build job is to transform some Aventus input files into a JavaScript file (for an    app) and/or a    Aventus Package File (for a lib).</p><div class="table">    <av-dynamic-row class="header">        <av-dynamic-col size="4" center>Name</av-dynamic-col>        <av-dynamic-col size="8" center>Description</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>name</av-dynamic-col>        <av-dynamic-col size="8" center>            <div>This is the name for the build. If the build is exported as a library, the                library name                will be <span class="cn">$module</span>@<span class="cn">$name</span></div>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>inputPath</av-dynamic-col>        <av-dynamic-col size="8" center>This is an array of string to define which folders Aventus will watch. For            example, if you set "./src/*", all files inside the folder "src" will be compiled.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>outputFile</av-dynamic-col>        <av-dynamic-col size="8" center>This is string to define where the compiled JavaScript file must be written.            <span class="constraint">Must satisfy: ^\\S+\\.js</span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>outputPackage</av-dynamic-col>        <av-dynamic-col size="8" center>This is string to define where the .package.avt file must be written.            <span class="constraint">Must satisfy: ^\\S+\\.package\\.avt</span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>outsideModulePath</av-dynamic-col>        <av-dynamic-col size="8" center>            <div>This is an array of string to define which folders Aventus will watch. The                watched file will be compiled outside of the module. For example, if you define a class "Test" inside a                module "HelloWorld", you can reach the class by typing <span class="cn">window.Test</span> instead of                <span class="cn">window.HelloWorld.Test</span>            </div>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>namespaceStrategy</av-dynamic-col>        <av-dynamic-col size="8" center>            <span>This is a string to define how Aventus must deal with namespace.</span>            <ul>                <li>manual: the developer will write the namespace by himself</li>                <li>followFolders: the namespace will be set based on the current folder and the namespaceRoot property                </li>                <li>rules: the namespace will be set based on the namespaceRules property</li>            </ul>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>namespaceRoot</av-dynamic-col>        <av-dynamic-col size="8" center>            <span>This is a string to define what is the namespace root folder (only for followFolders strategy)</span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>namespaceRules</av-dynamic-col>        <av-dynamic-col size="8" center>            <span>This is an object to define the namespace based on the uri where the key is the namespace and the                value is an array of string to match uri</span>            <av-code language="json">                {                ...,                namespaceRules:{                "Data": ["./src/data/*"]                }                }            </av-code></av-code>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>dependances</av-dynamic-col>        <av-dynamic-col size="8" center>            <span>This is an array of <av-router-link state="/docs/config/lib">dependance options</av-router-link> to                use code and/or autocompletion inside your code.</span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>module</av-dynamic-col>        <av-dynamic-col size="8" center>This will override the module value of the <av-router-link state="/docs/config/basic_prop">basic config</av-router-link>.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>version</av-dynamic-col>        <av-dynamic-col size="8" center>This will override the version value of the <av-router-link state="/docs/config/basic_prop">basic config</av-router-link>.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>componentPrefix</av-dynamic-col>        <av-dynamic-col size="8" center>This will override the componentPrefix value of the <av-router-link state="/docs/config/basic_prop">basic config</av-router-link>.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>hideWarnings</av-dynamic-col>        <av-dynamic-col size="8" center>This will override the hideWarnings value of the <av-router-link state="/docs/config/basic_prop">basic config</av-router-link>.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>avoidParsingInsideTags</av-dynamic-col>        <av-dynamic-col size="8" center>This will override the avoidParsingInsideTags value of the <av-router-link state="/docs/config/basic_prop">basic config</av-router-link>.        </av-dynamic-col>    </av-dynamic-row></div>` }
    });
}
    getClassName() {
        return "DocConfigBuild";
    }
}
window.customElements.define('av-doc-config-build', DocConfigBuild);Aventus.WebComponentInstance.registerDefinition(DocConfigBuild);

class DocConfigBasic extends DocGenericPage {
    static __style = `:host .table av-dynamic-row:not(.header) av-dynamic-col:nth-child(2){text-align:justify}:host .table av-dynamic-row:not(.header) av-router-link{display:contents}:host .table .constraint{display:block;font-size:14px;margin-top:5px}`;
    __getStatic() {
        return DocConfigBasic;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocConfigBasic.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Configuration - Basic info</h1><p>To create an application with Aventus, you need to define a file named <span class="cn">aventus.conf.avt</span>. This file will define    what Aventus must do with your code. The configuration is a json file with properties that are going to be explained    below.</p><div class="table">    <av-dynamic-row class="header">        <av-dynamic-col size="4" center>Name</av-dynamic-col>        <av-dynamic-col size="8" center>Description</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>module</av-dynamic-col>        <av-dynamic-col size="8" center>This is the name of the module you are building. All your code will be inside            the module to avoid global variables.            <span class="constraint">Must satisfy: <span class="cn">^[a-zA-Z0-9_]+$</span></span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>version</av-dynamic-col>        <av-dynamic-col size="8" center>This is the version of the module you are building. The first number is the            major version, the second is the minor version and the last is the patch version. By default the value is            1.0.0            <span class="constraint">Must satisfy: <span class="cn">^[0-9]+\\.[0-9]+\\.[0-9]+$</span></span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>componentPrefix</av-dynamic-col>        <av-dynamic-col size="8" center>This is the prefix that are going to be used by all your webcomponents inside the module. For example if my class is named "Test" and my prefix is "av", the final tag will be "av-test".            <span class="constraint">Must satisfy: <span class="cn">^[a-z]{2,}$</span></span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>hideWarnings</av-dynamic-col>        <av-dynamic-col size="8" center>This is a boolean to hide warnings inside Aventus. This is useful when you are developing an app but your aren't in production. If you set it to false, you need to document all your methods            <span class="constraint">Must satisfy: <span class="cn">true|false</span></span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>avoidParsingInsideTags</av-dynamic-col>        <av-dynamic-col size="8" center>This is an array of string that the HTML compiler must avoid parsing. For example on this website, the tag av-code isn't parsed by the compiler to avoid detecting some Aventus features inside the HTML code like @element.            <span class="constraint">Each string must satisfy: <span class="cn">^[a-z\-]+$</span></span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>build</av-dynamic-col>        <av-dynamic-col size="8" center>This is an array of <av-router-link state="/docs/config/build">build options</av-router-link>. Each build is defined by a list of input and will output a .js file and / or a package.avt file        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>static</av-dynamic-col>        <av-dynamic-col size="8" center>This is an array of <av-router-link state="/docs/config/static">static options</av-router-link>.        </av-dynamic-col>    </av-dynamic-row></div>` }
    });
}
    getClassName() {
        return "DocConfigBasic";
    }
}
window.customElements.define('av-doc-config-basic', DocConfigBasic);Aventus.WebComponentInstance.registerDefinition(DocConfigBasic);

class DocPage extends Page {
    get 'open'() {
                return this.hasAttribute('open');
            }
            set 'open'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('open', 'true');
                } else{
                    this.removeAttribute('open');
                }
            }    static __style = `:host{position:100%}:host av-doc-sidenav{transition:left .4s var(--bezier-curve)}:host .hider{background-color:rgba(0,0,0,0);display:none;height:100%;left:0;position:absolute;top:0;width:100%;z-index:99}:host>.container{width:calc(100% - 300px);max-width:none}:host([visible]){display:flex}@media screen and (max-width: 1100px){:host>.container{width:100%}:host av-doc-sidenav{height:calc(100% - 50px);left:-300px;position:absolute;top:50px;z-index:100}:host([open]) av-doc-sidenav{left:0px}:host([open]) .hider{display:block}}`;
    __getStatic() {
        return DocPage;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocPage.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'before-container':`    <av-doc-sidenav _id="docpage_0"></av-doc-sidenav>    <div class="hider" _id="docpage_1"></div>`,'default':`<av-doc-app></av-doc-app>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "sidenavEl",
      "ids": [
        "docpage_0"
      ]
    }
  ],
  "pressEvents": [
    {
      "id": "docpage_1",
      "onPress": (e, pressInstance, c) => { c.component.closeMenu(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "DocPage";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('open')) { this.attributeChangedCallback('open', false, false); } }
    __listBoolProps() { return ["open"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    getNextAndPrevious(state) {
        return this.sidenavEl.getNextAndPrevious(state);
    }
    pageTitle() {
        return "Aventus - Documentation";
    }
    openMenu() {
        this.open = true;
    }
    closeMenu() {
        this.open = false;
    }
}
window.customElements.define('av-doc-page', DocPage);Aventus.WebComponentInstance.registerDefinition(DocPage);

class About extends Page {
    static __style = `:host{height:100%;width:100%}:host>.container{max-width:none}:host .main{background-color:var(--light-primary-color);display:flex;flex-direction:column;height:400px;overflow:hidden;padding:50px 0;position:relative;width:100%}:host .main .title{align-items:center;color:var(--aventus-color);display:flex;font-size:100px;font-variant:small-caps;font-weight:bold;height:100%;justify-content:center;letter-spacing:2px;margin-bottom:40px;padding:0px 20px;text-align:center;width:100%;z-index:2}:host .main av-img.design-logo{--img-color: rgb(200, 200, 200);height:150%;left:-200px;opacity:.3;position:absolute;top:30px;z-index:1}:host .main av-img.design-logo2{--img-color: rgb(200, 200, 200);height:150%;opacity:.3;position:absolute;right:-200px;top:30px;transform:rotate(180deg);z-index:1}:host av-scrollable .container{display:flex}:host .tabs{width:100%}:host .tabs .header{align-items:center;border-bottom:1px solid rgba(229,84,14,.5333333333);display:flex;height:50px;margin-top:50px;padding:0px 10px;width:100%}:host .tabs .header .tab{align-items:center;background-color:#f0f0f0;border-top-left-radius:5px;border-top-right-radius:5px;cursor:pointer;display:flex;height:100%;margin:0 5px;padding:0 15px;position:relative}:host .tabs .header .tab:not(.active):hover{background-color:rgba(229,84,14,.1333333333)}:host .tabs .header .tab:first-child{margin-left:0}:host .tabs .header .tab.active{background-color:rgba(229,84,14,.2666666667)}:host .tabs .header .tab.active::after{background-color:#b9b9b9;bottom:0px;content:"";display:block;height:1px;left:0;position:absolute;width:100%}:host .tabs .body{padding:0 15px}:host .tabs .body .tab{display:none}:host .tabs .body .tab.active{display:block}:host .tabs h2{color:var(--light-primary-color);text-align:center}:host .tabs .help-us{font-size:18px;line-height:1.8;margin:auto;max-width:530px;text-align:justify}:host .tabs .cards{align-items:center;display:flex;justify-content:center;margin-bottom:40px;margin-top:40px;width:100%}:host .tabs .cards .card{align-items:center;background-color:var(--light-primary-color);border-radius:15px;display:flex;flex-direction:column;flex-grow:1;justify-content:center;max-width:500px;position:relative}:host .tabs .cards .card .img{background-position:center center;background-repeat:no-repeat;background-size:cover;border-radius:100px;height:200px;margin:20px 0;width:200px}:host .tabs .cards .card .name{color:var(--aventus-color);font-size:25px}:host .tabs .cards .card .position{color:rgba(229,84,14,.6);font-size:20px;margin-bottom:10px}:host .tabs .cards .card .location{color:var(--secondary-color);font-size:16px}:host .tabs .cards .card .language{color:var(--secondary-color);font-size:16px;margin-bottom:20px}:host .tabs .cards .card .sponsor{align-items:center;border:1px solid var(--secondary-color);border-radius:5px;cursor:pointer;display:flex;justify-content:center;margin-bottom:10px;padding:5px 15px;transition:border .2s linear}:host .tabs .cards .card .sponsor svg{fill:var(--secondary-color);height:20px;transition:fill .2s linear;width:20px}:host .tabs .cards .card .sponsor span{color:var(--secondary-color);margin-left:10px;transition:color .2s linear}:host .tabs .cards .card .sponsor:hover{border:1px solid var(--aventus-color)}:host .tabs .cards .card .sponsor:hover svg{fill:var(--aventus-color)}:host .tabs .cards .card .sponsor:hover span{color:var(--aventus-color)}:host .tabs .cards .card .github{height:30px;position:absolute;right:20px;top:20px;width:30px}:host .tabs .cards .card .github svg{fill:var(--secondary-color);cursor:pointer;transition:.2s fill linear}:host .tabs .cards .card .github:hover svg{fill:#000}@media screen and (max-width: 400px){:host .main .title{font-size:80px}}`;
    __getStatic() {
        return About;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(About.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<av-scrollable floating_scroll>    <div class="main">        <div class="title">            about aventus        </div>        <av-img class="design-logo" src="/img/logo.svg"></av-img>        <av-img class="design-logo2" src="/img/logo.svg"></av-img>    </div>    <div class="container">        <div class="tabs">            <div class="header">                <div class="tab active" tab-name="map" _id="about_0">Roadmap</div>                <div class="tab" tab-name="team" _id="about_1">Team</div>            </div>            <div class="body">                <div class="tab active" name="map">                    <h2>Aventus Roadmap</h2>                    <p>The road map will depend of the community feedbacks, but the team has already agreed on the                        following points.</p>                    <div class="road-map">                        <av-road-map>                            <av-road-map-item name="Aventus@UI">End the Aventus@UI package to provide a simple solution                                to create user interface.</av-road-map-item>                            <av-road-map-item name="SCSS">Improve SCSS autocompletion and improve usability by creating                                scss tree based on the DOM.</av-road-map-item>                            <av-road-map-item name="i18n">Add a method to translate your application based on the i18n                                logic.</av-road-map-item>                            <av-road-map-item name="AventusSharp">End the AventusSharp library to write fullstack                                application with Aventus.</av-road-map-item>                            <av-road-map-item name="Data">Auto manage data link inside the RAM to get a perfect data                                sync.</av-road-map-item>                        </av-road-map>                    </div>                </div>                <div class="tab" name="team">                    <h2>Team</h2>                    <p class="help-us">Aventus is a product develop by Cobwebsite company. We are looking for support to                        ensure that this project lasts. If you would like to help us directly with the project, please                        send an email to <a href="mailto:info@cobwebsite.ch">info@cobwebsite.ch</a>. You can also give                        us financial support via github donations.</p>                    <div class="cards">                        <div class="card">                            <div class="img" style="background-image:url(https://avatars.githubusercontent.com/u/19285564?v=4)">                            </div>                            <div class="name">Maxime Bétrisey</div>                            <div class="position">Creator</div>                            <div class="location">Switzerland</div>                            <div class="language">French - English</div>                            <a class="github" href="https://github.com/max529" target="_blank">                                <svg data-v-a71028e4="" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24" class="social-icon">                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12">                                    </path>                                </svg>                            </a>                        </div>                    </div>                </div>            </div>        </div>    </div>    <av-footer></av-footer></av-scrollable>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "pressEvents": [
    {
      "id": "about_0",
      "onPress": (e, pressInstance, c) => { c.component.changeTab(e, pressInstance); }
    },
    {
      "id": "about_1",
      "onPress": (e, pressInstance, c) => { c.component.changeTab(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "About";
    }
    changeTab(e, instance) {
        let element = instance.getElement();
        if (element.classList.contains("active")) {
            return;
        }
        let tabHeaderActive = this.shadowRoot.querySelector(".tabs .header .tab.active");
        if (tabHeaderActive) {
            tabHeaderActive.classList.remove("active");
        }
        let tabActive = this.shadowRoot.querySelector(".tabs .body .tab.active");
        if (tabActive) {
            tabActive.classList.remove("active");
        }
        let tabName = element.getAttribute("tab-name");
        element.classList.add("active");
        let newTabActive = this.shadowRoot.querySelector('.tabs .body .tab[name="' + tabName + '"]');
        if (newTabActive) {
            newTabActive.classList.add("active");
        }
    }
    pageTitle() {
        return "Aventus";
    }
}
window.customElements.define('av-about', About);Aventus.WebComponentInstance.registerDefinition(About);

class Navbar extends Aventus.WebComponent {
    get 'open'() {
                return this.hasAttribute('open');
            }
            set 'open'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('open', 'true');
                } else{
                    this.removeAttribute('open');
                }
            }    static __style = `:host{background-color:var(--primary-color);height:50px;width:100%}:host .container{display:flex;height:100%;justify-content:space-between;margin:auto;max-width:1000px}:host .container .left{height:100%;justify-self:start}:host .container .left av-router-link{display:inline-block;height:100%}:host .container .left av-router-link av-img{--img-color: var(--aventus-color);cursor:pointer;height:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host .container .right{align-items:center;color:var(--primary-font-color);display:flex;justify-self:end}:host .container .right .menu{border-radius:5px;cursor:pointer;margin:0 5px;padding:5px 10px;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0);transition:color .5s var(--bezier-curve),background-color .5s var(--bezier-curve)}:host .container .right .menu:hover{background-color:var(--light-primary-color);color:var(--aventus-color)}:host .container .right .menu.active{background-color:var(--light-primary-color);color:var(--aventus-color)}:host .container .right .menu-title{color:var(--aventus-color);display:none;font-size:2.4rem;margin:16px 0;text-align:center;width:100%}:host .container .right .menu-close-icon{display:none}:host .container .icon{align-items:center;color:var(--aventus-color);display:none;font-size:22px;height:100%;margin-right:16px}:host .container .hider{display:none}@media screen and (max-width: 1100px){:host .container .right{align-items:self-start;background-color:var(--primary-color);box-shadow:0 -10px 5px var(--aventus-color);color:var(--primary-font-color);flex-direction:column;height:100%;position:fixed;right:-300px;top:0px;transition:.4s right var(--bezier-curve);width:250px;z-index:90}:host .container .right .menu-title{display:block}:host .container .right .menu{margin:5px 0;margin-left:24px}:host .container .right .menu-close-icon{color:var(--aventus-color);display:block;font-size:21px;left:16px;position:absolute;top:13px}:host .container .icon{display:flex}:host .container .hider{background-color:rgba(0,0,0,0);display:none;height:100%;left:0;position:fixed;top:0;width:100%;z-index:9}:host([open]) .container .right{right:0}:host([open]) .container .hider{display:block}}`;
    __getStatic() {
        return Navbar;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Navbar.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="container">    <div class="left">        <av-router-link state="/"><av-img src="/img/icon.png"></av-img></av-router-link>    </div>    <div class="right">        <av-icon class="menu-close-icon" icon="close" _id="navbar_0"></av-icon>        <div class="menu-title">Aventus</div>        <av-router-link state="/" class="menu">Home</av-router-link>        <av-router-link state="/docs/introduction" active_state="^/docs/.*$" class="menu">Docs</av-router-link>        <av-router-link state="/tutorial/introduction" active_state="^/tutorial/.*$" class="menu">Tutorial</av-router-link>        <av-router-link state="/about" class="menu">About</av-router-link>    </div>    <av-icon icon="navicon" class="icon" _id="navbar_1"></av-icon>    <div class="hider" _id="navbar_2"></div></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "pressEvents": [
    {
      "id": "navbar_0",
      "onPress": (e, pressInstance, c) => { c.component.closeMenu(e, pressInstance); }
    },
    {
      "id": "navbar_1",
      "onPress": (e, pressInstance, c) => { c.component.openMenu(e, pressInstance); }
    },
    {
      "id": "navbar_2",
      "onPress": (e, pressInstance, c) => { c.component.closeMenu(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "Navbar";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('open')) { this.attributeChangedCallback('open', false, false); } }
    __listBoolProps() { return ["open"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    openMenu() {
        this.open = true;
    }
    closeMenu() {
        this.open = false;
    }
}
window.customElements.define('av-navbar', Navbar);Aventus.WebComponentInstance.registerDefinition(Navbar);

class AvCode extends Aventus.WebComponent {
    static get observedAttributes() {return ["language", "filename"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'tab'() {
                    return Number(this.getAttribute('tab'));
                }
                set 'tab'(val) {
                    if(val === undefined || val === null){this.removeAttribute('tab')}
                    else{this.setAttribute('tab',val)}
                }    get 'language'() {
                    return this.getAttribute('language');
                }
                set 'language'(val) {
                    if(val === undefined || val === null){this.removeAttribute('language')}
                    else{this.setAttribute('language',val)}
                }get 'filename'() {
                    return this.getAttribute('filename');
                }
                set 'filename'(val) {
                    if(val === undefined || val === null){this.removeAttribute('filename')}
                    else{this.setAttribute('filename',val)}
                }    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("language", ((target) => {
    if (window['Prism']) {
        if (!window['Prism'].languages.hasOwnProperty(target.language)) {
            target.language = 'plain';
        }
    }
})); }
    static __style = `:host{display:flex;position:relative}:host .filename{background-color:rgba(255,255,255,.3);display:none;font-size:12px;padding:5px;position:absolute;right:0;top:5px}:host pre{border-radius:5px;padding:30px 10px;width:100%}:host .hided{display:none}:host .language-css{color:#ce9178}:host([filename]) .filename{display:block}`;
    __getStatic() {
        return AvCode;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(AvCode.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<span class="filename" _id="avcode_0"></span><pre>    <code _id="avcode_1">    </code></pre><template class="hided">    <slot></slot></template>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "filenameEl",
      "ids": [
        "avcode_0"
      ]
    },
    {
      "name": "codeEl",
      "ids": [
        "avcode_1"
      ]
    }
  ],
  "content": {
    "filename": [
      {
        "id": "avcode_0",
        "attrName": "@HTML",
        "render": (c) => `${c.filename}`
      }
    ],
    "language": [
      {
        "id": "avcode_1",
        "attrName": "class",
        "render": (c) => `language-${c.language}`
      }
    ]
  }
});this.__getStatic().__template.setSchema({globals:["filename","language"]}); }
    getClassName() {
        return "AvCode";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('tab')){ this['tab'] = undefined; }if(!this.hasAttribute('language')){ this['language'] = "plain"; }if(!this.hasAttribute('filename')){ this['filename'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('language');this.__upgradeProperty('filename'); }
    styleBefore() {
        return super.styleBefore().concat(["Prism"]);
    }
    async loadFiles() {
        await Aventus.ResourceLoader.loadInHead('/libs/prism.js');
        await Aventus.Style.load("Prism", '/libs/prism_vscode_theme.css');
        this.init();
    }
    init() {
        if (!window['Prism'].languages.hasOwnProperty(this.language)) {
            this.language = 'plain';
        }
        let code = this.innerHTML.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        code = code.split("\n").map(p => p.replace("    ", "")).join("\n");
        this.codeEl.innerHTML = code;
        this.innerHTML = "";
        window['Prism'].highlightElement(this.codeEl);
    }
    postCreation() {
        if (!window['Prism']) {
            this.loadFiles();
        }
        else {
            this.init();
        }
    }
}
window.customElements.define('av-code', AvCode);Aventus.WebComponentInstance.registerDefinition(AvCode);

class IconLib {
    static iconList = {
        "0": '"\\30"',
        "1": '"\\31"',
        "2": '"\\32"',
        "3": '"\\33"',
        "4": '"\\34"',
        "5": '"\\35"',
        "6": '"\\36"',
        "7": '"\\37"',
        "8": '"\\38"',
        "9": '"\\39"',
        "fill-drip": '"\\f576"',
        "arrows-to-circle": '"\\e4bd"',
        "chevron-circle-right": '"\\f138"',
        "circle-chevron-right": '"\\f138"',
        "at": '"\\40"',
        "trash-alt": '"\\f2ed"',
        "trash-can": '"\\f2ed"',
        "text-height": '"\\f034"',
        "user-times": '"\\f235"',
        "user-xmark": '"\\f235"',
        "stethoscope": '"\\f0f1"',
        "comment-alt": '"\\f27a"',
        "message": '"\\f27a"',
        "info": '"\\f129"',
        "compress-alt": '"\\f422"',
        "down-left-and-up-right-to-center": '"\\f422"',
        "explosion": '"\\e4e9"',
        "file-alt": '"\\f15c"',
        "file-lines": '"\\f15c"',
        "file-text": '"\\f15c"',
        "wave-square": '"\\f83e"',
        "ring": '"\\f70b"',
        "building-un": '"\\e4d9"',
        "dice-three": '"\\f527"',
        "calendar-alt": '"\\f073"',
        "calendar-days": '"\\f073"',
        "anchor-circle-check": '"\\e4aa"',
        "building-circle-arrow-right": '"\\e4d1"',
        "volleyball-ball": '"\\f45f"',
        "volleyball": '"\\f45f"',
        "arrows-up-to-line": '"\\e4c2"',
        "sort-desc": '"\\f0dd"',
        "sort-down": '"\\f0dd"',
        "circle-minus": '"\\f056"',
        "minus-circle": '"\\f056"',
        "door-open": '"\\f52b"',
        "right-from-bracket": '"\\f2f5"',
        "sign-out-alt": '"\\f2f5"',
        "atom": '"\\f5d2"',
        "soap": '"\\e06e"',
        "heart-music-camera-bolt": '"\\f86d"',
        "icons": '"\\f86d"',
        "microphone-alt-slash": '"\\f539"',
        "microphone-lines-slash": '"\\f539"',
        "bridge-circle-check": '"\\e4c9"',
        "pump-medical": '"\\e06a"',
        "fingerprint": '"\\f577"',
        "hand-point-right": '"\\f0a4"',
        "magnifying-glass-location": '"\\f689"',
        "search-location": '"\\f689"',
        "forward-step": '"\\f051"',
        "step-forward": '"\\f051"',
        "face-smile-beam": '"\\f5b8"',
        "smile-beam": '"\\f5b8"',
        "flag-checkered": '"\\f11e"',
        "football-ball": '"\\f44e"',
        "football": '"\\f44e"',
        "school-circle-exclamation": '"\\e56c"',
        "crop": '"\\f125"',
        "angle-double-down": '"\\f103"',
        "angles-down": '"\\f103"',
        "users-rectangle": '"\\e594"',
        "people-roof": '"\\e537"',
        "people-line": '"\\e534"',
        "beer-mug-empty": '"\\f0fc"',
        "beer": '"\\f0fc"',
        "diagram-predecessor": '"\\e477"',
        "arrow-up-long": '"\\f176"',
        "long-arrow-up": '"\\f176"',
        "burn": '"\\f46a"',
        "fire-flame-simple": '"\\f46a"',
        "male": '"\\f183"',
        "person": '"\\f183"',
        "laptop": '"\\f109"',
        "file-csv": '"\\f6dd"',
        "menorah": '"\\f676"',
        "truck-plane": '"\\e58f"',
        "record-vinyl": '"\\f8d9"',
        "face-grin-stars": '"\\f587"',
        "grin-stars": '"\\f587"',
        "bong": '"\\f55c"',
        "pastafarianism": '"\\f67b"',
        "spaghetti-monster-flying": '"\\f67b"',
        "arrow-down-up-across-line": '"\\e4af"',
        "spoon": '"\\f2e5"',
        "utensil-spoon": '"\\f2e5"',
        "jar-wheat": '"\\e517"',
        "envelopes-bulk": '"\\f674"',
        "mail-bulk": '"\\f674"',
        "file-circle-exclamation": '"\\e4eb"',
        "circle-h": '"\\f47e"',
        "hospital-symbol": '"\\f47e"',
        "pager": '"\\f815"',
        "address-book": '"\\f2b9"',
        "contact-book": '"\\f2b9"',
        "strikethrough": '"\\f0cc"',
        "k": '"\\4b"',
        "landmark-flag": '"\\e51c"',
        "pencil-alt": '"\\f303"',
        "pencil": '"\\f303"',
        "backward": '"\\f04a"',
        "caret-right": '"\\f0da"',
        "comments": '"\\f086"',
        "file-clipboard": '"\\f0ea"',
        "paste": '"\\f0ea"',
        "code-pull-request": '"\\e13c"',
        "clipboard-list": '"\\f46d"',
        "truck-loading": '"\\f4de"',
        "truck-ramp-box": '"\\f4de"',
        "user-check": '"\\f4fc"',
        "vial-virus": '"\\e597"',
        "sheet-plastic": '"\\e571"',
        "blog": '"\\f781"',
        "user-ninja": '"\\f504"',
        "person-arrow-up-from-line": '"\\e539"',
        "scroll-torah": '"\\f6a0"',
        "torah": '"\\f6a0"',
        "broom-ball": '"\\f458"',
        "quidditch-broom-ball": '"\\f458"',
        "quidditch": '"\\f458"',
        "toggle-off": '"\\f204"',
        "archive": '"\\f187"',
        "box-archive": '"\\f187"',
        "person-drowning": '"\\e545"',
        "arrow-down-9-1": '"\\f886"',
        "sort-numeric-desc": '"\\f886"',
        "sort-numeric-down-alt": '"\\f886"',
        "face-grin-tongue-squint": '"\\f58a"',
        "grin-tongue-squint": '"\\f58a"',
        "spray-can": '"\\f5bd"',
        "truck-monster": '"\\f63b"',
        "w": '"\\57"',
        "earth-africa": '"\\f57c"',
        "globe-africa": '"\\f57c"',
        "rainbow": '"\\f75b"',
        "circle-notch": '"\\f1ce"',
        "tablet-alt": '"\\f3fa"',
        "tablet-screen-button": '"\\f3fa"',
        "paw": '"\\f1b0"',
        "cloud": '"\\f0c2"',
        "trowel-bricks": '"\\e58a"',
        "face-flushed": '"\\f579"',
        "flushed": '"\\f579"',
        "hospital-user": '"\\f80d"',
        "tent-arrow-left-right": '"\\e57f"',
        "gavel": '"\\f0e3"',
        "legal": '"\\f0e3"',
        "binoculars": '"\\f1e5"',
        "microphone-slash": '"\\f131"',
        "box-tissue": '"\\e05b"',
        "motorcycle": '"\\f21c"',
        "bell-concierge": '"\\f562"',
        "concierge-bell": '"\\f562"',
        "pen-ruler": '"\\f5ae"',
        "pencil-ruler": '"\\f5ae"',
        "people-arrows-left-right": '"\\e068"',
        "people-arrows": '"\\e068"',
        "mars-and-venus-burst": '"\\e523"',
        "caret-square-right": '"\\f152"',
        "square-caret-right": '"\\f152"',
        "cut": '"\\f0c4"',
        "scissors": '"\\f0c4"',
        "sun-plant-wilt": '"\\e57a"',
        "toilets-portable": '"\\e584"',
        "hockey-puck": '"\\f453"',
        "table": '"\\f0ce"',
        "magnifying-glass-arrow-right": '"\\e521"',
        "digital-tachograph": '"\\f566"',
        "tachograph-digital": '"\\f566"',
        "users-slash": '"\\e073"',
        "clover": '"\\e139"',
        "mail-reply": '"\\f3e5"',
        "reply": '"\\f3e5"',
        "star-and-crescent": '"\\f699"',
        "house-fire": '"\\e50c"',
        "minus-square": '"\\f146"',
        "square-minus": '"\\f146"',
        "helicopter": '"\\f533"',
        "compass": '"\\f14e"',
        "caret-square-down": '"\\f150"',
        "square-caret-down": '"\\f150"',
        "file-circle-question": '"\\e4ef"',
        "laptop-code": '"\\f5fc"',
        "swatchbook": '"\\f5c3"',
        "prescription-bottle": '"\\f485"',
        "bars": '"\\f0c9"',
        "navicon": '"\\f0c9"',
        "people-group": '"\\e533"',
        "hourglass-3": '"\\f253"',
        "hourglass-end": '"\\f253"',
        "heart-broken": '"\\f7a9"',
        "heart-crack": '"\\f7a9"',
        "external-link-square-alt": '"\\f360"',
        "square-up-right": '"\\f360"',
        "face-kiss-beam": '"\\f597"',
        "kiss-beam": '"\\f597"',
        "film": '"\\f008"',
        "ruler-horizontal": '"\\f547"',
        "people-robbery": '"\\e536"',
        "lightbulb": '"\\f0eb"',
        "caret-left": '"\\f0d9"',
        "circle-exclamation": '"\\f06a"',
        "exclamation-circle": '"\\f06a"',
        "school-circle-xmark": '"\\e56d"',
        "arrow-right-from-bracket": '"\\f08b"',
        "sign-out": '"\\f08b"',
        "chevron-circle-down": '"\\f13a"',
        "circle-chevron-down": '"\\f13a"',
        "unlock-alt": '"\\f13e"',
        "unlock-keyhole": '"\\f13e"',
        "cloud-showers-heavy": '"\\f740"',
        "headphones-alt": '"\\f58f"',
        "headphones-simple": '"\\f58f"',
        "sitemap": '"\\f0e8"',
        "circle-dollar-to-slot": '"\\f4b9"',
        "donate": '"\\f4b9"',
        "memory": '"\\f538"',
        "road-spikes": '"\\e568"',
        "fire-burner": '"\\e4f1"',
        "flag": '"\\f024"',
        "hanukiah": '"\\f6e6"',
        "feather": '"\\f52d"',
        "volume-down": '"\\f027"',
        "volume-low": '"\\f027"',
        "comment-slash": '"\\f4b3"',
        "cloud-sun-rain": '"\\f743"',
        "compress": '"\\f066"',
        "wheat-alt": '"\\e2cd"',
        "wheat-awn": '"\\e2cd"',
        "ankh": '"\\f644"',
        "hands-holding-child": '"\\e4fa"',
        "asterisk": '"\\2a"',
        "check-square": '"\\f14a"',
        "square-check": '"\\f14a"',
        "peseta-sign": '"\\e221"',
        "header": '"\\f1dc"',
        "heading": '"\\f1dc"',
        "ghost": '"\\f6e2"',
        "list-squares": '"\\f03a"',
        "list": '"\\f03a"',
        "phone-square-alt": '"\\f87b"',
        "square-phone-flip": '"\\f87b"',
        "cart-plus": '"\\f217"',
        "gamepad": '"\\f11b"',
        "circle-dot": '"\\f192"',
        "dot-circle": '"\\f192"',
        "dizzy": '"\\f567"',
        "face-dizzy": '"\\f567"',
        "egg": '"\\f7fb"',
        "house-medical-circle-xmark": '"\\e513"',
        "campground": '"\\f6bb"',
        "folder-plus": '"\\f65e"',
        "futbol-ball": '"\\f1e3"',
        "futbol": '"\\f1e3"',
        "soccer-ball": '"\\f1e3"',
        "paint-brush": '"\\f1fc"',
        "paintbrush": '"\\f1fc"',
        "lock": '"\\f023"',
        "gas-pump": '"\\f52f"',
        "hot-tub-person": '"\\f593"',
        "hot-tub": '"\\f593"',
        "map-location": '"\\f59f"',
        "map-marked": '"\\f59f"',
        "house-flood-water": '"\\e50e"',
        "tree": '"\\f1bb"',
        "bridge-lock": '"\\e4cc"',
        "sack-dollar": '"\\f81d"',
        "edit": '"\\f044"',
        "pen-to-square": '"\\f044"',
        "car-side": '"\\f5e4"',
        "share-alt": '"\\f1e0"',
        "share-nodes": '"\\f1e0"',
        "heart-circle-minus": '"\\e4ff"',
        "hourglass-2": '"\\f252"',
        "hourglass-half": '"\\f252"',
        "microscope": '"\\f610"',
        "sink": '"\\e06d"',
        "bag-shopping": '"\\f290"',
        "shopping-bag": '"\\f290"',
        "arrow-down-z-a": '"\\f881"',
        "sort-alpha-desc": '"\\f881"',
        "sort-alpha-down-alt": '"\\f881"',
        "mitten": '"\\f7b5"',
        "person-rays": '"\\e54d"',
        "users": '"\\f0c0"',
        "eye-slash": '"\\f070"',
        "flask-vial": '"\\e4f3"',
        "hand-paper": '"\\f256"',
        "hand": '"\\f256"',
        "om": '"\\f679"',
        "worm": '"\\e599"',
        "house-circle-xmark": '"\\e50b"',
        "plug": '"\\f1e6"',
        "chevron-up": '"\\f077"',
        "hand-spock": '"\\f259"',
        "stopwatch": '"\\f2f2"',
        "face-kiss": '"\\f596"',
        "kiss": '"\\f596"',
        "bridge-circle-xmark": '"\\e4cb"',
        "face-grin-tongue": '"\\f589"',
        "grin-tongue": '"\\f589"',
        "chess-bishop": '"\\f43a"',
        "face-grin-wink": '"\\f58c"',
        "grin-wink": '"\\f58c"',
        "deaf": '"\\f2a4"',
        "deafness": '"\\f2a4"',
        "ear-deaf": '"\\f2a4"',
        "hard-of-hearing": '"\\f2a4"',
        "road-circle-check": '"\\e564"',
        "dice-five": '"\\f523"',
        "rss-square": '"\\f143"',
        "square-rss": '"\\f143"',
        "land-mine-on": '"\\e51b"',
        "i-cursor": '"\\f246"',
        "stamp": '"\\f5bf"',
        "stairs": '"\\e289"',
        "i": '"\\49"',
        "hryvnia-sign": '"\\f6f2"',
        "hryvnia": '"\\f6f2"',
        "pills": '"\\f484"',
        "face-grin-wide": '"\\f581"',
        "grin-alt": '"\\f581"',
        "tooth": '"\\f5c9"',
        "v": '"\\56"',
        "bangladeshi-taka-sign": '"\\e2e6"',
        "bicycle": '"\\f206"',
        "rod-asclepius": '"\\e579"',
        "rod-snake": '"\\e579"',
        "staff-aesculapius": '"\\e579"',
        "staff-snake": '"\\e579"',
        "head-side-cough-slash": '"\\e062"',
        "ambulance": '"\\f0f9"',
        "truck-medical": '"\\f0f9"',
        "wheat-awn-circle-exclamation": '"\\e598"',
        "snowman": '"\\f7d0"',
        "mortar-pestle": '"\\f5a7"',
        "road-barrier": '"\\e562"',
        "school": '"\\f549"',
        "igloo": '"\\f7ae"',
        "joint": '"\\f595"',
        "angle-right": '"\\f105"',
        "horse": '"\\f6f0"',
        "q": '"\\51"',
        "g": '"\\47"',
        "notes-medical": '"\\f481"',
        "temperature-2": '"\\f2c9"',
        "temperature-half": '"\\f2c9"',
        "thermometer-2": '"\\f2c9"',
        "thermometer-half": '"\\f2c9"',
        "dong-sign": '"\\e169"',
        "capsules": '"\\f46b"',
        "poo-bolt": '"\\f75a"',
        "poo-storm": '"\\f75a"',
        "face-frown-open": '"\\f57a"',
        "frown-open": '"\\f57a"',
        "hand-point-up": '"\\f0a6"',
        "money-bill": '"\\f0d6"',
        "bookmark": '"\\f02e"',
        "align-justify": '"\\f039"',
        "umbrella-beach": '"\\f5ca"',
        "helmet-un": '"\\e503"',
        "bullseye": '"\\f140"',
        "bacon": '"\\f7e5"',
        "hand-point-down": '"\\f0a7"',
        "arrow-up-from-bracket": '"\\e09a"',
        "folder-blank": '"\\f07b"',
        "folder": '"\\f07b"',
        "file-medical-alt": '"\\f478"',
        "file-waveform": '"\\f478"',
        "radiation": '"\\f7b9"',
        "chart-simple": '"\\e473"',
        "mars-stroke": '"\\f229"',
        "vial": '"\\f492"',
        "dashboard": '"\\f624"',
        "gauge-med": '"\\f624"',
        "gauge": '"\\f624"',
        "tachometer-alt-average": '"\\f624"',
        "magic-wand-sparkles": '"\\e2ca"',
        "wand-magic-sparkles": '"\\e2ca"',
        "e": '"\\45"',
        "pen-alt": '"\\f305"',
        "pen-clip": '"\\f305"',
        "bridge-circle-exclamation": '"\\e4ca"',
        "user": '"\\f007"',
        "school-circle-check": '"\\e56b"',
        "dumpster": '"\\f793"',
        "shuttle-van": '"\\f5b6"',
        "van-shuttle": '"\\f5b6"',
        "building-user": '"\\e4da"',
        "caret-square-left": '"\\f191"',
        "square-caret-left": '"\\f191"',
        "highlighter": '"\\f591"',
        "key": '"\\f084"',
        "bullhorn": '"\\f0a1"',
        "globe": '"\\f0ac"',
        "synagogue": '"\\f69b"',
        "person-half-dress": '"\\e548"',
        "road-bridge": '"\\e563"',
        "location-arrow": '"\\f124"',
        "c": '"\\43"',
        "tablet-button": '"\\f10a"',
        "building-lock": '"\\e4d6"',
        "pizza-slice": '"\\f818"',
        "money-bill-wave": '"\\f53a"',
        "area-chart": '"\\f1fe"',
        "chart-area": '"\\f1fe"',
        "house-flag": '"\\e50d"',
        "person-circle-minus": '"\\e540"',
        "ban": '"\\f05e"',
        "cancel": '"\\f05e"',
        "camera-rotate": '"\\e0d8"',
        "air-freshener": '"\\f5d0"',
        "spray-can-sparkles": '"\\f5d0"',
        "star": '"\\f005"',
        "repeat": '"\\f363"',
        "cross": '"\\f654"',
        "box": '"\\f466"',
        "venus-mars": '"\\f228"',
        "arrow-pointer": '"\\f245"',
        "mouse-pointer": '"\\f245"',
        "expand-arrows-alt": '"\\f31e"',
        "maximize": '"\\f31e"',
        "charging-station": '"\\f5e7"',
        "shapes": '"\\f61f"',
        "triangle-circle-square": '"\\f61f"',
        "random": '"\\f074"',
        "shuffle": '"\\f074"',
        "person-running": '"\\f70c"',
        "running": '"\\f70c"',
        "mobile-retro": '"\\e527"',
        "grip-lines-vertical": '"\\f7a5"',
        "spider": '"\\f717"',
        "hands-bound": '"\\e4f9"',
        "file-invoice-dollar": '"\\f571"',
        "plane-circle-exclamation": '"\\e556"',
        "x-ray": '"\\f497"',
        "spell-check": '"\\f891"',
        "slash": '"\\f715"',
        "computer-mouse": '"\\f8cc"',
        "mouse": '"\\f8cc"',
        "arrow-right-to-bracket": '"\\f090"',
        "sign-in": '"\\f090"',
        "shop-slash": '"\\e070"',
        "store-alt-slash": '"\\e070"',
        "server": '"\\f233"',
        "virus-covid-slash": '"\\e4a9"',
        "shop-lock": '"\\e4a5"',
        "hourglass-1": '"\\f251"',
        "hourglass-start": '"\\f251"',
        "blender-phone": '"\\f6b6"',
        "building-wheat": '"\\e4db"',
        "person-breastfeeding": '"\\e53a"',
        "right-to-bracket": '"\\f2f6"',
        "sign-in-alt": '"\\f2f6"',
        "venus": '"\\f221"',
        "passport": '"\\f5ab"',
        "heart-pulse": '"\\f21e"',
        "heartbeat": '"\\f21e"',
        "people-carry-box": '"\\f4ce"',
        "people-carry": '"\\f4ce"',
        "temperature-high": '"\\f769"',
        "microchip": '"\\f2db"',
        "crown": '"\\f521"',
        "weight-hanging": '"\\f5cd"',
        "xmarks-lines": '"\\e59a"',
        "file-prescription": '"\\f572"',
        "weight-scale": '"\\f496"',
        "weight": '"\\f496"',
        "user-friends": '"\\f500"',
        "user-group": '"\\f500"',
        "arrow-up-a-z": '"\\f15e"',
        "sort-alpha-up": '"\\f15e"',
        "chess-knight": '"\\f441"',
        "face-laugh-squint": '"\\f59b"',
        "laugh-squint": '"\\f59b"',
        "wheelchair": '"\\f193"',
        "arrow-circle-up": '"\\f0aa"',
        "circle-arrow-up": '"\\f0aa"',
        "toggle-on": '"\\f205"',
        "person-walking": '"\\f554"',
        "walking": '"\\f554"',
        "l": '"\\4c"',
        "fire": '"\\f06d"',
        "bed-pulse": '"\\f487"',
        "procedures": '"\\f487"',
        "shuttle-space": '"\\f197"',
        "space-shuttle": '"\\f197"',
        "face-laugh": '"\\f599"',
        "laugh": '"\\f599"',
        "folder-open": '"\\f07c"',
        "heart-circle-plus": '"\\e500"',
        "code-fork": '"\\e13b"',
        "city": '"\\f64f"',
        "microphone-alt": '"\\f3c9"',
        "microphone-lines": '"\\f3c9"',
        "pepper-hot": '"\\f816"',
        "unlock": '"\\f09c"',
        "colon-sign": '"\\e140"',
        "headset": '"\\f590"',
        "store-slash": '"\\e071"',
        "road-circle-xmark": '"\\e566"',
        "user-minus": '"\\f503"',
        "mars-stroke-up": '"\\f22a"',
        "mars-stroke-v": '"\\f22a"',
        "champagne-glasses": '"\\f79f"',
        "glass-cheers": '"\\f79f"',
        "clipboard": '"\\f328"',
        "house-circle-exclamation": '"\\e50a"',
        "file-arrow-up": '"\\f574"',
        "file-upload": '"\\f574"',
        "wifi-3": '"\\f1eb"',
        "wifi-strong": '"\\f1eb"',
        "wifi": '"\\f1eb"',
        "bath": '"\\f2cd"',
        "bathtub": '"\\f2cd"',
        "underline": '"\\f0cd"',
        "user-edit": '"\\f4ff"',
        "user-pen": '"\\f4ff"',
        "signature": '"\\f5b7"',
        "stroopwafel": '"\\f551"',
        "bold": '"\\f032"',
        "anchor-lock": '"\\e4ad"',
        "building-ngo": '"\\e4d7"',
        "manat-sign": '"\\e1d5"',
        "not-equal": '"\\f53e"',
        "border-style": '"\\f853"',
        "border-top-left": '"\\f853"',
        "map-location-dot": '"\\f5a0"',
        "map-marked-alt": '"\\f5a0"',
        "jedi": '"\\f669"',
        "poll": '"\\f681"',
        "square-poll-vertical": '"\\f681"',
        "mug-hot": '"\\f7b6"',
        "battery-car": '"\\f5df"',
        "car-battery": '"\\f5df"',
        "gift": '"\\f06b"',
        "dice-two": '"\\f528"',
        "chess-queen": '"\\f445"',
        "glasses": '"\\f530"',
        "chess-board": '"\\f43c"',
        "building-circle-check": '"\\e4d2"',
        "person-chalkboard": '"\\e53d"',
        "mars-stroke-h": '"\\f22b"',
        "mars-stroke-right": '"\\f22b"',
        "hand-back-fist": '"\\f255"',
        "hand-rock": '"\\f255"',
        "caret-square-up": '"\\f151"',
        "square-caret-up": '"\\f151"',
        "cloud-showers-water": '"\\e4e4"',
        "bar-chart": '"\\f080"',
        "chart-bar": '"\\f080"',
        "hands-bubbles": '"\\e05e"',
        "hands-wash": '"\\e05e"',
        "less-than-equal": '"\\f537"',
        "train": '"\\f238"',
        "eye-low-vision": '"\\f2a8"',
        "low-vision": '"\\f2a8"',
        "crow": '"\\f520"',
        "sailboat": '"\\e445"',
        "window-restore": '"\\f2d2"',
        "plus-square": '"\\f0fe"',
        "square-plus": '"\\f0fe"',
        "torii-gate": '"\\f6a1"',
        "frog": '"\\f52e"',
        "bucket": '"\\e4cf"',
        "image": '"\\f03e"',
        "microphone": '"\\f130"',
        "cow": '"\\f6c8"',
        "caret-up": '"\\f0d8"',
        "screwdriver": '"\\f54a"',
        "folder-closed": '"\\e185"',
        "house-tsunami": '"\\e515"',
        "square-nfi": '"\\e576"',
        "arrow-up-from-ground-water": '"\\e4b5"',
        "glass-martini-alt": '"\\f57b"',
        "martini-glass": '"\\f57b"',
        "rotate-back": '"\\f2ea"',
        "rotate-backward": '"\\f2ea"',
        "rotate-left": '"\\f2ea"',
        "undo-alt": '"\\f2ea"',
        "columns": '"\\f0db"',
        "table-columns": '"\\f0db"',
        "lemon": '"\\f094"',
        "head-side-mask": '"\\e063"',
        "handshake": '"\\f2b5"',
        "gem": '"\\f3a5"',
        "dolly-box": '"\\f472"',
        "dolly": '"\\f472"',
        "smoking": '"\\f48d"',
        "compress-arrows-alt": '"\\f78c"',
        "minimize": '"\\f78c"',
        "monument": '"\\f5a6"',
        "snowplow": '"\\f7d2"',
        "angle-double-right": '"\\f101"',
        "angles-right": '"\\f101"',
        "cannabis": '"\\f55f"',
        "circle-play": '"\\f144"',
        "play-circle": '"\\f144"',
        "tablets": '"\\f490"',
        "ethernet": '"\\f796"',
        "eur": '"\\f153"',
        "euro-sign": '"\\f153"',
        "euro": '"\\f153"',
        "chair": '"\\f6c0"',
        "check-circle": '"\\f058"',
        "circle-check": '"\\f058"',
        "circle-stop": '"\\f28d"',
        "stop-circle": '"\\f28d"',
        "compass-drafting": '"\\f568"',
        "drafting-compass": '"\\f568"',
        "plate-wheat": '"\\e55a"',
        "icicles": '"\\f7ad"',
        "person-shelter": '"\\e54f"',
        "neuter": '"\\f22c"',
        "id-badge": '"\\f2c1"',
        "marker": '"\\f5a1"',
        "face-laugh-beam": '"\\f59a"',
        "laugh-beam": '"\\f59a"',
        "helicopter-symbol": '"\\e502"',
        "universal-access": '"\\f29a"',
        "chevron-circle-up": '"\\f139"',
        "circle-chevron-up": '"\\f139"',
        "lari-sign": '"\\e1c8"',
        "volcano": '"\\f770"',
        "person-walking-dashed-line-arrow-right": '"\\e553"',
        "gbp": '"\\f154"',
        "pound-sign": '"\\f154"',
        "sterling-sign": '"\\f154"',
        "viruses": '"\\e076"',
        "square-person-confined": '"\\e577"',
        "user-tie": '"\\f508"',
        "arrow-down-long": '"\\f175"',
        "long-arrow-down": '"\\f175"',
        "tent-arrow-down-to-line": '"\\e57e"',
        "certificate": '"\\f0a3"',
        "mail-reply-all": '"\\f122"',
        "reply-all": '"\\f122"',
        "suitcase": '"\\f0f2"',
        "person-skating": '"\\f7c5"',
        "skating": '"\\f7c5"',
        "filter-circle-dollar": '"\\f662"',
        "funnel-dollar": '"\\f662"',
        "camera-retro": '"\\f083"',
        "arrow-circle-down": '"\\f0ab"',
        "circle-arrow-down": '"\\f0ab"',
        "arrow-right-to-file": '"\\f56f"',
        "file-import": '"\\f56f"',
        "external-link-square": '"\\f14c"',
        "square-arrow-up-right": '"\\f14c"',
        "box-open": '"\\f49e"',
        "scroll": '"\\f70e"',
        "spa": '"\\f5bb"',
        "location-pin-lock": '"\\e51f"',
        "pause": '"\\f04c"',
        "hill-avalanche": '"\\e507"',
        "temperature-0": '"\\f2cb"',
        "temperature-empty": '"\\f2cb"',
        "thermometer-0": '"\\f2cb"',
        "thermometer-empty": '"\\f2cb"',
        "bomb": '"\\f1e2"',
        "registered": '"\\f25d"',
        "address-card": '"\\f2bb"',
        "contact-card": '"\\f2bb"',
        "vcard": '"\\f2bb"',
        "balance-scale-right": '"\\f516"',
        "scale-unbalanced-flip": '"\\f516"',
        "subscript": '"\\f12c"',
        "diamond-turn-right": '"\\f5eb"',
        "directions": '"\\f5eb"',
        "burst": '"\\e4dc"',
        "house-laptop": '"\\e066"',
        "laptop-house": '"\\e066"',
        "face-tired": '"\\f5c8"',
        "tired": '"\\f5c8"',
        "money-bills": '"\\e1f3"',
        "smog": '"\\f75f"',
        "crutch": '"\\f7f7"',
        "cloud-arrow-up": '"\\f0ee"',
        "cloud-upload-alt": '"\\f0ee"',
        "cloud-upload": '"\\f0ee"',
        "palette": '"\\f53f"',
        "arrows-turn-right": '"\\e4c0"',
        "vest": '"\\e085"',
        "ferry": '"\\e4ea"',
        "arrows-down-to-people": '"\\e4b9"',
        "seedling": '"\\f4d8"',
        "sprout": '"\\f4d8"',
        "arrows-alt-h": '"\\f337"',
        "left-right": '"\\f337"',
        "boxes-packing": '"\\e4c7"',
        "arrow-circle-left": '"\\f0a8"',
        "circle-arrow-left": '"\\f0a8"',
        "group-arrows-rotate": '"\\e4f6"',
        "bowl-food": '"\\e4c6"',
        "candy-cane": '"\\f786"',
        "arrow-down-wide-short": '"\\f160"',
        "sort-amount-asc": '"\\f160"',
        "sort-amount-down": '"\\f160"',
        "cloud-bolt": '"\\f76c"',
        "thunderstorm": '"\\f76c"',
        "remove-format": '"\\f87d"',
        "text-slash": '"\\f87d"',
        "face-smile-wink": '"\\f4da"',
        "smile-wink": '"\\f4da"',
        "file-word": '"\\f1c2"',
        "file-powerpoint": '"\\f1c4"',
        "arrows-h": '"\\f07e"',
        "arrows-left-right": '"\\f07e"',
        "house-lock": '"\\e510"',
        "cloud-arrow-down": '"\\f0ed"',
        "cloud-download-alt": '"\\f0ed"',
        "cloud-download": '"\\f0ed"',
        "children": '"\\e4e1"',
        "blackboard": '"\\f51b"',
        "chalkboard": '"\\f51b"',
        "user-alt-slash": '"\\f4fa"',
        "user-large-slash": '"\\f4fa"',
        "envelope-open": '"\\f2b6"',
        "handshake-alt-slash": '"\\e05f"',
        "handshake-simple-slash": '"\\e05f"',
        "mattress-pillow": '"\\e525"',
        "guarani-sign": '"\\e19a"',
        "arrows-rotate": '"\\f021"',
        "refresh": '"\\f021"',
        "sync": '"\\f021"',
        "fire-extinguisher": '"\\f134"',
        "cruzeiro-sign": '"\\e152"',
        "greater-than-equal": '"\\f532"',
        "shield-alt": '"\\f3ed"',
        "shield-halved": '"\\f3ed"',
        "atlas": '"\\f558"',
        "book-atlas": '"\\f558"',
        "virus": '"\\e074"',
        "envelope-circle-check": '"\\e4e8"',
        "layer-group": '"\\f5fd"',
        "arrows-to-dot": '"\\e4be"',
        "archway": '"\\f557"',
        "heart-circle-check": '"\\e4fd"',
        "house-chimney-crack": '"\\f6f1"',
        "house-damage": '"\\f6f1"',
        "file-archive": '"\\f1c6"',
        "file-zipper": '"\\f1c6"',
        "square": '"\\f0c8"',
        "glass-martini": '"\\f000"',
        "martini-glass-empty": '"\\f000"',
        "couch": '"\\f4b8"',
        "cedi-sign": '"\\e0df"',
        "italic": '"\\f033"',
        "church": '"\\f51d"',
        "comments-dollar": '"\\f653"',
        "democrat": '"\\f747"',
        "z": '"\\5a"',
        "person-skiing": '"\\f7c9"',
        "skiing": '"\\f7c9"',
        "road-lock": '"\\e567"',
        "a": '"\\41"',
        "temperature-arrow-down": '"\\e03f"',
        "temperature-down": '"\\e03f"',
        "feather-alt": '"\\f56b"',
        "feather-pointed": '"\\f56b"',
        "p": '"\\50"',
        "snowflake": '"\\f2dc"',
        "newspaper": '"\\f1ea"',
        "ad": '"\\f641"',
        "rectangle-ad": '"\\f641"',
        "arrow-circle-right": '"\\f0a9"',
        "circle-arrow-right": '"\\f0a9"',
        "filter-circle-xmark": '"\\e17b"',
        "locust": '"\\e520"',
        "sort": '"\\f0dc"',
        "unsorted": '"\\f0dc"',
        "list-1-2": '"\\f0cb"',
        "list-numeric": '"\\f0cb"',
        "list-ol": '"\\f0cb"',
        "person-dress-burst": '"\\e544"',
        "money-check-alt": '"\\f53d"',
        "money-check-dollar": '"\\f53d"',
        "vector-square": '"\\f5cb"',
        "bread-slice": '"\\f7ec"',
        "language": '"\\f1ab"',
        "face-kiss-wink-heart": '"\\f598"',
        "kiss-wink-heart": '"\\f598"',
        "filter": '"\\f0b0"',
        "question": '"\\3f"',
        "file-signature": '"\\f573"',
        "arrows-alt": '"\\f0b2"',
        "up-down-left-right": '"\\f0b2"',
        "house-chimney-user": '"\\e065"',
        "hand-holding-heart": '"\\f4be"',
        "puzzle-piece": '"\\f12e"',
        "money-check": '"\\f53c"',
        "star-half-alt": '"\\f5c0"',
        "star-half-stroke": '"\\f5c0"',
        "code": '"\\f121"',
        "glass-whiskey": '"\\f7a0"',
        "whiskey-glass": '"\\f7a0"',
        "building-circle-exclamation": '"\\e4d3"',
        "magnifying-glass-chart": '"\\e522"',
        "arrow-up-right-from-square": '"\\f08e"',
        "external-link": '"\\f08e"',
        "cubes-stacked": '"\\e4e6"',
        "krw": '"\\f159"',
        "won-sign": '"\\f159"',
        "won": '"\\f159"',
        "virus-covid": '"\\e4a8"',
        "austral-sign": '"\\e0a9"',
        "f": '"\\46"',
        "leaf": '"\\f06c"',
        "road": '"\\f018"',
        "cab": '"\\f1ba"',
        "taxi": '"\\f1ba"',
        "person-circle-plus": '"\\e541"',
        "chart-pie": '"\\f200"',
        "pie-chart": '"\\f200"',
        "bolt-lightning": '"\\e0b7"',
        "sack-xmark": '"\\e56a"',
        "file-excel": '"\\f1c3"',
        "file-contract": '"\\f56c"',
        "fish-fins": '"\\e4f2"',
        "building-flag": '"\\e4d5"',
        "face-grin-beam": '"\\f582"',
        "grin-beam": '"\\f582"',
        "object-ungroup": '"\\f248"',
        "poop": '"\\f619"',
        "location-pin": '"\\f041"',
        "map-marker": '"\\f041"',
        "kaaba": '"\\f66b"',
        "toilet-paper": '"\\f71e"',
        "hard-hat": '"\\f807"',
        "hat-hard": '"\\f807"',
        "helmet-safety": '"\\f807"',
        "eject": '"\\f052"',
        "arrow-alt-circle-right": '"\\f35a"',
        "circle-right": '"\\f35a"',
        "plane-circle-check": '"\\e555"',
        "face-rolling-eyes": '"\\f5a5"',
        "meh-rolling-eyes": '"\\f5a5"',
        "object-group": '"\\f247"',
        "chart-line": '"\\f201"',
        "line-chart": '"\\f201"',
        "mask-ventilator": '"\\e524"',
        "arrow-right": '"\\f061"',
        "map-signs": '"\\f277"',
        "signs-post": '"\\f277"',
        "cash-register": '"\\f788"',
        "person-circle-question": '"\\e542"',
        "h": '"\\48"',
        "tarp": '"\\e57b"',
        "screwdriver-wrench": '"\\f7d9"',
        "tools": '"\\f7d9"',
        "arrows-to-eye": '"\\e4bf"',
        "plug-circle-bolt": '"\\e55b"',
        "heart": '"\\f004"',
        "mars-and-venus": '"\\f224"',
        "home-user": '"\\e1b0"',
        "house-user": '"\\e1b0"',
        "dumpster-fire": '"\\f794"',
        "house-crack": '"\\e3b1"',
        "cocktail": '"\\f561"',
        "martini-glass-citrus": '"\\f561"',
        "face-surprise": '"\\f5c2"',
        "surprise": '"\\f5c2"',
        "bottle-water": '"\\e4c5"',
        "circle-pause": '"\\f28b"',
        "pause-circle": '"\\f28b"',
        "toilet-paper-slash": '"\\e072"',
        "apple-alt": '"\\f5d1"',
        "apple-whole": '"\\f5d1"',
        "kitchen-set": '"\\e51a"',
        "r": '"\\52"',
        "temperature-1": '"\\f2ca"',
        "temperature-quarter": '"\\f2ca"',
        "thermometer-1": '"\\f2ca"',
        "thermometer-quarter": '"\\f2ca"',
        "cube": '"\\f1b2"',
        "bitcoin-sign": '"\\e0b4"',
        "shield-dog": '"\\e573"',
        "solar-panel": '"\\f5ba"',
        "lock-open": '"\\f3c1"',
        "elevator": '"\\e16d"',
        "money-bill-transfer": '"\\e528"',
        "money-bill-trend-up": '"\\e529"',
        "house-flood-water-circle-arrow-right": '"\\e50f"',
        "poll-h": '"\\f682"',
        "square-poll-horizontal": '"\\f682"',
        "circle": '"\\f111"',
        "backward-fast": '"\\f049"',
        "fast-backward": '"\\f049"',
        "recycle": '"\\f1b8"',
        "user-astronaut": '"\\f4fb"',
        "plane-slash": '"\\e069"',
        "trademark": '"\\f25c"',
        "basketball-ball": '"\\f434"',
        "basketball": '"\\f434"',
        "satellite-dish": '"\\f7c0"',
        "arrow-alt-circle-up": '"\\f35b"',
        "circle-up": '"\\f35b"',
        "mobile-alt": '"\\f3cd"',
        "mobile-screen-button": '"\\f3cd"',
        "volume-high": '"\\f028"',
        "volume-up": '"\\f028"',
        "users-rays": '"\\e593"',
        "wallet": '"\\f555"',
        "clipboard-check": '"\\f46c"',
        "file-audio": '"\\f1c7"',
        "burger": '"\\f805"',
        "hamburger": '"\\f805"',
        "wrench": '"\\f0ad"',
        "bugs": '"\\e4d0"',
        "rupee-sign": '"\\f156"',
        "rupee": '"\\f156"',
        "file-image": '"\\f1c5"',
        "circle-question": '"\\f059"',
        "question-circle": '"\\f059"',
        "plane-departure": '"\\f5b0"',
        "handshake-slash": '"\\e060"',
        "book-bookmark": '"\\e0bb"',
        "code-branch": '"\\f126"',
        "hat-cowboy": '"\\f8c0"',
        "bridge": '"\\e4c8"',
        "phone-alt": '"\\f879"',
        "phone-flip": '"\\f879"',
        "truck-front": '"\\e2b7"',
        "cat": '"\\f6be"',
        "anchor-circle-exclamation": '"\\e4ab"',
        "truck-field": '"\\e58d"',
        "route": '"\\f4d7"',
        "clipboard-question": '"\\e4e3"',
        "panorama": '"\\e209"',
        "comment-medical": '"\\f7f5"',
        "teeth-open": '"\\f62f"',
        "file-circle-minus": '"\\e4ed"',
        "tags": '"\\f02c"',
        "wine-glass": '"\\f4e3"',
        "fast-forward": '"\\f050"',
        "forward-fast": '"\\f050"',
        "face-meh-blank": '"\\f5a4"',
        "meh-blank": '"\\f5a4"',
        "parking": '"\\f540"',
        "square-parking": '"\\f540"',
        "house-signal": '"\\e012"',
        "bars-progress": '"\\f828"',
        "tasks-alt": '"\\f828"',
        "faucet-drip": '"\\e006"',
        "cart-flatbed": '"\\f474"',
        "dolly-flatbed": '"\\f474"',
        "ban-smoking": '"\\f54d"',
        "smoking-ban": '"\\f54d"',
        "terminal": '"\\f120"',
        "mobile-button": '"\\f10b"',
        "house-medical-flag": '"\\e514"',
        "basket-shopping": '"\\f291"',
        "shopping-basket": '"\\f291"',
        "tape": '"\\f4db"',
        "bus-alt": '"\\f55e"',
        "bus-simple": '"\\f55e"',
        "eye": '"\\f06e"',
        "face-sad-cry": '"\\f5b3"',
        "sad-cry": '"\\f5b3"',
        "audio-description": '"\\f29e"',
        "person-military-to-person": '"\\e54c"',
        "file-shield": '"\\e4f0"',
        "user-slash": '"\\f506"',
        "pen": '"\\f304"',
        "tower-observation": '"\\e586"',
        "file-code": '"\\f1c9"',
        "signal-5": '"\\f012"',
        "signal-perfect": '"\\f012"',
        "signal": '"\\f012"',
        "bus": '"\\f207"',
        "heart-circle-xmark": '"\\e501"',
        "home-lg": '"\\e3af"',
        "house-chimney": '"\\e3af"',
        "window-maximize": '"\\f2d0"',
        "face-frown": '"\\f119"',
        "frown": '"\\f119"',
        "prescription": '"\\f5b1"',
        "shop": '"\\f54f"',
        "store-alt": '"\\f54f"',
        "floppy-disk": '"\\f0c7"',
        "save": '"\\f0c7"',
        "vihara": '"\\f6a7"',
        "balance-scale-left": '"\\f515"',
        "scale-unbalanced": '"\\f515"',
        "sort-asc": '"\\f0de"',
        "sort-up": '"\\f0de"',
        "comment-dots": '"\\f4ad"',
        "commenting": '"\\f4ad"',
        "plant-wilt": '"\\e5aa"',
        "diamond": '"\\f219"',
        "face-grin-squint": '"\\f585"',
        "grin-squint": '"\\f585"',
        "hand-holding-dollar": '"\\f4c0"',
        "hand-holding-usd": '"\\f4c0"',
        "bacterium": '"\\e05a"',
        "hand-pointer": '"\\f25a"',
        "drum-steelpan": '"\\f56a"',
        "hand-scissors": '"\\f257"',
        "hands-praying": '"\\f684"',
        "praying-hands": '"\\f684"',
        "arrow-right-rotate": '"\\f01e"',
        "arrow-rotate-forward": '"\\f01e"',
        "arrow-rotate-right": '"\\f01e"',
        "redo": '"\\f01e"',
        "biohazard": '"\\f780"',
        "location-crosshairs": '"\\f601"',
        "location": '"\\f601"',
        "mars-double": '"\\f227"',
        "child-dress": '"\\e59c"',
        "users-between-lines": '"\\e591"',
        "lungs-virus": '"\\e067"',
        "face-grin-tears": '"\\f588"',
        "grin-tears": '"\\f588"',
        "phone": '"\\f095"',
        "calendar-times": '"\\f273"',
        "calendar-xmark": '"\\f273"',
        "child-reaching": '"\\e59d"',
        "head-side-virus": '"\\e064"',
        "user-cog": '"\\f4fe"',
        "user-gear": '"\\f4fe"',
        "arrow-up-1-9": '"\\f163"',
        "sort-numeric-up": '"\\f163"',
        "door-closed": '"\\f52a"',
        "shield-virus": '"\\e06c"',
        "dice-six": '"\\f526"',
        "mosquito-net": '"\\e52c"',
        "bridge-water": '"\\e4ce"',
        "person-booth": '"\\f756"',
        "text-width": '"\\f035"',
        "hat-wizard": '"\\f6e8"',
        "pen-fancy": '"\\f5ac"',
        "digging": '"\\f85e"',
        "person-digging": '"\\f85e"',
        "trash": '"\\f1f8"',
        "gauge-simple-med": '"\\f629"',
        "gauge-simple": '"\\f629"',
        "tachometer-average": '"\\f629"',
        "book-medical": '"\\f7e6"',
        "poo": '"\\f2fe"',
        "quote-right-alt": '"\\f10e"',
        "quote-right": '"\\f10e"',
        "shirt": '"\\f553"',
        "t-shirt": '"\\f553"',
        "tshirt": '"\\f553"',
        "cubes": '"\\f1b3"',
        "divide": '"\\f529"',
        "tenge-sign": '"\\f7d7"',
        "tenge": '"\\f7d7"',
        "headphones": '"\\f025"',
        "hands-holding": '"\\f4c2"',
        "hands-clapping": '"\\e1a8"',
        "republican": '"\\f75e"',
        "arrow-left": '"\\f060"',
        "person-circle-xmark": '"\\e543"',
        "ruler": '"\\f545"',
        "align-left": '"\\f036"',
        "dice-d6": '"\\f6d1"',
        "restroom": '"\\f7bd"',
        "j": '"\\4a"',
        "users-viewfinder": '"\\e595"',
        "file-video": '"\\f1c8"',
        "external-link-alt": '"\\f35d"',
        "up-right-from-square": '"\\f35d"',
        "table-cells": '"\\f00a"',
        "th": '"\\f00a"',
        "file-pdf": '"\\f1c1"',
        "bible": '"\\f647"',
        "book-bible": '"\\f647"',
        "o": '"\\4f"',
        "medkit": '"\\f0fa"',
        "suitcase-medical": '"\\f0fa"',
        "user-secret": '"\\f21b"',
        "otter": '"\\f700"',
        "female": '"\\f182"',
        "person-dress": '"\\f182"',
        "comment-dollar": '"\\f651"',
        "briefcase-clock": '"\\f64a"',
        "business-time": '"\\f64a"',
        "table-cells-large": '"\\f009"',
        "th-large": '"\\f009"',
        "book-tanakh": '"\\f827"',
        "tanakh": '"\\f827"',
        "phone-volume": '"\\f2a0"',
        "volume-control-phone": '"\\f2a0"',
        "hat-cowboy-side": '"\\f8c1"',
        "clipboard-user": '"\\f7f3"',
        "child": '"\\f1ae"',
        "lira-sign": '"\\f195"',
        "satellite": '"\\f7bf"',
        "plane-lock": '"\\e558"',
        "tag": '"\\f02b"',
        "comment": '"\\f075"',
        "birthday-cake": '"\\f1fd"',
        "cake-candles": '"\\f1fd"',
        "cake": '"\\f1fd"',
        "envelope": '"\\f0e0"',
        "angle-double-up": '"\\f102"',
        "angles-up": '"\\f102"',
        "paperclip": '"\\f0c6"',
        "arrow-right-to-city": '"\\e4b3"',
        "ribbon": '"\\f4d6"',
        "lungs": '"\\f604"',
        "arrow-up-9-1": '"\\f887"',
        "sort-numeric-up-alt": '"\\f887"',
        "litecoin-sign": '"\\e1d3"',
        "border-none": '"\\f850"',
        "circle-nodes": '"\\e4e2"',
        "parachute-box": '"\\f4cd"',
        "indent": '"\\f03c"',
        "truck-field-un": '"\\e58e"',
        "hourglass-empty": '"\\f254"',
        "hourglass": '"\\f254"',
        "mountain": '"\\f6fc"',
        "user-doctor": '"\\f0f0"',
        "user-md": '"\\f0f0"',
        "circle-info": '"\\f05a"',
        "info-circle": '"\\f05a"',
        "cloud-meatball": '"\\f73b"',
        "camera-alt": '"\\f030"',
        "camera": '"\\f030"',
        "square-virus": '"\\e578"',
        "meteor": '"\\f753"',
        "car-on": '"\\e4dd"',
        "sleigh": '"\\f7cc"',
        "arrow-down-1-9": '"\\f162"',
        "sort-numeric-asc": '"\\f162"',
        "sort-numeric-down": '"\\f162"',
        "hand-holding-droplet": '"\\f4c1"',
        "hand-holding-water": '"\\f4c1"',
        "water": '"\\f773"',
        "calendar-check": '"\\f274"',
        "braille": '"\\f2a1"',
        "prescription-bottle-alt": '"\\f486"',
        "prescription-bottle-medical": '"\\f486"',
        "landmark": '"\\f66f"',
        "truck": '"\\f0d1"',
        "crosshairs": '"\\f05b"',
        "person-cane": '"\\e53c"',
        "tent": '"\\e57d"',
        "vest-patches": '"\\e086"',
        "check-double": '"\\f560"',
        "arrow-down-a-z": '"\\f15d"',
        "sort-alpha-asc": '"\\f15d"',
        "sort-alpha-down": '"\\f15d"',
        "money-bill-wheat": '"\\e52a"',
        "cookie": '"\\f563"',
        "arrow-left-rotate": '"\\f0e2"',
        "arrow-rotate-back": '"\\f0e2"',
        "arrow-rotate-backward": '"\\f0e2"',
        "arrow-rotate-left": '"\\f0e2"',
        "undo": '"\\f0e2"',
        "hard-drive": '"\\f0a0"',
        "hdd": '"\\f0a0"',
        "face-grin-squint-tears": '"\\f586"',
        "grin-squint-tears": '"\\f586"',
        "dumbbell": '"\\f44b"',
        "list-alt": '"\\f022"',
        "rectangle-list": '"\\f022"',
        "tarp-droplet": '"\\e57c"',
        "house-medical-circle-check": '"\\e511"',
        "person-skiing-nordic": '"\\f7ca"',
        "skiing-nordic": '"\\f7ca"',
        "calendar-plus": '"\\f271"',
        "plane-arrival": '"\\f5af"',
        "arrow-alt-circle-left": '"\\f359"',
        "circle-left": '"\\f359"',
        "subway": '"\\f239"',
        "train-subway": '"\\f239"',
        "chart-gantt": '"\\e0e4"',
        "indian-rupee-sign": '"\\e1bc"',
        "indian-rupee": '"\\e1bc"',
        "inr": '"\\e1bc"',
        "crop-alt": '"\\f565"',
        "crop-simple": '"\\f565"',
        "money-bill-1": '"\\f3d1"',
        "money-bill-alt": '"\\f3d1"',
        "left-long": '"\\f30a"',
        "long-arrow-alt-left": '"\\f30a"',
        "dna": '"\\f471"',
        "virus-slash": '"\\e075"',
        "minus": '"\\f068"',
        "subtract": '"\\f068"',
        "chess": '"\\f439"',
        "arrow-left-long": '"\\f177"',
        "long-arrow-left": '"\\f177"',
        "plug-circle-check": '"\\e55c"',
        "street-view": '"\\f21d"',
        "franc-sign": '"\\e18f"',
        "volume-off": '"\\f026"',
        "american-sign-language-interpreting": '"\\f2a3"',
        "asl-interpreting": '"\\f2a3"',
        "hands-american-sign-language-interpreting": '"\\f2a3"',
        "hands-asl-interpreting": '"\\f2a3"',
        "cog": '"\\f013"',
        "gear": '"\\f013"',
        "droplet-slash": '"\\f5c7"',
        "tint-slash": '"\\f5c7"',
        "mosque": '"\\f678"',
        "mosquito": '"\\e52b"',
        "star-of-david": '"\\f69a"',
        "person-military-rifle": '"\\e54b"',
        "cart-shopping": '"\\f07a"',
        "shopping-cart": '"\\f07a"',
        "vials": '"\\f493"',
        "plug-circle-plus": '"\\e55f"',
        "place-of-worship": '"\\f67f"',
        "grip-vertical": '"\\f58e"',
        "arrow-turn-up": '"\\f148"',
        "level-up": '"\\f148"',
        "u": '"\\55"',
        "square-root-alt": '"\\f698"',
        "square-root-variable": '"\\f698"',
        "clock-four": '"\\f017"',
        "clock": '"\\f017"',
        "backward-step": '"\\f048"',
        "step-backward": '"\\f048"',
        "pallet": '"\\f482"',
        "faucet": '"\\e005"',
        "baseball-bat-ball": '"\\f432"',
        "s": '"\\53"',
        "timeline": '"\\e29c"',
        "keyboard": '"\\f11c"',
        "caret-down": '"\\f0d7"',
        "clinic-medical": '"\\f7f2"',
        "house-chimney-medical": '"\\f7f2"',
        "temperature-3": '"\\f2c8"',
        "temperature-three-quarters": '"\\f2c8"',
        "thermometer-3": '"\\f2c8"',
        "thermometer-three-quarters": '"\\f2c8"',
        "mobile-android-alt": '"\\f3cf"',
        "mobile-screen": '"\\f3cf"',
        "plane-up": '"\\e22d"',
        "piggy-bank": '"\\f4d3"',
        "battery-3": '"\\f242"',
        "battery-half": '"\\f242"',
        "mountain-city": '"\\e52e"',
        "coins": '"\\f51e"',
        "khanda": '"\\f66d"',
        "sliders-h": '"\\f1de"',
        "sliders": '"\\f1de"',
        "folder-tree": '"\\f802"',
        "network-wired": '"\\f6ff"',
        "map-pin": '"\\f276"',
        "hamsa": '"\\f665"',
        "cent-sign": '"\\e3f5"',
        "flask": '"\\f0c3"',
        "person-pregnant": '"\\e31e"',
        "wand-sparkles": '"\\f72b"',
        "ellipsis-v": '"\\f142"',
        "ellipsis-vertical": '"\\f142"',
        "ticket": '"\\f145"',
        "power-off": '"\\f011"',
        "long-arrow-alt-right": '"\\f30b"',
        "right-long": '"\\f30b"',
        "flag-usa": '"\\f74d"',
        "laptop-file": '"\\e51d"',
        "teletype": '"\\f1e4"',
        "tty": '"\\f1e4"',
        "diagram-next": '"\\e476"',
        "person-rifle": '"\\e54e"',
        "house-medical-circle-exclamation": '"\\e512"',
        "closed-captioning": '"\\f20a"',
        "hiking": '"\\f6ec"',
        "person-hiking": '"\\f6ec"',
        "venus-double": '"\\f226"',
        "images": '"\\f302"',
        "calculator": '"\\f1ec"',
        "people-pulling": '"\\e535"',
        "n": '"\\4e"',
        "cable-car": '"\\f7da"',
        "tram": '"\\f7da"',
        "cloud-rain": '"\\f73d"',
        "building-circle-xmark": '"\\e4d4"',
        "ship": '"\\f21a"',
        "arrows-down-to-line": '"\\e4b8"',
        "download": '"\\f019"',
        "face-grin": '"\\f580"',
        "grin": '"\\f580"',
        "backspace": '"\\f55a"',
        "delete-left": '"\\f55a"',
        "eye-dropper-empty": '"\\f1fb"',
        "eye-dropper": '"\\f1fb"',
        "eyedropper": '"\\f1fb"',
        "file-circle-check": '"\\e5a0"',
        "forward": '"\\f04e"',
        "mobile-android": '"\\f3ce"',
        "mobile-phone": '"\\f3ce"',
        "mobile": '"\\f3ce"',
        "face-meh": '"\\f11a"',
        "meh": '"\\f11a"',
        "align-center": '"\\f037"',
        "book-dead": '"\\f6b7"',
        "book-skull": '"\\f6b7"',
        "drivers-license": '"\\f2c2"',
        "id-card": '"\\f2c2"',
        "dedent": '"\\f03b"',
        "outdent": '"\\f03b"',
        "heart-circle-exclamation": '"\\e4fe"',
        "home-alt": '"\\f015"',
        "home-lg-alt": '"\\f015"',
        "home": '"\\f015"',
        "house": '"\\f015"',
        "calendar-week": '"\\f784"',
        "laptop-medical": '"\\f812"',
        "b": '"\\42"',
        "file-medical": '"\\f477"',
        "dice-one": '"\\f525"',
        "kiwi-bird": '"\\f535"',
        "arrow-right-arrow-left": '"\\f0ec"',
        "exchange": '"\\f0ec"',
        "redo-alt": '"\\f2f9"',
        "rotate-forward": '"\\f2f9"',
        "rotate-right": '"\\f2f9"',
        "cutlery": '"\\f2e7"',
        "utensils": '"\\f2e7"',
        "arrow-up-wide-short": '"\\f161"',
        "sort-amount-up": '"\\f161"',
        "mill-sign": '"\\e1ed"',
        "bowl-rice": '"\\e2eb"',
        "skull": '"\\f54c"',
        "broadcast-tower": '"\\f519"',
        "tower-broadcast": '"\\f519"',
        "truck-pickup": '"\\f63c"',
        "long-arrow-alt-up": '"\\f30c"',
        "up-long": '"\\f30c"',
        "stop": '"\\f04d"',
        "code-merge": '"\\f387"',
        "upload": '"\\f093"',
        "hurricane": '"\\f751"',
        "mound": '"\\e52d"',
        "toilet-portable": '"\\e583"',
        "compact-disc": '"\\f51f"',
        "file-arrow-down": '"\\f56d"',
        "file-download": '"\\f56d"',
        "caravan": '"\\f8ff"',
        "shield-cat": '"\\e572"',
        "bolt": '"\\f0e7"',
        "zap": '"\\f0e7"',
        "glass-water": '"\\e4f4"',
        "oil-well": '"\\e532"',
        "vault": '"\\e2c5"',
        "mars": '"\\f222"',
        "toilet": '"\\f7d8"',
        "plane-circle-xmark": '"\\e557"',
        "cny": '"\\f157"',
        "jpy": '"\\f157"',
        "rmb": '"\\f157"',
        "yen-sign": '"\\f157"',
        "yen": '"\\f157"',
        "rouble": '"\\f158"',
        "rub": '"\\f158"',
        "ruble-sign": '"\\f158"',
        "ruble": '"\\f158"',
        "sun": '"\\f185"',
        "guitar": '"\\f7a6"',
        "face-laugh-wink": '"\\f59c"',
        "laugh-wink": '"\\f59c"',
        "horse-head": '"\\f7ab"',
        "bore-hole": '"\\e4c3"',
        "industry": '"\\f275"',
        "arrow-alt-circle-down": '"\\f358"',
        "circle-down": '"\\f358"',
        "arrows-turn-to-dots": '"\\e4c1"',
        "florin-sign": '"\\e184"',
        "arrow-down-short-wide": '"\\f884"',
        "sort-amount-desc": '"\\f884"',
        "sort-amount-down-alt": '"\\f884"',
        "less-than": '"\\3c"',
        "angle-down": '"\\f107"',
        "car-tunnel": '"\\e4de"',
        "head-side-cough": '"\\e061"',
        "grip-lines": '"\\f7a4"',
        "thumbs-down": '"\\f165"',
        "user-lock": '"\\f502"',
        "arrow-right-long": '"\\f178"',
        "long-arrow-right": '"\\f178"',
        "anchor-circle-xmark": '"\\e4ac"',
        "ellipsis-h": '"\\f141"',
        "ellipsis": '"\\f141"',
        "chess-pawn": '"\\f443"',
        "first-aid": '"\\f479"',
        "kit-medical": '"\\f479"',
        "person-through-window": '"\\e5a9"',
        "toolbox": '"\\f552"',
        "hands-holding-circle": '"\\e4fb"',
        "bug": '"\\f188"',
        "credit-card-alt": '"\\f09d"',
        "credit-card": '"\\f09d"',
        "automobile": '"\\f1b9"',
        "car": '"\\f1b9"',
        "hand-holding-hand": '"\\e4f7"',
        "book-open-reader": '"\\f5da"',
        "book-reader": '"\\f5da"',
        "mountain-sun": '"\\e52f"',
        "arrows-left-right-to-line": '"\\e4ba"',
        "dice-d20": '"\\f6cf"',
        "truck-droplet": '"\\e58c"',
        "file-circle-xmark": '"\\e5a1"',
        "temperature-arrow-up": '"\\e040"',
        "temperature-up": '"\\e040"',
        "medal": '"\\f5a2"',
        "bed": '"\\f236"',
        "h-square": '"\\f0fd"',
        "square-h": '"\\f0fd"',
        "podcast": '"\\f2ce"',
        "temperature-4": '"\\f2c7"',
        "temperature-full": '"\\f2c7"',
        "thermometer-4": '"\\f2c7"',
        "thermometer-full": '"\\f2c7"',
        "bell": '"\\f0f3"',
        "superscript": '"\\f12b"',
        "plug-circle-xmark": '"\\e560"',
        "star-of-life": '"\\f621"',
        "phone-slash": '"\\f3dd"',
        "paint-roller": '"\\f5aa"',
        "hands-helping": '"\\f4c4"',
        "handshake-angle": '"\\f4c4"',
        "location-dot": '"\\f3c5"',
        "map-marker-alt": '"\\f3c5"',
        "file": '"\\f15b"',
        "greater-than": '"\\3e"',
        "person-swimming": '"\\f5c4"',
        "swimmer": '"\\f5c4"',
        "arrow-down": '"\\f063"',
        "droplet": '"\\f043"',
        "tint": '"\\f043"',
        "eraser": '"\\f12d"',
        "earth-america": '"\\f57d"',
        "earth-americas": '"\\f57d"',
        "earth": '"\\f57d"',
        "globe-americas": '"\\f57d"',
        "person-burst": '"\\e53b"',
        "dove": '"\\f4ba"',
        "battery-0": '"\\f244"',
        "battery-empty": '"\\f244"',
        "socks": '"\\f696"',
        "inbox": '"\\f01c"',
        "section": '"\\e447"',
        "gauge-high": '"\\f625"',
        "tachometer-alt-fast": '"\\f625"',
        "tachometer-alt": '"\\f625"',
        "envelope-open-text": '"\\f658"',
        "hospital-alt": '"\\f0f8"',
        "hospital-wide": '"\\f0f8"',
        "hospital": '"\\f0f8"',
        "wine-bottle": '"\\f72f"',
        "chess-rook": '"\\f447"',
        "bars-staggered": '"\\f550"',
        "reorder": '"\\f550"',
        "stream": '"\\f550"',
        "dharmachakra": '"\\f655"',
        "hotdog": '"\\f80f"',
        "blind": '"\\f29d"',
        "person-walking-with-cane": '"\\f29d"',
        "drum": '"\\f569"',
        "ice-cream": '"\\f810"',
        "heart-circle-bolt": '"\\e4fc"',
        "fax": '"\\f1ac"',
        "paragraph": '"\\f1dd"',
        "check-to-slot": '"\\f772"',
        "vote-yea": '"\\f772"',
        "star-half": '"\\f089"',
        "boxes-alt": '"\\f468"',
        "boxes-stacked": '"\\f468"',
        "boxes": '"\\f468"',
        "chain": '"\\f0c1"',
        "link": '"\\f0c1"',
        "assistive-listening-systems": '"\\f2a2"',
        "ear-listen": '"\\f2a2"',
        "tree-city": '"\\e587"',
        "play": '"\\f04b"',
        "font": '"\\f031"',
        "rupiah-sign": '"\\e23d"',
        "magnifying-glass": '"\\f002"',
        "search": '"\\f002"',
        "ping-pong-paddle-ball": '"\\f45d"',
        "table-tennis-paddle-ball": '"\\f45d"',
        "table-tennis": '"\\f45d"',
        "diagnoses": '"\\f470"',
        "person-dots-from-line": '"\\f470"',
        "trash-can-arrow-up": '"\\f82a"',
        "trash-restore-alt": '"\\f82a"',
        "naira-sign": '"\\e1f6"',
        "cart-arrow-down": '"\\f218"',
        "walkie-talkie": '"\\f8ef"',
        "file-edit": '"\\f31c"',
        "file-pen": '"\\f31c"',
        "receipt": '"\\f543"',
        "pen-square": '"\\f14b"',
        "pencil-square": '"\\f14b"',
        "square-pen": '"\\f14b"',
        "suitcase-rolling": '"\\f5c1"',
        "person-circle-exclamation": '"\\e53f"',
        "chevron-down": '"\\f078"',
        "battery-5": '"\\f240"',
        "battery-full": '"\\f240"',
        "battery": '"\\f240"',
        "skull-crossbones": '"\\f714"',
        "code-compare": '"\\e13a"',
        "list-dots": '"\\f0ca"',
        "list-ul": '"\\f0ca"',
        "school-lock": '"\\e56f"',
        "tower-cell": '"\\e585"',
        "down-long": '"\\f309"',
        "long-arrow-alt-down": '"\\f309"',
        "ranking-star": '"\\e561"',
        "chess-king": '"\\f43f"',
        "person-harassing": '"\\e549"',
        "brazilian-real-sign": '"\\e46c"',
        "landmark-alt": '"\\f752"',
        "landmark-dome": '"\\f752"',
        "arrow-up": '"\\f062"',
        "television": '"\\f26c"',
        "tv-alt": '"\\f26c"',
        "tv": '"\\f26c"',
        "shrimp": '"\\e448"',
        "list-check": '"\\f0ae"',
        "tasks": '"\\f0ae"',
        "jug-detergent": '"\\e519"',
        "circle-user": '"\\f2bd"',
        "user-circle": '"\\f2bd"',
        "user-shield": '"\\f505"',
        "wind": '"\\f72e"',
        "car-burst": '"\\f5e1"',
        "car-crash": '"\\f5e1"',
        "y": '"\\59"',
        "person-snowboarding": '"\\f7ce"',
        "snowboarding": '"\\f7ce"',
        "shipping-fast": '"\\f48b"',
        "truck-fast": '"\\f48b"',
        "fish": '"\\f578"',
        "user-graduate": '"\\f501"',
        "adjust": '"\\f042"',
        "circle-half-stroke": '"\\f042"',
        "clapperboard": '"\\e131"',
        "circle-radiation": '"\\f7ba"',
        "radiation-alt": '"\\f7ba"',
        "baseball-ball": '"\\f433"',
        "baseball": '"\\f433"',
        "jet-fighter-up": '"\\e518"',
        "diagram-project": '"\\f542"',
        "project-diagram": '"\\f542"',
        "copy": '"\\f0c5"',
        "volume-mute": '"\\f6a9"',
        "volume-times": '"\\f6a9"',
        "volume-xmark": '"\\f6a9"',
        "hand-sparkles": '"\\e05d"',
        "grip-horizontal": '"\\f58d"',
        "grip": '"\\f58d"',
        "share-from-square": '"\\f14d"',
        "share-square": '"\\f14d"',
        "child-combatant": '"\\e4e0"',
        "child-rifle": '"\\e4e0"',
        "gun": '"\\e19b"',
        "phone-square": '"\\f098"',
        "square-phone": '"\\f098"',
        "add": '"\\2b"',
        "plus": '"\\2b"',
        "expand": '"\\f065"',
        "computer": '"\\e4e5"',
        "close": '"\\f00d"',
        "multiply": '"\\f00d"',
        "remove": '"\\f00d"',
        "times": '"\\f00d"',
        "xmark": '"\\f00d"',
        "arrows-up-down-left-right": '"\\f047"',
        "arrows": '"\\f047"',
        "chalkboard-teacher": '"\\f51c"',
        "chalkboard-user": '"\\f51c"',
        "peso-sign": '"\\e222"',
        "building-shield": '"\\e4d8"',
        "baby": '"\\f77c"',
        "users-line": '"\\e592"',
        "quote-left-alt": '"\\f10d"',
        "quote-left": '"\\f10d"',
        "tractor": '"\\f722"',
        "trash-arrow-up": '"\\f829"',
        "trash-restore": '"\\f829"',
        "arrow-down-up-lock": '"\\e4b0"',
        "lines-leaning": '"\\e51e"',
        "ruler-combined": '"\\f546"',
        "copyright": '"\\f1f9"',
        "equals": '"\\3d"',
        "blender": '"\\f517"',
        "teeth": '"\\f62e"',
        "ils": '"\\f20b"',
        "shekel-sign": '"\\f20b"',
        "shekel": '"\\f20b"',
        "sheqel-sign": '"\\f20b"',
        "sheqel": '"\\f20b"',
        "map": '"\\f279"',
        "rocket": '"\\f135"',
        "photo-film": '"\\f87c"',
        "photo-video": '"\\f87c"',
        "folder-minus": '"\\f65d"',
        "store": '"\\f54e"',
        "arrow-trend-up": '"\\e098"',
        "plug-circle-minus": '"\\e55e"',
        "sign-hanging": '"\\f4d9"',
        "sign": '"\\f4d9"',
        "bezier-curve": '"\\f55b"',
        "bell-slash": '"\\f1f6"',
        "tablet-android": '"\\f3fb"',
        "tablet": '"\\f3fb"',
        "school-flag": '"\\e56e"',
        "fill": '"\\f575"',
        "angle-up": '"\\f106"',
        "drumstick-bite": '"\\f6d7"',
        "holly-berry": '"\\f7aa"',
        "chevron-left": '"\\f053"',
        "bacteria": '"\\e059"',
        "hand-lizard": '"\\f258"',
        "notdef": '"\\e1fe"',
        "disease": '"\\f7fa"',
        "briefcase-medical": '"\\f469"',
        "genderless": '"\\f22d"',
        "chevron-right": '"\\f054"',
        "retweet": '"\\f079"',
        "car-alt": '"\\f5de"',
        "car-rear": '"\\f5de"',
        "pump-soap": '"\\e06b"',
        "video-slash": '"\\f4e2"',
        "battery-2": '"\\f243"',
        "battery-quarter": '"\\f243"',
        "radio": '"\\f8d7"',
        "baby-carriage": '"\\f77d"',
        "carriage-baby": '"\\f77d"',
        "traffic-light": '"\\f637"',
        "thermometer": '"\\f491"',
        "vr-cardboard": '"\\f729"',
        "hand-middle-finger": '"\\f806"',
        "percent": '"\\25"',
        "percentage": '"\\25"',
        "truck-moving": '"\\f4df"',
        "glass-water-droplet": '"\\e4f5"',
        "display": '"\\e163"',
        "face-smile": '"\\f118"',
        "smile": '"\\f118"',
        "thumb-tack": '"\\f08d"',
        "thumbtack": '"\\f08d"',
        "trophy": '"\\f091"',
        "person-praying": '"\\f683"',
        "pray": '"\\f683"',
        "hammer": '"\\f6e3"',
        "hand-peace": '"\\f25b"',
        "rotate": '"\\f2f1"',
        "sync-alt": '"\\f2f1"',
        "spinner": '"\\f110"',
        "robot": '"\\f544"',
        "peace": '"\\f67c"',
        "cogs": '"\\f085"',
        "gears": '"\\f085"',
        "warehouse": '"\\f494"',
        "arrow-up-right-dots": '"\\e4b7"',
        "splotch": '"\\f5bc"',
        "face-grin-hearts": '"\\f584"',
        "grin-hearts": '"\\f584"',
        "dice-four": '"\\f524"',
        "sim-card": '"\\f7c4"',
        "transgender-alt": '"\\f225"',
        "transgender": '"\\f225"',
        "mercury": '"\\f223"',
        "arrow-turn-down": '"\\f149"',
        "level-down": '"\\f149"',
        "person-falling-burst": '"\\e547"',
        "award": '"\\f559"',
        "ticket-alt": '"\\f3ff"',
        "ticket-simple": '"\\f3ff"',
        "building": '"\\f1ad"',
        "angle-double-left": '"\\f100"',
        "angles-left": '"\\f100"',
        "qrcode": '"\\f029"',
        "clock-rotate-left": '"\\f1da"',
        "history": '"\\f1da"',
        "face-grin-beam-sweat": '"\\f583"',
        "grin-beam-sweat": '"\\f583"',
        "arrow-right-from-file": '"\\f56e"',
        "file-export": '"\\f56e"',
        "shield-blank": '"\\f132"',
        "shield": '"\\f132"',
        "arrow-up-short-wide": '"\\f885"',
        "sort-amount-up-alt": '"\\f885"',
        "house-medical": '"\\e3b2"',
        "golf-ball-tee": '"\\f450"',
        "golf-ball": '"\\f450"',
        "chevron-circle-left": '"\\f137"',
        "circle-chevron-left": '"\\f137"',
        "house-chimney-window": '"\\e00d"',
        "pen-nib": '"\\f5ad"',
        "tent-arrow-turn-left": '"\\e580"',
        "tents": '"\\e582"',
        "magic": '"\\f0d0"',
        "wand-magic": '"\\f0d0"',
        "dog": '"\\f6d3"',
        "carrot": '"\\f787"',
        "moon": '"\\f186"',
        "wine-glass-alt": '"\\f5ce"',
        "wine-glass-empty": '"\\f5ce"',
        "cheese": '"\\f7ef"',
        "yin-yang": '"\\f6ad"',
        "music": '"\\f001"',
        "code-commit": '"\\f386"',
        "temperature-low": '"\\f76b"',
        "biking": '"\\f84a"',
        "person-biking": '"\\f84a"',
        "broom": '"\\f51a"',
        "shield-heart": '"\\e574"',
        "gopuram": '"\\f664"',
        "earth-oceania": '"\\e47b"',
        "globe-oceania": '"\\e47b"',
        "square-xmark": '"\\f2d3"',
        "times-square": '"\\f2d3"',
        "xmark-square": '"\\f2d3"',
        "hashtag": '"\\23"',
        "expand-alt": '"\\f424"',
        "up-right-and-down-left-from-center": '"\\f424"',
        "oil-can": '"\\f613"',
        "t": '"\\54"',
        "hippo": '"\\f6ed"',
        "chart-column": '"\\e0e3"',
        "infinity": '"\\f534"',
        "vial-circle-check": '"\\e596"',
        "person-arrow-down-to-line": '"\\e538"',
        "voicemail": '"\\f897"',
        "fan": '"\\f863"',
        "person-walking-luggage": '"\\e554"',
        "arrows-alt-v": '"\\f338"',
        "up-down": '"\\f338"',
        "cloud-moon-rain": '"\\f73c"',
        "calendar": '"\\f133"',
        "trailer": '"\\e041"',
        "bahai": '"\\f666"',
        "haykal": '"\\f666"',
        "sd-card": '"\\f7c2"',
        "dragon": '"\\f6d5"',
        "shoe-prints": '"\\f54b"',
        "circle-plus": '"\\f055"',
        "plus-circle": '"\\f055"',
        "face-grin-tongue-wink": '"\\f58b"',
        "grin-tongue-wink": '"\\f58b"',
        "hand-holding": '"\\f4bd"',
        "plug-circle-exclamation": '"\\e55d"',
        "chain-broken": '"\\f127"',
        "chain-slash": '"\\f127"',
        "link-slash": '"\\f127"',
        "unlink": '"\\f127"',
        "clone": '"\\f24d"',
        "person-walking-arrow-loop-left": '"\\e551"',
        "arrow-up-z-a": '"\\f882"',
        "sort-alpha-up-alt": '"\\f882"',
        "fire-alt": '"\\f7e4"',
        "fire-flame-curved": '"\\f7e4"',
        "tornado": '"\\f76f"',
        "file-circle-plus": '"\\e494"',
        "book-quran": '"\\f687"',
        "quran": '"\\f687"',
        "anchor": '"\\f13d"',
        "border-all": '"\\f84c"',
        "angry": '"\\f556"',
        "face-angry": '"\\f556"',
        "cookie-bite": '"\\f564"',
        "arrow-trend-down": '"\\e097"',
        "feed": '"\\f09e"',
        "rss": '"\\f09e"',
        "draw-polygon": '"\\f5ee"',
        "balance-scale": '"\\f24e"',
        "scale-balanced": '"\\f24e"',
        "gauge-simple-high": '"\\f62a"',
        "tachometer-fast": '"\\f62a"',
        "tachometer": '"\\f62a"',
        "shower": '"\\f2cc"',
        "desktop-alt": '"\\f390"',
        "desktop": '"\\f390"',
        "m": '"\\4d"',
        "table-list": '"\\f00b"',
        "th-list": '"\\f00b"',
        "comment-sms": '"\\f7cd"',
        "sms": '"\\f7cd"',
        "book": '"\\f02d"',
        "user-plus": '"\\f234"',
        "check": '"\\f00c"',
        "battery-4": '"\\f241"',
        "battery-three-quarters": '"\\f241"',
        "house-circle-check": '"\\e509"',
        "angle-left": '"\\f104"',
        "diagram-successor": '"\\e47a"',
        "truck-arrow-right": '"\\e58b"',
        "arrows-split-up-and-left": '"\\e4bc"',
        "fist-raised": '"\\f6de"',
        "hand-fist": '"\\f6de"',
        "cloud-moon": '"\\f6c3"',
        "briefcase": '"\\f0b1"',
        "person-falling": '"\\e546"',
        "image-portrait": '"\\f3e0"',
        "portrait": '"\\f3e0"',
        "user-tag": '"\\f507"',
        "rug": '"\\e569"',
        "earth-europe": '"\\f7a2"',
        "globe-europe": '"\\f7a2"',
        "cart-flatbed-suitcase": '"\\f59d"',
        "luggage-cart": '"\\f59d"',
        "rectangle-times": '"\\f410"',
        "rectangle-xmark": '"\\f410"',
        "times-rectangle": '"\\f410"',
        "window-close": '"\\f410"',
        "baht-sign": '"\\e0ac"',
        "book-open": '"\\f518"',
        "book-journal-whills": '"\\f66a"',
        "journal-whills": '"\\f66a"',
        "handcuffs": '"\\e4f8"',
        "exclamation-triangle": '"\\f071"',
        "triangle-exclamation": '"\\f071"',
        "warning": '"\\f071"',
        "database": '"\\f1c0"',
        "arrow-turn-right": '"\\f064"',
        "mail-forward": '"\\f064"',
        "share": '"\\f064"',
        "bottle-droplet": '"\\e4c4"',
        "mask-face": '"\\e1d7"',
        "hill-rockslide": '"\\e508"',
        "exchange-alt": '"\\f362"',
        "right-left": '"\\f362"',
        "paper-plane": '"\\f1d8"',
        "road-circle-exclamation": '"\\e565"',
        "dungeon": '"\\f6d9"',
        "align-right": '"\\f038"',
        "money-bill-1-wave": '"\\f53b"',
        "money-bill-wave-alt": '"\\f53b"',
        "life-ring": '"\\f1cd"',
        "hands": '"\\f2a7"',
        "sign-language": '"\\f2a7"',
        "signing": '"\\f2a7"',
        "calendar-day": '"\\f783"',
        "ladder-water": '"\\f5c5"',
        "swimming-pool": '"\\f5c5"',
        "water-ladder": '"\\f5c5"',
        "arrows-up-down": '"\\f07d"',
        "arrows-v": '"\\f07d"',
        "face-grimace": '"\\f57f"',
        "grimace": '"\\f57f"',
        "wheelchair-alt": '"\\e2ce"',
        "wheelchair-move": '"\\e2ce"',
        "level-down-alt": '"\\f3be"',
        "turn-down": '"\\f3be"',
        "person-walking-arrow-right": '"\\e552"',
        "envelope-square": '"\\f199"',
        "square-envelope": '"\\f199"',
        "dice": '"\\f522"',
        "bowling-ball": '"\\f436"',
        "brain": '"\\f5dc"',
        "band-aid": '"\\f462"',
        "bandage": '"\\f462"',
        "calendar-minus": '"\\f272"',
        "circle-xmark": '"\\f057"',
        "times-circle": '"\\f057"',
        "xmark-circle": '"\\f057"',
        "gifts": '"\\f79c"',
        "hotel": '"\\f594"',
        "earth-asia": '"\\f57e"',
        "globe-asia": '"\\f57e"',
        "id-card-alt": '"\\f47f"',
        "id-card-clip": '"\\f47f"',
        "magnifying-glass-plus": '"\\f00e"',
        "search-plus": '"\\f00e"',
        "thumbs-up": '"\\f164"',
        "user-clock": '"\\f4fd"',
        "allergies": '"\\f461"',
        "hand-dots": '"\\f461"',
        "file-invoice": '"\\f570"',
        "window-minimize": '"\\f2d1"',
        "coffee": '"\\f0f4"',
        "mug-saucer": '"\\f0f4"',
        "brush": '"\\f55d"',
        "mask": '"\\f6fa"',
        "magnifying-glass-minus": '"\\f010"',
        "search-minus": '"\\f010"',
        "ruler-vertical": '"\\f548"',
        "user-alt": '"\\f406"',
        "user-large": '"\\f406"',
        "train-tram": '"\\e5b4"',
        "user-nurse": '"\\f82f"',
        "syringe": '"\\f48e"',
        "cloud-sun": '"\\f6c4"',
        "stopwatch-20": '"\\e06f"',
        "square-full": '"\\f45c"',
        "magnet": '"\\f076"',
        "jar": '"\\e516"',
        "note-sticky": '"\\f249"',
        "sticky-note": '"\\f249"',
        "bug-slash": '"\\e490"',
        "arrow-up-from-water-pump": '"\\e4b6"',
        "bone": '"\\f5d7"',
        "user-injured": '"\\f728"',
        "face-sad-tear": '"\\f5b4"',
        "sad-tear": '"\\f5b4"',
        "plane": '"\\f072"',
        "tent-arrows-down": '"\\e581"',
        "exclamation": '"\\21"',
        "arrows-spin": '"\\e4bb"',
        "print": '"\\f02f"',
        "try": '"\\e2bb"',
        "turkish-lira-sign": '"\\e2bb"',
        "turkish-lira": '"\\e2bb"',
        "dollar-sign": '"\\24"',
        "dollar": '"\\24"',
        "usd": '"\\24"',
        "x": '"\\58"',
        "magnifying-glass-dollar": '"\\f688"',
        "search-dollar": '"\\f688"',
        "users-cog": '"\\f509"',
        "users-gear": '"\\f509"',
        "person-military-pointing": '"\\e54a"',
        "bank": '"\\f19c"',
        "building-columns": '"\\f19c"',
        "institution": '"\\f19c"',
        "museum": '"\\f19c"',
        "university": '"\\f19c"',
        "umbrella": '"\\f0e9"',
        "trowel": '"\\e589"',
        "d": '"\\44"',
        "stapler": '"\\e5af"',
        "masks-theater": '"\\f630"',
        "theater-masks": '"\\f630"',
        "kip-sign": '"\\e1c4"',
        "hand-point-left": '"\\f0a5"',
        "handshake-alt": '"\\f4c6"',
        "handshake-simple": '"\\f4c6"',
        "fighter-jet": '"\\f0fb"',
        "jet-fighter": '"\\f0fb"',
        "share-alt-square": '"\\f1e1"',
        "square-share-nodes": '"\\f1e1"',
        "barcode": '"\\f02a"',
        "plus-minus": '"\\e43c"',
        "video-camera": '"\\f03d"',
        "video": '"\\f03d"',
        "graduation-cap": '"\\f19d"',
        "mortar-board": '"\\f19d"',
        "hand-holding-medical": '"\\e05c"',
        "person-circle-check": '"\\e53e"',
        "level-up-alt": '"\\f3bf"',
        "turn-up": '"\\f3bf"',
        "monero": '"\\f3d0"',
        "hooli": '"\\f427"',
        "yelp": '"\\f1e9"',
        "cc-visa": '"\\f1f0"',
        "lastfm": '"\\f202"',
        "shopware": '"\\f5b5"',
        "creative-commons-nc": '"\\f4e8"',
        "aws": '"\\f375"',
        "redhat": '"\\f7bc"',
        "yoast": '"\\f2b1"',
        "cloudflare": '"\\e07d"',
        "ups": '"\\f7e0"',
        "wpexplorer": '"\\f2de"',
        "dyalog": '"\\f399"',
        "bity": '"\\f37a"',
        "stackpath": '"\\f842"',
        "buysellads": '"\\f20d"',
        "first-order": '"\\f2b0"',
        "modx": '"\\f285"',
        "guilded": '"\\e07e"',
        "vnv": '"\\f40b"',
        "js-square": '"\\f3b9"',
        "square-js": '"\\f3b9"',
        "microsoft": '"\\f3ca"',
        "qq": '"\\f1d6"',
        "orcid": '"\\f8d2"',
        "java": '"\\f4e4"',
        "invision": '"\\f7b0"',
        "creative-commons-pd-alt": '"\\f4ed"',
        "centercode": '"\\f380"',
        "glide-g": '"\\f2a6"',
        "drupal": '"\\f1a9"',
        "hire-a-helper": '"\\f3b0"',
        "creative-commons-by": '"\\f4e7"',
        "unity": '"\\e049"',
        "whmcs": '"\\f40d"',
        "rocketchat": '"\\f3e8"',
        "vk": '"\\f189"',
        "untappd": '"\\f405"',
        "mailchimp": '"\\f59e"',
        "css3-alt": '"\\f38b"',
        "reddit-square": '"\\f1a2"',
        "square-reddit": '"\\f1a2"',
        "vimeo-v": '"\\f27d"',
        "contao": '"\\f26d"',
        "square-font-awesome": '"\\e5ad"',
        "deskpro": '"\\f38f"',
        "sistrix": '"\\f3ee"',
        "instagram-square": '"\\e055"',
        "square-instagram": '"\\e055"',
        "battle-net": '"\\f835"',
        "the-red-yeti": '"\\f69d"',
        "hacker-news-square": '"\\f3af"',
        "square-hacker-news": '"\\f3af"',
        "edge": '"\\f282"',
        "napster": '"\\f3d2"',
        "snapchat-square": '"\\f2ad"',
        "square-snapchat": '"\\f2ad"',
        "google-plus-g": '"\\f0d5"',
        "artstation": '"\\f77a"',
        "markdown": '"\\f60f"',
        "sourcetree": '"\\f7d3"',
        "google-plus": '"\\f2b3"',
        "diaspora": '"\\f791"',
        "foursquare": '"\\f180"',
        "stack-overflow": '"\\f16c"',
        "github-alt": '"\\f113"',
        "phoenix-squadron": '"\\f511"',
        "pagelines": '"\\f18c"',
        "algolia": '"\\f36c"',
        "red-river": '"\\f3e3"',
        "creative-commons-sa": '"\\f4ef"',
        "safari": '"\\f267"',
        "google": '"\\f1a0"',
        "font-awesome-alt": '"\\f35c"',
        "square-font-awesome-stroke": '"\\f35c"',
        "atlassian": '"\\f77b"',
        "linkedin-in": '"\\f0e1"',
        "digital-ocean": '"\\f391"',
        "nimblr": '"\\f5a8"',
        "chromecast": '"\\f838"',
        "evernote": '"\\f839"',
        "hacker-news": '"\\f1d4"',
        "creative-commons-sampling": '"\\f4f0"',
        "adversal": '"\\f36a"',
        "creative-commons": '"\\f25e"',
        "watchman-monitoring": '"\\e087"',
        "fonticons": '"\\f280"',
        "weixin": '"\\f1d7"',
        "shirtsinbulk": '"\\f214"',
        "codepen": '"\\f1cb"',
        "git-alt": '"\\f841"',
        "lyft": '"\\f3c3"',
        "rev": '"\\f5b2"',
        "windows": '"\\f17a"',
        "wizards-of-the-coast": '"\\f730"',
        "square-viadeo": '"\\f2aa"',
        "viadeo-square": '"\\f2aa"',
        "meetup": '"\\f2e0"',
        "centos": '"\\f789"',
        "adn": '"\\f170"',
        "cloudsmith": '"\\f384"',
        "pied-piper-alt": '"\\f1a8"',
        "dribbble-square": '"\\f397"',
        "square-dribbble": '"\\f397"',
        "codiepie": '"\\f284"',
        "node": '"\\f419"',
        "mix": '"\\f3cb"',
        "steam": '"\\f1b6"',
        "cc-apple-pay": '"\\f416"',
        "scribd": '"\\f28a"',
        "openid": '"\\f19b"',
        "instalod": '"\\e081"',
        "expeditedssl": '"\\f23e"',
        "sellcast": '"\\f2da"',
        "square-twitter": '"\\f081"',
        "twitter-square": '"\\f081"',
        "r-project": '"\\f4f7"',
        "delicious": '"\\f1a5"',
        "freebsd": '"\\f3a4"',
        "vuejs": '"\\f41f"',
        "accusoft": '"\\f369"',
        "ioxhost": '"\\f208"',
        "fonticons-fi": '"\\f3a2"',
        "app-store": '"\\f36f"',
        "cc-mastercard": '"\\f1f1"',
        "itunes-note": '"\\f3b5"',
        "golang": '"\\e40f"',
        "kickstarter": '"\\f3bb"',
        "grav": '"\\f2d6"',
        "weibo": '"\\f18a"',
        "uncharted": '"\\e084"',
        "firstdraft": '"\\f3a1"',
        "square-youtube": '"\\f431"',
        "youtube-square": '"\\f431"',
        "wikipedia-w": '"\\f266"',
        "rendact": '"\\f3e4"',
        "wpressr": '"\\f3e4"',
        "angellist": '"\\f209"',
        "galactic-republic": '"\\f50c"',
        "nfc-directional": '"\\e530"',
        "skype": '"\\f17e"',
        "joget": '"\\f3b7"',
        "fedora": '"\\f798"',
        "stripe-s": '"\\f42a"',
        "meta": '"\\e49b"',
        "laravel": '"\\f3bd"',
        "hotjar": '"\\f3b1"',
        "bluetooth-b": '"\\f294"',
        "sticker-mule": '"\\f3f7"',
        "creative-commons-zero": '"\\f4f3"',
        "hips": '"\\f452"',
        "behance": '"\\f1b4"',
        "reddit": '"\\f1a1"',
        "discord": '"\\f392"',
        "chrome": '"\\f268"',
        "app-store-ios": '"\\f370"',
        "cc-discover": '"\\f1f2"',
        "wpbeginner": '"\\f297"',
        "confluence": '"\\f78d"',
        "mdb": '"\\f8ca"',
        "dochub": '"\\f394"',
        "accessible-icon": '"\\f368"',
        "ebay": '"\\f4f4"',
        "amazon": '"\\f270"',
        "unsplash": '"\\e07c"',
        "yarn": '"\\f7e3"',
        "square-steam": '"\\f1b7"',
        "steam-square": '"\\f1b7"',
        "500px": '"\\f26e"',
        "square-vimeo": '"\\f194"',
        "vimeo-square": '"\\f194"',
        "asymmetrik": '"\\f372"',
        "font-awesome-flag": '"\\f2b4"',
        "font-awesome-logo-full": '"\\f2b4"',
        "font-awesome": '"\\f2b4"',
        "gratipay": '"\\f184"',
        "apple": '"\\f179"',
        "hive": '"\\e07f"',
        "gitkraken": '"\\f3a6"',
        "keybase": '"\\f4f5"',
        "apple-pay": '"\\f415"',
        "padlet": '"\\e4a0"',
        "amazon-pay": '"\\f42c"',
        "github-square": '"\\f092"',
        "square-github": '"\\f092"',
        "stumbleupon": '"\\f1a4"',
        "fedex": '"\\f797"',
        "phoenix-framework": '"\\f3dc"',
        "shopify": '"\\e057"',
        "neos": '"\\f612"',
        "hackerrank": '"\\f5f7"',
        "researchgate": '"\\f4f8"',
        "swift": '"\\f8e1"',
        "angular": '"\\f420"',
        "speakap": '"\\f3f3"',
        "angrycreative": '"\\f36e"',
        "y-combinator": '"\\f23b"',
        "empire": '"\\f1d1"',
        "envira": '"\\f299"',
        "gitlab-square": '"\\e5ae"',
        "square-gitlab": '"\\e5ae"',
        "studiovinari": '"\\f3f8"',
        "pied-piper": '"\\f2ae"',
        "wordpress": '"\\f19a"',
        "product-hunt": '"\\f288"',
        "firefox": '"\\f269"',
        "linode": '"\\f2b8"',
        "goodreads": '"\\f3a8"',
        "odnoklassniki-square": '"\\f264"',
        "square-odnoklassniki": '"\\f264"',
        "jsfiddle": '"\\f1cc"',
        "sith": '"\\f512"',
        "themeisle": '"\\f2b2"',
        "page4": '"\\f3d7"',
        "hashnode": '"\\e499"',
        "react": '"\\f41b"',
        "cc-paypal": '"\\f1f4"',
        "squarespace": '"\\f5be"',
        "cc-stripe": '"\\f1f5"',
        "creative-commons-share": '"\\f4f2"',
        "bitcoin": '"\\f379"',
        "keycdn": '"\\f3ba"',
        "opera": '"\\f26a"',
        "itch-io": '"\\f83a"',
        "umbraco": '"\\f8e8"',
        "galactic-senate": '"\\f50d"',
        "ubuntu": '"\\f7df"',
        "draft2digital": '"\\f396"',
        "stripe": '"\\f429"',
        "houzz": '"\\f27c"',
        "gg": '"\\f260"',
        "dhl": '"\\f790"',
        "pinterest-square": '"\\f0d3"',
        "square-pinterest": '"\\f0d3"',
        "xing": '"\\f168"',
        "blackberry": '"\\f37b"',
        "creative-commons-pd": '"\\f4ec"',
        "playstation": '"\\f3df"',
        "quinscape": '"\\f459"',
        "less": '"\\f41d"',
        "blogger-b": '"\\f37d"',
        "opencart": '"\\f23d"',
        "vine": '"\\f1ca"',
        "paypal": '"\\f1ed"',
        "gitlab": '"\\f296"',
        "typo3": '"\\f42b"',
        "reddit-alien": '"\\f281"',
        "yahoo": '"\\f19e"',
        "dailymotion": '"\\e052"',
        "affiliatetheme": '"\\f36b"',
        "pied-piper-pp": '"\\f1a7"',
        "bootstrap": '"\\f836"',
        "odnoklassniki": '"\\f263"',
        "nfc-symbol": '"\\e531"',
        "ethereum": '"\\f42e"',
        "speaker-deck": '"\\f83c"',
        "creative-commons-nc-eu": '"\\f4e9"',
        "patreon": '"\\f3d9"',
        "avianex": '"\\f374"',
        "ello": '"\\f5f1"',
        "gofore": '"\\f3a7"',
        "bimobject": '"\\f378"',
        "facebook-f": '"\\f39e"',
        "google-plus-square": '"\\f0d4"',
        "square-google-plus": '"\\f0d4"',
        "mandalorian": '"\\f50f"',
        "first-order-alt": '"\\f50a"',
        "osi": '"\\f41a"',
        "google-wallet": '"\\f1ee"',
        "d-and-d-beyond": '"\\f6ca"',
        "periscope": '"\\f3da"',
        "fulcrum": '"\\f50b"',
        "cloudscale": '"\\f383"',
        "forumbee": '"\\f211"',
        "mizuni": '"\\f3cc"',
        "schlix": '"\\f3ea"',
        "square-xing": '"\\f169"',
        "xing-square": '"\\f169"',
        "bandcamp": '"\\f2d5"',
        "wpforms": '"\\f298"',
        "cloudversify": '"\\f385"',
        "usps": '"\\f7e1"',
        "megaport": '"\\f5a3"',
        "magento": '"\\f3c4"',
        "spotify": '"\\f1bc"',
        "optin-monster": '"\\f23c"',
        "fly": '"\\f417"',
        "aviato": '"\\f421"',
        "itunes": '"\\f3b4"',
        "cuttlefish": '"\\f38c"',
        "blogger": '"\\f37c"',
        "flickr": '"\\f16e"',
        "viber": '"\\f409"',
        "soundcloud": '"\\f1be"',
        "digg": '"\\f1a6"',
        "tencent-weibo": '"\\f1d5"',
        "symfony": '"\\f83d"',
        "maxcdn": '"\\f136"',
        "etsy": '"\\f2d7"',
        "facebook-messenger": '"\\f39f"',
        "audible": '"\\f373"',
        "think-peaks": '"\\f731"',
        "bilibili": '"\\e3d9"',
        "erlang": '"\\f39d"',
        "cotton-bureau": '"\\f89e"',
        "dashcube": '"\\f210"',
        "42-group": '"\\e080"',
        "innosoft": '"\\e080"',
        "stack-exchange": '"\\f18d"',
        "elementor": '"\\f430"',
        "pied-piper-square": '"\\e01e"',
        "square-pied-piper": '"\\e01e"',
        "creative-commons-nd": '"\\f4eb"',
        "palfed": '"\\f3d8"',
        "superpowers": '"\\f2dd"',
        "resolving": '"\\f3e7"',
        "xbox": '"\\f412"',
        "searchengin": '"\\f3eb"',
        "tiktok": '"\\e07b"',
        "facebook-square": '"\\f082"',
        "square-facebook": '"\\f082"',
        "renren": '"\\f18b"',
        "linux": '"\\f17c"',
        "glide": '"\\f2a5"',
        "linkedin": '"\\f08c"',
        "hubspot": '"\\f3b2"',
        "deploydog": '"\\f38e"',
        "twitch": '"\\f1e8"',
        "ravelry": '"\\f2d9"',
        "mixer": '"\\e056"',
        "lastfm-square": '"\\f203"',
        "square-lastfm": '"\\f203"',
        "vimeo": '"\\f40a"',
        "mendeley": '"\\f7b3"',
        "uniregistry": '"\\f404"',
        "figma": '"\\f799"',
        "creative-commons-remix": '"\\f4ee"',
        "cc-amazon-pay": '"\\f42d"',
        "dropbox": '"\\f16b"',
        "instagram": '"\\f16d"',
        "cmplid": '"\\e360"',
        "facebook": '"\\f09a"',
        "gripfire": '"\\f3ac"',
        "jedi-order": '"\\f50e"',
        "uikit": '"\\f403"',
        "fort-awesome-alt": '"\\f3a3"',
        "phabricator": '"\\f3db"',
        "ussunnah": '"\\f407"',
        "earlybirds": '"\\f39a"',
        "trade-federation": '"\\f513"',
        "autoprefixer": '"\\f41c"',
        "whatsapp": '"\\f232"',
        "slideshare": '"\\f1e7"',
        "google-play": '"\\f3ab"',
        "viadeo": '"\\f2a9"',
        "line": '"\\f3c0"',
        "google-drive": '"\\f3aa"',
        "servicestack": '"\\f3ec"',
        "simplybuilt": '"\\f215"',
        "bitbucket": '"\\f171"',
        "imdb": '"\\f2d8"',
        "deezer": '"\\e077"',
        "raspberry-pi": '"\\f7bb"',
        "jira": '"\\f7b1"',
        "docker": '"\\f395"',
        "screenpal": '"\\e570"',
        "bluetooth": '"\\f293"',
        "gitter": '"\\f426"',
        "d-and-d": '"\\f38d"',
        "microblog": '"\\e01a"',
        "cc-diners-club": '"\\f24c"',
        "gg-circle": '"\\f261"',
        "pied-piper-hat": '"\\f4e5"',
        "kickstarter-k": '"\\f3bc"',
        "yandex": '"\\f413"',
        "readme": '"\\f4d5"',
        "html5": '"\\f13b"',
        "sellsy": '"\\f213"',
        "sass": '"\\f41e"',
        "wirsindhandwerk": '"\\e2d0"',
        "wsh": '"\\e2d0"',
        "buromobelexperte": '"\\f37f"',
        "salesforce": '"\\f83b"',
        "octopus-deploy": '"\\e082"',
        "medapps": '"\\f3c6"',
        "ns8": '"\\f3d5"',
        "pinterest-p": '"\\f231"',
        "apper": '"\\f371"',
        "fort-awesome": '"\\f286"',
        "waze": '"\\f83f"',
        "cc-jcb": '"\\f24b"',
        "snapchat-ghost": '"\\f2ab"',
        "snapchat": '"\\f2ab"',
        "fantasy-flight-games": '"\\f6dc"',
        "rust": '"\\e07a"',
        "wix": '"\\f5cf"',
        "behance-square": '"\\f1b5"',
        "square-behance": '"\\f1b5"',
        "supple": '"\\f3f9"',
        "rebel": '"\\f1d0"',
        "css3": '"\\f13c"',
        "staylinked": '"\\f3f5"',
        "kaggle": '"\\f5fa"',
        "space-awesome": '"\\e5ac"',
        "deviantart": '"\\f1bd"',
        "cpanel": '"\\f388"',
        "goodreads-g": '"\\f3a9"',
        "git-square": '"\\f1d2"',
        "square-git": '"\\f1d2"',
        "square-tumblr": '"\\f174"',
        "tumblr-square": '"\\f174"',
        "trello": '"\\f181"',
        "creative-commons-nc-jp": '"\\f4ea"',
        "get-pocket": '"\\f265"',
        "perbyte": '"\\e083"',
        "grunt": '"\\f3ad"',
        "weebly": '"\\f5cc"',
        "connectdevelop": '"\\f20e"',
        "leanpub": '"\\f212"',
        "black-tie": '"\\f27e"',
        "themeco": '"\\f5c6"',
        "python": '"\\f3e2"',
        "android": '"\\f17b"',
        "bots": '"\\e340"',
        "free-code-camp": '"\\f2c5"',
        "hornbill": '"\\f592"',
        "js": '"\\f3b8"',
        "ideal": '"\\e013"',
        "git": '"\\f1d3"',
        "dev": '"\\f6cc"',
        "sketch": '"\\f7c6"',
        "yandex-international": '"\\f414"',
        "cc-amex": '"\\f1f3"',
        "uber": '"\\f402"',
        "github": '"\\f09b"',
        "php": '"\\f457"',
        "alipay": '"\\f642"',
        "youtube": '"\\f167"',
        "skyatlas": '"\\f216"',
        "firefox-browser": '"\\e007"',
        "replyd": '"\\f3e6"',
        "suse": '"\\f7d6"',
        "jenkins": '"\\f3b6"',
        "twitter": '"\\f099"',
        "rockrms": '"\\f3e9"',
        "pinterest": '"\\f0d2"',
        "buffer": '"\\f837"',
        "npm": '"\\f3d4"',
        "yammer": '"\\f840"',
        "btc": '"\\f15a"',
        "dribbble": '"\\f17d"',
        "stumbleupon-circle": '"\\f1a3"',
        "internet-explorer": '"\\f26b"',
        "telegram-plane": '"\\f2c6"',
        "telegram": '"\\f2c6"',
        "old-republic": '"\\f510"',
        "square-whatsapp": '"\\f40c"',
        "whatsapp-square": '"\\f40c"',
        "node-js": '"\\f3d3"',
        "edge-legacy": '"\\e078"',
        "slack-hash": '"\\f198"',
        "slack": '"\\f198"',
        "medrt": '"\\f3c8"',
        "usb": '"\\f287"',
        "tumblr": '"\\f173"',
        "vaadin": '"\\f408"',
        "quora": '"\\f2c4"',
        "reacteurope": '"\\f75d"',
        "medium-m": '"\\f23a"',
        "medium": '"\\f23a"',
        "amilia": '"\\f36d"',
        "mixcloud": '"\\f289"',
        "flipboard": '"\\f44d"',
        "viacoin": '"\\f237"',
        "critical-role": '"\\f6c9"',
        "sitrox": '"\\e44a"',
        "discourse": '"\\f393"',
        "joomla": '"\\f1aa"',
        "mastodon": '"\\f4f6"',
        "airbnb": '"\\f834"',
        "wolf-pack-battalion": '"\\f514"',
        "buy-n-large": '"\\f8a6"',
        "gulp": '"\\f3ae"',
        "creative-commons-sampling-plus": '"\\f4f1"',
        "strava": '"\\f428"',
        "ember": '"\\f423"',
        "canadian-maple-leaf": '"\\f785"',
        "teamspeak": '"\\f4f9"',
        "pushed": '"\\f3e1"',
        "wordpress-simple": '"\\f411"',
        "nutritionix": '"\\f3d6"',
        "wodu": '"\\e088"',
        "google-pay": '"\\e079"',
        "intercom": '"\\f7af"',
        "zhihu": '"\\f63f"',
        "korvue": '"\\f42f"',
        "pix": '"\\e43a"',
        "steam-symbol": '"\\f3f6"',
    };
    static getIcon(name) {
        if (this.iconList[name]) {
            return this.iconList[name];
        }
        throw "Can't found the icon " + name;
    }
}

class Icon extends Aventus.WebComponent {
    static get observedAttributes() {return ["icon"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'icon'() {
                    return this.getAttribute('icon');
                }
                set 'icon'(val) {
                    if(val === undefined || val === null){this.removeAttribute('icon')}
                    else{this.setAttribute('icon',val)}
                }    static isFirstIcon = true;
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("icon", ((target) => {
    if (target.icon) {
        target.spanEl.style.setProperty("--icon-code", IconLib.getIcon(target.icon));
    }
})); }
    static __style = `:host span{display:var(--fa-display, inline-block);font-family:"Font Awesome 6 Free";-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-style:normal;font-variant:normal;font-weight:900;line-height:1;text-rendering:auto}:host span:before{content:var(--icon-code)}`;
    constructor() {        super();        if(Icon.isFirstIcon) {            Icon.isFirstIcon = false;            let tagEl = document.createElement("STYLE");            tagEl.innerHTML = `@font-face {	font-family: "Font Awesome 6 Free";	font-style: normal;	font-weight: 900;	font-display: block;	src: url(https://ka-f.fontawesome.com/releases/v6.2.1/webfonts/free-fa-solid-900.woff2) format("woff2"),		url(https://ka-f.fontawesome.com/releases/v6.2.1/webfonts/free-fa-solid-900.ttf) format("truetype");}`;            document.head.appendChild(tagEl);        }    }
    __getStatic() {
        return Icon;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Icon.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<span _id="icon_0"></span>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "spanEl",
      "ids": [
        "icon_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "Icon";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('icon')){ this['icon'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('icon'); }
}
window.customElements.define('av-icon', Icon);Aventus.WebComponentInstance.registerDefinition(Icon);

class Footer extends Aventus.WebComponent {
    static __style = `:host{background-color:var(--primary-color);display:block;height:50px;width:100%}:host .container{align-items:center;color:var(--secondary-color);display:flex;height:100%;justify-content:space-between;margin:auto;max-width:1000px;font-size:14px;padding:0 20px}:host .container div{text-align:center}`;
    __getStatic() {
        return Footer;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Footer.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="container">    <div class="release">Released under the MIT License.</div>    <div class="copy">Copyright © 2023 Cobwebsite</div></div>` }
    });
}
    getClassName() {
        return "Footer";
    }
}
window.customElements.define('av-footer', Footer);Aventus.WebComponentInstance.registerDefinition(Footer);

class Collapse extends Aventus.WebComponent {
    get 'open'() {
                return this.hasAttribute('open');
            }
            set 'open'(val) {
                val = this.getBoolean(val);
                if (val) {
                    this.setAttribute('open', 'true');
                } else{
                    this.removeAttribute('open');
                }
            }    static __style = `:host .title{cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host .collapse{display:grid;grid-template-rows:0fr;transition:.5s var(--bezier-curve) grid-template-rows}:host .collapse .content{overflow:hidden}:host([open]) .collapse{grid-template-rows:1fr}`;
    __getStatic() {
        return Collapse;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Collapse.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'header':`<slot name="header"></slot>`,'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="title" _id="collapse_0">    <slot name="header"></slot></div><div class="collapse">    <div class="content">        <slot></slot>    </div></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "pressEvents": [
    {
      "id": "collapse_0",
      "onPress": (e, pressInstance, c) => { c.component.toggleOpen(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "Collapse";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('open')) { this.attributeChangedCallback('open', false, false); } }
    __listBoolProps() { return ["open"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    toggleOpen() {
        this.open = !this.open;
    }
}
window.customElements.define('av-collapse', Collapse);Aventus.WebComponentInstance.registerDefinition(Collapse);

class Button extends Aventus.WebComponent {
    static __style = `:host{padding:10px 20px;color:var(--primary-color);background-color:var(--aventus-color);border-radius:10px;transition:all var(--bezier-curve) .5s;cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host(:hover){color:var(--aventus-color);background-color:var(--secondary-color)}`;
    __getStatic() {
        return Button;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Button.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "Button";
    }
}
window.customElements.define('av-button', Button);Aventus.WebComponentInstance.registerDefinition(Button);

class App extends Aventus.Navigation.Router {
    static __style = `:host{display:flex;flex-direction:column;font-size:1.6rem;height:100%;width:100%}:host .content{height:calc(100% - 50px);width:100%}`;
    __getStatic() {
        return App;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(App.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'before':`		<av-navbar></av-navbar>	` }
    });
}
    getClassName() {
        return "App";
    }
    defineRoutes() {
        this.addRoute("/", Home);
        this.addRoute("/about", About);
        this.addRoute("^/docs/.*$", DocPage);
        this.addRoute("^/tutorial/.*$", TutorialPage);
    }
    error404(state) {
        return Page404;
    }
}
window.customElements.define('av-app', App);Aventus.WebComponentInstance.registerDefinition(App);

class DocAdvancedTemplate extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocAdvancedTemplate;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocAdvancedTemplate.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Advanced - Template</h1><p>Because you will create some amazing components or patterns with Aventus, the framework includes a way to generate    files based on templates. For example, when you create a project with Tailwind, all your webcomponents must inherit    from a base component that contains the Tailwind style. This will be the example for this section.</p><h2>Setup for the example</h2><p>First of all you need to create a new empty project.</p><av-code language="json" filename="aventus.conf.avt">    {    \t"module": "Tailwind",    \t"componentPrefix": "av",    \t"build": [    \t\t{    \t\t\t"name": "Main",    \t\t\t"inputPath": [    \t\t\t\t"./src/*"    \t\t\t],    \t\t\t"outputFile": "./dist/tailwind.js"    \t\t}    \t]    }</av-code></av-code><p>With the following structure:</p><ul>    <li>/dist/</li>    <li>/src/</li>    <li>aventus.conf.avt</li></ul><p>    Now inside the src folder, you can create a new component named <span class="cn">Tailwind</span>. For the example, we will leave the    files created empty.</p><h2>Creating a template</h2><p>You can create the following folder inside your workspace <span class="cn">/.aventus/templates/</span>. This is where all your    templates will be stored. This folder must be at your workspace root, otherwise it will not work.</p><p>You can create a new folder named <span class="cn">TailwindTemplate</span> inside ./aventus/templates/. and inside this new folder,    you    can add a file named <span class="cn">template.avt</span>. This file define which questions must be asked to the user. In the example    we need to know the component name.</p><av-code language="json" filename="template.avt">    {    \t"name": "Tailwind Template",    \t"description": "Create a tailwind component",    \t"version": "1.0.0",    \t"variables": {    \t\t"componentName":{    \t\t\t"question": "Provide a name for your component",    \t\t\t"type": "input"    \t\t}    \t}    }</av-code></av-code><p>The variable componentName will be now available inside the template creation flow. Every files at the same depth or    deeper than the template.avt will be copied when template is called. We can now create template files    : </p><ul>    <li>/.aventus/template/TailwindTemplate/&#36;&#123;&#123;componentName&#125;&#125;</li>    <li>/.aventus/template/TailwindTemplate/&#36;&#123;&#123;componentName&#125;&#125;/&#36;&#123;&#123;componentName&#125;&#125;.wcl.avt</li>    <li>/.aventus/template/TailwindTemplate/&#36;&#123;&#123;componentName&#125;&#125;/&#36;&#123;&#123;componentName&#125;&#125;.wcs.avt</li>    <li>/.aventus/template/TailwindTemplate/&#36;&#123;&#123;componentName&#125;&#125;/&#36;&#123;&#123;componentName&#125;&#125;.wcv.avt</li></ul><av-code language="typescript" filename="&#36;&#123;&#123;componentName&#125;&#125;.wcv.avt">    import { Tailwind } from "../Tailwind/Tailwind.wcl.avt";    &nbsp;    export class &#36;&#123;&#123;componentName&#125;&#125; extends Tailwind implements Aventus.DefaultComponent {    &nbsp;    \t//#region static    &nbsp;    \t//#endregion    &nbsp;    &nbsp;    \t//#region props    &nbsp;    \t//#endregion    &nbsp;    &nbsp;    \t//#region variables    &nbsp;    \t//#endregion    &nbsp;    &nbsp;    \t//#region constructor    &nbsp;    \t//#endregion    &nbsp;    &nbsp;    \t//#region methods    &nbsp;    \t//#endregion    &nbsp;    }</av-code></av-code><av-code language="css" filename="&#36;&#123;&#123;componentName&#125;&#125;.wcs.avt">    :host {}</av-code></av-code><av-code language="html" filename="&#36;&#123;&#123;componentName&#125;&#125;.wcv.avt">    &lt;slot&gt;&lt;/slot&gt;</av-code></av-code><p>Every &#36;&#123;&#123;componentName&#125;&#125; will be replaced by the user answer.</p><h2>Using the template</h2><p>Now if you right click on the src folder and click on <span class="cn">Aventus : Create...</span>. You can choose the option    <span class="cn">Custom</span>. Inside the next dropdown, the option <span class="cn">Tailwind Template</span> must be available.</p><av-img src="/img/doc/advanced/template/tailwind-template.png"></av-img><p>If you click on it, a prompt will ask you the new component name. If you fill it with <span class="cn">NewComp</span> and press enter,    3 new files will be created.</p><av-img src="/img/doc/advanced/template/tailwind-template-created.png"></av-img><h2>Predefined variables</h2><p>Aventus add predefined variables that you can use inside your template.</p><div class="table">    <av-dynamic-row class="header">        <av-dynamic-col size="4" center>Name</av-dynamic-col>        <av-dynamic-col size="8" center>Description</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>path</av-dynamic-col>        <av-dynamic-col size="8" center>The full path of the folder where the user right click.</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>folderName</av-dynamic-col>        <av-dynamic-col size="8" center>The folder name where the user right click.</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>namespace</av-dynamic-col>        <av-dynamic-col size="8" center>The namespace that the path will have based on the namespace            strategy.</av-dynamic-col>    </av-dynamic-row></div><h2>Optimize user experience</h2><p>    Until now, when you use the template, nothing is controlled and nothing notice the user that the creation is over.    We will add some check on the input and open the *.wcl.avt. To do that, open the <span class="cn">template.avt</span> and remplace    the content like that.</p><av-code language="json" filename="template.avt">    {    \t"name": "Tailwind Template",    \t"description": "Create a tailwind component",    \t"version": "1.0.0",    \t"variables": {    \t\t"componentName":{    \t\t\t"question": "Provide a name for your component",    \t\t\t"type": "input",    \t\t\t"validation": [    \t\t\t\t{    \t\t\t\t\t"pattern": "[A-Z][A-Za-z0-9]+",    \t\t\t\t\t"errorMsg": "Provide a valide component name"    \t\t\t\t}    \t\t\t]    \t\t}    \t},    \t"filesToOpen": [    \t\t"/&#36;&#123;&#123;componentName&#125;&#125;.wcl.avt$/"    \t]    }</av-code></av-code><p>The <span class="cn">validation</span> field allows you to validate the input with a regex (<span class="cn">pattern</span>) and display a message if the check failed (<span class="cn">errorMsg</span>). The <span class="cn">filesToOpen</span> field allows you to open a file after the creation of your template. The value of filesToOpen items must be the following.</p><ul>    <li>Starts and ends with a <span class="cn">/</span> : this is a regex</li>    <li>Otherwise: this is a path comparison</li></ul><h2>Expose the template globaly</h2><p>    To use a template across multiple project, you can expose your template globaly. To complete that, you must run the command <span class="cn">Aventus : Open storage</span> and go inside the folder <span class="cn">templates</span>. Then you can copy paste the previous template here. Notice: Aventus watch the global templates folder only during starting process, so when you create a new global template, you must reload your Vscode instance.</p><h2>Project</h2><p>    In the previous section, you open the Aventus storage folder, you may have noticed that a <span class="cn">projects</span> exists. Inside this folder, you can find templates that will be used when you <span class="cn">init a new project</span>. So can you create your own template to init new project or download some from the web. You must know that if a <span class="cn">aventus.conf.avt</span> file is at the same level of a <span class="cn">template.avt</span> file, the project will not be created. It means no autocompletion, no output files, etc.</p><p>    Because in most of the case, the project creation involves to run commands, you can add inside your template file a field named <span class="cn">cmdsAfter</span> and add which commands must be ran after the creation.</p><av-code language="json" filename="template.avt">    {    \t...    \t"cmdsAfter": ["npm run install"]    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocAdvancedTemplate";
    }
}
window.customElements.define('av-doc-advanced-template', DocAdvancedTemplate);Aventus.WebComponentInstance.registerDefinition(DocAdvancedTemplate);

class TutorialCreateApp extends TutorialGenericPage {
    static __style = ``;
    __getStatic() {
        return TutorialCreateApp;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TutorialCreateApp.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Create app</h1><p>To simplify application management, for this example we will create a new <span class="cn">App</span> webcomponent that will be the application entry point. Over the folder <span class="cn">components</span> you can right click and select <span class="cn">Aventus : Create...</span>.</p><av-img src="/img/tuto/app/create.png"></av-img><p>Then you can select <span class="cn">Component</span></p><av-img src="/img/tuto/app/component.png"></av-img><p>Fill the component name with <span class="cn">App</span></p><av-img src="/img/tuto/app/name.png"></av-img><p>Select single file.</p><av-img src="/img/tuto/app/single.png"></av-img><p>A new file is created named <span class="cn">App.wc.avt</span>. This file will generate a webcomponent with the tag <span class="cn">&lt;td-app&gt;</span>. Inside this tag you can replace the content of the <span class="cn">&lt;slot&gt;&lt;/slot&gt;</span> with <span class="cn">&lt;h1&gt;Todo&lt;/h1&gt;</span></p><av-img src="/img/tuto/app/view.png"></av-img><p>Now we can replace <span class="cn">&lt;h1&gt;Todo&lt;/h1&gt;</span> inside the <span class="cn">index.html</span> by <span class="cn">&lt;td-app&gt;&lt;/td-app&gt;</span></p><av-code language="html" filename="index.html">    &lt;!DOCTYPE html&gt;    &lt;html lang="en"&gt;    &nbsp;    \t&lt;head&gt;    \t\t&lt;meta charset="UTF-8"&gt;    \t\t&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;    \t\t&lt;title&gt;Todo demo&lt;/title&gt;    \t\t&lt;script src="/todo.js"&gt;&lt;/script&gt;    \t&lt;/head&gt;    &nbsp;    \t&lt;body&gt;    \t\t&lt;td-app&gt;&lt;/td-app&gt;    \t&lt;/body&gt;    &nbsp;    &lt;/html&gt;</av-code></av-code><p>You can reload the page in your browser and open the <span class="cn">dev tools</span>. The html should be like this.</p><av-img src="/img/tuto/app/console.png"></av-img><p>You can notice that the tag <span class="cn">td-app</span> contains a <span class="cn"><a href="https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot" target="_blank">shadowroot</a></span> that contains a <span class="cn">&lt;h1&gt;</span></p>` }
    });
}
    getClassName() {
        return "TutorialCreateApp";
    }
}
window.customElements.define('av-tutorial-create-app', TutorialCreateApp);Aventus.WebComponentInstance.registerDefinition(TutorialCreateApp);
TutorialFooter.Namespace='AventusWebsite';
AventusWebsite.TutorialFooter=TutorialFooter;
TutorialApp.Namespace='AventusWebsite';
AventusWebsite.TutorialApp=TutorialApp;
TutorialSidenav.Namespace='AventusWebsite';
AventusWebsite.TutorialSidenav=TutorialSidenav;
DocLibDragAndDropExample.Namespace='AventusWebsite';
AventusWebsite.DocLibDragAndDropExample=DocLibDragAndDropExample;
DocIntroductionButton.Namespace='AventusWebsite';
AventusWebsite.DocIntroductionButton=DocIntroductionButton;
DocFooter.Namespace='AventusWebsite';
AventusWebsite.DocFooter=DocFooter;
DocApp.Namespace='AventusWebsite';
AventusWebsite.DocApp=DocApp;
DocSidenav.Namespace='AventusWebsite';
AventusWebsite.DocSidenav=DocSidenav;
Tabs.Namespace='AventusWebsite';
AventusWebsite.Tabs=Tabs;
RoadMapItem.Namespace='AventusWebsite';
AventusWebsite.RoadMapItem=RoadMapItem;
RoadMap.Namespace='AventusWebsite';
AventusWebsite.RoadMap=RoadMap;
Result.Namespace='AventusWebsite';
AventusWebsite.Result=Result;
Page.Namespace='AventusWebsite';
AventusWebsite.Page=Page;
TutorialPage.Namespace='AventusWebsite';
AventusWebsite.TutorialPage=TutorialPage;
TutorialGenericPage.Namespace='AventusWebsite';
AventusWebsite.TutorialGenericPage=TutorialGenericPage;
TutorialStyle.Namespace='AventusWebsite';
AventusWebsite.TutorialStyle=TutorialStyle;
TutorialRam.Namespace='AventusWebsite';
AventusWebsite.TutorialRam=TutorialRam;
TutorialList.Namespace='AventusWebsite';
AventusWebsite.TutorialList=TutorialList;
TutorialIntroduction.Namespace='AventusWebsite';
AventusWebsite.TutorialIntroduction=TutorialIntroduction;
TutorialInit.Namespace='AventusWebsite';
AventusWebsite.TutorialInit=TutorialInit;
TutorialForm.Namespace='AventusWebsite';
AventusWebsite.TutorialForm=TutorialForm;
TutorialData.Namespace='AventusWebsite';
AventusWebsite.TutorialData=TutorialData;
Page404.Namespace='AventusWebsite';
AventusWebsite.Page404=Page404;
Home.Namespace='AventusWebsite';
AventusWebsite.Home=Home;
DocGenericPage.Namespace='AventusWebsite';
AventusWebsite.DocGenericPage=DocGenericPage;
DocWcWatch.Namespace='AventusWebsite';
AventusWebsite.DocWcWatch=DocWcWatch;
DocWcStyle.Namespace='AventusWebsite';
AventusWebsite.DocWcStyle=DocWcStyle;
DocWcState.Namespace='AventusWebsite';
AventusWebsite.DocWcState=DocWcState;
DocWcProperty.Namespace='AventusWebsite';
AventusWebsite.DocWcProperty=DocWcProperty;
DocWcLoop.Namespace='AventusWebsite';
AventusWebsite.DocWcLoop=DocWcLoop;
DocWcInterpolation.Namespace='AventusWebsite';
AventusWebsite.DocWcInterpolation=DocWcInterpolation;
DocWcInjection.Namespace='AventusWebsite';
AventusWebsite.DocWcInjection=DocWcInjection;
DocWcInheritance.Namespace='AventusWebsite';
AventusWebsite.DocWcInheritance=DocWcInheritance;
DocWcEvent.Namespace='AventusWebsite';
AventusWebsite.DocWcEvent=DocWcEvent;
DocWcElement.Namespace='AventusWebsite';
AventusWebsite.DocWcElement=DocWcElement;
DocWcCreate.Namespace='AventusWebsite';
AventusWebsite.DocWcCreate=DocWcCreate;
DocWcBinding.Namespace='AventusWebsite';
AventusWebsite.DocWcBinding=DocWcBinding;
DocWcAttribute.Namespace='AventusWebsite';
AventusWebsite.DocWcAttribute=DocWcAttribute;
DocStateListen.Namespace='AventusWebsite';
AventusWebsite.DocStateListen=DocStateListen;
DocStateCreate.Namespace='AventusWebsite';
AventusWebsite.DocStateCreate=DocStateCreate;
DocStateChange.Namespace='AventusWebsite';
AventusWebsite.DocStateChange=DocStateChange;
DocSocketSend.Namespace='AventusWebsite';
AventusWebsite.DocSocketSend=DocSocketSend;
DocSocketReceive.Namespace='AventusWebsite';
AventusWebsite.DocSocketReceive=DocSocketReceive;
DocSocketCreate.Namespace='AventusWebsite';
AventusWebsite.DocSocketCreate=DocSocketCreate;
DocRamMixin.Namespace='AventusWebsite';
AventusWebsite.DocRamMixin=DocRamMixin;
DocRamListenChanges.Namespace='AventusWebsite';
AventusWebsite.DocRamListenChanges=DocRamListenChanges;
DocRamCrud.Namespace='AventusWebsite';
AventusWebsite.DocRamCrud=DocRamCrud;
DocRamCreate.Namespace='AventusWebsite';
AventusWebsite.DocRamCreate=DocRamCreate;
DocLibWatcher.Namespace='AventusWebsite';
AventusWebsite.DocLibWatcher=DocLibWatcher;
DocLibTools.Namespace='AventusWebsite';
AventusWebsite.DocLibTools=DocLibTools;
DocLibResourceLoader.Namespace='AventusWebsite';
AventusWebsite.DocLibResourceLoader=DocLibResourceLoader;
DocLibResizeObserver.Namespace='AventusWebsite';
AventusWebsite.DocLibResizeObserver=DocLibResizeObserver;
DocLibPressManager.Namespace='AventusWebsite';
AventusWebsite.DocLibPressManager=DocLibPressManager;
DocLibInstance.Namespace='AventusWebsite';
AventusWebsite.DocLibInstance=DocLibInstance;
DocLibDragAndDrop.Namespace='AventusWebsite';
AventusWebsite.DocLibDragAndDrop=DocLibDragAndDrop;
DocLibCreate.Namespace='AventusWebsite';
AventusWebsite.DocLibCreate=DocLibCreate;
DocLibCallback.Namespace='AventusWebsite';
AventusWebsite.DocLibCallback=DocLibCallback;
DocLibAnimation.Namespace='AventusWebsite';
AventusWebsite.DocLibAnimation=DocLibAnimation;
DocIntroduction.Namespace='AventusWebsite';
AventusWebsite.DocIntroduction=DocIntroduction;
DocInstallation.Namespace='AventusWebsite';
AventusWebsite.DocInstallation=DocInstallation;
DocFirstApp.Namespace='AventusWebsite';
AventusWebsite.DocFirstApp=DocFirstApp;
DocExperience.Namespace='AventusWebsite';
AventusWebsite.DocExperience=DocExperience;
DocDataCreate.Namespace='AventusWebsite';
AventusWebsite.DocDataCreate=DocDataCreate;
DocConfigStatic.Namespace='AventusWebsite';
AventusWebsite.DocConfigStatic=DocConfigStatic;
DocConfigLib.Namespace='AventusWebsite';
AventusWebsite.DocConfigLib=DocConfigLib;
DocConfigBuild.Namespace='AventusWebsite';
AventusWebsite.DocConfigBuild=DocConfigBuild;
DocConfigBasic.Namespace='AventusWebsite';
AventusWebsite.DocConfigBasic=DocConfigBasic;
DocPage.Namespace='AventusWebsite';
AventusWebsite.DocPage=DocPage;
About.Namespace='AventusWebsite';
AventusWebsite.About=About;
Navbar.Namespace='AventusWebsite';
AventusWebsite.Navbar=Navbar;
AvCode.Namespace='AventusWebsite';
AventusWebsite.AvCode=AvCode;
IconLib.Namespace='AventusWebsite';
AventusWebsite.IconLib=IconLib;
Icon.Namespace='AventusWebsite';
AventusWebsite.Icon=Icon;
Footer.Namespace='AventusWebsite';
AventusWebsite.Footer=Footer;
Collapse.Namespace='AventusWebsite';
AventusWebsite.Collapse=Collapse;
Button.Namespace='AventusWebsite';
AventusWebsite.Button=Button;
App.Namespace='AventusWebsite';
AventusWebsite.App=App;
DocAdvancedTemplate.Namespace='AventusWebsite';
AventusWebsite.DocAdvancedTemplate=DocAdvancedTemplate;
TutorialCreateApp.Namespace='AventusWebsite';
AventusWebsite.TutorialCreateApp=TutorialCreateApp;
})(AventusWebsite);
