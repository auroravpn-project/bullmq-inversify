import { Container } from 'inversify'
import { InversifyBullmq, Job, Queue } from '../../src/index'

@Queue('test')
class TestScheduler {
  @Job('log')
  public test() {
    console.log('test')
  }
}

const container = new Container()
container.bind(TestScheduler).toSelf()

const app = new InversifyBullmq(container, {
  host: 'localhost',
  port: 6379,
  db: 0,
  maxRetriesPerRequest: null
})

app.start()

