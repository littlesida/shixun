# node js+express+mongodb+ejs模板开发课堂实时点名即时考试系统

## version1

### 相关页面

1. signup
  * signup page: `GET /signup`   注册界面
  * signup page: `POST /signup`  提交数据
2. signin
  * signin page: GET /signin   登录界面
  * signin: POST /signin    提交数据
3. signout
  * GET /signout  退出
4. createCourse
  * GET /createCourse 创建课程界面
  * POST /createCourse 提交数据
5. createSign
  * GET /createSign?courseName=XXX 创建签到界面
  * POST /createSign?courseName=XXX 提交数据
6. home
  * GET /home 个人主页
  * GET /home/:courseName 进入某一课程
  * GET /home/:courseName/stulist 查看当前课程的学生名单
  * GET /home/:courseName/:signName 进入本课程的某次签到详情界面
  * GET /home/:courseName/:signName/qrcode 查看该签到的二维码
7. sign
  * GET /sign?courseName=XXX&signName=XXX 学生签到界面
  * POST /sign?courseName=XXX&signName=XXX 提交数据

### 启动方法

#### 启动mongodb
首先先启动mongodb数据库 默认端口为27017,如果使用其他端口，请修改**config**文件夹里的**default.js**.或者加入新的配置文件.

#### 使用node启动
node index.js启动
捉着安装supervisor, 然后使用supervisor --harmony index启动应用，访问localhost:3000

#### 关于扫描签到二维码
签到的二维码里面的链接需要设置为服务器本地的ip地址。请查看本地ip地址后，修改**views/qrcode.ejs**文件,将
```
<a class = "image ui segment  medium" href = "/sign?courseName=<%= coursename%>&signName=<%= signname%>"><img src="/sign/create_qrcode?text=http://192.168.199.90:3000/sign?courseName=<%= coursename %>%26signName=<%= signname %>"/></a>
```
上述的**192.168.199.90**修改为你的ip地址.
ps: 因为这个在一开始没有考虑到，因此没有写入配置文件里面。将在以后修改.
