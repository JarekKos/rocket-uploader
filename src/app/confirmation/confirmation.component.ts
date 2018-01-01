import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.less']
})
export class ConfirmationComponent implements OnInit {

  @Output() onConfirmationClick: EventEmitter<void> = new EventEmitter();
  @Output() onCloseClick: EventEmitter<void> = new EventEmitter();
  @Input() confirmBtnText: string;
  @Input() closeBtnText: string;
  @Input() confirmationText: string;
  @Input() closeBtnClass = 'btn-danger';

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.onCloseClick.emit();
  }

  confirm() {
    this.onConfirmationClick.emit();
  }

}
