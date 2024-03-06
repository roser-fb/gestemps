import { Directive, ElementRef, AfterViewInit, ViewChild } from "@angular/core";
import * as bootstrap from "bootstrap";
@Directive({
  selector: "[appPopover]",
})
export class PopoverDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const popover = new bootstrap.Popover(this.elementRef.nativeElement);
  }
}
