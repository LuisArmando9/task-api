import { DynamicModule, Inject, Logger, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { InvalidFirebaseServiceAccountException } from './excepcion/firebase-service-account.exception';
export const FIRESTORE_CONFIG = 'FIRESTORE_CONFIG';
export const InjectDatabase = () => Inject(FIRESTORE_CONFIG);
@Module({})
export class FirestoreConfigDbModule {
  static forRoot(): DynamicModule {
    return {
      module: FirestoreConfigDbModule,
      providers: [
        {
          provide: FIRESTORE_CONFIG,
          useFactory: (configService: ConfigService) => {
            let serviceAccountKey = configService.get<string>('FIREBASE_SERVICE_ACCOUNT');
            if (!serviceAccountKey) {
              throw new InvalidFirebaseServiceAccountException();
            }
            const serviceAccount = JSON.parse(serviceAccountKey);
            serviceAccount.private_key = serviceAccount.private_key?.replace(/\\n/g, '\n');
            const adminApp = admin.initializeApp({
              credential: admin.credential.cert(
                serviceAccount,
              ),
            });
            return adminApp.firestore();
          },
          inject: [ConfigService],
        },
      ],
      exports: [FIRESTORE_CONFIG],
      global: true,
    };
  }
}
