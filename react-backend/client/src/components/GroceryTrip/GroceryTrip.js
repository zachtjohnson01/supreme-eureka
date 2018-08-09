import React, {Component} from "react";
import ReactTable from "react-table";
import { makeData, Tips } from "./Utils";
import axios from "axios";
import "./GroceryTrip.css";
import "react-table/react-table.css";

class GroceryTrip extends Component {
    constructor() {
        super();
        this.state = {
          data: makeData(),
          currentStore: "",
          currentDate: ""

        };
        this.renderEditable = this.renderEditable.bind(this);
      }
      renderEditable(cellInfo) {
        return (
          <div
            style={{ backgroundColor: "#fafafa" }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const data = [...this.state.data];
              data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({ data });
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.data[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
      }

      submitData = () => {
          this.state.data.map(i => {
            if (
              // this.state.currentStore !== "" 
              // && this.state.currentDate !=="" 
              i.storeItemName === undefined
              && i.itemName === undefined
              && i.price === undefined
            ) {
              console.log("blank")
            } else {
              axios.post("/api/groceryTrip/", {
                    grocery_store_name: this.state.currentStore,
                    trip_date: this.state.currentDate,
                    grocery_store_item_name: i.storeItemName,
                    item_name: i.itemName,
                    price: i.price,
                    tax: i.taxAmount
                }).then(res => {
                    console.log("submit data response: ");
                    console.log(res);
                    if (res.status === 200) {
                        console.log("success")
                    }
                })
            }
            
          })
        };

      setStore = (e) => {
        this.setState({
          currentStore: e.target.value
        })
      };
      setDate = (e) => {
        this.setState({
          currentDate: e.target.value
        })
      };

      render() {
        const { data } = this.state;
        return (
          <div className="outersize">
            <div>
              <div className="store">
                <div className="item">
                  <div className="sub-item">
                    Store Name
                  </div>
                  <input onChange={ this.setStore } value={ this.state.currentStore }className="sub-item" />
                </div>
                <div className="item">
                  <div className="sub-item">
                    Date
                  </div>
                  <input onChange={ this.setDate } value={this.state.currentDate } className="sub-item" />
                </div>
              </div>
              <div>
                <ReactTable
                  data={data}
                  columns={[
                    {
                      Header: "Store Item Name",
                      accessor: "storeItemName",
                      Cell: this.renderEditable
                    },
                    {
                      Header: "Item Name",
                      accessor: "itemName",
                      Cell: this.renderEditable
                    },
                    {
                      Header: "Price",
                      accessor: "price",
                      Cell: this.renderEditable
                    },
                    {
                      Header: "Tax",
                      accessor: "taxAmount",
                      Cell: this.renderEditable
                    }
                    // {
                    //   Header: "Full Name",
                    //   id: "full",
                    //   accessor: d =>
                    //     <div
                    //       dangerouslySetInnerHTML={{
                    //         __html: d.firstName + " " + d.lastName
                    //       }}
                    //     />
                    // }
                  ]}
                  defaultPageSize={20}
                  className="-striped -highlight tablesize"
                />
                <br />
                <Tips />
              </div>
              {/* <Logo /> */}
              <button onClick={this.submitData.bind(this)}>Submit</button>
            </div>
            <div>
              {/* {this.state.currentStore} */}
            </div>
          </div>
        );
      }
    }

export default GroceryTrip;