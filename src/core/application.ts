import { context } from "./context"
import { Container } from "inversify"
import { loadQueue } from "../server/queue-loader"
import { ConnectionOptions } from "bullmq"

export class InversifyBullmq {
  constructor(container: Container, connection: ConnectionOptions) {
    context.initContext(container, connection)
  }

  start() {
    loadQueue()
  }
}
