import * as React from "react";
import { render } from "react-dom";
import RLDD from "react-list-drag-and-drop/lib/RLDD";
import './style.css';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
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
        <div className="top">
          <p className="title">{item.label}</p>
          <Tooltip
            title={'Eliminar'}
            onClick={() => this.props.setItems(this.props.items.filter(ite => ite.id !== item.id))}
          >
            <IconButton
              color="primary"

            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </div>
        <p className="body">{item.label}</p>
        <div className="small">
          Posicion: {index + 1}
        </div>
      </div>
    );
  }

  private handleRLDDChange(reorderedItems: Array<Item>) {
    this.props.setItems(reorderedItems);
  }
}

