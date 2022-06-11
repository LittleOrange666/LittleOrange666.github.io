---
title: STL 容器
---
# STL 容器
## 序列容器
### array
#### 可用方法
:::spoiler_repeat STL容器通用方法
:::spoiler_repeat 隨機存取容器通用方法
:::spoiler_repeat 有序容器通用方法
### vector
vector是一個動態陣列，可以用常數的時間在結尾增刪物件
定義：
```cpp
template<
    class T,
    class Allocator = std::allocator<T>
> class vector;
```
#### 初始化
vector初始化參數有兩個部分，都可省略
1. 初始資料
2. 分配器
初始資料可以是"另一個vector"或"數量, 初始值"
(若T()有意義則初始值可省略)
#### 可用方法
:::spoiler_repeat STL容器通用方法
:::spoiler_repeat 隨機存取容器通用方法
:::spoiler_repeat 有序容器通用方法
:::spoiler_repeat 動態序列容器通用方法

##### data
```cpp
T* data()
```
取得底層陣列的開頭指標
容器為空時可能回傳空指標也可能回傳有效指標

##### capacity
```cpp
size_t capacity()
```
取得已分配內存大小

##### reserve
```cpp
void reserve(size_t capacity)
```
預先申請內存
$O(N)$

##### shrink_to_fit
```cpp
void shrink_to_fit()
```
釋放多餘內存以符合元素數量
$O(N)$

### deque
deque是一個動態雙向序列，可以用常數的時間在頭尾增刪物件
定義：
```cpp
template<
    class T,
    class Allocator = std::allocator<T>
> class deque;
```
#### 初始化
vector初始化參數有兩個部分，都可省略
1. 初始資料
2. 分配器
初始資料可以是"另一個deque"或"數量, 初始值"
(若T()有意義則初始值可省略)
#### 可用方法
:::spoiler_repeat STL容器通用方法
:::spoiler_repeat 隨機存取容器通用方法
:::spoiler_repeat 有序容器通用方法
:::spoiler_repeat 動態序列容器通用方法

##### shrink_to_fit
```cpp
void shrink_to_fit()
```
釋放多餘內存以符合元素數量

### forward_list
#### 可用方法
:::spoiler_repeat STL容器通用方法
### list
#### 可用方法
:::spoiler_repeat STL容器通用方法
:::spoiler_repeat 有序容器通用方法
:::spoiler_repeat 動態序列容器通用方法
## 容器適配器
### stack
#### 可用方法
### queue
#### 可用方法
### priority_queue
#### 可用方法
## 關聯容器
### set/multiset
#### 可用方法
:::spoiler_repeat 有序容器通用方法
### map/multimap
#### 可用方法
:::spoiler_repeat 有序容器通用方法
### unordered系列

***
注1: 複雜度未特別說明則皆指時間，且 $N$ 代表完成操作後容器內元素數量
注2: 若無標明複雜度默認為常數時間
注3: 多數容器皆定義於同名標頭檔內，只有multi系列的和不是multi的在相同標頭檔

:::spoiler_template STL容器通用方法

##### empty
```cpp
bool empty()
```
判斷是否為空

##### swap
```cpp
void swap(container &other)
```
與另一容器交換資料

##### get_allocator
```cpp
allocator get_allocator()
```
取得分配器
*array沒有這個方法*

##### clear
```cpp
void clear()
```
清空容器
*array沒有這個方法*

##### begin
```cpp
iterator begin()
```
取得指向開頭的迭代器

##### end
```cpp
iterator end()
```
取得指向結尾的迭代器

##### cbegin
```cpp
const_iterator cbegin()
```
取得指向開頭的常迭代器

##### cend
```cpp
const_iterator cend()
```
取得指向結尾的常迭代器
:::

:::spoiler_template 隨機存取容器通用方法

**T& operator[]\(size_t index)**
用索引取得值
存取越界時是未定義行為

##### at
```cpp
T& at(size_t index)
```
用索引取得值
存取越界時拋出**std::out_of_range**

##### front
```cpp
T& front()
```
取得第一個值
容器為空時是未定義行為

##### back
```cpp
T& back()
```
取得最後一個值
容器為空時是未定義行為
:::

:::spoiler_template 有序容器通用方法

##### size
```cpp
size_t size()
```
取得元素數量

##### rbegin
```cpp
iterator rbegin()
```
取得指向反向開頭的迭代器

##### rend
```cpp
iterator rend()
```
取得指向反向結尾的迭代器

##### crbegin
```cpp
const_iterator crbegin()
```
取得指向反向開頭的常迭代器

##### crend
```cpp
const_iterator crend()
```
取得指向反向結尾的常迭代器
:::

:::spoiler_template 動態序列容器通用方法
    
##### resize
```cpp
void resize(size_t count, const T& value)
```
改變容器的大小，並當count>目前大小時在***多出來的格子***填入value
如果省略value則不對多出來的格子做處理
$O(|count - size|)$
vector可能會因為重分配導致複雜度變大

##### assign
```cpp
void assign(size_t count, const T& value)
void assign(iterator source_begin, iterator source_end)
```
在容器中覆蓋指定數量的特定值或一個range的資料
$O(N)$

##### insert
```cpp
iterator insert(cons_iterator pos, const T& value)
iterator insert(cons_iterator pos, size_t, const T& value)
iterator insert(cons_iterator pos, iterator source_begin, iterator source_end)
```
在容器的指定位置插入一個或多個值，並回傳插入的第一個值的位置
list: $O(插入資料數目)$
vector: $O(插入資料數目 + (end-pos))$
deque: $O(插入資料數目 + min(end-pos,pos-begin))$

##### emplace
```cpp
iterator emplace(const_iterator pos, Args&&... args )
```
用args作為參數建構一個物件並插入容器的指定位置，再回傳插入的值的位置
list: $O(1)$
vector: $O(1 + (end-pos))$
deque: $O(1 + min(end-pos,pos-begin))$

##### erase
```cpp
iterator erase(const_iterator pos)
iterator erase(const_iterator pos_begin, const_iterator pos_end)
```
刪除指定區域的值並回傳刪除區域後的第一個值的位置
list: $O(刪除資料數目)$
vector: $O(刪除資料數目 + (end-pos))$
deque: $O(刪除資料數目 + min(end-pos,pos-begin))$

##### push_back
```cpp
void push_back(const T& value)
void push_back(T&& value)
```
在容器的結尾插入一個值

##### emplace_back
```cpp
void emplace_back(Args&&... args)
```
用args作為參數建構一個物件並插入容器的結尾

##### pop_back
```cpp
void pop_back()
```
在容器的結尾刪除一個值

##### push_front
```cpp
void push_front(const T& value)
void push_front(T&& value)
```
在容器的開頭插入一個值
*vector沒有這個方法*

##### emplace_front
```cpp
void emplace_front(Args&&... args)
```
用args作為參數建構一個物件並插入容器的開頭
*vector沒有這個方法*

##### pop_front
```cpp
void pop_front()
```
在容器的開頭刪除一個值
*vector沒有這個方法*
:::