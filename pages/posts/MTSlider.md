---
title_zh: 美团普通滑块轨迹模拟
title_: MT
date: 2022-04-01
updated: 2022-04-01
categories: Spider
tags:
  - Spider
  - 项目
top: 1
---


# 1. 目标分析
| 相关信息 | 描述 |
| --- | --- |
| 目标 | 美团 ebooking 登录普通滑块分析 |
| 网站 | [https://eb.meituan.com/ebk/login/login.html](https://eb.meituan.com/ebk/login/login.html) |
| 浏览器 | Chrome 127.0.6533.89 |
| python | 3.10.7 |
| python lib | loguru==0.7.2、PyExecJS==1.5.1、requests==2.32.3、urllib3==2.2.2 |
| JS | 20.10.0 |


![](https://cdn.nlark.com/yuque/0/2024/png/29548914/1725264622174-0d146593-a6c4-4c7c-a6c4-b717438f10d2.png)



# 2. 流程分析
F12 定位到接口：[https://epassport.meituan.com/api/account/passwordlogin?yodaReady=h5&csecplatform=4&csecversion=2.4.0](https://epassport.meituan.com/api/account/passwordlogin?yodaReady=h5&csecplatform=4&csecversion=2.4.0)

```python
# -*- coding: utf-8 -*-
# @Time    : 2024/8/31 21:43
# @Author  : DSTBP
# @File    : test.py
# @Description:
import requests

headers = {
    'Accept': 'application/json',
    'Accept-Language': 'zh-CN',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json;charset=UTF-8',
    'Origin': 'https://epassport.meituan.com',
    'Pragma': 'no-cache',
    'Referer': 'https://epassport.meituan.com/new/login/account?feconfig=hotel-fe-ebooking&service=hotel&loginsource=14&noSignup=true&bg_source=4&loginurl=https%3A%2F%2Feb.meituan.com%2Febk%2Flogin%2Flogin.html&continue=https%3A%2F%2Feb.meituan.com%2Fgw%2Faccount%2Fbiz%2Fsettoken%3Fredirect_uri%3Dhttps%253A%252F%252Feb.meituan.com%252Febk%252Flogin%252Fsettoken.html',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    'mtgsig': '{"a1":"1.1","a2":1725111403406,"a3":"v3wv7y8x27vy5x8x1207v423920vx24w808z1z3w8y197958zv4v26xu","a5":"qeFzmdH0abbCTGMqaqBQpY8E1qWSji9g","a6":"h1.5e12MW3g0qHhEe5HNnOjlFjqmsYDQ8k28+Er1uofaZJEK7Gja4mRrEXIS/59GraqLV5YMM9E7mQSvDlpPEpfVHsLpoqpceUVNTZDgZQh1sxZorU+EmoWyayLHV5JPCztsgF96BcaHxD2s01z/tBUzZy5Ps8y47gbnE+Wx8nWRUK16Gdv4bUubjAYryfwqJvPTKsvHn62zFllSpzbD/yoZY6891x4m7ehHCEqbphzDikwwqwvk+crz0+KMVbNRkJP8f/PdrQk3bjofqr9Wo8ppzJhWCIxGA591vqgaAb4cyGsKcio2grjX3+mv8D8jHPQs/lyLTKkAM9076b2pDMZDosiTgMpkWRc0CroxMEzYYCYVGOgETGJZ3vdhXxAuoPalXePYs0TZ6MBf5+iL2Kal7+25D2+sd1A8Lhgyn7Nvc+8=","x0":4,"d1":"185e24161e92da02db96127d06ccfe16"}',
    'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'x-requested-with': 'XMLHttpRequest',
}

params = (
    ('yodaReady', 'h5'),
    ('csecplatform', '4'),
    ('csecversion', '2.4.0'),
)

data = {
    "login": "123",
    "password": "123",
    "continueUrl": "https://eb.meituan.com/gw/account/biz/settoken?redirect_uri': 'https://eb.meituan.com/ebk/login/settoken.html",
    "rememberPassword": False,
    "secondVerify": False,
    "interCode": "86",
    "lang": "zh-CN",
    "utmParam": {
        "rohrToken": "eJyFk2Fv2jAQhv LJfhSl/jimBCkaqJjFLoB6wrTpgpVIZiQAQlNHKCt t93CXB0mrRJlvP47vze Ry/srQ3Y81XNl/5IWuCEMKRb5xtdcqaDGqiVmecmQxdrq0AQHpC1R3Ognc2R0gcnE3T723WfJCu4I4tJoXhG64fwBUuB1F3J/zE4E247eAoonoYxBbGbLKmZemNn2WbJDW1tY5M7se1IFlbsd5ZqySMYssPgiSPzYe5DpJ4HoVXi8To1eVcX ppkiyjOKxmOt1GgT54quW2LMlTtIBTjZP7KIzzzZVJc12dho9Hl3MIzNPVVVlKRbYqdgeHnr6vpDQscS6jT9/awqxXVSzIoIL n0C4w l4DqRp9IJzpo1JljquyE6qZ1GqA/OYp1FFtg9qtir0VKGo/tZUx7IUFabOkmV1eI3U4j82WwzvYD0q7gAkcNtTGHqgOpFL1CDyjiSFIAIiuySBJIkcIkVUJ3KJGkTeiUAQARHlAMoBlANO55BQJ3KJDso2lzYQ2USS6KAikRpEXtGyZdkyyXuDr MRumwiIPqXFyX8913n1 PRaDgok AT8dzzDtXgAOq8Rgawzzqm0Cn0 vhoMSDDPxxJ3 46u/Gnz2G71b/uf7S8VnfwY95e3nvJnW u88WNczf/Il7UT3cxbN2KzVDEF/5 sO8 zVT2fPP0q7PaDm7HPdHdWNnyuR p9sVd14d9oNjbb64uI10=",
        "appKey": "hotel",
        "bgSource": "4",
        "platform": "2",
        "fp": "H5dfp_2.4.0_tttt_3tyjM2DsdH71tOC3Wpn8mQZb0ydl44l0Mtm66heKdNKoOHiQssLp1/CjN0Cz5YCXz8AfHgAXSs30syO75Iu/BxaEGtqNunxC4iOawggXopDDeHfVQPTmVwJoWEQRwBBluaopv3mE/6v9k/CdmRK15SwWsl0NSXzYGHKLFXa09Cn5Ag6LMrsd1eQ5iqr4fdIlfRZb54OnMvuL1OZ5rTruDg/Tym bePukNx00dZfkg52QyfWp3WraqbfkrA6rPFMg0qjkw7Q07I16XgTByHJZqgA7TNPFHphxkl51xFrj8MCJewag5bFfRYd2PXvqv6/L6iInIST0/QostQYdESq6oH6Z3lH 7QKzDGWnDCsGjv1CgS4sA4e5L7PW3BhIa9yAAv0WsGcuBi6p/oickHbaUv1xAUpaMoLPc9El0EmTvgxlL3/4Hhen lJTXRpAPg9lzjTBHrV6O98NEQqAuXYLTInXoDEJsqw0GbWN3aopnrwx5VR/GgxIc1hiFEiEAlPebZ5YLAcoYx9kSA5/E88EuJAmoiJrpJji3m546TRCRz/DHOnjWrDDCzZXKyzPlm9u2MbxMki7OnLyAfaQWTtmRuwgyULAen9RyYBfUV1gVq0J50nMAW9ZD1zfogNlCSdnTFkDHIGGGZWqLWW9joeoxfZcP1rjLfs4yRLV/J/s1/FNdcoo0JehHt6ROwtRQ5TUDzhqjBeEES73GuffdIuosSaPe8IN/CXhSQV7iNrTCd49 Tzm1zAODWJkxMhRy6PbT3aOjXat6gFkyWy3FKzyz42X3h6eIYPai2E9YKJLMT8H8Yvw3RZjAdFuv0sC/AgMa wLK9oygldp9FGDIMvyHCq405KNdPCKZjuAFoH6fPShk ZkOEg2dmqngRR88A3Lg4s5L7AXBgeE7R/e61dcSO3lg4vOTzWSY1KBqKhlswKOnVQ4SS/t0Ki7xEnHGogSlDJqlFi7IU6jVkV2NSbw12lo4scLxR67dz98LSMUX5va eCqDHnHe8xMAuClz3Lun8iiOHLYdnymBx1da/pI57PUKdrQbEUL7UHSP9g/CAtKdsbThi2wLM8VyMLmzgTFOZrj1FgebmDnWWwfMnybhW0ym5sll5GxLWVEQpblOgjNMMenhiGijtCdbqe8CerZNssSqeADlS1vKm0pO40 27es lbuaKUY vFv/EuTHe3xlgfNu3SCO0j0cuFvKYzJkkHdZ6Mf08IRmEvQAv/oDoFm23ykSWHX51ZANN62VBrzRKxwzZBj0pzCZK1QJ32EMysvvFbtdb3w9goY8TdtoXWHWywos YoJV0AuErkXo4uvGEFKyzDVjawXGp1N/1pn1riGnliGjHxnIMXmlpE98/to0L/cEzlV2xLCHQsGl2KGkTTMvwnDUiQWqhB 7FhGfLb0cYodISdkWrLdHX70RampCMN10F0aN/hLuedYdfvl7m/IpXNTM2sDvGF5OuryLrWP1MhaR7YuVuxqyn8XhEyKky9GKJWZLT6M9jY8F24vVDWahxhBSVXM04lFb8kyg WxJtPigHUfjAP9leNT1V2xN3QeGoX4/eeSFUI8OP0AMN3 UtDTyJpX1j3VDiHXT6z1FufkXNfLx6WAz22PB z87VZyOBcX1xwD84CRCxbi1DMrjiQmlDQ6QBiOU45G4hIIpG4 8Wpap5aQp N13GOglNQs6snI7JzmBJhWkPl/qPI14q3J/1tccRiBSSPn L2D1GFr15G2jLprEYLorSTquVeTLEwdfqb5sncZhNIwc84EDT1q ANzhvkyMYxsZBTgFdh/p4JWVQtAbkUXll4oB2TCephg mlGpxJqOZd5fwbeVfSDXdhMI0LdbhDfzE/ljtnEkBvfYIHkPNSU1U0ttQeMO5SlkcCysgo1Z3y25SDtkqYGWwISvkG8xy dI8iy0h8o2DMk55ETfTPwzlwI0uZ6NaczBfxiOKMM5mqiggqjG7BvQq8YZx9eyAOpyZBiVRTtTxxZEg LPa/10tkIJgq4tV8RkrXCut4THCvdk6sYJm8FogxuUKNnLgZd/fd9vYbGYI 2R6gaHa6ZnJi9PGD9cTKQsc9ghbD50cm6 74eRaSZkOT4h/kvY0qU5XrVpQiNjqBe5ctlCpwqy iQm2o5xYRr8Kt/xMKZZVFG7nLBqPKCSkhWyMXwtVqxd1vjlzvaI8Ox14TAlaYQY99zoPmw3VUmAx4I9Hiu0JcVw1LwvyadycYjVLzJFdYZMAO7uVtarxNFL9M1AnXo9b2U18ueNWfyYJ2ytZb5bsWS01ChMNg Qr6bdPxyjLn0yGEg4CbtOzdY6aDoG0uKUTtmjsfB93jkk/nCaiwIXkbd8MUcesu2r27vSBexAnL 2/epjBkyZpYi9J5kPCW62UM2yagtK0nwIUmv7e02WDtuWWTKVqRMssSbYEnpiZK46riEZOwlS8RSAQ88dX9rXGMtYtxfjwKOO3CI4FYwwGBbtpNsuR3y26YYbxhd2vcUj79l1r1eKW4RzssChDDTMlbyAHF x7nVNl30Hs0TGn0UTwKd7UWYA1BTG TtoS A0VlKXFjJVWAmbLSwQXEx5uqqW0D/YGfJFky ptYKf0s4SfF8vYCoM6DZynm9v9NalbnqmFluK8589bVGzheLJgyeSWVivu7sDPemrS5JzQSqMBCSaTCRhayMX/smYmv52GnSLCQO5nqcihGWZzbewRXHbzcVhQGjZWKTNW90Yx4hKOsA5RIpWesegfmpNEFF9kxUTtFdJrG63RmkHPysGL sgWqh/gnCcRmGaWvZkPXwuMJIk/eBqQ7AnFdDM 1RPgE2UXY45waI6zwVtgGHU7kGTYUUuv1 qeNrtikfld75Ctb x CFx0KCKAZ1135GrBH8/0zj7QNXmxbqWjT hB65CB3tCnwovtsuqv/qfdhW7tNAMzl47EpLjv5aUt2RConrtXlPAt3pIojQZQXtxN0a/Q/ifCF4qccyJ8pE38zmg3HcI/7LCFAC7XNvIr Db8lgVsbStNKjEtS/yC4xzogUFAKRBA7eRfScgnrqIoZklDKpaV1NG4GkNFia5w7w0rVi0gDwE8eh08Yzd3cNg0a6EqrchcbCGeLKl1 7hRHEasyGM97WDtzwZTyBEhMCXXz1mtG14C7MHbOltgVTv2k2 6cenyXa3GKntigmzlahi2r/ dWGAxtYgjikCfCx7UvOfUg5QnomO/erpzMLbyA0XgNTNNpi3kuNbM2hCje4YIfu3RXkVLxvuyENNkrvorgxGv8/M5dUmaO6svQtbyJz8Am1BlrOuooHE/ZTNswIaViRGevvedJiRQPQFSqzKZx8Q4g65RkakGCmyRuIdtqjXoAA7lC0Q577o31PLkcaTaBnb98OKavCXeFWWTNiziTptGwpHv321aOED3qlrn5uS8nSk5ziz2wgPGE8PH2OBoIug8YiH1kuRmK2jtv6cr/7p pqNIgvakmhe tgcu54/1ehUM5TI0WFnP7QrqR uVt6MkA4X1y48ChuR4w 1Qk1BgxUHl5YlJxnMc4V3JkxG2EHXqPdt4xmoeJWl0kuKCFWEd0O/CISZnjAVxNaY7QHPw6zIsghWm/7Q8O3JBjbxbkL 6v5ljoCPRzBjCn9peLkF0LQhsT/ kSqID7BsL510ZX2B5lHLLKvW1kLfcegRz4lx6HE4Vz6cYDhsqzmymaPEzZYVLMfPG5LqDNG3KdWrLPiPvYmlMiXQJtUoloWp2uyO7aNH4285MbOtSW5 uL3Yb0JhSUPvhF47YD",
        "sdkVersion": "node-a5084194"
    }
}

response = requests.post('https://epassport.meituan.com/api/account/passwordlogin', headers=headers, params=params,
                         data=data)
```

经过测试发现 ebooking 登录接口不强校验 mtgisg，简化请求代码：

```python
import requests

headers = {
    'Accept': 'application/json',
    'Accept-Language': 'zh-CN',
    'Content-Type': 'application/json;charset=UTF-8',
    'Origin': 'https://epassport.meituan.com',
    'Referer': 'https://epassport.meituan.com/new/login/account?feconfig=hotel-fe-ebooking&service=hotel&loginsource=14&noSignup=true&bg_source=4&loginurl=https%3A%2F%2Feb.meituan.com%2Febk%2Flogin%2Flogin.html&continue=https%3A%2F%2Feb.meituan.com%2Fgw%2Faccount%2Fbiz%2Fsettoken%3Fredirect_uri%3Dhttps%253A%252F%252Feb.meituan.com%252Febk%252Flogin%252Fsettoken.html',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
}

params = (
    ('yodaReady', 'h5'),
    ('csecplatform', '4'),
    ('csecversion', '2.4.0'),
)

data = {
    "login": "123",                 # 账号
    "password": "123",              # 密码
    "continueUrl": "https://eb.meituan.com/gw/account/biz/settoken?redirect_uri': 'https://eb.meituan.com/ebk/login/settoken.html",
    "rememberPassword": False,
    "secondVerify": False,
    "interCode": "86",
    "lang": "zh-CN",
    "utmParam": {
        "appKey": "hotel",
        "bgSource": "4",
        "platform": "2",
        "sdkVersion": "node-a5084194"
    }
}

response = requests.post('https://epassport.meituan.com/api/account/passwordlogin', headers=headers, params=params, data=data)

# repsonse data
'''
{
    "status": {
        "code": 2017,
        "message": "需要滑块验证"
    },
    "data": {
        "accessToken": null,
        "needChange": null,
        "needVerify": {
            "verifyType": "SLIDER",
            "verifyRequestCode": "c0e1b89159f5418c891f304dad415792",
            "secondVerify": false
        },
        "bizAcct": null
    },
    "success": false,
    "continue": "https://eb.meituan.com/gw/account/biz/settoken?redirect_uri=https%3A%2F%2Feb.meituan.com%2Febk%2Flogin%2Fsettoken.html"
}
'''
```

拿到响应中的 verifyRequestCode 作为参数传给 [https://verify.meituan.com/v2/ext_api/page_data](https://verify.meituan.com/v2/ext_api/page_data)：

```python
data = {
  'requestCode': 'c0e1b89159f5418c891f304dad415792',
  'feVersion': '1.6.2',
  'source': '1',
  'layer': '2'
}

# repsonse data
'''
{
    "status": 1,
    "data": {
        "yodaLanguage": "zh-CN",
        "country": "中国大陆",
        "riskLevel": "71",
        "session": "cmV0dXJuIFszLCAncmV0dXJuIGZ1bmN0aW9uK...",
        "sign": "PUeTUJpNsXFLdVD4xIJ1S6pHEL3uYDQ5SJWCd1XgJRaAH...",
        "verifyMethodVersion": "{\"slider\":\"{\\\"d\\\":\\\"4998522735\\\",\\\"i\\\":\\\"b5b379a9e6\\\"}\"}",
        "type": "71",
        "isTrafficOpen": false,
        "yodaVersion": "{\"d\":\"7b5904b2d8ae841a\",\"i\":\"c80762459dc53999\"}",
        "mobileInterCode": "86",
        "bs": false,
        "showRequestCodeSwitch": false,
        "t": null,
        "defaultIndex": 0,
        "isDegrade": false,
        "action": "merchantlogin",
        "riskLevelInfo": "{\"71\":\"{\\\"name\\\":\\\"slider\\\",\\\"desc\\\":\\\"滑块验证\\\"}\"}",
        "request_code": "c0e1b89159f5418c891f304dad415792",
        "category": "SINGLE",
        "uniqueId": 1465449283,
        "timestamp": 1725111403719
    },
    "error": null
}
'''
```

响应数据中的参数 `session`、`sign`、`request_code`、`timestamp` 后面需要，传给滑块验证接口：[https://verify.meituan.com/v2/ext_api/merchantlogin/verify](https://verify.meituan.com/v2/ext_api/merchantlogin/verify)。



# 3. 滑块验证接口
```python
import requests

headers = {
    'Accept': '*/*',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Authencation': '40627e1a8c8a9ed18e9538eee776b075',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': 'https://epassport.meituan.com',
    'Referer': 'https://epassport.meituan.com/',
    'TimesTamp': '1723621365900',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
}

params = (
    ('yodaReady', 'h5'),
    ('csecplatform', '4'),
    ('csecversion', '2.4.0')
)

data = {
    'id': '71',
    'request_code': 'c0e1b89159f5418c891f304dad415792',
    'behavior': 'MjU5NzcyOTU4#9GY2IIkt7jHEPXVMQfr6JHZNMdi1Dwg5VdJwX...',
    'fingerprint': '',
    'action': 'merchantlogin',
    '_token': 'MjU5NzcyOTU4#O3IEs3YwO6HyZTNizlJ/hrwp/BBK59jg23TEEBYU8z...',
    'listIndex': '0',
    'source': '1',
    'l_s_c': '1',
    's_s_c': '1',
    'l_d_s_c': '1',
    '___en_ck___': '1',
    '___l_s_cn___': '1723619635UV47422',
    'v_c': '21ce4e1f1f78de9e',
    'j_v': '4998522735',
    'e4350633': '5983cca6'
}

response = requests.post('https://verify.meituan.com/v2/ext_api/merchantlogin/verify', headers=headers, params=params, data=data)
print(response.text)
```

需要分析的参数：`behavior`、`_token`、`e4350633`、`Authencation`、`TimesTamp`。生成函数位于 slider.js 文件中。

ast 解混淆：

```jsx
/*
 * @Description: ast 解混淆
 * @Author: DSTBP
 * @Date: 2024-08-14 17:18:13
 * @LastEditTime: 2024-08-14 18:04:43
 * @LastEditors: DSTBP
 */
// 引入所需模块
var fs = require("fs");
var parser = require("@babel/parser");
var template = require("@babel/template").default;
var traverse = require("@babel/traverse").default;
var types = require("@babel/types");
var generator = require("@babel/generator").default;

/**
 * 初始化数组
 */
function y4d8b_q(h, j) {
    var S = y4d8b_D();
    return y4d8b_q = function(u, X) {
        u = u - 0x0;
        var m = S[u];
        return m;
    }
    ,
    y4d8b_q(h, j);
}

function y4d8b_D() {
    var EY = ['connect', 'succCallbackKNBFun', ...]
    y4d8b_D = function() {
        return EY;
    }
    ;
    return y4d8b_D();
}

function shift_array(h, j) {
    var S = h();
    while (true) {  // 无限循环
        try {
            var u = parseInt(y4d8b_q(0x686)) / 0x1 * (parseInt(y4d8b_q(0x5a0)) / 0x2) + -parseInt(y4d8b_q(0x11e)) / 0x3 * (parseInt(y4d8b_q(0x31d)) / 0x4) + parseInt(y4d8b_q(0x2b8)) / 0x5 * (-parseInt(y4d8b_q(0x6ef)) / 0x6) + parseInt(y4d8b_q(0x7f2)) / 0x7 * (parseInt(y4d8b_q(0x5c2)) / 0x8) + parseInt(y4d8b_q(0x77e)) / 0x9 * (parseInt(y4d8b_q(0x608)) / 0xa) + parseInt(y4d8b_q(0x66d)) / 0xb + -parseInt(y4d8b_q(0x6d0)) / 0xc;
            // console.log(u)
            if (u === j) {
                return S;  // 如果计算结果 u 等于 j，则返回数组 S
            } else {
                S.push(S.shift());  // 左移数组 S
            }
        } catch (X) {
            S.push(S.shift());  // 如果发生异常，左移数组 S
        }
    }
}

TABLE = shift_array(y4d8b_D, 0xcd77f)

function delete_init_table(path) {
    var node = path.node;
    if (node.id == undefined || node.id.name == undefined)
        return
    if (node.id.name == "y4d8b_q" || node.id.name == "y4d8b_D")
        path.remove();
}

function delete_shift_table(path) {
    var node = path.node;
    if (node.callee == undefined || node.arguments.length !== 2)
        return;
    if (node.arguments[0].name == "y4d8b_D" || node.arguments[0].value == 841599)
        path.remove();
}

function replace_E(path) {
    var node = path.node;
    if (node.callee == undefined || node.callee.name == undefined)
        return;
    if (node.callee.name !== "y4d8b_q")
        return;
    var arg = node.arguments[0].value;
    var value = TABLE[arg];
    path.replaceInline(types.valueToNode(value));
}

// 处理 return 中的逗号表达式
function replace_return_comma_expression(path) {
    var node = path.node;
    
    if (node.argument == undefined || node.argument.type !== "SequenceExpression")
        return
    if (node.argument.expressions.length == 1)
        return

    var exps = node.argument.expressions
    // 处理 SequenceExpression 节点
    var last_ret = exps[exps.length - 1];
    last_ret = types.returnStatement(last_ret); // 处理返回值
    
    var block = [];
    for (var i = 0; i < exps.length - 1; i++) {
        block.push(types.expressionStatement(exps[i])); // 创建 ExpressionStatement
    }
    block.push(last_ret);                   // 添加处理后的 return 语句
    // block = types.blockStatement(block);    // 创建 BlockStatement
    path.replaceWithMultiple(block);                // 替换原有的 ReturnStatement
}

// 处理变量的逗号表达式
function replace_var_comma_expression(path) {
    const { kind, declarations } = path.node;
    var parentNode = path.parent; // 获取父节点
    if (parentNode.type == 'ForStatement')      // 省去 for 循环里的变量
        return;

    if (declarations.length <= 1) 
        return;
    
    let tmp_array = [];
    for (let variable_declarator of declarations) {
        tmp_array.push(types.VariableDeclaration(kind, [variable_declarator]));
    }
    path.replaceWithMultiple(tmp_array);
}

// 定义主函数
function main() {
    // 1. 读取原始文件
    var jscode = fs.readFileSync("E:/hookpro2/ebook/meituan/slider.4998522735.js", { encoding: "utf-8" });

    // 2. 解析为语法树
    var ast = parser.parse(jscode);

    // 3. 定义遍历器
    const traverses = {
        VariableDeclaration: {
            enter: [replace_var_comma_expression]
        },
        CallExpression: {
            enter: [replace_E, delete_shift_table]
        },
        FunctionDeclaration: {
            enter: [delete_init_table]
        },
        ReturnStatement: {
            enter: [replace_return_comma_expression]
        },
    };

    // 4. 遍历语法树
    traverse(ast, traverses);

    // 5. 生成还原后的JS代码
    var ast_js_code = generator(ast, opts = { jsescOption: { "minimal": true } }).code;

    // 6. 将生成的JS代码存储到新的文件中
    fs.writeFileSync("E:/hookpro2/ebook/meituan/slider_transformed.js", ast_js_code, { encoding: "utf-8" });

    console.log("AST操作后的JS文件内容已保存");

}

// 调用主函数
main();
```



## 3.1 behavior
断点位置：`'behavior': mH(this[y4d8b_q(0x750)], zQ, this[y4d8b_q(0x398)][y4d8b_q(0x638)])`

![](https://cdn.nlark.com/yuque/0/2024/png/29548914/1725264685638-8d4788f4-53dc-42ad-a716-2ad3ec90b39f.png)

`mH` 方法传入了三个参数：滑动轨迹，requestCode，false。加密函数有两个：`ms()`、`mm["Kaito"]()`、`md()`。

```jsx
function mH(zY, zl, zk) {
  var zI = mm["Kaito"](JSON["stringify"](zY), ms(zl));
  (typeof zk !== "boolean" || zk) && (zI = mw(zI));
  return md(zI, zk);
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/29548914/1725264715058-85bc13f4-697a-4751-b65d-638a1a74fb7d.png)



### 3.1.1 滑动轨迹
根据控制台输出的结果，需要分析两个参数的生成：`env` 和 `trajectory`。

**trajectory**

```jsx
zp["initTimeStamp"] = Date["now"]()
zp['_x'] = 0x0
zp['_y'] = 0x0

zb["clientX"] ? (zp['_x'] = zb["clientX"], zp['_y'] = zb["clientY"]) : (zp['_x'] = zb["targetTouches"][0x0]["clientX"], zp['_y'] = zb["targetTouches"][0x0]["clientY"]);

function DN(zv) {
    return parseFloat(zv["toFixed"](0x3));   // 保留三位小数
}

var zN = {
    'startX': DN(zp['_x']),
    'startY': DN(zp['_y']),
    ...
};

zp["onStart"] = function (zb) {
    var zc = zb["startX"];
    var zN = zb["startY"];
    ...
    var E4 = {};
    
    // 点击滑块后触发
    E4["orientation"] = 'h', zp["data"]["trajectory"]["push"]({
        'point': [[0x0, zc, zN, Date["now"]() - zp["initTimeStamp"]]],
        'vector': E4
    })
    
    zp["oceanPoint"]["push"]([0x0, zc, zN, Date["now"]() - zp["initTimeStamp"]]);
    ...

zp["moveDrag"] = function (zb) {
  var zN = zc["clientX"];
  var E0 = zc["clientY"];
  if (Math["abs"](E1) < 0x6 && Math["abs"](E2) < 0x6) return ![];
  ... zp["onMove"](DN(zN), DN(E0)) ...;
}

// 拖动滑块后触发
zp["onMove"] = function (zb, zc) {
      var zN = zp["data"]["trajectory"];
      Array["isArray"](zN) && zN["length"] && zN[zN["length"] - 0x1]["point"]["push"]([0x0, zb, zc, Date["now"]() - zp["initTimeStamp"]]);
}
```

在 zp["moveDrag"]、zp["onStart"] 中下日志断点：

```bash
`point: type: ${zb['type']}, clientX: ${zb['clientX']}, clientY: ${zb['clientY']}, target: `, zb['target']
```

发现无日志输出，怀疑 console.log 被 hook 了，新建一个`<iframe>` 元素，将当前 `window` 对象的 `console` 替换成了 iframe 内部的 `console` 对象。“重置”浏览器的 `console` 对象。

```jsx
(function(){
　　var iframe = document.createElement('iframe');
　　document.head.appendChild(iframe);
　　window.console = iframe.contentWindow.console;
}());
```

![](https://cdn.nlark.com/yuque/0/2024/png/29548914/1725264744078-23e8f8e1-5d5e-469e-9e87-a6d15e7e872e.png)

发现 point 是鼠标移动（mousemove 和 mousedown）的轨迹，从点击滑块后开始监听。第一个元素是点击滑块的 Mousedown，后面元素都是 Mousemove。



**env**

```jsx
var zN = {
    'w': DN(zc["clientWidth"]),
    'h': DN(zc["clientHeight"]),
}

var E0 = zb['w'];
var E1 = zb['h'];
var E2 = zb["clientX"];
var E3 = zb["clientY"];
zp["data"]["env"]["zone"] = [E0, E1], zp["data"]["env"]["client"] = [E2, E3];

this["data"]["env"]["Timestamp"] = [this["initTimeStamp"], this["firstTimeStamp"]]
this["data"]["env"]["count"] = this["count"]
this["data"]["env"]["timeout"] = this["timeoutCount"]
this["data"]["env"]["Type"] = this["sliderType"]
this["data"]["env"]["Return"] = Number(this["sliderReturn"]["toFixed"](0x0))
```

整个参数的生成：

```json
{
    "trajectory": [
        {
            "point": [
                [
                            0,        // 固定值
                            90,       // x
                            174,      // y
                            46296     // 时间差
                ],
                ...
            ],
            "vector": {
                "orientation": "h"    // 固定值
            }
        }
    ],
    "env": {
            "Type": 0,          // 固定值, 滑块类型
            "Return": 0,        // 固定值
            "zone": [           // 滑块长宽
                230,
                33
            ],
            "client": [         // 滑块矩形条的左上角坐标。这里的长宽比zone给出的多了2像素点，即 232, 35
                69,
                156
            ],
            "Timestamp": [      // 初始时间戳、开始拖动时间戳，后面分析
                1723787205240,  // initTimeStamp
                1723787251536   // firstTimeStamp
            ],
            "count": 1,         // 拖动的次数
            "timeout": 0        // 超时次数
        }
}
```



### 3.1.2 request_code
request_code 即 [https://verify.meituan.com/v2/ext_api/page_data](https://verify.meituan.com/v2/ext_api/page_data) 响应的 request_code。



### 3.1.3 加密算法
分析完参数，接下来看加密算法：

`ms` 方法是将 `request_code` 做 base64，并替换编码后的字符串中的 `=` 为 `)`，`+` 为 `(`。

`mm["Kaito"]` 方法是先将传入的 UTF8 字符串转整数数组，然后 TEA 加密，最后 base64 编码，得到 zI。

```jsx
var mX = {};
mX["Kaito"] = mu;
var mm = mX;

// zK = json_str, zB = reqcode_base64
function mu(zK, zB) {
    return mS(m6(zK, zB));
}

function m6(zK, zB) {
    if (zK === undefined || zK === null || zK["length"] === 0x0) return zK;
    zK = m7(zK);
    zB = m7(zB);
    return m8(mj(m9(zK, !![]), mh(m9(zB, ![]))), ![]);
}

// UTF8编码
function m7(zK) {
    if (/^[\x00-\x7f]*$/["test"](zK)) return zK;
    var zB = [];
    var zM = zK["length"];
    for (var zo = 0x0, zJ = 0x0; zo < zM; ++zo, ++zJ) {
        var zf = zK["charCodeAt"](zo);
        if (zf < 0x80) zB[zJ] = zK["charAt"](zo); else {
            if (zf < 0x800) zB[zJ] = String["fromCharCode"](0xc0 | zf >> 0x6, 0x80 | zf & 0x3f); else {
                if (zf < 0xd800 || zf > 0xdfff) zB[zJ] = String["fromCharCode"](0xe0 | zf >> 0xc, 0x80 | zf >> 0x6 & 0x3f, 0x80 | zf & 0x3f); else {
                    if (zo + 0x1 < zM) {
                        var zr = zK["charCodeAt"](zo + 0x1);
                        if (zf < 0xdc00 && 0xdc00 <= zr && zr <= 0xdfff) {
                            var zY = ((zf & 0x3ff) << 0xa | zr & 0x3ff) + 0x10000;
                            zB[zJ] = String["fromCharCode"](0xf0 | zY >> 0x12 & 0x3f, 0x80 | zY >> 0xc & 0x3f, 0x80 | zY >> 0x6 & 0x3f, 0x80 | zY & 0x3f), ++zo;
                            continue;
                        }
                    }
                }
            }
        }
    }
    return zB["join"]('');
}

// 字符串转换为整数数组，如果 zB 为真，会在数组的最后一个元素中存储字符串的长度。
function m9(zK, zB) {
    var zM = zK["length"];
    var zo = zM >> 0x2;
    (zM & 0x3) !== 0x0 && ++zo;
    var zJ;
    zB ? (zJ = new Array(zo + 0x1), zJ[zo] = zM) : zJ = new Array(zo);
    for (var zf = 0x0; zf < zM; ++zf) {
        zJ[zf >> 0x2] |= zK["charCodeAt"](zf) << ((zf & 0x3) << 0x3);
    }
    return zJ;
}

// 补全长度
function mh(zK) {
    zK["length"] < 0x4 && (zK["length"] = 0x4);
    return zK;
}

// TEA 加密
function mj(zK, zB) {
    var zM = zK["length"];
    var zo = zM - 0x1;
    var zJ;
    var zf;
    var zr;
    var zY;
    var zl;
    var zk;
    zf = zK[zo], zr = 0x0;
    for (zk = Math["floor"](0x6 + 0x34 / zM) | 0x0; zk > 0x0; --zk) {
        zr = zr + 0x9e3779b9 & 0xffffffff, zY = zr >>> 0x2 & 0x3;
        for (zl = 0x0; zl < zo; ++zl) {
            zJ = zK[zl + 0x1], zf = zK[zl] = zK[zl] + ((zf >>> 0x5 ^ zJ << 0x2) + (zJ >>> 0x3 ^ zf << 0x4) ^ (zr ^ zJ) + (zB[zl & 0x3 ^ zY] ^ zf)) & 0xffffffff;
        }
        zJ = zK[0x0], zf = zK[zo] = zK[zo] + ((zf >>> 0x5 ^ zJ << 0x2) + (zJ >>> 0x3 ^ zf << 0x4) ^ (zr ^ zJ) + (zB[zo & 0x3 ^ zY] ^ zf)) & 0xffffffff;
    }
    return zK;
}

// 整数列表转换为字符串
function m8(zK, zB) {
    var zM = zK["length"];
    var zo = zM << 0x2;
    if (zB) {
        var zJ = zK[zM - 0x1];
        zo -= 0x4;
        if (zJ < zo - 0x3 || zJ > zo) return null;
        zo = zJ;
    }
    for (var zf = 0x0; zf < zM; zf++) {
        zK[zf] = String["fromCharCode"](zK[zf] & 0xff, zK[zf] >>> 0x8 & 0xff, zK[zf] >>> 0x10 & 0xff, zK[zf] >>> 0x18 & 0xff);
    }
    var zr = zK["join"]('');
    if (zB) return zr["substring"](0x0, zo);
    return zr;
}

// base64
var mS = function () {
    var zK = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"["split"]('');
    return function (zB) {
        var zM;
        var zo;
        var zJ;
        var zf;
        var zr;
        var zY;
        var zl;
        zo = zJ = 0x0, zf = zB["length"], zr = zf % 0x3, zf = zf - zr, zY = zf / 0x3 << 0x2;
        zr > 0x0 && (zY += 0x4);
        zM = new Array(zY);
        while (zo < zf) {
            zl = zB["charCodeAt"](zo++) << 0x10 | zB["charCodeAt"](zo++) << 0x8 | zB["charCodeAt"](zo++), zM[zJ++] = zK[zl >> 0x12] + zK[zl >> 0xc & 0x3f] + zK[zl >> 0x6 & 0x3f] + zK[zl & 0x3f];
        }
        if (zr === 0x1) zl = zB["charCodeAt"](zo++), zM[zJ++] = zK[zl >> 0x2] + zK[(zl & 0x3) << 0x4] + '=='; else zr === 0x2 && (zl = zB["charCodeAt"](zo++) << 0x8 | zB["charCodeAt"](zo++), zM[zJ++] = zK[zl >> 0xa] + zK[zl >> 0x4 & 0x3f] + zK[(zl & 0xf) << 0x2] + '=');
        return zM["join"]('');
    };
}();
```

`md()` 方法用 page_data 响应的 sign 和 session 解密出来的 window.f 作为密钥，对 zl 再一次进行 tea 加密，最后进行组合得到 behavior：`window.f + '#' + mm["Kaito"](zJ, window.f)`

```jsx
var md = function zr(zY, zl) {
    if (typeof zl !== "boolean" || zl) return zY;
    var zk = 0x0;
    var zI;
    try {
        var zv = window["atob"](window["seed"]["config"]["session"]);      // page_data 的响应 session
        var ze = new Function(zv)();
        zk = ze[0x0], zI = ze[0x1];         // 3 'return function(x,y,z){return new x(new z([72, 121, -36, -58, -119, 62, -38, -59, 31, 125, -89, -23, 108, 16, -84, 11]),y);}'
    } catch (zF) {
        var zy = zF;
        mT(zy["message"], zy["stack"] || '');
        return mw(zY);
    }
    var zG = '';
    switch (zk) {
        case 0x0:
            zG = mi(zY, zI);
            break;
        case 0x1:
            zG = mR(zY, zI);
            break;
        case 0x2:
            zG = mR(zY, zI);
            break;
        case 0x3:
            zG = mA(zY);
            break;
    }
    return zG;
};

var mA = function zo(zJ, zf) {
    try {
        var zr = window["seed"]["config"]['f'];
        window['_s'] && (zr = window["btoa"](window["seed"]["config"]["uniqueId"]));      // page_data 的响应 uniqueId
        return zr + '#' + mm["Kaito"](zJ, zr);
    } catch (zl) {
        var zY = zl;
        mT(zY["message"], zY["stack"] || '');
        return window["btoa"](window["seed"]["config"]['f']) + '#' + mm["Kaito"](zJ, window["btoa"](window["seed"]["config"]['f']));
    }
};
```

window.f 加密点：

```jsx
var mg = function zB() {
    var zM = window["seed"]["config"]["session"];                   // 获取 key
    if (!zM) return;
    try {
        var zo = Date["now"]();
        var zJ = mC(function () {
            return new Function(window["atob"](zM))();              // key base64 decode
        });
        if (zJ && zJ instanceof Array && zJ[0x0] === 0x3) {
            var zf = 0x10;
            var zr = window["atob"](window["seed"]["config"]["sign"]);      // sign base64 decode
            var zY = mC(function () {
                return mE(zr, zf);
            });
            var zl = mC(function () {
                return new Function(zJ[0x1])()(m5["ModeOfOperation"]["cbc"], zY[0x0], Uint8Array);      // key = zJ[0x1], iv = zY[0x0]
            });
            var zk = mC(function () {
                return zl["decrypt"](zY[0x1]);                      // enc_data = zY[0x1]
            });
            var zI = mC(function () {
                return m5["padding"]["pkcs7"]["strip"](zk);         // AES_CBC_pkcs7padding
            });
            zI = mC(function () {
                return m5["utils"]["utf8"]["fromBytes"](zI);        
            }), mC(function () {
                new Function(zI)();                                 // 解密出来的明文是一段代码
            }), mn(), window['_f'], delete window["seed"]["config"]["sign"];
        }
        var zv = {
            'kvs': {
                'encryptTime': [Date["now"]() - zo]
            },
            'tags': {
                'type': 0x3,
                'ua': mz()
            },
            'ts': Date["now"]()
        };
        window["Yoda"]["CAT"]["metric"](zv);
    } catch (ze) {
        mT(ze["message"], ze["stack"]);
    }
};

// zB = base64 decode sign, zM = 0x16
var mE = function zK(zB, zM) {
    var zo = new Uint8Array(zB["length"]);
    for (var zJ = 0x0; zJ < zB["length"]; zJ++) {
        zo[zJ] = zB["charCodeAt"](zJ);
    }
    return [zo["subarray"](0x0, zM), zo["subarray"](zM)];       // 前16个字节是 iv, 后面是密文
};
```

解密出来的代码需要补环境运行才能得出正确结果，脚本得到 window.f 的明文：

```jsx
window = global;
function setBrowserEnvironment() {
    const navigator = {
        plugins: {},
        webdriver: false,
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        languages: ["zh-CN", "zh"],
        appCodeName: "Mozilla",
        appName: "Netscape",
        appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        platform: "Win32",
        vendorSub: "",
        productSub: '20030107',
        vendor: 'Google Inc.',
        maxTouchPoints: 0,
        hardwareConcurrency: 6,
        product: 'Gecko',
        language: 'zh-CN',
        pdfViewerEnabled: true,
        cookieEnabled: true,
        onLine: true,
        geolocation: {
            getCurrentPosition: function () {},
            watchPosition: function () {},
            clearWatch:function () {}
        },
        webkitTemporaryStorage: {},
        webkitPersistentStorage: {},
        mimeTypes: {},
        connection: {
            onchange: function () {}, effectiveType: '4g', rtt: 50, downlink: 10, saveData: false
        },
        scheduling: function scheduling() {},
        getGamepads: function getGamepads() {},
        javaEnabled: function javaEnabled() {},
        sendBeacon: function sendBeacon() {},
        vibrate: function vibrate() {},
        managed: function managed() {},
        bluetooth: {},
        storage: {},
        ink: {},
        locks: {},
        hid: {onconnect: null, ondisconnect: null},
        deviceMemory: 8,
        serviceWorker: {controller: null, ready: Promise, oncontrollerchange: null, onmessage: null, onmessageerror: null},
        virtualKeyboard: {boundingRect: {}, overlaysContent: false, ongeometrychange: null},
        clipboard: {},
        wakeLock: {},
        credentials: {},
        keyboard: {},
        userActivation: {hasBeenActive: true, isActive: false}
    };

    const screen = {
        availHeight: 1040,
        availLeft: 0,
        availTop: 0,
        availWidth: 1920,
        colorDepth: 24,
        height: 1080,
        isExtended: false,
        onchange: null,
        pixelDepth: 24,
        width: 1920,
        orientation: {
            angle: 0,
            type: 'landscape-primary',
            onchange: null,
            salute: 'lx'
        },
        toString: function () {
            return '[object Screen]'
        }
    };

    window.localStorage = {};
    window.HTMLBodyElement = function (res) {
        console.log('window.HTMLBodyElement--->', res);
    };
    window.navigator = navigator;
    window.screen = screen;
}
```



## 3.2 _token
断点位置：`zy[y4d8b_q(0x681)] = zG(zV, zF[y4d8b_q(0x459)]())`



![](https://cdn.nlark.com/yuque/0/2024/png/29548914/1725264135527-cc2272f2-4c13-486d-916a-082fb84338ec.png)

`zG()` 加密方法传入了两个参数：false，zF["reload"]()

### 3.2.1 环境轨迹参数	
```jsx
zf["reload"] = function () {
    zf["cts"] = Date["now"]();                                  // 更新 cts 时间戳
    zf['aG'] = ua["getWdLength"]()["toString"]() || 0x0;
    var zG = XZ["getData"]();                                   
    zG ? zf['aF'] = uA(zG) : zf['aF'] = zG;                     
    zf['wA'] = ua["getStringHashMD5"]();                        
    var zF = Object["assign"](zf, XC);                          
    return zo(zF);                                              // url 编码 + base64
}
```

```plain
var zo = function ze(zy) {
    try {
        var zG = JSON"stringify";
        return window"btoa";
    } catch (zF) {
        window["Yoda"]["CAT"]["sendLog"](window["location"]["href"], "jsError", "fp_" + zF["message"], zF["stack"], "info");
        return '';
    }
};
```

跟到 `zF["reload"]()` 直接分析一下返回值的传参 `zF`：

![](https://cdn.nlark.com/yuque/0/2024/png/29548914/1725265837287-25de73ae-c73d-4d70-ba69-c1a5944123b5.png)

分析 `zF`：

```jsx
var zf = {
    'v': "2.2.2",
    'ts': new Date()["getTime"](),
    'cts': new Date()["getTime"](),
    'brVD': zs(),
    'brR': zH(),
    'bI': zM(),
    'aM': zB() || '',
    'broP': zJ(),
    'cV': uA(Xi["getCanvasFp"]()),
    'wV': '',
    'wR': '',
    'wVU': '',
    'wRU': '',
    'aF': '',
    'wI': Xs["hash"],
    'wC': JSON["stringify"](Xs["report"])
};

// ============================================== brVD ==============================================  
var zs = function zY() {
    var zl = Math["max"](document["documentElement"]["clientWidth"], window["innerWidth"] || 0x0);
    var zk = Math["max"](document["documentElement"]["clientHeight"], window["innerHeight"] || 0x0);
    return [zl, zk];
};

// ============================================== brR ==============================================  
var zH = function zl() {
    var zk = [screen["width"], screen["height"]];
    var zI = [screen["availWidth"], screen["availHeight"]];
    var zv = screen["colorDepth"];
    var ze = screen["pixelDepth"];
    return [zk, zI, zv, ze];
};

// ============================================== bI ==============================================  
var zM = function zv() {
    var ze = document["referrer"];
    var zy = window["location"]["href"];
    return [zy, ze];
};

// ============================================== aM ==============================================  
// 识别 PhantomJS
var zB = function zI() {
    try {
        if (window["_phantom"] || window["phantom"] || window["callPhantom"]) return 'ps';
        return zK() || ua["getwd"]();
    } catch (zv) {
        window["Yoda"]["CAT"]["sendLog"](window["location"]["href"], "jsError", "fp_" + zv["message"], zv["stack"], "info");
        return '';
    }
};

// ============================================== broP ==============================================  
// 检测浏览器中安装的插件
var zJ = function zy() {
    var zG = window["navigator"];
    var zF = [];
    try {
        var zV = zG["plugins"];
        var zx = void 0x0;
        for (zx in zV) {
            if (zV["hasOwnProperty"](zx)) {
                var zL = zV[zx]["name"] || '';
                zF["push"](zL);
            }
        }
    } catch (zP) {
        window["Yoda"]["CAT"]["sendLog"](window["location"]["href"], "jsError", "fp_" + zP["message"], zP["stack"], "info");
    }
    return zF;
};

// ============================================== cV ==============================================  
function uA(zm) {
    // md5 实现
}

// Canvas 指纹，利用 Canvas 绘制了一些复杂的图形和文本，图像数据 Base64 编码。
var Xi["getCanvasFp"] = function() {
    var zE = [];
    var zg = document["createElement"]("canvas");
    zg["width"] = 0x1e, zg["height"] = 0x1e, zg["style"]["display"] = "inline";
    var zR = zg["getContext"]('2d');
    if (zR) {
        zR["globalCompositeOperation"] = "multiply", zR["font"] = "30px serif", zR["textAlign"] = "center", zR["textBaseline"] = "middle", zR["fillText"]("😜😂😍", 0xa0, 0x5a), zR["fillStyle"] = "#dd403b", zR["beginPath"](), zR["arc"](0xc, 0xf, 0xa, 0x0, Math['PI'] * 0x2, !![]), zR["closePath"](), zR["fill"](), zR["fillStyle"] = "#d66500", zR["beginPath"](), zR["arc"](0x32, 0x1e, 0x1e, 0x0, Math['PI'] * 0x2, !![]), zR["closePath"](), zR["fill"]();
        var zA = zR["createLinearGradient"](0x0, 0x0, 0xc8, 0x0);
        zA["addColorStop"](0x0, "#F4F4F2"), zA["addColorStop"](0x1, "#F5E905"), zR["fillStyle"] = zA, zR["beginPath"](), zR["arc"](0x78, 0x23, 0x23, 0x0, Math['PI'] * 0x2, !![]), zR["closePath"](), zR["fill"]();
        var zw = zR["createRadialGradient"](0x1e, 0x64, 0x23, 0x8c, 0x6e, 0x19);
            ...    
    }
    zg["toDataURL"] && zE["push"](zg["toDataURL"]());
    return zE["join"]('~');
};

// ============================================== wI wC ==============================================  
// 获取设备的 WebGL 信息
function Xs() {
    var zz = {};
    zz["glVersion"] = '';
    var zE = {};
    zE["vendor"] = '', zE["renderer"] = '', zE["hash"] = '', zE["report"] = zz;
    var zg = zE;
    try {
        var zR = Xm();
        if (zR === null) throw Error("不支持webgl");
        var zA = "\n                attribute vec4 a_position;\n                uniform mat4 u_matrix;\n                varying vec4 v_color;\n                void main() {\n                    gl_Position = a_position;\n                    v_color = gl_Position * 0.5 + 0.5;\n                }\n            ";
        var zw = "\n                precision mediump float;\n                varying vec4 v_color;\n                void main() {\n                    gl_FragColor = v_color; // return reddish-purple\n                }\n            ";
        var zi = Xj(zR, zR["VERTEX_SHADER"], zA);
        var zd = Xj(zR, zR["FRAGMENT_SHADER"], zw);
        var zC = XS(zR, zi, zd);
        var zT = zR["getAttribLocation"](zC, "a_position");
        var zn = zR["createBuffer"]();
        ...
    return zg;
}

// ============================================== wV wR wVU wRU ==============================================  
// 这里因为函数太多、太复杂，就不呈现出来了，根据函数名也能猜出个大概
Xi["getWebglVendor"]()["then"](function (zG) {
    zf['wV'] = zG;
}), Xi["getWebglRenderer"]()["then"](function (zG) {
    zf['wR'] = zG;
}), Xi["getWebglVendorUnmasked"]()["then"](function (zG) {
    zf["wVU"] = zG;
}), Xi["getWebglRendererUnmasked"]()["then"](function (zG) {
    zf["wRU"] = zG;
});
```

```jsx
function uA(zm) {
    // md5 实现
}

// ============================================== aF ==============================================  
/**
 * 如果 riskLevel 等于 '71' 或 '1'，则不执行任何操作。
 * 如果 riskLevel 不等于 '71' 或 '1'，则为 document 添加以下事件监听器：
 * touchstart: 监听触摸事件。
 * mousedown: 监听鼠标按下事件。
 * click: 监听点击事件。
 */
var XZ = {
    'start': function zT() {
        var zn;
        var zZ = (((zn = window["seed"]) === null || zn === void 0x0 ? void 0x0 : zn["config"]) || {})["riskLevel"];
        if (zZ === '71' || zZ === '1') return;
        document["addEventListener"]("touchstart", XT, ![]), document["addEventListener"]("mousedown", XT, ![]), document["addEventListener"]("click", XT, ![]);
    },
    'getData': function zn() {
        return XZ["data"] || '';
    },
    'data': ''
};
var zG = XZ["getData"]();

zG ? zf['aF'] = uA(zG) : zf['aF'] = zG;

// ============================================== fL ==============================================  
// 遍历字体名称和字体样式的所有组合
var XA = function zw(zi) {
    var zd = ["monospace", "sans-serif", "serif"];
    var zC = ["Andale Mono", "Arial", ...];
    var zT = ["Abadi MT Condensed Light", ...];
    // 合并去重
    zC = zC["concat"](zT), zC = zC["filter"](function (zF, zV) {
        return zC["indexOf"](zF) === zV;
    });

    // ...

    var ze = [];
    for (var zy = 0x0, zG = zC["length"]; zy < zG; zy++) {
        zI(zv[zC[zy]]) && ze["push"](zC[zy]);
    }
    zi['fL'] = uA(ze["join"](','))      // 得到组合字符串的 md5
}
// ze["join"](',') = "Arial,Arial Black,Arial Narrow,Book Antiqua,Bookman Old Style,Calibri,Cambria,Cambria Math,..."

// ============================================== aG ==============================================  
// 自动化测试或 WebDriver 相关的标识符数组长度
var uJ = 0x0;
var uf = 0x0;
var ur = 0x0;
var uY = [];
function ul(zm) {
    var zD = ["driver-evaluate", "webdriver-evaluate", "selenium-evaluate", "webdriverCommand", "webdriver-evaluate-response"];
    uY = uY["concat"](zD["join"]());
    uJ = zD["join"]()["length"]
    ...
}

function uG(zD) {
    var zq = ["webdriver", "__driver_evaluate", "__webdriver_evaluate", "__selenium_evaluate", "__fxdriver_evaluate", "__driver_unwrapped", "__webdriver_unwrapped", "__selenium_unwrapped", "__fxdriver_unwrapped"];
    uY = uY["concat"](zq["join"]());
    uf = zq["join"]()["length"];
    ...
}

function uF(zD) {
    var zq = ["webdriver", "_Selenium_IDE_Recorder", "_selenium", "calledSelenium"];
    uY = uY["concat"](zq["join"]());
    ur = zq["join"]()["length"];
    ...
}

ua["getWdLength"] = function up() {
    return uJ + uf + ur;
}
zf['aG'] = ua["getWdLength"]()["toString"]() || 0x0;

// ============================================== wA ==============================================  
// aG 中的 uY，即三个数组的拼接
ua["getStringHashMD5"] = function uQ() {
    return uA(uY["join"](''));
}

zf['wA'] = ua["getStringHashMD5"]();
// uY["join"]('') = 'webdriver,__driver_evaluate,__webdriver_evaluate,__selenium_evaluate,__fxdriver_evaluate,__driver_unwrapped,__webdriver_unwrapped,__selenium_unwrapped,__fxdriver_unwrappedwebdriver,_Selenium_IDE_Recorder,_selenium,calledSeleniumdriver-evaluate,webdriver-evaluate,selenium-evaluate,webdriverCommand,webdriver-evaluate-responsewebdriver,__driver_evaluate,__webdriver_evaluate,__selenium_evaluate,__fxdriver_evaluate,__driver_unwrapped,__webdriver_unwrapped,__selenium_unwrapped,__fxdriver_unwrappedwebdriver,_Selenium_IDE_Recorder,_selenium,calledSeleniumdriver-evaluate,webdriver-evaluate,selenium-evaluate,webdriverCommand,webdriver-evaluate-responsewebdriver,__driver_evaluate,__webdriver_evaluate,__selenium_evaluate,__fxdriver_evaluate,__driver_unwrapped,__webdriver_unwrapped,__selenium_unwrapped,__fxdriver_unwrappedwebdriver,_Selenium_IDE_Recorder,_selenium,calledSeleniumdriver-evaluate,webdriver-evaluate,selenium-evaluate,webdriverCommand,webdriver-evaluate-responsewebdriver,__driver_evaluate,__webdriver_evaluate,__selenium_evaluate,__fxdriver_evaluate,__driver_unwrapped,__webdriver_unwrapped,__selenium_unwrapped,__fxdriver_unwrappedwebdriver,_Selenium_IDE_Recorder,_selenium,calledSeleniumdriver-evaluate,webdriver-evaluate,selenium-evaluate,webdriverCommand,webdriver-evaluate-responsewebdriver,__driver_evaluate,__webdriver_evaluate,__selenium_evaluate,__fxdriver_evaluate,__driver_unwrapped,__webdriver_unwrapped,__selenium_unwrapped,__fxdriver_unwrappedwebdriver,_Selenium_IDE_Recorder,_selenium,calledSeleniumdriver-evaluate,webdriver-evaluate,selenium-evaluate,webdriverCommand,webdriver-evaluate-responsewebdriver,__driver_evaluate,__webdriver_evaluate,__selenium_evaluate,__fxdriver_evaluate,__driver_unwrapped,__webdriver_unwrapped,__selenium_unwrapped,__fxdriver_unwrappedwebdriver,_Selenium_IDE_Recorder,_selenium,calledSeleniumdriver-evaluate,webdriver-evaluate,selenium-evaluate,webdriverCommand,webdriver-evaluate-responsewebdriver,__driver_evaluate,__webdriver_evaluate,__selenium_evaluate,__fxdriver_evaluate,__driver_unwrapped,__webdriver_unwrapped,__selenium_unwrapped,__fxdriver_unwrappedwebdriver,_Selenium_IDE_Recorder,_selenium,calledSeleniumdriver-evaluate,webdriver-evaluate,selenium-evaluate,webdriverCommand,webdriver-evaluate-response'
```

`fT`、`mT` 为 MouseEvent 监测事件的坐标数组，从点击登录后就开始监听红框内鼠标移动轨迹（mousemove）：

![](https://cdn.nlark.com/yuque/0/2024/png/29548914/1725265861322-9f139c5d-4668-4d53-9567-5d144073ef53.png)

```jsx
/* ============================================== fT mT ==============================================
 * 记录鼠标事件的 clientX 和 clientY 坐标以及时间差。
 * 首先存储在 XC['fT'] 中，如果 fT 达到 60，
 * 新数据移到 mT 中，并且 mT 只保留最新的 60 条记录。
 * 前序插入
 */
 var XC = {
    'ts': new Date()["getTime"](),    
    'fT': [],
    'mT': [],
    'kT': [],
    'aT': [],
    'tT': [],
    'dT': [],
    'sT': [],
    'inputs': [],
    'buttons': []
}
 
var zC = function zr(zY) {
    var zl = zY;
    var zk = Date["now"]() - XC['ts'];
    var zI = [zl["clientX"]["toFixed"](0x0), zl["clientY"]["toFixed"](0x0), zk]["join"](',');
    // 如果长度超过 60，则前 60 个元素存到 fT
    if (XC['fT']["length"] < 0x3c) {
        XC['fT']["unshift"](zI);
        return ![];
    }
    
    // 超过 60 的部分存到 mT，如果长度还超过 60，则保留最新的 60 个元素
    XC['mT']["unshift"](zI), XC['mT']["length"] >= 0x3c && (XC['mT'] = XC['mT']["slice"](0x0, 0x3c));
};
```

`kT`（KeyboardEvent）

```jsx
var zT = function zY(zl) {
  var zk = zl;
  var zI = zk["target"];
  var zv = typeof zk["which"] === "number" ? zk["which"] : zk["keyCode"];
  if (zv && zI) {
    var ze = Date["now"]() - XC['ts'];
    XC['kT']["unshift"]([String["fromCharCode"](zv), zI["nodeName"], ze]["join"](','));
  }
  XC['kT']["length"] > 0x1e && (XC['kT'] = XC['kT']["slice"](0x0, 0x1e));
};

// 如果长度超过 30，则保留前 30 个元素
// [按键编码, 按键类型, 时间差] 
[
    'A,INPUT,252672', 
    '2,INPUT,221571', 
  '1,INPUT,30363', 
  '\u0012,BODY,10402'
]
```

![](https://cdn.nlark.com/yuque/0/2024/png/29548914/1725265878410-ee2f4353-7e48-4893-9f33-92bdb2077a0c.png)

`aT`（PointerEvent）

```jsx
var zZ = function zk(zI) {
  var zv = zI;
  var ze = zv["target"];
  var zy = Date["now"]() - XC['ts'];
  XC['aT']["unshift"]([zv["clientX"]["toFixed"](0x0), zv["clientY"]["toFixed"](0x0), ze["nodeName"], zy]["join"](',')), XC['aT']["length"] > 0x1e && (XC['aT'] = XC['aT']["slice"](0x0, 0x1e));
};

// 如果长度超过 30，则保留前 30 个元素
// [点击/触摸的 X 坐标, 点击/触摸的 Y 坐标, 节点类型, 时间差]
[
        "146,197,INPUT,250928",
        "150,197,INPUT,220968",
        "306,147,DIV,220408",
        "119,286,BUTTON,100393",
        "133,178,INPUT,30210",
        "293,132,DIV,9162",
        "-61,10,HTML,4227"
]
```

![](https://cdn.nlark.com/yuque/0/2024/png/29548914/1725265889934-6a034273-5b5f-4d37-b93f-7ed908bd58c3.png)

`dT`（MouseEvent）

```jsx
var zo = function zF(zV) {
    var zx = zV;
    var zL = zx["target"];
    var zP = Date["now"]() - XC['ts'];
    XC['dT']["unshift"]([zx["clientX"]["toFixed"](0x0), zx["clientY"]["toFixed"](0x0), zL["nodeName"], zP]["join"](',')), XC['dT']["length"] > 0x3c && (XC['dT'] = XC['dT']["slice"](0x0, 0x3c));
};

// 如果长度超过 60，则保留前 60 个元素
// [鼠标点击的 X 坐标, 鼠标点击的 Y 坐标, 节点类型, 时间差]
[
        "107,255,FORM,4355004",
        "299,135,DIV,4354140",
        "94,172,DIV,4346756",
        "123,286,BUTTON,1667755",
        "146,197,INPUT,250811",
        "150,197,INPUT,220866",
        "306,147,DIV,220323",
]
```

![](https://cdn.nlark.com/yuque/0/2024/png/29548914/1725265901215-a48010c2-80b2-4eb2-b9cc-b556e1c440af.png)

`inputs`（FocusEvent）

```jsx
var zs = function zI(zv) {
  var ze = zv;
  var zy = ze["target"];
  if (zy["nodeName"] && zy["nodeName"] === "INPUT") {
    var zG = zy['id'];
    !zG && (zG = zy['id'] = "rohr_" + parseInt(String(Math["random"]() * 0xf4240), 0xa));
    var zF = XC["inputs"]["length"];
    for (var zV = 0x0; zV < zF; zV++) {
      zG === XC["inputs"][0x0]["inputName"] && (XC["inputs"]["splice"](0x0, 0x1), zV = 0x0, zF -= 0x1);
    }
    XC["inputs"]["unshift"]({
      'inputName': zG,
      'editStartedTimeStamp': Date["now"](),
      'keyboardEvent': "0-0-0-0"
    });
  }
};

// 记录用户在网页上输入的操作
"inputs": [
    {
        "inputName": "password",                  // 当前 INPUT 元素的 ID
        "editStartedTimeStamp": 1725252093635,    // 输入开始时间戳
        "keyboardEvent": "0-0-1-0",               // 键盘事件的状态
        "editFinishedTimeStamp": 1725252093637    // 输入结束时间戳
    },
        ....
],
```

`buttons`（处理点击 BUTTON）

```jsx
var zW = zV["target"];
if (zW["nodeName"] && zW["nodeName"] === "BUTTON") {
  var zt = zW['id'];
  !zt && (zt = zW['id'] = "rohr_" + parseInt(String(Math["random"]() * 0xf4240), 0xa));
  var zp = XC["buttons"]["length"];
  for (var zQ = 0x0; zQ < zp; zQ++) {
    zt === XC["buttons"][zQ]["buttonName"] && (XC["buttons"]["splice"](zQ, 0x1), zQ = 0x0, zp -= 0x1);
  }
  var zU = Xd(zV);
  var za = zW["clientWidth"];
  var zO = zW["clientHeight"];
  var zb = zL / za * 0x3e8;
  var zc = (zO - zP) / zO * 0x3e8;
  XC["buttons"]["unshift"]({
    'buttonName': zt,
    'touchPoint': '{' + zU['x'] + ',' + zU['y'] + '}',
    'touchPosition': '{' + Math["floor"](zb) / 0xa + ',' + Math["floor"](zc) / 0xa + '}',
    'touchTimeStamp': Date["now"]()
  });
}

// 记录按钮操作
"buttons": [
      {
          "buttonName": "rohr_255889",     // rohr_ + 0-999999的随机数
          "touchPoint": "{152,274}",       // 鼠标点击位置
          "touchPosition": "{39.6,83.3}",  // 点击在按钮上的相对位置
          "touchTimeStamp": 1724046307572  // 点击时间
      }
]
```

整个参数的生成：

```jsx
var token_data = {
    "v": "2.2.2",           // 版本，固定值
    "ts": 1723776732799,    // 时间戳, 后面分析
    "cts": 1723787276117,   // 在 zF["reload"] 更新的时间戳, 后面分析
    "brVD": [               // 滑块长宽
        370,
        420
    ],
    "brR": [                // 浏览器窗口信息
        [                   // 屏幕宽高
            1920,
            1080
        ],
        [                   // 可用宽高
            1920,
            1040
        ],
            24,               // 色彩深度
        24                  // 像素深度
    ],
    "bI": [                 // referrer 和 href
        "https://epassport.meituan.com/new/login/account?feconfig=hotel-fe-ebooking&service=hotel&loginsource=14&noSignup=true&bg_source=4&loginurl=https%3A%2F%2Feb.meituan.com%2Febk%2Flogin%2Flogin.html&continue=https%3A%2F%2Feb.meituan.com%2Fgw%2Faccount%2Fbiz%2Fsettoken%3Fredirect_uri%3Dhttps%253A%252F%252Feb.meituan.com%252Febk%252Flogin%252Fsettoken.html",
        "https://eb.meituan.com/"
    ],
    "aM": "",               // 识别 PhantomJS
    "broP": [               // 浏览器插件
        "PDF Viewer",
        "Chrome PDF Viewer",
        "Chromium PDF Viewer",
        "Microsoft Edge PDF Viewer",
        "WebKit built-in PDF"
    ],
    "cV": "11f9dc54377bde4fa3bb337996e2e08a",       // Canvas 指纹md5
    "wI": "4215054477",                             // WebGL 指纹
    "wC": JSON.stringify({                          // WebGL 和 WebGL2 的详细信息
        "platform": "Win32",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
        "contextName": "webgl2",
        "glVersion": "WebGL 2.0 (OpenGL ES 3.0 Chromium)",
                ...
    }),
    "wV": "WebKit",                 // WebGL 供应商
    "wR": "WebKit WebGL",           // WebGL 渲染器
    "wVU": "Google Inc. (Intel)",   // WebGL 供应商底层信息
    "wRU": "ANGLE (Intel, Intel(R) Iris(R) Xe Graphics (0x00009A49) Direct3D11 vs_5_0 ps_5_0, D3D11)",   // WebGL 渲染器硬件信息
        "aF": "",                                   // 获取事件监听信息
    "fL": "3d2ac4fb658020d326848357af601414",   // 固定值，字体MD5
    "aG": "325",                                // 固定值，自动化测试标识符数组长度
    "wA": "e5fa9a84b692689061aed9df1957bd14",   // 固定值，自动化测试标识符数组MD5
    
    // Mousemove
     "fT": [                                    
        "161,102,1002745",
        "176,105,1002728",
        "196,115,1002711",
        ...
    ],
    "mT": [
        "316,152,270770733",
        "280,154,270770724",
        "246,157,270770717",
        "217,162,270770709",
        ...
    ],
    
    // KeyboardEvent
    "kT": [
        "V,INPUT,267111416",
        "\\u0011,INPUT,267111352",
        "\\u0012,INPUT,267108233",
        "V,INPUT,267107891",
        "\\u0011,INPUT,267107794",
    ],
    
    // PointerEvent
    "aT": [
        "-57,8,HTML,270774365",
        "119,293,BUTTON,270769621",
        "322,53,A,270768749",
        ...
    ],
    "tT": [],
    
    // MouseEvent
    "dT": [
        "102,184,DIV,270770589",
        "119,293,BUTTON,270769536",
        "322,53,A,270768647",
        "93,174,DIV,270750992",
        "235,285,BUTTON,270748830"
        ...
    ],
    "sT": [],
    
    // inputs
    "inputs": [
        {
            "inputName": "password",
            "editStartedTimeStamp": 1725252093635,
            "keyboardEvent": "0-0-1-0",
            "editFinishedTimeStamp": 1725252093637
        },
                ....
    ],
    
    // BUTTON
    "buttons": [
        {
            "buttonName": "rohr_454779",
            "touchPoint": "{119,293}",
            "touchPosition": "{29,43.7}",
            "touchTimeStamp": 1725255747046
        }
    ]
}
```

经过测试可以得出，重要的参数为 `mT`，其余的 Event 数组参数都可以置空。

### 3.2.2 时间戳
`initTimeStamp`、`firstTimeStamp`、`ts`、`cts` 这几个数据的初始化顺序：

```jsx
XC['ts'] -> zf['ts'] -> zf['cts'] -> initTimeStamp

// 点击登录后最先触发，并且不刷新页面情况下，该值不会再次初始化
XC = {
  'ts': new Date()[y4d8b_q(0x5eb)](),
  ...
}

// 点击登录后触发，每次点击都会初始化
zf = {
  'v': y4d8b_q(0x69d),
  'ts': new Date()[y4d8b_q(0x5eb)](),
  'cts': new Date()[y4d8b_q(0x5eb)](),
  ...
}

function zW(zt) {
    var zp = zP[y4d8b_q(0x46b)](this, zt) || this;
    zp[y4d8b_q(0x334)] = Date[y4d8b_q(0x7a5)](),     // initTimeStamp
    ...
}

// 点击滑块: firstTimeStamp
!zp[y4d8b_q(0x79a)] && (zp[y4d8b_q(0x79a)] = Date[y4d8b_q(0x7a5)]());
```

初始化后，initTimeStamp、firstTimeStamp 不变：

![](https://cdn.nlark.com/yuque/0/2024/png/29548914/1725265925047-c60b107b-9d64-4143-9e1a-64b08868e0a1.png)

ts 和 cts 在初始化后会更新时间戳：

```jsx
zf["reload"] = function () {
    zf["cts"] = Date["now"]();        // 更新 cts 时间戳
    ...
    var zF = Object["assign"](zf, XC);   // XC 的 ts 替换 zf 的 ts
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/29548914/1725269761514-8722f0e5-c4b0-4387-8c88-a4ad187d38f3.png)

**总流程：**

+ 输入账密 → 首次点击登录 → XC['ts'] → zf['ts']、zf['cts'] → initTimeStamp → 点击滑块 → firstTimeStamp → zf['cts'] 更新、zf['ts'] = XC['ts']
+ 再次点击登录 → zf['ts']、zf['cts'] → initTimeStamp →  点击滑块 → firstTimeStamp → zf['cts'] 更新、zf['ts'] = XC['ts']

`mT` 时间差使用的是 XC['ts']，point 时间差使用的是 initTimeStamp。

再进行分析，得到时间差相关联系：

```jsx

behavior = {
    "trajectory": [
        {
            "point": [
                [0,93,174,86776],
                [0,105,175,86803],
                [0,113,175,86815],
                [0,119,175,86822],
                // ...
                [0,283,175,86915],
                [0,306,173,86924]
            ],
            // ...
        }
    ],
    "env": {
        // ...
        "Timestamp": [
            1724046308080,   // initTimeStamp
        ],
        // ...
    }
}

_token = {
    "ts": 1724034514897,        // XC['ts']
    "mT": [
        "306,173,11880107",
        "283,175,11880098",
        // ...
        "113,175,11879998",
        "105,175,11879986",
        "96,174,11879980",
        "93,174,11879818",
    ]
    // ...
}
```

`_token` 的 `ts` 和轨迹时间差要与 `behavior` 的 Timestamp 的 `initTimeStamp` 和轨迹时间差同步。

```python
points = [
    # [0,93,174,86776],    # mousedown 不与 mousemove 时间差同步
    [0,105,175,86803],
    [0,113,175,86815],
    [0,119,175,86822],
    [0,129,175,86828],
    [0,137,175,86835],
    [0,146,175,86843],
    [0,155,175,86851],
    [0,166,175,86861],
    [0,179,175,86868],
    [0,192,175,86878],
    [0,208,175,86883],
    [0,225,175,86892],
    [0,242,175,86900],
    [0,264,175,86908],
    [0,283,175,86915],
    [0,306,173,86924]
]
timestamp = [1724046308080, 1724046394855]
print([point[3] + timestamp[0] for point in points][::-1])

mTs = [
    [306,173,11880107],
    [283,175,11880098],
    [264,175,11880091],
    [242,175,11880083],
    [225,175,11880075],
    [208,175,11880066],
    [192,175,11880061],
    [179,175,11880051],
    [166,175,11880044],
    [155,175,11880034],
    [146,175,11880026],
    [137,175,11880018],
    [129,175,11880011],
    [119,175,11880005],
    [113,175,11879998],
    [105,175,11879986],
    # [96,174,11879980],
    # [93,174,11879818]
]
ts = 1724034514897
cts = 1724046432341
print([mT[2] + ts for mT in mTs])

# [1724046395004, 1724046394995, 1724046394988, 1724046394980, 1724046394972, 1724046394963, 1724046394958, 1724046394948, 1724046394941, 1724046394931, 1724046394923, 1724046394915, 1724046394908, 1724046394902, 1724046394895, 1724046394883]
# [1724046395004, 1724046394995, 1724046394988, 1724046394980, 1724046394972, 1724046394963, 1724046394958, 1724046394948, 1724046394941, 1724046394931, 1724046394923, 1724046394915, 1724046394908, 1724046394902, 1724046394895, 1724046394883]
```

### 3.2.3 zG 加密函数
```jsx
zy["_token"] = zG(zV, zF["reload"]())

function zG(zL, zP) {
    var zW = window["decodeURIComponent"](window["atob"](zP));    // zP = zF["reload"]()
    return mK(zW, ze, zL);       // ze = request_code, zL = false
}

function mK(zY, zl, zk) {
    var zI = mm["Kaito"](zY, zl);
    return md(zI, zk);
}
```

使用的是和 behavior 一样的加密函数，传入的是明文形式的环境参数和轨迹参数，与 behavior 不同的是传入的 key 直接就是 `request_code`。

## 3.3 其它参数
`TimesTamp`：[page_data](https://verify.meituan.com/v2/ext_api/page_data) 的响应数据中的时间戳。

`Authencation`

```jsx
// 提取 body 参数，先排序再转换为 URL 参数的格式
function Dv(zv) {
    function ze(zy) {
        return function (zG) {
            var zF = zG["body"];
            var zV = [];
            for (var zx in zF) {
                zV["push"](zx);
            }
            zV["sort"]();
            return zV["map"](function (zL) {
                return zL + '=' + zF[zL];
            })["join"]('&');
        }(zy);
    }
    zv = ze(zv);
    return zv;
}

function De(zv) {
    function ze(zx) {...};      // sha256
    zv = ze(zv);
    function zy(zx) {...};      // sha256
    zv = zy(zv);
    function zG(zx) {...};      // sha512
    zv = zG(zv);
    function zF(zx) {...};      // md5
    zv = zF(zv);
    function zV(zx) {...};      // md5
    zv = zV(zv);
}

function uA(zm) {
    // md5 实现
}

DJ["utf8Encode"] = function (zv) {
    // UTF8 编码
}

var zt = {
    "env": zW,
    "body": ze
}
var zU = Dv(DI(zt));
var zb = "HTTPMethod=POST&Content-MD5=" + uA(DJ["utf8Encode"](zU)) + "&Content-Type=" + zy["Content-Type"] + "&Date=" + zG + "&Url=" + zO;
zy["Authencation"] = De(zb);
zy["TimesTamp"] = '' + zG;    // zG = https://verify.meituan.com/v2/ext_api/page_data 的响应数据中的时间戳
```

通过打断点分析，发现这里的 zG 就是 [page_data](https://verify.meituan.com/v2/ext_api/page_data) 的响应数据中的时间戳。而 zt 是我们 [verify](https://verify.meituan.com/v2/ext_api/merchantlogin/verify) 的请求体以及环境参数，然后对其做了一系列 hash 算法得到 Authencation：

```python
dic = {
    "env": {
        "versionCode": "21ce4e1f1f78de9e",      # v_c，固定值
        "jsVersion": "4998522735",              # j_v，[page_data](https://verify.meituan.com/v2/ext_api/page_data) 响应数据的 verifyMethodVersion
        "jsCode": "71",                         # id，[page_data](https://verify.meituan.com/v2/ext_api/page_data) 响应数据的 riskLevelInfo
        "jsType": "d",                          # debug，固定值
        "yodaVersion": "7b5904b2d8ae841a"       # [page_data](https://verify.meituan.com/v2/ext_api/page_data) 响应数据的 yodaVersion
    },
    "body": {
        "id": "71",
        "request_code": "a7f7a5c879854cf0856c102764b0dc82",
        "behavior": "LTIwMzc2MjIyNQ==#B...",
        "fingerprint": "",
        "action": "merchantlogin",
        "_token": "LTIwMzc2MjIyNQ==#OY...",
        "listIndex": 0,
        "source": 1,
        "l_s_c": "35",
        "s_s_c": "35",
        "l_d_s_c": "27",
        "___en_ck___": "1",
        "___l_s_cn___": "1723619635UV47422",
        "v_c": "21ce4e1f1f78de9e",
        "j_v": "4998522735",
        "e4350633": "0856c102"
    }
}

def gen_Authencation(dic, ts):
    zF = dic["body"]
    data = '&'.join(f"{key}={zF[key]}" for key in sorted(zF.keys()))
    res = f'HTTPMethod=POST&Content-MD5={md5(data)}&Content-Type=application/x-www-form-urlencoded&Date={ts}&Url=https://verify.meituan.com/v2/ext_api/merchantlogin/verify'
    # "HTTPMethod=POST&Content-MD5=7e8d046b65ab7585ee96d43be9d1ab77&Content-Type=application/x-www-form-urlencoded&Date=1723803587879&Url=https://verify.meituan.com/v2/ext_api/merchantlogin/verify"
    return md5(md5(sha512(sha256(sha256(res)))))
```

`e4350653`：request_code 截取索引 15-23 的字符串。

```jsx
function zP(zW) {
  return function (zt) {
    return zt["body"]["request_code"]["substring"](0xf, 0x17);
  }(zW);
}
zv["body"]["e4350633"] = zP(zv);
```

# 4. 总代码
```python
"""
Description: main.py 主函数
Author: DSTBP
Date: 2024-08-30 10:57:31
LastEditTime: 2024-08-30 11:49:35
LastEditors: DSTBP
"""
import sys
import json
import time
import requests
from loguru import logger
from utils import MeituanData, get_user_agent

# 日志
logger.remove()
handler_id = logger.add(sys.stderr, level="INFO")


class MeiTuanLogin:
    def __init__(self):
        # 账密
        self.account = 'nyyjhcz'
        self.password = 'nyyjwxh027'
        self.ua = get_user_agent()
        # 初始化session
        self.session = self.init_session()
        # 初始化数据获取类
        self.MT = MeituanData()

    def init_session(self):
        session = requests.session()
        session.params = (
            ('yodaReady', 'h5'),
            ('csecplatform', '4'),
            ('csecversion', '2.4.0'),
        )
        session.headers = {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Origin': 'https://epassport.meituan.com',
            'Pragma': 'no-cache',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'User-Agent': self.ua,
        }
        # session.proxies = get_proxy()
        return session

    # 获取 request_code
    def get_request_code(self) -> str:
        headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Referer': 'https://epassport.meituan.com/new/login/account?feconfig=hotel-fe-ebooking&service=hotel&loginsource=14&noSignup=true&bg_source=4&loginurl=https%3A%2F%2Feb.meituan.com%2Febk%2Flogin%2Flogin.html&continue=https%3A%2F%2Feb.meituan.com%2Fgw%2Faccount%2Fbiz%2Fsettoken%3Fredirect_uri%3Dhttps%253A%252F%252Feb.meituan.com%252Febk%252Flogin%252Fsettoken.html',
            'x-requested-with': 'XMLHttpRequest',
            **self.session.headers
        }

        data = {
            "login": "123",
            "password": "123",
            "continueUrl": "https://eb.meituan.com/gw/account/biz/settoken?redirect_uri': 'https://eb.meituan.com/ebk/login/settoken.html",
            "rememberPassword": False,
            "secondVerify": False,
            "interCode": "86",
            "lang": "zh-CN",
            "utmParam": {
                "appKey": "hotel",
                "bgSource": "4",
                "platform": "2",
                "sdkVersion": "node-a5084194"
            }
        }
        response = self.session.post('https://epassport.meituan.com/api/account/passwordlogin', headers=headers, json=data)
        logger.info(f'[+] {response.json()}')
        return response.json()['data']['needVerify']['verifyRequestCode']

    # 获取 page_data 的响应相关参数
    def get_data(self, requestCode: str) -> dict:
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': 'https://epassport.meituan.com/',
            **self.session.headers
        }

        data = {
            'requestCode': requestCode,
            'feVersion': '1.6.1',
            'source': '1',
            'layer': '2'
        }
        response = self.session.post('https://verify.meituan.com/v2/ext_api/page_data', headers=headers, data=data)
        data = response.json()['data']
        if data and data['riskLevel'] == '71':
            return {
                'session': data['session'],
                'sign': data['sign'],
                'jsVersion': json.loads(json.loads(data['verifyMethodVersion'])['slider'])['d'],
                'yodaVersion': json.loads(data['yodaVersion'])['d'],
                'request_code': data['request_code'],
                'timestamp': data['timestamp']
            }

    # 滑块验证
    def verify(self, general_data: dict, behavior_data: dict, token_data: dict) -> str:
        enc_behavior = self.MT.get_enc_data(behavior_data, general_data, 'behavior')
        enc_token = self.MT.get_enc_data(token_data, general_data, 'token')

        headers = {
            'Authencation': '',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': 'https://epassport.meituan.com/',
            'TimesTamp': str(general_data['timestamp']),
            **self.session.headers
        }
        data = {
            'id': '71',
            'request_code': general_data['request_code'],
            'behavior': enc_behavior,
            'fingerprint': '',
            'action': 'merchantlogin',
            '_token': enc_token,
            'listIndex': '0',
            'source': '1',
            'l_s_c': '40',
            's_s_c': '2',
            'l_d_s_c': '2',
            '___en_ck___': '1',
            '___l_s_cn___': '1723619635UV47422',
            'v_c': '21ce4e1f1f78de9e',
            'j_v': general_data['jsVersion'],
            'e4350633': general_data['request_code'][0xf:0x17]
        }
        headers['Authencation'] = self.MT.gen_Authencation(data, general_data['timestamp'])
        response = self.session.post('https://verify.meituan.com/v2/ext_api/merchantlogin/verify', headers=headers, data=data)
        res = response.json()

        if not res['error']:
            logger.success(f"[+] 滑块验证通过: {res}")
            return res['data']['response_code']

        match res['error']['code']:
            case 121079:
                logger.error("[-] 验证失败,请重新操作\n\n")
            case 121056:
                logger.error("[-] 请求异常,拒绝操作\n\n")
            case 121180:
                logger.error("[-] 验证失败，可尝试点击右边小问号解决\n\n")
            case _:
                logger.error(f"[-] 未知错误: {res}\n\n")
        return None

    # 登录请求
    def login(self, requestCode: str, responseCode: str) -> None:
        headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Referer': 'https://epassport.meituan.com/new/login/account?feconfig=hotel-fe-ebooking&service=hotel&loginsource=14&noSignup=true&bg_source=4&loginurl=https%3A%2F%2Feb.meituan.com%2Febk%2Flogin%2Flogin.html&continue=https%3A%2F%2Feb.meituan.com%2Fgw%2Faccount%2Fbiz%2Fsettoken%3Fredirect_uri%3Dhttps%253A%252F%252Feb.meituan.com%252Febk%252Flogin%252Fsettoken.html',
            'x-requested-with': 'XMLHttpRequest',
            **self.session.headers
        }
        data = {
            "login": self.account,
            "password": self.password,
            "continueUrl": "https://eb.meituan.com/gw/account/biz/settoken?redirect_uri': 'https://eb.meituan.com/ebk/login/settoken.html",
            "rememberPassword": False,
            "secondVerify": False,
            "requestCode": requestCode,
            "responseCode": responseCode,
            "interCode": "86",
            "lang": "zh-CN",
            "utmParam": {
                "appKey": "hotel",
                "bgSource": "4",
                "platform": "2",
                "sdkVersion": "node-1b735196"
            }
        }
        response = self.session.post('https://epassport.meituan.com/api/account/passwordlogin', headers=headers, json=data)
        data = response.json()
        match data['status']['code']:
            case 2009:
                logger.warning('[+] 验证请求异常，拒绝操作\n\n')
            case 2002:
                logger.success(f'[+] 需要短信验证\n\n')
            case 1500:
                logger.warning(f'[+] 未知错误，请稍后重试\n\n')
            case _:
                logger.error(f"[-] 异常: {data}\n\n")

    def main(self):
        # 获取 request_code、page_data 响应数据
        request_code = self.get_request_code()
        resp_data = self.get_data(request_code)

        # 初始化时间戳
        timestamp = int(time.time() * 1000)

        # 获取明文形式 behavior、token
        behavior_data = self.MT.get_behavior(timestamp)
        point = behavior_data['trajectory'][0]['point']
        token_data = self.MT.get_token(json.dumps(point, separators=(',', ':')), self.ua, timestamp)

        logger.warning(f'[+] {behavior_data}')
        logger.warning(f'[+] {token_data}')

        # 获取验证成功的 response_code
        response_code = self.verify(general_data=resp_data, behavior_data=behavior_data, token_data=token_data)

        if not response_code:
            logger.error(f'[-] 模拟滑块失败!')

        # 登录
        self.login(request_code, response_code)


if __name__ == "__main__":
    # for _ in range(0, 5):
    mt = MeiTuanLogin()
    mt.main()
```

```python
"""
Description: utils.py 工具函数
Author: DSTBP
Date: 2024-08-30 10:57:31
LastEditTime: 2024-08-30 11:49:35
LastEditors: DSTBP
"""
import json
import random
import sys
import hashlib
import execjs
import requests
from loguru import logger

# 日志
logger.remove()
handler_id = logger.add(sys.stderr, level="INFO")


def md5(data: str) -> str:
    return hashlib.md5(data.encode('utf-8')).hexdigest()


def sha256(data: str) -> str:
    return hashlib.sha256(data.encode('utf-8')).hexdigest()


def sha512(data: str) -> str:
    return hashlib.sha512(data.encode('utf-8')).hexdigest()


# 获取代理
def get_proxy(proxy: str) -> dict:
    if str(proxy) != '0':
        proxies = {
            'http': proxy,
            'https': proxy,
        }
        return proxies


# 获取 User-Agent
def get_user_agent() -> str:
    dev = [
        "oppo",
        "xiaomi",
        "readmi",
        "hw",
        "one plus",
        "apple",
        "android",
        "vivo",
        "Intel Mac OS",
        "windows",
    ]
    device = random.choice(dev)
    seed = [9, 10, 11, 12, 13, 14, 15]
    num = random.choice(seed)
    return f"Mozilla/5.0 (Linux; {device.upper()} {num} ;Build/TP1A.2{num}125.90; wv ) AppleWebKit/217.06 (KHTML, like Gecko) Version/4.0 Chrome/122.0.6261.{num}0 Mobile Safari/537.{num} XWEB/1221167 MMWEBSDK/20231201 MMWEBID/4622 MicroMessenger/8.0.45.2521(0x28{num}2D34) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64 MiniProgramEnv/android"


class MeituanData:
    def __init__(self):
        pass

    def gen_Authencation(self, dic: dict, ts: int) -> str:
        data = '&'.join(f"{key}={dic[key]}" for key in sorted(dic.keys()))
        res = f'HTTPMethod=POST&Content-MD5={md5(data)}&Content-Type=application/x-www-form-urlencoded&Date={ts}&Url=https://verify.meituan.com/v2/ext_api/merchantlogin/verify'
        return md5(md5(sha512(sha256(sha256(res)))))

    def get_enc_data(self, pt: dict, general: dict, name: str) -> str:
        try:
            with open(f'./encrypt.js', 'r', encoding='utf8') as file:
                js_code = file.read()
                ctx = execjs.compile(js_code)
                result = ctx.call('gen_behavior_token', pt, general, name)
                return result
        except execjs.ProgramError as e:
            logger.error(f"Error occurred in gen_behavior_token: {e}")
            return ""

    def get_behavior(self, ts: int) -> dict:
        pool = [
            [[0, 90, 172, 594], [0, 104, 172, 656], [0, 112, 172, 664], [0, 120, 173, 671], [0, 126, 173, 680],
             [0, 135, 174, 688], [0, 147, 174, 695], [0, 158, 174, 704], [0, 172, 174, 711], [0, 186, 174, 720],
             [0, 197, 174, 728], [0, 208, 174, 735], [0, 218, 173, 743], [0, 226, 173, 751], [0, 235, 172, 760],
             [0, 241, 172, 767], [0, 247, 171, 775], [0, 252, 171, 783], [0, 256, 171, 791], [0, 258, 170, 799],
             [0, 259, 170, 808], [0, 260, 170, 815], [0, 263, 169, 863], [0, 272, 168, 871], [0, 280, 167, 879],
             [0, 287, 166, 887]],
            [[0, 88, 178, 567], [0, 98, 178, 598], [0, 110, 178, 606], [0, 123, 178, 615], [0, 134, 178, 623],
             [0, 146, 178, 630], [0, 159, 179, 638], [0, 172, 180, 646], [0, 187, 180, 654], [0, 202, 181, 662],
             [0, 222, 181, 670], [0, 238, 181, 678], [0, 257, 181, 686], [0, 277, 181, 694], [0, 293, 181, 702]],
            ...
        ]
        trajectory = {
            "trajectory": [{"point": [], "vector": {"orientation": "h"}}],
            "env": {
                "Type": 0,
                "Return": 0,
                # "zone": [round(random.uniform(200, 250)), round(random.uniform(30, 50))],
                "zone": [230, 33],
                "client": [69, 156],
                "Timestamp": [str(ts - 2000), str(ts)],
                "count": 2,
                "timeout": 0
            }
        }

        if pool:
            movement = pool[round(random.uniform(0, len(pool) - 1))]

            sub1 = round((random.random() - 0.5) * 20)  # -10 到 10
            sub2 = round((random.random() - 0.5) * 20)
            sub3 = round((random.random() - 0.5) * 20)

            for val in movement:
                t = [
                    val[0],  # 0
                    round(val[1] + sub1),  # x
                    round(val[2] + sub2),  # y
                    val[3] + sub3,  # time difference
                ]
                trajectory["trajectory"][0]["point"].append(t)
        return trajectory

    def get_token(self, trajectory_point: str, _user_agent: str, ts: int) -> dict:
        width = round(random.uniform(1800, 2000))  # 屏幕宽
        height = round(random.uniform(900, 1500))  # 屏幕高

        msg = {
            "v": "2.2.2",
            "ts": ts - random.randint(700000, 900000),
            "cts": ts + random.randint(40000, 50000),
            "brVD": [round(random.uniform(300, 400)), round(random.uniform(400, 500))],  # 滑块长宽
            "brR": [[width, height], [width, height], 24, 24],  # 浏览器窗口信息
            "bI": [
                "https://epassport.meituan.com/new/login/account?feconfig=hotel-fe-ebooking&service=hotel&loginsource=14&noSignup=true&bg_source=4&loginurl=https%3A%2F%2Feb.meituan.com%2Febk%2Flogin%2Flogin.html&continue=https%3A%2F%2Feb.meituan.com%2Fgw%2Faccount%2Fbiz%2Fsettoken%3Fredirect_uri%3Dhttps%253A%252F%252Feb.meituan.com%252Febk%252Flogin%252Fsettoken.html",
                "https://eb.meituan.com/"
            ],
            "aM": "",
            "broP": [],
            "cV": "bbaefb5a88c588ba11e3d802203b9812",
            "wV": "WebKit",
            "wR": "WebKit WebGL",
            "wVU": "Qualcomm",
            "wRU": "Adreno (TM) 630",
            "aF": "",
            "wI": "2218542028",
            "wC": '{"platform":"Linux armv81","userAgent": "' + _user_agent + '","contextName":"webgl2","glVersion":"WebGL...',
            "fL": "82fc8a9afbe6928bfc5c712df6df8fd4",
            "aG": "325",
            "wA": "390933e72e6096e878c1b972bac13f16",
            "fT": [],
            "mT": [],
            "kT": [],
            "aT": [],
            "tT": [],
            "dT": [],
            "sT": [],
            "inputs": [],
            "buttons": []
        }
        reversed_array = json.loads(trajectory_point)[::-1]

        for val in reversed_array:
            t = [
                f"{val[1]}",
                f"{val[2]}",
                str(ts + val[3] - msg['ts'])
            ]
            msg["mT"].append(",".join(t))

        return msg
```

```jsx
/*
 * @Description: 加密JS behavior、token
 * @Author: DSTBP
 * @Date: 2024-08-15 15:51:14
 * @LastEditTime: 2024-08-16 13:50:22
 * @LastEditors: DSTBP
 */
const CryptoJS = require('crypto-js');
window = global;

// 设置浏览器环境
function setBrowserEnvironment() {
    const navigator = {
        plugins: {},
        webdriver: false,
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        languages: ["zh-CN", "zh"],
        appCodeName: "Mozilla",
        appName: "Netscape",
        appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        platform: "Win32",
        vendorSub: "",
        productSub: '20030107',
        vendor: 'Google Inc.',
        maxTouchPoints: 0,
        hardwareConcurrency: 6,
        product: 'Gecko',
        language: 'zh-CN',
        pdfViewerEnabled: true,
        cookieEnabled: true,
        onLine: true,
        geolocation: {
            getCurrentPosition: function () {},
            watchPosition: function () {},
            clearWatch:function () {}
        },
        webkitTemporaryStorage: {},
        webkitPersistentStorage: {},
        mimeTypes: {},
        connection: {
            onchange: function () {}, effectiveType: '4g', rtt: 50, downlink: 10, saveData: false
        },
        scheduling: function scheduling() {},
        getGamepads: function getGamepads() {},
        javaEnabled: function javaEnabled() {},
        sendBeacon: function sendBeacon() {},
        vibrate: function vibrate() {},
        managed: function managed() {},
        bluetooth: {},
        storage: {},
        ink: {},
        locks: {},
        hid: {onconnect: null, ondisconnect: null},
        deviceMemory: 8,
        serviceWorker: {controller: null, ready: Promise, oncontrollerchange: null, onmessage: null, onmessageerror: null},
        virtualKeyboard: {boundingRect: {}, overlaysContent: false, ongeometrychange: null},
        clipboard: {},
        wakeLock: {},
        credentials: {},
        keyboard: {},
        userActivation: {hasBeenActive: true, isActive: false}
    };
    const screen = {
        availHeight: 1040,
        availLeft: 0,
        availTop: 0,
        availWidth: 1920,
        colorDepth: 24,
        height: 1080,
        isExtended: false,
        onchange: null,
        pixelDepth: 24,
        width: 1920,
        orientation: {
            angle: 0,
            type: 'landscape-primary',
            onchange: null,
            salute: 'lx'
        },
        toString: function () {
            return '[object Screen]'
        }
    };

    window.localStorage = {};
    window.HTMLBodyElement = function (res) {
        console.log('window.HTMLBodyElement--->', res);
    };
    window.navigator = navigator;
    window.screen = screen;
}

// AES 解密函数
function aesDecrypt(cipherTextBase64, keyBase64, ivBase64) {
    let ciphertext = CryptoJS.enc.Base64.parse(cipherTextBase64);
    let key = CryptoJS.enc.Base64.parse(keyBase64);
    let iv = CryptoJS.enc.Base64.parse(ivBase64);

    // 创建 AES 解密器，模式为 CBC，填充方式为 PKCS7
    let decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    // 解密并将明文转换为字符串
    return decrypted.toString(CryptoJS.enc.Utf8);
}

// UTF8 编码
function utf8Encode(zK) {
    if (/^[\x00-\x7f]*$/["test"](zK)) return zK;            // 如果字符串仅包含 ASCII 字符，直接返回
    var zB = [];
    var zM = zK["length"];
    for (let zo = 0x0, zJ = 0x0; zo < zM; ++zo, ++zJ) {
        let zf = zK["charCodeAt"](zo);
        if (zf < 0x80) zB[zJ] = zK["charAt"](zo); else {
            if (zf < 0x800) zB[zJ] = String["fromCharCode"](0xc0 | zf >> 0x6, 0x80 | zf & 0x3f); else {
                if (zf < 0xd800 || zf > 0xdfff) zB[zJ] = String["fromCharCode"](0xe0 | zf >> 0xc, 0x80 | zf >> 0x6 & 0x3f, 0x80 | zf & 0x3f); else {
                    if (zo + 0x1 < zM) {
                        var zr = zK["charCodeAt"](zo + 0x1);
                        if (zf < 0xdc00 && 0xdc00 <= zr && zr <= 0xdfff) {
                            let zY = ((zf & 0x3ff) << 0xa | zr & 0x3ff) + 0x10000;
                            zB[zJ] = String["fromCharCode"](0xf0 | zY >> 0x12 & 0x3f, 0x80 | zY >> 0xc & 0x3f, 0x80 | zY >> 0x6 & 0x3f, 0x80 | zY & 0x3f);
                            ++zo;
                        }
                    }
                }
            }
        }
    }
    return zB["join"]('');
}

// 字符串转换为整数数组，如果 includeLength 为真，会在数组的最后一个元素中存储字符串的长度。
function strToIntArray(str, includeLength) {
    let length = str.length;
    let arraySize = Math.ceil(length / 4);
    let intArray = includeLength ? new Array(arraySize + 1) : new Array(arraySize);
    if (includeLength) intArray[arraySize] = length;
    for (let i = 0; i < length; i++) {
        intArray[i >> 2] |= str.charCodeAt(i) << ((i & 3) << 3);
    }
    return intArray;
}

// 整数列表转换为字符串
function intArrayToStr(intArray, includeLength) {
    let length = intArray.length;
    let totalLength = length << 2;
    if (includeLength) {
        let stringLength = intArray[length - 1];
        totalLength -= 4;
        if (stringLength < totalLength - 3 || stringLength > totalLength) return null;
        totalLength = stringLength;
    }
    for (let i = 0; i < length; i++) {
        intArray[i] = String.fromCharCode(
            intArray[i] & 0xff,
            (intArray[i] >>> 8) & 0xff,
            (intArray[i] >>> 16) & 0xff,
            (intArray[i] >>> 24) & 0xff
        );
    }
    let result = intArray.join('');
    return includeLength ? result.substring(0, totalLength) : result;
}

// uint8Array 转 Base64
function uint8ArrayToBase64(uint8Array) {
    let binaryString = '';
    for (let i = 0; i < uint8Array.length; i++) {
        binaryString += String.fromCharCode(uint8Array[i]);
    }
    return btoa(binaryString);
}

// TEA 加密
function teaEncrypt(data, key) {
    const zM = data.length;
    const lastIndex = zM - 1;
    let temp;
    let roundCount;
    let sum = 0x0;
    let shiftValue;
    let i, j;

    roundCount = data[lastIndex];

    // 计算循环次数
    const rounds = Math.floor(6 + 52 / zM);

    for (j = rounds; j > 0; --j) {
        sum = (sum + 0x9e3779b9) >>> 0;
        shiftValue = (sum >>> 2) & 0x3;

        for (i = 0; i < lastIndex; ++i) {
            temp = data[i + 1];
            roundCount = (data[i] += ((roundCount >>> 5 ^ temp << 2) +
                (temp >>> 3 ^ roundCount << 4) ^ (sum ^ temp) +
                (key[i & 0x3 ^ shiftValue] ^ roundCount)) >>> 0) >>> 0;
        }

        temp = data[0];
        roundCount = (data[lastIndex] += ((roundCount >>> 5 ^ temp << 2) +
            (temp >>> 3 ^ roundCount << 4) ^ (sum ^ temp) +
            (key[lastIndex & 0x3 ^ shiftValue] ^ roundCount)) >>> 0) >>> 0;
    }
    return data;
}

// TEA 加密封装函数
function teaEncryptData(data, key) {
    if (!data || data.length === 0) return data;
    let dataArray = strToIntArray(utf8Encode(data), true);
    let keyArray = strToIntArray(utf8Encode(key), false);
    keyArray.length < 4 && (keyArray.length = 4);
    let encryptedArray = teaEncrypt(dataArray, keyArray);
    let result = intArrayToStr(encryptedArray, false);
    return btoa(result);
}

// 获取 windowf 值的函数
function getWindowF(data, key) {
    let uint8Array = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
        uint8Array[i] = data.charCodeAt(i);
    }
    let iv = uint8Array.subarray(0, 16);        // 前16个字节是 iv
    let cipherText = uint8Array.subarray(16);   // 后面的字节是密文

    let ivBase64 = uint8ArrayToBase64(iv);
    let keyBase64 = uint8ArrayToBase64(key);
    let cipherTextBase64 = uint8ArrayToBase64(cipherText);

    let decryptedText = aesDecrypt(cipherTextBase64, keyBase64, ivBase64);

    eval(decryptedText)
    return btoa(window.f());
}

// 加密封装函数
function encrypt(plaintext, data, needb64=false) {
    let requestCode = data['request_code']
    if (needb64)
        requestCode = btoa(data['request_code']).replace('+', '(').replace('=', ')');
    let encdata = teaEncryptData(JSON.stringify(plaintext), requestCode);

    // 解析 session 中的密钥
    let matchKey = new Function(atob(data['session']))()[1].match(/\[([^\]]+)]/)[1];
    let key = new Uint8Array(matchKey.split(',').map(Number));

    let windowf = getWindowF(atob(data['sign']), key);

    // 返回加密后的结果
    return `${windowf}#${teaEncryptData(encdata, windowf)}`;
}

// 获取 behavior、token
function gen_behavior_token(plaintext, general, name) {
    setBrowserEnvironment();
    if (name === 'behavior')
        return encrypt(plaintext, general, true)
    else if (name === 'token')
        return encrypt(plaintext, general)
    else
        throw new Error("错误参数. 需要 'behavior' 或 'token'.");
}
```



