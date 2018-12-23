const sendImg = (i) => {
    console.log('发送第'+i+'数据');
    return i;
}
function* countImgSend() { // 生成器
    for(let i=0;i<5;i++) {
        yield sendImg(i);
    };
}

const imgStore = countImgSend(); // 创建迭代器


console.log(imgStore.next())

// 有若干张图片，一个接口传输一张图片，怎么保证图片有序的传输 1，2，3，4，5，6，7.... 1传输完成才能传输2