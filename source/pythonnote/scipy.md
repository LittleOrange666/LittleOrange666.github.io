---
title: python scipy
---

# scipy

## 特殊函數 special
所有特殊函數都可以接受列表/陣列為輸入值，但若輸入多個值輸出必為numpy陣列

### 指數

```python
special.exp2(value)
special.exp10(value)
```

### 三角函數(使用角度)

```python
special.sindq(value)
special.cosdq(value)
special.tandq(value)
special.cotdq(value)
```

## 微積分 integrate

### 定積分

```python
area, err = integrate.quad(func,low,up)
```
* area 計算結果
* err 絕對誤差估計值
* func 要做定積分的函數
  可以在參數列結尾加一個tuple做為傳給func的額外參數
* low 定積分下界
* up 定積分上界
  若需要無限大必須使用numpy.inf

## 線性代數 linalg

### 反矩陣

```python
invarr = linalg.inv(arr)
```

### 行列式

```python
value = linalg.det(arr)
```

### 線性方程求解
$Ax = b$

```python
x = linalg.solve(A,b)
```

## 最佳化 optimize

### 最小值

```python
result = optimize.minimize(func, x0)
```
* func 要做定積分的函數
  可以在參數列結尾加一個tuple做為傳給func的額外參數
* x0 搜尋起始點
* result 回傳結果，是它自己獨有的資料型別，常用屬性如下
|屬性名|意義|
|---|---|
|x|一個陣列，表示找到的最小值位置(可能有多個) |
|func|最小值的值 |
|success|有沒有找到 |

## 內插 interpolate

```python
func = interpolate.interp1d(x,y)
```

## 統計 stats

### 常態分佈

```python
stats.norm.pdf(x,avg,scale)
```

### 敘述統計

```python
result = stats.describe(arr)
```
* result 回傳結果，是它自己獨有的資料型別，常用屬性如下
屬性名|意義
 minmax|一個元組，表示最大與最小值 
 mean|平均值 

## 訊號處理 signal

### 卷積

```python
signal.convolve2d(img,core,mode: str,boundary: str)
```
* img 目標圖片
* core 卷積核
* mode 模式，建議用"same"
* boundary 邊界處裡，建議用"symm"