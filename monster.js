var monster_colors = "a4133c-c9184a-ff4d6d-ff758f-ff8fa3-ffb3c1".split("-").map(a=>"#"+a)
var eye_colors = "03045e-023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8".split("-").map(a=>"#"+a)
class Monster{
  constructor(args){ //預設值，基本資料(含顏色、大小等)
    this.r = args.r || random(30,120) //如果怪物有傳回直徑大小，以參數為直徑，否則預設15(或其他數值)
    this.p = args.p || createVector(random(width),random(height)) //怪物起始位置(以向量座表示)，以中間為砲台發射，所以座標為(width/2,height/2)
    this.v = args.v || createVector(random(-1,1),random(-1,1)) //怪物的速度
    this.color = args.color || random(monster_colors) //怪物顏色
    this.mode = random(["happy","unhappy"])
  }
  draw(){
    push()
      translate(this.p.x,this.p.y)
      fill(this.color)
      noStroke()
      ellipse(0,0,this.r)
      if(this.mode == "happy"){ //眼睛全圓
        fill(0)
        ellipse(0,0,this.r/2)
        fill(random(eye_colors))
        ellipse(0,0,this.r/3)
      }
      else{
        fill(0)
        arc(0,0,this.r/2,this.r/2,0,PI)
        fill(random(eye_colors))
        arc(0,0,this.r/3,this.r/3,0,PI)
      }
      //腳
      stroke(this.color)
      strokeWeight(2)
      noFill();
      for(var j=0;j<8;j++){
        rotate(PI/4) //因為要產生可以旋轉的腳，PI=180，而PI/4=45
        beginShape()
          for(var i=0;i<(this.r/2);i++){
            vertex(this.r/2+i,sin(i/5+frameCount/5)*15)
          }
        endShape()
      }
    pop()
  }

  update(){
    this.p.add(this.v)
    if(this.p.x<=0 || this.p.x >= width)
    {
      this.v.x = -this.v.x
    }
    if(this.p.y<=0 || this.p.y >= height)
    {
      this.v.y = -this.v.y
    }
  }
  isBATInRanger(x,y){
    let d = dist(x,y,this.p.x,this.p.y) //計算飛彈與怪物中心位置之間的距離
    if(d<this.r/2){ //怪物與飛彈間的距離小於半徑代表接觸到了 
      return true //代表距離在範圍內
    }else{
      return false //代表距離"不"在範圍內
    }
  }
}