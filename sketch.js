let points = [[3,3],[5,-1],[6,-2],[8,0],[10,4],[12,8],[13,12],[13,16],[13,16],[15,15],[19,15],[22,15],[24,15],[26,16],[25,14],[23,10],[22,6],[19,5],[17,3],[16,1],[15,-3],[15,-7],[13,-8],[11,-10],[9,-12],[8,-14],[7,-18],[5,-16],[1,-14],[0,-14],[0,-14],[-4,-15],[-6,-17],[-8,-15],[-10,-13],[-11,-12],[-12,-12],[-13,-12],[-14,-13],[-17,-15],[-18,-15],[-22,-13],[-24,-12],[-25,-12],[-27,-13],[-25,-11],[-23,-8],[-21,-5],[-19,0],[-15,-2],[-12,-4],[-10,-5],[-7,-6],[-4,-6],[-1,-6],[-1,-3],[-2,1],[0,-1],[1,0],[2,0],[3,1],[3,3],[3,3]];
var stroke_colors = "2d6a4f-d8f3dc-240046-e0aaff-b5838d-6d6875-132a13-31572c-4f772d-90a955-ecf39e".split("-").map(a=>"#"+a)//填入顏色
var fill_coclors = "c2c5aa-333d29-2c0e37-ccff33-463f3a-bcb8b1-10002b-240046-3c096c-5a189a-7b2cbf-9d4edd-c77dff-e0aaff".split("-").map(a=>"#"+a)

function preload(){
  cat_sound = loadSound("sound/meow.wav")
  bullet_sound = loadSound("sound/Launching wire.wav")
}

var bat //代表單一物件，利用變數做正在處裡的物件
var bats =[]
var bullet
var bullets =[]
var monster
var monsters =[]
var score = 0

function setup() {
  createCanvas(windowWidth, windowHeight);
  //bg_sound.play()
  //產生幾個物件
  for(var j=0;j<80;j=j+1)
  {
    bat = new Obj({}) //產生一個新的物件，"暫時"放到ball變數中
    bats.push(bat) //把ball物件放入balls物件陣列中
  }
  for(var j=0;j<20;j=j+1)
  {
    monster = new Monster({}) //產生一個新的物件，"暫時"放到monster變數中
    monsters.push(monster) //把monster物件放入monsters物件陣列中
  }
}

function draw() {
  background("#457b9d");
  // for(k=0;k<bats.length;k=k+1){
  //   bat = bats[k]
  //   bat.draw()
  //   bat.update()
  // }
  for(let bat of bats){ //針對陣列變數，取出陣列內的物件
    bat.draw()
    bat.update()
    //由此判斷，每隻蝙蝠有沒有接觸每一個飛彈
    for(let bullet of bullets){
      if(bat.isBATInRanger(bullet.p.x,bullet.p.y)) //判斷bat與bullet有沒有接觸
      {
        score = score - 1
        cat_sound.play()
        bats.splice(bats.indexOf(bat),1) //把陣列中的編號"n"刪除，只刪除1個(indexOf()找出bat的編號)
        bullets.splice(bullets.indexOf(bullet),1)
      }  
      }
  }

  for(let bullet of bullets){ //針對飛彈陣列變數，取出陣列內的物件
    bullet.draw()
    bullet.update()
  }

  for(let monster of monsters){ //針對怪物陣列變數，取出陣列內的物件
    monster.draw()
    monster.update()
    for(let bullet of bullets){
      if(monster.isBATInRanger(bullet.p.x,bullet.p.y)) //判斷monster與bullet有沒有接觸
      {
        score = score + 1
        monsters.splice(monsters.indexOf(monster),1)
        //monster.IsDead = true //已經被打到了
        bullets.splice(bullets.indexOf(bullet),1) //讓飛彈從陣列內移出
      }  
    }
  }

  textSize(100)
  text(score,50,80)
  push() //劃出砲台
    let dx = mouseX-width/2 //滑鼠座標到中心點座標的x軸距離
    let dy = mouseY-height/2 //滑鼠座標到中心點座標的y軸距離
    let angle = atan2(dy,dx) //利用反tan算出角度
    translate(width/2,height/2)
    rotate(angle) //讓三角形翻轉一個角度
    fill("#1d3557")
    noStroke()
    circle(0,0,60)
    fill("#cdb4db")
    noStroke()
    triangle(50,0,-25,-25,-25,25)
  pop()
}

function mousePressed(){
  // 按下滑鼠產生物件代碼
  // bat = new Obj({
  //   p:{x:mouseX,y:mouseY}
  // }) 
  // bats.push(bat)
  //+++++++++++++++++++++++++++=
  // for(let bat of bats){
  //   if(bat.isBATInRanger(mouseX,mouseY)){ //將陣列內的物件刪除
  //     score = score + 1
  //     bats.splice(bats.indexOf(bat),1) //把陣列中的編號"n"刪除，只刪除1個(indexOf()找出bat的編號)
  //   }
  // }

  //新增一筆資料(未顯示)
  bullet = new Bullet({  
    r:random(10,30) //設定一個參數給飛彈， 產生有大有小的飛彈
  })
  bullets.push(bullet) //將資料放入陣列
  bullet_sound.play()

  monster = new Monster()
  monsters.push(monster)
}