import { Injectable } from '@angular/core';
import { BBBoard } from '../interfaces/bbboard';

@Injectable({
  providedIn: "root",
})
export class BoardsService 
{
  readonly apiBaseUrl = "http://localhost:8080/bootboard/api/v1/";
  readonly apiUrl = this.apiBaseUrl+"boards";

  constructor() {}  

  async getAllBoards(): Promise<BBBoard[]> {
    const data = await fetch(this.apiUrl);
    return (await data.json()) ?? [];
  }

  async getBoardById(id: number): Promise<BBBoard | undefined> {
    const data = await fetch(`${this.apiUrl}/${id}`);
    return (await data.json()) ?? {};
  }

}
