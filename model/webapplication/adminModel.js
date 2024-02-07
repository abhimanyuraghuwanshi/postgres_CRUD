const fetchData = require('../../config/postgresConnection')


exports.getAdminInfo = async (data) => {
  let sql = `select id,username,password,user_role from admin where username = $1`;
  const result = await fetchData(sql,[data.username]);
  return result.rows;
};

exports.insertActivity = async (activityData) => {
  let sql = `INSERT INTO activity(activity_type, user_id, ip) VALUES( $1,$2,$3) `;
  const result = await fetchData(sql,[activityData.activity_type  , activityData.user_id, activityData.ip]);
  return result.rowCount;
};
exports.getLoginActivity = async () => {
  let sql = `select id,activity_type,user_id,ip,created_at from activity order by id desc`;
  const result = await fetchData(sql);
  return result.rows;
};
exports.getAllUsers = async () => {
  let sql = `select id,first_name,last_name,bio,email,password,profile_pic,jwt_id,created_at from registration order by id desc`;
  const result = await fetchData(sql);
  return result.rows;
};