import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.less']
})
export class ConfirmationComponent implements OnInit {

  @Output() onConfirmationClick: EventEmitter<void> = new EventEmitter();
  @Output() onCancelClick: EventEmitter<void> = new EventEmitter();
  @Input() confirmBtnText: string;
  @Input() cancelBtnText: string;
  @Input() confirmationText: string;

  constructor() { }

  ngOnInit() {
  }

  cancel() {
    this.onCancelClick.emit();
  }

  confirm() {
    this.onConfirmationClick.emit();
  }

}
