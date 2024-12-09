import { Injectable } from '@angular/core';
import { BBList } from '../interfaces/bblist';

@Injectable({
  providedIn: "root",
})
export class ListsService 
{
  readonly apiBaseUrl = "http://localhost:8080/bootboard/api/v1/";
  readonly apiUrl = this.apiBaseUrl+"lists";

  constructor() {}  

  // The code now uses asynchronous code to make a GET request over HTTP.
  // HELPFUL: For this example, the code uses fetch. For more advanced use cases consider using HttpClient provided by Angular.

  async getAllLists(): Promise<BBList[]> {
    console.log("list service, loading all lists...")
    const data = await fetch(this.apiUrl);
    console.log("lists loaded")
    return (await data.json()) ?? [];
  }

  //ghe xe??
  async getAllListsWithCards(): Promise<BBList[]> {
    const data = await fetch(`${this.apiUrl}/cards`);
    return (await data.json()) ?? [];
  }

  async getListById(id: number): Promise<BBList | undefined> {
    const data = await fetch(`${this.apiUrl}/${id}`);
    return (await data.json()) ?? {};
  }

  async getListByIdWithCards(id: number): Promise<BBList | undefined> {
    const data = await fetch(`${this.apiUrl}/${id}/cards`);
    return (await data.json()) ?? {};
  }

  async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Item deleted successfully');
        // Reload the page after successful deletion
        window.location.reload();
      } else {
        console.error('Failed to delete the item');
      }
    } catch (error) {
      console.error('Error occurred while deleting the item:', error);
    }
  }
  
  //TODO
  //submit edit

}
