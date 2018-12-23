// event(事件)工具集
var markyun = {};
markyun.Event = {
    // 页面加载完成后
    readyEvent: function(fn) {
        if(fn == null) {
            fn = document;
        }
        var oldonload = window.onload;
        if(typeof window.onload != 'function') {
            window.onload = fn;
        } else {
            window.onload = function() {
                oldonload();
                fn();
            }
        } 
    },
    // 视能力分别使用dom0 || dom2 || IE方式，来绑定事件
    // 参数： 操作的元素，事件名称，事件处理程序
    addEvent: function(element, type, handler) {
        // 事件类型、需要执行的函数、是否捕捉
        if(element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if(element.attachEvent) {
            element.attachEvent('on'+type, function() {
                handler.call(element);
            });
        } else {
            element['on' + type] = handler;
        }
    },

    // 移除事件
    removeEvent: function(element, type, handler) {
        if(element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if(element.datachEvent) {
            element.detachEvent('on'+type, handler);
        } else {
            element['on'+type] = null;
        }
    },
    // 阻止事件
    stopPropagation: function(ev) {
        if(ev.stopPropagation) {
            ev.stopPropagation();
        } else {
            ev.cancelBuble = true;
        }
    },
    // 取消事件的默认行为
    preventDefault : function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    // 获取事件目标
    getTarget : function(event) {
        return event.target || event.srcElement;
    },
    // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
    getEvent : function(e) {
        var ev = e || window.event;
        if (!ev) {
            var c = this.getEvent.caller;
            while (c) {
                ev = c.arguments[0];
                if (ev && Event == ev.constructor) {
                    break;
                }
                c = c.caller;
            }
        }
        return ev;
    }
}

// 构建式 new 出来的实例可以被监听

class Producer {
    constructor() {
        this.listeners = [];
    }

    addListener(listener) {
        if(typeof listener === 'function') {
            this.listeners.push(listener)
        } else {
            throw new Error('listener 必须是 function');
        }
    }

    removeListener(listener) {
        this.listeners.splice(this.listeners.indexOf(listener),1);
    }

    notify(message) {
        this.listeners.forEach(listener => {
            listener(message);
        })
    }
}

var eggHead = new Producer();

function listener1(message) {
    console.log(message+'from listener1');
}

function listener2(message) {
    console.log(message+'from listener2');
};

eggHead.addListener(listener1);
eggHead.addListener(listener2);

eggHead.notify('A new course!!');