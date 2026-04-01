// angular import
import { Component } from '@angular/core';

// project import
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { TrainingDetailPageComponent } from '../training-detail-page/training-detail-page.component';

@Component({
    selector: 'app-training-page',
    imports: [CardComponent, TrainingDetailPageComponent],
    templateUrl: './training-page.component.html',
    styleUrls: ['./training-page.component.scss']
})
export class TrainingPageComponent { }
