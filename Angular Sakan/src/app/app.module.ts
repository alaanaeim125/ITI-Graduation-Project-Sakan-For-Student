import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, /* other http imports */ } from "@angular/common/http";
import { SearchComponent } from './layout/search/search.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { ShowPostComponent } from './layout/user/show-post/show-post.component';
import { RegisterUserComponent } from './layout/user/register-user/register-user.component';
import { LoginUserComponent } from '../app/layout/user/login-user/login-user.component'
import { LoginAdminComponent } from './layout/admin/login-admin/login-admin.component';
import { AdminPageComponent } from './layout/admin/admin-page/admin-page.component';
import { ViewOwnerComponent } from './layout/user/view-owner/view-owner.component';
import { ViewPostComponent } from './layout/admin/view-post/view-post.component';
import { ViewStudentComponent } from './layout/user/view-student/view-student.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { PostComponent } from './layout/user/post/post.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { LogoutUserComponent } from './layout/user/logout-user/logout-user.component';
import { ViewStudentAdminComponent } from './layout/admin/view-student-admin/view-student-admin.component';
import { ViewOwnerAdminComponent } from './layout/admin/view-owner-admin/view-owner-admin.component';
import { ViewPostAdminComponent } from './layout/admin/view-post-admin/view-post-admin.component';
import { AdminComponent } from './layout/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './auth/auth-guard';
import { UserComponent } from './layout/user/user.component';
import { AuthGuardAdmin } from './auth/auth-guard-admin';
import { LogoutAdminComponent } from './layout/admin/logout-admin/logout-admin.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { FooterComponent } from './layout/footer/footer.component';
import { ContactUsComponent } from './layout/contact-us/contact-us.component';
import { EditStudentComponent } from './layout/user/edit-student/edit-student.component';
import { EditOwnerComponent } from './layout/user/edit-owner/edit-owner.component';
import { EditPostComponent } from './layout/user/edit-post/edit-post.component';
import { AboutUsComponent } from './layout/about-us/about-us.component';
 


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search',component: SearchComponent },
  { path: 'loginAdmin',component: LoginAdminComponent },
  { 
    path: 'admin',component: AdminComponent,canActivate:([AuthGuardAdmin]) ,
    children: [
      {
        path:  'adminPage',
        component:  AdminPageComponent,canActivate:([AuthGuardAdmin])
      }
     ,
     {
      path:  'viewStudentAdmin/:id',
      component:  ViewStudentAdminComponent,canActivate:([AuthGuardAdmin])
     }
     ,
     {
        path:  'viewOwnerAdmin/:id',
        component:  ViewOwnerAdminComponent,canActivate:([AuthGuardAdmin])
     }
     ,
     {
        path:  'viewPostAdmin/:id',
        component:  ViewPostAdminComponent,canActivate:([AuthGuardAdmin])
     },
     {
      path:  'viewPostAdminFromSearch/:id',
      component:  ViewPostComponent,canActivate:([AuthGuardAdmin])
     }
    ]
   },
  { path:'logoutAdmin' , component:LogoutAdminComponent,canActivate:([AuthGuardAdmin])},

  
  { path: 'registerUser',component: RegisterUserComponent },
  { path: 'loginUser',component: LoginUserComponent },
  { path: 'showPost/:id',component: ShowPostComponent,canActivate:[AuthGuard] },
  { path: 'viewStudent/:id',component: ViewStudentComponent ,canActivate:[AuthGuard]},
  { path: 'editStudent/:id',component: EditStudentComponent ,canActivate:[AuthGuard]},
  { path: 'viewOwner/:id',component: ViewOwnerComponent ,canActivate:[AuthGuard] },
  { path: 'editOwner/:id',component: EditOwnerComponent ,canActivate:[AuthGuard]},
  { path: 'viewPost/:id',component: ViewPostComponent ,canActivate:[AuthGuard]},
  { path: 'editPost/:id',component: EditPostComponent ,canActivate:[AuthGuard]},
  { path: 'post',component: PostComponent ,canActivate:[AuthGuard]},
  { path: 'logoutUser',component: LogoutUserComponent ,canActivate:[AuthGuard]},
  { path: 'contactUs' ,component:ContactUsComponent},
  { path: 'aboutUs' ,component:AboutUsComponent},
  { path: 'notFound',component: NotFoundComponent },
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: '**',component: NotFoundComponent }


];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ShowPostComponent,
    RegisterUserComponent,
    LoginUserComponent,
    LoginAdminComponent,
    AdminPageComponent,
    ViewOwnerComponent,
    ViewPostComponent,
    ViewStudentComponent,
    NotFoundComponent,
    PostComponent,
    FileSelectDirective,
    LogoutUserComponent,
    ViewStudentAdminComponent,
    ViewOwnerAdminComponent,
    ViewPostAdminComponent,
    AdminComponent,
    UserComponent,
    LogoutAdminComponent,
    FooterComponent,
    ContactUsComponent,
    EditStudentComponent,
    EditOwnerComponent,
    EditPostComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" }),
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot() ,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})

    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
