import { EmailDialogComponent } from './../email-dialog/email-dialog.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../core/api/ApiService';
import { Email } from '../core/models/Email';
import { Provider } from '../core/models/Provider';

@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.scss']
})
export class EmailViewComponent implements OnInit, OnDestroy {

  emailList: Email[] = [];
  onDestroy = new Subject<void>();
  form: FormGroup;
  providerList: Provider[];
  editMode = false;

  constructor(private api: ApiService, private dialog: MatDialog) {
    this.providerList = Object.values(Provider);
    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required, Validators.email]),
      watchedFolder: new FormControl(null),
      provider: new FormControl(null),
      storeAttachments: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.refresh();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  refresh(): void {
    this.form.reset();
    this.api.email.getList().pipe(takeUntil(this.onDestroy)).subscribe(list => {
      this.emailList = list;
      this.editMode = false;
    });
  }

  onAddNew(): void {
    this.editMode = true;
  }

  onShow(id: string): void {
    const email = this.emailList.find(e => e.id === id) || null;
    if (!email) {
      this.refresh();
      return;
    }
    const dialogRef = this.dialog.open(EmailDialogComponent, {
      width: '250px',
      data: email,
    });
  }

  onEdit(id: string): void {
    this.editMode = true;
    const email = this.emailList.find(e => e.id === id);
    if (!email) {
      this.refresh();
      return;
    }
    this.form.patchValue(email);
  }

  onDelete(id: string): void {
    this.api.email.delete(id).pipe(takeUntil(this.onDestroy)).subscribe(() => this.refresh());
  }

  onSave(): void {
    if (this.form.invalid) return;
    const newEmail: Email = Object.assign({}, this.form.value);
    if (newEmail.storeAttachments === null) newEmail.storeAttachments = false;
    let obs;
    if (newEmail.id) {
      obs = this.api.email.update(newEmail.id, newEmail);
    } else {
      obs = this.api.email.create(newEmail);
    }
    obs.pipe(takeUntil(this.onDestroy)).subscribe(() => this.refresh());
  }
}
