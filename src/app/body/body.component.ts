import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../models/user.model'; 
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageModalComponent } from '../message-modal/message-modal.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  page = 1;
  pageSize = 2;         
  
  
  searchControl = new FormControl('');

  get paginatedUsers(): User[] {
    const searchText = this.searchControl.value?.toLowerCase() || '';

    const filtered = this.users.filter(u =>
      u.nom.toLowerCase().includes(searchText) ||
      u.prenoms.toLowerCase().includes(searchText) ||
      u.email.toLowerCase().includes(searchText) ||
      u.contact.includes(searchText) ||
      u.role.toLowerCase().includes(searchText)
    );

    const start = (this.page - 1) * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }

  get collectionSize(): number {
    const searchText = this.searchControl.value?.toLowerCase() || '';
    return this.users.filter(u =>
      u.nom.toLowerCase().includes(searchText) ||
      u.prenoms.toLowerCase().includes(searchText) ||
      u.email.toLowerCase().includes(searchText) ||
      u.contact.includes(searchText) ||
      u.role.toLowerCase().includes(searchText)
    ).length;
  }



  users: User[] = [
    { id: 1, nom: 'Alice', prenoms : 'alexia', contact: '0700000001', role: 'Consultant', email: 'alice@example.com'},
    { id: 2, nom: 'Bob', prenoms : 'moctar', contact: '0700000002', role: 'Consultant', email: 'bob@example.com'},
    { id: 3, nom: 'Charlie', prenoms : 'chaplin', contact: '0700000003', role: 'Consultant', email: 'charlie@example.com'}
  ];

  selectedUser: User | null = null;

  userForm = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
    prenoms: new FormControl('', [Validators.required, Validators.minLength(3)]),
    contact: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    role: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email,]),
  });

  constructor(private modalService: NgbModal) {}

  //modal message  
  private openMessage(title: string ) {
    const modalRef = this.modalService.open(MessageModalComponent, { centered: true });
    modalRef.componentInstance.title = title;
  }

  //Fermer et Reset modal
  onCloseModal(modal: any) {
    this.userForm.reset();  
    modal.close('Fermer'); 
  }

 // modal ajouter et mmodifier user
  openModalUser(content: any, user?: User) {
    if (user) {
      this.selectedUser = user;
      this.userForm.patchValue({
        nom: user.nom,
        prenoms: user.prenoms,
        contact: user.contact,
        role: user.role,
        email: user.email
      });
    } 
    
    else {
      this.selectedUser = null;
      this.userForm.reset();
    }

    this.modalService.open(content, { centered: true, size: 'lg' });
  }


  //modal supprimer user
  openModalDelete(content: any, user : User) {
    this.selectedUser = user;
		this.modalService.open(content, { centered: true});
	}


  submitUser(modal: any) {
    if (this.userForm.invalid) return;

    if (this.selectedUser) {

      this.selectedUser.nom = this.userForm.value.nom!;
      this.selectedUser.prenoms = this.userForm.value.prenoms!;
      this.selectedUser.contact = this.userForm.value.contact!;
      this.selectedUser.role = this.userForm.value.role!;
      this.selectedUser.email = this.userForm.value.email!;
      
      this.openMessage('Utilisateur modifié avec succès');
    } 
    
    else {
      const newUser: User = {
        id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
        nom: this.userForm.value.nom!,
        prenoms: this.userForm.value.prenoms!,
        contact: this.userForm.value.contact!,
        role: this.userForm.value.role!,
        email: this.userForm.value.email!
      };

      this.users.unshift(newUser);
      this.openMessage('Utilisateur créé avec succès');
    }

    modal.close();
    this.userForm.reset();
  }


   deleteUser(modal: any) {
      this.users = this.users.filter(u => u.id !== this.selectedUser!.id);
      modal.close(); 

      this.openMessage('Utilisateur supprimer avec succès ');
    }



  

 


 




    
  
  
}
