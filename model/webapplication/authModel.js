const fetchData = require("../../config/postgresConnection");

exports.checkIfExist = async (email) => {
  let sql = `select id from registration where email = $1  `;
  const result = await fetchData(sql, [email]);
  return result.rows;
};
exports.insertUser = async (body) => {
  let sql = `INSERT INTO registration (first_name, last_name, email, password, profile_pic) VALUES ( $1, $2, $3, $4, 'defaultProfile.png') `;
  const result = await fetchData(sql, [
    body.first_name,
    body.last_name,
    body.email,
    body.password,
  ]);
  return result.rowCount;
};
exports.getUsersProfile = async (id) => {
  let sql = `select id,first_name,last_name,bio,email,password,profile_pic,jwt_id,created_at from registration where id = $1`;
  const result = await fetchData(sql, [id]);
  return result.rows;
};
exports.insertActivity = async (activityData) => {
  let sql = `INSERT INTO activity(activity_type, user_id, ip) VALUES( $1 ,$2 ,$3 ) `;
  const result = await fetchData(sql, [
    activityData.activity_type,
    activityData.user_id,
    activityData.ip,
  ]);
  return result;
};
exports.getUsersFullDetails = async (email) => {
  let sql = `select id,first_name,last_name,bio,email,password,profile_pic,jwt_id,created_at from registration where email= $1`;
  const result = await fetchData(sql, [email]);
  return result.rows;
};
exports.insertJwtID = async (jwt, user_id) => {
  let sql = `UPDATE registration SET jwt_id = $1 WHERE id = $2 `;
  const result = await fetchData(sql, [jwt, user_id]);
  return result.rowCount;
};
exports.contactUsForm = async (body) => {
  let sql = `INSERT INTO sContactUs (name, email, phone, text_message, subject, mobile_type,mobile_detail,image,video) VALUES ( $1 ,$2 ,$3 ,$4 , $5 , $6 , $7, $8, $9 ) `;
  const result = await fetchData(sql, [
    body.name,
    body.email,
    body.phone,
    body.text,
    body.subject,
    body.mobile_type,
    body.mobile_detail,
    body.imageName,
    body.videoName,
  ]);
  return result.rowCount;
};

exports.updatePassword = async (hash, user_id) => {
  let sql = `UPDATE registration SET password = $1 WHERE id = $2 `;
  const result = await fetchData(sql, [hash, user_id]);
  return result.rowCount;
};
exports.getUsersDetails = async (email, bnb_address) => {
  let sql = `SELECT is_active, jwt_id FROM registration where email = $1`;
  const result = await fetchData(sql, [email]);
  return result.rows;
};
///////////////////////////////////////////////////////////////////////////
exports.getCountryList = async () => {
  let sql = `Select id, name from country order by (case when name ='India' then 0 else 1 end),trim(name)  asc  `;
  const [result] = await promisePool.query(sql);
  return result;
};

exports.getUsersDetailsAddress = async (bnb_address) => {
  let sql = `SELECT * FROM registration where bnb_address = ?`;
  const [result] = await promisePool.query(sql, [bnb_address]);
  return result;
};

exports.profileUpdate = async (body, user_id) => {
  let sql = `UPDATE registration SET first_name = ?,  last_name = ?,  bio = ?  WHERE id = ? `;
  const [result] = await promisePool.query(sql, [
    body.first_name,
    body.last_name,
    body.bio,
    user_id,
  ]);
  return result;
};
