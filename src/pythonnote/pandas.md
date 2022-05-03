---
title: python pandas
---

# pandas
先載入

```python
import pandas as pd
```
pandas包含了numpy和matplotlib的部分功能，要用到的時候不用額外import

#### pandas主要包含兩種資料型別 Series 和 DataFrame

## Series
Series像是能自訂索引的numpy陣列
建立：

```python
s = pd.Series(數據)
```
"數據"可以是list\/tuple\/可迭代物件\/numpy陣列，內容只能是數字
默認索引是從零開始，就和一般的陣列一樣
也可以自訂索引：

```python
s = pd.Series(數據,index=索引)
```
"索引"可以是list\/tuple\/可迭代物件\/numpy陣列，內容可以是任何內容，可以重複
可以使用像是numpy的方式取出資料，若取出不只一筆資料則輸出Series就和一般的陣列一樣
注意如果有用自訂索引就不一定能用數字索引
也可以像numpy的方式直接四則運算，但計算結果仍然是Series

```python
print(s[s>0])
```
Series有一個特別的運算可以逐個進行`in`計算

```python
s.isin(物件)
```
`isin`輸出一個Series[bool]表示每個元素是否在`物件`中
常用於DataFrame的索引
單獨取出索引/資料：

```python
print(s.index)  #索引 類型為 "Index" 或其子類別
print(s.values) #資料 類型為 "numpy.ndarray"
```

## DataFrame
DataFrame是pandas的核心功能所在
結構類似表格或試算表
包含多個有序的欄位每個欄位是固定資料型態，不同欄位可以是不同資料型態
每個欄位都是一個Series
可以用默認索引，也可以用自訂索引
Ex:

```python
data = {"數量":[1,6,7],
       "價格":[3.49,5.25,2.22]}
index = ["蘋果","水梨","香蕉"]
df = pd.DataFrame(data,index=index)
df["總價"] = df["數量"] * df["價格"]
df
```
用Jupyter顯示：
![](https://i.imgur.com/VUsJEUn.png)

### 匯入與匯出
DataFrame可以直接由檔案匯入/匯出至檔案
支援.csv .json .html .xlsx格式
注意：要支援.xlsx格式需要額外安裝`openpyxl`(不需要import)
直接`pip install openpyxl`就可以了
語法：

```python
df.to_csv(檔名)      # 匯出到.csv檔
df.to_json(檔名)     # 匯出到.json檔
df.to_html(檔名)     # 匯出到.html檔
df.to_excel(檔名)    # 匯出到.xlsx檔
df.read_csv(檔名)    # 匯入自.csv檔
df.read_json(檔名)   # 匯入自.json檔
df.read_html(檔名)   # 匯入自.html檔
df.read_excel(檔名)  # 匯入自.xlsx檔
```

### 取出/顯示資料

#### 前/後幾筆資料
用head/tail可以取出前/後幾筆資料
輸出依然是DataFrame格式

```python
df.head(count:int=5) # 前幾筆資料，默認5筆(Series也支援此操作)
df.tail(count:int=5) # 後幾筆資料，默認5筆(Series也支援此操作)
```

#### 內部資料

```python
df.index    # 索引    類型為 "Index" 或其子類別
df.columns  # 欄位標籤 類型為 "Index" 或其子類別
df.values   # 資料    為numpy陣列
```

#### 摘要

```python
len(df)    # 有幾筆資料
df.shape   # (有幾筆資料, 有幾欄)
df.info()  # 摘要
```

### 索引
DataFrame類似於二維列表，第一維是欄位標籤
可用寫法

```python
df[(單/多個)欄位標籤]
df.欄位標籤    #不能用於創建新欄位
df[(單/多個)欄位標籤][索引]
df.欄位標籤.索引
df[Series[bool]]
df[Series[bool]][(單/多個)欄位標籤]
df[Series[bool]].欄位標籤
```
若要使用類似numpy的雙索引系統，可使用：

```python
df.loc[索引]
```
在此處第一維是欄位標籤，且索引要用欄位標籤和自訂索引名稱
若要用數字索引，可用：

```python
df.iloc[索引]
```

### 排序

```python
df.sort_values(`(單/多個)欄位標籤`,ascending=是否遞增)
```
照`(單/多個)欄位標籤`決定排序優先程度
`ascending=True`為遞增排序
回傳排序過的DataFrame，不更改原來的

### 資料增刪
利用索引可以進行資料讀取/編輯
寫入不存在的索引可以進行資料新增
資料刪除則使用`drop`

```python
df.drop(`(單/多個)名稱`,axis=軸)
```
axis決定是要刪掉一些資料還是刪掉一些欄位
`axis=0`(默認)表示刪掉一些資料
`axis=1`(默認)表示刪掉一些欄位

### 資料視覺化
pandas有整合matplotlib的繪製圖表功能
但如果要用中文還是需要在繪圖的程式碼以前寫下

```python
import matplotlib.pyplot as plt
plt.rcParams['font.sans-serif'] = ['Microsoft JhengHei']
plt.rcParams['axes.unicode_minus'] = False
```
繪圖語法：

```python
pd.plot(kind="類型")

#或著
pd.plot.類型()
```
如果用的是Jupyter會在執行完此行後顯示(只能放在Cell的結尾)
其他情況可用

```python
plt.show()
```
來強制顯示
可用的類型包含：
名稱|中文名稱
---|---
line|折線圖
bar|長條圖
barh|橫長條圖
box|箱形圖
hist|直方圖
kde|核密度估計圖
area|塗色折線圖
pie|圓餅圖
scatter|散佈圖
hexbin|六邊形分箱圖
部分類型需要額外參數
圓餅圖需要`y="欄位名稱"`來定義要畫圖的欄位
或使用`subplots=True`表達每一個欄位都畫一個圖
散佈圖、六邊形分箱圖需要`x="欄位名稱"`,`y="欄位名稱"`來定義x,y軸