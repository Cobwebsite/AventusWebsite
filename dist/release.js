Object.defineProperty(window, "AvInstance", {
	get() {return Aventus.Instance;}
})
var Aventus;
(Aventus||(Aventus = {}));
(function (Aventus) {
const moduleName = `Aventus`;

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

class StateManager {
    subscribers = {};
    static canBeActivate(statePattern, stateName) {
        let stateInfo = this.prepareStateString(statePattern);
        return stateInfo.regex.test(stateName);
    }
    activeState;
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
})(Aventus);

var Aventus;
(Aventus||(Aventus = {}));
(function (Aventus) {
const moduleName = `Aventus`;

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
Img.Namespace='Aventus';
Aventus.Img=Img;
})(Aventus);

var AventusWebsite;
(AventusWebsite||(AventusWebsite = {}));
(function (AventusWebsite) {
const moduleName = `AventusWebsite`;


class Countdown extends Aventus.WebComponent {
    static get observedAttributes() {return ["nb_days", "nb_hours", "nb_minutes", "nb_seconds"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'nb_days'() {
                    return Number(this.getAttribute('nb_days'));
                }
                set 'nb_days'(val) {
                    if(val === undefined || val === null){this.removeAttribute('nb_days')}
                    else{this.setAttribute('nb_days',val)}
                }get 'nb_hours'() {
                    return Number(this.getAttribute('nb_hours'));
                }
                set 'nb_hours'(val) {
                    if(val === undefined || val === null){this.removeAttribute('nb_hours')}
                    else{this.setAttribute('nb_hours',val)}
                }get 'nb_minutes'() {
                    return Number(this.getAttribute('nb_minutes'));
                }
                set 'nb_minutes'(val) {
                    if(val === undefined || val === null){this.removeAttribute('nb_minutes')}
                    else{this.setAttribute('nb_minutes',val)}
                }get 'nb_seconds'() {
                    return Number(this.getAttribute('nb_seconds'));
                }
                set 'nb_seconds'(val) {
                    if(val === undefined || val === null){this.removeAttribute('nb_seconds')}
                    else{this.setAttribute('nb_seconds',val)}
                }    rDate = new Date('2023-06-16T10:00:00.000Z');
    static __style = `:host{height:100%;overflow:hidden;position:relative;width:100%}:host .info{align-items:center;background-color:var(--primary-color);display:flex;flex-direction:column;font-size:25px;height:100%;justify-content:center;padding:16px;width:100%;z-index:9999}:host h1{color:var(--aventus-color);z-index:9999;text-align:center}:host .row{align-items:center;display:flex;flex-wrap:wrap;gap:10px;justify-content:center;z-index:9999}:host .row .row-split{display:flex;gap:10px}:host .row .row-split .square{align-items:center;background-color:var(--light-primary-color);color:var(--aventus-color);display:flex;font-size:25px;font-weight:bold;height:100px;justify-content:center;width:100px}:host av-img{--img-color: rgb(200, 200, 200);height:150%;left:-200px;opacity:.1;pointer-events:none;position:absolute;top:-25px;z-index:1}:host av-img:last-child{left:auto;right:-200px;top:30px;transform:rotate(180deg)}@media screen and (max-width: 1100px){:host av-img{left:-50%;top:25%}:host av-img:last-child{right:-50%;top:-75%}}`;
    __getStatic() {
        return Countdown;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Countdown.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="info">    <h1>Beta release on 16th June</h1>    <div class="row">        <div class="row-split">            <div class="square" _id="countdown_0"></div>            <div class="square" _id="countdown_1"></div>        </div>        <div class="row-split">            <div class="square" _id="countdown_2"></div>            <div class="square" _id="countdown_3"></div>        </div>    </div></div><av-img src="/img/logo.svg"></av-img><av-img src="/img/logo.svg"></av-img>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "nb_days": [
      {
        "id": "countdown_0",
        "attrName": "@HTML",
        "render": (c) => `${c.nb_days}d`
      }
    ],
    "nb_hours": [
      {
        "id": "countdown_1",
        "attrName": "@HTML",
        "render": (c) => `${c.nb_hours}h`
      }
    ],
    "nb_minutes": [
      {
        "id": "countdown_2",
        "attrName": "@HTML",
        "render": (c) => `${c.nb_minutes}m`
      }
    ],
    "nb_seconds": [
      {
        "id": "countdown_3",
        "attrName": "@HTML",
        "render": (c) => `${c.nb_seconds}s`
      }
    ]
  }
});this.__getStatic().__template.setSchema({globals:["nb_days","nb_hours","nb_minutes","nb_seconds"]}); }
    getClassName() {
        return "Countdown";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('nb_days')){ this['nb_days'] = undefined; }if(!this.hasAttribute('nb_hours')){ this['nb_hours'] = undefined; }if(!this.hasAttribute('nb_minutes')){ this['nb_minutes'] = undefined; }if(!this.hasAttribute('nb_seconds')){ this['nb_seconds'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('nb_days');this.__upgradeProperty('nb_hours');this.__upgradeProperty('nb_minutes');this.__upgradeProperty('nb_seconds'); }
    change() {
        let now = new Date();
        var delta = Math.abs(this.rDate.getTime() - now.getTime()) / 1000;
        // calculate (and subtract) whole days
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;
        // calculate (and subtract) whole hours
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        // calculate (and subtract) whole minutes
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        // what's left is seconds
        var seconds = Math.floor(delta % 60);
        this.nb_days = days;
        this.nb_hours = hours;
        this.nb_minutes = minutes;
        this.nb_seconds = seconds;
    }
    postCreation() {
        this.change();
        setInterval(() => {
            this.change();
        }, 1000);
    }
}
window.customElements.define('av-countdown', Countdown);Aventus.WebComponentInstance.registerDefinition(Countdown);
Countdown.Namespace='AventusWebsite';
AventusWebsite.Countdown=Countdown;
})(AventusWebsite);
