import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";

function MultipleInput() {
  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

  // handle input change
  // const handleInputChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...inputList];
  //   list[index][name] = value;
  //   setInputList(list);
  // };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { firstName: "", lastName: "" }]);
  };

  return (
    <div className="App">
      <Card>
        <CardContent>
          <Table id="myTable">
            <TableHead>
              <TableRow>
                <TableCell>Bill No </TableCell>

                <TableCell>Party Name</TableCell>

                <TableCell>Party Number</TableCell>
              </TableRow>
            </TableHead>
            {inputList.map((x, i) => {
              return (
                <div className="box">
                  <TableBody>
                    <TableRow hover>
                      <TableCell>
                      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                      </TableCell>
                      <TableCell>
                      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                      </TableCell>
                      <TableCell>
                      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                      </TableCell>
                    </TableRow>
                  </TableBody>

                  {/* <input
              name="firstName"
              placeholder="Enter First Name"
              value={x.firstName}
              onChange={e => handleInputChange(e, i)}
            />
            <input
              className="ml10"
              name="lastName"
              placeholder="Enter Last Name"
              value={x.lastName}
              onChange={e => handleInputChange(e, i)}
            /> */}
                  <div className="btn-box">
                    {inputList.length !== 1 && (
                      <button
                        className="mr10"
                        onClick={() => handleRemoveClick(i)}
                      >
                        Remove
                      </button>
                    )}
                    {inputList.length - 1 === i && (
                      <button onClick={handleAddClick}>Add</button>
                    )}
                  </div>
                </div>
              );
            })}
          </Table>
        </CardContent>
      </Card>
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
    </div>
  );
}

export default MultipleInput;
