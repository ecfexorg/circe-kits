# circe-config 读取目录配置文件

## 安装

[![NPM](https://nodei.co/npm/circe-config.png?downloads=true)](https://nodei.co/npm/circe-config/)

## 使用

```typescript
import * as Config from 'circe-config'

// 读取当前目录下的 default 文件或目录，作为基础配置文件
// 根据环境变量读取 NODE_ENV 或 development 文件，覆盖到 default 配置
// 返回最终的配置文件对象
export default Config.from<any>(__dirname)
```

## API

### function from <T = any> (dir: string): T
