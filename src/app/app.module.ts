import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/login/login.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { HttpClientModule} from '@angular/common/http';
import { FirestoreModule } from '@angular/fire/firestore';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { MainComponent } from './component/main/main.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { NavigationComponent } from './component/navigation/navigation.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GroupComponent } from './component/group/group.component';
import { DetailComponent } from './component/detail/detail.component'
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NavigationComponent,
    GroupComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule ,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    FirestoreModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    AngularEditorModule
  ],
  providers: [DatePipe, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
