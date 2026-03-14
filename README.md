# Bullmq-Inversify

### Table of Contents

- [Installation](#Installation)
- [Quickstart](#Quickstart)
- [API references](#API-references)
  - [Constructor](#Constructor)
  - [Instance methods](#Instance-methods)
  - [Decorators](#Decorators)

### Installation

```bash
npm install @auroravpn/bullmq-inversify
yarn add @auroravpn/bullmq-inversify
pnpm add @auroravpn/bullmq-inversify
```

### Quickstart

> ⚠️ **警告：** 本项目必须使用 Typescript 并启用装饰器选项

```typescript
// 导入包
import { Container } from 'inversify'
import { InversifyBullmq, Job, Queue } from '../../src/index'
import Redis from 'ioredis'

@Queue('test')
class TestScheduler {
  @Job('log', { repeat: { every: 1000 } })
  public test() {
    console.log('test')
  }
}

// 创建inversify容器
const container = new Container()

// 绑定类
container.bind(TestScheduler).toSelf()

// 创建Redis连接对象
const connection = new Redis({
  host: 'localhost',
  port: 6379,
  db: 3,
  maxRetriesPerRequest: null
})

// 创建InversifyBullmq实例
const app = new InversifyBullmq(container, connection)

// 启动InversifyBullmq实例
app.start()
```

### API references

#### Constructor

##### `new InversifyBullmq(container, connection)`

**参数**

- `container` `Inversify.container` **必填, **容器实例
- `connection` `Redis` **必填, **`Redis`连接对象

**返回值** `void`

**示例**

```typescript
const container = new Container()

const connection = new Redis({
  maxRetriesPerRequest: null
})

const app = new InversifyBullmq(container, connection)
```



#### Instance methods

##### `InversifyBullmq.start()`

**返回值** `void`

**示例**

```typescript
app.start()
```



#### Decorators

##### `Queue(queueName)`

**参数**

- `queueName` `string` **必填, **队列名称`

**示例**

```typescript
@Queue('test')
class TestScheduler {
}
```



##### `Job(jobName, [jobOption])`

**参数**

- `jobName` `string` **必填, **任务名称

**示例**

```typescript
@Queue('test')
class TestScheduler {
  @Job('log', { repeat: { every: 1000 } })
  public test() {
    console.log('test')
  }
}
```

