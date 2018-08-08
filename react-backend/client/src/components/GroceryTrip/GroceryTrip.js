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
          data: makeData()
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
              axios.post("/api/groceryTrip/", {
                    grocery_store_name: i.storeName,
                    trip_date: i.date,
                    item_count: i.itemCount,
                    tax: i.taxAmount
                }).then(res => {
                    console.log("submit data response: ");
                    console.log(res);
                    if (res.status === 200) {
                        console.log("success")
                    }
                })

          })
      };

      render() {
        const { data } = this.state;
        return (
          <div className="tablesize">
            <ReactTable
              data={data}
              columns={[
                {
                  Header: "Store Name",
                  accessor: "storeName",
                  Cell: this.renderEditable
                },
                {
                  Header: "Date",
                  accessor: "date",
                  Cell: this.renderEditable
                },
                {
                  Header: "Item Count",
                  accessor: "itemCount",
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
            {/* <Logo /> */}
            <button onClick={this.submitData.bind(this)}>Submit</button>
          </div>
        );
      }
    }

export default GroceryTrip;