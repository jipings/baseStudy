// 通过extends继承父类，可以使用super超类继承父类的属性和方法，必须在使用this之前调用
class Any {
    constructor(props) {
        this.height = props.height || '30px';
    };
    log() {
        console.log(this.height);
        return 'Any:'+this.height;
    }
}

class Any2 extends Any {
    constructor(props) {
        super(props);
    }
    logger() {
        console.log('any:'+this.height)
    }
}
const exm = new Any2({height: '50px'});
console.log(exm,exm.log());