import { Injectable } from '@angular/core';
import { BBBoard } from '../interfaces/bbboard';
import { BaseService } from './base.service';

@Injectable({
  providedIn: "root",
})
export class BoardsService extends BaseService 
{
  readonly controller = "/boards";
  readonly apiUrl = this.apiBaseUrl + this.controller;  //apiBaseUrl is set in base.service file
  
  async getAllBoards(): Promise<BBBoard[]> {
    const data = await fetch(this.apiUrl);
    return (await data.json()) ?? [];
  }

  async getBoardById(id: number): Promise<BBBoard | undefined> {
    const data = await fetch(`${this.apiUrl}/${id}`);
    return (await data.json()) ?? {};
  }

  async create(board: BBBoard): Promise<BBBoard> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indicate JSON payload
        },
        body: JSON.stringify(board), // Send the BBBoard object as JSON
      });
  
      if (response.ok) {
        const updatedBoard: BBBoard = await response.json(); // Parse the response as a BBBoard object
        return updatedBoard; // Return the updated board
      } else {
        const errorMessage = await response.text(); // Read the error response
        console.error('Failed to insert the board:', errorMessage);
        throw new Error(errorMessage); // Throw an error to be handled by the caller
      }
    } catch (error) {
      console.error('Error occurred while inserting the board:', error);
      
      //Display error msg
      //Close dialog.      
      alert('Error occurred while inserting the board');      
      throw error; // Propagate the error to the caller
    }
  }

  async update(board: BBBoard): Promise<BBBoard> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Indicate JSON payload
        },
        body: JSON.stringify(board), // Send the BBBoard object as JSON
      });
  
      if (response.ok) {
        const updatedBoard: BBBoard = await response.json(); // Parse the response as a BBBoard object
        return updatedBoard; // Return the updated board
      } else {
        const errorMessage = await response.text(); // Read the error response
        console.error('Failed to update the board:', errorMessage);
        throw new Error(errorMessage); // Throw an error to be handled by the caller
      }
    } catch (error) {
      console.error('Error occurred while updating the board:', error);
      throw error; // Propagate the error to the caller
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Item deleted successfully');
        // Reload the page after successful deletion
        window.location.reload();
        return true;
      } else {
        console.error('Failed to delete the board',response);
        alert('Failed to delete the board');
        return false;
      }
    } catch (error) {
      console.error('Error occurred while deleting the board:', error);
      return false;
    }
  }

}
