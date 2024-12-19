import { Injectable } from '@angular/core';
import { BBList } from '../interfaces/bblist';
import { BBBoard } from '../interfaces/bbboard';

@Injectable({
  providedIn: "root",
})
export class ListsService 
{
  readonly grokHost = "https://f030-2a05-4f46-130c-cc00-1377-733a-356c-3ec6.ngrok-free.app";
  readonly localhost= "http://localhost:8080/bootboard"
  readonly apiBaseUrl = this.localhost + "/api/v1/"
  //readonly apiBaseUrl = this.grokHost + "/api/v1/";
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

  async getAllListsWithCards(): Promise<BBList[]> {
    const data = await fetch(`${this.apiUrl}/cards`);
    return (await data.json()) ?? [];
  }

  async getBoard(id: number): Promise<BBBoard> {
    const data = await fetch(`${this.apiBaseUrl}boards/${id}/lists`);
    return (await data.json()) ?? [];
  }

  //ovo za sad jos nema backend
  async getAllListsForBoardWithCards(id: number): Promise<BBList[]> {
    const data = await fetch(`${this.apiBaseUrl}boards/${id}/lists/cards`);
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
        console.error('Failed to delete the list',response);
        alert('Failed to delete the list');
      }
    } catch (error) {
      console.error('Error occurred while deleting the list:', error);
    }
  }
  
  async insertList(list: BBList): Promise<BBList> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indicate JSON payload
        },
        body: JSON.stringify(list), // Send the BBList object as JSON
      });
  
      if (response.ok) {
        const updatedList: BBList = await response.json(); // Parse the response as a BBList object
        return updatedList; // Return the updated list
      } else {
        const errorMessage = await response.text(); // Read the error response
        console.error('Failed to insert the list:', errorMessage);
        throw new Error(errorMessage); // Throw an error to be handled by the caller
      }
    } catch (error) {
      console.error('Error occurred while inserting the list:', error);
      
      //Display error msg
      //Close dialog.      
      alert('Error occurred while inserting the list');      
      throw error; // Propagate the error to the caller
    }
  }

  async updateList(list: BBList): Promise<BBList> {
      try {
        const response = await fetch(this.apiUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', // Indicate JSON payload
          },
          body: JSON.stringify(list), // Send the BBList object as JSON
        });
    
        if (response.ok) {
          const updatedList: BBList = await response.json(); // Parse the response as a BBList object
          return updatedList; // Return the updated list
        } else {
          const errorMessage = await response.text(); // Read the error response
          console.error('Failed to update the list:', errorMessage);
          throw new Error(errorMessage); // Throw an error to be handled by the caller
        }
      } catch (error) {
        console.error('Error occurred while updating the list:', error);
        throw error; // Propagate the error to the caller
      }
    }
  

}
