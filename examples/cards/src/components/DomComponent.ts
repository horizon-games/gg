import { Component } from '../../../../src/ecs'

export default class DomComponent extends Component<{
  className: string
  element: HTMLElement
}> {}
