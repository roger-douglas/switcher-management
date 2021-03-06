import { Component, OnInit, Input } from '@angular/core';
import { Strategy } from '../../model/strategy';
import { ConfigDetailComponent } from '../config-detail/config-detail.component';

@Component({
  selector: 'app-strategy-list',
  templateUrl: './strategy-list.component.html',
  styleUrls: ['./strategy-list.component.css']
})
export class StrategyListComponent implements OnInit {
  @Input() strategies: Strategy[];
  @Input() moveToEnd: boolean;
  @Input() parent: ConfigDetailComponent;

  constructor() { }

  ngOnInit() { }

  scrollToElement($element): void {
    setTimeout(() => {
      $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }, 200);
  }

  reloadStrategies(strategy: Strategy) {
    this.strategies.splice(this.strategies.indexOf(strategy), 1);
    this.parent.hasStrategies = this.strategies.length > 0;
  }

}
