---
title: C++編譯與預處理指令
---
# 編譯與預處理指令
## 預處理指令
預處理指令以"#"開頭
大致可分為三類

+ include
+ define
+ if

### include
include指令是最常用的一個指令
可以用來載入標頭檔
有兩種用法
一、從標準函數庫載入
```cpp
#include<header>
```
二、從目前資料夾載入
```cpp
#include"header"
```
include指令實際上只是把標頭檔複製過來而已
### define
define用來定義識別字
有三種語法
一、只是定義，用於if判斷
```cpp
#define identifier
```
二、覆蓋
```cpp
#define identifier replacement
```
三、類函數式覆蓋
```cpp
#define identifier(args) expression
```
Ex. 用all(obj)來表示整個range
```cpp
#define all(o) o.begin(),o.end()
```
因為define會使其下方的所有關鍵字受到影響，最好不要寫在include上方(特別是`#define int long long`之類的東東)
#### undef
undef可以取消define的效果
語法：
```cpp
#undef identifier
```
### if語句
if語句可以依照情況搭配define做選擇式編譯
總是由endif做結尾
有三種語法
一、if
```cpp
#if const_expression
content;
#endif
```
若常數運算式為真則編譯以下內容
(常用於C++版本判斷)

二、ifdef
```cpp
#ifdef identifier
content;
#endif
```
若識別字已定義則編譯以下內容

三、ifndef
```cpp
#ifndef identifier
content;
#endif
```
若識別字未定義則編譯以下內容

Example: 避免重複引用標頭檔導致出錯
```cpp
#ifndef MY_HEADER_IS_INCLUDED
#define MY_HEADER_IS_INCLUDED

header_content;

#endif
```

#### elif
預處理指令也有elif

Example: 用一個define控制多種分支結果
```cpp
#define MY_VERSION 1

#if MY_VERSION == 1
#define WELCOME_MSG "this is first version"
#elif MY_VERSION == 2
#define WELCOME_MSG "this is second version"
#elif MY_VERSION == 3
#define WELCOME_MSG "this is third version"
#endif
```

## 編譯
C++編譯可大致分為三個階段

1. 預處理
2. 編譯&組譯
3. 連結

### 預處理
執行預處理指令並去除註解

### 編譯&組譯
把預處理完的原始碼編譯為組合語言後再組譯為目標代碼

### 連結
連結一個或多個目標檔，產生一個完整的可執行檔
注意：template通常不能正確連結，建議如果一定要用template就直接用include

## 編譯指令(g++)
基本語法：
```bat
g++ 來源檔名 -o 輸出檔名
```
或著
```bat
g++ -o 輸出檔名 來源檔名
```
這裡的來源檔名可以是.cpp檔或.o檔案，可用空白隔開多個輸入檔案，編譯器就會把它們連結在一起(或著分別部分編譯)

### 常用編譯參數
常用編譯參數大致有四類

1. 指定版本
2. 優化
3. 編譯警告
4. define

#### 指定版本
語法：
```bat
-std=版本名稱
```
可用的版本名稱有：

+ c++11
+ c++14
+ c++17
+ c++20

#### 優化
優化最簡單的就是優化等級
語法：
```bat
-優化等級
```
等級包含

+ O1
+ O2
+ O3

O2較常用
O3似乎是在較舊版本會出一些問題所以比較少用

#### 編譯警告
可以利用編譯參數控制編譯警告的顯示
可用參數包含

+ -w 只要編譯過了就不顯示警告
+ -Wall 顯示編譯器覺得重要的警告
+ -Wextra 顯示編譯器覺得可疑的代碼
+ -Wconversion 顯示可能會出錯的型別轉換
+ -Wshadow 在重複使用相同變數名稱時顯示警告

#### define
可以利用編譯參數定義識別字，效果與在檔案開頭使用define相同
語法：
```bat
-D identifier
```
或
```bat
-D identifier=replacement
```
有必要時可以適當使用引號

### 部分編譯
可以用編譯參數要求g++只完成部分編譯步驟
有以下參數可以用

+ -E 只做預處理
+ -S 只做到編譯，輸出組合語言
+ -C 只做到組譯，輸出目標代碼

#### 沒有設定-o會怎樣?
只做預處理=>顯示在終端機
只做到編譯=>輸出"原檔名.s"
只做到組譯=>輸出"原檔名.o"
完整編譯=>輸出"a.exe"
注：不管來源檔來自哪裡，未設定-o時都會輸出到當前資料夾