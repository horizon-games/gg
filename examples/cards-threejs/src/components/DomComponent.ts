import { Component } from '../../../../src/ecs'

export default class DomComponent extends Component {
  value: {
    className: string
    element: HTMLElement
  }
}