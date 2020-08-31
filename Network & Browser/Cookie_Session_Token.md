[你真的了解 Cookie 和 Session 吗](https://juejin.im/post/5cd9037ee51d456e5c5babca)
[聊一聊session和cookie](https://juejin.im/post/5aede266f265da0ba266e0ef)

### Cookie属性

Cookie属性

name
cookie的名字，Cookie一旦创建，名称便不可更改

value
cookie值

comment
该Cookie的用处说明。浏览器显示Cookie信息的时候显示该说明

domain
可以访问该Cookie的域名。如果设置为“.baidu.com”，则所有以“baidu.com”结尾的域名都可以访问该Cookie；第一个字符必须为“.”

maxAge
Cookie失效的时间，单位秒。

正数，则超过maxAge秒之后失效。
负数，该Cookie为临时Cookie，关闭浏览器即失效，浏览器也不会以任何形式保存该Cookie。
为0，表示删除该Cookie。


path
该Cookie的使用路径。例如：

path=/，说明本域名下contextPath都可以访问该Cookie。
path=/app/，则只有contextPath为“/app”的程序可以访问该Cookie

path设置时，其以“/”结尾.


secure
该Cookie是否仅被使用安全协议传输。这里的安全协议包括HTTPS，SSL等。默认为false。


version
该Cookie使用的版本号。

0 表示遵循Netscape的Cookie规范，目前大多数用的都是这种规范；
1 表示遵循W3C的RFC2109规范；规范过于严格，实施起来很难。

在servlet规范中默认是0；


isHttpOnly
HttpOnly属性是用来限制非HTTP协议程序接口对客户端Cookie进行访问；也就是说如果想要在客户端取到httponly的Cookie的唯一方法就是使用AJAX，将取Cookie的操作放到服务端，接收客户端发送的ajax请求后将取值结果通过HTTP返回客户端。这样能有效的防止XSS攻击。


上述的这些属性，除了name与value属性会被提交外，其他的属性对于客户端来说都是不可读的，也是不可被提交的。


### Cookie 和 Session 有什么不同？


作用范围不同，Cookie 保存在客户端（浏览器），Session 保存在服务器端。
存取方式的不同，Cookie 只能保存 ASCII，Session 可以存任意数据类型，
  一般情况下我们可以在 Session 中保持一些常用变量信息，比如说 UserId 等。
有效期不同，Cookie 可设置为长时间保持，比如我们经常使用的默认登录功能，
  Session 一般失效时间较短，客户端关闭或者 Session 超时都会失效。
隐私策略不同，Cookie 存储在客户端，比较容易遭到不法获取，早期有人将用户的登录名和密码存储在 Cookie 中导致信息被窃取；
  Session 存储在服务端，安全性相对 Cookie 要好一些。
存储大小不同， 单个 Cookie 保存的数据不能超过 4K，Session 可存储数据远高于 Cookie


### [为什么需要 Cookie 和 Session，他们有什么关联？](https://user-gold-cdn.xitu.io/2019/5/13/16aafb5d90f398e2?imageslim)

用户第一次请求服务器的时候，服务器根据用户提交的相关信息，创建创建对应的 Session ，
请求返回时将此 Session 的唯一标识信息 SessionID 返回给浏览器，浏览器接收到服务器返回的 SessionID 信息后，
会将此信息存入到 Cookie 中，同时 Cookie 记录此 SessionID 属于哪个域名。

当用户第二次访问服务器的时候，请求会自动判断此域名下是否存在 Cookie 信息，
如果存在自动将 Cookie 信息也发送给服务端，服务端会从 Cookie 中获取 SessionID，
再根据 SessionID 查找对应的 Session 信息，如果没有找到说明用户没有登录或者登录失效，

如果找到 Session 证明用户已经登录可执行后面操作。
根据以上流程可知，SessionID 是连接 Cookie 和 Session 的一道桥梁，
大部分系统也是根据此原理来验证用户登录状态。

[Web 开发必须掌握的三个技术：Token、Cookie、Session](https://zhuanlan.zhihu.com/p/171787680)
### Cookie
### Session
### Token