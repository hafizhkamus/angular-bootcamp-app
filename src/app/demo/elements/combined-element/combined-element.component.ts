// angular import
import { Component } from '@angular/core';

// project import
import { TypographyComponent } from '../typography/typography.component';
import { ElementColorComponent } from '../element-color/element-color.component';

@Component({
  selector: 'app-combined-element',
  imports: [TypographyComponent, ElementColorComponent],
  templateUrl: './combined-element.component.html',
  styleUrls: ['./combined-element.component.scss']
})
export class CombinedElementComponent {}
