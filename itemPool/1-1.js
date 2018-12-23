

// 1, 闭包，打印的值，什么时间打印

for(var i = 0; i< 5; i++) {
    setTimeout(function() {console.log(i)},1000*i)
 }


for(var i = 0; i< 5; i++) {
    ~function(i) {
         setTimeout(function() {console.log(i)},1000*i)
     }(i)
 }

 

