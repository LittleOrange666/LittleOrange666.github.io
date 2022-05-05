---
title: python tensorflow-keras架構
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
#### 激活函數
激活函數可以用layers.Activation作為一個單獨的層
或著用Dense(units,activation=激活函數)來使用
通常使用內建的
也可以自己設計，但自己設計的激活函數要支援對張量(tf.Tensor)作操作
:::spoiler 內建激活函數(都在keras.backend底下)
:::
### 編譯
建構完模型要對模型作編譯
```python
model.compile()
```
編譯需要兩個參數

1. 損失函數loss
2. 優化器optimizers

還有一些常用的參數

+ 評估函數metrics

#### 損失函數
損失函數輸入真實值與預測值後，回傳一個損失值
通常使用內建的，也可以自己設計
:::spoiler 內建損失函數(都在keras.losses底下)
:::
#### 優化器
優化器是一個物件
通常使用內建的
:::spoiler 內建優化器(都在keras.optimizers底下)
:::

#### 評估函數
評估函數輸入真實值與預測值後，回傳一個評估值
通常使用內建的，也可以自己設計
用於評估模型的性能
可以同時使用多個
:::spoiler 內建損失函數(都在keras.losses底下)
:::

#### 使用名稱
編譯時使用內建的東西可以直接傳入名稱
如以下兩者意義相同
```python
model.compile(optimizer=optimizers.RMSprop(),loss=losses.mean_squared_error,metrics=[metrics.mae])
model.compile(optimizer='RMSprop',loss='mean_squared_error',metrics=['mae'])
```

### 訓練
```python
history = model.fit(train_inputs,train_outputs,epochs=訓練次數)
```
### 測試
```python
score = model.evaluate(test_inputs,test_outputs)
```
透過測試資料求出損失值及評估值
### 使用
```python
output = model.predict(input)
```