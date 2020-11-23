import { ComponentFactoryResolver, Inject, Injectable } from '@angular/core';
import { DynamicTableComponent } from '../component/dynamic-table/dynamic-table.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicServiceService {
  factoryResolver: any;
  rootViewContainer: any;

  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }

  addDynamicTableComponent() {
    const factory = this.factoryResolver.resolveComponentFactory(DynamicTableComponent)
    const component = factory.create(this.rootViewContainer.parentInjector)
    
    this.rootViewContainer.insert(component.hostView)
  }
}
