import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { AaaaSharedModule } from 'app/shared/shared.module';
import { AaaaCoreModule } from 'app/core/core.module';
import { AaaaAppRoutingModule } from './app-routing.module';
import { AaaaHomeModule } from './home/home.module';
import { AaaaEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    AaaaSharedModule,
    AaaaCoreModule,
    AaaaHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AaaaEntityModule,
    AaaaAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class AaaaAppModule {}
