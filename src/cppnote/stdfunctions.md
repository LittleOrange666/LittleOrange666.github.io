---
title: std 函數
---
# std 函數
這裡的多數內容都在```<algorithm>```標頭檔底下
## std::range的函數
以下所有有(start: iterator\<T\>, end: iterator\<T\>)的函數在C++20以上都可以用std::range來簡化
例如：以下兩種寫法效果相同
```cpp
std::sort(std::begin(obj), std::end(obj), cmp);
std::range::sort(obj, cmp);
```
## 排序
語法：
```cpp
void std::sort(iterator<T> start,iterator<T> end,function<bool(T,T)> cmp);
void std::stable_sort(iterator<T> start,iterator<T> end,function<bool(T,T)> cmp);
```
start,end表示要排序的範圍
cmp表示排序方法，可省略，默認為"小於"
若a應排在b之前，cmp(a,b)應回傳true
不回傳資料，直接原地修改
時間：$O(NlogN)$
### 二分搜
語法：
```cpp
iterator<T> std::lower_bound(iterator<T> start,iterator<T> end,T value,function<bool(T,T)> cmp);
iterator<T> std::upper_bound(iterator<T> start,iterator<T> end,T value,function<bool(T,T)> cmp);
bool std::binary_search(iterator<T> start,iterator<T> end,T value,function<bool(T,T)> cmp);
std::pair<iterator<T>,iterator<T>> std::equal_range(iterator<T> start,iterator<T> end,T value,function<bool(T,T)> cmp);
```
start,end表示要排序的範圍
value表示要找的值
cmp表示排序方法，可省略，默認為"小於"，應與資料排序時相同

lower_bound找出不小於value的最小值位置
upper_bound找出大於value的最小值位置
binary_search判斷value是否存在
equal_range回傳一個範圍表示value出現在那些地方
與
```cpp
std::make_pair(std::lower_bound(start,end,T value),std::upper_bound(start,end,T value));
```
大致相同
注："std::range::equal_range"回傳"std::ranges::subrange"
時間：$O(logN)$
### 第n個值
語法：
```cpp
void std::sort(iterator<T> start,iterator<T> nth,iterator<T> end,function<bool(T,T)> cmp);
void std::range::sort(range range,iterator<T> nth,function<bool(T,T)> cmp);
```
start,end表示要排序的範圍
nth表示目標位置
cmp表示排序方法，可省略，默認為"小於"，應與資料排序時相同

保證nth的順序正確
時間：$O(N)$
### 是否有排序
語法：
```cpp
bool std::is_sorted(iterator<T> start,iterator<T> end,function<bool(T,T)> cmp);
iterator<T> std::is_sorted_until(iterator<T> start,iterator<T> end,function<bool(T,T)> cmp);
```
start,end表示要排序的範圍
cmp表示排序方法，可省略，默認為"小於"，應與資料排序時相同

is_sorted判斷是否有排序
is_sorted_until判斷從start到哪裡有排序
時間：$O(N)$

## 區間讀取
### 線性搜尋
語法：
```cpp
iterator<T> std::find(iterator<T> start,iterator<T> end,T value);
iterator<T> std::find_if(iterator<T> start,iterator<T> end,function<bool(T)> pre);
iterator<T> std::find_if_not(iterator<T> start,iterator<T> end,function<bool(T)> pre);
```
start,end表示要搜尋的範圍
value表示要找的值
pre表示條件

find尋找第一個value
find_if尋找第一個符合條件的
find_if_not尋找第一個不符合條件的
時間：$O(N)$
### 計數
語法：
```cpp
iterator<T>::difference_type std::count(iterator<T> start,iterator<T> end,T value);
iterator<T>::difference_type std::count_if(iterator<T> start,iterator<T> end,function<bool(T)> pre);
```
start,end表示要搜尋的範圍
value表示要找的值
pre表示條件

count計算有幾個value
count_if計算有幾個符合條件的
difference_type我也不太知道是甚麼，大概是uint?
時間：$O(N)$
### 布林判斷
語法：
```cpp
bool std::all_of(iterator<T> start,iterator<T> end,function<bool(T)> pre);
bool std::any_of(iterator<T> start,iterator<T> end,function<bool(T)> pre);
bool std::none_of(iterator<T> start,iterator<T> end,function<bool(T)> pre);
```
start,end表示要搜尋的範圍
pre表示條件

all_of判斷是否所有值都符合條件
any_of判斷是否有值符合條件
none_of判斷是否所有值都不符合條件
時間：$O(N)$
## 區間操作
### 複製
語法：
```cpp
void std::copy(iterator<T> start,iterator<T> end, iterator<T> out);
void std::copy_if(iterator<T> start,iterator<T> end,function<bool(T)> pre);
```
start,end表示來源的範圍
out表示輸出起點
pre表示條件

把所有符合條件的複製到輸出
out建議使用std::back_insert_iterator
時間：$O(N)$
### 映射
語法：
```cpp
void std::transform(iterator<T> start,iterator<T> end, iterator<V> out, function<V(T)> func);
void std::transform(iterator<T> start1,iterator<T> end, iterator<U> start2, iterator<V> out, function<V(T,U)> func);
```
start,end表示來源的範圍
out表示輸出起點
func表示映射函數

把所有數值映射到新的位置
out建議使用std::back_insert_iterator
時間：$O(N)$
### 反轉
語法：
```cpp
void std::reverse(iterator<T> start,iterator<T> end);
```
start,end表示來源的範圍

反轉序列
不回傳資料，直接原地修改
時間：$O(N)$
### 打亂
語法：
```cpp
void std::shuffle(iterator<T> start,iterator<T> end,function<iterator<T>::difference_type()> random);
```
start,end表示來源的範圍
random表示隨機函數，可省略，默認為rand

打亂序列
不回傳資料，直接原地修改
時間：$O(N)$