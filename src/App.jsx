import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {

  // FRONTEND CODE
  const frontendCode = `
import { useEffect, useState } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const [emps, setEmps] = useState([]);
  const [emp, setEmp] = useState({ no: 0, name: "", address: "" });

  var url = "http://127.0.0.1:9999/employees";

  const getData = () => {
    axios.get(url).then((result) => {
      setEmps(result.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const onTextChange = (args) => {
    var CpyEmp = { ...emp };
    CpyEmp[args.target.name] = args.target.value;
    setEmp(CpyEmp);
  };

  const AddRecord = () => {
    axios.post(url, emp).then((result) => {
      if (result.data.affectedRows > 0) {
        setEmp({ no: 0, name: "", address: "" });
        getData();
      } else {
        alert("Something Wrong!");
      }
    });
  };

  return (
    <>
      <center>
        <h1>Crud Operations</h1>
      </center>

      <div className="container">

        <label>Name</label>
        <input
          className="form-control"
          type="text"
          value={emp.name}
          name="name"
          onChange={onTextChange}
        />

        <hr />

        <label>Address</label>
        <input
          className="form-control"
          type="text"
          value={emp.address}
          name="address"
          onChange={onTextChange}
        />

        <hr />

        <button onClick={AddRecord}>Add Record</button>

        <hr />

        <div className="table table-responsive">
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
              </tr>
            </thead>

            <tbody>
              {emps.map((e) => {
                return (
                  <tr key={e.no}>
                    <td>{e.no}</td>
                    <td>{e.name}</td>
                    <td>{e.address}</td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
`;

  // BACKEND CODE
  const backendCode = `
const mysql2 = require("mysql2");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const mydb = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Pass@123",
    database: "iacsd"
};


// GET
app.get("/employee", (request, response) => {

    const connection = mysql2.createConnection(mydb);
    connection.connect();

    var querytxt = "select * from emp";

    connection.query(querytxt, (err, result) => {
        if (err == null) {
            response.json(result);
        } else {
            response.json(err);
        }
        connection.end();
    });
});

// POST
app.post("/employee", (request, response) => {

    const connection = mysql2.createConnection(mydb);
    connection.connect();

    var querytxt = \`insert into emp(name,address) VALUES('\${request.body.name}','\${request.body.address}')\`;

    connection.query(querytxt, (err, result) => {
        if (err == null) {
            response.json(result);
        } else {
            response.json(err);
        }
        connection.end();
    });
});

// PUT
app.put("/employee/:no", (request, response) => {

    const connection = mysql2.createConnection(mydb);
    connection.connect();

    var querytxt = \`update emp set name='\${request.body.name}', address='\${request.body.address}' where no=\${request.params.no}\`;

    connection.query(querytxt, (err, result) => {
        if (err == null) {
            response.json(result);
        } else {
            response.json(err);
        }
        connection.end();
    });
});

// DELETE
app.delete("/employee/:no", (request, response) => {

    const connection = mysql2.createConnection(mydb);
    connection.connect();
    var querytxt = \`delete from emp where no=\${request.params.no}\`;

    connection.query(querytxt, (err, result) => {
        if (err == null) {
            response.json(result);
        } else {
            response.json(err);
        }
        connection.end();
    });
});

app.listen(9999, () => {
    console.log("Fahhhhhhhhh");
});
`;

  return (
    <>
      <div className="container-fluid mt-4">

        <h1 className="text-center text-primary mb-4">
          React + Node + MySQL CRUD
        </h1>

        <div className="row">

          {/* FRONTEND */}
          <div className="col-md-6">
            <div className="card shadow-lg mb-4">

              <div className="card-header bg-dark text-white">
                <h3>Frontend Code</h3>
              </div>

              <div className="card-body">

                <pre
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "10px",
                    maxHeight: "700px",
                    overflowY: "scroll",
                    overflowX: "scroll",
                    fontSize: "14px"
                  }}
                >
                  <code>{frontendCode}</code>
                </pre>

              </div>
            </div>
          </div>

          {/* BACKEND */}
          <div className="col-md-6">
            <div className="card shadow-lg mb-4">

              <div className="card-header bg-success text-white">
                <h3>Backend Code</h3>
              </div>

              <div className="card-body">

                <pre
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "10px",
                    maxHeight: "700px",
                    overflowY: "scroll",
                    overflowX: "scroll",
                    fontSize: "14px"
                  }}
                >
                  <code>{backendCode}</code>
                </pre>

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;