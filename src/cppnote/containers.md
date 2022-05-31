---
title: STL 容器
---
# STL 容器
## 序列容器
### array
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
:::spoiler_repeat 序列容器通用方法

**T* data()**
取得底層陣列的開頭指標
容器為空時可能回傳空指標也可能回傳有效指標

**void clear()**
清空容器

**std::size_t capacity()**
取得已分配內存大小

**void reserve(std::size_t capacity)**
預先申請內存

**void shrink_to_fit()**
釋放多餘內存以符合元素數量

### deque
### forward_list
### list
## 容器適配器
### stack
### queue
### priority_queue
## 關聯容器

:::spoiler_template STL容器通用方法

**bool empty()**
判斷是否為空

**std::size_t size()**
取得元素數量

**void swap(container &other)**
與另一容器交換資料

**allocator get_allocator()**
取得分配器

**iterator begin()**
取得指向開頭的迭代器

**iterator end()**
取得指向結尾的迭代器
:::

:::spoiler_template 序列容器通用方法

**T& operator[]\(size_t index)**
用索引取得值
存取越界時是未定義行為

**T& at(std::size_t index)**
用索引取得值
存取越界時拋出**std::out_of_range**

**T& front()**
取得第一個值
容器為空時是未定義行為

**T& back()**
取得最後一個值
容器為空時是未定義行為
:::
