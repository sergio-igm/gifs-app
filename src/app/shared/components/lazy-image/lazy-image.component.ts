import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'shared-lazy-image',
    templateUrl: './lazy-image.component.html',
    styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit {
    @Input()
    public url!: string;

    @Input()
    public alt?: string;

    public loaded: boolean = false;

    ngOnInit(): void {
        if (this.url === undefined)
            throw new Error("url property required");
    }

    onLoad() {
        this.loaded = true

    }
}
