class Bullet{
  constructor(args){ //預設值，基本資料(含顏色、大小等)
    this.r = args.r || 10 //如果飛彈有傳回直徑大小，以參數為直徑，否則預設15(或其他數值)
    this.p = args.p || createVector(width/2,height/2) //飛彈起始位置(以向量座表示)，以中間為砲台發射，所以座標為(width/2,height/2)
    this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(7) //飛彈的速度
    this.color = args.color || "#f5cac3" //飛彈顏色
  }
  draw(){ //劃出飛彈
    push()
      translate(this.p.x,this.p.y)
      fill("#f5cac3")
      noStroke()
      ellipse(0,0,this.r)
      // rectMode(CENTER)
      // rect(0,0,20,40)
    pop()
  }
  update(){ //計算移動後的位置
    push()
    this.p.add(this.v)
    //上面一行代表下面兩行
    // this.p.x = this.p.x + this.v.x
    // this.p.y = this.p.y + this.v.y
    pop()
  }
}