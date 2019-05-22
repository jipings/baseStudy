
export const segmentsIntr1 = function (a, b, c, d){  
  
    /** 1 解线性方程组, 求线段交点. **/  
    // 如果分母为0 则平行或共线, 不相交  
        var denominator = (b.y - a.y)*(d.x - c.x) - (a.x - b.x)*(c.y - d.y);  
        if (denominator==0) {  
            return false;  
        }  
       
    // 线段所在直线的交点坐标 (x , y)      
        var x = ( (b.x - a.x) * (d.x - c.x) * (c.y - a.y)   
                    + (b.y - a.y) * (d.x - c.x) * a.x   
                    - (d.y - c.y) * (b.x - a.x) * c.x ) / denominator ;  
        var y = -( (b.y - a.y) * (d.y - c.y) * (c.x - a.x)   
                    + (b.x - a.x) * (d.y - c.y) * a.y   
                    - (d.x - c.x) * (b.y - a.y) * c.y ) / denominator;  
      
    /** 2 判断交点是否在两条线段上 **/  
        if (  
            // 交点在线段1上  
            (x - a.x) * (x - b.x) <= 0 && (y - a.y) * (y - b.y) <= 0  
            // 且交点也在线段2上  
             && (x - c.x) * (x - d.x) <= 0 && (y - c.y) * (y - d.y) <= 0  
            ){  
      
            // 返回交点p  
            return {  
                    x :  x,  
                    y :  y  
                }  
        }  
        //否则不相交  
        return false  
    }  
export const segmentsIntr2 = function (a, b, c, d){  
  
        //线段ab的法线N1  
        var nx1 = (b.y - a.y), ny1 = (a.x - b.x);  
      
        //线段cd的法线N2  
        var nx2 = (d.y - c.y), ny2 = (c.x - d.x);  
          
        //两条法线做叉乘, 如果结果为0, 说明线段ab和线段cd平行或共线,不相交  
        var denominator = nx1*ny2 - ny1*nx2;  
        if (denominator==0) {  
            return false;  
        }  
          
        //在法线N2上的投影  
        var distC_N2=nx2 * c.x + ny2 * c.y;  
        var distA_N2=nx2 * a.x + ny2 * a.y-distC_N2;  
        var distB_N2=nx2 * b.x + ny2 * b.y-distC_N2;  
      
        // 点a投影和点b投影在点c投影同侧 (对点在线段上的情况,本例当作不相交处理);  
        if ( distA_N2*distB_N2>=0  ) {  
            return false;  
        }  
          
        //  
        //判断点c点d 和线段ab的关系, 原理同上  
        //  
        //在法线N1上的投影  
        var distA_N1=nx1 * a.x + ny1 * a.y;  
        var distC_N1=nx1 * c.x + ny1 * c.y-distA_N1;  
        var distD_N1=nx1 * d.x + ny1 * d.y-distA_N1;  
        if ( distC_N1*distD_N1>=0  ) {  
            return false;  
        }  
      
        //计算交点坐标  
        var fraction= distA_N2 / denominator;  
        var dx= fraction * ny1,  
            dy= -fraction * nx1;  
        return { x: a.x + dx , y: a.y + dy };  
    }  

    
