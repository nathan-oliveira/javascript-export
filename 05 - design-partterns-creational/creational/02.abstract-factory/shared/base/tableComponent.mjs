import NotImplementedException from './../notImplementedException';

export default class TableComponent {
  render(data) {
    throw new NotImplementedException(this.render.name)
  }
}
