import NotImplementedException from './../notImplementedException';

export default class ViewFactory {
  createTable() {
    throw new NotImplementedException(this.createTable.name)
  }
}
