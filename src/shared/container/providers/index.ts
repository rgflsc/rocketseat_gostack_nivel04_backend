import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProviders/implementatios/DiskStorageProvider';

import IMailProvider from '@shared/container/providers/MailProviders/models/IMailProvider';
import EtherealMailProvider from '@shared/container/providers/MailProviders/implementations/EtherealMailProvider';
import SESMailProvider from '@shared/container/providers/MailProviders/implementations/SESMailProvider';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethereal' ? container.resolve(EtherealMailProvider) : container.resolve(SESMailProvider),
);
