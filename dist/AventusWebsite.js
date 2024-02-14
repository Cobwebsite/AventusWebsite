var npmCompilation;
(npmCompilation||(npmCompilation = {}));
(function (npmCompilation) {
	var _ = (function () {
	'use strict';

	var FileSaver_min = {exports: {}};

	(function (module, exports) {
		(function(a,b){b();})(this,function(){function b(a,b){return "undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c);},d.onerror=function(){console.error("could not download file");},d.send();}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send();}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"));}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b);}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href);},4E4),setTimeout(function(){e(j);},0));}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else {var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i);});}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null;},k.readAsDataURL(b);}else {var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m);},4E4);}});f.saveAs=g.saveAs=g,(module.exports=g);});

		
	} (FileSaver_min));

	var FileSaver_minExports = FileSaver_min.exports;

	var _virtual_index = { saveAs: FileSaver_minExports.saveAs };

	return _virtual_index;

})();


	npmCompilation['c940c285ff5c6f70f9e3538ac79e1aec'] = {};
npmCompilation['c940c285ff5c6f70f9e3538ac79e1aec']['saveAs'] = _['saveAs'];

})(npmCompilation);
Object.defineProperty(window, "AvInstance", {
	get() {return Aventus.Instance;}
})
var Aventus;
(Aventus||(Aventus = {}));
(function (Aventus) {
const moduleName = `Aventus`;
const _ = {};


let _n;
const sleep=function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

_.sleep=sleep;
var WatchAction;
(function (WatchAction) {
    WatchAction[WatchAction["CREATED"] = 0] = "CREATED";
    WatchAction[WatchAction["UPDATED"] = 1] = "UPDATED";
    WatchAction[WatchAction["DELETED"] = 2] = "DELETED";
})(WatchAction || (WatchAction = {}));

_.WatchAction=WatchAction;
const compareObject=function compareObject(obj1, obj2) {
    if (Array.isArray(obj1)) {
        if (!Array.isArray(obj2)) {
            return false;
        }
        obj2 = obj2.slice();
        if (obj1.length !== obj2.length) {
            return false;
        }
        for (let i = 0; i < obj1.length; i++) {
            let foundElement = false;
            for (let j = 0; j < obj2.length; j++) {
                if (compareObject(obj1[i], obj2[j])) {
                    obj2.splice(j, 1);
                    foundElement = true;
                    break;
                }
            }
            if (!foundElement) {
                return false;
            }
        }
        return true;
    }
    else if (obj1 instanceof Date) {
        return obj1.toString() === obj2.toString();
    }
    else if (typeof obj1 === 'object' && obj1 !== undefined && obj1 !== null) {
        if (typeof obj2 !== 'object' || obj2 === undefined || obj2 === null) {
            return false;
        }
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }
        for (let key in obj1) {
            if (!(key in obj2)) {
                return false;
            }
            if (!compareObject(obj1[key], obj2[key])) {
                return false;
            }
        }
        return true;
    }
    else {
        return obj1 === obj2;
    }
}

_.compareObject=compareObject;
const setValueToObject=function setValueToObject(path, obj, value) {
    path = path.replace(/\[(.*?)\]/g, '.$1');
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

_.setValueToObject=setValueToObject;
const getValueFromObject=function getValueFromObject(path, obj) {
    path = path.replace(/\[(.*?)\]/g, '.$1');
    if (path == "") {
        return obj;
    }
    let splitted = path.split(".");
    for (let i = 0; i < splitted.length - 1; i++) {
        let split = splitted[i];
        if (!obj[split] || typeof obj[split] !== 'object') {
            return undefined;
        }
        obj = obj[split];
    }
    if (!obj || typeof obj !== 'object') {
        return undefined;
    }
    return obj[splitted[splitted.length - 1]];
}

_.getValueFromObject=getValueFromObject;
const ElementExtension=class ElementExtension {
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
    static getElementsInSlot(element, slotName) {
        let result = [];
        if (element.shadowRoot) {
            let slotEl;
            if (slotName) {
                slotEl = element.shadowRoot.querySelector('slot[name="' + slotName + '"]');
            }
            else {
                slotEl = element.shadowRoot.querySelector("slot:not([name])");
                if (!slotEl) {
                    slotEl = element.shadowRoot.querySelector("slot");
                }
            }
            while (true) {
                if (!slotEl) {
                    return result;
                }
                var listChild = Array.from(slotEl.assignedElements());
                if (!listChild) {
                    return result;
                }
                let slotFound = false;
                for (let i = 0; i < listChild.length; i++) {
                    let child = listChild[i];
                    if (listChild[i].nodeName == "SLOT") {
                        slotEl = listChild[i];
                        slotFound = true;
                    }
                    else if (child instanceof HTMLElement) {
                        result.push(child);
                    }
                }
                if (!slotFound) {
                    return result;
                }
            }
        }
        return result;
    }
    /**
     * Get deeper element inside dom at the position X and Y
     */
    static getElementAtPosition(x, y, startFrom) {
        var _realTarget = (el, i = 0) => {
            if (i == 50) {
                debugger;
            }
            if (el.shadowRoot && x !== undefined && y !== undefined) {
                var newEl = el.shadowRoot.elementFromPoint(x, y);
                if (newEl && newEl != el && el.shadowRoot.contains(newEl)) {
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
ElementExtension.Namespace=`${moduleName}`;
_.ElementExtension=ElementExtension;
const Instance=class Instance {
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
Instance.Namespace=`${moduleName}`;
_.Instance=Instance;
const Style=class Style {
    static instance;
    static noAnimation;
    static defaultStyleSheets = {
        "@default": `:host{display:inline-block;box-sizing:border-box}:host *{box-sizing:border-box}`,
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
        Style.noAnimation = new CSSStyleSheet();
        Style.noAnimation.replaceSync(`:host{-webkit-transition: none !important;-moz-transition: none !important;-ms-transition: none !important;-o-transition: none !important;transition: none !important;}:host *{-webkit-transition: none !important;-moz-transition: none !important;-ms-transition: none !important;-o-transition: none !important;transition: none !important;}`);
    }
    stylesheets = new Map();
    async load(name, url) {
        try {
            let style = this.stylesheets.get(name);
            if (!style || style.cssRules.length == 0) {
                let txt = await (await fetch(url)).text();
                this.store(name, txt);
            }
        }
        catch (e) {
        }
    }
    store(name, content) {
        let style = this.stylesheets.get(name);
        if (!style) {
            const sheet = new CSSStyleSheet();
            sheet.replaceSync(content);
            this.stylesheets.set(name, sheet);
            return sheet;
        }
        else {
            style.replaceSync(content);
            return style;
        }
    }
    get(name) {
        let style = this.stylesheets.get(name);
        if (!style) {
            style = this.store(name, "");
        }
        return style;
    }
}
Style.Namespace=`${moduleName}`;
_.Style=Style;
const Callback=class Callback {
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
        let cbs = [...this.callbacks];
        for (let cb of cbs) {
            result.push(cb.apply(null, args));
        }
        return result;
    }
}
Callback.Namespace=`${moduleName}`;
_.Callback=Callback;
const Mutex=class Mutex {
    waitingList = [];
    isLocked = false;
    /**
     * Wait the mutex to be free then get it
     */
    waitOne() {
        return new Promise((resolve) => {
            if (this.isLocked) {
                this.waitingList.push((run) => {
                    resolve(run);
                });
            }
            else {
                this.isLocked = true;
                resolve(true);
            }
        });
    }
    /**
     * Release the mutex
     */
    release() {
        let nextFct = this.waitingList.shift();
        if (nextFct) {
            nextFct(true);
        }
        else {
            this.isLocked = false;
        }
    }
    /**
     * Release the mutex
     */
    releaseOnlyLast() {
        if (this.waitingList.length > 0) {
            let lastFct = this.waitingList.pop();
            for (let fct of this.waitingList) {
                fct(false);
            }
            this.waitingList = [];
            if (lastFct) {
                lastFct(true);
            }
        }
        else {
            this.isLocked = false;
        }
    }
    /**
     * Clear mutex
     */
    dispose() {
        this.waitingList = [];
        this.isLocked = false;
    }
    async safeRun(cb) {
        let result = null;
        await this.waitOne();
        try {
            result = cb.apply(null, []);
        }
        catch (e) {
        }
        await this.release();
        return result;
    }
    async safeRunAsync(cb) {
        let result = null;
        await this.waitOne();
        try {
            result = await cb.apply(null, []);
        }
        catch (e) {
        }
        await this.release();
        return result;
    }
    async safeRunLast(cb) {
        let result = null;
        if (await this.waitOne()) {
            try {
                result = cb.apply(null, []);
            }
            catch (e) {
            }
            await this.releaseOnlyLast();
        }
        return result;
    }
    async safeRunLastAsync(cb) {
        let result;
        if (await this.waitOne()) {
            try {
                result = await cb.apply(null, []);
            }
            catch (e) {
            }
            await this.releaseOnlyLast();
        }
        return result;
    }
}
Mutex.Namespace=`${moduleName}`;
_.Mutex=Mutex;
const PressManager=class PressManager {
    static create(options) {
        if (Array.isArray(options.element)) {
            let result = [];
            for (let el of options.element) {
                let cloneOpt = { ...options };
                cloneOpt.element = el;
                result.push(new PressManager(cloneOpt));
            }
            return result;
        }
        else {
            return new PressManager(options);
        }
    }
    options;
    element;
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
    stopPropagation = () => true;
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
        this.element = options.element;
        this.checkDragConstraint(options);
        this.assignValueOption(options);
        this.options = options;
        this.init();
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
        if (typeof options.stopPropagation == 'function') {
            this.stopPropagation = options.stopPropagation;
        }
        else if (options.stopPropagation === false) {
            this.stopPropagation = () => false;
        }
        if (!options.buttonAllowed)
            options.buttonAllowed = [0];
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
        if (!this.options.buttonAllowed?.includes(e.button)) {
            return;
        }
        this.downEventSaved = e;
        if (this.stopPropagation()) {
            e.stopImmediatePropagation();
        }
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
                    this.emitTriggerFunction(this.actionsName.longPress, e);
                }
            }
        }, this.delayLongPress);
        if (this.options.onPressStart) {
            this.options.onPressStart(e, this);
            this.emitTriggerFunctionParent("pressstart", e);
        }
        else {
            this.emitTriggerFunction("pressstart", e);
        }
    }
    upAction(e) {
        if (this.stopPropagation()) {
            e.stopImmediatePropagation();
        }
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
                            this.emitTriggerFunction(this.actionsName.dblPress, e);
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
                                this.emitTriggerFunction(this.actionsName.press, e);
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
            this.emitTriggerFunctionParent("pressend", e);
        }
        else {
            this.emitTriggerFunction("pressend", e);
        }
    }
    moveAction(e) {
        if (!this.state.isMoving && !this.state.oneActionTriggered) {
            if (this.stopPropagation()) {
                e.stopImmediatePropagation();
            }
            let xDist = e.pageX - this.startPosition.x;
            let yDist = e.pageY - this.startPosition.y;
            let distance = Math.sqrt(xDist * xDist + yDist * yDist);
            if (distance > this.offsetDrag && this.downEventSaved) {
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
            if (this.stopPropagation()) {
                e.stopImmediatePropagation();
            }
            e.detail.state.oneActionTriggered = true;
            this.options.onPress(e.detail.realEvent, this);
            this.triggerEventToParent(this.actionsName.press, e.detail.realEvent);
        }
    }
    childDblPress(e) {
        if (this.options.onDblPress) {
            if (this.stopPropagation()) {
                e.stopImmediatePropagation();
            }
            if (e.detail.state) {
                e.detail.state.oneActionTriggered = true;
            }
            this.options.onDblPress(e.detail.realEvent, this);
            this.triggerEventToParent(this.actionsName.dblPress, e.detail.realEvent);
        }
    }
    childLongPress(e) {
        if (this.options.onLongPress) {
            if (this.stopPropagation()) {
                e.stopImmediatePropagation();
            }
            e.detail.state.oneActionTriggered = true;
            this.options.onLongPress(e.detail.realEvent, this);
            this.triggerEventToParent(this.actionsName.longPress, e.detail.realEvent);
        }
    }
    childDragStart(e) {
        if (this.options.onDragStart) {
            if (this.stopPropagation()) {
                e.stopImmediatePropagation();
            }
            e.detail.state.isMoving = true;
            e.detail.customFcts.src = this;
            e.detail.customFcts.onDrag = this.options.onDrag;
            e.detail.customFcts.onDragEnd = this.options.onDragEnd;
            e.detail.customFcts.offsetDrag = this.options.offsetDrag;
            this.options.onDragStart(e.detail.realEvent, this);
            this.triggerEventToParent(this.actionsName.drag, e.detail.realEvent);
        }
    }
    emitTriggerFunctionParent(action, e) {
        let el = this.element.parentElement;
        if (el == null) {
            let parentNode = this.element.parentNode;
            if (parentNode instanceof ShadowRoot) {
                this.emitTriggerFunction(action, e, parentNode.host);
            }
        }
        else {
            this.emitTriggerFunction(action, e, el);
        }
    }
    emitTriggerFunction(action, e, el) {
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
PressManager.Namespace=`${moduleName}`;
_.PressManager=PressManager;
const Effect=class Effect {
    callbacks = [];
    isInit = false;
    isDestroy = false;
    __subscribes = [];
    __allowChanged = [];
    version = 0;
    fct;
    constructor(fct) {
        this.fct = fct;
        if (this.autoInit()) {
            this.init();
        }
    }
    autoInit() {
        return true;
    }
    init() {
        this.isInit = true;
        this.run();
    }
    run() {
        this.version++;
        Watcher._registering.push(this);
        let result = this.fct();
        Watcher._registering.splice(Watcher._registering.length - 1, 1);
        for (let i = 0; i < this.callbacks.length; i++) {
            if (this.callbacks[i].version != this.version) {
                this.callbacks[i].receiver.unsubscribe(this.callbacks[i].cb);
                this.callbacks.splice(i, 1);
                i--;
            }
        }
        return result;
    }
    register(receiver, path, version, fullPath) {
        for (let info of this.callbacks) {
            if (info.receiver == receiver && info.path == path && receiver.__path == info.registerPath) {
                info.version = version;
                info.fullPath = fullPath;
                return;
            }
        }
        let cb;
        if (path == "*") {
            cb = (action, changePath, value) => { this.onChange(action, changePath, value); };
        }
        else {
            cb = (action, changePath, value) => {
                let full = fullPath;
                if (changePath == path) {
                    this.onChange(action, changePath, value);
                }
            };
        }
        this.callbacks.push({
            receiver,
            path,
            registerPath: receiver.__path,
            cb,
            version,
            fullPath
        });
        receiver.subscribe(cb);
    }
    canChange(fct) {
        this.__allowChanged.push(fct);
    }
    checkCanChange(action, changePath, value) {
        if (this.isDestroy) {
            return false;
        }
        for (let fct of this.__allowChanged) {
            if (!fct(action, changePath, value)) {
                return false;
            }
        }
        return true;
    }
    onChange(action, changePath, value) {
        if (!this.checkCanChange(action, changePath, value)) {
            return;
        }
        this.run();
        for (let fct of this.__subscribes) {
            fct(action, changePath, value);
        }
    }
    destroy() {
        this.isDestroy = true;
        for (let pair of this.callbacks) {
            pair.receiver.unsubscribe(pair.cb);
        }
        this.callbacks = [];
        this.isInit = false;
    }
    subscribe(fct) {
        let index = this.__subscribes.indexOf(fct);
        if (index == -1) {
            this.__subscribes.push(fct);
        }
    }
    unsubscribe(fct) {
        let index = this.__subscribes.indexOf(fct);
        if (index > -1) {
            this.__subscribes.splice(index, 1);
        }
    }
}
Effect.Namespace=`${moduleName}`;
_.Effect=Effect;
const Watcher=class Watcher {
    static _registering = [];
    static get _register() {
        return this._registering[this._registering.length - 1];
    }
    /**
     * Transform object into a watcher
     */
    static get(obj, onDataChanged) {
        if (obj == undefined) {
            console.error("You must define an objet / array for your proxy");
            return;
        }
        if (obj.__isProxy) {
            if (onDataChanged)
                obj.subscribe(onDataChanged);
            return obj;
        }
        const reservedName = {
            __path: '__path',
        };
        const clearReservedNames = (data) => {
            if (data instanceof Object && !data.__isProxy) {
                for (let key in reservedName) {
                    delete data[key];
                }
            }
        };
        let setProxyPath = (newProxy, newPath) => {
            if (newProxy instanceof Object && newProxy.__isProxy) {
                newProxy.__path = newPath;
            }
        };
        let jsonReplacer = (key, value) => {
            if (reservedName[key])
                return undefined;
            return value;
        };
        let addAlias = (otherBaseData, name, cb) => {
            let cbs = aliases.get(otherBaseData);
            if (!cbs) {
                cbs = [];
                aliases.set(otherBaseData, cbs);
            }
            cbs.push({
                name: name,
                fct: cb
            });
        };
        let deleteAlias = (otherBaseData, name) => {
            let cbs = aliases.get(otherBaseData);
            if (!cbs)
                return;
            for (let i = 0; i < cbs.length; i++) {
                if (cbs[i].name == name) {
                    cbs.splice(i, 1);
                    if (cbs.length == 0) {
                        aliases.delete(otherBaseData);
                    }
                    return;
                }
            }
        };
        let replaceByAlias = (target, element, prop, receiver) => {
            let fullInternalPath = "";
            if (Array.isArray(target)) {
                if (prop != "length") {
                    if (target.__path) {
                        fullInternalPath = target.__path;
                    }
                    fullInternalPath += "[" + prop + "]";
                }
            }
            else {
                if (target.__path) {
                    fullInternalPath = target.__path + '.';
                }
                fullInternalPath += prop;
            }
            if (receiver && internalAliases[fullInternalPath]) {
                internalAliases[fullInternalPath].unbind();
            }
            if (element instanceof Object && element.__isProxy) {
                let root = element.__root;
                if (root != proxyData.baseData) {
                    let oldPath = element.__path;
                    let unbindElement = getValueFromObject(oldPath, root);
                    if (receiver == null) {
                        receiver = getValueFromObject(target.__path, realProxy);
                        if (internalAliases[fullInternalPath]) {
                            internalAliases[fullInternalPath].unbind();
                        }
                    }
                    let result = Reflect.set(target, prop, unbindElement, receiver);
                    element.__addAlias(proxyData.baseData, oldPath, (type, target, receiver2, value, prop2, dones) => {
                        let triggerPath;
                        if (prop2.startsWith("[") || fullInternalPath == "" || prop2 == "") {
                            triggerPath = fullInternalPath + prop2;
                        }
                        else {
                            triggerPath = fullInternalPath + "." + prop2;
                        }
                        triggerPath = triggerPath.replace(/\[(.*?)\]/g, '.$1');
                        if (type == 'DELETED' && internalAliases[triggerPath]) {
                            internalAliases[triggerPath].unbind();
                        }
                        let splitted = triggerPath.split(".");
                        let newProp = splitted.pop();
                        let newReceiver = getValueFromObject(splitted.join("."), realProxy);
                        trigger(type, target, newReceiver, value, newProp, dones);
                    });
                    internalAliases[fullInternalPath] = {
                        unbind: () => {
                            delete internalAliases[fullInternalPath];
                            element.__deleteAlias(proxyData.baseData, oldPath);
                            deleteAlias(root, prop);
                        }
                    };
                    addAlias(root, prop, (type, target, receiver2, value, prop2, dones) => {
                        let proxy = element.__getProxy;
                        let triggerPath;
                        if (prop2.startsWith("[") || oldPath == "" || prop2 == "") {
                            triggerPath = oldPath + prop2;
                        }
                        else {
                            triggerPath = oldPath + "." + prop2;
                        }
                        triggerPath = triggerPath.replace(/\[(.*?)\]/g, '.$1');
                        let splitted = triggerPath.split(".");
                        let newProp = splitted.pop();
                        let newReceiver = getValueFromObject(splitted.join("."), proxy);
                        element.__trigger(type, target, newReceiver, value, newProp, dones);
                    });
                    return unbindElement;
                }
            }
            return element;
        };
        let currentTrace = new Error().stack?.split("\n") ?? [];
        currentTrace.shift();
        currentTrace.shift();
        const aliases = new Map();
        const internalAliases = {};
        let proxyData = {
            baseData: {},
            callbacks: {},
            callbacksReverse: new Map(),
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
                element = replaceByAlias(target, element, prop, null);
                if (element instanceof Object && element.__isProxy) {
                    newProxy = element;
                }
                else {
                    try {
                        if (element instanceof Computed) {
                            return element;
                        }
                        if (element instanceof HTMLElement) {
                            return element;
                        }
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
                    if (/^[0-9]*$/g.exec(prop)) {
                        if (target.__path) {
                            newPath = target.__path;
                        }
                        newPath += "[" + prop + "]";
                        setProxyPath(newProxy, newPath);
                    }
                    else {
                        newPath += "." + prop;
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
                else if (prop == "__getProxy") {
                    return realProxy;
                }
                else if (prop == "__root") {
                    return this.baseData;
                }
                else if (prop == "__callbacks") {
                    return this.callbacks;
                }
                else if (prop == "subscribe") {
                    let path = receiver.__path;
                    return (cb) => {
                        if (!this.callbacks[path]) {
                            this.callbacks[path] = [];
                        }
                        this.callbacks[path].push(cb);
                        this.callbacksReverse.set(cb, path);
                    };
                }
                else if (prop == "unsubscribe") {
                    return (cb) => {
                        let oldPath = this.callbacksReverse.get(cb);
                        if (oldPath === undefined)
                            return;
                        if (!this.callbacks[oldPath]) {
                            return;
                        }
                        let index = this.callbacks[oldPath].indexOf(cb);
                        if (index > -1) {
                            this.callbacks[oldPath].splice(index, 1);
                        }
                        this.callbacksReverse.delete(cb);
                    };
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
                else if (prop == "toJSON") {
                    if (Array.isArray(target)) {
                        return () => {
                            let result = [];
                            for (let element of target) {
                                result.push(element);
                            }
                            return result;
                        };
                    }
                    return () => {
                        let result = {};
                        for (let key of Object.keys(target)) {
                            if (reservedName[key]) {
                                continue;
                            }
                            result[key] = target[key];
                        }
                        return result;
                    };
                }
                else if (prop == "__addAlias") {
                    return addAlias;
                }
                else if (prop == "__deleteAlias") {
                    return deleteAlias;
                }
                else if (prop == "__trigger") {
                    return trigger;
                }
                return undefined;
            },
            get(target, prop, receiver) {
                if (reservedName[prop]) {
                    return target[prop];
                }
                let customResult = this.tryCustomFunction(target, prop, receiver);
                if (customResult !== undefined) {
                    return customResult;
                }
                let element = target[prop];
                if (typeof (element) == 'function') {
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
                                    target.splice(target.length - 1, 1, el);
                                    trigger('CREATED', target, receiver, receiver[index - 1], "[" + (index - 1) + "]");
                                    trigger('UPDATED', target, receiver, target.length, "length");
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
                                    let oldValues = [];
                                    for (let i = index; i < index + nbRemove; i++) {
                                        oldValues.push(receiver[i]);
                                    }
                                    let updateLength = nbRemove != insert.length;
                                    let res = target.splice(index, nbRemove, ...insert);
                                    for (let i = 0; i < oldValues.length; i++) {
                                        trigger('DELETED', target, receiver, oldValues[i], "[" + index + "]");
                                    }
                                    for (let i = 0; i < insert.length; i++) {
                                        target.splice((index + i), 1, insert[i]);
                                        trigger('CREATED', target, receiver, receiver[(index + i)], "[" + (index + i) + "]");
                                    }
                                    // for(let i = fromIndex, j = 0; i < target.length; i++, j++) {
                                    //     let proxyEl = this.getProxyObject(target, target[i], i);
                                    //     let recuUpdate = (childEl) => {
                                    //         if(Array.isArray(childEl)) {
                                    //             for(let i = 0; i < childEl.length; i++) {
                                    //                 if(childEl[i] instanceof Object && childEl[i].__path) {
                                    //                     let newProxyEl = this.getProxyObject(childEl, childEl[i], i);
                                    //                     recuUpdate(newProxyEl);
                                    //         else if(childEl instanceof Object && !(childEl instanceof Date)) {
                                    //             for(let key in childEl) {
                                    //                 if(childEl[key] instanceof Object && childEl[key].__path) {
                                    //                     let newProxyEl = this.getProxyObject(childEl, childEl[key], key);
                                    //                     recuUpdate(newProxyEl);
                                    //     recuUpdate(proxyEl);
                                    if (updateLength)
                                        trigger('UPDATED', target, receiver, target.length, "length");
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
                                    let oldValue = receiver.length ? receiver[receiver.length] : undefined;
                                    let res = target.pop();
                                    trigger('DELETED', target, receiver, oldValue, "[" + index + "]");
                                    trigger('UPDATED', target, receiver, target.length, "length");
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
                if (element instanceof Computed) {
                    return element.value;
                }
                if (Watcher._registering.length > 0) {
                    let currentPath;
                    let fullPath;
                    let isArray = Array.isArray(receiver);
                    if (isArray && /^[0-9]*$/g.exec(prop)) {
                        fullPath = receiver.__path + "[" + prop + "]";
                        currentPath = "[" + prop + "]";
                    }
                    else {
                        fullPath = receiver.__path ? receiver.__path + '.' + prop : prop;
                        currentPath = prop;
                    }
                    Watcher._register?.register(receiver, currentPath, Watcher._register.version, fullPath);
                }
                if (typeof (element) == 'object') {
                    return this.getProxyObject(target, element, prop);
                }
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                value = replaceByAlias(target, value, prop, receiver);
                let triggerChange = false;
                if (!reservedName[prop]) {
                    if (Array.isArray(target)) {
                        if (prop != "length") {
                            triggerChange = true;
                        }
                    }
                    else {
                        let oldValue = Reflect.get(target, prop, receiver);
                        if (!compareObject(value, oldValue)) {
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
                if (!reservedName[prop]) {
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
                if (internalAliases[pathToDelete]) {
                    internalAliases[pathToDelete].unbind();
                }
                if (target.hasOwnProperty(prop)) {
                    let oldValue = target[prop];
                    if (oldValue instanceof Effect) {
                        oldValue.destroy();
                    }
                    delete target[prop];
                    if (triggerChange) {
                        clearReservedNames(oldValue);
                        trigger('DELETED', target, null, oldValue, prop);
                    }
                    return true;
                }
                return false;
            },
            defineProperty(target, prop, descriptor) {
                let triggerChange = false;
                let newPath = '';
                if (!reservedName[prop]) {
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
            },
            ownKeys(target) {
                let result = Reflect.ownKeys(target);
                for (let i = 0; i < result.length; i++) {
                    if (reservedName[result[i]]) {
                        result.splice(i, 1);
                        i--;
                    }
                }
                return result;
            },
        };
        if (onDataChanged) {
            proxyData.callbacks[''] = [onDataChanged];
        }
        const trigger = (type, target, receiver, value, prop, dones = []) => {
            if (target.__isProxy) {
                return;
            }
            let rootPath;
            if (receiver == null) {
                rootPath = target.__path;
            }
            else {
                rootPath = receiver.__path;
            }
            if (rootPath != "") {
                if (Array.isArray(target)) {
                    if (!prop.startsWith("[")) {
                        if (/^[0-9]*$/g.exec(prop)) {
                            rootPath += "[" + prop + "]";
                        }
                        else {
                            rootPath += "." + prop;
                        }
                    }
                    else {
                        rootPath += prop;
                    }
                }
                else {
                    if (!prop.startsWith("[")) {
                        rootPath += ".";
                    }
                    rootPath += prop;
                }
            }
            else {
                rootPath = prop;
            }
            let stacks = [];
            if (proxyData.useHistory) {
                let allStacks = new Error().stack?.split("\n") ?? [];
                for (let i = allStacks.length - 1; i >= 0; i--) {
                    let current = allStacks[i].trim().replace("at ", "");
                    if (current.startsWith("Object.set") || current.startsWith("Proxy.result")) {
                        break;
                    }
                    stacks.push(current);
                }
            }
            dones.push(proxyData.baseData);
            let aliasesDone = [];
            for (let name in proxyData.callbacks) {
                let pathToSend = rootPath;
                if (name !== "") {
                    let regex = new RegExp("^" + name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + "(\\.|(\\[)|$)");
                    if (!regex.test(rootPath)) {
                        continue;
                    }
                    pathToSend = rootPath.replace(regex, "$2");
                }
                if (name === "" && proxyData.useHistory) {
                    proxyData.history.push({
                        object: JSON.parse(JSON.stringify(proxyData.baseData, jsonReplacer)),
                        trace: stacks.reverse(),
                        action: WatchAction[type],
                        path: pathToSend
                    });
                }
                let cbs = [...proxyData.callbacks[name]];
                for (let cb of cbs) {
                    try {
                        cb(WatchAction[type], pathToSend, value);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                for (let [key, infos] of aliases) {
                    if (!dones.includes(key)) {
                        for (let info of infos) {
                            if (info.name == name) {
                                aliasesDone.push(key);
                                info.fct(type, target, receiver, value, prop, dones);
                            }
                        }
                    }
                }
            }
            for (let [key, infos] of aliases) {
                if (!dones.includes(key) && !aliasesDone.includes(key)) {
                    for (let info of infos) {
                        let regex = new RegExp("^" + info.name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + "(\\.|(\\[)|$)");
                        if (!regex.test(rootPath)) {
                            continue;
                        }
                        let name = rootPath.replace(regex, "$2");
                        info.fct(type, target, receiver, value, name, dones);
                    }
                }
            }
        };
        var realProxy = new Proxy(obj, proxyData);
        proxyData.baseData = obj;
        setProxyPath(realProxy, '');
        return realProxy;
    }
    /**
     * Create a computed variable that will watch any changes
     */
    static computed(fct) {
        const comp = new Computed(fct);
        return comp;
    }
    /**
     * Create an effect variable that will watch any changes
     */
    static effect(fct) {
        const comp = new Effect(fct);
        return comp;
    }
}
Watcher.Namespace=`${moduleName}`;
_.Watcher=Watcher;
const Uri=class Uri {
    static prepare(uri) {
        let params = [];
        let i = 0;
        let regexState = uri.replace(/{.*?}/g, (group, position) => {
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
        regexState = regexState.replace(/\*/g, ".*?").toLowerCase();
        regexState = "^" + regexState + '$';
        return {
            regex: new RegExp(regexState),
            params
        };
    }
    static getParams(from, current) {
        if (typeof from == "string") {
            from = this.prepare(from);
        }
        let matches = from.regex.exec(current);
        if (matches) {
            let slugs = {};
            for (let param of from.params) {
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
    static isActive(from, current) {
        if (typeof from == "string") {
            from = this.prepare(from);
        }
        return from.regex.test(current);
    }
    static normalize(path) {
        const isAbsolute = path.startsWith('/');
        const parts = path.split('/');
        const normalizedParts = [];
        for (let i = 0; i < parts.length; i++) {
            if (parts[i] === '..') {
                normalizedParts.pop();
            }
            else if (parts[i] !== '.' && parts[i] !== '') {
                normalizedParts.push(parts[i]);
            }
        }
        let normalizedPath = normalizedParts.join('/');
        if (isAbsolute) {
            normalizedPath = '/' + normalizedPath;
        }
        return normalizedPath;
    }
}
Uri.Namespace=`${moduleName}`;
_.Uri=Uri;
const State=class State {
    /**
     * Activate a custom state inside a specific manager
     * It ll be a generic state with no information inside exept name
     */
    static async activate(stateName, manager) {
        return await manager.setState(stateName);
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
State.Namespace=`${moduleName}`;
_.State=State;
const EmptyState=class EmptyState extends State {
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
EmptyState.Namespace=`${moduleName}`;
_.EmptyState=EmptyState;
const StateManager=class StateManager {
    subscribers = {};
    static canBeActivate(statePattern, stateName) {
        let stateInfo = Uri.prepare(statePattern);
        return stateInfo.regex.test(stateName);
    }
    activeState;
    changeStateMutex = new Mutex();
    canChangeStateCbs = [];
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
                let res = Uri.prepare(statePattern);
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
                    if (this.subscribers[statePattern].isActive && this.activeState) {
                        let slugs = Uri.getParams(this.subscribers[statePattern], this.activeState.name);
                        if (slugs) {
                            activeFct(this.activeState, slugs);
                        }
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
    assignDefaultState(stateName) {
        return new EmptyState(stateName);
    }
    canChangeState(cb) {
        this.canChangeStateCbs.push(cb);
    }
    /**
     * Activate a current state
     */
    async setState(state) {
        let result = await this.changeStateMutex.safeRunLastAsync(async () => {
            let stateToUse;
            if (typeof state == "string") {
                stateToUse = this.assignDefaultState(state);
            }
            else {
                stateToUse = state;
            }
            if (!stateToUse) {
                this._log("state is undefined", "error");
                this.changeStateMutex.release();
                return false;
            }
            for (let cb of this.canChangeStateCbs) {
                if (!(await cb(stateToUse))) {
                    return false;
                }
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
                            let currentSlug = Uri.getParams(subscriber, this.activeState.name);
                            if (currentSlug) {
                                for (let i = 0; i < clone.length; i++) {
                                    let askChange = clone[i];
                                    if (!await askChange(this.activeState, stateToUse, currentSlug)) {
                                        canChange = false;
                                        break;
                                    }
                                }
                            }
                            let slugs = Uri.getParams(subscriber, stateToUse.name);
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
                            let slugs = Uri.getParams(subscriber, stateToUse.name);
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
                        let oldSlug = Uri.getParams(subscriber, oldState.name);
                        if (oldSlug) {
                            let oldSlugNotNull = oldSlug;
                            [...subscriber.callbacks.inactive].forEach(callback => {
                                callback(oldState, stateToUse, oldSlugNotNull);
                            });
                        }
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
                    let slugs = Uri.getParams(this.subscribers[key], stateToUse.name);
                    if (slugs) {
                        let slugsNotNull = slugs;
                        this.subscribers[key].isActive = true;
                        [...this.subscribers[key].callbacks.active].forEach(callback => {
                            callback(stateToUse, slugsNotNull);
                        });
                    }
                }
                stateToUse.onActivate();
            }
            this.afterStateChanged.trigger([]);
            return true;
        });
        return result ?? false;
    }
    getState() {
        return this.activeState;
    }
    /**
     * Check if a state is in the subscribers and active, return true if it is, false otherwise
     */
    isStateActive(statePattern) {
        return Uri.isActive(statePattern, this.activeState?.name ?? '');
    }
    /**
     * Get slugs information for the current state, return null if state isn't active
     */
    getStateSlugs(statePattern) {
        return Uri.getParams(statePattern, this.activeState?.name ?? '');
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
StateManager.Namespace=`${moduleName}`;
_.StateManager=StateManager;
const Computed=class Computed extends Effect {
    _value;
    __path = "*";
    get value() {
        if (!this.isInit) {
            this.init();
        }
        Watcher._register?.register(this, "*", Watcher._register.version, "*");
        return this._value;
    }
    autoInit() {
        return false;
    }
    constructor(fct) {
        super(fct);
    }
    init() {
        this.isInit = true;
        this.computedValue();
    }
    computedValue() {
        this._value = this.run();
    }
    onChange(action, changePath, value) {
        if (!this.checkCanChange(action, changePath, value)) {
            return;
        }
        let oldValue = this._value;
        this.computedValue();
        if (oldValue === this._value) {
            return;
        }
        for (let fct of this.__subscribes) {
            fct(action, changePath, value);
        }
    }
}
Computed.Namespace=`${moduleName}`;
_.Computed=Computed;
const ComputedNoRecomputed=class ComputedNoRecomputed extends Computed {
    init() {
        this.isInit = true;
        Watcher._registering.push(this);
        this._value = this.fct();
        Watcher._registering.splice(Watcher._registering.length - 1, 1);
    }
    computedValue() {
        this._value = this.fct();
    }
    run() { }
}
ComputedNoRecomputed.Namespace=`${moduleName}`;
_.ComputedNoRecomputed=ComputedNoRecomputed;
const TemplateContext=class TemplateContext {
    data = {};
    comp;
    computeds = [];
    watch;
    constructor(component, data = {}, parentContext) {
        this.comp = component;
        this.watch = Watcher.get({});
        let that = this;
        for (let key in data) {
            if (data[key].__isProxy) {
                Object.defineProperty(this.data, key, {
                    get() {
                        return data[key];
                    }
                });
            }
            else {
                this.watch[key] = data[key];
                Object.defineProperty(this.data, key, {
                    get() {
                        return that.watch[key];
                    }
                });
            }
        }
        if (parentContext) {
            const descriptors = Object.getOwnPropertyDescriptors(parentContext.data);
            for (let name in descriptors) {
                Object.defineProperty(this.data, name, {
                    get() {
                        return parentContext.data[name];
                    }
                });
            }
        }
    }
    print(value) {
        return value == null ? "" : value + "";
    }
    registerIndex() {
        let name = "index";
        let i = 0;
        let fullName = name + i;
        while (this.watch[fullName] !== undefined) {
            i++;
            fullName = name + i;
        }
        return fullName;
    }
    registerLoop(dataName, _indexValue, _indexName, indexName, itemName) {
        this.watch[_indexName] = _indexValue;
        let getItems;
        let mustBeRecomputed = /if|switch|\?|\[.+?\]/g.test(dataName);
        let _class = mustBeRecomputed ? Computed : ComputedNoRecomputed;
        if (!dataName.startsWith("this.")) {
            getItems = new _class(() => {
                return getValueFromObject(dataName, this.data);
            });
        }
        else {
            dataName = dataName.replace(/^this\./, '');
            getItems = new _class(() => {
                return getValueFromObject(dataName, this.comp);
            });
        }
        let getIndex = new ComputedNoRecomputed(() => {
            let items = getItems.value;
            if (!items)
                throw 'impossible';
            let keys = Object.keys(items);
            let index = keys[_getIndex.value];
            if (/^[0-9]+$/g.test(index))
                return Number(index);
            return index;
        });
        let getItem = new ComputedNoRecomputed(() => {
            let items = getItems.value;
            if (!items)
                throw 'impossible';
            let keys = Object.keys(items);
            let index = keys[_getIndex.value];
            return items[index];
        });
        let _getIndex = new ComputedNoRecomputed(() => {
            return this.watch[_indexName];
        });
        this.computeds.push(getIndex);
        this.computeds.push(getItem);
        this.computeds.push(_getIndex);
        if (itemName) {
            Object.defineProperty(this.data, itemName, {
                get() {
                    return getItem.value;
                }
            });
        }
        if (indexName) {
            Object.defineProperty(this.data, indexName, {
                get() {
                    return getIndex.value;
                }
            });
        }
    }
    updateIndex(newIndex, _indexName) {
        // let items: any[] | {};
        // if(!dataName.startsWith("this.")) {
        //     let comp = new Computed(() => {
        //         return getValueFromObject(dataName, this.data);
        //     });
        //     fullName = dataName.replace(/^this\./, '');
        //     items = getValueFromObject(fullName, this.comp);
        // if(Array.isArray(items)) {
        //     let regex = new RegExp("^(" + fullName.replace(/\./g, "\\.") + ")\\[(\\d+?)\\]");
        //     for(let computed of computeds) {
        //         for(let cb of computed.callbacks) {
        //             cb.path = cb.path.replace(regex, "$1[" + newIndex + "]");
        //     let oldKey = Object.keys(items)[this.watch[_indexName]]
        //     let newKey = Object.keys(items)[newIndex]
        //     let regex = new RegExp("^(" + fullName.replace(/\./g, "\\.") + "\\.)(" + oldKey + ")($|\\.)");
        //     for (let computed of computeds) {
        //         for (let cb of computed.callbacks) {
        //             cb.path = cb.path.replace(regex, "$1" + newKey + "$3")
        this.watch[_indexName] = newIndex;
    }
    increaseIndex(_indexName) {
        this.updateIndex(this.watch[_indexName] + 1, _indexName);
    }
    decreaseIndex(_indexName) {
        this.updateIndex(this.watch[_indexName] - 1, _indexName);
    }
    destructor() {
        for (let computed of this.computeds) {
            computed.destroy();
        }
        this.computeds = [];
    }
    registerWatch(name, value) {
        let that = this;
        that.watch[name] = value;
        Object.defineProperty(that.data, name, {
            get() {
                return that.watch[name];
            }
        });
    }
    updateWatch(name, value) {
        this.watch[name] = value;
    }
    getValueFromItem(name) {
        let result = getValueFromObject(name, this.data);
        if (result !== undefined) {
            return result;
        }
        result = getValueFromObject(name, this.comp);
        if (result !== undefined) {
            return result;
        }
        return undefined;
    }
    setValueToItem(name, value) {
        setValueToObject(name, this.comp, value);
    }
}
TemplateContext.Namespace=`${moduleName}`;
_.TemplateContext=TemplateContext;
const TemplateInstance=class TemplateInstance {
    context;
    content;
    actions;
    component;
    _components = {};
    firstRenderUniqueCb = {};
    firstRenderCb = [];
    firstChild;
    lastChild;
    computeds = [];
    renderingComputeds = [];
    loopRegisteries = {};
    loops = [];
    ifs = [];
    constructor(component, content, actions, loops, ifs, context) {
        this.component = component;
        this.content = content;
        this.actions = actions;
        this.ifs = ifs;
        this.loops = loops;
        this.context = context ? context : new TemplateContext(component);
        this.firstChild = content.firstElementChild;
        this.lastChild = content.lastElementChild;
        this.selectElements();
        this.transformActionsListening();
    }
    render() {
        this.updateContext();
        this.bindEvents();
        for (let cb of this.firstRenderCb) {
            cb();
        }
        for (let key in this.firstRenderUniqueCb) {
            this.firstRenderUniqueCb[key]();
        }
        this.renderSubTemplate();
    }
    destructor() {
        for (let name in this.loopRegisteries) {
            for (let item of this.loopRegisteries[name].templates) {
                item.destructor();
            }
            for (let item of this.loopRegisteries[name].computeds) {
                item.destroy();
            }
        }
        this.loopRegisteries = {};
        this.context.destructor();
        for (let computed of this.computeds) {
            computed.destroy();
        }
        for (let computed of this.renderingComputeds) {
            computed.destroy();
        }
        this.computeds = [];
        this.removeFromDOM();
    }
    removeFromDOM(avoidTrigger = false) {
        if (avoidTrigger) {
            let node = this.firstChild;
            while (node && node != this.lastChild) {
                let next = node.nextElementSibling;
                node.parentNode?.removeChild(node);
                node = next;
            }
            this.lastChild?.parentNode?.removeChild(this.lastChild);
        }
        else {
            let node = this.firstChild;
            while (node && node != this.lastChild) {
                let next = node.nextElementSibling;
                node.remove();
                node = next;
            }
            this.lastChild?.remove();
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
                    setValueToObject(element.name, this.component, components);
                }
                else if (components[0]) {
                    setValueToObject(element.name, this.component, components[0]);
                }
            }
        }
    }
    updateContext() {
        if (this.actions.contextEdits) {
            for (let contextEdit of this.actions.contextEdits) {
                this.renderContextEdit(contextEdit);
            }
        }
    }
    renderContextEdit(edit) {
        let _class = edit.once ? ComputedNoRecomputed : Computed;
        let computed = new _class(() => {
            return edit.fct(this.context);
        });
        computed.subscribe((action, path, value) => {
            for (let key in computed.value) {
                let newValue = computed.value[key];
                this.context.updateWatch(key, newValue);
            }
        });
        this.computeds.push(computed);
        for (let key in computed.value) {
            this.context.registerWatch(key, computed.value[key]);
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
        if (!this._components[event.id]) {
            return;
        }
        if (event.isCallback) {
            for (let el of this._components[event.id]) {
                let cb = getValueFromObject(event.eventName, el);
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
        if (id && this._components[id]) {
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
            PressManager.create(clone);
        }
    }
    transformActionsListening() {
        if (this.actions.content) {
            for (let name in this.actions.content) {
                this.transformChangeAction(name, this.actions.content[name]);
            }
        }
        if (this.actions.injection) {
            for (let injection of this.actions.injection) {
                this.transformInjectionAction(injection);
            }
        }
        if (this.actions.bindings) {
            for (let binding of this.actions.bindings) {
                this.transformBindigAction(binding);
            }
        }
    }
    transformChangeAction(name, change) {
        const [id, attr] = name.split("°");
        if (!this._components[id])
            return;
        let apply = () => { };
        if (attr == "@HTML") {
            apply = () => {
                let value = this.context.print(computed.value);
                for (const el of this._components[id])
                    el.innerHTML = value;
            };
        }
        else {
            apply = () => {
                let value = this.context.print(computed.value);
                if (value === "false") {
                    for (const el of this._components[id]) {
                        el.removeAttribute(attr);
                    }
                }
                else {
                    for (const el of this._components[id]) {
                        el.setAttribute(attr, value);
                    }
                }
            };
        }
        let _class = change.once ? ComputedNoRecomputed : Computed;
        let computed = new _class(() => {
            return change.fct(this.context);
        });
        let timeout;
        computed.subscribe((action, path, value) => {
            clearTimeout(timeout);
            // add timeout to group change that append on the same frame (for example index update)
            timeout = setTimeout(() => {
                apply();
            });
        });
        this.renderingComputeds.push(computed);
        this.firstRenderUniqueCb[name] = () => {
            apply();
        };
    }
    transformInjectionAction(injection) {
        if (!this._components[injection.id])
            return;
        let _class = injection.once ? ComputedNoRecomputed : Computed;
        let computed = new _class(() => {
            return injection.inject(this.context);
        });
        this.computeds.push(computed);
        computed.subscribe(() => {
            for (const el of this._components[injection.id]) {
                el[injection.injectionName] = computed.value;
            }
        });
        this.firstRenderCb.push(() => {
            for (const el of this._components[injection.id]) {
                el[injection.injectionName] = computed.value;
            }
        });
    }
    transformBindigAction(binding) {
        let isLocalChange = false;
        let _class = binding.once ? ComputedNoRecomputed : Computed;
        let computed = new _class(() => {
            return binding.inject(this.context);
        });
        this.computeds.push(computed);
        computed.subscribe(() => {
            if (isLocalChange)
                return;
            for (const el of this._components[binding.id]) {
                el[binding.injectionName] = computed.value;
            }
        });
        this.firstRenderCb.push(() => {
            for (const el of this._components[binding.id]) {
                el[binding.injectionName] = computed.value;
            }
        });
        if (binding.isCallback) {
            this.firstRenderCb.push(() => {
                for (var el of this._components[binding.id]) {
                    for (let fct of binding.eventNames) {
                        let cb = getValueFromObject(fct, el);
                        cb?.add((value) => {
                            let valueToSet = getValueFromObject(binding.injectionName, el);
                            isLocalChange = true;
                            binding.extract(this.context, valueToSet);
                            isLocalChange = false;
                        });
                    }
                }
            });
        }
        else {
            this.firstRenderCb.push(() => {
                for (var el of this._components[binding.id]) {
                    for (let fct of binding.eventNames) {
                        el.addEventListener(fct, (e) => {
                            let valueToSet = getValueFromObject(binding.injectionName, e.target);
                            isLocalChange = true;
                            binding.extract(this.context, valueToSet);
                            isLocalChange = false;
                        });
                    }
                }
            });
        }
    }
    renderSubTemplate() {
        for (let loop of this.loops) {
            this.renderLoop(loop);
        }
        for (let _if of this.ifs) {
            this.renderIf(_if);
        }
    }
    renderLoop(loop) {
        if (loop.func) {
            this.renderLoopComplex(loop);
        }
        else if (loop.simple) {
            this.renderLoopSimple(loop, loop.simple);
        }
    }
    resetLoop(loop) {
        if (this.loopRegisteries[loop.anchorId]) {
            for (let item of this.loopRegisteries[loop.anchorId].templates) {
                item.destructor();
            }
            for (let item of this.loopRegisteries[loop.anchorId].computeds) {
                item.destroy();
            }
            if (loop.simple && this.loopRegisteries[loop.anchorId].sub) {
                let elements = this.context.getValueFromItem(loop.simple.data.replace(/^this\./, ''));
                if (elements) {
                    elements.unsubscribe(this.loopRegisteries[loop.anchorId].sub);
                }
            }
        }
        this.loopRegisteries[loop.anchorId] = {
            templates: [],
            computeds: [],
        };
    }
    renderLoopComplex(loop) {
        if (!loop.func)
            return;
        let fctsTemp = loop.func.bind(this.component)(this.context);
        let fcts = {
            apply: fctsTemp.apply,
            condition: fctsTemp.condition,
            transform: fctsTemp.transform ?? (() => { })
        };
        this.resetLoop(loop);
        let computedsCondition = [];
        let alreadyRecreated = false;
        const createComputedCondition = () => {
            let compCondition = new Computed(() => {
                return fcts.condition();
            });
            compCondition.value;
            compCondition.subscribe((action, path, value) => {
                if (!alreadyRecreated) {
                    alreadyRecreated = true;
                    this.renderLoopComplex(loop);
                }
            });
            computedsCondition.push(compCondition);
            this.loopRegisteries[loop.anchorId].computeds.push(compCondition);
            return compCondition;
        };
        let result = [];
        let compCondition = createComputedCondition();
        while (compCondition.value) {
            result.push(fcts.apply());
            fcts.transform();
            compCondition = createComputedCondition();
        }
        let anchor = this._components[loop.anchorId][0];
        for (let i = 0; i < result.length; i++) {
            let context = new TemplateContext(this.component, result[i], this.context);
            let content = loop.template.template?.content.cloneNode(true);
            let actions = loop.template.actions;
            let instance = new TemplateInstance(this.component, content, actions, loop.template.loops, loop.template.ifs, context);
            instance.render();
            anchor.parentNode?.insertBefore(instance.content, anchor);
            this.loopRegisteries[loop.anchorId].templates.push(instance);
        }
    }
    renderLoopSimple(loop, simple) {
        this.resetLoop(loop);
        let basePath = simple.data.replace(/^this\./, '');
        let getElements = () => this.context.getValueFromItem(basePath);
        let elements = getElements();
        let indexName = this.context.registerIndex();
        let keys = Object.keys(elements);
        if (elements.__isProxy) {
            let regexArray = new RegExp("^\\[(\\d+?)\\]$");
            let regexObject = new RegExp("^([^\\.]*)$");
            let sub = (action, path, value) => {
                if (path == "") {
                    this.renderLoopSimple(loop, simple);
                    return;
                }
                if (action == WatchAction.UPDATED) {
                    return;
                }
                let index = undefined;
                regexArray.lastIndex = 0;
                regexObject.lastIndex = 0;
                let resultArray = regexArray.exec(path);
                if (resultArray) {
                    index = Number(resultArray[1]);
                }
                else {
                    let resultObject = regexObject.exec(path);
                    if (resultObject) {
                        let oldKey = resultObject[1];
                        if (action == WatchAction.CREATED) {
                            keys = Object.keys(getElements());
                            index = keys.indexOf(oldKey);
                        }
                        else if (action == WatchAction.DELETED) {
                            index = keys.indexOf(oldKey);
                            keys = Object.keys(getElements());
                        }
                    }
                }
                if (index !== undefined) {
                    let registry = this.loopRegisteries[loop.anchorId];
                    if (action == WatchAction.CREATED) {
                        let context = new TemplateContext(this.component, {}, this.context);
                        context.registerLoop(simple.data, index, indexName, simple.index, simple.item);
                        let content = loop.template.template?.content.cloneNode(true);
                        let actions = loop.template.actions;
                        let instance = new TemplateInstance(this.component, content, actions, loop.template.loops, loop.template.ifs, context);
                        instance.render();
                        let anchor;
                        if (index < registry.templates.length) {
                            anchor = registry.templates[index].firstChild;
                        }
                        else {
                            anchor = this._components[loop.anchorId][0];
                        }
                        anchor?.parentNode?.insertBefore(instance.content, anchor);
                        registry.templates.splice(index, 0, instance);
                        for (let i = index + 1; i < registry.templates.length; i++) {
                            registry.templates[i].context.increaseIndex(indexName);
                        }
                    }
                    else if (action == WatchAction.DELETED) {
                        registry.templates[index].destructor();
                        registry.templates.splice(index, 1);
                        for (let i = index; i < registry.templates.length; i++) {
                            registry.templates[i].context.decreaseIndex(indexName);
                        }
                    }
                }
            };
            elements.subscribe(sub);
        }
        let anchor = this._components[loop.anchorId][0];
        for (let i = 0; i < keys.length; i++) {
            let context = new TemplateContext(this.component, {}, this.context);
            context.registerLoop(simple.data, i, indexName, simple.index, simple.item);
            let content = loop.template.template?.content.cloneNode(true);
            let actions = loop.template.actions;
            let instance = new TemplateInstance(this.component, content, actions, loop.template.loops, loop.template.ifs, context);
            instance.render();
            anchor.parentNode?.insertBefore(instance.content, anchor);
            this.loopRegisteries[loop.anchorId].templates.push(instance);
        }
    }
    renderIf(_if) {
        let computeds = [];
        let instances = [];
        let anchor = this._components[_if.anchorId][0];
        let currentActive = -1;
        const calculateActive = () => {
            let newActive = -1;
            for (let i = 0; i < _if.parts.length; i++) {
                if (computeds[i].value) {
                    newActive = i;
                    break;
                }
            }
            if (newActive == currentActive) {
                return;
            }
            if (currentActive != -1) {
                let instance = instances[currentActive];
                let node = instance.firstChild;
                while (node && node != instance.lastChild) {
                    let next = node.nextElementSibling;
                    instance.content.appendChild(node);
                    node = next;
                }
                if (instance.lastChild)
                    instance.content.appendChild(instance.lastChild);
            }
            currentActive = newActive;
            if (instances[currentActive])
                anchor.parentNode?.insertBefore(instances[currentActive].content, anchor);
        };
        for (let i = 0; i < _if.parts.length; i++) {
            const part = _if.parts[i];
            let _class = part.once ? ComputedNoRecomputed : Computed;
            let computed = new _class(() => {
                return part.condition(this.context);
            });
            computeds.push(computed);
            computed.subscribe(() => {
                calculateActive();
            });
            this.computeds.push(computed);
            let context = new TemplateContext(this.component, {}, this.context);
            let content = part.template.template?.content.cloneNode(true);
            let actions = part.template.actions;
            let instance = new TemplateInstance(this.component, content, actions, part.template.loops, part.template.ifs, context);
            instances.push(instance);
            instance.render();
        }
        calculateActive();
    }
}
TemplateInstance.Namespace=`${moduleName}`;
_.TemplateInstance=TemplateInstance;
const Template=class Template {
    static validatePath(path, pathToCheck) {
        if (pathToCheck.startsWith(path)) {
            return true;
        }
        return false;
    }
    cst;
    constructor(component) {
        this.cst = component;
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
    /**
     * Used by the for loop and the if
     * @param template
     */
    setTemplate(template) {
        this.template = document.createElement('template');
        this.template.innerHTML = template;
    }
    template;
    actions = {};
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
                            throw 'this should be impossible';
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
            if (actions.contextEdits) {
                if (!this.actions.contextEdits) {
                    this.actions.contextEdits = [];
                }
                this.actions.contextEdits = [...actions.contextEdits, ...this.actions.contextEdits];
            }
        }
    }
    loops = [];
    addLoop(loop) {
        this.loops.push(loop);
    }
    ifs = [];
    addIf(_if) {
        this.ifs.push(_if);
    }
    createInstance(component) {
        let content = this.template.content.cloneNode(true);
        return new TemplateInstance(component, content, this.actions, this.loops, this.ifs);
    }
}
Template.Namespace=`${moduleName}`;
_.Template=Template;
const WebComponent=class WebComponent extends HTMLElement {
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
    static Namespace = "";
    /**
     * The current Tag / empty if abstract class
     */
    static Tag = "";
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
     * The current tag
     */
    get tag() {
        return this.constructor['Tag'];
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
    __watchFunctions = {};
    __watchFunctionsComputed = {};
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
        this.__removeNoAnimations = this.__removeNoAnimations.bind(this);
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", this.__removeNoAnimations);
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
        for (let name in this.__watchFunctionsComputed) {
            this.__watchFunctionsComputed[name].destroy();
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
    __addWatchesFunctions(infos) {
        for (let info of infos) {
            let realName;
            let autoInit;
            if (typeof info == "string") {
                realName = info;
                autoInit = false;
            }
            else {
                realName = info.name;
                autoInit = info.autoInit;
            }
            if (!this.__watchFunctions[realName]) {
                this.__watchFunctions[realName] = { autoInit };
            }
        }
    }
    __registerWatchesActions() {
        if (Object.keys(this.__watchActions).length > 0) {
            if (!this.__watch) {
                let defaultValue = {};
                this.__defaultValuesWatch(defaultValue);
                this.__watch = Watcher.get(defaultValue, (type, path, element) => {
                    let action = this.__watchActionsCb[path.split(".")[0]] || this.__watchActionsCb[path.split("[")[0]];
                    action(type, path, element);
                });
            }
        }
        for (let name in this.__watchFunctions) {
            this.__watchFunctionsComputed[name] = Watcher.computed(this[name].bind(this));
            if (this.__watchFunctions[name].autoInit) {
                this.__watchFunctionsComputed[name].value;
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
    styleBefore(addStyle) {
        addStyle("@default");
    }
    styleAfter(addStyle) {
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
        const addStyle = (name) => {
            let sheet = Style.get(name);
            if (sheet) {
                sheets[name] = sheet;
            }
        };
        this.styleBefore(addStyle);
        let localStyle = new CSSStyleSheet();
        let styleTxt = this.__getStyle().join("\r\n");
        if (styleTxt.length > 0) {
            localStyle.replace(styleTxt);
            sheets['@local'] = localStyle;
        }
        this.styleAfter(addStyle);
        return sheets;
    }
    __renderTemplate() {
        let staticInstance = this.__getStatic();
        if (!staticInstance.__template || staticInstance.__template.cst != staticInstance) {
            staticInstance.__template = new Template(staticInstance);
            this.__getHtml();
            this.__registerTemplateAction();
            staticInstance.__template.generateTemplate();
            staticInstance.__styleSheets = this.__renderStyles();
        }
        this.__templateInstance = staticInstance.__template.createInstance(this);
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.adoptedStyleSheets = [...Object.values(staticInstance.__styleSheets), Style.noAnimation];
        shadowRoot.appendChild(this.__templateInstance.content);
        customElements.upgrade(shadowRoot);
        return shadowRoot;
    }
    __registerTemplateAction() {
    }
    connectedCallback() {
        if (this._first) {
            WebComponentInstance.addInstance(this);
            this._first = false;
            this.__defaultValues();
            this.__upgradeAttributes();
            this.__templateInstance?.render();
            this.__removeNoAnimations();
        }
    }
    __removeNoAnimations() {
        if (document.readyState !== "loading") {
            this.offsetWidth;
            setTimeout(() => {
                this.postCreation();
                this._isReady = true;
                this.dispatchEvent(new CustomEvent('postCreationDone'));
                this.shadowRoot.adoptedStyleSheets = Object.values(this.__getStatic().__styleSheets);
                document.removeEventListener("DOMContentLoaded", this.__removeNoAnimations);
            }, 50);
        }
    }
    __defaultValues() { }
    __defaultValuesWatch(w) { }
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
        this.__defaultActiveState.get(mClass)?.push(cb);
    }
    __addInactiveDefState(managerClass, cb) {
        let mClass = this.__getStateManager(managerClass);
        if (!this.__defaultInactiveState.has(mClass)) {
            this.__defaultInactiveState.set(mClass, []);
        }
        this.__defaultInactiveState.get(mClass)?.push(cb);
    }
    __addActiveState(statePattern, managerClass, cb) {
        let mClass = this.__getStateManager(managerClass);
        this.__statesList[statePattern].get(mClass)?.active.push(cb);
    }
    __addInactiveState(statePattern, managerClass, cb) {
        let mClass = this.__getStateManager(managerClass);
        this.__statesList[statePattern].get(mClass)?.inactive.push(cb);
    }
    __addAskChangeState(statePattern, managerClass, cb) {
        let mClass = this.__getStateManager(managerClass);
        this.__statesList[statePattern].get(mClass)?.askChange.push(cb);
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
                let fcts = this.__defaultInactiveState.get(mClass) ?? [];
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
                let fcts = this.__defaultActiveState.get(mClass) ?? [];
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
                let el = this.__statesList[route].get(managerClass);
                if (el) {
                    managerClass.subscribe(route, el);
                }
            }
        }
    }
    __stateCleared = false;
    __unsubscribeState() {
        for (let route in this.__statesList) {
            for (const managerClass of this.__statesList[route].keys()) {
                let el = this.__statesList[route].get(managerClass);
                if (el) {
                    managerClass.unsubscribe(route, el);
                }
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
    __registerPropToWatcher(name) {
        if (Watcher._register) {
            Watcher._register.register(this.getReceiver(name), name, Watcher._register.version, name);
        }
    }
    getStringAttr(name) {
        return this.getAttribute(name) ?? undefined;
    }
    setStringAttr(name, val) {
        if (val === undefined || val === null) {
            this.removeAttribute(name);
        }
        else {
            this.setAttribute(name, val);
        }
    }
    getStringProp(name) {
        this.__registerPropToWatcher(name);
        return this.getStringAttr(name);
    }
    getNumberAttr(name) {
        return Number(this.getAttribute(name));
    }
    setNumberAttr(name, val) {
        if (val === undefined || val === null) {
            this.removeAttribute(name);
        }
        else {
            this.setAttribute(name, val);
        }
    }
    getNumberProp(name) {
        this.__registerPropToWatcher(name);
        return this.getNumberAttr(name);
    }
    getBoolAttr(name) {
        return this.hasAttribute(name);
    }
    setBoolAttr(name, val) {
        val = this.getBoolean(val);
        if (val) {
            this.setAttribute(name, 'true');
        }
        else {
            this.removeAttribute(name);
        }
    }
    getBoolProp(name) {
        this.__registerPropToWatcher(name);
        return this.getBoolAttr(name);
    }
    getDateAttr(name) {
        if (!this.hasAttribute(name)) {
            return undefined;
        }
        return this.stringToDate(this.getAttribute(name));
    }
    setDateAttr(name, val) {
        let valTxt = this.dateToString(val);
        if (valTxt === null) {
            this.removeAttribute(name);
        }
        else {
            this.setAttribute(name, valTxt);
        }
    }
    getDateProp(name) {
        this.__registerPropToWatcher(name);
        return this.getDateAttr(name);
    }
    getDateTimeAttr(name) {
        if (!this.hasAttribute(name))
            return undefined;
        return this.stringToDateTime(this.getAttribute(name));
    }
    setDateTimeAttr(name, val) {
        let valTxt = this.dateTimeToString(val);
        if (valTxt === null) {
            this.removeAttribute(name);
        }
        else {
            this.setAttribute(name, valTxt);
        }
    }
    getDateTimeProp(name) {
        this.__registerPropToWatcher(name);
        return this.getDateTimeAttr(name);
    }
    __propertyReceivers = {};
    getReceiver(name) {
        if (!this.__propertyReceivers[name]) {
            let that = this;
            let result = {
                __subscribes: [],
                subscribe(fct) {
                    let index = this.__subscribes.indexOf(fct);
                    if (index == -1) {
                        this.__subscribes.push(fct);
                    }
                },
                unsubscribe(fct) {
                    let index = this.__subscribes.indexOf(fct);
                    if (index > -1) {
                        this.__subscribes.splice(index, 1);
                    }
                },
                onChange() {
                    for (let fct of this.__subscribes) {
                        fct(WatchAction.UPDATED, name, that[name]);
                    }
                },
                __path: name
            };
            this.__propertyReceivers[name] = result;
        }
        return this.__propertyReceivers[name];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue || !this.isReady) {
            if (this.__propertyReceivers.hasOwnProperty(name)) {
                this.__propertyReceivers[name].onChange();
            }
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
    getElementsInSlot(slotName) {
        return ElementExtension.getElementsInSlot(this, slotName);
    }
}
WebComponent.Namespace=`${moduleName}`;
_.WebComponent=WebComponent;
const WebComponentInstance=class WebComponentInstance {
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
    static removeDefinition(def) {
        WebComponentInstance.lastDefinition = Date.now();
        let index = WebComponentInstance.__allDefinitions.indexOf(def);
        if (index > -1) {
            WebComponentInstance.__allDefinitions.splice(index, 1);
        }
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
    static create(type) {
        let _class = customElements.get(type);
        if (_class) {
            return new _class();
        }
        let splitted = type.split(".");
        let current = window;
        for (let part of splitted) {
            current = current[part];
        }
        if (current && current.prototype instanceof Aventus.WebComponent) {
            return new current();
        }
        return null;
    }
}
WebComponentInstance.Namespace=`${moduleName}`;
_.WebComponentInstance=WebComponentInstance;
const ResourceLoader=class ResourceLoader {
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
            if (options.type == "img" && content.startsWith("data:text/html;")) {
                console.error("Can't load img " + options.url);
                content = "";
            }
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
ResourceLoader.Namespace=`${moduleName}`;
_.ResourceLoader=ResourceLoader;
const ResizeObserver=class ResizeObserver {
    callback;
    targets;
    fpsInterval = -1;
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
ResizeObserver.Namespace=`${moduleName}`;
_.ResizeObserver=ResizeObserver;
const Animation=class Animation {
    /**
     * Default FPS for all Animation if not set inside options
     */
    static FPS_DEFAULT = 60;
    options;
    nextFrame = 0;
    fpsInterval;
    continueAnimation = false;
    frame_id = 0;
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
        this.fpsInterval = 1000 / options.fps;
    }
    animate() {
        let now = window.performance.now();
        let elapsed = now - this.nextFrame;
        if (elapsed <= this.fpsInterval) {
            this.frame_id = requestAnimationFrame(() => this.animate());
            return;
        }
        this.nextFrame = now - (elapsed % this.fpsInterval);
        setTimeout(() => {
            this.options.animate();
        }, 0);
        if (this.continueAnimation) {
            this.frame_id = requestAnimationFrame(() => this.animate());
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
     * Stop the animation
     */
    immediateStop() {
        cancelAnimationFrame(this.frame_id);
        this.continueAnimation = false;
        this.options.stopped();
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
Animation.Namespace=`${moduleName}`;
_.Animation=Animation;
const DragAndDrop=class DragAndDrop {
    /**
     * Default offset before drag element
     */
    static defaultOffsetDrag = 20;
    pressManager;
    options;
    startCursorPosition = { x: 0, y: 0 };
    startElementPosition = { x: 0, y: 0 };
    isEnable = true;
    draggableElement;
    constructor(options) {
        this.options = this.getDefaultOptions(options.element);
        this.mergeProperties(options);
        this.mergeFunctions(options);
        this.options.elementTrigger.style.touchAction = 'none';
        this.pressManager = new PressManager({
            element: this.options.elementTrigger,
            onPressStart: this.onPressStart.bind(this),
            onPressEnd: this.onPressEnd.bind(this),
            onDragStart: this.onDragStart.bind(this),
            onDrag: this.onDrag.bind(this),
            onDragEnd: this.onDragEnd.bind(this),
            offsetDrag: this.options.offsetDrag,
            stopPropagation: this.options.stopPropagation
        });
    }
    getDefaultOptions(element) {
        return {
            applyDrag: true,
            element: element,
            elementTrigger: element,
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
            stopPropagation: true,
            isDragEnable: () => true,
            getZoom: () => 1,
            getOffsetX: () => 0,
            getOffsetY: () => 0,
            onPointerDown: (e) => { },
            onPointerUp: (e) => { },
            onStart: (e) => { },
            onMove: (e) => { },
            onStop: (e) => { },
            onDrop: (element, targets) => { },
            correctPosition: (position) => position
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
        this.defaultMerge(options, "stopPropagation");
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
        this.defaultMerge(options, "correctPosition");
    }
    defaultMerge(options, name) {
        if (options[name] !== void 0) {
            this.options[name] = options[name];
        }
    }
    positionShadowRelativeToElement = { x: 0, y: 0 };
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
        let draggableElement = this.options.element;
        this.startCursorPosition = {
            x: e.pageX,
            y: e.pageY
        };
        this.startElementPosition = {
            x: draggableElement.offsetLeft,
            y: draggableElement.offsetTop
        };
        if (this.options.shadow.enable) {
            draggableElement = this.options.element.cloneNode(true);
            let elBox = this.options.element.getBoundingClientRect();
            let containerBox = this.options.shadow.container.getBoundingClientRect();
            this.positionShadowRelativeToElement = {
                x: elBox.x - containerBox.x,
                y: elBox.y - containerBox.y
            };
            if (this.options.applyDrag) {
                draggableElement.style.position = "absolute";
                draggableElement.style.top = this.positionShadowRelativeToElement.y + this.options.getOffsetY() + 'px';
                draggableElement.style.left = this.positionShadowRelativeToElement.x + this.options.getOffsetX() + 'px';
            }
            this.options.shadow.transform(draggableElement);
            this.options.shadow.container.appendChild(draggableElement);
        }
        this.draggableElement = draggableElement;
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
        let draggableElement = this.draggableElement;
        if (this.options.shadow.enable && this.options.shadow.removeOnStop) {
            draggableElement.parentNode?.removeChild(draggableElement);
        }
        if (targets.length > 0) {
            this.options.onDrop(this.options.element, targets);
        }
        this.options.onStop(e);
    }
    setPosition(position) {
        let draggableElement = this.draggableElement;
        if (this.options.usePercent) {
            let elementParent = draggableElement.offsetParent;
            let percentPosition = {
                x: (position.x / elementParent.offsetWidth) * 100,
                y: (position.y / elementParent.offsetHeight) * 100
            };
            percentPosition = this.options.correctPosition(percentPosition);
            if (this.options.applyDrag) {
                draggableElement.style.left = percentPosition.x + '%';
                draggableElement.style.top = percentPosition.y + '%';
            }
            return percentPosition;
        }
        else {
            position = this.options.correctPosition(position);
            if (this.options.applyDrag) {
                draggableElement.style.left = position.x + 'px';
                draggableElement.style.top = position.y + 'px';
            }
        }
        return position;
    }
    /**
     * Get targets within the current element position is matching
     */
    getMatchingTargets() {
        let draggableElement = this.draggableElement;
        let matchingTargets = [];
        for (let target of this.options.targets) {
            const elementCoordinates = draggableElement.getBoundingClientRect();
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
        return this.options.element;
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
DragAndDrop.Namespace=`${moduleName}`;
_.DragAndDrop=DragAndDrop;

for(let key in _) { Aventus[key] = _[key] }
})(Aventus);

var MaterialIcon;
(MaterialIcon||(MaterialIcon = {}));
(function (MaterialIcon) {
const moduleName = `MaterialIcon`;
const _ = {};


let _n;
const Icon = class Icon extends Aventus.WebComponent {
    static get observedAttributes() {return ["icon"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("icon", ((target) => {
    target.shadowRoot.innerHTML = target.icon;
})); }
    static __style = `:host{--_material-icon-animation-duration: var(--material-icon-animation-duration, 1.75s)}:host{direction:ltr;display:inline-block;font-family:"Material Icons";-moz-font-feature-settings:"liga";font-size:24px;-moz-osx-font-smoothing:grayscale;font-style:normal;font-weight:normal;letter-spacing:normal;line-height:1;text-transform:none;white-space:nowrap;word-wrap:normal}:host([spin]){animation:spin var(--_material-icon-animation-duration) linear infinite}:host([reverse_spin]){animation:reverse-spin var(--_material-icon-animation-duration) linear infinite}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes reverse-spin{0%{transform:rotate(360deg)}100%{transform:rotate(0deg)}}`;
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
        blocks: { 'default':`` }
    });
}
    getClassName() {
        return "Icon";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('icon')){ this['icon'] = "check_box_outline_blank"; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('icon'); }
    postCreation() {
        this.shadowRoot.innerHTML = this.icon;
    }
}
Icon.Namespace=`${moduleName}`;
Icon.Tag=`mi-icon`;
_.Icon=Icon;
if(!window.customElements.get('mi-icon')){window.customElements.define('mi-icon', Icon);Aventus.WebComponentInstance.registerDefinition(Icon);}


for(let key in _) { MaterialIcon[key] = _[key] }
})(MaterialIcon);

var Aventus;
(Aventus||(Aventus = {}));
(function (Aventus) {
const moduleName = `Aventus`;
const _ = {};

const Layout = {};
_.Layout = {};
const Navigation = {};
_.Navigation = {};
let _n;
const Img = class Img extends Aventus.WebComponent {
    static get observedAttributes() {return ["src", "mode"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'cache'() { return this.getBoolAttr('cache') }
    set 'cache'(val) { this.setBoolAttr('cache', val) }    get 'src'() { return this.getStringProp('src') }
    set 'src'(val) { this.setStringAttr('src', val) }get 'mode'() { return this.getStringProp('mode') }
    set 'mode'(val) { this.setStringAttr('mode', val) }    isCalculing;
    maxCalculateSize = 10;
    ratio = 1;
    resizeObserver;
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
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('cache')) { this.attributeChangedCallback('cache', false, false); }if(!this.hasAttribute('src')){ this['src'] = undefined; }if(!this.hasAttribute('mode')){ this['mode'] = "contains"; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('cache');this.__upgradeProperty('src');this.__upgradeProperty('mode'); }
    __listBoolProps() { return ["cache"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    calculateSize(attempt = 0) {
        if (this.isCalculing || !this.imgEl || !this.svgEl) {
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
        if (this.src?.endsWith(".svg")) {
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
        if (!this.src || !this.svgEl || !this.imgEl) {
            return;
        }
        if (this.src.endsWith(".svg")) {
            let svgContent = await Aventus.ResourceLoader.load(this.src);
            this.svgEl.innerHTML = svgContent;
            this.calculateSize();
        }
        else if (this.cache) {
            let base64 = await Aventus.ResourceLoader.load({
                url: this.src,
                type: 'img'
            });
            this.imgEl.setAttribute("src", base64);
            this.calculateSize();
        }
        else {
            this.imgEl.setAttribute("src", this.src);
            this.calculateSize();
        }
    }
    postDestruction() {
        this.resizeObserver?.disconnect();
        this.resizeObserver = undefined;
    }
    postCreation() {
        this.resizeObserver = new Aventus.ResizeObserver({
            fps: 10,
            callback: () => {
                this.calculateSize();
            }
        });
        this.resizeObserver.observe(this);
    }
}
Img.Namespace=`${moduleName}`;
Img.Tag=`av-img`;
_.Img=Img;
if(!window.customElements.get('av-img')){window.customElements.define('av-img', Img);Aventus.WebComponentInstance.registerDefinition(Img);}

Layout.DynamicCol = class DynamicCol extends Aventus.WebComponent {
    get 'size'() { return this.getNumberAttr('size') }
    set 'size'(val) { this.setNumberAttr('size', val) }get 'size_xs'() { return this.getNumberAttr('size_xs') }
    set 'size_xs'(val) { this.setNumberAttr('size_xs', val) }get 'size_sm'() { return this.getNumberAttr('size_sm') }
    set 'size_sm'(val) { this.setNumberAttr('size_sm', val) }get 'size_md'() { return this.getNumberAttr('size_md') }
    set 'size_md'(val) { this.setNumberAttr('size_md', val) }get 'size_lg'() { return this.getNumberAttr('size_lg') }
    set 'size_lg'(val) { this.setNumberAttr('size_lg', val) }get 'size_xl'() { return this.getNumberAttr('size_xl') }
    set 'size_xl'(val) { this.setNumberAttr('size_xl', val) }get 'offset'() { return this.getNumberAttr('offset') }
    set 'offset'(val) { this.setNumberAttr('offset', val) }get 'offset_xs'() { return this.getNumberAttr('offset_xs') }
    set 'offset_xs'(val) { this.setNumberAttr('offset_xs', val) }get 'offset_sm'() { return this.getNumberAttr('offset_sm') }
    set 'offset_sm'(val) { this.setNumberAttr('offset_sm', val) }get 'offset_md'() { return this.getNumberAttr('offset_md') }
    set 'offset_md'(val) { this.setNumberAttr('offset_md', val) }get 'offset_lg'() { return this.getNumberAttr('offset_lg') }
    set 'offset_lg'(val) { this.setNumberAttr('offset_lg', val) }get 'offset_xl'() { return this.getNumberAttr('offset_xl') }
    set 'offset_xl'(val) { this.setNumberAttr('offset_xl', val) }get 'offset_right'() { return this.getNumberAttr('offset_right') }
    set 'offset_right'(val) { this.setNumberAttr('offset_right', val) }get 'offset_right_xs'() { return this.getNumberAttr('offset_right_xs') }
    set 'offset_right_xs'(val) { this.setNumberAttr('offset_right_xs', val) }get 'offset_right_sm'() { return this.getNumberAttr('offset_right_sm') }
    set 'offset_right_sm'(val) { this.setNumberAttr('offset_right_sm', val) }get 'offset_right_md'() { return this.getNumberAttr('offset_right_md') }
    set 'offset_right_md'(val) { this.setNumberAttr('offset_right_md', val) }get 'offset_right_lg'() { return this.getNumberAttr('offset_right_lg') }
    set 'offset_right_lg'(val) { this.setNumberAttr('offset_right_lg', val) }get 'offset_right_xl'() { return this.getNumberAttr('offset_right_xl') }
    set 'offset_right_xl'(val) { this.setNumberAttr('offset_right_xl', val) }get 'nobreak'() { return this.getBoolAttr('nobreak') }
    set 'nobreak'(val) { this.setBoolAttr('nobreak', val) }get 'center'() { return this.getBoolAttr('center') }
    set 'center'(val) { this.setBoolAttr('center', val) }    static __style = `:host{display:flex;flex-direction:column;padding:0 10px;width:100%;margin-left:0;margin-right:0}:host([nobreak]){white-space:nowrap;text-overflow:ellipsis;overflow:hidden}:host([center]){text-align:center}:host([size="0"]){width:0%;display:flex}:host([offset="0"]){margin-left:0%}:host([offset-right="0"]){margin-right:0%}:host([size="1"]){width:8.3333333333%;display:flex}:host([offset="1"]){margin-left:8.3333333333%}:host([offset-right="1"]){margin-right:8.3333333333%}:host([size="2"]){width:16.6666666667%;display:flex}:host([offset="2"]){margin-left:16.6666666667%}:host([offset-right="2"]){margin-right:16.6666666667%}:host([size="3"]){width:25%;display:flex}:host([offset="3"]){margin-left:25%}:host([offset-right="3"]){margin-right:25%}:host([size="4"]){width:33.3333333333%;display:flex}:host([offset="4"]){margin-left:33.3333333333%}:host([offset-right="4"]){margin-right:33.3333333333%}:host([size="5"]){width:41.6666666667%;display:flex}:host([offset="5"]){margin-left:41.6666666667%}:host([offset-right="5"]){margin-right:41.6666666667%}:host([size="6"]){width:50%;display:flex}:host([offset="6"]){margin-left:50%}:host([offset-right="6"]){margin-right:50%}:host([size="7"]){width:58.3333333333%;display:flex}:host([offset="7"]){margin-left:58.3333333333%}:host([offset-right="7"]){margin-right:58.3333333333%}:host([size="8"]){width:66.6666666667%;display:flex}:host([offset="8"]){margin-left:66.6666666667%}:host([offset-right="8"]){margin-right:66.6666666667%}:host([size="9"]){width:75%;display:flex}:host([offset="9"]){margin-left:75%}:host([offset-right="9"]){margin-right:75%}:host([size="10"]){width:83.3333333333%;display:flex}:host([offset="10"]){margin-left:83.3333333333%}:host([offset-right="10"]){margin-right:83.3333333333%}:host([size="11"]){width:91.6666666667%;display:flex}:host([offset="11"]){margin-left:91.6666666667%}:host([offset-right="11"]){margin-right:91.6666666667%}:host([size="12"]){width:100%;display:flex}:host([offset="12"]){margin-left:100%}:host([offset-right="12"]){margin-right:100%}`;
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
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('size');this.__upgradeProperty('size_xs');this.__upgradeProperty('size_sm');this.__upgradeProperty('size_md');this.__upgradeProperty('size_lg');this.__upgradeProperty('size_xl');this.__upgradeProperty('offset');this.__upgradeProperty('offset_xs');this.__upgradeProperty('offset_sm');this.__upgradeProperty('offset_md');this.__upgradeProperty('offset_lg');this.__upgradeProperty('offset_xl');this.__upgradeProperty('offset_right');this.__upgradeProperty('offset_right_xs');this.__upgradeProperty('offset_right_sm');this.__upgradeProperty('offset_right_md');this.__upgradeProperty('offset_right_lg');this.__upgradeProperty('offset_right_xl');this.__upgradeProperty('nobreak');this.__upgradeProperty('center'); }
    __listBoolProps() { return ["nobreak","center"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
}
Layout.DynamicCol.Namespace=`${moduleName}.Layout`;
Layout.DynamicCol.Tag=`av-dynamic-col`;
_.Layout.DynamicCol=Layout.DynamicCol;
if(!window.customElements.get('av-dynamic-col')){window.customElements.define('av-dynamic-col', Layout.DynamicCol);Aventus.WebComponentInstance.registerDefinition(Layout.DynamicCol);}

Layout.DynamicRow = class DynamicRow extends Aventus.WebComponent {
    get 'max_width'() { return this.getStringAttr('max_width') }
    set 'max_width'(val) { this.setStringAttr('max_width', val) }    sizes = { "xs": 300, "sm": 540, "md": 720, "lg": 960, "xl": 1140 };
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
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('max_width'); }
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
Layout.DynamicRow.Namespace=`${moduleName}.Layout`;
Layout.DynamicRow.Tag=`av-dynamic-row`;
_.Layout.DynamicRow=Layout.DynamicRow;
if(!window.customElements.get('av-dynamic-row')){window.customElements.define('av-dynamic-row', Layout.DynamicRow);Aventus.WebComponentInstance.registerDefinition(Layout.DynamicRow);}

const Tracker=class Tracker {
    velocityMultiplier = window.devicePixelRatio;
    updateTime = Date.now();
    delta = { x: 0, y: 0 };
    velocity = { x: 0, y: 0 };
    lastPosition = { x: 0, y: 0 };
    constructor(touch) {
        this.lastPosition = this.getPosition(touch);
    }
    update(touch) {
        const { velocity, updateTime, lastPosition, } = this;
        const now = Date.now();
        const position = this.getPosition(touch);
        const delta = {
            x: -(position.x - lastPosition.x),
            y: -(position.y - lastPosition.y),
        };
        const duration = (now - updateTime) || 16.7;
        const vx = delta.x / duration * 16.7;
        const vy = delta.y / duration * 16.7;
        velocity.x = vx * this.velocityMultiplier;
        velocity.y = vy * this.velocityMultiplier;
        this.delta = delta;
        this.updateTime = now;
        this.lastPosition = position;
    }
    getPointerData(evt) {
        return evt.touches ? evt.touches[evt.touches.length - 1] : evt;
    }
    getPosition(evt) {
        const data = this.getPointerData(evt);
        return {
            x: data.clientX,
            y: data.clientY,
        };
    }
}
Tracker.Namespace=`${moduleName}`;
_.Tracker=Tracker;
const RouterStateManager=class RouterStateManager extends Aventus.StateManager {
    static getInstance() {
        return Aventus.Instance.get(RouterStateManager);
    }
}
RouterStateManager.Namespace=`${moduleName}`;
_.RouterStateManager=RouterStateManager;
Navigation.RouterLink = class RouterLink extends Aventus.WebComponent {
    get 'state'() { return this.getStringAttr('state') }
    set 'state'(val) { this.setStringAttr('state', val) }get 'active_state'() { return this.getStringAttr('active_state') }
    set 'active_state'(val) { this.setStringAttr('active_state', val) }    onActiveChange = new Aventus.Callback();
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
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('state');this.__upgradeProperty('active_state'); }
    addClickEvent() {
        new Aventus.PressManager({
            element: this,
            onPress: () => {
                let state = this.state;
                if (this.state.startsWith(".")) {
                    state = Aventus.Instance.get(RouterStateManager).getState()?.name ?? "";
                    if (!state.endsWith("/")) {
                        state += "/";
                    }
                    state += this.state;
                    state = Aventus.Uri.normalize(state);
                }
                Aventus.State.activate(state, Aventus.Instance.get(RouterStateManager));
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
Navigation.RouterLink.Namespace=`${moduleName}.Navigation`;
Navigation.RouterLink.Tag=`av-router-link`;
_.Navigation.RouterLink=Navigation.RouterLink;
if(!window.customElements.get('av-router-link')){window.customElements.define('av-router-link', Navigation.RouterLink);Aventus.WebComponentInstance.registerDefinition(Navigation.RouterLink);}

Navigation.Page = class Page extends Aventus.WebComponent {
    static get observedAttributes() {return ["visible"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'visible'() { return this.getBoolProp('visible') }
    set 'visible'(val) { this.setBoolAttr('visible', val) }    currentRouter;
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
    pageTitle() {
        return undefined;
    }
    async show() {
        this.visible = true;
    }
    async hide() {
        this.visible = false;
    }
    onShow() {
    }
    onHide() {
    }
}
Navigation.Page.Namespace=`${moduleName}.Navigation`;
_.Navigation.Page=Navigation.Page;

Navigation.Router = class Router extends Aventus.WebComponent {
    oldPage;
    allRoutes = {};
    activePath = "";
    oneStateActive = false;
    showPageMutex = new Aventus.Mutex();
    get stateManager() {
        return Aventus.Instance.get(RouterStateManager);
    }
    page404;
    static __style = `:host{display:block}`;
    constructor() {            super();            this.validError404 = this.validError404.bind(this);            this.canChangeState = this.canChangeState.bind(this);            this.stateManager.canChangeState(this.canChangeState);if (this.constructor == Router) { throw "can't instanciate an abstract class"; } }
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
                this.showPageMutex.safeRunLastAsync(async () => {
                    if (!element) {
                        let options = allRoutes[path];
                        if (options.scriptUrl != "") {
                            await Aventus.ResourceLoader.loadInHead(options.scriptUrl);
                        }
                        let cst = options.render();
                        element = new cst;
                        element.currentRouter = this;
                        this.contentEl.appendChild(element);
                    }
                    if (this.oldPage && this.oldPage != element) {
                        await this.oldPage.hide();
                    }
                    let oldPage = this.oldPage;
                    let oldUrl = this.activePath;
                    this.oldPage = element;
                    this.activePath = path;
                    await element.show();
                    let title = element.pageTitle();
                    if (title !== undefined)
                        document.title = title;
                    if (this.bindToUrl() && window.location.pathname != currentState.name) {
                        let newUrl = window.location.origin + currentState.name;
                        window.history.pushState({}, title ?? "", newUrl);
                    }
                    this.onNewPage(oldUrl, oldPage, path, element);
                });
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
    async canChangeState(newState) {
        return true;
    }
    bindToUrl() {
        return true;
    }
    defaultUrl() {
        return "/";
    }
    postCreation() {
        this.register();
        let oldUrl = window.localStorage.getItem("navigation_url");
        if (oldUrl !== null) {
            Aventus.State.activate(oldUrl, this.stateManager);
            window.localStorage.removeItem("navigation_url");
        }
        else if (this.bindToUrl()) {
            Aventus.State.activate(window.location.pathname, this.stateManager);
        }
        else {
            let defaultUrl = this.defaultUrl();
            if (defaultUrl) {
                Aventus.State.activate(defaultUrl, this.stateManager);
            }
        }
        if (this.bindToUrl()) {
            window.onpopstate = (e) => {
                if (window.location.pathname != this.stateManager.getState()?.name) {
                    Aventus.State.activate(window.location.pathname, this.stateManager);
                }
            };
        }
    }
}
Navigation.Router.Namespace=`${moduleName}.Navigation`;
_.Navigation.Router=Navigation.Router;

const TouchRecord=class TouchRecord {
    _activeTouchID;
    _touchList = {};
    get _primitiveValue() {
        return { x: 0, y: 0 };
    }
    isActive() {
        return this._activeTouchID !== undefined;
    }
    getDelta() {
        const tracker = this._getActiveTracker();
        if (!tracker) {
            return this._primitiveValue;
        }
        return { ...tracker.delta };
    }
    getVelocity() {
        const tracker = this._getActiveTracker();
        if (!tracker) {
            return this._primitiveValue;
        }
        return { ...tracker.velocity };
    }
    getEasingDistance(damping) {
        const deAcceleration = 1 - damping;
        let distance = {
            x: 0,
            y: 0,
        };
        const vel = this.getVelocity();
        Object.keys(vel).forEach(dir => {
            let v = Math.abs(vel[dir]) <= 10 ? 0 : vel[dir];
            while (v !== 0) {
                distance[dir] += v;
                v = (v * deAcceleration) | 0;
            }
        });
        return distance;
    }
    track(evt) {
        const { targetTouches, } = evt;
        Array.from(targetTouches).forEach(touch => {
            this._add(touch);
        });
        return this._touchList;
    }
    update(evt) {
        const { touches, changedTouches, } = evt;
        Array.from(touches).forEach(touch => {
            this._renew(touch);
        });
        this._setActiveID(changedTouches);
        return this._touchList;
    }
    release(evt) {
        delete this._activeTouchID;
        Array.from(evt.changedTouches).forEach(touch => {
            this._delete(touch);
        });
    }
    _add(touch) {
        if (this._has(touch)) {
            this._delete(touch);
        }
        const tracker = new Tracker(touch);
        this._touchList[touch.identifier] = tracker;
    }
    _renew(touch) {
        if (!this._has(touch)) {
            return;
        }
        const tracker = this._touchList[touch.identifier];
        tracker.update(touch);
    }
    _delete(touch) {
        delete this._touchList[touch.identifier];
    }
    _has(touch) {
        return this._touchList.hasOwnProperty(touch.identifier);
    }
    _setActiveID(touches) {
        this._activeTouchID = touches[touches.length - 1].identifier;
    }
    _getActiveTracker() {
        const { _touchList, _activeTouchID, } = this;
        if (_activeTouchID !== undefined) {
            return _touchList[_activeTouchID];
        }
        return undefined;
    }
}
TouchRecord.Namespace=`${moduleName}`;
_.TouchRecord=TouchRecord;
Layout.Scrollable = class Scrollable extends Aventus.WebComponent {
    static get observedAttributes() {return ["zoom"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'y_scroll_visible'() { return this.getBoolAttr('y_scroll_visible') }
    set 'y_scroll_visible'(val) { this.setBoolAttr('y_scroll_visible', val) }get 'x_scroll_visible'() { return this.getBoolAttr('x_scroll_visible') }
    set 'x_scroll_visible'(val) { this.setBoolAttr('x_scroll_visible', val) }get 'floating_scroll'() { return this.getBoolAttr('floating_scroll') }
    set 'floating_scroll'(val) { this.setBoolAttr('floating_scroll', val) }get 'x_scroll'() { return this.getBoolAttr('x_scroll') }
    set 'x_scroll'(val) { this.setBoolAttr('x_scroll', val) }get 'y_scroll'() { return this.getBoolAttr('y_scroll') }
    set 'y_scroll'(val) { this.setBoolAttr('y_scroll', val) }get 'auto_hide'() { return this.getBoolAttr('auto_hide') }
    set 'auto_hide'(val) { this.setBoolAttr('auto_hide', val) }get 'break'() { return this.getNumberAttr('break') }
    set 'break'(val) { this.setNumberAttr('break', val) }get 'disable'() { return this.getBoolAttr('disable') }
    set 'disable'(val) { this.setBoolAttr('disable', val) }get 'no_user_select'() { return this.getBoolAttr('no_user_select') }
    set 'no_user_select'(val) { this.setBoolAttr('no_user_select', val) }    get 'zoom'() { return this.getNumberProp('zoom') }
    set 'zoom'(val) { this.setNumberAttr('zoom', val) }    observer;
    display = { x: 0, y: 0 };
    max = {
        x: 0,
        y: 0
    };
    margin = {
        x: 0,
        y: 0
    };
    position = {
        x: 0,
        y: 0
    };
    momentum = { x: 0, y: 0 };
    contentWrapperSize = { x: 0, y: 0 };
    scroller = {
        x: () => {
            if (!this.horizontalScroller) {
                throw 'can\'t find the horizontalScroller';
            }
            return this.horizontalScroller;
        },
        y: () => {
            if (!this.verticalScroller) {
                throw 'can\'t find the verticalScroller';
            }
            return this.verticalScroller;
        }
    };
    scrollerContainer = {
        x: () => {
            if (!this.horizontalScrollerContainer) {
                throw 'can\'t find the horizontalScrollerContainer';
            }
            return this.horizontalScrollerContainer;
        },
        y: () => {
            if (!this.verticalScrollerContainer) {
                throw 'can\'t find the verticalScrollerContainer';
            }
            return this.verticalScrollerContainer;
        }
    };
    hideDelay = { x: 0, y: 0 };
    touchRecord;
    pointerCount = 0;
    savedBreak = 1;
    get x() {
        return this.position.x;
    }
    get y() {
        return this.position.y;
    }
    onScrollChange = new Aventus.Callback();
    renderAnimation;
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("zoom", ((target) => {
    target.changeZoom();
})); }
    static __style = `:host{--internal-scrollbar-container-color: var(--scrollbar-container-color, transparent);--internal-scrollbar-color: var(--scrollbar-color, #757575);--internal-scrollbar-active-color: var(--scrollbar-active-color, #858585);--internal-scroller-width: var(--scroller-width, 6px);--internal-scroller-top: var(--scroller-top, 3px);--internal-scroller-bottom: var(--scroller-bottom, 3px);--internal-scroller-right: var(--scroller-right, 3px);--internal-scroller-left: var(--scroller-left, 3px);--_scrollbar-content-padding: var(--scrollbar-content-padding, 0);--_scrollbar-container-display: var(--scrollbar-container-display, inline-block)}:host{display:block;height:100%;max-height:100%;max-width:100%;overflow:hidden;position:relative;-webkit-user-drag:none;-khtml-user-drag:none;-moz-user-drag:none;-o-user-drag:none;width:100%}:host .scroll-main-container{display:block;height:100%;max-height:100%;max-width:100%;position:relative;width:100%}:host .scroll-main-container .content-zoom{display:block;height:100%;max-height:100%;max-width:100%;position:relative;transform-origin:0 0;width:100%;z-index:4}:host .scroll-main-container .content-zoom .content-hidder{display:block;height:100%;max-height:100%;max-width:100%;overflow:hidden;position:relative;width:100%}:host .scroll-main-container .content-zoom .content-hidder .content-wrapper{display:var(--_scrollbar-container-display);height:100%;min-height:100%;min-width:100%;padding:var(--_scrollbar-content-padding);position:relative;width:100%}:host .scroll-main-container .scroller-wrapper .container-scroller{display:none;overflow:hidden;position:absolute;transition:transform .2s linear;z-index:5}:host .scroll-main-container .scroller-wrapper .container-scroller .shadow-scroller{background-color:var(--internal-scrollbar-container-color);border-radius:5px}:host .scroll-main-container .scroller-wrapper .container-scroller .shadow-scroller .scroller{background-color:var(--internal-scrollbar-color);border-radius:5px;cursor:pointer;position:absolute;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;z-index:5}:host .scroll-main-container .scroller-wrapper .container-scroller .scroller.active{background-color:var(--internal-scrollbar-active-color)}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical{height:calc(100% - var(--internal-scroller-bottom)*2 - var(--internal-scroller-width));padding-left:var(--internal-scroller-left);right:var(--internal-scroller-right);top:var(--internal-scroller-bottom);transform:0;width:calc(var(--internal-scroller-width) + var(--internal-scroller-left))}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical.hide{transform:translateX(calc(var(--internal-scroller-width) + var(--internal-scroller-left)))}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical .shadow-scroller{height:100%}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical .shadow-scroller .scroller{width:calc(100% - var(--internal-scroller-left))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal{bottom:var(--internal-scroller-bottom);height:calc(var(--internal-scroller-width) + var(--internal-scroller-top));left:var(--internal-scroller-right);padding-top:var(--internal-scroller-top);transform:0;width:calc(100% - var(--internal-scroller-right)*2 - var(--internal-scroller-width))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal.hide{transform:translateY(calc(var(--internal-scroller-width) + var(--internal-scroller-top)))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal .shadow-scroller{height:100%}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal .shadow-scroller .scroller{height:calc(100% - var(--internal-scroller-top))}:host([y_scroll]) .scroll-main-container .content-zoom .content-hidder .content-wrapper{height:auto}:host([x_scroll]) .scroll-main-container .content-zoom .content-hidder .content-wrapper{width:auto}:host([y_scroll_visible]) .scroll-main-container .scroller-wrapper .container-scroller.vertical{display:block}:host([x_scroll_visible]) .scroll-main-container .scroller-wrapper .container-scroller.horizontal{display:block}:host([no_user_select]) .content-wrapper *{user-select:none}:host([no_user_select]) ::slotted{user-select:none}`;
    constructor() {            super();            this.renderAnimation = this.createAnimation();            this.onWheel = this.onWheel.bind(this);            this.onTouchStart = this.onTouchStart.bind(this);            this.onTouchMove = this.onTouchMove.bind(this);            this.onTouchEnd = this.onTouchEnd.bind(this);            this.touchRecord = new TouchRecord();        }
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
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('y_scroll_visible')) { this.attributeChangedCallback('y_scroll_visible', false, false); }if(!this.hasAttribute('x_scroll_visible')) { this.attributeChangedCallback('x_scroll_visible', false, false); }if(!this.hasAttribute('floating_scroll')) { this.attributeChangedCallback('floating_scroll', false, false); }if(!this.hasAttribute('x_scroll')) { this.attributeChangedCallback('x_scroll', false, false); }if(!this.hasAttribute('y_scroll')) {this.setAttribute('y_scroll' ,'true'); }if(!this.hasAttribute('auto_hide')) { this.attributeChangedCallback('auto_hide', false, false); }if(!this.hasAttribute('break')){ this['break'] = 0.1; }if(!this.hasAttribute('disable')) { this.attributeChangedCallback('disable', false, false); }if(!this.hasAttribute('no_user_select')) { this.attributeChangedCallback('no_user_select', false, false); }if(!this.hasAttribute('zoom')){ this['zoom'] = 1; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('y_scroll_visible');this.__upgradeProperty('x_scroll_visible');this.__upgradeProperty('floating_scroll');this.__upgradeProperty('x_scroll');this.__upgradeProperty('y_scroll');this.__upgradeProperty('auto_hide');this.__upgradeProperty('break');this.__upgradeProperty('disable');this.__upgradeProperty('no_user_select');this.__upgradeProperty('zoom'); }
    __listBoolProps() { return ["y_scroll_visible","x_scroll_visible","floating_scroll","x_scroll","y_scroll","auto_hide","disable","no_user_select"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    createAnimation() {
        return new Aventus.Animation({
            fps: 60,
            animate: () => {
                const nextX = this.nextPosition('x');
                const nextY = this.nextPosition('y');
                this.momentum.x = nextX.momentum;
                this.momentum.y = nextY.momentum;
                this.scrollDirection('x', nextX.position);
                this.scrollDirection('y', nextY.position);
                if (!this.momentum.x && !this.momentum.y) {
                    this.renderAnimation.stop();
                }
            },
            stopped: () => {
                if (this.momentum.x || this.momentum.y) {
                    this.renderAnimation.start();
                }
            }
        });
    }
    nextPosition(direction) {
        const current = this.position[direction];
        const remain = this.momentum[direction];
        let result = {
            momentum: 0,
            position: 0,
        };
        if (Math.abs(remain) <= 0.1) {
            result.position = current + remain;
        }
        else {
            let nextMomentum = remain * (1 - this.break);
            nextMomentum |= 0;
            result.momentum = nextMomentum;
            result.position = current + remain - nextMomentum;
        }
        let correctPosition = this.correctScrollValue(result.position, direction);
        if (correctPosition != result.position) {
            result.position = correctPosition;
            result.momentum = 0;
        }
        return result;
    }
    scrollDirection(direction, value) {
        const max = this.max[direction];
        if (max != 0) {
            this.position[direction] = this.correctScrollValue(value, direction);
        }
        else {
            this.position[direction] = 0;
        }
        let container = this.scrollerContainer[direction]();
        let scroller = this.scroller[direction]();
        if (this.auto_hide) {
            container.classList.remove("hide");
            clearTimeout(this.hideDelay[direction]);
            this.hideDelay[direction] = setTimeout(() => {
                container.classList.add("hide");
            }, 1000);
        }
        let containerSize = direction == 'y' ? container.offsetHeight : container.offsetWidth;
        if (this.contentWrapperSize[direction] != 0) {
            let scrollPosition = this.position[direction] / this.contentWrapperSize[direction] * containerSize;
            scroller.style.transform = `translate${direction.toUpperCase()}(${scrollPosition}px)`;
            this.contentWrapper.style.transform = `translate3d(${-1 * this.x}px, ${-1 * this.y}px, 0)`;
        }
        this.triggerScrollChange();
    }
    correctScrollValue(value, direction) {
        if (value < 0) {
            value = 0;
        }
        else if (value > this.max[direction]) {
            value = this.max[direction];
        }
        return value;
    }
    triggerScrollChange() {
        this.onScrollChange.trigger([this.x, this.y]);
    }
    scrollToPosition(x, y) {
        this.scrollDirection('x', x);
        this.scrollDirection('y', y);
    }
    scrollX(x) {
        this.scrollDirection('x', x);
    }
    scrollY(y) {
        this.scrollDirection('y', y);
    }
    addAction() {
        this.addEventListener("wheel", this.onWheel);
        this.addEventListener("touchstart", this.onTouchStart);
        this.addEventListener("touchmove", this.onTouchMove);
        this.addEventListener("touchcancel", this.onTouchEnd);
        this.addEventListener("touchend", this.onTouchEnd);
        this.addScrollDrag('x');
        this.addScrollDrag('y');
    }
    addScrollDrag(direction) {
        let scroller = this.scroller[direction]();
        scroller.addEventListener("touchstart", (e) => {
            e.stopPropagation();
        });
        let startPosition = 0;
        new Aventus.DragAndDrop({
            element: scroller,
            applyDrag: false,
            usePercent: true,
            offsetDrag: 0,
            isDragEnable: () => !this.disable,
            onStart: (e) => {
                this.no_user_select = true;
                scroller.classList.add("active");
                startPosition = this.position[direction];
            },
            onMove: (e, position) => {
                let delta = position[direction] / 100 * this.contentWrapperSize[direction];
                let value = startPosition + delta;
                this.scrollDirection(direction, value);
            },
            onStop: () => {
                this.no_user_select = false;
                scroller.classList.remove("active");
            }
        });
    }
    addDelta(delta) {
        if (this.disable) {
            return;
        }
        this.momentum.x += delta.x;
        this.momentum.y += delta.y;
        this.renderAnimation?.start();
    }
    onWheel(e) {
        const DELTA_MODE = [1.0, 28.0, 500.0];
        const mode = DELTA_MODE[e.deltaMode] || DELTA_MODE[0];
        let newValue = {
            x: 0,
            y: e.deltaY * mode,
        };
        if (!this.y_scroll && this.x_scroll) {
            newValue = {
                x: e.deltaY * mode,
                y: 0,
            };
            if ((newValue.x > 0 && this.x != this.max.x) ||
                (newValue.x <= 0 && this.x != 0)) {
                e.stopPropagation();
            }
        }
        else {
            if ((newValue.y > 0 && this.y != this.max.y) ||
                (newValue.y <= 0 && this.y != 0)) {
                e.stopPropagation();
            }
        }
        this.addDelta(newValue);
    }
    onTouchStart(e) {
        this.touchRecord.track(e);
        this.momentum = {
            x: 0,
            y: 0
        };
        if (this.pointerCount === 0) {
            this.savedBreak = this.break;
            this.break = Math.max(this.break, 0.5); // less frames on touchmove
        }
        this.pointerCount++;
    }
    onTouchMove(e) {
        this.touchRecord.update(e);
        const delta = this.touchRecord.getDelta();
        this.addDelta(delta);
    }
    onTouchEnd(e) {
        const delta = this.touchRecord.getEasingDistance(this.savedBreak);
        this.addDelta(delta);
        this.pointerCount--;
        if (this.pointerCount === 0) {
            this.break = this.savedBreak;
        }
        this.touchRecord.release(e);
    }
    calculateRealSize() {
        if (!this.contentZoom || !this.mainContainer || !this.contentWrapper) {
            return;
        }
        const currentOffsetWidth = this.contentZoom.offsetWidth;
        const currentOffsetHeight = this.contentZoom.offsetHeight;
        this.contentWrapperSize.x = this.contentWrapper.offsetWidth;
        this.contentWrapperSize.y = this.contentWrapper.offsetHeight;
        if (this.zoom < 1) {
            // scale the container for zoom
            this.contentZoom.style.width = this.mainContainer.offsetWidth / this.zoom + 'px';
            this.contentZoom.style.height = this.mainContainer.offsetHeight / this.zoom + 'px';
            this.display.y = currentOffsetHeight;
            this.display.x = currentOffsetWidth;
        }
        else {
            this.display.y = currentOffsetHeight / this.zoom;
            this.display.x = currentOffsetWidth / this.zoom;
        }
    }
    calculatePositionScrollerContainer(direction) {
        if (direction == 'y') {
            this.calculatePositionScrollerContainerY();
        }
        else {
            this.calculatePositionScrollerContainerX();
        }
    }
    calculatePositionScrollerContainerY() {
        const leftMissing = this.mainContainer.offsetWidth - this.verticalScrollerContainer.offsetLeft;
        if (leftMissing > 0 && this.y_scroll_visible && !this.floating_scroll) {
            this.contentHidder.style.width = 'calc(100% - ' + leftMissing + 'px)';
            this.contentHidder.style.marginRight = leftMissing + 'px';
            this.margin.x = leftMissing;
        }
        else {
            this.contentHidder.style.width = '';
            this.contentHidder.style.marginRight = '';
            this.margin.x = 0;
        }
    }
    calculatePositionScrollerContainerX() {
        const topMissing = this.mainContainer.offsetHeight - this.horizontalScrollerContainer.offsetTop;
        if (topMissing > 0 && this.x_scroll_visible && !this.floating_scroll) {
            this.contentHidder.style.height = 'calc(100% - ' + topMissing + 'px)';
            this.contentHidder.style.marginBottom = topMissing + 'px';
            this.margin.y = topMissing;
        }
        else {
            this.contentHidder.style.height = '';
            this.contentHidder.style.marginBottom = '';
            this.margin.y = 0;
        }
    }
    calculateSizeScroller(direction) {
        const scrollerSize = ((this.display[direction] - this.margin[direction]) / this.contentWrapperSize[direction] * 100);
        if (direction == "y") {
            this.scroller[direction]().style.height = scrollerSize + '%';
        }
        else {
            this.scroller[direction]().style.width = scrollerSize + '%';
        }
        let maxScrollContent = this.contentWrapperSize[direction] - this.display[direction];
        if (maxScrollContent < 0) {
            maxScrollContent = 0;
        }
        this.max[direction] = maxScrollContent + this.margin[direction];
    }
    changeZoom() {
        this.contentZoom.style.transform = 'scale(' + this.zoom + ')';
        this.dimensionRefreshed();
    }
    dimensionRefreshed() {
        this.calculateRealSize();
        if (this.contentWrapperSize.y - this.display.y > 0) {
            if (!this.y_scroll_visible) {
                this.y_scroll_visible = true;
                this.calculatePositionScrollerContainer('y');
            }
            this.calculateSizeScroller('y');
            this.scrollDirection('y', this.y);
        }
        else if (this.y_scroll_visible) {
            this.y_scroll_visible = false;
            this.calculatePositionScrollerContainer('y');
            this.calculateSizeScroller('y');
            this.scrollDirection('y', 0);
        }
        if (this.contentWrapperSize.x - this.display.x > 0) {
            if (!this.x_scroll_visible) {
                this.x_scroll_visible = true;
                this.calculatePositionScrollerContainer('x');
            }
            this.calculateSizeScroller('x');
            this.scrollDirection('x', this.x);
        }
        else if (this.x_scroll_visible) {
            this.x_scroll_visible = false;
            this.calculatePositionScrollerContainer('x');
            this.calculateSizeScroller('x');
            this.scrollDirection('x', 0);
        }
    }
    createResizeObserver() {
        let inProgress = false;
        return new Aventus.ResizeObserver({
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
            this.observer = this.createResizeObserver();
        }
        this.observer.observe(this.contentWrapper);
        this.observer.observe(this);
    }
    postCreation() {
        this.addResizeObserver();
        this.addAction();
    }
}
Layout.Scrollable.Namespace=`${moduleName}.Layout`;
Layout.Scrollable.Tag=`av-scrollable`;
_.Layout.Scrollable=Layout.Scrollable;
if(!window.customElements.get('av-scrollable')){window.customElements.define('av-scrollable', Layout.Scrollable);Aventus.WebComponentInstance.registerDefinition(Layout.Scrollable);}


for(let key in _) { Aventus[key] = _[key] }
})(Aventus);

var AventusWebsite;
(AventusWebsite||(AventusWebsite = {}));
(function (AventusWebsite) {
const moduleName = `AventusWebsite`;
const _ = {};


let _n;
const Tabs = class Tabs extends Aventus.WebComponent {
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
Tabs.Namespace=`${moduleName}`;
Tabs.Tag=`av-tabs`;
_.Tabs=Tabs;
if(!window.customElements.get('av-tabs')){window.customElements.define('av-tabs', Tabs);Aventus.WebComponentInstance.registerDefinition(Tabs);}

const TutorialFooter = class TutorialFooter extends Aventus.WebComponent {
    get 'hide_previous'() { return this.getBoolAttr('hide_previous') }
    set 'hide_previous'(val) { this.setBoolAttr('hide_previous', val) }get 'hide_next'() { return this.getBoolAttr('hide_next') }
    set 'hide_next'(val) { this.setBoolAttr('hide_next', val) }    previousState;
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
      "onPress": (e, pressInstance, c) => { c.comp.previousClick(e, pressInstance); }
    },
    {
      "id": "tutorialfooter_1",
      "onPress": (e, pressInstance, c) => { c.comp.nextClick(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "TutorialFooter";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('hide_previous')) { this.attributeChangedCallback('hide_previous', false, false); }if(!this.hasAttribute('hide_next')) { this.attributeChangedCallback('hide_next', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('hide_previous');this.__upgradeProperty('hide_next'); }
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
            let currentState = Aventus.RouterStateManager.getInstance().getState()?.name ?? "";
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
TutorialFooter.Namespace=`${moduleName}`;
TutorialFooter.Tag=`av-tutorial-footer`;
_.TutorialFooter=TutorialFooter;
if(!window.customElements.get('av-tutorial-footer')){window.customElements.define('av-tutorial-footer', TutorialFooter);Aventus.WebComponentInstance.registerDefinition(TutorialFooter);}

const DocLibDragAndDropExample = class DocLibDragAndDropExample extends Aventus.WebComponent {
    static __style = `:host{background-color:red;height:20px;position:absolute;width:20px}`;
    __getStatic() {
        return DocLibDragAndDropExample;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibDragAndDropExample.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`` }
    });
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
DocLibDragAndDropExample.Namespace=`${moduleName}`;
DocLibDragAndDropExample.Tag=`av-doc-lib-drag-and-drop-example`;
_.DocLibDragAndDropExample=DocLibDragAndDropExample;
if(!window.customElements.get('av-doc-lib-drag-and-drop-example')){window.customElements.define('av-doc-lib-drag-and-drop-example', DocLibDragAndDropExample);Aventus.WebComponentInstance.registerDefinition(DocLibDragAndDropExample);}

const Result = class Result extends Aventus.WebComponent {
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
Result.Namespace=`${moduleName}`;
Result.Tag=`av-result`;
_.Result=Result;
if(!window.customElements.get('av-result')){window.customElements.define('av-result', Result);Aventus.WebComponentInstance.registerDefinition(Result);}

const DocWcCreateEditor4Clock = class DocWcCreateEditor4Clock extends Aventus.WebComponent {
    static get observedAttributes() {return ["color"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'color'() { return this.getStringProp('color') }
    set 'color'(val) { this.setStringAttr('color', val) }    get 'timeTxt'() {
						return this.__watch["timeTxt"];
					}
					set 'timeTxt'(val) {
						this.__watch["timeTxt"] = val;
					}    __registerWatchesActions() {
    this.__addWatchesActions("timeTxt");    super.__registerWatchesActions();
}
    static __style = ``;
    __getStatic() {
        return DocWcCreateEditor4Clock;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcCreateEditor4Clock.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<p _id="docwccreateeditor4clock_0"></p>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "docwccreateeditor4clock_0°style": {
      "fct": (c) => `color:${c.print(c.comp.__6b9c757412ba964f03ffab65e03430e2method0())}`,
      "once": true
    },
    "docwccreateeditor4clock_0°@HTML": {
      "fct": (c) => `Time : ${c.print(c.comp.__6b9c757412ba964f03ffab65e03430e2method1())}`,
      "once": true
    }
  }
}); }
    getClassName() {
        return "DocWcCreateEditor4Clock";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('color')){ this['color'] = "red"; } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["timeTxt"] = undefined; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('color'); }
    calcTime() {
        const d = new Date();
        this.timeTxt = ((d.getHours() < 10) ? "0" : "") + d.getHours() + ":" + ((d.getMinutes() < 10) ? "0" : "") + d.getMinutes() + ":" + ((d.getSeconds() < 10) ? "0" : "") + d.getSeconds();
    }
    postCreation() {
        // When the component is rendered
        this.calcTime();
        setInterval(() => {
            this.calcTime();
        }, 1000);
    }
    __6b9c757412ba964f03ffab65e03430e2method0() {
        return this.color;
    }
    __6b9c757412ba964f03ffab65e03430e2method1() {
        return this.timeTxt;
    }
}
DocWcCreateEditor4Clock.Namespace=`${moduleName}`;
DocWcCreateEditor4Clock.Tag=`av-doc-wc-create-editor-4-clock`;
_.DocWcCreateEditor4Clock=DocWcCreateEditor4Clock;
if(!window.customElements.get('av-doc-wc-create-editor-4-clock')){window.customElements.define('av-doc-wc-create-editor-4-clock', DocWcCreateEditor4Clock);Aventus.WebComponentInstance.registerDefinition(DocWcCreateEditor4Clock);}

const DocWcCreateEditor2Error = class DocWcCreateEditor2Error extends Aventus.WebComponent {
    static __style = ``;
    __getStatic() {
        return DocWcCreateEditor2Error;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcCreateEditor2Error.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot> </slot>`,'error':`<slot style="color:red" name="error"></slot>`,'success':`<slot style="color:green" name="success"></slot>` }, 
        blocks: { 'default':`<slot> </slot><slot style="color:red" name="error"></slot><slot style="color:green" name="success"></slot>` }
    });
}
    getClassName() {
        return "DocWcCreateEditor2Error";
    }
}
DocWcCreateEditor2Error.Namespace=`${moduleName}`;
DocWcCreateEditor2Error.Tag=`av-doc-wc-create-editor-2-error`;
_.DocWcCreateEditor2Error=DocWcCreateEditor2Error;
if(!window.customElements.get('av-doc-wc-create-editor-2-error')){window.customElements.define('av-doc-wc-create-editor-2-error', DocWcCreateEditor2Error);Aventus.WebComponentInstance.registerDefinition(DocWcCreateEditor2Error);}

const DocWcCreateEditor3ErrorYellow = class DocWcCreateEditor3ErrorYellow extends DocWcCreateEditor2Error {
    static __style = ``;
    __getStatic() {
        return DocWcCreateEditor3ErrorYellow;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcCreateEditor3ErrorYellow.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'error':`<slot name="error"></slot>` }, 
        blocks: { 'error':`	<span style="color:yellow">        <slot name="error"></slot>	</span>` }
    });
}
    getClassName() {
        return "DocWcCreateEditor3ErrorYellow";
    }
}
DocWcCreateEditor3ErrorYellow.Namespace=`${moduleName}`;
DocWcCreateEditor3ErrorYellow.Tag=`av-doc-wc-create-editor-3-error-yellow`;
_.DocWcCreateEditor3ErrorYellow=DocWcCreateEditor3ErrorYellow;
if(!window.customElements.get('av-doc-wc-create-editor-3-error-yellow')){window.customElements.define('av-doc-wc-create-editor-3-error-yellow', DocWcCreateEditor3ErrorYellow);Aventus.WebComponentInstance.registerDefinition(DocWcCreateEditor3ErrorYellow);}

const DocWcCreateEditor1Button = class DocWcCreateEditor1Button extends Aventus.WebComponent {
    static __style = `:host{background-color:#e5540e;border-radius:5px;color:#fff;cursor:pointer;padding:5px 15px;user-select:none}`;
    __getStatic() {
        return DocWcCreateEditor1Button;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcCreateEditor1Button.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "DocWcCreateEditor1Button";
    }
}
DocWcCreateEditor1Button.Namespace=`${moduleName}`;
DocWcCreateEditor1Button.Tag=`av-doc-wc-create-editor-1-button`;
_.DocWcCreateEditor1Button=DocWcCreateEditor1Button;
if(!window.customElements.get('av-doc-wc-create-editor-1-button')){window.customElements.define('av-doc-wc-create-editor-1-button', DocWcCreateEditor1Button);Aventus.WebComponentInstance.registerDefinition(DocWcCreateEditor1Button);}

const DocuImg = class DocuImg extends Aventus.Img {
    static __style = ``;
    __getStatic() {
        return DocuImg;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocuImg.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`` }
    });
}
    getClassName() {
        return "DocuImg";
    }
    postCreation() {
        super.postCreation();
        new Aventus.PressManager({
            element: this,
            onPress: () => {
            }
        });
    }
}
DocuImg.Namespace=`${moduleName}`;
DocuImg.Tag=`av-docu-img`;
_.DocuImg=DocuImg;
if(!window.customElements.get('av-docu-img')){window.customElements.define('av-docu-img', DocuImg);Aventus.WebComponentInstance.registerDefinition(DocuImg);}

const DocIntroductionButton = class DocIntroductionButton extends Aventus.WebComponent {
    static get observedAttributes() {return ["count"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'count'() { return this.getNumberProp('count') }
    set 'count'(val) { this.setNumberAttr('count', val) }    static __style = `:host button{background-color:#e5540e;border:none;border-radius:5px;color:#fff;cursor:pointer;padding:5px 15px}`;
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
    "docintroductionbutton_0°@HTML": {
      "fct": (c) => `Count is ${c.print(c.comp.__33f75d5e73a3504bfb45e6d176287749method0())}`,
      "once": true
    }
  },
  "events": [
    {
      "eventName": "click",
      "id": "docintroductionbutton_0",
      "fct": (e, c) => c.comp.onClick(e)
    }
  ]
}); }
    getClassName() {
        return "DocIntroductionButton";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('count')){ this['count'] = 0; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('count'); }
    onClick() {
        this.count++;
    }
    __33f75d5e73a3504bfb45e6d176287749method0() {
        return this.count;
    }
}
DocIntroductionButton.Namespace=`${moduleName}`;
DocIntroductionButton.Tag=`av-doc-introduction-button`;
_.DocIntroductionButton=DocIntroductionButton;
if(!window.customElements.get('av-doc-introduction-button')){window.customElements.define('av-doc-introduction-button', DocIntroductionButton);Aventus.WebComponentInstance.registerDefinition(DocIntroductionButton);}

const AvCode = class AvCode extends Aventus.WebComponent {
    static get observedAttributes() {return ["language", "filename"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'tab'() { return this.getNumberAttr('tab') }
    set 'tab'(val) { this.setNumberAttr('tab', val) }    get 'language'() { return this.getStringProp('language') }
    set 'language'(val) { this.setStringAttr('language', val) }get 'filename'() { return this.getStringProp('filename') }
    set 'filename'(val) { this.setStringAttr('filename', val) }    code = "";
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("language", ((target) => {
    if (window['Prism']) {
        if (!window['Prism'].languages.hasOwnProperty(target.language)) {
            target.language = 'plain';
        }
    }
})); }
    static __style = `:host{--_code-padding: var(--code-padding, 30px 10px)}:host{border-radius:5px;display:flex;margin:.5em 0;overflow:hidden;position:relative}:host .filename{background-color:rgba(255,255,255,.3);display:none;font-size:12px;padding:5px;position:absolute;right:0;top:5px}:host pre{margin:0;padding:var(--_code-padding);width:100%}:host .hided{display:none}:host .language-css{color:#ce9178}:host([filename]) .filename{display:block}`;
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
    "avcode_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__9c978b797ccb3c9cc9bef431262ddf55method0())}`,
      "once": true
    },
    "avcode_1°class": {
      "fct": (c) => `language-${c.print(c.comp.__9c978b797ccb3c9cc9bef431262ddf55method1())}`,
      "once": true
    }
  }
}); }
    getClassName() {
        return "AvCode";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('tab')){ this['tab'] = undefined; }if(!this.hasAttribute('language')){ this['language'] = "plain"; }if(!this.hasAttribute('filename')){ this['filename'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('tab');this.__upgradeProperty('language');this.__upgradeProperty('filename'); }
    styleBefore(addStyle) {
        addStyle("Prism");
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
        if (this.innerHTML.includes("<ha-my-component></ha-my-component>"))
            debugger;
        let code = this.innerHTML.replace(/<pre>/g, "").replace(/<\/pre>/g, "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        // code = code.split("\n").map(p => p.replace("    ", "")).join("\n");
        this.codeEl.innerHTML = code;
        this.code = code;
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
    __9c978b797ccb3c9cc9bef431262ddf55method0() {
        return this.filename;
    }
    __9c978b797ccb3c9cc9bef431262ddf55method1() {
        return this.language;
    }
}
AvCode.Namespace=`${moduleName}`;
AvCode.Tag=`av-code`;
_.AvCode=AvCode;
if(!window.customElements.get('av-code')){window.customElements.define('av-code', AvCode);Aventus.WebComponentInstance.registerDefinition(AvCode);}

const CodeTabs = class CodeTabs extends Aventus.WebComponent {
    static get observedAttributes() {return ["tab"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'tab'() { return this.getNumberProp('tab') }
    set 'tab'(val) { this.setNumberAttr('tab', val) }    get 'tabs'() {
						return this.__watch["tabs"];
					}
					set 'tabs'(val) {
						this.__watch["tabs"] = val;
					}    __registerWatchesActions() {
    this.__addWatchesActions("tabs");    super.__registerWatchesActions();
}
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("tab", ((target) => {
    target.onTabSelected();
})); }
    static __style = `:host{width:100%}:host .tab-container{display:flex;flex-wrap:nowrap;gap:3px}:host .tab{border:1px solid #1e1e1e;border-bottom:0;border-top-left-radius:5px;border-top-right-radius:5px;padding:5px 15px;cursor:pointer}:host .tab.active{background-color:#1e1e1e;color:var(--aventus-color)}:host .hidden{display:none}:host .container av-code{border-radius:0px;margin:0}`;
    __getStatic() {
        return CodeTabs;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(CodeTabs.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="header" _id="codetabs_0">    <av-scrollable y_scroll="false" x_scroll x_scroll_visible="false">        <div class="tab-container">            <template _id="codetabs_1"></template>        </div>    </av-scrollable></div><div class="container" _id="codetabs_3"></div><div class="hidden">    <slot></slot></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "headerEl",
      "ids": [
        "codetabs_0"
      ]
    },
    {
      "name": "containerEl",
      "ids": [
        "codetabs_3"
      ]
    }
  ]
});const templ0 = new Aventus.Template(this);templ0.setTemplate(`                 <div _id="codetabs_2"></div>            `);templ0.setActions({
  "content": {
    "codetabs_2°class": {
      "fct": (c) => `tab ${c.print(c.comp.__487653016a9818dd693d541205c352acmethod1(c.data.i))}`
    },
    "codetabs_2°@HTML": {
      "fct": (c) => `${c.print(c.comp.__487653016a9818dd693d541205c352acmethod2(c.data.i))}`
    }
  },
  "pressEvents": [
    {
      "id": "codetabs_2",
      "onPress": (e, pressInstance, c) => { c.comp.tabPress(e, pressInstance); }
    }
  ]
});this.__getStatic().__template.addLoop({
                    anchorId: 'codetabs_1',
                    template: templ0,
                simple:{data: "this.tabs",index:"i"}}); }
    getClassName() {
        return "CodeTabs";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('tab')){ this['tab'] = 0; } }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["tabs"] = []; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('tab'); }
    tabPress(e, instance) {
        let element = instance.getElement();
        let parent = element.parentNode;
        if (!parent)
            return;
        let index = Array.from(parent.children).indexOf(element);
        if (index == -1)
            return;
        this.tab = index;
    }
    onTabSelected() {
        let children = Array.from(this.containerEl.children);
        for (let child of children) {
            child.parentNode?.removeChild(child);
        }
        if (this.tabs[this.tab]) {
            this.containerEl.appendChild(this.tabs[this.tab].code);
        }
    }
    postCreation() {
        let elements = this.getElementsInSlot();
        let result = [];
        for (let element of elements) {
            if (element instanceof AvCode && element.filename) {
                result.push({
                    name: element.filename,
                    code: element
                });
                element.filename = undefined;
            }
        }
        this.tabs = result;
        this.onTabSelected();
    }
    __487653016a9818dd693d541205c352acmethod1(i) {
        return i == this.tab ? 'active' : '';
    }
    __487653016a9818dd693d541205c352acmethod2(i) {
        return this.tabs[i].name;
    }
}
CodeTabs.Namespace=`${moduleName}`;
CodeTabs.Tag=`av-code-tabs`;
_.CodeTabs=CodeTabs;
if(!window.customElements.get('av-code-tabs')){window.customElements.define('av-code-tabs', CodeTabs);Aventus.WebComponentInstance.registerDefinition(CodeTabs);}

const CodeEditorFile = class CodeEditorFile extends Aventus.WebComponent {
    static get observedAttributes() {return ["name", "icon"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'type'() { return this.getStringAttr('type') }
    set 'type'(val) { this.setStringAttr('type', val) }get 'active'() { return this.getBoolAttr('active') }
    set 'active'(val) { this.setBoolAttr('active', val) }    get 'name'() { return this.getStringProp('name') }
    set 'name'(val) { this.setStringAttr('name', val) }get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }    code;
    editor;
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("name", ((target) => {
    target.prepareIcon();
})); }
    static __style = `:host{cursor:pointer;display:flex;font-size:1.4rem;margin-left:5px;margin-top:5px;padding:5px 15px;transition:.2s linear background-color}:host .name{align-items:center;display:flex}:host .name mi-icon.icon{flex-shrink:0;font-size:1.4rem;margin-right:5px}:host .name av-img{--img-color: white;height:14px;margin-right:5px;width:14px}:host([active]){background-color:rgba(255,255,255,.2)}:host(:hover){background-color:rgba(255,255,255,.1)}:host([type=style]) .name av-img{--img-color: #E066DC}:host([type=view]) .name av-img{--img-color: #22AAEE}:host([type=logic]) .name av-img{--img-color: #E5540E}`;
    __getStatic() {
        return CodeEditorFile;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(CodeEditorFile.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="name">    <template _id="codeeditorfile_0"></template>    <span _id="codeeditorfile_2"></span></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "codeeditorfile_2°@HTML": {
      "fct": (c) => `\r\n        ${c.print(c.comp.__69fe877e555301bf4ee6e8f11dd950f6method2())}\r\n    `,
      "once": true
    }
  }
});const templ0 = new Aventus.Template(this);templ0.setTemplate(`        <av-img _id="codeeditorfile_1"></av-img>    `);templ0.setActions({
  "content": {
    "codeeditorfile_1°src": {
      "fct": (c) => `${c.print(c.comp.__69fe877e555301bf4ee6e8f11dd950f6method1())}`,
      "once": true
    }
  }
});const templ1 = new Aventus.Template(this);templ1.setTemplate(`        <mi-icon icon="description" class="icon"></mi-icon>    `);this.__getStatic().__template.addIf({
                    anchorId: 'codeeditorfile_0',
                    parts: [{once: true,
                    condition: (c) => c.comp.__69fe877e555301bf4ee6e8f11dd950f6method0(),
                    template: templ0
                },{once: true,
                    condition: (c) => true,
                    template: templ1
                }]
            }); }
    getClassName() {
        return "CodeEditorFile";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('type')){ this['type'] = undefined; }if(!this.hasAttribute('active')) { this.attributeChangedCallback('active', false, false); }if(!this.hasAttribute('name')){ this['name'] = ""; }if(!this.hasAttribute('icon')){ this['icon'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('type');this.__upgradeProperty('active');this.__upgradeProperty('name');this.__upgradeProperty('icon'); }
    __listBoolProps() { return ["active"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    prepareIcon() {
        if (this.name.endsWith(".wcs.avt")) {
            this.icon = "/img/logo.svg";
            this.type = "style";
        }
        else if (this.name.endsWith(".wcv.avt")) {
            this.icon = "/img/logo.svg";
            this.type = "view";
        }
        else if (this.name.endsWith(".avt")) {
            this.icon = "/img/logo.svg";
            this.type = "logic";
        }
    }
    postCreation() {
        new Aventus.PressManager({
            element: this,
            onPress: () => {
                this.editor.openFile(this);
            }
        });
    }
    __69fe877e555301bf4ee6e8f11dd950f6method1() {
        return this.icon;
    }
    __69fe877e555301bf4ee6e8f11dd950f6method2() {
        return this.name;
    }
    __69fe877e555301bf4ee6e8f11dd950f6method0() {
        return this.icon;
    }
}
CodeEditorFile.Namespace=`${moduleName}`;
CodeEditorFile.Tag=`av-code-editor-file`;
_.CodeEditorFile=CodeEditorFile;
if(!window.customElements.get('av-code-editor-file')){window.customElements.define('av-code-editor-file', CodeEditorFile);Aventus.WebComponentInstance.registerDefinition(CodeEditorFile);}

const DocFooter = class DocFooter extends Aventus.WebComponent {
    get 'hide_previous'() { return this.getBoolAttr('hide_previous') }
    set 'hide_previous'(val) { this.setBoolAttr('hide_previous', val) }get 'hide_next'() { return this.getBoolAttr('hide_next') }
    set 'hide_next'(val) { this.setBoolAttr('hide_next', val) }    previousState;
    nextState;
    static __style = `:host{align-items:center;display:flex;justify-content:center;margin:30px 0;width:100%}:host div{background-color:var(--aventus-color);border-radius:5px;box-shadow:var(--elevation-3);color:#cfd1d4;cursor:pointer;font-size:16px;font-weight:400;margin:0 30px;padding:5px 15px;-webkit-tap-highlight-color:rgba(0,0,0,0);user-select:none;transition:box-shadow .2s linear}:host div:hover{box-shadow:var(--elevation-1)}:host([hide_next]) .next{opacity:0;visibility:hidden}:host([hide_previous]) .previous{opacity:0;visibility:hidden}`;
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
      "onPress": (e, pressInstance, c) => { c.comp.previousClick(e, pressInstance); }
    },
    {
      "id": "docfooter_1",
      "onPress": (e, pressInstance, c) => { c.comp.nextClick(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "DocFooter";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('hide_previous')) { this.attributeChangedCallback('hide_previous', false, false); }if(!this.hasAttribute('hide_next')) { this.attributeChangedCallback('hide_next', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('hide_previous');this.__upgradeProperty('hide_next'); }
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
            let currentState = Aventus.RouterStateManager.getInstance().getState()?.name ?? "";
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
DocFooter.Namespace=`${moduleName}`;
DocFooter.Tag=`av-doc-footer`;
_.DocFooter=DocFooter;
if(!window.customElements.get('av-doc-footer')){window.customElements.define('av-doc-footer', DocFooter);Aventus.WebComponentInstance.registerDefinition(DocFooter);}

const Collapse = class Collapse extends Aventus.WebComponent {
    get 'open'() { return this.getBoolAttr('open') }
    set 'open'(val) { this.setBoolAttr('open', val) }    static __style = `:host .title{cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host .collapse{display:grid;grid-template-rows:0fr;transition:.5s var(--bezier-curve) grid-template-rows}:host .collapse .content{overflow:hidden}:host([open]) .collapse{grid-template-rows:1fr}`;
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
      "onPress": (e, pressInstance, c) => { c.comp.toggleOpen(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "Collapse";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('open')) { this.attributeChangedCallback('open', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('open'); }
    __listBoolProps() { return ["open"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    toggleOpen() {
        this.open = !this.open;
    }
}
Collapse.Namespace=`${moduleName}`;
Collapse.Tag=`av-collapse`;
_.Collapse=Collapse;
if(!window.customElements.get('av-collapse')){window.customElements.define('av-collapse', Collapse);Aventus.WebComponentInstance.registerDefinition(Collapse);}

const CodeEditorFolder = class CodeEditorFolder extends Aventus.WebComponent {
    static get observedAttributes() {return ["name", "open"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'name'() { return this.getStringProp('name') }
    set 'name'(val) { this.setStringAttr('name', val) }get 'open'() { return this.getBoolProp('open') }
    set 'open'(val) { this.setBoolAttr('open', val) }    static __style = `:host{display:flex;flex-direction:column;font-size:16px;user-select:none;margin-top:5px}:host .name{display:flex;align-items:center;cursor:pointer}:host .name mi-icon.icon{font-size:16px;margin-right:5px;flex-shrink:0}:host .name mi-icon.arrow{transform:rotate(180deg);font-size:12px;width:15px;margin-right:5px;transition:transform var(--bezier-curve) .5s;flex-shrink:0}:host .name span{flex-grow:1}:host .content{margin-left:10px}:host([open]) .name mi-icon.arrow{transform:rotate(270deg)}`;
    __getStatic() {
        return CodeEditorFolder;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(CodeEditorFolder.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="name" _id="codeeditorfolder_0">    <mi-icon icon="arrow_back_ios_new" class="arrow"></mi-icon>    <mi-icon class="icon" icon="folder"></mi-icon>    <span _id="codeeditorfolder_1"></span></div><av-collapse class="content" _id="codeeditorfolder_2">    <slot></slot></av-collapse>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "content": {
    "codeeditorfolder_1°@HTML": {
      "fct": (c) => `${c.print(c.comp.__52e043144a4ac45c46ed9a041503a168method0())}`,
      "once": true
    },
    "codeeditorfolder_2°open": {
      "fct": (c) => `${c.print(c.comp.__52e043144a4ac45c46ed9a041503a168method1())}`,
      "once": true
    }
  },
  "pressEvents": [
    {
      "id": "codeeditorfolder_0",
      "onPress": (e, pressInstance, c) => { c.comp.toggleOpen(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "CodeEditorFolder";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('name')){ this['name'] = ""; }if(!this.hasAttribute('open')) { this.attributeChangedCallback('open', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('name');this.__upgradeProperty('open'); }
    __listBoolProps() { return ["open"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    toggleOpen() {
        this.open = !this.open;
    }
    __52e043144a4ac45c46ed9a041503a168method0() {
        return this.name;
    }
    __52e043144a4ac45c46ed9a041503a168method1() {
        return this.open;
    }
}
CodeEditorFolder.Namespace=`${moduleName}`;
CodeEditorFolder.Tag=`av-code-editor-folder`;
_.CodeEditorFolder=CodeEditorFolder;
if(!window.customElements.get('av-code-editor-folder')){window.customElements.define('av-code-editor-folder', CodeEditorFolder);Aventus.WebComponentInstance.registerDefinition(CodeEditorFolder);}

const RoadMapItem = class RoadMapItem extends Aventus.WebComponent {
    static get observedAttributes() {return ["name"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'name'() { return this.getStringProp('name') }
    set 'name'(val) { this.setStringAttr('name', val) }    static __style = `:host{display:flex}:host .card{max-width:400px;position:relative}:host .card .info{background:var(--light-primary-color);border-radius:10px;color:gray;display:flex;flex-direction:column;padding:10px}:host .card .info .title{color:var(--aventus-color);margin:0;position:relative}:host .card .info .title::before{background:var(--primary-color);border:3px solid var(--aventus-color);border-radius:999px;content:"";height:10px;position:absolute;width:10px}:host .card .info p{margin:0;padding:0}:host .card::before{border:solid var(--aventus-color);content:"";position:absolute;width:50%}:host(:nth-child(odd)) .card{padding:30px 0 30px 30px}:host(:nth-child(odd)) .card .info .title::before{left:-45px}:host(:nth-child(odd)) .card::before{border-radius:50px 0 0 50px;border-width:5px 0 5px 5px;bottom:-5px;left:0px;top:-5px}:host(:nth-child(even)) .card{padding:30px 30px 30px 0}:host(:nth-child(even)) .card .info .title{text-align:right}:host(:nth-child(even)) .card .info .title::before{right:-45px}:host(:nth-child(even)) .card .info p{text-align:right}:host(:nth-child(even)) .card::before{border-radius:0 50px 50px 0;border-width:5px 5px 5px 0;bottom:0;right:0;top:0}:host(:first-child) .card::before{border-top:0;border-top-left-radius:0}:host(:last-child:nth-child(odd)) .card::before{border-bottom:0;border-bottom-left-radius:0}:host(:last-child:nth-child(even)) .card::before{border-bottom:0;border-bottom-right-radius:0}`;
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
    "roadmapitem_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__2848ef13afde5ada8fbe23b5b1e684eamethod0())}`,
      "once": true
    }
  }
}); }
    getClassName() {
        return "RoadMapItem";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('name')){ this['name'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('name'); }
    __2848ef13afde5ada8fbe23b5b1e684eamethod0() {
        return this.name;
    }
}
RoadMapItem.Namespace=`${moduleName}`;
RoadMapItem.Tag=`av-road-map-item`;
_.RoadMapItem=RoadMapItem;
if(!window.customElements.get('av-road-map-item')){window.customElements.define('av-road-map-item', RoadMapItem);Aventus.WebComponentInstance.registerDefinition(RoadMapItem);}

const RoadMap = class RoadMap extends Aventus.WebComponent {
    static __style = `:host{display:flex;justify-content:center}:host .timeline{background:var(--primary-color);box-shadow:var(--elevation-3);margin:20px auto;padding:20px;border-radius:3px}`;
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
RoadMap.Namespace=`${moduleName}`;
RoadMap.Tag=`av-road-map`;
_.RoadMap=RoadMap;
if(!window.customElements.get('av-road-map')){window.customElements.define('av-road-map', RoadMap);Aventus.WebComponentInstance.registerDefinition(RoadMap);}

const Footer = class Footer extends Aventus.WebComponent {
    static __style = `:host{background-color:var(--primary-color);display:block;height:50px;width:100%}:host .container{align-items:center;color:var(--primary-font-color);display:flex;height:100%;justify-content:space-between;margin:auto;max-width:1000px;font-size:14px;padding:0 20px}:host .container div{text-align:center}`;
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
Footer.Namespace=`${moduleName}`;
Footer.Tag=`av-footer`;
_.Footer=Footer;
if(!window.customElements.get('av-footer')){window.customElements.define('av-footer', Footer);Aventus.WebComponentInstance.registerDefinition(Footer);}

const Button = class Button extends Aventus.WebComponent {
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
Button.Namespace=`${moduleName}`;
Button.Tag=`av-button`;
_.Button=Button;
if(!window.customElements.get('av-button')){window.customElements.define('av-button', Button);Aventus.WebComponentInstance.registerDefinition(Button);}

const Page = class Page extends Aventus.Navigation.Page {
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
}
Page.Namespace=`${moduleName}`;
_.Page=Page;

const Page404 = class Page404 extends Page {
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
Page404.Namespace=`${moduleName}`;
Page404.Tag=`av-page-404`;
_.Page404=Page404;
if(!window.customElements.get('av-page-404')){window.customElements.define('av-page-404', Page404);Aventus.WebComponentInstance.registerDefinition(Page404);}

const Home = class Home extends Page {
    static __style = `:host{height:100%;width:100%}:host .container{max-width:none}:host .main{background-color:var(--light-primary-color);display:flex;flex-direction:column;height:400px;overflow:hidden;padding:50px 0;position:relative;width:100%}:host .main .icon-text{align-items:center;flex-grow:1;margin:auto;max-width:1000px;width:100%;z-index:2}:host .main .icon-text av-img{--img-color: var(--aventus-color);flex-shrink:0;height:120px;margin-right:15%;transition:all linear .5s;width:85px}:host .main .icon-text .ventus{overflow:hidden;width:calc(100% - 85px)}:host .main .icon-text .ventus span{color:var(--aventus-color);display:inline-block;font-size:165px;font-variant:small-caps;font-weight:bold;margin-top:-83px;overflow:hidden;transition:all linear .5s;width:440px}:host .main .icon-text av-dynamic-col:first-child{flex-direction:row;justify-content:right}:host .main .icon-text av-dynamic-col:nth-child(2){font-size:16px}:host .main .icon-text .title{color:var(--primary-font-color);font-size:30px}:host .main .btn-container{margin:auto;z-index:2}:host .main .btn-container av-dynamic-col{flex-direction:row;justify-content:center}:host .main .btn-container av-dynamic-col av-button{margin:0 10px}:host .main av-img.design-logo{--img-color: rgb(200, 200, 200);height:150%;left:-200px;opacity:.3;position:absolute;top:30px;z-index:1}:host .main av-img.design-logo2{--img-color: rgb(200, 200, 200);height:150%;opacity:.3;position:absolute;right:-200px;top:30px;transform:rotate(180deg);z-index:1}:host .blocks{margin:50px auto;max-width:1200px}:host .blocks av-dynamic-col{padding:10px 20px}:host .blocks av-dynamic-col .block{background-color:var(--light-primary-color);border-radius:5px;box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);color:var(--primary-font-color);display:flex;flex-direction:column;height:100%;padding:30px;width:100%}:host .blocks av-dynamic-col .block .title{font-size:28px;font-weight:bold;letter-spacing:1px}:host .blocks av-dynamic-col .block p{align-items:center;display:flex;flex-grow:1;text-align:justify}:host .blocks av-dynamic-col:nth-child(2) .block{background-color:var(--aventus-color)}:host .separator{background:linear-gradient(90deg, transparent 0%, var(--text-color) 50%, transparent 100%);height:1px;margin:auto;width:75%}:host .why{margin:50px auto;max-width:1200px;padding:0 50px}:host .why h2{color:var(--title-color)}:host .why p{color:var(--text-color);font-size:18px;text-align:justify}:host .why .important{font-size:20px;font-weight:600}@media screen and (max-width: 505px){:host .main .icon-text{flex-direction:column}:host .main .icon-text av-dynamic-col{justify-content:center !important;text-align:center;width:100%}:host .main .icon-text av-img{margin-right:0}}`;
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
Home.Namespace=`${moduleName}`;
Home.Tag=`av-home`;
_.Home=Home;
if(!window.customElements.get('av-home')){window.customElements.define('av-home', Home);Aventus.WebComponentInstance.registerDefinition(Home);}

const About = class About extends Page {
    static __style = `:host{height:100%;width:100%}:host>.container{max-width:none}:host .main{background-color:var(--light-primary-color);display:flex;flex-direction:column;height:400px;overflow:hidden;padding:50px 0;position:relative;width:100%}:host .main .title{align-items:center;color:var(--aventus-color);display:flex;font-size:100px;font-variant:small-caps;font-weight:bold;height:100%;justify-content:center;letter-spacing:2px;margin-bottom:40px;padding:0px 20px;text-align:center;width:100%;z-index:2}:host .main av-img.design-logo{--img-color: rgb(200, 200, 200);height:150%;left:-200px;opacity:.3;position:absolute;top:30px;z-index:1}:host .main av-img.design-logo2{--img-color: rgb(200, 200, 200);height:150%;opacity:.3;position:absolute;right:-200px;top:30px;transform:rotate(180deg);z-index:1}:host av-scrollable .container{display:flex}:host .tabs{width:100%}:host .tabs .header{align-items:center;border-bottom:1px solid rgba(229,84,14,.5333333333);border-bottom:1px solid var(--aventus-color);display:flex;height:50px;margin-top:50px;padding:0px 10px;width:100%}:host .tabs .header .tab{align-items:center;background-color:var(--primary-color);border-top-left-radius:5px;border-top-right-radius:5px;cursor:pointer;display:flex;height:100%;margin:0 5px;padding:0 15px;position:relative;color:var(--primary-font-color)}:host .tabs .header .tab:not(.active):hover{background-color:var(--aventus-color)}:host .tabs .header .tab:first-child{margin-left:0}:host .tabs .header .tab.active{background-color:var(--aventus-color)}:host .tabs .body{padding:0 15px}:host .tabs .body .tab{display:none}:host .tabs .body .tab.active{display:block}:host .tabs .body p{font-size:18px;text-align:justify;line-height:1.8}:host .tabs h2{color:var(--title-color);text-align:center}:host .tabs .help-us{margin:auto;max-width:530px;text-align:justify}:host .tabs .cards{align-items:center;display:flex;justify-content:center;margin-bottom:40px;margin-top:40px;width:100%}:host .tabs .cards .card{align-items:center;background-color:var(--light-primary-color);border-radius:15px;display:flex;flex-direction:column;flex-grow:1;justify-content:center;max-width:500px;position:relative;box-shadow:var(--elevation-3)}:host .tabs .cards .card .img{background-position:center center;background-repeat:no-repeat;background-size:cover;border-radius:100px;height:200px;margin:20px 0;width:200px}:host .tabs .cards .card .name{color:var(--aventus-color);font-size:25px}:host .tabs .cards .card .position{color:rgba(229,84,14,.6);font-size:20px;margin-bottom:10px}:host .tabs .cards .card .location{color:var(--primary-font-color);font-size:16px}:host .tabs .cards .card .language{color:var(--primary-font-color);font-size:16px;margin-bottom:20px}:host .tabs .cards .card .sponsor{align-items:center;border:1px solid var(--primary-font-color);border-radius:5px;cursor:pointer;display:flex;justify-content:center;margin-bottom:10px;padding:5px 15px;transition:border .2s linear;text-decoration:none}:host .tabs .cards .card .sponsor svg{fill:var(--primary-font-color);height:20px;transition:fill .2s linear;width:20px}:host .tabs .cards .card .sponsor span{color:var(--primary-font-color);margin-left:10px;transition:color .2s linear}:host .tabs .cards .card .sponsor:hover{border:1px solid var(--aventus-color)}:host .tabs .cards .card .sponsor:hover svg{fill:var(--aventus-color)}:host .tabs .cards .card .sponsor:hover span{color:var(--aventus-color)}:host .tabs .cards .card .github{height:30px;position:absolute;right:20px;top:20px;width:30px}:host .tabs .cards .card .github svg{cursor:pointer;fill:var(--primary-font-color);transition:.2s fill linear}:host .tabs .cards .card .github:hover svg{fill:#000}:host .tabs .tab[name=sponsor]{padding-bottom:40px}@media screen and (max-width: 400px){:host .main .title{font-size:80px}}`;
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
        blocks: { 'default':`<av-scrollable floating_scroll>    <div class="main">        <div class="title">            about aventus        </div>        <av-img class="design-logo" src="/img/logo.svg"></av-img>        <av-img class="design-logo2" src="/img/logo.svg"></av-img>    </div>    <div class="container">        <div class="tabs">            <div class="header">                <div class="tab active" tab-name="map" _id="about_0">Roadmap</div>                <div class="tab" tab-name="team" _id="about_1">Team</div>                <div class="tab" tab-name="sponsor" _id="about_2">Sponsor</div>            </div>            <div class="body">                <div class="tab active" name="map">                    <h2>Aventus Roadmap</h2>                    <p>The road map will depend of the community feedbacks, but the team has already agreed on the                        following points.</p>                    <div class="road-map">                        <av-road-map>                            <av-road-map-item name="Aventus@UI">End the Aventus@UI package to provide a simple solution                                to create user interface.</av-road-map-item>                            <av-road-map-item name="SCSS">Improve SCSS autocompletion and improve usability by creating                                scss tree based on the DOM.</av-road-map-item>                            <av-road-map-item name="i18n">Add a method to translate your application based on the i18n                                logic.</av-road-map-item>                            <av-road-map-item name="AventusSharp">End the AventusSharp library to write fullstack                                application with Aventus.</av-road-map-item>                            <av-road-map-item name="Data">Auto manage data link inside the RAM to get a perfect data                                sync.</av-road-map-item>                        </av-road-map>                    </div>                </div>                <div class="tab" name="team">                    <h2>Team</h2>                    <p class="help-us">Aventus is a product develop by Cobwebsite company. We are looking for support to                        ensure that this project lasts. If you would like to help us directly with the project, please                        send an email to <a href="mailto:info@cobwebsite.ch">info@cobwebsite.ch</a>. You can also give                        us financial support via github donations.</p>                    <div class="cards">                        <div class="card">                            <div class="img" style="background-image:url(https://avatars.githubusercontent.com/u/19285564?v=4)">                            </div>                            <div class="name">Maxime Bétrisey</div>                            <div class="position">Creator</div>                            <a class="sponsor" href="https://github.com/sponsors/max529" target="_blank">                                <svg data-v-a71028e4="" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24" class="sponsor-icon">                                    <path d="M12,22.2c-0.3,0-0.5-0.1-0.7-0.3l-8.8-8.8c-2.5-2.5-2.5-6.7,0-9.2c2.5-2.5,6.7-2.5,9.2,0L12,4.3l0.4-0.4c0,0,0,0,0,0C13.6,2.7,15.2,2,16.9,2c0,0,0,0,0,0c1.7,0,3.4,0.7,4.6,1.9l0,0c1.2,1.2,1.9,2.9,1.9,4.6c0,1.7-0.7,3.4-1.9,4.6l-8.8,8.8C12.5,22.1,12.3,22.2,12,22.2zM7,4C5.9,4,4.7,4.4,3.9,5.3c-1.8,1.8-1.8,4.6,0,6.4l8.1,8.1l8.1-8.1c0.9-0.9,1.3-2,1.3-3.2c0-1.2-0.5-2.3-1.3-3.2l0,0C19.3,4.5,18.2,4,17,4c0,0,0,0,0,0c-1.2,0-2.3,0.5-3.2,1.3c0,0,0,0,0,0l-1.1,1.1c-0.4,0.4-1,0.4-1.4,0l-1.1-1.1C9.4,4.4,8.2,4,7,4z">                                    </path>                                </svg>                                <span>Sponsor</span>                            </a>                            <div class="location">Switzerland</div>                            <div class="language">French - English</div>                            <a class="github" href="https://github.com/max529" target="_blank">                                <svg data-v-a71028e4="" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24" class="social-icon">                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12">                                    </path>                                </svg>                            </a>                        </div>                    </div>                </div>                <div class="tab" name="sponsor">                    <h2>Sponsor</h2>                    <h3>Become a Sponsor of Aventus</h3>                    <p>Join us in our mission to advance web development by becoming a sponsor of Aventus. Your support plays a vital role in our ability to enhance Aventus, expand its capabilities, and empower developers like you to create exceptional web experiences. Together, we can invest more time and resources into making Aventus even more powerful and providing new opportunities for programming professionals.</p>                    <h3 style="display:none">Our Generous Sponsors</h3>                    <p style="display:none">We would like to express our deep gratitude to the individuals and companies who support Aventus. Their trust and ongoing support inspire us to go further and push the boundaries of web development. Here is a list of the sponsors who put their trust in us and accompany us on our journey towards excellence:</p>                    <av-sponsor-logo style="display:none"></av-sponsor-logo>                    <p style="display:none">We extend heartfelt thanks to all our sponsors for their invaluable support. It is through their contributions that we are able to continue our work, develop Aventus, and provide developers with an exceptional platform to build cutting-edge web applications.</p>                </div>            </div>        </div>    </div>    <av-footer></av-footer></av-scrollable>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "pressEvents": [
    {
      "id": "about_0",
      "onPress": (e, pressInstance, c) => { c.comp.changeTab(e, pressInstance); }
    },
    {
      "id": "about_1",
      "onPress": (e, pressInstance, c) => { c.comp.changeTab(e, pressInstance); }
    },
    {
      "id": "about_2",
      "onPress": (e, pressInstance, c) => { c.comp.changeTab(e, pressInstance); }
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
About.Namespace=`${moduleName}`;
About.Tag=`av-about`;
_.About=About;
if(!window.customElements.get('av-about')){window.customElements.define('av-about', About);Aventus.WebComponentInstance.registerDefinition(About);}

const IconLib=class IconLib {
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
IconLib.Namespace=`${moduleName}`;
_.IconLib=IconLib;
const Icon = class Icon extends Aventus.WebComponent {
    static get observedAttributes() {return ["icon"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }    static isFirstIcon = true;
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
Icon.Namespace=`${moduleName}`;
Icon.Tag=`av-icon`;
_.Icon=Icon;
if(!window.customElements.get('av-icon')){window.customElements.define('av-icon', Icon);Aventus.WebComponentInstance.registerDefinition(Icon);}

const Navbar = class Navbar extends Aventus.WebComponent {
    get 'open'() { return this.getBoolAttr('open') }
    set 'open'(val) { this.setBoolAttr('open', val) }    static __style = `:host{background-color:var(--primary-color);height:50px;width:100%}:host .container{display:flex;height:100%;justify-content:space-between;margin:auto;max-width:1000px}:host .container .left{height:100%;justify-self:start}:host .container .left av-router-link{display:inline-block;height:100%}:host .container .left av-router-link av-img{--img-color: var(--aventus-color);cursor:pointer;height:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host .container .right{align-items:center;color:var(--primary-font-color);display:flex;justify-self:end}:host .container .right .menu{border-radius:5px;cursor:pointer;margin:0 5px;padding:5px 10px;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0);transition:color .5s var(--bezier-curve),background-color .5s var(--bezier-curve)}:host .container .right .menu:hover{background-color:var(--light-primary-color);color:var(--aventus-color)}:host .container .right .menu.active{background-color:var(--light-primary-color);color:var(--aventus-color)}:host .container .right .menu-title{color:var(--aventus-color);display:none;font-size:2.4rem;margin:16px 0;text-align:center;width:100%}:host .container .right .menu-close-icon{display:none}:host .container .icon{align-items:center;color:var(--aventus-color);display:none;font-size:22px;height:100%;margin-right:16px}:host .container .hider{display:none}@media screen and (max-width: 1100px){:host .container .right{align-items:self-start;background-color:var(--primary-color);box-shadow:0 -10px 5px var(--aventus-color);color:var(--primary-font-color);flex-direction:column;height:100%;position:fixed;right:-300px;top:0px;transition:.4s right var(--bezier-curve);width:250px;z-index:90}:host .container .right .menu-title{display:block}:host .container .right .menu{margin:5px 0;margin-left:24px}:host .container .right .menu-close-icon{color:var(--aventus-color);display:block;font-size:21px;left:16px;position:absolute;top:13px}:host .container .icon{display:flex}:host .container .hider{background-color:rgba(0,0,0,0);display:none;height:100%;left:0;position:fixed;top:0;width:100%;z-index:9}:host([open]) .container .right{right:0}:host([open]) .container .hider{display:block}}`;
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
      "onPress": (e, pressInstance, c) => { c.comp.closeMenu(e, pressInstance); }
    },
    {
      "id": "navbar_1",
      "onPress": (e, pressInstance, c) => { c.comp.openMenu(e, pressInstance); }
    },
    {
      "id": "navbar_2",
      "onPress": (e, pressInstance, c) => { c.comp.closeMenu(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "Navbar";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('open')) { this.attributeChangedCallback('open', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('open'); }
    __listBoolProps() { return ["open"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    openMenu() {
        this.open = true;
    }
    closeMenu() {
        this.open = false;
    }
}
Navbar.Namespace=`${moduleName}`;
Navbar.Tag=`av-navbar`;
_.Navbar=Navbar;
if(!window.customElements.get('av-navbar')){window.customElements.define('av-navbar', Navbar);Aventus.WebComponentInstance.registerDefinition(Navbar);}

const TutorialSidenav = class TutorialSidenav extends Aventus.WebComponent {
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
      "onPress": (e, pressInstance, c) => { c.comp.closeNav(e, pressInstance); }
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
        if (active) {
            let all = Array.from(this.shadowRoot.querySelectorAll("av-router-link"));
            let index = all.indexOf(active);
            if (index > 0) {
                result.previous = all[index - 1].state;
            }
            if (index < all.length - 1) {
                result.next = all[index + 1].state;
            }
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
        this.findParentByType(TutorialPage)?.closeMenu();
    }
    postCreation() {
        this.addActiveWatch();
    }
}
TutorialSidenav.Namespace=`${moduleName}`;
TutorialSidenav.Tag=`av-tutorial-sidenav`;
_.TutorialSidenav=TutorialSidenav;
if(!window.customElements.get('av-tutorial-sidenav')){window.customElements.define('av-tutorial-sidenav', TutorialSidenav);Aventus.WebComponentInstance.registerDefinition(TutorialSidenav);}

const DocSidenav = class DocSidenav extends Aventus.WebComponent {
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
        blocks: { 'default':`<av-icon icon="close" class="close-icon" _id="docsidenav_0"></av-icon><av-scrollable class="menu">    <av-collapse>        <div class="title" slot="header">install</div>        <ul>            <li><av-router-link state="/docs/introduction">Introduction</av-router-link></li>            <li><av-router-link state="/docs/installation">Install Aventus</av-router-link></li>            <li><av-router-link state="/docs/experience">Dev experience</av-router-link></li>            <li><av-router-link state="/docs/first_app">Your first app</av-router-link></li>        </ul>    </av-collapse>    <av-collapse>        <div class="title" slot="header">configuration</div>        <ul>            <li><av-router-link state="/docs/config/basic_prop">Generic properties</av-router-link></li>            <li><av-router-link state="/docs/config/build">Builds</av-router-link></li>            <li><av-router-link state="/docs/config/static">Statics</av-router-link></li>            <li><av-router-link state="/docs/config/lib">Import libs</av-router-link></li>        </ul>    </av-collapse>    <av-collapse>        <div class="title" slot="header">data</div>        <ul>            <li><av-router-link state="/docs/data/create">Create</av-router-link></li>        </ul>    </av-collapse>    <av-collapse>        <div class="title" slot="header">ram</div>        <ul>            <li><av-router-link state="/docs/ram/create">Create</av-router-link></li>            <li><av-router-link state="/docs/ram/crud">CRUD operation</av-router-link></li>            <li><av-router-link state="/docs/ram/listen_changes">Listen changes</av-router-link></li>            <li><av-router-link state="/docs/ram/mixin">Extend data</av-router-link></li>        </ul>    </av-collapse>    <av-collapse>        <div class="title" slot="header">state</div>        <ul>            <li><av-router-link state="/docs/state/create">Create</av-router-link></li>            <li><av-router-link state="/docs/state/change">Change state</av-router-link></li>            <li><av-router-link state="/docs/state/listen_changes">Listen state change</av-router-link></li>        </ul>    </av-collapse>    <av-collapse>        <div class="title" slot="header">webcomponent</div>        <ul>            <li><av-router-link state="/docs/wc/create">Create</av-router-link></li>            <li><av-router-link state="/docs/wc/inheritance">Inhertiance</av-router-link></li>            <li><av-router-link state="/docs/wc/attribute">Attribute</av-router-link></li>            <li><av-router-link state="/docs/wc/property">Property</av-router-link></li>            <li><av-router-link state="/docs/wc/watch">Watch</av-router-link></li>            <li><av-router-link state="/docs/wc/style">Style</av-router-link></li>            <li><av-router-link state="/docs/wc/interpolation">Interpolation</av-router-link></li>            <li><av-router-link state="/docs/wc/element">Select element</av-router-link></li>            <li><av-router-link state="/docs/wc/injection">Injection</av-router-link></li>            <li><av-router-link state="/docs/wc/loop">Loop</av-router-link></li>            <li><av-router-link state="/docs/wc/event">Event</av-router-link></li>            <li><av-router-link state="/docs/wc/binding">Binding</av-router-link></li>            <li><av-router-link state="/docs/wc/state">State</av-router-link></li>        </ul>    </av-collapse>    <av-collapse>        <div class="title" slot="header">lib</div>        <ul>            <li><av-router-link state="/docs/lib/create">Create</av-router-link></li>            <li><av-router-link state="/docs/lib/animation">Animation</av-router-link></li>            <li><av-router-link state="/docs/lib/callback">Callback</av-router-link></li>            <li><av-router-link state="/docs/lib/press_manager">PressManager</av-router-link></li>            <li><av-router-link state="/docs/lib/drag_and_drop">Drag&Drop</av-router-link></li>            <li><av-router-link state="/docs/lib/instance">Instance</av-router-link></li>            <li><av-router-link state="/docs/lib/resize_observer">ResizeObserver</av-router-link></li>            <li><av-router-link state="/docs/lib/resource_loader">ResourceLoader</av-router-link></li>            <li><av-router-link state="/docs/lib/watcher">Watcher</av-router-link></li>            <li><av-router-link state="/docs/lib/tools">Tools</av-router-link></li>        </ul>    </av-collapse>    <av-collapse>        <div class="title" slot="header">advanced</div>        <ul>            <li><av-router-link state="/docs/advanced/template">Template</av-router-link></li>        </ul>    </av-collapse></av-scrollable>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "pressEvents": [
    {
      "id": "docsidenav_0",
      "onPress": (e, pressInstance, c) => { c.comp.closeNav(e, pressInstance); }
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
        if (active) {
            let all = Array.from(this.shadowRoot.querySelectorAll("av-router-link"));
            let index = all.indexOf(active);
            if (index > 0) {
                result.previous = all[index - 1].state;
            }
            if (index < all.length - 1) {
                result.next = all[index + 1].state;
            }
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
        this.findParentByType(DocPage)?.closeMenu();
    }
    postCreation() {
        this.addActiveWatch();
    }
}
DocSidenav.Namespace=`${moduleName}`;
DocSidenav.Tag=`av-doc-sidenav`;
_.DocSidenav=DocSidenav;
if(!window.customElements.get('av-doc-sidenav')){window.customElements.define('av-doc-sidenav', DocSidenav);Aventus.WebComponentInstance.registerDefinition(DocSidenav);}

const DocGenericPage = class DocGenericPage extends Page {
    get 'fade'() { return this.getBoolAttr('fade') }
    set 'fade'(val) { this.setBoolAttr('fade', val) }    static __style = `:host{color:var(--text-color);opacity:0;transition:visibility .3s ease-in,opacity .3s ease-in;visibility:hidden}:host .container{max-width:none;width:100%}:host .container img{border-radius:5px}:host .container av-scrollable{--scroller-right: 10px}:host .container .page-content{font-size:1.6rem;margin:auto;padding:0 50px}:host .icon-menu{background-color:#fff;color:var(--primary-color);cursor:pointer;display:none;font-size:25px;left:16px;position:absolute;-webkit-tap-highlight-color:rgba(0,0,0,0);top:28px;z-index:9999}:host h1{color:var(--title-color);font-size:3.2rem;margin:2.3rem 0;text-align:center}:host a{color:var(--link-color);text-decoration:none}:host p{line-height:1.7;text-align:justify}:host av-router-link,:host av-router-link{color:var(--link-color);cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host av-img,:host av-docu-img{max-height:300px;width:100%}:host ul li,:host ol li{margin:5px 0}:host .table{margin:15px 0}:host .table .header{font-size:20px;font-weight:bold;padding:0px}:host .table .header av-dynamic-col{text-align:center}:host .table .header::after{background:linear-gradient(90deg, transparent 0%, var(--text-color) 50%, transparent 100%);content:"";height:1px;margin:5px auto;width:100%}:host .table av-dynamic-row{align-items:center;padding:10px}:host .table av-dynamic-row av-dynamic-col{padding:0 15px;text-align:center}:host .cn{background-color:#cfd1d4;background-color:var(--light-primary-color);border-radius:5px;color:var(--aventus-color);font-size:14px;padding:2px 8px}:host([fade]){opacity:1;visibility:visible}@media screen and (max-width: 1100px){:host .container av-scrollable{--scroller-right: 3px}:host .container .page-content{padding:0px 16px}:host h1{padding:0 32px}:host .icon-menu{display:block}}`;
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
      "onPress": (e, pressInstance, c) => { c.comp.openMenu(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "DocGenericPage";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('fade')) { this.attributeChangedCallback('fade', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('fade'); }
    __listBoolProps() { return ["fade"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    openMenu() {
        this.findParentByType(DocPage)?.openMenu();
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
DocGenericPage.Namespace=`${moduleName}`;
DocGenericPage.Tag=`av-doc-generic-page`;
_.DocGenericPage=DocGenericPage;
if(!window.customElements.get('av-doc-generic-page')){window.customElements.define('av-doc-generic-page', DocGenericPage);Aventus.WebComponentInstance.registerDefinition(DocGenericPage);}

const DocAdvancedTemplate = class DocAdvancedTemplate extends DocGenericPage {
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
DocAdvancedTemplate.Namespace=`${moduleName}`;
DocAdvancedTemplate.Tag=`av-doc-advanced-template`;
_.DocAdvancedTemplate=DocAdvancedTemplate;
if(!window.customElements.get('av-doc-advanced-template')){window.customElements.define('av-doc-advanced-template', DocAdvancedTemplate);Aventus.WebComponentInstance.registerDefinition(DocAdvancedTemplate);}

const DocLibTools = class DocLibTools extends DocGenericPage {
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
DocLibTools.Namespace=`${moduleName}`;
DocLibTools.Tag=`av-doc-lib-tools`;
_.DocLibTools=DocLibTools;
if(!window.customElements.get('av-doc-lib-tools')){window.customElements.define('av-doc-lib-tools', DocLibTools);Aventus.WebComponentInstance.registerDefinition(DocLibTools);}

const DocLibWatcher = class DocLibWatcher extends DocGenericPage {
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
DocLibWatcher.Namespace=`${moduleName}`;
DocLibWatcher.Tag=`av-doc-lib-watcher`;
_.DocLibWatcher=DocLibWatcher;
if(!window.customElements.get('av-doc-lib-watcher')){window.customElements.define('av-doc-lib-watcher', DocLibWatcher);Aventus.WebComponentInstance.registerDefinition(DocLibWatcher);}

const DocLibResourceLoader = class DocLibResourceLoader extends DocGenericPage {
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
DocLibResourceLoader.Namespace=`${moduleName}`;
DocLibResourceLoader.Tag=`av-doc-lib-resource-loader`;
_.DocLibResourceLoader=DocLibResourceLoader;
if(!window.customElements.get('av-doc-lib-resource-loader')){window.customElements.define('av-doc-lib-resource-loader', DocLibResourceLoader);Aventus.WebComponentInstance.registerDefinition(DocLibResourceLoader);}

const DocLibResizeObserver = class DocLibResizeObserver extends DocGenericPage {
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
DocLibResizeObserver.Namespace=`${moduleName}`;
DocLibResizeObserver.Tag=`av-doc-lib-resize-observer`;
_.DocLibResizeObserver=DocLibResizeObserver;
if(!window.customElements.get('av-doc-lib-resize-observer')){window.customElements.define('av-doc-lib-resize-observer', DocLibResizeObserver);Aventus.WebComponentInstance.registerDefinition(DocLibResizeObserver);}

const DocLibPressManager = class DocLibPressManager extends DocGenericPage {
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
DocLibPressManager.Namespace=`${moduleName}`;
DocLibPressManager.Tag=`av-doc-lib-press-manager`;
_.DocLibPressManager=DocLibPressManager;
if(!window.customElements.get('av-doc-lib-press-manager')){window.customElements.define('av-doc-lib-press-manager', DocLibPressManager);Aventus.WebComponentInstance.registerDefinition(DocLibPressManager);}

const DocLibInstance = class DocLibInstance extends DocGenericPage {
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
DocLibInstance.Namespace=`${moduleName}`;
DocLibInstance.Tag=`av-doc-lib-instance`;
_.DocLibInstance=DocLibInstance;
if(!window.customElements.get('av-doc-lib-instance')){window.customElements.define('av-doc-lib-instance', DocLibInstance);Aventus.WebComponentInstance.registerDefinition(DocLibInstance);}

const DocLibCallback = class DocLibCallback extends DocGenericPage {
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
DocLibCallback.Namespace=`${moduleName}`;
DocLibCallback.Tag=`av-doc-lib-callback`;
_.DocLibCallback=DocLibCallback;
if(!window.customElements.get('av-doc-lib-callback')){window.customElements.define('av-doc-lib-callback', DocLibCallback);Aventus.WebComponentInstance.registerDefinition(DocLibCallback);}

const DocLibAnimation = class DocLibAnimation extends DocGenericPage {
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
DocLibAnimation.Namespace=`${moduleName}`;
DocLibAnimation.Tag=`av-doc-lib-animation`;
_.DocLibAnimation=DocLibAnimation;
if(!window.customElements.get('av-doc-lib-animation')){window.customElements.define('av-doc-lib-animation', DocLibAnimation);Aventus.WebComponentInstance.registerDefinition(DocLibAnimation);}

const DocLibCreate = class DocLibCreate extends DocGenericPage {
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
DocLibCreate.Namespace=`${moduleName}`;
DocLibCreate.Tag=`av-doc-lib-create`;
_.DocLibCreate=DocLibCreate;
if(!window.customElements.get('av-doc-lib-create')){window.customElements.define('av-doc-lib-create', DocLibCreate);Aventus.WebComponentInstance.registerDefinition(DocLibCreate);}

const DocWcState = class DocWcState extends DocGenericPage {
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
DocWcState.Namespace=`${moduleName}`;
DocWcState.Tag=`av-doc-wc-state`;
_.DocWcState=DocWcState;
if(!window.customElements.get('av-doc-wc-state')){window.customElements.define('av-doc-wc-state', DocWcState);Aventus.WebComponentInstance.registerDefinition(DocWcState);}

const DocWcEvent = class DocWcEvent extends DocGenericPage {
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
DocWcEvent.Namespace=`${moduleName}`;
DocWcEvent.Tag=`av-doc-wc-event`;
_.DocWcEvent=DocWcEvent;
if(!window.customElements.get('av-doc-wc-event')){window.customElements.define('av-doc-wc-event', DocWcEvent);Aventus.WebComponentInstance.registerDefinition(DocWcEvent);}

const DocWcLoop = class DocWcLoop extends DocGenericPage {
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
DocWcLoop.Namespace=`${moduleName}`;
DocWcLoop.Tag=`av-doc-wc-loop`;
_.DocWcLoop=DocWcLoop;
if(!window.customElements.get('av-doc-wc-loop')){window.customElements.define('av-doc-wc-loop', DocWcLoop);Aventus.WebComponentInstance.registerDefinition(DocWcLoop);}

const DocWcInjection = class DocWcInjection extends DocGenericPage {
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
DocWcInjection.Namespace=`${moduleName}`;
DocWcInjection.Tag=`av-doc-wc-injection`;
_.DocWcInjection=DocWcInjection;
if(!window.customElements.get('av-doc-wc-injection')){window.customElements.define('av-doc-wc-injection', DocWcInjection);Aventus.WebComponentInstance.registerDefinition(DocWcInjection);}

const DocWcBinding = class DocWcBinding extends DocGenericPage {
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
DocWcBinding.Namespace=`${moduleName}`;
DocWcBinding.Tag=`av-doc-wc-binding`;
_.DocWcBinding=DocWcBinding;
if(!window.customElements.get('av-doc-wc-binding')){window.customElements.define('av-doc-wc-binding', DocWcBinding);Aventus.WebComponentInstance.registerDefinition(DocWcBinding);}

const DocWcElement = class DocWcElement extends DocGenericPage {
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
DocWcElement.Namespace=`${moduleName}`;
DocWcElement.Tag=`av-doc-wc-element`;
_.DocWcElement=DocWcElement;
if(!window.customElements.get('av-doc-wc-element')){window.customElements.define('av-doc-wc-element', DocWcElement);Aventus.WebComponentInstance.registerDefinition(DocWcElement);}

const DocWcInterpolation = class DocWcInterpolation extends DocGenericPage {
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
DocWcInterpolation.Namespace=`${moduleName}`;
DocWcInterpolation.Tag=`av-doc-wc-interpolation`;
_.DocWcInterpolation=DocWcInterpolation;
if(!window.customElements.get('av-doc-wc-interpolation')){window.customElements.define('av-doc-wc-interpolation', DocWcInterpolation);Aventus.WebComponentInstance.registerDefinition(DocWcInterpolation);}

const DocWcStyle = class DocWcStyle extends DocGenericPage {
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
DocWcStyle.Namespace=`${moduleName}`;
DocWcStyle.Tag=`av-doc-wc-style`;
_.DocWcStyle=DocWcStyle;
if(!window.customElements.get('av-doc-wc-style')){window.customElements.define('av-doc-wc-style', DocWcStyle);Aventus.WebComponentInstance.registerDefinition(DocWcStyle);}

const DocWcWatch = class DocWcWatch extends DocGenericPage {
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
DocWcWatch.Namespace=`${moduleName}`;
DocWcWatch.Tag=`av-doc-wc-watch`;
_.DocWcWatch=DocWcWatch;
if(!window.customElements.get('av-doc-wc-watch')){window.customElements.define('av-doc-wc-watch', DocWcWatch);Aventus.WebComponentInstance.registerDefinition(DocWcWatch);}

const DocWcProperty = class DocWcProperty extends DocGenericPage {
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
DocWcProperty.Namespace=`${moduleName}`;
DocWcProperty.Tag=`av-doc-wc-property`;
_.DocWcProperty=DocWcProperty;
if(!window.customElements.get('av-doc-wc-property')){window.customElements.define('av-doc-wc-property', DocWcProperty);Aventus.WebComponentInstance.registerDefinition(DocWcProperty);}

const DocWcAttribute = class DocWcAttribute extends DocGenericPage {
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
DocWcAttribute.Namespace=`${moduleName}`;
DocWcAttribute.Tag=`av-doc-wc-attribute`;
_.DocWcAttribute=DocWcAttribute;
if(!window.customElements.get('av-doc-wc-attribute')){window.customElements.define('av-doc-wc-attribute', DocWcAttribute);Aventus.WebComponentInstance.registerDefinition(DocWcAttribute);}

const DocWcInheritance = class DocWcInheritance extends DocGenericPage {
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
DocWcInheritance.Namespace=`${moduleName}`;
DocWcInheritance.Tag=`av-doc-wc-inheritance`;
_.DocWcInheritance=DocWcInheritance;
if(!window.customElements.get('av-doc-wc-inheritance')){window.customElements.define('av-doc-wc-inheritance', DocWcInheritance);Aventus.WebComponentInstance.registerDefinition(DocWcInheritance);}

const DocConfigLib = class DocConfigLib extends DocGenericPage {
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
DocConfigLib.Namespace=`${moduleName}`;
DocConfigLib.Tag=`av-doc-config-lib`;
_.DocConfigLib=DocConfigLib;
if(!window.customElements.get('av-doc-config-lib')){window.customElements.define('av-doc-config-lib', DocConfigLib);Aventus.WebComponentInstance.registerDefinition(DocConfigLib);}

const DocConfigStatic = class DocConfigStatic extends DocGenericPage {
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
        blocks: { 'default':`<h1>Configuration - Static</h1><p>Even if Aventus is great for your project, you will need others files like .html, .png, etc. You can put your source file inside a static folder that will be exported.</p><h2>Properties</h2><div class="table">    <av-dynamic-row class="header">        <av-dynamic-col size="4" center>Name</av-dynamic-col>        <av-dynamic-col size="8" center>Description</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>name</av-dynamic-col>        <av-dynamic-col size="8" center>This is the name for the static part. This name is only use if you use the command "Aventus : Copy static" to allow the user to choose the right folder to export.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>input</av-dynamic-col>        <av-dynamic-col size="8" center>This is a string to define which folder Aventus will watch. For            example, if you set "./src/static/*", all files inside the folder "src/static" will be exported.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>output</av-dynamic-col>        <av-dynamic-col size="8" center>This is string to define where the static files will be exported.        </av-dynamic-col>    </av-dynamic-row></div><h2>Special files</h2><p>Inside the static folder, you can write some specials files that will be compiled to be supported by the browser.</p><h3>Sass</h3><p>You can write sass file inside the static folder that will be compiled to a css file. If your file name starts with a <span class="cn">_</span> Aventus will ignore it. (ex: _reset.scss)</p><h3>Global Style</h3><p>A good practice to develop a website is to declare theme variables and then use it inside your webcomponent. To do that, you can write a file <span class="cn">*.gs.avt</span> that will be compiled to a css file. The only goal of this file is to provide autocompletion for your css variables declared inside the <span class="cn">:root</span>.</p><av-code language="css" filename="theme.gs.avt">    :root {        --primary-color: #20232a;        --light-primary-color: #282c34;        --aventus-color: #e5540e;        --primary-font-color: white;        --link-color: #5680ed;        ...    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocConfigStatic";
    }
}
DocConfigStatic.Namespace=`${moduleName}`;
DocConfigStatic.Tag=`av-doc-config-static`;
_.DocConfigStatic=DocConfigStatic;
if(!window.customElements.get('av-doc-config-static')){window.customElements.define('av-doc-config-static', DocConfigStatic);Aventus.WebComponentInstance.registerDefinition(DocConfigStatic);}

const DocConfigBuild = class DocConfigBuild extends DocGenericPage {
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
        blocks: { 'default':`<h1>Configuration - Build</h1><p>Inside a module, you can split you code into differents submodules. Inside Aventus, this submodule is called a    <span class="cn">Build</span>. The build job is to transform some Aventus input files into a JavaScript file (for an    app) and/or a    Aventus Package File (for a lib).</p><div class="table">    <av-dynamic-row class="header">        <av-dynamic-col size="4" center>Name</av-dynamic-col>        <av-dynamic-col size="8" center>Description</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>name</av-dynamic-col>        <av-dynamic-col size="8" center>            <div>This is the name for the build. If the build is exported as a library, the                library name                will be <span class="cn">$module</span>@<span class="cn">$name</span></div>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>src</av-dynamic-col>        <av-dynamic-col size="8" center>This is an array of string to define which folders Aventus will watch. For            example, if you set "./src/*", all files inside the folder "src" will be compiled.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>disabled</av-dynamic-col>        <av-dynamic-col size="8" center>This is a boolean to define if the build is active or not.            <span class="constraint">Must satisfy: <span class="cn">true|false</span></span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>compile</av-dynamic-col>        <av-dynamic-col size="8" center>This is an array to define how to compile your build.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>compile.input</av-dynamic-col>        <av-dynamic-col size="8" center>This is string or an array to define the entries points of your program. If not set, all the files matching the build.src will be compiled. Otherwise, only the needed file by your entries points will be compiled        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>compile.output</av-dynamic-col>        <av-dynamic-col size="8" center>This is string to define where the compiled JavaScript file must be written.            <span class="constraint">Must satisfy: ^\\S+\\.js</span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>compile.package</av-dynamic-col>        <av-dynamic-col size="8" center>This is string to define where the .package.avt file must be written.            <span class="constraint">Must satisfy: ^\\S+\\.package\\.avt</span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>outsideModule</av-dynamic-col>        <av-dynamic-col size="8" center>            <div>This is an array of string to define which folders Aventus will watch. The                watched file will be compiled outside of the module. For example, if you define a class "Test" inside a                module "HelloWorld", you can reach the class by typing <span class="cn">window.Test</span> instead of                <span class="cn">window.HelloWorld.Test</span>            </div>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>namespaceStrategy</av-dynamic-col>        <av-dynamic-col size="8" center>            <span>This is a string to define how Aventus must deal with namespace.</span>            <ul>                <li>manual: the developer will write the namespace by himself</li>                <li>followFolders: the namespace will be set based on the current folder and the namespaceRoot property                </li>                <li>rules: the namespace will be set based on the namespaceRules property</li>            </ul>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>namespaceRoot</av-dynamic-col>        <av-dynamic-col size="8" center>            <span>This is a string to define what is the namespace root folder (only for followFolders strategy)</span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>namespaceRules</av-dynamic-col>        <av-dynamic-col size="8" center>            <span>This is an object to define the namespace based on the uri where the key is the namespace and the                value is an array of string to match uri</span>            <av-code language="json">                <pre>                {                    ...,                    namespaceRules:{                        "Data": ["./src/data/*"]                    }                }                </pre>            </av-code></av-code>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>dependances</av-dynamic-col>        <av-dynamic-col size="8" center>            <span>This is an array of <av-router-link state="/docs/config/lib">dependance options</av-router-link> to                use code and/or autocompletion inside your code.</span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>nodeModulesDir</av-dynamic-col>        <av-dynamic-col size="8" center>The path where the node_modules are installed. By default the value is ./node_modules        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>module</av-dynamic-col>        <av-dynamic-col size="8" center>This will override the module value of the <av-router-link state="/docs/config/basic_prop">basic config</av-router-link>.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>version</av-dynamic-col>        <av-dynamic-col size="8" center>This will override the version value of the <av-router-link state="/docs/config/basic_prop">basic config</av-router-link>.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>componentPrefix</av-dynamic-col>        <av-dynamic-col size="8" center>This will override the componentPrefix value of the <av-router-link state="/docs/config/basic_prop">basic config</av-router-link>.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>hideWarnings</av-dynamic-col>        <av-dynamic-col size="8" center>This will override the hideWarnings value of the <av-router-link state="/docs/config/basic_prop">basic config</av-router-link>.        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>avoidParsingInsideTags</av-dynamic-col>        <av-dynamic-col size="8" center>This will override the avoidParsingInsideTags value of the <av-router-link state="/docs/config/basic_prop">basic config</av-router-link>.        </av-dynamic-col>    </av-dynamic-row></div>` }
    });
}
    getClassName() {
        return "DocConfigBuild";
    }
}
DocConfigBuild.Namespace=`${moduleName}`;
DocConfigBuild.Tag=`av-doc-config-build`;
_.DocConfigBuild=DocConfigBuild;
if(!window.customElements.get('av-doc-config-build')){window.customElements.define('av-doc-config-build', DocConfigBuild);Aventus.WebComponentInstance.registerDefinition(DocConfigBuild);}

const DocConfigBasic = class DocConfigBasic extends DocGenericPage {
    static __style = `:host .table av-dynamic-row:not(.header) av-dynamic-col:nth-child(2){text-align:justify}:host .table av-dynamic-row:not(.header) av-router-link{display:contents}:host .table .constraint{display:block;font-size:14px;margin-top:5px}:host .mandatory::after{content:"*";margin-left:5px;font-weight:bold}`;
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
        blocks: { 'default':`<h1>Configuration - Basic info</h1><p>To create an application with Aventus, you need to define a file named <span class="cn">aventus.conf.avt</span>. This file will define    what Aventus must do with your code. The configuration is a json file with properties that are going to be explained    below.</p><div class="table">    <av-dynamic-row class="header">        <av-dynamic-col size="4" center>Name</av-dynamic-col>        <av-dynamic-col size="8" center>Description</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center><span class="mandatory">module</span></av-dynamic-col>        <av-dynamic-col size="8" center>This is the name of the module you are building. All your code will be inside            the module to avoid global variables.            <span class="constraint">Must satisfy: <span class="cn">^[a-zA-Z0-9_]+$</span></span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>version</av-dynamic-col>        <av-dynamic-col size="8" center>This is the version of the module you are building. The first number is the            major version, the second is the minor version and the last is the patch version. By default the value is            1.0.0            <span class="constraint">Must satisfy: <span class="cn">^[0-9]+\\.[0-9]+\\.[0-9]+$</span></span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>componentPrefix</av-dynamic-col>        <av-dynamic-col size="8" center>This is the prefix that are going to be used by all your webcomponents inside the module. For example if my class is named "Test" and my prefix is "av", the final tag will be "av-test". By default, it will use the module name as prefix.            <span class="constraint">Must satisfy: <span class="cn">^[a-z]{2,}$</span></span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>hideWarnings</av-dynamic-col>        <av-dynamic-col size="8" center>This is a boolean to hide warnings inside Aventus. This is useful when you are developing an app but your aren't in production. If you set it to false, you need to document all your methods            <span class="constraint">Must satisfy: <span class="cn">true|false</span></span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>avoidParsingInsideTags</av-dynamic-col>        <av-dynamic-col size="8" center>This is an array of string that the HTML compiler must avoid parsing. For example on this website, the tag av-code isn't parsed by the compiler to avoid detecting some Aventus features inside the HTML code like @element.            <span class="constraint">Each string must satisfy: <span class="cn">^[a-z\-]+$</span></span>        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>aliases</av-dynamic-col>        <av-dynamic-col size="8" center>This is an object of string that allows replacement of code. For example { "@root": "./"} will replace any @root to resolve the root folder</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center><span class="mandatory">build</span></av-dynamic-col>        <av-dynamic-col size="8" center>This is an array of <av-router-link state="/docs/config/build">build options</av-router-link>. Each build is defined by a list of input and will output a .js file and / or a package.avt file        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>dependances</av-dynamic-col>        <av-dynamic-col size="8" center>This is an array of <av-router-link state="/docs/config/lib">dependances options</av-router-link>.</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>static</av-dynamic-col>        <av-dynamic-col size="8" center>This is an array of <av-router-link state="/docs/config/static">static options</av-router-link>.        </av-dynamic-col>    </av-dynamic-row></div>` }
    });
}
    getClassName() {
        return "DocConfigBasic";
    }
}
DocConfigBasic.Namespace=`${moduleName}`;
DocConfigBasic.Tag=`av-doc-config-basic`;
_.DocConfigBasic=DocConfigBasic;
if(!window.customElements.get('av-doc-config-basic')){window.customElements.define('av-doc-config-basic', DocConfigBasic);Aventus.WebComponentInstance.registerDefinition(DocConfigBasic);}

const DocInstallation = class DocInstallation extends DocGenericPage {
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
DocInstallation.Namespace=`${moduleName}`;
DocInstallation.Tag=`av-doc-installation`;
_.DocInstallation=DocInstallation;
if(!window.customElements.get('av-doc-installation')){window.customElements.define('av-doc-installation', DocInstallation);Aventus.WebComponentInstance.registerDefinition(DocInstallation);}

const CodeEditor = class CodeEditor extends Aventus.WebComponent {
    static get observedAttributes() {return ["name", "show"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'has_result'() { return this.getBoolAttr('has_result') }
    set 'has_result'(val) { this.setBoolAttr('has_result', val) }get 'all_open'() { return this.getBoolAttr('all_open') }
    set 'all_open'(val) { this.setBoolAttr('all_open', val) }    get 'name'() { return this.getStringProp('name') }
    set 'name'(val) { this.setStringAttr('name', val) }get 'show'() { return this.getStringProp('show') }
    set 'show'(val) { this.setStringAttr('show', val) }    info = {};
    files = {};
    openedFile;
    static __style = `:host{--_code-editor-menu-width: var(--code-editor-menu-width, 250px)}:host{--code-padding: 0;background-color:#1e1e1e;border-radius:5px;color:#fff;display:flex;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;margin-bottom:15px;overflow:hidden;width:100%}:host .header{align-items:center;border-bottom:1px solid #414141;display:flex;flex-shrink:0;height:50px;justify-content:center;padding:10px;position:relative;width:100%}:host .header mi-icon.download{cursor:pointer;position:absolute;right:10px;transition:background-color .5s var(--bezier-curve)}:host .header mi-icon.download:hover{background-color:rgba(255,255,255,.1)}:host .header span{display:block;padding:0 50px;text-align:center;width:100%}:host .content{display:flex;flex-grow:1;height:calc(100% - 50px);max-height:550px;min-height:300px;padding:0 10px}:host .content .menu{flex-shrink:0;height:100%;min-width:20px;min-width:20px;padding-bottom:10px;width:var(--_code-editor-menu-width)}:host .content .separator{cursor:col-resize;flex-grow:0;flex-shrink:0;inset:0;position:relative;width:5px}:host .content .separator::after{background-color:#414141;bottom:0;content:"";left:2px;position:absolute;top:0;width:1px}:host .content .display{--scrollbar-content-padding: 5px 15px;height:100%;padding-bottom:10px;width:100%}:host .result{border:1px solid #1e1e1e;border-top:1px solid #414141;display:none;padding:15px}:host .result .title{margin-bottom:15px}:host .hidden{display:none}:host([has_result]) .result{display:block}`;
    __getStatic() {
        return CodeEditor;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(CodeEditor.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'result':`<slot name="result"></slot>`,'default':`<slot></slot>` }, 
        blocks: { 'default':`<div class="header">    <span _id="codeeditor_0"></span>    <mi-icon class="download" icon="download" _id="codeeditor_1"></mi-icon></div><div class="content" _id="codeeditor_2">    <av-scrollable class="menu" _id="codeeditor_3"></av-scrollable>    <div class="separator" _id="codeeditor_4"></div>    <av-scrollable class="display" x_scroll _id="codeeditor_5"></av-scrollable></div><div class="result">    <div class="title">Result : </div>    <slot name="result"></slot></div><div class="hidden">    <slot></slot></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "contentEl",
      "ids": [
        "codeeditor_2"
      ]
    },
    {
      "name": "menuEl",
      "ids": [
        "codeeditor_3"
      ]
    },
    {
      "name": "separatorEl",
      "ids": [
        "codeeditor_4"
      ]
    },
    {
      "name": "displayEl",
      "ids": [
        "codeeditor_5"
      ]
    }
  ],
  "content": {
    "codeeditor_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__ba370266f2a97b2bf5e2f53b06f1742amethod0())}`,
      "once": true
    }
  },
  "pressEvents": [
    {
      "id": "codeeditor_1",
      "onPress": (e, pressInstance, c) => { c.comp.download(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "CodeEditor";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('has_result')) { this.attributeChangedCallback('has_result', false, false); }if(!this.hasAttribute('all_open')) {this.setAttribute('all_open' ,'true'); }if(!this.hasAttribute('name')){ this['name'] = undefined; }if(!this.hasAttribute('show')){ this['show'] = undefined; } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('has_result');this.__upgradeProperty('all_open');this.__upgradeProperty('name');this.__upgradeProperty('show'); }
    __listBoolProps() { return ["has_result","all_open"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    async loadJSZip() {
        await Aventus.ResourceLoader.loadInHead({
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'
        });
    }
    async download() {
        await this.loadJSZip();
        let zip = new window.JSZip();
        for (let path in this.files) {
            let p = path;
            if (path.startsWith("/")) {
                p = p.substring(1);
            }
            zip.file(path, this.files[path].code.codeEl.innerText);
        }
        let content = await zip.generateAsync({ type: 'blob' });
        npmCompilation['c940c285ff5c6f70f9e3538ac79e1aec'].saveAs(content, this.name + ".zip");
    }
    openFile(file) {
        if (this.openedFile) {
            this.openedFile.active = false;
            this.openedFile.code.parentNode?.removeChild(this.openedFile.code);
        }
        this.openedFile = file;
        this.openedFile.active = true;
        this.displayEl.appendChild(this.openedFile.code);
    }
    store(path, code) {
        let splitted = path.split("/");
        let lastName = splitted.pop() ?? '';
        let current = this.info;
        for (let split of splitted) {
            if (!current[split]) {
                current[split] = {
                    children: {}
                };
            }
            current = current[split].children;
        }
        current[lastName] = {
            children: {},
            file: code
        };
    }
    loadContent() {
        let elements = this.getElementsInSlot();
        for (let element of elements) {
            if (element instanceof AvCode && element.filename) {
                this.store(element.filename, element);
                element.filename = undefined;
            }
        }
        this.menuEl.innerHTML = "";
        this.renderMenu(this.info, this.menuEl);
        this.has_result = this.getElementsInSlot("result").length > 0;
    }
    renderMenu(info, el, path = "") {
        let names = Object.keys(info).sort();
        for (let name of names) {
            let current = info[name];
            if (!current.file) {
                let folder = new CodeEditorFolder();
                folder.name = name;
                if (this.all_open) {
                    folder.open = true;
                }
                let newPath = path + "/" + name;
                this.renderMenu(current.children, folder, newPath);
                el.appendChild(folder);
            }
        }
        for (let name of names) {
            let current = info[name];
            if (current.file) {
                let newPath = path + "/" + name;
                let file = new CodeEditorFile();
                file.code = current.file;
                file.editor = this;
                file.name = name;
                this.files[newPath] = file;
                el.appendChild(file);
                if (this.show) {
                    if (this.comparePath(this.show, newPath)) {
                        this.openFile(file);
                    }
                }
                else {
                    if (!this.openedFile) {
                        this.openFile(file);
                    }
                }
            }
        }
    }
    comparePath(p1, p2) {
        if (p2.startsWith("/")) {
            p2 = p2.slice(1);
        }
        if (p1.startsWith("/")) {
            p2 = p2.slice(1);
        }
        return p1 == p2;
    }
    addResizeMenu() {
        let startX = 0;
        let startMenuWidth = 0;
        new Aventus.DragAndDrop({
            element: this.separatorEl,
            applyDrag: false,
            offsetDrag: 0,
            onStart: (e) => {
                startMenuWidth = this.menuEl.offsetWidth;
                startX = e.pageX;
            },
            onMove: (e, position) => {
                let diff = e.pageX - startX;
                let newWidth = startMenuWidth + diff;
                this.style.setProperty("--code-editor-menu-width", newWidth + 'px');
            }
        });
    }
    addResizeObserver() {
        // TODO correct
        let observer = new Aventus.ResizeObserver(() => {
            if (this.displayEl['contentWrapper'].offsetHeight >= 550 || this.menuEl['contentWrapper'].offsetHeight >= 550) {
                this.style.height = 600 + 'px';
            }
            else {
                this.style.height = '';
            }
        });
        observer.observe(this.displayEl['contentWrapper']);
        observer.observe(this.menuEl['contentWrapper']);
    }
    postCreation() {
        this.loadContent();
        this.addResizeMenu();
        this.addResizeObserver();
    }
    __ba370266f2a97b2bf5e2f53b06f1742amethod0() {
        return this.name;
    }
}
CodeEditor.Namespace=`${moduleName}`;
CodeEditor.Tag=`av-code-editor`;
_.CodeEditor=CodeEditor;
if(!window.customElements.get('av-code-editor')){window.customElements.define('av-code-editor', CodeEditor);Aventus.WebComponentInstance.registerDefinition(CodeEditor);}

const DocStateListenEditor1 = class DocStateListenEditor1 extends Aventus.WebComponent {
    static __style = `:host{width:100%}`;
    __getStatic() {
        return DocStateListenEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocStateListenEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="State Example" _id="docstatelisteneditor1_0">    <av-code language="json" filename="StateExample/aventus.conf.avt">        <pre>            {                "module": "StateExample",                "build": [                    {                        "name": "Main",                        "src": [                            './src/*'                        ]                    }                ]            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="StateExample/src/CreatePerson.state.avt">        <pre>            import type { Person } from "./Person.data.avt";            &nbsp;            export class CreatePerson extends Aventus.State implements Aventus.IState {                &nbsp;                public editingPerson?: Person;                &nbsp;                /**                * @inheritdoc                */                public override get name(): string {                    return "/person/create";;                }            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="StateExample/src/Main.state.avt">        <pre>            export class MainStateManager extends Aventus.StateManager implements Aventus.IStateManager {                /**                 * Get the instance of the StateManager                 */                public static getInstance() {                    return Aventus.Instance.get(MainStateManager);                }            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="StateExample/src/Person.data.avt">        <pre>            export class Person extends Aventus.Data implements Aventus.IData {                public id: number = 0;                public firstname!: string;                public lastname!: string;            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="StateExample/src/Person.ram.avt">        <pre>            import { Person } from "./Person.data.avt";            &nbsp;            export class PersonRAM extends Aventus.Ram&lt;Person&gt; implements Aventus.IRam {                &nbsp;                /**                * Create a singleton to store data                */                public static getInstance() {                    return Aventus.Instance.get(PersonRAM);                }                &nbsp;                /**                * @inheritdoc                */                public override defineIndexKey(): keyof Person {                    return 'id';                }                /**                * @inheritdoc                */                protected override getTypeForData(objJson: Aventus.KeysObject&lt;Person&gt; | Person): new () => Person {                    return Person;                }            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="StateExample/src/Test.lib.avt">        <pre>            import { MainStateManager } from "./Main.state.avt";            &nbsp;            export async function subscribe() {                MainStateManager.getInstance().subscribe("/user/{id:number}", {                    active: (state: Aventus.State, slugs: Aventus.StateSlug) => {                        console.log("user active is " + slugs.id);                    },                    inactive: (state: Aventus.State, nextState: Aventus.State, oldSlugs: Aventus.StateSlug) => {                        console.log("new state is " + nextState.name);                    },                    askChange: async (state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) => {                        &#105;f(slugs.id == 3) {                            return false;                        }                        return true;                    }                });            }            &nbsp;            export async function setUser(id: number) {                MainStateManager.getInstance().setState("/user/" + id);            }            &nbsp;            export async function removeUser() {                MainStateManager.getInstance().setState("/other");            }        </pre>    </av-code></av-code>    <slot></slot></av-code-editor>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "editorEl",
      "ids": [
        "docstatelisteneditor1_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "DocStateListenEditor1";
    }
    startupFile() {
        return "StateExample/src/Test.lib.avt";
    }
    postCreation() {
        this.editorEl.show = this.startupFile();
    }
}
DocStateListenEditor1.Namespace=`${moduleName}`;
DocStateListenEditor1.Tag=`av-doc-state-listen-editor-1`;
_.DocStateListenEditor1=DocStateListenEditor1;
if(!window.customElements.get('av-doc-state-listen-editor-1')){window.customElements.define('av-doc-state-listen-editor-1', DocStateListenEditor1);Aventus.WebComponentInstance.registerDefinition(DocStateListenEditor1);}

const DocStateListenEditor2 = class DocStateListenEditor2 extends DocStateListenEditor1 {
    static __style = ``;
    __getStatic() {
        return DocStateListenEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocStateListenEditor2.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="StateExample/src/Test.lib.avt">    <pre>        import { MainStateManager } from "./Main.state.avt";        &nbsp;        export async function subscribe() {            MainStateManager.getInstance().subscribe("/user/{id:number}", {                active: (state: Aventus.State, slugs: Aventus.StateSlug) => {                    console.log("user active is " + slugs.id);                },                inactive: (state: Aventus.State, nextState: Aventus.State, oldSlugs: Aventus.StateSlug) => {                    console.log("new state is " + nextState.name);                },                askChange: async (state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) => {                    &#105;f(slugs.id == 3) {                        return false;                    }                    return true;                }            });        }        &nbsp;        export async function setUser(id: number) {            MainStateManager.getInstance().setState("/user/" + id);        }        &nbsp;        export async function removeUser() {            MainStateManager.getInstance().setState("/other");        }        &nbsp;        export async function inactiveNotFired() {            await MainStateManager.getInstance().setState("/user/1");            await MainStateManager.getInstance().setState("/user/2");        }    </pre></av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocStateListenEditor2";
    }
}
DocStateListenEditor2.Namespace=`${moduleName}`;
DocStateListenEditor2.Tag=`av-doc-state-listen-editor-2`;
_.DocStateListenEditor2=DocStateListenEditor2;
if(!window.customElements.get('av-doc-state-listen-editor-2')){window.customElements.define('av-doc-state-listen-editor-2', DocStateListenEditor2);Aventus.WebComponentInstance.registerDefinition(DocStateListenEditor2);}

const DocStateListenEditor3 = class DocStateListenEditor3 extends DocStateListenEditor2 {
    static __style = ``;
    __getStatic() {
        return DocStateListenEditor3;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocStateListenEditor3.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="StateExample/src/Test.lib.avt">    <pre>        import { MainStateManager } from "./Main.state.avt";        &nbsp;        export async function subscribe() {            MainStateManager.getInstance().subscribe("/user/{id:number}", {                active: (state: Aventus.State, slugs: Aventus.StateSlug) => {                    console.log("user active is " + slugs.id);                    // process a type of state                    &#105;f(state instanceof CreatePerson){                        console.log(state.editingPerson?.id);                    }                },                inactive: (state: Aventus.State, nextState: Aventus.State, oldSlugs: Aventus.StateSlug) => {                    console.log("new state is " + nextState.name);                },                askChange: async (state: Aventus.State, nextState: Aventus.State, slugs: Aventus.StateSlug) => {                    &#105;f(slugs.id == 3) {                        return false;                    }                    return true;                }            });        }        &nbsp;        export async function setUser(id: number) {            MainStateManager.getInstance().setState("/user/" + id);        }        &nbsp;        export async function removeUser() {            MainStateManager.getInstance().setState("/other");        }        &nbsp;        export async function inactiveNotFired() {            await MainStateManager.getInstance().setState("/user/1");            await MainStateManager.getInstance().setState("/user/2");        }    </pre></av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocStateListenEditor3";
    }
}
DocStateListenEditor3.Namespace=`${moduleName}`;
DocStateListenEditor3.Tag=`av-doc-state-listen-editor-3`;
_.DocStateListenEditor3=DocStateListenEditor3;
if(!window.customElements.get('av-doc-state-listen-editor-3')){window.customElements.define('av-doc-state-listen-editor-3', DocStateListenEditor3);Aventus.WebComponentInstance.registerDefinition(DocStateListenEditor3);}

const DocStateListenEditor4 = class DocStateListenEditor4 extends DocStateListenEditor3 {
    static __style = ``;
    __getStatic() {
        return DocStateListenEditor4;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocStateListenEditor4.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="StateExample/src/CreatePerson.state.avt">    <pre>        import type { Person } from "./Person.data.avt";        &nbsp;        export class CreatePerson extends Aventus.State implements Aventus.IState {            &nbsp;            public editingPerson?: Person;            &nbsp;            /**            * @inheritdoc            */            public override get name(): string {                return "/person/create";;            }            &nbsp;            /**            * @inheritdoc            */            public override onActivate(): void {                console.log("active");            }            &nbsp;            /**            * @inheritdoc            */            public override onInactivate(nextState: Aventus.State): void {                console.log("inactive");            }            &nbsp;            /**            * @inheritdoc            */            public override async askChange(state: Aventus.State, nextState: Aventus.State): Promise&lt;boolean&gt; {                return true;            }            &nbsp;        }    </pre></av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocStateListenEditor4";
    }
    startupFile() {
        return "StateExample/src/CreatePerson.state.avt";
    }
}
DocStateListenEditor4.Namespace=`${moduleName}`;
DocStateListenEditor4.Tag=`av-doc-state-listen-editor-4`;
_.DocStateListenEditor4=DocStateListenEditor4;
if(!window.customElements.get('av-doc-state-listen-editor-4')){window.customElements.define('av-doc-state-listen-editor-4', DocStateListenEditor4);Aventus.WebComponentInstance.registerDefinition(DocStateListenEditor4);}

const DocStateChangeEditor1 = class DocStateChangeEditor1 extends Aventus.WebComponent {
    static __style = `:host{width:100%}`;
    __getStatic() {
        return DocStateChangeEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocStateChangeEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="State Example" _id="docstatechangeeditor1_0">    <av-code language="json" filename="StateExample/aventus.conf.avt">        <pre>            {                "module": "StateExample",                "build": [                    {                        "name": "Main",                        "src": [                            './src/*'                        ]                    }                ]            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="StateExample/src/CreatePerson.state.avt">        <pre>            import type { Person } from "./Person.data.avt";            &nbsp;            export class CreatePerson extends Aventus.State implements Aventus.IState {                &nbsp;                public editingPerson?: Person;                &nbsp;                /**                * @inheritdoc                */                public override get name(): string {                    return "/person/create";;                }            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="StateExample/src/Main.state.avt">        <pre>            export class MainStateManager extends Aventus.StateManager implements Aventus.IStateManager {                /**                 * Get the instance of the StateManager                 */                public static getInstance() {                    return Aventus.Instance.get(MainStateManager);                }            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="StateExample/src/Person.data.avt">        <pre>            export class Person extends Aventus.Data implements Aventus.IData {                public id: number = 0;                public firstname!: string;                public lastname!: string;            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="StateExample/src/Person.ram.avt">        <pre>            import { Person } from "./Person.data.avt";            &nbsp;            export class PersonRAM extends Aventus.Ram&lt;Person&gt; implements Aventus.IRam {                &nbsp;                /**                * Create a singleton to store data                */                public static getInstance() {                    return Aventus.Instance.get(PersonRAM);                }                &nbsp;                /**                * @inheritdoc                */                public override defineIndexKey(): keyof Person {                    return 'id';                }                /**                * @inheritdoc                */                protected override getTypeForData(objJson: Aventus.KeysObject&lt;Person&gt; | Person): new () => Person {                    return Person;                }            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="StateExample/src/Test.lib.avt">        <pre>            import { PersonRAM } from "./Person.ram.avt";            import { CreatePerson } from "./CreatePerson.state.avt";            import { MainStateManager } from "./Main.state.avt";            &nbsp;            export async function changeStateTxt() {                const isApplied = await MainStateManager.getInstance().setState("/user/");            }            export async function changeState() {                let state = new CreatePerson();                state.editingPerson = await PersonRAM.getInstance().get(1);                const isApplied = await MainStateManager.getInstance().setState(state);            }        </pre>    </av-code></av-code>    <slot></slot></av-code-editor>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "editorEl",
      "ids": [
        "docstatechangeeditor1_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "DocStateChangeEditor1";
    }
    startupFile() {
        return "StateExample/src/Test.lib.avt";
    }
    postCreation() {
        this.editorEl.show = this.startupFile();
    }
}
DocStateChangeEditor1.Namespace=`${moduleName}`;
DocStateChangeEditor1.Tag=`av-doc-state-change-editor-1`;
_.DocStateChangeEditor1=DocStateChangeEditor1;
if(!window.customElements.get('av-doc-state-change-editor-1')){window.customElements.define('av-doc-state-change-editor-1', DocStateChangeEditor1);Aventus.WebComponentInstance.registerDefinition(DocStateChangeEditor1);}

const DocStateChangeEditor2 = class DocStateChangeEditor2 extends DocStateChangeEditor1 {
    static __style = ``;
    __getStatic() {
        return DocStateChangeEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocStateChangeEditor2.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="StateExample/src/Test.lib.avt">    <pre>        import { PersonRAM } from "./Person.ram.avt";        import { CreatePerson } from "./CreatePerson.state.avt";        import { MainStateManager } from "./Main.state.avt";        &nbsp;        export async function changeStateTxt() {            const isApplied = await MainStateManager.getInstance().setState("/user/");        }        export async function changeState() {            let state = new CreatePerson();            state.editingPerson = await PersonRAM.getInstance().get(1);            const isApplied = await MainStateManager.getInstance().setState(state);        }        &nbsp;        export async function changeStateStatic() {            const isApplied = await Aventus.State.activate("/user/", MainStateManager.getInstance());        }    </pre></av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocStateChangeEditor2";
    }
}
DocStateChangeEditor2.Namespace=`${moduleName}`;
DocStateChangeEditor2.Tag=`av-doc-state-change-editor-2`;
_.DocStateChangeEditor2=DocStateChangeEditor2;
if(!window.customElements.get('av-doc-state-change-editor-2')){window.customElements.define('av-doc-state-change-editor-2', DocStateChangeEditor2);Aventus.WebComponentInstance.registerDefinition(DocStateChangeEditor2);}

const DocStateChangeEditor3 = class DocStateChangeEditor3 extends DocStateChangeEditor2 {
    static __style = ``;
    __getStatic() {
        return DocStateChangeEditor3;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocStateChangeEditor3.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="StateExample/src/Test.lib.avt">    <pre>        import { PersonRAM } from "./Person.ram.avt";        import { CreatePerson } from "./CreatePerson.state.avt";        import { MainStateManager } from "./Main.state.avt";        &nbsp;        export async function changeStateTxt() {            const isApplied = await MainStateManager.getInstance().setState("/user/");        }        export async function changeState() {            let state = new CreatePerson();            state.editingPerson = await PersonRAM.getInstance().get(1);            const isApplied = await MainStateManager.getInstance().setState(state);        }        &nbsp;        export async function changeStateStatic() {            const isApplied = await Aventus.State.activate("/user/", MainStateManager.getInstance());        }        &nbsp;        export async function changeStateInstance() {            let state = new CreatePerson();            state.editingPerson = await PersonRAM.getInstance().get(1);            const isApplied = await state.activate(MainStateManager.getInstance());        }    </pre></av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocStateChangeEditor3";
    }
}
DocStateChangeEditor3.Namespace=`${moduleName}`;
DocStateChangeEditor3.Tag=`av-doc-state-change-editor-3`;
_.DocStateChangeEditor3=DocStateChangeEditor3;
if(!window.customElements.get('av-doc-state-change-editor-3')){window.customElements.define('av-doc-state-change-editor-3', DocStateChangeEditor3);Aventus.WebComponentInstance.registerDefinition(DocStateChangeEditor3);}

const DocStateCreateEditor1 = class DocStateCreateEditor1 extends Aventus.WebComponent {
    static __style = `:host{width:100%}`;
    __getStatic() {
        return DocStateCreateEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocStateCreateEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="State Example" _id="docstatecreateeditor1_0">    <av-code language="json" filename="StateExample/aventus.conf.avt">        <pre>            {                "module": "StateExample",                "build": [                    {                        "name": "Main",                        "src": [                            './src/*'                        ]                    }                ]            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="StateExample/src/CreatePerson.state.avt">        <pre>            import type { Person } from "./Person.data.avt";            &nbsp;            export class CreatePerson extends Aventus.State implements Aventus.IState {                &nbsp;                public editingPerson?: Person;                &nbsp;                /**                * @inheritdoc                */                public override get name(): string {                    return "/person/create";;                }            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="StateExample/src/Main.state.avt">        <pre>            export class MainStateManager extends Aventus.StateManager implements Aventus.IStateManager {                /**                 * Get the instance of the StateManager                 */                public static getInstance() {                    return Aventus.Instance.get(MainStateManager);                }            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="StateExample/src/Person.data.avt">        <pre>            export class Person extends Aventus.Data implements Aventus.IData {                public id: number = 0;                public firstname!: string;                public lastname!: string;            }        </pre>    </av-code></av-code>    <slot></slot></av-code-editor>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "editorEl",
      "ids": [
        "docstatecreateeditor1_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "DocStateCreateEditor1";
    }
    startupFile() {
        return "StateExample/src/CreatePerson.state.avt";
    }
    postCreation() {
        this.editorEl.show = this.startupFile();
    }
}
DocStateCreateEditor1.Namespace=`${moduleName}`;
DocStateCreateEditor1.Tag=`av-doc-state-create-editor-1`;
_.DocStateCreateEditor1=DocStateCreateEditor1;
if(!window.customElements.get('av-doc-state-create-editor-1')){window.customElements.define('av-doc-state-create-editor-1', DocStateCreateEditor1);Aventus.WebComponentInstance.registerDefinition(DocStateCreateEditor1);}

const DocRamMixinEditor1 = class DocRamMixinEditor1 extends Aventus.WebComponent {
    static __style = `:host{width:100%}`;
    __getStatic() {
        return DocRamMixinEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamMixinEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Example RAM" _id="docrammixineditor1_0">    <av-code language="json" filename="ExampleRAM/aventus.conf.avt">        <pre>            {                "module": "ExampleRAM",                "build": [                    {                        "name": "Main",                        "src": [                            "./src/*"                        ]                    }                ]            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="ExampleRAM/src/Person.data.avt">        <pre>            export class Person extends Aventus.Data implements Aventus.IData {                public id: number = 0;                public firstname!: string;                public lastname!: string;            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="ExampleRAM/src/Person.ram.avt">        // TODO : Add helloWorld function to a Person    </av-code></av-code>    <slot></slot></av-code-editor>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "editorEl",
      "ids": [
        "docrammixineditor1_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "DocRamMixinEditor1";
    }
    startupFile() {
        return "ExampleRAM/src/Person.data.avt";
    }
    postCreation() {
        this.editorEl.show = this.startupFile();
    }
}
DocRamMixinEditor1.Namespace=`${moduleName}`;
DocRamMixinEditor1.Tag=`av-doc-ram-mixin-editor-1`;
_.DocRamMixinEditor1=DocRamMixinEditor1;
if(!window.customElements.get('av-doc-ram-mixin-editor-1')){window.customElements.define('av-doc-ram-mixin-editor-1', DocRamMixinEditor1);Aventus.WebComponentInstance.registerDefinition(DocRamMixinEditor1);}

const DocRamMixinEditor2 = class DocRamMixinEditor2 extends DocRamMixinEditor1 {
    static __style = ``;
    __getStatic() {
        return DocRamMixinEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamMixinEditor2.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Person.ram.avt">    interface PersonAction {        // define your function here        helloWorld(): void;    }</av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocRamMixinEditor2";
    }
    startupFile() {
        return "ExampleRAM/src/Person.ram.avt";
    }
}
DocRamMixinEditor2.Namespace=`${moduleName}`;
DocRamMixinEditor2.Tag=`av-doc-ram-mixin-editor-2`;
_.DocRamMixinEditor2=DocRamMixinEditor2;
if(!window.customElements.get('av-doc-ram-mixin-editor-2')){window.customElements.define('av-doc-ram-mixin-editor-2', DocRamMixinEditor2);Aventus.WebComponentInstance.registerDefinition(DocRamMixinEditor2);}

const DocRamMixinEditor3 = class DocRamMixinEditor3 extends DocRamMixinEditor2 {
    static __style = ``;
    __getStatic() {
        return DocRamMixinEditor3;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamMixinEditor3.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Person.ram.avt">    import type { Person } from "./Person.data.avt";    &nbsp;    interface PersonAction {        // define your function here        helloWorld(): void;    }    &nbsp;    type PersonExtended = Person & PersonAction;</av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocRamMixinEditor3";
    }
}
DocRamMixinEditor3.Namespace=`${moduleName}`;
DocRamMixinEditor3.Tag=`av-doc-ram-mixin-editor-3`;
_.DocRamMixinEditor3=DocRamMixinEditor3;
if(!window.customElements.get('av-doc-ram-mixin-editor-3')){window.customElements.define('av-doc-ram-mixin-editor-3', DocRamMixinEditor3);Aventus.WebComponentInstance.registerDefinition(DocRamMixinEditor3);}

const DocRamMixinEditor4 = class DocRamMixinEditor4 extends DocRamMixinEditor3 {
    static __style = ``;
    __getStatic() {
        return DocRamMixinEditor4;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamMixinEditor4.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Person.ram.avt">    import type { Person } from "./Person.data.avt";    &nbsp;    interface PersonAction {        // define your function here        helloWorld(): void;    }    &nbsp;    type PersonExtended = Person & PersonAction;    &nbsp;    export class PersonRAM extends Aventus.Ram&lt;PersonExtended&gt; implements Aventus.IRam {        /**         * Create a singleton to store data         */        public static getInstance() {            return Aventus.Instance.get(PersonRAM);        }        /**         * @inheritdoc         */        public override defineIndexKey(): keyof Person | "helloWorld" {            return 'id';        }        /**         * @inheritdoc         */        protected override getTypeForData(objJson: PersonExtended | Aventus.KeysObject&lt;PersonExtended&gt;): new () => PersonExtended {            // this will be implemented later            throw new Error("Method not implemented.");        }    }</av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocRamMixinEditor4";
    }
}
DocRamMixinEditor4.Namespace=`${moduleName}`;
DocRamMixinEditor4.Tag=`av-doc-ram-mixin-editor-4`;
_.DocRamMixinEditor4=DocRamMixinEditor4;
if(!window.customElements.get('av-doc-ram-mixin-editor-4')){window.customElements.define('av-doc-ram-mixin-editor-4', DocRamMixinEditor4);Aventus.WebComponentInstance.registerDefinition(DocRamMixinEditor4);}

const DocRamMixinEditor5 = class DocRamMixinEditor5 extends DocRamMixinEditor4 {
    static __style = ``;
    __getStatic() {
        return DocRamMixinEditor5;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamMixinEditor5.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Person.ram.avt">    import type { Person } from "./Person.data.avt";    &nbsp;    interface PersonAction {        // define your function here        helloWorld(): void;    }    &nbsp;    type PersonExtended = Person & PersonAction;    &nbsp;    export class PersonRAM extends Aventus.Ram&lt;PersonExtended&gt; implements Aventus.IRam {        /**         * Create a singleton to store data         */        public static getInstance() {            return Aventus.Instance.get(PersonRAM);        }        /**         * @inheritdoc         */        public override defineIndexKey(): keyof Person | "helloWorld" {            return 'id';        }        /**         * @inheritdoc         */        protected override getTypeForData(objJson: PersonExtended | Aventus.KeysObject&lt;PersonExtended&gt;): new () => PersonExtended {            // this will be implemented later            throw new Error("Method not implemented.");        }        /**         * Mixin pattern to add methods         */        private addPersonMethod&lt;B extends (new (...args: any[]) => Person) & { className?: string; }&gt;(Base: B) {            return class Extension extends Base implements PersonExtended {                // override the className to keep ref by name                public static override get className(): string {                    return Base.className || Base.name;                }                public override get className(): string {                    return Base.className || Base.name;                }                // code your methods here                public helloWorld(): void {                    console.log("hello world");                };            };        }    }</av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocRamMixinEditor5";
    }
}
DocRamMixinEditor5.Namespace=`${moduleName}`;
DocRamMixinEditor5.Tag=`av-doc-ram-mixin-editor-5`;
_.DocRamMixinEditor5=DocRamMixinEditor5;
if(!window.customElements.get('av-doc-ram-mixin-editor-5')){window.customElements.define('av-doc-ram-mixin-editor-5', DocRamMixinEditor5);Aventus.WebComponentInstance.registerDefinition(DocRamMixinEditor5);}

const DocRamMixinEditor6 = class DocRamMixinEditor6 extends DocRamMixinEditor5 {
    static __style = ``;
    __getStatic() {
        return DocRamMixinEditor6;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamMixinEditor6.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Person.ram.avt">    import type { Person } from "./Person.data.avt";    &nbsp;    interface PersonAction {        // define your function here        helloWorld(): void;    }    &nbsp;    type PersonExtended = Person & PersonAction;    &nbsp;    export class PersonRAM extends Aventus.Ram&lt;PersonExtended&gt; implements Aventus.IRam {        /**         * Create a singleton to store data         */        public static getInstance() {            return Aventus.Instance.get(PersonRAM);        }        /**         * @inheritdoc         */        public override defineIndexKey(): keyof Person | "helloWorld" {            return 'id';        }        /**         * @inheritdoc         */        protected override getTypeForData(objJson: PersonExtended | Aventus.KeysObject&lt;PersonExtended&gt;): new () => PersonExtended {            return this.addPersonMethod(Person);        }        /**         * Mixin pattern to add methods         */        private addPersonMethod&lt;B extends (new (...args: any[]) => Person) & { className?: string; }&gt;(Base: B) {            return class Extension extends Base implements PersonExtended {                // override the className to keep ref by name                public static override get className(): string {                    return Base.className || Base.name;                }                public override get className(): string {                    return Base.className || Base.name;                }                // code your methods here                public helloWorld(): void {                    console.log("hello world");                };            };        }    }</av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocRamMixinEditor6";
    }
}
DocRamMixinEditor6.Namespace=`${moduleName}`;
DocRamMixinEditor6.Tag=`av-doc-ram-mixin-editor-6`;
_.DocRamMixinEditor6=DocRamMixinEditor6;
if(!window.customElements.get('av-doc-ram-mixin-editor-6')){window.customElements.define('av-doc-ram-mixin-editor-6', DocRamMixinEditor6);Aventus.WebComponentInstance.registerDefinition(DocRamMixinEditor6);}

const DocRamMixinEditor7 = class DocRamMixinEditor7 extends DocRamMixinEditor6 {
    static __style = ``;
    __getStatic() {
        return DocRamMixinEditor7;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamMixinEditor7.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Test.lib.avt">    import { PersonRAM } from "./Person.ram.avt";    &nbsp;    export async function sayHello(id: number) {        const person = await PersonRAM.getInstance().get(id)        &nbsp;        if(!person) return        &nbsp;        person.helloWorld();    }</av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocRamMixinEditor7";
    }
    startupFile() {
        return 'ExampleRAM/src/Test.lib.avt';
    }
}
DocRamMixinEditor7.Namespace=`${moduleName}`;
DocRamMixinEditor7.Tag=`av-doc-ram-mixin-editor-7`;
_.DocRamMixinEditor7=DocRamMixinEditor7;
if(!window.customElements.get('av-doc-ram-mixin-editor-7')){window.customElements.define('av-doc-ram-mixin-editor-7', DocRamMixinEditor7);Aventus.WebComponentInstance.registerDefinition(DocRamMixinEditor7);}

const DocRamListenChangesEditor1 = class DocRamListenChangesEditor1 extends Aventus.WebComponent {
    static __style = `:host{width:100%}`;
    __getStatic() {
        return DocRamListenChangesEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamListenChangesEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Example RAM" _id="docramlistenchangeseditor1_0">    <av-code language="json" filename="ExampleRAM/aventus.conf.avt">        <pre>            {                "module": "ExampleRAM",                "build": [                    {                        "name": "Main",                        "src": [                            "./src/*"                        ]                    }                ]            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="ExampleRAM/src/Person.data.avt">        <pre>            export class Person extends Aventus.Data implements Aventus.IData {                public id: number = 0;                public firstname!: string;                public lastname!: string;            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="ExampleRAM/src/Person.ram.avt">        <pre>            import { Person } from "./Person.data.avt";            &nbsp;            export class PersonRAM extends Aventus.Ram&lt;Person&gt; implements Aventus.IRam {                &nbsp;                /**                * Create a singleton to store data                */                public static getInstance() {                    return Aventus.Instance.get(PersonRAM);                }                &nbsp;                /**                * @inheritdoc                */                public override defineIndexKey(): keyof Person {                    return 'id';                }                &nbsp;                /**                * @inheritdoc                */                protected override getTypeForData(objJson: Aventus.KeysObject&lt;Person&gt; | Person): new () => Person {                    return Person;                }                &nbsp;            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="ExampleRAM/src/Test.lib.avt">        <pre>            import { PersonRAM } from "./Person.ram.avt";            import { Person } from "./Person.data.avt";            &nbsp;            export async function loadFirstPerson() {                let person1 = await PersonRAM.getInstance().get(1);                if(!person1) return;                &nbsp;                person1.onUpdate(onUpdate);                person1.onDelete(onDelete);            }            &nbsp;            export function onUpdate(person: Person) {                console.log("person updated : " + person.firstname);            }            &nbsp;            export function onDelete(person: Aventus.RamItem&lt;Person&gt;) {                person.offUpdate(onUpdate);                person.offDelete(onDelete);            }        </pre>    </av-code></av-code>    <slot></slot></av-code-editor>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "editorEl",
      "ids": [
        "docramlistenchangeseditor1_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "DocRamListenChangesEditor1";
    }
    startupFile() {
        return "ExampleRAM/src/Test.lib.avt";
    }
    postCreation() {
        this.editorEl.show = this.startupFile();
    }
}
DocRamListenChangesEditor1.Namespace=`${moduleName}`;
DocRamListenChangesEditor1.Tag=`av-doc-ram-listen-changes-editor-1`;
_.DocRamListenChangesEditor1=DocRamListenChangesEditor1;
if(!window.customElements.get('av-doc-ram-listen-changes-editor-1')){window.customElements.define('av-doc-ram-listen-changes-editor-1', DocRamListenChangesEditor1);Aventus.WebComponentInstance.registerDefinition(DocRamListenChangesEditor1);}

const DocRamListenChangesEditor2 = class DocRamListenChangesEditor2 extends DocRamListenChangesEditor1 {
    static __style = ``;
    __getStatic() {
        return DocRamListenChangesEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamListenChangesEditor2.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/DisplayPerson/DisplayPerson.wcl.avt">    <pre>        import { PersonRAM } from "../Person.ram.avt";        import type { Person } from "../Person.data.avt";        &nbsp;        export class DisplayPerson extends Aventus.WebComponent implements Aventus.DefaultComponent {            &nbsp;            //#region static            &nbsp;            //#endregion            &nbsp;            &nbsp;            //#region props            @Attribute()            public person_id!: number;            //#endregion            &nbsp;            &nbsp;            //#region variables            private person?: Aventus.RamItem&lt;Person&gt;;            //#endregion            &nbsp;            &nbsp;            //#region constructor            &nbsp;            //#endregion            &nbsp;            &nbsp;            //#region methods            public printUpdate() {                console.log(this.person);            }            public async getItem() {                const person = await PersonRAM.getInstance().get(this.person_id);                if(!person) return                &nbsp;                this.person = person;                person.onUpdate(this.onUpdateFail)                person.onUpdate(this.onUpdateCorrect)            }            &nbsp;            private onUpdateFail(newData: Aventus.RamItem&lt;Person&gt;) {                // will fail because this isn't scoped to the DisplayPerson component                this.printUpdate();            }            &nbsp;            @BindThis()            private onUpdateCorrect(newData: Aventus.RamItem&lt;Person&gt;) {                // will be ok because this is scoped to the DisplayPerson component                this.printUpdate();            }            &nbsp;            protected override postCreation(): void {                this.getItem();            }            &nbsp;            //#endregion            &nbsp;        }    </pre></av-code></av-code><av-code language="typescript" filename="ExampleRAM/src/DisplayPerson/DisplayPerson.wcs.avt">    <pre>        :host {        }    </pre></av-code></av-code><av-code language="typescript" filename="ExampleRAM/src/DisplayPerson/DisplayPerson.wcv.avt">    <pre>        &lt;slot&gt;&lt;/slot&gt;    </pre></av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocRamListenChangesEditor2";
    }
    startupFile() {
        return 'ExampleRAM/src/DisplayPerson/DisplayPerson.wcl.avt';
    }
}
DocRamListenChangesEditor2.Namespace=`${moduleName}`;
DocRamListenChangesEditor2.Tag=`av-doc-ram-listen-changes-editor-2`;
_.DocRamListenChangesEditor2=DocRamListenChangesEditor2;
if(!window.customElements.get('av-doc-ram-listen-changes-editor-2')){window.customElements.define('av-doc-ram-listen-changes-editor-2', DocRamListenChangesEditor2);Aventus.WebComponentInstance.registerDefinition(DocRamListenChangesEditor2);}

const DocRamListenChangesEditor3 = class DocRamListenChangesEditor3 extends DocRamListenChangesEditor2 {
    static __style = ``;
    __getStatic() {
        return DocRamListenChangesEditor3;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamListenChangesEditor3.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/DisplayPerson/DisplayPerson.wcl.avt">    <pre>        import { PersonRAM } from "../Person.ram.avt";        import type { Person } from "../Person.data.avt";        &nbsp;        export class DisplayPerson extends Aventus.WebComponent implements Aventus.DefaultComponent {            &nbsp;            //#region static            &nbsp;            //#endregion            &nbsp;            &nbsp;            //#region props            &nbsp;            //#endregion            &nbsp;            &nbsp;            //#region variables            &nbsp;            //#endregion            &nbsp;            &nbsp;            //#region constructor            &nbsp;            //#endregion            &nbsp;            &nbsp;            //#region methods            @BindThis()            private onCreated(createdData: Aventus.RamItem&lt;Person&gt;) {                &nbsp;            }            &nbsp;            @BindThis()            private onUpdated(updatedData: Aventus.RamItem&lt;Person&gt;) {                &nbsp;            }            &nbsp;            @BindThis()            private onDeleted(deletedData: Aventus.RamItem&lt;Person&gt;) {                &nbsp;            }            &nbsp;            protected override postCreation(): void {                PersonRAM.getInstance().onCreated(this.onCreated);                PersonRAM.getInstance().onUpdated(this.onUpdated);                PersonRAM.getInstance().onDeleted(this.onDeleted);            }            //#endregion            &nbsp;        }    </pre></av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocRamListenChangesEditor3";
    }
}
DocRamListenChangesEditor3.Namespace=`${moduleName}`;
DocRamListenChangesEditor3.Tag=`av-doc-ram-listen-changes-editor-3`;
_.DocRamListenChangesEditor3=DocRamListenChangesEditor3;
if(!window.customElements.get('av-doc-ram-listen-changes-editor-3')){window.customElements.define('av-doc-ram-listen-changes-editor-3', DocRamListenChangesEditor3);Aventus.WebComponentInstance.registerDefinition(DocRamListenChangesEditor3);}

const DocRamCrudEditor1 = class DocRamCrudEditor1 extends Aventus.WebComponent {
    static __style = `:host{width:100%}`;
    __getStatic() {
        return DocRamCrudEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamCrudEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Example RAM" _id="docramcrudeditor1_0">    <av-code language="json" filename="ExampleRAM/aventus.conf.avt">        <pre>            {                "module": "ExampleRAM",                "build": [                    {                        "name": "Main",                        "src": [                            "./src/*"                        ]                    }                ]            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="ExampleRAM/src/Person.data.avt">        <pre>            export class Person extends Aventus.Data implements Aventus.IData {                public id: number = 0;                public firstname!: string;                public lastname!: string;            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="ExampleRAM/src/Person.ram.avt">        <pre>            import { Person } from "./Person.data.avt";            &nbsp;            export class PersonRAM extends Aventus.Ram&lt;Person&gt; implements Aventus.IRam {                &nbsp;                /**                * Create a singleton to store data                */                public static getInstance() {                    return Aventus.Instance.get(PersonRAM);                }                &nbsp;                /**                * @inheritdoc                */                public override defineIndexKey(): keyof Person {                    return 'id';                }                &nbsp;                /**                * @inheritdoc                */                protected override getTypeForData(objJson: Aventus.KeysObject&lt;Person&gt; | Person): new () => Person {                    return Person;                }                &nbsp;            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="ExampleRAM/src/Test.lib.avt">        <pre>import { PersonRAM } from "./Person.ram.avt";&nbsp;/*** Return a person*/export async function query() {    const p1 = await PersonRAM.getInstance().get(1);}&nbsp;/*** Check if the get contains errors*/export async function queryWithError() {    const { success, errors, result } = await PersonRAM.getInstance().getWithError(1);    &#105;f(success) {        const p1 = result;    }    &#101;lse {        &#102;or(let error of errors) {            console.log(error.code + " " + error.message);        }    }}        </pre>    </av-code></av-code>    <slot></slot></av-code-editor>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "editorEl",
      "ids": [
        "docramcrudeditor1_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "DocRamCrudEditor1";
    }
    startupFile() {
        return "ExampleRAM/src/Test.lib.avt";
    }
    postCreation() {
        this.editorEl.show = this.startupFile();
    }
}
DocRamCrudEditor1.Namespace=`${moduleName}`;
DocRamCrudEditor1.Tag=`av-doc-ram-crud-editor-1`;
_.DocRamCrudEditor1=DocRamCrudEditor1;
if(!window.customElements.get('av-doc-ram-crud-editor-1')){window.customElements.define('av-doc-ram-crud-editor-1', DocRamCrudEditor1);Aventus.WebComponentInstance.registerDefinition(DocRamCrudEditor1);}

const DocRamCrudEditor2 = class DocRamCrudEditor2 extends DocRamCrudEditor1 {
    static __style = ``;
    __getStatic() {
        return DocRamCrudEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamCrudEditor2.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Test.lib.avt">    <pre>        import type { Person } from "./Person.data.avt";        import { PersonRAM } from "./Person.ram.avt";        &nbsp;        /**        * All the read actions available on a RAM        */        export async function readFunction() {            const person1: Aventus.RamItem&lt;Person&gt; | undefined = await PersonRAM.getInstance().get(1);            const person2: Aventus.RamItem&lt;Person&gt; | undefined = await PersonRAM.getInstance().getById(1);            const people1: Map&lt;number, Aventus.RamItem&lt;Person&gt;&gt; = await PersonRAM.getInstance().getAll();            const people2: Aventus.RamItem&lt;Person&gt;[] = await PersonRAM.getInstance().getList();            const people3: Aventus.RamItem&lt;Person&gt;[] = await PersonRAM.getInstance().getByIds([1, 2]);        }    </pre></av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocRamCrudEditor2";
    }
}
DocRamCrudEditor2.Namespace=`${moduleName}`;
DocRamCrudEditor2.Tag=`av-doc-ram-crud-editor-2`;
_.DocRamCrudEditor2=DocRamCrudEditor2;
if(!window.customElements.get('av-doc-ram-crud-editor-2')){window.customElements.define('av-doc-ram-crud-editor-2', DocRamCrudEditor2);Aventus.WebComponentInstance.registerDefinition(DocRamCrudEditor2);}

const DocRamCrudEditor3 = class DocRamCrudEditor3 extends DocRamCrudEditor2 {
    static __style = ``;
    __getStatic() {
        return DocRamCrudEditor3;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamCrudEditor3.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Test.lib.avt">    <pre>        import { PersonRAM } from "./Person.ram.avt";        import { Person } from "./Person.data.avt";        &nbsp;        export async function createFunctions() {            let person1: Person = new Person();            person1.id = 1;            person1.firstname = "John";            person1.lastname = "Doe";            &nbsp;            let person2: Person = new Person();            person2.id = 2;            person2.firstname = "Jane";            person2.lastname = "Doe";            &nbsp;            const person: Aventus.RamItem&lt;Person&gt; | undefined = await PersonRAM.getInstance().create(person1);            const people: Aventus.RamItem&lt;Person&gt;[] = await PersonRAM.getInstance().createList([person1, person2]);        }    </pre></av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocRamCrudEditor3";
    }
}
DocRamCrudEditor3.Namespace=`${moduleName}`;
DocRamCrudEditor3.Tag=`av-doc-ram-crud-editor-3`;
_.DocRamCrudEditor3=DocRamCrudEditor3;
if(!window.customElements.get('av-doc-ram-crud-editor-3')){window.customElements.define('av-doc-ram-crud-editor-3', DocRamCrudEditor3);Aventus.WebComponentInstance.registerDefinition(DocRamCrudEditor3);}

const DocRamCrudEditor4 = class DocRamCrudEditor4 extends DocRamCrudEditor3 {
    static __style = ``;
    __getStatic() {
        return DocRamCrudEditor4;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamCrudEditor4.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Test.lib.avt">    <pre>        import { PersonRAM } from "./Person.ram.avt";        import { Person } from "./Person.data.avt";        &nbsp;        export async function udpateFunctions() {            let person1: Aventus.RamItem&lt;Person&gt; | undefined = await PersonRAM.getInstance().get(1);            if(!person1) return;            let person2: Aventus.RamItem&lt;Person&gt; | undefined = await PersonRAM.getInstance().get(2);            if(!person2) return;            &nbsp;            person1.firstname = "John 2";            person2.firstname = "Jane 2";            const person: Aventus.RamItem&lt;Person&gt; | undefined = await PersonRAM.getInstance().update(person1);            const people: Aventus.RamItem&lt;Person&gt;[] = await PersonRAM.getInstance().updateList([person1, person2]);            &nbsp;            person1.update({firstname: "John 3"});        }    </pre></av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocRamCrudEditor4";
    }
}
DocRamCrudEditor4.Namespace=`${moduleName}`;
DocRamCrudEditor4.Tag=`av-doc-ram-crud-editor-4`;
_.DocRamCrudEditor4=DocRamCrudEditor4;
if(!window.customElements.get('av-doc-ram-crud-editor-4')){window.customElements.define('av-doc-ram-crud-editor-4', DocRamCrudEditor4);Aventus.WebComponentInstance.registerDefinition(DocRamCrudEditor4);}

const DocRamCrudEditor5 = class DocRamCrudEditor5 extends DocRamCrudEditor4 {
    static __style = ``;
    __getStatic() {
        return DocRamCrudEditor5;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamCrudEditor5.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Test.lib.avt">    <pre>        import { PersonRAM } from "./Person.ram.avt";        import { Person } from "./Person.data.avt";        &nbsp;        export async function deleteFunctions() {            let person1: Aventus.RamItem&lt;Person&gt; | undefined = await PersonRAM.getInstance().get(1);            if(!person1) return;            let person2: Aventus.RamItem&lt;Person&gt; | undefined = await PersonRAM.getInstance().get(2);            if(!person2) return;                &nbsp;            await PersonRAM.getInstance().delete(person1);            await PersonRAM.getInstance().deleteById(1);            await PersonRAM.getInstance().deleteList([person1, person2]);            &nbsp;            person1.delete();        }    </pre></av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocRamCrudEditor5";
    }
}
DocRamCrudEditor5.Namespace=`${moduleName}`;
DocRamCrudEditor5.Tag=`av-doc-ram-crud-editor-5`;
_.DocRamCrudEditor5=DocRamCrudEditor5;
if(!window.customElements.get('av-doc-ram-crud-editor-5')){window.customElements.define('av-doc-ram-crud-editor-5', DocRamCrudEditor5);Aventus.WebComponentInstance.registerDefinition(DocRamCrudEditor5);}

const DocRamCreateEditor3 = class DocRamCreateEditor3 extends Aventus.WebComponent {
    static __style = `:host{width:100%}`;
    __getStatic() {
        return DocRamCreateEditor3;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamCreateEditor3.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Example RAM" _id="docramcreateeditor3_0">    <av-code language="json" filename="ExampleRAM/aventus.conf.avt">        <pre>            {                "module": "ExampleRAM",                "build": [                    {                        "name": "Main",                        "src": [                            "./src/*"                        ]                    }                ]            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="ExampleRAM/src/Shape.data.avt">        <pre>            export abstract class Shape extends Aventus.Data implements Aventus.IData {                public id: number = 0;            }            &nbsp;            export class Square extends Shape implements Aventus.IData {                &nbsp;            }            export class Triangle extends Shape implements Aventus.IData {                &nbsp;            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="ExampleRAM/src/Shape.ram.avt">        <pre>            import { Square, type Shape, Triangle } from "./Shape.data.avt";            &nbsp;            export class ShapeRAM extends Aventus.Ram&lt;Shape&gt; implements Aventus.IRam {                &nbsp;                /**                * Create a singleton to store data                */                public static getInstance() {                    return Aventus.Instance.get(ShapeRAM);                }                &nbsp;                /**                * @inheritdoc                */                public override defineIndexKey(): keyof Shape {                    return 'id';                }                &nbsp;                /**                * @inheritdoc                */                protected override getTypeForData(objJson: Aventus.KeysObject&lt;Shape&gt; | Shape): new () => Shape {                    if(objJson.$type == Square.Fullname) return Square;                    if(objJson.$type == Triangle.Fullname) return Triangle;                    &nbsp;                    throw 'Impossible'                }                &nbsp;            }        </pre>    </av-code></av-code>    <slot></slot></av-code-editor>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "editorEl",
      "ids": [
        "docramcreateeditor3_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "DocRamCreateEditor3";
    }
    startupFile() {
        return "ExampleRAM/src/Shape.ram.avt";
    }
    postCreation() {
        this.editorEl.show = this.startupFile();
    }
}
DocRamCreateEditor3.Namespace=`${moduleName}`;
DocRamCreateEditor3.Tag=`av-doc-ram-create-editor-3`;
_.DocRamCreateEditor3=DocRamCreateEditor3;
if(!window.customElements.get('av-doc-ram-create-editor-3')){window.customElements.define('av-doc-ram-create-editor-3', DocRamCreateEditor3);Aventus.WebComponentInstance.registerDefinition(DocRamCreateEditor3);}

const DocRamCreateEditor1 = class DocRamCreateEditor1 extends Aventus.WebComponent {
    static __style = `:host{width:100%}`;
    __getStatic() {
        return DocRamCreateEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamCreateEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Example RAM" _id="docramcreateeditor1_0">    <av-code language="json" filename="ExampleRAM/aventus.conf.avt">        <pre>            {                "module": "ExampleRAM",                "build": [                    {                        "name": "Main",                        "src": [                            "./src/*"                        ]                    }                ]            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="ExampleRAM/src/Person.data.avt">        <pre>            export class Person extends Aventus.Data implements Aventus.IData {                public id: number = 0;                public firstname!: string;                public lastname!: string;            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="ExampleRAM/src/Person.ram.avt">        <pre>            import { Person } from "./Person.data.avt";            &nbsp;            export class PersonRAM extends Aventus.Ram&lt;Person&gt; implements Aventus.IRam {                &nbsp;                /**                * Create a singleton to store data                */                public static getInstance() {                    return Aventus.Instance.get(PersonRAM);                }                &nbsp;                /**                * @inheritdoc                */                public override defineIndexKey(): keyof Person {                    return 'id';                }                &nbsp;                /**                * @inheritdoc                */                protected override getTypeForData(objJson: Aventus.KeysObject&lt;Person&gt; | Person): new () => Person {                    return Person;                }                &nbsp;            }        </pre>    </av-code></av-code>    <slot></slot></av-code-editor>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "editorEl",
      "ids": [
        "docramcreateeditor1_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "DocRamCreateEditor1";
    }
    startupFile() {
        return "ExampleRAM/src/Person.ram.avt";
    }
    postCreation() {
        this.editorEl.show = this.startupFile();
    }
}
DocRamCreateEditor1.Namespace=`${moduleName}`;
DocRamCreateEditor1.Tag=`av-doc-ram-create-editor-1`;
_.DocRamCreateEditor1=DocRamCreateEditor1;
if(!window.customElements.get('av-doc-ram-create-editor-1')){window.customElements.define('av-doc-ram-create-editor-1', DocRamCreateEditor1);Aventus.WebComponentInstance.registerDefinition(DocRamCreateEditor1);}

const DocRamCreateEditor2 = class DocRamCreateEditor2 extends DocRamCreateEditor1 {
    static __style = ``;
    __getStatic() {
        return DocRamCreateEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocRamCreateEditor2.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Person.ram.avt">    <pre>        import { Person } from "./Person.data.avt";        &nbsp;        // now the key to identify a person must be a string        export class PersonRAM extends Aventus.GenericRam&lt;string, Person> implements Aventus.IRam {            &nbsp;            /**            * Create a singleton to store data            */            public static getInstance() {                return Aventus.Instance.get(PersonRAM);            }            &nbsp;            /**            * @inheritdoc            */            public override defineIndexKey(): keyof Person {                return 'id';            }            &nbsp;            /**            * @inheritdoc            */            protected override getTypeForData(objJson: Aventus.KeysObject&lt;Person> | Person): new () => Person {                return Person;            }            &nbsp;        }    </pre></av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocRamCreateEditor2";
    }
}
DocRamCreateEditor2.Namespace=`${moduleName}`;
DocRamCreateEditor2.Tag=`av-doc-ram-create-editor-2`;
_.DocRamCreateEditor2=DocRamCreateEditor2;
if(!window.customElements.get('av-doc-ram-create-editor-2')){window.customElements.define('av-doc-ram-create-editor-2', DocRamCreateEditor2);Aventus.WebComponentInstance.registerDefinition(DocRamCreateEditor2);}

const DocDateCreateEditor1 = class DocDateCreateEditor1 extends Aventus.WebComponent {
    static __style = `:host{width:100%}`;
    __getStatic() {
        return DocDateCreateEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocDateCreateEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="First Project" _id="docdatecreateeditor1_0">    <av-code language="json" filename="ExampleData/aventus.conf.avt">        <pre>            {                "module": "ExampleData",                "build": [                    {                        "name": "Main",                        "src": [                            "./src/*"                        ],                        "compile": [                            {                                "output": "./dist/helloaventus.js"                            }                        ]                    }                ]            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="ExampleData/src/Person.data.avt">        export class Person extends Aventus.Data implements Aventus.IData {        \tpublic id: number = 0;        }    </av-code></av-code>    <slot></slot></av-code-editor>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "editorEl",
      "ids": [
        "docdatecreateeditor1_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "DocDateCreateEditor1";
    }
    startupFile() {
        return "ExampleData/src/Person.data.avt";
    }
    postCreation() {
        this.editorEl.show = this.startupFile();
    }
}
DocDateCreateEditor1.Namespace=`${moduleName}`;
DocDateCreateEditor1.Tag=`av-doc-date-create-editor-1`;
_.DocDateCreateEditor1=DocDateCreateEditor1;
if(!window.customElements.get('av-doc-date-create-editor-1')){window.customElements.define('av-doc-date-create-editor-1', DocDateCreateEditor1);Aventus.WebComponentInstance.registerDefinition(DocDateCreateEditor1);}

const DocDateCreateEditor2 = class DocDateCreateEditor2 extends DocDateCreateEditor1 {
    static __style = ``;
    __getStatic() {
        return DocDateCreateEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocDateCreateEditor2.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleData/src/Test.lib.avt">    <pre>    import { Person } from "./Person.data.avt";    &nbsp;    export class Test {        public demo() {            console.log(Person.Fullname);            let p = new Person();            console.log(p.$type);            // $type and Fullname must be identical        }    }    </pre></av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocDateCreateEditor2";
    }
    startupFile() {
        return "ExampleData/src/Test.lib.avt";
    }
}
DocDateCreateEditor2.Namespace=`${moduleName}`;
DocDateCreateEditor2.Tag=`av-doc-date-create-editor-2`;
_.DocDateCreateEditor2=DocDateCreateEditor2;
if(!window.customElements.get('av-doc-date-create-editor-2')){window.customElements.define('av-doc-date-create-editor-2', DocDateCreateEditor2);Aventus.WebComponentInstance.registerDefinition(DocDateCreateEditor2);}

const DocFirstAppEditor1 = class DocFirstAppEditor1 extends Aventus.WebComponent {
    static __style = `:host{width:100%}`;
    __getStatic() {
        return DocFirstAppEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocFirstAppEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="First Project" _id="docfirstappeditor1_0">    <av-code language="json" filename="HelloAventus/aventus.conf.avt">        <pre>            {                "module": "HelloAventus",                "componentPrefix": "ha",                "build": [                    {                        "name": "Main",                        "src": [],                        "compile": [{                            "output": "./dist/helloaventus.js"                        }]                    }                ]            }        </pre>    </av-code></av-code>    <slot></slot></av-code-editor>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "editorEl",
      "ids": [
        "docfirstappeditor1_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "DocFirstAppEditor1";
    }
    startupFile() {
        return "HelloAventus/aventus.conf.avt";
    }
    postCreation() {
        this.editorEl.show = this.startupFile();
    }
}
DocFirstAppEditor1.Namespace=`${moduleName}`;
DocFirstAppEditor1.Tag=`av-doc-first-app-editor-1`;
_.DocFirstAppEditor1=DocFirstAppEditor1;
if(!window.customElements.get('av-doc-first-app-editor-1')){window.customElements.define('av-doc-first-app-editor-1', DocFirstAppEditor1);Aventus.WebComponentInstance.registerDefinition(DocFirstAppEditor1);}

const DocFirstAppEditor2 = class DocFirstAppEditor2 extends DocFirstAppEditor1 {
    static __style = ``;
    __getStatic() {
        return DocFirstAppEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocFirstAppEditor2.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="json" filename="HelloAventus/aventus.conf.avt">    <pre>    {        "module": "HelloAventus",        "componentPrefix": "ha",        "build": [            {                "name": "Main",                "src": [                    "./src/*"                ],                "compile": [{                    "output": "./dist/helloaventus.js"                }]            }        ]    }    </pre></av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocFirstAppEditor2";
    }
}
DocFirstAppEditor2.Namespace=`${moduleName}`;
DocFirstAppEditor2.Tag=`av-doc-first-app-editor-2`;
_.DocFirstAppEditor2=DocFirstAppEditor2;
if(!window.customElements.get('av-doc-first-app-editor-2')){window.customElements.define('av-doc-first-app-editor-2', DocFirstAppEditor2);Aventus.WebComponentInstance.registerDefinition(DocFirstAppEditor2);}

const DocFirstAppEditor3 = class DocFirstAppEditor3 extends DocFirstAppEditor2 {
    static __style = ``;
    __getStatic() {
        return DocFirstAppEditor3;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocFirstAppEditor3.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="HelloAventus/src/MyComponent.wcl.avt">    <pre>    export class MyComponent extends Aventus.WebComponent implements Aventus.DefaultComponent {        &nbsp;        //#region static        &nbsp;                   //#endregion        &nbsp;                    &nbsp;                   //#region props        &nbsp;                   //#endregion        &nbsp;                   &nbsp;                    //#region variables        &nbsp;                   //#endregion        &nbsp;                   &nbsp;                  //#region constructor        &nbsp;                   //#endregion        &nbsp;                   &nbsp;        //#region methods        &nbsp;        //#endregion        &nbsp;    }    </pre></av-code></av-code><av-code language="html" filename="HelloAventus/src/MyComponent.wcv.avt">    <p>Hello <span class="orange">Aventus</span></p></av-code></av-code><av-code language="css" filename="HelloAventus/src/MyComponent.wcs.avt">    <pre>    /* :host is the style apply on your component */    :host {         background-color: gray;        .orange {            color: #e5540e;        }    }    </pre></av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocFirstAppEditor3";
    }
    startupFile() {
        return "HelloAventus/src/MyComponent.wcs.avt";
    }
}
DocFirstAppEditor3.Namespace=`${moduleName}`;
DocFirstAppEditor3.Tag=`av-doc-first-app-editor-3`;
_.DocFirstAppEditor3=DocFirstAppEditor3;
if(!window.customElements.get('av-doc-first-app-editor-3')){window.customElements.define('av-doc-first-app-editor-3', DocFirstAppEditor3);Aventus.WebComponentInstance.registerDefinition(DocFirstAppEditor3);}

const DocFirstAppEditor4 = class DocFirstAppEditor4 extends DocFirstAppEditor3 {
    static __style = ``;
    __getStatic() {
        return DocFirstAppEditor4;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocFirstAppEditor4.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="html" filename="HelloAventus/static/index.html">    <pre>        &lt;!DOCTYPE html&gt;        &lt;html lang="en"&gt;            &lt;head&gt;                &lt;meta charset="UTF-8"&gt;                &lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;                &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;                &lt;title&gt;Hello Aventus&lt;/title&gt;                &lt;script src="/helloaventus.js"&gt;&lt;/script&gt;            &lt;/head&gt;            &lt;body&gt;                &lt;ha-my-component&gt;&lt;/ha-my-component&gt;            &lt;/body&gt;        &lt;/html&gt;    </pre></av-code></av-code><slot></slot>` }
    });
}
    getClassName() {
        return "DocFirstAppEditor4";
    }
    startupFile() {
        return "HelloAventus/static/index.html";
    }
}
DocFirstAppEditor4.Namespace=`${moduleName}`;
DocFirstAppEditor4.Tag=`av-doc-first-app-editor-4`;
_.DocFirstAppEditor4=DocFirstAppEditor4;
if(!window.customElements.get('av-doc-first-app-editor-4')){window.customElements.define('av-doc-first-app-editor-4', DocFirstAppEditor4);Aventus.WebComponentInstance.registerDefinition(DocFirstAppEditor4);}

const DocFirstAppEditor5 = class DocFirstAppEditor5 extends DocFirstAppEditor4 {
    static __style = ``;
    __getStatic() {
        return DocFirstAppEditor5;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocFirstAppEditor5.__style);
        return arrStyle;
    }
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<av-code language="json" filename="HelloAventus/aventus.conf.avt">    <pre>    {        "module": "HelloAventus",        "componentPrefix": "ha",        "build": [            {                "name": "Main",                "src": [                    "./src/*"                ],                "compile": [                    {                        "output": "./dist/helloaventus.js"                    }                ]            }        ],        "static": [            {                "name": "Static",                "input": "./static/*",                "output": "./dist/"            }        ]    }    </pre></av-code></av-code>` }
    });
}
    getClassName() {
        return "DocFirstAppEditor5";
    }
    startupFile() {
        return "HelloAventus/aventus.conf.avt";
    }
}
DocFirstAppEditor5.Namespace=`${moduleName}`;
DocFirstAppEditor5.Tag=`av-doc-first-app-editor-5`;
_.DocFirstAppEditor5=DocFirstAppEditor5;
if(!window.customElements.get('av-doc-first-app-editor-5')){window.customElements.define('av-doc-first-app-editor-5', DocFirstAppEditor5);Aventus.WebComponentInstance.registerDefinition(DocFirstAppEditor5);}

const DocIntroduction = class DocIntroduction extends DocGenericPage {
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
        blocks: { 'default':`<h1>Introduction</h1><p>Aventus is a framework that allow you to create complex user interfaces by splitting common parts of a    front-end application in several well knowned files. It builds on top of standard HTML, CSS, JavaScript    and provide a way to keep your development under control.</p><p>Here is a minimal example:</p><av-code-editor name="Button example">    <av-code language="typescript" tab="1" filename="Button/Button.wcl.avt">        export class DocIntroductionButton extends Aventus.WebComponent implements Aventus.DefaultComponent {            @Property()            private count: number = 0;            private onClick(): void {                this.count++;            }        }    </av-code></av-code>    <av-code language="html" tab="1" filename="Button/Button.wcv.avt">        <button @click="onClick">Count is {{ this.count }}</button>    </av-code></av-code>    <av-code language="scss" tab="1" filename="Button/Button.wcs.avt">        :host {            button {                background-color: #e5540e;                border: none;                border-radius: 5px;                color: white;                cursor: pointer;                padding: 5px 15px;            }        }    </av-code></av-code>    <av-doc-introduction-button slot="result"></av-doc-introduction-button></av-code-editor><p>To understand the capabilities of Aventus, you need to learn about the following:</p><ul>    <li><span class="cn">Webcomponent</span></li>    <li><span class="cn">Data / Storage</span></li>    <li><span class="cn">States</span></li>    <li><span class="cn">Websocket</span></li></ul>` }
    });
}
    getClassName() {
        return "DocIntroduction";
    }
}
DocIntroduction.Namespace=`${moduleName}`;
DocIntroduction.Tag=`av-doc-introduction`;
_.DocIntroduction=DocIntroduction;
if(!window.customElements.get('av-doc-introduction')){window.customElements.define('av-doc-introduction', DocIntroduction);Aventus.WebComponentInstance.registerDefinition(DocIntroduction);}

const DocExperience = class DocExperience extends DocGenericPage {
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
        blocks: { 'default':`<h1>UI and experience</h1><h2>Vscode UI</h2><p>The Aventus extension will edit vscode user interface to add some features.</p><h3>The create option</h3><p>When you right click on the vscode file explorer, you can notice that you have a new option named: <b>Aventus :        Create...</b>.</p><av-docu-img src="/img/doc/install/experience/aventus_create.png"></av-docu-img><p>If you click on it, a dropdown appears and you can select what you want to create.</p><ul class="list-commands">    <li><b>Init</b><av-icon icon="arrow-right"></av-icon> Create a new project</li>    <li><b>Component</b><av-icon icon="arrow-right"></av-icon> Create a display</li>    <li><b>Data</b><av-icon icon="arrow-right"></av-icon> Create a data struct</li>    <li><b>RAM</b><av-icon icon="arrow-right"></av-icon> Create a storage</li>    <li><b>Library</b><av-icon icon="arrow-right"></av-icon> Create a file to write any code</li>    <li><b>Socket</b><av-icon icon="arrow-right"></av-icon> Create a socket</li>    <li><b>State</b><av-icon icon="arrow-right"></av-icon> Create a state or a state manager</li>    <li><b>Custom</b><av-icon icon="arrow-right"></av-icon> Use one of your <av-router-link state="/advanced/templates">templates</av-router-link></li></ul><h3>The compilation informations</h3><p>If you have at least one build, on the bottom of the vscode you can see a tick and a time. If you hover this text,    you will see the last time your build was compiled.</p><av-img src="/img/doc/install/experience/last_compiled.png"></av-img><h3>The live server</h3><p>If you have at least one build, on the bottom of the vscode you can see a play button. If you click on it, the live    sever will start and a stop button will replace the play button.</p><av-img src="/img/doc/install/experience/last_compiled.png"></av-img><p>You can customize the live server inside the vscode    settings under <b>Aventus &gt; Liveserver</b>.</p>` }
    });
}
    getClassName() {
        return "DocExperience";
    }
}
DocExperience.Namespace=`${moduleName}`;
DocExperience.Tag=`av-doc-experience`;
_.DocExperience=DocExperience;
if(!window.customElements.get('av-doc-experience')){window.customElements.define('av-doc-experience', DocExperience);Aventus.WebComponentInstance.registerDefinition(DocExperience);}

const DocFirstApp = class DocFirstApp extends DocGenericPage {
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
        blocks: { 'default':`<h1>Create your first project</h1><h2>Init the project</h2><p>In your file explorer create a new folder <span class="cn">HelloAventus</span> and open it with vscode.</p><p>You can create a new file named <span class="cn">aventus.conf.avt</span>. The minimal content for your config file is    the following</p><av-doc-first-app-editor-1></av-doc-first-app-editor-1><p>The section <span class="cn">module</span> define the container name for the compiled code. Following the best    practice, we minimize    the use of global variables by wrapping the final code inside module. In this example, you can reach your compiled    code    by typing <i>HelloWorld.*</i> inside the dev console.</p><p>The section <span class="cn">componentPrefix</span> define the prefix for the webcomponents. For example the tag name    for a    webcomponent class <i>Test</i> will be <i>ha-test</i>.</p><p>The section <span class="cn">build</span> define all builds informations. A build is a set of Aventus input file    compiled as a single    js file. You must provide at least 3 fields. <span class="cn">name</span> that define the unique name for your    build,    <span class="cn">src</span> that define where the compiler must look for Aventus file and <span class="cn">compile[0].output</span> that define where    the compiler must write the compiled file. For the example the field <i>includeBase</i> is added to auto import    Aventus source code.</p><p>When you save the config file a new file is created inside your workspace : <i>/dist/helloaventus.js</i>. The js file    is your code compiled. Actually the file is empty because we didn't write any code.</p><p>There are more options for the config file that you can read <av-router-link>here</av-router-link></p><p>Now you can create a new folder named <span class="cn">src</span> and edit the field build.src like that</p><av-doc-first-app-editor-2></av-doc-first-app-editor-2><p>This means that any <span class="cn">*.avt</span> file found will be compiled inside this build.</p><p>Now it's time to create your first webcomponent. You can right click inside the explorer part and click on <span class="cn">Aventus        : Create...</span></p><av-img src="/img/doc/install/firstapp/create_option.png"></av-img><p>A dropdown appears. Select the option : <span class="cn">Component</span></p><av-img src="/img/doc/install/firstapp/create_menu.png"></av-img><p>Then you must enter the name for your WebComponent, call it MyComponent    (<span class="cn">&lt;ha-my-component&gt;&lt;/ha-my-component&gt;</span>), press enter and select multiple files.    Three new files are    created</p><ul>    <li><span class="cn">MyComponent.wcl.avt</span> - the file for the logic written in Typescript</li>    <li><span class="cn">MyComponent.wcs.avt</span> - the file for the style written in SCSS</li>    <li><span class="cn">MyComponent.wcv.avt</span> - the file for the view written in Html</li></ul><p>We will add some code inside the component to write an hello Aventus text in orange</p><av-doc-first-app-editor-3></av-doc-first-app-editor-3><av-separator></av-separator><p>To show your first component you need an index file. Create a <span class="cn">/src/static</span> folder and a <span class="cn">/src/static/index.html</span> and add    the content below:</p><av-doc-first-app-editor-4></av-doc-first-app-editor-4><p>This code will load the compiled file <i>helloaventus.js</i> in your dist folder. To export static file, you need to    add a new section inside your config.</p><av-doc-first-app-editor-5></av-doc-first-app-editor-5><p>This code will export every file from <span class="cn">/static</span> to <span class="cn">/dist</span>. You can    save your config file.</p><p>Now you can launch the Aventus live server by clicking on the start server button.</p><av-img src="/img/doc/install/firstapp/start_server.png"></av-img><p>Well done, you created your first Aventus App.</p>` }
    });
}
    getClassName() {
        return "DocFirstApp";
    }
}
DocFirstApp.Namespace=`${moduleName}`;
DocFirstApp.Tag=`av-doc-first-app`;
_.DocFirstApp=DocFirstApp;
if(!window.customElements.get('av-doc-first-app')){window.customElements.define('av-doc-first-app', DocFirstApp);Aventus.WebComponentInstance.registerDefinition(DocFirstApp);}

const DocDataCreate = class DocDataCreate extends DocGenericPage {
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
        blocks: { 'default':`<h1>Data</h1><p>In the section you are going to learn what is a data and how you can create it inside Aventus.</p><h2>Definition</h2><p>A data is a class that define an object structure. This class reflects what the application will contain. This is the    backbone of your application and most of the times, all data structures will be a copy from your backend object.</p><h2>Inside Aventus</h2><p>Inside Aventus you can create a new Data class by right clicking on the explorer part inside vscode, choose    <i>Aventus        : Create...</i> and choose <i>Data</i>. Inside the input you can enter the name for the class. This will create    a basic data class:</p><av-doc-date-create-editor-1></av-doc-date-create-editor-1><p>All classes inside a <span class="cn">*.data.avt</span> must implements <span class="cn">Aventus.IData</span>. This    will ensure that each data class instance can be identified by the <span class="cn">$type</span> field that must be    unique. Furthermore, a static field named <span class="cn">Fullname</span> must be implemented.</p><av-doc-date-create-editor-2></av-doc-date-create-editor-2><p>    By default your data class extends <span class="cn">Aventus.Data</span> with the following impletemented properites    :</p><av-code language="typescript" filename="Data.data.avt">    <pre>    export abstract class Data implements IData {        /**        * The class schema / This field is defined during compilation        */        public static get $schema(): { [prop: string]: string; };        /**        * The current namespace / This field is defined during compilation        */        public static get Namespace(): string { return ""; }        /**        * Get the unique type for the data. Define it as the namespace + class name        */        public static get Fullname(): string { return this.Namespace + "." + this.name; }        /**        * The current namespace        */        public get namespace(): string {            return this.constructor['Namespace'];        }        /**        * Get the unique type for the data. Define it as the namespace + class name        */        public get $type(): string {            return this.constructor['Fullname'];        }        /**        * Get the name of the class        */        public get className(): string {            return this.constructor.name;        }        /**        * Get a JSON for the current object        */       public toJSON() {...}    }    </pre></av-code></av-code><p>    During the compilation of a data class, the static field <span class="cn">Namespace</span> is defined. With this    field you can create an unique type name that allows to clearly identify each data inside your application. Because    Javascript is not typed, a <span class="cn">$schema</span> is created for each class to keep information about what    the class must contain. In future version of Aventus, this will help the manager to synchronize data between each    instances.</p><p>The last thing to know is that every properties must have an initializer.</p><av-code language="typescript" filename="Person.data.avt">    <pre>        export class Person extends Aventus.Data implements Aventus.IData {            public id: number = 0; // This is ok            public firstname?: string; // This will trigger an error            public lastname: string = ''; // This is ok            public fullname?: string = undefined; // This is ok            public birthday!: string; // This is ok        }    </pre></av-code></av-code>` }
    });
}
    getClassName() {
        return "DocDataCreate";
    }
}
DocDataCreate.Namespace=`${moduleName}`;
DocDataCreate.Tag=`av-doc-data-create`;
_.DocDataCreate=DocDataCreate;
if(!window.customElements.get('av-doc-data-create')){window.customElements.define('av-doc-data-create', DocDataCreate);Aventus.WebComponentInstance.registerDefinition(DocDataCreate);}

const DocRamCreate = class DocRamCreate extends DocGenericPage {
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
        blocks: { 'default':`<h1>RAM - Create</h1><p>In the section you are going to learn what is a RAM and how you can create it inside Aventus.</p><h2>Definition</h2><p>A RAM is a class that store all your <av-router-link state="/data/create">data instances</av-router-link>. This class    is most of the time a singleton because we want only one storage by type. This piece of code is in charge of all    CRUD (Create / Read / Update / Delete) operations.</p><h2>Inside Aventus</h2><p>Inside Aventus you can create RAM by right clicking on the explorer part inside vscode, choose <i>Aventus        : Create...</i> and choose <i>RAM</i>. Inside the input you can enter the name of the class for which you create    a store (ex: Person will create a PersonRAM class). This will create a basic RAM class:</p><av-doc-ram-create-editor-1></av-doc-ram-create-editor-1><p>By default, the Aventus.RAM store data by index that must be a <span class="cn">number</span>. The method <span class="cn">defineIndexKey</span> ask    you to define which key of your object is the primary key to index data. For example if you want to get a data    inside your RAM you must provide a number that is egal to the index key defined. With the previous example, the code    <span class="cn">PersonRAM.getInstance().get(1)</span> will check if the storage contains a Person where id is egal to 1.</p><p>If you need another kind of index key, you can extend <span class="cn">Aventus.GenericRam</span> instead of Aventus.Ram</p><av-doc-ram-create-editor-2></av-doc-ram-create-editor-2><p>The <span class="cn">getTypeForData</span> method allows you to define which object must be instanciated for a specific data. This    isn't usefull when you work with concrete classes but if you have abstract classes or interfaces, you have to define    which child must be stored inside RAM.</p><av-doc-ram-create-editor-3></av-doc-ram-create-editor-3>` }
    });
}
    getClassName() {
        return "DocRamCreate";
    }
}
DocRamCreate.Namespace=`${moduleName}`;
DocRamCreate.Tag=`av-doc-ram-create`;
_.DocRamCreate=DocRamCreate;
if(!window.customElements.get('av-doc-ram-create')){window.customElements.define('av-doc-ram-create', DocRamCreate);Aventus.WebComponentInstance.registerDefinition(DocRamCreate);}

const DocRamCrud = class DocRamCrud extends DocGenericPage {
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
        blocks: { 'default':`<h1>RAM - Operations</h1><p>To manage data inside your RAM, can perfom 4 kind of operations :</p><ul>    <li>Create - To add data inside your RAM</li>    <li>Read - To read data inside your RAM</li>    <li>Update - To update data inside your RAM</li>    <li>Delete - To delete data from your RAM</li></ul><h2>Basic operations</h2><p>Inside Aventus RAM, each function to perfom operation can be written in two format. The first format is the normal.    You call the function and get the result.</p><p>The second format is the detailed. You call the function with <span class="cn">WithError</span> at the end to obtain more    informations.</p><av-doc-ram-crud-editor-1></av-doc-ram-crud-editor-1><p>For the future explanations, only the functions in normal format will be explained</p><h3>Read</h3><div class="table">    <av-dynamic-row class="header">        <av-dynamic-col size="4" center>Function</av-dynamic-col>        <av-dynamic-col size="8" center>Description</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>getAll</av-dynamic-col>        <av-dynamic-col size="8" center>Return all items stored inside the RAM like {[index: Index] : T}        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>getList</av-dynamic-col>        <av-dynamic-col size="8" center>Return all items stored inside the RAM like T[]        </av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>getById</av-dynamic-col>        <av-dynamic-col size="8" center>Return the item where the index is egal to the parameter            provide</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>get</av-dynamic-col>        <av-dynamic-col size="8" center><span>Alias for <span class="cn">getById</span></span></av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>getByIds</av-dynamic-col>        <av-dynamic-col size="8" center>Return all items where the index is inside the first parameter            provide</av-dynamic-col>    </av-dynamic-row></div><av-doc-ram-crud-editor-2></av-doc-ram-crud-editor-2><h3>Create</h3><div class="table">    <av-dynamic-row class="header">        <av-dynamic-col size="4" center>Function</av-dynamic-col>        <av-dynamic-col size="8" center>Description</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>create</av-dynamic-col>        <av-dynamic-col size="8" center>Store an item inside the RAM and return the element stored.</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>createList</av-dynamic-col>        <av-dynamic-col size="8" center>Store a set of items inside the RAM and return the elements            stored.</av-dynamic-col>    </av-dynamic-row></div><av-doc-ram-crud-editor-3></av-doc-ram-crud-editor-3><h3>Update</h3><div class="table">    <av-dynamic-row class="header">        <av-dynamic-col size="4" center>Function</av-dynamic-col>        <av-dynamic-col size="8" center>Description</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>update</av-dynamic-col>        <av-dynamic-col size="8" center>Update an item inside the RAM and return the element updated.</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>updateList</av-dynamic-col>        <av-dynamic-col size="8" center>Update a set of items inside the RAM and return the elements            stored.</av-dynamic-col>    </av-dynamic-row></div><av-doc-ram-crud-editor-4></av-doc-ram-crud-editor-4><h3>Delete</h3><div class="table">    <av-dynamic-row class="header">        <av-dynamic-col size="4" center>Function</av-dynamic-col>        <av-dynamic-col size="8" center>Description</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>delete</av-dynamic-col>        <av-dynamic-col size="8" center>Delete an item inside the RAM and return the element updated.</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>deleteById</av-dynamic-col>        <av-dynamic-col size="8" center>Delete an item inside the RAM and return the element updated.</av-dynamic-col>    </av-dynamic-row>    <av-dynamic-row>        <av-dynamic-col size="4" center>deleteList</av-dynamic-col>        <av-dynamic-col size="8" center>Delete a set of items inside the RAM and return the elements            stored.</av-dynamic-col>    </av-dynamic-row></div><av-doc-ram-crud-editor-5></av-doc-ram-crud-editor-5><p>The last thing to know is that once an item a stored inside the ram, the item reference is always the same.</p><av-code language="typescript" filename="Test.lib.avt">    export async function test() {    \tlet person1: Person = await PersonRAM.getInstance().get(1);    \tperson1.name = "John Doe 2";    \tconst person: Person = await PersonRAM.getInstance().update(person1);    \t// person == person1 =&gt; true    }</av-code></av-code>` }
    });
}
    getClassName() {
        return "DocRamCrud";
    }
}
DocRamCrud.Namespace=`${moduleName}`;
DocRamCrud.Tag=`av-doc-ram-crud`;
_.DocRamCrud=DocRamCrud;
if(!window.customElements.get('av-doc-ram-crud')){window.customElements.define('av-doc-ram-crud', DocRamCrud);Aventus.WebComponentInstance.registerDefinition(DocRamCrud);}

const DocRamListenChanges = class DocRamListenChanges extends DocGenericPage {
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
        blocks: { 'default':`<h1>RAM - Listen changes</h1><h2>Item scoped functions</h2><p>Because your component must be refreshed when your RAM item changed, the item coming from a RAM has 4 new functions.</p><ul>    <li><span class="cn">onUpdate</span> : Add a callback trigger when data updated</li>    <li><span class="cn">offUpdate</span> : Remove a callback trigger when data updated</li>    <li><span class="cn">onDelete</span> : Add a callback trigger when data deleted</li>    <li><span class="cn">offDelete</span> : Remove a callback trigger when data deleted</li></ul><av-doc-ram-listen-changes-editor-1></av-doc-ram-listen-changes-editor-1><p>You must care of the function scope. When you provide a function as parameter sometimes the scope of the function isn't right. To avoid scope error your can use <span class="cn">@BindThis()</span>.</p><av-doc-ram-listen-changes-editor-2></av-doc-ram-listen-changes-editor-2><h2>RAM scoped functions</h2><p>To listen what is happening inside your RAM. You can subscribe to 3 listeners:</p><ul>    <li><span class="cn">onCreated</span> : trigger when a new data is created</li>    <li><span class="cn">onUpdated</span> : trigger when a data is updated</li>    <li><span class="cn">onDeleted</span> : trigger when a data is deleted</li></ul><p>To remove your listeners you can use the following functions</p><ul>    <li><span class="cn">offCreated</span></li>    <li><span class="cn">offUpdated</span></li>    <li><span class="cn">offDeleted</span></li></ul><av-doc-ram-listen-changes-editor-3></av-doc-ram-listen-changes-editor-3>` }
    });
}
    getClassName() {
        return "DocRamListenChanges";
    }
}
DocRamListenChanges.Namespace=`${moduleName}`;
DocRamListenChanges.Tag=`av-doc-ram-listen-changes`;
_.DocRamListenChanges=DocRamListenChanges;
if(!window.customElements.get('av-doc-ram-listen-changes')){window.customElements.define('av-doc-ram-listen-changes', DocRamListenChanges);Aventus.WebComponentInstance.registerDefinition(DocRamListenChanges);}

const DocRamMixin = class DocRamMixin extends DocGenericPage {
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
        blocks: { 'default':`<h1>RAM - Extend data</h1><p>As you can see inside the previous section, new functions are added on the items. You can your custom functions too    based on the <a href="https://www.patterns.dev/posts/mixin-pattern" target="_blank">mixin pattern</a>. This is    useful when you auto generated your data from your backend but you just want to add some functions. The best way    to learn this is with an example. We will add a function helloWorld on the Person item.</p><av-doc-ram-mixin-editor-1></av-doc-ram-mixin-editor-1><p>First of all, we must create an interface with the action needed.</p><av-doc-ram-mixin-editor-2></av-doc-ram-mixin-editor-2><p>Then you can create a type that is the mix of the data and the extension.</p><av-doc-ram-mixin-editor-3></av-doc-ram-mixin-editor-3><p>Then you can add your RAM.</p><av-doc-ram-mixin-editor-4></av-doc-ram-mixin-editor-4><p>Then you can add the the mixin pattern.</p><av-doc-ram-mixin-editor-5></av-doc-ram-mixin-editor-5><p>Now you can use the extension on the function <span class="cn">getTypeForData</span>.</p><av-doc-ram-mixin-editor-6></av-doc-ram-mixin-editor-6><p>Now you can call the function <span class="cn">helloWorld()</span> when you are loading data from the RAM.</p><av-doc-ram-mixin-editor-7></av-doc-ram-mixin-editor-7>` }
    });
}
    getClassName() {
        return "DocRamMixin";
    }
}
DocRamMixin.Namespace=`${moduleName}`;
DocRamMixin.Tag=`av-doc-ram-mixin`;
_.DocRamMixin=DocRamMixin;
if(!window.customElements.get('av-doc-ram-mixin')){window.customElements.define('av-doc-ram-mixin', DocRamMixin);Aventus.WebComponentInstance.registerDefinition(DocRamMixin);}

const DocStateCreate = class DocStateCreate extends DocGenericPage {
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
        blocks: { 'default':`<h1>State - Create</h1><p>In the section you are going to learn what is a state and how you can create it inside Aventus.</p><h2>Definition</h2><p>A state is a way to define a unique state of your application. The state concept is divided in two part:    <span class="cn">StateManager</span> and <span class="cn">State</span>. The StateManager will manage the transition from one state to another. The    state is an object with a name. The best state example inside Aventus is the <span class="cn">Router</span>. Inside the router, you    must declare unique route matching to a single <span class="cn">Page</span>.</p><h2>Inside Aventus</h2><p>Inside Aventus you can create a new state class by right clicking on the explorer part inside vscode, choose    <i>Aventus : Create...</i> and choose <i>State</i>. You must select between <span class="cn">State</span> or <span class="cn">Manager</span> and then    inside the input you can enter the name for the class. This will create a basic class:</p><av-doc-state-create-editor-1></av-doc-state-create-editor-1>` }
    });
}
    getClassName() {
        return "DocStateCreate";
    }
}
DocStateCreate.Namespace=`${moduleName}`;
DocStateCreate.Tag=`av-doc-state-create`;
_.DocStateCreate=DocStateCreate;
if(!window.customElements.get('av-doc-state-create')){window.customElements.define('av-doc-state-create', DocStateCreate);Aventus.WebComponentInstance.registerDefinition(DocStateCreate);}

const DocStateChange = class DocStateChange extends DocGenericPage {
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
        blocks: { 'default':`<h1>State - Change</h1><p>To change the current state of a manager, you can use different methods.</p><h2>On the manager</h2><p>You can change current state directly on the manager by calling the function <span class="cn">setState</span> with a    <span class="cn">string</span> or a <span class="cn">State</span> item.</p><av-doc-state-change-editor-1></av-doc-state-change-editor-1><p>If you set a string, an <span class="cn">EmptyState</span> will be created with the name provided.</p><h2>On the state - static</h2><p>You can also activate a state with the static method <span class="cn">activate</span> on the class <span class="cn">Aventus.State</span>.</p><av-doc-state-change-editor-2></av-doc-state-change-editor-2><h2>On the state - instance</h2><p>Finally, you can activate the state with the method <span class="cn">activate</span> on a state instance.</p><av-doc-state-change-editor-3></av-doc-state-change-editor-3>` }
    });
}
    getClassName() {
        return "DocStateChange";
    }
}
DocStateChange.Namespace=`${moduleName}`;
DocStateChange.Tag=`av-doc-state-change`;
_.DocStateChange=DocStateChange;
if(!window.customElements.get('av-doc-state-change')){window.customElements.define('av-doc-state-change', DocStateChange);Aventus.WebComponentInstance.registerDefinition(DocStateChange);}

const DocStateListen = class DocStateListen extends DocGenericPage {
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
        blocks: { 'default':`<h1>State - Listen changes</h1><p>Changing state is great, but for sure you will need to listen when a state change. Three methods compose the <span class="cn">State</span> lifecylce. This tuple is named <span class="cn">StateAction</span> inside Aventus.</p><ul>    <li><span class="cn">active</span>: when a state become active.</li>    <li><span class="cn">inactive</span>: when a state become inactive.</li>    <li><span class="cn">askChange</span>: a way to define if the state change can be done or not.</li></ul><h2>Callback on the StateManager</h2><p>For the example, we are going to listen a state to display a user.</p><av-doc-state-listen-editor-1></av-doc-state-listen-editor-1><p>We subscribe to the state <span class="cn">/user/{id:number}</span> what means that the manager will trigger active    when the current state is matching <span class="cn">/^\\/user\\/([0-9]+)$/g</span>. The type available are <span class="cn">number</span> and <span class="cn">string</span>. If you don't set type, string will be use by    default. You can also use the star (<span class="cn">*</span>) to match anything.</p><p>When the <span class="cn">setUser</span> function is called, the log <span class="cn">user active is...</span> will    be displayed. If you set the current state to <span class="cn">/other</span>, the inactive state will be called.    It's important to know that if your state stay active between two state changes, the function <span class="cn">inactive</span> won't be fired.</p><av-doc-state-listen-editor-2></av-doc-state-listen-editor-2><p>If we come back to the previous example, if we set the user to <span class="cn">id = 3</span> the function <span class="cn">askChange</span> will return a false what involves that no more state changes are allowed. A use case    for this feature is when the user is editing data and he decides to change state without saving item. You can    display a popup to confirm if edition must be dropped or not.</p><p>If you need to know the current state of the manager, you can at any time call the function <span class="cn">getState</span> to obtain the current state object instance. Furthermore, you can use operator <span class="cn">instanceof</span> to obtain more informations and share some data between subscribers.</p><av-doc-state-listen-editor-3></av-doc-state-listen-editor-3><h2>Callback on the State</h2><p>You can also override the three methods directly inside a <span class="cn">State</span> class.</p><av-doc-state-listen-editor-4></av-doc-state-listen-editor-4>` }
    });
}
    getClassName() {
        return "DocStateListen";
    }
}
DocStateListen.Namespace=`${moduleName}`;
DocStateListen.Tag=`av-doc-state-listen`;
_.DocStateListen=DocStateListen;
if(!window.customElements.get('av-doc-state-listen')){window.customElements.define('av-doc-state-listen', DocStateListen);Aventus.WebComponentInstance.registerDefinition(DocStateListen);}

const DocWcCreateEditor1 = class DocWcCreateEditor1 extends Aventus.WebComponent {
    static __style = `:host{width:100%}`;
    __getStatic() {
        return DocWcCreateEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcCreateEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Component Example" _id="docwccreateeditor1_0">    <av-code language="json" filename="ComponentExample/aventus.conf.avt">        <pre>            {                "module": "ComponentExample",                "componentPrefix": "av",                "build": [                    {                        "name": "Main",                        "src": [                            "./src/*"                        ],                        "compile": [                            {                                "output": "./dist/demo.js"                            }                        ]                    }                ],                "static": [{                    "name": "Static",                    "input": "./static/*",                    "output": "./dist/"                }]            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="ComponentExample/src/Button/Button.wcl.avt">        <pre>            export class Button extends Aventus.Component implements Aventus.DefaultComponent {                &nbsp;                //#region static                &nbsp;                //#endregion                &nbsp;                &nbsp;                //#region props                &nbsp;                //#endregion                &nbsp;                &nbsp;                //#region variables                &nbsp;                //#endregion                &nbsp;                &nbsp;                //#region constructor                &nbsp;                //#endregion                &nbsp;                &nbsp;                //#region methods                &nbsp;                //#endregion                &nbsp;            }        </pre>    </av-code></av-code>    <av-code language="html" filename="ComponentExample/src/Button/Button.wcv.avt">        <pre>            &lt;slot&gt;&lt;/slot&gt;        </pre>    </av-code></av-code>    <av-code language="css" filename="ComponentExample/src/Button/Button.wcs.avt">        <pre>            :host {                background-color: #e5540e;                border-radius: 5px;                color: white;                cursor: pointer;                padding: 5px 15px;                user-select: none;            }        </pre>    </av-code></av-code>    <av-code language="html" filename="ComponentExample/static/index.html">        <pre>            &lt;!DOCTYPE html&gt;            &lt;html lang="en"&gt;            &lt;head&gt;                &lt;meta charset="UTF-8"&gt;                &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;                &lt;title&gt;Aventus Demo&lt;/title&gt;                &lt;script src="/demo.js"&gt;&lt;/script&gt;            &lt;/head&gt;            &lt;body&gt;                &lt;av-button&gt;Click me&lt;/av-button&gt;            &lt;/body&gt;            &lt;/html&gt;        </pre>    </av-code></av-code>    <slot></slot>    <av-doc-wc-create-editor-1-button slot="result">Click me</av-doc-wc-create-editor-1-button></av-code-editor>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "editorEl",
      "ids": [
        "docwccreateeditor1_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "DocWcCreateEditor1";
    }
    startupFile() {
        return "ComponentExample/static/index.html";
    }
    postCreation() {
        this.editorEl.show = this.startupFile();
    }
}
DocWcCreateEditor1.Namespace=`${moduleName}`;
DocWcCreateEditor1.Tag=`av-doc-wc-create-editor-1`;
_.DocWcCreateEditor1=DocWcCreateEditor1;
if(!window.customElements.get('av-doc-wc-create-editor-1')){window.customElements.define('av-doc-wc-create-editor-1', DocWcCreateEditor1);Aventus.WebComponentInstance.registerDefinition(DocWcCreateEditor1);}

const DocWcCreateEditor2 = class DocWcCreateEditor2 extends Aventus.WebComponent {
    static __style = `:host{width:100%}`;
    __getStatic() {
        return DocWcCreateEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcCreateEditor2.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Component Example" _id="docwccreateeditor2_0">    <av-code language="json" filename="ComponentExample/aventus.conf.avt">        <pre>            {                "module": "ComponentExample",                "componentPrefix": "av",                "build": [                    {                        "name": "Main",                        "src": [                            "./src/*"                        ],                        "compile": [                            {                                "output": "./dist/demo.js"                            }                        ]                    }                ],                "static": [{                    "name": "Static",                    "input": "./static/*",                    "output": "./dist/"                }]            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="ComponentExample/src/Error/Error.wcl.avt">        <pre>            export class Error extends Aventus.Component implements Aventus.DefaultComponent {                &nbsp;                //#region static                &nbsp;                //#endregion                &nbsp;                &nbsp;                //#region props                &nbsp;                //#endregion                &nbsp;                &nbsp;                //#region variables                &nbsp;                //#endregion                &nbsp;                &nbsp;                //#region constructor                &nbsp;                //#endregion                &nbsp;                &nbsp;                //#region methods                &nbsp;                //#endregion                &nbsp;            }        </pre>    </av-code></av-code>    <av-code language="html" filename="ComponentExample/src/Error/Error.wcv.avt">        <pre>            &lt;slot&gt; &lt;!-- The default content appends here --&gt;&lt;/slot&gt;            &lt;slot style="color:red" name="error"&gt;&lt;!-- The errors appends here --&gt;&lt;/slot&gt;            &lt;slot style="color:green" name="success"&gt;&lt;!-- The success appends here --&gt;&lt;/slot&gt;        </pre>    </av-code></av-code>    <av-code language="css" filename="ComponentExample/src/Error/Error.wcs.avt">        <pre>            :host {            }        </pre>    </av-code></av-code>    <av-code language="html" filename="ComponentExample/static/index.html">        <pre>            &lt;!DOCTYPE html&gt;            &lt;html lang="en"&gt;            &lt;head&gt;                &lt;meta charset="UTF-8"&gt;                &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;                &lt;title&gt;Aventus Demo&lt;/title&gt;                &lt;script src="/demo.js"&gt;&lt;/script&gt;            &lt;/head&gt;            &lt;body&gt;                &lt;av-error&gt;                    &lt;p&gt;I'm the default content&lt;/p&gt;                    &lt;p slot=""&gt;I'm the default content too&lt;/p&gt;                    &lt;p slot="error"&gt;I'm an error in red&lt;/p&gt;                    &lt;p slot="success"&gt;I'm a success in green&lt;/p&gt;                &lt;/av-error&gt;            &lt;/body&gt;            &lt;/html&gt;        </pre>    </av-code></av-code>    <slot></slot>    <av-doc-wc-create-editor-2-error slot="result">        <p>I'm the default content</p>        <p slot="">I'm the default content too</p>        <p slot="error">I'm an error in red</p>        <p slot="success">I'm a success in green</p>    </av-doc-wc-create-editor-2-error></av-code-editor>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "editorEl",
      "ids": [
        "docwccreateeditor2_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "DocWcCreateEditor2";
    }
    startupFile() {
        return "ComponentExample/src/Error/Error.wcv.avt";
    }
    postCreation() {
        this.editorEl.show = this.startupFile();
    }
}
DocWcCreateEditor2.Namespace=`${moduleName}`;
DocWcCreateEditor2.Tag=`av-doc-wc-create-editor-2`;
_.DocWcCreateEditor2=DocWcCreateEditor2;
if(!window.customElements.get('av-doc-wc-create-editor-2')){window.customElements.define('av-doc-wc-create-editor-2', DocWcCreateEditor2);Aventus.WebComponentInstance.registerDefinition(DocWcCreateEditor2);}

const DocWcCreateEditor3 = class DocWcCreateEditor3 extends Aventus.WebComponent {
    static __style = `:host{width:100%}`;
    __getStatic() {
        return DocWcCreateEditor3;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcCreateEditor3.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Component Example" _id="docwccreateeditor3_0">    <av-code language="json" filename="ComponentExample/aventus.conf.avt">        <pre>            {                "module": "ComponentExample",                "componentPrefix": "av",                "build": [                    {                        "name": "Main",                        "src": [                            "./src/*"                        ],                        "compile": [                            {                                "output": "./dist/demo.js"                            }                        ]                    }                ],                "static": [{                    "name": "Static",                    "input": "./static/*",                    "output": "./dist/"                }]            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="ComponentExample/src/Error/Error.wcl.avt">        <pre>            export class Error extends Aventus.Component implements Aventus.DefaultComponent {                &nbsp;                //#region static                &nbsp;                //#endregion                &nbsp;                &nbsp;                //#region props                &nbsp;                //#endregion                &nbsp;                &nbsp;                //#region variables                &nbsp;                //#endregion                &nbsp;                &nbsp;                //#region constructor                &nbsp;                //#endregion                &nbsp;                &nbsp;                //#region methods                &nbsp;                //#endregion                &nbsp;            }        </pre>    </av-code></av-code>    <av-code language="html" filename="ComponentExample/src/Error/Error.wcv.avt">        <pre>            &lt;slot&gt; &lt;!-- The default content appends here --&gt;&lt;/slot&gt;            &lt;slot style="color:red" name="error"&gt;&lt;!-- The errors appends here --&gt;&lt;/slot&gt;            &lt;slot style="color:green" name="success"&gt;&lt;!-- The success appends here --&gt;&lt;/slot&gt;        </pre>    </av-code></av-code>    <av-code language="css" filename="ComponentExample/src/Error/Error.wcs.avt">        <pre>            :host {            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="ComponentExample/src/ErrorYellow/ErrorYellow.wcl.avt">        <pre>            import { Error } from "../Error/Error.wcl.avt";            &nbsp;            export class ErrorYellow extends Error implements Aventus.DefaultComponent {                &nbsp;                //#region static                &nbsp;                //#endregion                &nbsp;                &nbsp;                //#region props                &nbsp;                //#endregion                &nbsp;                &nbsp;                //#region variables                &nbsp;                //#endregion                &nbsp;                &nbsp;                //#region constructor                &nbsp;                //#endregion                &nbsp;                &nbsp;                //#region methods                &nbsp;                //#endregion                &nbsp;            }        </pre>    </av-code></av-code>    <av-code language="html" filename="ComponentExample/src/ErrorYellow/ErrorYellow.wcv.avt">        <pre>            &lt;block name="error"&gt;                &lt;span style="color:yellow"&gt;                    &lt;!-- The errors will be displayed in yellow now --&gt;                    &lt;slot name="error"&gt;&lt;/slot&gt;                &lt;/span&gt;            &lt;/block>        </pre>    </av-code></av-code>    <av-code language="css" filename="ComponentExample/src/ErrorYellow/ErrorYellow.wcs.avt">        <pre>            :host {            }        </pre>    </av-code></av-code>    <av-code language="html" filename="ComponentExample/static/index.html">        <pre>            &lt;!DOCTYPE html&gt;            &lt;html lang="en"&gt;            &lt;head&gt;                &lt;meta charset="UTF-8"&gt;                &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;                &lt;title&gt;Aventus Demo&lt;/title&gt;                &lt;script src="/demo.js"&gt;&lt;/script&gt;            &lt;/head&gt;            &lt;body&gt;                &lt;av-error&gt;                    &lt;p&gt;I'm the default content&lt;/p&gt;                    &lt;p slot=""&gt;I'm the default content too&lt;/p&gt;                    &lt;p slot="error"&gt;I'm an error in red&lt;/p&gt;                    &lt;p slot="success"&gt;I'm a success in green&lt;/p&gt;                &lt;/av-error&gt;            &lt;/body&gt;            &lt;/html&gt;        </pre>    </av-code></av-code>    <slot></slot>    <av-doc-wc-create-editor-3-error-yellow slot="result">        <p>I'm the default content</p>        <p slot="">I'm the default content too</p>        <p slot="error">I'm an error in yellow</p>        <p slot="success">I'm a success in green</p>    </av-doc-wc-create-editor-3-error-yellow></av-code-editor>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "editorEl",
      "ids": [
        "docwccreateeditor3_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "DocWcCreateEditor3";
    }
    startupFile() {
        return "ComponentExample/src/ErrorYellow/ErrorYellow.wcv.avt";
    }
    postCreation() {
        this.editorEl.show = this.startupFile();
    }
}
DocWcCreateEditor3.Namespace=`${moduleName}`;
DocWcCreateEditor3.Tag=`av-doc-wc-create-editor-3`;
_.DocWcCreateEditor3=DocWcCreateEditor3;
if(!window.customElements.get('av-doc-wc-create-editor-3')){window.customElements.define('av-doc-wc-create-editor-3', DocWcCreateEditor3);Aventus.WebComponentInstance.registerDefinition(DocWcCreateEditor3);}

const DocWcCreateEditor4 = class DocWcCreateEditor4 extends Aventus.WebComponent {
    static __style = `:host{width:100%}`;
    __getStatic() {
        return DocWcCreateEditor4;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcCreateEditor4.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Component Example" _id="docwccreateeditor4_0">    <av-code language="json" filename="ComponentExample/aventus.conf.avt">        <pre>            {                "module": "ComponentExample",                "componentPrefix": "av",                "build": [                    {                        "name": "Main",                        "src": [                            "./src/*"                        ],                        "compile": [                            {                                "output": "./dist/demo.js"                            }                        ]                    }                ],                "static": [{                    "name": "Static",                    "input": "./static/*",                    "output": "./dist/"                }]            }        </pre>    </av-code></av-code>    <av-code language="typescript" filename="ComponentExample/src/Clock/Clock.wcl.avt">        <pre>            export class Clock extends Aventus.Component implements Aventus.DefaultComponent {                &nbsp;                //#region static                &nbsp;                //#endregion                &nbsp;                &nbsp;                //#region props                @Property()                public color: string = "red";                //#endregion                &nbsp;                &nbsp;                //#region variables                @Watch()                public timeTxt!: string;                //#endregion                &nbsp;                &nbsp;                //#region constructor                &nbsp;                //#endregion                &nbsp;                &nbsp;                //#region methods                private calcTime() {                    const d = new Date();                    this.timeTxt = ((d.getHours() < 10) ? "0" : "") + d.getHours()                        + ":" + ((d.getMinutes() < 10) ? "0" : "") + d.getMinutes()                        + ":" + ((d.getSeconds() < 10) ? "0" : "") + d.getSeconds();                }                &nbsp;                protected override postCreation(): void {                    // When the component is rendered                    this.calcTime();                    setInterval(() => {                        this.calcTime();                    }, 1000);                }                //#endregion                &nbsp;            }        </pre>    </av-code></av-code>    <av-code language="html" filename="ComponentExample/src/Clock/Clock.wcv.avt">        <pre>            &lt;p style="color:{{ this.color }}"&gt;Time : {{ this.timeTxt }}&lt;/p&gt;        </pre>    </av-code></av-code>    <av-code language="css" filename="ComponentExample/src/Clock/Clock.wcs.avt">        <pre>            :host {            }        </pre>    </av-code></av-code>    <av-code language="html" filename="ComponentExample/static/index.html">        <pre>            &lt;!DOCTYPE html&gt;            &lt;html lang="en"&gt;            &lt;head&gt;                &lt;meta charset="UTF-8"&gt;                &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;                &lt;title&gt;Aventus Demo&lt;/title&gt;                &lt;script src="/demo.js"&gt;&lt;/script&gt;            &lt;/head&gt;            &lt;body&gt;                &lt;av-clock&gt;&lt;/av-clock&gt;            &lt;/body&gt;            &lt;/html&gt;        </pre>    </av-code></av-code>    <slot></slot>    <av-doc-wc-create-editor-4-clock slot="result"></av-doc-wc-create-editor-4-clock></av-code-editor>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();this.__getStatic().__template.setActions({
  "elements": [
    {
      "name": "editorEl",
      "ids": [
        "docwccreateeditor4_0"
      ]
    }
  ]
}); }
    getClassName() {
        return "DocWcCreateEditor4";
    }
    startupFile() {
        return "ComponentExample/src/Clock/Clock.wcv.avt";
    }
    postCreation() {
        this.editorEl.show = this.startupFile();
    }
}
DocWcCreateEditor4.Namespace=`${moduleName}`;
DocWcCreateEditor4.Tag=`av-doc-wc-create-editor-4`;
_.DocWcCreateEditor4=DocWcCreateEditor4;
if(!window.customElements.get('av-doc-wc-create-editor-4')){window.customElements.define('av-doc-wc-create-editor-4', DocWcCreateEditor4);Aventus.WebComponentInstance.registerDefinition(DocWcCreateEditor4);}

const DocWcCreate = class DocWcCreate extends DocGenericPage {
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
        blocks: { 'default':`<h1>Webcomponent - Create</h1><p>In the section you are going to learn what is a webcomponent and how you can create it inside Aventus.</p><h2>Definition</h2><p>Web Components is a suite of different technologies allowing you to create reusable custom elements — with their    functionality encapsulated away from the rest of your code — and utilize them in your web apps. (<i><a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components" target="_blank">https://developer.mozilla.org/</a></i>).</p><p>With the native technologie, you are able to wrap your style, your logic and your html template inside a single html    tag. You can build your full webapp by building one component after another without worring about side effects (the    developer's worst nightmare).</p><h2>Inside Aventus</h2><p>Inside Aventus you can create web component by right clicking one the explorer part inside vscode, choose <i>Aventus        : Create...</i> and choose <i>Component</i>. Inside the input you can enter the name for the typescript class.    By convention, this name should be in Snake case. You can write your webcomponent inside a single file    <span class="cn">*.wc.avt</span> that    will contains following section :</p><ul>    <li><span class="cn">&lt;template&gt;</span> : for Html part</li>    <li><span class="cn">&lt;style&gt;</span> : for Scss part</li>    <li><span class="cn">&lt;script&gt;</span> : for Js part</li></ul><p>or inside 3 different file. (This option is the adviced one because it allows developer to keep a well knowed    architecture.)</p><ul>    <li><span class="cn">*.wcv.avt</span> : Web Componenent View for Html part</li>    <li><span class="cn">*.wcs.avt</span> : Web Componenent View for Scss part</li>    <li><span class="cn">*.wcl.avt</span> : Web Componenent View for Ts part</li></ul><av-doc-wc-create-editor-1></av-doc-wc-create-editor-1><h2>The Html</h2><p>You can use any basic tag or any tag you imported or created. The auto-completion will help you to find knowed tags.    There are 2 special tags that you must know :</p><h3>&lt;slot&gt;</h3><p>The slot tag allows developer to define the place where the code inside the tag will be added. This slot can have an    attribute <span class="cn">name</span> to have multiple slots.</p><av-doc-wc-create-editor-2></av-doc-wc-create-editor-2><h3>&lt;block&gt;</h3><p>The block tag must be used in case of inheritance. This will replace the slot by the block with the same name.</p><av-doc-wc-create-editor-3></av-doc-wc-create-editor-3><p>There are sepcial attributes you can use to add feature to basic html: </p><ul>    <li>@element : To select element(s). <av-router-link state="/docs/wc/element" class="font-sm">More            info</av-router-link></li>    <li>@for : To create a loop. <av-router-link state="/docs/wc/loop" class="font-sm">More info</av-router-link></li>    <li>@bind(_<i><span class="cn">$event</span></i>)?(:<i><span class="cn">$field</span></i>)? : To bind data.        <av-router-link class="font-sm" state="/docs/wc/binding">More            info</av-router-link>    </li>    <li>:<i><span class="cn">$field</span></i> : To inject data. <av-router-link state="/docs/wc/injection" class="font-sm">More            info</av-router-link>    </li>    <li>@press : To add press event from PressManager. <av-router-link state="/docs/wc/event" class="font-sm">More            info</av-router-link>    </li>    <li>@<i><span class="cn">$eventName</span></i> : To add event listener. <av-router-link state="/docs/wc/event" class="font-sm">More            info</av-router-link>    </li></ul><p>You can use interpolation inside tag content and normal attribute to have dynamic content. If you use <av-router-link state="/docs/wc/event">a property value</av-router-link>&nbsp;or&nbsp;<av-router-link state="/docs/wc/event">a        watch value</av-router-link> the content will be refreshed.</p><av-doc-wc-create-editor-4></av-doc-wc-create-editor-4><h2>The style</h2><p>This is just a simple SCSS file. The only think to know is that the style must be wrapped inside a :host{}.</p><av-code language="css" filename="TextRed.wcs.avt">    :host {    \tcolor: red; // This ll change the behavior of the current webcomponent    }</av-code></av-code><p>You can find more informations about the style <av-router-link state="/docs/wc/style">here.</av-router-link></p><h2>The logic</h2><p>When you create a new file *.wcl.avt you can notice that the file has region. This is set to allow developer to order    the code. Each region has a goal. You can remove it but we advice you to keep it.</p><ul>    <li>static : Where you can write the static properties or methods for your webcomponent.</li>    <li>props : Where you can define the <av-router-link state="/docs/wc/attribute">attributes</av-router-link>, the        <av-router-link state="/docs/wc/property">properties</av-router-link>&nbsp;and the <av-router-link state="/docs/wc/watch">watch variables.</av-router-link>    </li>    <li>variables : Where you can define the variables and the pointers on <av-router-link state="/docs/wc/element">view            element</av-router-link></li>    <li>constructor : Where you can override the constructor for your webcomponent.</li>    <li>methods : Where you can write the methods for your webcomponent.</li></ul><av-code language="typescript">    export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {    &nbsp;    \t//#region static    &nbsp;    \t//#endregion    &nbsp;    \t//#region props    &nbsp;    \t//#endregion    &nbsp;    \t//#region variables    &nbsp;    \t//#endregion    &nbsp;    \t//#region constructor    &nbsp;    \t//#endregion    &nbsp;    \t//#region methods    &nbsp;    \t//#endregion    &nbsp;    }</av-code></av-code><p>Over the classname you can add predefine Decorators :</p><ul>    <li><span class="cn">@TagName(name:string)</span> : to define the tag for the component</li>    <li><span class="cn">@Debugger({ writeCompiled?: boolean, enableWatchHistory?: boolean})</span> : to debug component        compilation and        state.    </li>    <li><span class="cn">@Dependances({ type: Type, strong?:boolean}[])</span> : to add dependance not written inside        component. The        strong boolean define if the dependance must be loaded before the class.</li>    <li><span class="cn">@OverrideView({ removeViewVariables?: string[] })</span> : to fully override parent view. You        can remove parent        ViewElement needed, but you have to be aware of what you are doing.</li>    <li><span class="cn">@Internal()</span> : to allow exporting class only in the current package but the class won't be usable for someone else that is using the package.</li>    <li><span class="cn">@Required()</span> : to force the class to be exported inside the *.js file.</li>    <li><span class="cn">@Convertible(name: string = "Fullname")</span> : to notify the compiler that the class can be converted from JSON. The parameter <span class="cn">name</span> define the key to detect the class to build.</li></ul><av-code language="typescript">    @TagName("my-tag-name")    export class Example extends Aventus.WebComponent implements Aventus.DefaultComponent {    }</av-code></av-code><h2>Lifecycle</h2><p>The webcomponent has the following lifecycle</p><av-img src="/img/doc/wc/create/lifecylce.png"></av-img><p>By default <span class="cn">postCreation</span> and <span class="cn">postDestruction</span> are empty.</p>` }
    });
}
    getClassName() {
        return "DocWcCreate";
    }
}
DocWcCreate.Namespace=`${moduleName}`;
DocWcCreate.Tag=`av-doc-wc-create`;
_.DocWcCreate=DocWcCreate;
if(!window.customElements.get('av-doc-wc-create')){window.customElements.define('av-doc-wc-create', DocWcCreate);Aventus.WebComponentInstance.registerDefinition(DocWcCreate);}

const DocLibDragAndDrop = class DocLibDragAndDrop extends DocGenericPage {
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
DocLibDragAndDrop.Namespace=`${moduleName}`;
DocLibDragAndDrop.Tag=`av-doc-lib-drag-and-drop`;
_.DocLibDragAndDrop=DocLibDragAndDrop;
if(!window.customElements.get('av-doc-lib-drag-and-drop')){window.customElements.define('av-doc-lib-drag-and-drop', DocLibDragAndDrop);Aventus.WebComponentInstance.registerDefinition(DocLibDragAndDrop);}

const DocApp = class DocApp extends Aventus.Navigation.Router {
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
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`` }
    });
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
        this.addRoute("/docs/ram/crud", DocRamCrud);
        this.addRoute("/docs/ram/listen_changes", DocRamListenChanges);
        this.addRoute("/docs/ram/mixin", DocRamMixin);
        //#endregion
        //#region doc state
        this.addRoute("/docs/state/create", DocStateCreate);
        this.addRoute("/docs/state/change", DocStateChange);
        this.addRoute("/docs/state/listen_changes", DocStateListen);
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
DocApp.Namespace=`${moduleName}`;
DocApp.Tag=`av-doc-app`;
_.DocApp=DocApp;
if(!window.customElements.get('av-doc-app')){window.customElements.define('av-doc-app', DocApp);Aventus.WebComponentInstance.registerDefinition(DocApp);}

const DocPage = class DocPage extends Page {
    get 'open'() { return this.getBoolAttr('open') }
    set 'open'(val) { this.setBoolAttr('open', val) }    static __style = `:host{position:100%}:host av-doc-sidenav{transition:left .4s var(--bezier-curve)}:host .hider{background-color:rgba(0,0,0,0);display:none;height:100%;left:0;position:absolute;top:0;width:100%;z-index:99}:host>.container{width:calc(100% - 300px);max-width:none}:host([visible]){display:flex}@media screen and (max-width: 1100px){:host>.container{width:100%}:host av-doc-sidenav{height:calc(100% - 50px);left:-300px;position:absolute;top:50px;z-index:100}:host([open]) av-doc-sidenav{left:0px}:host([open]) .hider{display:block}}`;
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
      "onPress": (e, pressInstance, c) => { c.comp.closeMenu(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "DocPage";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('open')) { this.attributeChangedCallback('open', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('open'); }
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
DocPage.Namespace=`${moduleName}`;
DocPage.Tag=`av-doc-page`;
_.DocPage=DocPage;
if(!window.customElements.get('av-doc-page')){window.customElements.define('av-doc-page', DocPage);Aventus.WebComponentInstance.registerDefinition(DocPage);}

const TutorialGenericPage = class TutorialGenericPage extends Page {
    get 'fade'() { return this.getBoolAttr('fade') }
    set 'fade'(val) { this.setBoolAttr('fade', val) }    static __style = `:host{opacity:0;transition:visibility .3s ease-in,opacity .3s ease-in;visibility:hidden}:host .container{max-width:none;width:100%}:host .container av-scrollable{--scroller-right: 10px}:host .container .page-content{font-size:1.6rem;margin:auto;max-width:700px}:host .icon-menu{background-color:#fff;color:var(--primary-color);cursor:pointer;display:none;font-size:25px;left:16px;position:absolute;-webkit-tap-highlight-color:rgba(0,0,0,0);top:28px;z-index:9999}:host h1{color:var(--light-primary-color);font-size:3.2rem;margin:2.3rem 0;text-align:center}:host a{color:var(--link-color);text-decoration:none}:host p{line-height:1.7;text-align:justify}:host av-router-link,:host av-router-link{color:var(--link-color);cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host av-img{max-height:300px;width:100%}:host ul li,:host ol li{margin:5px 0}:host .table .header{border-bottom:1px solid var(--primary-color);font-size:20px;font-weight:bold;padding:5px}:host .table .header av-dynamic-col{text-align:center}:host .table av-dynamic-row{align-items:center;padding:10px}:host .table av-dynamic-row av-dynamic-col{padding:0 15px;text-align:center}:host .cn{background-color:#cfd1d4;border-radius:5px;color:var(--aventus-color);font-size:14px;padding:2px 8px}:host([fade]){opacity:1;visibility:visible}@media screen and (max-width: 1100px){:host .container av-scrollable{--scroller-right: 3px}:host .container .page-content{padding:0px 16px}:host h1{padding:0 32px}:host .icon-menu{display:block}}`;
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
      "onPress": (e, pressInstance, c) => { c.comp.openMenu(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "TutorialGenericPage";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('fade')) { this.attributeChangedCallback('fade', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('fade'); }
    __listBoolProps() { return ["fade"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    openMenu() {
        this.findParentByType(TutorialPage)?.openMenu();
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
TutorialGenericPage.Namespace=`${moduleName}`;
TutorialGenericPage.Tag=`av-tutorial-generic-page`;
_.TutorialGenericPage=TutorialGenericPage;
if(!window.customElements.get('av-tutorial-generic-page')){window.customElements.define('av-tutorial-generic-page', TutorialGenericPage);Aventus.WebComponentInstance.registerDefinition(TutorialGenericPage);}

const TutorialStyle = class TutorialStyle extends TutorialGenericPage {
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
TutorialStyle.Namespace=`${moduleName}`;
TutorialStyle.Tag=`av-tutorial-style`;
_.TutorialStyle=TutorialStyle;
if(!window.customElements.get('av-tutorial-style')){window.customElements.define('av-tutorial-style', TutorialStyle);Aventus.WebComponentInstance.registerDefinition(TutorialStyle);}

const TutorialList = class TutorialList extends TutorialGenericPage {
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
TutorialList.Namespace=`${moduleName}`;
TutorialList.Tag=`av-tutorial-list`;
_.TutorialList=TutorialList;
if(!window.customElements.get('av-tutorial-list')){window.customElements.define('av-tutorial-list', TutorialList);Aventus.WebComponentInstance.registerDefinition(TutorialList);}

const TutorialForm = class TutorialForm extends TutorialGenericPage {
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
TutorialForm.Namespace=`${moduleName}`;
TutorialForm.Tag=`av-tutorial-form`;
_.TutorialForm=TutorialForm;
if(!window.customElements.get('av-tutorial-form')){window.customElements.define('av-tutorial-form', TutorialForm);Aventus.WebComponentInstance.registerDefinition(TutorialForm);}

const TutorialRam = class TutorialRam extends TutorialGenericPage {
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
TutorialRam.Namespace=`${moduleName}`;
TutorialRam.Tag=`av-tutorial-ram`;
_.TutorialRam=TutorialRam;
if(!window.customElements.get('av-tutorial-ram')){window.customElements.define('av-tutorial-ram', TutorialRam);Aventus.WebComponentInstance.registerDefinition(TutorialRam);}

const TutorialData = class TutorialData extends TutorialGenericPage {
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
TutorialData.Namespace=`${moduleName}`;
TutorialData.Tag=`av-tutorial-data`;
_.TutorialData=TutorialData;
if(!window.customElements.get('av-tutorial-data')){window.customElements.define('av-tutorial-data', TutorialData);Aventus.WebComponentInstance.registerDefinition(TutorialData);}

const TutorialCreateApp = class TutorialCreateApp extends TutorialGenericPage {
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
TutorialCreateApp.Namespace=`${moduleName}`;
TutorialCreateApp.Tag=`av-tutorial-create-app`;
_.TutorialCreateApp=TutorialCreateApp;
if(!window.customElements.get('av-tutorial-create-app')){window.customElements.define('av-tutorial-create-app', TutorialCreateApp);Aventus.WebComponentInstance.registerDefinition(TutorialCreateApp);}

const TutorialInit = class TutorialInit extends TutorialGenericPage {
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
TutorialInit.Namespace=`${moduleName}`;
TutorialInit.Tag=`av-tutorial-init`;
_.TutorialInit=TutorialInit;
if(!window.customElements.get('av-tutorial-init')){window.customElements.define('av-tutorial-init', TutorialInit);Aventus.WebComponentInstance.registerDefinition(TutorialInit);}

const TutorialIntroduction = class TutorialIntroduction extends TutorialGenericPage {
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
TutorialIntroduction.Namespace=`${moduleName}`;
TutorialIntroduction.Tag=`av-tutorial-introduction`;
_.TutorialIntroduction=TutorialIntroduction;
if(!window.customElements.get('av-tutorial-introduction')){window.customElements.define('av-tutorial-introduction', TutorialIntroduction);Aventus.WebComponentInstance.registerDefinition(TutorialIntroduction);}

const TutorialApp = class TutorialApp extends Aventus.Navigation.Router {
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
    __getHtml() {super.__getHtml();
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`` }
    });
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
TutorialApp.Namespace=`${moduleName}`;
TutorialApp.Tag=`av-tutorial-app`;
_.TutorialApp=TutorialApp;
if(!window.customElements.get('av-tutorial-app')){window.customElements.define('av-tutorial-app', TutorialApp);Aventus.WebComponentInstance.registerDefinition(TutorialApp);}

const TutorialPage = class TutorialPage extends Page {
    get 'open'() { return this.getBoolAttr('open') }
    set 'open'(val) { this.setBoolAttr('open', val) }    static __style = `:host{position:100%}:host av-tutorial-sidenav{transition:left .4s var(--bezier-curve)}:host .hider{background-color:rgba(0,0,0,0);display:none;height:100%;left:0;position:absolute;top:0;width:100%;z-index:99}:host>.container{width:calc(100% - 300px);max-width:none}:host([visible]){display:flex}@media screen and (max-width: 1100px){:host>.container{width:100%}:host av-tutorial-sidenav{height:calc(100% - 50px);left:-300px;position:absolute;top:50px;z-index:100}:host([open]) av-tutorial-sidenav{left:0px}:host([open]) .hider{display:block}}`;
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
      "onPress": (e, pressInstance, c) => { c.comp.closeMenu(e, pressInstance); }
    }
  ]
}); }
    getClassName() {
        return "TutorialPage";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('open')) { this.attributeChangedCallback('open', false, false); } }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('open'); }
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
TutorialPage.Namespace=`${moduleName}`;
TutorialPage.Tag=`av-tutorial-page`;
_.TutorialPage=TutorialPage;
if(!window.customElements.get('av-tutorial-page')){window.customElements.define('av-tutorial-page', TutorialPage);Aventus.WebComponentInstance.registerDefinition(TutorialPage);}

const App = class App extends Aventus.Navigation.Router {
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
App.Namespace=`${moduleName}`;
App.Tag=`av-app`;
_.App=App;
if(!window.customElements.get('av-app')){window.customElements.define('av-app', App);Aventus.WebComponentInstance.registerDefinition(App);}


for(let key in _) { AventusWebsite[key] = _[key] }
})(AventusWebsite);
