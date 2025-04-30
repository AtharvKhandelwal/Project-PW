import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.service';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-convert-ppt-to-pdf',
  standalone: true,
  imports: [CommonModule,
            MatButtonModule,
            MatInputModule,
            MatProgressSpinnerModule,
            MatCardModule,
            MatIconModule,
            MatToolbarModule
          ],
  templateUrl: './convert-ppt-to-pdf.component.html',
  styleUrl: './convert-ppt-to-pdf.component.css'
})
export class ConvertPptToPdfComponent {
  selectedFile: File | null = null;
  loading = false;
  errorMessage: string | null = null;
  convertedFileUrl: string | null = null;
  convertedFileName: string | null = null;

  constructor(private userService: UserService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.errorMessage = null;
    }
  }

  convertPptToPdf(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a PowerPoint file.';
      return;
    }

    this.loading = true;

    this.userService.convertPptToPdf(this.selectedFile).subscribe({
      next: (response) => {
        const blob = response;
        this.convertedFileUrl = window.URL.createObjectURL(blob);
        this.convertedFileName = 'converted.pdf';
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Conversion failed. Please try again.';
        this.loading = false;
      }
    });
  }

  downloadConvertedFile(): void {
    if (this.convertedFileUrl && this.convertedFileName) {
      const a = document.createElement('a');
      a.href = this.convertedFileUrl;
      a.download = this.convertedFileName;
      a.click();
    }
  }
}
