import IMailProvider from '@shared/container/providers/MailProviders/models/IMailProvider';
import ISendMailDTO from '@shared/container/providers/MailProviders/dtos/ISendMailDTO';

class FakeMailProvider implements IMailProvider {
  private message: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.message.push(message)
  };
}

export default FakeMailProvider;
