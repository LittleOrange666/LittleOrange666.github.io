---
title: python builtins
---


# Python內建物件

## 類別

### bool
布林值，只有**True**和**False**兩個值
是**int**的子類別
可用方法：與**int**相同
可用**bool()**取得任意類型的布林值

### int
整數，可正可負，沒有大小限制，不會失真
可用**int()**把其他類型轉換為整數
:::spoiler 可用屬性與方法
#### 屬性：
**denominator: int**
化為分數的分母

**imag: int**
虛部

**numerator: int**
化為分數的分子

**real: int**
實部

#### 方法：
**as_integer_ratio() -> tuple[int, int]**
化為分數

**bit_count()->int**
在二進位表示法下有幾個**1**

**bit_length()->int**
至少占用了多少個位元

**conjugate()->int**
共軛複數

**to_bytes(length: int, byteorder: str)->bytes**
轉換成**bytes**
byteorder表示位元組順序
用"little"表示小端序、"big"表示大端序
可用**sys.byteorder**取得系統慣用的位元組順序

#### 類別方法：
**from_bytes(sources: bytes, byteorder: str)->int**
把**bytes**轉換為**int**
byteorder表示位元組順序
用"little"表示小端序、"big"表示大端序
可用**sys.byteorder**取得系統慣用的位元組順序
:::

### float
浮點數(實數)，可正可負，有大小限制，是雙倍精度浮點數
要更高精度可以用**decimal**函數庫
可用**float()**把其他類型轉換為浮點數
:::spoiler 可用屬性與方法
#### 屬性：
**imag: float**
虛部

**real: float**
實部

#### 方法：
**as_integer_ratio() -> tuple[int, int]**
化為分數(實際儲存的值)

**conjugate()->float**
共軛複數

**hex()->str**
產生十六進位的浮點數表示法
不會失真

**is_integer()->bool**
是否為整數

#### 類別方法：
**fromhex(sources: str)->float**
由十六進位的浮點數表示法得到浮點值
不會失真
:::

### complex
虛數，可正可負，有大小限制，是雙倍精度浮點數
要更高精度可以用**decimal**函數庫
可用**complex()**把其他類型轉換為虛數
:::spoiler 可用屬性與方法+
#### 屬性：
**imag: float**
虛部

**real: float**
實部

#### 方法：
**conjugate()->complex**
共軛複數
:::
### str
字串，unicode字元的序列，沒有長度限制
可用**str()**把其他類型轉換為字串
:::spoiler 可用屬性與方法
#### 方法：
**isalnum()->bool**
判斷是否所有字元都是字母或數字
空字串回傳False

**isalpha()->bool**
判斷是否所有字元都是字母
空字串回傳False

**isascii()->bool**
判斷是否所有字元都是ASCII字元
空字串回傳True

**isdecimal()->bool**
判斷是否所有字元都是數字
空字串回傳False

**isdigit()->bool**
判斷是否所有字元都是數字
空字串回傳False.

**isnumeric()->bool**
判斷是否所有字元都是數字
空字串回傳False.

**isspace()->bool**
判斷是否所有字元都是空白字元
空字串回傳False

**islower()->bool**
判斷是否所有字母都是字小寫
空字串回傳False

**isupper()->bool**
判斷是否所有字母都是字大寫
空字串回傳False

**startswith(prefix: str, start: int, end: int)->bool**
判斷[start:end]的範圍是否以**prefix**開頭

**endswith(suffix: str, start: int, end: int)->bool**
判斷[start:end]的範圍是否以**suffix**結尾

**find(sub: str, start: int, end: int)->int**
找[start:end]的範圍中第一個**sub**的索引
找不到時回傳**\-1**

**index(sub: str, start: int, end: int)->int**
找[start:end]的範圍中第一個**sub**的索引，
找不到時拋出**ValueError**

**rfind(sub: str, start: int, end: int)->int**
找[start:end]的範圍中最後一個**sub**的索引
找不到時回傳**\-1**

**rindex(sub: str, start: int, end: int)->int**
找[start:end]的範圍中最後一個**sub**的索引，
找不到時拋出**ValueError**

**count(sub: str, start: int, end: int)->int**
計算在[start:end]的範圍中有幾個**sub**

**join(Iterable[str])->str**
用自身把一系列字串連接起來

**split(sep: None | str = None, maxsplit: int = -1)->list[str]**
用**sep**把字串分割成一個字串列表
最多進行**maxsplit**次分割
**maxsplit=-1**表示無上限

**rsplit(sep: None | str = None, maxsplit: int = -1)->list[str]**
與split相似
只有**maxsplit**有設置的時候會不太一樣

**splitlines(keepends: bool = False)->list[str]**
逐行分割字串
**keepends**表示是否保留換行符

**lower()->str**
產生小寫字串

**upper()->str**
產生大寫字串

**capitalize()->str**
產生首字元大寫的字串

**casefold()->str**
產生適合無大小寫比較的字符串版本。

使用指定的填充字符（默認為空格）完成填充。

**center()->str**
產生一個居中的長度寬度字符串。

**encode(encoding: str,errors: str = "strict")->bytes**
將字串編碼為bytes
errors表示對錯誤的處理方式，包括
"strict": 總是丟出UnicodeEncodeError
"ignore": 忽略無法編碼的字元
"replace": 無法編碼則換成奇怪字元

**replace(old: str,new: str, count: int = -1)->str**
產生把**old**替換成**new**之後的字串
最多進行**count**次替換
**count=-1**表示無上限

**strip(chars: None | str = None)**
產生一個把頭尾出現在chars裡的字元刪掉後的字串
若不設置則刪掉空白字元

**lstrip(chars: None | str = None)**
產生一個把開頭出現在chars裡的字元刪掉後的字串
若不設置則刪掉空白字元

**rstrip(chars: None | str = None)**
產生一個把結尾出現在chars裡的字元刪掉後的字串
若不設置則刪掉空白字元

**expandtabs**
Return a copy where all tab characters are expanded using spaces.

If tabsize is not given, a tab size of 8 characters is assumed.

**format**
The substitutions are identified by braces ('{' and '}').

Return a formatted version of S, using substitutions from args and kwargs.

**format_map**
S.format_map(mapping) -> str

Return a formatted version of S, using substitutions from mapping.
The substitutions are identified by braces ('{' and '}').

**isidentifier**
Return True if the string is a valid Python identifier, False otherwise.

Call keyword.iskeyword(s) to test whether string s is a reserved identifier,
such as "def" or "class".

A string is lowercase if all cased characters in the string are lowercase and
there is at least one cased character in the string.

**isprintable**
Return True if the string is printable, False otherwise.

A string is printable if all of its characters are considered printable in
repr() or if it is empty.

**istitle**
Return True if the string is a title-cased string, False otherwise.

In a title-cased string, upper- and title-case characters may only
follow uncased characters and lowercase characters only cased ones.

**ljust**
Return a left-justified string of length width.

Padding is done using the specified fill character (default is a space).

**partition**
Partition the string into three parts using the given separator.

This will search for the separator in the string.  If the separator is found,
returns a 3-tuple containing the part before the separator, the separator
itself, and the part after it.

If the separator is not found, returns a 3-tuple containing the original string
and two empty strings.

**removeprefix**
Return a str with the given prefix string removed if present.

If the string starts with the prefix string, return string[len(prefix):].
Otherwise, return a copy of the original string.

**removesuffix**
Return a str with the given suffix string removed if present.

If the string ends with the suffix string and that suffix is not empty,
return string[:-len(suffix)]. Otherwise, return a copy of the original
string.

**rjust**
Return a right-justified string of length width.

Padding is done using the specified fill character (default is a space).

**rpartition**
Partition the string into three parts using the given separator.

This will search for the separator in the string, starting at the end. If
the separator is found, returns a 3-tuple containing the part before the
separator, the separator itself, and the part after it.

If the separator is not found, returns a 3-tuple containing two empty strings
and the original string.

**swapcase**
Convert uppercase characters to lowercase and lowercase characters to uppercase.

**title**
Return a version of the string where each word is titlecased.

More specifically, words start with uppercased characters and all remaining
cased characters have lower case.

**translate**
Replace each character in the string using the given translation table.

  table
    Translation table, which must be a mapping of Unicode ordinals to
    Unicode ordinals, strings, or None.

The table must implement lookup/indexing via __getitem__, for instance a
dictionary or list.  If this operation raises LookupError, the character is
left untouched.  Characters mapped to None are deleted.

**zfill**
Pad a numeric string with zeros on the left, to fill a field of the given width.

The string is never truncated.

#### 類別方法：
**maketrans**
Return a translation table usable for str.translate().

If there is only one argument, it must be a dictionary mapping Unicode
ordinals (integers) or characters to Unicode ordinals, strings or None.
Character keys will be then converted to ordinals.
If there are two arguments, they must be strings of equal length, and
in the resulting dictionary, each character in x will be mapped to the
character at the same position in y. If there is a third argument, it
must be a string, whose characters will be mapped to None in the result.

:::
### tuple
元組，並列且有序的一組任意長度的資料值
長度不可改變，元素不可寫入
:::spoiler 可用屬性與方法
#### 方法：
**count(target: Any)->int**
計算**target**出現了幾次

**index(target: Any)->int**
找出**target**第一次出現的索引
找不到時丟出ValueError
:::

### list
列表，並列且有序的一組任意長度的資料值
可插入/刪除資料
:::spoiler 可用屬性與方法
#### 方法：
**append(value: Any)->None**
在結尾加上一項

**clear()->None**
清空列表

**copy()->list[Any]**
淺拷貝

**count(target: Any)->int**
計算**target**出現了幾次

**extend(it: Iterable[Any])**
把it裡的所有值接在列表後方

**index(target: Any)->int**
找出**target**第一次出現的索引
找不到時丟出ValueError

**insert**
Insert object before index.

**pop(index: int = -1)->Any**
把指定的索引刪除並回傳該值
若索引不存在則丟出**IndexError**

**remove(target: Any)->None**
刪除第一個在列表中出現的**value**
若該值不存在則丟出**ValueError**

**reverse()->None**
原地反轉列表

**sort(\*, key: Callable[[Any],Any] = None, reverse: bool = False)**
以升序在原地排列列表，是穩定排列
若有定義**key**，則會把所有值都丟到**key**中之後再排列
**reverse=True**可改為升序
:::

### set
集合，無序不重複的一組任意長度的資料值
並能夠在常數時間裡檢查一元素是否在集合中
類似數學上的集合
類似C++的unordered_set
不能存可變的值，如：list、set、dict
要存其他set必須轉換成frozenset
:::spoiler 可用屬性與方法
#### 方法：
**add(value: Any)->None**
在集合中加入一個值

**clear()->None**
清空集合

**discard(value: Any)->None**
在集合中刪除一個值
該值不存在時無效果

**remove(value: Any)->None**
在集合中刪除一個值
該值不存在時丟出KeyError

**pop()->Any**
在集合中任意**不是隨機的**刪除一個值並回傳
集合為空時丟出KeyError

**isdisjoint(other: Iterable)->bool**
是否與**other**互斥

**issubset(other: Iterable)->bool**
是否是**other**的子集

**issuperset(other: Iterable)->bool**
是否是**other**的超集

**copy()->frozenset**
淺拷貝

**difference(\*others: Iterable)->set**
回傳差集，可以用逗號區隔多個集合

**intersection(\*others: Iterable)->set**
回傳交集，可以用逗號區隔多個集合

**symmetric_difference(other: Iterable)->set**
回傳對稱差

**difference_update(\*others: Iterable)->None**
原地求差集，可以用逗號區隔多個集合

**intersection_update(\*others: Iterable)->None**
原地求交集，可以用逗號區隔多個集合

**symmetric_difference_update(other: Iterable)->None**
原地求對稱差

**union(\*others: Iterable)->set**
求聯集，可以用逗號區隔多個集合

**update(\*others: Iterable)->None**
原地求聯集
:::

### frozenset
與**set**相同，只是不能修改內部的值
:::spoiler 可用屬性與方法
#### 方法：
**isdisjoint(other: Iterable)->bool**
是否與**other**互斥

**issubset(other: Iterable)->bool**
是否是**other**的子集

**issuperset(other: Iterable)->bool**
是否是**other**的超集

**copy()->frozenset**
淺拷貝

**difference(\*others: Iterable)->frozenset**
求差集，可以用逗號區隔多個集合

**intersection(\*others: Iterable)->frozenset**
求交集，可以用逗號區隔多個集合

**symmetric_difference(other: Iterable)->frozenset**
求對稱差

**union(\*others: Iterable)->frozenset**
求聯集，可以用逗號區隔多個集合
:::
### dict
字典，鍵-值對的資料結構
鍵保證唯一，值不保證唯一
在較新的python版本(3.7+)中鍵會按照加入的順序排列
:::spoiler 可用屬性與方法
#### 方法：
**clear()->None**
清空字典

**copy()->dict**
淺拷貝

**get(key: Any, default: Any = None)->Any**
取得**key**代表的值，若不存在則回傳**default**

**keys()->dict_keys**
獲取所有鍵值的鏡像
dict_keys與原字典綁定
且是可迭代物件

**values()->dict_values**
獲取所有值的鏡像
dict_values與原字典綁定
且是可迭代物件

**items()->dict_items**
獲取所有鍵-值對的鏡像
dict_items與原字典綁定
且是可迭代物件，每一項都是**(key,value)**

**pop(key: Any, default: Any)**
取得並刪除**key**代表的值，若不存在則回傳**default**
若**key**不存在且**default**未設置則丟出KeyError

**popitem()->tuple[Any, Any]**
在字典中刪除第一個鍵-值對並回傳
自店為空時丟出KeyError

**setdefault(key: Any, value: Any)->Any**
如果**key**不存在則把**key**的值設為**value**
回傳**key**最後的值

**update(other: Iterable)->None**
試圖用**other**來更新自身
**other**應該是一系列的鍵-值對
或可以用**keys()**獲取所有鍵值的類dict結構

#### 類別方法：
**fromkeys(keys: Iterable, value: Any = None)**
以**keys**的鍵值建立一個字典
並把值都設為**value**
:::
### bytearray
位元陣列，專門儲存位元序列，可寫入
:::spoiler 可用屬性與方法
#### 方法：
**append**
Append a single item to the end of the bytearray.

  item
    The item to be appended.

**capitalize**
B.capitalize() -> copy of B

Return a copy of B with only its first character capitalized (ASCII)
and the rest lower-cased.

**center**
Return a centered string of length width.

Padding is done using the specified fill character.

**clear**
Remove all items from the bytearray.

**copy**
Return a copy of B.

**count**
B.count(sub[, start[, end]]) -> int

Return the number of non-overlapping occurrences of subsection sub in
bytes B[start:end].  Optional arguments start and end are interpreted
as in slice notation.

**decode**
Decode the bytearray using the codec registered for encoding.

  encoding
    The encoding with which to decode the bytearray.
  errors
    The error handling scheme to use for the handling of decoding errors.
    The default is 'strict' meaning that decoding errors raise a
    UnicodeDecodeError. Other possible values are 'ignore' and 'replace'
    as well as any other name registered with codecs.register_error that
    can handle UnicodeDecodeErrors.

**endswith**
B.endswith(suffix[, start[, end]]) -> bool

Return True if B ends with the specified suffix, False otherwise.
With optional start, test B beginning at that position.
With optional end, stop comparing B at that position.
suffix can also be a tuple of bytes to try.

**expandtabs**
Return a copy where all tab characters are expanded using spaces.

If tabsize is not given, a tab size of 8 characters is assumed.

**extend**
Append all the items from the iterator or sequence to the end of the bytearray.

  iterable_of_ints
    The iterable of items to append.

**find**
B.find(sub[, start[, end]]) -> int

Return the lowest index in B where subsection sub is found,
such that sub is contained within B[start,end].  Optional
arguments start and end are interpreted as in slice notation.

Return -1 on failure.

**hex**
Create a string of hexadecimal numbers from a bytearray object.

  sep
    An optional single character or byte to separate hex bytes.
  bytes_per_sep
    How many bytes between separators.  Positive values count from the
    right, negative values count from the left.

Example:
>>> value = bytearray([0xb9, 0x01, 0xef])
>>> value.hex()
'b901ef'
>>> value.hex(':')
'b9:01:ef'
>>> value.hex(':', 2)
'b9:01ef'
>>> value.hex(':', -2)
'b901:ef'

**index**
B.index(sub[, start[, end]]) -> int

Return the lowest index in B where subsection sub is found,
such that sub is contained within B[start,end].  Optional
arguments start and end are interpreted as in slice notation.

Raises ValueError when the subsection is not found.

**insert**
Insert a single item into the bytearray before the given index.

  index
    The index where the value is to be inserted.
  item
    The item to be inserted.

**isalnum**
B.isalnum() -> bool

Return True if all characters in B are alphanumeric
and there is at least one character in B, False otherwise.

**isalpha**
B.isalpha() -> bool

Return True if all characters in B are alphabetic
and there is at least one character in B, False otherwise.

**isascii**
B.isascii() -> bool

Return True if B is empty or all characters in B are ASCII,
False otherwise.

**isdigit**
B.isdigit() -> bool

Return True if all characters in B are digits
and there is at least one character in B, False otherwise.

**islower**
B.islower() -> bool

Return True if all cased characters in B are lowercase and there is
at least one cased character in B, False otherwise.

**isspace**
B.isspace() -> bool

Return True if all characters in B are whitespace
and there is at least one character in B, False otherwise.

**istitle**
B.istitle() -> bool

Return True if B is a titlecased string and there is at least one
character in B, i.e. uppercase characters may only follow uncased
characters and lowercase characters only cased ones. Return False
otherwise.

**isupper**
B.isupper() -> bool

Return True if all cased characters in B are uppercase and there is
at least one cased character in B, False otherwise.

**join**
Concatenate any number of bytes/bytearray objects.

The bytearray whose method is called is inserted in between each pair.

The result is returned as a new bytearray object.

**ljust**
Return a left-justified string of length width.

Padding is done using the specified fill character.

**lower**
B.lower() -> copy of B

Return a copy of B with all ASCII characters converted to lowercase.

**lstrip**
Strip leading bytes contained in the argument.

If the argument is omitted or None, strip leading ASCII whitespace.

**partition**
Partition the bytearray into three parts using the given separator.

This will search for the separator sep in the bytearray. If the separator is
found, returns a 3-tuple containing the part before the separator, the
separator itself, and the part after it as new bytearray objects.

If the separator is not found, returns a 3-tuple containing the copy of the
original bytearray object and two empty bytearray objects.

**pop**
Remove and return a single item from B.

  index
    The index from where to remove the item.
    -1 (the default value) means remove the last item.

If no index argument is given, will pop the last item.

**remove**
Remove the first occurrence of a value in the bytearray.

  value
    The value to remove.

**removeprefix**
Return a bytearray with the given prefix string removed if present.

If the bytearray starts with the prefix string, return
bytearray[len(prefix):].  Otherwise, return a copy of the original
bytearray.

**removesuffix**
Return a bytearray with the given suffix string removed if present.

If the bytearray ends with the suffix string and that suffix is not
empty, return bytearray[:-len(suffix)].  Otherwise, return a copy of
the original bytearray.

**replace**
Return a copy with all occurrences of substring old replaced by new.

  count
    Maximum number of occurrences to replace.
    -1 (the default value) means replace all occurrences.

If the optional argument count is given, only the first count occurrences are
replaced.

**reverse**
Reverse the order of the values in B in place.

**rfind**
B.rfind(sub[, start[, end]]) -> int

Return the highest index in B where subsection sub is found,
such that sub is contained within B[start,end].  Optional
arguments start and end are interpreted as in slice notation.

Return -1 on failure.

**rindex**
B.rindex(sub[, start[, end]]) -> int

Return the highest index in B where subsection sub is found,
such that sub is contained within B[start,end].  Optional
arguments start and end are interpreted as in slice notation.

Raise ValueError when the subsection is not found.

**rjust**
Return a right-justified string of length width.

Padding is done using the specified fill character.

**rpartition**
Partition the bytearray into three parts using the given separator.

This will search for the separator sep in the bytearray, starting at the end.
If the separator is found, returns a 3-tuple containing the part before the
separator, the separator itself, and the part after it as new bytearray
objects.

If the separator is not found, returns a 3-tuple containing two empty bytearray
objects and the copy of the original bytearray object.

**rsplit**
Return a list of the sections in the bytearray, using sep as the delimiter.

  sep
    The delimiter according which to split the bytearray.
    None (the default value) means split on ASCII whitespace characters
    (space, tab, return, newline, formfeed, vertical tab).
  maxsplit
    Maximum number of splits to do.
    -1 (the default value) means no limit.

Splitting is done starting at the end of the bytearray and working to the front.

**rstrip**
Strip trailing bytes contained in the argument.

If the argument is omitted or None, strip trailing ASCII whitespace.

**split**
Return a list of the sections in the bytearray, using sep as the delimiter.

  sep
    The delimiter according which to split the bytearray.
    None (the default value) means split on ASCII whitespace characters
    (space, tab, return, newline, formfeed, vertical tab).
  maxsplit
    Maximum number of splits to do.
    -1 (the default value) means no limit.

**splitlines**
Return a list of the lines in the bytearray, breaking at line boundaries.

Line breaks are not included in the resulting list unless keepends is given and
true.

**startswith**
B.startswith(prefix[, start[, end]]) -> bool

Return True if B starts with the specified prefix, False otherwise.
With optional start, test B beginning at that position.
With optional end, stop comparing B at that position.
prefix can also be a tuple of bytes to try.

**strip**
Strip leading and trailing bytes contained in the argument.

If the argument is omitted or None, strip leading and trailing ASCII whitespace.

**swapcase**
B.swapcase() -> copy of B

Return a copy of B with uppercase ASCII characters converted
to lowercase ASCII and vice versa.

**title**
B.title() -> copy of B

Return a titlecased version of B, i.e. ASCII words start with uppercase
characters, all remaining cased characters have lowercase.

**translate**
Return a copy with each character mapped by the given translation table.

  table
    Translation table, which must be a bytes object of length 256.

All characters occurring in the optional argument delete are removed.
The remaining characters are mapped through the given translation table.

**upper**
B.upper() -> copy of B

Return a copy of B with all ASCII characters converted to uppercase.

**zfill**
Pad a numeric string with zeros on the left, to fill a field of the given width.

The original string is never truncated.

#### 類別方法：
**fromhex**
Create a bytearray object from a string of hexadecimal numbers.

Spaces between two numbers are accepted.
Example: bytearray.fromhex('B9 01EF') -> bytearray(b'\\xb9\\x01\\xef')

**maketrans**
Return a translation table useable for the bytes or bytearray translate method.

The returned table will be one where each byte in frm is mapped to the byte at
the same position in to.

The bytes objects frm and to must be of the same length.

:::
### bytes

### enumerate

### filter

### map

### zip

### memoryview

### range

### slice

### reversed

### classmethod

### staticmethod

### property

### super

### type

### object

## 函數

### abs

### pow

### round

### divmod

### max

### min

### sum

### sorted

### print

### input

### open

### all

### any

### hex

### oct

### bin

### ascii

### chr

### ord

### repr

### format

### id

### len

### hash

### iter

### next

### aiter

### anext

### compile

### breakpoint

### dir

### eval

### exec

### getattr

### setattr

### delattr

### hasattr

### isinstance

### issubclass

### callable

### locals

### globals

### quit

### exit

### vars

### copyright

### credits

### license

### help

## 特殊

### False

### True

### Ellipsis

### None

### NotImplemented

## 例外

### ArithmeticError

### AssertionError

### AttributeError

### BaseException

### BlockingIOError

### BrokenPipeError

### BufferError

### BytesWarning

### ChildProcessError

### ConnectionAbortedError

### ConnectionError

### ConnectionRefusedError

### ConnectionResetError

### DeprecationWarning

### EOFError

### EncodingWarning

### EnvironmentError

### Exception

### FileExistsError

### FileNotFoundError

### FloatingPointError

### FutureWarning

### GeneratorExit

### IOError

### ImportError

### ImportWarning

### IndentationError

### IndexError

### InterruptedError

### IsADirectoryError

### KeyError

### KeyboardInterrupt

### LookupError

### MemoryError

### ModuleNotFoundError

### NameError

### NotADirectoryError

### NotImplementedError

### OSError

### OverflowError

### PendingDeprecationWarning

### PermissionError

### ProcessLookupError

### RecursionError

### ReferenceError

### ResourceWarning

### RuntimeError

### RuntimeWarning

### StopAsyncIteration

### StopIteration

### SyntaxError

### SyntaxWarning

### SystemError

### SystemExit

### TabError

### TimeoutError

### TypeError

### UnboundLocalError

### UnicodeDecodeError

### UnicodeEncodeError

### UnicodeError

### UnicodeTranslateError

### UnicodeWarning

### UserWarning

### ValueError

### Warning

### WindowsError

### ZeroDivisionError