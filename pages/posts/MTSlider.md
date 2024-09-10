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


```



