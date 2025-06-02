import { DynamicModule, Inject, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../../../../firebase-service-account.json';
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
          useFactory: () => {
            const adminApp = admin.initializeApp({
              credential: admin.credential.cert(
                serviceAccount as admin.ServiceAccount,
              ),
            });
            return adminApp.firestore();
          },
        },
      ],
      exports: [FIRESTORE_CONFIG],
      global: true,
    };
  }
}
