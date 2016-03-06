export class APIError {
  constructor(data) {
    this.response = {
      text: JSON.stringify(data)
    }
  }
}
