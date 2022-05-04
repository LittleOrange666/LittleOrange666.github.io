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
:::spoiler 範例：y=ax+b
```python
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
plt.rcParams['font.sans-serif'] = ['Microsoft JhengHei'] # 正常顯示中文
plt.rcParams['axes.unicode_minus'] = False # 正常顯示負號
tf.compat.v1.disable_eager_execution() # 禁用eager execution防止出RuntimeError
#隨機參數
import random
random_a = random.randint(20,100)
random_b = random.randint(2,8)*(1-2* random.randint(0,1))
# 產生資料
train_X = np.linspace(-1, 1, 100)
train_Y = random_a * train_X + np.full(train_X.shape,random_b) + np.random.randn(*train_X.shape) * 0.1 * random_a  # y=ax+b，但是加入了噪聲
# 輸入值
X = tf.compat.v1.placeholder("float")
Y = tf.compat.v1.placeholder("float")
# 可訓練參數
W = tf.Variable(tf.compat.v1.random_normal([1]), name="weight")
b = tf.Variable(tf.zeros([1]), name="bias")
# 前嚮結構
z = tf.multiply(X, W) + b
global_step = tf.Variable(0, name='global_step', trainable=False)
# 反向改善
cost = tf.reduce_mean(tf.square(Y - z))
learning_rate = 0.01
optimizer = tf.compat.v1.train.GradientDescentOptimizer(learning_rate).minimize(cost, global_step)  # 梯度下降
# 初始化所有變數
init = tf.compat.v1.global_variables_initializer()
# 定義訓練參數
training_epochs = 20
display_step = 2
with tf.compat.v1.Session() as sess:
    sess.run(init)
    while global_step.eval() / len(train_X) < training_epochs:  # step=執行次數/資料大小=global_step.eval()/len(train_X)
        step = int(global_step.eval() / len(train_X))
        for (x, y) in zip(train_X, train_Y):
            sess.run(optimizer, feed_dict={X: x, Y: y})  # 餵資料
        # 顯示訓練中的詳細訊息
        if step % display_step == 0:
            loss = sess.run(cost, feed_dict={X: train_X, Y: train_Y})
            print("Epoch:", step + 1, "cost=", loss, "W=", sess.run(W), "b=", sess.run(b))
    print("Finished!")
    print("cost=", sess.run(cost, feed_dict={X: train_X, Y: train_Y}), "W=", sess.run(W), "b=", sess.run(b))
    # 顯示模型
    plt.plot(train_X, train_Y, 'ro', label='Original data')
    plt.plot(train_X, sess.run(W) * train_X + sess.run(b), label='Fitted line')
    plt.legend()
    plt.show()
```
:::
### 動態圖
動態圖基於eager execution
不需要建立Session
直接計算梯度並更改參數
#### 動態圖架構
動態圖架構包含模型參數、損失函數、改善器

+ 模型參數: tf.Variable
  模型參數是模型中要透過訓練求得的值
+ 損失函數: tf.Tensor
  損失函數是一個用於判斷正確程度的值，應為一個透過對占位符及模型參數作數學計算後的到的張量
  與靜態圖不同的是，損失函數是動態計算而不是在一開始就固定
+ 改善器: GradientDescentOptimizer
  改善器能夠透過梯度自動優化參數
  語法：
```python
learning_rate = 0.01
optimizer = tf.compat.v1.train.GradientDescentOptimizer(learning_rate=learning_rate)
```
#### 動態圖使用
首先定義好模型參數與改善器
並在過程中計算梯度
**計算梯度**
```python
with tf.GradientTape() as tape:
    cost_: tf.Tensor = 損失函數
    gradients = tape.gradient(target=cost_, sources=[模型參數列表])  # 計算梯度
```
**優化參數**
```python
optimizer.apply_gradients(zip(gradients, [模型參數列表]), global_step)
```
要取出任何的模型參數可直接使用
```python
參數.numpy()
```
:::spoiler 範例：y=ax+b
```python
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
plt.rcParams['font.sans-serif'] = ['Microsoft JhengHei'] # 正常顯示中文
plt.rcParams['axes.unicode_minus'] = False # 正常顯示負號
#隨機參數
import random
random_a = random.randint(20,100)
random_b = random.randint(2,8)*(1-2* random.randint(0,1))
# 產生資料
train_X = np.linspace(-1, 1, 100)
train_Y = random_a * train_X + np.full(train_X.shape,random_b) + np.random.randn(*train_X.shape) * 0.1 * random_a  # y=ax+b，但是加入了噪聲
# 定義訓練參數
W = tf.Variable(tf.random.normal([1]), name="weight")
b = tf.Variable(tf.zeros([1]), name="bias")
global_step = tf.Variable(0, name='global_step', trainable=False)
def getcost(x, y):  # 定義函數，計算loss值
    # 前嚮結構
    #z = tf.cast(tf.multiply(np.asarray(x, dtype=np.float32), W) + b, dtype=tf.float32)
    z=tf.multiply(x, W) + b
    cost = tf.reduce_mean(tf.square(y - z))  # loss值
    return cost
learning_rate = 0.01
# 隨機梯度下降法作為改善器
optimizer = tf.compat.v1.train.GradientDescentOptimizer(learning_rate=learning_rate)
training_epochs = 10  # 迭代訓練次數
display_step = 2
old_step = -1
while global_step / len(train_X) < training_epochs:  # 迭代訓練模型
    step = int(global_step / len(train_X))
    with tf.GradientTape() as tape:
        cost_ = getcost(train_X, train_Y)
        gradients = tape.gradient(target=cost_, sources=[W, b])  # 計算梯度
    optimizer.apply_gradients(zip(gradients, [W, b]), global_step)
    # 顯示訓練中的詳細訊息
    if step % display_step == 0 and step!=old_step:
        cost = cost_.numpy() # 損失值換為np.ndarray
        print("Epoch:", step + 1, "cost=", cost, "W=", W.numpy(), "b=", b.numpy())
        old_step=step
print(" Finished!")
print("cost=", cost, "W=", W.numpy(), "b=", b.numpy())
plt.plot(train_X, train_Y, 'ro', label='Original data')
plt.plot(train_X, W * train_X + b, label='Fitted line')
plt.legend()
plt.show()
```
:::