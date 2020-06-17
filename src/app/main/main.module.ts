
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { AngularMaterialModule } from '@angular-material/angular-material.module';


import { HeaderComponent } from '@main/header/header.component';
import { InfoPaisComponent } from '@main/info-pais/info-pais.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({

    imports: [
        CommonModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        HeaderComponent,
        InfoPaisComponent
    ],
    exports: [
        HeaderComponent,
        InfoPaisComponent
    ]

})

export class MainModule {}

