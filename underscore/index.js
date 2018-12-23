
(function() {
    
    // 缓存this，浏览器的window或者服务端的exports
    var root = this;

    // 下划线库的局部变量_， 注意是个函数
    var _ = function(obj) {
        if( obj instanceof _) return obj;
        if(!this instanceof _) return new _(obj);
        this.wrapped = obj; 
    }

    // 暴露给export或者Window
    if (typeof exports !== 'undefined') {
        if(typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._=_;
    } else {
        root._ = _l
    }
    _.VERSION = '1.8.2';


    _.random = function(min, max) {
        if(max == null) {
            max = min;
            min = 0;
        }
        return min+ Math.floor(Math.random()*(max-min+1));
    }

    _now = Date.now || function() {
        return new Date().getTime();
    };

    _.noop = function () {};

    var idCounter = 0;
    _.uniqueId = function(prefix) {
        var id = ++idCounter + ''; // 转为字符串格式
        return prefix ? prefix + id: id;
    }

    var previousUnderscore = root._; // 位置在源码的开头
    _.noConflict = function() {
        root._ = previousUnderscore;
        return this;
    }

    _.identity = function(value) {
        return value;
    }

    _.constant = function(value) {
        return function() {
            return value;
        }
    }

    _.isUndefined = function(obj) {
        return obj === void 0;
    };

    _.isNull = function(obj) {
        return obj === null;
    }

    var ObjProto = Object.prototype;
    var toString = ObjProto.toString;
    var nativeIsArray = Array.isArray;

    _.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) === '[object Array]';
    }

    _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'],function(name){
        _['is'+name] = function(obj) {
            return toString.call(obj) === '[object'+name+']';
        };
    });

    _.isBoolean = function(obj) {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    }

    _.isNaN = function(obj) {
        return _.isNumber(obj) && obj !== +obj;
    }

    _.invert = function(obj) {
        var result = {};
        var keys = _.keys(obj);
        for(var i =0,length = keys.length;i<length;i++) {
            result[obj[keys[i]]] = keys[i];
        }
        return result;
    }

    21

    // 对amd支持
    if(typeof define === 'function' && define.amd) {
        define('underscore', [], function() {
            return _;
        });
    }
}).call(this);