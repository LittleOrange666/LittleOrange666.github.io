---
title: Python 檔案輸出入
---

# Python 檔案輸出入
檔案處裡有三個步驟
1. 開啟檔案
2. 讀寫檔案
3. 關閉檔案(可視情況省略)

## 開啟檔案
開啟檔案的基本語法如下：

```python
檔案變數名 = open(路徑,模式)
```

### 模式
模式包含三個部分
1. 開啟方式
|名稱|符號|功能|
|---|---|---|
|讀取|r|讀取檔案，檔案必須存在|
|寫入|w|從檔案開頭開始寫入，若不存在則新建一個|
|新增|x|新建一個檔案並寫入，檔案必須不存在|
|附加|a|從檔案結尾開始寫入，檔案必須存在|
2. 讀寫格式
|名稱|符號|功能|
|---|---|---|
|文字|t|用文字模式開啟，讀寫使用str型別|
|二進位|b|用二進位模式開啟，讀寫使用bytes型別|
3. 是否讀寫皆可
讀寫皆可在結尾加一個"+"