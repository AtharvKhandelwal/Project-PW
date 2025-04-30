import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../user.service'; // Adjust path if different

@Component({
  selector: 'app-convert-word-to-pdf',
  imports: [CommonModule],
  templateUrl: './convert-word-to-pdf.component.html',
  styleUrl: './convert-word-to-pdf.component.css'
})
export class ConvertWORDToPDFComponent {
  selectedFile: File | null = null;
  loading = false;
  errorMessage: string | null = null;
  pdfFileUrl: string | null = null; // To store the PDF file URL
  pdfFileName: string | null = null; // To store the PDF file name
  

  constructor(private userService: UserService) {}

  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.errorMessage = null;
    }
  }

  convertWordToPdf(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a Word file.';
      return;
    }

    this.loading = true;

    this.userService.convertWordToPdf(this.selectedFile).subscribe({
      next: (response) => {
        // Handle the successful conversion (response is the Blob)
        const blob = response;
        this.pdfFileUrl = window.URL.createObjectURL(blob);
        this.pdfFileName = 'converted.pdf'; // You can change this based on your preference (e.g., dynamically generate it)
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = 'converted.pdf';
        // a.click();
        // window.URL.revokeObjectURL(url);
        this.loading = false;
      },
      error: (err) => {
        // Handle error properly
        if (err.error instanceof Blob) {
          this.errorMessage = 'Error converting file. Please try again.';
        } else {
          this.errorMessage = 'Conversion failed. ' + (err.message || 'Unknown error');
        }
        this.loading = false;
      }
    });
  }

}
