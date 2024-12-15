import { Component, Inject,inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BBList } from '../interfaces/bblist';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ListsService } from '../services/lists.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HostListener } from '@angular/core';


@Component({
  selector: 'dialog-list-add',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  template: `
  <h1 mat-dialog-title class="list-dialog-title">Add List</h1>
  <section class="dlg-list-container">
    <form
      [formGroup]="addListForm"
      (ngSubmit)="submitList()"
      class="form-container"
    >
      <div class="metadata-container">
        <div class="metadata-item">
          <label for="id">ID</label>
          <input
            id="id"
            type="number"
            class="form-input"
            formControlName="id"
            readonly
          />
        </div>
        <div class="metadata-item">
          <label for="userId">User ID</label>
          <input
            id="userId"
            type="number"
            class="form-input"
            formControlName="userId"
            readonly
          />
        </div>
        <div class="metadata-item">
          <label for="boardId">Board ID</label>
          <input
            id="boardId"
            type="number"
            class="form-input"
            formControlName="boardId"
          />
        </div>
      </div>
  
      <div class="metadata-container">
        <div class="metadata-item-50">
          <label for="created">Created</label>
          <input
            id="created"
            type="datetime-local"
            class="form-input"
            formControlName="created"
            readonly
          />
        </div>
  
        <div class="metadata-item-50">
          <label for="updated">Updated</label>
          <input
            id="updated"
            type="datetime-local"
            class="form-input"
            formControlName="updated"
            readonly
          />
        </div>
      </div>
  
      <div class="metadata-container">
        <div class="metadata-item-100">
          <label for="title">Title</label>
          <input
            id="title"
            type="text"
            class="form-input dlg-input"
            formControlName="title"
          />
        </div>
  <!-- 
        <div class="metadata-item-100">
          <label for="description">Description</label>
          <textarea
            id="description"
            class="form-input"
            formControlName="description"
            #description
          ></textarea>
        </div>
        </div>-->
      </div> 
  
      <div class="metadata-container">
        <div class="metadata-item">
          <label for="color">Color</label>
   
          <select name="color" id="color" class="form-input" formControlName="color">
            <option style="color: blueviolet;" value="blueviolet">blueviolet</option>
            <option style="color: green;" value="green">green</option>
            <option style="color: blue;" value="blue">blue</option>
            <option style="color: red;" value="red">red</option>
            <option style="color: yellow;background:lightgray;" value="yellow">yellow</option>
            <option style="color: black;" value="black">black</option>
            <option style="color: white;background:lightgray;" value="white">white</option>
          </select>

        </div>
  
        <div class="metadata-item">
          <label for="type">Type</label>
          <input
            id="type"
            type="text"
            class="form-input"
            formControlName="type"
          />
        </div>
  
        <div class="metadata-item">
          <label for="position">Position</label>
          <input
            id="position"
            type="number"
            class="form-input"
            formControlName="position"
          />
        </div>
      </div>
      <div class="metadata-item">
          <label for="position">Create 1 cards</label>
          <input type="checkbox" id="createCards1" name="createCards1" value=""style="width: inherit;"
          class="form-input"
            formControlName="createCards1"
          />
        </div>
      <div class="metadata-item">
          <label for="position">Create 5 cards</label>
          <input type="checkbox" id="createCards5" name="createCards5" value=""style="width: inherit;"
          class="form-input"
            formControlName="createCards5"
          />
        </div>
      <div class="metadata-item">
          <label for="position">Create 10 cards</label>
          <input type="checkbox" id="createCards10" name="createCards10" value=""style="width: inherit;"
          class="form-input"
            formControlName="createCards10"
          />
        </div>
        <div class="metadata-item">
          <label for="position">Create 20 cards</label>
          <input type="checkbox" id="createCards20" name="createCards20" value=""style="width: inherit;"
          class="form-input"
            formControlName="createCards20"
          />
        </div>
    </form>
  </section>
  
  <!-- Actions -->
  <div mat-dialog-actions>
    <button mat-button type="button" mat-dialog-close>Close</button>
    &nbsp;&nbsp;&nbsp;
    <button
      mat-button
      type="submit"
      [disabled]="addListForm.invalid"
      (click)="submitList()"
    >
      Save
    </button>
  </div>
  `,
  styleUrls: ['./card.component.css'],
})
export class AddDialogListComponent implements AfterViewInit  
{
  addListForm: FormGroup;
  listsService: ListsService = inject(ListsService);

  @ViewChild('title') titleField!: ElementRef;

  ngAfterViewInit(): void {
    // Focus the title field when the dialog opens
    try {
      this.titleField.nativeElement.focus();  
    } catch (error) {
      console.log('could not focus title field',error);
    }   

  }

  constructor(
    private dialogRef: MatDialogRef<AddDialogListComponent>, // Inject MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: BBList) 
  {    
    this.addListForm = new FormGroup(
      {
        id: new FormControl(data?.id || null), // Initialize with data or default to null
        userId: new FormControl(data?.userId || null),
        boardId: new FormControl(data?.boardId || null),
        title: new FormControl(data?.title || ""),
        color: new FormControl(data?.color || ""),
        type: new FormControl(data?.type || ""),
        position: new FormControl(data?.position || null),

        // Optional fields
        created: new FormControl(
          data?.created ? data.created : null
        ),
        updated: new FormControl(
          //alternatively we can format like: this.formatDateTime(data.updated) 
          data?.updated ? data.updated : null
        ),
        createCards1: new FormControl(false),
        createCards5: new FormControl(false),
        createCards10: new FormControl(false),
        createCards20: new FormControl(false),
      });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'Enter') {
      this.submitList();
    }
  }

  async submitList() {
    try {
      const addedList =  Object.assign({}, this.getUpdatedList());
      console.log("eddlist> ",addedList)
      
      const updatedList = await this.listsService.insertList(addedList); // Fetch updated list


      //if this was ok, then load again with data
      const updatedListWithCards = await this.listsService.getListByIdWithCards(updatedList.id); // Fetch updated list

      this.data = Object.assign({}, updatedListWithCards); // Safely assign to bbList


      // Close dialog here
      this.dialogRef.close(updatedListWithCards); // Use injected dialogRef
    } catch (error) {
      console.error('Failed to update list:', error);
    }
  }

  // Optional: Method to get the updated BBList object from the form
  getUpdatedList(): BBList {

    let blist = this.addListForm.value as BBList;
    let howMany = 1;
    let prefix = 'ADD_CARDS';

    if(this.isChecked1()){
      howMany+=1
    }
    if(this.isChecked5()){
      howMany+=5
    }
    if(this.isChecked10()){
      howMany+=10
    }
    if(this.isChecked20()){
      howMany+=20
    }

    if(!this.isChecked1() && !this.isChecked5() && !this.isChecked10() && !this.isChecked20()){
      //dont override
    }else{
      blist.type = prefix + '_' + howMany;
    }

    return blist;
  }


  //TODO 


  isChecked1(): boolean {
    return this.addListForm.get('createCards1')?.value; // Retrieve the checkbox's value
  }
  isChecked5(): boolean {
    return this.addListForm.get('createCards5')?.value; // Retrieve the checkbox's value
  }
  isChecked10(): boolean {
    return this.addListForm.get('createCards10')?.value; // Retrieve the checkbox's value
  }
  isChecked20(): boolean {
    return this.addListForm.get('createCards20')?.value; // Retrieve the checkbox's value
  }
}
