
const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  roleIds: state => state.user.roleIds,
  sid: state => state.user.sid,
  oid: state => state.user.oid,
  userId: state => state.user.userId,
  listMajor: state => state.user.listMajor,
  baseMajorIds: state => state.user.baseMajorIds
}
export default getters
