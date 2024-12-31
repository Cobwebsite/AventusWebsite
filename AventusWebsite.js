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
var Aventus;
(Aventus||(Aventus = {}));
(function (Aventus) {
const moduleName = `Aventus`;
const _ = {};


let _n;
let DateConverter=class DateConverter {
    static __converter = new DateConverter();
    static get converter() {
        return this.__converter;
    }
    static set converter(value) {
        this.__converter = value;
    }
    isStringDate(txt) {
        return /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/.exec(txt) !== null;
    }
    fromString(txt) {
        return new Date(txt);
    }
    toString(date) {
        if (date.getFullYear() < 100) {
            return "0001-01-01T00:00:00.000Z";
        }
        return date.toISOString();
    }
}
DateConverter.Namespace=`Aventus`;
_.DateConverter=DateConverter;

let sleep=function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
_.sleep=sleep;

let ElementExtension=class ElementExtension {
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
                const elements = el.shadowRoot.elementsFromPoint(x, y);
                var newEl = elements.length > 0 ? elements[0] : null;
                if (newEl && newEl != el && (el.shadowRoot.contains(newEl) || el.contains(newEl))) {
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
    /**
     * Get active element from the define root
     */
    static getActiveElement(root = document) {
        if (!root)
            return null;
        let el = root.activeElement;
        while (el instanceof WebComponent) {
            let elTemp = el.shadowRoot?.activeElement;
            if (!elTemp)
                return el;
            el = elTemp;
        }
        return el;
    }
}
ElementExtension.Namespace=`Aventus`;
_.ElementExtension=ElementExtension;

let Instance=class Instance {
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
Instance.Namespace=`Aventus`;
_.Instance=Instance;

let Style=class Style {
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
    static getAsString(name) {
        return this.getInstance().getAsString(name);
    }
    static sheetToString(stylesheet) {
        return this.getInstance().sheetToString(stylesheet);
    }
    static load(name, url) {
        return this.getInstance().load(name, url);
    }
    static appendToHead(name) {
        if (!document.head.querySelector(`style[data-name="${name}"]`)) {
            const styleNode = document.createElement('style');
            styleNode.setAttribute(`data-name`, name);
            styleNode.innerHTML = Aventus.Style.getAsString(name);
            document.getElementsByTagName('head')[0].appendChild(styleNode);
        }
    }
    static refreshHead(name) {
        const styleNode = document.head.querySelector(`style[data-name="${name}"]`);
        if (styleNode) {
            styleNode.innerHTML = Aventus.Style.getAsString(name);
        }
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
            Style.refreshHead(name);
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
    getAsString(name) {
        return this.sheetToString(this.get(name));
    }
    sheetToString(stylesheet) {
        return stylesheet.cssRules
            ? Array.from(stylesheet.cssRules)
                .map(rule => rule.cssText || '')
                .join('\n')
            : '';
    }
}
Style.Namespace=`Aventus`;
_.Style=Style;

let setValueToObject=function setValueToObject(path, obj, value) {
    path = path.replace(/\[(.*?)\]/g, '.$1');
    const val = (key) => {
        if (obj instanceof Map) {
            return obj.get(key);
        }
        return obj[key];
    };
    let splitted = path.split(".");
    for (let i = 0; i < splitted.length - 1; i++) {
        let split = splitted[i];
        let value = val(split);
        if (!value) {
            obj[split] = {};
            value = obj[split];
        }
        obj = value;
    }
    if (obj instanceof Map) {
        obj.set(splitted[splitted.length - 1], value);
    }
    else {
        obj[splitted[splitted.length - 1]] = value;
    }
}
_.setValueToObject=setValueToObject;

let Callback=class Callback {
    callbacks = new Map();
    /**
     * Clear all callbacks
     */
    clear() {
        this.callbacks.clear();
    }
    /**
     * Add a callback
     */
    add(cb, scope = null) {
        if (!this.callbacks.has(cb)) {
            this.callbacks.set(cb, scope);
        }
    }
    /**
     * Remove a callback
     */
    remove(cb) {
        this.callbacks.delete(cb);
    }
    /**
     * Trigger all callbacks
     */
    trigger(args) {
        let result = [];
        let cbs = [...this.callbacks];
        for (let [cb, scope] of cbs) {
            result.push(cb.apply(scope, args));
        }
        return result;
    }
}
Callback.Namespace=`Aventus`;
_.Callback=Callback;

let Mutex=class Mutex {
    /**
     * Array to store functions waiting for the mutex to become available.
     * @type {((run: boolean) => void)[]}
     */
    waitingList = [];
    /**
    * Indicates whether the mutex is currently locked or not.
    * @type {boolean}
    */
    isLocked = false;
    /**
    * Waits for the mutex to become available and then acquires it.
    * @returns {Promise<boolean>} A Promise that resolves to true if the mutex was acquired successfully.
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
     * Releases the mutex, allowing only the last function in the waiting list to acquire it.
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
     * Clears the mutex, removing all waiting functions and releasing the lock.
     */
    dispose() {
        this.waitingList = [];
        this.isLocked = false;
    }
    /**
     * Executes a callback function safely within the mutex lock and releases the lock afterward.
     * @template T - The type of the return value of the callback function.
     * @param {() => T} cb - The callback function to execute.
     * @returns {Promise<T | null>} A Promise that resolves to the result of the callback function or null if an error occurs.
     */
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
    /**
     * Executes an asynchronous callback function safely within the mutex lock and releases the lock afterward.
     * @template T - The type of the return value of the asynchronous callback function.
     * @param {() => Promise<T>} cb - The asynchronous callback function to execute.
     * @returns {Promise<T | null>} A Promise that resolves to the result of the asynchronous callback function or null if an error occurs.
     */
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
    /**
     * Executes a callback function safely within the mutex lock, allowing only the last function in the waiting list to acquire the lock, and releases the lock afterward.
     * @template T - The type of the return value of the callback function.
     * @param {() => T} cb - The callback function to execute.
     * @returns {Promise<T | null>} A Promise that resolves to the result of the callback function or null if an error occurs.
     */
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
    /**
     * Executes an asynchronous callback function safely within the mutex lock, allowing only the last function in the waiting list to acquire the lock, and releases the lock afterward.
     * @template T - The type of the return value of the asynchronous callback function.
     * @param {() => Promise<T>} cb - The asynchronous callback function to execute.
     * @returns {Promise<T | undefined>} A Promise that resolves to the result of the asynchronous callback function or undefined if an error occurs.
     */
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
Mutex.Namespace=`Aventus`;
_.Mutex=Mutex;

let NormalizedEvent=class NormalizedEvent {
    _event;
    get event() {
        return this._event;
    }
    constructor(event) {
        this._event = event;
    }
    getProp(prop) {
        if (prop in this.event) {
            return this.event[prop];
        }
        return undefined;
    }
    stopImmediatePropagation() {
        this.event.stopImmediatePropagation();
    }
    get clientX() {
        if ('clientX' in this.event) {
            return this.event.clientX;
        }
        else if ('touches' in this.event && this.event.touches.length > 0) {
            return this.event.touches[0].clientX;
        }
        return 0;
    }
    get clientY() {
        if ('clientY' in this.event) {
            return this.event.clientY;
        }
        else if ('touches' in this.event && this.event.touches.length > 0) {
            return this.event.touches[0].clientY;
        }
        return 0;
    }
    get pageX() {
        if ('pageX' in this.event) {
            return this.event.pageX;
        }
        else if ('touches' in this.event && this.event.touches.length > 0) {
            return this.event.touches[0].pageX;
        }
        return 0;
    }
    get pageY() {
        if ('pageY' in this.event) {
            return this.event.pageY;
        }
        else if ('touches' in this.event && this.event.touches.length > 0) {
            return this.event.touches[0].pageY;
        }
        return 0;
    }
    get type() {
        return this.event.type;
    }
    get target() {
        return this.event.target;
    }
    get timeStamp() {
        return this.event.timeStamp;
    }
    get pointerType() {
        if ('TouchEvent' in window && this._event instanceof TouchEvent)
            return "touch";
        return this.getProp("pointerType");
    }
    get button() {
        return this.getProp("button");
    }
    get isTouch() {
        if ('TouchEvent' in window && this._event instanceof TouchEvent)
            return true;
        return this._event.pointerType == "touch";
    }
}
NormalizedEvent.Namespace=`Aventus`;
_.NormalizedEvent=NormalizedEvent;

let compareObject=function compareObject(obj1, obj2) {
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
    else if (typeof obj1 === 'object' && obj1 !== undefined && obj1 !== null) {
        if (typeof obj2 !== 'object' || obj2 === undefined || obj2 === null) {
            return false;
        }
        if (obj1 == obj2) {
            return true;
        }
        if (obj1 instanceof HTMLElement || obj2 instanceof HTMLElement) {
            return false;
        }
        if (obj1 instanceof Date || obj2 instanceof Date) {
            return obj1.toString() === obj2.toString();
        }
        let oneProxy = false;
        if (Watcher.is(obj1)) {
            oneProxy = true;
            obj1 = Watcher.extract(obj1, false);
        }
        if (Watcher.is(obj2)) {
            oneProxy = true;
            obj2 = Watcher.extract(obj2, false);
        }
        if (obj1 instanceof Map && obj2 instanceof Map) {
            if (obj1.size != obj2.size) {
                return false;
            }
            const keys = obj1.keys();
            for (let key in keys) {
                if (!obj2.has(key)) {
                    return false;
                }
                if (!compareObject(obj1.get(key), obj2.get(key))) {
                    return false;
                }
            }
            return true;
        }
        else {
            if (Object.keys(obj1).length !== Object.keys(obj2).length) {
                return false;
            }
            for (let key in obj1) {
                if (oneProxy && Watcher['__reservedName'][key]) {
                    continue;
                }
                if (!(key in obj2)) {
                    return false;
                }
                if (!compareObject(obj1[key], obj2[key])) {
                    return false;
                }
            }
            return true;
        }
    }
    else {
        return obj1 === obj2;
    }
}
_.compareObject=compareObject;

let getValueFromObject=function getValueFromObject(path, obj) {
    if (path === undefined) {
        path = '';
    }
    path = path.replace(/\[(.*?)\]/g, '.$1');
    if (path == "") {
        return obj;
    }
    const val = (key) => {
        if (obj instanceof Map) {
            return obj.get(key);
        }
        return obj[key];
    };
    let splitted = path.split(".");
    for (let i = 0; i < splitted.length - 1; i++) {
        let split = splitted[i];
        let value = val(split);
        if (!value || typeof value !== 'object') {
            return undefined;
        }
        obj = value;
    }
    if (!obj || typeof obj !== 'object') {
        return undefined;
    }
    return val(splitted[splitted.length - 1]);
}
_.getValueFromObject=getValueFromObject;

var WatchAction;
(function (WatchAction) {
    WatchAction[WatchAction["CREATED"] = 0] = "CREATED";
    WatchAction[WatchAction["UPDATED"] = 1] = "UPDATED";
    WatchAction[WatchAction["DELETED"] = 2] = "DELETED";
})(WatchAction || (WatchAction = {}));
_.WatchAction=WatchAction;

let Effect=class Effect {
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
            cb = (action, changePath, value, dones) => { this.onChange(action, changePath, value, dones); };
        }
        else {
            cb = (action, changePath, value, dones) => {
                let full = fullPath;
                if (changePath == path) {
                    this.onChange(action, changePath, value, dones);
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
    checkCanChange(action, changePath, value, dones) {
        if (this.isDestroy) {
            return false;
        }
        for (let fct of this.__allowChanged) {
            if (!fct(action, changePath, value, dones)) {
                return false;
            }
        }
        return true;
    }
    onChange(action, changePath, value, dones) {
        if (!this.checkCanChange(action, changePath, value, dones)) {
            return;
        }
        this.run();
        for (let fct of this.__subscribes) {
            fct(action, changePath, value, dones);
        }
    }
    destroy() {
        this.isDestroy = true;
        this.clearCallbacks();
        this.isInit = false;
    }
    clearCallbacks() {
        for (let pair of this.callbacks) {
            pair.receiver.unsubscribe(pair.cb);
        }
        this.callbacks = [];
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
Effect.Namespace=`Aventus`;
_.Effect=Effect;

let Watcher=class Watcher {
    constructor() { }
    ;
    static __reservedName = {
        __path: '__path',
    };
    static __triggerForced = false;
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
        const reservedName = this.__reservedName;
        const clearReservedNames = (data) => {
            if (data instanceof Object && !data.__isProxy) {
                for (let key in reservedName) {
                    delete data[key];
                }
            }
        };
        const setProxyPath = (newProxy, newPath) => {
            if (newProxy instanceof Object && newProxy.__isProxy) {
                newProxy.__path = newPath;
            }
        };
        const jsonReplacer = (key, value) => {
            if (reservedName[key])
                return undefined;
            return value;
        };
        const addAlias = (otherBaseData, name, cb) => {
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
        const deleteAlias = (otherBaseData, name) => {
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
        const replaceByAlias = (target, element, prop, receiver, apply, out = {}) => {
            let fullInternalPath = "";
            if (Array.isArray(receiver)) {
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
                    element.__validatePath();
                    let oldPath = element.__path ?? '';
                    let unbindElement = Watcher.extract(getValueFromObject(oldPath, root));
                    if (unbindElement === undefined) {
                        return element;
                    }
                    if (receiver == null) {
                        receiver = getValueFromObject(target.__path, realProxy);
                        if (internalAliases[fullInternalPath]) {
                            internalAliases[fullInternalPath].unbind();
                        }
                    }
                    if (apply) {
                        let result = Reflect.set(target, prop, unbindElement, receiver);
                    }
                    element.__addAlias(proxyData.baseData, oldPath, (type, target, receiver2, value, prop2, dones) => {
                        let triggerPath;
                        if (prop2.startsWith("[") || fullInternalPath == "" || prop2 == "") {
                            triggerPath = fullInternalPath + prop2;
                        }
                        else {
                            triggerPath = fullInternalPath + "." + prop2;
                        }
                        if (type == 'DELETED' && internalAliases[triggerPath]) {
                            internalAliases[triggerPath].unbind();
                        }
                        triggerPath = triggerPath.replace(/\[(.*?)\]/g, '.$1');
                        let splitted = triggerPath.split(".");
                        let newProp = splitted.pop();
                        let newReceiver = getValueFromObject(splitted.join("."), realProxy);
                        if (newReceiver.getTarget(false) == target)
                            trigger(type, target, newReceiver, value, newProp, dones);
                    });
                    internalAliases[fullInternalPath] = {
                        unbind: () => {
                            delete internalAliases[fullInternalPath];
                            element.__deleteAlias(proxyData.baseData, oldPath);
                            deleteAlias(root, fullInternalPath);
                        }
                    };
                    addAlias(root, fullInternalPath, (type, target, receiver2, value, prop2, dones) => {
                        const pathSave = element.__path;
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
                        if (newReceiver.getTarget(false) == target)
                            element.__trigger(type, target, newReceiver, value, newProp, dones);
                        element.__path = pathSave;
                    });
                    out.otherRoot = root;
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
            injectedDones: null,
            history: [{
                    object: JSON.parse(JSON.stringify(obj, jsonReplacer)),
                    trace: currentTrace,
                    action: 'init',
                    path: ''
                }],
            useHistory: false,
            getProxyObject(target, element, prop) {
                let newProxy;
                element = replaceByAlias(target, element, prop, null, true);
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
                else if (prop == "__validatePath") {
                    return () => {
                        if (this.baseData == target) {
                            target.__path = "";
                        }
                    };
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
                else if (prop == "getTarget") {
                    return (clear = true) => {
                        if (clear)
                            clearReservedNames(target);
                        return target;
                    };
                }
                else if (prop == "toJSON") {
                    if (target.toJSON) {
                        return target.toJSON;
                    }
                    if (Array.isArray(receiver)) {
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
                else if (prop == "__injectedDones") {
                    return (dones) => {
                        this.injectedDones = dones;
                    };
                }
                else if (prop == "__trigger") {
                    return trigger;
                }
                else if (prop == "__static_trigger") {
                    return (type) => {
                        Watcher.__triggerForced = true;
                        trigger(type, target, receiver, target, '');
                        Watcher.__triggerForced = false;
                    };
                }
                return undefined;
            },
            get(target, prop, receiver) {
                if (typeof prop == 'symbol') {
                    return Reflect.get(target, prop, receiver);
                }
                if (reservedName[prop]) {
                    return target[prop];
                }
                let customResult = this.tryCustomFunction(target, prop, receiver);
                if (customResult !== undefined) {
                    return customResult;
                }
                let element = target[prop];
                if (typeof (element) == 'function') {
                    if (Array.isArray(receiver)) {
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
                                    let index = target.length;
                                    let out = {};
                                    el = replaceByAlias(target, el, target.length + '', receiver, false, out);
                                    target.push(el);
                                    const dones = [];
                                    if (out.otherRoot) {
                                        dones.push(out.otherRoot);
                                    }
                                    trigger('CREATED', target, receiver, receiver[index], "[" + (index) + "]", dones);
                                    trigger('UPDATED', target, receiver, target.length, "length", dones);
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
                                    const extReceiver = Watcher.extract(receiver);
                                    for (let i = index; i < index + nbRemove; i++) {
                                        oldValues.push(extReceiver[i]);
                                    }
                                    let updateLength = nbRemove != insert.length;
                                    for (let i = 0; i < oldValues.length; i++) {
                                        target.splice((index + i), 1);
                                        trigger('DELETED', target, receiver, oldValues[i], "[" + index + "]");
                                    }
                                    for (let i = 0; i < insert.length; i++) {
                                        const out = {};
                                        let value = replaceByAlias(target, insert[i], (index + i) + '', receiver, false, out);
                                        const dones = out.otherRoot ? [out.otherRoot] : [];
                                        target.splice((index + i), 0, value);
                                        trigger('CREATED', target, receiver, receiver[(index + i)], "[" + (index + i) + "]", dones);
                                    }
                                    if (updateLength)
                                        trigger('UPDATED', target, receiver, target.length, "length");
                                    return target;
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
                    else if (target instanceof Map) {
                        let result;
                        if (prop == "set") {
                            if (target.__isProxy) {
                                result = (key, value) => {
                                    return target.set(key, value);
                                };
                            }
                            else {
                                result = (key, value) => {
                                    const out = {};
                                    let dones = [];
                                    key = Watcher.extract(key);
                                    value = replaceByAlias(target, value, key + '', receiver, false, out);
                                    if (out.otherRoot)
                                        dones.push(out.otherRoot);
                                    let result = target.set(key, value);
                                    trigger('CREATED', target, receiver, receiver.get(key), key + '', dones);
                                    trigger('UPDATED', target, receiver, target.size, "size", dones);
                                    return result;
                                };
                            }
                        }
                        else if (prop == "clear") {
                            if (target.__isProxy) {
                                result = () => {
                                    return target.clear();
                                };
                            }
                            else {
                                result = () => {
                                    let keys = target.keys();
                                    for (let key of keys) {
                                        let oldValue = receiver.get(key);
                                        target.delete(key);
                                        trigger('DELETED', target, receiver, oldValue, key);
                                        trigger('UPDATED', target, receiver, target.size, "size");
                                    }
                                };
                            }
                        }
                        else if (prop == "delete") {
                            if (target.__isProxy) {
                                result = (key) => {
                                    return target.delete(key);
                                };
                            }
                            else {
                                result = (key) => {
                                    key = Watcher.extract(key);
                                    let oldValue = receiver.get(key);
                                    let res = target.delete(key);
                                    trigger('DELETED', target, receiver, oldValue, key + '');
                                    trigger('UPDATED', target, receiver, target.size, "size");
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
                if (typeof prop == 'symbol') {
                    return Reflect.set(target, prop, value, receiver);
                }
                let oldValue = Reflect.get(target, prop, receiver);
                value = replaceByAlias(target, value, prop, receiver, true);
                if (value instanceof Signal) {
                    value = value.value;
                }
                let triggerChange = false;
                if (!reservedName[prop]) {
                    if (Array.isArray(receiver)) {
                        if (prop != "length") {
                            triggerChange = true;
                        }
                    }
                    else {
                        if (!compareObject(value, oldValue)) {
                            triggerChange = true;
                        }
                    }
                    if (Watcher.__triggerForced) {
                        triggerChange = true;
                    }
                }
                let result = Reflect.set(target, prop, value, receiver);
                if (triggerChange) {
                    let index = this.avoidUpdate.indexOf(prop);
                    if (index == -1) {
                        let dones = this.injectedDones ?? [];
                        this.injectedDones = null;
                        trigger('UPDATED', target, receiver, value, prop, dones);
                    }
                    else {
                        this.avoidUpdate.splice(index, 1);
                    }
                }
                return result;
            },
            deleteProperty(target, prop) {
                if (typeof prop == 'symbol') {
                    return Reflect.deleteProperty(target, prop);
                }
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
                    if (oldValue instanceof Effect || oldValue instanceof Signal) {
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
                if (typeof prop == 'symbol') {
                    return Reflect.defineProperty(target, prop, descriptor);
                }
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
                    let key = result[i];
                    if (typeof key == 'string') {
                        if (reservedName[key]) {
                            result.splice(i, 1);
                            i--;
                        }
                    }
                }
                return result;
            },
        };
        if (onDataChanged) {
            proxyData.callbacks[''] = [onDataChanged];
        }
        const trigger = (type, target, receiver, value, prop, dones = []) => {
            if (dones.includes(proxyData.baseData)) {
                return;
            }
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
                if (Array.isArray(receiver)) {
                    if (prop && !prop.startsWith("[")) {
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
                    if (prop && !prop.startsWith("[")) {
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
                        let regex2 = new RegExp("^" + rootPath.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + "(\\.|(\\[)|$)");
                        if (!regex2.test(name)) {
                            continue;
                        }
                        else {
                            pathToSend = "";
                        }
                    }
                    else {
                        pathToSend = rootPath.replace(regex, "$2");
                    }
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
                        cb(WatchAction[type], pathToSend, value, dones);
                    }
                    catch (e) {
                        if (e != 'impossible')
                            console.error(e);
                    }
                }
                for (let [key, infos] of aliases) {
                    if (!dones.includes(key)) {
                        for (let info of infos) {
                            if (info.name == name) {
                                aliasesDone.push(key);
                                if (target.__path) {
                                    let oldPath = target.__path;
                                    info.fct(type, target, receiver, value, prop, dones);
                                    target.__path = oldPath;
                                }
                                else {
                                    info.fct(type, target, receiver, value, prop, dones);
                                }
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
                        let newProp = rootPath.replace(info.name, "");
                        if (newProp.startsWith(".")) {
                            newProp = newProp.slice(1);
                        }
                        if (target.__path) {
                            let oldPath = target.__path;
                            info.fct(type, target, receiver, value, newProp, dones);
                            target.__path = oldPath;
                        }
                        else {
                            info.fct(type, target, receiver, value, newProp, dones);
                        }
                    }
                }
            }
        };
        var realProxy = new Proxy(obj, proxyData);
        proxyData.baseData = obj;
        setProxyPath(realProxy, '');
        return realProxy;
    }
    static is(obj) {
        return typeof obj == 'object' && obj.__isProxy;
    }
    static extract(obj, clearPath = false) {
        if (this.is(obj)) {
            return obj.getTarget(clearPath);
        }
        else {
            if (obj instanceof Object) {
                for (let key in this.__reservedName) {
                    delete obj[key];
                }
            }
        }
        return obj;
    }
    static trigger(type, target) {
        if (this.is(target)) {
            target.__static_trigger(type);
        }
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
    /**
     * Create a signal variable
     */
    static signal(item, onChange) {
        return new Signal(item, onChange);
    }
}
Watcher.Namespace=`Aventus`;
_.Watcher=Watcher;

let Signal=class Signal {
    __subscribes = [];
    _value;
    _onChange;
    get value() {
        Watcher._register?.register(this, "*", Watcher._register.version, "*");
        return this._value;
    }
    set value(item) {
        const oldValue = this._value;
        this._value = item;
        if (oldValue != item) {
            if (this._onChange) {
                this._onChange();
            }
            for (let fct of this.__subscribes) {
                fct(WatchAction.UPDATED, "*", item, []);
            }
        }
    }
    constructor(item, onChange) {
        this._value = item;
        this._onChange = onChange;
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
    destroy() {
        this.__subscribes = [];
    }
}
Signal.Namespace=`Aventus`;
_.Signal=Signal;

let Computed=class Computed extends Effect {
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
    onChange(action, changePath, value, dones) {
        if (!this.checkCanChange(action, changePath, value, dones)) {
            return;
        }
        let oldValue = this._value;
        this.computedValue();
        if (oldValue === this._value) {
            return;
        }
        for (let fct of this.__subscribes) {
            fct(action, changePath, value, dones);
        }
    }
}
Computed.Namespace=`Aventus`;
_.Computed=Computed;

let ComputedNoRecomputed=class ComputedNoRecomputed extends Computed {
    init() {
        this.isInit = true;
        Watcher._registering.push(this);
        this._value = this.fct();
        Watcher._registering.splice(Watcher._registering.length - 1, 1);
    }
    computedValue() {
        if (this.isInit)
            this._value = this.fct();
        else
            this.init();
    }
    run() { }
}
ComputedNoRecomputed.Namespace=`Aventus`;
_.ComputedNoRecomputed=ComputedNoRecomputed;

let PressManager=class PressManager {
    static globalConfig = {
        delayDblPress: 250,
        delayLongPress: 700,
        offsetDrag: 20
    };
    static setGlobalConfig(options) {
        this.globalConfig = options;
    }
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
    delayDblPress;
    delayLongPress;
    nbPress = 0;
    offsetDrag;
    state = {
        oneActionTriggered: null,
    };
    startPosition = { x: 0, y: 0 };
    customFcts = {};
    timeoutDblPress = 0;
    timeoutLongPress = 0;
    downEventSaved;
    useDblPress = false;
    stopPropagation = () => true;
    pointersRecord = {};
    functionsBinded = {
        downAction: (e) => { },
        upAction: (e) => { },
        moveAction: (e) => { },
        childPressStart: (e) => { },
        childPressEnd: (e) => { },
        childPressMove: (e) => { }
    };
    /**
     * @param {*} options - The options
     * @param {HTMLElement | HTMLElement[]} options.element - The element to manage
     */
    constructor(options) {
        if (options.element === void 0) {
            throw 'You must provide an element';
        }
        this.offsetDrag = PressManager.globalConfig.offsetDrag !== undefined ? PressManager.globalConfig.offsetDrag : 20;
        this.delayLongPress = PressManager.globalConfig.delayLongPress ?? 700;
        this.delayDblPress = PressManager.globalConfig.delayDblPress ?? 150;
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
        if (PressManager.globalConfig.delayDblPress !== undefined) {
            this.delayDblPress = PressManager.globalConfig.delayDblPress;
        }
        if (options.delayDblPress !== undefined) {
            this.delayDblPress = options.delayDblPress;
        }
        if (PressManager.globalConfig.delayLongPress !== undefined) {
            this.delayLongPress = PressManager.globalConfig.delayLongPress;
        }
        if (options.delayLongPress !== undefined) {
            this.delayLongPress = options.delayLongPress;
        }
        if (PressManager.globalConfig.offsetDrag !== undefined) {
            this.offsetDrag = PressManager.globalConfig.offsetDrag;
        }
        if (options.offsetDrag !== undefined) {
            this.offsetDrag = options.offsetDrag;
        }
        if (options.onDblPress !== undefined) {
            this.useDblPress = true;
        }
        if (PressManager.globalConfig.forceDblPress !== undefined) {
            this.useDblPress = PressManager.globalConfig.forceDblPress;
        }
        if (options.forceDblPress !== undefined) {
            this.useDblPress = options.forceDblPress;
        }
        if (typeof PressManager.globalConfig.stopPropagation == 'function') {
            this.stopPropagation = PressManager.globalConfig.stopPropagation;
        }
        else if (options.stopPropagation === false) {
            this.stopPropagation = () => false;
        }
        if (typeof options.stopPropagation == 'function') {
            this.stopPropagation = options.stopPropagation;
        }
        else if (options.stopPropagation === false) {
            this.stopPropagation = () => false;
        }
        if (!options.buttonAllowed)
            options.buttonAllowed = PressManager.globalConfig.buttonAllowed;
        if (!options.buttonAllowed)
            options.buttonAllowed = [0];
        if (!options.onEvent)
            options.onEvent = PressManager.globalConfig.onEvent;
    }
    bindAllFunction() {
        this.functionsBinded.downAction = this.downAction.bind(this);
        this.functionsBinded.moveAction = this.moveAction.bind(this);
        this.functionsBinded.upAction = this.upAction.bind(this);
        this.functionsBinded.childPressStart = this.childPressStart.bind(this);
        this.functionsBinded.childPressEnd = this.childPressEnd.bind(this);
        this.functionsBinded.childPressMove = this.childPressMove.bind(this);
    }
    init() {
        this.bindAllFunction();
        this.element.addEventListener("pointerdown", this.functionsBinded.downAction);
        this.element.addEventListener("touchstart", this.functionsBinded.downAction);
        this.element.addEventListener("trigger_pointer_pressstart", this.functionsBinded.childPressStart);
        this.element.addEventListener("trigger_pointer_pressend", this.functionsBinded.childPressEnd);
        this.element.addEventListener("trigger_pointer_pressmove", this.functionsBinded.childPressMove);
    }
    identifyEvent(touch) {
        if ('Touch' in window && touch instanceof Touch)
            return touch.identifier;
        return touch.pointerId;
    }
    registerEvent(ev) {
        if ('TouchEvent' in window && ev instanceof TouchEvent) {
            for (let touch of ev.targetTouches) {
                const id = this.identifyEvent(touch);
                if (this.pointersRecord[id]) {
                    return false;
                }
                this.pointersRecord[id] = ev;
            }
            return true;
        }
        else {
            const id = this.identifyEvent(ev);
            if (this.pointersRecord[id]) {
                return false;
            }
            this.pointersRecord[id] = ev;
            return true;
        }
    }
    unregisterEvent(ev) {
        let result = true;
        if ('TouchEvent' in window && ev instanceof TouchEvent) {
            for (let touch of ev.changedTouches) {
                const id = this.identifyEvent(touch);
                if (!this.pointersRecord[id]) {
                    result = false;
                }
                else {
                    delete this.pointersRecord[id];
                }
            }
        }
        else {
            const id = this.identifyEvent(ev);
            if (!this.pointersRecord[id]) {
                result = false;
            }
            else {
                delete this.pointersRecord[id];
            }
        }
        return result;
    }
    genericDownAction(state, e) {
        this.downEventSaved = e;
        if (this.options.onLongPress) {
            this.timeoutLongPress = setTimeout(() => {
                if (!state.oneActionTriggered) {
                    if (this.options.onLongPress) {
                        if (this.options.onLongPress(e, this) !== false) {
                            state.oneActionTriggered = this;
                        }
                    }
                }
            }, this.delayLongPress);
        }
    }
    downAction(ev) {
        const isFirst = Object.values(this.pointersRecord).length == 0;
        if (!this.registerEvent(ev)) {
            if (this.stopPropagation()) {
                ev.stopImmediatePropagation();
            }
            return;
        }
        const e = new NormalizedEvent(ev);
        if (this.options.onEvent) {
            this.options.onEvent(e);
        }
        if (e.button != undefined && !this.options.buttonAllowed?.includes(e.button)) {
            this.unregisterEvent(ev);
            return;
        }
        if (this.stopPropagation()) {
            e.stopImmediatePropagation();
        }
        this.customFcts = {};
        if (this.nbPress == 0 && isFirst) {
            this.state.oneActionTriggered = null;
            clearTimeout(this.timeoutDblPress);
        }
        this.startPosition = { x: e.pageX, y: e.pageY };
        if (isFirst) {
            document.addEventListener("pointerup", this.functionsBinded.upAction);
            document.addEventListener("pointercancel", this.functionsBinded.upAction);
            document.addEventListener("touchend", this.functionsBinded.upAction);
            document.addEventListener("touchcancel", this.functionsBinded.upAction);
            document.addEventListener("pointermove", this.functionsBinded.moveAction);
        }
        this.genericDownAction(this.state, e);
        if (this.options.onPressStart) {
            this.options.onPressStart(e, this);
            this.lastEmitEvent = e;
            // this.emitTriggerFunctionParent("pressstart", e);
        }
        this.emitTriggerFunction("pressstart", e);
    }
    genericUpAction(state, e) {
        clearTimeout(this.timeoutLongPress);
        if (state.oneActionTriggered == this) {
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
                    if (!state.oneActionTriggered) {
                        this.nbPress = 0;
                        if (this.options.onDblPress) {
                            if (this.options.onDblPress(e, this) !== false) {
                                state.oneActionTriggered = this;
                            }
                        }
                    }
                }
                else if (this.nbPress == 1) {
                    this.timeoutDblPress = setTimeout(() => {
                        this.nbPress = 0;
                        if (!state.oneActionTriggered) {
                            if (this.options.onPress) {
                                if (this.options.onPress(e, this) !== false) {
                                    state.oneActionTriggered = this;
                                }
                            }
                        }
                    }, this.delayDblPress);
                }
            }
            else {
                if (!state.oneActionTriggered) {
                    if (this.options.onPress) {
                        if (this.options.onPress(e, this) !== false) {
                            state.oneActionTriggered = this;
                        }
                    }
                }
            }
        }
    }
    upAction(ev) {
        if (!this.unregisterEvent(ev)) {
            if (this.stopPropagation()) {
                ev.stopImmediatePropagation();
            }
            return;
        }
        const e = new NormalizedEvent(ev);
        if (this.options.onEvent) {
            this.options.onEvent(e);
        }
        if (this.stopPropagation()) {
            e.stopImmediatePropagation();
        }
        if (Object.values(this.pointersRecord).length == 0) {
            document.removeEventListener("pointerup", this.functionsBinded.upAction);
            document.removeEventListener("pointercancel", this.functionsBinded.upAction);
            document.removeEventListener("touchend", this.functionsBinded.upAction);
            document.removeEventListener("touchcancel", this.functionsBinded.upAction);
            document.removeEventListener("pointermove", this.functionsBinded.moveAction);
        }
        this.genericUpAction(this.state, e);
        if (this.options.onPressEnd) {
            this.options.onPressEnd(e, this);
            this.lastEmitEvent = e;
            // this.emitTriggerFunctionParent("pressend", e);
        }
        this.emitTriggerFunction("pressend", e);
    }
    genericMoveAction(state, e) {
        if (!state.oneActionTriggered) {
            let xDist = e.pageX - this.startPosition.x;
            let yDist = e.pageY - this.startPosition.y;
            let distance = Math.sqrt(xDist * xDist + yDist * yDist);
            if (distance > this.offsetDrag && this.downEventSaved) {
                if (this.options.onDragStart) {
                    if (this.options.onDragStart(this.downEventSaved, this) !== false) {
                        state.oneActionTriggered = this;
                    }
                }
            }
        }
        else if (state.oneActionTriggered == this) {
            if (this.options.onDrag) {
                this.options.onDrag(e, this);
            }
            else if (this.customFcts.src && this.customFcts.onDrag) {
                this.customFcts.onDrag(e, this.customFcts.src);
            }
        }
    }
    moveAction(ev) {
        const e = new NormalizedEvent(ev);
        if (this.options.onEvent) {
            this.options.onEvent(e);
        }
        if (this.stopPropagation()) {
            e.stopImmediatePropagation();
        }
        this.genericMoveAction(this.state, e);
        this.lastEmitEvent = e;
        // if(this.options.onDrag) {
        //     this.emitTriggerFunctionParent("pressmove", e);
        this.emitTriggerFunction("pressmove", e);
    }
    childPressStart(e) {
        if (this.lastEmitEvent == e.detail.realEvent)
            return;
        this.genericDownAction(e.detail.state, e.detail.realEvent);
        if (this.options.onPressStart) {
            this.options.onPressStart(e.detail.realEvent, this);
        }
    }
    childPressEnd(e) {
        if (this.lastEmitEvent == e.detail.realEvent)
            return;
        this.genericUpAction(e.detail.state, e.detail.realEvent);
        if (this.options.onPressEnd) {
            this.options.onPressEnd(e.detail.realEvent, this);
        }
    }
    childPressMove(e) {
        if (this.lastEmitEvent == e.detail.realEvent)
            return;
        this.genericMoveAction(e.detail.state, e.detail.realEvent);
    }
    lastEmitEvent;
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
        this.lastEmitEvent = e;
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
            this.element.removeEventListener("trigger_pointer_pressstart", this.functionsBinded.childPressStart);
            this.element.removeEventListener("trigger_pointer_pressend", this.functionsBinded.childPressEnd);
            this.element.removeEventListener("trigger_pointer_pressmove", this.functionsBinded.childPressMove);
            document.removeEventListener("pointerup", this.functionsBinded.upAction);
            document.removeEventListener("pointercancel", this.functionsBinded.upAction);
            document.removeEventListener("pointermove", this.functionsBinded.moveAction);
        }
    }
}
PressManager.Namespace=`Aventus`;
_.PressManager=PressManager;

let Uri=class Uri {
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
        let matches = from.regex.exec(current.toLowerCase());
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
Uri.Namespace=`Aventus`;
_.Uri=Uri;

let State=class State {
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
State.Namespace=`Aventus`;
_.State=State;

let EmptyState=class EmptyState extends State {
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
EmptyState.Namespace=`Aventus`;
_.EmptyState=EmptyState;

let StateManager=class StateManager {
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
    subscribe(statePatterns, callbacks, autoActiveState = true) {
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
                    if (this.subscribers[statePattern].isActive && this.activeState && autoActiveState) {
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
     *
     */
    activateAfterSubscribe(statePatterns, callbacks) {
        if (!Array.isArray(statePatterns)) {
            statePatterns = [statePatterns];
        }
        for (let statePattern of statePatterns) {
            if (callbacks.active) {
                if (!Array.isArray(callbacks.active)) {
                    callbacks.active = [callbacks.active];
                }
                for (let activeFct of callbacks.active) {
                    if (this.subscribers[statePattern].isActive && this.activeState) {
                        let slugs = Uri.getParams(this.subscribers[statePattern], this.activeState.name);
                        if (slugs) {
                            activeFct(this.activeState, slugs);
                        }
                    }
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
                            let callbacks = [...subscriber.callbacks.inactive];
                            for (let callback of callbacks) {
                                callback(oldState, stateToUse, oldSlugNotNull);
                            }
                        }
                    }
                    for (let trigger of triggerActive) {
                        let callbacks = [...trigger.subscriber.callbacks.active];
                        for (let callback of callbacks) {
                            callback(stateToUse, trigger.params);
                        }
                    }
                    for (let trigger of inactiveToActive) {
                        trigger.subscriber.isActive = true;
                        let callbacks = [...trigger.subscriber.callbacks.active];
                        for (let callback of callbacks) {
                            callback(stateToUse, trigger.params);
                        }
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
                        let callbacks = [...this.subscribers[key].callbacks.active];
                        for (let callback of callbacks) {
                            callback(stateToUse, slugsNotNull);
                        }
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
StateManager.Namespace=`Aventus`;
_.StateManager=StateManager;

let TemplateContext=class TemplateContext {
    data = {};
    comp;
    computeds = [];
    watch;
    registry;
    isDestroyed = false;
    constructor(component, data = {}, parentContext, registry) {
        this.comp = component;
        this.registry = registry;
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
    registerLoop(dataName, _indexValue, _indexName, indexName, itemName, onThis) {
        this.watch[_indexName] = _indexValue;
        let getItems;
        let mustBeRecomputed = /if|switch|\?|\[.+?\]/g.test(dataName);
        let _class = mustBeRecomputed ? Computed : ComputedNoRecomputed;
        if (!onThis) {
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
            let element = items[index];
            if (element === undefined && (Array.isArray(items) || !items)) {
                if (this.registry) {
                    let indexNb = Number(_getIndex.value);
                    if (!isNaN(indexNb)) {
                        this.registry.templates[indexNb].destructor();
                        this.registry.templates.splice(indexNb, 1);
                        for (let i = indexNb; i < this.registry.templates.length; i++) {
                            this.registry.templates[i].context.decreaseIndex(_indexName);
                        }
                    }
                }
            }
            return element;
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
        this.isDestroyed = true;
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
    updateWatch(name, value, dones) {
        if (Watcher.is(this.watch[name])) {
            this.watch[name].__injectedDones(dones);
        }
        this.watch[name] = value;
    }
    normalizePath(path) {
        path = path.replace(/^this\./, '');
        const regex = /\[(.*?)\]/g;
        let m;
        while ((m = regex.exec(path)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            let name = m[1];
            let result = getValueFromObject(name, this.data);
            if (result !== undefined) {
                path = path.replace(m[0], `[${result}]`);
            }
        }
        return path;
    }
    getValueFromItem(name) {
        if (!name)
            return undefined;
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
TemplateContext.Namespace=`Aventus`;
_.TemplateContext=TemplateContext;

let TemplateInstance=class TemplateInstance {
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
    isDestroyed = false;
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
        this.isDestroyed = true;
        for (let name in this.loopRegisteries) {
            let register = this.loopRegisteries[name];
            for (let item of register.templates) {
                item.destructor();
            }
            for (let item of register.computeds) {
                item.destroy();
            }
            if (register.unsub) {
                register.unsub();
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
            try {
                return edit.fct(this.context);
            }
            catch (e) {
            }
            return {};
        });
        computed.subscribe((action, path, value, dones) => {
            for (let key in computed.value) {
                let newValue = computed.value[key];
                this.context.updateWatch(key, newValue, dones);
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
                    try {
                        return event.fct(this.context, args);
                    }
                    catch (e) {
                        console.error(e);
                    }
                });
            }
        }
        else {
            for (let el of this._components[event.id]) {
                el.addEventListener(event.eventName, (e) => {
                    try {
                        event.fct(e, this.context);
                    }
                    catch (e) {
                        console.error(e);
                    }
                });
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
            try {
                return change.fct(this.context);
            }
            catch (e) {
                if (e instanceof TypeError && e.message.includes("undefined")) {
                    if (computed instanceof ComputedNoRecomputed) {
                        computed.isInit = false;
                    }
                }
                else {
                    console.error(e);
                }
            }
            return "";
        });
        let timeout;
        computed.subscribe((action, path, value, dones) => {
            clearTimeout(timeout);
            // add timeout to group change that append on the same frame (for example index update)
            timeout = setTimeout(() => {
                if (computed.isDestroy)
                    return;
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
            try {
                return injection.inject(this.context);
            }
            catch (e) {
                if (e instanceof TypeError && e.message.includes("undefined")) {
                    if (computed instanceof ComputedNoRecomputed) {
                        computed.isInit = false;
                    }
                }
                else {
                    console.error(e);
                }
            }
        });
        this.computeds.push(computed);
        computed.subscribe((action, path, value, dones) => {
            for (const el of this._components[injection.id]) {
                if (el instanceof WebComponent && el.__watch && Object.hasOwn(el.__watch, injection.injectionName)) {
                    el.__watch.__injectedDones(dones);
                }
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
            try {
                return binding.inject(this.context);
            }
            catch (e) {
                if (e instanceof TypeError && e.message.includes("undefined")) {
                    if (computed instanceof ComputedNoRecomputed) {
                        computed.isInit = false;
                    }
                }
                else {
                    console.error(e);
                }
            }
        });
        this.computeds.push(computed);
        computed.subscribe((action, path, value, dones) => {
            if (isLocalChange)
                return;
            for (const el of this._components[binding.id]) {
                if (el instanceof WebComponent && el.__watch && Object.hasOwn(el.__watch, binding.injectionName)) {
                    el.__watch.__injectedDones(dones);
                }
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
    resetLoopComplex(anchorId) {
        if (this.loopRegisteries[anchorId]) {
            for (let item of this.loopRegisteries[anchorId].templates) {
                item.destructor();
            }
            for (let item of this.loopRegisteries[anchorId].computeds) {
                item.destroy();
            }
        }
        this.loopRegisteries[anchorId] = {
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
        this.resetLoopComplex(loop.anchorId);
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
            let context = new TemplateContext(this.component, result[i], this.context, this.loopRegisteries[loop.anchorId]);
            let content = loop.template.template?.content.cloneNode(true);
            document.adoptNode(content);
            customElements.upgrade(content);
            let actions = loop.template.actions;
            let instance = new TemplateInstance(this.component, content, actions, loop.template.loops, loop.template.ifs, context);
            instance.render();
            anchor.parentNode?.insertBefore(instance.content, anchor);
            this.loopRegisteries[loop.anchorId].templates.push(instance);
        }
    }
    resetLoopSimple(anchorId, basePath) {
        let register = this.loopRegisteries[anchorId];
        if (register?.unsub) {
            register.unsub();
        }
        this.resetLoopComplex(anchorId);
    }
    renderLoopSimple(loop, simple) {
        let onThis = simple.data.startsWith("this.");
        let basePath = this.context.normalizePath(simple.data);
        this.resetLoopSimple(loop.anchorId, basePath);
        let getElements = () => this.context.getValueFromItem(basePath);
        let elements = getElements();
        if (!elements) {
            let currentPath = basePath;
            while (currentPath != '' && !elements) {
                let splittedPath = currentPath.split(".");
                splittedPath.pop();
                currentPath = splittedPath.join(".");
                elements = this.context.getValueFromItem(currentPath);
            }
            if (!elements && onThis) {
                const splittedPath = basePath.split(".");
                const firstPart = splittedPath.length > 0 ? splittedPath[0] : null;
                if (firstPart && this.component.__signals[firstPart]) {
                    elements = this.component.__signals[firstPart];
                }
                else {
                    elements = this.component.__watch;
                }
            }
            if (!elements || !(elements.__isProxy || elements instanceof Signal)) {
                debugger;
            }
            const subTemp = (action, path, value) => {
                if (basePath.startsWith(path) || path == "*") {
                    elements.unsubscribe(subTemp);
                    this.renderLoopSimple(loop, simple);
                    return;
                }
            };
            elements.subscribe(subTemp);
            return;
        }
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
                        let context = new TemplateContext(this.component, {}, this.context, registry);
                        context.registerLoop(basePath, index, indexName, simple.index, simple.item, onThis);
                        let content = loop.template.template?.content.cloneNode(true);
                        document.adoptNode(content);
                        customElements.upgrade(content);
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
            this.loopRegisteries[loop.anchorId].unsub = () => {
                elements.unsubscribe(sub);
            };
            elements.subscribe(sub);
        }
        let anchor = this._components[loop.anchorId][0];
        for (let i = 0; i < keys.length; i++) {
            let context = new TemplateContext(this.component, {}, this.context, this.loopRegisteries[loop.anchorId]);
            context.registerLoop(basePath, i, indexName, simple.index, simple.item, onThis);
            let content = loop.template.template?.content.cloneNode(true);
            document.adoptNode(content);
            customElements.upgrade(content);
            let actions = loop.template.actions;
            let instance = new TemplateInstance(this.component, content, actions, loop.template.loops, loop.template.ifs, context);
            instance.render();
            anchor.parentNode?.insertBefore(instance.content, anchor);
            this.loopRegisteries[loop.anchorId].templates.push(instance);
        }
    }
    renderIf(_if) {
        // this.renderIfMemory(_if);
        this.renderIfRecreate(_if);
    }
    renderIfMemory(_if) {
        let computeds = [];
        let instances = [];
        if (!this._components[_if.anchorId] || this._components[_if.anchorId].length == 0)
            return;
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
            document.adoptNode(content);
            customElements.upgrade(content);
            let actions = part.template.actions;
            let instance = new TemplateInstance(this.component, content, actions, part.template.loops, part.template.ifs, context);
            instances.push(instance);
            instance.render();
        }
        calculateActive();
    }
    renderIfRecreate(_if) {
        let computeds = [];
        if (!this._components[_if.anchorId] || this._components[_if.anchorId].length == 0)
            return;
        let anchor = this._components[_if.anchorId][0];
        let currentActive = undefined;
        let currentActiveNb = -1;
        const createContext = () => {
            if (currentActiveNb < 0 || currentActiveNb > _if.parts.length - 1) {
                currentActive = undefined;
                return;
            }
            const part = _if.parts[currentActiveNb];
            let context = new TemplateContext(this.component, {}, this.context);
            let content = part.template.template?.content.cloneNode(true);
            document.adoptNode(content);
            customElements.upgrade(content);
            let actions = part.template.actions;
            let instance = new TemplateInstance(this.component, content, actions, part.template.loops, part.template.ifs, context);
            currentActive = instance;
            instance.render();
            anchor.parentNode?.insertBefore(currentActive.content, anchor);
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
        }
        const calculateActive = () => {
            let newActive = -1;
            for (let i = 0; i < _if.parts.length; i++) {
                if (computeds[i].value) {
                    newActive = i;
                    break;
                }
            }
            if (newActive == currentActiveNb) {
                return;
            }
            if (currentActive) {
                currentActive.destructor();
            }
            currentActiveNb = newActive;
            createContext();
        };
        calculateActive();
    }
}
TemplateInstance.Namespace=`Aventus`;
_.TemplateInstance=TemplateInstance;

let Template=class Template {
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
        document.adoptNode(content);
        customElements.upgrade(content);
        return new TemplateInstance(component, content, this.actions, this.loops, this.ifs);
    }
}
Template.Namespace=`Aventus`;
_.Template=Template;

let WebComponent=class WebComponent extends HTMLElement {
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
    __signalActions = {};
    __signals = {};
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
        this.__registerSignalsActions();
        this.__createStates();
        this.__subscribeState();
        if (this.constructor == WebComponent) {
            throw "can't instanciate an abstract class";
        }
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
        for (let name in this.__signals) {
            this.__signals[name].destroy();
        }
        // TODO add missing info for destructor();
        this.postDestruction();
        this.destructChildren();
    }
    destructChildren() {
        const recu = (el) => {
            for (let child of Array.from(el.children)) {
                if (child instanceof WebComponent) {
                    child.destructor();
                }
                else if (child instanceof HTMLElement) {
                    recu(child);
                }
            }
            if (el.shadowRoot) {
                for (let child of Array.from(el.shadowRoot.children)) {
                    if (child instanceof WebComponent) {
                        child.destructor();
                    }
                    else if (child instanceof HTMLElement) {
                        recu(child);
                    }
                }
            }
        };
        recu(this);
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
                    try {
                        let action = this.__watchActionsCb[path.split(".")[0]] || this.__watchActionsCb[path.split("[")[0]];
                        action(type, path, element);
                    }
                    catch (e) {
                        console.error(e);
                    }
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
    __addSignalActions(name, fct) {
        this.__signalActions[name] = () => {
            fct(this);
        };
    }
    __registerSignalsActions() {
        if (Object.keys(this.__signals).length > 0) {
            const defaultValues = {};
            for (let name in this.__signals) {
                this.__registerSignalsAction(name);
                this.__defaultValuesSignal(defaultValues);
            }
            for (let name in defaultValues) {
                this.__signals[name].value = defaultValues[name];
            }
        }
    }
    __registerSignalsAction(name) {
        this.__signals[name] = new Signal(undefined, () => {
            if (this.__signalActions[name]) {
                this.__signalActions[name]();
            }
        });
    }
    __defaultValuesSignal(s) { }
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
        // customElements.upgrade(shadowRoot);
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
            this.__activateState();
            this.__templateInstance?.render();
            this.__removeNoAnimations();
        }
        else {
            setTimeout(() => {
                this.postConnect();
            });
        }
    }
    disconnectedCallback() {
        setTimeout(() => {
            this.postDisonnect();
        });
    }
    __onReadyCb = [];
    onReady(cb) {
        if (this._isReady) {
            cb();
        }
        else {
            this.__onReadyCb.push(cb);
        }
    }
    __setReady() {
        this._isReady = true;
        this.dispatchEvent(new CustomEvent('postCreationDone'));
        let cbs = [...this.__onReadyCb];
        for (let cb of cbs) {
            cb();
        }
        this.__onReadyCb = [];
    }
    __removeNoAnimations() {
        if (document.readyState !== "loading") {
            setTimeout(() => {
                this.postCreation();
                this.__setReady();
                this.shadowRoot.adoptedStyleSheets = Object.values(this.__getStatic().__styleSheets);
                document.removeEventListener("DOMContentLoaded", this.__removeNoAnimations);
                this.postConnect();
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
                delete this[prop];
                this[prop] = false;
            }
        }
        else {
            if (this.hasAttribute(prop)) {
                let value = this.getAttribute(prop);
                delete this[prop];
                this[prop] = value;
            }
            else if (Object.hasOwn(this, prop)) {
                const value = this[prop];
                delete this[prop];
                this[prop] = value;
            }
        }
    }
    __correctGetter(prop) {
        if (Object.hasOwn(this, prop)) {
            const value = this[prop];
            delete this[prop];
            this[prop] = value;
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
                    managerClass.subscribe(route, el, false);
                }
            }
        }
    }
    __activateState() {
        for (let route in this.__statesList) {
            for (const managerClass of this.__statesList[route].keys()) {
                let el = this.__statesList[route].get(managerClass);
                if (el) {
                    managerClass.activateAfterSubscribe(route, el);
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
        if (typeof d == 'string') {
            d = this.stringToDate(d);
        }
        if (d instanceof Date) {
            return new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
        }
        return null;
    }
    dateTimeToString(dt) {
        if (typeof dt == 'string') {
            dt = this.stringToDate(dt);
        }
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
        return this.getAttribute(name)?.replace(/&avquot;/g, '"') ?? undefined;
    }
    setStringAttr(name, val) {
        if (val === undefined || val === null) {
            this.removeAttribute(name);
        }
        else {
            this.setAttribute(name, (val + "").replace(/"/g, '&avquot;'));
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
    /**
     * Remove a component from the dom
     * If desctruct is set to true, the component will be fully destroyed
     */
    remove(destruct = true) {
        super.remove();
        if (destruct) {
            this.destructor();
        }
    }
    /**
     * Function triggered when the component is destroyed
     */
    postDestruction() { }
    /**
     * Function triggered the first time the component is rendering inside DOM
     */
    postCreation() { }
    /**
    * Function triggered each time the component is rendering inside DOM
    */
    postConnect() { }
    /**
    * Function triggered each time the component is removed from the DOM
    */
    postDisonnect() { }
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
    /**
     * Get active element from the shadowroot or the document
     */
    getActiveElement(document) {
        return ElementExtension.getActiveElement(document ?? this.shadowRoot);
    }
}
WebComponent.Namespace=`Aventus`;
_.WebComponent=WebComponent;

let WebComponentInstance=class WebComponentInstance {
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
        if (current && current.prototype instanceof WebComponent) {
            return new current();
        }
        return null;
    }
}
WebComponentInstance.Namespace=`Aventus`;
_.WebComponentInstance=WebComponentInstance;

let ResourceLoader=class ResourceLoader {
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
ResourceLoader.Namespace=`Aventus`;
_.ResourceLoader=ResourceLoader;

let ResizeObserver=class ResizeObserver {
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
ResizeObserver.Namespace=`Aventus`;
_.ResizeObserver=ResizeObserver;

let Animation=class Animation {
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
Animation.Namespace=`Aventus`;
_.Animation=Animation;

let DragAndDrop=class DragAndDrop {
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
                transform: () => { },
                delete: (el) => {
                    el.remove();
                }
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
            if (options.shadow.delete !== void 0) {
                this.options.shadow.delete = options.shadow.delete;
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
            return false;
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
        return this.options.onStart(e);
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
            this.options.shadow.delete(draggableElement);
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
        let srcTargets;
        if (typeof this.options.targets == "function") {
            srcTargets = this.options.targets();
        }
        else {
            srcTargets = this.options.targets;
        }
        for (let target of srcTargets) {
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
     * Set targets where to drop
     */
    setTargetsFct(targets) {
        this.options.targets = targets;
    }
    /**
     * Destroy the current drag&drop instance
     */
    destroy() {
        this.pressManager.destroy();
    }
}
DragAndDrop.Namespace=`Aventus`;
_.DragAndDrop=DragAndDrop;

let Json=class Json {
    /**
     * Converts a JavaScript class instance to a JSON object.
     * @template T - The type of the object to convert.
     * @param {T} obj - The object to convert to JSON.
     * @param {JsonToOptions} [options] - Options for JSON conversion.
     * @returns {{ [key: string | number]: any; }} Returns the JSON representation of the object.
     */
    static classToJson(obj, options) {
        const realOptions = {
            isValidKey: options?.isValidKey ?? (() => true),
            replaceKey: options?.replaceKey ?? ((key) => key),
            transformValue: options?.transformValue ?? ((key, value) => value),
            beforeEnd: options?.beforeEnd ?? ((res) => res)
        };
        return this.__classToJson(obj, realOptions);
    }
    static __classToJson(obj, options) {
        let result = {};
        let descriptors = Object.getOwnPropertyDescriptors(obj);
        for (let key in descriptors) {
            if (options.isValidKey(key))
                result[options.replaceKey(key)] = options.transformValue(key, descriptors[key].value);
        }
        let cst = obj.constructor;
        while (cst.prototype && cst != Object.prototype) {
            let descriptorsClass = Object.getOwnPropertyDescriptors(cst.prototype);
            for (let key in descriptorsClass) {
                if (options.isValidKey(key)) {
                    let descriptor = descriptorsClass[key];
                    if (descriptor?.get) {
                        result[options.replaceKey(key)] = options.transformValue(key, obj[key]);
                    }
                }
            }
            cst = Object.getPrototypeOf(cst);
        }
        result = options.beforeEnd(result);
        return result;
    }
    /**
    * Converts a JSON object to a JavaScript class instance.
    * @template T - The type of the object to convert.
    * @param {T} obj - The object to populate with JSON data.
    * @param {*} data - The JSON data to populate the object with.
    * @param {JsonFromOptions} [options] - Options for JSON deserialization.
    * @returns {T} Returns the populated object.
    */
    static classFromJson(obj, data, options) {
        let realOptions = {
            transformValue: options?.transformValue ?? ((key, value) => value),
            replaceUndefined: options?.replaceUndefined ?? false,
            replaceUndefinedWithKey: options?.replaceUndefinedWithKey ?? false,
        };
        return this.__classFromJson(obj, data, realOptions);
    }
    static __classFromJson(obj, data, options) {
        let props = Object.getOwnPropertyNames(obj);
        for (let prop of props) {
            let propUpperFirst = prop[0].toUpperCase() + prop.slice(1);
            let value = data[prop] === undefined ? data[propUpperFirst] : data[prop];
            if (value !== undefined || options.replaceUndefined || (options.replaceUndefinedWithKey && (Object.hasOwn(data, prop) || Object.hasOwn(data, propUpperFirst)))) {
                let propInfo = Object.getOwnPropertyDescriptor(obj, prop);
                if (propInfo?.writable) {
                    obj[prop] = options.transformValue(prop, value);
                }
            }
        }
        let cstTemp = obj.constructor;
        while (cstTemp.prototype && cstTemp != Object.prototype) {
            props = Object.getOwnPropertyNames(cstTemp.prototype);
            for (let prop of props) {
                let propUpperFirst = prop[0].toUpperCase() + prop.slice(1);
                let value = data[prop] === undefined ? data[propUpperFirst] : data[prop];
                if (value !== undefined || options.replaceUndefined || (options.replaceUndefinedWithKey && (Object.hasOwn(data, prop) || Object.hasOwn(data, propUpperFirst)))) {
                    let propInfo = Object.getOwnPropertyDescriptor(cstTemp.prototype, prop);
                    if (propInfo?.set) {
                        obj[prop] = options.transformValue(prop, value);
                    }
                }
            }
            cstTemp = Object.getPrototypeOf(cstTemp);
        }
        return obj;
    }
}
Json.Namespace=`Aventus`;
_.Json=Json;

let ConverterTransform=class ConverterTransform {
    transform(data) {
        return this.transformLoop(data);
    }
    createInstance(data) {
        if (data.$type) {
            let cst = Converter.info.get(data.$type);
            if (cst) {
                return new cst();
            }
        }
        return undefined;
    }
    beforeTransformObject(obj) {
    }
    afterTransformObject(obj) {
    }
    transformLoop(data) {
        if (data === null) {
            return data;
        }
        if (Array.isArray(data)) {
            let result = [];
            for (let element of data) {
                result.push(this.transformLoop(element));
            }
            return result;
        }
        if (data instanceof Date) {
            return data;
        }
        if (typeof data === 'object' && !/^\s*class\s+/.test(data.toString())) {
            let objTemp = this.createInstance(data);
            if (objTemp) {
                if (objTemp instanceof Map) {
                    if (data.values) {
                        for (const keyValue of data.values) {
                            objTemp.set(this.transformLoop(keyValue[0]), this.transformLoop(keyValue[1]));
                        }
                    }
                    return objTemp;
                }
                let obj = objTemp;
                this.beforeTransformObject(obj);
                if (obj.fromJSON) {
                    obj = obj.fromJSON(data);
                }
                else {
                    obj = Json.classFromJson(obj, data, {
                        transformValue: (key, value) => {
                            if (obj[key] instanceof Date) {
                                return value ? new Date(value) : null;
                            }
                            else if (typeof value == 'string' && DateConverter.converter.isStringDate(value)) {
                                return value ? DateConverter.converter.fromString(value) : null;
                            }
                            else if (obj[key] instanceof Map) {
                                let map = new Map();
                                for (const keyValue of value) {
                                    map.set(this.transformLoop(keyValue[0]), this.transformLoop(keyValue[1]));
                                }
                                return map;
                            }
                            else if (obj instanceof Data) {
                                let cst = obj.constructor;
                                if (cst.$schema[key] == 'boolean') {
                                    return value ? true : false;
                                }
                                else if (cst.$schema[key] == 'number') {
                                    return isNaN(Number(value)) ? 0 : Number(value);
                                }
                                else if (cst.$schema[key] == 'number') {
                                    return isNaN(Number(value)) ? 0 : Number(value);
                                }
                                else if (cst.$schema[key] == 'Date') {
                                    return value ? new Date(value) : null;
                                }
                            }
                            return this.transformLoop(value);
                        }
                    });
                }
                this.afterTransformObject(obj);
                return obj;
            }
            let result = {};
            for (let key in data) {
                result[key] = this.transformLoop(data[key]);
            }
            return result;
        }
        if (typeof data == 'string' && /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/.exec(data)) {
            return new Date(data);
        }
        return data;
    }
    copyValuesClass(target, src, options) {
        const realOptions = {
            isValidKey: options?.isValidKey ?? (() => true),
            replaceKey: options?.replaceKey ?? ((key) => key),
            transformValue: options?.transformValue ?? ((key, value) => value),
        };
        this.__classCopyValues(target, src, realOptions);
    }
    __classCopyValues(target, src, options) {
        let props = Object.getOwnPropertyNames(target);
        for (let prop of props) {
            let propInfo = Object.getOwnPropertyDescriptor(target, prop);
            if (propInfo?.writable) {
                if (options.isValidKey(prop))
                    target[options.replaceKey(prop)] = options.transformValue(prop, src[prop]);
            }
        }
        let cstTemp = target.constructor;
        while (cstTemp.prototype && cstTemp != Object.prototype) {
            props = Object.getOwnPropertyNames(cstTemp.prototype);
            for (let prop of props) {
                let propInfo = Object.getOwnPropertyDescriptor(cstTemp.prototype, prop);
                if (propInfo?.set && propInfo.get) {
                    if (options.isValidKey(prop))
                        target[options.replaceKey(prop)] = options.transformValue(prop, src[prop]);
                }
            }
            cstTemp = Object.getPrototypeOf(cstTemp);
        }
    }
}
ConverterTransform.Namespace=`Aventus`;
_.ConverterTransform=ConverterTransform;

let Converter=class Converter {
    /**
    * Map storing information about registered types.
    */
    static info = new Map([["Aventus.Map", Map]]);
    /**
    * Map storing schemas for registered types.
    */
    static schema = new Map();
    /**
     * Internal converter instance.
     */
    static __converter = new ConverterTransform();
    /**
     * Getter for the internal converter instance.
     */
    static get converterTransform() {
        return this.__converter;
    }
    /**
    * Sets the converter instance.
    * @param converter The converter instance to set.
    */
    static setConverter(converter) {
        this.__converter = converter;
    }
    /**
    * Registers a unique string type for any class.
    * @param $type The unique string type identifier.
    * @param cst The constructor function for the class.
    * @param schema Optional schema for the registered type.
    */
    static register($type, cst, schema) {
        this.info.set($type, cst);
        if (schema) {
            this.schema.set($type, schema);
        }
    }
    /**
     * Transforms the provided data using the current converter instance.
     * @template T
     * @param {*} data The data to transform.
     * @param {IConverterTransform} [converter] Optional converter instance to use for transformation.
     * @returns {T} Returns the transformed data.
     */
    static transform(data, converter) {
        if (!converter) {
            converter = this.converterTransform;
        }
        return converter.transform(data);
    }
    /**
     * Copies values from one class instance to another using the current converter instance.
     * @template T
     * @param {T} to The destination class instance to copy values into.
     * @param {T} from The source class instance to copy values from.
     * @param {ClassCopyOptions} [options] Optional options for the copy operation.
     * @param {IConverterTransform} [converter] Optional converter instance to use for the copy operation.
     * @returns {T} Returns the destination class instance with copied values.
     */
    static copyValuesClass(to, from, options, converter) {
        if (!converter) {
            converter = this.converterTransform;
        }
        return converter.copyValuesClass(to, from, options);
    }
}
Converter.Namespace=`Aventus`;
_.Converter=Converter;

let Data=class Data {
    /**
     * The schema for the class
     */
    static $schema;
    /**
     * The current namespace
     */
    static Namespace = "";
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
     * Get the unique type for the data. Define it as the namespace + class name
     */
    get $type() {
        return this.constructor['Fullname'];
    }
    /**
     * Get the name of the class
     */
    get className() {
        return this.constructor.name;
    }
    /**
     * Get a JSON for the current object
     */
    toJSON() {
        let toAvoid = ['className', 'namespace'];
        return Json.classToJson(this, {
            isValidKey: (key) => !toAvoid.includes(key)
        });
    }
    /**
     * Clone the object by transforming a parsed JSON string back into the original type
     */
    clone() {
        return Converter.transform(JSON.parse(JSON.stringify(this)));
    }
}
Data.Namespace=`Aventus`;
_.Data=Data;


for(let key in _) { Aventus[key] = _[key] }
})(Aventus);

var MaterialIcon;
(MaterialIcon||(MaterialIcon = {}));
(function (MaterialIcon) {
const moduleName = `MaterialIcon`;
const _ = {};


let _n;
const Icon = class Icon extends Aventus.WebComponent {
    static get observedAttributes() {return ["icon", "type"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'is_hidden'() { return this.getBoolAttr('is_hidden') }
    set 'is_hidden'(val) { this.setBoolAttr('is_hidden', val) }
    set 'icon'(val) { this.setStringAttr('icon', val) }
    set 'type'(val) { this.setStringAttr('type', val) }
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("icon", ((target) => {
    if (target.isReady) {
        target.init();
    }
}));
    if (target.isReady)
        target.loadFont();
}));
    static __style = `:host{--_material-icon-animation-duration: var(--material-icon-animation-duration, 1.75s)}:host{direction:ltr;display:inline-block;font-family:"Material Symbols Outlined";-moz-font-feature-settings:"liga";font-size:24px;-moz-osx-font-smoothing:grayscale;font-style:normal;font-weight:normal;letter-spacing:normal;line-height:1;text-transform:none;white-space:nowrap;word-wrap:normal}:host .icon{direction:inherit;display:inline-block;font-family:inherit;-moz-font-feature-settings:inherit;font-size:inherit;-moz-osx-font-smoothing:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;line-height:inherit;text-transform:inherit;white-space:inherit;word-wrap:inherit}:host([is_hidden]){opacity:0}:host([type=sharp]){font-family:"Material Symbols Sharp"}:host([type=rounded]){font-family:"Material Symbols Rounded"}:host([type=outlined]){font-family:"Material Symbols Outlined"}:host([spin]){animation:spin var(--_material-icon-animation-duration) linear infinite}:host([reverse_spin]){animation:reverse-spin var(--_material-icon-animation-duration) linear infinite}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes reverse-spin{0%{transform:rotate(360deg)}100%{transform:rotate(0deg)}}`;
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
        blocks: { 'default':`<div class="icon" _id="icon_0"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "elements": [
    {
      "name": "iconEl",
      "ids": [
        "icon_0"
      ]
    }
  ]
});
    getClassName() {
        return "Icon";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('is_hidden')) {this.setAttribute('is_hidden' ,'true'); }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('is_hidden');
    __listBoolProps() { return ["is_hidden"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    async loadFont() {
        if (!this.type)
            return;
        const name = this.type.charAt(0).toUpperCase() + this.type.slice(1);
        let fontsName = [
            'Material Symbols ' + name,
            '"Material Symbols ' + name + '"',
        ];
        const check = () => {
            for (let font of document.fonts) {
                if (fontsName.includes(font.family)) {
                    this.is_hidden = false;
                    return true;
                }
            }
            return false;
        };
        if (check()) {
            return;
        }
        const cb = (e) => {
            check();
            document.fonts.removeEventListener("loadingdone", cb);
        };
        document.fonts.addEventListener("loadingdone", cb);
        let url = 'https://fonts.googleapis.com/icon?family=Material+Symbols+' + name;
        await Aventus.ResourceLoader.loadInHead({
            type: "css",
            url: url
        });
        setTimeout(() => {
            check();
        }, 100);
    }
    async init() {
        await this.loadFont();
        this.iconEl.innerHTML = this.icon;
    }
    postCreation() {
        this.init();
    }
}
Icon.Namespace=`MaterialIcon`;
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

let Layout = {};
_.Layout = Aventus.Layout ?? {};
let Navigation = {};
_.Navigation = Aventus.Navigation ?? {};
let _n;
const Img = class Img extends Aventus.WebComponent {
    static get observedAttributes() {return ["src", "mode"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'cache'() { return this.getBoolAttr('cache') }
    set 'cache'(val) { this.setBoolAttr('cache', val) }
    set 'src'(val) { this.setStringAttr('src', val) }
    set 'mode'(val) { this.setStringAttr('mode', val) }
    maxCalculateSize = 10;
    ratio = 1;
    resizeObserver;
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("src", ((target) => {
    target.onSrcChanged();
}));
    if (target.src != "") {
        target.calculateSize();
    }
}));
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
    __registerTemplateAction() { super.__registerTemplateAction();
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
});
    getClassName() {
        return "Img";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('cache')) { this.attributeChangedCallback('cache', false, false); }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('cache');
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
Img.Namespace=`Aventus`;
Img.Tag=`av-img`;
_.Img=Img;
if(!window.customElements.get('av-img')){window.customElements.define('av-img', Img);Aventus.WebComponentInstance.registerDefinition(Img);}

Layout.DynamicCol = class DynamicCol extends Aventus.WebComponent {
    get 'size'() { return this.getNumberAttr('size') }
    set 'size'(val) { this.setNumberAttr('size', val) }
    set 'size_xs'(val) { this.setNumberAttr('size_xs', val) }
    set 'size_sm'(val) { this.setNumberAttr('size_sm', val) }
    set 'size_md'(val) { this.setNumberAttr('size_md', val) }
    set 'size_lg'(val) { this.setNumberAttr('size_lg', val) }
    set 'size_xl'(val) { this.setNumberAttr('size_xl', val) }
    set 'offset'(val) { this.setNumberAttr('offset', val) }
    set 'offset_xs'(val) { this.setNumberAttr('offset_xs', val) }
    set 'offset_sm'(val) { this.setNumberAttr('offset_sm', val) }
    set 'offset_md'(val) { this.setNumberAttr('offset_md', val) }
    set 'offset_lg'(val) { this.setNumberAttr('offset_lg', val) }
    set 'offset_xl'(val) { this.setNumberAttr('offset_xl', val) }
    set 'offset_right'(val) { this.setNumberAttr('offset_right', val) }
    set 'offset_right_xs'(val) { this.setNumberAttr('offset_right_xs', val) }
    set 'offset_right_sm'(val) { this.setNumberAttr('offset_right_sm', val) }
    set 'offset_right_md'(val) { this.setNumberAttr('offset_right_md', val) }
    set 'offset_right_lg'(val) { this.setNumberAttr('offset_right_lg', val) }
    set 'offset_right_xl'(val) { this.setNumberAttr('offset_right_xl', val) }
    set 'nobreak'(val) { this.setBoolAttr('nobreak', val) }
    set 'center'(val) { this.setBoolAttr('center', val) }
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
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('size')){ this['size'] = undefined; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('size');
    __listBoolProps() { return ["nobreak","center"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
}
Layout.DynamicCol.Namespace=`Aventus.Layout`;
Layout.DynamicCol.Tag=`av-dynamic-col`;
_.Layout.DynamicCol=Layout.DynamicCol;
if(!window.customElements.get('av-dynamic-col')){window.customElements.define('av-dynamic-col', Layout.DynamicCol);Aventus.WebComponentInstance.registerDefinition(Layout.DynamicCol);}

Layout.DynamicRow = class DynamicRow extends Aventus.WebComponent {
    get 'max_width'() { return this.getStringAttr('max_width') }
    set 'max_width'(val) { this.setStringAttr('max_width', val) }
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
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('max_width')){ this['max_width'] = undefined; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('max_width');
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
Layout.DynamicRow.Namespace=`Aventus.Layout`;
Layout.DynamicRow.Tag=`av-dynamic-row`;
_.Layout.DynamicRow=Layout.DynamicRow;
if(!window.customElements.get('av-dynamic-row')){window.customElements.define('av-dynamic-row', Layout.DynamicRow);Aventus.WebComponentInstance.registerDefinition(Layout.DynamicRow);}

let Tracker=class Tracker {
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
Tracker.Namespace=`Aventus`;
_.Tracker=Tracker;

let RouterStateManager=class RouterStateManager extends Aventus.StateManager {
    static getInstance() {
        return Aventus.Instance.get(RouterStateManager);
    }
}
RouterStateManager.Namespace=`Aventus`;
_.RouterStateManager=RouterStateManager;

Navigation.RouterLink = class RouterLink extends Aventus.WebComponent {
    get 'state'() { return this.getStringAttr('state') }
    set 'state'(val) { this.setStringAttr('state', val) }
    set 'active_state'(val) { this.setStringAttr('active_state', val) }
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
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('state')){ this['state'] = undefined; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('state');
    addClickEvent() {
        new Aventus.PressManager({
            element: this,
            onPress: () => {
                if (this.state === undefined)
                    return;
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
        if (activeState === undefined)
            return;
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
Navigation.RouterLink.Namespace=`Aventus.Navigation`;
Navigation.RouterLink.Tag=`av-router-link`;
_.Navigation.RouterLink=Navigation.RouterLink;
if(!window.customElements.get('av-router-link')){window.customElements.define('av-router-link', Navigation.RouterLink);Aventus.WebComponentInstance.registerDefinition(Navigation.RouterLink);}

Navigation.Page = class Page extends Aventus.WebComponent {
    static get observedAttributes() {return ["visible"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'visible'() { return this.getBoolProp('visible') }
    set 'visible'(val) { this.setBoolAttr('visible', val) }
    currentState;
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("visible", ((target) => {
    if (target.visible) {
        target.onShow();
    }
    else {
        target.onHide();
    }
}));
    static __style = `:host{display:none}:host([visible]){display:block}`;
    constructor() { super(); 
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
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('visible')) { this.attributeChangedCallback('visible', false, false); }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('visible');
    __listBoolProps() { return ["visible"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    pageTitle() {
        return undefined;
    }
    pageDescription() {
        return undefined;
    }
    pageKeywords() {
        return undefined;
    }
    async show(state) {
        this.currentState = state;
        this.visible = true;
    }
    async hide() {
        this.visible = false;
        this.currentState = undefined;
    }
    onShow() {
    }
    onHide() {
    }
}
Navigation.Page.Namespace=`Aventus.Navigation`;
_.Navigation.Page=Navigation.Page;

Navigation.Router = class Router extends Aventus.WebComponent {
    oldPage;
    allRoutes = {};
    activePath = "";
    activeState;
    oneStateActive = false;
    showPageMutex = new Aventus.Mutex();
    get stateManager() {
        return Aventus.Instance.get(RouterStateManager);
    }
    page404;
    static __style = `:host{display:block}`;
    constructor() {
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
    __registerTemplateAction() { super.__registerTemplateAction();
  "elements": [
    {
      "name": "contentEl",
      "ids": [
        "router_0"
      ]
    }
  ]
});
    getClassName() {
        return "Router";
    }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('stateManager');
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
            console.error(e);
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
                    this.activeState = currentState;
                    await element.show(currentState);
                    let title = element.pageTitle();
                    if (title !== undefined)
                        document.title = title;
                    let keywords = element.pageKeywords();
                    if (keywords !== undefined) {
                        let meta = document.querySelector('meta[name="keywords"]');
                        if (!meta) {
                            meta = document.createElement('meta');
                        }
                        meta.setAttribute("content", keywords.join(", "));
                    }
                    let description = element.pageDescription();
                    if (description !== undefined) {
                        let meta = document.querySelector('meta[name="description"]');
                        if (!meta) {
                            meta = document.createElement('meta');
                        }
                        meta.setAttribute("content", description);
                    }
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
                this.activeState = undefined;
                this.oldPage = this.page404;
                this.activePath = '';
                await this.page404.show(this.activeState);
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
    navigate(state) {
        return this.stateManager.setState(state);
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
Navigation.Router.Namespace=`Aventus.Navigation`;
_.Navigation.Router=Navigation.Router;

let TouchRecord=class TouchRecord {
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
        const dirs = Object.keys(vel);
        for (let dir of dirs) {
            let v = Math.abs(vel[dir]) <= 10 ? 0 : vel[dir];
            while (v !== 0) {
                distance[dir] += v;
                v = (v * deAcceleration) | 0;
            }
        }
        return distance;
    }
    track(evt) {
        const { targetTouches, } = evt;
        const touches = Array.from(targetTouches);
        for (let touch of touches) {
            this._add(touch);
        }
        return this._touchList;
    }
    update(evt) {
        const { touches, changedTouches, } = evt;
        const touchesArray = Array.from(touches);
        for (let touch of touchesArray) {
            this._renew(touch);
        }
        this._setActiveID(changedTouches);
        return this._touchList;
    }
    release(evt) {
        delete this._activeTouchID;
        const touchesArray = Array.from(evt.changedTouches);
        for (let touch of touchesArray) {
            this._delete(touch);
        }
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
TouchRecord.Namespace=`Aventus`;
_.TouchRecord=TouchRecord;

Layout.Scrollable = class Scrollable extends Aventus.WebComponent {
    static get observedAttributes() {return ["zoom"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'y_scroll_visible'() { return this.getBoolAttr('y_scroll_visible') }
    set 'y_scroll_visible'(val) { this.setBoolAttr('y_scroll_visible', val) }
    set 'x_scroll_visible'(val) { this.setBoolAttr('x_scroll_visible', val) }
    set 'floating_scroll'(val) { this.setBoolAttr('floating_scroll', val) }
    set 'x_scroll'(val) { this.setBoolAttr('x_scroll', val) }
    set 'y_scroll'(val) { this.setBoolAttr('y_scroll', val) }
    set 'auto_hide'(val) { this.setBoolAttr('auto_hide', val) }
    set 'break'(val) { this.setNumberAttr('break', val) }
    set 'disable'(val) { this.setBoolAttr('disable', val) }
    set 'no_user_select'(val) { this.setBoolAttr('no_user_select', val) }
    set 'zoom'(val) { this.setNumberAttr('zoom', val) }
    display = { x: 0, y: 0 };
    _max = {
        x: 0,
        y: 0
    };
    get max() {
        return {
            x: this._max.x,
            y: this._max.y,
        };
    }
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
}));
    static __style = `:host{--internal-scrollbar-container-color: var(--scrollbar-container-color, transparent);--internal-scrollbar-color: var(--scrollbar-color, #757575);--internal-scrollbar-active-color: var(--scrollbar-active-color, #858585);--internal-scroller-width: var(--scroller-width, 6px);--internal-scroller-top: var(--scroller-top, 3px);--internal-scroller-bottom: var(--scroller-bottom, 3px);--internal-scroller-right: var(--scroller-right, 3px);--internal-scroller-left: var(--scroller-left, 3px);--_scrollbar-content-padding: var(--scrollbar-content-padding, 0);--_scrollbar-container-display: var(--scrollbar-container-display, inline-block)}:host{display:block;height:100%;min-height:inherit;min-width:inherit;overflow:hidden;position:relative;-webkit-user-drag:none;-khtml-user-drag:none;-moz-user-drag:none;-o-user-drag:none;width:100%}:host .scroll-main-container{display:block;height:100%;min-height:inherit;min-width:inherit;position:relative;width:100%}:host .scroll-main-container .content-zoom{display:block;height:100%;min-height:inherit;min-width:inherit;position:relative;transform-origin:0 0;width:100%;z-index:4}:host .scroll-main-container .content-zoom .content-hidder{display:block;height:100%;min-height:inherit;min-width:inherit;overflow:hidden;position:relative;width:100%}:host .scroll-main-container .content-zoom .content-hidder .content-wrapper{display:var(--_scrollbar-container-display);height:100%;min-height:inherit;min-width:inherit;padding:var(--_scrollbar-content-padding);position:relative;width:100%}:host .scroll-main-container .scroller-wrapper .container-scroller{display:none;overflow:hidden;position:absolute;transition:transform .2s linear;z-index:5}:host .scroll-main-container .scroller-wrapper .container-scroller .shadow-scroller{background-color:var(--internal-scrollbar-container-color);border-radius:5px}:host .scroll-main-container .scroller-wrapper .container-scroller .shadow-scroller .scroller{background-color:var(--internal-scrollbar-color);border-radius:5px;cursor:pointer;position:absolute;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;z-index:5}:host .scroll-main-container .scroller-wrapper .container-scroller .scroller.active{background-color:var(--internal-scrollbar-active-color)}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical{height:calc(100% - var(--internal-scroller-bottom)*2 - var(--internal-scroller-width));padding-left:var(--internal-scroller-left);right:var(--internal-scroller-right);top:var(--internal-scroller-bottom);transform:0;width:calc(var(--internal-scroller-width) + var(--internal-scroller-left))}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical.hide{transform:translateX(calc(var(--internal-scroller-width) + var(--internal-scroller-left)))}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical .shadow-scroller{height:100%}:host .scroll-main-container .scroller-wrapper .container-scroller.vertical .shadow-scroller .scroller{width:calc(100% - var(--internal-scroller-left))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal{bottom:var(--internal-scroller-bottom);height:calc(var(--internal-scroller-width) + var(--internal-scroller-top));left:var(--internal-scroller-right);padding-top:var(--internal-scroller-top);transform:0;width:calc(100% - var(--internal-scroller-right)*2 - var(--internal-scroller-width))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal.hide{transform:translateY(calc(var(--internal-scroller-width) + var(--internal-scroller-top)))}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal .shadow-scroller{height:100%}:host .scroll-main-container .scroller-wrapper .container-scroller.horizontal .shadow-scroller .scroller{height:calc(100% - var(--internal-scroller-top))}:host([y_scroll]) .scroll-main-container .content-zoom .content-hidder .content-wrapper{height:auto}:host([x_scroll]) .scroll-main-container .content-zoom .content-hidder .content-wrapper{width:auto}:host([y_scroll_visible]) .scroll-main-container .scroller-wrapper .container-scroller.vertical{display:block}:host([x_scroll_visible]) .scroll-main-container .scroller-wrapper .container-scroller.horizontal{display:block}:host([no_user_select]) .content-wrapper *{user-select:none}:host([no_user_select]) ::slotted{user-select:none}`;
    constructor() {
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
        blocks: { 'default':`<div class="scroll-main-container" _id="scrollable_0">
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
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
});
    getClassName() {
        return "Scrollable";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('y_scroll_visible')) { this.attributeChangedCallback('y_scroll_visible', false, false); }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('max');
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
        this._max[direction] = maxScrollContent + this.margin[direction];
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
Layout.Scrollable.Namespace=`Aventus.Layout`;
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
Tabs.Namespace=`AventusWebsite`;
Tabs.Tag=`av-tabs`;
_.Tabs=Tabs;
if(!window.customElements.get('av-tabs')){window.customElements.define('av-tabs', Tabs);Aventus.WebComponentInstance.registerDefinition(Tabs);}

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
Result.Namespace=`AventusWebsite`;
Result.Tag=`av-result`;
_.Result=Result;
if(!window.customElements.get('av-result')){window.customElements.define('av-result', Result);Aventus.WebComponentInstance.registerDefinition(Result);}

const TutorialFooter = class TutorialFooter extends Aventus.WebComponent {
    get 'hide_previous'() { return this.getBoolAttr('hide_previous') }
    set 'hide_previous'(val) { this.setBoolAttr('hide_previous', val) }
    set 'hide_next'(val) { this.setBoolAttr('hide_next', val) }
    nextState;
    static __style = `:host{align-items:center;display:flex;justify-content:center;margin:30px 0;width:100%}:host div{background-color:var(--aventus-color);border-radius:5px;box-shadow:var(--elevation-3);color:var(--aventus-font-color);cursor:pointer;font-size:16px;font-weight:400;margin:0 30px;padding:5px 15px;-webkit-tap-highlight-color:rgba(0,0,0,0);user-select:none}:host div:hover{box-shadow:0 0 3px #444}:host([hide_next]) .next{opacity:0;visibility:hidden}:host([hide_previous]) .previous{opacity:0;visibility:hidden}`;
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
    __registerTemplateAction() { super.__registerTemplateAction();
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
});
    getClassName() {
        return "TutorialFooter";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('hide_previous')) { this.attributeChangedCallback('hide_previous', false, false); }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('hide_previous');
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
TutorialFooter.Namespace=`AventusWebsite`;
TutorialFooter.Tag=`av-tutorial-footer`;
_.TutorialFooter=TutorialFooter;
if(!window.customElements.get('av-tutorial-footer')){window.customElements.define('av-tutorial-footer', TutorialFooter);Aventus.WebComponentInstance.registerDefinition(TutorialFooter);}

const DocLibResizeObserverEditor1Example = class DocLibResizeObserverEditor1Example extends Aventus.WebComponent {
    static __style = `:host{animation-name:resize;animation-duration:5s;animation-direction:alternate;animation-iteration-count:infinite;animation-timing-function:linear;height:30px}@keyframes resize{0%{width:30px}100%{width:70px}}`;
    __getStatic() {
        return DocLibResizeObserverEditor1Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibResizeObserverEditor1Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "DocLibResizeObserverEditor1Example";
    }
    postCreation() {
        const observer = new Aventus.ResizeObserver(() => {
            if (this.offsetWidth < 50) {
                this.style.backgroundColor = 'red';
            }
            else {
                this.style.backgroundColor = 'blue';
            }
        });
        observer.observe(this);
    }
}
DocLibResizeObserverEditor1Example.Namespace=`AventusWebsite`;
DocLibResizeObserverEditor1Example.Tag=`av-doc-lib-resize-observer-editor-1-example`;
_.DocLibResizeObserverEditor1Example=DocLibResizeObserverEditor1Example;
if(!window.customElements.get('av-doc-lib-resize-observer-editor-1-example')){window.customElements.define('av-doc-lib-resize-observer-editor-1-example', DocLibResizeObserverEditor1Example);Aventus.WebComponentInstance.registerDefinition(DocLibResizeObserverEditor1Example);}

const DocLibPressManagerEditor1Example = class DocLibPressManagerEditor1Example extends Aventus.WebComponent {
    static __style = ``;
    __getStatic() {
        return DocLibPressManagerEditor1Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibPressManagerEditor1Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<button _id="doclibpressmanagereditor1example_0">Click 1</button><button _id="doclibpressmanagereditor1example_1">Click 2</button>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "elements": [
    {
      "name": "buttonEl",
      "ids": [
        "doclibpressmanagereditor1example_0"
      ]
    }
  ],
  "pressEvents": [
    {
      "id": "doclibpressmanagereditor1example_1",
      "onPress": (e, pressInstance, c) => { c.comp.onPress(e, pressInstance); }
    }
  ]
});
    getClassName() {
        return "DocLibPressManagerEditor1Example";
    }
    onPress() {
        alert("Press with @press");
    }
    postCreation() {
        new Aventus.PressManager({
            element: this.buttonEl,
            onPress: () => {
                alert("Press with Aventus.PressManager");
            }
        });
    }
}
DocLibPressManagerEditor1Example.Namespace=`AventusWebsite`;
DocLibPressManagerEditor1Example.Tag=`av-doc-lib-press-manager-editor-1-example`;
_.DocLibPressManagerEditor1Example=DocLibPressManagerEditor1Example;
if(!window.customElements.get('av-doc-lib-press-manager-editor-1-example')){window.customElements.define('av-doc-lib-press-manager-editor-1-example', DocLibPressManagerEditor1Example);Aventus.WebComponentInstance.registerDefinition(DocLibPressManagerEditor1Example);}

const DocLibDragAndDropEditor1Example = class DocLibDragAndDropEditor1Example extends Aventus.WebComponent {
    static __style = `:host{width:20px;height:20px;background-color:red;position:absolute;z-index:9999}`;
    __getStatic() {
        return DocLibDragAndDropEditor1Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibDragAndDropEditor1Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "DocLibDragAndDropEditor1Example";
    }
    postCreation() {
        new Aventus.DragAndDrop({
            element: this
        });
    }
}
DocLibDragAndDropEditor1Example.Namespace=`AventusWebsite`;
DocLibDragAndDropEditor1Example.Tag=`av-doc-lib-drag-and-drop-editor-1-example`;
_.DocLibDragAndDropEditor1Example=DocLibDragAndDropEditor1Example;
if(!window.customElements.get('av-doc-lib-drag-and-drop-editor-1-example')){window.customElements.define('av-doc-lib-drag-and-drop-editor-1-example', DocLibDragAndDropEditor1Example);Aventus.WebComponentInstance.registerDefinition(DocLibDragAndDropEditor1Example);}

const DocLibCallbackEditor2Emitter = class DocLibCallbackEditor2Emitter extends Aventus.WebComponent {
    myEvent = new Aventus.Callback();
    static __style = ``;
    __getStatic() {
        return DocLibCallbackEditor2Emitter;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibCallbackEditor2Emitter.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "DocLibCallbackEditor2Emitter";
    }
    emitMyEvent() {
        setInterval(() => {
            this.myEvent.trigger([Date.now()]);
        }, 1000);
    }
    postCreation() {
        this.emitMyEvent();
    }
}
DocLibCallbackEditor2Emitter.Namespace=`AventusWebsite`;
DocLibCallbackEditor2Emitter.Tag=`av-doc-lib-callback-editor-2-emitter`;
_.DocLibCallbackEditor2Emitter=DocLibCallbackEditor2Emitter;
if(!window.customElements.get('av-doc-lib-callback-editor-2-emitter')){window.customElements.define('av-doc-lib-callback-editor-2-emitter', DocLibCallbackEditor2Emitter);Aventus.WebComponentInstance.registerDefinition(DocLibCallbackEditor2Emitter);}

const DocLibCallbackEditor2Receiver = class DocLibCallbackEditor2Receiver extends Aventus.WebComponent {
    static __style = ``;
    __getStatic() {
        return DocLibCallbackEditor2Receiver;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibCallbackEditor2Receiver.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "DocLibCallbackEditor2Receiver";
    }
    postCreation() {
        let emitter = this.parentNode?.querySelector("av-doc-lib-callback-editor-2-emitter");
        if (emitter) {
            emitter.myEvent.add((time) => {
                this.shadowRoot.innerHTML = 'Time is ' + time;
            });
        }
    }
}
DocLibCallbackEditor2Receiver.Namespace=`AventusWebsite`;
DocLibCallbackEditor2Receiver.Tag=`av-doc-lib-callback-editor-2-receiver`;
_.DocLibCallbackEditor2Receiver=DocLibCallbackEditor2Receiver;
if(!window.customElements.get('av-doc-lib-callback-editor-2-receiver')){window.customElements.define('av-doc-lib-callback-editor-2-receiver', DocLibCallbackEditor2Receiver);Aventus.WebComponentInstance.registerDefinition(DocLibCallbackEditor2Receiver);}

const DocLibCallbackEditor1Emitter = class DocLibCallbackEditor1Emitter extends Aventus.WebComponent {
    static __style = ``;
    __getStatic() {
        return DocLibCallbackEditor1Emitter;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibCallbackEditor1Emitter.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "DocLibCallbackEditor1Emitter";
    }
    emitMyEvent() {
        setInterval(() => {
            this.dispatchEvent(new CustomEvent("myEvent", {
                detail: {
                    time: Date.now()
                }
            }));
        }, 1000);
    }
    postCreation() {
        this.emitMyEvent();
    }
}
DocLibCallbackEditor1Emitter.Namespace=`AventusWebsite`;
DocLibCallbackEditor1Emitter.Tag=`av-doc-lib-callback-editor-1-emitter`;
_.DocLibCallbackEditor1Emitter=DocLibCallbackEditor1Emitter;
if(!window.customElements.get('av-doc-lib-callback-editor-1-emitter')){window.customElements.define('av-doc-lib-callback-editor-1-emitter', DocLibCallbackEditor1Emitter);Aventus.WebComponentInstance.registerDefinition(DocLibCallbackEditor1Emitter);}

const DocLibCallbackEditor1Receiver = class DocLibCallbackEditor1Receiver extends Aventus.WebComponent {
    static __style = ``;
    __getStatic() {
        return DocLibCallbackEditor1Receiver;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibCallbackEditor1Receiver.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "DocLibCallbackEditor1Receiver";
    }
    postCreation() {
        let emitter = this.parentNode?.querySelector("av-doc-lib-callback-editor-1-emitter");
        if (emitter) {
            emitter.addEventListener("myEvent", (e) => {
                this.shadowRoot.innerHTML = 'Time is ' + e.detail.time;
            });
        }
    }
}
DocLibCallbackEditor1Receiver.Namespace=`AventusWebsite`;
DocLibCallbackEditor1Receiver.Tag=`av-doc-lib-callback-editor-1-receiver`;
_.DocLibCallbackEditor1Receiver=DocLibCallbackEditor1Receiver;
if(!window.customElements.get('av-doc-lib-callback-editor-1-receiver')){window.customElements.define('av-doc-lib-callback-editor-1-receiver', DocLibCallbackEditor1Receiver);Aventus.WebComponentInstance.registerDefinition(DocLibCallbackEditor1Receiver);}

const DocLibAnimationEditor1Example = class DocLibAnimationEditor1Example extends Aventus.WebComponent {
    animation;
    static __style = `:host{position:relative;padding-top:30px}:host .square{background-color:red;height:20px;left:0;position:absolute;top:0;width:20px}:host button{margin:5px}`;
    __getStatic() {
        return DocLibAnimationEditor1Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibAnimationEditor1Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="square" _id="doclibanimationeditor1example_0"></div><button _id="doclibanimationeditor1example_1">Start 1fps</button><button _id="doclibanimationeditor1example_2">Start 10fps</button><button _id="doclibanimationeditor1example_3">Start 30fps</button><button _id="doclibanimationeditor1example_4">Start 60fps</button>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "elements": [
    {
      "name": "squareEl",
      "ids": [
        "doclibanimationeditor1example_0"
      ]
    }
  ],
  "pressEvents": [
    {
      "id": "doclibanimationeditor1example_1",
      "onPress": (e, pressInstance, c) => { c.comp.startAnimation1fps(e, pressInstance); }
    },
    {
      "id": "doclibanimationeditor1example_2",
      "onPress": (e, pressInstance, c) => { c.comp.startAnimation10fps(e, pressInstance); }
    },
    {
      "id": "doclibanimationeditor1example_3",
      "onPress": (e, pressInstance, c) => { c.comp.startAnimation30fps(e, pressInstance); }
    },
    {
      "id": "doclibanimationeditor1example_4",
      "onPress": (e, pressInstance, c) => { c.comp.startAnimation60fps(e, pressInstance); }
    }
  ]
});
    getClassName() {
        return "DocLibAnimationEditor1Example";
    }
    startAnimation(fps) {
        const max = 200;
        const step = 10;
        let value = 0;
        if (this.animation) {
            this.animation.immediateStop();
        }
        let animation = new Aventus.Animation({
            animate: () => {
                value += step;
                this.squareEl.style.left = value + 'px';
                if (value >= max) {
                    animation.stop();
                }
            },
            fps: fps,
            stopped: () => {
            }
        });
        this.animation = animation;
        animation.start();
    }
    startAnimation1fps() {
        this.startAnimation(1);
    }
    startAnimation10fps() {
        this.startAnimation(10);
    }
    startAnimation30fps() {
        this.startAnimation(30);
    }
    startAnimation60fps() {
        this.startAnimation(60);
    }
}
DocLibAnimationEditor1Example.Namespace=`AventusWebsite`;
DocLibAnimationEditor1Example.Tag=`av-doc-lib-animation-editor-1-example`;
_.DocLibAnimationEditor1Example=DocLibAnimationEditor1Example;
if(!window.customElements.get('av-doc-lib-animation-editor-1-example')){window.customElements.define('av-doc-lib-animation-editor-1-example', DocLibAnimationEditor1Example);Aventus.WebComponentInstance.registerDefinition(DocLibAnimationEditor1Example);}

let DocWcStateEditor2StateManager=class DocWcStateEditor2StateManager extends Aventus.StateManager {
    /**
     * Get the instance of the StateManager
     */
    static getInstance() {
        return Aventus.Instance.get(DocWcStateEditor2StateManager);
    }
}
DocWcStateEditor2StateManager.Namespace=`AventusWebsite`;
_.DocWcStateEditor2StateManager=DocWcStateEditor2StateManager;

let DocWcStateEditor1StateManager=class DocWcStateEditor1StateManager extends Aventus.StateManager {
    /**
     * Get the instance of the StateManager
     */
    static getInstance() {
        return Aventus.Instance.get(DocWcStateEditor1StateManager);
    }
}
DocWcStateEditor1StateManager.Namespace=`AventusWebsite`;
_.DocWcStateEditor1StateManager=DocWcStateEditor1StateManager;

const DocWcEventEditor2Button = class DocWcEventEditor2Button extends Aventus.WebComponent {
    onCustomClick = new Aventus.Callback();
    static __style = ``;
    __getStatic() {
        return DocWcEventEditor2Button;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcEventEditor2Button.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<button _id="docwceventeditor2button_0">Custom click</button>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "events": [
    {
      "eventName": "click",
      "id": "docwceventeditor2button_0",
      "fct": (e, c) => c.comp.triggerCustomClick(e)
    }
  ]
});
    getClassName() {
        return "DocWcEventEditor2Button";
    }
    triggerCustomClick() {
        this.onCustomClick.trigger([]);
    }
}
DocWcEventEditor2Button.Namespace=`AventusWebsite`;
DocWcEventEditor2Button.Tag=`av-doc-wc-event-editor-2-button`;
_.DocWcEventEditor2Button=DocWcEventEditor2Button;
if(!window.customElements.get('av-doc-wc-event-editor-2-button')){window.customElements.define('av-doc-wc-event-editor-2-button', DocWcEventEditor2Button);Aventus.WebComponentInstance.registerDefinition(DocWcEventEditor2Button);}

const DocWcEventEditor1Example = class DocWcEventEditor1Example extends Aventus.WebComponent {
    static __style = ``;
    __getStatic() {
        return DocWcEventEditor1Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcEventEditor1Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<button _id="docwceventeditor1example_0">Say hello</button>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "events": [
    {
      "eventName": "click",
      "id": "docwceventeditor1example_0",
      "fct": (e, c) => c.comp.sayHello(e)
    }
  ]
});
    getClassName() {
        return "DocWcEventEditor1Example";
    }
    sayHello() {
        alert("Hello");
    }
}
DocWcEventEditor1Example.Namespace=`AventusWebsite`;
DocWcEventEditor1Example.Tag=`av-doc-wc-event-editor-1-example`;
_.DocWcEventEditor1Example=DocWcEventEditor1Example;
if(!window.customElements.get('av-doc-wc-event-editor-1-example')){window.customElements.define('av-doc-wc-event-editor-1-example', DocWcEventEditor1Example);Aventus.WebComponentInstance.registerDefinition(DocWcEventEditor1Example);}

const DocWcConditionEditor1Example = class DocWcConditionEditor1Example extends Aventus.WebComponent {
    static get observedAttributes() {return ["number"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'number'() { return this.getNumberProp('number') }
    set 'number'(val) { this.setNumberAttr('number', val) }
    __getStatic() {
        return DocWcConditionEditor1Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcConditionEditor1Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<p _id="docwcconditioneditor1example_0"></p><template _id="docwcconditioneditor1example_1"></template><button _id="docwcconditioneditor1example_4">Increment</button>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "content": {
    "docwcconditioneditor1example_0°@HTML": {
      "fct": (c) => `The current number is ${c.print(c.comp.__bf05c2bcf69fc0887e431ab8efb00b4cmethod1())}`,
      "once": true
    }
  },
  "events": [
    {
      "eventName": "click",
      "id": "docwcconditioneditor1example_4",
      "fct": (e, c) => c.comp.increment(e)
    }
  ]
});
  "content": {
    "docwcconditioneditor1example_2°@HTML": {
      "fct": (c) => `${c.print(c.comp.__bf05c2bcf69fc0887e431ab8efb00b4cmethod1())} is even.`,
      "once": true
    }
  }
});
  "content": {
    "docwcconditioneditor1example_3°@HTML": {
      "fct": (c) => `${c.print(c.comp.__bf05c2bcf69fc0887e431ab8efb00b4cmethod1())} is odd.`,
      "once": true
    }
  }
});
                    anchorId: 'docwcconditioneditor1example_1',
                    parts: [{once: true,
                    condition: (c) => c.comp.__bf05c2bcf69fc0887e431ab8efb00b4cmethod0(),
                    template: templ0
                },{once: true,
                    condition: (c) => true,
                    template: templ1
                }]
            });
    getClassName() {
        return "DocWcConditionEditor1Example";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('number')){ this['number'] = undefined; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('number');
    increment() {
        this.number++;
    }
    __bf05c2bcf69fc0887e431ab8efb00b4cmethod1() {
        return this.number;
    }
    __bf05c2bcf69fc0887e431ab8efb00b4cmethod0() {
        return this.number % 2 === 0;
    }
}
DocWcConditionEditor1Example.Namespace=`AventusWebsite`;
DocWcConditionEditor1Example.Tag=`av-doc-wc-condition-editor-1-example`;
_.DocWcConditionEditor1Example=DocWcConditionEditor1Example;
if(!window.customElements.get('av-doc-wc-condition-editor-1-example')){window.customElements.define('av-doc-wc-condition-editor-1-example', DocWcConditionEditor1Example);Aventus.WebComponentInstance.registerDefinition(DocWcConditionEditor1Example);}

let DocWcLoopEditor1Todo=class DocWcLoopEditor1Todo extends Aventus.Data {
    id = 0;
    name = "";
    tasks = [];
}
DocWcLoopEditor1Todo.Namespace=`AventusWebsite`;
DocWcLoopEditor1Todo.$schema={...(Aventus.Data?.$schema ?? {}), "id":"number","name":"string","tasks":"string"};
Aventus.Converter.register(DocWcLoopEditor1Todo.Fullname, DocWcLoopEditor1Todo);
_.DocWcLoopEditor1Todo=DocWcLoopEditor1Todo;

const DocWcLoopEditor4TodoList = class DocWcLoopEditor4TodoList extends Aventus.WebComponent {
    get 'todos'() {
						return this.__watch["todos"];
					}
					set 'todos'(val) {
						this.__watch["todos"] = val;
					}
    __registerWatchesActions() {
    this.__addWatchesActions("todos");
}
    static __style = ``;
    __getStatic() {
        return DocWcLoopEditor4TodoList;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcLoopEditor4TodoList.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Todos</h1><template _id="docwcloopeditor4todolist_0"></template><button _id="docwcloopeditor4todolist_4">Add</button>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "events": [
    {
      "eventName": "click",
      "id": "docwcloopeditor4todolist_4",
      "fct": (e, c) => c.comp.addTodo(e)
    }
  ]
});
  "content": {
    "docwcloopeditor4todolist_1°@HTML": {
      "fct": (c) => `${c.print(c.comp.__466b3e12a1b602fb72ea68af19cf44a4method2(c.data.todo))}`,
      "once": true
    }
  }
});
                    anchorId: 'docwcloopeditor4todolist_0',
                    template: templ0,
                simple:{data: "this.todos",item:"todo"}
  "content": {
    "docwcloopeditor4todolist_3°@HTML": {
      "fct": (c) => `${c.print(c.comp.__466b3e12a1b602fb72ea68af19cf44a4method3(c.data.task))}`,
      "once": true
    }
  }
});
                    anchorId: 'docwcloopeditor4todolist_2',
                    template: templ1,
                simple:{data: "todo.tasks",item:"task"}
    getClassName() {
        return "DocWcLoopEditor4TodoList";
    }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["todos"] = [];
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('todos');
    addTodo() {
        this.todoId++;
        let todo = new DocWcLoopEditor1Todo();
        todo.name = "My todo " + this.todoId;
        todo.tasks = ["task1", "task2"];
        this.todos.push(todo);
    }
    __466b3e12a1b602fb72ea68af19cf44a4method2(todo) {
        return todo.name;
    }
    __466b3e12a1b602fb72ea68af19cf44a4method3(task) {
        return task;
    }
}
DocWcLoopEditor4TodoList.Namespace=`AventusWebsite`;
DocWcLoopEditor4TodoList.Tag=`av-doc-wc-loop-editor-4-todo-list`;
_.DocWcLoopEditor4TodoList=DocWcLoopEditor4TodoList;
if(!window.customElements.get('av-doc-wc-loop-editor-4-todo-list')){window.customElements.define('av-doc-wc-loop-editor-4-todo-list', DocWcLoopEditor4TodoList);Aventus.WebComponentInstance.registerDefinition(DocWcLoopEditor4TodoList);}

const DocWcLoopEditor3TodoList = class DocWcLoopEditor3TodoList extends Aventus.WebComponent {
    get 'todos'() {
						return this.__watch["todos"];
					}
					set 'todos'(val) {
						this.__watch["todos"] = val;
					}
    __registerWatchesActions() {
    this.__addWatchesActions("todos");
}
    static __style = ``;
    __getStatic() {
        return DocWcLoopEditor3TodoList;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcLoopEditor3TodoList.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Todos</h1><template _id="docwcloopeditor3todolist_0"></template><button _id="docwcloopeditor3todolist_4">Add</button>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "events": [
    {
      "eventName": "click",
      "id": "docwcloopeditor3todolist_4",
      "fct": (e, c) => c.comp.addTodo(e)
    }
  ]
});
  "content": {
    "docwcloopeditor3todolist_1°@HTML": {
      "fct": (c) => `${c.print(c.comp.__f781a9b17ed151e6d4c1749ee3dd2263method3(c.data.todo))}`,
      "once": true
    }
  },
  "contextEdits": [
    {
      "fct": (c) => c.comp.__f781a9b17ed151e6d4c1749ee3dd2263method1(c.data.index)
    }
  ]
});
                    anchorId: 'docwcloopeditor3todolist_0',
                    template: templ0,
                simple:{data: "this.todos",index:"index"}
  "content": {
    "docwcloopeditor3todolist_3°@HTML": {
      "fct": (c) => `${c.print(c.comp.__f781a9b17ed151e6d4c1749ee3dd2263method4(c.data.index))}-${c.print(c.comp.__f781a9b17ed151e6d4c1749ee3dd2263method5(c.data.index2))}. ${c.print(c.comp.__f781a9b17ed151e6d4c1749ee3dd2263method6(c.data.todo,c.data.index2))}`
    }
  }
});
                    anchorId: 'docwcloopeditor3todolist_2',
                    template: templ2,
                simple:{data: "todo.tasks",index:"index2"}
    getClassName() {
        return "DocWcLoopEditor3TodoList";
    }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["todos"] = [];
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('todos');
    addTodo() {
        this.todoId++;
        let todo = new DocWcLoopEditor1Todo();
        todo.name = "My todo " + this.todoId;
        todo.tasks = ["task1", "task2"];
        this.todos.push(todo);
    }
    __f781a9b17ed151e6d4c1749ee3dd2263method3(todo) {
        return todo.name;
    }
    __f781a9b17ed151e6d4c1749ee3dd2263method4(index) {
        return index + 1;
    }
    __f781a9b17ed151e6d4c1749ee3dd2263method5(index2) {
        return index2 + 1;
    }
    __f781a9b17ed151e6d4c1749ee3dd2263method6(todo, index2) {
        return todo.tasks[index2];
    }
    __f781a9b17ed151e6d4c1749ee3dd2263method1(index) {
        return { 'todo': this.todos[index] };
    }
}
DocWcLoopEditor3TodoList.Namespace=`AventusWebsite`;
DocWcLoopEditor3TodoList.Tag=`av-doc-wc-loop-editor-3-todo-list`;
_.DocWcLoopEditor3TodoList=DocWcLoopEditor3TodoList;
if(!window.customElements.get('av-doc-wc-loop-editor-3-todo-list')){window.customElements.define('av-doc-wc-loop-editor-3-todo-list', DocWcLoopEditor3TodoList);Aventus.WebComponentInstance.registerDefinition(DocWcLoopEditor3TodoList);}

const DocWcLoopEditor2TodoList = class DocWcLoopEditor2TodoList extends Aventus.WebComponent {
    get 'todos'() {
						return this.__watch["todos"];
					}
					set 'todos'(val) {
						this.__watch["todos"] = val;
					}
    __registerWatchesActions() {
    this.__addWatchesActions("todos");
}
    static __style = ``;
    __getStatic() {
        return DocWcLoopEditor2TodoList;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcLoopEditor2TodoList.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Todos</h1><template _id="docwcloopeditor2todolist_0"></template><button _id="docwcloopeditor2todolist_4">Add</button>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "events": [
    {
      "eventName": "click",
      "id": "docwcloopeditor2todolist_4",
      "fct": (e, c) => c.comp.addTodo(e)
    }
  ]
});
  "content": {
    "docwcloopeditor2todolist_1°@HTML": {
      "fct": (c) => `${c.print(c.comp.__34268725a497226bbf42ef36aa70ba68method3(c.data.todo))}`,
      "once": true
    }
  },
  "contextEdits": [
    {
      "fct": (c) => c.comp.__34268725a497226bbf42ef36aa70ba68method1(c.data.i)
    }
  ]
});
                    anchorId: 'docwcloopeditor2todolist_0',
                    template: templ0,
                simple:{data: "this.todos",index:"i"}
  "content": {
    "docwcloopeditor2todolist_3°@HTML": {
      "fct": (c) => `${c.print(c.comp.__34268725a497226bbf42ef36aa70ba68method4(c.data.i))}-${c.print(c.comp.__34268725a497226bbf42ef36aa70ba68method5(c.data.j))}. ${c.print(c.comp.__34268725a497226bbf42ef36aa70ba68method6(c.data.todo,c.data.j))}`
    }
  }
});
                    anchorId: 'docwcloopeditor2todolist_2',
                    template: templ2,
                simple:{data: "todo.tasks",index:"j"}
    getClassName() {
        return "DocWcLoopEditor2TodoList";
    }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["todos"] = [];
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('todos');
    addTodo() {
        this.todoId++;
        let todo = new DocWcLoopEditor1Todo();
        todo.name = "My todo " + this.todoId;
        todo.tasks = ["task1", "task2"];
        this.todos.push(todo);
    }
    __34268725a497226bbf42ef36aa70ba68method3(todo) {
        return todo.name;
    }
    __34268725a497226bbf42ef36aa70ba68method4(i) {
        return i + 1;
    }
    __34268725a497226bbf42ef36aa70ba68method5(j) {
        return j + 1;
    }
    __34268725a497226bbf42ef36aa70ba68method6(todo, j) {
        return todo.tasks[j];
    }
    __34268725a497226bbf42ef36aa70ba68method1(i) {
        return { 'todo': this.todos[i] };
    }
}
DocWcLoopEditor2TodoList.Namespace=`AventusWebsite`;
DocWcLoopEditor2TodoList.Tag=`av-doc-wc-loop-editor-2-todo-list`;
_.DocWcLoopEditor2TodoList=DocWcLoopEditor2TodoList;
if(!window.customElements.get('av-doc-wc-loop-editor-2-todo-list')){window.customElements.define('av-doc-wc-loop-editor-2-todo-list', DocWcLoopEditor2TodoList);Aventus.WebComponentInstance.registerDefinition(DocWcLoopEditor2TodoList);}

const DocWcInjectionEditor2Example = class DocWcInjectionEditor2Example extends Aventus.WebComponent {
    get 'time'() {
						return this.__watch["time"];
					}
					set 'time'(val) {
						this.__watch["time"] = val;
					}
    this.__addWatchesActions("time");
}
    static __style = ``;
    __getStatic() {
        return DocWcInjectionEditor2Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcInjectionEditor2Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<input type="text" _id="docwcinjectioneditor2example_0" />` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "injection": [
    {
      "id": "docwcinjectioneditor2example_0",
      "injectionName": "value",
      "inject": (c) => c.comp.__ea947f83f136b064363a866829451b4cmethod0(),
      "once": true
    }
  ]
});
    getClassName() {
        return "DocWcInjectionEditor2Example";
    }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["time"] = 0;
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('time');
    getTimeTxt() {
        return 'time : ' + this.time;
    }
    postCreation() {
        setInterval(() => {
            this.time++;
        }, 1000);
    }
    __ea947f83f136b064363a866829451b4cmethod0() {
        return this.getTimeTxt();
    }
}
DocWcInjectionEditor2Example.Namespace=`AventusWebsite`;
DocWcInjectionEditor2Example.Tag=`av-doc-wc-injection-editor-2-example`;
_.DocWcInjectionEditor2Example=DocWcInjectionEditor2Example;
if(!window.customElements.get('av-doc-wc-injection-editor-2-example')){window.customElements.define('av-doc-wc-injection-editor-2-example', DocWcInjectionEditor2Example);Aventus.WebComponentInstance.registerDefinition(DocWcInjectionEditor2Example);}

const DocWcInjectionEditor1Example = class DocWcInjectionEditor1Example extends Aventus.WebComponent {
    get 'time'() {
						return this.__watch["time"];
					}
					set 'time'(val) {
						this.__watch["time"] = val;
					}
    this.__addWatchesActions("time");
}
    static __style = ``;
    __getStatic() {
        return DocWcInjectionEditor1Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcInjectionEditor1Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<input type="text" _id="docwcinjectioneditor1example_0" />` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "injection": [
    {
      "id": "docwcinjectioneditor1example_0",
      "injectionName": "value",
      "inject": (c) => c.comp.__ecae68b7cc910637c9a7f833143dd526method0(),
      "once": true
    }
  ]
});
    getClassName() {
        return "DocWcInjectionEditor1Example";
    }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["time"] = 0;
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('time');
    postCreation() {
        setInterval(() => {
            this.time++;
        }, 1000);
    }
    __ecae68b7cc910637c9a7f833143dd526method0() {
        return this.time;
    }
}
DocWcInjectionEditor1Example.Namespace=`AventusWebsite`;
DocWcInjectionEditor1Example.Tag=`av-doc-wc-injection-editor-1-example`;
_.DocWcInjectionEditor1Example=DocWcInjectionEditor1Example;
if(!window.customElements.get('av-doc-wc-injection-editor-1-example')){window.customElements.define('av-doc-wc-injection-editor-1-example', DocWcInjectionEditor1Example);Aventus.WebComponentInstance.registerDefinition(DocWcInjectionEditor1Example);}

const DocWcBindingEditor4Input = class DocWcBindingEditor4Input extends Aventus.WebComponent {
    static get observedAttributes() {return ["val"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'val'() { return this.getStringProp('val') }
    set 'val'(val) { this.setStringAttr('val', val) }
    static __style = `:host{background-color:#f08080}:host input{background-color:rgba(0,0,0,0)}`;
    __getStatic() {
        return DocWcBindingEditor4Input;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcBindingEditor4Input.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<input _id="docwcbindingeditor4input_0" />` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "elements": [
    {
      "name": "inputEl",
      "ids": [
        "docwcbindingeditor4input_0"
      ]
    }
  ],
  "content": {
    "docwcbindingeditor4input_0°value": {
      "fct": (c) => `${c.print(c.comp.__4060136e894455a3f998cfb126ecff6dmethod0())}`,
      "once": true
    }
  },
  "events": [
    {
      "eventName": "input",
      "id": "docwcbindingeditor4input_0",
      "fct": (e, c) => c.comp.triggerChange(e)
    }
  ]
});
    getClassName() {
        return "DocWcBindingEditor4Input";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('val')){ this['val'] = ""; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('val');
    triggerChange() {
        this.val = this.inputEl.value;
        this.onNewVal.trigger([]);
    }
    __4060136e894455a3f998cfb126ecff6dmethod0() {
        return this.val;
    }
}
DocWcBindingEditor4Input.Namespace=`AventusWebsite`;
DocWcBindingEditor4Input.Tag=`av-doc-wc-binding-editor-4-input`;
_.DocWcBindingEditor4Input=DocWcBindingEditor4Input;
if(!window.customElements.get('av-doc-wc-binding-editor-4-input')){window.customElements.define('av-doc-wc-binding-editor-4-input', DocWcBindingEditor4Input);Aventus.WebComponentInstance.registerDefinition(DocWcBindingEditor4Input);}

const DocWcBindingEditor3Input = class DocWcBindingEditor3Input extends Aventus.WebComponent {
    static get observedAttributes() {return ["val"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'val'() { return this.getStringProp('val') }
    set 'val'(val) { this.setStringAttr('val', val) }
    static __style = `:host{background-color:#f08080}:host input{background-color:rgba(0,0,0,0)}`;
    __getStatic() {
        return DocWcBindingEditor3Input;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcBindingEditor3Input.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<input _id="docwcbindingeditor3input_0" />` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "elements": [
    {
      "name": "inputEl",
      "ids": [
        "docwcbindingeditor3input_0"
      ]
    }
  ],
  "content": {
    "docwcbindingeditor3input_0°value": {
      "fct": (c) => `${c.print(c.comp.__3a592eb2efc1924f0bd1b65901877093method0())}`,
      "once": true
    }
  },
  "events": [
    {
      "eventName": "input",
      "id": "docwcbindingeditor3input_0",
      "fct": (e, c) => c.comp.triggerChange(e)
    }
  ]
});
    getClassName() {
        return "DocWcBindingEditor3Input";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('val')){ this['val'] = ""; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('val');
    triggerChange() {
        this.val = this.inputEl.value;
        this.onChange.trigger([]);
    }
    __3a592eb2efc1924f0bd1b65901877093method0() {
        return this.val;
    }
}
DocWcBindingEditor3Input.Namespace=`AventusWebsite`;
DocWcBindingEditor3Input.Tag=`av-doc-wc-binding-editor-3-input`;
_.DocWcBindingEditor3Input=DocWcBindingEditor3Input;
if(!window.customElements.get('av-doc-wc-binding-editor-3-input')){window.customElements.define('av-doc-wc-binding-editor-3-input', DocWcBindingEditor3Input);Aventus.WebComponentInstance.registerDefinition(DocWcBindingEditor3Input);}

const DocWcBindingEditor2Example = class DocWcBindingEditor2Example extends Aventus.WebComponent {
    get 'value'() {
						return this.__watch["value"];
					}
					set 'value'(val) {
						this.__watch["value"] = val;
					}
    this.__addWatchesActions("value");
}
    static __style = ``;
    __getStatic() {
        return DocWcBindingEditor2Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcBindingEditor2Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<input _id="docwcbindingeditor2example_0" /><p _id="docwcbindingeditor2example_1"></p>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "content": {
    "docwcbindingeditor2example_1°@HTML": {
      "fct": (c) => `${c.print(c.comp.__da3baae7677d72d52ac2bb0ec0788ff4method2())}`,
      "once": true
    }
  },
  "bindings": [
    {
      "id": "docwcbindingeditor2example_0",
      "injectionName": "value",
      "eventNames": [
        "keyup"
      ],
      "inject": (c) => c.comp.__da3baae7677d72d52ac2bb0ec0788ff4method0(),
      "extract": (c, v) => c.comp.__da3baae7677d72d52ac2bb0ec0788ff4method1(v),
      "once": true
    }
  ]
});
    getClassName() {
        return "DocWcBindingEditor2Example";
    }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["value"] = "My value";
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('value');
    __da3baae7677d72d52ac2bb0ec0788ff4method2() {
        return this.value;
    }
    __da3baae7677d72d52ac2bb0ec0788ff4method0() {
        return this.value;
    }
    __da3baae7677d72d52ac2bb0ec0788ff4method1(v) {
        if (this) {
            this.value = v;
        }
    }
}
DocWcBindingEditor2Example.Namespace=`AventusWebsite`;
DocWcBindingEditor2Example.Tag=`av-doc-wc-binding-editor-2-example`;
_.DocWcBindingEditor2Example=DocWcBindingEditor2Example;
if(!window.customElements.get('av-doc-wc-binding-editor-2-example')){window.customElements.define('av-doc-wc-binding-editor-2-example', DocWcBindingEditor2Example);Aventus.WebComponentInstance.registerDefinition(DocWcBindingEditor2Example);}

const DocWcBindingEditor1Example = class DocWcBindingEditor1Example extends Aventus.WebComponent {
    get 'value'() {
						return this.__watch["value"];
					}
					set 'value'(val) {
						this.__watch["value"] = val;
					}
    this.__addWatchesActions("value");
}
    static __style = ``;
    __getStatic() {
        return DocWcBindingEditor1Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcBindingEditor1Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<input _id="docwcbindingeditor1example_0" /><p _id="docwcbindingeditor1example_1"></p>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "content": {
    "docwcbindingeditor1example_1°@HTML": {
      "fct": (c) => `${c.print(c.comp.__f8af63ff30d8769af7e6fa720d2204d9method2())}`,
      "once": true
    }
  },
  "bindings": [
    {
      "id": "docwcbindingeditor1example_0",
      "injectionName": "value",
      "eventNames": [
        "change",
        "input"
      ],
      "inject": (c) => c.comp.__f8af63ff30d8769af7e6fa720d2204d9method0(),
      "extract": (c, v) => c.comp.__f8af63ff30d8769af7e6fa720d2204d9method1(v),
      "once": true
    }
  ]
});
    getClassName() {
        return "DocWcBindingEditor1Example";
    }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["value"] = "My value";
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('value');
    __f8af63ff30d8769af7e6fa720d2204d9method2() {
        return this.value;
    }
    __f8af63ff30d8769af7e6fa720d2204d9method0() {
        return this.value;
    }
    __f8af63ff30d8769af7e6fa720d2204d9method1(v) {
        if (this) {
            this.value = v;
        }
    }
}
DocWcBindingEditor1Example.Namespace=`AventusWebsite`;
DocWcBindingEditor1Example.Tag=`av-doc-wc-binding-editor-1-example`;
_.DocWcBindingEditor1Example=DocWcBindingEditor1Example;
if(!window.customElements.get('av-doc-wc-binding-editor-1-example')){window.customElements.define('av-doc-wc-binding-editor-1-example', DocWcBindingEditor1Example);Aventus.WebComponentInstance.registerDefinition(DocWcBindingEditor1Example);}

const DocWcStyleEditor4Example = class DocWcStyleEditor4Example extends Aventus.WebComponent {
    static __style = ``;
    __getStatic() {
        return DocWcStyleEditor4Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcStyleEditor4Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<p class="text-bg-primary">I am an example</p>` }
    });
}
    getClassName() {
        return "DocWcStyleEditor4Example";
    }
    loadBootstrap() {
        Aventus.Style.load("@Bootstrap", "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css");
    }
    styleBefore(addStyle) {
        super.styleBefore(addStyle);
        this.loadBootstrap();
        addStyle("@Bootstrap");
    }
}
DocWcStyleEditor4Example.Namespace=`AventusWebsite`;
DocWcStyleEditor4Example.Tag=`av-doc-wc-style-editor-4-example`;
_.DocWcStyleEditor4Example=DocWcStyleEditor4Example;
if(!window.customElements.get('av-doc-wc-style-editor-4-example')){window.customElements.define('av-doc-wc-style-editor-4-example', DocWcStyleEditor4Example);Aventus.WebComponentInstance.registerDefinition(DocWcStyleEditor4Example);}

const DocWcStyleEditor2Parent = class DocWcStyleEditor2Parent extends Aventus.WebComponent {
    static __style = `:host{background-color:gray;display:block}:host .title{color:orange}`;
    __getStatic() {
        return DocWcStyleEditor2Parent;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcStyleEditor2Parent.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<p class="title">I am an example</p>` }
    });
}
    getClassName() {
        return "DocWcStyleEditor2Parent";
    }
}
DocWcStyleEditor2Parent.Namespace=`AventusWebsite`;
DocWcStyleEditor2Parent.Tag=`av-doc-wc-style-editor-2-parent`;
_.DocWcStyleEditor2Parent=DocWcStyleEditor2Parent;
if(!window.customElements.get('av-doc-wc-style-editor-2-parent')){window.customElements.define('av-doc-wc-style-editor-2-parent', DocWcStyleEditor2Parent);Aventus.WebComponentInstance.registerDefinition(DocWcStyleEditor2Parent);}

const DocWcStyleEditor1Result = class DocWcStyleEditor1Result extends Aventus.WebComponent {
    get 'active'() { return this.getBoolAttr('active') }
    set 'active'(val) { this.setBoolAttr('active', val) }
    __getStatic() {
        return DocWcStyleEditor1Result;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcStyleEditor1Result.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<p class="title">I am an example</p>` }
    });
}
    getClassName() {
        return "DocWcStyleEditor1Result";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('active')) { this.attributeChangedCallback('active', false, false); }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('active');
    __listBoolProps() { return ["active"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
}
DocWcStyleEditor1Result.Namespace=`AventusWebsite`;
DocWcStyleEditor1Result.Tag=`av-doc-wc-style-editor-1-result`;
_.DocWcStyleEditor1Result=DocWcStyleEditor1Result;
if(!window.customElements.get('av-doc-wc-style-editor-1-result')){window.customElements.define('av-doc-wc-style-editor-1-result', DocWcStyleEditor1Result);Aventus.WebComponentInstance.registerDefinition(DocWcStyleEditor1Result);}

let DocWcWatchEditor1Person=class DocWcWatchEditor1Person extends Aventus.Data {
    id = 0;
    name = "John Doe";
    children = [{ name: "Mini John Doe" }];
}
DocWcWatchEditor1Person.Namespace=`AventusWebsite`;
DocWcWatchEditor1Person.$schema={...(Aventus.Data?.$schema ?? {}), "id":"number","name":"string","children":"literal"};
Aventus.Converter.register(DocWcWatchEditor1Person.Fullname, DocWcWatchEditor1Person);
_.DocWcWatchEditor1Person=DocWcWatchEditor1Person;

const DocWcPropertyEditor1Example = class DocWcPropertyEditor1Example extends Aventus.WebComponent {
    static get observedAttributes() {return ["label"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'label'() { return this.getStringProp('label') }
    set 'label'(val) { this.setStringAttr('label', val) }
    console.log("my label changed");
}));
    static __style = ``;
    __getStatic() {
        return DocWcPropertyEditor1Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcPropertyEditor1Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div _id="docwcpropertyeditor1example_0"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "content": {
    "docwcpropertyeditor1example_0°@HTML": {
      "fct": (c) => `my label : ${c.print(c.comp.__aef2ce3421438dc48861135406c4252fmethod0())}`,
      "once": true
    }
  }
});
    getClassName() {
        return "DocWcPropertyEditor1Example";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('label')){ this['label'] = undefined; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('label');
    postCreation() {
        setInterval(() => {
            this.label = Math.random() + '';
        }, 2000);
    }
    __aef2ce3421438dc48861135406c4252fmethod0() {
        return this.label;
    }
}
DocWcPropertyEditor1Example.Namespace=`AventusWebsite`;
DocWcPropertyEditor1Example.Tag=`av-doc-wc-property-editor-1-example`;
_.DocWcPropertyEditor1Example=DocWcPropertyEditor1Example;
if(!window.customElements.get('av-doc-wc-property-editor-1-example')){window.customElements.define('av-doc-wc-property-editor-1-example', DocWcPropertyEditor1Example);Aventus.WebComponentInstance.registerDefinition(DocWcPropertyEditor1Example);}

const DocWcAttributeEditor1Example = class DocWcAttributeEditor1Example extends Aventus.WebComponent {
    get 'active'() { return this.getBoolAttr('active') }
    set 'active'(val) { this.setBoolAttr('active', val) }
    __getStatic() {
        return DocWcAttributeEditor1Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcAttributeEditor1Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div>I'm an example</div>` }
    });
}
    getClassName() {
        return "DocWcAttributeEditor1Example";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('active')) { this.attributeChangedCallback('active', false, false); }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('active');
    __listBoolProps() { return ["active"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    postCreation() {
        setInterval(() => {
            this.active = !this.active;
        }, 2000);
    }
}
DocWcAttributeEditor1Example.Namespace=`AventusWebsite`;
DocWcAttributeEditor1Example.Tag=`av-doc-wc-attribute-editor-1-example`;
_.DocWcAttributeEditor1Example=DocWcAttributeEditor1Example;
if(!window.customElements.get('av-doc-wc-attribute-editor-1-example')){window.customElements.define('av-doc-wc-attribute-editor-1-example', DocWcAttributeEditor1Example);Aventus.WebComponentInstance.registerDefinition(DocWcAttributeEditor1Example);}

const DocWcInheritanceEditor3Fillable = class DocWcInheritanceEditor3Fillable extends Aventus.WebComponent {
    static get observedAttributes() {return ["label"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'label'() { return this.getStringProp('label') }
    set 'label'(val) { this.setStringAttr('label', val) }
						return this.__watch["value"];
					}
					set 'value'(val) {
						this.__watch["value"] = val;
					}
    __registerWatchesActions() {
    this.__addWatchesActions("value", ((target, action, path, value) => {
    target.onValueChange();
}));
}
    static __style = ``;
    constructor() { super(); 
    __getStatic() {
        return DocWcInheritanceEditor3Fillable;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcInheritanceEditor3Fillable.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'error':`<slot name="error"></slot>`,'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot name="error"></slot><label _id="docwcinheritanceeditor3fillable_0"></label><slot></slot><div _id="docwcinheritanceeditor3fillable_1"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "elements": [
    {
      "name": "debugEl",
      "ids": [
        "docwcinheritanceeditor3fillable_1"
      ]
    }
  ],
  "content": {
    "docwcinheritanceeditor3fillable_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__2980550fb954128e40272a8720bc87ddmethod0())}`,
      "once": true
    }
  }
});
    getClassName() {
        return "DocWcInheritanceEditor3Fillable";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('label')){ this['label'] = undefined; }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["value"] = undefined;
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('label');
    postCreation() {
        // print the new value
        this.onChange.add(() => {
            const line = document.createElement("DIV");
            line.innerHTML = this.value + "";
            this.debugEl.appendChild(line);
        });
    }
    __2980550fb954128e40272a8720bc87ddmethod0() {
        return this.label;
    }
}
DocWcInheritanceEditor3Fillable.Namespace=`AventusWebsite`;
_.DocWcInheritanceEditor3Fillable=DocWcInheritanceEditor3Fillable;

const DocWcInheritanceEditor4Checkbox = class DocWcInheritanceEditor4Checkbox extends DocWcInheritanceEditor3Fillable {
    static __style = ``;
    __getStatic() {
        return DocWcInheritanceEditor4Checkbox;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcInheritanceEditor4Checkbox.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<input type="checkbox" _id="docwcinheritanceeditor4checkbox_0" />` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "elements": [
    {
      "name": "inputEl",
      "ids": [
        "docwcinheritanceeditor4checkbox_0"
      ]
    }
  ]
});
    getClassName() {
        return "DocWcInheritanceEditor4Checkbox";
    }
    onValueChange() {
        this.inputEl.checked = this.value ?? false;
    }
}
DocWcInheritanceEditor4Checkbox.Namespace=`AventusWebsite`;
DocWcInheritanceEditor4Checkbox.Tag=`av-doc-wc-inheritance-editor-4-checkbox`;
_.DocWcInheritanceEditor4Checkbox=DocWcInheritanceEditor4Checkbox;
if(!window.customElements.get('av-doc-wc-inheritance-editor-4-checkbox')){window.customElements.define('av-doc-wc-inheritance-editor-4-checkbox', DocWcInheritanceEditor4Checkbox);Aventus.WebComponentInstance.registerDefinition(DocWcInheritanceEditor4Checkbox);}

const DocWcInheritanceEditor2Fillable = class DocWcInheritanceEditor2Fillable extends Aventus.WebComponent {
    static get observedAttributes() {return ["label"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'label'() { return this.getStringProp('label') }
    set 'label'(val) { this.setStringAttr('label', val) }
						return this.__watch["value"];
					}
					set 'value'(val) {
						this.__watch["value"] = val;
					}
    __registerWatchesActions() {
    this.__addWatchesActions("value", ((target, action, path, value) => {
    target.onValueChange();
}));
}
    static __style = ``;
    constructor() { super(); 
    __getStatic() {
        return DocWcInheritanceEditor2Fillable;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcInheritanceEditor2Fillable.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<label _id="docwcinheritanceeditor2fillable_0"></label><slot></slot><div _id="docwcinheritanceeditor2fillable_1"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "elements": [
    {
      "name": "debugEl",
      "ids": [
        "docwcinheritanceeditor2fillable_1"
      ]
    }
  ],
  "content": {
    "docwcinheritanceeditor2fillable_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__0f6c26f3f55eef41236d6907a804abf1method0())}`,
      "once": true
    }
  }
});
    getClassName() {
        return "DocWcInheritanceEditor2Fillable";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('label')){ this['label'] = undefined; }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["value"] = undefined;
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('label');
    postCreation() {
        // print the new value
        this.onChange.add(() => {
            const line = document.createElement("DIV");
            line.innerHTML = this.value + "";
            this.debugEl.appendChild(line);
        });
    }
    __0f6c26f3f55eef41236d6907a804abf1method0() {
        return this.label;
    }
}
DocWcInheritanceEditor2Fillable.Namespace=`AventusWebsite`;
_.DocWcInheritanceEditor2Fillable=DocWcInheritanceEditor2Fillable;

const DocWcCreateEditor4Clock = class DocWcCreateEditor4Clock extends Aventus.WebComponent {
    static get observedAttributes() {return ["color"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'color'() { return this.getStringProp('color') }
    set 'color'(val) { this.setStringAttr('color', val) }
						return this.__watch["timeTxt"];
					}
					set 'timeTxt'(val) {
						this.__watch["timeTxt"] = val;
					}
    this.__addWatchesActions("timeTxt");
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
    __registerTemplateAction() { super.__registerTemplateAction();
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
});
    getClassName() {
        return "DocWcCreateEditor4Clock";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('color')){ this['color'] = "red"; }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["timeTxt"] = undefined;
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('color');
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
DocWcCreateEditor4Clock.Namespace=`AventusWebsite`;
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
DocWcCreateEditor2Error.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'error':`<slot name="error"></slot>` }, 
        blocks: { 'error':`
    });
}
    getClassName() {
        return "DocWcCreateEditor3ErrorYellow";
    }
}
DocWcCreateEditor3ErrorYellow.Namespace=`AventusWebsite`;
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
DocWcCreateEditor1Button.Namespace=`AventusWebsite`;
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
    __getHtml() {
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
DocuImg.Namespace=`AventusWebsite`;
DocuImg.Tag=`av-docu-img`;
_.DocuImg=DocuImg;
if(!window.customElements.get('av-docu-img')){window.customElements.define('av-docu-img', DocuImg);Aventus.WebComponentInstance.registerDefinition(DocuImg);}

const DocIntroductionButton = class DocIntroductionButton extends Aventus.WebComponent {
    static get observedAttributes() {return ["count"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'count'() { return this.getNumberProp('count') }
    set 'count'(val) { this.setNumberAttr('count', val) }
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
    __registerTemplateAction() { super.__registerTemplateAction();
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
});
    getClassName() {
        return "DocIntroductionButton";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('count')){ this['count'] = 0; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('count');
    onClick() {
        this.count++;
    }
    __33f75d5e73a3504bfb45e6d176287749method0() {
        return this.count;
    }
}
DocIntroductionButton.Namespace=`AventusWebsite`;
DocIntroductionButton.Tag=`av-doc-introduction-button`;
_.DocIntroductionButton=DocIntroductionButton;
if(!window.customElements.get('av-doc-introduction-button')){window.customElements.define('av-doc-introduction-button', DocIntroductionButton);Aventus.WebComponentInstance.registerDefinition(DocIntroductionButton);}

const AvCode = class AvCode extends Aventus.WebComponent {
    static get observedAttributes() {return ["language", "filename"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'tab'() { return this.getNumberAttr('tab') }
    set 'tab'(val) { this.setNumberAttr('tab', val) }
    set 'language'(val) { this.setStringAttr('language', val) }
    set 'filename'(val) { this.setStringAttr('filename', val) }
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("language", ((target) => {
    if (window['Prism']) {
        if (!window['Prism'].languages.hasOwnProperty(target.language)) {
            target.language = 'plain';
        }
    }
}));
    static __style = `:host{--_code-padding: var(--code-padding, 30px 10px)}:host{border-radius:5px;display:flex;margin:.5em 0;overflow:hidden;position:relative;box-shadow:var(--elevation-3)}:host .filename{background-color:rgba(255,255,255,.3);display:none;font-size:12px;padding:5px;position:absolute;right:0;top:5px}:host pre{margin:0;padding:var(--_code-padding);width:100%}:host .hided{display:none}:host .language-css{color:#ce9178}:host([filename]) .filename{display:block}`;
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
        blocks: { 'default':`<span class="filename" _id="avcode_0"></span><pre>
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
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
});
    getClassName() {
        return "AvCode";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('tab')){ this['tab'] = undefined; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('tab');
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
AvCode.Namespace=`AventusWebsite`;
AvCode.Tag=`av-code`;
_.AvCode=AvCode;
if(!window.customElements.get('av-code')){window.customElements.define('av-code', AvCode);Aventus.WebComponentInstance.registerDefinition(AvCode);}

const CodeTabs = class CodeTabs extends Aventus.WebComponent {
    static get observedAttributes() {return ["tab"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'tab'() { return this.getNumberProp('tab') }
    set 'tab'(val) { this.setNumberAttr('tab', val) }
						return this.__watch["tabs"];
					}
					set 'tabs'(val) {
						this.__watch["tabs"] = val;
					}
    this.__addWatchesActions("tabs");
}
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("tab", ((target) => {
    target.onTabSelected();
}));
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
        blocks: { 'default':`<div class="header" _id="codetabs_0">
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
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
});
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
});
                    anchorId: 'codetabs_1',
                    template: templ0,
                simple:{data: "this.tabs",index:"i"}
    getClassName() {
        return "CodeTabs";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('tab')){ this['tab'] = 0; }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["tabs"] = [];
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('tab');
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
CodeTabs.Namespace=`AventusWebsite`;
CodeTabs.Tag=`av-code-tabs`;
_.CodeTabs=CodeTabs;
if(!window.customElements.get('av-code-tabs')){window.customElements.define('av-code-tabs', CodeTabs);Aventus.WebComponentInstance.registerDefinition(CodeTabs);}

const CodeEditorFile = class CodeEditorFile extends Aventus.WebComponent {
    static get observedAttributes() {return ["name", "icon"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'type'() { return this.getStringAttr('type') }
    set 'type'(val) { this.setStringAttr('type', val) }
    set 'active'(val) { this.setBoolAttr('active', val) }
    set 'highlight'(val) { this.setBoolAttr('highlight', val) }
    set 'name'(val) { this.setStringAttr('name', val) }
    set 'icon'(val) { this.setStringAttr('icon', val) }
    editor;
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("name", ((target) => {
    target.prepareIcon();
}));
    static __style = `:host{cursor:pointer;display:flex;font-size:1.4rem;margin-left:5px;margin-top:5px;padding:5px 15px;transition:.2s linear background-color}:host .name{align-items:center;display:flex;position:relative}:host .name mi-icon.icon{flex-shrink:0;font-size:1.4rem;margin-right:5px}:host .name av-img{--img-color: white;height:14px;margin-right:5px;width:14px}:host([active]){background-color:rgba(255,255,255,.2)}:host(:hover){background-color:rgba(255,255,255,.1)}:host([type=style]) .name av-img{--img-color: #E066DC}:host([type=view]) .name av-img{--img-color: #22AAEE}:host([type=logic]) .name av-img{--img-color: #E5540E}:host([highlight]) .name::after{content:"";position:absolute;right:-10px;top:2px;width:6px;height:6px;border-radius:3px;background-color:var(--aventus-color)}`;
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
        blocks: { 'default':`<div class="name">
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "content": {
    "codeeditorfile_2°@HTML": {
      "fct": (c) => `\r\n        ${c.print(c.comp.__69fe877e555301bf4ee6e8f11dd950f6method2())}\r\n    `,
      "once": true
    }
  }
});
  "content": {
    "codeeditorfile_1°src": {
      "fct": (c) => `${c.print(c.comp.__69fe877e555301bf4ee6e8f11dd950f6method1())}`,
      "once": true
    }
  }
});
                    anchorId: 'codeeditorfile_0',
                    parts: [{once: true,
                    condition: (c) => c.comp.__69fe877e555301bf4ee6e8f11dd950f6method0(),
                    template: templ0
                },{once: true,
                    condition: (c) => true,
                    template: templ1
                }]
            });
    getClassName() {
        return "CodeEditorFile";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('type')){ this['type'] = undefined; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('type');
    __listBoolProps() { return ["active","highlight"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    prepareIcon() {
        if (this.name.endsWith(".wcs.avt") || this.name.endsWith(".gs.avt")) {
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
        else if (this.name.endsWith(".html")) {
            this.icon = "/img/html-5.svg";
        }
        else if (this.name.endsWith(".json")) {
            this.icon = "/img/json.svg";
        }
        else if (this.name.endsWith(".js")) {
            this.icon = "/img/js.svg";
        }
        else if (this.name.endsWith(".d.ts")) {
            this.icon = "/img/dts.svg";
        }
        else if (this.name.endsWith(".ts")) {
            this.icon = "/img/ts.svg";
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
CodeEditorFile.Namespace=`AventusWebsite`;
CodeEditorFile.Tag=`av-code-editor-file`;
_.CodeEditorFile=CodeEditorFile;
if(!window.customElements.get('av-code-editor-file')){window.customElements.define('av-code-editor-file', CodeEditorFile);Aventus.WebComponentInstance.registerDefinition(CodeEditorFile);}

const DocFooter = class DocFooter extends Aventus.WebComponent {
    get 'hide_previous'() { return this.getBoolAttr('hide_previous') }
    set 'hide_previous'(val) { this.setBoolAttr('hide_previous', val) }
    set 'hide_next'(val) { this.setBoolAttr('hide_next', val) }
    nextState;
    static __style = `:host{align-items:center;display:flex;justify-content:center;margin:30px 0;width:100%}:host div{background-color:var(--aventus-color);border-radius:5px;box-shadow:var(--elevation-3);color:var(--aventus-font-color);cursor:pointer;font-size:16px;font-weight:400;margin:0 30px;padding:5px 15px;-webkit-tap-highlight-color:rgba(0,0,0,0);user-select:none;transition:box-shadow .2s linear}:host div:hover{box-shadow:var(--elevation-1)}:host([hide_next]) .next{opacity:0;visibility:hidden}:host([hide_previous]) .previous{opacity:0;visibility:hidden}`;
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
    __registerTemplateAction() { super.__registerTemplateAction();
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
});
    getClassName() {
        return "DocFooter";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('hide_previous')) { this.attributeChangedCallback('hide_previous', false, false); }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('hide_previous');
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
DocFooter.Namespace=`AventusWebsite`;
DocFooter.Tag=`av-doc-footer`;
_.DocFooter=DocFooter;
if(!window.customElements.get('av-doc-footer')){window.customElements.define('av-doc-footer', DocFooter);Aventus.WebComponentInstance.registerDefinition(DocFooter);}

const Collapse = class Collapse extends Aventus.WebComponent {
    get 'open'() { return this.getBoolAttr('open') }
    set 'open'(val) { this.setBoolAttr('open', val) }
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
        blocks: { 'default':`<div class="title" _id="collapse_0">
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "pressEvents": [
    {
      "id": "collapse_0",
      "onPress": (e, pressInstance, c) => { c.comp.toggleOpen(e, pressInstance); }
    }
  ]
});
    getClassName() {
        return "Collapse";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('open')) { this.attributeChangedCallback('open', false, false); }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('open');
    __listBoolProps() { return ["open"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    toggleOpen() {
        this.open = !this.open;
    }
}
Collapse.Namespace=`AventusWebsite`;
Collapse.Tag=`av-collapse`;
_.Collapse=Collapse;
if(!window.customElements.get('av-collapse')){window.customElements.define('av-collapse', Collapse);Aventus.WebComponentInstance.registerDefinition(Collapse);}

const CodeEditorFolder = class CodeEditorFolder extends Aventus.WebComponent {
    static get observedAttributes() {return ["name", "open"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'highlight'() { return this.getBoolAttr('highlight') }
    set 'highlight'(val) { this.setBoolAttr('highlight', val) }
    set 'name'(val) { this.setStringAttr('name', val) }
    set 'open'(val) { this.setBoolAttr('open', val) }
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
        blocks: { 'default':`<div class="name" _id="codeeditorfolder_0">
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
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
});
    getClassName() {
        return "CodeEditorFolder";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('highlight')) { this.attributeChangedCallback('highlight', false, false); }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('highlight');
    __listBoolProps() { return ["highlight","open"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
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
CodeEditorFolder.Namespace=`AventusWebsite`;
CodeEditorFolder.Tag=`av-code-editor-folder`;
_.CodeEditorFolder=CodeEditorFolder;
if(!window.customElements.get('av-code-editor-folder')){window.customElements.define('av-code-editor-folder', CodeEditorFolder);Aventus.WebComponentInstance.registerDefinition(CodeEditorFolder);}

const RoadMapItem = class RoadMapItem extends Aventus.WebComponent {
    static get observedAttributes() {return ["name"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'name'() { return this.getStringProp('name') }
    set 'name'(val) { this.setStringAttr('name', val) }
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
        blocks: { 'default':`<div class="card">
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "content": {
    "roadmapitem_0°@HTML": {
      "fct": (c) => `${c.print(c.comp.__2848ef13afde5ada8fbe23b5b1e684eamethod0())}`,
      "once": true
    }
  }
});
    getClassName() {
        return "RoadMapItem";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('name')){ this['name'] = undefined; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('name');
    __2848ef13afde5ada8fbe23b5b1e684eamethod0() {
        return this.name;
    }
}
RoadMapItem.Namespace=`AventusWebsite`;
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
        blocks: { 'default':`<div class="timeline">
    });
}
    getClassName() {
        return "RoadMap";
    }
}
RoadMap.Namespace=`AventusWebsite`;
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
        blocks: { 'default':`<div class="container">
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "content": {
    "footer_0°@HTML": {
      "fct": (c) => `Copyright © ${c.print(c.comp.__31eeb70e5471155d8536083fb321ab96method0())} Cobwebsite`,
      "once": true
    }
  }
});
    getClassName() {
        return "Footer";
    }
    __31eeb70e5471155d8536083fb321ab96method0() {
        return new Date().getFullYear();
    }
}
Footer.Namespace=`AventusWebsite`;
Footer.Tag=`av-footer`;
_.Footer=Footer;
if(!window.customElements.get('av-footer')){window.customElements.define('av-footer', Footer);Aventus.WebComponentInstance.registerDefinition(Footer);}

const Button = class Button extends Aventus.WebComponent {
    static __style = `:host{padding:10px 20px;color:var(--aventus-font-color);background-color:var(--aventus-color);border-radius:10px;transition:all var(--bezier-curve) .5s;cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host(:hover){color:var(--aventus-color);background-color:var(--secondary-color)}`;
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
Button.Namespace=`AventusWebsite`;
Button.Tag=`av-button`;
_.Button=Button;
if(!window.customElements.get('av-button')){window.customElements.define('av-button', Button);Aventus.WebComponentInstance.registerDefinition(Button);}

const Page = class Page extends Aventus.Navigation.Page {
    static __style = `:host{background-color:var(--secondary-color);height:100%;width:100%}:host .container{display:inline-block;height:100%;margin:auto;max-width:1000px;width:100%}`;
    constructor() { super(); 
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
        slots: { 'before-container':`<slot name="before-container"></slot>`,'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot name="before-container"></slot><div class="container">
    });
}
    getClassName() {
        return "Page";
    }
    pageTitle() {
        return this.Title();
    }
    pageDescription() {
        return this.Description();
    }
    pageKeywords() {
        return this.Keywords();
    }
}
Page.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<p>404</p><p>Not found</p>` }
    });
}
    getClassName() {
        return "Page404";
    }
    Title() {
        return "404 - Page Not Found";
    }
    Description() {
        return "Oops! The page you're looking for cannot be found. This might be due to a broken link, a mistyped URL, or the page might have been moved or deleted. Please check the URL and try again, or return to the homepage to find what you're looking for.";
    }
    Keywords() {
        return [
            "404 Error",
            "Page Not Found",
            "Aventus",
            "Web Development",
            "Error Page",
            "Page Error",
            "Not Found",
        ];
    }
}
Page404.Namespace=`AventusWebsite`;
Page404.Tag=`av-page-404`;
_.Page404=Page404;
if(!window.customElements.get('av-page-404')){window.customElements.define('av-page-404', Page404);Aventus.WebComponentInstance.registerDefinition(Page404);}

const Home = class Home extends Page {
    static __style = `:host{height:100%;width:100%}:host .container{max-width:none}:host .height-wrapper{flex-grow:1}:host .main-scroll::part(content-wrapper){display:flex;flex-direction:column;min-height:100%}:host .main{background-color:var(--light-primary-color);display:flex;flex-direction:column;height:500px;overflow:hidden;padding:50px 0;position:relative;width:100%}:host .main .icon-text{align-items:center;flex-grow:1;margin:auto;max-width:1000px;width:100%;z-index:2}:host .main .icon-text av-img{--img-color: var(--aventus-color);flex-shrink:0;height:250px;margin:auto;transition:all linear .5s;width:250px}:host .main .icon-text av-dynamic-col:nth-child(2){flex-direction:row;justify-content:right}:host .main .icon-text .title{color:var(--primary-font-color);font-size:64px;margin-bottom:10px}:host .main .icon-text .sub-title{color:var(--primary-font-color);font-size:24px}:host .main .btn-container{margin:auto;z-index:2}:host .main .btn-container av-dynamic-col{flex-direction:row;justify-content:center}:host .main .btn-container av-dynamic-col av-button{margin:0 10px}:host .main av-img.design-logo{--img-color: rgb(200, 200, 200);height:150%;left:-200px;opacity:.3;position:absolute;top:30px;z-index:1}:host .main av-img.design-logo2{--img-color: rgb(200, 200, 200);height:150%;opacity:.3;position:absolute;right:-200px;top:30px;transform:rotate(180deg);z-index:1}:host .blocks{margin:50px auto;max-width:1200px}:host .blocks av-dynamic-col{padding:10px 20px}:host .blocks av-dynamic-col .block{background-color:var(--light-primary-color);border-radius:5px;box-shadow:var(--elevation-5);color:var(--primary-font-color);display:flex;flex-direction:column;height:100%;padding:30px;padding-bottom:20px;width:100%}:host .blocks av-dynamic-col .block .title{font-size:28px;font-weight:bold;letter-spacing:1px}:host .blocks av-dynamic-col .block p{align-items:center;display:flex;flex-grow:1;margin:0;text-align:justify}:host .blocks av-dynamic-col .block .icon{margin:25px 0;text-align:center}:host .blocks av-dynamic-col .block .icon mi-icon{font-size:60px}:host .blocks av-dynamic-col:nth-child(2) .block{background-color:var(--aventus-color)}:host .separator{background:linear-gradient(90deg, transparent 0%, var(--text-color) 50%, transparent 100%);height:1px;margin:auto;width:75%}:host .why{margin:50px auto;max-width:1200px;padding:0 50px}:host .why h2{color:var(--title-color)}:host .why p{color:var(--text-color);font-size:18px;text-align:justify}:host .why .important{font-size:20px;font-weight:600}@media screen and (max-width: 505px){:host .main .icon-text{flex-direction:column}:host .main .icon-text av-dynamic-col{justify-content:center !important;text-align:center;width:100%}:host .main .icon-text av-img{margin:20px 0px;height:200px;width:200px}}`;
    __getStatic() {
        return Home;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(Home.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<av-scrollable floating_scroll class="main-scroll">
    });
}
    getClassName() {
        return "Home";
    }
    Title() {
        return "Aventus: The Web Component Framework for Scalable, Type-Safe Development";
    }
    Description() {
        return "Explore Aventus, a JavaScript framework that leverages web components to build scalable applications with encapsulation, object-oriented programming, and type safety. Aventus offers an easy installation process and rapid project setup, exclusively as a VSCode extension, to enhance productivity and streamline web development.";
    }
    Keywords() {
        return [
            "Aventus framework",
            "web components",
            "JavaScript framework",
            "encapsulation",
            "type safety",
            "object-oriented programming",
            "scalable applications",
            "VSCode extension",
            "rapid project setup",
            "web development tools",
        ];
    }
}
Home.Namespace=`AventusWebsite`;
Home.Tag=`av-home`;
_.Home=Home;
if(!window.customElements.get('av-home')){window.customElements.define('av-home', Home);Aventus.WebComponentInstance.registerDefinition(Home);}

const About = class About extends Page {
    static __style = `:host{height:100%;width:100%}:host a{color:var(--link-color);text-decoration:none}:host .height-wrapper{flex-grow:1}:host .main-scroll::part(content-wrapper){display:flex;flex-direction:column;min-height:100%}:host>.container{max-width:none}:host .main{background-color:var(--light-primary-color);display:flex;flex-direction:column;height:400px;overflow:hidden;padding:50px 0;position:relative;width:100%}:host .main .title{align-items:center;color:var(--aventus-color);display:flex;font-size:100px;font-variant:small-caps;font-weight:bold;height:100%;justify-content:center;letter-spacing:2px;margin-bottom:40px;padding:0px 20px;text-align:center;width:100%;z-index:2}:host .main av-img.design-logo{--img-color: rgb(200, 200, 200);height:150%;left:-200px;opacity:.3;position:absolute;top:30px;z-index:1}:host .main av-img.design-logo2{--img-color: rgb(200, 200, 200);height:150%;opacity:.3;position:absolute;right:-200px;top:30px;transform:rotate(180deg);z-index:1}:host av-scrollable .container{display:flex}:host .tabs{width:100%}:host .tabs .header{align-items:center;border-bottom:1px solid rgba(229,84,14,.5333333333);border-bottom:1px solid var(--aventus-color);display:flex;height:50px;margin-top:50px;padding:0px 10px;width:100%}:host .tabs .header .tab{align-items:center;background-color:var(--primary-color);border-top-left-radius:5px;border-top-right-radius:5px;cursor:pointer;display:flex;height:100%;margin:0 5px;padding:0 15px;position:relative;color:var(--primary-font-color)}:host .tabs .header .tab:not(.active):hover{background-color:var(--aventus-color)}:host .tabs .header .tab:first-child{margin-left:0}:host .tabs .header .tab.active{background-color:var(--aventus-color)}:host .tabs .body{padding:0 15px}:host .tabs .body .tab{display:none}:host .tabs .body .tab.active{display:block}:host .tabs .body p{font-size:18px;text-align:justify;line-height:1.8}:host .tabs h2{color:var(--title-color);text-align:center}:host .tabs .help-us{margin:auto;max-width:530px;text-align:justify}:host .tabs .cards{align-items:center;display:flex;justify-content:center;margin-bottom:40px;margin-top:40px;width:100%}:host .tabs .cards .card{align-items:center;background-color:var(--light-primary-color);border-radius:15px;display:flex;flex-direction:column;flex-grow:1;justify-content:center;max-width:500px;position:relative;box-shadow:var(--elevation-3)}:host .tabs .cards .card .img{background-position:center center;background-repeat:no-repeat;background-size:cover;border-radius:100px;height:200px;margin:20px 0;width:200px}:host .tabs .cards .card .name{color:var(--aventus-color);font-size:25px}:host .tabs .cards .card .position{color:rgba(229,84,14,.6);font-size:20px;margin-bottom:10px}:host .tabs .cards .card .location{color:var(--primary-font-color);font-size:16px}:host .tabs .cards .card .language{color:var(--primary-font-color);font-size:16px;margin-bottom:20px}:host .tabs .cards .card .sponsor{align-items:center;border:1px solid var(--primary-font-color);border-radius:5px;cursor:pointer;display:flex;justify-content:center;margin-bottom:10px;padding:5px 15px;transition:border .2s linear;text-decoration:none}:host .tabs .cards .card .sponsor svg{fill:var(--primary-font-color);height:20px;transition:fill .2s linear;width:20px}:host .tabs .cards .card .sponsor span{color:var(--primary-font-color);margin-left:10px;transition:color .2s linear}:host .tabs .cards .card .sponsor:hover{border:1px solid var(--aventus-color)}:host .tabs .cards .card .sponsor:hover svg{fill:var(--aventus-color)}:host .tabs .cards .card .sponsor:hover span{color:var(--aventus-color)}:host .tabs .cards .card .github{height:30px;position:absolute;right:20px;top:20px;width:30px}:host .tabs .cards .card .github svg{cursor:pointer;fill:var(--primary-font-color);transition:.2s fill linear}:host .tabs .cards .card .github:hover svg{fill:#000}:host .tabs .tab[name=sponsor]{padding-bottom:40px}@media screen and (max-width: 400px){:host .main .title{font-size:80px}}`;
    __getStatic() {
        return About;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(About.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<av-scrollable floating_scroll class="main-scroll">
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
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
});
    getClassName() {
        return "About";
    }
    Title() {
        return "Aventus - About";
    }
    Description() {
        return "Discover the future plans for Aventus, developed by Cobwebsite. Learn about our dedicated team and how you can contribute to the project through direct support or sponsorship. Join us in enhancing web development and empowering developers with Aventus.";
    }
    Keywords() {
        return [
            "Aventus roadmap",
            "Cobwebsite team",
            "web development sponsorship",
            "support Aventus",
            "become a sponsor",
            "enhance web tools",
            "developer resources",
            "web development project",
            "programming sponsorship"
        ];
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
}
About.Namespace=`AventusWebsite`;
About.Tag=`av-about`;
_.About=About;
if(!window.customElements.get('av-about')){window.customElements.define('av-about', About);Aventus.WebComponentInstance.registerDefinition(About);}

let IconLib=class IconLib {
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
IconLib.Namespace=`AventusWebsite`;
_.IconLib=IconLib;

const Icon = class Icon extends Aventus.WebComponent {
    static get observedAttributes() {return ["icon"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'icon'() { return this.getStringProp('icon') }
    set 'icon'(val) { this.setStringAttr('icon', val) }
    __registerPropertiesActions() { super.__registerPropertiesActions(); this.__addPropertyActions("icon", ((target) => {
    if (target.icon) {
        target.spanEl.style.setProperty("--icon-code", IconLib.getIcon(target.icon));
    }
}));
    static __style = `:host span{display:var(--fa-display, inline-block);font-family:"Font Awesome 6 Free";-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-style:normal;font-variant:normal;font-weight:900;line-height:1;text-rendering:auto}:host span:before{content:var(--icon-code)}`;
    constructor() {
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
    __registerTemplateAction() { super.__registerTemplateAction();
  "elements": [
    {
      "name": "spanEl",
      "ids": [
        "icon_0"
      ]
    }
  ]
});
    getClassName() {
        return "Icon";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('icon')){ this['icon'] = undefined; }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('icon');
}
Icon.Namespace=`AventusWebsite`;
Icon.Tag=`av-icon`;
_.Icon=Icon;
if(!window.customElements.get('av-icon')){window.customElements.define('av-icon', Icon);Aventus.WebComponentInstance.registerDefinition(Icon);}

const Navbar = class Navbar extends Aventus.WebComponent {
    get 'open'() { return this.getBoolAttr('open') }
    set 'open'(val) { this.setBoolAttr('open', val) }
    set 'is_dark'(val) { this.setBoolAttr('is_dark', val) }
    constructor() {
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
        blocks: { 'default':`<div class="container">
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "pressEvents": [
    {
      "id": "navbar_0",
      "onPress": (e, pressInstance, c) => { c.comp.closeMenu(e, pressInstance); }
    },
    {
      "id": "navbar_1",
      "onPress": (e, pressInstance, c) => { c.comp.toggleMode(e, pressInstance); }
    },
    {
      "id": "navbar_2",
      "onPress": (e, pressInstance, c) => { c.comp.openMenu(e, pressInstance); }
    },
    {
      "id": "navbar_3",
      "onPress": (e, pressInstance, c) => { c.comp.closeMenu(e, pressInstance); }
    }
  ]
});
    getClassName() {
        return "Navbar";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('open')) { this.attributeChangedCallback('open', false, false); }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('open');
    __listBoolProps() { return ["open","is_dark"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
    openMenu() {
        this.open = true;
    }
    closeMenu() {
        this.open = false;
    }
    toggleMode() {
        document.querySelector("html")?.classList.toggle("dark");
        if (document.querySelector("html")?.classList.contains("dark")) {
            this.is_dark = true;
            localStorage.setItem("mode", "dark");
        }
        else {
            this.is_dark = false;
            localStorage.removeItem("mode");
        }
    }
}
Navbar.Namespace=`AventusWebsite`;
Navbar.Tag=`av-navbar`;
_.Navbar=Navbar;
if(!window.customElements.get('av-navbar')){window.customElements.define('av-navbar', Navbar);Aventus.WebComponentInstance.registerDefinition(Navbar);}

const TutorialSidenav = class TutorialSidenav extends Aventus.WebComponent {
    static __style = `:host{background-color:var(--light-primary-color);font-size:14px;padding:30px;padding-right:5px;width:300px}:host .menu{height:100%;width:100%;z-index:2}:host .menu av-collapse{width:100%}:host .menu av-collapse .title{color:var(--aventus-color);font-size:18px;font-variant:small-caps;font-weight:bold;margin-bottom:5px;margin-top:15px}:host .menu av-collapse ul{margin:0;padding:0}:host .menu av-collapse ul li{color:var(--primary-font-color);cursor:pointer;font-size:12px;letter-spacing:1px;list-style:none;margin:6px;margin-left:15px;padding:0;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host .menu av-collapse ul li av-router-link{user-select:none;transition:opacity .3s var(--bezier-curve)}:host .menu av-collapse ul li av-router-link:not(.active):hover{opacity:.7}:host .menu av-collapse ul li av-router-link.active{color:var(--aventus-color)}:host .menu av-collapse ul li av-router-link.active::before{background-color:var(--aventus-color);bottom:0;content:"";left:-15px;position:absolute;top:0;width:5px}:host .close-icon{color:var(--aventus-color);font-size:24px;position:absolute;right:24px;top:12px;display:none}@media screen and (max-width: 1100px){:host .menu av-collapse ul li{margin:12px;margin-left:15px;font-size:16px}:host .close-icon{display:block}}`;
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
        blocks: { 'default':`<av-icon icon="close" class="close-icon" _id="tutorialsidenav_0"></av-icon><av-scrollable class="menu">
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "pressEvents": [
    {
      "id": "tutorialsidenav_0",
      "onPress": (e, pressInstance, c) => { c.comp.closeNav(e, pressInstance); }
    }
  ]
});
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
                let state = all[index - 1].state;
                if (state) {
                    result.previous = state;
                }
            }
            if (index < all.length - 1) {
                let state = all[index + 1].state;
                if (state) {
                    result.next = state;
                }
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
TutorialSidenav.Namespace=`AventusWebsite`;
TutorialSidenav.Tag=`av-tutorial-sidenav`;
_.TutorialSidenav=TutorialSidenav;
if(!window.customElements.get('av-tutorial-sidenav')){window.customElements.define('av-tutorial-sidenav', TutorialSidenav);Aventus.WebComponentInstance.registerDefinition(TutorialSidenav);}

const DocSidenav = class DocSidenav extends Aventus.WebComponent {
    static __style = `:host{background-color:var(--light-primary-color);font-size:14px;padding:30px;padding-right:5px;width:300px}:host .menu{height:100%;width:100%;z-index:2}:host .menu av-collapse{width:100%}:host .menu av-collapse .title{color:var(--aventus-color);font-size:18px;font-variant:small-caps;font-weight:bold;margin-bottom:5px;margin-top:15px}:host .menu av-collapse ul{margin:0;padding:0}:host .menu av-collapse ul li{color:var(--primary-font-color);cursor:pointer;font-size:12px;letter-spacing:1px;list-style:none;margin:6px;margin-left:15px;padding:0;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host .menu av-collapse ul li av-router-link{user-select:none;transition:opacity .3s var(--bezier-curve)}:host .menu av-collapse ul li av-router-link:not(.active):hover{opacity:.7}:host .menu av-collapse ul li av-router-link.active{color:var(--aventus-color)}:host .menu av-collapse ul li av-router-link.active::before{background-color:var(--aventus-color);bottom:0;content:"";left:-15px;position:absolute;top:0;width:5px}:host .close-icon{color:var(--aventus-color);font-size:24px;position:absolute;right:24px;top:12px;display:none}@media screen and (max-width: 1100px){:host .menu av-collapse ul li{margin:12px;margin-left:15px;font-size:16px}:host .close-icon{display:block}}`;
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
        blocks: { 'default':`<av-icon icon="close" class="close-icon" _id="docsidenav_0"></av-icon><av-scrollable class="menu">
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "pressEvents": [
    {
      "id": "docsidenav_0",
      "onPress": (e, pressInstance, c) => { c.comp.closeNav(e, pressInstance); }
    }
  ]
});
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
                let state = all[index - 1].state;
                if (state) {
                    result.previous = state;
                }
            }
            if (index < all.length - 1) {
                let state = all[index + 1].state;
                if (state) {
                    result.next = state;
                }
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
DocSidenav.Namespace=`AventusWebsite`;
DocSidenav.Tag=`av-doc-sidenav`;
_.DocSidenav=DocSidenav;
if(!window.customElements.get('av-doc-sidenav')){window.customElements.define('av-doc-sidenav', DocSidenav);Aventus.WebComponentInstance.registerDefinition(DocSidenav);}

const DocGenericPage = class DocGenericPage extends Page {
    get 'fade'() { return this.getBoolAttr('fade') }
    set 'fade'(val) { this.setBoolAttr('fade', val) }
    constructor() { super(); 
    __getStatic() {
        return DocGenericPage;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocGenericPage.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-scrollable floating_scroll>
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "pressEvents": [
    {
      "id": "docgenericpage_0",
      "onPress": (e, pressInstance, c) => { c.comp.openMenu(e, pressInstance); }
    }
  ]
});
    getClassName() {
        return "DocGenericPage";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('fade')) { this.attributeChangedCallback('fade', false, false); }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('fade');
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
}
DocGenericPage.Namespace=`AventusWebsite`;
_.DocGenericPage=DocGenericPage;

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Library - Watcher</h1><p>In the Aventus framework, watchable objects serve as dynamic data structures that enable developers to monitor
    });
}
    getClassName() {
        return "DocLibWatcher";
    }
    Title() {
        return 'AventusJs - Watcher';
    }
    Description() {
        return 'Implement reactivity inside your application with Watcher';
    }
    Keywords() {
        return ["Watcher", "Reactivity", "Proxy", "Computed", "Effect"];
    }
}
DocLibWatcher.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Library - ResourceLoader</h1><p>To load content from uri, you can use the fetch API in mordern browser. The only problem is that every time you need
    });
}
    getClassName() {
        return "DocLibResourceLoader";
    }
    Title() {
        return "AventusJs - Resource Loader";
    }
    Description() {
        return "Load resource inside your code to avoid duplication";
    }
    Keywords() {
        return ['resource', "duplication", "url", "uri"];
    }
}
DocLibResourceLoader.Namespace=`AventusWebsite`;
DocLibResourceLoader.Tag=`av-doc-lib-resource-loader`;
_.DocLibResourceLoader=DocLibResourceLoader;
if(!window.customElements.get('av-doc-lib-resource-loader')){window.customElements.define('av-doc-lib-resource-loader', DocLibResourceLoader);Aventus.WebComponentInstance.registerDefinition(DocLibResourceLoader);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Library - Instance</h1><p>Sometimes you must create unique instance of a class. This pattern is named <span class="cn"><a href="https://www.tutorialspoint.com/design_pattern/singleton_pattern.htm" target="_blank">Singleton</a></span>. Despite the controversy over whether this pattern is a good choice for
    });
}
    getClassName() {
        return "DocLibInstance";
    }
    Title() {
        return "AventusJs - Instance";
    }
    Description() {
        return "AventusJs - Create singleton";
    }
    Keywords() {
        return ["Singleton", "Instance", "GetInstance"];
    }
}
DocLibInstance.Namespace=`AventusWebsite`;
DocLibInstance.Tag=`av-doc-lib-instance`;
_.DocLibInstance=DocLibInstance;
if(!window.customElements.get('av-doc-lib-instance')){window.customElements.define('av-doc-lib-instance', DocLibInstance);Aventus.WebComponentInstance.registerDefinition(DocLibInstance);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Library</h1><p>In this section you are going to learn what is a library and how you can create it inside Aventus.</p><h2>Definition</h2><p>A library is a piece of code that isn't matching any previous file type. This is the only file type that can contain
    });
}
    getClassName() {
        return "DocLibCreate";
    }
    Title() {
        return "AventusJs - Lib file";
    }
    Description() {
        return "Understand how to create lib file and use it";
    }
    Keywords() {
        return ["Lib file", "Library", "Custom code", "Function", "Const"];
    }
}
DocLibCreate.Namespace=`AventusWebsite`;
DocLibCreate.Tag=`av-doc-lib-create`;
_.DocLibCreate=DocLibCreate;
if(!window.customElements.get('av-doc-lib-create')){window.customElements.define('av-doc-lib-create', DocLibCreate);Aventus.WebComponentInstance.registerDefinition(DocLibCreate);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Select element</h1><p>In this section you are going to learn how to select a element from your shadowroot to use it inside your logical
    });
}
    getClassName() {
        return "DocWcElement";
    }
    Title() {
        return "AventusJs - Element";
    }
    Description() {
        return "Reference your view element inside your class";
    }
    Keywords() {
        return ["View", "Element", "Reference", "ref"];
    }
}
DocWcElement.Namespace=`AventusWebsite`;
DocWcElement.Tag=`av-doc-wc-element`;
_.DocWcElement=DocWcElement;
if(!window.customElements.get('av-doc-wc-element')){window.customElements.define('av-doc-wc-element', DocWcElement);Aventus.WebComponentInstance.registerDefinition(DocWcElement);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Configuration - Libraries</h1><p>When you create a build, you might like to import a library to reuse some code parts. Here you are going to learn how
    });
}
    getClassName() {
        return "DocConfigLib";
    }
    Title() {
        return "How to Configure and Import Libraries in AventusJs Builds";
    }
    Description() {
        return "Learn how to configure and import libraries in AventusJs builds, including setting up library URIs, managing dependencies, and controlling code inclusion in your output files. This guide covers local libraries, predefined Aventus libraries, and HTTP-based imports for seamless code reuse.";
    }
    Keywords() {
        return [
            "AventusJs library configuration",
            "importing libraries in AventusJs",
            "Aventus build libraries",
            "URI setup AventusJs",
            "Aventus dependency management",
            "JavaScript library inclusion",
            "Aventus local libraries",
            "Aventus HTTP imports",
            "AventusJs coding guide",
            "sub-dependency inclusion",
        ];
    }
}
DocConfigLib.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Configuration - Static</h1><p>Even if Aventus is great for your project, you will need others files like .html, .png, etc. You can put your source file inside a static folder that will be exported.</p><h2>Properties</h2><div class="table">
    });
}
    getClassName() {
        return "DocConfigStatic";
    }
    Title() {
        return "How to Manage Static Files in AventusJs: A Complete Guide";
    }
    Description() {
        return "Discover how to efficiently manage and export static files in AventusJs, including HTML, PNG, and Sass files. This guide explains setting up static input and output folders, using special files like Sass for CSS compilation, and leveraging global styles for web development.";
    }
    Keywords() {
        return [
            "AventusJs static files",
            "managing static assets",
            "Aventus static configuration",
            "exporting static files",
            "Sass to CSS compilation",
            "Aventus global styles",
            "web development tools",
            "Aventus special files",
            "static folder setup",
            "AventusJs guide",
        ];
    }
}
DocConfigStatic.Namespace=`AventusWebsite`;
DocConfigStatic.Tag=`av-doc-config-static`;
_.DocConfigStatic=DocConfigStatic;
if(!window.customElements.get('av-doc-config-static')){window.customElements.define('av-doc-config-static', DocConfigStatic);Aventus.WebComponentInstance.registerDefinition(DocConfigStatic);}

const DocConfigBuild = class DocConfigBuild extends DocGenericPage {
    static __style = `:host .table av-dynamic-row:not(.header) av-dynamic-col{text-align:left}:host .table av-dynamic-row:not(.header) av-dynamic-col:nth-child(2){text-align:justify}:host .table av-dynamic-row:not(.header) av-router-link,:host .table av-dynamic-row:not(.header) b,:host .table av-dynamic-row:not(.header) i{display:contents}:host .table .constraint{display:block;font-size:14px;margin-top:5px}:host .table .darker{background-color:rgba(0,0,0,.1)}:host .table .lvl-1 av-dynamic-col:first-child{padding-left:30px}:host .table .lvl-2 av-dynamic-col:first-child{padding-left:40px}:host .table .lvl-3 av-dynamic-col:first-child{padding-left:50px}`;
    __getStatic() {
        return DocConfigBuild;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocConfigBuild.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Configuration - Build</h1><p>Inside a module, you can split you code into differents submodules. Inside Aventus, this submodule is called a
    });
}
    getClassName() {
        return "DocConfigBuild";
    }
    Title() {
        return "Comprehensive Guide to Configuring Builds in AventusJs";
    }
    Description() {
        return "Explore how to configure builds in AventusJs to manage submodules and compile your code effectively. This guide details the setup of build names, input and output options, NPM exports, Storybook integration, and namespace strategies for optimized JavaScript and Aventus package development.";
    }
    Keywords() {
        return [
            "AventusJs build configuration",
            "JavaScript build setup",
            "Aventus submodules",
            "NPM export configuration",
            "Storybook integration",
            "AventusJs compile options",
            "namespace strategies",
            "Aventus package files",
            "web development tools",
            "Aventus advanced guide",
        ];
    }
}
DocConfigBuild.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Configuration - Basic info</h1><p>To create an application with Aventus, you need to define a file named <span class="cn">aventus.conf.avt</span>. This file will define
    });
}
    getClassName() {
        return "DocConfigBasic";
    }
    Title() {
        return "Basic Configuration Guide for AventusJs: Setting Up aventus.conf.avt";
    }
    Description() {
        return "Learn how to configure your AventusJs application by setting up the aventus.conf.avt file. This guide explains essential properties such as module name, versioning, component prefixes, and more to ensure your project is properly structured and optimized.";
    }
    Keywords() {
        return [
            "AventusJs configuration",
            "aventus.conf.avt setup",
            "module creation",
            "AventusJs basic info",
            "web component prefix",
            "versioning in AventusJs",
            "AventusJs build options",
            "JavaScript project setup",
            "AventusJs guide",
            "configuration properties",
        ];
    }
}
DocConfigBasic.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Installation</h1><h2>Basic install</h2><p>Aventus is actually only available as a <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=Cobwebsite.aventus" rel="noopener noreferrer">vscode extension</a>. You can download it directly inside the vscode extensions
    });
}
    getClassName() {
        return "DocInstallation";
    }
    Title() {
        return "How to Install and Use Aventus Extension in VSCode";
    }
    Description() {
        return "Learn how to install the Aventus extension in Visual Studio Code and get started with essential commands. Find out how to reload the window, compile builds, export static folders, import templates, and access Aventus storage. The source code is available on GitHub.";
    }
    Keywords() {
        return [
            "Aventus installation",
            "VSCode Aventus extension",
            "install Aventus VSCode",
            "Aventus commands",
            "reload VSCode window",
            "compile Aventus build",
            "export static folder Aventus",
            "import Aventus templates",
            "access Aventus storage",
            "Aventus GitHub source code",
        ];
    }
}
DocInstallation.Namespace=`AventusWebsite`;
DocInstallation.Tag=`av-doc-installation`;
_.DocInstallation=DocInstallation;
if(!window.customElements.get('av-doc-installation')){window.customElements.define('av-doc-installation', DocInstallation);Aventus.WebComponentInstance.registerDefinition(DocInstallation);}

const CodeEditor = class CodeEditor extends Aventus.WebComponent {
    static get observedAttributes() {return ["name", "show"].concat(super.observedAttributes).filter((v, i, a) => a.indexOf(v) === i);}
    get 'has_result'() { return this.getBoolAttr('has_result') }
    set 'has_result'(val) { this.setBoolAttr('has_result', val) }
    set 'all_open'(val) { this.setBoolAttr('all_open', val) }
    set 'open_folder'(val) { this.setStringAttr('open_folder', val) }
    set 'show_menu'(val) { this.setBoolAttr('show_menu', val) }
    set 'highlights'(val) { this.setStringAttr('highlights', val) }
    set 'name'(val) { this.setStringAttr('name', val) }
    set 'show'(val) { this.setStringAttr('show', val) }
    files = {};
    folders = {};
    openedFile;
    static __style = `:host{--_code-editor-menu-width: var(--code-editor-menu-width, 250px)}:host{--code-padding: 0;background-color:#1e1e1e;border-radius:5px;box-shadow:var(--elevation-3);color:#fff;display:flex;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;margin-bottom:15px;overflow:hidden;width:100%}:host .header{align-items:center;border-bottom:1px solid #414141;display:flex;flex-shrink:0;height:50px;justify-content:center;padding:10px;position:relative;width:100%}:host .header mi-icon.menu-icon{cursor:pointer;display:none;left:10px;position:absolute;transition:background-color .5s var(--bezier-curve)}:host .header mi-icon.download{cursor:pointer;position:absolute;right:10px;transition:background-color .5s var(--bezier-curve)}:host .header mi-icon.menu-icon:hover,:host .header mi-icon.download:hover{background-color:rgba(255,255,255,.1)}:host .header span{display:block;padding:0 50px;text-align:center;width:100%}:host .content{display:flex;flex-grow:1;height:calc(100% - 50px);max-height:550px;min-height:300px;padding:0 10px;position:relative}:host .content .menu{flex-shrink:0;height:100%;min-width:20px;min-width:20px;padding-bottom:10px;width:var(--_code-editor-menu-width)}:host .content .separator{cursor:col-resize;flex-grow:0;flex-shrink:0;inset:0;position:relative;width:5px}:host .content .separator::after{background-color:#414141;bottom:0;content:"";left:2px;position:absolute;top:0;width:1px}:host .content .display{--scrollbar-content-padding: 5px 15px;height:100%;padding-bottom:10px;width:100%}:host .content .display av-code{box-shadow:none}:host .result{border:1px solid #1e1e1e;border-top:1px solid #414141;display:none;padding:15px}:host .result .title{margin-bottom:15px}:host .hidden{display:none}:host([has_result]) .result{display:block}@media screen and (max-width: 768px){:host .header mi-icon.menu-icon{display:inline-block}:host .content .menu{background-color:#1e1e1e;border-right:1px solid #414141;left:0;position:absolute;top:0;transform:translate(-100%);transition:transform .4s var(--bezier-curve);width:250px !important;z-index:20}:host .content .separator{display:none}:host([show_menu]) .header mi-icon.menu-icon{background-color:rgba(255,255,255,.1)}:host([show_menu]) .content .menu{transform:translate(0)}}`;
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
        blocks: { 'default':`<div class="header">
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "elements": [
    {
      "name": "contentEl",
      "ids": [
        "codeeditor_3"
      ]
    },
    {
      "name": "menuEl",
      "ids": [
        "codeeditor_4"
      ]
    },
    {
      "name": "separatorEl",
      "ids": [
        "codeeditor_5"
      ]
    },
    {
      "name": "displayEl",
      "ids": [
        "codeeditor_6"
      ]
    }
  ],
  "content": {
    "codeeditor_1°@HTML": {
      "fct": (c) => `${c.print(c.comp.__ba370266f2a97b2bf5e2f53b06f1742amethod0())}`,
      "once": true
    }
  },
  "pressEvents": [
    {
      "id": "codeeditor_0",
      "onPress": (e, pressInstance, c) => { c.comp.toggleMenu(e, pressInstance); }
    },
    {
      "id": "codeeditor_2",
      "onPress": (e, pressInstance, c) => { c.comp.download(e, pressInstance); }
    }
  ]
});
    getClassName() {
        return "CodeEditor";
    }
    __defaultValues() { super.__defaultValues(); if(!this.hasAttribute('has_result')) { this.attributeChangedCallback('has_result', false, false); }
    __upgradeAttributes() { super.__upgradeAttributes(); this.__upgradeProperty('has_result');
    __listBoolProps() { return ["has_result","all_open","show_menu"].concat(super.__listBoolProps()).filter((v, i, a) => a.indexOf(v) === i); }
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
    toggleMenu() {
        this.show_menu = !this.show_menu;
    }
    openFile(file, path) {
        if (this.openedFile) {
            this.openedFile.active = false;
            this.openedFile.code.parentNode?.removeChild(this.openedFile.code);
        }
        this.openedFile = file;
        this.openedFile.active = true;
        this.displayEl.appendChild(this.openedFile.code);
        if (path) {
            this.openFolder(path);
        }
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
            else if (element.getAttribute("folder")) {
                this.store(element.getAttribute("folder") ?? '');
            }
        }
        this.menuEl.innerHTML = "";
        this.renderMenu(this.info, this.menuEl);
        this.openFolderAfterRender();
        this.has_result = this.getElementsInSlot("result").length > 0;
    }
    openFolder(path) {
        let splitted = path.split("/");
        let currentPath = "";
        for (let i = 0; i < splitted.length; i++) {
            currentPath += splitted[i];
            if (this.folders[currentPath]) {
                this.folders[currentPath].open = true;
            }
            else if (this.folders["/" + currentPath]) {
                this.folders["/" + currentPath].open = true;
            }
            currentPath += "/";
        }
    }
    closeFolder(path) {
        if (this.folders[path]) {
            this.folders[path].open = false;
        }
    }
    renderMenu(info, el, path = "") {
        let highlights = [];
        if (this.highlights) {
            try {
                highlights = JSON.parse(this.highlights);
                for (let i = 0; i < highlights.length; i++) {
                    if (!highlights[i].startsWith("/")) {
                        highlights[i] = '/' + highlights[i];
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        let names = Object.keys(info).sort();
        for (let name of names) {
            let current = info[name];
            if (!current.file) {
                let folder = new CodeEditorFolder();
                folder.name = name;
                let newPath = path + "/" + name;
                if (this.all_open) {
                    folder.open = true;
                }
                if (highlights.includes(newPath)) {
                    folder.highlight = true;
                }
                this.folders[newPath] = folder;
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
                if (highlights.includes(newPath)) {
                    file.highlight = true;
                }
                file.editor = this;
                file.name = name;
                this.files[newPath] = file;
                el.appendChild(file);
                if (this.show) {
                    if (this.comparePath(this.show, newPath)) {
                        this.openFile(file, path);
                    }
                }
                else {
                    if (!this.openedFile) {
                        this.openFile(file, path);
                    }
                }
            }
        }
    }
    openFolderAfterRender() {
        if (this.open_folder) {
            if (this.open_folder.startsWith("[")) {
                try {
                    let folders = JSON.parse(this.open_folder);
                    for (let folder of folders) {
                        this.openFolder(folder);
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
            else {
                this.openFolder(this.open_folder);
            }
        }
    }
    comparePath(p1, p2) {
        if (p2.startsWith("/")) {
            p2 = p2.slice(1);
        }
        if (p1.startsWith("/")) {
            p1 = p1.slice(1);
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
                this.contentEl.style.height = 550 + 'px';
            }
            else {
                this.contentEl.style.height = '';
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
CodeEditor.Namespace=`AventusWebsite`;
CodeEditor.Tag=`av-code-editor`;
_.CodeEditor=CodeEditor;
if(!window.customElements.get('av-code-editor')){window.customElements.define('av-code-editor', CodeEditor);Aventus.WebComponentInstance.registerDefinition(CodeEditor);}

const BaseEditor = class BaseEditor extends Aventus.WebComponent {
    editorEl;
    static __style = `:host{width:100%}:host iframe{border:none;height:400px;width:100%}`;
    __getStatic() {
        return BaseEditor;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(BaseEditor.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "BaseEditor";
    }
    startupFile() {
        return "";
    }
    hightlightFiles() {
        return [];
    }
    defineResult() {
        return null;
    }
    all_open() {
        return true;
    }
    open_folder() {
        return undefined;
    }
    postCreation() {
        let editorEl = this.shadowRoot.querySelector('av-code-editor');
        if (!editorEl)
            return;
        editorEl.highlights = JSON.stringify(this.hightlightFiles()).replace(/"/g, '\"');
        editorEl.show = this.startupFile();
        editorEl.all_open = this.all_open();
        let folders = this.open_folder();
        if (Array.isArray(folders)) {
            folders = JSON.stringify(folders).replace(/"/g, '\"');
        }
        editorEl.open_folder = folders;
        let result = this.defineResult();
        if (result) {
            result.setAttribute("slot", "result");
            editorEl.appendChild(result);
        }
    }
}
BaseEditor.Namespace=`AventusWebsite`;
BaseEditor.Tag=`av-base-editor`;
_.BaseEditor=BaseEditor;
if(!window.customElements.get('av-base-editor')){window.customElements.define('av-base-editor', BaseEditor);Aventus.WebComponentInstance.registerDefinition(BaseEditor);}

const TutorialGenericPageEditor1 = class TutorialGenericPageEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return TutorialGenericPageEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TutorialGenericPageEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "TutorialGenericPageEditor1";
    }
}
TutorialGenericPageEditor1.Namespace=`AventusWebsite`;
TutorialGenericPageEditor1.Tag=`av-tutorial-generic-page-editor-1`;
_.TutorialGenericPageEditor1=TutorialGenericPageEditor1;
if(!window.customElements.get('av-tutorial-generic-page-editor-1')){window.customElements.define('av-tutorial-generic-page-editor-1', TutorialGenericPageEditor1);Aventus.WebComponentInstance.registerDefinition(TutorialGenericPageEditor1);}

const DocLibWatcherEditor1 = class DocLibWatcherEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocLibWatcherEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibWatcherEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "DocLibWatcherEditor1";
    }
}
DocLibWatcherEditor1.Namespace=`AventusWebsite`;
DocLibWatcherEditor1.Tag=`av-doc-lib-watcher-editor-1`;
_.DocLibWatcherEditor1=DocLibWatcherEditor1;
if(!window.customElements.get('av-doc-lib-watcher-editor-1')){window.customElements.define('av-doc-lib-watcher-editor-1', DocLibWatcherEditor1);Aventus.WebComponentInstance.registerDefinition(DocLibWatcherEditor1);}

const DocLibResourceLoaderEditor1 = class DocLibResourceLoaderEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocLibResourceLoaderEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibResourceLoaderEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "DocLibResourceLoaderEditor1";
    }
}
DocLibResourceLoaderEditor1.Namespace=`AventusWebsite`;
DocLibResourceLoaderEditor1.Tag=`av-doc-lib-resource-loader-editor-1`;
_.DocLibResourceLoaderEditor1=DocLibResourceLoaderEditor1;
if(!window.customElements.get('av-doc-lib-resource-loader-editor-1')){window.customElements.define('av-doc-lib-resource-loader-editor-1', DocLibResourceLoaderEditor1);Aventus.WebComponentInstance.registerDefinition(DocLibResourceLoaderEditor1);}

const DocLibInstanceEditor1 = class DocLibInstanceEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocLibInstanceEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibInstanceEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "DocLibInstanceEditor1";
    }
}
DocLibInstanceEditor1.Namespace=`AventusWebsite`;
DocLibInstanceEditor1.Tag=`av-doc-lib-instance-editor-1`;
_.DocLibInstanceEditor1=DocLibInstanceEditor1;
if(!window.customElements.get('av-doc-lib-instance-editor-1')){window.customElements.define('av-doc-lib-instance-editor-1', DocLibInstanceEditor1);Aventus.WebComponentInstance.registerDefinition(DocLibInstanceEditor1);}

const TutorialInitEditor3 = class TutorialInitEditor3 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return TutorialInitEditor3;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TutorialInitEditor3.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Demo">
    });
}
    getClassName() {
        return "TutorialInitEditor3";
    }
    startupFile() {
        return 'Demo/aventus.conf.avt';
    }
    open_folder() {
        return [
            "Demo/src"
        ];
    }
    hightlightFiles() {
        return [
            'Demo/aventus.conf.avt',
            "Demo/src/apps",
            "Demo/src/states",
        ];
    }
    postCreation() {
        super.postCreation();
    }
}
TutorialInitEditor3.Namespace=`AventusWebsite`;
TutorialInitEditor3.Tag=`av-tutorial-init-editor-3`;
_.TutorialInitEditor3=TutorialInitEditor3;
if(!window.customElements.get('av-tutorial-init-editor-3')){window.customElements.define('av-tutorial-init-editor-3', TutorialInitEditor3);Aventus.WebComponentInstance.registerDefinition(TutorialInitEditor3);}

const TutorialInitEditor1 = class TutorialInitEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return TutorialInitEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TutorialInitEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Demo">
    });
}
    getClassName() {
        return "TutorialInitEditor1";
    }
    all_open() {
        return false;
    }
    open_folder() {
        return "Demo";
    }
}
TutorialInitEditor1.Namespace=`AventusWebsite`;
TutorialInitEditor1.Tag=`av-tutorial-init-editor-1`;
_.TutorialInitEditor1=TutorialInitEditor1;
if(!window.customElements.get('av-tutorial-init-editor-1')){window.customElements.define('av-tutorial-init-editor-1', TutorialInitEditor1);Aventus.WebComponentInstance.registerDefinition(TutorialInitEditor1);}

const TutorialInitEditor2 = class TutorialInitEditor2 extends TutorialInitEditor1 {
    static __style = ``;
    __getStatic() {
        return TutorialInitEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TutorialInitEditor2.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="css" filename="Demo/src/static/css/default.gs.avt">
    });
}
    getClassName() {
        return "TutorialInitEditor2";
    }
    startupFile() {
        return 'Demo/src/static/index.html';
    }
    hightlightFiles() {
        return [
            'Demo/src/static/css/default.gs.avt',
            'Demo/src/static/css/_theme.gs.avt',
            'Demo/src/static/index.html',
        ];
    }
}
TutorialInitEditor2.Namespace=`AventusWebsite`;
TutorialInitEditor2.Tag=`av-tutorial-init-editor-2`;
_.TutorialInitEditor2=TutorialInitEditor2;
if(!window.customElements.get('av-tutorial-init-editor-2')){window.customElements.define('av-tutorial-init-editor-2', TutorialInitEditor2);Aventus.WebComponentInstance.registerDefinition(TutorialInitEditor2);}

const TutorialCreateAppEditor1 = class TutorialCreateAppEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return TutorialCreateAppEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(TutorialCreateAppEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Demo">
    });
}
    getClassName() {
        return "TutorialCreateAppEditor1";
    }
    all_open() {
        return false;
    }
}
TutorialCreateAppEditor1.Namespace=`AventusWebsite`;
TutorialCreateAppEditor1.Tag=`av-tutorial-create-app-editor-1`;
_.TutorialCreateAppEditor1=TutorialCreateAppEditor1;
if(!window.customElements.get('av-tutorial-create-app-editor-1')){window.customElements.define('av-tutorial-create-app-editor-1', TutorialCreateAppEditor1);Aventus.WebComponentInstance.registerDefinition(TutorialCreateAppEditor1);}

const DocAdvancedStorybookEditor1 = class DocAdvancedStorybookEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocAdvancedStorybookEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocAdvancedStorybookEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="test">
    });
}
    getClassName() {
        return "DocAdvancedStorybookEditor1";
    }
    startupFile() {
        return 'test/aventus.conf.avt';
    }
}
DocAdvancedStorybookEditor1.Namespace=`AventusWebsite`;
DocAdvancedStorybookEditor1.Tag=`av-doc-advanced-storybook-editor-1`;
_.DocAdvancedStorybookEditor1=DocAdvancedStorybookEditor1;
if(!window.customElements.get('av-doc-advanced-storybook-editor-1')){window.customElements.define('av-doc-advanced-storybook-editor-1', DocAdvancedStorybookEditor1);Aventus.WebComponentInstance.registerDefinition(DocAdvancedStorybookEditor1);}

const DocAdvancedStorybookEditor2 = class DocAdvancedStorybookEditor2 extends DocAdvancedStorybookEditor1 {
    static __style = ``;
    __getStatic() {
        return DocAdvancedStorybookEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocAdvancedStorybookEditor2.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="test/aventus.conf.avt">
    });
}
    getClassName() {
        return "DocAdvancedStorybookEditor2";
    }
}
DocAdvancedStorybookEditor2.Namespace=`AventusWebsite`;
DocAdvancedStorybookEditor2.Tag=`av-doc-advanced-storybook-editor-2`;
_.DocAdvancedStorybookEditor2=DocAdvancedStorybookEditor2;
if(!window.customElements.get('av-doc-advanced-storybook-editor-2')){window.customElements.define('av-doc-advanced-storybook-editor-2', DocAdvancedStorybookEditor2);Aventus.WebComponentInstance.registerDefinition(DocAdvancedStorybookEditor2);}

const DocAdvancedNpmExportEditor1 = class DocAdvancedNpmExportEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocAdvancedNpmExportEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocAdvancedNpmExportEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="test">
    });
}
    getClassName() {
        return "DocAdvancedNpmExportEditor1";
    }
    startupFile() {
        return 'test/aventus.conf.avt';
    }
}
DocAdvancedNpmExportEditor1.Namespace=`AventusWebsite`;
DocAdvancedNpmExportEditor1.Tag=`av-doc-advanced-npm-export-editor-1`;
_.DocAdvancedNpmExportEditor1=DocAdvancedNpmExportEditor1;
if(!window.customElements.get('av-doc-advanced-npm-export-editor-1')){window.customElements.define('av-doc-advanced-npm-export-editor-1', DocAdvancedNpmExportEditor1);Aventus.WebComponentInstance.registerDefinition(DocAdvancedNpmExportEditor1);}

const DocAdvancedNpmExportEditor2 = class DocAdvancedNpmExportEditor2 extends DocAdvancedNpmExportEditor1 {
    static __style = ``;
    __getStatic() {
        return DocAdvancedNpmExportEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocAdvancedNpmExportEditor2.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="test/aventus.conf.avt">
    });
}
    getClassName() {
        return "DocAdvancedNpmExportEditor2";
    }
}
DocAdvancedNpmExportEditor2.Namespace=`AventusWebsite`;
DocAdvancedNpmExportEditor2.Tag=`av-doc-advanced-npm-export-editor-2`;
_.DocAdvancedNpmExportEditor2=DocAdvancedNpmExportEditor2;
if(!window.customElements.get('av-doc-advanced-npm-export-editor-2')){window.customElements.define('av-doc-advanced-npm-export-editor-2', DocAdvancedNpmExportEditor2);Aventus.WebComponentInstance.registerDefinition(DocAdvancedNpmExportEditor2);}

const DocAdvancedNpmExportEditor3 = class DocAdvancedNpmExportEditor3 extends DocAdvancedNpmExportEditor2 {
    static __style = ``;
    __getStatic() {
        return DocAdvancedNpmExportEditor3;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocAdvancedNpmExportEditor3.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="test/npm/index.d.ts">
    });
}
    getClassName() {
        return "DocAdvancedNpmExportEditor3";
    }
    open_folder() {
        return ['test/npm/test', 'test/npm/__src/src/Button'];
    }
    all_open() {
        return false;
    }
}
DocAdvancedNpmExportEditor3.Namespace=`AventusWebsite`;
DocAdvancedNpmExportEditor3.Tag=`av-doc-advanced-npm-export-editor-3`;
_.DocAdvancedNpmExportEditor3=DocAdvancedNpmExportEditor3;
if(!window.customElements.get('av-doc-advanced-npm-export-editor-3')){window.customElements.define('av-doc-advanced-npm-export-editor-3', DocAdvancedNpmExportEditor3);Aventus.WebComponentInstance.registerDefinition(DocAdvancedNpmExportEditor3);}

const DocAdvancedTemplateEditor1 = class DocAdvancedTemplateEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocAdvancedTemplateEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocAdvancedTemplateEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Template">
    });
}
    getClassName() {
        return "DocAdvancedTemplateEditor1";
    }
}
DocAdvancedTemplateEditor1.Namespace=`AventusWebsite`;
DocAdvancedTemplateEditor1.Tag=`av-doc-advanced-template-editor-1`;
_.DocAdvancedTemplateEditor1=DocAdvancedTemplateEditor1;
if(!window.customElements.get('av-doc-advanced-template-editor-1')){window.customElements.define('av-doc-advanced-template-editor-1', DocAdvancedTemplateEditor1);Aventus.WebComponentInstance.registerDefinition(DocAdvancedTemplateEditor1);}

const DocAdvancedTemplateEditor2 = class DocAdvancedTemplateEditor2 extends DocAdvancedTemplateEditor1 {
    static __style = ``;
    __getStatic() {
        return DocAdvancedTemplateEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocAdvancedTemplateEditor2.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="json" filename="Template/.aventus/templates/TailwindComponent/template.avt">
    });
}
    getClassName() {
        return "DocAdvancedTemplateEditor2";
    }
    startupFile() {
        return 'Template/.aventus/templates/TailwindComponent/template.avt';
    }
}
DocAdvancedTemplateEditor2.Namespace=`AventusWebsite`;
DocAdvancedTemplateEditor2.Tag=`av-doc-advanced-template-editor-2`;
_.DocAdvancedTemplateEditor2=DocAdvancedTemplateEditor2;
if(!window.customElements.get('av-doc-advanced-template-editor-2')){window.customElements.define('av-doc-advanced-template-editor-2', DocAdvancedTemplateEditor2);Aventus.WebComponentInstance.registerDefinition(DocAdvancedTemplateEditor2);}

const DocAdvancedTemplateEditor3 = class DocAdvancedTemplateEditor3 extends DocAdvancedTemplateEditor2 {
    static __style = ``;
    __getStatic() {
        return DocAdvancedTemplateEditor3;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocAdvancedTemplateEditor3.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="Template/.aventus/templates/TailwindComponent/&dollar;&lcub;&lcub;componentName&rcub;&rcub;/&dollar;&lcub;&lcub;componentName&rcub;&rcub;.wcl.avt">
    });
}
    getClassName() {
        return "DocAdvancedTemplateEditor3";
    }
    startupFile() {
        return 'Template/.aventus/templates/TailwindComponent/${{componentName}}/${{componentName}}.wcl.avt';
    }
}
DocAdvancedTemplateEditor3.Namespace=`AventusWebsite`;
DocAdvancedTemplateEditor3.Tag=`av-doc-advanced-template-editor-3`;
_.DocAdvancedTemplateEditor3=DocAdvancedTemplateEditor3;
if(!window.customElements.get('av-doc-advanced-template-editor-3')){window.customElements.define('av-doc-advanced-template-editor-3', DocAdvancedTemplateEditor3);Aventus.WebComponentInstance.registerDefinition(DocAdvancedTemplateEditor3);}

const DocAdvancedTemplateEditor4 = class DocAdvancedTemplateEditor4 extends DocAdvancedTemplateEditor3 {
    static __style = ``;
    __getStatic() {
        return DocAdvancedTemplateEditor4;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocAdvancedTemplateEditor4.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="Template/src/NewComp/NewComp.wcl.avt">
    });
}
    getClassName() {
        return "DocAdvancedTemplateEditor4";
    }
    startupFile() {
        return 'Template/src/NewComp/NewComp.wcl.avt';
    }
}
DocAdvancedTemplateEditor4.Namespace=`AventusWebsite`;
DocAdvancedTemplateEditor4.Tag=`av-doc-advanced-template-editor-4`;
_.DocAdvancedTemplateEditor4=DocAdvancedTemplateEditor4;
if(!window.customElements.get('av-doc-advanced-template-editor-4')){window.customElements.define('av-doc-advanced-template-editor-4', DocAdvancedTemplateEditor4);Aventus.WebComponentInstance.registerDefinition(DocAdvancedTemplateEditor4);}

const DocAdvancedTemplateEditor5 = class DocAdvancedTemplateEditor5 extends DocAdvancedTemplateEditor4 {
    static __style = ``;
    __getStatic() {
        return DocAdvancedTemplateEditor5;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocAdvancedTemplateEditor5.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="json" filename="Template/.aventus/templates/TailwindComponent/template.avt">
    });
}
    getClassName() {
        return "DocAdvancedTemplateEditor5";
    }
    startupFile() {
        return 'Template/.aventus/templates/TailwindComponent/template.avt';
    }
}
DocAdvancedTemplateEditor5.Namespace=`AventusWebsite`;
DocAdvancedTemplateEditor5.Tag=`av-doc-advanced-template-editor-5`;
_.DocAdvancedTemplateEditor5=DocAdvancedTemplateEditor5;
if(!window.customElements.get('av-doc-advanced-template-editor-5')){window.customElements.define('av-doc-advanced-template-editor-5', DocAdvancedTemplateEditor5);Aventus.WebComponentInstance.registerDefinition(DocAdvancedTemplateEditor5);}

const DocLibToolsEditor2 = class DocLibToolsEditor2 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocLibToolsEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibToolsEditor2.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Tools">
    });
}
    getClassName() {
        return "DocLibToolsEditor2";
    }
    hightlightFiles() {
        return [
            'Tools/src/StringExtension.lib.avt',
            'Tools/src/Test.lib.avt'
        ];
    }
    startupFile() {
        return 'Tools/src/StringExtension.lib.avt';
    }
}
DocLibToolsEditor2.Namespace=`AventusWebsite`;
DocLibToolsEditor2.Tag=`av-doc-lib-tools-editor-2`;
_.DocLibToolsEditor2=DocLibToolsEditor2;
if(!window.customElements.get('av-doc-lib-tools-editor-2')){window.customElements.define('av-doc-lib-tools-editor-2', DocLibToolsEditor2);Aventus.WebComponentInstance.registerDefinition(DocLibToolsEditor2);}

const DocLibToolsEditor3 = class DocLibToolsEditor3 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocLibToolsEditor3;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibToolsEditor3.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Tools">
    });
}
    getClassName() {
        return "DocLibToolsEditor3";
    }
}
DocLibToolsEditor3.Namespace=`AventusWebsite`;
DocLibToolsEditor3.Tag=`av-doc-lib-tools-editor-3`;
_.DocLibToolsEditor3=DocLibToolsEditor3;
if(!window.customElements.get('av-doc-lib-tools-editor-3')){window.customElements.define('av-doc-lib-tools-editor-3', DocLibToolsEditor3);Aventus.WebComponentInstance.registerDefinition(DocLibToolsEditor3);}

const DocLibToolsEditor1 = class DocLibToolsEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocLibToolsEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibToolsEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Tools">
    });
}
    getClassName() {
        return "DocLibToolsEditor1";
    }
    startupFile() {
        return 'Tools/src/Parser.lib.avt';
    }
}
DocLibToolsEditor1.Namespace=`AventusWebsite`;
DocLibToolsEditor1.Tag=`av-doc-lib-tools-editor-1`;
_.DocLibToolsEditor1=DocLibToolsEditor1;
if(!window.customElements.get('av-doc-lib-tools-editor-1')){window.customElements.define('av-doc-lib-tools-editor-1', DocLibToolsEditor1);Aventus.WebComponentInstance.registerDefinition(DocLibToolsEditor1);}

const DocLibCallbackEditor3 = class DocLibCallbackEditor3 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocLibCallbackEditor3;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibCallbackEditor3.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Callback">
    });
}
    getClassName() {
        return "DocLibCallbackEditor3";
    }
}
DocLibCallbackEditor3.Namespace=`AventusWebsite`;
DocLibCallbackEditor3.Tag=`av-doc-lib-callback-editor-3`;
_.DocLibCallbackEditor3=DocLibCallbackEditor3;
if(!window.customElements.get('av-doc-lib-callback-editor-3')){window.customElements.define('av-doc-lib-callback-editor-3', DocLibCallbackEditor3);Aventus.WebComponentInstance.registerDefinition(DocLibCallbackEditor3);}

const DocWcInjectionEditor3 = class DocWcInjectionEditor3 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcInjectionEditor3;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcInjectionEditor3.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Injection">
    });
}
    getClassName() {
        return "DocWcInjectionEditor3";
    }
    hightlightFiles() {
        return [
            'Injection/src/Btn/Btn.wcl.avt',
            'Injection/src/Test.wc.avt',
        ];
    }
}
DocWcInjectionEditor3.Namespace=`AventusWebsite`;
DocWcInjectionEditor3.Tag=`av-doc-wc-injection-editor-3`;
_.DocWcInjectionEditor3=DocWcInjectionEditor3;
if(!window.customElements.get('av-doc-wc-injection-editor-3')){window.customElements.define('av-doc-wc-injection-editor-3', DocWcInjectionEditor3);Aventus.WebComponentInstance.registerDefinition(DocWcInjectionEditor3);}

const DocWcInterpolationEditor1 = class DocWcInterpolationEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcInterpolationEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcInterpolationEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Style">
    });
}
    getClassName() {
        return "DocWcInterpolationEditor1";
    }
    startupFile() {
        return "Style/src/Example/Example.wcl.avt";
    }
    hightlightFiles() {
        return [
            'Style/src/Example/Example.wcl.avt',
            'Style/src/Example/Example.wcv.avt'
        ];
    }
}
DocWcInterpolationEditor1.Namespace=`AventusWebsite`;
DocWcInterpolationEditor1.Tag=`av-doc-wc-interpolation-editor-1`;
_.DocWcInterpolationEditor1=DocWcInterpolationEditor1;
if(!window.customElements.get('av-doc-wc-interpolation-editor-1')){window.customElements.define('av-doc-wc-interpolation-editor-1', DocWcInterpolationEditor1);Aventus.WebComponentInstance.registerDefinition(DocWcInterpolationEditor1);}

const DocWcStyleEditor5 = class DocWcStyleEditor5 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcStyleEditor5;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcStyleEditor5.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Style">
    });
}
    getClassName() {
        return "DocWcStyleEditor5";
    }
    startupFile() {
        return "Style/static/style.gs.avt";
    }
    hightlightFiles() {
        return [
            'Style/src/Example/Example.wcs.avt',
            'Style/static/style.gs.avt'
        ];
    }
}
DocWcStyleEditor5.Namespace=`AventusWebsite`;
DocWcStyleEditor5.Tag=`av-doc-wc-style-editor-5`;
_.DocWcStyleEditor5=DocWcStyleEditor5;
if(!window.customElements.get('av-doc-wc-style-editor-5')){window.customElements.define('av-doc-wc-style-editor-5', DocWcStyleEditor5);Aventus.WebComponentInstance.registerDefinition(DocWcStyleEditor5);}

const DocWcStyleEditor3 = class DocWcStyleEditor3 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcStyleEditor3;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcStyleEditor3.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Style">
    });
}
    getClassName() {
        return "DocWcStyleEditor3";
    }
}
DocWcStyleEditor3.Namespace=`AventusWebsite`;
DocWcStyleEditor3.Tag=`av-doc-wc-style-editor-3`;
_.DocWcStyleEditor3=DocWcStyleEditor3;
if(!window.customElements.get('av-doc-wc-style-editor-3')){window.customElements.define('av-doc-wc-style-editor-3', DocWcStyleEditor3);Aventus.WebComponentInstance.registerDefinition(DocWcStyleEditor3);}

const DocWcInheritanceEditor1 = class DocWcInheritanceEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcInheritanceEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcInheritanceEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Inheritance">
    });
}
    getClassName() {
        return "DocWcInheritanceEditor1";
    }
    startupFile() {
        return "Inheritance/src/Fillable/Fillable.wcl.avt";
    }
    hightlightFiles() {
        return [
            'Inheritance/src/Fillable/Fillable.wcl.avt',
            'Inheritance/src/Fillable/Fillable.wcv.avt',
        ];
    }
}
DocWcInheritanceEditor1.Namespace=`AventusWebsite`;
DocWcInheritanceEditor1.Tag=`av-doc-wc-inheritance-editor-1`;
_.DocWcInheritanceEditor1=DocWcInheritanceEditor1;
if(!window.customElements.get('av-doc-wc-inheritance-editor-1')){window.customElements.define('av-doc-wc-inheritance-editor-1', DocWcInheritanceEditor1);Aventus.WebComponentInstance.registerDefinition(DocWcInheritanceEditor1);}

const DocStateListenEditor1 = class DocStateListenEditor1 extends BaseEditor {
    static __style = ``;
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
        blocks: { 'default':`<av-code-editor name="State Example">
    });
}
    getClassName() {
        return "DocStateListenEditor1";
    }
    startupFile() {
        return "StateExample/src/Test.lib.avt";
    }
}
DocStateListenEditor1.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="StateExample/src/Test.lib.avt">
    });
}
    getClassName() {
        return "DocStateListenEditor2";
    }
}
DocStateListenEditor2.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="StateExample/src/Test.lib.avt">
    });
}
    getClassName() {
        return "DocStateListenEditor3";
    }
}
DocStateListenEditor3.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="StateExample/src/CreatePerson.state.avt">
    });
}
    getClassName() {
        return "DocStateListenEditor4";
    }
    startupFile() {
        return "StateExample/src/CreatePerson.state.avt";
    }
}
DocStateListenEditor4.Namespace=`AventusWebsite`;
DocStateListenEditor4.Tag=`av-doc-state-listen-editor-4`;
_.DocStateListenEditor4=DocStateListenEditor4;
if(!window.customElements.get('av-doc-state-listen-editor-4')){window.customElements.define('av-doc-state-listen-editor-4', DocStateListenEditor4);Aventus.WebComponentInstance.registerDefinition(DocStateListenEditor4);}

const DocStateChangeEditor1 = class DocStateChangeEditor1 extends BaseEditor {
    static __style = ``;
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
        blocks: { 'default':`<av-code-editor name="State Example">
    });
}
    getClassName() {
        return "DocStateChangeEditor1";
    }
    startupFile() {
        return "StateExample/src/Test.lib.avt";
    }
}
DocStateChangeEditor1.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="StateExample/src/Test.lib.avt">
    });
}
    getClassName() {
        return "DocStateChangeEditor2";
    }
}
DocStateChangeEditor2.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="StateExample/src/Test.lib.avt">
    });
}
    getClassName() {
        return "DocStateChangeEditor3";
    }
}
DocStateChangeEditor3.Namespace=`AventusWebsite`;
DocStateChangeEditor3.Tag=`av-doc-state-change-editor-3`;
_.DocStateChangeEditor3=DocStateChangeEditor3;
if(!window.customElements.get('av-doc-state-change-editor-3')){window.customElements.define('av-doc-state-change-editor-3', DocStateChangeEditor3);Aventus.WebComponentInstance.registerDefinition(DocStateChangeEditor3);}

const DocStateCreateEditor1 = class DocStateCreateEditor1 extends BaseEditor {
    static __style = ``;
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
        blocks: { 'default':`<av-code-editor name="State Example">
    });
}
    getClassName() {
        return "DocStateCreateEditor1";
    }
    startupFile() {
        return "StateExample/src/CreatePerson.state.avt";
    }
}
DocStateCreateEditor1.Namespace=`AventusWebsite`;
DocStateCreateEditor1.Tag=`av-doc-state-create-editor-1`;
_.DocStateCreateEditor1=DocStateCreateEditor1;
if(!window.customElements.get('av-doc-state-create-editor-1')){window.customElements.define('av-doc-state-create-editor-1', DocStateCreateEditor1);Aventus.WebComponentInstance.registerDefinition(DocStateCreateEditor1);}

const DocRamMixinEditor1 = class DocRamMixinEditor1 extends BaseEditor {
    static __style = ``;
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
        blocks: { 'default':`<av-code-editor name="Example RAM">
    });
}
    getClassName() {
        return "DocRamMixinEditor1";
    }
    startupFile() {
        return "ExampleRAM/src/Person.data.avt";
    }
}
DocRamMixinEditor1.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Person.ram.avt">
    });
}
    getClassName() {
        return "DocRamMixinEditor2";
    }
    startupFile() {
        return "ExampleRAM/src/Person.ram.avt";
    }
}
DocRamMixinEditor2.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Person.ram.avt">
    });
}
    getClassName() {
        return "DocRamMixinEditor3";
    }
}
DocRamMixinEditor3.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Person.ram.avt">
    });
}
    getClassName() {
        return "DocRamMixinEditor4";
    }
}
DocRamMixinEditor4.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Person.ram.avt">
    });
}
    getClassName() {
        return "DocRamMixinEditor5";
    }
}
DocRamMixinEditor5.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Person.ram.avt">
    });
}
    getClassName() {
        return "DocRamMixinEditor6";
    }
}
DocRamMixinEditor6.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Test.lib.avt">
    });
}
    getClassName() {
        return "DocRamMixinEditor7";
    }
    startupFile() {
        return 'ExampleRAM/src/Test.lib.avt';
    }
}
DocRamMixinEditor7.Namespace=`AventusWebsite`;
DocRamMixinEditor7.Tag=`av-doc-ram-mixin-editor-7`;
_.DocRamMixinEditor7=DocRamMixinEditor7;
if(!window.customElements.get('av-doc-ram-mixin-editor-7')){window.customElements.define('av-doc-ram-mixin-editor-7', DocRamMixinEditor7);Aventus.WebComponentInstance.registerDefinition(DocRamMixinEditor7);}

const DocRamListenChangesEditor1 = class DocRamListenChangesEditor1 extends BaseEditor {
    static __style = ``;
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
        blocks: { 'default':`<av-code-editor name="Example RAM">
    });
}
    getClassName() {
        return "DocRamListenChangesEditor1";
    }
    startupFile() {
        return "ExampleRAM/src/Test.lib.avt";
    }
}
DocRamListenChangesEditor1.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/DisplayPerson/DisplayPerson.wcl.avt">
    });
}
    getClassName() {
        return "DocRamListenChangesEditor2";
    }
    startupFile() {
        return 'ExampleRAM/src/DisplayPerson/DisplayPerson.wcl.avt';
    }
}
DocRamListenChangesEditor2.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/DisplayPerson/DisplayPerson.wcl.avt">
    });
}
    getClassName() {
        return "DocRamListenChangesEditor3";
    }
}
DocRamListenChangesEditor3.Namespace=`AventusWebsite`;
DocRamListenChangesEditor3.Tag=`av-doc-ram-listen-changes-editor-3`;
_.DocRamListenChangesEditor3=DocRamListenChangesEditor3;
if(!window.customElements.get('av-doc-ram-listen-changes-editor-3')){window.customElements.define('av-doc-ram-listen-changes-editor-3', DocRamListenChangesEditor3);Aventus.WebComponentInstance.registerDefinition(DocRamListenChangesEditor3);}

const DocRamCrudEditor1 = class DocRamCrudEditor1 extends BaseEditor {
    static __style = ``;
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
        blocks: { 'default':`<av-code-editor name="Example RAM">
    });
}
    getClassName() {
        return "DocRamCrudEditor1";
    }
    startupFile() {
        return "ExampleRAM/src/Test.lib.avt";
    }
}
DocRamCrudEditor1.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Test.lib.avt">
    });
}
    getClassName() {
        return "DocRamCrudEditor2";
    }
}
DocRamCrudEditor2.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Test.lib.avt">
    });
}
    getClassName() {
        return "DocRamCrudEditor3";
    }
}
DocRamCrudEditor3.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Test.lib.avt">
    });
}
    getClassName() {
        return "DocRamCrudEditor4";
    }
}
DocRamCrudEditor4.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Test.lib.avt">
    });
}
    getClassName() {
        return "DocRamCrudEditor5";
    }
}
DocRamCrudEditor5.Namespace=`AventusWebsite`;
DocRamCrudEditor5.Tag=`av-doc-ram-crud-editor-5`;
_.DocRamCrudEditor5=DocRamCrudEditor5;
if(!window.customElements.get('av-doc-ram-crud-editor-5')){window.customElements.define('av-doc-ram-crud-editor-5', DocRamCrudEditor5);Aventus.WebComponentInstance.registerDefinition(DocRamCrudEditor5);}

const DocRamCreateEditor3 = class DocRamCreateEditor3 extends BaseEditor {
    static __style = ``;
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
        blocks: { 'default':`<av-code-editor name="Example RAM">
    });
}
    getClassName() {
        return "DocRamCreateEditor3";
    }
    startupFile() {
        return "ExampleRAM/src/Shape.ram.avt";
    }
}
DocRamCreateEditor3.Namespace=`AventusWebsite`;
DocRamCreateEditor3.Tag=`av-doc-ram-create-editor-3`;
_.DocRamCreateEditor3=DocRamCreateEditor3;
if(!window.customElements.get('av-doc-ram-create-editor-3')){window.customElements.define('av-doc-ram-create-editor-3', DocRamCreateEditor3);Aventus.WebComponentInstance.registerDefinition(DocRamCreateEditor3);}

const DocRamCreateEditor1 = class DocRamCreateEditor1 extends BaseEditor {
    static __style = ``;
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
        blocks: { 'default':`<av-code-editor name="Example RAM">
    });
}
    getClassName() {
        return "DocRamCreateEditor1";
    }
    startupFile() {
        return "ExampleRAM/src/Person.ram.avt";
    }
}
DocRamCreateEditor1.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleRAM/src/Person.ram.avt">
    });
}
    getClassName() {
        return "DocRamCreateEditor2";
    }
}
DocRamCreateEditor2.Namespace=`AventusWebsite`;
DocRamCreateEditor2.Tag=`av-doc-ram-create-editor-2`;
_.DocRamCreateEditor2=DocRamCreateEditor2;
if(!window.customElements.get('av-doc-ram-create-editor-2')){window.customElements.define('av-doc-ram-create-editor-2', DocRamCreateEditor2);Aventus.WebComponentInstance.registerDefinition(DocRamCreateEditor2);}

const DocDateCreateEditor1 = class DocDateCreateEditor1 extends BaseEditor {
    static __style = ``;
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
        blocks: { 'default':`<av-code-editor name="First Project">
    });
}
    getClassName() {
        return "DocDateCreateEditor1";
    }
    startupFile() {
        return "ExampleData/src/Person.data.avt";
    }
}
DocDateCreateEditor1.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="ExampleData/src/Test.lib.avt">
    });
}
    getClassName() {
        return "DocDateCreateEditor2";
    }
    startupFile() {
        return "ExampleData/src/Test.lib.avt";
    }
}
DocDateCreateEditor2.Namespace=`AventusWebsite`;
DocDateCreateEditor2.Tag=`av-doc-date-create-editor-2`;
_.DocDateCreateEditor2=DocDateCreateEditor2;
if(!window.customElements.get('av-doc-date-create-editor-2')){window.customElements.define('av-doc-date-create-editor-2', DocDateCreateEditor2);Aventus.WebComponentInstance.registerDefinition(DocDateCreateEditor2);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Introduction</h1><p>Aventus is a framework that allow you to create complex user interfaces by splitting common parts of a
    });
}
    getClassName() {
        return "DocIntroduction";
    }
    Title() {
        return "Introduction to Aventus Framework: Building Complex UIs Efficiently";
    }
    Description() {
        return "Discover Aventus, a framework designed to help you build complex user interfaces by organizing front-end components into manageable files. Learn how Aventus leverages HTML, CSS, and JavaScript to streamline development with web components, data storage, state management, and HTTP requests.";
    }
    Keywords() {
        return [
            "Aventus framework",
            "build complex user interfaces",
            "Aventus introduction",
            "web components",
            "data storage",
            "state management",
            "HTTP requests",
            "front-end development",
            "HTML CSS JavaScript framework",
        ];
    }
}
DocIntroduction.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>UI and experience</h1><h2>Vscode UI</h2><p>The Aventus extension will edit vscode user interface to add some features.</p><h3>The create option</h3><p>When you right click on the vscode file explorer, you can notice that you have a new option named: <b>Aventus :
    });
}
    getClassName() {
        return "DocExperience";
    }
    Title() {
        return "Enhancing Your Development Experience with Aventus Extension for VSCode";
    }
    Description() {
        return "Explore how the Aventus extension enhances your VSCode development experience with features like project creation, build information, and a live server. Learn about new context menu options, build status display, and how to customize the live server settings.";
    }
    Keywords() {
        return [
            "Aventus VSCode extension",
            "VSCode UI enhancements",
            "Aventus project creation",
            "VSCode live server",
            "Aventus build status",
            "VSCode context menu options",
            "Aventus development tools",
            "live server customization",
            "VSCode development experience",
            "Aventus UI features",
        ];
    }
}
DocExperience.Namespace=`AventusWebsite`;
DocExperience.Tag=`av-doc-experience`;
_.DocExperience=DocExperience;
if(!window.customElements.get('av-doc-experience')){window.customElements.define('av-doc-experience', DocExperience);Aventus.WebComponentInstance.registerDefinition(DocExperience);}

const DocFirstAppEditor1 = class DocFirstAppEditor1 extends BaseEditor {
    static __style = ``;
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
        blocks: { 'default':`<av-code-editor name="First Project">
    });
}
    getClassName() {
        return "DocFirstAppEditor1";
    }
    startupFile() {
        return "HelloAventus/aventus.conf.avt";
    }
}
DocFirstAppEditor1.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="json" filename="HelloAventus/aventus.conf.avt">
    });
}
    getClassName() {
        return "DocFirstAppEditor2";
    }
}
DocFirstAppEditor2.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="HelloAventus/src/MyComponent.wcl.avt">
    });
}
    getClassName() {
        return "DocFirstAppEditor3";
    }
    startupFile() {
        return "HelloAventus/src/MyComponent.wcs.avt";
    }
}
DocFirstAppEditor3.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="html" filename="HelloAventus/static/index.html">
    });
}
    getClassName() {
        return "DocFirstAppEditor4";
    }
    startupFile() {
        return "HelloAventus/static/index.html";
    }
}
DocFirstAppEditor4.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<av-code language="json" filename="HelloAventus/aventus.conf.avt">
    });
}
    getClassName() {
        return "DocFirstAppEditor5";
    }
    startupFile() {
        return "HelloAventus/aventus.conf.avt";
    }
}
DocFirstAppEditor5.Namespace=`AventusWebsite`;
DocFirstAppEditor5.Tag=`av-doc-first-app-editor-5`;
_.DocFirstAppEditor5=DocFirstAppEditor5;
if(!window.customElements.get('av-doc-first-app-editor-5')){window.customElements.define('av-doc-first-app-editor-5', DocFirstAppEditor5);Aventus.WebComponentInstance.registerDefinition(DocFirstAppEditor5);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Create your first project</h1><h2>Init the project</h2><p>In your file explorer create a new folder <span class="cn">HelloAventus</span> and open it with vscode.</p><p>You can create a new file named <span class="cn">aventus.conf.avt</span>. The minimal content for your config file is
    });
}
    getClassName() {
        return "DocFirstApp";
    }
    Title() {
        return "Create Your First Aventus Project: A Step-by-Step Guide";
    }
    Description() {
        return "Learn how to create your first project with Aventus. This guide covers initializing a project, configuring the aventus.conf.avt file, creating your first web component, and setting up the live server. Follow these steps to get started with Aventus development.";
    }
    Keywords() {
        return [
            "Aventus project setup",
            "create Aventus project",
            "initializing Aventus",
            "aventus.conf.avt configuration",
            "web component creation",
            "Aventus live server",
            "Aventus development tutorial",
            "first Aventus app",
            "Aventus guide",
            "setting up Aventus",
        ];
    }
}
DocFirstApp.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Data</h1><p>In this section you are going to learn what is a data and how you can create it inside Aventus.</p><h2>Definition</h2><p>A data is a class that define an object structure. This class reflects what the application will contain. This is the
    });
}
    getClassName() {
        return "DocDataCreate";
    }
    Title() {
        return "How to Define and Manage Data Structures in AventusJs";
    }
    Description() {
        return "Learn how to define and manage data structures in AventusJs. This guide covers creating Data classes, implementing Aventus.IData, and ensuring proper initialization and schema synchronization in your web application.";
    }
    Keywords() {
        return [
            "AventusJs data structures",
            "creating data classes",
            "Aventus data management",
            "Aventus.IData implementation",
            "data schema synchronization",
            "Aventus web development",
            "backend object structures",
            "Aventus class creation",
            "Aventus data guide",
        ];
    }
}
DocDataCreate.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>RAM - Create</h1><p>In this section you are going to learn what is a RAM and how you can create it inside Aventus.</p><h2>Definition</h2><p>A RAM is a class that store all your <av-router-link state="/data/create">data instances</av-router-link>. This class
    });
}
    getClassName() {
        return "DocRamCreate";
    }
    Title() {
        return "How to Create and Use RAM in Aventus";
    }
    Description() {
        return "Discover how to create a RAM (Random Access Memory) class in Aventus for managing data instances. Learn about CRUD operations, default indexing, and customizing your RAM with defineIndexKey and getTypeForData. Master the use of RAM as a singleton for effective data storage in your Aventus application.";
    }
    Keywords() {
        return [
            "Create RAM Aventus",
            "Aventus RAM class",
            "Data storage Aventus",
            "CRUD operations Aventus RAM",
            "Define index key Aventus",
            "Custom RAM indexing Aventus",
            "RAM singleton Aventus",
            "Get type for data Aventus",
        ];
    }
}
DocRamCreate.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>RAM - Operations</h1><p>To manage data inside your RAM, can perfom 4 kind of operations :</p><ul>
    });
}
    getClassName() {
        return "DocRamCrud";
    }
    Title() {
        return "Managing Data with RAM Operations in Aventus";
    }
    Description() {
        return "Learn how to perform CRUD operations using the RAM class in Aventus. Understand how to create, read, update, and delete data with detailed function explanations. Discover methods like getAll, create, update, and delete to efficiently manage data within your application.";
    }
    Keywords() {
        return [
            "RAM operations Aventus",
            "Create Read Update Delete RAM",
            "Aventus RAM CRUD operations",
            "Manage data Aventus",
            "Aventus getAll getById",
            "Aventus createList updateList deleteList",
            "RAM data management Aventus",
        ];
    }
}
DocRamCrud.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>RAM - Listen changes</h1><h2>Item scoped functions</h2><p>Because your component must be refreshed when your RAM item changed, the item coming from a RAM has 4 new functions.
    });
}
    getClassName() {
        return "DocRamListenChanges";
    }
    Title() {
        return "Listening to RAM Changes in Aventus: Item and RAM Scoped Functions";
    }
    Description() {
        return "Discover how to listen for changes in data within RAM in Aventus. Learn about item-scoped functions for updating and deleting data, as well as RAM-scoped functions for monitoring data creation, updates, and deletions. Understand how to manage callbacks and avoid scope errors using @BindThis().";
    }
    Keywords() {
        return [
            "RAM changes Aventus",
            "Item scoped functions Aventus",
            "onUpdate onDelete offUpdate offDelete",
            "RAM scoped functions Aventus",
            "onCreated onUpdated onDeleted",
            "Listen to RAM changes Aventus",
            "Aventus data change listeners",
            "Manage RAM callbacks Aventus",
        ];
    }
}
DocRamListenChanges.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>RAM - Extend data</h1><p>As you can see inside the previous section, new functions are added on the items. You can your custom functions too
    });
}
    getClassName() {
        return "DocRamMixin";
    }
    Title() {
        return "Extending Data in RAM with Custom Functions in Aventus";
    }
    Description() {
        return "Learn how to extend data items in RAM using the mixin pattern in Aventus. This guide demonstrates how to add custom functions, such as helloWorld, to your data items. Follow along with an example to integrate additional functionalities into auto-generated data from your backend.";
    }
    Keywords() {
        return [
            "Extend data RAM Aventus",
            "Custom functions RAM Aventus",
            "Mixin pattern Aventus",
            "Add functions to RAM items",
            "Aventus data extension",
            "Implement custom methods RAM",
            "helloWorld function RAM Aventus",
            "RAM data extension example",
        ];
    }
}
DocRamMixin.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>State - Create</h1><p>In this section you are going to learn what is a state and how you can create it inside Aventus.</p><h2>Definition</h2><p>A state is a way to define a unique state of your application. The state concept is divided in two part:
    });
}
    getClassName() {
        return "DocStateCreate";
    }
    Title() {
        return "How to Create and Manage States in Aventus";
    }
    Description() {
        return " Learn how to define and manage application states in Aventus. This guide covers the creation of state classes and state managers, essential for handling transitions and maintaining unique application states, with a focus on practical examples like routers.";
    }
    Keywords() {
        return [
            "Aventus states",
            "State management Aventus",
            "Create state Aventus",
            "Aventus StateManager",
            "Application state Aventus",
            "Router state Aventus",
            "Vscode Aventus state creation",
        ];
    }
}
DocStateCreate.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>State - Change</h1><p>To change the current state of a manager, you can use different methods.</p><h2>On the manager</h2><p>You can change current state directly on the manager by calling the function <span class="cn">setState</span> with a
    });
}
    getClassName() {
        return "DocStateChange";
    }
    Title() {
        return "How to Change States in Aventus";
    }
    Description() {
        return "Discover how to change states in Aventus with various methods. Learn how to use the setState method on the state manager, the activate method on the Aventus.State class, and instance-specific activation techniques for efficient state management.";
    }
    Keywords() {
        return [
            "Change state Aventus",
            "Aventus state management",
            "Set state method Aventus",
            "Activate state Aventus",
            "State manager Aventus",
            "Static state activation Aventus",
            "Instance state activation Aventus",
        ];
    }
}
DocStateChange.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>State - Listen changes</h1><p>Changing state is great, but for sure you will need to listen when a state change. Three methods compose the <span class="cn">State</span> lifecylce. This tuple is named <span class="cn">StateAction</span> inside Aventus.</p><ul>
    });
}
    getClassName() {
        return "DocStateListen";
    }
    Title() {
        return "How to Listen for State Changes in Aventus";
    }
    Description() {
        return "Learn how to listen for state changes in Aventus using the StateAction lifecycle methods: active, inactive, and askChange. Discover how to subscribe to state changes, handle state transitions, and override lifecycle methods within your State class for effective state management.";
    }
    Keywords() {
        return [
            "Listen state changes Aventus",
            "Aventus StateAction",
            "StateManager callbacks Aventus",
            "State active inactive askChange Aventus",
            "Subscribe to state changes Aventus",
            "Handle state transitions Aventus",
            "Override state lifecycle methods Aventus",
        ];
    }
}
DocStateListen.Namespace=`AventusWebsite`;
DocStateListen.Tag=`av-doc-state-listen`;
_.DocStateListen=DocStateListen;
if(!window.customElements.get('av-doc-state-listen')){window.customElements.define('av-doc-state-listen', DocStateListen);Aventus.WebComponentInstance.registerDefinition(DocStateListen);}

const DocWcCreateEditor1 = class DocWcCreateEditor1 extends BaseEditor {
    static __style = ``;
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
        blocks: { 'default':`<av-code-editor name="Component Example">
    });
}
    getClassName() {
        return "DocWcCreateEditor1";
    }
    startupFile() {
        return "ComponentExample/static/index.html";
    }
}
DocWcCreateEditor1.Namespace=`AventusWebsite`;
DocWcCreateEditor1.Tag=`av-doc-wc-create-editor-1`;
_.DocWcCreateEditor1=DocWcCreateEditor1;
if(!window.customElements.get('av-doc-wc-create-editor-1')){window.customElements.define('av-doc-wc-create-editor-1', DocWcCreateEditor1);Aventus.WebComponentInstance.registerDefinition(DocWcCreateEditor1);}

const DocWcCreateEditor2 = class DocWcCreateEditor2 extends BaseEditor {
    static __style = ``;
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
        blocks: { 'default':`<av-code-editor name="Component Example">
    });
}
    getClassName() {
        return "DocWcCreateEditor2";
    }
    startupFile() {
        return "ComponentExample/src/Error/Error.wcv.avt";
    }
}
DocWcCreateEditor2.Namespace=`AventusWebsite`;
DocWcCreateEditor2.Tag=`av-doc-wc-create-editor-2`;
_.DocWcCreateEditor2=DocWcCreateEditor2;
if(!window.customElements.get('av-doc-wc-create-editor-2')){window.customElements.define('av-doc-wc-create-editor-2', DocWcCreateEditor2);Aventus.WebComponentInstance.registerDefinition(DocWcCreateEditor2);}

const DocWcCreateEditor3 = class DocWcCreateEditor3 extends BaseEditor {
    static __style = ``;
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
        blocks: { 'default':`<av-code-editor name="Component Example">
    });
}
    getClassName() {
        return "DocWcCreateEditor3";
    }
    startupFile() {
        return "ComponentExample/src/ErrorYellow/ErrorYellow.wcv.avt";
    }
}
DocWcCreateEditor3.Namespace=`AventusWebsite`;
DocWcCreateEditor3.Tag=`av-doc-wc-create-editor-3`;
_.DocWcCreateEditor3=DocWcCreateEditor3;
if(!window.customElements.get('av-doc-wc-create-editor-3')){window.customElements.define('av-doc-wc-create-editor-3', DocWcCreateEditor3);Aventus.WebComponentInstance.registerDefinition(DocWcCreateEditor3);}

const DocWcCreateEditor4 = class DocWcCreateEditor4 extends BaseEditor {
    static __style = ``;
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
        blocks: { 'default':`<av-code-editor name="Component Example">
    });
}
    getClassName() {
        return "DocWcCreateEditor4";
    }
    startupFile() {
        return "ComponentExample/src/Clock/Clock.wcv.avt";
    }
}
DocWcCreateEditor4.Namespace=`AventusWebsite`;
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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Create</h1><p>In this section you are going to learn what is a webcomponent and how you can create it inside Aventus.</p><h2>Definition</h2><p>Web Components is a suite of different technologies allowing you to create reusable custom elements — with their
    });
}
    getClassName() {
        return "DocWcCreate";
    }
    Title() {
        return "AventusJs - Webcomponent create";
    }
    Description() {
        return "Create your first webcomponent with AventusJs";
    }
    Keywords() {
        return ["Webcomponent", "Custom element", "Creation"];
    }
}
DocWcCreate.Namespace=`AventusWebsite`;
DocWcCreate.Tag=`av-doc-wc-create`;
_.DocWcCreate=DocWcCreate;
if(!window.customElements.get('av-doc-wc-create')){window.customElements.define('av-doc-wc-create', DocWcCreate);Aventus.WebComponentInstance.registerDefinition(DocWcCreate);}

const DocWcInheritanceEditor2Input = class DocWcInheritanceEditor2Input extends DocWcInheritanceEditor2Fillable {
    static __style = ``;
    __getStatic() {
        return DocWcInheritanceEditor2Input;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcInheritanceEditor2Input.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<input _id="docwcinheritanceeditor2input_0" />` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "elements": [
    {
      "name": "inputEl",
      "ids": [
        "docwcinheritanceeditor2input_0"
      ]
    }
  ],
  "events": [
    {
      "eventName": "input",
      "id": "docwcinheritanceeditor2input_0",
      "fct": (e, c) => c.comp.triggerChange(e)
    }
  ]
});
    getClassName() {
        return "DocWcInheritanceEditor2Input";
    }
    triggerChange() {
        this.value = this.inputEl.value;
        this.onChange.trigger([this.value]);
    }
    onValueChange() {
        this.inputEl.value = this.value ?? '&nbsp;';
    }
}
DocWcInheritanceEditor2Input.Namespace=`AventusWebsite`;
DocWcInheritanceEditor2Input.Tag=`av-doc-wc-inheritance-editor-2-input`;
_.DocWcInheritanceEditor2Input=DocWcInheritanceEditor2Input;
if(!window.customElements.get('av-doc-wc-inheritance-editor-2-input')){window.customElements.define('av-doc-wc-inheritance-editor-2-input', DocWcInheritanceEditor2Input);Aventus.WebComponentInstance.registerDefinition(DocWcInheritanceEditor2Input);}

const DocWcInheritanceEditor2 = class DocWcInheritanceEditor2 extends DocWcInheritanceEditor1 {
    static __style = ``;
    __getStatic() {
        return DocWcInheritanceEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcInheritanceEditor2.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="Inheritance/src/TextInput/TextInput.wcl.avt">
    });
}
    getClassName() {
        return "DocWcInheritanceEditor2";
    }
    startupFile() {
        return "Inheritance/src/TextInput/TextInput.wcv.avt";
    }
    hightlightFiles() {
        return [
            "Inheritance/src/TextInput/TextInput.wcl.avt",
            "Inheritance/src/TextInput/TextInput.wcv.avt",
        ];
    }
    defineResult() {
        let el = new DocWcInheritanceEditor2Input();
        el.label = "salut";
        return el;
    }
}
DocWcInheritanceEditor2.Namespace=`AventusWebsite`;
DocWcInheritanceEditor2.Tag=`av-doc-wc-inheritance-editor-2`;
_.DocWcInheritanceEditor2=DocWcInheritanceEditor2;
if(!window.customElements.get('av-doc-wc-inheritance-editor-2')){window.customElements.define('av-doc-wc-inheritance-editor-2', DocWcInheritanceEditor2);Aventus.WebComponentInstance.registerDefinition(DocWcInheritanceEditor2);}

const DocWcInheritanceEditor3Input = class DocWcInheritanceEditor3Input extends DocWcInheritanceEditor3Fillable {
    static __style = ``;
    __getStatic() {
        return DocWcInheritanceEditor3Input;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcInheritanceEditor3Input.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'error':`
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "elements": [
    {
      "name": "inputEl",
      "ids": [
        "docwcinheritanceeditor3input_0"
      ]
    }
  ],
  "events": [
    {
      "eventName": "input",
      "id": "docwcinheritanceeditor3input_0",
      "fct": (e, c) => c.comp.triggerChange(e)
    }
  ]
});
    getClassName() {
        return "DocWcInheritanceEditor3Input";
    }
    triggerChange() {
        this.value = this.inputEl.value;
        this.onChange.trigger([this.value]);
    }
    onValueChange() {
        this.inputEl.value = this.value ?? '&nbsp;';
    }
}
DocWcInheritanceEditor3Input.Namespace=`AventusWebsite`;
DocWcInheritanceEditor3Input.Tag=`av-doc-wc-inheritance-editor-3-input`;
_.DocWcInheritanceEditor3Input=DocWcInheritanceEditor3Input;
if(!window.customElements.get('av-doc-wc-inheritance-editor-3-input')){window.customElements.define('av-doc-wc-inheritance-editor-3-input', DocWcInheritanceEditor3Input);Aventus.WebComponentInstance.registerDefinition(DocWcInheritanceEditor3Input);}

const DocWcInheritanceEditor3 = class DocWcInheritanceEditor3 extends DocWcInheritanceEditor2 {
    static __style = ``;
    __getStatic() {
        return DocWcInheritanceEditor3;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcInheritanceEditor3.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="html" filename="Inheritance/src/Fillable/Fillable.wcv.avt">
    });
}
    getClassName() {
        return "DocWcInheritanceEditor3";
    }
    startupFile() {
        return "Inheritance/src/Fillable/Fillable.wcv.avt";
    }
    hightlightFiles() {
        return [
            "Inheritance/src/Fillable/Fillable.wcv.avt",
            "Inheritance/src/TextInput/TextInput.wcv.avt"
        ];
    }
    defineResult() {
        let el = new DocWcInheritanceEditor3Input();
        el.label = "salut";
        return el;
    }
}
DocWcInheritanceEditor3.Namespace=`AventusWebsite`;
DocWcInheritanceEditor3.Tag=`av-doc-wc-inheritance-editor-3`;
_.DocWcInheritanceEditor3=DocWcInheritanceEditor3;
if(!window.customElements.get('av-doc-wc-inheritance-editor-3')){window.customElements.define('av-doc-wc-inheritance-editor-3', DocWcInheritanceEditor3);Aventus.WebComponentInstance.registerDefinition(DocWcInheritanceEditor3);}

const DocWcInheritanceEditor4 = class DocWcInheritanceEditor4 extends DocWcInheritanceEditor3 {
    static __style = ``;
    __getStatic() {
        return DocWcInheritanceEditor4;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcInheritanceEditor4.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="Inheritance/src/CheckboxInput/CheckboxInput.wcl.avt">
    });
}
    getClassName() {
        return "DocWcInheritanceEditor4";
    }
    startupFile() {
        return "Inheritance/src/CheckboxInput/CheckboxInput.wcl.avt";
    }
    hightlightFiles() {
        return [
            "Inheritance/src/CheckboxInput/CheckboxInput.wcl.avt",
            "Inheritance/src/CheckboxInput/CheckboxInput.wcv.avt",
            "Inheritance/static/index.html"
        ];
    }
    defineResult() {
        let el = new DocWcInheritanceEditor4Checkbox();
        el.label = "salut";
        return el;
    }
}
DocWcInheritanceEditor4.Namespace=`AventusWebsite`;
DocWcInheritanceEditor4.Tag=`av-doc-wc-inheritance-editor-4`;
_.DocWcInheritanceEditor4=DocWcInheritanceEditor4;
if(!window.customElements.get('av-doc-wc-inheritance-editor-4')){window.customElements.define('av-doc-wc-inheritance-editor-4', DocWcInheritanceEditor4);Aventus.WebComponentInstance.registerDefinition(DocWcInheritanceEditor4);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Inheritance</h1><p>In this section you are going to learn how you can create complex component based on inheritance. This is useful when
    });
}
    getClassName() {
        return "DocWcInheritance";
    }
    Title() {
        return "AventusJs - Inheritance";
    }
    Description() {
        return "Use inheritance inside your webcomponent";
    }
    Keywords() {
        return ["OOP", "Inheritance", "Generic", "Class", "Interface", "Webcomponent"];
    }
}
DocWcInheritance.Namespace=`AventusWebsite`;
DocWcInheritance.Tag=`av-doc-wc-inheritance`;
_.DocWcInheritance=DocWcInheritance;
if(!window.customElements.get('av-doc-wc-inheritance')){window.customElements.define('av-doc-wc-inheritance', DocWcInheritance);Aventus.WebComponentInstance.registerDefinition(DocWcInheritance);}

const DocWcAttributeEditor1 = class DocWcAttributeEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcAttributeEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcAttributeEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Attribute">
    });
}
    getClassName() {
        return "DocWcAttributeEditor1";
    }
    defineResult() {
        const cont = document.createElement("DIV");
        const ex1 = new DocWcAttributeEditor1Example();
        cont.appendChild(ex1);
        const ex2 = new DocWcAttributeEditor1Example();
        ex2.active = true;
        cont.appendChild(ex2);
        return cont;
    }
}
DocWcAttributeEditor1.Namespace=`AventusWebsite`;
DocWcAttributeEditor1.Tag=`av-doc-wc-attribute-editor-1`;
_.DocWcAttributeEditor1=DocWcAttributeEditor1;
if(!window.customElements.get('av-doc-wc-attribute-editor-1')){window.customElements.define('av-doc-wc-attribute-editor-1', DocWcAttributeEditor1);Aventus.WebComponentInstance.registerDefinition(DocWcAttributeEditor1);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Attribute</h1><p>In this section you are going to learn what is an attribute on a webcomponent and how you can create it inside
    });
}
    getClassName() {
        return "DocWcAttribute";
    }
    Title() {
        return "AventusJs - Attribute";
    }
    Description() {
        return "Use attribute on your webcomponent";
    }
    Keywords() {
        return ["Html", "Webcomponent", "Attribute", "Tag"];
    }
}
DocWcAttribute.Namespace=`AventusWebsite`;
DocWcAttribute.Tag=`av-doc-wc-attribute`;
_.DocWcAttribute=DocWcAttribute;
if(!window.customElements.get('av-doc-wc-attribute')){window.customElements.define('av-doc-wc-attribute', DocWcAttribute);Aventus.WebComponentInstance.registerDefinition(DocWcAttribute);}

const DocWcPropertyEditor1 = class DocWcPropertyEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcPropertyEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcPropertyEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Property">
    });
}
    getClassName() {
        return "DocWcPropertyEditor1";
    }
    defineResult() {
        return new DocWcPropertyEditor1Example();
    }
}
DocWcPropertyEditor1.Namespace=`AventusWebsite`;
DocWcPropertyEditor1.Tag=`av-doc-wc-property-editor-1`;
_.DocWcPropertyEditor1=DocWcPropertyEditor1;
if(!window.customElements.get('av-doc-wc-property-editor-1')){window.customElements.define('av-doc-wc-property-editor-1', DocWcPropertyEditor1);Aventus.WebComponentInstance.registerDefinition(DocWcPropertyEditor1);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Property</h1><p>In this section you are going to learn how you can define property for your component and add a callback when the
    });
}
    getClassName() {
        return "DocWcProperty";
    }
    Title() {
        return "AventusJs - Property";
    }
    Description() {
        return "Create property to watch change on tag attribute";
    }
    Keywords() {
        return ["Property", "Tag", "Attribute", "Dynamic"];
    }
}
DocWcProperty.Namespace=`AventusWebsite`;
DocWcProperty.Tag=`av-doc-wc-property`;
_.DocWcProperty=DocWcProperty;
if(!window.customElements.get('av-doc-wc-property')){window.customElements.define('av-doc-wc-property', DocWcProperty);Aventus.WebComponentInstance.registerDefinition(DocWcProperty);}

const DocWcWatchEditor1Example = class DocWcWatchEditor1Example extends Aventus.WebComponent {
    get 'person'() {
						return this.__watch["person"];
					}
					set 'person'(val) {
						this.__watch["person"] = val;
					}
    this.__addWatchesActions("person", ((target, action, path, value) => {
    console.log(Aventus.WatchAction[action] + " on " + path + " with value " + value);
}));
}
    static __style = ``;
    __getStatic() {
        return DocWcWatchEditor1Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcWatchEditor1Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div _id="docwcwatcheditor1example_0"></div>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "content": {
    "docwcwatcheditor1example_0°@HTML": {
      "fct": (c) => `Person : ${c.print(c.comp.__1d73932a074defa613098ba098ac55e1method0())}`
    }
  }
});
    getClassName() {
        return "DocWcWatchEditor1Example";
    }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["person"] = undefined;
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('person');
    postCreation() {
        this.person = new DocWcWatchEditor1Person();
    }
    __1d73932a074defa613098ba098ac55e1method0() {
        return this.person?.name;
    }
}
DocWcWatchEditor1Example.Namespace=`AventusWebsite`;
DocWcWatchEditor1Example.Tag=`av-doc-wc-watch-editor-1-example`;
_.DocWcWatchEditor1Example=DocWcWatchEditor1Example;
if(!window.customElements.get('av-doc-wc-watch-editor-1-example')){window.customElements.define('av-doc-wc-watch-editor-1-example', DocWcWatchEditor1Example);Aventus.WebComponentInstance.registerDefinition(DocWcWatchEditor1Example);}

const DocWcWatchEditor1 = class DocWcWatchEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcWatchEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcWatchEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Watch">
    });
}
    getClassName() {
        return "DocWcWatchEditor1";
    }
    defineResult() {
        return new DocWcWatchEditor1Example();
    }
}
DocWcWatchEditor1.Namespace=`AventusWebsite`;
DocWcWatchEditor1.Tag=`av-doc-wc-watch-editor-1`;
_.DocWcWatchEditor1=DocWcWatchEditor1;
if(!window.customElements.get('av-doc-wc-watch-editor-1')){window.customElements.define('av-doc-wc-watch-editor-1', DocWcWatchEditor1);Aventus.WebComponentInstance.registerDefinition(DocWcWatchEditor1);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Watch</h1><p>In this section you are going to learn how you can define variables for your component that will fire a callback when
    });
}
    getClassName() {
        return "DocWcWatch";
    }
    Title() {
        return "AventusJs - Watch";
    }
    Description() {
        return "Add dyamic variable into your webcomponent";
    }
    Keywords() {
        return ["Watch", "Reactivity", "Dynamic", "Watcher", "Webcomponent"];
    }
}
DocWcWatch.Namespace=`AventusWebsite`;
DocWcWatch.Tag=`av-doc-wc-watch`;
_.DocWcWatch=DocWcWatch;
if(!window.customElements.get('av-doc-wc-watch')){window.customElements.define('av-doc-wc-watch', DocWcWatch);Aventus.WebComponentInstance.registerDefinition(DocWcWatch);}

const DocWcStyleEditor1 = class DocWcStyleEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcStyleEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcStyleEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Style">
    });
}
    getClassName() {
        return "DocWcStyleEditor1";
    }
    startupFile() {
        return 'Style/src/Example/Example.wcs.avt';
    }
    defineResult() {
        const el = document.createElement("DIV");
        const ex1 = new DocWcStyleEditor1Result();
        el.appendChild(ex1);
        const ex2 = new DocWcStyleEditor1Result();
        ex2.active = true;
        el.appendChild(ex2);
        return el;
    }
}
DocWcStyleEditor1.Namespace=`AventusWebsite`;
DocWcStyleEditor1.Tag=`av-doc-wc-style-editor-1`;
_.DocWcStyleEditor1=DocWcStyleEditor1;
if(!window.customElements.get('av-doc-wc-style-editor-1')){window.customElements.define('av-doc-wc-style-editor-1', DocWcStyleEditor1);Aventus.WebComponentInstance.registerDefinition(DocWcStyleEditor1);}

const DocWcStyleEditor2Child = class DocWcStyleEditor2Child extends DocWcStyleEditor2Parent {
    static __style = `:host .title{color:blue}`;
    __getStatic() {
        return DocWcStyleEditor2Child;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcStyleEditor2Child.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<slot></slot>` }
    });
}
    getClassName() {
        return "DocWcStyleEditor2Child";
    }
}
DocWcStyleEditor2Child.Namespace=`AventusWebsite`;
DocWcStyleEditor2Child.Tag=`av-doc-wc-style-editor-2-child`;
_.DocWcStyleEditor2Child=DocWcStyleEditor2Child;
if(!window.customElements.get('av-doc-wc-style-editor-2-child')){window.customElements.define('av-doc-wc-style-editor-2-child', DocWcStyleEditor2Child);Aventus.WebComponentInstance.registerDefinition(DocWcStyleEditor2Child);}

const DocWcStyleEditor2 = class DocWcStyleEditor2 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcStyleEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcStyleEditor2.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Style">
    });
}
    getClassName() {
        return "DocWcStyleEditor2";
    }
    startupFile() {
        return 'Style/src/Child/Child.wcs.avt';
    }
    hightlightFiles() {
        return [
            'Style/src/Child/Child.wcs.avt',
            'Style/src/Parent/Parent.wcs.avt'
        ];
    }
    defineResult() {
        const el = document.createElement("DIV");
        const ex1 = new DocWcStyleEditor2Child();
        el.appendChild(ex1);
        const ex2 = new DocWcStyleEditor2Parent();
        el.appendChild(ex2);
        return el;
    }
}
DocWcStyleEditor2.Namespace=`AventusWebsite`;
DocWcStyleEditor2.Tag=`av-doc-wc-style-editor-2`;
_.DocWcStyleEditor2=DocWcStyleEditor2;
if(!window.customElements.get('av-doc-wc-style-editor-2')){window.customElements.define('av-doc-wc-style-editor-2', DocWcStyleEditor2);Aventus.WebComponentInstance.registerDefinition(DocWcStyleEditor2);}

const DocWcStyleEditor4 = class DocWcStyleEditor4 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcStyleEditor4;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcStyleEditor4.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Style">
    });
}
    getClassName() {
        return "DocWcStyleEditor4";
    }
    defineResult() {
        return new DocWcStyleEditor4Example();
    }
}
DocWcStyleEditor4.Namespace=`AventusWebsite`;
DocWcStyleEditor4.Tag=`av-doc-wc-style-editor-4`;
_.DocWcStyleEditor4=DocWcStyleEditor4;
if(!window.customElements.get('av-doc-wc-style-editor-4')){window.customElements.define('av-doc-wc-style-editor-4', DocWcStyleEditor4);Aventus.WebComponentInstance.registerDefinition(DocWcStyleEditor4);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Style</h1><p>In this section you are going to learn how to apply a style to your component.</p><h2>Definition</h2><p>Because Aventus is build on the top of webcomponent, the style is scoped. It means that the style from Component 1
    });
}
    getClassName() {
        return "DocWcStyle";
    }
    Title() {
        return "AventusJs - Style";
    }
    Description() {
        return "How to manage style inside AventusJs to design your component";
    }
    Keywords() {
        return ["css", "style", "design", "scss", "Webcomponent"];
    }
}
DocWcStyle.Namespace=`AventusWebsite`;
DocWcStyle.Tag=`av-doc-wc-style`;
_.DocWcStyle=DocWcStyle;
if(!window.customElements.get('av-doc-wc-style')){window.customElements.define('av-doc-wc-style', DocWcStyle);Aventus.WebComponentInstance.registerDefinition(DocWcStyle);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Interpolation</h1><p>In this section you are going to learn how to use interpolation inside webcomponent.</p><p>Interpolation refers to embedding expressions into marked up text. You can notify an interpolation by using <span class="cn">&#123;&#123; myCode &#125;&#125;</span>. Interpolation can be written anywhere inside a <span class="cn">*.wcv.avt</span>. If the variable is a <span class="cn"><av-router-link state="/docs/wc/property">Property</av-router-link></span> or a <span class="cn"><av-router-link state="/docs/wc/watch">Watch</av-router-link></span> the view will be auto refreshed when the value changed.</p><av-doc-wc-interpolation-editor-1></av-doc-wc-interpolation-editor-1><p>Because Aventus is using a <span class="cn">Signal</span> like system, any function that is using watchable variable will be auto refreshed when a value changed</p>` }
    });
}
    getClassName() {
        return "DocWcInterpolation";
    }
    Title() {
        return "AventusJs - Interpolation";
    }
    Description() {
        return "Interpolate your variable inside your view to make them dynamic";
    }
    Keywords() {
        return ['Dynamic', "interpolation", "view", "Webcomponent"];
    }
}
DocWcInterpolation.Namespace=`AventusWebsite`;
DocWcInterpolation.Tag=`av-doc-wc-interpolation`;
_.DocWcInterpolation=DocWcInterpolation;
if(!window.customElements.get('av-doc-wc-interpolation')){window.customElements.define('av-doc-wc-interpolation', DocWcInterpolation);Aventus.WebComponentInstance.registerDefinition(DocWcInterpolation);}

const DocWcBindingEditor1 = class DocWcBindingEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcBindingEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcBindingEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Binding">
    });
}
    getClassName() {
        return "DocWcBindingEditor1";
    }
    startupFile() {
        return "Binding/src/Example/Example.wcv.avt";
    }
    hightlightFiles() {
        return [
            "Binding/src/Example/Example.wcl.avt",
            "Binding/src/Example/Example.wcv.avt",
        ];
    }
    defineResult() {
        return new DocWcBindingEditor1Example();
    }
}
DocWcBindingEditor1.Namespace=`AventusWebsite`;
DocWcBindingEditor1.Tag=`av-doc-wc-binding-editor-1`;
_.DocWcBindingEditor1=DocWcBindingEditor1;
if(!window.customElements.get('av-doc-wc-binding-editor-1')){window.customElements.define('av-doc-wc-binding-editor-1', DocWcBindingEditor1);Aventus.WebComponentInstance.registerDefinition(DocWcBindingEditor1);}

const DocWcBindingEditor2 = class DocWcBindingEditor2 extends DocWcBindingEditor1 {
    static __style = ``;
    __getStatic() {
        return DocWcBindingEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcBindingEditor2.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="html" filename="Binding/src/Example/Example.wcv.avt">
    });
}
    getClassName() {
        return "DocWcBindingEditor2";
    }
    defineResult() {
        return new DocWcBindingEditor2Example();
    }
}
DocWcBindingEditor2.Namespace=`AventusWebsite`;
DocWcBindingEditor2.Tag=`av-doc-wc-binding-editor-2`;
_.DocWcBindingEditor2=DocWcBindingEditor2;
if(!window.customElements.get('av-doc-wc-binding-editor-2')){window.customElements.define('av-doc-wc-binding-editor-2', DocWcBindingEditor2);Aventus.WebComponentInstance.registerDefinition(DocWcBindingEditor2);}

const DocWcBindingEditor3Example = class DocWcBindingEditor3Example extends Aventus.WebComponent {
    get 'value'() {
						return this.__watch["value"];
					}
					set 'value'(val) {
						this.__watch["value"] = val;
					}
    this.__addWatchesActions("value");
}
    static __style = ``;
    __getStatic() {
        return DocWcBindingEditor3Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcBindingEditor3Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<av-doc-wc-binding-editor-3-input _id="docwcbindingeditor3example_0"></av-doc-wc-binding-editor-3-input><p _id="docwcbindingeditor3example_1"></p>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "content": {
    "docwcbindingeditor3example_1°@HTML": {
      "fct": (c) => `${c.print(c.comp.__77083cda2f6373a8d72b2660cd45bdf9method2())}`,
      "once": true
    }
  },
  "bindings": [
    {
      "id": "docwcbindingeditor3example_0",
      "injectionName": "val",
      "eventNames": [
        "onChange"
      ],
      "inject": (c) => c.comp.__77083cda2f6373a8d72b2660cd45bdf9method0(),
      "extract": (c, v) => c.comp.__77083cda2f6373a8d72b2660cd45bdf9method1(v),
      "once": true,
      "isCallback": true
    }
  ]
});
    getClassName() {
        return "DocWcBindingEditor3Example";
    }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["value"] = "My value";
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('value');
    __77083cda2f6373a8d72b2660cd45bdf9method2() {
        return this.value;
    }
    __77083cda2f6373a8d72b2660cd45bdf9method0() {
        return this.value;
    }
    __77083cda2f6373a8d72b2660cd45bdf9method1(v) {
        if (this) {
            this.value = v;
        }
    }
}
DocWcBindingEditor3Example.Namespace=`AventusWebsite`;
DocWcBindingEditor3Example.Tag=`av-doc-wc-binding-editor-3-example`;
_.DocWcBindingEditor3Example=DocWcBindingEditor3Example;
if(!window.customElements.get('av-doc-wc-binding-editor-3-example')){window.customElements.define('av-doc-wc-binding-editor-3-example', DocWcBindingEditor3Example);Aventus.WebComponentInstance.registerDefinition(DocWcBindingEditor3Example);}

const DocWcBindingEditor3 = class DocWcBindingEditor3 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcBindingEditor3;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcBindingEditor3.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Binding">
    });
}
    getClassName() {
        return "DocWcBindingEditor3";
    }
    startupFile() {
        return "Binding/src/Example/Example.wcv.avt";
    }
    hightlightFiles() {
        return [
            "Binding/src/Example/Example.wcl.avt",
            "Binding/src/Example/Example.wcv.avt",
        ];
    }
    defineResult() {
        return new DocWcBindingEditor3Example();
    }
}
DocWcBindingEditor3.Namespace=`AventusWebsite`;
DocWcBindingEditor3.Tag=`av-doc-wc-binding-editor-3`;
_.DocWcBindingEditor3=DocWcBindingEditor3;
if(!window.customElements.get('av-doc-wc-binding-editor-3')){window.customElements.define('av-doc-wc-binding-editor-3', DocWcBindingEditor3);Aventus.WebComponentInstance.registerDefinition(DocWcBindingEditor3);}

const DocWcBindingEditor4Example = class DocWcBindingEditor4Example extends Aventus.WebComponent {
    get 'value'() {
						return this.__watch["value"];
					}
					set 'value'(val) {
						this.__watch["value"] = val;
					}
    this.__addWatchesActions("value");
}
    static __style = ``;
    __getStatic() {
        return DocWcBindingEditor4Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcBindingEditor4Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<av-doc-wc-binding-editor-4-input _id="docwcbindingeditor4example_0"></av-doc-wc-binding-editor-4-input><p _id="docwcbindingeditor4example_1"></p>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "content": {
    "docwcbindingeditor4example_1°@HTML": {
      "fct": (c) => `${c.print(c.comp.__e31c65bc70f15a42dc3a676fbe4e86abmethod2())}`,
      "once": true
    }
  },
  "bindings": [
    {
      "id": "docwcbindingeditor4example_0",
      "injectionName": "val",
      "eventNames": [
        "onNewVal"
      ],
      "inject": (c) => c.comp.__e31c65bc70f15a42dc3a676fbe4e86abmethod0(),
      "extract": (c, v) => c.comp.__e31c65bc70f15a42dc3a676fbe4e86abmethod1(v),
      "once": true,
      "isCallback": true
    }
  ]
});
    getClassName() {
        return "DocWcBindingEditor4Example";
    }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["value"] = "My value";
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('value');
    __e31c65bc70f15a42dc3a676fbe4e86abmethod2() {
        return this.value;
    }
    __e31c65bc70f15a42dc3a676fbe4e86abmethod0() {
        return this.value;
    }
    __e31c65bc70f15a42dc3a676fbe4e86abmethod1(v) {
        if (this) {
            this.value = v;
        }
    }
}
DocWcBindingEditor4Example.Namespace=`AventusWebsite`;
DocWcBindingEditor4Example.Tag=`av-doc-wc-binding-editor-4-example`;
_.DocWcBindingEditor4Example=DocWcBindingEditor4Example;
if(!window.customElements.get('av-doc-wc-binding-editor-4-example')){window.customElements.define('av-doc-wc-binding-editor-4-example', DocWcBindingEditor4Example);Aventus.WebComponentInstance.registerDefinition(DocWcBindingEditor4Example);}

const DocWcBindingEditor4 = class DocWcBindingEditor4 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcBindingEditor4;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcBindingEditor4.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Binding">
    });
}
    getClassName() {
        return "DocWcBindingEditor4";
    }
    startupFile() {
        return "Binding/src/Example/Example.wcv.avt";
    }
    hightlightFiles() {
        return [];
    }
    defineResult() {
        return new DocWcBindingEditor4Example();
    }
}
DocWcBindingEditor4.Namespace=`AventusWebsite`;
DocWcBindingEditor4.Tag=`av-doc-wc-binding-editor-4`;
_.DocWcBindingEditor4=DocWcBindingEditor4;
if(!window.customElements.get('av-doc-wc-binding-editor-4')){window.customElements.define('av-doc-wc-binding-editor-4', DocWcBindingEditor4);Aventus.WebComponentInstance.registerDefinition(DocWcBindingEditor4);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Binding</h1><p>In this section you are going to learn how to bind data between parent and child component.</p><p>The data binding is a mix between <av-router-link state="/docs/wc/injection">Injection</av-router-link> and
    });
}
    getClassName() {
        return "DocWcBinding";
    }
    Title() {
        return "AventusJs - Binding";
    }
    Description() {
        return "Bind you data in 2 way";
    }
    Keywords() {
        return ["2 way", "bidirectional", "bind", "binding"];
    }
}
DocWcBinding.Namespace=`AventusWebsite`;
DocWcBinding.Tag=`av-doc-wc-binding`;
_.DocWcBinding=DocWcBinding;
if(!window.customElements.get('av-doc-wc-binding')){window.customElements.define('av-doc-wc-binding', DocWcBinding);Aventus.WebComponentInstance.registerDefinition(DocWcBinding);}

const DocWcInjectionEditor1 = class DocWcInjectionEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcInjectionEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcInjectionEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Injection">
    });
}
    getClassName() {
        return "DocWcInjectionEditor1";
    }
    defineResult() {
        return new DocWcInjectionEditor1Example();
    }
}
DocWcInjectionEditor1.Namespace=`AventusWebsite`;
DocWcInjectionEditor1.Tag=`av-doc-wc-injection-editor-1`;
_.DocWcInjectionEditor1=DocWcInjectionEditor1;
if(!window.customElements.get('av-doc-wc-injection-editor-1')){window.customElements.define('av-doc-wc-injection-editor-1', DocWcInjectionEditor1);Aventus.WebComponentInstance.registerDefinition(DocWcInjectionEditor1);}

const DocWcInjectionEditor2 = class DocWcInjectionEditor2 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcInjectionEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcInjectionEditor2.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Injection">
    });
}
    getClassName() {
        return "DocWcInjectionEditor2";
    }
    defineResult() {
        return new DocWcInjectionEditor2Example();
    }
}
DocWcInjectionEditor2.Namespace=`AventusWebsite`;
DocWcInjectionEditor2.Tag=`av-doc-wc-injection-editor-2`;
_.DocWcInjectionEditor2=DocWcInjectionEditor2;
if(!window.customElements.get('av-doc-wc-injection-editor-2')){window.customElements.define('av-doc-wc-injection-editor-2', DocWcInjectionEditor2);Aventus.WebComponentInstance.registerDefinition(DocWcInjectionEditor2);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Injection</h1><p>In this section you are going to learn how you can inject data from parent into the child.</p><h2>Add injection</h2><p>To bind add an injection on a child inside the shadowroot, you can use the following syntax : <span class="cn">:fieldOnChild=""</span></p><p>With the code below, the input value will be incremented each second</p><av-doc-wc-injection-editor-1></av-doc-wc-injection-editor-1><p>The injected value will be refreshed only if you use a <span class="cn">Property</span> or any <span class="cn">watchables variables</span></p><av-doc-wc-injection-editor-2></av-doc-wc-injection-editor-2><p>To help the user find out which fields are injectable into your component, you can use the <span class="cn">@Injectable</span> decorator.</p><av-doc-wc-injection-editor-3></av-doc-wc-injection-editor-3>` }
    });
}
    getClassName() {
        return "DocWcInjection";
    }
    Title() {
        return "AventusJs - Injection";
    }
    Description() {
        return "Injection value inside children tags";
    }
    Keywords() {
        return ["Injection", "Webcomponent", "single way"];
    }
}
DocWcInjection.Namespace=`AventusWebsite`;
DocWcInjection.Tag=`av-doc-wc-injection`;
_.DocWcInjection=DocWcInjection;
if(!window.customElements.get('av-doc-wc-injection')){window.customElements.define('av-doc-wc-injection', DocWcInjection);Aventus.WebComponentInstance.registerDefinition(DocWcInjection);}

const DocWcLoopEditor1TodoList = class DocWcLoopEditor1TodoList extends Aventus.WebComponent {
    get 'todos'() {
						return this.__watch["todos"];
					}
					set 'todos'(val) {
						this.__watch["todos"] = val;
					}
    __registerWatchesActions() {
    this.__addWatchesActions("todos");
}
    static __style = ``;
    __getStatic() {
        return DocWcLoopEditor1TodoList;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcLoopEditor1TodoList.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Todos</h1><template _id="docwcloopeditor1todolist_0"></template><button _id="docwcloopeditor1todolist_4">Add</button>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "events": [
    {
      "eventName": "click",
      "id": "docwcloopeditor1todolist_4",
      "fct": (e, c) => c.comp.addTodo(e)
    }
  ]
});
  "content": {
    "docwcloopeditor1todolist_1°@HTML": {
      "fct": (c) => `${c.print(c.comp.__c8e599cb8d8cef45f2c845cb1508ac1cmethod2(c.data.i))}`
    }
  }
});
                    anchorId: 'docwcloopeditor1todolist_0',
                    template: templ0,
                simple:{data: "this.todos",index:"i"}
  "content": {
    "docwcloopeditor1todolist_3°@HTML": {
      "fct": (c) => `${c.print(c.comp.__c8e599cb8d8cef45f2c845cb1508ac1cmethod3(c.data.i))}-${c.print(c.comp.__c8e599cb8d8cef45f2c845cb1508ac1cmethod4(c.data.j))}. ${c.print(c.comp.__c8e599cb8d8cef45f2c845cb1508ac1cmethod5(c.data.i,c.data.j))}`
    }
  }
});
                    anchorId: 'docwcloopeditor1todolist_2',
                    template: templ1,
                simple:{data: "this.todos[i].tasks",index:"j"}
    getClassName() {
        return "DocWcLoopEditor1TodoList";
    }
    __defaultValuesWatch(w) { super.__defaultValuesWatch(w); w["todos"] = [];
    __upgradeAttributes() { super.__upgradeAttributes(); this.__correctGetter('todos');
    addTodo() {
        this.todoId++;
        let todo = new DocWcLoopEditor1Todo();
        todo.name = "My todo " + this.todoId;
        todo.tasks = ["task1", "task2"];
        this.todos.push(todo);
    }
    __c8e599cb8d8cef45f2c845cb1508ac1cmethod2(i) {
        return this.todos[i].name;
    }
    __c8e599cb8d8cef45f2c845cb1508ac1cmethod3(i) {
        return i + 1;
    }
    __c8e599cb8d8cef45f2c845cb1508ac1cmethod4(j) {
        return j + 1;
    }
    __c8e599cb8d8cef45f2c845cb1508ac1cmethod5(i, j) {
        return this.todos[i].tasks[j];
    }
}
DocWcLoopEditor1TodoList.Namespace=`AventusWebsite`;
DocWcLoopEditor1TodoList.Tag=`av-doc-wc-loop-editor-1-todo-list`;
_.DocWcLoopEditor1TodoList=DocWcLoopEditor1TodoList;
if(!window.customElements.get('av-doc-wc-loop-editor-1-todo-list')){window.customElements.define('av-doc-wc-loop-editor-1-todo-list', DocWcLoopEditor1TodoList);Aventus.WebComponentInstance.registerDefinition(DocWcLoopEditor1TodoList);}

const DocWcLoopEditor1 = class DocWcLoopEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcLoopEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcLoopEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="For">
    });
}
    getClassName() {
        return "DocWcLoopEditor1";
    }
    defineResult() {
        return new DocWcLoopEditor1TodoList();
    }
    startupFile() {
        return 'For/src/TodoList/TodoList.wcv.avt';
    }
}
DocWcLoopEditor1.Namespace=`AventusWebsite`;
DocWcLoopEditor1.Tag=`av-doc-wc-loop-editor-1`;
_.DocWcLoopEditor1=DocWcLoopEditor1;
if(!window.customElements.get('av-doc-wc-loop-editor-1')){window.customElements.define('av-doc-wc-loop-editor-1', DocWcLoopEditor1);Aventus.WebComponentInstance.registerDefinition(DocWcLoopEditor1);}

const DocWcLoopEditor2 = class DocWcLoopEditor2 extends DocWcLoopEditor1 {
    static __style = ``;
    __getStatic() {
        return DocWcLoopEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcLoopEditor2.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="html" filename="For/src/TodoList/TodoList.wcv.avt">
    });
}
    getClassName() {
        return "DocWcLoopEditor2";
    }
    defineResult() {
        return new DocWcLoopEditor2TodoList();
    }
}
DocWcLoopEditor2.Namespace=`AventusWebsite`;
DocWcLoopEditor2.Tag=`av-doc-wc-loop-editor-2`;
_.DocWcLoopEditor2=DocWcLoopEditor2;
if(!window.customElements.get('av-doc-wc-loop-editor-2')){window.customElements.define('av-doc-wc-loop-editor-2', DocWcLoopEditor2);Aventus.WebComponentInstance.registerDefinition(DocWcLoopEditor2);}

const DocWcLoopEditor3 = class DocWcLoopEditor3 extends DocWcLoopEditor2 {
    static __style = ``;
    __getStatic() {
        return DocWcLoopEditor3;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcLoopEditor3.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="html" filename="For/src/TodoList/TodoList.wcv.avt">
    });
}
    getClassName() {
        return "DocWcLoopEditor3";
    }
    defineResult() {
        return new DocWcLoopEditor3TodoList();
    }
}
DocWcLoopEditor3.Namespace=`AventusWebsite`;
DocWcLoopEditor3.Tag=`av-doc-wc-loop-editor-3`;
_.DocWcLoopEditor3=DocWcLoopEditor3;
if(!window.customElements.get('av-doc-wc-loop-editor-3')){window.customElements.define('av-doc-wc-loop-editor-3', DocWcLoopEditor3);Aventus.WebComponentInstance.registerDefinition(DocWcLoopEditor3);}

const DocWcLoopEditor4 = class DocWcLoopEditor4 extends DocWcLoopEditor3 {
    static __style = ``;
    __getStatic() {
        return DocWcLoopEditor4;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcLoopEditor4.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="html" filename="For/src/TodoList/TodoList.wcv.avt">
    });
}
    getClassName() {
        return "DocWcLoopEditor4";
    }
    defineResult() {
        return new DocWcLoopEditor4TodoList();
    }
}
DocWcLoopEditor4.Namespace=`AventusWebsite`;
DocWcLoopEditor4.Tag=`av-doc-wc-loop-editor-4`;
_.DocWcLoopEditor4=DocWcLoopEditor4;
if(!window.customElements.get('av-doc-wc-loop-editor-4')){window.customElements.define('av-doc-wc-loop-editor-4', DocWcLoopEditor4);Aventus.WebComponentInstance.registerDefinition(DocWcLoopEditor4);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Loop</h1><p>
    });
}
    getClassName() {
        return "DocWcLoop";
    }
    Title() {
        return "AventusJs - Loop";
    }
    Description() {
        return "Use loop inside your view";
    }
    Keywords() {
        return ["Loop", "for", "for in", "for of", "View", "Webcomponent"];
    }
}
DocWcLoop.Namespace=`AventusWebsite`;
DocWcLoop.Tag=`av-doc-wc-loop`;
_.DocWcLoop=DocWcLoop;
if(!window.customElements.get('av-doc-wc-loop')){window.customElements.define('av-doc-wc-loop', DocWcLoop);Aventus.WebComponentInstance.registerDefinition(DocWcLoop);}

const DocWcConditionEditor1 = class DocWcConditionEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcConditionEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcConditionEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Conditional">
    });
}
    getClassName() {
        return "DocWcConditionEditor1";
    }
    startupFile() {
        return 'Conditional/src/Example/Example.wcv.avt';
    }
    defineResult() {
        return new DocWcConditionEditor1Example();
    }
}
DocWcConditionEditor1.Namespace=`AventusWebsite`;
DocWcConditionEditor1.Tag=`av-doc-wc-condition-editor-1`;
_.DocWcConditionEditor1=DocWcConditionEditor1;
if(!window.customElements.get('av-doc-wc-condition-editor-1')){window.customElements.define('av-doc-wc-condition-editor-1', DocWcConditionEditor1);Aventus.WebComponentInstance.registerDefinition(DocWcConditionEditor1);}

const DocWcCondition = class DocWcCondition extends DocGenericPage {
    static __style = ``;
    __getStatic() {
        return DocWcCondition;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcCondition.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Conditional rendering</h1><p>Conditional rendering is a fundamental concept in web development that allows developers to display different content
    });
}
    getClassName() {
        return "DocWcCondition";
    }
    Title() {
        return "AventusJs - Condition";
    }
    Description() {
        return "Use if / else if / else to render your view";
    }
    Keywords() {
        return ["if", "else if", "else", "condition", "Dynamic", "view", "html"];
    }
}
DocWcCondition.Namespace=`AventusWebsite`;
DocWcCondition.Tag=`av-doc-wc-condition`;
_.DocWcCondition=DocWcCondition;
if(!window.customElements.get('av-doc-wc-condition')){window.customElements.define('av-doc-wc-condition', DocWcCondition);Aventus.WebComponentInstance.registerDefinition(DocWcCondition);}

const DocWcEventEditor1 = class DocWcEventEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcEventEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcEventEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Event">
    });
}
    getClassName() {
        return "DocWcEventEditor1";
    }
    startupFile() {
        return "Event/src/Example/Example.wcv.avt";
    }
    defineResult() {
        return new DocWcEventEditor1Example();
    }
}
DocWcEventEditor1.Namespace=`AventusWebsite`;
DocWcEventEditor1.Tag=`av-doc-wc-event-editor-1`;
_.DocWcEventEditor1=DocWcEventEditor1;
if(!window.customElements.get('av-doc-wc-event-editor-1')){window.customElements.define('av-doc-wc-event-editor-1', DocWcEventEditor1);Aventus.WebComponentInstance.registerDefinition(DocWcEventEditor1);}

const DocWcEventEditor2Example = class DocWcEventEditor2Example extends Aventus.WebComponent {
    static __style = ``;
    __getStatic() {
        return DocWcEventEditor2Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcEventEditor2Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<av-doc-wc-event-editor-2-button _id="docwceventeditor2example_0">Say hello</av-doc-wc-event-editor-2-button>` }
    });
}
    __registerTemplateAction() { super.__registerTemplateAction();
  "events": [
    {
      "eventName": "onCustomClick",
      "id": "docwceventeditor2example_0",
      "fct": (c, ...args) => c.comp.sayHello.apply(c.comp, ...args),
      "isCallback": true
    }
  ]
});
    getClassName() {
        return "DocWcEventEditor2Example";
    }
    sayHello() {
        alert("Hello");
    }
}
DocWcEventEditor2Example.Namespace=`AventusWebsite`;
DocWcEventEditor2Example.Tag=`av-doc-wc-event-editor-2-example`;
_.DocWcEventEditor2Example=DocWcEventEditor2Example;
if(!window.customElements.get('av-doc-wc-event-editor-2-example')){window.customElements.define('av-doc-wc-event-editor-2-example', DocWcEventEditor2Example);Aventus.WebComponentInstance.registerDefinition(DocWcEventEditor2Example);}

const DocWcEventEditor2 = class DocWcEventEditor2 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcEventEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcEventEditor2.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Event">
    });
}
    getClassName() {
        return "DocWcEventEditor2";
    }
    startupFile() {
        return 'Event/src/Example/Example.wcv.avt';
    }
    hightlightFiles() {
        return [
            'Event/src/Example/Example.wcv.avt',
            'Event/src/Button/Button.wcl.avt'
        ];
    }
    defineResult() {
        return new DocWcEventEditor2Example();
    }
}
DocWcEventEditor2.Namespace=`AventusWebsite`;
DocWcEventEditor2.Tag=`av-doc-wc-event-editor-2`;
_.DocWcEventEditor2=DocWcEventEditor2;
if(!window.customElements.get('av-doc-wc-event-editor-2')){window.customElements.define('av-doc-wc-event-editor-2', DocWcEventEditor2);Aventus.WebComponentInstance.registerDefinition(DocWcEventEditor2);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - Event</h1><p>In this section you are going to learn how you can listen to event trigger.</p><h2>Add event</h2><p>To bind an event on a child inside the shadowroot, you can use the following syntax : <span class="cn">@eventname=""</span></p><p>With the code below, an alert saying "Hello" will be opened when the button is clicked.</p><av-doc-wc-event-editor-1></av-doc-wc-event-editor-1><p>If you have an <av-router-link state="/docs/lib/callback">Aventus.Callback</av-router-link> instead of an event, you
    });
}
    getClassName() {
        return "DocWcEvent";
    }
    Title() {
        return "AventusJs - Event";
    }
    Description() {
        return "Manage events inside your webcomponent";
    }
    Keywords() {
        return ["Webcomponent", "Custom element", "Event", "Callback"];
    }
}
DocWcEvent.Namespace=`AventusWebsite`;
DocWcEvent.Tag=`av-doc-wc-event`;
_.DocWcEvent=DocWcEvent;
if(!window.customElements.get('av-doc-wc-event')){window.customElements.define('av-doc-wc-event', DocWcEvent);Aventus.WebComponentInstance.registerDefinition(DocWcEvent);}

const DocWcStateEditor1Example = class DocWcStateEditor1Example extends Aventus.WebComponent {
    static __style = ``;
    __getStatic() {
        return DocWcStateEditor1Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcStateEditor1Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="debug" _id="docwcstateeditor1example_0"></div><button _id="docwcstateeditor1example_1">Change state</button>` }
    });
}
    __createStates() { super.__createStates(); let that = this;  this.__createStatesList("/state1", DocWcStateEditor1StateManager);this.__addActiveState("/state1", DocWcStateEditor1StateManager, (state, slugs) => { that.__inactiveDefaultState(DocWcStateEditor1StateManager); that.onStateActive(state, slugs);})
    __registerTemplateAction() { super.__registerTemplateAction();
  "elements": [
    {
      "name": "debugEl",
      "ids": [
        "docwcstateeditor1example_0"
      ]
    }
  ],
  "events": [
    {
      "eventName": "click",
      "id": "docwcstateeditor1example_1",
      "fct": (e, c) => c.comp.toggleState(e)
    }
  ]
});
    getClassName() {
        return "DocWcStateEditor1Example";
    }
    onStateActive(state, slugs) {
        this.writeLog("/state1 on");
    }
    onStateInactive(state, nextState, slugs) {
        this.writeLog("/state1 off");
    }
    async onAskChange(state, nextState, slugs) {
        return confirm("set state1 off?");
    }
    writeLog(txt) {
        const div = document.createElement("DIV");
        div.innerHTML = txt;
        this.debugEl.appendChild(div);
    }
    toggleState() {
        let mainState = DocWcStateEditor1StateManager.getInstance();
        if (mainState.getState()?.name == "/state1") {
            mainState.setState("/");
        }
        else {
            mainState.setState("/state1");
        }
    }
}
DocWcStateEditor1Example.Namespace=`AventusWebsite`;
DocWcStateEditor1Example.Tag=`av-doc-wc-state-editor-1-example`;
_.DocWcStateEditor1Example=DocWcStateEditor1Example;
if(!window.customElements.get('av-doc-wc-state-editor-1-example')){window.customElements.define('av-doc-wc-state-editor-1-example', DocWcStateEditor1Example);Aventus.WebComponentInstance.registerDefinition(DocWcStateEditor1Example);}

const DocWcStateEditor1 = class DocWcStateEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocWcStateEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcStateEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="State">
    });
}
    getClassName() {
        return "DocWcStateEditor1";
    }
    defineResult() {
        return new DocWcStateEditor1Example();
    }
}
DocWcStateEditor1.Namespace=`AventusWebsite`;
DocWcStateEditor1.Tag=`av-doc-wc-state-editor-1`;
_.DocWcStateEditor1=DocWcStateEditor1;
if(!window.customElements.get('av-doc-wc-state-editor-1')){window.customElements.define('av-doc-wc-state-editor-1', DocWcStateEditor1);Aventus.WebComponentInstance.registerDefinition(DocWcStateEditor1);}

const DocWcStateEditor2Example = class DocWcStateEditor2Example extends Aventus.WebComponent {
    static __style = ``;
    __getStatic() {
        return DocWcStateEditor2Example;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcStateEditor2Example.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<div class="debug" _id="docwcstateeditor2example_0"></div><button _id="docwcstateeditor2example_1">Change state</button>` }
    });
}
    __createStates() { super.__createStates(); let that = this; this.__addActiveDefState(DocWcStateEditor2StateManager, this.onDefaultStateActive);
    __registerTemplateAction() { super.__registerTemplateAction();
  "elements": [
    {
      "name": "debugEl",
      "ids": [
        "docwcstateeditor2example_0"
      ]
    }
  ],
  "events": [
    {
      "eventName": "click",
      "id": "docwcstateeditor2example_1",
      "fct": (e, c) => c.comp.toggleState(e)
    }
  ]
});
    getClassName() {
        return "DocWcStateEditor2Example";
    }
    onStateActive(state, slugs) {
        this.writeLog("/state1 on");
    }
    onStateInactive(state, nextState, slugs) {
        this.writeLog("/state1 off");
    }
    async onAskChange(state, nextState, slugs) {
        return confirm("set state1 off?");
    }
    onDefaultStateActive() {
        this.writeLog("No state define inside the component is matching");
    }
    onDefaultStateInactive() {
        this.writeLog("The default state is now inactive because one component state is matching the active state");
    }
    writeLog(txt) {
        const div = document.createElement("DIV");
        div.innerHTML = txt;
        this.debugEl.appendChild(div);
    }
    toggleState() {
        let mainState = DocWcStateEditor2StateManager.getInstance();
        if (mainState.getState()?.name == "/state1") {
            mainState.setState("/");
        }
        else {
            mainState.setState("/state1");
        }
    }
}
DocWcStateEditor2Example.Namespace=`AventusWebsite`;
DocWcStateEditor2Example.Tag=`av-doc-wc-state-editor-2-example`;
_.DocWcStateEditor2Example=DocWcStateEditor2Example;
if(!window.customElements.get('av-doc-wc-state-editor-2-example')){window.customElements.define('av-doc-wc-state-editor-2-example', DocWcStateEditor2Example);Aventus.WebComponentInstance.registerDefinition(DocWcStateEditor2Example);}

const DocWcStateEditor2 = class DocWcStateEditor2 extends DocWcStateEditor1 {
    static __style = ``;
    __getStatic() {
        return DocWcStateEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocWcStateEditor2.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code language="typescript" filename="State/src/Example/Example.wcl.avt">
    });
}
    getClassName() {
        return "DocWcStateEditor2";
    }
    defineResult() {
        return new DocWcStateEditor2Example();
    }
}
DocWcStateEditor2.Namespace=`AventusWebsite`;
DocWcStateEditor2.Tag=`av-doc-wc-state-editor-2`;
_.DocWcStateEditor2=DocWcStateEditor2;
if(!window.customElements.get('av-doc-wc-state-editor-2')){window.customElements.define('av-doc-wc-state-editor-2', DocWcStateEditor2);Aventus.WebComponentInstance.registerDefinition(DocWcStateEditor2);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Webcomponent - State</h1><p>In this section you are going to learn how you can listen to <span class="cn">state</span> inside Webcomponent.</p><p>You can use state and stateManager to manage the lifecycle of your application. You can subscribe manually to a state
    });
}
    getClassName() {
        return "DocWcState";
    }
    Title() {
        return "AventusJs - State";
    }
    Description() {
        return "Use state inside your aventus app to centralize your data";
    }
    Keywords() {
        return ['State', "Centralization", "active", "inactive", "askChange"];
    }
}
DocWcState.Namespace=`AventusWebsite`;
DocWcState.Tag=`av-doc-wc-state`;
_.DocWcState=DocWcState;
if(!window.customElements.get('av-doc-wc-state')){window.customElements.define('av-doc-wc-state', DocWcState);Aventus.WebComponentInstance.registerDefinition(DocWcState);}

const DocLibAnimationEditor1 = class DocLibAnimationEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocLibAnimationEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibAnimationEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Animation">
    });
}
    getClassName() {
        return "DocLibAnimationEditor1";
    }
    defineResult() {
        return new DocLibAnimationEditor1Example();
    }
}
DocLibAnimationEditor1.Namespace=`AventusWebsite`;
DocLibAnimationEditor1.Tag=`av-doc-lib-animation-editor-1`;
_.DocLibAnimationEditor1=DocLibAnimationEditor1;
if(!window.customElements.get('av-doc-lib-animation-editor-1')){window.customElements.define('av-doc-lib-animation-editor-1', DocLibAnimationEditor1);Aventus.WebComponentInstance.registerDefinition(DocLibAnimationEditor1);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Library - Animation</h1><p>The animation class allow you to execute a function at specific frames. The code is based on the <span class="cn"><a href="https://developer.mozilla.org/fr/docs/Web/API/window/requestAnimationFrame" target="_blank"></a>requestAnimationFrame</span>. One use case for the class can be the following : You have
    });
}
    getClassName() {
        return "DocLibAnimation";
    }
    Title() {
        return "AventusJs - Animation";
    }
    Description() {
        return "Manage animation inside AventusJs";
    }
    Keywords() {
        return ['Animation', 'requestAnimationFrame'];
    }
}
DocLibAnimation.Namespace=`AventusWebsite`;
DocLibAnimation.Tag=`av-doc-lib-animation`;
_.DocLibAnimation=DocLibAnimation;
if(!window.customElements.get('av-doc-lib-animation')){window.customElements.define('av-doc-lib-animation', DocLibAnimation);Aventus.WebComponentInstance.registerDefinition(DocLibAnimation);}

const DocLibCallbackEditor1 = class DocLibCallbackEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocLibCallbackEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibCallbackEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Callback">
    });
}
    getClassName() {
        return "DocLibCallbackEditor1";
    }
    hightlightFiles() {
        return [
            'Callback/src/Receiver/Receiver.wcl.avt',
            'Callback/src/Emitter/Emitter.wcl.avt',
        ];
    }
    defineResult() {
        const div = document.createElement("DIV");
        div.appendChild(new DocLibCallbackEditor1Emitter());
        div.appendChild(new DocLibCallbackEditor1Receiver());
        return div;
    }
}
DocLibCallbackEditor1.Namespace=`AventusWebsite`;
DocLibCallbackEditor1.Tag=`av-doc-lib-callback-editor-1`;
_.DocLibCallbackEditor1=DocLibCallbackEditor1;
if(!window.customElements.get('av-doc-lib-callback-editor-1')){window.customElements.define('av-doc-lib-callback-editor-1', DocLibCallbackEditor1);Aventus.WebComponentInstance.registerDefinition(DocLibCallbackEditor1);}

const DocLibCallbackEditor2 = class DocLibCallbackEditor2 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocLibCallbackEditor2;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibCallbackEditor2.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="Callback">
    });
}
    getClassName() {
        return "DocLibCallbackEditor2";
    }
    hightlightFiles() {
        return [
            'Callback/src/Receiver/Receiver.wcl.avt',
            'Callback/src/Emitter/Emitter.wcl.avt',
        ];
    }
    defineResult() {
        const div = document.createElement("DIV");
        div.appendChild(new DocLibCallbackEditor2Emitter());
        div.appendChild(new DocLibCallbackEditor2Receiver());
        return div;
    }
}
DocLibCallbackEditor2.Namespace=`AventusWebsite`;
DocLibCallbackEditor2.Tag=`av-doc-lib-callback-editor-2`;
_.DocLibCallbackEditor2=DocLibCallbackEditor2;
if(!window.customElements.get('av-doc-lib-callback-editor-2')){window.customElements.define('av-doc-lib-callback-editor-2', DocLibCallbackEditor2);Aventus.WebComponentInstance.registerDefinition(DocLibCallbackEditor2);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Library - Callback</h1><p>Aventus script files are based on Typescript. The main advantage is that everything is typed but when you will use
    });
}
    getClassName() {
        return "DocLibCallback";
    }
    Title() {
        return "AventusJs - Callback";
    }
    Description() {
        return "How to manage events inside AventusJs";
    }
    Keywords() {
        return ['Callback', 'Events', 'CallbackGroup'];
    }
}
DocLibCallback.Namespace=`AventusWebsite`;
DocLibCallback.Tag=`av-doc-lib-callback`;
_.DocLibCallback=DocLibCallback;
if(!window.customElements.get('av-doc-lib-callback')){window.customElements.define('av-doc-lib-callback', DocLibCallback);Aventus.WebComponentInstance.registerDefinition(DocLibCallback);}

const DocLibDragAndDropEditor1 = class DocLibDragAndDropEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocLibDragAndDropEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibDragAndDropEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="DragDrop">
    });
}
    getClassName() {
        return "DocLibDragAndDropEditor1";
    }
    defineResult() {
        return new DocLibDragAndDropEditor1Example();
    }
}
DocLibDragAndDropEditor1.Namespace=`AventusWebsite`;
DocLibDragAndDropEditor1.Tag=`av-doc-lib-drag-and-drop-editor-1`;
_.DocLibDragAndDropEditor1=DocLibDragAndDropEditor1;
if(!window.customElements.get('av-doc-lib-drag-and-drop-editor-1')){window.customElements.define('av-doc-lib-drag-and-drop-editor-1', DocLibDragAndDropEditor1);Aventus.WebComponentInstance.registerDefinition(DocLibDragAndDropEditor1);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Library - Drag&Drop</h1><p>If you need to drag&drop a visual element you can use <span class="cn">Aventus.DragAndDrop</span>. This code will
    });
}
    getClassName() {
        return "DocLibDragAndDrop";
    }
    Title() {
        return "AventusJs - Drag and Drop";
    }
    Description() {
        return "Use drag and drop inside AventusJs";
    }
    Keywords() {
        return ["Drag", "Drop", "Touch", "Action", "Library"];
    }
}
DocLibDragAndDrop.Namespace=`AventusWebsite`;
DocLibDragAndDrop.Tag=`av-doc-lib-drag-and-drop`;
_.DocLibDragAndDrop=DocLibDragAndDrop;
if(!window.customElements.get('av-doc-lib-drag-and-drop')){window.customElements.define('av-doc-lib-drag-and-drop', DocLibDragAndDrop);Aventus.WebComponentInstance.registerDefinition(DocLibDragAndDrop);}

const DocLibPressManagerEditor1 = class DocLibPressManagerEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocLibPressManagerEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibPressManagerEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="PressManager">
    });
}
    getClassName() {
        return "DocLibPressManagerEditor1";
    }
    defineResult() {
        return new DocLibPressManagerEditor1Example();
    }
}
DocLibPressManagerEditor1.Namespace=`AventusWebsite`;
DocLibPressManagerEditor1.Tag=`av-doc-lib-press-manager-editor-1`;
_.DocLibPressManagerEditor1=DocLibPressManagerEditor1;
if(!window.customElements.get('av-doc-lib-press-manager-editor-1')){window.customElements.define('av-doc-lib-press-manager-editor-1', DocLibPressManagerEditor1);Aventus.WebComponentInstance.registerDefinition(DocLibPressManagerEditor1);}

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
    __getHtml() {
    this.__getStatic().__template.setHTML({
        blocks: { 'default':`<h1>Library - PressManager</h1><p>The <span class="cn">PressManager</span> class is a home class to deal with <span class="cn">pointer</span>, <span class="cn">touch</span> and <span class="cn">mouse</span> event. The main job of this class is to prevent the
    });
}
    getClassName() {
        return "DocLibPressManager";
    }
    Title() {
        return "AventusJs - PressManager";
    }
    Description() {
        return "Manage press to trigger single action";
    }
    Keywords() {
        return ["Press", "Mouse", "Pen", "Action", "Single", "Event", "Trigger"];
    }
}
DocLibPressManager.Namespace=`AventusWebsite`;
DocLibPressManager.Tag=`av-doc-lib-press-manager`;
_.DocLibPressManager=DocLibPressManager;
if(!window.customElements.get('av-doc-lib-press-manager')){window.customElements.define('av-doc-lib-press-manager', DocLibPressManager);Aventus.WebComponentInstance.registerDefinition(DocLibPressManager);}

const DocLibResizeObserverEditor1 = class DocLibResizeObserverEditor1 extends BaseEditor {
    static __style = ``;
    __getStatic() {
        return DocLibResizeObserverEditor1;
    }
    __getStyle() {
        let arrStyle = super.__getStyle();
        arrStyle.push(DocLibResizeObserverEditor1.__style);
        return arrStyle;
    }
    __getHtml() {
    this.__getStatic().__template.setHTML({
        slots: { 'default':`<slot></slot>` }, 
        blocks: { 'default':`<av-code-editor name="ResizeObserver">
}