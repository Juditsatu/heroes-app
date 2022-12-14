import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = ''
  heroes: Heroe[] = [];
  hayError: boolean = false;
  hereoSeleccionado: Heroe | undefined;

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {
  }

  buscando() {

    this.heroesService.getSugerencias( this.termino.trim() )
      .subscribe( heroes => this.heroes = heroes )
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ) {
    
    if(!event.option.value) {
      this.hereoSeleccionado = undefined
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroeById( heroe.id! )
      .subscribe({
        next: (heroe) => this.hereoSeleccionado = heroe,
        error: (err) => {
          this.hayError = true
          console.log(err)
        }
      })
  }

}
