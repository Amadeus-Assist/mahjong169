# majiang-cocos-creator-
cocos creator 麻将学习  后端nodejs 喜欢给个star 哈~~
前后端都打包进去了 可以打包成app运行 都调试正常 也是跟着达达麻将学习的

## How to deploy
1. Search `:9000` in build branch and change the IP in build directory to GCP new IP.
2. On GCP, start 3 servers with
   - `nohup node mahjong169/mahjong169/server/majiang_server/app.js &`
   - `nohup node mahjong169/mahjong169/server/hall_server/app.js &`
   - `nohup node mahjong169/mahjong169/server/account_server/app.js &`
3. Start Nginx with `sudo nginx -t` or restart with `sudo systemctl restart nginx`

![](https://github.com/balckban/majiang-cocos-creator/blob/master/img/1.jpg)
![](https://github.com/balckban/majiang-cocos-creator/blob/master/img/2.jpg)
![](https://github.com/balckban/majiang-cocos-creator/blob/master/img/3.jpg)
![](https://github.com/balckban/majiang-cocos-creator/blob/master/img/4.jpg)
![](https://github.com/balckban/majiang-cocos-creator/blob/master/img/5.jpg)
![](https://github.com/balckban/majiang-cocos-creator/blob/master/img/6.jpg)
![](https://github.com/balckban/majiang-cocos-creator/blob/master/img/7.jpg)
![](https://github.com/balckban/majiang-cocos-creator/blob/master/img/8.jpg)
