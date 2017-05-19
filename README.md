# version1
# node js+express+mongodb+ejs模板开发课堂实时点名即时考试系统
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
5. create
  * GET /posts/create 签到界面
  * POST /posts/create 提交数据


首先先启动数据库 默认端口为27017
然后使用supervisor --harmony index启动应用，访问localhost:3000

