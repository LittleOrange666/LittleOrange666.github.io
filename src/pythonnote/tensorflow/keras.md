---
title: python tensorflow keras架構
---
# keras架構
Keras 是一個用 Python 編寫的高級神經網絡 API，它能夠以 TensorFlow, CNTK, 或者 Theano 作為後端運行。 Keras 的開發重點是支持快速的實驗。能夠以最少的時間把想法轉換為實驗結果，是做好研究的關鍵。
## 基本使用
先import
```python
from tensorflow.keras import layers,models,optimizers,losses,metrics
```
### 建立模型
模型有兩種建立方式

1. 順序模型
2. 函數式 API

#### 順序模型
寫法一、
```python
model = models.Sequential([
	第一層
	第二層
	..
	最後一層
	])
```
寫法二、
```python
model = models.Sequential()
model.add(第一層)
model.add(第二層)
..
model.add(最後一層)
```

#### 函數式 API
```python
inputs = layers.Input(shape=輸入陣列形狀)
第一層 = layers.Dense(大小)(inputs)
第二層 = layers.Dense(大小)(第一層)
..
outputs = layers.Dense(大小)(前一層)
model = models.Model(input=inputs,output=outputs)
```
#### 層
keras中最基本的層是layers.Dense
Dense(units)表示這一層中有units個節點
可以用class設計不同行為的曾
#### 激活函數
激活函數可以用layers.Activation作為一個單獨的層
或著用Dense(units,activation=激活函數)來使用
通常使用內建的
也可以自己設計，但自己設計的激活函數要支援對張量(tf.Tensor)作操作
:::spoiler 內建激活函數(都在keras.activations底下)
常用：
**sigmoid**
sigmoid函數
$g(z)=\frac{1}{1+e^{-z}}$
**relu**
relu(alpha=0.0, max_value=None, threshold=0.0)
$g(z) = min(max\_value,max(threshold,z)+max(0,(threshold-z)*alpha))$
**softmax**
softmax(x, axis=-1)
$g(z_i) = \frac{e^{z_i}}{\sum_{j=1}^{n}{e^{z_j}}}$
**linear**
無變化
$g(z)=z$
:::
#### 正則化器
正則化器附屬在一個層中，用於解決 overfitting
用法：
```python
Dense(units,kernel_regularizer=正則化器) #壓制核心參數
Dense(units,bias_regularizer=正則化器) #壓制偏差
Dense(units,activity_regularizer=kernel正則化器) #壓制變化
```
keras中提供兩種正則化算法

+ L1: 用絕對值
+ L2: 用平方

可用正則化器有
```python
keras.regularizers.L1(l1=0.01)
keras.regularizers.L2(l2=0.01)
keras.regularizers.L1L2(l1=0.01, l2=0.01)
# 參數為lambda
```

### 編譯
建構完模型要對模型作編譯
```python
model.compile()
```
編譯需要兩個參數

+ 損失函數loss
+ 優化器optimizers

還有一些常用的參數

+ 評估函數metrics

#### 損失函數
損失函數輸入真實值與預測值後，回傳一個損失值
通常使用內建的，也可以自己設計
必須為Callable\[\[tf.Tensor,tf.Tensor\],tf.Tensor\]
:::spoiler 內建損失函數(都在keras.losses底下)
常用：

+ mean_squared_error平均方差(線性回歸)
+ binary_crossentropy二元交叉熵(二元分類問題)
+ sparse_categorical_crossentropy稀疏分類交叉熵(N元分類問題)

且部分內建損失函數提供參數，可其改為駝峰名稱以取用class版本
Ex.
```python
losses.binary_crossentropy # 基礎版
losses.BinaryCrossentropy() # 用class
losses.BinaryCrossentropy(from_logits=True) # 用class加參數
```
:::
#### 優化器
優化器是一個物件
通常使用內建的
:::spoiler 內建優化器(都在keras.optimizers底下)
常用：

```python
SGD(lr=0.01) # 線性回歸
RMSprop(lr=0.001) # 在學習率上依據梯度的大小對學習率進行加強或是衰減
Adam(lr=0.001) # 自適應矩估計
```
:::

#### 評估函數
評估函數輸入真實值與預測值後，回傳一個評估值
通常使用內建的，也可以自己設計
用於評估模型的性能
可以同時使用多個
:::spoiler 內建評估函數(都在keras.metrics底下)
:::

#### 使用名稱
編譯時使用內建的東西可以直接傳入名稱
如以下三者意義相同
```python
model.compile(optimizer=optimizers.RMSprop(),loss=losses.MeanSquaredError(),metrics=[metrics.mae])
model.compile(optimizer=optimizers.RMSprop(),loss=losses.mean_squared_error,metrics=[metrics.mae])
model.compile(optimizer='RMSprop',loss='mean_squared_error',metrics=['mae'])
```

### 訓練
透過訓練資料進行訓練
```python
history = model.fit(train_inputs,train_outputs,epochs=訓練次數) # 一次訓練很多資料，tensorflow 2.1以後支援使用generator作為輸入
history = model.fit_generator(train_inputs,train_outputs,epochs=訓練次數) # 一次訓練很多資料，使用generator作為輸入
history = model.train_on_batch(train_input,train_output,epochs=訓練次數) # 一次訓練一筆資料
```
:::spoiler 參數表(若依照此順序輸入可省略"key=")

| keyname | 默認值 | 意義 |
| --- | --- | --- |
| x | None | 樣本資料 |
| y | None | 目標資料 |
| batch_size | 32 | 每一批次輸入資料的樣本數 |
| epochs | 1 | 重複訓練的次數 |
| verbose | 1 | 記錄檔資訊的顯示模式 0:不輸出 1:進度指示器 2: 每個epoch一行 |
| callbacks | None | 回呼函數，用於過程中的細節操作 |
| validation_split | 0.0 | 用於將訓練資料的一部分拆出作為驗證資料之比例 |
| validation_data | None | 驗證資料，會覆蓋validation_split |
| shuffle | True | 是否在每一輪訓練中打亂資料順序 |
| class_weight | None | 若包含不同類別的樣本資料，可對不同類別的損失值作加權(僅在訓練時有效) |
| sample_weight | None | 對每個樣本的損失值作加權(僅在訓練時有效) |
| initial_epoch | 0 | 開始訓練的輪次 |

:::
### 測試
透過測試資料求出損失值及評估值
```python
score = model.evaluate(test_inputs,test_outputs)
```
### 使用
使用模型預測結果
```python
output = model.predict(input)
```
### 儲存與載入
keras模型可以用三種格式儲存

+ h5
+ json(只包含形狀)

#### h5py
副檔名建議用".h5"或".keras"
**儲存：**
```python
model.save(檔名)
```
**載入：**
```python
model = models.load_model(檔名)
```

#### json
**儲存：**
```python
open(檔名,"w").write(model.to_json())
```
**載入：**
```python
model = models.model_from_json(open(檔名).read())
```
### 範例
:::spoiler 範例：y=A*X+b
```python
param_count = 10 # 參數數量

import numpy as np
import random
from tensorflow.keras import optimizers,losses,metrics,layers,models
import matplotlib.pyplot as plt

# 隨機參數
random_a = [random.randint(20,100) for _ in range(param_count)]
random_b = random.randint(2,8)*(1-2* random.randint(0,1))

# 生成資料
def createData(count):
    X = np.array([np.linspace(-1, 1, count) for _ in range(param_count)]).T
    Y = np.dot(X,np.array(random_a)) + np.full((count,),random_b) + np.random.randn(count) * 0.1 * min(random_a)  # y=A*X+b，但是加入了噪聲
    return X,Y
train_X,train_Y = createData(100)
test_X,test_Y = createData(30)

# 建立模型
inputs = layers.Input(shape=(param_count,))
layer1 = layers.Dense(64)(inputs)
layer2 = layers.Dense(64)(layer1)
outputs = layers.Dense(1)(layer2)
model = models.Model(inputs=inputs, outputs=outputs)
model.compile(optimizer=optimizers.RMSprop(),loss=losses.mean_squared_error,metrics=[metrics.mae])

# 訓練
model.fit(train_X,train_Y,epochs=100,validation_data=[test_X,test_Y])

# 檢查
print(model.evaluate(test_X,test_Y))

# 損失值變化
plt.plot(np.arange(len(history.history['loss'])),history.history['loss'])
plt.title('Model accuracy')
plt.ylabel('loss')
plt.xlabel('epoch')
plt.legend(['Train'], loc='upper right')
plt.show()

# 儲存
import time
t=time.localtime()
filename = f"keras_{t.tm_year}_{t.tm_mon}_{t.tm_mday}_{t.tm_hour}_{t.tm_min}_{t.tm_sec}.h5"
model.save(filename)
del model

# 使用
the_model = models.load_model(filename)
x_predict = np.array([random.sample(range(-10, 10), 10) for _ in range(param_count)]).T
y_predict = the_model.predict(x_predict)
y_should = np.dot(x_predict,random_a)+np.full((10,),random_b)
print(x_predict,y_predict.T[0],y_should)
```
:::