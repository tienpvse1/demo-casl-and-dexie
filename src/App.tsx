import { nanoid } from "nanoid";
import { Button } from "primereact/button";
import "./App.css";
import { ability, Can } from "./context/permission.context";
import { db } from "./db/db";
function App() {
  const handlePermissionClick = async (subject: string = "user") => {
    await db.permission.clear();
    await db.permission.add({
      id: nanoid(5),
      action: "manage",
      subject: subject,
    });
    ability.update([{ action: "manage", subject: subject }]);
  };

  const handleAdminClick = async () => {
    await db.permission.clear();
    // persist data to the indexedDB
    await db.permission.bulkAdd([
      {
        id: nanoid(5),
        action: "manage",
        subject: "admin",
      },
      {
        id: nanoid(5),
        action: "manage",
        subject: "manager",
      },
      {
        id: nanoid(5),
        action: "manage",
        subject: "user",
      },
    ]);
    // update permission
    ability.update([
      { action: "manage", subject: "admin" },
      { action: "manage", subject: "manager" },
      { action: "manage", subject: "user" },
    ]);
  };

  const handleAddUser = async () => {};

  const handleLogout = async () => {
    await db.permission.clear();
  };
  return (
    <div className="App">
      <Button onClick={() => handlePermissionClick("user")}>User</Button>
      <Button onClick={() => handlePermissionClick("manager")}>Manager</Button>
      <Button onClick={() => handleAdminClick()}>Admin</Button>
      <Button onClick={() => handleAddUser()}>Create</Button>
      <Button onClick={() => handleLogout()}>logout</Button>
      <Can I="write" a="user">
        <input type="text" />
      </Can>
      <Can I="manage" a="manager">
        <h1>I can manage manager</h1>
      </Can>
      <Can I="manage" a="admin">
        <h1>I can manage admin</h1>
      </Can>
      <Can I="manage" a="admin" passThrough>
        {(allowed: boolean) => (
          <Button disabled={!allowed}>admin can push only</Button>
        )}
      </Can>
      <input type="text" />
    </div>
  );
}

export default App;
