# API

## 获取IP地址

- `https://www.404z.cn/api/ip` : `获取IP地址`
  - 响应
    - `ip`(string) : `IP地址`
  - 示例
    - `获取IP地址` : <https://www.404z.cn/api/ip>

## GitHub

- `https://www.404z.cn/api/github/contribution/[userName]` : `获取用户贡献`
  - 请求参数
    - `userName`(string) : `用户名`
    - `year`(string)(可选) : `年`
  - 响应
    - `[]`([2])
      - `[0]`([4])
        - `[0]`(number) : `起始年`
        - `[1]`(number) : `起始月`
        - `[2]`(number) : `起始日`
        - `[3]`(number) : `总贡献`
      - `[1]`([53]) : `年`(一年固定53周)
        - `[]`([1-7]) : `周`(第一周和最后一周可能不满7日，其他周固定7日)
          - `[]`([2]) : `日`
            - `[0]`(number) : `贡献级别`
            - `[1]`(number) : `贡献`
  - 示例
    - `获取用户ali1416的贡献` : <https://www.404z.cn/api/github/contribution/ali1416>

## 二维码

- `https://www.404z.cn/api/qrcode/[path]` : `编码二维码`
  - 请求参数
    - `path`(string) : `路径`
      - `encoder` : `返回JSON字符串`
      - `encoder.svg` : `返回SVG图片`
    - `content`(string) : `内容`
    - `level`(number)(可选)(默认`0`) : `纠错等级`
      - `0` : `L 7%`
      - `1` : `M 15%`
      - `2` : `Q 25%`
      - `3` : `H 30%`
    - `mode`(number)(可选)(默认`自动探测`) : `编码模式`
      - `0` : `NUMERIC 数字0-9`
      - `1` : `ALPHANUMERIC 数字0-9、大写字母A-Z、符号(空格)$%*+-./:`
      - `2` : `BYTE(ISO-8859-1)`
      - `3` : `BYTE(UTF-8)`
    - `versionNumber`(number)(可选)(默认`最小版本`) : `版本号`
      - `[1,40]`
    - `pixelSize`(number)(可选)(默认`10`) : `像素尺寸`
      - `仅当path为encoder.svg时生效`
  - 响应(`JSON字符串`)
    - `[]`([2])
      - `[0]`([3])
        - `[0]`(number) : `纠错等级`
        - `[1]`(number) : `编码模式`
        - `[2]`(number) : `版本号`
      - `[1]`([][]:boolean) : `矩阵`(二维方阵 长度=(版本号-1)*4+21)
        - `true` : `黑色`
        - `false` : `白色`
  - 响应(`SVG图片`)
    - `SVG`
  - 示例
    - `编码1234😀，获取JSON字符串` : <https://www.404z.cn/api/qrcode/encoder?content=1234😀>
    - `编码1234😀，纠错等级：3，获取SVG图片` : <https://www.404z.cn/api/qrcode/encoder.svg?content=1234😀&level=3>

## GitHub贡献图动画

- `https://www.404z.cn/api/snk/generate/[path]` : `生成GitHub贡献图动画`
  - 请求参数
    - `path`(string) : `路径`
      - `[userName]` : `返回JSON字符串`
      - `[userName].svg` : `返回SVG图片 主题模式：混合`
      - `[userName].light.svg` : `返回SVG图片 主题模式：亮`
      - `[userName].dark.svg` : `返回SVG图片 主题模式：暗`
    - `userName`(string) : `用户名`
    - `year`(string)(可选) : `年`
  - 响应(`JSON字符串`)
    - `[]`([3])
      - `[0]`(string) : `混合`
      - `[1]`(string) : `亮`
      - `[2]`(string) : `暗`
  - 响应(`SVG图片`)
    - `SVG`
  - 示例
    - `指定用户ali1416，获取JSON字符串` : <https://www.404z.cn/api/snk/generate/ali1416>
    - `指定用户ali1416，主题模式：混合，获取SVG图片` : <https://www.404z.cn/api/snk/generate/ali1416.svg>
    - `指定用户ali1416，主题模式：暗，年：2021，获取SVG图片` : <https://www.404z.cn/api/snk/generate/ali1416.dark.svg?year=2021>

## WebSocket演示

- 网站 <https://web.404z.cn/ws/>

## 获取用户信息

- `https://web.404z.cn/` : `获取用户信息`
  - 响应
    - `id`(long) : `ID`
    - `createTime`(string) : `创建时间`
    - `uri`(string) : `URI`
    - `method`(string) : `请求方法`
    - `ip`(string) : `IP地址`
    - `ipInfo` : `IP地址详情`
      - `country`(string) : `国家`
      - `province`(string) : `省份`
      - `city`(string) : `城市`
      - `isp`(string) : `ISP`
    - `userAgent` : `UserAgent`
    - `userAgentInfo`(string) : `UserAgent详情`
      - `engine`(string) : `引擎`
      - `engineVersion`(string) : `引擎版本号`
      - `browser`(string) : `浏览器`
      - `browserVersion`(string) : `浏览器版本号`
      - `os`(string) : `操作系统`
      - `osVersion`(string) : `操作系统版本号`
      - `platform`(string) : `平台`
      - `isMobile`(boolean) : `是移动端`
  - 示例
    - `获取用户信息` : <https://web.404z.cn/>

## IP地址转区域

- `/api/ip2region/[ip]` : `IP地址转区域`
  - 请求参数
    - `ip`(string) : `IP地址`
  - 响应
    - `country`(string) : `国家`
    - `province`(string) : `省份`
    - `city`(string) : `城市`
    - `isp`(string) : `ISP`
  - 示例
    - `获取IP地址123.132.0.0的区域` : <https://web.404z.cn/api/ip2region/123.132.0.0>

## 手机号码转区域

- `/api/phone2region/[phone]` : `手机号码转区域`
  - 请求参数
    - `phone`(string) : `手机号码`
  - 响应
    - `province`(string) : `省份`
    - `city`(string) : `城市`
    - `zipCode`(string) : `邮编`
    - `areaCode`(string) : `区号`
    - `isp`(string) : `ISP`
  - 示例
    - `获取手机号码18754710000的区域` : <https://web.404z.cn/api/phone2region/18754710000>
