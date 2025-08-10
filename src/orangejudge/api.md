---
title: OrangeJudge介紹 - API
---
# OrangeJudge API

要使用API，要先登入帳號，之後去/settings#api生成API key

一次只能存在一個API key，若重新生成，會自動刪除舊的API key

但也可以直接使用帳號密碼登入來使用，但那樣會有CSRF檢查

請求可能是GET或POST，視API而定

GET請求的參數會放在URL中，POST請求的參數會放在formData中

共通參數：

```
username: {your_username}
key: {your_api_key}
```

api_key也可以用在HTTP Header中：

```
x-api-key: {your_api_key}
```

權限檢查優先級：

1. cookie(直接登入)，驗證失敗不會報403而是跳過
2. api key in header，驗證失敗報403
3. api key in formData/urlArgs，驗證失敗報403

回傳格式 - 成功時：

```json
{
    "status": "success",
    "data": {
        // 具體的資料
    }
}
```

回傳格式 - 失敗時：

```json
{
    "status": "error",
    "description": "{{ description }}",
    "error_code": 400 // int format
}
```

## submit

method: POST
路徑：/api/submit
參數：
```
pid: {problem_id}
lang: {language}
code: {your_code}
```
data格式：
```
{
    "submission_id": "{submission_id}"
}
```

## test submit

method: POST
路徑：/api/submit
參數：
```
pid: test
lang: {language}
code: {your_code}
input: {input}
```
data格式：
```
{
    "submission_id": "{submission_id}"
}
```

## submission

method: GET
路徑：/api/submission
參數：
```
submission_id: {submission_id}
```
data格式：
```
{
    "lang": lang,
    "source_code": source,
    "completed": completed,
    "ce_msg": ce_msg
}
```