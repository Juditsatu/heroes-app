import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

publishers = [
  {
    id: 'DC Comics',
    desc: 'DC - Comic'
  },
  {
    id: 'Marvel Comics',
    desc: 'Marvel - Comic'
  }
];

heroe: Heroe = {
  superhero: '',
  alter_ego: '',
  characters: '',
  first_appearance: '',
  publisher: Publisher.DCComics,
  alt_img: ''
}

constructor( private heroesService: HeroesService ) { }

guardar() {

  if( this.heroe.superhero.trim().length === 0) {
    return
  }

  this.heroesService.agregarHeroe( this.heroe )
    .subscribe(resp => console.log('response', resp))

}


  ngOnInit(): void {
  }

}
