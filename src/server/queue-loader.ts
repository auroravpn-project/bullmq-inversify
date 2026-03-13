import { Job, Queue, QueueEvents, RedisConnection, Worker } from "bullmq"
import { context } from "../core/context"
import { resolve } from "../core/resolver"
import { JobMetadata, QueueMetadata } from "../metadata/metadata"
import { storage } from "../metadata/storage"
import { addQueue, addWorker } from "./bullmq-instance"

export function loadQueue() {
  storage.metadata.each<QueueMetadata>((val) => {
    const queue = new Queue(
      val.queueName,
      { connection: context.getConnectionOpts() }
    )
    val.each<JobMetadata>((item) => {
      item.jobOption ?
        queue.add(item.jobName, {}, item.jobOption) :
        queue.add(item.jobName, {})
    })
    const worker = new Worker(val.queueName, async (job: Job) => {
      val.each<JobMetadata>((item) => {
        if (item.jobName === job.name) {
          resolve(val.target)[item.propertyName]()
        }
      })
    }, { connection: context.getConnectionOpts() })
    addQueue(queue)
    addWorker(worker)
  })
}
