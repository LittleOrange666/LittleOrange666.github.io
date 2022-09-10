---
title: Python基礎語法
---

# 基礎語法

## 換行
在Python裡每換一行就代表下一段程式碼，不需要也不能有分號
但在以下兩個情況電腦會將不同行看成同一段程式碼

一、 括號未完成
```python
print(1+2)
```
可以寫成
```python
print(1
+2)
```
二、行結尾是反斜槓
```python
a = 87
```
可以寫成
```python
a = \
87
```
這兩種寫法一般用在一行程式碼太長的時候，換行寫比較好看

## 註解
有時候在程式中需要注明一些程式的功能，就可以用註解
單行註解用一個井字號開頭：

```python
a = 1 #把a設置為1
```
多行註解用三個引號包起來：

```python
"""
常數設置
a->1, b->2
"""
a = 1
b = 2
```

## 變數
變數是給資料值的一個"暱稱"，可以告訴電腦該資料值之後可能會用到，並方便重複存取。

### 賦值
賦值即是把一個"暱稱"設定給一個資料值

```python
變數名稱 = 資料值
```
或著

```python
變數名稱 = 另一個變數名稱
```
:::spoiler 注：
這種寫法在資料值可變時會使兩個變數代表同個值，使其連動
可以用這樣的寫法來做淺複製(詳細的"變數與型別"再說)

```python
變數名稱 = type(另一個變數名稱)(另一個變數名稱)
```
:::
範例：

```python
num = 1
真的 = True
你好 = "Hello"
こんにちは = '안녕하세요'
日期 = (2022, 1, 20)
```
變數名稱可以是任何的文字，可以用任何語言，但通常建議用英文
且不能和保留字重複
也建議不要和內建的函數、常數、類型重名(可能會有非預期的結果)
不能以數字開頭(可以包含數字)，不能包含計算符號(加減乘除之類的符號)
:::spoiler 保留字
False、None、True、and、as、assert、async、await、break、class、continue、def、del、elif、else、except、finally、for、from、global、if、import、in、is、lambda、nonlocal、not、or、pass、raise、return、try、while、with、yield
:::
:::spoiler 內建函數、常數、類型名稱
ArithmeticError、AssertionError、AttributeError、BaseException、BlockingIOError、BrokenPipeError、BufferError、BytesWarning、ChildProcessError、ConnectionAbortedError、ConnectionError、ConnectionRefusedError、ConnectionResetError、DeprecationWarning、EOFError、Ellipsis、EncodingWarning、EnvironmentError、Exception、False、FileExistsError、FileNotFoundError、FloatingPointError、FutureWarning、GeneratorExit、IOError、ImportError、ImportWarning、IndentationError、IndexError、InterruptedError、IsADirectoryError、KeyError、KeyboardInterrupt、LookupError、MemoryError、ModuleNotFoundError、NameError 、None、NotADirectoryError、NotImplemented、NotImplementedError、OSError、OverflowError、PendingDeprecationWarning、PermissionError、ProcessLookupError、RecursionError、ReferenceError、ResourceWarning、RuntimeError、RuntimeWarning、StopAsyncIteration、StopIteration、SyntaxError、SyntaxWarning、SystemError、SystemExit、TabError、TimeoutError、True、TypeError 、UnboundLocalError、UnicodeDecodeError、UnicodeEncodeError、UnicodeError、UnicodeTranslateError、UnicodeWarning、UserWarning、ValueError、Warning、WindowsError、ZeroDivisionError、\_\_build\_class\_\_、\_\_debug\_\_、\_\_doc\_\_、\_\_import\_\_、\_\_loader\_\_、\_\_name\_\_、\_\_package\_\_、\_\_spec\_\_、abs、aiter、all、anext、any、ascii、bin、bool、breakpoint、bytearray、bytes、callable、chr、classmethod、compile、complex、copyright、credits、delattr、dict、dir、divmod、enumerate、eval、exec、exit、filter、float、format、frozenset、getattr、globals、hasattr、hash、help、hex、id、input、int、isinstance、issubclass、iter、len、license、list、locals、map、max、memoryview、min、next、object、oct、open、ord、pow、print、property、quit、range、repr、reversed、round、set、setattr、slice、sorted、staticmethod、str、sum、super、tuple、type、vars、zip
:::
辨別方法：
通常編輯器在碰到以上名稱時，都會有特殊顏色，若有出現則盡量避免使用該名稱，或是在結尾加一個底線

### 使用
變數名稱可以直接當作一個資料值來處理

## 常用資料類型
在程式中，所有的資料值都有類型，用來讓電腦分辨要如何處裡資料
可以用

```python
type(資料值)
```
來獲取資料值的類型

#### 常用資料類型包括：

+ 布林值 bool
+ 整數 int
+ 浮點數 float
+ 複數 complex
+ 字串 str
+ 空值 NoneType

#### 還有一些類型是用來儲存多個資料的，包括：

+ 元組 tuple
+ 清單 list (可變)
+ 集合 set (可變)
+ 不可變集合 frozenset
+ 字典 dict (可變)

### 布林值
布林值是表示"是"和"否"的資料
"是"寫作

```python
True
```
"否"寫作

```python
False
```
**大小寫必須正確**
布林值可以和數字混在一起計算
True=1, False=0

### 數字
數字就是數字
比較需要注意的是虛數符號要用"j"而非"i"
且"1j"不能簡記為"j"
範例：

```python
123      #整數
123.0    #浮點數
12.33    #浮點數
(1.2+3j) #複數
```

### 字串
字串表示一段文字
在程式中要用英文引號包起來
範例：

```python
'你好'
"阿"
```

### 空值
空值用於標記不存在/未確定的值
表示為：

```python
None
```

### 元組
元組表示並列且有序的一組任意長度的資料值
長度不可改變，元素不可寫入
範例：

```python
t = (9,25,13) #用小括號包住用半形逗號分隔的資料
t = 9,25,13   #如果沒有歧義，可以省略小括號，這行和上一行同義
t = (True,87,"你好") #可以包含不同型別的資料
print(t[0]) #True
print(t[1]) #87
print(t[-1]) #你好
t = t+(1,2,3) #直接加東西在結尾
```

### 清單
清單表示並列且有序的一組任意長度的資料值
可插入/刪除資料
類似C++的vector
範例：

```python
a = [] #空清單
a = list() #還是空清單
a = [7,8,"haha"] #可以包含不同型別的資料
a.append("1") #在結尾加入資料
print(a) #[7, 8, "haha", "1"]
a = a+["owo",1234] #直接加東西在結尾
a.extend(["owo",1234]) #和上一行類似，但可加上任意型別且在原地操作
```

### 集合
集合表示無序不重複的一組任意長度的資料值
並能夠在常數時間裡檢查一元素是否在集合中
類似數學上的集合
類似C++的unordered_set
不能存可變的值，如：list、set、dict
要存其他set必須轉換成frozenset
範例：

```python
s = {4,8,5} #集合
s = {4,8,5,8} #和上一行一樣
s.add(7) #加一個
s = s + {1,2,3} #集合合併
print(s) #{8, 4, 5, 7}
```

### 字典
字典是鍵-值對的資料結構
鍵是唯一的，值不一定唯一
在較新的python版本(3.7+)中鍵會按照加入的順序排列
類似C++的unordered_map

```python
d = {"a":12, "b":34} #字典
d["c"] = 56 #新增資料
print(d["a"]) #12
print(d) #{'a': 12, 'b': 34, 'c': 56}
```

### 順帶一提
類型名稱可以視為一個函數，用來複製資料值或把其他類型的資料轉換成當前類型
較常用的有int(),float(),str(),bool(),list()
範例：

```python
int("123") #123 #轉換為整數
float("8.7") #8.7 #轉換為浮點數
str(666) #'666' #轉換為字串
bool("xxx") #True #轉換為布林值
list(range(3)) #[0,1,2] #轉換為列表
```

## 輸出和輸入

### 輸出

```python
print(值)
```
把數值列印到螢幕上，並換行
不想要結尾換行可以這樣寫：

```python
print(值,end="")
```

### 輸入

```python
input_str = input("問題")

#同義於
print("問題",end="")
input_str = input()
```
先輸出一行字(不換行)(可選)，再接收一行字串

## 基礎運算子
常用的計算符包含：

+ 數學運算子 `+` `-` `*` `/` `//` `%` `**`
+ 比較運算子 `>` `<` `>=` `<=` `==` `!=`
+ 位元運算子 `<<` `|` `&` `^` `>>` `~`
+ 邏輯運算子 `not` `or` `and`
+ 賦值運算子 `+=` `-=` `*=` `/=` `//=` `%=` `**=` `<<=` `>>=` `|=` `&=` `^=`
+ 其他 `[]` `()` `{}` `is` `is not` `in` `not in`

:::spoiler 總表

 |順序|方向|形式|名稱 |
|---|---|---|---|
 |1    |右至左    |a\*\*b    |指數| 
 |2    |左至右    |~a    |按位反轉    |
| 2    |左至右    |+a    |正號    |
| 2    |左至右    |-a    |負號    |
| 3    |左至右    |a\*b    |乘法    |
| 3    |左至右    |a/b    |除法    |
| 3    |左至右    |a//b    |整除法    |
| 3    |左至右    |a%b    |取餘數    |
| 4    |左至右    |a+b    |加法    |
| 4    |左至右    |a-b    |減法    |
| 5    |左至右    |a\<\<b    |位元左移    |
| 5    |左至右    |a>>b    |位元右移    |
| 6    |左至右    |a&b    |按位且    |
 |7    |左至右    |a^b    |按位異或    |
 |7    |左至右    |a\|b    |按位或    |
 |8    |左至右    |a==b    |相等    |
 |8    |左至右    |a<=b    |小於等於    |
 |8    |左至右    |a>=b    |大於等於    |
 |8    |左至右    |a\<b    |小於    |
 |8    |左至右    |a>b    |大於    |
 |8    |左至右    |a!=b    |不相等    |
 |8    |左至右    |a is b    |相同    |
 |8    |左至右    |a is not b    |不相同  |
 |8    |左至右    |a in b    |a在b之中    |
 |8    |左至右    |a not in b    |a不在b之中    |
 |9    |左至右    |not a   |邏輯非|    
 |10    |左至右    |a and b   |邏輯且|
 |11    |左至右    |a or b   |邏輯或|  
 |12    |左至右    |a = b   |賦值計算符    |
 
:::
### 象牙運算子
象牙運算子`:=`是在Python3.8中新增的特性
Python中賦值運算子(包含`+=`之類的)不具有回傳值(不是回傳None)，不能拿來作其他計算
象牙運算子可以在賦值的同時具有回傳值
但有一些限制

1. 只能直接對變數賦值，不能對物件的屬性賦值
2. 必須包在括號裡面，除非被用在if,for,while等敘述中(大致就是C++要加括號Python不加括號的地方)

## 語法結構
### 條件判斷
條件判斷可以指定在特定條件符合值才執行部分程式碼

```python

#縮排是必須的
if 條件:
    程式碼
elif 另一個條件: #非必要，可以有很多
    程式碼
else: #非必要
    程式碼
```

### 例外處理
例外處理語法可以接收執行過程中出現的錯誤，並做適當地處理

```python
try:
    #主程式
except 錯誤類型 as 變數名: #'as 變數名'非必要 #可以有很多
    #例外處理
else: #非必要
    #沒例外時的處理
finally: #非必要
    #無論如何都會執行
```
此語法通常用於對不可預防的錯誤(例如：IOError)做處理
例外處理可以快速的跳出迴圈/函數，但不建議這樣用

#### 丟出例外

```python
raise 例外物件
```

除了直接丟出以外，還可以用assert表示在不符合條件時自動丟出例外

```python
assert 條件
```

等同於

```python
if not 條件:
    raise AssertionError
```

### 上下文管理(with語法)
with語法可以更簡潔的語法確保資源被正確釋放
常用於檔案的操作

```python
with 表達式 as 變數: #"as 變數"不是必須
    #主程式
```

等同於

```python
_contextmanager=表達式
_value = _contextmanager.__enter__()
_success = True
try:
    變數 = _value
    #主程式
except:
    _success = False
    if not _contextmanager.__exit__(*sys.exc_info()):
        raise
finally:
    if _success:
        _contextmanager.__exit__(None,None,None)
```

表達式必須產出一個contextmanager
with語法也可以用於使中間的程式展現特定的行為
例如：指定cpu/gpu
:::spoiler Example: 檔案的開啟
```python
name = input("filename:")
with open(name) as file:
    print("content of " +repr(name)+" :")
    print(file.read())
```
:::
:::spoiler Example: 列印時間
```python
import time,traceback
class TimePrinter:
    def __init__(self):
        self.old_print = __builtins__.print
    def __call__(self,*args,**kws):
        self.old_print(f"[INFO][{time.ctime()}]: ",end="")
        self.old_print(*args,**kws)
class PrintTime:
    def __init__(self):
        self.on = False
        self.old_print = None
    def __enter__(self):
        if not isinstance(__builtins__.print,TimePrinter):
            self.on = True
            self.old_print = __builtins__.print
            __builtins__.print = TimePrinter()
        return __builtins__.print
    def __exit__(self,exc_type, exc_value, exc_traceback):
        if self.on:
            self.on = False
            __builtins__.print = self.old_print
            if exc_type is not None:
                print(f"[EXCEPTION][{time.ctime()}]")
                traceback.print_tb(exc_traceback)
                print(f"{exc_type.__name__ }{': '+str(exc_value) if exc_value else ''}")
            return True
if __name__=='__main__':
    for i in range(1,11):
        print(i)
    with PrintTime():
        for i in range(1,11):
            print(i)
    for i in range(1,11):
        print(i)
```
:::


## 迴圈

### for迴圈：
for迴圈可以對可迭代物件中的每一項進行相同的處理

```python
for 變數 in 可迭代物件:
    程式碼
```
需要注意的是，直接對字典進行迭代與對鍵值進行迭代效果相同
可迭代物件中 有兩個常用在for迴圈裡

1. range
2. enumerate

#### range
range有三種寫法

```python
range(結尾)
range(開頭,結尾)
range(開頭,結尾,步長)
```
range代表一個從`開頭`到`結尾`間隔`步長`的等差數列(不包含結尾)
`開頭`默認為`0`，`步長`默認為`1`
三個值都可以是負的
range不會直接產生數列，而是在要用到的時候才計算

#### enumerate
enumerate語法如下

```python
enumerate(可迭代物件)
```
enumerate輸入一個`可迭代物件`，輸出的每一元素為(編號,值)的元組
通常寫作

```python
for index, value in enumerate(obj):
    #do something
```

### while迴圈：
while迴圈可以在條件符合時不斷重複相同程式碼

```python
while 條件:
    程式碼
```

### for/while...else
在迴圈後加上else區域可在迴圈不是因為例外或break而跳出時執行

```python
while 條件:
    程式碼
else:
    程式碼
# 或
for 變數 in 可迭代物件:
    程式碼
else:
    程式碼
```

## 自訂函數(副程式)
自訂函數可以把重複用到的功能打包起來，方便使用
語法：

```python
def 函數名(參數列表):
    程式碼
    return 回傳值 #非必要 不一定要在最後一行
```

## 三元運算子
三元運算子可以簡化條件判斷
語法：

```python
值1 if 條件 else 值2
```
空格不能省略
這一整個可以視為一個值
當條件成立，輸出值1；當條件不成立，輸出值2
Ex:

```python
i = int(input("input:"))
if i%2==1:
    print("odd")
else:
    print("even")
```
可簡化為

```python
i = int(input("input:"))
print("odd" if i%2==1 else "even")
```

## 推導式(Comprehension)
這沒有統一的翻譯，在此暫時稱之為推導式
推導式來源於數學中的集合建構式
如下：
$$集合={輸出表達式|變量\in輸入集合, 謂詞}$$
Python中的推導式有4種，分別是

+ 列表推導式(List Comprehension)
+ 集合推導式(Set Comprehension)
+ 字典推導式(Dictionary Comprehension)
+ 生成器表達式(Generator Expression)
共通語法：

```python
左括號 輸出表達式 for 變量 in 輸入集合 右括號

#或著加上謂詞
左括號 輸出表達式 for 變量 in 輸入集合 if 謂詞 右括號
```

### 列表推導式(List Comprehension)
算是其中較常用的一種
元素的順序會被保留
使用中括號[]

### 集合推導式(Set Comprehension)
與列表推導式類似，會去除相同的元素
元素的順序會不被保留
使用大括號{}

### 字典推導式(Dictionary Comprehension)
與集合推導式類似，會覆蓋鍵值相同的元素
輸出表達式必須為 `鍵值:值` 的格式
元素的順序會被保留
使用大括號{}

### 生成器表達式(Generator Expression)
雖然名稱不同但用法類似
但它並不會在表達式完成前求出所有元素的值
而是產生一個生成器，用到的時候再求出元素的值
若各元素只會被用到一次，相較於列表推導式可節省記憶體與時間
元素的順序會被保留
使用小括號()

## 關於main
Python程式不需要包含在main函數裡就可執行
若是要長期維護的代碼會建議用如下語法：
```python
def main():
    # 主要程式碼
if __name__ == '__main__':
    main()
```
這種寫法可以使程式碼在被import時不自動執行主要程式碼
但同時可以手動執行main
而且有一些函數庫會要求把程式碼寫在`if __name__ == '__main__':`裡面(例如：PyQt)
並能明確的標示出主要程式碼的位置