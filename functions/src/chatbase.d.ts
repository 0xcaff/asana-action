declare module "@google/chatbase" {
  class MessageSink {
    setMessage(message: string): this;
    setUserId(userId: string): this;
    setPlatform(platform: string): this;
    setAsTypeUser(): this;
    setAsTypeAgent(): this;
    setVersion(version: string): this;
    setIntent(intent: string): this;
    setCustomSessionId(id: string): this;
  }

  class MessageStateSink extends MessageSink {
    setAsHandled(): this;
    setAsNotHandled(): this;
    setAsFeedback(): this;
    setAsNotFeedback(): this;
  }

  class MessageStateWrapper extends MessageStateSink {}

  class MessageFactory {
    setApiKey(key: string): this;
    setUserId(userId: string): this;
    setPlatform(platform: string): this;
    setAsTypeUser(): this;
    setAsTypeAgent(): this;
    setVersion(version: string): this;
    setIntent(intent: string): this;
    setCustomSessionId(id: string): this;
    setClientTimeout(timeout: number): this;
    newMessage(): MessageStateWrapper;
  }

  class MessageSet extends MessageFactory {
    sendMessageSet(): Promise<this>;
  }

  class ApplicationInterface extends MessageFactory {
    newMessageSet(): MessageSet;
  }

  const instance: ApplicationInterface;

  export = instance;
}
