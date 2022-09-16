import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-quote',
  templateUrl: './hero-quote.component.html',
  styleUrls: ['./hero-quote.component.scss'],
})
export class HeroQuoteComponent implements OnInit {
  @Input() quote!: string;
  @Input() name!: string;

  constructor() {}

  ngOnInit(): void {}
}
