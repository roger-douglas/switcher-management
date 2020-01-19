import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomainRouteService } from '../../services/domain-route.service';
import { PathRoute, Types } from '../model/path-route';
import { ActivatedRoute } from '@angular/router';
import { Domain } from '../model/domain';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { DetailComponent } from '../common/detail-component';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-domain-detail',
  templateUrl: './domain-detail.component.html',
  styleUrls: ['./domain-detail.component.css']
})
export class DomainDetailComponent extends DetailComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();

  state$: Observable<object>;

  constructor(
    private domainRouteService: DomainRouteService,
    private adminService: AdminService,
    private pathRoute: PathRoute,
    private route: ActivatedRoute
  ) {
    super(adminService);
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(map(() => window.history.state)).pipe(takeUntil(this.unsubscribe)).subscribe(data => {
        if (data.element) {
          this.updatePathRoute(JSON.parse(data.element));
        } else {
          this.updatePathRoute(this.domainRouteService.getPathElement(Types.SELECTED_DOMAIN).element);
        }
      });
    
    super.loadAdmin(this.getDomain().owner);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  updatePathRoute(domain: Domain) {
    this.pathRoute = {
      id: domain.id,
      element: domain,
      name: domain.name,
      path: '/dashboard/domain/',
      type: Types.DOMAIN_TYPE
    };

    this.domainRouteService.updatePath(this.pathRoute);
  }

  getDomain() {
    return this.pathRoute.element;
  }

  edit() {
    console.log(this.pathRoute.element.name)
  }

}
