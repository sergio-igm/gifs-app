import { Component, Input, OnInit } from '@angular/core';
import { Gif } from 'src/app/shared/interfaces/gifs.interfaces';

@Component({
    selector: 'gifs-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
    @Input()
    public gif!: Gif;

    ngOnInit(): void {
        if (this.gif === undefined)
            throw new Error("Gif property required");
    }
}
