import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai-preview';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => 
    initializeApp({
    "projectId":"appreclamos-1461c",
    "appId":"1:549341050430:web:423f863d5d0b472bd0836f",
    "databaseURL":"https://appreclamos-1461c-default-rtdb.firebaseio.com",
    "storageBucket":"appreclamos-1461c.appspot.com",
    "apiKey":"AIzaSyCyXmUTEPhyS0JAxlkIgIE-dkg-AR3zOZU",
    "authDomain":"appreclamos-1461c.firebaseapp.com",
    "messagingSenderId":"549341050430",
    "measurementId":"G-RY3S9VBVLF"})), 
    provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), 
    provideFunctions(() => getFunctions()), provideMessaging(() => getMessaging()), 
    providePerformance(() => getPerformance()), provideStorage(() => getStorage()), 
    provideRemoteConfig(() => getRemoteConfig()), provideVertexAI(() => getVertexAI())],
  bootstrap: [AppComponent],
})
export class AppModule {}
