var main = require('../handlers/main')

module.exports = function (app){
    app.get('/', main.home)  //主页面
    app.get('/load-more', main.load_more)  //加载数据
    app.get('/write', main.write)  //文章编辑页面
    app.get('/login', main.loginPage) //登录页面
    app.get('/register', main.registerPage) //注册页面
    app.get('/isExist', main.isExist) //通过ajax向服务器验证该用户是否以存在
    app.get(/\/article\/[a-zA-Z0-9]+\/praise/, main.article_render.praise)// 用户点赞
    app.get('/article/*$', main.article_render)
    app.post('/receiveArticle',  main.receiveArticle)  // 接收提交的文章
    app.post('/login', main.login)
    app.post('/register', main.register)
    app.post('/upload_avatar', main.upload_avatar, main.rename)
    app.post('/upload_photo', main.upload_photo, main.rename_photo)
    app.post('/upload_mix', main.upload_mix, main.rename)
    app.use(main._400)
    app.use(main._500)
}
