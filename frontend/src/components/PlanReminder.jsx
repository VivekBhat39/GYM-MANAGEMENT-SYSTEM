import React from 'react';

function PlanReminder() {
  return (
    <div>
      <h1>Plan Reminder</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Member Name</th>
            <th>Plan</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>Premium</td>
            <td>2023-12-31</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PlanReminder;