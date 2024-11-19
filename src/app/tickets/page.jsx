"use client";
import { useEffect, useState, FormEvent } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase/clientApp.ts";



const Tickets = () => {
  //would be greate to create a reusable component but for now thisll work.
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  //ticket management stuff
  /*
• ticket_id (PK) - INT, Auto Increment 
• user_id (FK) - INT, References user(user_id) 
• category - ENUM ('Technical Support', 'Product Inquiry', 'General Question') 
• status - ENUM ('Open', 'In-Progress', 'Resolved', 'Closed') 
• priority - ENUM ('Low', 'Medium', 'High') 
• description – TEXT 
• internal_notes - TEXT 
• assigned_agent_id (FK) - INT, Nullable, References user(user_id) for support agents • created_at - TIMESTAMP, Default Current Timestamp 
• updated_at - TIMESTAMP, On Update Current Timestamp 
*/
  const [ticketlist, setTickets] = useState([]);
  const [user_id, setUserID] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDesc] = useState("");
  const [internal_notes, setNotes] = useState("");
  const [assigned_agent, setAssignedAgent] = useState("");
  const [updated_at, setUpdated] = useState("");


  useEffect(() => {
    const fetchUserandTicks = async () => {
      setLoading(true);
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);

        const ticketCollection = collection(db, 'tickets');
        // const ticketQuery = query(ticketCollection, orderBy('updated_at', 'priority'));
        const querySnapshot = await getDocs(ticketCollection);
        const ticketData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTickets(ticketData);


      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserandTicks();

  }, []);

  const submitTicket = async (e) => {
    
  };

  return (
    <div>TICKET MANAGEMENT

Ticket Management: Admins can view all support tickets, assign them to support agents, and track their status.
<ul className="card__list">
  {users.map((user) => (
    <li key={user.id} className="card__element dark-card flex flex-col items-center justify-between">
      <p className="text-clr-light">Email: {user.email}</p>
      <p className="text-clr-light">User ID: {user.user_id}</p>
      <p className="text-clr-light">Contact Number: {user.contact_number}</p>
      <p className="text-clr-light">First Name: {user.first_name}</p>
    </li>
  ))}
</ul>
<h3>Create Tickets</h3>
  <div className="list__item">

  <form onSubmit={submitTicket} className="">
    <label for="cat"> 
        Category:
        <select id = "cat" name="category_type">
          <option> Technical Support</option>
          <option> Product Inquiry</option>
          <option> General Question </option>
        </select>
    </label>
    <label for="stat"> 
        Status:
        <select id = "stat" name="stat_type">
          <option> Open</option>
          <option> In-Progress</option>
          <option> Resolved </option>
          <option> Closed </option>
        </select>
    </label>
    <label for="priority"> 
        Priority:
        <select id = "priority" name="priority_type">
          <option> Low</option>
          <option> Medium</option>
          <option> High </option>
        </select>
    </label>

    <label>
          Description:
          <input type="text" id="description" description="desc"/>
    </label>
    <label>
          Internal Notes:
          <input type="text" id="description" description="desc"/>
    </label>

    <label for="assignment"> 
        Assign this Ticket to:
        <select id = "assignment" name="assignment_id">
          <option> user id stuff</option>
          <option> who</option>
          <option> what </option>
        </select>
    </label>
    <button type="submit" className="btn">
          Submit Ticket
    </button>
  </form>
  </div>
<h3>All Tickets</h3>
<ul className="list">
  {ticketlist.map((tickets, index) => (
    <li key={index} className="list__item">
        <div className="element list__stats">
          <p className="">Ticket Id: {tickets.ticket_id}</p>
          <p className="">User submitted: {tickets.user_id}</p>
          <p className="">Category: {tickets.category}</p>
          <p className="">Status: {tickets.status}</p>
          <p className="">Priority: {tickets.priority}</p>
        </div>
        <div className="element list__desc">
          <p className="">Description: {tickets.description}</p>
          <p className="">Internal Notes: {tickets.internal_notes}</p>
        </div>
        <div className="element list__assignment">
          <p className="">Assigned Agent: {tickets.assigned_agent_id}</p>
        </div>
        
        

    </li>
  ))}
</ul>



    </div>
    

  )
}


export default Tickets;
/* <ul>
  {ticketlist.map((tickets) => (
    <li key={tickets.id} className="">
        <p className="">Ticket Id: {tickets.ticket_id}</p>
        <p className="">User submitted: {tickets.user_id}</p>
        <p className="">Category: {tickets.cateogory}</p>
        <p className="">Status: {tickets.status}</p>
        <p className="">Priority: {tickets.priority}</p>
        <p className="">Description: {tickets.description}</p>
        <p className="">Internal Notes: {tickets.internal_notes}</p>
        <p className="">Assigned Agent: {tickets.assigned_agent_id}</p>
        

    </li>
  ))}
</ul> */