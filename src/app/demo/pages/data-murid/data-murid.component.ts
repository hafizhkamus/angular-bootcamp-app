import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPagination, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { MuridService } from '../../../services/murid.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-data-murid',
    standalone: true,
    imports: [CommonModule, FormsModule, NgbPagination, CardComponent],
    templateUrl: './data-murid.component.html',
    styleUrls: ['./data-murid.component.scss']
})
export class DataMuridComponent implements OnInit {
    private modalService = inject(NgbModal);
    private muridService = inject(MuridService);
    private http = inject(HttpClient);
    private toastr = inject(ToastrService);

    cdr = inject(ChangeDetectorRef);

    page = 1;
    pageSize = 5;
    totalItems = 0;
    allStudents: any[] = [];
    students: any[] = [];
    searchTerm: string = '';

    kelasList: any[] = [];
    isEditMode = false;
    selectedStudentId: number | null = null;

    formData = {
        nama: '',
        idKelas: null as number | null,
        umur: null as number | null
    };

    alertMessage: string = '';
    alertType: 'success' | 'danger' | '' = '';



    ngOnInit(): void {
        this.loadKelas();
        this.loadMurid();
    }

    loadMurid() {
        this.muridService.getAllMurid().subscribe({
            next: (res) => {
                this.allStudents = res;
                this.totalItems = this.allStudents.length;
                this.refreshStudents();
            },
            error: (err) => {
                console.error('Failed to load students', err);
            }
        });
    }

    loadKelas() {
        this.http.get<any[]>(`${environment.apiUrl}/kelas/findAll`).subscribe({
            next: (res) => {
                this.kelasList = res;
            },
            error: (err) => {
                console.error('Failed to load kelas', err);
            }
        });
    }

    refreshStudents() {
        let filteredStudents = this.allStudents;

        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            filteredStudents = this.allStudents.filter((student) =>
                (student.nama && student.nama.toLowerCase().includes(term)) ||
                (student.namaKelas && student.namaKelas.toLowerCase().includes(term)) ||
                (student.umur && student.umur.toString().toLowerCase().includes(term))
            );
        }

        this.totalItems = filteredStudents.length;
        this.students = filteredStudents.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        this.cdr.detectChanges();
    }

    onSearchChange() {
        this.page = 1;
        this.refreshStudents();
    }

    getMin(a: number, b: number) {
        return Math.min(a, b);
    }

    openAddModal(content: any) {
        this.isEditMode = false;
        this.selectedStudentId = null;
        this.formData = { nama: '', idKelas: null, umur: null };
        this.alertMessage = '';
        this.alertType = '';
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    openEditModal(student: any, content: any) {
        this.isEditMode = true;
        this.selectedStudentId = student.id;

        this.muridService.getMuridById(this.selectedStudentId).subscribe({
            next: (res) => {
                this.formData = {
                    nama: res.nama,
                    idKelas: res.idKelas,
                    umur: res.umur
                }

                this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('Failed to load student', err);
            }
        });
    }

    saveStudent(modal: any) {
        if (!this.formData.nama || !this.formData.idKelas || !this.formData.umur) {
            this.alertMessage = 'Semua field harus diisi!';
            this.alertType = 'danger';
            return;
        }

        const payload = {
            nama: this.formData.nama,
            idKelas: Number(this.formData.idKelas),
            umur: Number(this.formData.umur)
        };

        if (this.isEditMode && this.selectedStudentId !== null) {
            this.muridService.updateMurid(this.selectedStudentId, payload).subscribe({
                next: () => {
                    this.toastr.success('Murid berhasil diupdate!', 'Success');
                    modal.close();
                    this.loadMurid();
                },
                error: (err) => {
                    this.alertMessage = 'Gagal mengupdate murid: ' + (err.error || err.message);
                    this.alertType = 'danger';
                }
            });
        } else {
            this.muridService.addMurid(payload).subscribe({
                next: () => {
                    this.toastr.success('Murid berhasil ditambahkan!', 'Success');
                    modal.close();
                    this.loadMurid();
                },
                error: (err) => {
                    this.alertMessage = 'Gagal menambahkan murid: ' + (err.error || err.message);
                    this.alertType = 'danger';
                }
            });
        }
    }

    deleteStudent(id: number) {
        if (!confirm('Yakin ingin menghapus murid ini?')) return;

        this.muridService.deleteMurid(id).subscribe({
            next: () => {
                this.loadMurid();
            },
            error: (err) => {
                console.error('Failed to delete student', err);
                alert('Gagal menghapus murid.');
            }
        });
    }
}
