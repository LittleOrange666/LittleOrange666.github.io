---
title: STD 函數
---
# STD 函數
這裡的多數內容都在```<algorithm>```標頭檔底下
## std::range的函數
以下所有有(start: iterator, end: iterator)的函數在C++20以上都可以用std::range來簡化
例如：以下兩種寫法效果相同
```cpp
std::sort(std::begin(obj), std::end(obj), cmp);
std::range::sort(obj, cmp);
```
## 排序
語法：
```cpp
void std::sort(iterator start,iterator end,comparer cmp);
void std::stable_sort(iterator start,iterator end,comparer cmp);
```
start,end表示要排序的區域
cmp表示排序方法，可省略，默認為"小於"
若a應排在b之前，cmp(a,b)應回傳true
不回傳資料，直接原地修改
時間：$O(NlogN)$
### 二分搜
語法：
```cpp
iterator std::lower_bound(iterator start,iterator end,value,comparer cmp);
iterator std::upper_bound(iterator start,iterator end,value,comparer cmp);
bool std::binary_search(iterator start,iterator end,value,comparer cmp);
std::pair<iterator,iterator> std::equal_range(iterator start,iterator end,value,comparer cmp);
```
start,end表示要排序的區域
value表示要找的值
cmp表示排序方法，可省略，默認為"小於"，應與資料排序時相同
lower_bound找出不小於value的最小值位置
upper_bound找出大於value的最小值位置
binary_search判斷value是否存在
equal_range回傳一個範圍表示value出現在那些地方
與
```cpp
std::make_pair(std::lower_bound(start,end,value),std::upper_bound(start,end,value));
```
大致相同
注："std::range::equal_range"回傳"std::ranges::subrange"
時間：$O(logN)$
### 第n個值
語法：
```cpp
void std::sort(iterator start,iterator nth,iterator end,comparer cmp);
void std::range::sort(range range,iterator nth,comparer cmp);
```
start,end表示要排序的區域
nth表示目標位置
cmp表示排序方法，可省略，默認為"小於"，應與資料排序時相同

保證nth的順序正確
時間：$O(N)$
### 是否有排序
語法：
```cpp
bool std::is_sorted(iterator start,iterator end,comparer cmp);
iterator std::is_sorted_until(iterator start,iterator end,comparer cmp);
```
start,end表示要排序的區域
cmp表示排序方法，可省略，默認為"小於"，應與資料排序時相同

is_sorted判斷是否有排序
is_sorted_until判斷從start到哪裡有排序
時間：$O(N)$
## 區間操作
## 區間讀取