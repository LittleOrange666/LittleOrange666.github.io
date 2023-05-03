---
title: Python自訂型別
---

# 自訂型別

## class

Python中可以用class來設計自己的型別
自訂型別主要有"屬性"和"方法"兩種功能
"屬性"就是從屬於物件的資料值
"方法"就是從屬於物件的函數
以下的範例示範了一些基本的使用
```python
class Obj:
  wow = "這是一個類別屬性"
  
  def __init__(self,name): # __init__用來初始化物件
    self.name = name # 定義物件的屬性
  
  def a_method(self,param): # 物件方法要在第一格加self來獲取目前物件
    print("這是一個物件的方法, name="+self.name+",param="+param)
  
  def b_method(yee): # "self"不是像this那樣固定的名稱，只是習慣上會用"self"
    print("這是另一個物件的方法, name="+yee.name)
  
  @classmethod
  def class_method(cls):
    print("這是一個類別的方法, wow="+cls.wow)

obj = Obj("777771449")
obj.a_method("www")
obj.b_method()
Obj.a_method(obj,"yee")
print(Obj.wow)
print(obj.wow)
Obj.class_method()
obj.class_method()
```

## 繼承

在類別名稱后加一個括弧，裡面放其他類別名稱就可以繼承其他類別的方法
如果名稱重複會以子類別為優先，在方法中用`super()`可以呼叫父類別的方法，最常用的是`super().__init__()`

## 屬性

## 自定義運算子