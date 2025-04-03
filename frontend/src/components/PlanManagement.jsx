import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PlanManagement() {

  const [plan, setPlan] = useState({
    name: "",
    duration: "",
    price: ""
  });

  const [allPlans, setAllPlans] = useState([]);
  const [id, setId] = useState(undefined);

  function handleChange(e) {
    setPlan({ ...plan, [e.target.id]: e.target.value })
  };

  function handleSubmit() {
    if (!id) {
      axios.post(import.meta.env.VITE_BASEURL + "/api/packages", plan)
        .then((res) => {
          console.log(res.data.data);
          setPlan({
            name: "",
            duration: "",
            price: ""
          })
          fetchPlanData();
        })
    } else {
      axios.put(import.meta.env.VITE_BASEURL + "/api/packages/" + id, plan)
        .then((res) => {
          // console.log(res.data.data);
          fetchPlanData();
          setId(undefined)
        })
    }
  };

  function fetchPlanData() {
    axios.get(import.meta.env.VITE_BASEURL + "/api/packages")
      .then((res) => {
        // console.log(res.data.data);
        setAllPlans(res.data.data);
      })
  }

  useEffect(() => {
    fetchPlanData();
  }, []);

  function handleDelete(id) {
    axios.delete(import.meta.env.VITE_BASEURL + "/api/packages/" + id)
      .then((res) => {
        // console.log(res.data.data)
        fetchPlanData();
      });
  };

  function handleUpdate(id) {
    setId(id)
    axios.get(import.meta.env.VITE_BASEURL + "/api/packages/" + id)
      .then((res) => {
        console.log(res.data.data)
        setPlan({
          name: res.data.data.name,
          duration: res.data.data.duration,
          price: res.data.data.price
        })
        fetchPlanData();
      });
  };

  return (
    <div>
      <h1>Plan Management</h1>
      <div className="mb-3">
        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Plan</button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Plan Name</th>
            <th>Duration</th>
            <th>Fees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            allPlans.map((eachPlan, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{eachPlan.name}</td>
                  <td>{eachPlan.duration} Month</td>
                  <td>{eachPlan.price}</td>
                  <td>
                    <button onClick={() => handleUpdate(eachPlan._id)} className="btn btn-sm btn-warning me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                    <button onClick={() => handleDelete(eachPlan._id)} className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              )
            })
          }

        </tbody>
      </table>


      {/* <!-- Add Plan Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input onChange={handleChange} value={plan.name} id='name' type="text" className='form-control mb-2' placeholder='Name' />
              <input onChange={handleChange} value={plan.duration} id='duration' type="number" className='form-control mb-2' placeholder='Duration' />
              <input onChange={handleChange} value={plan.price} id='price' type="number" className='form-control mb-2' placeholder='Price' />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleSubmit} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanManagement;