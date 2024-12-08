import { Injectable } from '@angular/core';
import { BBCard } from '../interfaces/bbcard';

@Injectable({
  providedIn: "root",
})
export class CardsService 
{
  readonly apiBaseUrl = "http://localhost:8080/bootboard/api/v1/";
  readonly apiUrl = this.apiBaseUrl+"cards";

  constructor() {}  

  async getAllCards(): Promise<BBCard[]> {
    const data = await fetch(this.apiUrl);
    return (await data.json()) ?? [];
  }

  async getCardById(id: number): Promise<BBCard | undefined> {
    const data = await fetch(`${this.apiUrl}/${id}`);
    return (await data.json()) ?? {};
  }

}
