---
title: python builtins
---

# 談談builtins
未完成，先隨便放點東西

## 常數:

### Ellipsis

### False:
bool(x) -> bool
Returns True when the argument x is true, False otherwise.
The builtins True and False are the only two instances of the class bool.
The class bool is a subclass of the class int, and cannot be subclassed.

### None

### NotImplemented

### True:
bool(x) -> bool
Returns True when the argument x is true, False otherwise.
The builtins True and False are the only two instances of the class bool.
The class bool is a subclass of the class int, and cannot be subclassed.

## 函數:

### abs(x):
Return the absolute value of the argument.

### aiter(async_iterable):
Return an AsyncIterator for an AsyncIterable object.

### all(iterable):
Return True if bool(x) is True for all values x in the iterable.
If the iterable is empty, return True.

### anext():
Return the next item from the async iterator.

### any(iterable):
Return True if bool(x) is True for any x in the iterable.
If the iterable is empty, return False.

### ascii(obj):
Return an ASCII-only representation of an object.
As repr(), return a string containing a printable representation of an
object, but escape the non-ASCII characters in the string returned by
repr() using \\x, \\u or \\U escapes. This generates a string similar
to that returned by repr() in Python 2.

### bin(number):
Return the binary representation of an integer.
   \>\>\> bin(2796202)
   '0b1010101010101010101010'

### breakpoint():
breakpoint(\*args, \*\*kws)
Call sys.breakpointhook(\*args, \*\*kws).  sys.breakpointhook() must accept
whatever arguments are passed.
By default, this drops you into the pdb debugger.

### callable(obj):
Return whether the object is callable (i.e., some kind of function).
Note that classes are callable, as are instances of classes with a
__call__() method.

### chr(i):
Return a Unicode string of one character with ordinal i; 0 <= i <= 0x10ffff.

### compile(source, filename, mode, flags=0, dont_inherit=False, optimize=-1, _feature_version=-1):
Compile source into a code object that can be executed by exec() or eval().
The source code may represent a Python module, statement or expression.
The filename will be used for run-time error messages.
The mode must be 'exec' to compile a module, 'single' to compile a
single (interactive) statement, or 'eval' to compile an expression.
The flags argument, if present, controls which future statements influence
the compilation of the code.
The dont_inherit argument, if true, stops the compilation inheriting
the effects of any future statements in effect in the code calling
compile; if absent or false these statements do influence the compilation,
in addition to any features explicitly specified.

### copyright():
interactive prompt objects for printing the license text, a list of
    contributors and the copyright notice.

### credits():
interactive prompt objects for printing the license text, a list of
    contributors and the copyright notice.

### delattr(obj, name):
Deletes the named attribute from the given object.
delattr(x, 'y') is equivalent to ''del x.y''

### dir():
dir([object]) -> list of strings
If called without an argument, return the names in the current scope.
Else, return an alphabetized list of names comprising (some of) the attributes
of the given object, and of attributes reachable from it.
If the object supplies a method named __dir__, it will be used; otherwise
the default dir() logic is used and returns:
  for a module object: the module's attributes.
  for a class object:  its attributes, and recursively the attributes
    of its bases.
  for any other object: its attributes, its class's attributes, and
    recursively the attributes of its class's base classes.

### divmod(x, y):
Return the tuple (x//y, x%y).  Invariant: div\*y + mod == x.

### eval(source, globals=None, locals=None):
Evaluate the given source in the context of globals and locals.
The source may be a string representing a Python expression
or a code object as returned by compile().
The globals must be a dictionary and locals can be any mapping,
defaulting to the current globals and locals.
If only globals is given, locals defaults to it.

### exec(source, globals=None, locals=None):
Execute the given source in the context of globals and locals.
The source may be a string representing one or more Python statements
or a code object as returned by compile().
The globals must be a dictionary and locals can be any mapping,
defaulting to the current globals and locals.
If only globals is given, locals defaults to it.

### exit(code=None):

### format(value, format_spec=''):
Return value.__format__(format_spec)
format_spec defaults to the empty string.
See the Format Specification Mini-Language section of help('FORMATTING') for
details.

### getattr():
getattr(object, name[, default]) -> value
Get a named attribute from an object; getattr(x, 'y') is equivalent to x.y.
When a default argument is given, it is returned when the attribute doesn't
exist; without it, an exception is raised in that case.

### globals():
Return the dictionary containing the current scope's global variables.
NOTE: Updates to this dictionary \*will\* affect name lookups in the current
global scope and vice-versa.

### hasattr(obj, name):
Return whether the object has an attribute with the given name.
This is done by calling getattr(obj, name) and catching AttributeError.

### hash(obj):
Return the hash value for the given object.
Two objects that compare equal must also have the same hash value, but the
reverse is not necessarily true.

### help(*args, **kwds):
Define the builtin 'help'.
    This is a wrapper around pydoc.help that provides a helpful message
    when 'help' is typed at the Python interactive prompt.
    Calling help() at the Python prompt starts an interactive help session.
    Calling help(thing) prints help for the python object 'thing'.

### hex(number):
Return the hexadecimal representation of an integer.
   \>\>\> hex(12648430)
   '0xc0ffee'

### id(obj):
Return the identity of an object.
This is guaranteed to be unique among simultaneously existing objects.
(CPython uses the object's memory address.)

### input(prompt=None):
Read a string from standard input.  The trailing newline is stripped.
The prompt string, if given, is printed to standard output without a
trailing newline before reading input.
If the user hits EOF (\*nix: Ctrl-D, Windows: Ctrl-Z+Return), raise EOFError.
On \*nix systems, readline is used if available.

### isinstance(obj, class_or_tuple):
Return whether an object is an instance of a class or of a subclass thereof.
A tuple, as in ``isinstance(x, (A, B, ...))``, may be given as the target to
check against. This is equivalent to ``isinstance(x, A) or isinstance(x, B)
or ...`` etc.

### issubclass(cls, class_or_tuple):
Return whether 'cls' is derived from another class or is the same class.
A tuple, as in ``issubclass(x, (A, B, ...))``, may be given as the target to
check against. This is equivalent to ``issubclass(x, A) or issubclass(x, B)
or ...``.

### iter():
iter(iterable) -> iterator
iter(callable, sentinel) -> iterator
Get an iterator from an object.  In the first form, the argument must
supply its own iterator, or be a sequence.
In the second form, the callable is called until it returns the sentinel.

### len(obj):
Return the number of items in a container.

### license():
interactive prompt objects for printing the license text, a list of
    contributors and the copyright notice.

### locals():
Return a dictionary containing the current scope's local variables.
NOTE: Whether or not updates to this dictionary will affect name lookups in
the local scope and vice-versa is \*implementation dependent\* and not
covered by any backwards compatibility guarantees.

### max():
max(iterable, \*[, default=obj, key=func]) -> value
max(arg1, arg2, \*args, \*[, key=func]) -> value
With a single iterable argument, return its biggest item. The
default keyword-only argument specifies an object to return if
the provided iterable is empty.
With two or more arguments, return the largest argument.

### min():
min(iterable, \*[, default=obj, key=func]) -> value
min(arg1, arg2, \*args, \*[, key=func]) -> value
With a single iterable argument, return its smallest item. The
default keyword-only argument specifies an object to return if
the provided iterable is empty.
With two or more arguments, return the smallest argument.

### next():
next(iterator[, default])
Return the next item from the iterator. If default is given and the iterator
is exhausted, it is returned instead of raising StopIteration.

### oct(number):
Return the octal representation of an integer.
   \>\>\> oct(342391)
   '0o1234567'

### open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None):
Open file and return a stream.  Raise OSError upon failure.
file is either a text or byte string giving the name (and the path
if the file isn't in the current working directory) of the file to
be opened or an integer file descriptor of the file to be
wrapped. (If a file descriptor is given, it is closed when the
returned I/O object is closed, unless closefd is set to False.)
mode is an optional string that specifies the mode in which the file
is opened. It defaults to 'r' which means open for reading in text
mode.  Other common values are 'w' for writing (truncating the file if
it already exists), 'x' for creating and writing to a new file, and
'a' for appending (which on some Unix systems, means that all writes
append to the end of the file regardless of the current seek position).
In text mode, if encoding is not specified the encoding used is platform
dependent: locale.getpreferredencoding(False) is called to get the
current locale encoding. (For reading and writing raw bytes use binary
mode and leave encoding unspecified.) The available modes are:
========= ===============================================================
Character Meaning
--------- ---------------------------------------------------------------
'r'       open for reading (default)
'w'       open for writing, truncating the file first
'x'       create a new file and open it for writing
'a'       open for writing, appending to the end of the file if it exists
'b'       binary mode
't'       text mode (default)
'+'       open a disk file for updating (reading and writing)
'U'       universal newline mode (deprecated)
========= ===============================================================
The default mode is 'rt' (open for reading text). For binary random
access, the mode 'w+b' opens and truncates the file to 0 bytes, while
'r+b' opens the file without truncation. The 'x' mode implies 'w' and
raises an `FileExistsError` if the file already exists.
Python distinguishes between files opened in binary and text modes,
even when the underlying operating system doesn't. Files opened in
binary mode (appending 'b' to the mode argument) return contents as
bytes objects without any decoding. In text mode (the default, or when
't' is appended to the mode argument), the contents of the file are
returned as strings, the bytes having been first decoded using a
platform-dependent encoding or using the specified encoding if given.
'U' mode is deprecated and will raise an exception in future versions
of Python.  It has no effect in Python 3.  Use newline to control
universal newlines mode.
buffering is an optional integer used to set the buffering policy.
Pass 0 to switch buffering off (only allowed in binary mode), 1 to select
line buffering (only usable in text mode), and an integer > 1 to indicate
the size of a fixed-size chunk buffer.  When no buffering argument is
given, the default buffering policy works as follows:
\* Binary files are buffered in fixed-size chunks; the size of the buffer
  is chosen using a heuristic trying to determine the underlying device's
  "block size" and falling back on `io.DEFAULT_BUFFER_SIZE`.
  On many systems, the buffer will typically be 4096 or 8192 bytes long.
\* "Interactive" text files (files for which isatty() returns True)
  use line buffering.  Other text files use the policy described above
  for binary files.
encoding is the name of the encoding used to decode or encode the
file. This should only be used in text mode. The default encoding is
platform dependent, but any encoding supported by Python can be
passed.  See the codecs module for the list of supported encodings.
errors is an optional string that specifies how encoding errors are to
be handled---this argument should not be used in binary mode. Pass
'strict' to raise a ValueError exception if there is an encoding error
(the default of None has the same effect), or pass 'ignore' to ignore
errors. (Note that ignoring encoding errors can lead to data loss.)
See the documentation for codecs.register or run 'help(codecs.Codec)'
for a list of the permitted encoding error strings.
newline controls how universal newlines works (it only applies to text
mode). It can be None, '', '\n', '\r', and '\r\n'.  It works as
follows:
\* On input, if newline is None, universal newlines mode is
  enabled. Lines in the input can end in '\n', '\r', or '\r\n', and
  these are translated into '\n' before being returned to the
  caller. If it is '', universal newline mode is enabled, but line
  endings are returned to the caller untranslated. If it has any of
  the other legal values, input lines are only terminated by the given
  string, and the line ending is returned to the caller untranslated.
\* On output, if newline is None, any '\n' characters written are
  translated to the system default line separator, os.linesep. If
  newline is '' or '\n', no translation takes place. If newline is any
  of the other legal values, any '\n' characters written are translated
  to the given string.
If closefd is False, the underlying file descriptor will be kept open
when the file is closed. This does not work when a file name is given
and must be True in that case.
A custom opener can be used by passing a callable as \*opener\*. The
underlying file descriptor for the file object is then obtained by
calling \*opener\* with (\*file\*, \*flags\*). \*opener\* must return an open
file descriptor (passing os.open as \*opener\* results in functionality
similar to passing None).
open() returns a file object whose type depends on the mode, and
through which the standard file operations such as reading and writing
are performed. When open() is used to open a file in a text mode ('w',
'r', 'wt', 'rt', etc.), it returns a TextIOWrapper. When used to open
a file in a binary mode, the returned class varies: in read binary
mode, it returns a BufferedReader; in write binary and append binary
modes, it returns a BufferedWriter, and in read/write mode, it returns
a BufferedRandom.
It is also possible to use a string or bytearray as a file for both
reading and writing. For strings StringIO can be used like a file
opened in a text mode, and for bytes a BytesIO can be used like a file
opened in a binary mode.

### ord(c):
Return the Unicode code point for a one-character string.

### pow(base, exp, mod=None):
Equivalent to base\*\*exp with 2 arguments or base\*\*exp % mod with 3 arguments
Some types, such as ints, are able to use a more efficient algorithm when
invoked using the three argument form.

### print():
print(value, ..., sep=' ', end='\n', file=sys.stdout, flush=False)
Prints the values to a stream, or to sys.stdout by default.
Optional keyword arguments:
file:  a file-like object (stream); defaults to the current sys.stdout.
sep:   string inserted between values, default a space.
end:   string appended after the last value, default a newline.
flush: whether to forcibly flush the stream.

### quit(code=None):

### repr(obj):
Return the canonical string representation of the object.
For many object types, including most builtins, eval(repr(obj)) == obj.

### round(number, ndigits=None):
Round a number to a given precision in decimal digits.
The return value is an integer if ndigits is omitted or None.  Otherwise
the return value has the same type as the number.  ndigits may be negative.

### setattr(obj, name, value):
Sets the named attribute on the given object to the specified value.
setattr(x, 'y', v) is equivalent to ``x.y = v''

### sorted(iterable, key=None, reverse=False):
Return a new list containing all items from the iterable in ascending order.
A custom key function can be supplied to customize the sort order, and the
reverse flag can be set to request the result in descending order.

### sum(iterable, start=0):
Return the sum of a 'start' value (default: 0) plus an iterable of numbers
When the iterable is empty, return the start value.
This function is intended specifically for use with numeric values and may
reject non-numeric types.

### vars():
vars([object]) -> dictionary
Without arguments, equivalent to locals().
With an argument, equivalent to object.__dict__.

## 類別:

### UnicodeDecodeError:
Unicode decoding error.

### UnicodeEncodeError:
Unicode encoding error.

### UnicodeTranslateError:
Unicode translation error.

### bool:
bool(x) -> bool
Returns True when the argument x is true, False otherwise.
The builtins True and False are the only two instances of the class bool.
The class bool is a subclass of the class int, and cannot be subclassed.

### bytearray:
bytearray(iterable_of_ints) -> bytearray
bytearray(string, encoding[, errors]) -> bytearray
bytearray(bytes_or_buffer) -> mutable copy of bytes_or_buffer
bytearray(int) -> bytes array of size given by the parameter initialized with null bytes
bytearray() -> empty bytes array
Construct a mutable bytearray object from:
  - an iterable yielding integers in range(256)
  - a text string encoded using the specified encoding
  - a bytes or a buffer object
  - any object implementing the buffer API.
  - an integer

### bytes:
bytes(iterable_of_ints) -> bytes
bytes(string, encoding[, errors]) -> bytes
bytes(bytes_or_buffer) -> immutable copy of bytes_or_buffer
bytes(int) -> bytes object of size given by the parameter initialized with null bytes
bytes() -> empty bytes object
Construct an immutable array of bytes from:
  - an iterable yielding integers in range(256)
  - a text string encoded using the specified encoding
  - any object implementing the buffer API.
  - an integer

### classmethod:
classmethod(function) -> method
Convert a function to be a class method.
A class method receives the class as implicit first argument,
just like an instance method receives the instance.
To declare a class method, use this idiom:
  class C:
      @classmethod
      def f(cls, arg1, arg2, ...):
          ...
It can be called either on the class (e.g. C.f()) or on an instance
(e.g. C().f()).  The instance is ignored except for its class.
If a class method is called for a derived class, the derived class
object is passed as the implied first argument.
Class methods are different than C++ or Java static methods.
If you want those, see the staticmethod builtin.

### complex:
Create a complex number from a real part and an optional imaginary part.
This is equivalent to (real + imag\*1j) where imag defaults to 0.

### dict:
dict() -> new empty dictionary
dict(mapping) -> new dictionary initialized from a mapping object's
    (key, value) pairs
dict(iterable) -> new dictionary initialized as if via:
    d = {}
    for k, v in iterable:
        d[k] = v
dict(\*\*kwargs) -> new dictionary initialized with the name=value pairs
    in the keyword argument list.  For example:  dict(one=1, two=2)

### enumerate:
Return an enumerate object.
  iterable
    an object supporting iteration
The enumerate object yields pairs containing a count (from start, which
defaults to zero) and a value yielded by the iterable argument.
enumerate is useful for obtaining an indexed list:
    (0, seq[0]), (1, seq[1]), (2, seq[2]), ...

### filter:
filter(function or None, iterable) --> filter object
Return an iterator yielding those items of iterable for which function(item)
is true. If function is None, return the items that are true.

### float:
Convert a string or number to a floating point number, if possible.

### frozenset:
frozenset() -> empty frozenset object
frozenset(iterable) -> frozenset object
Build an immutable unordered collection of unique elements.

### int:
int([x]) -> integer
int(x, base=10) -> integer
Convert a number or string to an integer, or return 0 if no arguments
are given.  If x is a number, return x.__int__().  For floating point
numbers, this truncates towards zero.
If x is not a number or if base is given, then x must be a string,
bytes, or bytearray instance representing an integer literal in the
given base.  The literal can be preceded by '+' or '-' and be surrounded
by whitespace.  The base defaults to 10.  Valid bases are 0 and 2-36.
Base 0 means to interpret the base from the string as an integer literal.
\>\>\> int('0b100', base=0)
4

### list:
Built-in mutable sequence.
If no argument is given, the constructor creates a new empty list.
The argument must be an iterable if specified.

### map:
map(func, \*iterables) --> map object
Make an iterator that computes the function using arguments from
each of the iterables.  Stops when the shortest iterable is exhausted.

### memoryview:
Create a new memoryview object which references the given object.

### object:
The base class of the class hierarchy.
When called, it accepts no arguments and returns a new featureless
instance that has no instance attributes and cannot be given any.

### property:
Property attribute.
  fget
    function to be used for getting an attribute value
  fset
    function to be used for setting an attribute value
  fdel
    function to be used for del'ing an attribute
  doc
    docstring
Typical use is to define a managed attribute x:
class C(object):
    def getx(self): return self._x
    def setx(self, value): self._x = value
    def delx(self): del self._x
    x = property(getx, setx, delx, "I'm the 'x' property.")
Decorators make defining new properties or modifying existing ones easy:
class C(object):
    @property
    def x(self):
        "I am the 'x' property."
        return self._x
    @x.setter
    def x(self, value):
        self._x = value
    @x.deleter
    def x(self):
        del self._x

### range:
range(stop) -> range object
range(start, stop[, step]) -> range object
Return an object that produces a sequence of integers from start (inclusive)
to stop (exclusive) by step.  range(i, j) produces i, i+1, i+2, ..., j-1.
start defaults to 0, and stop is omitted!  range(4) produces 0, 1, 2, 3.
These are exactly the valid indices for a list of 4 elements.
When step is given, it specifies the increment (or decrement).

### reversed:
Return a reverse iterator over the values of the given sequence.

### set:
set() -> new empty set object
set(iterable) -> new set object
Build an unordered collection of unique elements.

### slice:
slice(stop)
slice(start, stop[, step])
Create a slice object.  This is used for extended slicing (e.g. a[0:10:2]).

### staticmethod:
staticmethod(function) -> method
Convert a function to be a static method.
A static method does not receive an implicit first argument.
To declare a static method, use this idiom:
     class C:
         @staticmethod
         def f(arg1, arg2, ...):
             ...
It can be called either on the class (e.g. C.f()) or on an instance
(e.g. C().f()). Both the class and the instance are ignored, and
neither is passed implicitly as the first argument to the method.
Static methods in Python are similar to those found in Java or C++.
For a more advanced concept, see the classmethod builtin.

### str:
str(object='') -> str
str(bytes_or_buffer[, encoding[, errors]]) -> str
Create a new string object from the given object. If encoding or
errors is specified, then the object must expose a data buffer
that will be decoded using the given encoding and error handler.
Otherwise, returns the result of object.__str__() (if defined)
or repr(object).
encoding defaults to sys.getdefaultencoding().
errors defaults to 'strict'.

### super:
super() -> same as super(__class__, <first argument>)
super(type) -> unbound super object
super(type, obj) -> bound super object; requires isinstance(obj, type)
super(type, type2) -> bound super object; requires issubclass(type2, type)
Typical use to call a cooperative superclass method:
class C(B):
    def meth(self, arg):
        super().meth(arg)
This works for class methods too:
class C(B):
    @classmethod
    def cmeth(cls, arg):
        super().cmeth(arg)

### tuple:
Built-in immutable sequence.
If no argument is given, the constructor returns an empty tuple.
If iterable is specified the tuple is initialized from iterable's items.
If the argument is a tuple, the return value is the same object.

### type:
type(object_or_name, bases, dict)
type(object) -> the object's type
type(name, bases, dict) -> a new type

### zip:
zip(\*iterables, strict=False) --> Yield tuples until an input is exhausted.
   \>\>\> list(zip('abcdefg', range(3), range(4)))
   [('a', 0, 0), ('b', 1, 1), ('c', 2, 2)]
The zip object yields n-length tuples, where n is the number of iterables
passed as positional arguments to zip().  The i-th element in every tuple
comes from the i-th iterable argument to zip().  This continues until the
shortest argument is exhausted.
If strict is true and one of the arguments is exhausted before the others,
raise a ValueError.

## 例外:

### ArithmeticError:
Base class for arithmetic errors.

### AssertionError:
Assertion failed.

### AttributeError:
Attribute not found.

### BaseException:
Common base class for all exceptions

### BlockingIOError:
I/O operation would block.

### BrokenPipeError:
Broken pipe.

### BufferError:
Buffer error.

### BytesWarning:
Base class for warnings about bytes and buffer related problems, mostly
related to conversion from str or comparing to str.

### ChildProcessError:
Child process error.

### ConnectionAbortedError:
Connection aborted.

### ConnectionError:
Connection error.

### ConnectionRefusedError:
Connection refused.

### ConnectionResetError:
Connection reset.

### DeprecationWarning:
Base class for warnings about deprecated features.

### EOFError:
Read beyond end of file.

### EncodingWarning:
Base class for warnings about encodings.

### EnvironmentError:
Base class for I/O related errors.

### Exception:
Common base class for all non-exit exceptions.

### FileExistsError:
File already exists.

### FileNotFoundError:
File not found.

### FloatingPointError:
Floating point operation failed.

### FutureWarning:
Base class for warnings about constructs that will change semantically
in the future.

### GeneratorExit:
Request that a generator exit.

### IOError:
Base class for I/O related errors.

### ImportError:
Import can't find module, or can't find name in module.

### ImportWarning:
Base class for warnings about probable mistakes in module imports

### IndentationError:
Improper indentation.

### IndexError:
Sequence index out of range.

### InterruptedError:
Interrupted by signal.

### IsADirectoryError:
Operation doesn't work on directories.

### KeyError:
Mapping key not found.

### KeyboardInterrupt:
Program interrupted by user.

### LookupError:
Base class for lookup errors.

### MemoryError:
Out of memory.

### ModuleNotFoundError:
Module not found.

### NameError:
Name not found globally.

### NotADirectoryError:
Operation only works on directories.

### NotImplementedError:
Method or function hasn't been implemented yet.

### OSError:
Base class for I/O related errors.

### OverflowError:
Result too large to be represented.

### PendingDeprecationWarning:
Base class for warnings about features which will be deprecated
in the future.

### PermissionError:
Not enough permissions.

### ProcessLookupError:
Process not found.

### RecursionError:
Recursion limit exceeded.

### ReferenceError:
Weak ref proxy used after referent went away.

### ResourceWarning:
Base class for warnings about resource usage.

### RuntimeError:
Unspecified run-time error.

### RuntimeWarning:
Base class for warnings about dubious runtime behavior.

### StopAsyncIteration:
Signal the end from iterator.__anext__().

### StopIteration:
Signal the end from iterator.__next__().

### SyntaxError:
Invalid syntax.

### SyntaxWarning:
Base class for warnings about dubious syntax.

### SystemError:
Internal error in the Python interpreter.
Please report this to the Python maintainer, along with the traceback,
the Python version, and the hardware/OS platform and version.

### SystemExit:
Request to exit from the interpreter.

### TabError:
Improper mixture of spaces and tabs.

### TimeoutError:
Timeout expired.

### TypeError:
Inappropriate argument type.

### UnboundLocalError:
Local name referenced but not bound to a value.

### UnicodeError:
Unicode related error.

### UnicodeWarning:
Base class for warnings about Unicode related problems, mostly
related to conversion problems.

### UserWarning:
Base class for warnings generated by user code.

### ValueError:
Inappropriate argument value (of correct type).

### Warning:
Base class for warning categories.

### WindowsError:
Base class for I/O related errors.

### ZeroDivisionError:
Second argument to a division or modulo operation was zero