import * as React from "react";
import { render } from "react-dom";
import RLDD from "react-list-drag-and-drop/lib/RLDD";
import './style.css';

interface Item {
  id: number;
  label: string;
}

export interface ExampleState {
  items: Item[];
}

export interface Props {
  items: any;
  setItems: any;
}

export default class Example extends React.PureComponent<Props, ExampleState> {
  constructor(props) {
    super(props);

    this.itemRenderer = this.itemRenderer.bind(this);
    this.handleRLDDChange = this.handleRLDDChange.bind(this);
  }

  
  render() {
    console.log(this.props)
    const items = this.props.items;
    return (
        <RLDD
          cssClasses="example"
          items={items || []}
          itemRenderer={this.itemRenderer}
          onChange={this.handleRLDDChange}
        />
    );
  }
  
  
  private itemRenderer(item: Item, index: number): JSX.Element {
    return (
      <div className="item">
      <p className="title">{item.label}</p>
      <button 
        onClick={ () => this.props.setItems(this.props.items.filter(ite => ite.id !== item.id)) }  
      >
        x
      </button>
      <p className="body">{item.label}</p>
        <div className="small">
          item.id: {item.id} - index: {index}
        </div>
      </div>
    );
  }

  private handleRLDDChange(reorderedItems: Array<Item>) {
    this.props.setItems(reorderedItems);
  }
}

