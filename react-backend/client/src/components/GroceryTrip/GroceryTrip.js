import React, {Component} from "react";
import {Form, Input, Textarea, Button} from "muicss/react";

class GroceryTrip extends Component {
    constructor(){
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className="">
                <Form>
                    <legend>Title</legend>
                    <Input placeholder="Input 1" />
                    <Input placeholder="Input 2" />
                    <Textarea placeholder="Textarea" />
                    <Button variant="raised">Submit</Button>
                </Form>
          </div>
        )
    }
}

export default GroceryTrip;