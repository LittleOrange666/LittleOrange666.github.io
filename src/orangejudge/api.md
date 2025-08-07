---
title: OrangeJudge介紹 - API
---
# OrangeJudge API

要使用API，要先登入帳號，之後去/settings#api生成API key

所有請求都是POST請求，並且需要在formdata裡面加上

```
username: {your_username}
key: {your_api_key}
```

兩個參數

## submit

路徑：/api/submit
```
pid: {problem_id}
lang: {language}
code: {your_code}
```