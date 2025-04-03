import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MemberManagement() {
  const [packages, setPackages] = useState([]);
  const [members, setMembers] = useState([]);  // State to store member data
  const [filteredMembers, setFilteredMembers] = useState([]);  // Filtered member state
  const [filterStatus, setFilterStatus] = useState("all");  // Filter state: "all", "active", "expired"

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // const [paid, setUnPaid] = useState(false);

  function fetchMembers() {
    axios.get(import.meta.env.VITE_BASEURL + "/api/members")  // Fetch members
      .then((res) => {
        // console.log(res.data.data);  // Assuming API returns an array of members
        setMembers(res.data.data);  // Assuming API returns an array of members
        setFilteredMembers(res.data.data);
      });
  }

  // Fetch packages and members when the component mounts
  useEffect(() => {
    axios.get(import.meta.env.VITE_BASEURL + "/api/packages")
      .then((res) => {
        // console.log(res.data.data);
        setPackages(res.data.data);
      });

    fetchMembers();
  }, []);

  useEffect(() => {
    if (filterStatus === "active") {
      setFilteredMembers(members.filter(member => new Date(member.endDate) > new Date()));
    } else if (filterStatus === "expired") {
      setFilteredMembers(members.filter(member => new Date(member.endDate) <= new Date()));
    } else {
      setFilteredMembers(members);  // Show all members
    }
  }, [filterStatus, members]);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  function searchMembers(e) {
    // console.log(e.target.value);

    let searchText = e.target.value.toLowerCase();

    if (searchText === "") {
      setFilteredMembers(members)
    } else {
      const memberFound = members.filter((member) =>
        member.name.toLowerCase().includes(searchText)
      );
      setFilteredMembers(memberFound)
    }
  }

  // Handle date and package selection logic
  const handleStartDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setStartDate(e.target.value);
    const selectedPackageData = packages.find(pkg => pkg._id === selectedPackage);
    if (selectedPackageData) {
      const durationInMonths = selectedPackageData.duration;
      selectedDate.setMonth(selectedDate.getMonth() + durationInMonths);
      setEndDate(selectedDate.toISOString().split('T')[0]);
    }
  };

  const handlePackageChange = (e) => {
    setSelectedPackage(e.target.value);
    if (startDate) {
      handleStartDateChange({ target: { value: startDate } });
    }
  };

  // Create new member and refresh member list after successful creation
  const handleSubmit = () => {
    try {
      const payload = { name, phone, email, packageId: selectedPackage, startDate, endDate };
      axios.post(import.meta.env.VITE_BASEURL + "/api/members", payload)
        .then((res) => {
          fetchMembers();
          // console.log(res.data)
          setName('')
          setPhone('')
          setEmail('')
          setSelectedPackage('')
          setStartDate('')
          setEndDate('')
        })

    } catch (error) {
      console.error(error);
      alert("Error creating member");
    }
  };

  function handleDelete(memberId) {
    axios.delete(import.meta.env.VITE_BASEURL + "/api/members/" + memberId)
      .then((res) => {
        fetchMembers();
        console.log(res.data)
        // alert("Member created successfully");
      })
  };

  const sendWhatsAppReminder = (member) => {
    // Format the date as dd/mmm/yyyy (e.g., 25 Apr 2025)
    const formattedDate = new Date(member.endDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    // Construct the message with proper formatting
    const message = `Hello ${member.name},\nyour gym membership fees will expire on *${formattedDate}*.\nPlease renew your membership soon.`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Ensure the phone number is properly formatted with the country code
    const phoneNumber = member.phone.startsWith("+") ? member.phone : `+91${member.phone}`; // Change "+91" to your country's code

    // Generate WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp with the message pre-filled
    window.open(whatsappURL, "_blank");
  };




  return (
    <div>
      <h1>Member Management</h1>
      <div className="d-flex flex-row align-items-center justify-content-between gap-2 mb-3">
        {/* Add Member Button */}
        <button className="btn btn-success d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#addMemberModal">
          <i className="fa-solid fa-user-plus"></i>
          <span>Add Member</span>
        </button>

        {/* Filter Dropdown */}
        <select className="form-select w-auto" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Members</option>
          <option value="active">Active Members</option>
          <option value="expired">Expired Members</option>
        </select>
      </div>


      <div className="div mb-2">
        <input onChange={searchMembers} type="text" className='form-control' placeholder='Search Member' />
      </div>

      {/* Display Member Table */}
      <div className="table-responsive">
        <table className="table table-striped text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th className="text-center">No.</th>
              <th className="text-start">Name</th>
              <th className="text-center">Phone</th>
              <th className="text-center">Email</th>
              <th className="text-center">Plan</th>
              <th className="text-center">Start Date</th>
              <th className="text-center">End Date</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member, i) => (
                <tr key={member._id}>
                  <td className="text-center">{i + 1}</td>
                  <td className="text-start">{member.name}</td>
                  <td className="text-center">{member.phone}</td>
                  <td className="text-center">{member.email}</td>
                  <td className="text-center">{member.packageId?.name}</td>
                  <td className="text-center">{new Date(member.startDate).toLocaleDateString()}</td>
                  <td className="text-center">{new Date(member.endDate).toLocaleDateString()}</td>
                  <td className={`fw-bold ${new Date(member.endDate) > new Date() ? "text-success" : "text-danger"}`}>
                    {new Date(member.endDate) > new Date() ? "ACTIVE" : "EXPIRED"}
                  </td>
                  <td className="text-center">
                    <button onClick={() => handleDelete(member._id)} className="btn btn-sm btn-danger m-1">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <button onClick={() => sendWhatsAppReminder(member)} className="btn btn-sm btn-warning fw-bold m-1">
                      <i className="fa-solid fa-bell"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center fw-bold">No Members Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>



      {/* Add Member Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Member</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="text" className='form-control mb-2' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
              <input type="text" className='form-control mb-2' placeholder='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
              <input type="text" className='form-control mb-2' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <select className='form-control mb-2' value={selectedPackage} onChange={handlePackageChange}>
                <option value="">Select Package</option>
                {packages.map((pkg) => (
                  <option key={pkg._id} value={pkg._id}>{pkg.name} - ({pkg.duration} Months)</option>
                ))}
              </select>
              <input type="date" className='form-control mb-2' value={startDate} onChange={handleStartDateChange} placeholder='startDate' />
              <input type="date" className='form-control mb-2' value={endDate} readOnly placeholder='endDate' />
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

export default MemberManagement;
