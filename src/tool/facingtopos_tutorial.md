# 方位找點基本功能說明
#### [連結](tool/facingtopos)
### 這份說明未完成，未說明到的內容請自行摸索
### 示意圖
![](https://i.imgur.com/QV1deNF.png)
#### 方位找點App主要區域包含
+ 左側的物件列表/設定檔
+ 上方的工具列
+ 中央的繪圖區
+ 右側的設定/屬性
#### 物件列表
顯示有哪些已創建物件的名稱、類型
選取按鈕會在選取物件時顯示屬性欄
#### 設定
可設置兩基本參考點的相對方位角以求出各點正確的相對位置
可設置兩基本參考點的相對距離以求出各點正確的相對距離
可設置一基本參考點的座標以求出各點正確的座標
#### 方位找點(和設定放在一起)
可透過與兩個參考點的相對方位角求出未知點的位置
左側的下拉選單可選擇參考的參考點(生成後不可變)
右側輸入相對方位角(生成後可變)
設定點的名稱、顏色
按下"生成"生成所求點

**三參考點模式**
此模式要先存在至少三個可用參考點
可選三個參考點A,B,C
不能選顏色
按下"生成"生成所求點時、會生成三個不同的點，分別參考AB、AC、BC
顏色由兩個參考點的平均決定
名稱相同
#### 屬性
可讀寫物件屬性
按下刷新可刷新該物件(編輯屬性時本來就會自動刷新)
按下刪除後可刪除該物件(可用參考點/基本參考點不可刪除)
"用作參考點"選項可將點標記為可用參考點
#### 工具列