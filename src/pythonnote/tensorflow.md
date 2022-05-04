---
title: python tensorflow
---
# tensorflow
先import
因為和通常numpy、matplotlib一起用，所以開頭要寫
```python
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
plt.rcParams['font.sans-serif'] = ['Microsoft JhengHei'] # 正常顯示中文
plt.rcParams['axes.unicode_minus'] = False # 正常顯示負號
```
## 基本
### 常用資料型別
#### 張量 tf.Tensor
基本有點像np.ndarray
但可以對它進行操作(tf.Operation)但不立即執行(在tensorflow 1)
在tensorflow 2中可用tf.Tensor::numpy()轉換成np.ndarray
#### 變數 tf.Variable
此類別用以維護一個張量，可以對其進行操作、讀寫，通常用於紀錄模型參數
#### 操作 tf.Operation
用於對張量/變數/Session進行操作
### 常用張量計算
#### 加/減
直接用加號/減號
#### 對應值相乘
用
```python
tf.multiply(A,B)
```
#### 矩陣相乘
用
```python
tf.matmul(A,B)
```
#### 平方
用
```python
tf.square(A,B)
```
#### 根號
用
```python
tf.sqrt(A,B)
```
#### 自定義
除了標準的張量計算外，還可以用`@tf.function`來建立自定義的張量計算
### 關於eager execution
eager execution表示所有計算都立即執行
在tensorflow 2默認是啟用的
可用以下任一行來禁用
```python
tf.compat.v1.disable_v2_behavior() # 禁用tensorflow 2全域特性防止出RuntimeError
tf.compat.v1.disable_eager_execution() # 禁用eager execution防止出RuntimeError
```
若禁用eager execution，則計算結果必須通過sess.run來讀取
但可以利用占位符作計算，把資料留到輸出結果時再輸入
## 架構
### 靜態圖
需禁用eager execution
靜態圖將"定義"與"執行"分離
預先定義好架構與損失後，建立Session進行訓練
#### 靜態圖架構
靜態圖的架構包含占位符、模型參數、損失函數和梯度下降器

+ 占位符: tf.Tensor
  占位符表示模型中可輸入資料的空位
  語法：
```python
名稱 = tf.compat.v1.placeholder("float")
```
+ 模型參數: tf.Variable
  模型參數是模型中要透過訓練求得的值
  語法：
```python
名稱 = tf.Variable(初始值: tf.Tensor, name=名稱: str)
```
+ 損失函數: tf.Tensor
  損失函數是一個用於判斷正確程度的值，應為一個透過對占位符及模型參數作數學計算後的到的張量
+ 梯度下降器: tf.Operation
  梯度下降器是用於反向修正的算法，通常不會自己寫
  語法：
```python
learning_rate = 0.01
global_step = tf.Variable(0, name='global_step', trainable=False)
optimizer = tf.compat.v1.train.GradientDescentOptimizer(learning_rate).minimize(損失函數, global_step)
```

#### Session建立與使用
主要訓練部分需要建立一個Session
語法：
```python
with tf.compat.v1.Session() as sess:
	sess.run(tf.compat.v1.global_variables_initializer()) # 初始化變數
	# 主程式
```
sess.run有以下功能：

+ sess.run(Operation) 進行操作
+ sess.run(Tensor|Variable) 取出值

使用`sess.run(optimizer)`可進行訓練
使用`sess.run(損失函數)`可求出損失值
這兩個操作都需要輸入資料
使用`sess.run(模型參數)`可取出模型參數