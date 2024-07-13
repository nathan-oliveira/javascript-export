import Util from "../util.js";

const componentNameAnchor = '$$componentName';
const currentContextAnchor = '$$currentContext';
const repositoryAnchor = '$$repositoryName';

const template = `
export default class ${componentNameAnchor}Service {
  constructor({ repository: ${repositoryAnchor} }) {
    ${currentContextAnchor} = ${repositoryAnchor};
  }

  create(data) {
    ${currentContextAnchor}.create(data)
  }

  read(query) {
    ${currentContextAnchor}.read(query)
  }

  update(id, data) {
    ${currentContextAnchor}.update(id, data)
  }

  delete(id) {
    ${currentContextAnchor}.delete(id)
  }
}`;


export function serviceTemplate(componentName, repositoryName) {
  const currentContext = `this.${repositoryName}`;
  const txtFile = template
    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    .replaceAll(currentContextAnchor, currentContext)
    .replaceAll(repositoryAnchor, repositoryName);

  return {
    fileName: `${componentName}Service`,
    template: txtFile,
  }
}