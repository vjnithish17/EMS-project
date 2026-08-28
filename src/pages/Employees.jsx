import { useState, useEffect } from "react";
import axios from "axios";
import "./css/employees.css";
import { toast } from "react-toastify";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [department, setdepartment] = useState("");
  const [image, setimage] = useState(null);
  const [salary, setsalary] = useState("");
  //                                          --- search state  [ ?serach=${serach}  ]---
  const [serach, setserach] = useState("");
  //                                          ---- Page count [ &page=${page} ]-----
  const [page, setPage] = useState(1);
  //                                          ---- Sorting  [ &limit=5&sort=${sort}]--------
  const [sort, setSort] = useState("name");
  //                                          ------ Update pana ------
  const [editId, seteditID] = useState(null);

  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");

  //                                  ----- All emplyoee Show table ------
  const fetchEmployees = async () => {
    setloading(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/employees?serach=${serach}&page=${page}&limit=5&sort=${sort}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      setEmployees(response.data);
    } catch (error) {
      setError("Failed To Fetch Employees");
      toast.error("Something Went Wrong", {
        theme: "colored",
        autoClose: 1500,
      });
    } finally {
      setloading(false);
    }
  };
  //               ----- starting server start ---------
  useEffect(() => {
    fetchEmployees();
  }, [serach, page, sort]);
  //                 ---------- Add Employess -------------
  const addEmplyoee = async () => {
    if (name == "") {
      alert("Fill the name");
      return;
    } else if (email == "") {
      alert("Fill the email");
      return;
    } else if (department == "") {
      alert("Fill the department");
      return;
    } else if (salary == "") {
      alert("Fill the salary");
      return;
    }
    const employeeData = new FormData();
    employeeData.append("name", name);
    employeeData.append("email", email);
    employeeData.append("department", department);
    employeeData.append("salary", salary);
    if (image) {
      employeeData.append("image", image);
    }
    if (!name) {
      toast.warning("Enter Employee Name", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/employees/create",
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      toast.success("Employee Added Successfully", {
        theme: "colored",
        autoClose: 1500,
      });

      setname("");
      setemail("");
      setdepartment("");
      setsalary("");
      setimage(null);
      //                      ----- UI update----
      fetchEmployees();
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("Admin access only", {
          theme: "colored",
          autoClose: 1500,
        });
        return;
      }

      toast.error("Something Went Wrong", {
        theme: "colored",
        autoClose: 1500,
      });
    }
  };
  //                 ----- Delete Employeee ------
  const deleteEmployee = async (id) => {
    console.log(id);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/api/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Employee Deleted Successfully", {
        theme: "colored",
        autoClose: 1500,
      });
      fetchEmployees();
      console.log(response.data);
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("Admin access only", {
          theme: "colored",
          autoClose: 1500,
        });
        return;
      }

      toast.error("Something Went Wrong", {
        theme: "colored",
        autoClose: 1500,
      });
    }
  };
  //                  -------- Update UI Employee ----
  const editEmployee = (emp) => {
    console.log(emp);
    setname(emp.name);
    setemail(emp.email);
    setdepartment(emp.department);
    setsalary(emp.salary);
    seteditID(emp._id);
  };
  const updateEmplyoee = async () => {
    const updateData = {
      name,
      email,
      department,
      salary,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/employees/${editId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setname("");
      setemail("");
      setdepartment("");
      setsalary("");
      seteditID(null);
      //                      ----- UI update----
      fetchEmployees();
      toast.success("Employee Updated Successfully", {
        theme: "colored",
        autoClose: 1500,
      });
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("Admin access only", {
          theme: "colored",
          autoClose: 1500,
        });
        return;
      }

      toast.error("Something Went Wrong", {
        theme: "colored",
        autoClose: 1500,
      });
    }
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (!loading && employees.length === 0) {
    return <h2>No Employees Found</h2>;
  }
  return (
    <>
      <div className="employee-page">
        <div className="employee-header">
          <h1>Employee Management</h1>
          <p>Manage employees, search, sort and update employee details.</p>
        </div>

        {/* Search & Sort */}
        <div className="employee-toolbar">
          <input
            className="search-input"
            type="text"
            placeholder="Search employee..."
            value={serach}
            onChange={(e) => setserach(e.target.value)}
          />

          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="name">Name A → Z</option>
            <option value="-name">Name Z → A</option>
            <option value="salary">Salary Low → High</option>
            <option value="-salary">Salary High → Low</option>
          </select>
        </div>

        {/* Employee Form */}
        <div className="employee-form">
          <h2>{editId ? "Update Employee" : "Add New Employee"}</h2>
          <div className="form-grid">
            <input
              className="form-input"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />

            <input
              className="form-input"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />

            <input
              className="form-input"
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setdepartment(e.target.value)}
            />

            <input
              className="form-input"
              type="number"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setsalary(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setimage(e.target.files[0])}
            />
          </div>

          {editId ? (
            <button className="primary-btn" onClick={updateEmplyoee}>
              Update Employee
            </button>
          ) : (
            <button className="primary-btn" onClick={addEmplyoee}>
              Add Employee
            </button>
          )}
        </div>

        {/* Employee Table */}
        <div className="employee-table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp._id}>
                    <td>
                      {emp.image ? (
                        <img
                          src={`http://localhost:5000/uploads/${emp.image}`}
                          alt={emp.name}
                          className="employee-image"
                        />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>₹ {emp.salary}</td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => editEmployee(emp)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deleteEmployee(emp._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    {serach ? "No search data found" : "No data found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <div className="pagination-buttons">
            <button
              className="pagination-btn"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              ← Previous
            </button>

            <button
              className="pagination-btn"
              onClick={() => setPage(page + 1)}
              disabled={employees.length < 5}
            >
              Next →
            </button>
          </div>

          <div className="page-info">
            Page: <b>{page}</b> | Showing: <b>{employees.length}</b> | Limit:{" "}
            <b>5</b>
          </div>
        </div>
      </div>
    </>
  );
}

export default Employees;
