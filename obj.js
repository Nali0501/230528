class Obj{ //粒子，類別 只是定義，底下還沒setup會沒有東西
  constructor(args){ //預設值，基本資料(含顏色、大小等)
     //this.p = args.p || {x:random(width),y:random(height)} //物件起始位置
     this.p = args.p || createVector(random(width),random(height)) //用向量的方式處理     
     //this.v = {x: random(-1,1),y: random(-1,1)} //速度，x y移動的速度危亂數產生介於-1和1之間的數字
     this.v = createVector(random(-1,1),random(-1,1)) //產生一個x座標為random(-1,1),y座標為random(-1,1)
     this.size = random(1,3)  //放大收小
     this.color = random(fill_coclors)
     this.stroke = random(stroke_colors)
  }
  draw(){ //把物件畫出來的函數
    push()
      translate(this.p.x,this.p.y) //原點設定在==>物件所在位置
      scale((this.v.x<0?1:-1),(this.v.y<0?1:-1)) //放大縮小指令，左右翻轉==>this.v.x<0?1:-1 ==>this.v.x<0條件成立的話，則值為1
      fill(this.color)
      stroke(this.stroke)
      strokeWeight(2)
      beginShape()
        for(var i =0;i<points.length-1;i=i+1){
        //line(points[i][0]*this.size,points[i][1]*this.size,points[i+1][0]*this.size,points[i+1][1]*this.size)
        //vertex(points[i][0]*this.size,points[i][1]*this.size)
        curveVertex(points[i][0]*this.size,points[i][1]*this.size)
       }
      endShape()//不會主動閉合圖形(在這個圖形中，圖形的座標點最後加上兩個第一個點的座標，一個連不起來)
    pop()
    }
  update(){
    //移動的程式碼
    // this.p.x = this.p.x + this.v.x
    // this.p.y = this.p.y + this.v.y
    this.p.add(this.v) //此行的效果跟上兩行一樣,add代表向量加法

    //算出滑鼠位置的向量，用向量才能這樣做
    let mouseV = createVector(mouseX,mouseY) //將目前滑鼠的位置轉換為向量值
    //let delta = mouseV.sub(this.p).limit(3) //delta值紀錄與滑鼠方向移動的"單位"距離,sub代表向量減號
    // let delta = mouseV.sub(this.p).limit(this.v.mag()) //每隻蝙蝠會有不同的速度，會與原本設定的數值相關
    // this.p.add(delta)
    
    //碰壁處裡的程式碼
    if(this.p.x<=0 || this.p.x>=width){ //<0等於碰到左邊，>width等於碰到右邊
      this.v.x = -this.v.x
    }
    if(this.p.y<=0 || this.p.y>=height){ //<0等於碰到上邊，>height等於碰到下邊
      this.v.y = -this.v.y
    }
    //圖片蹦到牆壁會換方向彈回來
  }
  isBATInRanger(x,y){
    let d = dist(x,y,this.p.x,this.p.y) //計算滑鼠按下的點與此物件之間的距離
    if(d<this.size*26){ //26的由來:看座標最大值，以此作為方框的高與寬
      return true //代表距離在範圍內
    }else{
      return false //代表距離"不"在範圍內
    }
  }
}