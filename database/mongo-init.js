db = db.getSiblingDB("seminario");
db.createUser({
  user: "root",
  pwd: "example",
  roles: [{ role: "readWrite", db: "seminario" }],
});
