import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import Data from './data.xml';
import newCanvas from '../../Canvas/index'

function component() {
    var element = document.createElement('div');
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], '');
    element.classList.add('hello');
    element.id='container'
    // 添加图像到现有的 div
    var myIcon = new Image();
    myIcon.src = Icon;
    // element.appendChild(myIcon);
    console.log(Data);

    new newCanvas(element); // 添加canvas 

    return element;
}

if(module.hot){
    module.hot.accept();
    if(document.querySelector('#container')) {
        var container = document.querySelector('#container');
        document.body.removeChild(container)
    }
}
document.body.appendChild(component());
