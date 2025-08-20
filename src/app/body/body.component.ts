import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../models/user.model'; 
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageModalComponent } from '../message-modal/message-modal.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  users: User[] = [
    { id: 1, nom: 'Alice', prenoms : 'alexia', contact: '0700000001', role: 'Consultant', email: 'alice@example.com'},
    { id: 2, nom: 'Bob', prenoms : 'moctar', contact: '0700000002', role: 'Consultant', email: 'bob@example.com'},
    { id: 3, nom: 'Charlie', prenoms : 'chaplin', contact: '0700000003', role: 'Consultant', email: 'charlie@example.com'}
  ];

  selectedUser: User | null = null;

  userForm = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
    prenoms: new FormControl('', [Validators.required, Validators.minLength(3)]),
    contact: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    role: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email,]),

  });

  constructor(private modalService: NgbModal) {}

  private openMessage(title: string ) {
    const modalRef = this.modalService.open(MessageModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.title = title;
  }

  openModalAdd(content: any) {
		this.modalService.open(content, { centered: true, size: 'lg' },);
  } 

  openModalDelete(content: any, user : User) {
    this.selectedUser = user;
		this.modalService.open(content, { centered: true, size: 'lg' });
	}

  openModalEdit(content: any, user : User) {
    this.selectedUser = user;
		this.modalService.open(content, { centered: true, size: 'lg' });
	}


  onSubmit(modal: any): void {

    const newUser: User = {
      id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1, 
      nom: this.userForm.value.nom!,
      prenoms: this.userForm.value.prenoms!,
      contact: this.userForm.value.contact!,
      role: this.userForm.value.role!,
      email: this.userForm.value.email!,
    };

    this.users.push(newUser); 
    this.userForm.reset();
    modal.close();

    this.openMessage('Utilisateur créer avec succès');
  }

   deleteUser(modal: any) {
      this.users = this.users.filter(u => u.id !== this.selectedUser!.id);
      modal.close(); 

    this.openMessage('Utilisateur supprimer avec succès ');
  }

  

 


 




    
  
  
}
