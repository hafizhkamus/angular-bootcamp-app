// angular import
import { Component } from '@angular/core';

// third-party import
import { ToastrService } from 'ngx-toastr';

// project import
import { CardComponent } from '../../../theme/shared/components/card/card.component';

@Component({
    selector: 'app-training-detail-page',
    imports: [CardComponent],
    templateUrl: './training-detail-page.component.html',
    styleUrls: ['./training-detail-page.component.scss']
})
export class TrainingDetailPageComponent {
    constructor(private toastr: ToastrService) { }

    showSuccess(): void {
        this.toastr.success('Operation completed successfully!', 'Success');
    }

    showError(): void {
        this.toastr.error('Something went wrong!', 'Error');
    }

    showWarning(): void {
        this.toastr.warning('Please check your input.', 'Warning');
    }

    showInfo(): void {
        this.toastr.info('Here is some useful information.', 'Info');
    }

    showCustom(): void {
        this.toastr.success('This toast will stay longer!', 'Custom', {
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-bottom-right'
        });
    }
}
