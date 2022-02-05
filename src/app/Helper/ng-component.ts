

export class NgComponent {

  errors : any = {}
  busy : boolean = false

  setBusy(): void {
    this.busy = true;
  }
  clearBusy(): void {
    this.busy = false;
  }
  handleException(ex: any): void {
    if (ex.status == 422) {
      this.errors = ex.error.errors
    }
    if(ex.status == 402){
      this.errors = ex.error
    }
  }
}
