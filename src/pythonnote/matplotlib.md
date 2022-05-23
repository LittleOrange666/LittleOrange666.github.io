---
title: Python matplotlib
---

# matplotlib
因為和通常numpy一起用，所以開頭要寫

```py
import matplotlib.pyplot as plt
import numpy as np
plt.rcParams['font.sans-serif'] = ['Microsoft JhengHei'] # 正常顯示中文
plt.rcParams['axes.unicode_minus'] = False # 正常顯示負號
```

## 初始化與顯示

### 作法一：建立影像物件
語法如下

```py
fig = plt.figure()
```
`fig`可以換成其他名稱，以下使用`fig`指代影像物件
建立完成繪圖物件再建立一個子圖

```py
axe = fig.add_subplot(nrows: int = 1, ncols: int = 1, index: int|tuple[int,int] = 1)
```
想像一個`nrows`橫行`ncols`直列的網格，並把`axe`放在`index`所指的位置
注意此處座標/索引皆由1開始而非由0開始
如果不需要進行排版可以省略所有引數
最後是顯示的部分

```py
fig.show()
```
如果用的是Python console則會建立一個視窗來顯示圖表
如果用的是Jupyter NoteBook/JupyterLab則會顯示在建立fig和axe的那一個Cell下方(fig和axe要在同一個Cell建立，否則不會顯示)，且不需要執行此行
若堅持要使用show，則在開頭加上

```py
import matplotlib
matplotlib.use('TkAgg')
```
且此作法會導致程式建立一個視窗來顯示圖表

### 作法二：直接使用plt
若不想要使用繪圖物件，可以把`plt`當成一個子圖來使用
使用Jupyter NoteBook/JupyterLab時建議使用此做法
也可以建立個子圖

```py
plt.subplot(nrows: int = 1, ncols: int = 1, index: int|tuple[int,int] = 1)
```
想像一個`nrows`橫行`ncols`直列的網格，並在`index`所指的位置建立子圖，使`plt`當成該子圖使用
最後是顯示的部分

```py
plt.show()
```
如果用的是Python console則會建立一個視窗來顯示圖表
如果用的是Jupyter NoteBook/JupyterLab則會顯示在下方

## 圖表繪製

### 基本繪製

#### 折線圖

```py
lines = axe.plot(x軸資料,y軸資料,樣式)
```
"資料"可以是`list`或是一維的`numpy陣列`
資料可以不只一組，用來在一張圖中顯示多筆資料
兩筆資料這樣寫：

```py
lines = axe.plot(x軸資料1,y軸資料1,x軸資料2,y軸資料2,樣式)
```
lines是一個儲存折線的列表，幾組資料就幾條折線
:::spoiler 折線圖樣式
設定折線圖外觀的時候可以直接用樣式字串或單獨設置三個部分
樣式字串由三個部分組成
1. 色彩字元

|色彩字元|說明|
|---|---|
|b|藍|
|g|綠|
|r|紅|
|c|青|
|m|洋紅|
|y|黃|
|k|黑|
|w|白
2. 線型字元

|線型字元|說明|
|---|---|
|-|實線|
|\-\-|短劃虛線|
|.|點虛線|
|-:|短劃點虛線|
3. 符號字元

|符號字元|說明|
|---|---|
|.|點|
|,|像素|
|o|圓形|
|s|方形|
|^|三角形|

Ex.藍色實線並用三角形符號記做

```py
"b-^"
```
:::
:::spoiler 常用參數

|名稱|意義|
|--- | --- |
|color|顏色|
|marker|點的樣式|
|linestyle|線段的樣式|
|fmt|樣式字串|
:::

#### 散佈圖

```py
axe.scatter(x軸資料,y軸資料,點大小,色彩)
```
"資料"可以是`list`或是一維的`numpy陣列`，只能有一組
"點大小"和"色彩"是和資料長度相同的`list`或是一維的`numpy陣列`
`scatter`指令可重複執行來疊加資料

#### 長條圖
垂直：

```py
axe.bar(索引,資料)
axe.set_xticks(索引,標籤)
plt.xticks(索引,標籤) #對於使用plt的情況
```
水平：

```py
axe.barh(索引,資料)
axe.set_yticks(索引,標籤)
plt.yticks(索引,標籤) #對於使用plt的情況
```
索引用來表示資料的顯示順序
索引通常為

```py
np.arange(len(標籤))
```
`bar`指令可重複執行來疊加資料
並按照索引排列
:::spoiler 常用參數

|名稱|意義|
|--- | --- |
|width|線條寬度(比例)|
|align|對齊方式|

:::

#### 直方圖

```py
axe.hist(資料,)
```
"資料"可以是`list`或是一維的`numpy陣列`，可以包含多組，但是要用list包起來
:::spoiler 常用參數

|名稱|意義|
|--- | --- |
|bins|組距|
|range|範圍|
|stacked|有多組資料時是否把多個直方圖堆疊起來|
|density|是否用密度做顯示|
|cumulative|是否用累積函數做顯示|
:::

#### 圓餅圖

```py
patches, texts = axe.pie(資料,labels=標籤)
```

#### data參數
在繪製任何資料時，都可以用data參數指定資料來源
如：
```py
axe.plot(df["x"],df["y"])
```
可改為：
```py
axe.plot("x","y",data=df)
```

#### 畫線
```py
axe.axhline(y座標,顏色,樣式,寬度) # 畫橫線
axe.avhline(x座標,顏色,樣式,寬度) # 畫直線
```

### 圖例
在繪製任何資料時，都可在結尾加上`label="xxx"`來設置資料集名稱
如：

```py
axe.plot(x,y,label="sin()")
```
並使用

```py
axe.legend()
```
顯示圖例

### 標籤

```py
axe.set_title(text: str) # 標題
axe.set_ylabel(text: str) # Y軸名稱
axe.set_xlabel(text: str) # X軸名稱
plt.title(text: str) # 對於使用plt的情況
plt.ylabel(text: str) # 對於使用plt的情況
plt.xlabel(text: str) # 對於使用plt的情況
```

### 標記
```py
axe.annotate(文字, 標記位置, 文字位置, 箭頭標記的屬性) # 位置用(x,y)表示，xy皆與資料使用相同座標軸
```

### 外觀

```py
axe.grid(showgrid: bool) # 是否顯示網格
axe.axis([xmin,xmax,ymin,ymax]) # 設置座標軸範圍
```

### 多軸圖表
要建立多軸圖表可以用

```py
twin_axe = axe.twinx()
```
建立一個與原來子圖共用x軸的子圖
再分別對兩個子圖做操作即可