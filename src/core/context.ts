import { Container } from "inversify"
import { AppCtxNotInitializedError } from "./errors/app-ctx-not-ini.error"
import { ConnectionOptions } from "bullmq"

class AppContext {
  private container: Container | null = null
  private connection: ConnectionOptions | null = null

  initContext(container: Container, connection: ConnectionOptions) {
    this.container = container
    this.connection = connection
  }

  getContainer() {
    if (!this.container) {
      throw new AppCtxNotInitializedError('No context found for this app')
    }
    return this.container
  }

  getConnectionOpts() {
    if (!this.connection) {
      throw new AppCtxNotInitializedError('No context found for this app')
    }
    return this.connection
  }
}

export const context = new AppContext()
