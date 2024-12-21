import { Injectable } from '@angular/core';
import { BBCard } from '../interfaces/bbcard';
import { BaseService } from './base.service';

@Injectable({
  providedIn: "root",
})
export class CardsService extends BaseService 
{
  readonly controller = "/cards";
  readonly apiUrl = this.apiBaseUrl + this.controller;  //apiBaseUrl is set in base.service file
 
  async getAllCards(): Promise<BBCard[]> {
    const data = await fetch(this.apiUrl);
    return (await data.json()) ?? [];
  }

  async getCardById(id: number): Promise<BBCard | undefined> {
    const data = await fetch(`${this.apiUrl}/${id}`);
    return (await data.json()) ?? {};
  }

  async updateCard(card: BBCard): Promise<BBCard> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Indicate JSON payload
        },
        body: JSON.stringify(card), // Send the BBCard object as JSON
      });
  
      if (response.ok) {
        const updatedCard: BBCard = await response.json(); // Parse the response as a BBCard object
        console.log('Card updated successfully:', updatedCard);
        return updatedCard; // Return the updated card
      } else {
        const errorMessage = await response.text(); // Read the error response
        console.error('Failed to update the card:', errorMessage);
        throw new Error(errorMessage); // Throw an error to be handled by the caller
      }
    } catch (error) {
      console.error('Error occurred while updating the card:', error);
      throw error; // Propagate the error to the caller
    }
  }

  async insertCard(card: BBCard): Promise<BBCard> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indicate JSON payload
        },
        body: JSON.stringify(card), // Send the BBCard object as JSON
      });
  
      if (response.ok) {
        const updatedCard: BBCard = await response.json(); // Parse the response as a BBCard object
        console.log('Card updated successfully:', updatedCard);
        return updatedCard; // Return the updated card
      } else {
        const errorMessage = await response.text(); // Read the error response
        console.error('Failed to insert the card:', errorMessage);
        throw new Error(errorMessage); // Throw an error to be handled by the caller
      }
    } catch (error) {
      console.error('Error occurred while inserting the card:', error);
      throw error; // Propagate the error to the caller
    }
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
        console.error('Failed to delete the card',response);
        alert('Failed to delete the card');
      }
    } catch (error) {
      console.error('Error occurred while deleting the card:', error);
    }
  }

  async swap(id1: number, id2: number): Promise<void>
  {
    try {
      const response = await fetch(`${this.apiUrl}/swap/${id1}/${id2}`, {
        method: 'GET',
      });

      console.log(response);
  
      if (response.ok) {
        console.log('Items swapped successfully');
        // Reload the page after successful deletion
        //window.location.reload();
      } else {
        console.error('Failed to swap cards',response);
        alert('Failed to swap the cards');
      }
    } catch (error) {
      console.error('Failed to swaping cards',error);
    }
  }
}
