import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Murid } from './model/murid';

@Injectable({
    providedIn: 'root'
})
export class MuridService {

    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    getAllMurid(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/murid/findAll`)
            .pipe(
                catchError(error => {
                    console.error('Get all murid error:', error);
                    throw error;
                })
            );
    }

    getMuridById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/murid/findById/${id}`)
            .pipe(
                catchError(error => {
                    console.error('Get murid by id error:', error);
                    throw error;
                })
            );
    }

    addMurid(data: Murid): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/murid/addNew`, data, { responseType: 'text' as 'json' })
            .pipe(
                catchError(error => {
                    console.error('Add murid error:', error);
                    throw error;
                })
            );
    }

    updateMurid(id: number, data: Murid): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/murid/update/${id}`, data, { responseType: 'text' as 'json' })
            .pipe(
                catchError(error => {
                    console.error('Update murid error:', error);
                    throw error;
                })
            );
    }

    deleteMurid(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/murid/delete/${id}`, { responseType: 'text' as 'json' })
            .pipe(
                catchError(error => {
                    console.error('Delete murid error:', error);
                    throw error;
                })
            );
    }
}