"use client";

import { useEffect, useState, FormEvent } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase/clientApp.ts";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (newName.trim() && newEmail.trim()) {
      setLoading(true);
      try {
        // Query to get the highest user_id in the database
        const usersCollection = collection(db, "users");
        const usersQuery = query(usersCollection, orderBy("user_id", "desc"), limit(1));
        const usersSnapshot = await getDocs(usersQuery);

        let newUserId = 1; // Default user_id is 1
        if (!usersSnapshot.empty) {
          const lastUser = usersSnapshot.docs[0].data();
          newUserId = lastUser.user_id + 1; // Increment the highest user_id by 1
        }

        // Add new user with incremented user_id
        const docRef = await addDoc(usersCollection, { name: newName, email: newEmail, user_id: newUserId });

        setUsers([...users, { id: docRef.id, name: newName, email: newEmail, user_id: newUserId }]);

        setNewName("");
        setNewEmail("");
      } catch (error) {
        console.error("Error adding user:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "users", userId));
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
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
      setLoading(true);
      try {
        const userRef = doc(db, "users", editingUser.id);
        await updateDoc(userRef, { name: newName, email: newEmail });

        setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, name: newName, email: newEmail } : user)));

        setNewName("");
        setNewEmail("");
        setEditingUser(null);
      } catch (error) {
        console.error("Error updating user:", error);
      } finally {
        setLoading(false);
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
              <p className="text-clr-light">User ID: {user.user_id}</p> {/* Displaying user_id */}
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
      {loading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </div>
  );
};

export default Users;
