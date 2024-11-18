"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/clientApp.ts";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [editingUser, setEditingUser] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (newName.trim() && newEmail.trim()) {
      try {
        const usersCollection = collection(db, "users");
        const docRef = await addDoc(usersCollection, { name: newName, email: newEmail });

        setUsers([...users, { id: docRef.id, name: newName, email: newEmail }]);

        setNewName("");
        setNewEmail("");
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, "users", userId));

      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (user) => {
    
    setNewName(user.name);
    setNewEmail(user.email);
    setEditingUser(user); 
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    if (newName.trim() && newEmail.trim() && editingUser) {
      try {
        const userRef = doc(db, "users", editingUser.id);
        await updateDoc(userRef, { name: newName, email: newEmail });

        setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, name: newName, email: newEmail } : user)));

        setNewName("");
        setNewEmail("");
        setEditingUser(null);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  return (
    <div className="dark-section min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-clr-light mb-8 text-center">User Management</h1>
      <div className="card-container">
        <ul className="card__list">
          {users.map((user) => (
            <li key={user.id} className="card__element dark-card flex flex-col items-center justify-between">
              <p className="text-clr-neon">Name: {user.name}</p>
              <p className="text-clr-light">Email: {user.email}</p>
              <div className="flex gap-4">
                <button
                  className="edit-btn"
                  onClick={() => handleEditUser(user)} 
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteUser(user.id)} 
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <form
        className="form-container bg-clr-darkneon rounded-lg shadow-lg p-6 flex flex-col gap-4 items-center"
        onSubmit={editingUser ? handleUpdateUser : handleAddUser} 
      >
        <input
          type="text"
          placeholder="Enter name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Enter email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="btn">
          {editingUser ? "Update User" : "Add User"} 
        </button>
      </form>
    </div>
  );
};

export default Users;
